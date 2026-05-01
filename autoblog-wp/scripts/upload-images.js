#!/usr/bin/env node
/**
 * autoblog-wp/scripts/upload-images.js
 *
 * Sube un pool de imágenes a la Media Library de WordPress y guarda
 * los IDs en data/image-pool.json para que el autoblog las use como
 * featured image en posts nuevos.
 *
 * Esto se corre UNA SOLA VEZ (o cuando quieras ampliar el pool).
 * Después el autoblog usa los IDs guardados sin re-subir.
 *
 * Uso:
 *   node scripts/upload-images.js --dir ../img/posts
 *   node scripts/upload-images.js --dir ../img/posts --dry-run
 *
 * Requiere variables de entorno: WP_URL, WP_USERNAME, WP_APP_PASSWORD
 *
 * Convención opcional para etiquetar imágenes por cluster:
 *   {nombre}__cluster-tecnico-normativo.jpg
 *   {nombre}__cluster-innovacion.jpg
 *   {nombre}.jpg                         (sin restricción de cluster)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IMAGE_POOL_PATH = path.join(ROOT, 'data', 'image-pool.json');

const args = process.argv.slice(2);
function getArg(name, def) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
}
const SOURCE_DIR = getArg('dir', null);
const DRY_RUN = args.includes('--dry-run');

const VALID_CLUSTERS = ['tecnico-normativo', 'innovacion', 'geo-zonas', 'tipos-proyecto', 'casos-cliente', 'comparativas-decision'];

function authHeader() {
  const credentials = `${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`;
  return 'Basic ' + Buffer.from(credentials).toString('base64');
}

function normalizeWpUrl(rawUrl) {
  if (!rawUrl) return '';
  let u = String(rawUrl).trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  return u;
}

function readPool() {
  if (!fs.existsSync(IMAGE_POOL_PATH)) return { images: [] };
  try { return JSON.parse(fs.readFileSync(IMAGE_POOL_PATH, 'utf8')); } catch { return { images: [] }; }
}

function writePool(pool) {
  fs.mkdirSync(path.dirname(IMAGE_POOL_PATH), { recursive: true });
  fs.writeFileSync(IMAGE_POOL_PATH, JSON.stringify(pool, null, 2));
}

function detectMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ({
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
  })[ext] || null;
}

function parseFilename(filename) {
  // Convención: {nombre-base}__cluster-{id}.ext  (cluster opcional)
  const base = path.basename(filename, path.extname(filename));
  const clusterMatch = base.match(/__cluster-(.+)$/);
  if (clusterMatch && VALID_CLUSTERS.includes(clusterMatch[1])) {
    return {
      name: base.replace(/__cluster-.+$/, ''),
      cluster: clusterMatch[1]
    };
  }
  return { name: base, cluster: null };
}

async function uploadImage(filePath) {
  const baseUrl = normalizeWpUrl(process.env.WP_URL);
  const filename = path.basename(filePath);
  const buffer = fs.readFileSync(filePath);
  const mime = detectMimeType(filename);
  if (!mime) throw new Error(`Tipo de archivo no soportado: ${filename}`);

  const resp = await fetch(`${baseUrl}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader(),
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': mime,
      'User-Agent': 'Cayco-Autoblog-Uploader/1.0'
    },
    body: buffer
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${errBody.slice(0, 300)}`);
  }
  return resp.json();
}

async function main() {
  console.log('🖼  Cayco Autoblog WP — uploader de imágenes a Media Library');
  console.log(`   Modo: ${DRY_RUN ? 'DRY RUN' : 'PRODUCCIÓN'}`);

  if (!SOURCE_DIR) {
    console.error('❌ Especifica el directorio con --dir <ruta>');
    process.exit(1);
  }
  const absDir = path.isAbsolute(SOURCE_DIR) ? SOURCE_DIR : path.resolve(ROOT, SOURCE_DIR);
  if (!fs.existsSync(absDir)) {
    console.error(`❌ El directorio no existe: ${absDir}`);
    process.exit(1);
  }
  console.log(`   Directorio fuente: ${absDir}`);

  if (!DRY_RUN) {
    const required = ['WP_URL', 'WP_USERNAME', 'WP_APP_PASSWORD'];
    const missing = required.filter(k => !process.env[k]);
    if (missing.length) {
      console.error(`❌ Faltan variables de entorno: ${missing.join(', ')}`);
      process.exit(1);
    }
  }

  const files = fs.readdirSync(absDir)
    .filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.log('   ⚠ No se encontraron imágenes (jpg/png/webp/gif) en el directorio.');
    process.exit(0);
  }
  console.log(`   Encontradas: ${files.length} imágenes`);
  console.log('');

  const pool = readPool();
  const existingNames = new Set((pool.images || []).map(i => i.sourceFile));
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    if (existingNames.has(file)) {
      console.log(`  ⏭  Skip: ${file} (ya en pool)`);
      skipped++;
      continue;
    }
    const { name, cluster } = parseFilename(file);
    console.log(`  ↑ Subiendo: ${file} ${cluster ? `[cluster=${cluster}]` : ''}`);

    if (DRY_RUN) {
      console.log(`    🧪 DRY RUN — no se subió`);
      uploaded++;
      continue;
    }

    try {
      const filePath = path.join(absDir, file);
      const media = await uploadImage(filePath);
      pool.images = pool.images || [];
      pool.images.push({
        id: media.id,
        url: media.source_url,
        sourceFile: file,
        alt: name.replace(/-/g, ' '),
        clusters: cluster ? [cluster] : []
      });
      console.log(`    ✅ ID ${media.id} — ${media.source_url}`);
      writePool(pool);  // Persistir tras cada upload exitoso
      uploaded++;
    } catch (err) {
      console.error(`    ❌ Falló: ${err.message}`);
      failed++;
    }
  }

  console.log('');
  console.log('──────────────────────────────────────');
  console.log(`✓ Subidas: ${uploaded}`);
  console.log(`⏭  Saltadas: ${skipped}`);
  console.log(`✗ Fallidas: ${failed}`);
  console.log(`📦 Total en pool: ${(pool.images || []).length}`);
  console.log('──────────────────────────────────────');
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
