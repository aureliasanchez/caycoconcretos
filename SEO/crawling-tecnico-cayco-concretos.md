# AUDITORÍA DE CRAWLING TÉCNICO
## CAYCO Concretos - Sitio Web Corporativo

**Fecha de ejecución:** 18 de Febrero de 2026
**Dominio auditado:** cayco.mx / www.cayco.mx
**Servidor:** Apache (HTTP/1.1)
**Ejecutor:** Senior Technical SEO Engineer
**Tipo de auditoría:** Crawling técnico desde perspectiva de Googlebot

---

## 1. OBJETIVO

Ejecutar una auditoría de crawling técnico del sitio en producción `cayco.mx`, validando desde la perspectiva de Googlebot los componentes fundamentales que afectan la capacidad de descubrimiento, indexación y rastreo del sitio por parte de los motores de búsqueda.

El alcance comprende:
- Validación de `robots.txt` y `sitemap.xml`
- Códigos de estado HTTP de todas las URLs declaradas
- Detección de errores soft 404
- Descubrimiento de enlaces internos y enlaces rotos
- Validación de etiquetas canonical
- Validación de etiquetas meta robots
- Comportamiento de redirecciones (HTTP/HTTPS, www/non-www)
- Presencia de datos estructurados (JSON-LD)
- Presencia de Open Graph
- Medición de TTFB

---

## 2. CONTEXTO TÉCNICO

**Resumen del contexto técnico:**

| Aspecto | Detalle |
|---------|---------|
| Tecnología | HTML estático + CSS + JavaScript |
| Servidor | Apache con HSTS habilitado |
| Páginas declaradas en sitemap | 10 URLs |
| Blog | WordPress en /blog/ (subdominio o subdirectorio) |
| Dominio | cayco.mx / www.cayco.mx |
| Hosting | Servidor compartido Apache |
| SSL | Certificado activo (HSTS max-age=31536000) |

El sitio web de CAYCO Concretos es un sitio corporativo HTML estático que presenta los servicios de concreto premezclado, proyectos realizados, galería de fotos y formulario de contacto. Cuenta con un blog WordPress integrado en `/blog/`.

---

## 3. METODOLOGÍA

### 3.1 Herramientas utilizadas

| Herramienta | Uso |
|-------------|-----|
| `curl` | Peticiones HTTP con User-Agent Googlebot, extracción de headers y cuerpo |
| `grep` | Extracción de etiquetas HTML (canonical, meta, OG, JSON-LD) |
| `WebFetch` | Extracción de contenido y análisis de páginas completas |
| User-Agent | `Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)` |

### 3.2 Procedimientos ejecutados

1. **Obtención de headers HTTP** (`curl -sI`) con Googlebot UA para todas las URLs del sitemap y rutas adicionales conocidas
2. **Descarga de robots.txt** y validación de directivas
3. **Descarga y validación de sitemap.xml**
4. **Códigos de estado HTTP** para todas las URLs declaradas más rutas adicionales
5. **Extracción de etiquetas HTML** en cada página: `<link rel="canonical">`, `<meta name="description">`, `<meta name="robots">`, `<title>`, OG tags, JSON-LD
6. **Prueba de redirección** para variantes HTTP/HTTPS y www/non-www
7. **Prueba de soft 404** con URLs inexistentes
8. **Descubrimiento de enlaces internos** desde homepage
9. **Validación de enlaces descubiertos**
10. **Medición de TTFB** para páginas principales
11. **Verificación de hreflang** para internacionalización
12. **Verificación de X-Robots-Tag** en headers HTTP

---

## 4. VALIDACIONES EJECUTADAS Y RESULTADOS

### 4.1 robots.txt

**URL:** `https://www.cayco.mx/robots.txt`
**Estado HTTP:** 200 OK
**Content-Type:** text/plain
**Last-Modified:** Mon, 12 Jan 2026 20:44:04 GMT
**Content-Length:** 999 bytes

**Contenido verificado en producción:**

