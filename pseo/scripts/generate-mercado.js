#!/usr/bin/env node
/**
 * CAYCO PSEO — Página Central "Mercado de Concreto"
 * Centraliza toda la información PSEO en una sola landing page
 */
const fs = require('fs');
const path = require('path');

const ROOT      = path.join(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'data', 'pages.json');
const OUTPUT    = path.join(ROOT, 'output', 'mercado-concreto.html');
const SITEMAP   = path.join(ROOT, 'sitemap-pseo.xml');

const pages = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

// ─── Data aggregation ────────────────────────────────────────────────────────
const qroPages   = pages.filter(p => p.sucursal === 'Querétaro');
const tulPages   = pages.filter(p => p.sucursal === 'Tulancingo');
const pacPages   = pages.filter(p => p.sucursal === 'Pachuca');
const huaPages   = pages.filter(p => p.sucursal === 'Huauchinango');
const zumPages   = pages.filter(p => p.sucursal === 'Zumpango');
const zonaPages  = pages.filter(p => p.dimension === 'zona' || p.dimension === 'bombeo');
const mercPages  = pages.filter(p => p.dimension === 'mercado');
const specPages  = pages.filter(p => p.dimension === 'especificacion' || p.dimension === 'innovacion');
const cliPages   = pages.filter(p => p.dimension === 'cliente');

const topProjects = [
  { name: "Adamant Querétaro", zona: "Milenio III", vol: "6,800", tipo: "Estructural / Lujo", dev: "Milk Life Investments", slug: "concreto-premezclado-milenio-iii-queretaro" },
  { name: "Zöul Residences (4 torres)", zona: "Campanario Norte", vol: "5,900", tipo: "Estructural / Lujo", dev: "AVA", slug: "concreto-premezclado-campanario-queretaro" },
  { name: "Aira Residencial", zona: "Zibatá", vol: "5,500", tipo: "Estructural / Bombeable", dev: "Urbana México", slug: "concreto-premezclado-zibata-queretaro" },
  { name: "Lesso Residencial", zona: "Zibatá", vol: "5,200", tipo: "Estructural / Bombeable", dev: "Urbana México", slug: "concreto-premezclado-zibata-queretaro" },
  { name: "VYNMSA Parque Industrial", zona: "El Marqués", vol: "4,500", tipo: "Industrial / Convencional", dev: "VYNMSA", slug: "concreto-premezclado-el-marques-queretaro" },
  { name: "Massaro Residencial", zona: "Zibatá", vol: "4,200", tipo: "Residencial / Horizontal", dev: "Javer", slug: "concreto-premezclado-zibata-queretaro" },
  { name: "Blossom Residencial", zona: "Zibatá", vol: "4,100", tipo: "Estructural / Residencial", dev: "Grupo Caisa", slug: "concreto-premezclado-zibata-queretaro" },
  { name: "Forte Residencial", zona: "Zibatá", vol: "3,900", tipo: "Estructural / Residencial", dev: "Grupo Caisa", slug: "concreto-premezclado-zibata-queretaro" },
  { name: "Valvento", zona: "El Marqués", vol: "3,800", tipo: "Residencial / Horizontal", dev: "Javer", slug: "concreto-premezclado-el-marques-queretaro" },
  { name: "Data Center Google", zona: "El Marqués", vol: "3,200", tipo: "F'c 350+ / Industrial", dev: "Google", slug: "concreto-para-data-centers-queretaro" },
  { name: "Data Center Microsoft", zona: "El Marqués", vol: "2,800", tipo: "F'c 350+ / Industrial", dev: "Microsoft", slug: "concreto-para-data-centers-queretaro" },
  { name: "Data Center Amazon", zona: "El Marqués", vol: "2,500", tipo: "F'c 350+ / Industrial", dev: "Amazon", slug: "concreto-para-data-centers-queretaro" }
];

const zonas = [
  { name: "Zona Oriente", sub: "Zibatá, Zákia, El Refugio, Milenio III", vol: "56,770", pct: 55.2, projects: 41, icon: "fa-city", color: "#d32f2f", slugs: ["concreto-premezclado-zibata-queretaro","concreto-premezclado-zakia-queretaro","concreto-premezclado-milenio-iii-queretaro","concreto-premezclado-el-refugio-queretaro"] },
  { name: "Zona Norte", sub: "Juriquilla, Santa Rosa Jáuregui, La Joya", vol: "16,150", pct: 15.7, projects: 14, icon: "fa-gem", color: "#1565c0", slugs: ["concreto-premezclado-juriquilla-queretaro","concreto-premezclado-santa-rosa-jauregui-queretaro"] },
  { name: "Industrial El Marqués", sub: "Data Centers, VYNMSA, Automotriz", vol: "14,800", pct: 14.4, projects: 4, icon: "fa-server", color: "#2e7d32", slugs: ["concreto-premezclado-el-marques-queretaro","concreto-para-data-centers-queretaro","concreto-para-nearshoring-queretaro"] },
  { name: "Centro-Poniente", sub: "Campanario, Centro Histórico, Carretas", vol: "14,380", pct: 14.0, projects: 8, icon: "fa-landmark", color: "#6a1b9a", slugs: ["concreto-premezclado-campanario-queretaro","concreto-premezclado-corregidora-queretaro"] },
  { name: "Sur", sub: "San Juan del Río, Huimilpan", vol: "740", pct: 0.7, projects: 3, icon: "fa-mountain", color: "#ef6c00", slugs: [] }
];

