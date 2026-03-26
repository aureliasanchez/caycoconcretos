#!/usr/bin/env node
/**
 * CAYCO PSEO — Hub Page Generator
 * Genera 7 páginas hub: 5 sucursales + innovación + nearshoring
 */
const fs = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..');
const DATA_FILE  = path.join(ROOT, 'data', 'pages.json');
const OUTPUT_DIR = path.join(ROOT, 'output', 'hubs');
const SITEMAP    = path.join(ROOT, 'sitemap-pseo.xml');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const pages = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

// ─── Sucursal Data ───────────────────────────────────────────────────────────
const SUC = {
  "Querétaro":    { tel: "(775) 753 40 46", telLink: "+527757534046", telWA: "527711436326", dir: "Luis Donaldo Colosio 257-274, 76147 San José el Alto, Querétaro", lat: 20.6597, lng: -100.4101, region: "Querétaro", postal: "76147", locality: "San José el Alto", street: "Luis Donaldo Colosio 257-274", hubSlug: "queretaro", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.5!2d-100.4101!3d20.6597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d35b0a0b0b0b0b%3A0x0!2zMjDCsDM5JzM0LjkiTiAxMDDCsDI0JzM2LjQiVw!5e0!3m2!1ses!2smx!4v1" },
  "Tulancingo":   { tel: "(775) 753 38 11", telLink: "+527757533811", telWA: "527757533811", dir: "Libramiento La Joya 200, El Cerezo, Tulancingo, Hidalgo C.P. 43660", lat: 20.0834, lng: -98.3625, region: "Hidalgo", postal: "43660", locality: "Tulancingo de Bravo", street: "Libramiento La Joya 200, El Cerezo", hubSlug: "tulancingo", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.5!2d-98.3625!3d20.0834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDA1JzAwLjIiTiA5OMKwMjEnNDUuMCJX!5e0!3m2!1ses!2smx!4v1" },
  "Pachuca":      { tel: "(775) 753 40 46", telLink: "+527757534046", telWA: "527711436326", dir: "Boulevard Las Torres S/N, Mineral de la Reforma, Hidalgo C.P. 75169", lat: 20.0914, lng: -98.7624, region: "Hidalgo", postal: "75169", locality: "Mineral de la Reforma", street: "Boulevard Las Torres S/N", hubSlug: "pachuca", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.5!2d-98.7624!3d20.0914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDA1JzI5LjAiTiA5OMKwNDUnNDQuNiJX!5e0!3m2!1ses!2smx!4v1" },
  "Huauchinango": { tel: "(775) 753 40 46", telLink: "+527757534046", telWA: "527711436326", dir: "Cuacuila-Xaltepec, 73173 Huauchinango, Puebla", lat: 20.1733, lng: -98.0523, region: "Puebla", postal: "73173", locality: "Huauchinango", street: "Cuacuila-Xaltepec", hubSlug: "huauchinango", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.5!2d-98.0523!3d20.1733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDEwJzIzLjkiTiA5OMKwMDMnMDguMyJX!5e0!3m2!1ses!2smx!4v1" },
  "Zumpango":     { tel: "(775) 753 40 46", telLink: "+527757534046", telWA: "527711436326", dir: "Ex-Hacienda Guadalupe, 55630, Zumpango, Estado de México", lat: 19.7956, lng: -99.0989, region: "Estado de México", postal: "55630", locality: "Zumpango", street: "Ex-Hacienda Guadalupe", hubSlug: "zumpango", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.5!2d-99.0989!3d19.7956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDQ3JzQ0LjIiTiA5OcKwMDUnNTYuMCJX!5e0!3m2!1ses!2smx!4v1" }
};

// Hub navigation for inter-hub linking
const HUB_NAV = [
  { slug: "queretaro", name: "Querétaro", badge: true },
  { slug: "tulancingo", name: "Tulancingo" },
  { slug: "pachuca", name: "Pachuca" },
  { slug: "huauchinango", name: "Huauchinango" },
  { slug: "zumpango", name: "Zumpango" },
  { slug: "concretos-innovacion-hub", name: "Innovación" },
  { slug: "nearshoring-queretaro-hub", name: "Nearshoring" }
];

// ─── Common HTML parts ───────────────────────────────────────────────────────

function head(title, desc, slug, suc) {
  const s = suc ? SUC[suc] : SUC["Querétaro"];
  return `<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="CAYCO Concretos" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="es-MX" />
    <meta name="description" content="${desc}" />
    <link rel="canonical" href="https://cayco.mx/${slug}/" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="https://cayco.mx/${slug}/" />
    <meta property="og:image" content="https://cayco.mx/img/logo/logoRojo.png" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="CAYCO Concretos" />
    <meta property="og:locale" content="es_MX" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="https://cayco.mx/img/logo/logoRojo.png" />
    <link rel="icon" href="/img/logo/nuevo/icono.webp" type="image/png">
    <link rel="stylesheet" href="/styles/styles.css">
    <link rel="stylesheet" href="/styles/css/plugins/bootstrap-grid.css">
    <link rel="stylesheet" href="/styles/css/plugins/swiper.min.css">
    <link rel="stylesheet" href="/styles/css/plugins/magnific-popup.css">
    <link rel="stylesheet" href="/styles/styles2.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
      .hub-card{background:#fff;border:5px solid rgba(0,0,0,.05);padding:24px;transition:.4s;height:100%}
      .hub-card:hover{border-color:#d32f2f;transform:translateY(-5px)}
      .hub-card h4{font-size:15px;font-weight:700;margin-bottom:8px}
      .hub-card p{font-size:13px;color:rgba(0,0,0,.6);margin-bottom:12px}
      .hub-card a{color:#d32f2f;font-weight:600;font-size:13px;text-decoration:none}
      .hub-card a:hover{text-decoration:underline}
      .hub-nav{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:40px}
      .hub-nav a{display:inline-block;padding:8px 20px;background:#f2f2f2;color:#000;text-decoration:none;font-family:'Raleway',sans-serif;font-weight:600;font-size:13px;text-transform:uppercase;transition:.2s;border:2px solid transparent}
      .hub-nav a:hover,.hub-nav a.active{background:#d32f2f;color:#fff;border-color:#d32f2f}
      .hub-badge{display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#d32f2f,#b71c1c);color:#fff;padding:10px 24px;border-radius:50px;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:1.5px;box-shadow:0 4px 20px rgba(211,47,47,.35);margin-bottom:30px}
      .hub-stat{display:inline-block;background:rgba(211,47,47,.15);border-left:4px solid #d32f2f;color:rgba(255,255,255,.9);padding:8px 20px;font-size:14px;font-weight:600;margin-bottom:20px}
      .hub-section-title{font-size:13px;text-transform:uppercase;letter-spacing:2px;color:#d32f2f;font-weight:700;margin-bottom:20px;padding-bottom:10px;border-bottom:2px solid #d32f2f}
      .hub-cta-box{background:#000;padding:50px;position:relative;overflow:hidden}
      .hub-cta-box::before{content:'';position:absolute;top:0;right:0;width:300px;height:100%;background:linear-gradient(135deg,transparent,rgba(211,47,47,.15))}
      .hub-cta-phone{display:inline-flex;align-items:center;gap:12px;color:#fff;font-size:26px;font-weight:700;text-decoration:none;transition:.2s}
      .hub-cta-phone:hover{color:#d32f2f}
      .hub-cta-phone i{width:45px;height:45px;background:#d32f2f;display:flex;align-items:center;justify-content:center;font-size:20px}
      .hub-innov-table{width:100%;border-collapse:separate;border-spacing:0;font-size:13px}
      .hub-innov-table thead th{background:#000;color:#fff;padding:12px 16px;text-transform:uppercase;font-size:11px;letter-spacing:1px}
      .hub-innov-table td{padding:12px 16px;border-bottom:1px solid rgba(0,0,0,.07)}
      .hub-innov-table tr:nth-child(even){background:#f2f2f2}
    </style>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1G027QTJ1Y"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-1G027QTJ1Y');</script>
    <script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1229772561937588');fbq('track','PageView');</script>
    ${suc ? `<script type="application/ld+json">
    {"@context":"https://schema.org","@type":"ConcreteContractor","name":"CAYCO Concretos — ${suc}","description":"${desc}","url":"https://cayco.mx/${slug}/","telephone":"${s.telLink}","email":"cayco@cayco.mx","address":{"@type":"PostalAddress","streetAddress":"${s.street}","addressLocality":"${s.locality}","addressRegion":"${s.region}","postalCode":"${s.postal}","addressCountry":"MX"},"geo":{"@type":"GeoCoordinates","latitude":${s.lat},"longitude":${s.lng}},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"08:30","closes":"17:30"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"08:30","closes":"14:00"}],"parentOrganization":{"@type":"Organization","name":"CAYCO Concreto Premezclado","url":"https://cayco.mx"}}
    </script>` : ''}
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://cayco.mx/"},{"@type":"ListItem","position":2,"name":"${title.split('|')[0].trim()}","item":"https://cayco.mx/${slug}/"}]}
    </script>
</head>
<body>
    <div class="mil-progress-track"><div class="mil-progress"></div></div>
    <div class="mil-top-panel">
        <div class="container-fluid">
            <div class="mil-top-panel-content">
                <a href="/" class="mil-logo"><img src="/img/logo/nuevo/cayco.webp" loading="lazy" alt="CAYCO" style="width:130px" width="130" height="40"></a>
                <div class="mil-navigation mil-light"><nav><ul>
                    <li class="mil-light"><a href="/">Inicio</a></li>
                    <li class="mil-light"><a href="/services.html">Servicios</a></li>
                    <li class="mil-light"><a href="/proyects.html">Proyectos</a></li>
                    <li class="mil-light"><a href="/galeria.html">Galeria</a></li>
                    <li class="mil-light"><a href="/about.html">Acerca de</a></li>
                    <li class="mil-light"><a href="/mercado-concreto/">Mercado</a></li>
                    <li class="mil-light"><a href="https://cayco.mx/blog/">Blog</a></li>
                </ul></nav></div>
                <div class="mil-top-panel-buttons">
                    <a href="/contact.html#contactForm" class="mil-button mil-sm limp text-center">Gestionar Proyecto</a>
                    <div class="mil-menu-btn"><span></span></div>
                </div>
            </div>
        </div>
    </div>`;
}

function hubNavHTML(activeSlug) {
  return `<div class="hub-nav">${HUB_NAV.map(h =>
    `<a href="/${h.slug === activeSlug ? h.slug : h.slug}/" class="${h.slug === activeSlug ? 'active' : ''}">${h.name}</a>`
  ).join('\n        ')}</div>`;
}

function pageCards(filteredPages) {
  return filteredPages.map(p => `
                <div class="col-lg-4 col-md-6 mil-up mil-mb-30">
                    <div class="hub-card">
                        <h4>${p.h1Short || p.h1}</h4>
                        <p>${p.metaDescription.substring(0, 100)}...</p>
                        <a href="/${p.slug}/">Ver página <i class="fas fa-arrow-right" style="font-size:11px;margin-left:4px"></i></a>
                    </div>
                </div>`).join('');
}

function footer(suc) {
  const s = suc ? SUC[suc] : SUC["Querétaro"];
  const waNum = suc ? s.telWA : SUC["Querétaro"].telWA;
  return `
    <footer class="mil-relative">
        <img src="/img/photo/footer1.0.png" loading="lazy" class="mil-bg-img mil-parallax" alt="Contacto CAYCO" style="object-position:top" data-value-1="-25%" data-value-2="23%" width="1920" height="1080">
        <div class="mil-overlay"></div>
        <div class="container mil-p-120-90">
            <div class="mil-background-grid"></div>
            <div class="row align-items-end"><div class="col-lg-12"><div class="row">
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30"><a href="https://maps.google.com/?cid=12468189399507520405" target="_blank" class="limpio">Tulancingo</a></span>
                    <div class="mil-text-sm mil-up mil-light-soft mil-mb-30 w-color"><p class="w-color">Libramiento la joya 200 El cerezo, Tulancingo Hidalgo C.P. 43660</p><p class="w-color"><a href="https://wa.me/527711436326?text=Hola%2C%20me%20interesa%20cotizar%20concreto%20premezclado" target="_blank" style="color:rgba(255,255,255,.7);text-decoration:none"><i class="fab fa-whatsapp" style="color:#25d366;margin-right:6px"></i>(771) 143 63 26</a></p><strong class="w-color mil-mb-5">Horarios</strong><ul class="w-color"><li>L-V: 8:30 a 5:30</li><li>Sab: 8:30 a 2:00</li></ul></div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30"><a href="https://maps.google.com/?cid=4972483037399828628" target="_blank" class="limpio">Pachuca</a></span>
                    <div class="mil-text-sm mil-up mil-light-soft mil-mb-30 w-color"><p class="w-color">Blvd. Las Torres S/N, Mineral de la Reforma, Hgo. 75169</p><p class="w-color"><a href="https://wa.me/527711436326?text=Hola%2C%20me%20interesa%20cotizar%20concreto%20premezclado" target="_blank" style="color:rgba(255,255,255,.7);text-decoration:none"><i class="fab fa-whatsapp" style="color:#25d366;margin-right:6px"></i>(771) 143 63 26</a></p><strong class="w-color mil-mb-5">Horarios</strong><ul class="w-color"><li>L-V: 8:30 a 5:30</li><li>Sab: 8:30 a 2:00</li></ul></div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30"><a href="https://maps.google.com/?cid=5458889427966911554" target="_blank" class="limpio">Huauchinango</a></span>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30"><a href="https://www.google.com/maps/search/CAYCO+Concretos+Quer%C3%A9taro" target="_blank" class="limpio">Querétaro</a></span>
                    <div class="mil-text-sm mil-up mil-light-soft mil-mb-30 w-color"><p class="w-color">Luis Donaldo Colosio 257-274, 76147 San José el Alto, Qro.</p><p class="w-color"><a href="https://wa.me/527711436326?text=Hola%2C%20me%20interesa%20cotizar%20concreto%20premezclado" target="_blank" style="color:rgba(255,255,255,.7);text-decoration:none"><i class="fab fa-whatsapp" style="color:#25d366;margin-right:6px"></i>(771) 143 63 26</a></p><strong class="w-color mil-mb-5">Horarios</strong><ul class="w-color"><li>L-V: 8:30 a 5:30</li><li>Sab: 8:30 a 2:00</li></ul></div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30"><a href="https://www.google.com/maps/search/CAYCO+Concretos+Zumpango" target="_blank" class="limpio">Zumpango</a></span>
                    <div class="mil-text-sm mil-up mil-light-soft mil-mb-30 w-color"><p class="w-color">Ex-Hacienda Guadalupe, 55630, Zumpango, Méx</p><p class="w-color"><a href="https://wa.me/527711436326?text=Hola%2C%20me%20interesa%20cotizar%20concreto%20premezclado" target="_blank" style="color:rgba(255,255,255,.7);text-decoration:none"><i class="fab fa-whatsapp" style="color:#25d366;margin-right:6px"></i>(771) 143 63 26</a></p><strong class="w-color mil-mb-5">Horarios</strong><ul class="w-color"><li>L-V: 8:30 a 5:30</li><li>Sab: 8:30 a 2:00</li></ul></div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30">Navegación</span>
                    <div class="mil-text-sm mil-up mil-mb-30"><nav><ul>
                        <li><a class="limpio fontpx" href="/about.html">Acerca de</a></li><li><a class="limpio fontpx" href="/services.html">Servicios</a></li><li><a class="limpio fontpx" href="/proyects.html">Proyectos</a></li><li><a class="limpio fontpx" href="/contact.html">Contacto</a></li><li><a class="limpio fontpx" href="/faq.html">FAQ</a></li>
                    </ul></nav></div>
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30">Redes Sociales</span><br>
                    <a href="https://www.facebook.com/CaycoConcretos"><i class="fab fa-facebook-f fa-2x text-white textBigger3"></i></a>
                    <a href="https://www.instagram.com/caycoconcretos/"><i class="fab fa-instagram fa-2x text-white textBigger3"></i></a>
                    <a href="https://www.linkedin.com/company/cayco-construction/"><i class="fab fa-linkedin-in fa-2x text-white textBigger3"></i></a>
                    <a href="https://www.youtube.com/@caycoconcretos8340"><i class="fab fa-youtube fa-2x text-white textBigger3"></i></a>
                    <a href="https://www.tiktok.com/@caycoconcretos_mx"><i class="fab fa-tiktok fa-2x text-white textBigger3"></i></a>
                </div>
            </div></div></div>
        </div>
        <div class="container-fluid"><div class="mil-footer-bottom"><p class="mil-light-soft mil-mb-15">&copy; 2026 Cayco. Todos los derechos reservados.</p></div></div>
    </footer>
    <a href="https://wa.me/${waNum}?text=${encodeURIComponent('Hola, me interesa cotizar concreto premezclado')}" class="whatsapp-float" target="_blank"><i class="fab fa-whatsapp"></i></a>
    <script src="/app.js"></script>
</body></html>`;
}

function ctaSection(suc) {
  const s = SUC[suc];
  return `
    <section>
        <div class="container mil-p-0-120">
            <div class="hub-cta-box">
                <div class="row align-items-center">
                    <div class="col-lg-6 mil-mb-60">
                        <h2 class="mil-upper mil-mb-30" style="color:#fff">¿Tienes un Proyecto en ${suc}?</h2>
                        <p style="color:rgba(255,255,255,.7);font-size:15px;line-height:170%;margin-bottom:30px">Cotiza tu concreto premezclado con entrega directa. Asesoría técnica, precios competitivos y calidad respaldada por más de 1,250 proyectos.</p>
                        <div class="d-flex gap-3 flex-wrap">
                            <a href="tel:${s.telLink}" class="mil-button mil-sm limp"><i class="fas fa-phone-alt"></i>&nbsp; Llamar</a>
                            <a href="/contact.html#contactForm" class="mil-button mil-sm mil-transparent-button limp" style="border-color:rgba(255,255,255,.3);color:#fff">Solicitar Cotización</a>
                        </div>
                    </div>
                    <div class="col-lg-5 offset-lg-1 mil-mb-60">
                        <a href="tel:${s.telLink}" class="hub-cta-phone mil-mb-30"><i class="fas fa-phone-alt"></i>${s.tel}</a>
                        <div style="margin-top:25px;padding-top:25px;border-top:1px solid rgba(255,255,255,.1)">
                            <p style="color:rgba(255,255,255,.5);font-size:13px;margin-bottom:5px"><i class="fas fa-envelope" style="color:#d32f2f;margin-right:8px"></i>cayco@cayco.mx</p>
                            <p style="color:rgba(255,255,255,.5);font-size:13px;margin-bottom:5px"><i class="fas fa-map-marker-alt" style="color:#d32f2f;margin-right:8px"></i>${s.dir}</p>
                            <p style="color:rgba(255,255,255,.5);font-size:13px"><i class="fas fa-clock" style="color:#d32f2f;margin-right:8px"></i>L-V 8:30-17:30 | Sáb 8:30-14:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

// ─── Hub Generators ──────────────────────────────────────────────────────────

function generateSucursalHub(sucursal, slug, title, metaDesc, heroSubtitle, heroBadge, heroStat) {
  const s = SUC[sucursal];
  const myPages = pages.filter(p => p.sucursal === sucursal);
  const zonaPages = myPages.filter(p => p.dimension === 'zona' || p.dimension === 'bombeo');
  const mercadoPages = myPages.filter(p => p.dimension === 'mercado');
  const specPages = myPages.filter(p => p.dimension === 'especificacion' || p.dimension === 'innovacion');
  const clientePages = myPages.filter(p => p.dimension === 'cliente');

  let html = head(title, metaDesc, slug, sucursal);

  // Hero
  html += `
    <section class="mil-banner mil-banner-sm">
        <img src="/img/photo/service1.jpg" loading="lazy" class="mil-bg-img mil-scale" data-value-1=".4" data-value-2="1.4" alt="${title}" style="object-position:top" width="1920" height="1080" />
        <div class="mil-overlay"></div>
        <div class="container">
            <div class="mil-background-grid mil-top-space"></div>
            <div class="mil-banner-content mil-center">
                <div class="mil-mb-90">
                    ${heroBadge ? '<span class="hub-badge"><i class="fas fa-certificate"></i> Distintivo C PRO CEMEX — Único en Querétaro</span>' : ''}
                    <h1 class="mil-light mil-upper mil-mb-30">${title.split('|')[0].trim()}</h1>
                    ${heroStat ? `<div class="hub-stat"><i class="fas fa-chart-line" style="margin-right:8px"></i>${heroStat}</div>` : ''}
                    <p class="mil-light" style="font-size:16px;max-width:600px;margin:0 auto 30px;opacity:.8">${heroSubtitle}</p>
                    <a href="tel:${s.telLink}" class="mil-button mil-sm limp"><i class="fas fa-phone-alt"></i>&nbsp; ${s.tel}</a>
                </div>
            </div>
        </div>
    </section>`;

  // Hub Navigation
  html += `
    <section>
        <div class="container mil-p-120-60">
            <div class="mil-background-grid mil-softened"></div>
            ${hubNavHTML(slug)}`;

  // Zona pages
  if (zonaPages.length) {
    html += `
            <div class="hub-section-title"><i class="fas fa-map-marker-alt" style="margin-right:8px"></i>Zonas de Cobertura</div>
            <div class="row">${pageCards(zonaPages)}</div>`;
  }

  // Mercado pages
  if (mercadoPages.length) {
    html += `
            <div class="hub-section-title mil-mt-30"><i class="fas fa-industry" style="margin-right:8px"></i>Por Tipo de Proyecto</div>
            <div class="row">${pageCards(mercadoPages)}</div>`;
  }

  // Spec + Innovation pages
  if (specPages.length) {
    html += `
            <div class="hub-section-title mil-mt-30"><i class="fas fa-flask" style="margin-right:8px"></i>Especificaciones y Productos</div>
            <div class="row">${pageCards(specPages)}</div>`;
  }

  // Cliente pages
  if (clientePages.length) {
    html += `
            <div class="hub-section-title mil-mt-30"><i class="fas fa-users" style="margin-right:8px"></i>Por Tipo de Cliente</div>
            <div class="row">${pageCards(clientePages)}</div>`;
  }

  html += `
        </div>
    </section>`;

  // Map section
  html += `
    <section class="mil-soft-bg">
        <div class="container mil-p-120-60">
            <div class="mil-background-grid mil-softened"></div>
            <div class="row justify-content-between">
                <div class="col-lg-5 mil-up mil-mb-60">
                    <h2 class="mil-upper mil-mb-30">Sucursal ${sucursal}</h2>
                    <p><strong>Dirección:</strong> ${s.dir}</p>
                    <p><strong>Teléfono:</strong> ${s.tel}</p>
                    <p><strong>Email:</strong> cayco@cayco.mx</p>
                    <p><strong>Horario:</strong> L-V 8:30-17:30 | Sáb 8:30-14:00</p>
                    <p class="mil-mb-30"><strong>Páginas PSEO:</strong> ${myPages.length} páginas especializadas</p>
                    <a href="/contact.html#contactForm" class="mil-button mil-sm limp">Cotizar Proyecto</a>
                </div>
                <div class="col-lg-6 mil-up mil-mb-60">
                    <iframe src="${s.mapEmbed}" width="100%" height="350" style="border:0;border-radius:20px" allowfullscreen="" loading="lazy" title="Ubicación CAYCO ${sucursal}"></iframe>
                </div>
            </div>
        </div>
    </section>`;

  html += ctaSection(sucursal);
  html += footer(sucursal);
  return html;
}

function generateInnovacionHub() {
  const slug = "concretos-innovacion-hub";
  const title = "Concretos de Innovación | CAYCO";
  const desc = "Concretos especiales: permeable, antimicrobiano, arquitectónico, color, autocompactante y ligero. Tecnología CAYCO para proyectos únicos.";

  const innovPages = pages.filter(p => p.dimension === 'innovacion');
  const innovCategories = [
    { name: "Permeable Drenante", icon: "fa-tint", slug: "concreto-permeable-queretaro", desc: "Infiltración pluvial, estacionamientos sustentables", others: ["concreto-permeable-estado-de-mexico"] },
    { name: "Antimicrobiano", icon: "fa-shield-virus", slug: "concreto-antimicrobiano-queretaro", desc: "Hospitales, laboratorios, plantas de alimentos" },
    { name: "Autocompactante SCC", icon: "fa-water", slug: "concreto-autocompactante-queretaro", desc: "Sin vibrado, geometrías complejas, acabado superior" },
    { name: "Arquitectónico Aparente", icon: "fa-building", slug: "concreto-arquitectonico-queretaro", desc: "Muros aparentes, fachadas, diseño contemporáneo" },
    { name: "Color Integral", icon: "fa-palette", slug: "concreto-color-queretaro", desc: "Pigmentos permanentes: ocre, rojo, gris, personalizado" },
    { name: "Ligero", icon: "fa-feather", slug: "concreto-ligero-queretaro", desc: "Baja densidad, rellenos en altura, entrepisos" }
  ];

  let html = head(title, desc, slug, null);

  html += `
    <section class="mil-banner mil-banner-sm">
        <img src="/img/photo/service1.jpg" loading="lazy" class="mil-bg-img mil-scale" data-value-1=".4" data-value-2="1.4" alt="Concretos de Innovación CAYCO" style="object-position:top" width="1920" height="1080" />
        <div class="mil-overlay"></div>
        <div class="container">
            <div class="mil-background-grid mil-top-space"></div>
            <div class="mil-banner-content mil-center">
                <div class="mil-mb-90">
                    <h1 class="mil-light mil-upper mil-mb-30">Concretos de Innovación</h1>
                    <p class="mil-light" style="font-size:16px;max-width:600px;margin:0 auto 30px;opacity:.8">Soluciones especializadas para proyectos que requieren más que resistencia: permeabilidad, protección antimicrobiana, acabados arquitectónicos y color integral.</p>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container mil-p-120-60">
            <div class="mil-background-grid mil-softened"></div>
            ${hubNavHTML(slug)}

            <div class="hub-section-title"><i class="fas fa-flask" style="margin-right:8px"></i>Líneas de Innovación</div>
            <div class="row">
                ${innovCategories.map(c => `
                <div class="col-lg-4 col-md-6 mil-up mil-mb-30">
                    <div class="hub-card" style="text-align:center">
                        <div style="width:60px;height:60px;background:#d32f2f;display:inline-flex;align-items:center;justify-content:center;margin-bottom:15px"><i class="fas ${c.icon}" style="color:#fff;font-size:24px"></i></div>
                        <h4>${c.name}</h4>
                        <p>${c.desc}</p>
                        <a href="/${c.slug}/">Ver en Querétaro</a>
                        ${c.others ? c.others.map(o => `<br><a href="/${o}/" style="font-size:12px;color:rgba(0,0,0,.5)">Ver en ${o.includes('estado') ? 'EdoMéx' : 'otra sucursal'}</a>`).join('') : ''}
                    </div>
                </div>`).join('')}
            </div>

            <div class="hub-section-title mil-mt-30"><i class="fas fa-table" style="margin-right:8px"></i>¿Cuándo Usar Cada Tipo?</div>
            <div class="row mil-mb-60"><div class="col-lg-12 mil-up" style="overflow-x:auto">
                <table class="hub-innov-table">
                    <thead><tr><th>Tipo</th><th>Uso Principal</th><th>Ventaja Clave</th><th>Aplicación Típica</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Permeable</strong></td><td>Infiltración pluvial</td><td>Elimina drenaje pluvial convencional</td><td>Estacionamientos, andadores, plazas</td></tr>
                        <tr><td><strong>Antimicrobiano</strong></td><td>Control microbiológico</td><td>Inhibe 99.9% bacterias en superficie</td><td>Hospitales, laboratorios, alimentos</td></tr>
                        <tr><td><strong>Autocompactante</strong></td><td>Geometrías complejas</td><td>Sin vibrado, acabado liso</td><td>Columnas circulares, alta densidad acero</td></tr>
                        <tr><td><strong>Arquitectónico</strong></td><td>Acabado aparente</td><td>Elimina aplanados y pintura</td><td>Fachadas, muros interiores de diseño</td></tr>
                        <tr><td><strong>Color Integral</strong></td><td>Acabado decorativo</td><td>Color permanente, no se decolora</td><td>Plazas, accesos, andadores</td></tr>
                        <tr><td><strong>Ligero</strong></td><td>Reducción de peso</td><td>30-40% menos peso que convencional</td><td>Rellenos en altura, firmes superiores</td></tr>
                    </tbody>
                </table>
            </div></div>

            <div class="hub-section-title mil-mt-30"><i class="fas fa-file-alt" style="margin-right:8px"></i>Todas las Páginas de Innovación</div>
            <div class="row">${pageCards(innovPages)}</div>
        </div>
    </section>`;

  html += ctaSection("Querétaro");
  html += footer(null);
  return html;
}

function generateNearshoringHub() {
  const slug = "nearshoring-queretaro-hub";
  const title = "Concreto para Nearshoring en Querétaro | CAYCO C PRO CEMEX";
  const desc = "Concreto certificado para nearshoring: data centers, automotriz, parques industriales. F'c 350+. Único C PRO CEMEX en Querétaro.";

  const nearPages = pages.filter(p =>
    p.slug.includes('data-center') || p.slug.includes('nearshoring') ||
    p.slug.includes('naves-industriales') || p.slug.includes('parques-industriales') ||
    p.slug.includes('pisos-industriales') || p.slug.includes('industria-automotriz') ||
    p.slug.includes('fc-350') || p.slug.includes('fc-400') ||
    p.slug.includes('alta-resistencia-queretaro')
  );

  let html = head(title, desc, slug, "Querétaro");

  html += `
    <section class="mil-banner mil-banner-sm">
        <img src="/img/photo/service1.jpg" loading="lazy" class="mil-bg-img mil-scale" data-value-1=".4" data-value-2="1.4" alt="Concreto Nearshoring Querétaro" style="object-position:top" width="1920" height="1080" />
        <div class="mil-overlay"></div>
        <div class="container">
            <div class="mil-background-grid mil-top-space"></div>
            <div class="mil-banner-content mil-center">
                <div class="mil-mb-90">
                    <span class="hub-badge"><i class="fas fa-certificate"></i> Distintivo C PRO CEMEX — Único en Querétaro</span>
                    <h1 class="mil-light mil-upper mil-mb-30">Concreto para Nearshoring</h1>
                    <div class="hub-stat"><i class="fas fa-chart-line" style="margin-right:8px"></i>14,800 m³ en zona industrial El Marqués 2026</div>
                    <p class="mil-light" style="font-size:16px;max-width:650px;margin:0 auto 30px;opacity:.8">Data centers de Google, Microsoft y Amazon. Parques industriales. Automotriz y aeroespacial. Concreto F'c 350+ con certificación de clase mundial.</p>
                    <a href="tel:+527757534046" class="mil-button mil-sm limp"><i class="fas fa-phone-alt"></i>&nbsp; (775) 753 40 46</a>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container mil-p-120-60">
            <div class="mil-background-grid mil-softened"></div>
            ${hubNavHTML(slug)}

            <div class="row mil-mb-60">
                <div class="col-lg-8">
                    <h2 class="mil-upper mil-mb-30">La Ola de Nearshoring en Querétaro</h2>
                    <p class="text-justify mil-mb-20">Querétaro se ha consolidado como destino líder de nearshoring en México. Los data centers de Google (3,200 m³), Microsoft (2,800 m³) y Amazon (2,500 m³) en El Marqués suman 8,500 m³ de concreto F'c 350+ — el segmento de mayor especificación técnica del mercado.</p>
                    <p class="text-justify">CAYCO es el único productor con Distintivo C PRO CEMEX en Querétaro, certificación exigida por empresas internacionales que requieren trazabilidad completa, control de calidad certificado y cumplimiento de estándares globales en cada entrega de concreto.</p>
                </div>
                <div class="col-lg-4">
                    <div style="background:#000;padding:30px;color:#fff">
                        <h4 class="mil-upper mil-mb-20" style="color:#d32f2f;font-size:14px">Proyectos Clave</h4>
                        <ul style="list-style:none;padding:0;font-size:14px">
                            <li style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.1)"><i class="fas fa-server" style="color:#d32f2f;margin-right:8px"></i>Google DC — 3,200 m³</li>
                            <li style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.1)"><i class="fas fa-server" style="color:#d32f2f;margin-right:8px"></i>Microsoft DC — 2,800 m³</li>
                            <li style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.1)"><i class="fas fa-server" style="color:#d32f2f;margin-right:8px"></i>Amazon DC — 2,500 m³</li>
                            <li style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.1)"><i class="fas fa-warehouse" style="color:#d32f2f;margin-right:8px"></i>VYNMSA — 4,500 m³</li>
                            <li style="padding:8px 0"><i class="fas fa-chart-bar" style="color:#d32f2f;margin-right:8px"></i>Total: 14,800 m³</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="hub-section-title"><i class="fas fa-industry" style="margin-right:8px"></i>Páginas Especializadas en Nearshoring</div>
            <div class="row">${pageCards(nearPages)}</div>
        </div>
    </section>`;

  html += ctaSection("Querétaro");
  html += footer("Querétaro");
  return html;
}

// ─── Generate All Hubs ───────────────────────────────────────────────────────

const hubs = [
  { fn: () => generateSucursalHub("Querétaro", "queretaro", "Concreto Premezclado en Querétaro | CAYCO C PRO CEMEX", "Único productor de concreto con Distintivo C PRO CEMEX en Querétaro. 102,840 m³ de mercado activo. Suministro, bombeo y asesoría.", "Planta certificada C PRO CEMEX en San José el Alto. Cobertura completa en la zona metropolitana de Querétaro.", true, "102,840 m³ de demanda verificada en 71 proyectos 2026"), file: "queretaro.html" },
  { fn: () => generateSucursalHub("Tulancingo", "tulancingo", "Concreto Premezclado en Tulancingo | CAYCO — Planta Matriz", "Planta matriz CAYCO en Tulancingo, Hidalgo. 25+ años produciendo concreto premezclado. Suministro, bombeo y asesoría técnica.", "Planta matriz con más de 25 años de producción. La concretera de referencia en la región centro de Hidalgo.", false, "25+ años y más de 1,250 proyectos realizados"), file: "tulancingo.html" },
  { fn: () => generateSucursalHub("Pachuca", "pachuca", "Concreto Premezclado en Pachuca | CAYCO Concretos", "Concreto premezclado en Pachuca y Mineral de la Reforma. Planta CAYCO con suministro continuo, bombeo y asesoría técnica.", "Sucursal en Mineral de la Reforma con cobertura en toda la zona metropolitana de Pachuca.", false, "Cobertura en zona metropolitana de Pachuca"), file: "pachuca.html" },
  { fn: () => generateSucursalHub("Huauchinango", "huauchinango", "Concreto Premezclado en Huauchinango | CAYCO Concretos", "Concreto premezclado en Huauchinango y Sierra Norte de Puebla. Única planta de la región. Producción, bombeo y asesoría.", "Única concretera con planta en la Sierra Norte de Puebla. Producción local, entrega directa.", false, "Única planta de concreto en la Sierra Norte"), file: "huauchinango.html" },
  { fn: () => generateSucursalHub("Zumpango", "zumpango", "Concreto Premezclado en Zumpango | CAYCO Concretos", "Concreto premezclado en Zumpango y norte del Estado de México. Planta local con suministro inmediato y asesoría técnica.", "Planta local en Zumpango con cobertura en la zona norte del Estado de México.", false, "Planta local — zona norte Estado de México"), file: "zumpango.html" },
  { fn: generateInnovacionHub, file: "concretos-innovacion-hub.html" },
  { fn: generateNearshoringHub, file: "nearshoring-queretaro-hub.html" }
];

console.log('CAYCO PSEO Hub Generator');
console.log('═'.repeat(50));

hubs.forEach(hub => {
  const html = hub.fn();
  fs.writeFileSync(path.join(OUTPUT_DIR, hub.file), html, 'utf-8');
  console.log(`  ✓ ${hub.file}`);
});

// ─── Update Sitemap ──────────────────────────────────────────────────────────
let sitemap = fs.readFileSync(SITEMAP, 'utf-8');
const hubUrls = [
  'queretaro', 'tulancingo', 'pachuca', 'huauchinango', 'zumpango',
  'concretos-innovacion-hub', 'nearshoring-queretaro-hub'
];

// Remove closing tag, add hub URLs, re-close
sitemap = sitemap.replace('</urlset>', '');
hubUrls.forEach(slug => {
  sitemap += `  <url>\n    <loc>https://cayco.mx/${slug}/</loc>\n    <lastmod>2026-03-01</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
});
sitemap += '</urlset>\n';
fs.writeFileSync(SITEMAP, sitemap, 'utf-8');

