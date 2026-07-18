import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://ratu-oracle-kar4.vercel.app";
const TODAY = new Date().toISOString().slice(0, 10);

const ensureDir = (dir) => fs.mkdirSync(path.join(ROOT, dir), { recursive: true });
const write = (file, content) => {
  ensureDir(path.dirname(file));
  fs.writeFileSync(path.join(ROOT, file), content.trimStart(), "utf8");
};
const esc = (value = "") => String(value).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const abs = (url) => `${SITE}${url.startsWith("/") ? url : `/${url}`}`;

const products = [
  { slug: "aurelia-fire-spirit-companion", name: "Aurelia Fire Spirit Companion", category: "Spirit Doll", intention: "Wealth", price: "168.99", image: "/assets/spirit-dolls/aurelia-fire-element.png", desc: "A fire-aligned Spirit Doll for courage, momentum, creative heat and confident action.", keywords: "fire spirit doll, spirit companion, fantasy doll, mystical doll, guardian spirit, collectible spirit doll" },
  { slug: "emanation-guardian-head-gandhara-style-statue", name: "Emanation Guardian Head - Gandhara Style Statue", category: "Spiritual Art", intention: "Protection", price: "1888.00", image: "/assets/products/emanation-guardian-head-gandhara-chant-spheres.png", desc: "A Gandhara-style spiritual art object for steadiness, contemplation and protected awareness.", keywords: "Gandhara, Gandharan art, spiritual art object, meditation statue, sacred decor" },
  { slug: "avalokiteshvara", name: "Avalokiteshvara", category: "Spiritual Art", intention: "Love", price: "35.00", image: "/assets/products/avalokiteshvara-chant-spheres.png", desc: "A compassion-inspired statue connected with mercy, inner peace, meditation and emotional balance.", keywords: "Avalokiteshvara, Avalokitesvara, Bodhisattva of Compassion, Buddhist sculpture, sacred art, inner peace" },
  { slug: "gandhara-buddha-head", name: "Gandhara Buddha Head", category: "Spiritual Art", intention: "Clarity", price: "818.00", image: "/assets/products/gandhara-buddha-head-real.jpg", desc: "A Gandhara-style contemplative head for calm attention, reflection, clarity and sacred decor.", keywords: "Gandhara Buddha Head, Gandharan art, meditation decor, mindfulness, museum replica" },
  { slug: "terrum-earth-spirit-companion", name: "Terrum Earth Spirit Companion", category: "Spirit Doll", intention: "Protection", price: "167.00", image: "/assets/spirit-dolls/terrum-earth-spirit.png", desc: "An earth-aligned Spirit Doll for grounding, patience, rooted protection and steady support.", keywords: "earth spirit doll, earth guardian, spirit companion, grounding doll, fantasy collectible" },
  { slug: "zephyriel-air-spirit-companion", name: "Zephyriel Air Spirit Companion", category: "Spirit Doll", intention: "Clarity", price: "150.00", image: "/assets/spirit-dolls/zephyriel-air-spirit.png", desc: "An air-aligned Spirit Doll for clear thought, lightness, perspective and calm communication.", keywords: "air spirit doll, wind spirit, air elemental, sky guardian, spirit guide, OOAK spirit doll" },
  { slug: "solomon-love-harmony-charm", name: "Solomon Love & Harmony Charm", category: "Talisman", intention: "Love", price: "35.00", image: "/assets/spheres/solomon-love-harmony.png", desc: "A Solomon-inspired love and harmony charm for connection, devotion and mutual respect.", keywords: "Solomon seal, Seal of Solomon, love charm, harmony talisman, spiritual protection charm" },
  { slug: "divine-light-chant-sphere", name: "Divine Light Chant Sphere", category: "Chant Sphere", intention: "Clarity", price: "32.00", image: "/assets/spheres/divine-light-card-10.png", desc: "A clarity Chant Sphere for divine light, blessing, inspiration and focused intention.", keywords: "Divine Light Chant Sphere, clarity oracle card, spiritual card reading" },
  { slug: "unity-whole-chant-sphere", name: "Unity Whole Chant Sphere", category: "Chant Sphere", intention: "Healing", price: "32.00", image: "/assets/spheres/unity-card-24.png", desc: "A healing Chant Sphere for wholeness, emotional repair and peaceful integration.", keywords: "healing charm cards, unity oracle card, emotional balance" },
  { slug: "spirit-protection-chant-sphere", name: "Spirit Protection Chant Sphere", category: "Chant Sphere", intention: "Protection", price: "32.00", image: "/assets/spheres/protection-card-28.png", desc: "A protection Chant Sphere for boundary, cleansing, release and inner strength.", keywords: "spiritual protection charm, protection oracle card, remove unseen blocks" },
  { slug: "good-decree-chant-sphere", name: "Good Decree Chant Sphere", category: "Chant Sphere", intention: "Protection", price: "32.00", image: "/assets/spheres/decree-card-8.png", desc: "A decree Chant Sphere for strong decisions, order, resilience and clean direction.", keywords: "manifestation cards, custom talisman card, strong decision charm" },
  { slug: "success-path-chant-sphere", name: "Success Path Chant Sphere", category: "Chant Sphere", intention: "Wealth", price: "32.00", image: "/assets/spheres/success-path-card-20.png", desc: "A success Chant Sphere for opportunity, abundance, confidence and aligned progress.", keywords: "wealth attraction charm, abundance charm, money energy charm, spiritual wealth card" }
];

