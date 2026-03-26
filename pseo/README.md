# SEO Programático — CAYCO Concreto Premezclado

## Informe Ejecutivo para Cliente

**Cliente:** CAYCO Construcción S.A. de C.V.
**Dominio:** cayco.mx
**Cobertura:** Querétaro, Hidalgo, Puebla y Estado de México (5 sucursales)
**Periodo:** Q1 2026

---

## 1. Resumen Ejecutivo

Se diseñó e implementó una **Plataforma de SEO Programático (pSEO)** para el sitio web de CAYCO Concretos, transformando datos reales de mercado — **102,840 m³ de demanda verificada en 71 proyectos activos solo en Querétaro** — en un ecosistema de 80 páginas especializadas que posicionan a CAYCO como la referencia en concreto premezclado en sus 4 estados de operación.

El sistema genera automáticamente landing pages para cada combinación de **zona geográfica × tipo de producto × especificación técnica × tipo de cliente**, cubriendo desde "concreto para data centers en El Marqués" hasta "concreto F'c 250 en Zibatá". Cada página incluye datos reales de proyectos activos, FAQs únicas, schema markup para Google y CTAs con el teléfono local de la sucursal correspondiente.

**Diferenciador clave:** CAYCO es el **único productor con Distintivo C PRO CEMEX en Querétaro** (certificado febrero 2026), ventaja que se refleja condicionalmente en las páginas de esa sucursal con badge visual, schema markup y contenido contextual.

---

## 2. Objetivos del Proyecto

| Objetivo | Descripción |
|----------|-------------|
| **Dominio Multi-Regional** | Capturar búsquedas de alta intención comercial en 5 regiones simultáneamente: "concreto premezclado en [zona]", "concreto para [industria] en [ciudad]". |
| **Nearshoring como Nicho** | Posicionar a CAYCO como proveedor certificado para proyectos de nearshoring en Querétaro: data centers Google/Microsoft/Amazon, automotriz, aeroespacial. |
| **Autoridad Técnica** | Crear el mayor acervo de contenido técnico sobre concreto premezclado en la región centro de México: 287 FAQs únicas, especificaciones por resistencia, fichas por tipo de obra. |
| **Generación de Cotizaciones** | Canalizar tráfico cualificado hacia llamada telefónica (con teléfono local por sucursal), WhatsApp y formulario de cotización. |
| **Visibilidad en IA** | Permitir que asistentes de IA (ChatGPT, Claude, Perplexity, Gemini) citen a CAYCO como fuente al responder preguntas sobre concreto en Querétaro, Hidalgo, Puebla y EdoMéx. |

---

## 3. Alcance de la Implementación

Se construyó una arquitectura basada en **cuatro dimensiones cruzadas** — Zona × Producto × Especificación × Cliente — distribuidas en 5 sucursales con despliegue por fases.

### Desglose de Contenido Generado

| Tipo de Página | Cantidad | Ejemplo de URL | Descripción |
|---|---|---|---|
| Página Central de Mercado | 1 | `/mercado-concreto` | Panel general: 5 sucursales, 80 páginas, 71 proyectos, 102,840 m³ |
| Hubs de Sucursal | 5 | `/queretaro`, `/tulancingo` | Agregan todas las páginas de cada sucursal con datos de contacto |
| Hub de Innovación | 1 | `/concretos-innovacion-hub` | Productos especiales: permeable, antimicrobiano, color, SCC |
| Hub de Nearshoring | 1 | `/nearshoring-queretaro-hub` | Data centers, automotriz, parques industriales |
| Páginas por Zona Geográfica | 27 | `/concreto-premezclado-zibata-queretaro` | Landing por zona: mercado local, proyectos activos, cobertura |
| Páginas por Mercado/Industria | 17 | `/concreto-para-data-centers-queretaro` | Landing por tipo de proyecto: residencial, industrial, nearshoring |
| Páginas por Especificación | 18 | `/concreto-fc-350-queretaro` | Landing por resistencia y producto especial: F'c 200-400, SCC, permeable |
| Páginas por Tipo de Cliente | 10 | `/concreto-para-constructoras-queretaro` | Landing por perfil: constructoras, desarrolladores, gobierno, arquitectos |
| **Total pSEO** | **80** | | **Páginas generadas programáticamente** |
| Páginas principales existentes | 21 | `/`, `/services.html`, `/about.html` | Home, Servicios, Proyectos, Ubicaciones, Guías, FAQ, etc. |
| **Total General** | **101** | | **URLs indexables del sitio** |