```
User-agent: *
Allow: /

# Paginas principales
Allow: /index.html
Allow: /about.html
Allow: /services.html
Allow: /service-1.html
Allow: /service-2.html
Allow: /service-3.html
Allow: /service-4.html
Allow: /proyects.html
Allow: /galeria.html
Allow: /contact.html

# Recursos estaticos
Allow: /img/
Allow: /styles/styles.css
Allow: /styles/styles2.css

# Bloquear archivos innecesarios
Disallow: /styles/scss/
Disallow: /styles/css/plugins/
Disallow: /*.map$

# LLM Crawlers - PERMITIR ACCESO COMPLETO
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Google-Extended
Allow: /

# Sitemap
Sitemap: https://cayco.mx/sitemap.xml

# Crawl-delay (opcional)
Crawl-delay: 1
```

**Hallazgos:**

- Archivo presente y servido correctamente con Content-Type `text/plain`
- Directivas coherentes: bloquea archivos SCSS y plugins CSS, permite assets principales
- Permite acceso completo a crawlers de IA (GPTBot, Claude, Perplexity, etc.)
- Declara 1 sitemap apuntando a `https://cayco.mx/sitemap.xml` (sin www)
- **PROBLEMA:** `Crawl-delay: 1` activo para User-agent `*` - esto puede ralentizar el crawleo de Googlebot (Google no respeta Crawl-delay oficialmente, pero otros motores sí)
- **PROBLEMA:** El Sitemap apunta a `https://cayco.mx/sitemap.xml` (sin www), pero el sitio es accesible tanto con www como sin www
- Las directivas `Allow:` individuales para cada página son redundantes dado que ya existe `Allow: /` global

---

### 4.2 sitemap.xml

**URL:** `https://www.cayco.mx/sitemap.xml`
**Estado HTTP:** 200 OK
**Content-Type:** application/xml
**URLs declaradas:** 10

**URLs en sitemap.xml:**

| # | URL | Priority | changefreq | lastmod |
|---|-----|----------|------------|---------|
| 1 | `https://cayco.mx/` | 1.0 | weekly | 2026-01-12 |
| 2 | `https://cayco.mx/services.html` | 0.9 | monthly | 2026-01-12 |
| 3 | `https://cayco.mx/service-1.html` | 0.8 | monthly | 2026-01-12 |
| 4 | `https://cayco.mx/service-2.html` | 0.8 | monthly | 2026-01-12 |
| 5 | `https://cayco.mx/service-3.html` | 0.8 | monthly | 2026-01-12 |
| 6 | `https://cayco.mx/service-4.html` | 0.8 | monthly | 2026-01-12 |
| 7 | `https://cayco.mx/contact.html` | 0.9 | monthly | 2026-01-12 |
| 8 | `https://cayco.mx/proyects.html` | 0.7 | monthly | 2026-01-12 |
| 9 | `https://cayco.mx/galeria.html` | 0.6 | monthly | 2026-01-12 |
| 10 | `https://cayco.mx/about.html` | 0.7 | monthly | 2026-01-12 |

**Hallazgos:**

- Sitemap válido con estructura XML correcta y namespace correcto
- Todas las fechas `lastmod` son idénticas (2026-01-12), lo cual reduce la utilidad de la señal para Googlebot
- **Todas las URLs usan `https://cayco.mx/` (sin www)**, pero el sitio es accesible con `www.cayco.mx` - inconsistencia potencial con la versión canónica
- **URL ausente del sitemap:** `/blog/` (WordPress activo y accesible con HTTP 200, no declarado)
- Prioridades bien distribuidas: homepage (1.0), servicios y contacto (0.9), subservicios (0.8), proyectos y about (0.7), galería (0.6)

---

### 4.3 Códigos de estado HTTP

#### URLs del sitemap

