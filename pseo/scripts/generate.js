#!/usr/bin/env node
/**
 * CAYCO Concretos — PSEO Page Generator
 * Genera páginas HTML estáticas a partir de pages.json y page-template.html
 */

const fs = require('fs');
const path = require('path');

// ─── Paths ───────────────────────────────────────────────────────────────────
const ROOT        = path.join(__dirname, '..');
const DATA_FILE   = path.join(ROOT, 'data', 'pages.json');
const TEMPLATE    = path.join(ROOT, 'templates', 'page-template.html');
const OUTPUT_DIR  = path.join(ROOT, 'output');
const SITEMAP     = path.join(ROOT, 'sitemap-pseo.xml');

// ─── Sucursal Data (lookup) ──────────────────────────────────────────────────
const SUCURSALES = {
  "Tulancingo": {
    telefono:       "(775) 753 38 11",
    telefonoLink:   "+527757533811",
    telefonoSchema: "+52-775-753-3811",
    telefonoWA:     "527711436326",
    telefonos:      ["(775) 753 40 46", "(775) 112 01 60"],
    direccion:      "Libramiento La Joya 200, El Cerezo, Tulancingo, Hidalgo C.P. 43660",
    street:         "Libramiento La Joya 200, El Cerezo",
    locality:       "Tulancingo de Bravo",
    region:         "Hidalgo",
    postal:         "43660",
    lat:            20.0834,
    lng:            -98.3625,
    hubUrl:         "tulancingo"
  },
  "Pachuca": {
    telefono:       "(775) 753 38 11",
    telefonoLink:   "+527757533811",
    telefonoSchema: "+52-775-753-3811",
    telefonoWA:     "527711436326",
    telefonos:      ["(775) 753 40 46", "(775) 112 01 60"],
    direccion:      "Boulevard Las Torres S/N, Mineral de la Reforma, Hidalgo C.P. 75169",
    street:         "Boulevard Las Torres S/N",
    locality:       "Mineral de la Reforma",
    region:         "Hidalgo",
    postal:         "75169",
    lat:            20.0914,
    lng:            -98.7624,
    hubUrl:         "pachuca"
  },
  "Huauchinango": {
    telefono:       "(775) 753 38 11",
    telefonoLink:   "+527757533811",
    telefonoSchema: "+52-775-753-3811",
    telefonoWA:     "527711436326",
    telefonos:      ["(775) 753 40 46", "(775) 112 01 60"],
    direccion:      "Cuacuila-Xaltepec, 73173 Huauchinango, Puebla",
    street:         "Cuacuila-Xaltepec",
    locality:       "Huauchinango",
    region:         "Puebla",
    postal:         "73173",
    lat:            20.1733,
    lng:            -98.0523,
    hubUrl:         "huauchinango"
  },
  "Querétaro": {
    telefono:       "(775) 753 38 11",
    telefonoLink:   "+527757533811",
    telefonoSchema: "+52-775-753-3811",
    telefonoWA:     "527711436326",
    telefonos:      ["(775) 753 40 46", "(775) 112 01 60"],
    direccion:      "Luis Donaldo Colosio 257-274, 76147 San José el Alto, Querétaro",
    street:         "Luis Donaldo Colosio 257-274",
    locality:       "San José el Alto",
    region:         "Querétaro",
    postal:         "76147",
    lat:            20.6597,
    lng:            -100.4101,
    hubUrl:         "queretaro"
  },
  "Zumpango": {
    telefono:       "(775) 753 38 11",
    telefonoLink:   "+527757533811",
    telefonoSchema: "+52-775-753-3811",
    telefonoWA:     "527711436326",
    telefonos:      ["(775) 753 40 46", "(775) 112 01 60"],
    direccion:      "Ex-Hacienda Guadalupe, 55630, Zumpango, Estado de México",
    street:         "Ex-Hacienda Guadalupe",
    locality:       "Zumpango",
    region:         "Estado de México",
    postal:         "55630",
    lat:            19.7956,
    lng:            -99.0989,
    hubUrl:         "zumpango"
  }
};