const pages = [
  { slug: "free-tarot-reading", title: "Free Online Tarot Reading | Ratu Oracle", h1: "Free Online Tarot Reading", meta: "Get a free online tarot reading for love, wealth, protection, healing or clarity. Draw your cards and discover Chant Spheres and spiritual objects connected to your reading.", key: "free tarot reading", intent: "Clarity" },
  { slug: "daily-tarot-reading", title: "Daily Tarot Reading Online | Ratu Oracle", h1: "Daily Tarot Reading Online", meta: "Start the day with a free daily tarot reading and discover Chant Spheres for clarity, protection, healing, love and aligned action.", key: "daily tarot reading", intent: "Clarity" },
  { slug: "yes-no-tarot-reading", title: "Yes or No Tarot Reading Online | Ratu Oracle", h1: "Yes or No Tarot Reading Online", meta: "Ask a focused yes or no tarot question online, then explore the Chant Sphere or spiritual object connected to your decision.", key: "yes no tarot reading", intent: "Protection" },
  { slug: "three-card-tarot-reading", title: "Free 3 Card Tarot Reading | Ratu Oracle", h1: "Free 3 Card Tarot Reading", meta: "Try a free 3 card tarot reading for past, present and next step guidance with related Chant Spheres and spiritual objects.", key: "free 3 card tarot reading", intent: "Clarity" },
  { slug: "love-tarot-reading", title: "Love Tarot Reading Online | Ratu Oracle", h1: "Love Tarot Reading Online", meta: "Explore love energy, relationship patterns and emotional harmony with a free love tarot reading and love-focused Chant Spheres.", key: "love tarot reading", intent: "Love" },
  { slug: "wealth-tarot-reading", title: "Wealth Tarot Reading Online | Ratu Oracle", h1: "Wealth Tarot Reading Online", meta: "Use a wealth tarot reading to reflect on abundance, money energy, opportunity and aligned spiritual objects for prosperity.", key: "wealth tarot reading", intent: "Wealth" },
  { slug: "protection-tarot-reading", title: "Protection Tarot Reading Online | Ratu Oracle", h1: "Protection Tarot Reading Online", meta: "Read the symbolic energy around protection, boundaries, cleansing and safety, then find related protection Chant Spheres.", key: "protection tarot reading", intent: "Protection" },
  { slug: "healing-tarot-reading", title: "Healing Tarot Reading Online | Ratu Oracle", h1: "Healing Tarot Reading Online", meta: "Reflect on healing, emotional restoration and spiritual balance with a free online tarot reading and related healing objects.", key: "healing tarot reading", intent: "Healing" },
  { slug: "clarity-tarot-reading", title: "Clarity Tarot Reading Online | Ratu Oracle", h1: "Clarity Tarot Reading Online", meta: "Find clear symbolic guidance for decisions, timing and inner focus with a Ratu Oracle clarity tarot reading.", key: "clarity tarot reading", intent: "Clarity" },
  { slug: "chant-spheres", title: "Chant Spheres | Personalized Spiritual Oracle Cards", h1: "Chant Spheres", meta: "Browse Chant Spheres for love, wealth, protection, healing and clarity. Each card carries intention, story, QR passport and symbolic meaning.", key: "chant spheres", intent: "Clarity" },
  { slug: "spirit-dolls", title: "Spirit Dolls & Spirit Companions | Ratu Oracle", h1: "Spirit Dolls & Spirit Companions", meta: "Discover Spirit Dolls, elemental guardians, OOAK fantasy dolls and mystical collectibles connected to energy, story and intention.", key: "spirit dolls", intent: "Protection" },
  { slug: "solomon-seal-talismans", title: "Solomon Seal Talismans & Spiritual Charms", h1: "Solomon Seal Talismans", meta: "Explore Solomon-inspired seal talismans, love charms, protection charms, wealth talismans and symbolic spiritual objects.", key: "Solomon seal talismans", intent: "Love" },
  { slug: "love-talismans", title: "Love Talismans & Love Charm Cards | Ratu Oracle", h1: "Love Talismans & Love Charm Cards", meta: "Find love talismans, harmony charms and Chant Spheres for affection, devotion, reconciliation and emotional balance.", key: "love talismans", intent: "Love" },
  { slug: "wealth-talismans", title: "Wealth Talismans & Abundance Charms | Ratu Oracle", h1: "Wealth Talismans & Abundance Charms", meta: "Browse wealth talismans and abundance charms for opportunity, prosperity, confidence, attraction and aligned progress.", key: "wealth talismans", intent: "Wealth" },
  { slug: "protection-talismans", title: "Protection Talismans & Spiritual Protection Charms", h1: "Protection Talismans & Spiritual Protection Charms", meta: "Explore spiritual protection charms, talisman cards and Chant Spheres for boundaries, cleansing and inner strength.", key: "protection talismans", intent: "Protection" },
  { slug: "marketplace", title: "Spiritual Marketplace | Chant Spheres, Spirit Dolls & Talismans", h1: "Spiritual Marketplace", meta: "Browse Chant Spheres, Spirit Dolls, Solomon Seal talismans, Indonesian spiritual objects, sacred art, oracle cards and collectible charms.", key: "spiritual marketplace", intent: "All" }
];

