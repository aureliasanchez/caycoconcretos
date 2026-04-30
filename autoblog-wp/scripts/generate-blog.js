#!/usr/bin/env node
/**
 * autoblog-wp/scripts/generate-blog.js
 *
 * Generador de artículos de blog para WordPress de Cayco Concretos.
 * - Lee tópicos de data/topics-pool.json
 * - Llama a Claude API por cada artículo
 * - Convierte markdown -> HTML con marked
 * - Crea/encuentra tags vía REST API
 * - POST a /wp-json/wp/v2/posts (status=draft por default)
 * - Loggea costos y resultados en logs/autoblog-log.json
 *
 * Uso:
 *   node scripts/generate-blog.js [--count 1] [--cluster ID] [--dry-run] [--status publish|draft]
 *
 * Variables de entorno requeridas (excepto en --dry-run):
 *   ANTHROPIC_API_KEY, WP_URL, WP_USERNAME, WP_APP_PASSWORD
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const Anthropic = require('@anthropic-ai/sdk');
const { buildSystemPrompt, buildUserPrompt } = require('./prompts');

// ────────────────────────────────────────────────────────────────────
// CONFIG
// ────────────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const TOPICS_PATH = path.join(ROOT, 'data', 'topics-pool.json');
const CLUSTERS_PATH = path.join(ROOT, 'data', 'clusters.json');
const LOG_PATH = path.join(ROOT, 'logs', 'autoblog-log.json');
const PUBLISHED_SLUGS_CACHE = path.join(ROOT, 'logs', 'published-slugs.json');

const MODEL = 'claude-sonnet-4-5-20250929';
const MAX_TOKENS = 8192;
const PRICE_INPUT_PER_M = 3;
const PRICE_OUTPUT_PER_M = 15;

// ────────────────────────────────────────────────────────────────────
// CLI
// ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
function getArg(name, def) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
}
const COUNT = parseInt(getArg('count', '1'), 10);
const FILTER_CLUSTER = getArg('cluster', null);
const DRY_RUN = args.includes('--dry-run');
const POST_STATUS = getArg('status', 'draft'); // 'draft' | 'publish' | 'future'

// ────────────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────────────
const readJson = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const writeJson = (p, data) => fs.writeFileSync(p, JSON.stringify(data, null, 2));
const sleep = ms => new Promise(r => setTimeout(r, ms));

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function countWords(text) {
  return text.trim().split(/\s+/).length;
}

// ────────────────────────────────────────────────────────────────────
// PARSING
// ────────────────────────────────────────────────────────────────────
function parseClaudeJson(text) {
  try { return JSON.parse(text); } catch {}
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) {
    try { return JSON.parse(fence[1]); } catch {}
  }
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first >= 0 && last > first) {
    try { return JSON.parse(text.slice(first, last + 1)); } catch {}
  }
  throw new Error('No se pudo parsear JSON de la respuesta de Claude');
}

// ────────────────────────────────────────────────────────────────────
// WORDPRESS REST API
// ────────────────────────────────────────────────────────────────────
function authHeader() {
  const credentials = `${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`;
  return 'Basic ' + Buffer.from(credentials).toString('base64');
}

async function wpFetch(endpoint, options = {}) {
  const url = `${process.env.WP_URL}/wp-json/wp/v2${endpoint}`;
  const resp = await fetch(url, {
    ...options,
    headers: {
      'Authorization': authHeader(),
      'Accept': 'application/json',
      ...(options.body && typeof options.body === 'string' ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    }
  });
  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`WP API ${resp.status} ${resp.statusText} en ${endpoint}: ${errBody.slice(0, 300)}`);
  }
  return resp.json();
}

async function getExistingSlugsFromWp() {
  // Pagea para obtener todos los slugs existentes (drafts + published)
  const slugs = new Set();
  for (let page = 1; page <= 20; page++) {
    try {
      const posts = await wpFetch(`/posts?per_page=100&status=any&_fields=id,slug&page=${page}`);
      if (!Array.isArray(posts) || posts.length === 0) break;
      posts.forEach(p => slugs.add(p.slug));
      if (posts.length < 100) break;
    } catch (err) {
      // Si falla por permisos en status=any, intentar solo published
      if (page === 1 && err.message.includes('401')) {
        const pubPosts = await wpFetch(`/posts?per_page=100&_fields=id,slug&page=1`);
        pubPosts.forEach(p => slugs.add(p.slug));
      }
      break;
    }
  }
  return slugs;
}

async function findOrCreateTags(tagSlugs) {
  if (!tagSlugs || !tagSlugs.length) return [];
  const ids = [];
  for (const tagSlug of tagSlugs) {
    const slug = String(tagSlug).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (!slug) continue;
    try {
      const existing = await wpFetch(`/tags?slug=${encodeURIComponent(slug)}&_fields=id,slug,name`);
      if (Array.isArray(existing) && existing.length > 0) {
        ids.push(existing[0].id);
        continue;
      }
      const created = await wpFetch('/tags', {
        method: 'POST',
        body: JSON.stringify({ name: slug.replace(/-/g, ' '), slug })
      });
      if (created && created.id) ids.push(created.id);
    } catch (err) {
      console.warn(`  ⚠ tag "${slug}" omitido: ${err.message}`);
    }
  }
  return ids;
}

async function createPost({ title, slug, content, excerpt, status, categoryIds, tagIds, metaDesc, focusKw }) {
  const body = {
    title,
    slug,
    content,
    excerpt,
    status,
    categories: categoryIds,
    tags: tagIds,
    meta: {
      _yoast_wpseo_metadesc: metaDesc,
      _yoast_wpseo_focuskw: focusKw
    }
  };
  return wpFetch('/posts', {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

// ────────────────────────────────────────────────────────────────────
// FAQ schema (Yoast detecta FAQs en bloques Gutenberg, pero aquí inyectamos JSON-LD inline al final del contenido para no depender del parser)
// ────────────────────────────────────────────────────────────────────
function extractFaqs(markdownBody) {
  const m = markdownBody.match(/##\s*preguntas\s*frecuentes[^\n]*\n([\s\S]*?)(?=\n##\s|$)/i);
  if (!m) return [];
  const block = m[1];
  const faqs = [];
  const regex = /###\s+([^\n]+)\n+([\s\S]*?)(?=\n###\s|$)/g;
  let match;
  while ((match = regex.exec(block)) !== null) {
    const question = match[1].trim();
    const answer = match[2]
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

function buildFaqSchemaScript(faqs) {
  if (!faqs.length) return '';
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };
  return `\n\n<script type="application/ld+json">${JSON.stringify(json)}</script>\n`;
}

// ────────────────────────────────────────────────────────────────────
// LOGGING
// ────────────────────────────────────────────────────────────────────
function appendLog(entry) {
  ensureDir(path.dirname(LOG_PATH));
  let log = { runs: [], totalCostUSD: 0 };
  if (fs.existsSync(LOG_PATH)) {
    try { log = readJson(LOG_PATH); } catch {}
  }
  log.runs = log.runs || [];
  log.runs.push(entry);
  log.totalCostUSD = (log.totalCostUSD || 0) + (entry.costUSD || 0);
  log.lastRun = new Date().toISOString();
  writeJson(LOG_PATH, log);
}

// ────────────────────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🏗  Cayco Autoblog WP — generación de artículos');
  console.log(`   Modo: ${DRY_RUN ? 'DRY RUN' : 'PRODUCCIÓN'}`);
  console.log(`   Solicitados: ${COUNT}`);
  console.log(`   Filtro cluster: ${FILTER_CLUSTER || '(ninguno)'}`);
  console.log(`   Status del post: ${POST_STATUS}`);
  console.log('');

  const required = ['ANTHROPIC_API_KEY', 'WP_URL', 'WP_USERNAME', 'WP_APP_PASSWORD'];
  if (!DRY_RUN) {
    const missing = required.filter(k => !process.env[k]);
    if (missing.length) {
      console.error(`❌ Faltan variables de entorno: ${missing.join(', ')}`);
      process.exit(1);
    }
  }

  const anthropic = !DRY_RUN ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null;
  const { topics } = readJson(TOPICS_PATH);
  const { clusters, globals } = readJson(CLUSTERS_PATH);
  const clusterMap = Object.fromEntries(clusters.map(c => [c.id, c]));
  const branchMap = Object.fromEntries((globals.branches || []).map(b => [b.id, b]));

  // Slugs ya publicados (evita duplicados)
  let existing = new Set();
  if (!DRY_RUN) {
    try {
      existing = await getExistingSlugsFromWp();
      console.log(`   Slugs existentes en WP: ${existing.size}`);
    } catch (err) {
      console.warn(`   ⚠ No se pudieron obtener slugs existentes: ${err.message}`);
    }
  }
  // También revisa caché local de runs previos
  if (fs.existsSync(PUBLISHED_SLUGS_CACHE)) {
    try {
      const cache = readJson(PUBLISHED_SLUGS_CACHE);
      (cache.slugs || []).forEach(s => existing.add(s));
    } catch {}
  }

  let pool = topics.filter(t => !existing.has(t.slug));
  if (FILTER_CLUSTER) pool = pool.filter(t => t.cluster === FILTER_CLUSTER);
  console.log(`   Pool disponible: ${pool.length} tópicos`);

  if (pool.length === 0) {
    console.log('⚠️  Pool agotado o filtro vacío. Nada que generar.');
    process.exit(0);
  }
  if (pool.length < 10) {
    console.log(`⚠️  ALERTA: pool casi agotado (${pool.length}). Agrega tópicos a topics-pool.json.`);
  }

  pool = shuffle(pool);
  const selected = pool.slice(0, COUNT);

  let generated = 0;
  let failed = 0;
  let totalCost = 0;
  const newSlugs = [];

  for (const topic of selected) {
    const cluster = clusterMap[topic.cluster];
    if (!cluster) {
      console.error(`❌ Cluster desconocido: ${topic.cluster} (skip)`);
      failed++;
      continue;
    }
    const branch = topic.branchHint ? branchMap[topic.branchHint] : null;

    console.log(`\n▶ Generando: ${topic.slug}`);
    console.log(`  Cluster: ${cluster.name} (WP cat ${cluster.wpCategoryId})`);
    if (branch) console.log(`  Sucursal: ${branch.name} (${branch.phone})`);

    try {
      const systemPrompt = buildSystemPrompt(cluster.id);
      const userPrompt = buildUserPrompt(topic, cluster, branch);

      let data;
      let inTok = 0, outTok = 0;

      if (DRY_RUN) {
        data = {
          title: topic.title,
          metaDescription: `Artículo sobre ${topic.title}. Cayco Concretos, 5 sucursales en centro de México.`,
          readingTime: 7,
          imageAlt: `Imagen ilustrativa: ${topic.title}`,
          tags: ['concreto', 'calidad', 'asesoria-tecnica'],
          body: `Introducción de prueba.\n\n## Sección uno\n\nContenido con [enlace](/services.html), [otro](/contact.html), [tercero](/tipos-concreto.html).\n\n## Preguntas frecuentes\n\n### ¿Pregunta de prueba?\n\nRespuesta de prueba.\n\n### ¿Otra pregunta?\n\nOtra respuesta.\n`
        };
        console.log('  🧪 DRY RUN: usando mock data (sin llamada a Claude)');
      } else {
        let response;
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            response = await anthropic.messages.create({
              model: MODEL,
              max_tokens: MAX_TOKENS,
              system: systemPrompt,
              messages: [{ role: 'user', content: userPrompt }]
            });
            break;
          } catch (err) {
            console.warn(`  ⚠ Intento ${attempt} falló: ${err.message}`);
            if (attempt === 3) throw err;
            await sleep(2000 * attempt);
          }
        }
        const text = response.content[0].text;
        data = parseClaudeJson(text);
        inTok = response.usage.input_tokens;
        outTok = response.usage.output_tokens;
      }

      if (!data.title || !data.body) throw new Error('Respuesta sin title o body');
      const wordCount = countWords(data.body);
      if (!DRY_RUN && wordCount < 800) throw new Error(`Body muy corto: ${wordCount} palabras`);

      const faqs = extractFaqs(data.body);
      const faqSchema = buildFaqSchemaScript(faqs);

      // marked: convierte markdown a HTML compatible con Gutenberg
      // Configuración para que <a> queden bien y los enlaces internos sigan al sitio principal
      const bodyHtml = marked.parse(data.body) + faqSchema;

      // Tags: combina los del topic + los devueltos por Claude
      const allTagSlugs = [...new Set([...(topic.keywords || []), ...(data.tags || [])])]
        .map(t => String(t).toLowerCase().trim())
        .filter(Boolean)
        .slice(0, 8);

      let tagIds = [];
      if (!DRY_RUN) {
        tagIds = await findOrCreateTags(allTagSlugs);
      }

      const focusKw = (topic.keywords || [])[0] || '';

      let postUrl = null;
      let postId = null;

      if (DRY_RUN) {
        const previewPath = path.join(ROOT, 'logs', `dry-run-${topic.slug}.json`);
        ensureDir(path.dirname(previewPath));
        writeJson(previewPath, {
          title: data.title,
          slug: topic.slug,
          status: POST_STATUS,
          categories: [cluster.wpCategoryId],
          tags: allTagSlugs,
          metaDescription: data.metaDescription,
          focusKw,
          wordCount,
          faqsCount: faqs.length,
          contentPreview: bodyHtml.slice(0, 500) + '...',
          contentLength: bodyHtml.length
        });
        console.log(`  ✅ DRY RUN — preview: logs/dry-run-${topic.slug}.json (${wordCount} palabras, ${faqs.length} FAQs, ${allTagSlugs.length} tags)`);
      } else {
        const post = await createPost({
          title: data.title,
          slug: topic.slug,
          content: bodyHtml,
          excerpt: data.metaDescription || '',
          status: POST_STATUS,
          categoryIds: [cluster.wpCategoryId],
          tagIds,
          metaDesc: data.metaDescription || '',
          focusKw
        });
        postUrl = post.link;
        postId = post.id;
        console.log(`  ✅ Post creado: ID ${postId} — ${postUrl}`);
        console.log(`     ${wordCount} palabras, ${faqs.length} FAQs, ${tagIds.length} tags, status=${POST_STATUS}`);
      }

      const cost = (inTok * PRICE_INPUT_PER_M + outTok * PRICE_OUTPUT_PER_M) / 1_000_000;
      totalCost += cost;

      appendLog({
        date: new Date().toISOString(),
        slug: topic.slug,
        cluster: cluster.id,
        wpCategoryId: cluster.wpCategoryId,
        branch: topic.branchHint || null,
        wordCount,
        faqsCount: faqs.length,
        tagsCount: tagIds.length,
        inputTokens: inTok,
        outputTokens: outTok,
        costUSD: Number(cost.toFixed(4)),
        status: POST_STATUS,
        postId,
        postUrl,
        dryRun: DRY_RUN,
        success: true
      });

      generated++;
      newSlugs.push(topic.slug);
      existing.add(topic.slug);
      if (!DRY_RUN) await sleep(1500);
    } catch (err) {
      console.error(`  ❌ Falló: ${err.message}`);
      failed++;
      appendLog({
        date: new Date().toISOString(),
        slug: topic.slug,
        cluster: topic.cluster,
        error: err.message,
        success: false
      });
    }
  }

  // Actualizar caché local de slugs publicados (para resilencia ante errores futuros del fetch a WP)
  if (newSlugs.length && !DRY_RUN) {
    let cache = { slugs: [] };
    if (fs.existsSync(PUBLISHED_SLUGS_CACHE)) {
      try { cache = readJson(PUBLISHED_SLUGS_CACHE); } catch {}
    }
    cache.slugs = [...new Set([...(cache.slugs || []), ...newSlugs])];
    cache.lastUpdate = new Date().toISOString();
    writeJson(PUBLISHED_SLUGS_CACHE, cache);
  }

  console.log('\n──────────────────────────────────────');
  console.log(`✓ Generados: ${generated}`);
  console.log(`✗ Fallidos:  ${failed}`);
  console.log(`💰 Costo run: $${totalCost.toFixed(4)} USD`);
  console.log(`📊 Pool restante: ${pool.length - generated}`);
  console.log('──────────────────────────────────────');

  if (generated === 0 && failed > 0) process.exit(1);
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