// ─── Specs Templates (by category) ──────────────────────────────────────────
const SPECS = {
  "general": [
    { tipo: "Convencional F'c 150",  uso: "Firmes, banquetas, pisos no estructurales",         norma: "NMX-C-155-ONNCCE",   ratio: "0.12" },
    { tipo: "Convencional F'c 200",  uso: "Cimentación, zapatas, contratrabes",                norma: "NMX-C-155-ONNCCE",   ratio: "0.18" },
    { tipo: "Estructural F'c 250",   uso: "Columnas, trabes, losas, muros de carga",           norma: "NMX-C-155-ONNCCE",   ratio: "0.25" },
    { tipo: "Alta Resistencia F'c 300", uso: "Edificios 5+ pisos, estacionamientos",           norma: "NMX-C-155-ONNCCE",   ratio: "0.30" },
    { tipo: "Alta Resistencia F'c 350+", uso: "Torres, puentes, infraestructura crítica",       norma: "NMX-C-155-ONNCCE",   ratio: "0.35" },
    { tipo: "Bombeable",             uso: "Colados en altura, zonas de difícil acceso",         norma: "NMX-C-155-ONNCCE",   ratio: "Variable" }
  ],
  "residencial": [
    { tipo: "Convencional F'c 150",  uso: "Firmes, banquetas, bardas perimetrales",            norma: "NMX-C-155-ONNCCE",   ratio: "0.12" },
    { tipo: "Convencional F'c 200",  uso: "Cimentación, zapatas corridas, losas de piso",      norma: "NMX-C-155-ONNCCE",   ratio: "0.18" },
    { tipo: "Estructural F'c 250",   uso: "Columnas, losas de entrepiso, trabes",              norma: "NMX-C-155-ONNCCE",   ratio: "0.25" },
    { tipo: "Bombeable F'c 250",     uso: "Colados en niveles superiores, zonas reducidas",     norma: "NMX-C-155-ONNCCE",   ratio: "0.25" }
  ],
  "industrial": [
    { tipo: "Estructural F'c 250",   uso: "Cimentación de naves, muros de contención",         norma: "NMX-C-155-ONNCCE",   ratio: "0.20" },
    { tipo: "Alta Resistencia F'c 300", uso: "Pisos industriales con tráfico pesado",           norma: "NMX-C-155-ONNCCE",   ratio: "0.28" },
    { tipo: "Alta Resistencia F'c 350+", uso: "Losas de alta carga, cimentación profunda",      norma: "NMX-C-155-ONNCCE",   ratio: "0.35" },
    { tipo: "F'c 400+",              uso: "Cimentación de data centers, infraestructura crítica", norma: "NMX-C-155-ONNCCE",  ratio: "0.40" },
    { tipo: "MR-45",                 uso: "Pavimentos industriales rígidos",                    norma: "N-CMT-4-04",         ratio: "0.15" }
  ],
  "vertical": [
    { tipo: "Estructural F'c 250",   uso: "Columnas, muros de corte, cimentación",             norma: "NMX-C-155-ONNCCE",   ratio: "0.25" },
    { tipo: "Estructural F'c 300",   uso: "Columnas principales, núcleos de elevador",         norma: "NMX-C-155-ONNCCE",   ratio: "0.30" },
    { tipo: "Bombeable F'c 250-300", uso: "Colados en altura hasta 52m con bomba pluma",        norma: "NMX-C-155-ONNCCE",   ratio: "0.30" },
    { tipo: "Autocompactante",       uso: "Zonas congestionadas de acero, geometrías complejas", norma: "NMX-C-155-ONNCCE",  ratio: "0.32" },
    { tipo: "Ligero",                uso: "Rellenos, firmes en niveles superiores",              norma: "NMX-C-155-ONNCCE",  ratio: "0.15" }
  ],
  "innovacion-permeable": [
    { tipo: "Permeable Drenante",    uso: "Estacionamientos, andadores, plazas",                norma: "NMX-C-155-ONNCCE",   ratio: "0.15" },
    { tipo: "Permeable Alta Porosidad", uso: "Áreas de infiltración pluvial, parques",          norma: "ACI 522R",           ratio: "0.18" },
    { tipo: "Convencional F'c 200",  uso: "Cimentación perimetral y guarniciones",              norma: "NMX-C-155-ONNCCE",   ratio: "0.12" }
  ],
  "innovacion-antimicrobiano": [
    { tipo: "Antimicrobiano F'c 250",  uso: "Pisos de hospitales, clínicas, laboratorios",      norma: "NMX-C-155-ONNCCE",   ratio: "0.25" },
    { tipo: "Antimicrobiano F'c 300",  uso: "Plantas de alimentos, cocinas industriales",       norma: "NMX-C-155-ONNCCE",   ratio: "0.28" },
    { tipo: "Autocompactante Antimicrobiano", uso: "Acabado liso sin juntas, áreas estériles",  norma: "NMX-C-155-ONNCCE",   ratio: "0.30" }
  ],
  "innovacion-autocompactante": [
    { tipo: "Autocompactante F'c 250", uso: "Muros delgados, alta densidad de acero",           norma: "NMX-C-155-ONNCCE",   ratio: "0.28" },
    { tipo: "Autocompactante F'c 300", uso: "Columnas circulares, geometrías complejas",        norma: "NMX-C-155-ONNCCE",   ratio: "0.32" },
    { tipo: "Autocompactante F'c 350", uso: "Estructuras prefabricadas, dovelas",               norma: "NMX-C-155-ONNCCE",   ratio: "0.35" }
  ],
  "innovacion-color": [
    { tipo: "Color Integral Ocre",    uso: "Plazas, andadores, fachadas",                       norma: "NMX-C-155-ONNCCE",   ratio: "0.15" },
    { tipo: "Color Integral Rojo",    uso: "Banquetas, accesos, estacionamientos visibles",     norma: "NMX-C-155-ONNCCE",   ratio: "0.15" },
    { tipo: "Color Integral Gris Claro", uso: "Acabados arquitectónicos, exteriores modernos",  norma: "NMX-C-155-ONNCCE",   ratio: "0.15" },
    { tipo: "Color Personalizado",    uso: "Proyectos arquitectónicos a especificación",        norma: "NMX-C-155-ONNCCE",   ratio: "0.15" }
  ],
  "innovacion-arquitectonico": [
    { tipo: "Arquitectónico Aparente F'c 250", uso: "Muros aparentes, fachadas sin recubrimiento", norma: "NMX-C-155-ONNCCE", ratio: "0.28" },
    { tipo: "Arquitectónico Color F'c 250",    uso: "Acabado integral con pigmento, exteriores",   norma: "NMX-C-155-ONNCCE", ratio: "0.25" },
    { tipo: "Arquitectónico Texturizado",      uso: "Superficies decorativas, plazas públicas",    norma: "NMX-C-155-ONNCCE", ratio: "0.20" }
  ],
  "bombeo": [
    { tipo: "Bombeable F'c 200",     uso: "Cimentación en zonas de difícil acceso",             norma: "NMX-C-155-ONNCCE",   ratio: "0.20" },
    { tipo: "Bombeable F'c 250",     uso: "Estructuras hasta 30m de altura",                    norma: "NMX-C-155-ONNCCE",   ratio: "0.25" },
    { tipo: "Bombeable F'c 300",     uso: "Torres y edificios 10+ pisos, hasta 52m",            norma: "NMX-C-155-ONNCCE",   ratio: "0.30" },
    { tipo: "Tiro Directo",          uso: "Cimentación accesible, volúmenes grandes",           norma: "NMX-C-155-ONNCCE",   ratio: "Variable" },
    { tipo: "Bomba Estacionaria",    uso: "Distancias largas horizontales, túneles",            norma: "NMX-C-155-ONNCCE",   ratio: "Variable" }
  ],
  "carreteras": [
    { tipo: "MR-42",                 uso: "Pavimentos locales y vialidades secundarias",         norma: "N-CMT-4-04",         ratio: "0.15" },
    { tipo: "MR-45",                 uso: "Carreteras estatales y autopistas",                   norma: "N-CMT-4-04",         ratio: "0.18" },
    { tipo: "MR-50",                 uso: "Vialidades de alto tráfico pesado",                   norma: "N-CMT-4-04",         ratio: "0.20" },
    { tipo: "F'c 250 Estructural",   uso: "Puentes vehiculares, pasos a desnivel",              norma: "NMX-C-155-ONNCCE",   ratio: "0.30" },
    { tipo: "F'c 350+",             uso: "Superestructura de puentes, pilas, estribos",          norma: "NMX-C-155-ONNCCE",   ratio: "0.35" }
  ],
  "resistencia-fc200": [
    { tipo: "F'c 200 Convencional",  uso: "Zapatas aisladas, cimentación corrida",               norma: "NMX-C-155-ONNCCE",   ratio: "0.18" },
    { tipo: "F'c 200 Bombeable",     uso: "Cimentación en zonas de difícil acceso",              norma: "NMX-C-155-ONNCCE",   ratio: "0.20" },
    { tipo: "F'c 200 con Aditivo",   uso: "Colados en clima extremo, fraguado controlado",       norma: "NMX-C-155-ONNCCE",   ratio: "0.18" }
  ],
  "resistencia-fc250": [
    { tipo: "F'c 250 Estructural",   uso: "Columnas, trabes, losas de entrepiso",               norma: "NMX-C-155-ONNCCE",   ratio: "0.25" },
    { tipo: "F'c 250 Bombeable",     uso: "Estructuras hasta 30m, colados en altura",            norma: "NMX-C-155-ONNCCE",   ratio: "0.25" },
    { tipo: "F'c 250 Autocompactante", uso: "Muros delgados, alta densidad de refuerzo",         norma: "NMX-C-155-ONNCCE",   ratio: "0.28" }
  ],
  "resistencia-fc300": [
    { tipo: "F'c 300 Estructural",   uso: "Edificios 5-10 pisos, estacionamientos",             norma: "NMX-C-155-ONNCCE",   ratio: "0.30" },
    { tipo: "F'c 300 Bombeable",     uso: "Torres, colados en altura con bomba pluma",           norma: "NMX-C-155-ONNCCE",   ratio: "0.30" },
    { tipo: "F'c 300 Autocompactante", uso: "Geometrías complejas, prefabricados",               norma: "NMX-C-155-ONNCCE",   ratio: "0.32" }
  ],
  "resistencia-fc350": [
    { tipo: "F'c 350 Alta Resistencia", uso: "Torres 10+ pisos, infraestructura pesada",         norma: "NMX-C-155-ONNCCE",   ratio: "0.35" },
    { tipo: "F'c 350 Bombeable",     uso: "Colados en altura hasta 52m",                         norma: "NMX-C-155-ONNCCE",   ratio: "0.35" },
    { tipo: "F'c 350 Industrial",    uso: "Pisos de data centers, losas de alta carga",          norma: "NMX-C-155-ONNCCE",   ratio: "0.40" }
  ],
  "resistencia-fc400": [
    { tipo: "F'c 400 Ultra Alta",    uso: "Estructuras especiales, infraestructura crítica",     norma: "NMX-C-155-ONNCCE",   ratio: "0.40" },
    { tipo: "F'c 400 Prefabricado",  uso: "Dovelas, trabes prefabricadas de gran claro",        norma: "NMX-C-155-ONNCCE",   ratio: "0.38" },
    { tipo: "F'c 400+ Diseño Especial", uso: "Diseño de mezcla a proyecto, consultar",          norma: "NMX-C-155-ONNCCE",   ratio: "Consultar" }
  ]
};