const css = `
body{margin:0;background:#fff9f1;color:#1d1720;font-family:Inter,Arial,sans-serif;line-height:1.65}
header,main,footer{max-width:1180px;margin:auto;padding:18px}
.topbar{display:flex;align-items:center;gap:14px;flex-wrap:wrap}.brand{font-weight:900;color:#2f174d;text-decoration:none;font-size:22px}
nav{display:flex;gap:10px;flex-wrap:wrap;margin-left:auto}nav a,.btn{border:1px solid #d6b890;border-radius:6px;padding:9px 12px;text-decoration:none;color:#2f174d;background:#fff}
.btn.primary{background:#55237c;color:white;border-color:#55237c;font-weight:800}.hero{display:grid;grid-template-columns:1.1fr .9fr;gap:26px;align-items:center;padding:42px 18px}
h1{font-family:Georgia,serif;color:#2f174d;font-size:clamp(36px,6vw,68px);line-height:1.02;margin:0 0 16px}h2{font-family:Georgia,serif;color:#2f174d;font-size:30px}
.hero p{font-size:18px;max-width:680px}.cta{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px}.card{background:#fff;border:1px solid #ead8c0;border-radius:8px;box-shadow:0 10px 28px rgba(63,35,12,.08);overflow:hidden}
.card-body{padding:14px}.card h3{margin:0 0 4px;color:#2f174d;font-family:Georgia,serif}.price{font-weight:900;color:#2f174d;font-size:20px}.tag{color:#a1486c;font-weight:800;font-size:12px;text-transform:uppercase}
.product-card img,.sphere-card img,.card img{width:100%;height:auto;object-fit:contain;object-position:center top;display:block;background:#fffaf0;max-width:100%}.product-image,.sphere-image{height:auto;overflow:visible;background:#fffaf0}.product-card,.sphere-card{overflow:visible}
.section{background:#fff;border:1px solid #ead8c0;border-radius:8px;margin:18px 0;padding:22px}.crumbs{font-size:13px;margin:12px 0}.faq dt{font-weight:900;color:#2f174d;margin-top:14px}.footer-links{display:flex;gap:12px;flex-wrap:wrap}
@media(max-width:768px){.hero{grid-template-columns:1fr;padding:24px 12px}nav{width:100%;margin-left:0}.product-card img,.sphere-card img{width:100%;height:auto;object-fit:contain;object-position:center top;display:block}.product-image,.sphere-image{height:auto;overflow:visible;background:#fffaf0}.product-card,.sphere-card{overflow:visible}header,main,footer{padding:12px}.grid{grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:12px}.card-body{padding:10px}.btn{min-height:44px;display:inline-flex;align-items:center}}
`;