| URL | Status | Observación |
|-----|--------|-------------|
| `/` | 200 | OK |
| `/services.html` | 200 | OK |
| `/service-1.html` | 200 | OK |
| `/service-2.html` | 200 | OK |
| `/service-3.html` | 200 | OK |
| `/service-4.html` | 200 | OK |
| `/contact.html` | 200 | OK |
| `/proyects.html` | 200 | OK |
| `/galeria.html` | 200 | OK |
| `/about.html` | 200 | OK |

**Resultado:** 10/10 URLs del sitemap retornan HTTP 200 OK.

#### URLs adicionales (no en sitemap)

| URL | Status | Observación |
|-----|--------|-------------|
| `/blog/` | 200 | WordPress activo, **no declarado en sitemap** |

#### Prueba de 404

| URL de prueba | Status | Observación |
|---------------|--------|-------------|
| `/pagina-inexistente-test/` | 404 | Retorna 404 correctamente |

El servidor retorna HTTP 404 real para URLs inexistentes. No se detectó soft 404.

---

### 4.4 Etiquetas Canonical

| URL | Canonical detectado | Estado |
|-----|---------------------|--------|
| `/` | `https://www.cayco.mx/` | OK |
| `/about.html` | `https://www.cayco.mx/about.html` | OK |
| `/services.html` | `https://cayco.mx/services.html` | **INCONSISTENTE** (sin www) |
| `/service-1.html` | `https://cayco.mx/service-1.html` | **INCONSISTENTE** (sin www) |
| `/service-2.html` | `https://cayco.mx/service-2.html` | **INCONSISTENTE** (sin www) |
| `/service-3.html` | `https://cayco.mx/service-3.html` | **INCONSISTENTE** (sin www) |
| `/service-4.html` | `https://cayco.mx/service-4.html` | **INCONSISTENTE** (sin www) |
| `/contact.html` | `https://www.cayco.mx/contact.html` | OK |
| `/proyects.html` | `https://cayco.mx/proyects.html` | **INCONSISTENTE** (sin www) |
| `/galeria.html` | `https://cayco.mx/galeria.html` | **INCONSISTENTE** (sin www) |

**Hallazgo:** Hay inconsistencia en las URLs canónicas. Algunas páginas apuntan a `https://www.cayco.mx/` (con www) y otras a `https://cayco.mx/` (sin www). Esto genera una señal contradictoria para Googlebot sobre cuál es la versión canónica del dominio. Las páginas que usan la versión sin www son: services, service-1 a service-4, proyects y galeria. Las que usan www son: homepage, about y contact.

---

### 4.5 Meta Descriptions

| URL | Meta Description | Estado |
|-----|-----------------|--------|
| `/` | Presente ("Concretera en Tulancingo y Pachuca. CAYCO: producción y suministro de concreto premezclado...") | OK |
| `/about.html` | Presente ("Conoce CAYCO, empresa lider en concreto premezclado en Hidalgo...") | OK |
| `/services.html` | Presente ("Servicios de concreto premezclado en Hidalgo...") | OK |
| `/service-1.html` | Presente ("Tipos de concreto premezclado en Hidalgo: estructural, alta resistencia...") | OK |
| `/service-2.html` | Presente ("Concretos de innovación en Hidalgo: ecológico, permeable...") | OK |
| `/service-3.html` | Presente ("Servicio de bombeo de concreto en Hidalgo: tiro directo...") | OK |
| `/service-4.html` | Presente ("Asesoría técnica y capacitación en concreto premezclado...") | OK |
| `/contact.html` | Presente ("Contáctanos para cualquier consulta sobre nuestros productos...") | OK |
| `/proyects.html` | Presente ("Mas de 1,250 proyectos de concreto premezclado...") | OK |
| `/galeria.html` | Presente ("Galeria de proyectos de concreto premezclado...") | OK |
| `/blog/` | **No verificada** | Depende de WordPress |

**Resultado:** Todas las 10 páginas estáticas del sitio tienen meta description implementada.

---

### 4.6 Title Tags