### Distribución por Fase de Despliegue

| Fase | Sucursal | Páginas | Prioridad |
|------|----------|---------|-----------|
| **Fase 1** | Querétaro + Innovación + Nearshoring | 42 | Inmediata — mercado más grande, C PRO CEMEX |
| **Fase 2** | Tulancingo + Pachuca (Hidalgo) | 17 | Semanas 3-4 |
| **Fase 3** | Huauchinango (Puebla) + Zumpango (EdoMéx) | 13 | Mes 2 |
| **Hubs + Central** | Todas las sucursales | 8 | Con Fase 1 |

---

## 4. Arquitectura de Clusters

La plataforma opera sobre **cuatro clusters** que se cruzan para crear una malla de contenido interconectada con 80 nodos y 7 hubs.

### A. Cluster Geográfico — 5 Sucursales, 27 Zonas

| Sucursal | Estado | Zonas Cubiertas |
|----------|--------|-----------------|
| **Querétaro** (C PRO CEMEX) | Querétaro | Zibatá · Zákia · Milenio III · Juriquilla · El Marqués · Campanario · Corregidora · Sta. Rosa Jáuregui · San José el Alto · El Refugio |
| **Tulancingo** (Matriz) | Hidalgo | Tulancingo · Tulancingo de Bravo · Acaxochitlán · Cuautepec |
| **Pachuca** | Hidalgo | Pachuca · Mineral de la Reforma · Tizayuca |
| **Huauchinango** | Puebla | Huauchinango · Xicotepec · Sierra Norte |
| **Zumpango** | Edo. México | Zumpango · Tecámac · Huehuetoca · Coyotepec |

### B. Cluster de Producto — 17 Mercados

| Categoría | Páginas |
|-----------|---------|
| Nearshoring / Data Centers | Data centers, naves industriales, parques industriales, nearshoring, automotriz |
| Residencial | Desarrollos residenciales, fraccionamientos, torres y departamentos, autoconstrucción |
| Infraestructura | Carreteras, puentes, obra pública, hospitales |
| Especializado | Pisos industriales, estacionamientos |

### C. Cluster de Especificación — 18 Productos

| Tipo | Productos |
|------|-----------|
| Por Resistencia | F'c 200 · F'c 250 · F'c 300 · F'c 350 · F'c 400 · Alta resistencia |
| De Innovación | Permeable · Antimicrobiano · Autocompactante (SCC) · Arquitectónico · Color integral · Ligero |
| Por Servicio | Bombeable · Estructural |

### D. Cluster de Cliente — 10 Perfiles

Constructoras · Desarrolladores Inmobiliarios · Arquitectos · Gobierno · Autoconstrucción
(Segmentados por región: Querétaro, Hidalgo, Puebla, EdoMéx)

### Modelo de Entrelazado Interno

```
                    Página Central (/mercado-concreto)
                    ┌──────────┼──────────────┐
                    ▼          ▼              ▼
           Hub Sucursal   Hub Innovación   Hub Nearshoring
           (×5)          (1)              (1)
              ┌──────┼──────┐
              ▼      ▼      ▼
         Zona×Suc  Merc×Suc  Spec×Suc  Cliente×Suc
         (27)      (17)      (18)      (10)
              │      │        │         │
              └──────┴────────┴─────────┘
                    Interlinking cruzado:
              3-4 páginas relacionadas por nodo
```

**Cada página enlaza a:**
- 3-4 páginas relacionadas del mismo cluster (enlace lateral en sidebar)
- Su hub de sucursal padre (breadcrumb ascendente)
- Página central de mercado (navegación global)
- CTA con teléfono local de la sucursal correspondiente
- Formulario de cotización y WhatsApp de la sucursal

---