const innovProducts = [
  { name: "Permeable", icon: "fa-tint", desc: "Infiltración pluvial, estacionamientos", slug: "concreto-permeable-queretaro" },
  { name: "Antimicrobiano", icon: "fa-shield-virus", desc: "Hospitales, laboratorios, alimentos", slug: "concreto-antimicrobiano-queretaro" },
  { name: "Autocompactante", icon: "fa-water", desc: "Sin vibrado, geometrías complejas", slug: "concreto-autocompactante-queretaro" },
  { name: "Arquitectónico", icon: "fa-building", desc: "Muros aparentes, fachadas premium", slug: "concreto-arquitectonico-queretaro" },
  { name: "Color Integral", icon: "fa-palette", desc: "Pigmentos permanentes, decorativo", slug: "concreto-color-queretaro" },
  { name: "Ligero", icon: "fa-feather", desc: "Baja densidad, rellenos en altura", slug: "concreto-ligero-queretaro" }
];

const clientTypes = [
  { name: "Constructoras", icon: "fa-hard-hat", desc: "Volumen, programación y certificación", slugQro: "concreto-para-constructoras-queretaro", slugHgo: "concreto-para-constructoras-hidalgo" },
  { name: "Desarrolladores", icon: "fa-city", desc: "Aliado estratégico para fraccionamientos", slugQro: "concreto-para-desarrolladores-inmobiliarios-queretaro", slugEdm: "concreto-para-desarrolladores-estado-de-mexico" },
  { name: "Autoconstrucción", icon: "fa-home", desc: "Desde 3 m³, asesoría gratuita", slugQro: "concreto-para-autoconstruccion-queretaro", slugHgo: "concreto-para-autoconstruccion-hidalgo" },
  { name: "Gobierno", icon: "fa-university", desc: "Licitaciones, obra pública", slugHgo: "concreto-para-gobierno-hidalgo" },
  { name: "Arquitectos", icon: "fa-drafting-compass", desc: "Concretos especiales y acabados", slugQro: "concreto-para-arquitectos-queretaro" }
];

// ─── Build HTML ──────────────────────────────────────────────────────────────