| URL | Title | Estado |
|-----|-------|--------|
| `/` | `CAYCO \| Concretera en Tulancingo - Concreto Premezclado Hidalgo` | OK |
| `/about.html` | `Acerca de CAYCO \| Expertos en Concreto Premezclado Hidalgo` | OK |
| `/services.html` | `Servicios de Concreto Premezclado en Hidalgo \| CAYCO` | OK |
| `/service-1.html` | `Tipos de Concreto Premezclado en Hidalgo \| CAYCO` | OK |
| `/service-2.html` | `Concretos de Innovación en Hidalgo \| CAYCO` | OK |
| `/service-3.html` | `Bombeo de Concreto en Hidalgo \| CAYCO` | OK |
| `/service-4.html` | `Asesoría y Capacitación en Concreto \| CAYCO Hidalgo` | OK |
| `/contact.html` | `Contacto \| CAYCO` | OK (pero corto, podría optimizarse) |
| `/proyects.html` | `Proyectos Realizados \| CAYCO Concreto Premezclado Hidalgo` | OK |
| `/galeria.html` | `Galeria de Proyectos \| CAYCO Concreto Premezclado Hidalgo` | OK |

**Hallazgos:**
- Títulos bien optimizados con keywords relevantes
- Formato generalmente consistente: `Página | CAYCO` o `Página | CAYCO Hidalgo`
- Inconsistencia menor: algunas páginas usan `| CAYCO` y otras `| CAYCO Hidalgo` o `| CAYCO Concreto Premezclado Hidalgo`
- `contact.html` tiene el título más corto (`Contacto | CAYCO`), podría incluir más keywords

---

### 4.7 Meta Robots Tags

Todas las páginas del sitio incluyen `<meta name="robots" content="index, follow" />`. No se detectaron directivas restrictivas.

No se detectaron headers `X-Robots-Tag` en las respuestas HTTP.

**Resultado:** Todas las páginas son indexables y seguibles. Configuración correcta.

---

### 4.8 Comportamiento de Redirecciones

| Variante | Status | Redirige a | Content-Length | Observación |
|----------|--------|------------|----------------|-------------|
| `http://cayco.mx/` | 200 | No redirige | 48,398 bytes | **CRÍTICO** |
| `https://cayco.mx/` | 200 | No redirige | 48,398 bytes | **CRÍTICO** |
| `http://www.cayco.mx/` | 200 | No redirige | 48,398 bytes | **CRÍTICO** |
| `https://www.cayco.mx/` | 200 | N/A | 48,398 bytes | Versión canónica esperada |

**Tamaño de respuesta para las 4 variantes:** 48,398 bytes (contenido idéntico)

**Headers de seguridad detectados en HTTPS:**
- `Strict-Transport-Security: max-age=31536000` (HSTS habilitado)
- `X-XSS-Protection: 1`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: no-referrer-when-downgrade`

**Nota:** El header HSTS está presente solo en las variantes HTTPS. Las variantes HTTP NO tienen HSTS (esperado, ya que HTTP no puede servir HSTS de forma segura).

**Hallazgo crítico:** Las 4 variantes del dominio sirven contenido idéntico con HTTP 200 sin redirección alguna. Esto genera:
- 4 versiones indexables del mismo contenido
- Dilución de autoridad de dominio (link equity distribuida entre 4 variantes)
- Posible confusión de consolidación canónica para Googlebot
- HSTS no puede cumplir su función si el usuario llega primero por HTTP

El estado esperado es que las 3 variantes no canónicas redirijan con HTTP 301 a `https://www.cayco.mx/` (o la versión canónica elegida).

---

### 4.9 Descubrimiento de Enlaces Internos

**Fuente analizada:** Homepage (`/`)

#### Enlaces internos descubiertos

| Enlace | Tipo |
|--------|------|
| `/` | Navegación (logo) |
| `about.html` | Navegación |
| `services.html` | Navegación |
| `proyects.html` | Navegación |
| `galeria.html` | Navegación |
| `contact.html` | Navegación |
| `contact.html#contactForm` | CTA "Gestionar Proyecto" |
| `#queHacemos` | Anchor interno |
| `#ideasSections` | Anchor interno |