## 5. Datos Estratégicos Incluidos

Cada página generada incluye información de mercado no disponible en sitios de la competencia:

### Mercado de Querétaro (exclusivo CAYCO)

| Dato | Valor | Fuente |
|------|-------|--------|
| Demanda total verificada | 102,840 m³ | Reporte de Mercado CAYCO 2026 |
| Valor estimado del mercado | $311.5 millones MXN | Cálculo con precios promedio por tipo |
| Proyectos activos verificados | 71 | Relevamiento zona por zona |
| Zonas geográficas mapeadas | 5 (Oriente, Norte, Industrial, Centro-Poniente, Sur) | Segmentación estratégica |
| Desarrolladores identificados | 15+ | Grupo Caisa, Urbana México, Javer, Vinte, etc. |

### Proyectos Reales Mencionados en Contenido

| Proyecto | Zona | Volumen | Tipo |
|----------|------|---------|------|
| Adamant Querétaro | Milenio III | 6,800 m³ | Estructural / Lujo |
| Zöul Residences (4 torres) | Campanario Norte | 5,900 m³ | Estructural / Lujo |
| Aira Residencial | Zibatá | 5,500 m³ | Bombeable |
| Lesso Residencial | Zibatá | 5,200 m³ | Bombeable |
| VYNMSA Parque Industrial | El Marqués | 4,500 m³ | Industrial |
| Data Center Google | El Marqués | 3,200 m³ | F'c 350+ |
| Data Center Microsoft | El Marqués | 2,800 m³ | F'c 350+ |
| Data Center Amazon | El Marqués | 2,500 m³ | F'c 350+ |

### Información Técnica por Página

- Tabla de especificaciones: resistencia, uso recomendado, norma NMX, ratio m³/m²
- 4 FAQs únicas por página (287 en total, sin duplicados)
- Datos de mercado contextuales por zona (volumen, proyectos, desarrolladores)
- Schema markup: LocalBusiness + FAQPage + BreadcrumbList + Service

---

## 6. Lógica Condicional por Sucursal

El sistema aplica reglas automáticas según la sucursal de cada página:

| Condición | Querétaro | Otras Sucursales |
|-----------|-----------|------------------|
| **Badge C PRO CEMEX** | Sello visual animado en hero | No aparece |
| **Diferenciador Card 1** | "Único C PRO CEMEX en Querétaro" | "Calidad Certificada" |
| **Teléfono CTA principal** | (442) 439 7563 | Teléfono local de cada sucursal |
| **WhatsApp** | wa.me/524424397563 | Número local por sucursal |
| **Schema LocalBusiness** | Dirección San José el Alto + coordenadas | Dirección y geo de cada planta |
| **Sección Innovación** | Aparece en productos especiales | Aparece en productos especiales |
| **Datos de mercado** | Proyectos reales del reporte | Contexto regional genérico |

### Teléfonos Locales por Sucursal

| Sucursal | Teléfono Local (CTA) | WhatsApp |
|----------|----------------------|----------|
| Querétaro | (442) 439 7563 | 524424397563 |
| Tulancingo | (775) 753 38 11 | 527757533811 |
| Pachuca | (771) 143 63 26 | 527711436326 |
| Huauchinango | (776) 767 83 35 | 527767678335 |
| Zumpango | (566) 672 2875 | 525666722875 |

---

## 7. Pilares Tecnológicos y de Optimización