// ─── Innovation Section Templates ────────────────────────────────────────────
const INNOVACION_KEYWORDS = ['permeable', 'antimicrobiano', 'autocompactante', 'color', 'arquitect'];

function getInnovacionHTML(producto) {
  const p = (producto || '').toLowerCase();

  if (p.includes('permeable')) {
    return `
    <section class="mil-soft-bg">
        <div class="container mil-p-120-60">
            <div class="mil-background-grid mil-softened"></div>
            <div class="row justify-content-center mil-mb-60">
                <div class="col-lg-8 text-center">
                    <h2 class="mil-upper mil-up mil-mb-30">¿Por Qué Concreto Permeable?</h2>
                    <p class="mil-up">Tecnología que permite la infiltración natural del agua pluvial, reduciendo escurrimientos y cumpliendo normativas ambientales.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-tint"></i></div>
                        <h4 class="mil-upper mil-mb-15">Drenaje Natural</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Permite el paso del agua a través de su estructura porosa (15-25% de porosidad), eliminando la necesidad de sistemas de drenaje complejos.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-leaf"></i></div>
                        <h4 class="mil-upper mil-mb-15">Sustentable</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Recarga mantos acuíferos, reduce islas de calor y cumple con normativa ambiental para infiltración pluvial en desarrollos nuevos.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-parking"></i></div>
                        <h4 class="mil-upper mil-mb-15">Uso Real</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Ideal para estacionamientos, andadores, plazas comerciales y áreas exteriores donde se requiere control de escurrimientos pluviales.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
  }

  if (p.includes('antimicrobiano')) {
    return `
    <section class="mil-soft-bg">
        <div class="container mil-p-120-60">
            <div class="mil-background-grid mil-softened"></div>
            <div class="row justify-content-center mil-mb-60">
                <div class="col-lg-8 text-center">
                    <h2 class="mil-upper mil-up mil-mb-30">¿Por Qué Concreto Antimicrobiano?</h2>
                    <p class="mil-up">Tecnología que inhibe el crecimiento bacteriano en la superficie del concreto, creando entornos más higiénicos.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-shield-virus"></i></div>
                        <h4 class="mil-upper mil-mb-15">Protección Activa</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Aditivos con tecnología de iones de plata integrados en la mezcla que inhiben hasta el 99.9% del crecimiento bacteriano superficial.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-hospital"></i></div>
                        <h4 class="mil-upper mil-mb-15">Hospitales y Clínicas</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Diseñado para pisos de hospitales, laboratorios, plantas de alimentos y cualquier espacio que requiera control microbiológico estricto.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-clock"></i></div>
                        <h4 class="mil-upper mil-mb-15">Durabilidad Permanente</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">La protección antimicrobiana está integrada en la masa del concreto — no es un recubrimiento superficial que se desgaste con el tiempo.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
  }

  if (p.includes('autocompactante')) {
    return `
    <section class="mil-soft-bg">
        <div class="container mil-p-120-60">
            <div class="mil-background-grid mil-softened"></div>
            <div class="row justify-content-center mil-mb-60">
                <div class="col-lg-8 text-center">
                    <h2 class="mil-upper mil-up mil-mb-30">¿Por Qué Concreto Autocompactante?</h2>
                    <p class="mil-up">Fluye por gravedad sin necesidad de vibrado, llenando hasta las geometrías más complejas con acabado superficial superior.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-water"></i></div>
                        <h4 class="mil-upper mil-mb-15">Sin Vibrado</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Elimina el proceso de vibrado mecánico, reduciendo ruido, tiempo de colado y mano de obra. Ideal para colados nocturnos en zona urbana.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-drafting-compass"></i></div>
                        <h4 class="mil-upper mil-mb-15">Geometrías Complejas</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Penetra secciones con alta densidad de acero de refuerzo, columnas circulares y muros delgados donde el vibrado convencional no llega.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-gem"></i></div>
                        <h4 class="mil-upper mil-mb-15">Acabado Superior</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Superficie lisa y uniforme sin oquedades. Reduce costos de resane y preparación para acabados finales en muros aparentes.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
  }

  if (p.includes('color') || p.includes('arquitect')) {
    return `
    <section class="mil-soft-bg">
        <div class="container mil-p-120-60">
            <div class="mil-background-grid mil-softened"></div>
            <div class="row justify-content-center mil-mb-60">
                <div class="col-lg-8 text-center">
                    <h2 class="mil-upper mil-up mil-mb-30">¿Por Qué Concreto Arquitectónico?</h2>
                    <p class="mil-up">Acabados decorativos integrales que eliminan la necesidad de recubrimientos adicionales, reduciendo costos y tiempos de obra.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-palette"></i></div>
                        <h4 class="mil-upper mil-mb-15">Color Integral</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Pigmentos inorgánicos integrados en la masa del concreto: ocre, rojo, gris claro y tonos personalizados que no se decoloran con el tiempo.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-building"></i></div>
                        <h4 class="mil-upper mil-mb-15">Concreto Aparente</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Acabado liso sin recubrimiento para fachadas, muros interiores y elementos arquitectónicos. Diseño contemporáneo con estructura visible.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mil-up mil-mb-60">
                    <div class="pseo-innovacion-card">
                        <div class="pseo-innov-icon"><i class="fas fa-coins"></i></div>
                        <h4 class="mil-upper mil-mb-15">Ahorro Real</h4>
                        <p style="font-size:14px;color:rgba(0,0,0,.7);">Elimina pintura, aplanados y recubrimientos. El acabado final se logra en el colado, reduciendo costos de mano de obra hasta un 30%.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
  }

  return '';
}