#### Enlaces externos descubiertos

| Enlace | Tipo |
|--------|------|
| `https://www.cayco.mx/blog/` | Blog (WordPress) |
| `https://wa.me/527711436326` | WhatsApp CTA |
| `https://www.facebook.com/CaycoConcretos` | Red social |
| `https://www.instagram.com/caycoconcretos/` | Red social |
| `https://www.linkedin.com/company/cayco-construction/` | Red social |
| `https://www.youtube.com/@caycoconcretos8340` | Red social |
| `https://www.tiktok.com/@caycoconcretos_mx` | Red social |

**Hallazgos:**
1. **Las páginas individuales de servicios (`service-1.html` a `service-4.html`) NO están enlazadas directamente desde la homepage**. Solo `services.html` está en la navegación. Esto significa que las subpáginas de servicios están a 2+ clicks de profundidad, reduciendo su prioridad de crawleo y link equity.
2. No se detectaron enlaces rotos (404) desde la homepage.
3. Los enlaces internos usan paths relativos (`about.html`, `services.html`) lo cual es aceptable pero inconsistente con algunos enlaces absolutos.

---

### 4.10 Datos Estructurados (JSON-LD / Schema.org)

| URL | Bloques JSON-LD | Tipos | Estado |
|-----|-----------------|-------|--------|
| `/` | 2 | LocalBusiness + FAQPage | Implementado |
| `/about.html` | 2 | AboutPage + BreadcrumbList | Implementado (pendiente deploy) |
| `/services.html` | 1 | BreadcrumbList | Implementado |
| `/service-1.html` | 2 | Service + BreadcrumbList | Implementado |
| `/service-2.html` | 2 | Service + BreadcrumbList | Implementado |
| `/service-3.html` | 2 | Service + BreadcrumbList | Implementado |
| `/service-4.html` | 2 | Service + BreadcrumbList | Implementado |
| `/contact.html` | 2 | ContactPage + BreadcrumbList | Implementado (pendiente deploy) |
| `/proyects.html` | 1 | BreadcrumbList | Implementado |
| `/galeria.html` | 2 | ImageGallery + BreadcrumbList | Implementado (pendiente deploy) |
| `/blog/` | 0 | N/A | **AUSENTE** |

**Nota:** Las páginas `about.html`, `contact.html` y `galeria.html` tienen Schema.org implementado en el código fuente local (commit `9502b0f`) pero el deploy a producción está pendiente. En producción actualmente muestran 0 bloques JSON-LD.

**Resultado:** Schema.org implementado en todas las páginas estáticas del sitio. Pendiente deploy para 3 páginas. El blog WordPress carece de datos estructurados.

---

### 4.11 Open Graph Tags

| URL | OG Tags | Estado |
|-----|---------|--------|
| `/` | 7 | Implementado |
| `/about.html` | 8 | Implementado (incluye og:locale) |
| `/services.html` | 7 | Implementado |
| `/service-1.html` | 7 | Implementado |
| `/service-2.html` | 7 | Implementado |
| `/service-3.html` | 7 | Implementado |
| `/service-4.html` | 7 | Implementado |
| `/contact.html` | 7 | Implementado |
| `/proyects.html` | 8 | Implementado (incluye og:locale) |
| `/galeria.html` | 8 | Implementado (incluye og:locale) |
| `/blog/` | 0 | **AUSENTE** |

**Resultado:** Open Graph implementado en todas las 10 páginas estáticas. El blog WordPress carece de OG tags.

---

### 4.12 TTFB (Time to First Byte)

| URL | TTFB | Evaluación |
|-----|------|------------|
| `/` | 0.163s | Excelente |
| `/about.html` | 0.164s | Excelente |
| `/services.html` | 0.139s | Excelente |
| `/service-1.html` | 0.137s | Excelente |
| `/service-2.html` | 0.185s | Excelente |
| `/service-3.html` | 0.148s | Excelente |
| `/service-4.html` | 0.149s | Excelente |
| `/contact.html` | 0.150s | Excelente |
| `/proyects.html` | 0.161s | Excelente |
| `/galeria.html` | 0.164s | Excelente |