| Pilar | Implementación |
|-------|---------------|
| **Datos Estructurados (Schema.org)** | JSON-LD en cada página: `ConcreteContractor`, `FAQPage`, `BreadcrumbList`, `Service`, `Organization`. Diseñado para Rich Snippets y Knowledge Graph de Google. |
| **Meta Tags Completos** | `<title>` (≤60 chars), `<meta description>` (≤155 chars), keywords, Open Graph con logo actual, Twitter Cards, canonical URLs semánticas. |
| **FAQs Contextuales** | 287 preguntas únicas segmentadas por zona + producto + sucursal. 4 FAQs por página, sin duplicados entre páginas de la misma dimensión. |
| **Rendimiento** | HTML estático sin JavaScript obligatorio, CSS del sitio principal reutilizado, imágenes con lazy loading y dimensiones explícitas (width/height). |
| **Optimización para IA** | `robots.txt` permite rastreo por GPTBot, ClaudeBot, PerplexityBot y otros bots de IA. El contenido técnico está diseñado para ser citado por LLMs. |
| **URLs Semánticas** | Estructura `/concreto-premezclado-zibata-queretaro/` — descriptiva, con keyword principal en el slug. |
| **Sitemap Dedicado** | `sitemap-pseo.xml` con 80 URLs, prioridades por tipo (hubs 0.9, zonas 0.8, specs 0.7, clientes 0.6). |
| **Analytics Integrado** | Google Analytics 4, Meta Pixel y Mixpanel en cada página para tracking de conversiones. |

---

## 8. Pipeline de Generación

### Stack Técnico

| Componente | Detalle |
|------------|---------|
| **Motor** | Node.js (sin dependencias externas) |
| **Datos** | JSON generado por script seed (`seed-pages.js`) |
| **Templates** | HTML con variables `{{VARIABLE}}` — string replacement |

### Estructura de Archivos

```
pseo/
├── README.md                       # Este documento
├── ESTRATEGIA.md                   # Estrategia completa con KPIs y roadmap
├── ARQUITECTURA-URLS.md            # Tabla maestra de 79 URLs
├── data/
│   └── pages.json                  # 72 registros con contenido único
├── templates/
│   └── page-template.html          # Template HTML con 35+ variables
├── scripts/
│   ├── seed-pages.js               # Genera pages.json (datos y FAQs)
│   ├── generate.js                 # Genera 72 páginas PSEO + sitemap
│   ├── generate-hubs.js            # Genera 7 hubs + actualiza sitemap
│   └── generate-mercado.js         # Genera página central de mercado
├── output/
│   ├── *.html                      # 72 páginas PSEO generadas
│   ├── mercado-concreto.html       # Página central
│   └── hubs/
│       └── *.html                  # 7 páginas hub
└── sitemap-pseo.xml                # 80 URLs con prioridades
```

### Ejecución

```bash
cd pseo/scripts

# Paso 1: Generar dataset (si se modificaron datos)
node seed-pages.js

# Paso 2: Generar las 72 páginas PSEO + sitemap
node generate.js

# Paso 3: Generar los 7 hubs
node generate-hubs.js

# Paso 4: Generar la página central de mercado
node generate-mercado.js
```

**Salida:** 80 archivos HTML en `pseo/output/` + sitemap actualizado con prioridades.

### Escalabilidad

| Acción | Procedimiento |
|--------|---------------|
| Agregar nueva zona | Agregar entrada en `seed-pages.js` → ejecutar los 4 scripts |
| Agregar nuevo producto | Agregar specs en `generate.js` + entrada en seed → regenerar |
| Actualizar datos de mercado | Editar descripciones y proyectos en seed → regenerar |
| Agregar nueva sucursal | Agregar en `SUCURSALES` de generate.js + entradas en seed → regenerar |
| **Tiempo estimado** | **2-4 horas** para una sucursal nueva completa |

---

## 9. Integración con el Sitio Actual

| Punto de Integración | Implementación |
|----------------------|----------------|
| **Footer de todas las páginas** | Links de sucursales apuntan a hubs pSEO (`/queretaro/`, `/tulancingo/`, etc.) |
| **Página de Servicios** | Enlace al hub de innovación (`/concretos-innovacion-hub/`) |
| **Página de Innovación** | Enlace al hub de innovación con catálogo completo |
| **Página de Contacto** | Cada sucursal enlaza a su hub con páginas especializadas |
| **Sitemap principal** | Referencia a `sitemap-pseo.xml` como sitemap secundario |
| **Open Graph** | Logo actualizado (`logoRojo.png`) en todas las páginas del sitio |

---

## 10. Cronograma de Impacto