const html = `<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="utf-8" />
    <title>Mercado de Concreto Premezclado — CAYCO | 5 Sucursales, 4 Estados</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="CAYCO Concretos" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="es-MX" />
    <meta name="description" content="Explora el mercado de concreto premezclado de CAYCO: 5 sucursales en Querétaro, Hidalgo, Puebla y EdoMéx. 102,840 m³ de demanda en Querétaro. Único C PRO CEMEX." />
    <link rel="canonical" href="https://cayco.mx/mercado-concreto/" />
    <meta property="og:title" content="Mercado de Concreto Premezclado — CAYCO" />
    <meta property="og:description" content="5 sucursales, 79 páginas especializadas, 102,840 m³ de mercado en Querétaro. Concreto premezclado con certificación C PRO CEMEX." />
    <meta property="og:url" content="https://cayco.mx/mercado-concreto/" />
    <meta property="og:image" content="https://cayco.mx/img/logo/logoRojo.png" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="CAYCO Concretos" />
    <meta property="og:locale" content="es_MX" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Mercado de Concreto — CAYCO" />
    <meta name="twitter:description" content="5 sucursales, 79 páginas especializadas, certificación C PRO CEMEX única en Querétaro." />
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
      :root { --accent: #d32f2f; --dark: #000; --soft: #f2f2f2; }

      /* Hero */
      .mkt-hero { position: relative; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 180px 0 120px; overflow: hidden; }
      .mkt-hero::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background: url('/img/photo/service1.jpg') center/cover; opacity:.12; }
      .mkt-hero .container { position: relative; z-index: 2; }
      .mkt-hero h1 { font-family:'Raleway',sans-serif; font-weight:800; font-size:48px; color:#fff; text-transform:uppercase; line-height:1.15; }
      .mkt-hero h1 span { color: var(--accent); }
      .mkt-hero-sub { color:rgba(255,255,255,.7); font-size:16px; max-width:650px; line-height:170%; margin:20px 0 35px; }
      .mkt-hero-stats { display:flex; gap:30px; flex-wrap:wrap; margin-top:10px; }
      .mkt-hero-stats span { color:rgba(255,255,255,.5); font-size:14px; font-weight:600; letter-spacing:.5px; }
      .mkt-hero-stats span strong { color:#fff; font-size:18px; display:block; margin-bottom:2px; }

      /* Stats Bar */
      .mkt-stats-bar { background:#fff; margin-top:-50px; position:relative; z-index:10; box-shadow:0 8px 40px rgba(0,0,0,.08); padding:30px 0; }
      .mkt-stat-item { text-align:center; padding:15px 20px; }
      .mkt-stat-item:not(:last-child) { border-right:1px solid rgba(0,0,0,.08); }
      .mkt-stat-num { font-family:'Raleway',sans-serif; font-size:32px; font-weight:800; color:var(--accent); line-height:1; }
      .mkt-stat-label { font-size:12px; text-transform:uppercase; letter-spacing:1.5px; color:rgba(0,0,0,.5); margin-top:6px; font-weight:600; }

      /* Nav Pills */
      .mkt-nav { display:flex; flex-wrap:wrap; gap:8px; padding:30px 0; position:sticky; top:100px; z-index:50; background:#fff; border-bottom:1px solid rgba(0,0,0,.05); }
      .mkt-nav a { padding:10px 22px; background:var(--soft); color:var(--dark); font-size:13px; font-weight:700; text-transform:uppercase; text-decoration:none; letter-spacing:.5px; transition:.2s; border:2px solid transparent; font-family:'Raleway',sans-serif; }
      .mkt-nav a:hover, .mkt-nav a.active { background:var(--accent); color:#fff; border-color:var(--accent); }
      .mkt-nav a i { margin-right:6px; }

      /* Section titles */
      .mkt-section { padding:80px 0 40px; }
      .mkt-section-dark { background:#0a0a0a; padding:80px 0 40px; }
      .mkt-section-soft { background:var(--soft); padding:80px 0 40px; }
      .mkt-section-title { font-size:11px; text-transform:uppercase; letter-spacing:3px; color:var(--accent); font-weight:700; margin-bottom:8px; }
      .mkt-section h2 { font-size:32px; font-weight:800; text-transform:uppercase; margin-bottom:15px; font-family:'Raleway',sans-serif; }
      .mkt-section-desc { color:rgba(0,0,0,.6); font-size:15px; max-width:600px; line-height:170%; margin-bottom:40px; }

      /* Zone cards */
      .mkt-zone { background:#fff; border:1px solid rgba(0,0,0,.06); padding:28px; transition:.4s; height:100%; position:relative; overflow:hidden; }
      .mkt-zone:hover { border-color:var(--accent); transform:translateY(-6px); box-shadow:0 12px 40px rgba(0,0,0,.08); }
      .mkt-zone-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
      .mkt-zone-header h4 { font-size:16px; font-weight:700; margin:0; }
      .mkt-zone-pct { font-size:12px; font-weight:700; padding:4px 12px; border-radius:20px; color:#fff; }
      .mkt-zone-vol { font-size:28px; font-weight:800; color:var(--accent); line-height:1; margin-bottom:4px; font-family:'Raleway',sans-serif; }
      .mkt-zone-meta { font-size:12px; color:rgba(0,0,0,.5); margin-bottom:14px; }
      .mkt-zone-bar { height:6px; background:var(--soft); border-radius:3px; margin-bottom:14px; overflow:hidden; }
      .mkt-zone-bar-fill { height:100%; border-radius:3px; transition:width 1s ease; }
      .mkt-zone-desc { font-size:13px; color:rgba(0,0,0,.6); line-height:160%; margin-bottom:14px; }
      .mkt-zone-links { display:flex; flex-wrap:wrap; gap:8px; }
      .mkt-zone-links a { font-size:12px; font-weight:600; color:var(--accent); text-decoration:none; padding:4px 12px; background:rgba(211,47,47,.06); transition:.2s; }
      .mkt-zone-links a:hover { background:var(--accent); color:#fff; }

      /* Product cards */
      .mkt-prod { text-align:center; padding:28px 20px; background:#fff; border:1px solid rgba(0,0,0,.06); transition:.4s; height:100%; }
      .mkt-prod:hover { border-color:var(--accent); transform:translateY(-5px); box-shadow:0 12px 30px rgba(0,0,0,.06); }
      .mkt-prod-icon { width:56px; height:56px; background:linear-gradient(135deg, var(--accent), #b71c1c); display:inline-flex; align-items:center; justify-content:center; margin-bottom:16px; }
      .mkt-prod-icon i { color:#fff; font-size:22px; }
      .mkt-prod h4 { font-size:15px; font-weight:700; margin-bottom:6px; }
      .mkt-prod p { font-size:13px; color:rgba(0,0,0,.5); margin-bottom:12px; }
      .mkt-prod a { font-size:12px; font-weight:700; color:var(--accent); text-decoration:none; text-transform:uppercase; letter-spacing:.5px; }

      /* Project rows */
      .mkt-project { display:flex; align-items:center; padding:16px 0; border-bottom:1px solid rgba(0,0,0,.06); transition:.2s; }
      .mkt-project:hover { background:rgba(211,47,47,.02); }
      .mkt-project-rank { width:36px; height:36px; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:800; border-radius:50%; margin-right:16px; flex-shrink:0; color:#fff; }
      .mkt-project-rank.top { background:var(--accent); }
      .mkt-project-rank.std { background:rgba(0,0,0,.15); color:rgba(0,0,0,.5); }
      .mkt-project-info { flex:1; min-width:0; }
      .mkt-project-info h5 { font-size:14px; font-weight:700; margin:0 0 3px; }
      .mkt-project-info h5 a { color:var(--dark); text-decoration:none; }
      .mkt-project-info h5 a:hover { color:var(--accent); }
      .mkt-project-meta { font-size:12px; color:rgba(0,0,0,.5); }
      .mkt-project-vol { font-size:18px; font-weight:800; color:var(--accent); white-space:nowrap; margin-left:16px; font-family:'Raleway',sans-serif; }

      /* Client cards (dark section) */
      .mkt-client { text-align:center; padding:30px 20px; border:1px solid rgba(255,255,255,.08); transition:.4s; height:100%; }
      .mkt-client:hover { background:rgba(211,47,47,.1); border-color:var(--accent); }
      .mkt-client i { font-size:32px; color:var(--accent); margin-bottom:14px; display:block; }
      .mkt-client h4 { font-size:15px; font-weight:700; color:#fff; margin-bottom:6px; }
      .mkt-client p { font-size:12px; color:rgba(255,255,255,.5); margin-bottom:12px; }
      .mkt-client a { font-size:12px; font-weight:700; color:var(--accent); text-decoration:none; }

      /* Sucursal mini-cards */
      .mkt-suc { background:#fff; border:1px solid rgba(0,0,0,.06); padding:24px; transition:.4s; height:100%; display:flex; flex-direction:column; }
      .mkt-suc:hover { border-color:var(--accent); transform:translateY(-4px); box-shadow:0 8px 30px rgba(0,0,0,.06); }
      .mkt-suc h4 { font-size:18px; font-weight:800; margin-bottom:4px; }
      .mkt-suc .mkt-suc-region { font-size:12px; color:rgba(0,0,0,.5); margin-bottom:12px; text-transform:uppercase; letter-spacing:1px; }
      .mkt-suc .mkt-suc-pages { font-size:28px; font-weight:800; color:var(--accent); line-height:1; margin-bottom:4px; }
      .mkt-suc .mkt-suc-label { font-size:11px; color:rgba(0,0,0,.4); text-transform:uppercase; letter-spacing:1px; margin-bottom:14px; }
      .mkt-suc .mkt-suc-tel { font-size:14px; font-weight:700; margin-bottom:14px; }
      .mkt-suc .mkt-suc-tel a { color:var(--dark); text-decoration:none; }
      .mkt-suc .mkt-suc-actions { margin-top:auto; display:flex; gap:8px; flex-wrap:wrap; }
      .mkt-suc .mkt-suc-actions a { font-size:12px; font-weight:700; color:var(--accent); text-decoration:none; padding:6px 14px; background:rgba(211,47,47,.06); transition:.2s; }
      .mkt-suc .mkt-suc-actions a:hover { background:var(--accent); color:#fff; }

      /* CTA */
      .mkt-cta { background:linear-gradient(135deg, var(--accent), #b71c1c); padding:60px; text-align:center; border-radius:10px; }
      .mkt-cta h2 { color:#fff; font-size:28px; font-weight:800; text-transform:uppercase; margin-bottom:15px; }
      .mkt-cta p { color:rgba(255,255,255,.8); font-size:15px; max-width:500px; margin:0 auto 30px; }
      .mkt-cta-btns { display:flex; justify-content:center; gap:15px; flex-wrap:wrap; }
      .mkt-cta-btns a { padding:14px 30px; font-size:14px; font-weight:700; text-decoration:none; text-transform:uppercase; letter-spacing:.5px; transition:.2s; border-radius:6px; }
      .mkt-cta-btns .btn-wa { background:#25d366; color:#fff; }
      .mkt-cta-btns .btn-wa:hover { background:#1da851; }
      .mkt-cta-btns .btn-tel { background:#fff; color:var(--dark); }
      .mkt-cta-btns .btn-tel:hover { background:var(--dark); color:#fff; }
      .mkt-cta-btns .btn-form { background:#1a1a1a; color:#fff; border:none; }
      .mkt-cta-btns .btn-form:hover { background:#333; }

      /* Badge */
      .mkt-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(211,47,47,.2); border:1px solid var(--accent); color:#fff; padding:8px 20px; border-radius:50px; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:25px; }

      /* Responsive */
      @media(max-width:992px) {
        .mkt-hero { padding:140px 0 80px; }
        .mkt-hero h1 { font-size:32px; }
        .mkt-stat-item:not(:last-child) { border-right:none; border-bottom:1px solid rgba(0,0,0,.06); }
        .mkt-nav { position:static; overflow-x:auto; flex-wrap:nowrap; }
        .mkt-cta { padding:40px 20px; }
      }
      @media(max-width:576px) {
        .mkt-hero h1 { font-size:26px; }
        .mkt-zone-vol { font-size:22px; }
        .mkt-stat-num { font-size:24px; }
      }
    </style>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1G027QTJ1Y"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-1G027QTJ1Y');</script>
    <script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1229772561937588');fbq('track','PageView');</script>

    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Organization","name":"CAYCO Concreto Premezclado","url":"https://cayco.mx","description":"Productor de concreto premezclado con 5 sucursales en Querétaro, Hidalgo, Puebla y Estado de México. Único con Distintivo C PRO CEMEX en Querétaro.","numberOfEmployees":{"@type":"QuantitativeValue","minValue":50},"areaServed":["Querétaro","Hidalgo","Puebla","Estado de México"],"memberOf":["CANACINTRA","AMCI","IMCYC"]}
    </script>
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Inicio","item":"https://cayco.mx/"},{"@type":"ListItem","position":2,"name":"Mercado de Concreto","item":"https://cayco.mx/mercado-concreto/"}]}
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
    </div>

    <!-- ═══ HERO ═══ -->
    <section class="mkt-hero">
        <div class="container">
            <div class="row align-items-end">
                <div class="col-lg-7">
                    <span class="mkt-badge"><i class="fas fa-certificate"></i> C PRO CEMEX — Único en Querétaro</span>
                    <h1>Mercado de <span>Concreto</span> Premezclado</h1>
                    <p class="mkt-hero-sub">5 sucursales en 4 estados. 79 páginas especializadas por zona, producto, especificación y tipo de cliente. Datos reales del mercado 2026.</p>
                    <div class="d-flex gap-3 flex-wrap">
                        <a href="/contact.html#contactForm" class="mil-button mil-sm limp"><i class="fas fa-file-alt"></i>&nbsp; Cotizar Proyecto</a>
                        <a href="tel:+524424397563" class="mil-button mil-sm mil-transparent-button limp" style="border-color:rgba(255,255,255,.3);color:#fff"><i class="fas fa-phone-alt"></i>&nbsp; (442) 439 7563</a>
                    </div>
                </div>
                <div class="col-lg-5 d-none d-lg-block">
                    <div class="mkt-hero-stats">
                        <span><strong>102,840 m³</strong>Demanda Querétaro</span>
                        <span><strong>71</strong>Proyectos Activos</span>
                        <span><strong>$311.5M</strong>Valor de Mercado</span>
                        <span><strong>5</strong>Sucursales</span>
                        <span><strong>79</strong>Páginas PSEO</span>
                        <span><strong>4</strong>Estados</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ STATS BAR ═══ -->
    <div class="container">
        <div class="mkt-stats-bar">
            <div class="row">
                <div class="col-6 col-lg-3"><div class="mkt-stat-item">
                    <div class="mkt-stat-num">102,840</div><div class="mkt-stat-label">m³ Demanda Querétaro</div>
                </div></div>
                <div class="col-6 col-lg-3"><div class="mkt-stat-item">
                    <div class="mkt-stat-num">71</div><div class="mkt-stat-label">Proyectos Verificados</div>
                </div></div>
                <div class="col-6 col-lg-3"><div class="mkt-stat-item">
                    <div class="mkt-stat-num">79</div><div class="mkt-stat-label">Páginas Especializadas</div>
                </div></div>
                <div class="col-6 col-lg-3"><div class="mkt-stat-item">
                    <div class="mkt-stat-num">5</div><div class="mkt-stat-label">Sucursales CAYCO</div>
                </div></div>
            </div>
        </div>
    </div>

    <!-- ═══ NAV PILLS ═══ -->
    <div class="container">
        <nav class="mkt-nav" id="mkt-nav">
            <a href="#sucursales"><i class="fas fa-map-marker-alt"></i>Sucursales</a>
            <a href="#zonas"><i class="fas fa-map"></i>Zonas Querétaro</a>
            <a href="#proyectos"><i class="fas fa-building"></i>Proyectos</a>
            <a href="#innovacion"><i class="fas fa-flask"></i>Innovación</a>
            <a href="#clientes"><i class="fas fa-users"></i>Clientes</a>
            <a href="#especificaciones"><i class="fas fa-cogs"></i>Especificaciones</a>
        </nav>
    </div>

    <!-- ═══ SUCURSALES ═══ -->
    <section class="mkt-section" id="sucursales">
        <div class="container">
            <div class="mkt-section-title">Red de Plantas</div>
            <h2>5 Sucursales en 4 Estados</h2>
            <p class="mkt-section-desc">Cada sucursal tiene páginas especializadas por zona geográfica, tipo de producto, especificación técnica y tipo de cliente.</p>

            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="mkt-suc" style="border-top:4px solid var(--accent)">
                        <h4>Querétaro <span style="font-size:11px;background:var(--accent);color:#fff;padding:2px 8px;border-radius:10px;margin-left:8px;vertical-align:middle">C PRO</span></h4>
                        <div class="mkt-suc-region">San José el Alto, Querétaro</div>
                        <div class="mkt-suc-pages">${qroPages.length}</div>
                        <div class="mkt-suc-label">Páginas especializadas</div>
                        <div class="mkt-suc-tel"><a href="tel:+524424397563"><i class="fas fa-phone-alt" style="color:var(--accent);margin-right:6px"></i>(442) 439 7563</a></div>
                        <div class="mkt-suc-actions">
                            <a href="/queretaro/">Ver Hub</a>
                            <a href="/nearshoring-queretaro-hub/">Nearshoring</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="mkt-suc">
                        <h4>Tulancingo <span style="font-size:11px;background:rgba(0,0,0,.1);padding:2px 8px;border-radius:10px;margin-left:8px;vertical-align:middle">Matriz</span></h4>
                        <div class="mkt-suc-region">Tulancingo de Bravo, Hidalgo</div>
                        <div class="mkt-suc-pages">${tulPages.length}</div>
                        <div class="mkt-suc-label">Páginas especializadas</div>
                        <div class="mkt-suc-tel"><a href="tel:+527757533811"><i class="fas fa-phone-alt" style="color:var(--accent);margin-right:6px"></i>(775) 753 38 11</a></div>
                        <div class="mkt-suc-actions"><a href="/tulancingo/">Ver Hub</a></div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="mkt-suc">
                        <h4>Pachuca</h4>
                        <div class="mkt-suc-region">Mineral de la Reforma, Hidalgo</div>
                        <div class="mkt-suc-pages">${pacPages.length}</div>
                        <div class="mkt-suc-label">Páginas especializadas</div>
                        <div class="mkt-suc-tel"><a href="tel:+527711436326"><i class="fas fa-phone-alt" style="color:var(--accent);margin-right:6px"></i>(771) 143 63 26</a></div>
                        <div class="mkt-suc-actions"><a href="/pachuca/">Ver Hub</a></div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="mkt-suc">
                        <h4>Huauchinango</h4>
                        <div class="mkt-suc-region">Sierra Norte de Puebla</div>
                        <div class="mkt-suc-pages">${huaPages.length}</div>
                        <div class="mkt-suc-label">Páginas especializadas</div>
                        <div class="mkt-suc-tel"><a href="tel:+527767678335"><i class="fas fa-phone-alt" style="color:var(--accent);margin-right:6px"></i>(776) 767 83 35</a></div>
                        <div class="mkt-suc-actions"><a href="/huauchinango/">Ver Hub</a></div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="mkt-suc">
                        <h4>Zumpango</h4>
                        <div class="mkt-suc-region">Estado de México</div>
                        <div class="mkt-suc-pages">${zumPages.length}</div>
                        <div class="mkt-suc-label">Páginas especializadas</div>
                        <div class="mkt-suc-tel"><a href="tel:+525666722875"><i class="fas fa-phone-alt" style="color:var(--accent);margin-right:6px"></i>(566) 672 2875</a></div>
                        <div class="mkt-suc-actions"><a href="/zumpango/">Ver Hub</a></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ ZONAS QUERÉTARO ═══ -->
    <section class="mkt-section-soft" id="zonas">
        <div class="container">
            <div class="mkt-section-title">Zona Metropolitana de Querétaro</div>
            <h2>5 Zonas — 102,840 m³ de Demanda</h2>
            <p class="mkt-section-desc">Mercado verificado con 71 proyectos activos en 2026. Datos del Reporte de Mercado y Oportunidades CAYCO.</p>

            <div class="row">
${zonas.map(z => `                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="mkt-zone">
                        <div class="mkt-zone-header">
                            <h4><i class="fas ${z.icon}" style="color:${z.color};margin-right:8px;font-size:14px"></i>${z.name}</h4>
                            <span class="mkt-zone-pct" style="background:${z.color}">${z.pct}%</span>
                        </div>
                        <div class="mkt-zone-vol">${z.vol} m³</div>
                        <div class="mkt-zone-meta">${z.projects} proyectos · ${z.sub}</div>
                        <div class="mkt-zone-bar"><div class="mkt-zone-bar-fill" style="width:${z.pct}%;background:${z.color}"></div></div>
                        <div class="mkt-zone-links">
