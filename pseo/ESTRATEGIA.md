# Estrategia PSEO — CAYCO Concretos (cayco.mx)

**Fecha:** Marzo 2026
**Versión:** 1.0
**Alcance:** 72 páginas programáticas + 7 hubs = 79 URLs nuevas

---

## 1. RESUMEN EJECUTIVO

### Cifras del Proyecto

| Métrica | Valor |
|---------|-------|
| Páginas PSEO generadas | 72 |
| Páginas Hub | 7 |
| **Total URLs nuevas** | **79** |
| FAQs únicas generadas | 287 |
| Schema markup por página | 3 (LocalBusiness + BreadcrumbList + FAQPage) |
| Sucursales cubiertas | 5 (Querétaro, Tulancingo, Pachuca, Huauchinango, Zumpango) |
| Dimensiones PSEO | 4 (Zona × Producto × Especificación × Cliente) |

### Mercado Objetivo

- **Querétaro (prioridad #1):** 102,840 m³ de demanda verificada en 71 proyectos = **$311.5M MXN** en valor de mercado 2026
- **Diferenciador:** CAYCO es el **único productor con Distintivo C PRO CEMEX en Querétaro** (certificado febrero 2026)
- **Segmentos clave:** Residencial horizontal (40.8%), Residencial vertical (27.2%), Comercial/Mixto (17.5%), Data Centers (8.3%), Industrial (6.1%)

### Diferenciador Competitivo en SEO

El Distintivo C PRO CEMEX es un diferenciador sin competencia real en búsquedas. Ningún otro productor de concreto en Querétaro puede reclamar esta certificación, lo que posiciona a CAYCO como la opción preferente para:
- Proyectos de nearshoring (Google, Microsoft, Amazon) que exigen trazabilidad
- Desarrolladores grandes (Grupo Caisa, Javer, Urbana México) que buscan calidad certificada
- Obra pública con requisitos de certificación

### Proyección de Tráfico (Conservadora)

**Baseline actual (Search Console Abr-Dic 2025):**
- 1,180 clics orgánicos / 51,641 impresiones / CTR 2.29% / Posición avg 7.13

**Proyección con PSEO (escenario conservador — 30% de páginas en top 10):**

| Métrica | Mes 1-2 | Mes 3-6 | Mes 6-12 |
|---------|---------|---------|----------|
| Páginas en top 10 | 5-8 | 15-24 | 24-35 |
| Impresiones mensuales PSEO | 2,000-4,000 | 8,000-15,000 | 15,000-30,000 |
| Clics mensuales PSEO | 60-120 | 300-600 | 600-1,200 |
| CTR estimado | 3-4% | 4-5% | 4-6% |
| **Incremento vs baseline** | **+15-30%** | **+75-150%** | **+150-300%** |

**Supuestos:**
- 30% de las 79 páginas (~24) logran posición top 10 en 6 meses
- CTR promedio de 4% (superior al actual 2.29% por ser long-tail específico)
- Cada página long-tail genera 30-80 impresiones/mes promedio
- Las páginas de Querétaro (nearshoring, data centers) tienen potencial de volumen superior

**Escenario optimista (50% en top 10):**
- Mes 6-12: 40+ páginas rankeando, 1,500-2,500 clics/mes adicionales
- Incremento de +400-600% sobre baseline orgánico actual

---

## 2. ROADMAP POR FASES

### FASE 1 — Semanas 1-2: Deploy Querétaro + Innovación + Nearshoring

**Semana 1:**
- [ ] Subir las 42 páginas de Fase 1 (`pseo/output/`) al servidor
- [ ] Subir los 7 hubs (`pseo/output/hubs/`) al servidor
- [ ] Configurar `.htaccess` o servidor para que `/slug/` sirva `slug.html`
- [ ] Agregar `sitemap-pseo.xml` al sitemap index principal
- [ ] Submitir `sitemap-pseo.xml` en Google Search Console
- [ ] Solicitar indexación manual de las 5 páginas prioritarias vía URL Inspection

**Semana 2:**
- [ ] Aplicar cambios de interlinking en `index.html` (footer sucursales → hubs)
- [ ] Agregar link a hub innovación en `services.html` y `concretos-innovacion.html`
- [ ] Verificar que todas las URLs responden 200 (no 404)
- [ ] Validar schema markup en Google Rich Results Test (3 páginas)
- [ ] Confirmar badge C PRO solo visible en páginas de Querétaro
- [ ] Monitorear indexación en Search Console (Coverage report)

### FASE 2 — Semanas 3-4: Monitoreo y Optimización Rápida

- [ ] Revisar Search Console: ¿cuántas páginas indexadas de las 49?
- [ ] Identificar páginas ya rankeando en posición 5-15
- [ ] Optimizar titles/descriptions de páginas con impresiones pero CTR bajo
- [ ] Agregar links internos desde blog posts existentes hacia páginas PSEO relevantes
- [ ] Publicar 1-2 posts de blog que enlacen a páginas PSEO clave:
  - "Mercado de concreto en Querétaro 2026" → links a hub Querétaro + zonas
  - "Concreto para data centers" → link a página nearshoring

### FASE 3 — Mes 2: Deploy Hidalgo (17 páginas)

Condicionado a resultados de Fase 1:
- [ ] Si indexación > 50%: subir las 17 páginas de Fase 2 (Tulancingo + Pachuca)
- [ ] Si indexación < 50%: investigar problemas técnicos antes de subir más páginas
- [ ] Actualizar sitemap con nuevas URLs
- [ ] Re-submitir sitemap en Search Console
- [ ] Aplicar interlinking bidireccional entre páginas de Hidalgo y Querétaro

### FASE 4 — Mes 3: Deploy Puebla + EdoMéx (13 páginas)

- [ ] Subir las 13 páginas de Fase 3 (Huauchinango + Zumpango)
- [ ] Actualizar sitemap
- [ ] Revisar KPIs acumulados y ajustar estrategia si es necesario
- [ ] Considerar generación de nuevas páginas si hay gaps detectados en Search Console

### FASE 5 — Mes 4-6: Optimización Continua

- [ ] Actualizar `pages.json` con datos frescos de mercado (nuevos proyectos)
- [ ] Regenerar páginas con `node generate.js`
- [ ] A/B test de titles y meta descriptions en páginas de mayor potencial
- [ ] Expandir dimensiones: agregar páginas para colonias/zonas más específicas según demanda detectada en Search Console

---

## 3. CHECKLIST DE IMPLEMENTACIÓN

### Pre-Deploy

- [ ] **Configurar servidor** para servir URLs semánticas:
  - `cayco.mx/concreto-premezclado-zibata-queretaro/` → `pseo/output/concreto-premezclado-zibata-queretaro.html`
  - Opción A: Regla `.htaccess` con RewriteRule
  - Opción B: Copiar HTMLs a carpetas con `index.html` dentro
  - Opción C: Usar directiva `DirectoryIndex` si el servidor soporta
- [ ] **Verificar rutas relativas** de CSS/JS/imágenes en las páginas PSEO (usan `/styles/`, `/img/`, `/app.js` — rutas absolutas desde raíz)

### Deploy de Archivos

```
# Copiar páginas PSEO al servidor
scp pseo/output/*.html servidor:/var/www/cayco.mx/pseo/

# Copiar hubs
scp pseo/output/hubs/*.html servidor:/var/www/cayco.mx/hubs/

# Copiar sitemap
scp pseo/sitemap-pseo.xml servidor:/var/www/cayco.mx/

# O si se usa estructura de carpetas:
# Para cada slug, crear carpeta y copiar como index.html
for file in pseo/output/*.html; do
  slug=$(basename "$file" .html)
  mkdir -p "servidor:/$slug"
  cp "$file" "servidor:/$slug/index.html"
done
```

### Post-Deploy

- [ ] **Verificar URLs** — abrir 5 páginas representativas en el navegador:
  1. `https://cayco.mx/concreto-premezclado-zibata-queretaro/`
  2. `https://cayco.mx/concreto-para-data-centers-queretaro/`
  3. `https://cayco.mx/concreto-permeable-queretaro/`
  4. `https://cayco.mx/queretaro/` (hub)
  5. `https://cayco.mx/nearshoring-queretaro-hub/`
- [ ] **Agregar sitemap al index** — editar `sitemap.xml` principal:
  ```xml
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://cayco.mx/sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://cayco.mx/sitemap-pseo.xml</loc>
    </sitemap>
  </sitemapindex>
  ```
- [ ] **Submitir en Search Console:**
  1. Ir a Google Search Console → Sitemaps
  2. Agregar `https://cayco.mx/sitemap-pseo.xml`
  3. Verificar que se procesan las 79 URLs
- [ ] **Solicitar indexación manual** de las 5 páginas prioritarias:
  1. Search Console → URL Inspection → pegar URL → Solicitar indexación
  2. Hacer esto para las 5 páginas de mayor potencial (ver sección 5)
- [ ] **Validar Schema Markup:**
  1. Ir a https://search.google.com/test/rich-results
  2. Probar 3 URLs representativas:
     - Una de Querétaro (verificar LocalBusiness + FAQPage + C PRO)
     - Una de otra sucursal (verificar LocalBusiness sin C PRO)
     - Una de innovación (verificar FAQPage)
  3. Corregir errores si los hay
- [ ] **Verificar Badge C PRO:** abrir una página de Querétaro y una de Tulancingo side by side — confirmar que el badge solo aparece en Querétaro

### Interlinking en Sitio Actual

- [ ] **`index.html`** — Footer: cambiar links de sucursales de `ubicacion-*.html` a `/{hub}/`
- [ ] **`services.html`** — Tarjeta Innovación: agregar link a `/concretos-innovacion-hub/`
- [ ] **`concretos-innovacion.html`** — CTA: agregar link al hub innovación
- [ ] **`contact.html`** — Si lista sucursales, enlazar a hubs
- [ ] **Páginas PSEO** — (Opcional) Agregar "Ver todas las páginas de [sucursal]" en sidebar

---

## 4. KPIs Y MÉTRICAS DE ÉXITO

### Métricas de Indexación (Semanas 1-4)

| KPI | Meta Semana 2 | Meta Semana 4 | Herramienta |
|-----|---------------|---------------|-------------|
| Páginas indexadas | 15+ de 49 | 35+ de 49 | Search Console → Coverage |
| Páginas con impresiones | 5+ | 15+ | Search Console → Performance |
| Errores de crawl | 0 | 0 | Search Console → Coverage → Errors |
| Schema válido | 100% | 100% | Rich Results Test |

### Métricas de Visibilidad (Mes 1-3)

| KPI | Meta Mes 1 | Meta Mes 3 | Herramienta |
|-----|------------|------------|-------------|
| Impresiones totales PSEO | 2,000+ | 10,000+ | Search Console filtrado por páginas PSEO |
| Keywords con impresiones | 30+ | 100+ | Search Console → Queries |
| Posición promedio PSEO | < 25 | < 15 | Search Console → Performance |
| Páginas en top 20 | 5+ | 20+ | Search Console → Pages |

### Métricas de Tráfico (Mes 3-6)

| KPI | Meta Mes 3 | Meta Mes 6 | Herramienta |
|-----|------------|------------|-------------|
| Clics orgánicos PSEO | 150+/mes | 500+/mes | Search Console |
| CTR promedio PSEO | 3%+ | 4%+ | Search Console |
| Sesiones desde PSEO | 200+/mes | 700+/mes | Google Analytics |
| Incremento vs baseline | +30% | +100% | GA comparativo |

### Métricas de Conversión (Mes 6-12)

| KPI | Meta Mes 6 | Meta Mes 12 | Herramienta |
|-----|------------|-------------|-------------|
| Leads desde PSEO | 10+/mes | 30+/mes | GA Events (Form_Submission) |
| Llamadas desde PSEO | Tracking tel: clicks | 20+/mes | Mixpanel CTA_Click |
| WhatsApp desde PSEO | Tracking wa.me clicks | 15+/mes | Mixpanel CTA_Click |
| Tasa de conversión PSEO | 2%+ | 3%+ | GA (leads / sesiones) |

### Métricas por Sucursal

| Sucursal | Páginas | Meta Impresiones Mes 6 | Meta Clics Mes 6 |
|----------|---------|------------------------|------------------|
| Querétaro | 42 | 15,000+ | 400+ |
| Tulancingo | 6 | 3,000+ | 60+ |
| Pachuca | 7 | 4,000+ | 80+ |
| Huauchinango | 5 | 1,000+ | 20+ |
| Zumpango | 6 | 2,000+ | 40+ |

### Cómo Medir

**Search Console — filtro por páginas PSEO:**
1. Performance → Pages → filtrar por regex: `concreto-(premezclado|para|fc|alta|bombeable|permeable|antimicrobiano|autocompactante|arquitectonico|color|ligero|estructural)|bomba-concreto|concreteras|nearshoring|queretaro$|tulancingo$|pachuca$|huauchinango$|zumpango$|innovacion-hub`
2. Comparar periodos mes a mes

**Google Analytics — segmento PSEO:**
1. Crear segmento con landing page que contenga los slugs PSEO
2. Medir sesiones, usuarios, eventos de conversión (Form_Submission, CTA_Click)

---

## 5. PÁGINAS DE MAYOR POTENCIAL (Top 10)

Ranking basado en: volumen de mercado × baja competencia × intención de búsqueda comercial.

### 1. `concreto-para-data-centers-queretaro`
- **Por qué:** Keyword sin competencia real ("concreto data centers Querétaro"). Google, Microsoft y Amazon generan búsquedas de sus proveedores. 8,500 m³ de mercado verificado. Intención comercial muy alta.
- **Potencial:** Top 3 en 2-3 meses. Puede generar leads de alto valor (contratos industriales).

### 2. `concreto-para-nearshoring-queretaro`
- **Por qué:** "Nearshoring Querétaro" es trending pero nadie lo combina con "concreto". Primera página en cubrir este ángulo. 14,800 m³ de demanda industrial.
- **Potencial:** Top 5 en 3 meses. Posicionamiento como experto en industria 4.0.

### 3. `concreto-premezclado-zibata-queretaro`
- **Por qué:** Zibatá es la zona más activa de Querétaro con 14+ proyectos y 22,900 m³. Constructores y compradores buscan proveedores locales.
- **Potencial:** Top 5 en 2-3 meses. Volumen de búsqueda creciente con nuevos desarrollos.

### 4. `concreto-permeable-queretaro`
- **Por qué:** Nicho especializado con baja competencia. La normativa ambiental impulsa la demanda. Pocos productores ofrecen esta línea en Querétaro.
- **Potencial:** Top 3 en 1-2 meses. Keyword de nicho con intención de compra directa.

### 5. `concreto-antimicrobiano-queretaro`
- **Por qué:** Producto ultra-nicho. Prácticamente cero competencia SEO para "concreto antimicrobiano" + ubicación. Sector salud e industria alimentaria son mercados en crecimiento.
- **Potencial:** Top 1 en 1 mes. Sin competencia, indexación = posición 1.

### 6. `concreteras-en-pachuca`
- **Por qué:** Search Console muestra 294 impresiones con CTR 2.04% y posición 5.06 para "concreteras en pachuca". Página dedicada puede mejorar CTR y posición.
- **Potencial:** Top 3 en 1 mes. Keyword validada con datos reales de Search Console.

### 7. `concreto-premezclado-el-marques-queretaro`
- **Por qué:** El Marqués es el corredor industrial más dinámico (14,800 m³). Combina data centers, automotriz y logística. Alta intención comercial.
- **Potencial:** Top 5 en 2-3 meses. Múltiples keywords long-tail asociadas.

### 8. `concreto-para-torres-departamentos-queretaro`
- **Por qué:** 28,000 m³ en residencial vertical. Proyectos como Adamant (6,800 m³) y Zöul (5,900 m³) generan búsquedas de proveedores. Keyword específica sin competencia directa.
- **Potencial:** Top 5 en 2-3 meses. Alto valor por proyecto (contratos de miles de m³).

### 9. `concreto-autocompactante-queretaro`
- **Por qué:** Producto técnico de nicho. Los ingenieros y especificadores buscan proveedores locales. Muy baja competencia para esta combinación.
- **Potencial:** Top 3 en 1-2 meses. Leads de alto valor (proyectos complejos).

### 10. `concreto-premezclado-tulancingo`
- **Por qué:** Search Console muestra que "concreto tulancingo de bravo" tiene 187 impresiones con posición 1.05 pero 0 clics — la página actual no captura el clic. Una página PSEO optimizada puede convertir esas impresiones en tráfico.
- **Potencial:** Top 1-3 inmediato. Oportunidad de CTR comprobada con datos reales.

---

## 6. MANTENIMIENTO Y ESCALABILIDAD

### Cómo Agregar Nuevas Páginas

**Paso 1:** Editar `pseo/data/pages.json` — agregar un nuevo objeto con todos los campos requeridos, o agregar la entrada en `pseo/scripts/seed-pages.js` y ejecutar:
```bash
node pseo/scripts/seed-pages.js
```

**Paso 2:** Regenerar todas las páginas:
```bash
node pseo/scripts/generate.js
```

**Paso 3:** Si se agregaron hubs nuevos, regenerar:
```bash
node pseo/scripts/generate-hubs.js
```

**Paso 4:** Subir los archivos nuevos al servidor y re-submitir el sitemap.

### Frecuencia de Actualización Recomendada

| Frecuencia | Acción |
|------------|--------|
| **Mensual** | Revisar Search Console, identificar keywords con potencial, ajustar titles/descriptions |
| **Trimestral** | Actualizar datos de mercado en `pages.json` (nuevos proyectos, volúmenes actualizados), regenerar páginas |
| **Semestral** | Evaluar expansión: nuevas zonas geográficas, nuevos productos, nuevas dimensiones de páginas |
| **Anual** | Auditoría completa: eliminar páginas sin rendimiento, consolidar las de bajo tráfico, expandir las exitosas |

### Cómo Incorporar Datos Frescos del Mercado

1. **Nuevos proyectos:** Agregar en `proyectosReferencia` de las páginas de la zona correspondiente
2. **Nuevos volúmenes:** Actualizar `volumenMercado` con datos del reporte más reciente
3. **Nuevos desarrolladores:** Mencionar en `descripcionContextualP1` o `P2`
4. **Ejecutar:**
   ```bash
   # Si se editó seed-pages.js
   node pseo/scripts/seed-pages.js
   # Siempre regenerar después de cambiar datos
   node pseo/scripts/generate.js
   node pseo/scripts/generate-hubs.js
   ```

### Replicar PSEO para Nueva Sucursal

Si CAYCO abre una sexta sucursal (ej: "San Luis Potosí"):

1. **Agregar sucursal en `generate.js`:**
   ```javascript
   SUCURSALES["San Luis Potosí"] = {
     telefono: "(444) XXX XXXX",
     // ... todos los campos
   };
   ```

2. **Agregar entradas en `seed-pages.js`:**
   - Páginas de zona: `concreto-premezclado-[zona]-san-luis-potosi`
   - Páginas de producto: `concreto-para-[mercado]-san-luis-potosi`
   - Páginas de especificación: `concreto-fc-[X]-san-luis-potosi`
   - Páginas de cliente: `concreto-para-[cliente]-san-luis-potosi`

3. **Agregar hub en `generate-hubs.js`:**
   - Nueva entrada en el array `hubs`
   - Agregar a `HUB_NAV` para interlinking

4. **Regenerar todo:**
   ```bash
   node pseo/scripts/seed-pages.js
   node pseo/scripts/generate.js
   node pseo/scripts/generate-hubs.js
   ```

5. **Deploy:** Subir nuevos archivos + actualizar sitemap

**Tiempo estimado para agregar una sucursal nueva: 2-4 horas** (redacción de FAQs únicas y descripciones contextuales).

---

## 7. ARQUITECTURA DE URLs POR SUCURSAL

### Querétaro (42 páginas — Fase 1)

| Dimensión | Páginas | URLs |
|-----------|---------|------|
| Zona geográfica | 12 | `/concreto-premezclado-{zona}-queretaro/`, `/bomba-concreto-{zona}/` |
| Producto × Mercado | 7 | `/concreto-para-{mercado}-queretaro/` |
| Especificación técnica | 8 | `/concreto-fc-{X}-queretaro/`, `/concreto-{tipo}-queretaro/` |
| Cliente | 4 | `/concreto-para-{cliente}-queretaro/` |
| Innovación (Qro) | 7 | `/concreto-{tipo}-queretaro/` |
| Nearshoring | 4 | `/concreto-para-{industria}-queretaro/` |

### Tulancingo + Pachuca (17 páginas — Fase 2)

| Dimensión | Páginas | URLs |
|-----------|---------|------|
| Zona Tulancingo | 4 | `/concreto-premezclado-{zona}/` |
| Zona Pachuca | 4 | `/concreto-premezclado-{zona}/`, `/concreteras-en-pachuca/` |
| Producto/Cliente Hgo | 9 | `/concreto-para-{tipo}-hidalgo/`, `/concreto-{tipo}-{ciudad}/` |

### Huauchinango + Zumpango (13 páginas — Fase 3)

| Dimensión | Páginas | URLs |
|-----------|---------|------|
| Zona Huauchinango | 3 | `/concreto-premezclado-{zona}/` |
| Zona Zumpango | 4 | `/concreto-premezclado-{zona}/` |
| Producto/Cliente | 6 | `/concreto-para-{tipo}-{region}/` |

### Hubs (7 páginas)

| Hub | URL | Priority |
|-----|-----|----------|
| Querétaro | `/queretaro/` | 0.9 |
| Tulancingo | `/tulancingo/` | 0.9 |
| Pachuca | `/pachuca/` | 0.9 |
| Huauchinango | `/huauchinango/` | 0.9 |
| Zumpango | `/zumpango/` | 0.9 |
| Innovación | `/concretos-innovacion-hub/` | 0.9 |
| Nearshoring | `/nearshoring-queretaro-hub/` | 0.9 |

---

## 8. ESTRATEGIA DE INTERLINKING

### Estructura de Enlaces

```
Hub Querétaro (0.9)
├── 12 páginas zona (0.8) ←→ entre sí + hub
├── 7 páginas mercado (0.8) ←→ zonas relacionadas + specs
├── 8 páginas especificación (0.7) ←→ mercados + zonas
├── 4 páginas cliente (0.6) ←→ mercados + specs
└── enlaza a: Hub Innovación, Hub Nearshoring, otros hubs

Hub Innovación (0.9)
├── 7 páginas innovación (0.8) ←→ entre sí + mercados
└── enlaza a: 5 hubs sucursal, Hub Nearshoring

Hub Nearshoring (0.9)
├── 9 páginas industriales (0.7-0.8) ←→ zonas + specs
└── enlaza a: Hub Querétaro, Hub Innovación

Sitio actual
├── index.html footer → 5 hubs sucursal
├── services.html → Hub Innovación
├── concretos-innovacion.html → Hub Innovación
└── contact.html → 5 hubs sucursal
```

### Reglas de Interlinking

1. Cada página PSEO enlaza a 3-4 páginas relacionadas (mismo tipo o misma zona)
2. Cada hub enlaza a TODAS sus páginas hijas agrupadas por dimensión
3. Los 7 hubs se interenlazan entre sí mediante la barra de navegación horizontal
4. El sitio actual enlaza a los hubs desde footer y secciones de servicios
5. No crear enlaces circulares: las páginas hijas enlazan al hub padre, no entre hubs

---

## 9. STACK TÉCNICO

| Componente | Tecnología |
|------------|------------|
| Generador de páginas | Node.js (`generate.js`) |
| Generador de datos | Node.js (`seed-pages.js`) |
| Generador de hubs | Node.js (`generate-hubs.js`) |
| Template | HTML estático con variables `{{}}` |
| CSS | Bootstrap 5 + CAYCO custom (`mil-*` classes) + PSEO inline |
| Schema | JSON-LD (LocalBusiness, FAQPage, BreadcrumbList) |
| Analytics | GA4 + Meta Pixel + Mixpanel |
| Sitemap | XML generado automáticamente |

### Estructura de Archivos

```
pseo/
├── data/
│   └── pages.json                  # 72 registros de datos
├── templates/
│   └── page-template.html          # Template HTML con variables
├── scripts/
│   ├── seed-pages.js               # Genera pages.json
│   ├── generate.js                 # Genera 72 HTMLs + sitemap
│   └── generate-hubs.js            # Genera 7 hubs + actualiza sitemap
├── output/
│   ├── *.html                      # 72 páginas PSEO
│   └── hubs/
│       └── *.html                  # 7 páginas hub
├── sitemap-pseo.xml                # 79 URLs
├── ARQUITECTURA-URLS.md            # Tabla maestra de URLs
└── ESTRATEGIA.md                   # Este documento
```

---

## 10. RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Google no indexa las páginas rápido | Media | Alto | Solicitar indexación manual, crear links internos desde blog |
| Contenido considerado "thin" por Google | Baja | Alto | Cada página tiene 40%+ contenido único (FAQs, descripciones, datos de mercado) |
| Canibalización con páginas existentes | Baja | Medio | Las páginas PSEO son long-tail; las existentes son short-tail. No compiten |
| Datos de mercado desactualizados | Media | Bajo | Actualizar trimestralmente con datos frescos del reporte |
| Competidor copia la estrategia | Baja | Bajo | Ventaja de first-mover + C PRO CEMEX como diferenciador incopiable |
