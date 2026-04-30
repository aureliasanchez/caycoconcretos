# Autoblog WordPress — Cayco Concretos

Sistema automatizado de generación + publicación de artículos SEO al blog de WordPress de Cayco Concretos vía REST API.

> Publica posts directamente a `https://cayco.mx/blog/` — sin FTP, sin templates HTML, sin actualización manual de sitemap (Yoast SEO lo regenera). Mantenedor: Teseo Data Lab.

---

## 1. Pipeline

```
Cron GitHub Actions (cada 3 días)
        │
        ▼
node scripts/generate-blog.js --count 1 --status draft
        │
        ├─ Lee data/topics-pool.json (60 tópicos)
        ├─ Lee data/clusters.json (6 clusters mapeados a categorías WP existentes)
        ├─ GET /wp-json/wp/v2/posts → filtra slugs ya publicados
        ├─ Selecciona 1 tópico aleatorio del pool disponible
        ├─ Llama a Claude Sonnet 4.5 con prompt del cluster + sucursal hint
        ├─ Parsea JSON {title, body markdown, metaDescription, tags, ...}
        ├─ Convierte body markdown → HTML
        ├─ Inyecta FAQPage JSON-LD al final del contenido
        ├─ Crea/encuentra tags vía /wp-json/wp/v2/tags
        └─ POST /wp-json/wp/v2/posts (status=draft por default)
        │
        ▼
WordPress publica el post como BORRADOR
        │
        ▼
[ Manual: revisar en WP Admin → click "Publicar" cuando se valide ]
```

---

## 2. Estructura del directorio

```
autoblog-wp/
├── README.md                    ← este documento
├── package.json                 ← deps: @anthropic-ai/sdk + marked
├── scripts/
│   ├── generate-blog.js         ← script principal
│   └── prompts.js               ← persona Cayco + cluster overrides
├── data/
│   ├── clusters.json            ← 6 clusters + globals (5 sucursales)
│   └── topics-pool.json         ← 60 tópicos iniciales
├── logs/                        ← (gitignored) log de costos + caché slugs
└── cache/
    └── published-slugs.json     ← caché commiteado para resiliencia
```

Y en la raíz del repo:
- `.github/workflows/autoblog-wp.yml` — workflow del autoblog

---

## 3. Los 6 clusters mapeados a categorías WP existentes

| Cluster | Categoría WP (id) | Peso | Tópicos pool |
|---|---|---|---|
| `tecnico-normativo` | Calidad (6) | 2 | 12 |
| `innovacion` | Innovación (5) | 2 | 10 |
| `geo-zonas` | Construcción (8) | 2 | 11 |
| `tipos-proyecto` | Construcción (8) | 2 | 10 |
| `casos-cliente` | Compromiso (7) | 1 | 8 |
| `comparativas-decision` | Valor (9) | 1 | 10 |

**Pool inicial: 61 tópicos** → 1 cada 3 días ≈ **183 días (~6 meses)** de runway.

---

## 4. Las 5 sucursales

| ID | Sucursal | Estado | Teléfono | Diferenciador |
|---|---|---|---|---|
| `tulancingo` | Tulancingo (Matriz) | Hidalgo | (775) 753 38 11 | — |
| `pachuca` | Pachuca | Hidalgo | (771) 143 63 26 | — |
| `huauchinango` | Huauchinango | Puebla | (776) 767 83 35 | — |
| `queretaro` | Querétaro | Querétaro | (442) 439 7563 | **Distintivo C PRO CEMEX** |
| `zumpango` | Zumpango | Edo. México | (566) 672 2875 | — |

Tópicos con `branchHint` reciben contexto específico de la sucursal en el prompt y CTA con teléfono local.

---

## 5. Setup inicial (a configurar antes del primer run real)

### 5.1 En WordPress (cayco.mx/blog)

1. **Crear Application Password**:
   - WP Admin → **Users** → tu usuario admin (o crear "autoblog-bot" con rol Editor)
   - Scroll a "Application Passwords"
   - Nombre: `Autoblog Bot Teseo`
   - Click **Add New** → genera token tipo `xxxx xxxx xxxx xxxx xxxx xxxx`
   - **Copiar y guardar** (solo se muestra una vez)
2. Verificar que el rol del user tenga capacidad `publish_posts` y `manage_categories` (Editor o superior).
3. Verificar Yoast SEO activo (ya está según inspección del sitio).

### 5.2 En GitHub (Settings → Secrets → Actions)

```
ANTHROPIC_API_KEY = sk-ant-...
WP_URL            = https://cayco.mx/blog
WP_USERNAME       = autoblog-bot (o tu username)
WP_APP_PASSWORD   = xxxx xxxx xxxx xxxx xxxx xxxx
```

### 5.3 Permisos del workflow

Settings → Actions → General → Workflow permissions → **Read and write permissions** ✅
(necesario para commitear el caché de slugs)