| Periodo | Fase | Resultado Esperado |
|---------|------|--------------------|
| **Semanas 1-2** | Deploy + Indexación | Subir 80 páginas al servidor. Submitir sitemap en Search Console. Google descubre las URLs. |
| **Semanas 2-4** | Indexación inicial | 30-40% de páginas indexadas. Primeras impresiones en keywords long-tail. |
| **Meses 1-3** | Consolidación | 60%+ de páginas indexadas. Posiciones 5-20 en keywords como "concreto permeable Querétaro", "concreto data centers El Marqués". |
| **Meses 3-6** | Autoridad | 24+ páginas en top 10. Incremento de +75-150% en tráfico orgánico vs baseline. Primeros leads desde páginas pSEO. |
| **Meses 6-12** | Dominio | 35+ páginas rankeando. +150-300% tráfico orgánico. CAYCO como referencia en búsquedas de concreto en 4 estados. |

### Proyección de Tráfico (Conservadora)

| Métrica | Baseline Actual | Meta Mes 6 | Meta Mes 12 |
|---------|-----------------|------------|-------------|
| Impresiones mensuales | 5,738 | 20,000+ | 35,000+ |
| Clics orgánicos mensuales | 131 | 600+ | 1,200+ |
| CTR promedio | 2.29% | 4%+ | 5%+ |
| Páginas en top 10 | 5 | 24+ | 35+ |
| Leads desde pSEO | 0 | 10+/mes | 30+/mes |

---

## 11. Páginas de Mayor Potencial

Las 5 páginas con mayor probabilidad de rankear rápido y generar leads:

| # | Página | Por Qué |
|---|--------|---------|
| 1 | `/concreto-para-data-centers-queretaro` | Keyword sin competencia. Google, Microsoft, Amazon generan búsquedas. 8,500 m³ verificados. |
| 2 | `/concreto-para-nearshoring-queretaro` | "Nearshoring Querétaro" es trending, nadie lo combina con "concreto". First mover. |
| 3 | `/concreto-permeable-queretaro` | Nicho ultra-específico, demanda creciente por normativa ambiental, cero competencia SEO. |
| 4 | `/concreto-antimicrobiano-queretaro` | Sin competencia. Indexación = posición 1. Sector salud e industria alimentaria. |
| 5 | `/concreteras-en-pachuca` | Keyword validada en Search Console: 294 impresiones, posición 5.06 — solo necesita una página dedicada. |

---

## 12. Beneficios para CAYCO

| Beneficio | Detalle |
|-----------|---------|
| **Cobertura multi-regional** | 80 landing pages en 5 regiones que ningún competidor tiene. Cada sucursal tiene su ecosistema de páginas. |
| **Diferenciador incopiable** | El badge C PRO CEMEX en Querétaro es un diferenciador real que la competencia no puede replicar. |
| **Datos de mercado como barrera** | Los 71 proyectos verificados y $311.5M MXN en datos de mercado no están disponibles públicamente. |
| **Conversión contextualizada** | Cada página muestra el teléfono local de la sucursal más cercana — no un genérico. El usuario llama directo. |
| **Costo operativo mínimo** | HTML estático, sin base de datos ni servidor de aplicaciones. Se actualiza ejecutando 4 scripts Node.js. |
| **Preparación para IA** | Contenido técnico estructurado con schema markup y FAQs que los LLMs pueden citar como fuente. |
| **Escalable** | Agregar una sucursal nueva toma 2-4 horas. Actualizar datos de mercado y regenerar: 10 minutos. |

---

## 13. Métricas de Verificación

El proyecto fue verificado con las siguientes métricas de calidad:

| Verificación | Resultado |
|-------------|-----------|
| Total archivos HTML generados | 80 |
| URLs en sitemap | 80 |
| Variables sin reemplazar (`{{`) | 0 |
| FAQs generadas | 288 |
| FAQs únicas (sin duplicados) | 287 (99.7%) |
| Schema markup por página | 3 (LocalBusiness + FAQPage + BreadcrumbList) |
| Badge C PRO solo en Querétaro | Verificado |
| Teléfono local correcto por sucursal | Verificado (5 sucursales) |
| Tamaño promedio por página | 50 KB |
| Tamaño total del proyecto pSEO | 3.9 MB |

---

*Estrategia y Tecnología por Teseo Data Lab — Q1 2026*