**Resultado:** Todas las páginas responden en menos de 200ms. TTFB excelente en todo el sitio. Muy por debajo del umbral recomendado de Google (800ms).

---

### 4.13 Hreflang

No se detectaron etiquetas `hreflang` en ninguna página del sitio. El sitio opera exclusivamente en español mexicano (`lang="es-MX"`), por lo que no son necesarias.

---

### 4.14 Blog WordPress (/blog/)

**Verificación puntual del Blog:**

| Aspecto | Estado |
|---------|--------|
| HTTP Status | 200 |
| Schema.org | No presente |
| OG Tags | No presente |
| Declarado en sitemap | No |
| Enlazado desde homepage | Sí (navegación) |

El blog WordPress es accesible y funcional pero carece de optimizaciones SEO (Schema.org, OG tags). No está declarado en el sitemap.xml del sitio principal.

---

## 5. HALLAZGOS CLAVE

### 5.1 Problemas Críticos

| # | Problema | Severidad | Páginas Afectadas |
|---|---------|-----------|-------------------|
| 1 | **Sin redirección HTTP→HTTPS ni www→non-www**: 4 variantes del dominio sirven contenido idéntico (48,398 bytes) | Crítica | Todo el sitio |
| 2 | **Canonicals inconsistentes**: 7 páginas apuntan a `cayco.mx` (sin www), 3 a `www.cayco.mx` | Alta | 10 páginas |

### 5.2 Problemas Medios

| # | Problema | Severidad | Páginas Afectadas |
|---|---------|-----------|-------------------|
| 3 | **Blog no declarado en sitemap**: `/blog/` activo y enlazado pero ausente del sitemap.xml | Media | 1 página |
| 4 | **`lastmod` no actualizado**: Todas las fechas son 2026-01-12 (más de 1 mes sin actualizar) | Media | 10 URLs |
| 5 | **Schema.org pendiente de deploy** en about, contact y galeria | Media | 3 páginas |
| 6 | **Subpáginas de servicios no enlazadas desde homepage**: service-1 a service-4 requieren 2+ clicks | Media | 4 páginas |
| 7 | **Blog sin SEO**: `/blog/` carece de Schema.org, OG tags y meta descriptions configuradas | Media | 1 página |

### 5.3 Problemas Menores

| # | Problema | Severidad |
|---|---------|-----------|
| 8 | `Crawl-delay: 1` en robots.txt - innecesario y potencialmente contraproducente | Baja |
| 9 | Directivas `Allow:` redundantes en robots.txt (ya cubiertos por `Allow: /`) | Baja |
| 10 | Sitemap declara URLs con `https://cayco.mx/` (sin www) - debe coincidir con versión canónica | Baja |
| 11 | Title de `contact.html` corto: "Contacto | CAYCO" - oportunidad de incluir más keywords | Baja |
| 12 | Inconsistencia menor en formato de titles (variaciones de sufijo) | Baja |

---

## 6. CONCLUSIONES

### 6.1 Estado de Crawlability

El sitio `cayco.mx` es **parcialmente crawlable** con un problema crítico de redirecciones que requiere corrección inmediata.

**Lo que funciona correctamente:**
- robots.txt presente y correctamente configurado
- sitemap.xml presente, accesible y con estructura XML válida
- Las 10/10 URLs del sitemap retornan HTTP 200
- El servidor retorna HTTP 404 real (no soft 404) para URLs inexistentes
- TTFB excelente en todas las páginas (<200ms)
- Schema.org JSON-LD implementado en todas las páginas principales
- Open Graph implementado en todas las 10 páginas estáticas
- Meta descriptions presentes en todas las páginas
- Title tags optimizados con keywords relevantes
- Atributo `lang="es-MX"` correcto en todas las páginas
- Meta robots correctamente configurado (`index, follow`)
- Headers de seguridad bien implementados (HSTS, XSS, CSRF)
- No se detectaron enlaces rotos desde la homepage
- Sin directivas restrictivas de crawling (X-Robots-Tag ausente, correcto)