${z.slugs.map(s => `                            <a href="/${s}/">${(pages.find(p => p.slug === s) || {}).h1Short || s.split('-').pop()}</a>`).join('\n')}
                        </div>
                    </div>
                </div>`).join('\n')}
            </div>
        </div>
    </section>

    <!-- ═══ PROYECTOS DESTACADOS ═══ -->
    <section class="mkt-section" id="proyectos">
        <div class="container">
            <div class="mkt-section-title">Proyectos Verificados 2026</div>
            <h2>Top 12 por Volumen de Concreto</h2>
            <p class="mkt-section-desc">Proyectos activos en la ZM de Querétaro con volumen verificado. Datos del reporte de mercado CAYCO.</p>

            <div class="row">
                <div class="col-lg-8">
${topProjects.map((p, i) => `                    <div class="mkt-project">
                        <div class="mkt-project-rank ${i < 3 ? 'top' : 'std'}">${i + 1}</div>
                        <div class="mkt-project-info">
                            <h5><a href="/${p.slug}/">${p.name}</a></h5>
                            <div class="mkt-project-meta">${p.tipo} · ${p.zona} · ${p.dev}</div>
                        </div>
                        <div class="mkt-project-vol">${p.vol} m³</div>
                    </div>`).join('\n')}
                </div>
                <div class="col-lg-4">
                    <div style="position:sticky;top:170px">
                        <div style="background:#0a0a0a;padding:30px">
                            <h4 style="color:var(--accent);font-size:13px;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px">Distribución por Tipo</h4>
                            <div style="margin-bottom:16px">
                                <div style="display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.7);margin-bottom:4px"><span>Residencial Horizontal</span><span style="color:#fff;font-weight:700">40.8%</span></div>
                                <div style="height:6px;background:rgba(255,255,255,.1);border-radius:3px"><div style="height:100%;width:40.8%;background:var(--accent);border-radius:3px"></div></div>
                            </div>
                            <div style="margin-bottom:16px">
                                <div style="display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.7);margin-bottom:4px"><span>Residencial Vertical</span><span style="color:#fff;font-weight:700">27.2%</span></div>
                                <div style="height:6px;background:rgba(255,255,255,.1);border-radius:3px"><div style="height:100%;width:27.2%;background:#1565c0;border-radius:3px"></div></div>
                            </div>
                            <div style="margin-bottom:16px">
                                <div style="display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.7);margin-bottom:4px"><span>Comercial / Mixto</span><span style="color:#fff;font-weight:700">17.5%</span></div>
                                <div style="height:6px;background:rgba(255,255,255,.1);border-radius:3px"><div style="height:100%;width:17.5%;background:#2e7d32;border-radius:3px"></div></div>
                            </div>
                            <div style="margin-bottom:16px">
                                <div style="display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.7);margin-bottom:4px"><span>Data Centers</span><span style="color:#fff;font-weight:700">8.3%</span></div>
                                <div style="height:6px;background:rgba(255,255,255,.1);border-radius:3px"><div style="height:100%;width:8.3%;background:#6a1b9a;border-radius:3px"></div></div>
                            </div>
                            <div style="margin-bottom:16px">
                                <div style="display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.7);margin-bottom:4px"><span>Industrial / Parques</span><span style="color:#fff;font-weight:700">6.1%</span></div>
                                <div style="height:6px;background:rgba(255,255,255,.1);border-radius:3px"><div style="height:100%;width:6.1%;background:#ef6c00;border-radius:3px"></div></div>
                            </div>
                        </div>
                        <div style="background:#0a0a0a;padding:20px 30px;margin-top:1px;text-align:center">
                            <div style="display:flex;justify-content:space-between;align-items:center">
                                <span style="font-size:12px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1px">Total Mercado</span>
                                <span style="font-size:22px;font-weight:800;color:#fff;font-family:'Raleway',sans-serif">102,840 m³</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ INNOVACIÓN ═══ -->
    <section class="mkt-section-soft" id="innovacion">
        <div class="container">
            <div class="mkt-section-title">Concretos Especiales</div>
            <h2>Líneas de Innovación</h2>
            <p class="mkt-section-desc">Soluciones que van más allá de la resistencia: permeabilidad, protección antimicrobiana, acabados arquitectónicos y color integral.</p>

            <div class="row">
${innovProducts.map(p => `                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="mkt-prod">
                        <div class="mkt-prod-icon"><i class="fas ${p.icon}"></i></div>
                        <h4>${p.name}</h4>
                        <p>${p.desc}</p>
                        <a href="/${p.slug}/">Ver detalles →</a>
                    </div>
                </div>`).join('\n')}
            </div>
            <div class="text-center mt-3">
                <a href="/concretos-innovacion-hub/" class="mil-button mil-sm limp">Ver Hub de Innovación Completo</a>
            </div>
        </div>
    </section>

    <!-- ═══ CLIENTES ═══ -->
    <section class="mkt-section-dark" id="clientes">
        <div class="container">
            <div class="mkt-section-title" style="color:rgba(255,255,255,.3)">Segmentación</div>
            <h2 style="color:#fff">Por Tipo de Cliente</h2>
            <p class="mkt-section-desc" style="color:rgba(255,255,255,.5)">Páginas especializadas para cada perfil de comprador de concreto.</p>

            <div class="row">
${clientTypes.map(c => `                <div class="col-lg col-md-4 col-6 mb-4">
                    <div class="mkt-client">
                        <i class="fas ${c.icon}"></i>
                        <h4>${c.name}</h4>
                        <p>${c.desc}</p>
                        ${c.slugQro ? `<a href="/${c.slugQro}/">Querétaro</a>` : ''}
                        ${c.slugHgo ? `<br><a href="/${c.slugHgo}/" style="opacity:.6">Hidalgo</a>` : ''}
                        ${c.slugEdm ? `<br><a href="/${c.slugEdm}/" style="opacity:.6">EdoMéx</a>` : ''}
                    </div>
                </div>`).join('\n')}
            </div>
        </div>
    </section>

    <!-- ═══ ESPECIFICACIONES ═══ -->
    <section class="mkt-section" id="especificaciones">
        <div class="container">
            <div class="mkt-section-title">Resistencias Disponibles</div>
            <h2>Por Especificación Técnica</h2>
            <p class="mkt-section-desc">Desde F'c 150 convencional hasta F'c 400+ de ultra alta resistencia.</p>

            <div class="row">
${['concreto-fc-200-queretaro','concreto-fc-250-queretaro','concreto-fc-300-queretaro','concreto-fc-350-queretaro','concreto-fc-400-queretaro','concreto-alta-resistencia-queretaro','concreto-bombeable-queretaro','concreto-estructural-queretaro'].map(slug => {
  const p = pages.find(pg => pg.slug === slug);
  if (!p) return '';
  return `                <div class="col-lg-3 col-md-4 col-6 mb-4">
                    <div class="mkt-prod">
                        <h4 style="font-size:14px">${p.h1Short}</h4>
                        <p>${p.metaDescription.substring(0, 80)}...</p>
                        <a href="/${p.slug}/">Ver detalles →</a>
                    </div>
                </div>`;
}).join('\n')}
            </div>
        </div>
    </section>

    <!-- ═══ CTA FINAL ═══ -->
    <section>
        <div class="container mil-p-0-120">
            <div class="mkt-cta">
                <h2>¿Tienes un Proyecto de Construcción?</h2>
                <p>Cotiza tu concreto premezclado con la calidad y respaldo de CAYCO. 5 sucursales, asesoría técnica incluida y más de 1,250 proyectos realizados.</p>
                <div class="mkt-cta-btns">
                    <a href="https://wa.me/524424397563?text=${encodeURIComponent('Hola, me interesa cotizar concreto premezclado')}" class="btn-wa"><i class="fab fa-whatsapp"></i>&nbsp; WhatsApp</a>
                    <a href="tel:+524424397563" class="btn-tel d-lg-none"><i class="fas fa-phone-alt"></i>&nbsp; (442) 439 7563</a>
                    <a href="/contact.html#contactForm" class="btn-form"><i class="fas fa-file-alt"></i>&nbsp; Formulario</a>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ FOOTER ═══ -->
    <footer class="mil-relative">
        <img src="/img/photo/footer1.0.png" loading="lazy" class="mil-bg-img mil-parallax" alt="Contacto CAYCO" style="object-position:top" data-value-1="-25%" data-value-2="23%" width="1920" height="1080">
        <div class="mil-overlay"></div>
        <div class="container mil-p-120-90">
            <div class="mil-background-grid"></div>
            <div class="row align-items-end"><div class="col-lg-12"><div class="row">
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30"><a href="/tulancingo/" class="limpio">Tulancingo</a></span>
                    <div class="mil-text-sm mil-up mil-light-soft mil-mb-30 w-color"><p class="w-color">Libramiento la joya 200, Tulancingo Hgo. 43660</p><p class="w-color">(775) 753 38 11</p></div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30"><a href="/pachuca/" class="limpio">Pachuca</a></span>
                    <div class="mil-text-sm mil-up mil-light-soft mil-mb-30 w-color"><p class="w-color">Blvd. Las Torres S/N, Mineral de la Reforma 75169</p><p class="w-color">(771) 143 63 26</p></div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30"><a href="/huauchinango/" class="limpio">Huauchinango</a></span>
                    <div class="mil-text-sm mil-up mil-light-soft mil-mb-30 w-color"><p class="w-color">Cuacuila-Xaltepec, 73173 Huauchinango, Puebla</p><p class="w-color">(776) 767 83 35</p></div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30"><a href="/queretaro/" class="limpio">Querétaro</a></span>
                    <div class="mil-text-sm mil-up mil-light-soft mil-mb-30 w-color"><p class="w-color">L. D. Colosio 257-274, San José el Alto, Qro. 76147</p><p class="w-color">(442) 439 7563</p></div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-2 text-justify">
                    <span class="mil-suptitle mil-light mil-upper mil-up mil-mb-30"><a href="/zumpango/" class="limpio">Zumpango</a></span>
                    <div class="mil-text-sm mil-up mil-light-soft mil-mb-30 w-color"><p class="w-color">Ex-Hacienda Guadalupe, 55630 Zumpango, Méx</p><p class="w-color">(566) 672 2875</p></div>
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

    <a href="https://wa.me/524424397563?text=${encodeURIComponent('Hola, me interesa cotizar concreto premezclado')}" class="whatsapp-float" target="_blank"><i class="fab fa-whatsapp"></i></a>
    <script src="/app.js"></script>

    <!-- Nav pills active state -->
    <script>
    (function(){
      var nav = document.getElementById('mkt-nav');
      if (!nav) return;
      var links = nav.querySelectorAll('a');
      var sections = [];
      links.forEach(function(a) {
        var id = a.getAttribute('href').replace('#','');
        var el = document.getElementById(id);
        if (el) sections.push({el:el, link:a});
      });
      window.addEventListener('scroll', function() {
        var scroll = window.scrollY + 200;
        var active = null;
        sections.forEach(function(s) { if (s.el.offsetTop <= scroll) active = s; });
        links.forEach(function(a) { a.classList.remove('active'); });
        if (active) active.link.classList.add('active');
      });
      links.forEach(function(a) {
        a.addEventListener('click', function(e) {
          e.preventDefault();
          var id = this.getAttribute('href').replace('#','');
          var el = document.getElementById(id);
          if (el) window.scrollTo({top: el.offsetTop - 160, behavior:'smooth'});
        });
      });
    })();
    </script>
</body>
</html>`;