console.log(`\n✓ Sitemap actualizado: 72 PSEO + 7 hubs = 79 URLs`);
console.log(`✓ ${hubs.length} hubs generados en pseo/output/hubs/`);

// ─── Print Interlinking Report ──────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`);
console.log('INTERLINKING — Cambios recomendados en sitio actual:');
console.log('─'.repeat(50));
console.log(`
ARCHIVO: index.html
  SECCIÓN: Footer — cada bloque de sucursal (<span class="mil-suptitle">)
  CAMBIO: Reemplazar href="ubicacion-[ciudad].html" por href="/[ciudad]/"
  EJEMPLO: <a href="ubicacion-queretaro.html"> → <a href="/queretaro/">

ARCHIVO: services.html
  SECCIÓN: Tarjeta "Concretos de Innovación"
  CAMBIO: Agregar enlace secundario a /concretos-innovacion-hub/
  EJEMPLO: <a href="/concretos-innovacion-hub/">Ver todas las soluciones →</a>

ARCHIVO: concretos-innovacion.html
  SECCIÓN: CTA final
  CAMBIO: Agregar enlace al hub /concretos-innovacion-hub/
  EJEMPLO: <a href="/concretos-innovacion-hub/">Explorar por tipo de concreto →</a>

ARCHIVO: contact.html
  SECCIÓN: Si existe listado de sucursales, enlazar cada una a su hub

ARCHIVO: Todas las páginas PSEO (pseo/output/*.html)
  SECCIÓN: Sidebar "Páginas Relacionadas"
  CAMBIO: Ya incluyen relatedSlugs. Agregar link "Ver todas las páginas
          de [sucursal]" apuntando a /{hubSlug}/

NOTA: Los cambios al sitio actual son opcionales y se pueden hacer
      gradualmente. Las 72 páginas PSEO + 7 hubs ya interenlazan
      entre sí correctamente.
`);