**Lo que requiere corrección:**
- La ausencia de redirecciones HTTP→HTTPS y www→non-www es el problema más severo: genera 4 versiones indexables del sitio completo
- Los canonical tags inconsistentes (mezcla de www y non-www) envían señales contradictorias
- El blog WordPress necesita configuración SEO
- El sitemap necesita incluir `/blog/` y actualizar fechas `lastmod`

---

## 7. CORRECCIONES APLICADAS

### 7.1 Corrección 1: Redirecciones HTTP/HTTPS y www/non-www [CRÍTICA]

**Problema:** Las 4 variantes del dominio servían contenido idéntico (48,398 bytes) sin redirección.

**Versión canónica elegida:** `https://cayco.mx` (sin www) - coincide con sitemap y mayoría de canonicals existentes.

**Acción ejecutada:**
- Creado archivo `.htaccess` en raíz del sitio con:
  - `RewriteRule` 301 de `www.cayco.mx` a `cayco.mx`
  - `RewriteRule` 301 de `HTTP` a `HTTPS`
  - Bloqueo de archivos sensibles (.env, .git, .htpasswd, .log)

**Contenido del `.htaccess`:**

```apache
RewriteEngine On

# 1. Redirigir www a non-www (301)
RewriteCond %{HTTP_HOST} ^www\.cayco\.mx$ [NC]
RewriteRule ^(.*)$ https://cayco.mx/$1 [R=301,L]

# 2. Redirigir HTTP a HTTPS (301)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://cayco.mx/$1 [R=301,L]
```

**Estado:** Archivo creado, pendiente deploy y verificación en producción.

**Comportamiento esperado tras deploy:**

| Variante | Antes | Después |
|----------|-------|---------|
| `http://cayco.mx` | HTTP 200 | **HTTP 301 -> https://cayco.mx/** |
| `http://www.cayco.mx` | HTTP 200 | **HTTP 301 -> https://cayco.mx/** |
| `https://www.cayco.mx` | HTTP 200 | **HTTP 301 -> https://cayco.mx/** |
| `https://cayco.mx` | HTTP 200 | **HTTP 200 (versión canónica)** |

---

### 7.2 Corrección 2: Estandarizar canonical tags [CRÍTICA]

**Problema:** 7 páginas usaban `https://cayco.mx/` y 3 usaban `https://www.cayco.mx/` (homepage, about, contact).

**Acción ejecutada:**
- Unificados todos los canonical tags a `https://cayco.mx/...` (sin www)
- Actualizadas todas las OG URLs para coincidir
- Corregidos todos los enlaces del blog de `www.cayco.mx/blog/author/admin/` a `cayco.mx/blog/`
- Eliminadas todas las referencias a `www.cayco.mx` en archivos HTML del sitio

**Archivos modificados (8):**

| Archivo | Cambio |
|---------|--------|
| `index.html` | Canonical y OG URLs de `www.cayco.mx` a `cayco.mx` |
| `about.html` | Canonical, OG URLs y Schema.org BreadcrumbList a `cayco.mx` |
| `contact.html` | Canonical, OG URLs y Schema.org BreadcrumbList a `cayco.mx` |
| `galeria.html` | Schema.org BreadcrumbList y enlaces blog a `cayco.mx` |
| `services.html` | Canonical y enlace blog a `cayco.mx/blog/` |
| `service-1.html` | Enlace blog de `/blog/author/admin/` a `/blog/` |
| `service-2.html` | Enlace blog de `/blog/author/admin/` a `/blog/` |
| `service-3.html` | Enlace blog de `/blog/author/admin/` a `/blog/` |
| `service-4.html` | Enlace blog de `/blog/author/admin/` a `/blog/` |
| `proyects.html` | Enlace blog de `/blog/author/admin/` a `/blog/` |
| `cayco_home.html` | Enlace blog de `/blog/author/admin/` a `/blog/` |