// ─── Write output ────────────────────────────────────────────────────────────
fs.writeFileSync(OUTPUT, html, 'utf-8');
console.log(`✓ mercado-concreto.html generado (${(Buffer.byteLength(html)/1024).toFixed(0)} KB)`);

// ─── Update sitemap ──────────────────────────────────────────────────────────
let sitemap = fs.readFileSync(SITEMAP, 'utf-8');
if (!sitemap.includes('mercado-concreto')) {
  sitemap = sitemap.replace('</urlset>',
    `  <url>\n    <loc>https://cayco.mx/mercado-concreto/</loc>\n    <lastmod>2026-03-01</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>`
  );
  fs.writeFileSync(SITEMAP, sitemap, 'utf-8');
  console.log('✓ Sitemap actualizado: 80 URLs (priority 1.0 para mercado-concreto)');
}

console.log(`\nSecciones generadas:`);
console.log(`  • Hero con badge C PRO + stats`);
console.log(`  • Stats bar flotante (102,840 m³ · 71 proyectos · 79 páginas · 5 sucursales)`);
console.log(`  • Nav pills con smooth scroll (6 secciones)`);
console.log(`  • 5 Sucursales con conteo de páginas y teléfono local`);
console.log(`  • 5 Zonas Querétaro con volumen, %, progress bars y links`);
console.log(`  • Top 12 proyectos rankeados + gráfica de distribución por tipo`);
console.log(`  • 6 Productos de innovación con links`);
console.log(`  • 5 Tipos de cliente con links por región`);
console.log(`  • 8 Especificaciones técnicas (F'c 200-400 + bombeable + estructural)`);
console.log(`  • CTA final triple: WhatsApp + Teléfono + Formulario`);