const orgSchema = { "@context": "https://schema.org", "@type": "Organization", name: "Ratu Oracle", url: SITE, email: "agi.godmode@gmail.com" };
const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: "Ratu Oracle", url: SITE, potentialAction: { "@type": "SearchAction", target: `${SITE}/marketplace.html?search={search_term_string}`, "query-input": "required name=search_term_string" } };

function productCard(product) {
  return `<article class="card product-card" itemscope itemtype="https://schema.org/Product">
    <a href="/products/${product.slug}.html"><img src="${product.image}" alt="${esc(product.name)} ${esc(product.intention)} spiritual product by Ratu Oracle" title="${esc(product.name)}" width="900" height="1200" loading="lazy" decoding="async" itemprop="image"></a>
    <div class="card-body">
      <p class="tag">${esc(product.intention)} · ${esc(product.category)}</p>
      <h3 itemprop="name">${esc(product.name)}</h3>
      <p itemprop="description">${esc(product.desc)}</p>
      <p class="price">$${esc(product.price)}</p>
      <a class="btn" href="/products/${product.slug}.html">View Product</a>
    </div>
  </article>`;
}

function head({ title, meta, url, image = "/assets/spheres/divine-light-card-10.png", keywords = "" }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(meta)}"><meta name="keywords" content="${esc(keywords)}">
<meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(meta)}"><meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${esc(abs(image))}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(meta)}"><meta name="twitter:image" content="${esc(abs(image))}">
<style>${css}</style></head><body>`;
}

function layout(opts, body, jsonLd = []) {
  const nav = `<header><div class="topbar"><a class="brand" href="/">RATU ORACLE</a><nav>
    <a href="/free-tarot-reading.html">Free Tarot Reading</a><a href="/marketplace.html">Marketplace</a><a href="/chant-spheres.html">Chant Spheres</a><a href="/spirit-dolls.html">Spirit Dolls</a><a href="/solomon-seal-talismans.html">Solomon Seal Talismans</a><a href="/indotalisman.html">Indotalisman</a><a href="mailto:agi.godmode@gmail.com">Contact</a>
  </nav></div></header>`;
  const footer = `<footer><div class="section"><h2>Explore Ratu Oracle</h2><div class="footer-links">
    ${pages.map((p) => `<a href="/${p.slug}.html">${esc(p.h1)}</a>`).join("")}
    <a href="/ai-crawler-index.html">AI Index</a><a href="/llms.txt">LLMS.txt</a><a href="mailto:agi.godmode@gmail.com">Contact</a>
  </div></div></footer>`;
  return `${head(opts)}${nav}<main>${body}</main>${footer}${[orgSchema, websiteSchema, ...jsonLd].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}</body></html>`;
}

const faq = [
  ["What is a free tarot reading?", "A free tarot reading is a symbolic card reading used for reflection, decision support and spiritual insight. Ratu Oracle connects the reading to Chant Spheres, Spirit Dolls and talismans."],
  ["Is Ratu Oracle free to use?", "The reading page is free to open and use. Marketplace products are optional for visitors who want a physical or collectible object connected to their reading."],
  ["Can I do a 3 card tarot reading online?", "Yes. The free tarot page links to three-card, yes-or-no and daily reading paths so visitors can choose the reading style that fits the moment."],
  ["Can I ask a yes or no tarot question?", "Yes. A yes-or-no reading is best for a focused question. Ratu Oracle presents it as symbolic guidance, then points visitors toward Chant Spheres connected to love, wealth, protection, healing or clarity."],
  ["How often should I do a daily tarot reading?", "A daily tarot reading can be used once a day as a calm check-in. It is most useful when visitors ask clearly, reflect honestly and avoid repeating the same question too many times."],
  ["What are Chant Spheres?", "Chant Spheres are symbolic oracle cards and spiritual objects connected to intention, story, QR passport pages and marketplace listings."]
];

function breadcrumb(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.url })) };
}

function faqSchema() {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
}

function productSchema(product, url = abs(`/products/${product.slug}.html`)) {
  return { "@context": "https://schema.org", "@type": "Product", name: product.name, image: abs(product.image), description: product.desc, brand: { "@type": "Brand", name: "Ratu Oracle" }, category: product.category, keywords: product.keywords, url, offers: { "@type": "Offer", price: product.price, priceCurrency: "USD", availability: "https://schema.org/InStock", url } };
}

function pageText(p) {
  return `<p>${esc(p.h1)} is part of the Ratu Oracle buyer journey: a visitor can begin with a free online tarot reading, understand the symbolic energy around love, wealth, protection, healing or clarity, and then explore a matching Chant Sphere, Spirit Doll, Solomon-inspired seal, talisman or spiritual art object.</p>
  <p>This page is written for people searching for ${esc(p.key)}, free online tarot reading, online oracle reading, spiritual card reading, energy reading online, angel healing cards, chant spheres, Solomon seal cards, spiritual protection charm, love attraction charm, wealth attraction charm, abundance charm, healing charm cards, personalized spiritual charm and custom talisman card.</p>
  <p>Ratu Oracle does not force one answer. The reading is a reflection tool. It helps visitors notice the mood of the moment, the pressure behind a decision, and the kind of support they may want next. Some visitors look for love and harmony, some for calm protection, some for confidence, some for healing and some for a collectible spiritual object with story and presence.</p>
  <p>Each product page includes a clear image, title, intention, description, price, related links and structured data so search engines and AI systems can understand what the object is, who it is for, and how it connects to the reading experience.</p>`;
}

for (const p of pages) {
  const related = p.slug === "marketplace" ? products : products.filter((x) => p.intent === "All" || x.intention === p.intent || p.slug.includes(x.category.toLowerCase().split(" ")[0])).slice(0, 4);
  const body = `<nav class="crumbs"><a href="/">Home</a> / ${esc(p.h1)}</nav>
  <section class="hero"><div><h1>${esc(p.h1)}</h1><p>${esc(p.meta)}</p><div class="cta"><a class="btn primary" href="/free-tarot-reading.html">Start Free Tarot Reading</a><a class="btn" href="/marketplace.html">Explore Chant Spheres</a></div></div><div>${related[0] ? productCard(related[0]) : ""}</div></section>
  <section class="section">${pageText(p)}
    <h2>${p.slug === "free-tarot-reading" ? "Free Online Tarot Reading with Ratu Oracle" : `How ${esc(p.h1)} Works`}</h2>
    <p>Choose a reading style, reflect on the result, then use the marketplace links to compare objects connected to the same intention. The path is simple: read, understand, choose, and contact Ratu Oracle if you need help selecting the right object.</p>
    <h2>Free One Card Tarot Reading</h2><p>A one-card reading is the fastest way to receive a clear symbolic message for the present moment. It is useful when you want a simple focus before choosing a Chant Sphere, Spirit Doll or talisman.</p>
    <h2>Free 3 Card Tarot Reading</h2><p>A three-card reading is useful when you want to compare past influence, present condition and the next aligned step.</p>
    <h2>Free Four Card Tarot Reading</h2><p>A four-card reading gives more space for the situation, hidden influence, suggested action and supportive energy. It helps visitors connect the reading to love, wealth, protection, healing or clarity.</p>
    <h2>Yes or No Tarot Reading</h2><p>A yes-or-no reading works best for focused questions where the visitor needs clarity without long explanation.</p>
    <h2>Daily Tarot Reading</h2><p>A daily reading gives a symbolic focus for the day and can point toward love, wealth, protection, healing or clarity.</p>
    <h2>AI Tarot Reading Style Guidance</h2><p>Ratu Oracle pages are written in plain crawlable HTML so search engines and AI assistants can read the guidance, product links and frequently asked questions without needing a popup.</p>
    <p>Your reading has revealed the symbolic energy surrounding your situation. Explore objects connected to this intention.</p>
  </section>
  <section class="section"><h2>Related Products</h2><div class="grid">${related.map(productCard).join("")}</div></section>
  <section class="section"><h2>Frequently Asked Questions About Free Tarot Reading</h2><dl class="faq">${faq.map(([q, a]) => `<dt>${esc(q)}</dt><dd>${esc(a)}</dd>`).join("")}</dl></section>`;
  const schema = [{ "@context": "https://schema.org", "@type": "WebPage", name: p.h1, description: p.meta, url: abs(`/${p.slug}.html`) }, breadcrumb([{ name: "Home", url: SITE }, { name: p.h1, url: abs(`/${p.slug}.html`) }]), faqSchema(), { "@context": "https://schema.org", "@type": "ItemList", itemListElement: related.map((product, i) => ({ "@type": "ListItem", position: i + 1, item: productSchema(product) })) }];
  write(`${p.slug}.html`, layout({ title: p.title, meta: p.meta, url: abs(`/${p.slug}.html`), image: related[0]?.image || products[0].image, keywords: `${p.key}, free tarot reading, free online tarot reading, Chant Spheres, Spirit Dolls, Solomon seal talismans, Ratu Oracle` }, body, schema));
}

for (const product of products) {
  const content = `<nav class="crumbs"><a href="/">Home</a> / <a href="/marketplace.html">Marketplace</a> / ${esc(product.name)}</nav>
  <article class="hero" itemscope itemtype="https://schema.org/Product"><div><h1 itemprop="name">${esc(product.name)}</h1><p class="tag">${esc(product.category)} · ${esc(product.intention)}</p><p itemprop="description">${esc(product.desc)}</p><p>Ratu Oracle presents ${esc(product.name)} as part of a symbolic spiritual marketplace for people exploring free tarot reading, energy alignment, spiritual collectibles, Chant Spheres, Spirit Dolls, talismans and sacred decor. This object is connected to ${esc(product.intention.toLowerCase())} and can be considered after a reading points toward that kind of support.</p><p class="price">$${esc(product.price)}</p><div class="cta"><a class="btn primary" href="mailto:agi.godmode@gmail.com?subject=${encodeURIComponent(product.name)}">Contact to Buy</a><a class="btn" href="/free-tarot-reading.html">Start Free Tarot Reading</a></div></div><figure><img src="${product.image}" alt="${esc(product.name)} ${esc(product.keywords)} by Ratu Oracle" title="${esc(product.name)}" width="900" height="1200" loading="eager" decoding="async"><figcaption>${esc(product.desc)}</figcaption></figure></article>
  <section class="section"><h2>Symbolic Meaning and Use</h2><p>${esc(product.name)} is described with plain language so buyers, search engines and AI crawlers can understand the object without hidden popups. It belongs to the Ratu Oracle path of reading, reflection and chosen object. Visitors can begin with a free online tarot reading, then explore products that match the symbolic intention revealed by the reading.</p><p>Keywords connected to this item include ${esc(product.keywords)}, Ratu Oracle, free tarot reading, online oracle reading, spiritual marketplace and personalized spiritual charm.</p></section>
  <section class="section"><h2>Related Products</h2><div class="grid">${products.filter((x) => x.slug !== product.slug).slice(0, 4).map(productCard).join("")}</div></section>
  <section class="section"><h2>FAQ</h2><dl class="faq">${faq.map(([q, a]) => `<dt>${esc(q)}</dt><dd>${esc(a)}</dd>`).join("")}</dl></section>`;
  const url = abs(`/products/${product.slug}.html`);
  const html = layout({ title: `${product.name} | Ratu Oracle ${product.category}`, meta: product.desc, url, image: product.image, keywords: product.keywords }, content, [productSchema(product, url), breadcrumb([{ name: "Home", url: SITE }, { name: "Marketplace", url: abs("/marketplace.html") }, { name: product.name, url }]), faqSchema()]);
  write(`products/${product.slug}.html`, html);
  write(`chant-spheres/${product.slug}.html`, html.replaceAll(`/products/${product.slug}.html`, `/chant-spheres/${product.slug}.html`));
  if (product.category === "Spirit Doll") write(`spirit-dolls/${product.slug}.html`, html.replaceAll(`/products/${product.slug}.html`, `/spirit-dolls/${product.slug}.html`));
}

const landingUrls = pages.map((p) => `/${p.slug}.html`);
const productUrls = products.flatMap((p) => [`/products/${p.slug}.html`, `/chant-spheres/${p.slug}.html`, ...(p.category === "Spirit Doll" ? [`/spirit-dolls/${p.slug}.html`] : [])]);
const allUrls = ["/", ...landingUrls, ...productUrls, "/indotalisman.html", "/spirit-dolls-magickal-objects.html", "/labubu-pop-mart-collectibles.html"];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${allUrls.map((u) => `<url><loc>${abs(u)}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.8"}</priority>${products.filter((p) => u.includes(p.slug)).map((p) => `<image:image><image:loc>${abs(p.image)}</image:loc><image:title>${esc(p.name)}</image:title><image:caption>${esc(p.desc)}</image:caption></image:image>`).join("")}</url>`).join("")}</urlset>`);
write("sitemap-products.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${productUrls.map((u) => `<url><loc>${abs(u)}</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`).join("")}</urlset>`);
write("sitemap-images.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${products.map((p) => `<url><loc>${abs(`/products/${p.slug}.html`)}</loc><image:image><image:loc>${abs(p.image)}</image:loc><image:title>${esc(p.name)}</image:title><image:caption>${esc(p.desc)}</image:caption></image:image></url>`).join("")}</urlset>`);
write("sitemap-index.xml", `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${SITE}/sitemap.xml</loc><lastmod>${TODAY}</lastmod></sitemap><sitemap><loc>${SITE}/sitemap-products.xml</loc><lastmod>${TODAY}</lastmod></sitemap><sitemap><loc>${SITE}/sitemap-images.xml</loc><lastmod>${TODAY}</lastmod></sitemap></sitemapindex>`);
write("robots.txt", `User-agent: *\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: Googlebot-Image\nAllow: /\n\nUser-agent: Bingbot\nAllow: /\n\nUser-agent: Applebot\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Claude-SearchBot\nAllow: /\n\nUser-agent: Bravebot\nAllow: /\n\nUser-agent: DuckDuckBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nUser-agent: CCBot\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\nSitemap: ${SITE}/sitemap-products.xml\nSitemap: ${SITE}/sitemap-images.xml`);

const aiIndex = `# Ratu Oracle AI and crawler index\n\nRatu Oracle is a free tarot reading and spiritual marketplace website for Chant Spheres, Spirit Dolls, Solomon-inspired seal talismans, Indonesian talismans, spiritual art, sacred decor and symbolic oracle products.\n\nImportant URLs:\n${allUrls.map((u) => `- ${abs(u)}`).join("\n")}\n\nProduct keywords:\n${products.map((p) => `- ${p.name}: ${p.keywords}. ${p.desc}`).join("\n")}\n`;
write("llms.txt", aiIndex);
write("llms-full.txt", `${aiIndex}\n\nBuyer journey: free tarot reading, daily tarot reading, yes no tarot reading, love tarot reading, wealth tarot reading, protection tarot reading, healing tarot reading, clarity tarot reading, Chant Spheres, Spirit Dolls, spiritual marketplace, talismans, amulets, mustika, khodam, Solomon seal, Seal of Solomon, OOAK spirit doll, fantasy collectible.`);
write("ai.txt", aiIndex);
write("ai-crawler-index.html", layout({ title: "Ratu Oracle AI Crawler Index", meta: "AI-readable index of Ratu Oracle free tarot reading pages, Chant Spheres, Spirit Dolls, talismans and spiritual marketplace products.", url: abs("/ai-crawler-index.html"), image: products[0].image, keywords: "Ratu Oracle AI index, free tarot reading, spiritual marketplace" }, `<section class="section"><h1>Ratu Oracle AI Crawler Index</h1><p>This page lists crawlable Ratu Oracle buyer pages and product pages for search engines, AI assistants and discovery systems.</p><ul>${allUrls.map((u) => `<li><a href="${u}">${abs(u)}</a></li>`).join("")}</ul></section>`));

const vercelPath = path.join(ROOT, "vercel.json");
const vercel = fs.existsSync(vercelPath) ? JSON.parse(fs.readFileSync(vercelPath, "utf8")) : {};
vercel.outputDirectory = ".";
vercel.rewrites = vercel.rewrites || [];
const addRewrite = (source, destination) => {
  if (!vercel.rewrites.some((r) => r.source === source)) vercel.rewrites.push({ source, destination });
};
for (const p of pages) addRewrite(`/${p.slug}`, `/${p.slug}.html`);
addRewrite("/shop", "/marketplace.html");
addRewrite("/products/:slug", "/products/:slug.html");
addRewrite("/chant-spheres/:slug", "/chant-spheres/:slug.html");
addRewrite("/spirit-dolls/:slug", "/spirit-dolls/:slug.html");
fs.writeFileSync(vercelPath, `${JSON.stringify(vercel, null, 2)}\n`, "utf8");

const indexPath = path.join(ROOT, "index.html");
if (fs.existsSync(indexPath)) {
  let index = fs.readFileSync(indexPath, "utf8");
  const buyerHeroCopy = "Use the free Ratu Oracle reading to explore the hidden influences surrounding love, wealth, protection, healing or clarity—then discover a Chant Sphere, Spirit Doll or talisman connected to your reading.";
  if (!index.includes("buyer-seo-mobile-fix")) {
    index = index.replace("</head>", `<style id="buyer-seo-mobile-fix">.product-card img,.sphere-card img{width:100%;height:auto;object-fit:contain;object-position:center top;display:block;background:#fffaf0}.product-image,.sphere-image{height:auto;overflow:visible;background:#fffaf0}.product-card,.sphere-card{overflow:visible}.buyer-seo-links{max-width:1180px;margin:24px auto;padding:18px;border:1px solid #ead8c0;border-radius:8px;background:#fff}.buyer-seo-links a{display:inline-block;margin:6px 8px;color:#2f174d}@media(max-width:768px){.product-card img,.sphere-card img{width:100%;height:auto;object-fit:contain;object-position:center top;display:block}.product-image,.sphere-image{height:auto;overflow:visible}.product-card,.sphere-card{overflow:visible}}</style></head>`);
  }
  index = index.replace(/Every Chant Sphere carries a story\./g, "Discover the Energy Behind Your Situation");
  index = index.replace(/(<h2>Discover the Energy Behind Your Situation<\/h2>\s*<p class="lede">)[\s\S]*?(<\/p>)/, `$1${buyerHeroCopy}$2`);
  index = index.replace(/Create, activate, share, buy, sell, and collect personalized Chant Spheres with real owner experiences attached\./g, buyerHeroCopy);
  index = index.replace(/Use free Ratu Oracle guidance to discover which Chant Sphere fits the energy of the moment, then create, activate, share, buy, sell, or collect the Sphere with real owner experiences attached\./g, buyerHeroCopy);
  index = index.replace(/CREATE MY SPHERE\s*✦?|Create My Sphere/g, "Start Your Free Reading");
  index = index.replace(/EXPLORE MARKETPLACE|Explore Marketplace/g, "Explore Chant Spheres");
  if (!index.includes("buyer-seo-links")) {
    index = index.replace("</body>", `<section class="buyer-seo-links"><h2>Find Your Reading and Spiritual Object</h2><p>Start with a free tarot reading, then explore Chant Spheres, Spirit Dolls, Solomon Seal talismans and spiritual marketplace products connected to your situation.</p>${pages.map((p) => `<a href="/${p.slug}.html">${esc(p.h1)}</a>`).join("")}</section></body>`);
  }
  fs.writeFileSync(indexPath, index, "utf8");
}

console.log(`Generated ${pages.length} SEO landing pages, ${products.length} products, sitemap, robots, llms and homepage links.`);