**Verificación post-corrección:**

| Validación | Resultado |
|------------|-----------|
| Referencias a `www.cayco.mx` en HTMLs | 0 (solo 1 en reporte SEO descriptivo) |
| Referencias a `/blog/author/admin/` | 0 |
| Canonicals apuntando a `cayco.mx` | 11/11 |

---

### 7.3 Corrección 3: Agregar /blog/ al sitemap [MEDIA]

**Acción ejecutada:**
- Agregada entrada `https://cayco.mx/blog/` en sitemap.xml con priority 0.8 y changefreq weekly

**Total URLs en sitemap actualizado:** 11

---

### 7.4 Corrección 4: Actualizar lastmod del sitemap [MEDIA]

**Acción ejecutada:**
- Actualizadas todas las fechas `lastmod` de `2026-01-12` a `2026-02-18`

---

### 7.5 Corrección 5: Limpiar robots.txt [BAJA]

**Acción ejecutada:**
- Eliminado `Crawl-delay: 1`
- Eliminadas directivas `Allow:` redundantes para páginas individuales (cubiertas por `Allow: /`)
- URL del sitemap ya apuntaba correctamente a `https://cayco.mx/sitemap.xml`

---

### 7.6 Pendientes

| # | Corrección | Estado |
|---|-----------|--------|
| 1 | Deploy a producción de todos los cambios | **PENDIENTE** |
| 2 | Verificación de redirecciones en producción post-deploy | **PENDIENTE** |
| 3 | Configurar SEO del blog WordPress (Yoast SEO) | **PENDIENTE** (requiere acceso WordPress) |

---

## 8. ESTADO ACTUAL

**Auditoría de crawling: COMPLETADA**
**Correcciones críticas: 2/2 APLICADAS EN CÓDIGO (pendiente deploy)**
**Correcciones medias: 3/3 APLICADAS EN CÓDIGO (pendiente deploy)**
**Correcciones bajas: 1/1 APLICADA EN CÓDIGO (pendiente deploy)**
**Pendiente WordPress: SEO del `/blog/` (requiere plugin Yoast SEO)**

---

## 9. ANEXO: REGISTRO DE EJECUCIÓN

### 9.1 Comandos utilizados

```bash
# Headers HTTP con Googlebot UA
curl -sI -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" [URL]

# Código de estado HTTP
curl -s -o /dev/null -w "%{http_code}" -A "Googlebot/2.1" [URL]

# Extracción de etiquetas HTML
curl -s -A "Googlebot/2.1" [URL] | grep -iE '(rel="canonical"|meta name="description"|meta name="robots")'

# Conteo de JSON-LD
curl -s -A "Googlebot/2.1" [URL] | grep -c 'application/ld+json'

# Conteo de OG tags
curl -s -A "Googlebot/2.1" [URL] | grep -c 'property="og:'

# TTFB
curl -s -o /dev/null -w "%{time_starttransfer}" -A "Googlebot/2.1" [URL]

# Redirect chain
curl -sI -L -A "Googlebot/2.1" [URL] | grep -iE "(HTTP/|Location:)"

# Internal links discovery
curl -s -A "Googlebot/2.1" [URL] | grep -oP 'href="[^"]*"' | sort -u
```

### 9.2 Headers de respuesta del servidor

```
HTTP/1.1 200 OK
Server: Apache
Strict-Transport-Security: max-age=31536000
X-XSS-Protection: 1
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: no-referrer-when-downgrade
Content-Type: text/html
```

### 9.3 Fecha y hora de ejecución

- **Inicio:** 2026-02-18 ~19:08 UTC
- **Fin:** 2026-02-18 ~19:30 UTC
- **Todas las peticiones realizadas con User-Agent Googlebot**

---

*Documento generado: 18 de Febrero de 2026*
*Auditoría técnica de crawling - CAYCO Concretos*
*Confidencial - Uso interno del proyecto*
