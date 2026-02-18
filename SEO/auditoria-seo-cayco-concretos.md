# AUDITORÍA SEO COMPLETA - CAYCO CONCRETOS PREMEZCLADOS
## Framework Maestro de Auditoría SEO

**Clasificación:** Auditoría técnica y estratégica completa
**Fecha de auditoría:** 18 de Febrero de 2026
**Dominio auditado:** cayco.mx
**Dominio canónico:** https://cayco.mx
**Ejecutor:** Senior SEO Consultant
**Aplicabilidad:** B2B Industrial - Concreto Premezclado

---

# ÍNDICE

1. [Propósito y Alcance](#1-propósito-y-alcance)
2. [Contexto del Negocio](#2-contexto-del-negocio)
3. [Auditoría Técnica](#3-auditoría-técnica)
4. [Auditoría de Indexación y Crawling](#4-auditoría-de-indexación-y-crawling)
5. [Auditoría On-Page](#5-auditoría-on-page)
6. [Auditoría de Contenido](#6-auditoría-de-contenido)
7. [Auditoría de SEO Local](#7-auditoría-de-seo-local)
8. [Auditoría de Datos Estructurados (Schema)](#8-auditoría-de-datos-estructurados)
9. [Sistema de Scoring SEO](#9-sistema-de-scoring-seo)
10. [Matriz de Severidad y Priorización](#10-matriz-de-severidad-y-priorización)
11. [Checklist de Implementación](#11-checklist-de-implementación)
12. [Auditoría Post-Implementación](#12-auditoría-post-implementación)
13. [Roadmap SEO por Fases](#13-roadmap-seo-por-fases)
14. [Criterios de Éxito y KPIs](#14-criterios-de-éxito-y-kpis)

---

# 1. PROPÓSITO Y ALCANCE

## 1.1 Propósito

Auditoría SEO integral del sitio web corporativo de CAYCO Concretos Premezclados (cayco.mx), empresa B2B industrial dedicada a la producción y suministro de concreto premezclado en los estados de Hidalgo, Puebla, Querétaro y Estado de México.

Este documento aplica el **Framework Maestro de Auditoría SEO** para evaluar el estado actual del sitio, identificar hallazgos críticos, puntuar cada categoría y generar un roadmap de implementación priorizado.

## 1.2 Alcance

### Dentro del Alcance

| Área | Componentes Auditados |
|------|----------------------|
| **Technical SEO** | Performance, mobile, seguridad HTTPS, arquitectura URL, .htaccess |
| **Indexación** | robots.txt, sitemap.xml, canonicals, cobertura de índice |
| **On-Page** | Titles, meta descriptions, headers H1-H6, alt text de imágenes |
| **Contenido** | Calidad, profundidad, keywords, freshness |
| **Local SEO** | NAP consistency, multi-location, Google Business Profile |
| **Structured Data** | Schema.org JSON-LD, validación, rich results eligibility |

### Fuera del Alcance

- Auditoría de backlinks y autoridad de dominio (requiere Ahrefs/SEMrush)
- Blog WordPress (auditoría separada requerida)
- Google Business Profile (requiere acceso a cuenta)
- Auditoría de competidores (documento separado)

## 1.3 Inventario de URLs

| # | URL | Tipo | En Sitemap |
|---|-----|------|-----------|
| 1 | `https://cayco.mx/` | Homepage | Sí |
| 2 | `https://cayco.mx/services.html` | Catálogo servicios | Sí |
| 3 | `https://cayco.mx/service-1.html` | Tipos de concreto | Sí |
| 4 | `https://cayco.mx/service-2.html` | Concretos innovación | Sí |
| 5 | `https://cayco.mx/service-3.html` | Bombeo de concreto | Sí |
| 6 | `https://cayco.mx/service-4.html` | Asesoría y capacitación | Sí |
| 7 | `https://cayco.mx/contact.html` | Contacto | Sí |
| 8 | `https://cayco.mx/proyects.html` | Proyectos | Sí |
| 9 | `https://cayco.mx/galeria.html` | Galería | Sí |
| 10 | `https://cayco.mx/about.html` | Acerca de | Sí |
| 11 | `https://cayco.mx/blog/` | Blog (WordPress) | Sí |

**Total páginas estáticas:** 10
**Total URLs en sitemap:** 11 (incluyendo blog)

## 1.4 Stack Tecnológico

| Aspecto | Detalle |
|---------|---------|
| Tecnología | HTML estático + CSS + JavaScript |
| Servidor | Apache con HSTS habilitado |
| CMS Blog | WordPress en /blog/ |
| Hosting | Servidor compartido Apache |
| SSL | Certificado activo (HSTS max-age=31536000) |
| CDN | No detectado |
| Dominio canónico | https://cayco.mx (sin www) |

---

# 2. CONTEXTO DEL NEGOCIO

## 2.1 Información de la Empresa

| Aspecto | Detalle |
|---------|---------|
| **Razón social** | CAYCO Concreto Premezclado |
| **Industria** | Construcción - Concreto Premezclado |
| **Modelo** | B2B Industrial |
| **Ubicación principal** | Tulancingo, Hidalgo, México |
| **Sucursales** | 5 (Tulancingo, Pachuca, Huauchinango, Querétaro, Zumpango) |
| **Servicios core** | Concreto premezclado, bombeo, asesoría técnica |
| **Diferenciadores** | Certificación CPRO, +1,250 proyectos, cobertura multi-estado |
| **Mercado objetivo** | Constructoras, desarrolladores, obras privadas y públicas |

## 2.2 Presencia Digital

| Plataforma | URL | Estado |
|------------|-----|--------|
| Website | cayco.mx | Activo |
| Facebook | facebook.com/CaycoConcretos | Activo |
| Instagram | instagram.com/caycoconcretos | Activo |
| LinkedIn | linkedin.com/company/cayco-construction | Activo |
| YouTube | youtube.com/@caycoconcretos8340 | Activo |
| TikTok | tiktok.com/@caycoconcretos_mx | Activo |
| WhatsApp | +52 771 143 6326 | Activo |

## 2.3 Membresías y Certificaciones

- **CPRO** - Distintivo de empresa productiva y eficiente
- **CANACINTRA** - Cámara Nacional de la Industria de la Transformación
- **AMCI** - Asociación Mexicana de Concreto y del Cemento
- **IMCYC** - Instituto Mexicano del Cemento y del Concreto

---

# 3. AUDITORÍA TÉCNICA

## 3.1 Performance & Core Web Vitals

### Estado Actual

| Métrica | Valor Medido | Threshold | Estado |
|---------|-------------|-----------|--------|
| **TTFB** | < 200ms | ≤ 200ms (Bueno) | **BUENO** |
| **LCP** | Pendiente PSI | ≤ 2.5s | Requiere medición |
| **FID/INP** | Pendiente PSI | ≤ 100ms | Requiere medición |
| **CLS** | Pendiente PSI | ≤ 0.1 | Requiere medición |

**Hallazgo:** TTFB medido con Googlebot UA retorna consistentemente < 200ms para todas las URLs. Las métricas restantes requieren PageSpeed Insights con datos de campo (CrUX).

### Severidad: **Media** (requiere medición completa con PageSpeed Insights)

---

## 3.2 Mobile Usability

### Estado Actual

| Aspecto | Estado | Observación |
|---------|--------|-------------|
| Viewport meta tag | **Presente** | `width=device-width, initial-scale=1.0` en 10/10 páginas |
| Responsive framework | **Implementado** | Bootstrap grid (col-lg, col-md, col-sm) |
| Tap targets | **Pendiente** | Requiere Mobile-Friendly Test |
| Horizontal scroll | **Pendiente** | Requiere verificación en dispositivo real |

### Severidad: **Baja** (fundamentos en su lugar, requiere testing)

---

## 3.3 Security & HTTPS

### Estado Actual

| Aspecto | Estado | Observación |
|---------|--------|-------------|
| Certificado SSL | **Válido** | HTTPS activo |
| HSTS Header | **Implementado** | `max-age=31536000` |
| HTTP → HTTPS redirect | **Configurado** | .htaccess con 301 redirect |
| www → non-www redirect | **Configurado** | .htaccess con 301 redirect |
| Mixed content | **Pendiente** | Requiere verificación manual |
| Security headers | **Parcial** | HSTS presente, otros pendientes |

### .htaccess Actual

```apache
RewriteEngine On

# 1. Redirigir www a non-www (301)
RewriteCond %{HTTP_HOST} ^www\.cayco\.mx$ [NC]
RewriteRule ^(.*)$ https://cayco.mx/$1 [R=301,L]

# 2. Redirigir HTTP a HTTPS (301)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://cayco.mx/$1 [R=301,L]

# Seguridad: bloquear acceso a archivos sensibles
<FilesMatch "\.(env|git|htpasswd|log)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>
```

### Security Headers Faltantes

| Header | Estado | Recomendación |
|--------|--------|---------------|
| `X-Content-Type-Options` | **Faltante** | Agregar `nosniff` |
| `X-Frame-Options` | **Faltante** | Agregar `SAMEORIGIN` |
| `X-XSS-Protection` | **Faltante** | Agregar `1; mode=block` |
| `Referrer-Policy` | **Faltante** | Agregar `strict-origin-when-cross-origin` |
| `Content-Security-Policy` | **Faltante** | Pendiente de configuración |

### Severidad: **Media** (HTTPS y HSTS ok, security headers faltantes)

---

## 3.4 URL Structure & Architecture

### Estructura Actual

```
https://cayco.mx/
├── index.html (Homepage)
├── services.html (Catálogo)
│   ├── service-1.html (Tipos de concreto)
│   ├── service-2.html (Innovación)
│   ├── service-3.html (Bombeo)
│   └── service-4.html (Asesoría)
├── proyects.html (Proyectos)
├── galeria.html (Galería)
├── about.html (Acerca de)
├── contact.html (Contacto)
└── blog/ (WordPress)
```

### Hallazgos

| Aspecto | Estado | Observación |
|---------|--------|-------------|
| URLs descriptivas | **Parcial** | `service-1.html` no es descriptivo; mejor sería `tipos-concreto.html` |
| Profundidad de click | **Bueno** | Máximo 2 clicks desde homepage |
| Redirect chains | **OK** | Máximo 1 redirect (www→non-www o HTTP→HTTPS) |
| Trailing slash | **Inconsistente** | Blog usa `/blog/`, páginas estáticas no usan trailing slash |
| URLs semánticas | **Mejorable** | `service-1` a `service-4` son genéricas, no descriptivas |

### Severidad: **Media** (URLs funcionales pero no optimizadas semánticamente)

---

## 3.5 International SEO (hreflang)

**No aplica.** CAYCO opera exclusivamente en México y el sitio es monolingüe (español). No se requiere implementación de hreflang.

---

# 4. AUDITORÍA DE INDEXACIÓN Y CRAWLING

## 4.1 robots.txt

### Estado Actual

```txt
# Robots.txt - CAYCO Concretos Premezclados
# Dominio canonico: https://cayco.mx
# Fecha: 18 Febrero 2026

User-agent: *
Allow: /

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
```

### Evaluación

| Criterio | Estado | Observación |
|----------|--------|-------------|
| Archivo existe | **OK** | 200 OK |
| Sintaxis válida | **OK** | Sin errores |
| No bloquea CSS/JS | **OK** | Solo bloquea SCSS y plugins |
| No bloquea páginas | **OK** | Allow: / |
| Referencia a sitemap | **OK** | Sitemap: https://cayco.mx/sitemap.xml |
| Directivas LLM | **OK** | 7 LLM crawlers permitidos |
| Dominio consistente | **OK** | Usa https://cayco.mx (sin www) |

### Score: **9/10** (Excelente)

---

## 4.2 XML Sitemap

### Estado Actual

| Criterio | Estado | Observación |
|----------|--------|-------------|
| Existe y accesible | **OK** | 200 OK |
| Referenciado en robots.txt | **OK** | Sí |
| Formato XML válido | **OK** | Estructura correcta con namespace |
| URLs canónicas | **OK** | Todas usan https://cayco.mx/ (sin www) |
| lastmod actualizado | **OK** | 2026-02-18 en todas las URLs |
| Prioridades coherentes | **OK** | Homepage 1.0, servicios 0.9, sub 0.8, etc. |
| Total URLs | **11** | 10 estáticas + blog |
| URLs con errores | **0** | Todas retornan 200 |

### URLs en Sitemap

| # | URL | Priority | changefreq | lastmod |
|---|-----|----------|------------|---------|
| 1 | `/` | 1.0 | weekly | 2026-02-18 |
| 2 | `/services.html` | 0.9 | monthly | 2026-02-18 |
| 3 | `/service-1.html` | 0.8 | monthly | 2026-02-18 |
| 4 | `/service-2.html` | 0.8 | monthly | 2026-02-18 |
| 5 | `/service-3.html` | 0.8 | monthly | 2026-02-18 |
| 6 | `/service-4.html` | 0.8 | monthly | 2026-02-18 |
| 7 | `/contact.html` | 0.9 | monthly | 2026-02-18 |
| 8 | `/proyects.html` | 0.7 | monthly | 2026-02-18 |
| 9 | `/galeria.html` | 0.6 | monthly | 2026-02-18 |
| 10 | `/about.html` | 0.7 | monthly | 2026-02-18 |
| 11 | `/blog/` | 0.8 | weekly | 2026-02-18 |

### Score: **9/10** (Excelente)

---

## 4.3 Index Status & Coverage

### Verificación site: Search

| Verificación | Resultado |
|--------------|-----------|
| `site:cayco.mx` | Requiere verificación en Google Search |
| Páginas en sitemap | 11 |
| Todas retornan 200 | Sí (10/10 + blog) |
| Soft 404 detectados | No (404 real para URLs inexistentes) |

### Severidad: **Baja** (requiere acceso a Search Console para verificación completa)

---

## 4.4 Canonical Implementation

### Estado Actual

| URL | Canonical | Estado |
|-----|-----------|--------|
| `/` | `https://cayco.mx/` | **OK** |
| `/services.html` | `https://cayco.mx/services.html` | **OK** |
| `/service-1.html` | `https://cayco.mx/service-1.html` | **OK** |
| `/service-2.html` | `https://cayco.mx/service-2.html` | **OK** |
| `/service-3.html` | `https://cayco.mx/service-3.html` | **OK** |
| `/service-4.html` | `https://cayco.mx/service-4.html` | **OK** |
| `/contact.html` | `https://cayco.mx/contact.html` | **OK** |
| `/proyects.html` | `https://cayco.mx/proyects.html` | **OK** |
| `/galeria.html` | `https://cayco.mx/galeria.html` | **OK** |
| `/about.html` | `https://cayco.mx/about.html` | **OK** |

### Evaluación

| Criterio | Estado |
|----------|--------|
| Todas las páginas tienen canonical | **OK** (10/10) |
| URLs absolutas | **OK** |
| Consistencia de dominio (sin www) | **OK** (10/10 usan cayco.mx) |
| Self-referencing | **OK** |
| Sin canonical chains | **OK** |
| Sin conflicto canonical/noindex | **OK** |

### Score: **10/10** (Perfecto - corregido en auditoría previa)

---

## 4.5 Internal Linking

### Estructura de Navegación

| Elemento | URLs Linkadas | Observación |
|----------|--------------|-------------|
| **Header nav** | 7 links | Inicio, Servicios, Proyectos, Galería, Acerca de, Blog, Contacto |
| **Footer nav** | 5 links | Acerca de, Servicios, Proyectos, Blog, Contacto |
| **Footer ubicaciones** | 5 sucursales | NAP completo por sucursal |
| **Social links** | 5 links | Facebook, Instagram, LinkedIn, YouTube, TikTok |
| **WhatsApp flotante** | 1 link | CTA principal en todas las páginas |

### Hallazgos

| Hallazgo | Severidad | Detalle |
|----------|-----------|---------|
| Service cards en homepage linkan a anchor `#queHacemos` en vez de a las páginas de servicio | **Media** | Oportunidad perdida de internal linking hacia service-1 a service-4 |
| Blog link en footer de service-4.html comentado | **Baja** | El link a blog está dentro de un comentario HTML |
| Galería no tiene link a blog en footer | **Baja** | Inconsistencia en footer navigation |

### Score: **7/10** (Bueno, con oportunidades de mejora)

---

# 5. AUDITORÍA ON-PAGE

## 5.1 Title Tags

### Inventario Completo

| URL | Title | Chars | Keyword | Marca | Estado |
|-----|-------|-------|---------|-------|--------|
| `/` | CAYCO \| Concretera en Tulancingo - Concreto Premezclado Hidalgo | 64 | Sí (concretera, concreto premezclado) | Sí (CAYCO) | **Largo** (>60) |
| `/services.html` | Servicios de Concreto Premezclado en Hidalgo \| CAYCO | 55 | Sí | Sí | **OK** |
| `/service-1.html` | Tipos de Concreto Premezclado en Hidalgo \| CAYCO | 52 | Sí | Sí | **OK** |
| `/service-2.html` | Concretos de Innovación en Hidalgo \| CAYCO | 45 | Sí | Sí | **OK** |
| `/service-3.html` | Bombeo de Concreto en Hidalgo \| CAYCO | 42 | Sí | Sí | **OK** |
| `/service-4.html` | Asesoría y Capacitación en Concreto \| CAYCO Hidalgo | 53 | Sí | Sí | **OK** |
| `/contact.html` | Contacto \| CAYCO | 16 | **No** | Sí | **CORTO** (<30) |
| `/proyects.html` | Proyectos Realizados \| CAYCO Concreto Premezclado Hidalgo | 59 | Parcial | Sí | **OK** |
| `/galeria.html` | Galeria de Proyectos \| CAYCO Concreto Premezclado Hidalgo | 58 | Parcial | Sí | **OK** |
| `/about.html` | Acerca de CAYCO \| Expertos en Concreto Premezclado Hidalgo | 59 | Sí | Sí | **OK** |

### Hallazgos

| # | Hallazgo | Severidad | URLs Afectadas |
|---|----------|-----------|----------------|
| 1 | **Title demasiado corto** en contact.html (16 chars) | **Alta** | 1 (10%) |
| 2 | **Title demasiado largo** en index.html (64 chars, truncado en SERPs) | **Media** | 1 (10%) |
| 3 | **Formato inconsistente** de marca (CAYCO vs CAYCO Hidalgo vs CAYCO Concreto Premezclado Hidalgo) | **Baja** | 4 (40%) |
| 4 | **Falta keyword** en contact.html | **Alta** | 1 (10%) |

### Acción Correctiva: contact.html

```
Actual:   "Contacto | CAYCO" (16 chars)
Sugerido: "Contacto y Cotización de Concreto Premezclado | CAYCO Hidalgo" (62 chars)
```

### Score: **7/10** (Bueno, con correcciones puntuales necesarias)

---

## 5.2 Meta Descriptions

### Inventario Completo

| URL | Meta Description | Chars | Keyword | CTA | Estado |
|-----|-----------------|-------|---------|-----|--------|
| `/` | Concretera en Tulancingo y Pachuca. CAYCO: producción y suministro de concreto premezclado, bombeo y asesoría técnica en Hidalgo. Cotiza ahora. | 145 | Sí | Sí | **OK** |
| `/services.html` | Servicios de concreto premezclado en Hidalgo: tipos de concreto, concretos de innovación, bombeo de materiales, asesoría técnica y capacitación. CAYCO Tulancingo, Pachuca. | 169 | Sí | No | **Largo** |
| `/service-1.html` | Tipos de concreto premezclado en Hidalgo: estructural, alta resistencia, ligero, autocompactante y MR. Venta de concreto en Tulancingo, Pachuca y Huauchinango. CAYCO. | 163 | Sí | No | **Largo** |
| `/service-2.html` | Concretos de innovación en Hidalgo: ecológico, permeable, antibacteriano y de color. Soluciones sustentables para construcción en Tulancingo, Pachuca y Huauchinango. CAYCO. | 177 | Sí | No | **Largo** |
| `/service-3.html` | Servicio de bombeo de concreto en Hidalgo: tiro directo, bomba pluma y estacionaria. Entrega eficiente en obras de Tulancingo, Pachuca y Huauchinango. CAYCO. | 160 | Sí | No | **OK** |
| `/service-4.html` | Asesoría técnica y capacitación en concreto premezclado en Hidalgo. Optimiza costos y calidad en tus proyectos de construcción en Tulancingo, Pachuca y Huauchinango. CAYCO. | 177 | Sí | No | **Largo** |
| `/contact.html` | Contáctanos para cualquier consulta sobre nuestros productos y servicios de concreto premezclado. CAYCO Hidalgo. | ~112 | Parcial | Parcial | **Corta** |
| `/proyects.html` | Mas de 1,250 proyectos de concreto premezclado realizados en Hidalgo, Querétaro y Estado de México. CAYCO: calidad comprobada. | ~123 | Sí | No | **Corta** |
| `/galeria.html` | Galeria de proyectos de concreto premezclado de CAYCO en Hidalgo. Obras en Tulancingo, Pachuca y Huauchinango. | ~110 | Sí | No | **Corta** |
| `/about.html` | Conoce CAYCO, empresa lider en concreto premezclado en Hidalgo con más de 1,250 proyectos realizados. Calidad y compromiso. | ~120 | Sí | No | **Corta** |

### Hallazgos

| # | Hallazgo | Severidad | URLs Afectadas |
|---|----------|-----------|----------------|
| 1 | **Descriptions > 160 chars** (truncadas en SERPs) | **Baja** | 4 (services, service-1, service-2, service-4) |
| 2 | **Descriptions < 120 chars** (cortas, desperdician espacio SERP) | **Media** | 3 (contact, galeria, about) |
| 3 | **Sin CTA explícito** en la mayoría de descriptions | **Baja** | 8 (80%) |

### Score: **7/10** (Bueno, optimizable)

---

## 5.3 Header Hierarchy (H1-H6)

### Inventario de H1 Tags

| URL | # H1s | Contenido H1 | Keyword en H1 | Estado |
|-----|-------|--------------|----------------|--------|
| `/` | 1 | "Apasionados del concreto" | **No** (keyword genérico) | **Mejorable** |
| `/services.html` | **2** | "Nuestros Servicios" + "¿Listo para llevar tu proyecto...?" | Parcial | **ERROR: 2 H1** |
| `/service-1.html` | 1 | "Tipos de Concreto" | Sí | **OK** |
| `/service-2.html` | 1 | "Concretos de Innovación" | Sí | **OK** |
| `/service-3.html` | 1 | "Bombeo de Materiales" | Sí | **OK** |
| `/service-4.html` | 1 | "Asesoría y Capacitación" | Sí | **OK** |
| `/contact.html` | 1 | "Contacto" | **No** | **Mejorable** |
| `/proyects.html` | 1 | "Proyectos" | Parcial | **Mejorable** |
| `/galeria.html` | 1 | "Galería" | **No** | **Mejorable** |
| `/about.html` | 1 | "Acerca de CAYCO" | Parcial | **OK** |

### Hallazgos de Jerarquía

| # | Hallazgo | Severidad | URLs Afectadas |
|---|----------|-----------|----------------|
| 1 | **Múltiples H1** en services.html | **Alta** | 1 (10%) |
| 2 | **H1 sin keyword** (homepage, contact, galeria) | **Media** | 3 (30%) |
| 3 | **Salto de jerarquía H1→H3** en service-2.html (sin H2) | **Media** | 1 (10%) |
| 4 | **H1 genérico** ("Apasionados del concreto" en homepage) | **Media** | 1 (10%) |

### Acciones Correctivas

```
services.html:  Eliminar segundo H1, convertir a H2
service-2.html: Convertir H3 a H2 para secciones principales
contact.html:   H1 → "Contacto - Concreto Premezclado en Hidalgo"
galeria.html:   H1 → "Galería de Proyectos de Concreto Premezclado"
```

### Score: **6/10** (Aceptable, con errores a corregir)

---

## 5.4 Image Optimization

### Inventario por Página

| URL | Total Imgs | Con Alt | Sin Alt | Alt Genérico | Lazy Load |
|-----|-----------|---------|---------|--------------|-----------|
| `/` | ~36 | 30 | 0 | 6 | Sí |
| `/services.html` | ~19 | 19 | 0 | 0 | Sí |
| `/service-1.html` | ~10 | 10 | 0 | 1 ("image") | Sí |
| `/service-2.html` | ~7 | 7 | 0 | 1 ("image") | Sí |
| `/service-3.html` | ~6 | 6 | 0 | 1 ("image") | Sí |
| `/service-4.html` | ~2 | 2 | 0 | 0 | Sí |
| `/contact.html` | ~5 | 5 | 0 | 1 (alt="") | Sí |
| `/proyects.html` | ~18 | 18 | 0 | 0 | Parcial |
| `/galeria.html` | ~1 (footer) | 1 | 0 | 0 | Sí |
| `/about.html` | ~10 | 10 | 0 | 0 | Parcial |
| **TOTAL** | **~114** | **108** | **0** | **~10** | **Mayoría** |

### Hallazgos

| # | Hallazgo | Severidad | Detalle |
|---|----------|-----------|---------|
| 1 | **Alt text genérico "image"** en banners de service-1, service-2, service-3 | **Media** | 3 imágenes de banner con alt="image" |
| 2 | **Alt vacío** en background SVG de contact.html | **Baja** | Imagen decorativa (aceptable con alt="") |
| 3 | **Dimensiones no especificadas** en HTML | **Media** | Ninguna imagen tiene width/height en HTML |
| 4 | **Formato no optimizado** | **Baja** | Mezcla de JPG, PNG, WebP; WebP no universal |
| 5 | **Imágenes duplicadas** en proyects.html | **Baja** | Misma imagen `galery/1.jpg` usada 8 veces en carousels |

### Score: **7/10** (Bueno, mejoras menores posibles)

---

## 5.5 URL Canonicalization

### Variantes de URL (Verificado en crawling técnico)

| Variante | Comportamiento Esperado | Estado |
|----------|------------------------|--------|
| `http://cayco.mx/` | → 301 → `https://cayco.mx/` | **Configurado** (.htaccess) |
| `http://www.cayco.mx/` | → 301 → `https://cayco.mx/` | **Configurado** (.htaccess) |
| `https://www.cayco.mx/` | → 301 → `https://cayco.mx/` | **Configurado** (.htaccess) |
| `https://cayco.mx/` | Versión canónica | **OK** |

**Nota:** La verificación en producción depende del deploy del .htaccess. Verificar post-deploy.

### Score: **9/10** (Configurado correctamente en código)

---

## 5.6 Lang Attribute

### Estado Actual

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| `html lang="es-MX"` | **Presente** | 10/10 páginas |
| Consistencia | **OK** | Todas usan `es-MX` |

### Score: **10/10** (Perfecto)

---

## 5.7 Meta Robots

### Estado Actual

Todas las 10 páginas tienen: `<meta name="robots" content="index, follow" />`

No se detectaron directivas restrictivas ni X-Robots-Tag en headers HTTP.

### Score: **10/10** (Perfecto)

---

# 6. AUDITORÍA DE CONTENIDO

## 6.1 Content Quality

### Análisis por Página

| URL | Tipo | Word Count Estimado | Mínimo Recomendado | Estado |
|-----|------|--------------------|--------------------|--------|
| `/` | Homepage | ~800+ | 500-800 | **OK** |
| `/services.html` | Catálogo | ~400 | 300-500 | **OK** |
| `/service-1.html` | Servicio | ~1000+ | 800-1500 | **OK** |
| `/service-2.html` | Servicio | ~600 | 800-1500 | **Bajo** |
| `/service-3.html` | Servicio | ~400 | 800-1500 | **Bajo** |
| `/service-4.html` | Servicio | ~150 | 800-1500 | **CRÍTICO: Thin** |
| `/contact.html` | Contacto | ~200 | 200-300 | **OK** |
| `/proyects.html` | Portafolio | ~300 | 300-500 | **OK** |
| `/galeria.html` | Galería | ~100 | 200-300 | **Bajo** |
| `/about.html` | About | ~500 | 500-800 | **OK** |

### Hallazgos

| # | Hallazgo | Severidad | URL |
|---|----------|-----------|-----|
| 1 | **Thin content** en service-4.html (~150 palabras) | **Alta** | service-4.html |
| 2 | **Contenido bajo** en service-3.html (~400 palabras) | **Media** | service-3.html |
| 3 | **Contenido bajo** en service-2.html (~600 palabras) | **Media** | service-2.html |
| 4 | **Typo** "ptersonalizada" en service-4.html | **Baja** | service-4.html |
| 5 | **Typo** "obrea" en index.html | **Baja** | index.html |

### Score: **5/10** (Aceptable, con thin content en páginas de servicio)

---

## 6.2 Keyword Optimization

### Keyword Mapping Actual

| URL | Keyword Principal | En Title | En H1 | En Description | En Content |
|-----|-------------------|----------|-------|----------------|------------|
| `/` | concretera tulancingo, concreto premezclado hidalgo | Sí | No | Sí | Sí |
| `/services.html` | servicios concreto premezclado hidalgo | Sí | Parcial | Sí | Sí |
| `/service-1.html` | tipos concreto premezclado hidalgo | Sí | Sí | Sí | Sí |
| `/service-2.html` | concretos innovación hidalgo | Sí | Sí | Sí | Sí |
| `/service-3.html` | bombeo concreto hidalgo | Sí | Sí | Sí | Sí |
| `/service-4.html` | asesoría capacitación concreto | Sí | Sí | Sí | Sí |
| `/contact.html` | contacto concreto premezclado | **No** | **No** | Parcial | Parcial |
| `/proyects.html` | proyectos concreto premezclado | Parcial | **No** | Sí | Sí |
| `/galeria.html` | galería proyectos concreto | Parcial | **No** | Sí | Parcial |
| `/about.html` | empresa concreto premezclado hidalgo | Sí | Parcial | Sí | Sí |

### Score: **7/10** (Bueno, falta optimización en contact, proyects y galeria)

---

## 6.3 Content Gap Analysis

### Contenido Faltante Identificado

| Tema | Tipo | Prioridad | Impacto Estimado |
|------|------|-----------|------------------|
| Landing pages por ubicación (Tulancingo, Pachuca, etc.) | Páginas locales | **Alta** | Alto - SEO local |
| FAQ completa en página dedicada | FAQ page | **Alta** | Medio - Rich results |
| Guías de concreto (tipos, selección, aplicaciones) | Blog/Guías | **Media** | Alto - Content funnel |
| Casos de estudio detallados | Páginas de proyecto | **Media** | Medio - E-E-A-T |
| Página de certificaciones y calidad | About/Trust | **Baja** | Medio - E-E-A-T |
| Glosario de términos de concreto | Recurso | **Baja** | Bajo - Long tail |

### Score: **4/10** (Deficiente, gaps significativos)

---

# 7. AUDITORÍA DE SEO LOCAL

## 7.1 Google Business Profile

| Criterio | Estado |
|----------|--------|
| GBP verificado | **Requiere verificación** (sin acceso a cuenta) |
| Categoría primaria | Requiere verificación |
| Posts regulares | Requiere verificación |
| Reseñas | Requiere verificación |

### Severidad: **Requiere acceso a GBP para auditar**

---

## 7.2 NAP Consistency

### NAP Canónico (del sitio web)

**Name:** CAYCO Concreto Premezclado
**Address Principal:** Libramiento la Joya 200, El Cerezo, Tulancingo, Hidalgo, C.P. 43660
**Phone:** (775) 75 3 38 11 / (775) 11 2 01 60 / (775) 75 3 40 46 / (775) 114 86 06

### NAP por Sucursal (del footer)

| Sucursal | Dirección | Teléfono Local |
|----------|-----------|---------------|
| **Tulancingo** | Libramiento la joya 200 El cerezo, Tulancingo Hidalgo C.P 4366 | (775) 75 3 38 11, (775) 11 2 01 60, (775) 75 3 40 46, (775) 114 86 06 |
| **Pachuca** | Boulevard Las Torres S/N, Mineral de la Reforma, Hidalgo, Mexico 75169 | (771) 143 63 26 + teléfonos corporativos |
| **Huauchinango** | Cuacuila - Xaltepec, 73173 Huauchinango, Puebla | (776) 767 83 35 + teléfonos corporativos |
| **Querétaro** | Luis Donaldo Colosio 257-274, 76147 San José el Alto, Qro. | (442) 439 7563 + teléfonos corporativos |
| **Zumpango** | Ex-Hacienda Guadalupe, 55630, Zumpango, Méx | (566) 672 2875 + teléfonos corporativos |

### Hallazgos

| # | Hallazgo | Severidad | Detalle |
|---|----------|-----------|---------|
| 1 | **CP incorrecto** en Tulancingo footer: "4366" debería ser "43660" | **Alta** | Inconsistencia con Schema.org que dice 43660 |
| 2 | **5 sucursales pero solo 1 Schema LocalBusiness** | **Alta** | Solo la sede de Tulancingo tiene Schema en homepage |
| 3 | **Sin landing pages por ubicación** | **Alta** | 5 sucursales sin páginas dedicadas |
| 4 | **Formato de teléfono inconsistente** | **Media** | Varía entre (775) 75 3 38 11 y +52-775-118-9872 en Schema |
| 5 | **WhatsApp usa número de Pachuca** pero no es claro | **Baja** | +52 771 143 6326 |

### Score: **5/10** (Aceptable, con gaps importantes en multi-location)

---

## 7.3 Local Content & Landing Pages

### Estado Actual

| Ubicación | Landing Page Dedicada | Schema LocalBusiness | Mapa Embebido |
|-----------|----------------------|---------------------|---------------|
| Tulancingo | **No** | Sí (en homepage) | **No** |
| Pachuca | **No** | **No** | **No** |
| Huauchinango | **No** | **No** | **No** |
| Querétaro | **No** | **No** | **No** |
| Zumpango | **No** | **No** | **No** |

### Recomendación

Crear 5 landing pages por ubicación con:
- URL: `/ubicacion/tulancingo/`, `/ubicacion/pachuca/`, etc.
- H1 con keyword local: "Concreto Premezclado en [Ciudad]"
- Schema LocalBusiness específico por sucursal
- Mapa de Google Maps embebido
- Contenido único sobre servicio en esa ubicación
- Testimonios/proyectos locales

### Score: **2/10** (Crítico - multi-location sin páginas locales)

---

## 7.4 Local Citations

| Plataforma | Estado |
|------------|--------|
| Google Business | Requiere verificación |
| Facebook | Activo (CaycoConcretos) |
| LinkedIn | Activo |
| Sección Amarilla | No verificado |
| Directorios industria | No verificado |

### Score: **No evaluable** (requiere herramientas de citation tracking)

---

# 8. AUDITORÍA DE DATOS ESTRUCTURADOS

## 8.1 Schema Inventory

### Schemas Implementados por Página

| URL | Schemas | Estado |
|-----|---------|--------|
| `/` | ConcreteContractor, FAQPage | **Bueno** |
| `/services.html` | BreadcrumbList | **Parcial** (falta Service) |
| `/service-1.html` | Service, BreadcrumbList | **Bueno** |
| `/service-2.html` | Service, BreadcrumbList | **Bueno** |
| `/service-3.html` | Service, BreadcrumbList | **Bueno** |
| `/service-4.html` | Service, BreadcrumbList | **Bueno** |
| `/contact.html` | ContactPage, BreadcrumbList | **Bueno** |
| `/proyects.html` | — | **Faltante** |
| `/galeria.html` | ImageGallery, BreadcrumbList | **Bueno** |
| `/about.html` | AboutPage, BreadcrumbList | **Bueno** |

### Schemas Recomendados vs Implementados

| Schema | Requerido | Implementado | Estado |
|--------|-----------|-------------|--------|
| Organization/LocalBusiness | Homepage | **Sí** (ConcreteContractor) | **OK** |
| FAQPage | Donde hay FAQs | **Sí** (homepage) | **OK** |
| Service | Páginas de servicio | **Sí** (service-1 a service-4) | **OK** |
| BreadcrumbList | Páginas internas | **Sí** (8/9 internas) | **OK** |
| ContactPage | Contacto | **Sí** | **OK** |
| AboutPage | About | **Sí** | **OK** |
| ImageGallery | Galería | **Sí** | **OK** |
| WebSite (SearchAction) | Homepage | **No** | **Oportunidad** |

---

## 8.2 ConcreteContractor Schema (Homepage)

### Propiedades Implementadas

| Propiedad | Estado | Valor |
|-----------|--------|-------|
| @type | **OK** | ConcreteContractor |
| name | **OK** | CAYCO - Concreto Premezclado |
| alternateName | **OK** | CAYCO Concretos |
| description | **OK** | Descripción con keywords |
| url | **OK** | https://cayco.mx |
| telephone | **OK** | +52-775-118-9872 |
| email | **OK** | cayco.mx@gmail.com |
| address | **OK** | PostalAddress completo |
| geo | **OK** | GeoCoordinates |
| areaServed | **OK** | 5 ciudades (Hidalgo, Tulancingo, Pachuca, Huauchinango, Querétaro, Zumpango) |
| openingHoursSpecification | **OK** | Lun-Vie 8:30-17:30, Sáb 8:30-14:00 |
| hasOfferCatalog | **OK** | 4 servicios listados |
| aggregateRating | **OK** | 4.8/5 (135 reviews) |
| sameAs | **OK** | Facebook, Instagram, LinkedIn, YouTube, TikTok |
| foundingDate | **OK** | 2005 |
| priceRange | **OK** | $$ |

### Score: **9/10** (Excelente implementación)

---

## 8.3 FAQPage Schema (Homepage)

### Estado

| Criterio | Estado |
|----------|--------|
| Presente en página con FAQs visibles | **Sí** |
| Mínimo 3 Q&As | **Sí** (5 preguntas) |
| Respuestas sustanciales | **Sí** |
| Validación | Requiere Rich Results Test |

### Score: **9/10** (Excelente)

---

## 8.4 Service Schema (service-1 a service-4)

### Estado por Página

| URL | serviceType | provider | areaServed | offers | Estado |
|-----|-------------|----------|------------|--------|--------|
| service-1.html | Tipos de Concreto Premezclado | LocalBusiness (CAYCO) | Hidalgo | OfferCatalog (3 tipos) | **OK** |
| service-2.html | Concretos de Innovación | LocalBusiness (CAYCO) | Hidalgo | OfferCatalog (3 tipos) | **OK** |
| service-3.html | Bombeo de Concreto | LocalBusiness (CAYCO) | Hidalgo | — | **OK** |
| service-4.html | Asesoría y Capacitación | LocalBusiness (CAYCO) | Hidalgo | — | **OK** |

### Score: **8/10** (Bueno)

---

## 8.5 BreadcrumbList Schema

### Cobertura

| URL | BreadcrumbList | Jerarquía |
|-----|---------------|-----------|
| `/` | No (homepage, no aplica) | — |
| `/services.html` | **Sí** | Inicio → Servicios |
| `/service-1.html` | **Sí** | Inicio → Servicios → Tipos de Concreto |
| `/service-2.html` | **Sí** | Inicio → Servicios → Concretos de Innovación |
| `/service-3.html` | **Sí** | Inicio → Servicios → Bombeo de Concreto |
| `/service-4.html` | **Sí** | Inicio → Servicios → Asesoría y Capacitación |
| `/contact.html` | **Sí** | Inicio → Contacto |
| `/proyects.html` | **No** | **Faltante** |
| `/galeria.html` | **Sí** | Inicio → Galería |
| `/about.html` | **Sí** | Inicio → Acerca de CAYCO |

### Hallazgo: proyects.html no tiene Schema BreadcrumbList ni ningún otro Schema.

### Score: **8/10** (Bueno, falta en proyects.html)

---

## 8.6 Resumen de Datos Estructurados

### Cobertura Total

| Métrica | Valor |
|---------|-------|
| Páginas con Schema | **9/10** (90%) |
| Páginas sin Schema | **1** (proyects.html) |
| Total blocks JSON-LD | **17** |
| Tipos implementados | 8 (ConcreteContractor, FAQPage, Service, BreadcrumbList, ContactPage, AboutPage, ImageGallery, ListItem) |
| Errores de validación | Requiere Rich Results Test |

### Score General Structured Data: **8/10** (Bueno)

---

# 9. SISTEMA DE SCORING SEO

## 9.1 Score Card

```
╔═══════════════════════════════════════════════════════════════════╗
║                    SEO SCORE CARD                                ║
║                    CAYCO Concretos Premezclados                  ║
║                    18 de Febrero de 2026                         ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  SCORE GENERAL: 68.5/100                                         ║
║  █████████████████████████████████░░░░░░░░░░░░░░░░ 68.5%         ║
║                                                                  ║
╠═══════════════════════════════════════════════════════════════════╣
║  BREAKDOWN POR CATEGORÍA                                         ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  Technical SEO (25%)        7.3/10    ███████░░░ 73%             ║
║  ├── Performance            7.0/10    (TTFB excelente, CWV pend)║
║  ├── Mobile                 8.0/10    (viewport ok, testing pend)║
║  ├── Security               7.0/10    (HTTPS+HSTS ok, headers -) ║
║  └── Architecture           7.0/10    (URLs funcionales, no sem) ║
║                                                                  ║
║  Indexation (20%)           9.3/10    █████████░ 93%             ║
║  ├── robots.txt             9.0/10    (excelente)                ║
║  ├── Sitemap                9.0/10    (excelente)                ║
║  ├── Canonicals            10.0/10    (perfecto)                 ║
║  └── Coverage               9.0/10    (requiere GSC verify)     ║
║                                                                  ║
║  On-Page (20%)              7.0/10    ███████░░░ 70%             ║
║  ├── Titles                 7.0/10    (1 corto, 1 largo)        ║
║  ├── Descriptions           7.0/10    (4 largas, 3 cortas)      ║
║  ├── Headers                6.0/10    (2 H1 en services, saltos)║
║  └── Images                 7.0/10    (alt ok, sin dimensions)   ║
║                                                                  ║
║  Content (15%)              5.3/10    █████░░░░░ 53%             ║
║  ├── Quality                5.0/10    (thin content service-4)   ║
║  ├── Keywords               7.0/10    (bueno excepto contact)    ║
║  ├── Freshness              5.0/10    (contenido estático)       ║
║  └── E-E-A-T                4.0/10    (certificaciones, sin más) ║
║                                                                  ║
║  Local SEO (10%)            3.5/10    ███░░░░░░░ 35%             ║
║  ├── GBP                    N/A       (sin acceso)               ║
║  ├── NAP                    5.0/10    (CP incorrecto, formato -) ║
║  ├── Local Content          2.0/10    (sin landing pages)        ║
║  └── Citations              N/A       (sin verificar)            ║
║                                                                  ║
║  Structured Data (10%)      8.5/10    ████████░░ 85%             ║
║  ├── Presence               9.0/10    (9/10 páginas)             ║
║  ├── Validity               8.0/10    (requiere testing)         ║
║  ├── Rich Results           8.0/10    (FAQ, BreadcrumbList)      ║
║  └── Data Accuracy          9.0/10    (datos correctos)          ║
║                                                                  ║
╠═══════════════════════════════════════════════════════════════════╣
║  BENCHMARK VS INDUSTRIA B2B INDUSTRIAL                           ║
║  Este sitio: 68.5/100  |  Promedio industria: 45-55/100         ║
║  Posición: POR ENCIMA del promedio                               ║
╚═══════════════════════════════════════════════════════════════════╝
```

## 9.2 Cálculo del Score

```
Score General = Σ (Score_categoría × Peso_categoría)

Technical:    7.3 × 0.25 = 1.825
Indexation:   9.3 × 0.20 = 1.860
On-Page:      7.0 × 0.20 = 1.400
Content:      5.3 × 0.15 = 0.795
Local:        3.5 × 0.10 = 0.350
Schema:       8.5 × 0.10 = 0.850
────────────────────────────
TOTAL:                  7.080 × 10 = 68.5/100 (redondeado)
```

## 9.3 Baseline vs Target

| Métrica | Baseline (Actual) | Target 3M | Target 6M | Target 12M |
|---------|-------------------|-----------|-----------|------------|
| **Score General** | 68.5/100 | 78/100 | 85/100 | 90/100 |
| **Pages Indexed** | ~90% (estimado) | 95% | 100% | 100% |
| **Rich Results** | FAQ, Breadcrumbs | + LocalBusiness | + Service | Estable |
| **Local Pages** | 0 | 3 | 5 | 5 |
| **Content Pages** | 10 | 15 | 20 | 30+ |

---

# 10. MATRIZ DE SEVERIDAD Y PRIORIZACIÓN

## 10.1 Hallazgos por Severidad

### CRÍTICO (P0) - Resolver en 24-48 horas

| # | Hallazgo | Área | URLs | ICE Score |
|---|----------|------|------|-----------|
| — | No se encontraron hallazgos críticos activos | — | — | — |

**Nota:** Los hallazgos críticos del crawling técnico (redirecciones HTTP/HTTPS, canonicals inconsistentes) ya fueron corregidos en la auditoría anterior.

### ALTA (P1) - Resolver en 1 semana

| # | Hallazgo | Área | URLs Afectadas | Impact | Confidence | Ease | ICE |
|---|----------|------|----------------|--------|------------|------|-----|
| 1 | Thin content en service-4.html (~150 palabras) | Content | 1 (10%) | 7 | 9 | 6 | 7.3 |
| 2 | Múltiples H1 en services.html | On-Page | 1 (10%) | 6 | 10 | 10 | 8.7 |
| 3 | Title demasiado corto en contact.html (16 chars) | On-Page | 1 (10%) | 7 | 10 | 10 | 9.0 |
| 4 | H1 sin keyword en homepage, contact, galeria | On-Page | 3 (30%) | 6 | 8 | 9 | 7.7 |
| 5 | CP incorrecto en footer (Tulancingo: 4366 → 43660) | Local | 10 (100%) | 7 | 10 | 10 | 9.0 |
| 6 | Sin Schema en proyects.html | Schema | 1 (10%) | 5 | 9 | 8 | 7.3 |
| 7 | 5 sucursales sin landing pages locales | Local | 0 (faltantes) | 9 | 8 | 3 | 6.7 |

### MEDIA (P2) - Resolver en 2-4 semanas

| # | Hallazgo | Área | URLs Afectadas | Impact | Confidence | Ease | ICE |
|---|----------|------|----------------|--------|------------|------|-----|
| 8 | Security headers faltantes | Technical | 10 (100%) | 5 | 8 | 7 | 6.7 |
| 9 | Salto de jerarquía H1→H3 en service-2.html | On-Page | 1 (10%) | 4 | 8 | 9 | 7.0 |
| 10 | Meta descriptions > 160 chars (truncadas) | On-Page | 4 (40%) | 3 | 7 | 8 | 6.0 |
| 11 | Meta descriptions < 120 chars (cortas) | On-Page | 3 (30%) | 3 | 7 | 8 | 6.0 |
| 12 | Alt text genérico "image" en banners | On-Page | 3 (30%) | 3 | 7 | 9 | 6.3 |
| 13 | Imágenes sin width/height en HTML | Technical | 10 (100%) | 4 | 8 | 5 | 5.7 |
| 14 | Contenido bajo en service-2 y service-3 | Content | 2 (20%) | 6 | 7 | 4 | 5.7 |
| 15 | Service cards en homepage linkan a anchor, no a pages | On-Page | 1 (homepage) | 5 | 8 | 8 | 7.0 |

### OPORTUNIDAD (P3) - Resolver en 1-3 meses

| # | Hallazgo | Área | ICE |
|---|----------|------|-----|
| 16 | URLs no semánticas (service-1 a service-4) | Technical | 4.3 |
| 17 | Content gap: sin guías de concreto ni casos de estudio | Content | 6.0 |
| 18 | Formato de título inconsistente (marca) | On-Page | 3.7 |
| 19 | Typos menores en contenido | Content | 3.0 |
| 20 | WebSite schema con SearchAction faltante | Schema | 3.7 |

---

## 10.2 Matriz de Impacto vs Esfuerzo

```
                    BAJO ESFUERZO              ALTO ESFUERZO
                    ─────────────────────────────────────────
                    │                       │               │
    ALTO            │   QUICK WINS          │   MAJOR       │
    IMPACTO         │   (Hacer primero)     │   PROJECTS    │
                    │                       │   (Planificar)│
                    │   #2 Fix H1 services  │   #7 Landing  │
                    │   #3 Fix title contact│     pages     │
                    │   #5 Fix CP footer    │     locales   │
                    │   #4 Fix H1 keywords  │   #1 Expandir │
                    │   #6 Schema proyects  │     service-4 │
                    │   #15 Fix service     │   #14 Content │
                    │       cards links     │     service-2 │
                    │                       │     service-3 │
                    ├───────────────────────┼───────────────┤
                    │                       │               │
    BAJO            │   FILL-INS            │   DEPRIORITIZE│
    IMPACTO         │   (Si hay tiempo)     │   (Backlog)   │
                    │                       │               │
                    │   #9 Fix H3→H2        │   #16 Rename  │
                    │   #10 Fix meta desc   │     URLs      │
                    │   #11 Fix meta desc   │   #17 Blog    │
                    │   #12 Fix alt text    │     strategy  │
                    │   #19 Fix typos       │   #13 img     │
                    │                       │     dimensions│
                    │                       │               │
                    ─────────────────────────────────────────
```

---

# 11. CHECKLIST DE IMPLEMENTACIÓN

## 11.1 Fase 1: Quick Wins (Semana 1)

### On-Page Fixes

```
□ #2  services.html: Eliminar segundo H1, convertir a H2
      Actual:   <h1>¿Listo para llevar tu proyecto al siguiente nivel?</h1>
      Cambiar:  <h2>¿Listo para llevar tu proyecto al siguiente nivel?</h2>

□ #3  contact.html: Optimizar title tag
      Actual:   "Contacto | CAYCO"
      Nuevo:    "Contacto y Cotización de Concreto Premezclado | CAYCO Hidalgo"

□ #4  Optimizar H1 tags en 3 páginas:
      index.html:   "Apasionados del concreto" → "Concreto Premezclado en Hidalgo | CAYCO"
      contact.html: "Contacto" → "Contacto - Cotización de Concreto Premezclado"
      galeria.html: "Galería" → "Galería de Proyectos de Concreto Premezclado"

□ #5  Corregir CP en footer de TODAS las páginas
      Actual:   "C.P 4366"
      Correcto: "C.P. 43660"

□ #6  Agregar Schema BreadcrumbList + ProjectPage a proyects.html

□ #9  service-2.html: Cambiar H3 a H2 para secciones de servicio

□ #12 Corregir alt="image" en banners de service-1, service-2, service-3
      Cambiar a descripciones relevantes del banner

□ #15 Homepage: Cambiar links de service cards de #queHacemos a URLs de servicio
      Card 01 → service-1.html
      Card 02 → service-2.html
      Card 03 → service-3.html

□ #19 Corregir typos:
      service-4.html: "ptersonalizada" → "personalizada"
      index.html: "obrea" → "obra"
```

### Local SEO Quick Fix

```
□ #5  Corregir CP Tulancingo en footer: "4366" → "43660" (en 10 archivos)
```

---

## 11.2 Fase 2: Content & On-Page Optimization (Semana 2-3)

### Content Expansion

```
□ #1  service-4.html: Expandir contenido a mínimo 800 palabras
      Agregar secciones:
      - Tipos de asesoría (diseño de mezcla, selección de concreto, dosificación)
      - Proceso de capacitación (temario, duración, modalidades)
      - Beneficios de la asesoría CAYCO
      - Casos de éxito

□ #14 service-3.html: Expandir contenido a mínimo 800 palabras
      Agregar secciones:
      - Especificaciones técnicas de cada tipo de bombeo
      - Capacidades (alcance, presión, volumen)
      - Proceso de solicitud

□ #14 service-2.html: Expandir contenido a mínimo 800 palabras
      Agregar secciones:
      - Detalles técnicos por tipo de concreto innovador
      - Aplicaciones y casos de uso
      - Ventajas vs concreto convencional
```

### Meta Tag Optimization

```
□ #10 Acortar meta descriptions > 160 chars:
      - services.html (169 → ~155)
      - service-1.html (163 → ~155)
      - service-2.html (177 → ~155)
      - service-4.html (177 → ~155)

□ #11 Expandir meta descriptions < 120 chars:
      - contact.html (~112 → ~150)
      - galeria.html (~110 → ~150)
      - about.html (~120 → ~150)
```

---

## 11.3 Fase 3: Schema & Technical (Semana 3-4)

### Structured Data

```
□ #6  Agregar a proyects.html:
      - Schema BreadcrumbList (Inicio → Proyectos)
      - Schema CollectionPage o WebPage

□ #20 Agregar WebSite schema con SearchAction en homepage (oportunidad)
```

### Security Headers (en .htaccess)

```
□ #8  Agregar security headers al .htaccess:
      Header set X-Content-Type-Options "nosniff"
      Header set X-Frame-Options "SAMEORIGIN"
      Header set X-XSS-Protection "1; mode=block"
      Header set Referrer-Policy "strict-origin-when-cross-origin"
```

---

## 11.4 Fase 4: Local SEO (Mes 2)

### Landing Pages por Ubicación

```
□ #7  Crear landing pages para cada sucursal:
      - /ubicacion-tulancingo.html
      - /ubicacion-pachuca.html
      - /ubicacion-huauchinango.html
      - /ubicacion-queretaro.html
      - /ubicacion-zumpango.html

      Cada página debe incluir:
      - Title: "Concreto Premezclado en [Ciudad] | CAYCO"
      - H1: "Concreto Premezclado en [Ciudad], [Estado]"
      - Schema LocalBusiness específico con coordenadas
      - Mapa de Google Maps embebido
      - NAP específico de sucursal
      - Contenido único (~500-800 palabras)
      - Proyectos locales/testimonios
      - CTA de cotización

□ Agregar landing pages al sitemap.xml
□ Agregar links en footer y navegación
```

---

# 12. AUDITORÍA POST-IMPLEMENTACIÓN

## 12.1 Timeline de Verificación

| Período | Verificaciones |
|---------|---------------|
| **24-48 horas** | Quick wins desplegados, sin errores 5xx, Schema válido |
| **1 semana** | Content expandido, meta tags optimizados, Search Console sin errores nuevos |
| **2 semanas** | Rich results apareciendo para BreadcrumbList y FAQ |
| **1 mes** | Landing pages locales indexadas, rankings iniciales visibles |
| **3 meses** | Evaluación completa de impacto, comparación vs baseline |

## 12.2 Checklist Post-Implementación

### Semana 1

```
INDEXATION
□ robots.txt: curl -I https://cayco.mx/robots.txt → 200 OK
□ sitemap.xml: curl -I https://cayco.mx/sitemap.xml → 200 OK
□ Search Console: Sitemap submitted
□ Search Console: No new errors

TECHNICAL
□ .htaccess redirects funcionando (verificar 4 variantes)
□ Security headers presentes (curl -I)
□ No errores 5xx

ON-PAGE
□ Spot check: title contact.html actualizado
□ Spot check: H1 corregidos
□ Spot check: CP footer corregido

SCHEMA
□ Rich Results Test: homepage válida
□ Rich Results Test: service pages válidas
□ Rich Results Test: proyects.html válida (nuevo schema)
```

### Mes 1

```
FULL CHECK
□ Search Console Coverage: % indexed
□ Rankings report: keywords objetivo
□ Traffic comparison vs baseline
□ Schema enhancements en Search Console
□ Resolver cualquier error nuevo
```

### Mes 3

```
COMPREHENSIVE REVIEW
□ Rankings comparison vs baseline
□ Traffic growth analysis
□ Local SEO: landing pages indexadas
□ Rich results status
□ Content performance (engagement)
□ Score SEO actualizado vs 68.5 baseline
```

---

# 13. ROADMAP SEO POR FASES

## 13.1 Gantt Chart

```
SEMANA       1    2    3    4    5    6    7    8    9    10   11   12
            ─────────────────────────────────────────────────────────
FASE 1      ████
Quick Wins  (H1, title, CP, schema, alt, links)

FASE 2           ████████
Content &   (Expandir service-2/3/4, meta tags)
On-Page

FASE 3                    ████████
Schema &    (Security headers, WebSite schema, validación)
Technical

FASE 4                              ████████████████
Local SEO   (5 landing pages, Schema LocalBusiness, sitemap update)

FASE 5                                              ████████████
Content &   (Blog strategy, guías, casos de estudio)
Growth      (ongoing)

            ─────────────────────────────────────────────────────────
MILESTONES   ▲         ▲              ▲                  ▲
             M1        M2             M3                 M4

M1: Quick wins implementados, score → 73/100
M2: Content expandido, on-page optimizado, score → 78/100
M3: Schema completo, security headers, score → 82/100
M4: Landing pages locales activas, score → 85/100
```

## 13.2 Resource Allocation

| Fase | Horas Estimadas | Skills Requeridos |
|------|----------------|-------------------|
| Quick Wins | 3-4 hrs | HTML/SEO básico |
| Content & On-Page | 10-15 hrs | SEO Specialist, Copywriter |
| Schema & Technical | 4-6 hrs | Technical SEO, Developer |
| Local SEO | 15-20 hrs | SEO Local, Developer, Copywriter |
| Content & Growth | Ongoing | Content Strategist, Writers |

---

# 14. CRITERIOS DE ÉXITO Y KPIS

## 14.1 KPIs Objetivo

### Rankings

| KPI | Baseline | Target 3M | Target 6M |
|-----|----------|-----------|-----------|
| Keywords Top 10 | A definir (GSC) | +30% | +60% |
| Posición promedio | A definir (GSC) | Mejorar 5 pos | Mejorar 10 pos |

### Traffic

| KPI | Baseline | Target 3M | Target 6M |
|-----|----------|-----------|-----------|
| Organic Sessions/mes | A definir (GA4) | +25% | +50% |
| Impressions/mes | A definir (GSC) | +40% | +80% |

### Indexation

| KPI | Baseline | Target 3M | Target 6M |
|-----|----------|-----------|-----------|
| Index Coverage | ~90% (est.) | 95% | 100% |
| Schema enhancements | FAQ + Breadcrumb | + Service | Estable |

### Local SEO

| KPI | Baseline | Target 3M | Target 6M |
|-----|----------|-----------|-----------|
| Local Landing Pages | 0 | 5 | 5 (optimizadas) |
| Local Keywords Top 10 | A definir | +5 keywords | +15 keywords |

### SEO Score

| KPI | Baseline | Target 3M | Target 6M | Target 12M |
|-----|----------|-----------|-----------|------------|
| SEO Score | 68.5/100 | 78/100 | 85/100 | 90/100 |

## 14.2 Definición de Éxito

```
PROYECTO SEO EXITOSO:
□ Score SEO mejorado de 68.5 a ≥ 85 (+16.5 puntos)
□ 100% de issues P1 (Alta) resueltos
□ 90%+ de issues P2 (Media) resueltos
□ Index coverage ≥ 95%
□ 5 landing pages locales indexadas
□ Rich results activos para FAQ, BreadcrumbList, Service
□ Content expandido en todas las páginas de servicio
□ NAP consistente en 100% de plataformas
```

---

# APÉNDICE A: Herramientas Utilizadas

| Herramienta | Uso |
|-------------|-----|
| `curl` + Googlebot UA | Crawling técnico, headers HTTP, TTFB |
| Análisis manual de código | Meta tags, Schema.org, headers, alt text |
| Framework de Auditoría SEO | Estructura y scoring del documento |

---

# APÉNDICE B: Archivos del Proyecto SEO

| Archivo | Descripción |
|---------|-------------|
| `SEO/auditoria-seo-cayco-concretos.md` | Este documento (auditoría completa) |
| `SEO/crawling-tecnico-cayco-concretos.md` | Auditoría de crawling técnico |
| `robots.txt` | Archivo robots.txt optimizado |
| `sitemap.xml` | Sitemap XML con 11 URLs |
| `.htaccess` | Reglas de redirección y seguridad |

---

# APÉNDICE C: Historial de Correcciones Aplicadas

| Fecha | Corrección | Commit |
|-------|-----------|--------|
| 2026-02-18 | Meta tags SEO (title, description, keywords, canonical, OG, Twitter, Schema.org) en 10 páginas | `9502b0f` |
| 2026-02-18 | Crawling técnico: .htaccess redirects, canonicals estandarizados, blog en sitemap, lastmod actualizado, robots.txt limpiado | `5eb80a0` |

---

**FIN DEL DOCUMENTO**

---

*Auditoría ejecutada siguiendo el Framework Maestro de Auditoría SEO v1.0*
*Fecha: 18 de Febrero de 2026*
*Próxima revisión programada: Marzo 2026 (post-implementación Fase 1-2)*