---

## 6. Operación

### 6.1 Test local sin gastar API ni tocar WP

```bash
cd autoblog-wp
npm install
npm run autoblog:dry
```
Genera preview JSON en `logs/dry-run-{slug}.json` con estructura del post (title, slug, content preview, tags, metaDescription) sin llamar a Claude ni a WP.

### 6.2 Generar 1 post real local (status=draft)

```bash
cd autoblog-wp
ANTHROPIC_API_KEY=sk-ant-... \
WP_URL=https://cayco.mx/blog \
WP_USERNAME=autoblog-bot \
WP_APP_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx" \
npm run autoblog
```
Crea el post como BORRADOR en WP. Para revisar: WP Admin → Posts → Drafts.

### 6.3 Trigger manual GitHub Actions

GitHub → Actions → **Autoblog WP Cayco** → Run workflow:
- **count**: 1 (default)
- **cluster**: filtrar opcional
- **status**: `draft` (default) o `publish`
- **dry_run**: ☐ test sin escribir

### 6.4 Cron automático

`0 14 */3 * *` UTC → cada 3 días, 8:00 AM hora centro de México.

### 6.5 Modos de publicación recomendados

- **Mes 1**: `status: draft` — revisión humana antes de publicar (1 click "Publicar" en WP)
- **Mes 2+**: cuando confíes en la calidad → cambiar default a `publish`

### 6.6 Post-publicación (manual, ~1 min por post)

Yoast regenera sitemap automáticamente. Pasos opcionales para acelerar indexación:

1. **Search Console** → Inspección de URL → pegar URL del post nuevo → "Solicitar indexación"
2. Compartir en redes sociales (Facebook, LinkedIn) — Cayco ya tiene presencia activa

---

## 7. Costos

- **~$0.09 USD por post** (Claude Sonnet 4.5, ~2000 palabras)
- 1 post cada 3 días = 10/mes × $0.09 = **~$0.90 USD/mes ≈ ~$11 USD/año**

---

## 8. Diferencias vs autoblog estático (Miracle)

| Aspecto | Miracle (estático) | Cayco (WordPress) |
|---|---|---|
| Salida | Archivo HTML completo en repo | POST a REST API |
| Template | Article-template.html con placeholders | No template — WP usa el theme |
| Imagen featured | Pool fijo en `/assets/images/` | (próxima iteración: subir vía /media) |
| Marker en blog index | `<!-- AUTOBLOG_INSERT_HERE -->` | No existe — WP regenera índices |
| Sitemap | Update manual del XML | Yoast regenera automáticamente |
| Schema JSON-LD | Inyectado en template | Yoast emite Article + Breadcrumb; FAQPage inline |
| Deploy | FTP/FTPS a cPanel | Innecesario — POST API |
| Edición posterior | Re-generar y re-deployear | Editor WP normal |
| Schedule | Inmediato al deploy | Nativo: status=future con date |
| Borrador | No existe | status=draft (revisión humana) |

---

## 9. Mantenimiento

### 9.1 Ampliar pool de tópicos

Editar `data/topics-pool.json` y agregar:
```json
{ "cluster": "tecnico-normativo", "slug": "nuevo-slug-unico", "title": "Título", "keywords": ["kw1", "kw2"], "branchHint": null }
```
Reglas:
- `slug` único, kebab-case sin acentos
- `cluster` debe existir en clusters.json
- `branchHint`: id de sucursal o `null`

### 9.2 Cambiar frecuencia del cron

Editar `.github/workflows/autoblog-wp.yml` línea del cron.

### 9.3 Ajustar persona del prompt

Editar `scripts/prompts.js`:
- `BASE_PERSONA` → voz global
- `CLUSTER_PROMPT_OVERRIDES[id]` → enfoque por cluster

### 9.4 Imágenes featured (próxima iteración)

Hoy los posts se crean sin `featured_media`. Para agregar:
1. Subir un pool de imágenes a Media Library de WP manualmente (ej. 15 fotos de obras Cayco)
2. Anotar IDs de cada imagen
3. Agregar `imageIds: [123, 456, 789, ...]` al script
4. `pickImage()` rota entre IDs y se pasa como `featured_media` en el POST

---

## 10. Troubleshooting

| Síntoma | Causa | Solución |
|---|---|---|
| `WP API 401 en /posts` | App Password mal | Regenerar en WP Admin |
| `WP API 403 en /posts` | User sin permisos | Cambiar rol a Editor o Administrator |
| `WP API 400 slug already exists` | Slug duplicado | El script lo evita con `getExistingSlugsFromWp()` |
| `No se pudo parsear JSON` | Claude devolvió texto suelto | Re-correr |
| `Body muy corto` | Claude truncó | Subir MAX_TOKENS o ajustar prompt |
| Tags no se crean | User sin `manage_categories` | Cambiar rol |

---

**FIN**