// ─── Builder Functions ───────────────────────────────────────────────────────

function buildSpecsRows(category) {
  const rows = SPECS[category] || SPECS['general'];
  return rows.map(r =>
    `                                <tr>
                                    <td><strong>${r.tipo}</strong></td>
                                    <td>${r.uso}</td>
                                    <td>${r.norma}</td>
                                    <td>${r.ratio}</td>
                                </tr>`
  ).join('\n');
}

function buildFaqItems(faqs) {
  if (!faqs || !faqs.length) return '';
  return faqs.map((faq, i) =>
    `                    <div class="pseo-faq-item">
                        <button class="pseo-faq-question" aria-expanded="${i === 0 ? 'true' : 'false'}">
                            ${faq.pregunta}
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="pseo-faq-answer" style="${i === 0 ? '' : 'display:none;'}">
                            <p>${faq.respuesta}</p>
                        </div>
                    </div>`
  ).join('\n');
}

function buildFaqSchema(faqs) {
  if (!faqs || !faqs.length) return '';
  return faqs.map(faq => {
    const q = faq.pregunta.replace(/"/g, '\\"');
    const a = faq.respuesta.replace(/"/g, '\\"');
    return `      {
        "@type": "Question",
        "name": "${q}",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "${a}"
        }
      }`;
  }).join(',\n');
}

function buildProyectosCards(proyectos) {
  if (!proyectos || !proyectos.length) return '<p style="color:rgba(0,0,0,.5);font-size:14px;">Consulta proyectos activos en la zona con nuestro equipo comercial.</p>';
  const icons = ['fa-building', 'fa-city', 'fa-warehouse', 'fa-hotel', 'fa-industry', 'fa-server', 'fa-home', 'fa-road'];
  return proyectos.map((p, i) =>
    `                    <div class="pseo-project-card">
                        <div class="pseo-project-card__icon"><i class="fas ${icons[i % icons.length]}"></i></div>
                        <div>
                            <div class="pseo-project-card__title">${p}</div>
                            <div class="pseo-project-card__meta">Proyecto activo en la zona</div>
                        </div>
                    </div>`
  ).join('\n');
}

function buildRelatedLinks(slugs, slugToH1) {
  if (!slugs || !slugs.length) return '';
  return slugs.map(slug => {
    const label = slugToH1[slug] || slug.replace(/-/g, ' ');
    return `                        <a href="/${slug}/" class="pseo-link-card">
                            <i class="fas fa-arrow-right"></i>
                            <span>${label}</span>
                        </a>`;
  }).join('\n');
}

function buildBadgeCpro(sucursal) {
  if (sucursal !== 'Querétaro') return '';
  return `<span class="pseo-badge-cpro">
                        <i class="fas fa-certificate"></i>
                        Distintivo C PRO CEMEX — Único en Querétaro
                    </span>`;
}

function buildVolumenHero(volumen) {
  if (!volumen) return '';
  return `<div class="pseo-hero-dato mil-mb-30">
                        <i class="fas fa-chart-line" style="margin-right:8px;"></i> ${volumen}
                    </div>`;
}

function buildTelefonosGenerales(telefonos) {
  return telefonos.map(t =>
    `                            <li><a href="tel:+52${t.replace(/[^0-9]/g, '')}">${t}</a></li>`
  ).join('\n');
}

function isInnovacion(producto) {
  if (!producto) return false;
  const p = producto.toLowerCase();
  return INNOVACION_KEYWORDS.some(k => p.includes(k));
}

// ─── Main Generator ──────────────────────────────────────────────────────────

function generate() {
  console.log('CAYCO PSEO Generator v1.0');
  console.log('═'.repeat(50));

  // Load data
  const pages = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const template = fs.readFileSync(TEMPLATE, 'utf-8');

  // Create output dir
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Build slug → H1 lookup
  const slugToH1 = {};
  pages.forEach(p => { slugToH1[p.slug] = p.h1Short || p.h1; });

  let generated = 0;
  let errors = [];
  const byPhase = { 1: 0, 2: 0, 3: 0 };

  pages.forEach((page, idx) => {
    try {
      const suc = SUCURSALES[page.sucursal];
      if (!suc) throw new Error(`Sucursal desconocida: ${page.sucursal}`);

      let html = template;

      // ── Simple replacements ──
      const replacements = {
        '{{SLUG}}':               page.slug,
        '{{H1}}':                 page.h1,
        '{{META_TITLE}}':         page.metaTitle,
        '{{META_DESCRIPTION}}':   page.metaDescription,
        '{{KEYWORD}}':            page.keyword,
        '{{SUCURSAL}}':           page.sucursal,
        '{{ZONA}}':               page.zona,
        '{{PRODUCTO}}':           page.producto || 'Concreto Premezclado',
        '{{DIRECCION}}':          suc.direccion,
        '{{TELEFONO_LOCAL}}':     suc.telefono,
        '{{TELEFONO_LOCAL_LINK}}': suc.telefonoLink,
        '{{TELEFONO_LOCAL_SCHEMA}}': suc.telefonoSchema,
        '{{TELEFONO_WA}}':        suc.telefonoWA,
        '{{SCHEMA_STREET}}':      suc.street,
        '{{SCHEMA_LOCALITY}}':    suc.locality,
        '{{SCHEMA_REGION}}':      suc.region,
        '{{SCHEMA_POSTAL}}':      suc.postal,
        '{{SCHEMA_LAT}}':         String(suc.lat),
        '{{SCHEMA_LNG}}':         String(suc.lng),
        '{{BREADCRUMB_PARENT_URL}}': `ubicacion-${suc.hubUrl}.html`,
        '{{BREADCRUMB_CURRENT}}': page.h1Short || page.zona || page.h1,
        '{{VOLUMEN_MERCADO}}':    page.volumenMercado || 'Consultar con equipo comercial',
        '{{DESCRIPCION_CONTEXTUAL_TITULO}}': page.descripcionContextualTitulo || `Mercado de Concreto en ${page.zona}`,
        '{{DESCRIPCION_CONTEXTUAL_P1}}': page.descripcionContextualP1 || '',
        '{{DESCRIPCION_CONTEXTUAL_P2}}': page.descripcionContextualP2 || '',
        '{{WA_MESSAGE}}':         encodeURIComponent(`Hola, me interesa cotizar concreto premezclado para ${page.zona}`)
      };

      // ── Conditional: Badge C PRO ──
      replacements['{{BADGE_CPRO}}'] = buildBadgeCpro(page.sucursal);

      // ── Conditional: Volumen hero ──
      replacements['{{VOLUMEN_MERCADO_HERO}}'] = buildVolumenHero(page.volumenMercado);

      // ── Conditional: Innovation section ──
      replacements['{{SECCION_INNOVACION}}'] = isInnovacion(page.producto)
        ? getInnovacionHTML(page.producto)
        : '';

      // ── Conditional: Diferenciador Card 1 ──
      if (page.sucursal === 'Querétaro') {
        replacements['{{DIFERENCIADOR_1_TITULO}}'] = 'Distintivo C PRO CEMEX';
        replacements['{{DIFERENCIADOR_1_TEXTO}}'] = 'Único productor certificado C PRO CEMEX en Querétaro. Calidad de clase mundial en mezclas, proceso y servicio — certificado febrero 2026.';
      } else {
        replacements['{{DIFERENCIADOR_1_TITULO}}'] = 'Calidad Certificada';
        replacements['{{DIFERENCIADOR_1_TEXTO}}'] = 'Control de calidad riguroso en cada mezcla. Laboratorio propio, pruebas de resistencia y cumplimiento estricto de normas NMX en cada entrega.';
      }

      // ── Complex builders ──
      replacements['{{SPECS_TABLE_ROWS}}']       = buildSpecsRows(page.specsCategory || 'general');
      replacements['{{PROYECTOS_CARDS}}']        = buildProyectosCards(page.proyectosReferencia);
      replacements['{{RELATED_LINKS}}']          = buildRelatedLinks(page.relatedSlugs, slugToH1);
      replacements['{{FAQ_ITEMS}}']              = buildFaqItems(page.faqItems);
      replacements['{{FAQ_SCHEMA_ITEMS}}']       = buildFaqSchema(page.faqItems);
      replacements['{{TELEFONOS_GENERALES_LIST}}'] = buildTelefonosGenerales(suc.telefonos);

      // ── Apply all replacements ──
      Object.entries(replacements).forEach(([key, value]) => {
        html = html.split(key).join(String(value));
      });

      // ── Write output ──
      const outPath = path.join(OUTPUT_DIR, `${page.slug}.html`);
      fs.writeFileSync(outPath, html, 'utf-8');
      generated++;

      // Track phase
      const phase = page.fase || 1;
      byPhase[phase] = (byPhase[phase] || 0) + 1;

    } catch (err) {
      errors.push({ slug: page.slug, error: err.message });
    }
  });

  // ── Generate Sitemap ──
  generateSitemap(pages);

  // ── Summary ──
  console.log(`\n${'─'.repeat(50)}`);
  console.log(`RESUMEN DE GENERACIÓN`);
  console.log(`${'─'.repeat(50)}`);
  console.log(`Total páginas generadas:  ${generated}`);
  console.log(`  Fase 1 (Querétaro):     ${byPhase[1] || 0}`);
  console.log(`  Fase 2 (Hgo):           ${byPhase[2] || 0}`);
  console.log(`  Fase 3 (Pue/EdoMéx):    ${byPhase[3] || 0}`);
  console.log(`Errores:                  ${errors.length}`);

  if (errors.length) {
    console.log('\nERRORES:');
    errors.forEach(e => console.log(`  ✗ ${e.slug}: ${e.error}`));
  }

  // ── Check for unreplaced variables ──
  console.log(`\nVerificando variables sin reemplazar...`);
  let unreplaced = 0;
  const outputFiles = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.html'));
  outputFiles.forEach(file => {
    const content = fs.readFileSync(path.join(OUTPUT_DIR, file), 'utf-8');
    const matches = content.match(/\{\{[A-Z_]+\}\}/g);
    if (matches) {
      const unique = [...new Set(matches)];
      console.log(`  ⚠ ${file}: ${unique.join(', ')}`);
      unreplaced += unique.length;
    }
  });
  if (unreplaced === 0) {
    console.log('  ✓ Todas las variables fueron reemplazadas correctamente');
  }

  console.log(`\n✓ Generación completa: ${OUTPUT_DIR}`);
}

function generateSitemap(pages) {
  const priorityMap = {
    zona: 0.8,
    mercado: 0.8,
    especificacion: 0.7,
    innovacion: 0.8,
    cliente: 0.6,
    bombeo: 0.7
  };

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  pages.forEach(page => {
    const priority = priorityMap[page.dimension] || 0.7;
    xml += `  <url>\n`;
    xml += `    <loc>https://cayco.mx/${page.slug}/</loc>\n`;
    xml += `    <lastmod>2026-03-01</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += '</urlset>\n';
  fs.writeFileSync(SITEMAP, xml, 'utf-8');
  console.log(`✓ Sitemap generado: sitemap-pseo.xml (${pages.length} URLs)`);
}

// ── Run ──
generate();
