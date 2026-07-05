import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = "https://ratu-oracle-kar4.vercel.app";
const today = "2026-07-04";

const ensureDir = (dir) => fs.mkdirSync(path.join(root, dir), { recursive: true });
const write = (file, content) => {
  const fullPath = path.join(root, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.replace(/\n{3,}/g, "\n\n"), "utf8");
};
const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (url) => url.startsWith("http") ? url : `${site}${url.startsWith("/") ? url : `/${url}`}`;

ensureDir("assets/products");

const gandharaImage = "/assets/products/gandhara-buddha-head-real.jpg";

const products = [
  {
    name: "Earth Guardian Spirit Doll",
    url: "/spirit-dolls/earth-guardian",
    image: "/assets/spheres/unity-card-24.png",
    price: "120.00",
    category: "Spirit Doll",
    description: "A grounding guardian spirit doll for home blessing, steadiness, patience, and quiet protection.",
    alt: "Earth guardian spirit doll for grounding and home blessing"
  },
  {
    name: "Air Spirit Doll",
    url: "/spirit-dolls/air-spirit",
    image: "/assets/spheres/divine-light-card-10.png",
    price: "110.00",
    category: "Spirit Doll",
    description: "An airy spirit doll for clarity, communication, inspiration, gentle movement, and bright thought.",
    alt: "Air spirit doll for clarity communication and inspiration"
  },
  {
    name: "Fire Guardian Spirit Doll",
    url: "/spirit-dolls/fire-guardian",
    image: "/assets/spheres/decree-card-8.png",
    price: "125.00",
    category: "Spirit Doll",
    description: "A fire guardian spirit doll for courage, confidence, action, boundaries, and strong protection.",
    alt: "Fire guardian spirit doll for confidence action and protection"
  },
  {
    name: "Water Guardian Spirit Doll",
    url: "/spirit-dolls/water-guardian",
    image: "/assets/spheres/success-path-card-20.png",
    price: "118.00",
    category: "Spirit Doll",
    description: "A water guardian spirit doll for emotional healing, softness, love, renewal, and peaceful release.",
    alt: "Water guardian spirit doll for emotional healing renewal and release"
  },
  {
    name: "Gandhara Buddha Head",
    url: "/spirit-dolls/gandhara-buddha-head",
    image: gandharaImage,
    price: "180.00",
    category: "Spiritual Art Object",
    description: "A Gandhara-style Buddha head, Greek-Buddhist inspired spiritual art object for clarity, meditation, and disciplined thought.",
    alt: "Gandhara-style Buddha head Greek-Buddhist inspired spiritual art object"
  }
];

const coreLinks = [
  ["/", "Home"],
  ["/free-tarot-reading.html", "Free Tarot Reading"],
  ["/spirit-dolls", "Spirit Dolls"],
  ["/magickal-objects", "Magickal Objects"],
  ["/indonesian-talisman", "Indonesian Talismans"],
  ["/indotalisman.html", "Indotalisman"],
  ["/guardian-spirit-doll", "Guardian Spirit Doll"],
  ["/medicine-spirit-doll", "Medicine Spirit Doll"],
  ["/gandhara-buddha-head", "Gandhara Buddha Head"],
  ["/shop", "Shop"],
  ["mailto:agi.godmode@gmail.com", "Contact"]
];

const faq = [
  ["What is a spirit doll?", "A spirit doll is a symbolic companion object used for intention, storytelling, protection, meditation, blessing, and personal focus. Ratu Oracle presents each doll as a spiritual art object with clear descriptive meaning."],
  ["What is a guardian spirit doll?", "A guardian spirit doll is chosen for protective symbolism, home blessing, emotional steadiness, and the feeling of being accompanied by a meaningful spiritual figure."],
  ["Can a spirit doll help with protection?", "Many collectors use protective dolls and talismanic objects as reminders of boundary, courage, prayer, and inner order. They are spiritual collectibles, not medical or guaranteed supernatural services."],
  ["Are the dolls unique?", "Yes. Ratu Oracle highlights OOAK spirit dolls, unique handmade gifts, fantasy collectibles, and symbolic objects whose names, stories, and visual details make each piece feel personal."],
  ["Should I use the free tarot reading first?", "Yes. The free Ratu Oracle reading can help visitors choose whether love, protection, clarity, healing, grounding, or prosperity is the best symbolic direction before choosing a Chant Sphere or spirit doll."]
];

const style = `<style>
:root{--ink:#1f1728;--muted:#665a70;--plum:#44226b;--gold:#b87a2c;--line:#eadfd2;--paper:#fffaf4;--soft:#f7efe5}
*{box-sizing:border-box}body{margin:0;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:linear-gradient(180deg,#fffdf9,#f8efe5)}a{color:inherit}.shell{width:min(1160px,calc(100% - 32px));margin:0 auto}.topbar{position:sticky;top:0;z-index:5;background:rgba(255,250,244,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}.nav{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.brand img{width:40px;height:40px;border-radius:10px}.links{display:flex;gap:10px;flex-wrap:wrap}.links a,.btn{border:1px solid #b89b82;border-radius:6px;background:#fff;padding:10px 13px;text-decoration:none;font-weight:850;font-size:12px;text-transform:uppercase}.btn.primary{background:linear-gradient(135deg,#44226b,#6d3b98);border-color:#44226b;color:#fff}.hero{padding:54px 0 28px;display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:34px;align-items:center}h1,h2,h3{font-family:Georgia,"Times New Roman",serif;font-weight:500;letter-spacing:0}h1{font-size:clamp(38px,6vw,68px);line-height:1;margin:0;color:#2d1744}.lede{font-size:18px;line-height:1.75;color:#352d3d}.art{background:#fff;border:1px solid var(--line);border-radius:8px;padding:10px;box-shadow:0 18px 50px rgba(57,31,23,.13)}.art img{width:100%;display:block;border-radius:6px}.grid{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:22px;padding:22px 0 58px}.panel,.product{background:rgba(255,250,244,.94);border:1px solid var(--line);border-radius:8px;padding:24px;box-shadow:0 16px 42px rgba(48,29,17,.08)}p,li{line-height:1.8}.muted{color:var(--muted)}.cards{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}.grid aside .cards{grid-template-columns:1fr}.grid aside .card{display:grid;grid-template-columns:82px minmax(0,1fr);align-items:stretch}.grid aside .card img{height:100%;aspect-ratio:1;object-fit:cover;object-position:center}.grid aside .card div{padding:10px}.grid aside .card strong{font-size:14px}.grid aside .card .muted{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:13px;line-height:1.45;margin:6px 0}.grid aside .card .price{margin:4px 0 0;font-size:14px}.card{background:#fff;border:1px solid var(--line);border-radius:8px;overflow:hidden;text-decoration:none;box-shadow:0 12px 30px rgba(48,29,17,.08)}.card img{width:100%;aspect-ratio:3/4;object-fit:cover;object-position:center top;display:block}.card div{padding:12px}.card strong{display:block;line-height:1.2}.price{font-weight:900;color:var(--plum)}.faq dt{font-weight:800;margin-top:16px}.faq dd{margin:6px 0 0;color:var(--muted);line-height:1.7}.breadcrumbs{font-size:13px;color:var(--muted);padding-top:18px}.keywords{display:flex;flex-wrap:wrap;gap:8px}.keywords span{border:1px solid rgba(184,122,44,.28);background:#fff;border-radius:999px;padding:8px 10px;color:var(--muted);font-size:12px}footer{border-top:1px solid var(--line);padding:28px 0;color:var(--muted)}.foot{display:grid;grid-template-columns:1fr 2fr;gap:20px}.foot nav{columns:2}.foot a{display:block;line-height:1.9}@media(max-width:1020px){.cards{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:900px){.hero,.grid,.foot{grid-template-columns:1fr}.cards{grid-template-columns:repeat(2,minmax(0,1fr))}.art{max-width:360px}}@media(max-width:640px){.nav{align-items:flex-start}.links{width:100%;gap:6px}.links a{flex:1;min-width:118px;text-align:center;padding:10px 8px}.hero{padding-top:34px}.cards{grid-template-columns:1fr 1fr;gap:10px}.panel{padding:18px}.card div{padding:10px}.card p{font-size:13px;line-height:1.45}}@media(max-width:420px){.cards{grid-template-columns:1fr}.shell{width:min(100% - 20px,1160px)}}
</style>`;

function nav() {
  return `<header class="topbar"><nav class="shell nav"><a class="brand" href="/"><img src="/assets/logo/chant-sphere-logo.svg" alt="Ratu Oracle Chant Sphere logo">Ratu Oracle</a><div class="links">${coreLinks.slice(1, 7).map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</div></nav></header>`;
}

function footer() {
  return `<footer><div class="shell foot"><div><strong>Ratu Oracle</strong><p>Free tarot reading, Chant Spheres, spirit dolls, magickal objects, Indonesian talismans, QR Passport pages, owner stories, and spiritual marketplace discovery.</p></div><nav aria-label="Footer discovery links">${coreLinks.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}<a href="/spirit-dolls-magickal-objects.html">Spirit Dolls & Magickal Objects Marketplace</a><a href="/ai-crawler-index.html">AI Index</a><a href="/llms.txt">llms.txt</a></nav></div></footer>`;
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function meta({ title, description, canonical, image, keywords }) {
  const full = abs(canonical);
  const img = abs(image || "/assets/spheres/divine-light-card-10.png");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="keywords" content="${esc(keywords.join(", "))}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${full}"><link rel="icon" type="image/svg+xml" href="/assets/logo/chant-sphere-logo.svg"><meta property="og:type" content="website"><meta property="og:site_name" content="Ratu Oracle"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${full}"><meta property="og:image" content="${img}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${img}">`;
}

function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: abs(product.image),
    category: product.category,
    brand: { "@type": "Brand", name: "Ratu Oracle" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: abs(product.url)
    }
  };
}

function schemas({ title, description, canonical, productsForPage = products, breadcrumbName, faqItems = faq, type = "CollectionPage" }) {
  return [
    { "@context": "https://schema.org", "@type": "WebSite", name: "Ratu Oracle", url: site, description: "Free online tarot reading and spiritual marketplace for Chant Spheres, spirit dolls, talismans, and magickal objects." },
    { "@context": "https://schema.org", "@type": "Organization", name: "Ratu Oracle", url: site, logo: `${site}/assets/logo/chant-sphere-logo.svg`, contactPoint: { "@type": "ContactPoint", email: "agi.godmode@gmail.com", contactType: "customer support" } },
    { "@context": "https://schema.org", "@type": type, name: title, url: abs(canonical), description },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: site }, { "@type": "ListItem", position: 2, name: breadcrumbName || title, item: abs(canonical) }] },
    { "@context": "https://schema.org", "@type": "ItemList", name: `${title} Products`, itemListElement: productsForPage.map((p, index) => ({ "@type": "ListItem", position: index + 1, name: p.name, url: abs(p.url) })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ...productsForPage.map(productSchema)
  ];
}

function productCards(items = products) {
  return `<div class="cards">${items.map((p) => `<a class="card" href="${p.url}"><img src="${p.image}" alt="${esc(p.alt)}"><div><strong>${esc(p.name)}</strong><p class="muted">${esc(p.description)}</p><p class="price">$${p.price}</p></div></a>`).join("")}</div>`;
}

function landingPage({ file, slug, title, h1, description, image, keywords, focus, intro, sections, type = "CollectionPage" }) {
  const canonical = slug.startsWith("/") ? slug : `/${slug}`;
  const content = `${meta({ title, description, canonical, image, keywords })}${jsonLd(schemas({ title, description, canonical, breadcrumbName: h1, type }))}${style}</head><body>${nav()}<main class="shell"><div class="breadcrumbs"><a href="/">Home</a> / ${esc(h1)}</div><section class="hero"><div><h1>${esc(h1)}</h1><p class="lede">${esc(description)}</p><p>${intro}</p><div class="links"><a class="btn primary" href="/free-tarot-reading.html">Try the Free Tarot Reading</a><a class="btn" href="/spirit-dolls">Browse Spirit Dolls</a><a class="btn" href="/shop">Shop</a></div></div><div class="art"><img src="${image}" alt="${esc(h1)}"></div></section><section class="panel"><h2>${esc(focus)} Product Collection</h2>${productCards()}</section><section class="grid"><article class="panel">${sections.map(([heading, text]) => `<h2>${esc(heading)}</h2><p>${text}</p>`).join("")}<h2>Frequently Asked Questions</h2><dl class="faq">${faq.map(([q, a]) => `<dt>${esc(q)}</dt><dd>${esc(a)}</dd>`).join("")}</dl></article><aside class="panel"><h2>Related Links</h2>${coreLinks.map(([href, label]) => `<p><a href="${href}">${label}</a></p>`).join("")}<h2>Keywords</h2><div class="keywords">${keywords.map((k) => `<span>${esc(k)}</span>`).join("")}</div></aside></section></main>${footer()}</body></html>`;
  write(file, content);
}

const spiritKeywords = ["spirit dolls", "spirit doll", "handmade spirit dolls", "guardian spirit doll", "medicine spirit doll", "unique spirit dolls", "Asian spirit doll", "Hoodoo spirit doll", "spirit doll art", "OOAK spirit dolls", "magickal spirit dolls", "ritual dolls", "spiritual dolls", "protective dolls", "spirit companion dolls", "haunted spirit dolls", "khodam spirit dolls", "mystical dolls", "folk magic dolls", "talismans and spirit dolls", "magickal objects", "spiritual protection objects", "Chant Sphere", "free tarot reading"];
const spiritIntro = "Ratu Oracle treats spirit dolls as symbolic companions, art objects, and intention keepers. Each page is written in plain language so visitors, Google, Bing, and AI search crawlers can understand what the object represents, how it connects to spiritual storytelling, and how a free tarot-style reading can help a person choose a direction before buying.";
const spiritSections = [
  ["About Spirit Dolls", "Spirit dolls appear in many folk, devotional, and magical traditions as figures of memory, prayer, protection, guidance, and personal meaning. On Ratu Oracle they are described as spiritual collectibles and symbolic companions rather than guaranteed supernatural services."],
  ["How Spirit Dolls Are Used", "Collectors may keep a spirit doll on an altar, desk, reading table, meditation shelf, or bedside space. The doll becomes a visual reminder of a chosen intention such as confidence, calm, courage, prosperity, love, healing, or protection."],
  ["Guardian Spirit Dolls", "A guardian spirit doll emphasizes boundary, steadiness, and emotional security. Visitors looking for protection charms, home blessing objects, or ritual dolls can compare the guardian pages with Chant Sphere cards and QR Passport stories."],
  ["Medicine Spirit Dolls", "Medicine spirit dolls are framed around restoration, renewal, and inner harmony. They support reflective practice, personal story, and symbolic healing without replacing medical or professional support."],
  ["Magickal Objects and Talismans", "Ratu Oracle also connects spirit dolls with Indonesian talismans, mustika stones, amulets, Solomon-inspired seal cards, and other sacred objects. The goal is careful presentation, clear keywords, and respectful cultural context."],
  ["Free Tarot Reading Connection", "The free online tarot reading is the entry point. A visitor can read the current energy, then follow internal links to spirit dolls, love charms, wealth charms, protection charms, healing cards, and related product pages."]
];

[
  ["spirit-dolls.html", "/spirit-dolls", "Spirit Dolls Marketplace | Ratu Oracle", "Spirit Dolls Marketplace", "Browse spirit dolls, guardian spirit dolls, medicine spirit dolls, OOAK handmade dolls, ritual dolls, magickal objects, and spiritual protection objects connected to Ratu Oracle readings.", "/assets/spheres/divine-light-card-10.png", "Spirit Dolls"],
  ["spirit-doll.html", "/spirit-doll", "Spirit Doll Guide | Ratu Oracle", "Spirit Doll Guide", "Learn what a spirit doll is, how symbolic dolls are used for intention and protection, and how to choose one through the free Ratu Oracle reading.", "/assets/spheres/unity-card-24.png", "Spirit Doll"],
  ["handmade-spirit-dolls.html", "/handmade-spirit-dolls", "Handmade Spirit Dolls | Ratu Oracle", "Handmade Spirit Dolls", "Explore handmade spirit dolls, OOAK spiritual collectibles, altar guardians, fantasy dolls, and symbolic companions for intention and story.", "/assets/spheres/success-path-card-20.png", "Handmade Spirit Dolls"],
  ["guardian-spirit-doll.html", "/guardian-spirit-doll", "Guardian Spirit Doll | Protection Dolls | Ratu Oracle", "Guardian Spirit Doll", "Find guardian spirit doll meanings for protection, home blessing, spiritual boundary, courage, and calm symbolic support.", "/assets/spheres/decree-card-8.png", "Guardian Spirit Doll"],
  ["medicine-spirit-doll.html", "/medicine-spirit-doll", "Medicine Spirit Doll | Healing Symbolic Doll | Ratu Oracle", "Medicine Spirit Doll", "Discover medicine spirit dolls for renewal, emotional restoration, calming energy, mindfulness, and symbolic healing stories.", "/assets/spheres/protection-card-28.png", "Medicine Spirit Doll"],
  ["unique-spirit-dolls.html", "/unique-spirit-dolls", "Unique Spirit Dolls & OOAK Dolls | Ratu Oracle", "Unique Spirit Dolls", "Shop unique spirit dolls, OOAK artist dolls, fantasy collectibles, mystical dolls, and spiritual gifts with story-rich product pages.", "/assets/spheres/divine-light-card-10.png", "Unique Spirit Dolls"],
  ["asian-spirit-doll.html", "/asian-spirit-doll", "Asian Spirit Doll & Indonesian Spiritual Objects | Ratu Oracle", "Asian Spirit Doll", "Explore Asian spirit doll symbolism, Indonesian talisman traditions, mustika stones, khodam-inspired objects, and careful spiritual presentation.", "/assets/spheres/unity-card-24.png", "Asian Spirit Doll"],
  ["hoodoo-spirit-doll.html", "/hoodoo-spirit-doll", "Hoodoo Spirit Doll Keywords & Folk Magic Dolls | Ratu Oracle", "Hoodoo Spirit Doll", "A respectful keyword landing page for Hoodoo spirit doll searches, folk magic dolls, ritual dolls, protective dolls, and spiritual companion objects.", "/assets/spheres/decree-card-8.png", "Hoodoo Spirit Doll"],
  ["spirit-doll-art.html", "/spirit-doll-art", "Spirit Doll Art & Fantasy Collectibles | Ratu Oracle", "Spirit Doll Art", "View spirit doll art, fantasy doll symbolism, mystical collectibles, ritual object design, and story-led spiritual product pages.", "/assets/spheres/success-path-card-20.png", "Spirit Doll Art"],
  ["magickal-objects.html", "/magickal-objects", "Magickal Objects, Talismans & Spirit Dolls | Ratu Oracle", "Magickal Objects", "Discover magickal objects, talismans, amulets, mustika stones, Solomon-inspired seals, spirit dolls, and spiritual marketplace products.", "/assets/spheres/solomon-love-harmony.png", "Magickal Objects"],
  ["indonesian-talisman.html", "/indonesian-talisman", "Indonesian Talisman, Mustika Stones & Amulets | Ratu Oracle", "Indonesian Talisman", "Explore Indonesian talisman keywords, mustika stones, bezoar stones, amulets, mystical oils, sacred relics, and Indotalisman shop links.", "/assets/spheres/solomon-love-harmony.png", "Indonesian Talisman"]
].forEach(([file, slug, title, h1, description, image, focus]) => landingPage({ file, slug, title, h1, description, image, keywords: spiritKeywords, focus, intro: spiritIntro, sections: spiritSections }));

const gandhara = products.find((p) => p.name === "Gandhara Buddha Head");
const gandharaKeywords = ["Gandhara Buddha head", "Gandhara Buddha head for sale", "Gandharan Buddha head", "Gandhara art", "Gandhara sculpture", "Greek Buddhist art", "Greco Buddhist Buddha head", "Buddhist head sculpture", "Buddha head statue", "Buddha head decor", "museum replica Buddha head", "museum reproduction Buddha head", "Gandhara replica Buddha", "Gandhara style Buddha", "Buddhist antiquities style", "ancient Buddhist art replica", "meditation decor", "spiritual art object", "sacred art object", "clarity talisman", "mindfulness object", "Buddhist collectible", "Himalayan art", "Indian Buddhist art", "Southeast Asian Buddhist art", "antiquities inspired decor", "Buddha head study piece", "museum grade reproduction", "schist style Buddha head", "stucco style Buddha head"];
const gandharaIntro = "This page presents the Gandhara Buddha Head as a Gandhara-style Buddha head and Greek-Buddhist inspired spiritual art object. It is written with safe collectible wording: museum-inspired reproduction, decorative study piece, meditation decor, and symbolic clarity object. It is not represented as an excavated ancient artifact unless legal provenance is clearly provided.";
const gandharaSections = [
  ["Greek-Buddhist Inspired Form", "Gandhara art is known for a meeting of Buddhist devotional imagery with Hellenistic sculptural influence. The calm face, wavy hair, composed expression, and balanced profile make the Buddha head a powerful visual reminder of reflection and disciplined thought."],
  ["Spiritual Meaning", "Ratu Oracle connects this study piece with clarity, higher awareness, inner balance, patient contemplation, and quiet leadership of the mind. It is a symbolic object for meditation rooms, reading spaces, altars, and spiritual collections."],
  ["Safe Collectible Disclaimer", "This item is presented as a spiritual art object, decorative study piece, or reproduction-style collectible. It is not represented as an excavated ancient artifact unless legal provenance is clearly provided."],
  ["How To Use It", "Place the object where you read, meditate, journal, or make decisions. Use it as a reminder to slow the mind, organize the heart, and choose the next step with composure."],
  ["Related Ratu Oracle Pages", "Visitors can connect this object with free tarot guidance, spirit dolls, Indonesian talisman pages, Solomon-inspired seals, and the broader spiritual marketplace."]
];
const gandharaFaq = [
  ["Is this an ancient Gandhara artifact?", "No. This page uses safe wording: Gandhara-style, museum-inspired reproduction, decorative study piece, and Greek-Buddhist inspired spiritual object unless legal provenance is clearly provided."],
  ["What does a Gandhara Buddha head symbolize?", "It can symbolize calm attention, disciplined thought, meditation, clarity, higher awareness, and inner balance."],
  ["Can I use it for meditation decor?", "Yes. It is presented as meditation decor, spiritual art, and a study piece for a reflective space."],
  ["Does Ratu Oracle sell related spiritual objects?", "Yes. Related pages include spirit dolls, Chant Spheres, Indonesian talismans, Solomon-inspired seal cards, and free tarot reading guidance."],
  ["Is it a Product page for search engines?", "Yes. The page includes Product schema, canonical tags, breadcrumbs, Open Graph tags, Twitter cards, and sitemap entries."]
];

function gandharaPage(file, slug, title, h1, description) {
  const canonical = slug;
  const content = `${meta({ title, description, canonical, image: gandhara.image, keywords: gandharaKeywords })}${jsonLd(schemas({ title, description, canonical, productsForPage: [gandhara, ...products.slice(0, 4)], breadcrumbName: h1, faqItems: gandharaFaq, type: "WebPage" }))}${style}</head><body>${nav()}<main class="shell"><div class="breadcrumbs"><a href="/">Home</a> / <a href="/spiritual-art-objects">Spiritual Art Objects</a> / ${esc(h1)}</div><section class="hero"><div><h1>${esc(h1)}</h1><p class="lede">${esc(description)}</p><p>${gandharaIntro}</p><div class="links"><a class="btn primary" href="/free-tarot-reading.html">Use Free Tarot Reading</a><a class="btn" href="/spirit-dolls">Related Spirit Dolls</a><a class="btn" href="/indotalisman.html">Indotalisman</a></div></div><div class="art"><img src="${gandhara.image}" alt="${esc(gandhara.alt)}"></div></section><section class="grid"><article class="panel">${gandharaSections.map(([heading, text]) => `<h2>${esc(heading)}</h2><p>${text}</p>`).join("")}<h2>Frequently Asked Questions</h2><dl class="faq">${gandharaFaq.map(([q, a]) => `<dt>${esc(q)}</dt><dd>${esc(a)}</dd>`).join("")}</dl></article><aside class="panel"><h2>Product Summary</h2><p><strong>${gandhara.name}</strong></p><p>${gandhara.description}</p><p class="price">$${gandhara.price}</p><p><a class="btn primary" href="mailto:agi.godmode@gmail.com?subject=Gandhara%20Buddha%20Head">Ask About This Piece</a></p><h2>Related Products</h2>${productCards(products.slice(0, 4))}</aside></section><section class="panel"><h2>Related Spiritual Art and Marketplace Links</h2><div class="keywords">${gandharaKeywords.map((k) => `<span>${esc(k)}</span>`).join("")}</div></section></main>${footer()}</body></html>`;
  write(file, content);
}

[
  ["gandhara-buddha-head.html", "/gandhara-buddha-head", "Gandhara Buddha Head – Greek-Buddhist Inspired Spiritual Art Object | Ratu Oracle", "Gandhara Buddha Head – Greek-Buddhist Inspired Spiritual Art Object", "A Gandhara-style Buddha head, museum-inspired reproduction and Greek-Buddhist inspired spiritual art object for meditation decor, clarity, reflection, and inner balance."],
  ["gandhara-buddha-head-for-sale.html", "/gandhara-buddha-head-for-sale", "Gandhara Buddha Head for Sale | Museum-Inspired Reproduction | Ratu Oracle", "Gandhara Buddha Head for Sale", "Browse a Gandhara-style Buddha head for sale as a museum-inspired reproduction, Buddhist collectible, meditation decor, and spiritual art object."],
  ["gandhara-buddha-head-replica.html", "/gandhara-buddha-head-replica", "Gandhara Buddha Head Replica | Greek-Buddhist Art Decor | Ratu Oracle", "Gandhara Buddha Head Replica", "A Gandhara Buddha head replica page for Greek-Buddhist art, Buddhist head sculpture decor, meditation rooms, and spiritual collections."],
  ["greek-buddhist-art.html", "/greek-buddhist-art", "Greek Buddhist Art & Gandhara Style Buddha Head | Ratu Oracle", "Greek Buddhist Art", "Explore Greek Buddhist art keywords through a Gandhara-style Buddha head, meditation decor, spiritual art object, and Buddhist collectible study piece."],
  ["buddha-head-sculpture.html", "/buddha-head-sculpture", "Buddha Head Sculpture for Meditation Decor | Ratu Oracle", "Buddha Head Sculpture", "A Buddha head sculpture page for meditation decor, spiritual art, clarity talisman symbolism, and Gandhara-inspired collectible display."],
  ["museum-reproduction-buddha-head.html", "/museum-reproduction-buddha-head", "Museum Reproduction Buddha Head | Gandhara-Inspired Study Piece", "Museum Reproduction Buddha Head", "Museum reproduction Buddha head page for collectors seeking a Gandhara-style decorative study piece with safe provenance wording."],
  ["spiritual-art-objects.html", "/spiritual-art-objects", "Spiritual Art Objects & Buddhist Collectibles | Ratu Oracle", "Spiritual Art Objects", "Browse spiritual art objects, Buddhist collectibles, Gandhara-style decor, Chant Spheres, spirit dolls, and talismanic marketplace pages."],
  ["buddhist-meditation-decor.html", "/buddhist-meditation-decor", "Buddhist Meditation Decor | Gandhara Buddha Head | Ratu Oracle", "Buddhist Meditation Decor", "Buddhist meditation decor page featuring a Gandhara-style Buddha head, clarity symbolism, mindful display, and related spiritual objects."]
].forEach((args) => gandharaPage(...args));

gandharaPage("spirit-dolls/gandhara-buddha-head.html", "/spirit-dolls/gandhara-buddha-head", "Gandhara Buddha Head Passport | Ratu Oracle", "Gandhara Buddha Head Passport", "A crawlable product passport for a Gandhara-style Buddha head, Greek-Buddhist inspired spiritual art object, meditation decor, and clarity study piece.");

function upsertRewrite(rewrites, source, destination) {
  const existing = rewrites.find((r) => r.source === source);
  if (existing) existing.destination = destination;
  else rewrites.push({ source, destination });
}

const vercelPath = path.join(root, "vercel.json");
const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
[
  ["/spirit-dolls", "/spirit-dolls.html"],
  ["/spirit-doll", "/spirit-doll.html"],
  ["/handmade-spirit-dolls", "/handmade-spirit-dolls.html"],
  ["/guardian-spirit-doll", "/guardian-spirit-doll.html"],
  ["/medicine-spirit-doll", "/medicine-spirit-doll.html"],
  ["/unique-spirit-dolls", "/unique-spirit-dolls.html"],
  ["/asian-spirit-doll", "/asian-spirit-doll.html"],
  ["/hoodoo-spirit-doll", "/hoodoo-spirit-doll.html"],
  ["/spirit-doll-art", "/spirit-doll-art.html"],
  ["/magickal-objects", "/magickal-objects.html"],
  ["/indonesian-talisman", "/indonesian-talisman.html"],
  ["/gandhara-buddha-head", "/gandhara-buddha-head.html"],
  ["/gandhara-buddha-head-for-sale", "/gandhara-buddha-head-for-sale.html"],
  ["/gandhara-buddha-head-replica", "/gandhara-buddha-head-replica.html"],
  ["/greek-buddhist-art", "/greek-buddhist-art.html"],
  ["/buddha-head-sculpture", "/buddha-head-sculpture.html"],
  ["/museum-reproduction-buddha-head", "/museum-reproduction-buddha-head.html"],
  ["/spiritual-art-objects", "/spiritual-art-objects.html"],
  ["/buddhist-meditation-decor", "/buddhist-meditation-decor.html"]
].forEach(([source, destination]) => upsertRewrite(vercel.rewrites, source, destination));
for (const header of vercel.headers || []) {
  if (header.source === "/(.*)" && !header.headers.some((h) => h.key === "X-Robots-Tag")) {
    header.headers.push({ key: "X-Robots-Tag", value: "index, follow, max-image-preview:large" });
  }
}
fs.writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + "\n", "utf8");

const mainPages = [
  "/", "/free-tarot-reading.html", "/shop", "/products", "/chant-spheres", "/angel-chant-spheres", "/solomon-seal-cards", "/love-charm", "/wealth-charm", "/protection-charm", "/spiritual-healing-cards",
  "/spirit-dolls-magickal-objects.html", "/indotalisman.html", "/spirit-dolls", "/spirit-doll", "/handmade-spirit-dolls", "/guardian-spirit-doll", "/medicine-spirit-doll", "/unique-spirit-dolls", "/asian-spirit-doll", "/hoodoo-spirit-doll", "/spirit-doll-art", "/magickal-objects", "/indonesian-talisman",
  "/gandhara-buddha-head", "/gandhara-buddha-head-for-sale", "/gandhara-buddha-head-replica", "/greek-buddhist-art", "/buddha-head-sculpture", "/museum-reproduction-buddha-head", "/spiritual-art-objects", "/buddhist-meditation-decor",
  "/free-online-tarot-reading.html", "/online-oracle-reading.html", "/spiritual-card-reading.html", "/energy-reading-online.html", "/spiritual-protection-charm.html", "/money-energy-charm.html", "/abundance-charm.html", "/healing-charm-cards.html", "/tarot-charm-cards.html", "/oracle-charm-cards.html", "/personalized-spiritual-charm.html", "/custom-talisman-card.html", "/energy-alignment-cards.html", "/manifestation-cards.html", "/spiritual-wealth-card.html", "/protection-against-evil-eye.html", "/remove-unseen-blocks.html", "/spiritual-cleansing-card.html", "/angel-wish-card.html", "/tree-of-life-energy-reading.html", "/emanation-oracle-cards.html", "/spiritual-marketplace.html", "/buy-spiritual-charms-online.html", "/ai-crawler-index.html"
];
const productPages = [
  ...products.map((p) => p.url),
  "/products/solomon-love-harmony-charm",
  "/products/divine-light-chant-sphere",
  "/products/unity-whole-chant-sphere",
  "/products/spirit-protection-chant-sphere",
  "/products/good-decree-chant-sphere",
  "/products/success-path-chant-sphere"
];
function urlXml(url, priority = "0.8") {
  return `  <url>\n    <loc>${esc(abs(url))}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${mainPages.map((url, i) => urlXml(url, i === 0 ? "1.0" : "0.86")).join("\n")}\n</urlset>\n`);
write("sitemap-products.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${productPages.map((url) => urlXml(url, "0.88")).join("\n")}\n</urlset>\n`);
write("sitemap-index.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${site}/sitemap.xml</loc><lastmod>${today}</lastmod></sitemap>\n  <sitemap><loc>${site}/sitemap-products.xml</loc><lastmod>${today}</lastmod></sitemap>\n  <sitemap><loc>${site}/sitemap-images.xml</loc><lastmod>${today}</lastmod></sitemap>\n</sitemapindex>\n`);
write("sitemap-images.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${products.map((p) => `  <url>\n    <loc>${esc(abs(p.url))}</loc>\n    <image:image>\n      <image:loc>${esc(abs(p.image))}</image:loc>\n      <image:title>${esc(p.name)}</image:title>\n      <image:caption>${esc(p.alt)}</image:caption>\n    </image:image>\n  </url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: Bingbot\nAllow: /\n\nUser-agent: Applebot\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Bravebot\nAllow: /\n\nUser-agent: DuckDuckBot\nAllow: /\n\nSitemap: ${site}/sitemap.xml\nSitemap: ${site}/sitemap-products.xml\nSitemap: ${site}/sitemap-images.xml\nSitemap: ${site}/sitemap-index.xml\n`);

const aiLines = [
  "# Ratu Oracle AI and Crawler Index",
  "Ratu Oracle is a free online tarot reading and spiritual marketplace for Chant Spheres, spirit dolls, magickal objects, Indonesian talismans, amulets, mustika stones, Solomon-inspired seals, and Greek-Buddhist inspired spiritual art objects.",
  "",
  "Primary URLs:",
  ...mainPages.map((u) => `- ${abs(u)}`),
  "",
  "Product URLs:",
  ...productPages.map((u) => `- ${abs(u)}`),
  "",
  "Priority keywords: " + [...spiritKeywords, ...gandharaKeywords].join(", ")
].join("\n");
write("ai.txt", aiLines + "\n");
write("llms.txt", aiLines + "\n");
write("llms-full.txt", aiLines + "\n\nRatu Oracle pages are static, crawlable, and include canonical tags, Open Graph data, Twitter cards, breadcrumbs, FAQ schema, Product schema, CollectionPage schema, and sitemap entries.\n");
write("ai-crawler-index.html", `${meta({ title: "Ratu Oracle AI Crawler Index", description: "Static crawlable index for Ratu Oracle tarot, Chant Sphere, spirit doll, magickal object, Indotalisman, and Gandhara Buddha Head pages.", canonical: "/ai-crawler-index.html", image: "/assets/logo/chant-sphere-logo.svg", keywords: [...spiritKeywords, ...gandharaKeywords] })}${jsonLd(schemas({ title: "Ratu Oracle AI Crawler Index", description: "Static crawlable index for Ratu Oracle tarot, Chant Sphere, spirit doll, magickal object, Indotalisman, and Gandhara Buddha Head pages.", canonical: "/ai-crawler-index.html", type: "WebPage" }))}${style}</head><body>${nav()}<main class="shell"><section class="hero"><div><h1>Ratu Oracle AI Crawler Index</h1><p class="lede">A static HTML index for Google, Bing, Yahoo, DuckDuckGo, Brave, Applebot, ChatGPT Search, OpenAI, Perplexity, Claude, and other crawlers.</p></div><div class="art"><img src="/assets/logo/chant-sphere-logo.svg" alt="Ratu Oracle crawler index logo"></div></section><section class="grid"><article class="panel"><h2>Important Pages</h2>${mainPages.map((u) => `<p><a href="${u}">${abs(u)}</a></p>`).join("")}</article><aside class="panel"><h2>Products</h2>${productPages.map((u) => `<p><a href="${u}">${abs(u)}</a></p>`).join("")}</aside></section></main>${footer()}</body></html>`);

const sitemapJsPath = path.join(root, "functions", "sitemap.js");
let sitemapJs = fs.readFileSync(sitemapJsPath, "utf8");
const newStatic = mainPages.map((loc, index) => `  { loc: "${loc}", priority: "${index === 0 ? "1.0" : "0.86"}", changefreq: "weekly" }`).join(",\n");
sitemapJs = sitemapJs.replace(/const staticUrls = \[[\s\S]*?\];/, `const staticUrls = [\n${newStatic}\n];`);
fs.writeFileSync(sitemapJsPath, sitemapJs, "utf8");

const indexPath = path.join(root, "index.html");
let index = fs.readFileSync(indexPath, "utf8");
const discovery = `<section class="seo-discovery shell" aria-label="Ratu Oracle spiritual discovery links">
    <h2>Explore Ratu Oracle</h2>
    <p>Use the free tarot reading, then explore Chant Spheres, spirit dolls, magickal objects, Indonesian talismans, guardian spirit dolls, medicine spirit dolls, Solomon-inspired seals, and the Gandhara Buddha Head spiritual art object.</p>
    <div class="quick-actions">
      <a href="/free-tarot-reading.html">Free Tarot Reading</a>
      <a href="/spirit-dolls">Spirit Dolls</a>
      <a href="/magickal-objects">Magickal Objects</a>
      <a href="/indonesian-talisman">Indonesian Talismans</a>
      <a href="/guardian-spirit-doll">Guardian Spirit Dolls</a>
      <a href="/medicine-spirit-doll">Medicine Spirit Dolls</a>
      <a href="/gandhara-buddha-head">Gandhara Buddha Head</a>
      <a href="/shop">Shop</a>
    </div>
  </section>`;
if (!index.includes("seo-discovery shell")) {
  index = index.replace("</main>", `${discovery}\n</main>`);
}
if (!index.includes("/gandhara-buddha-head")) {
  index = index.replace("</script>\n  <style>", `"https://ratu-oracle-kar4.vercel.app/gandhara-buddha-head",\n      "https://ratu-oracle-kar4.vercel.app/spirit-dolls"\n    ]\n  }\n  </script>\n  <style>`);
}
fs.writeFileSync(indexPath, index, "utf8");

const collectionPath = path.join(root, "spirit-dolls-magickal-objects.html");
let collection = fs.readFileSync(collectionPath, "utf8");
if (!collection.includes("/gandhara-buddha-head")) {
  collection = collection.replace("</main>", `<section class="panel"><h2>Related Spiritual Art</h2><p><a href="/gandhara-buddha-head">Gandhara Buddha Head</a> connects Greek-Buddhist inspired spiritual art, meditation decor, clarity symbolism, and safe museum-inspired reproduction wording.</p><p><a href="/spirit-dolls">Spirit Dolls</a> | <a href="/magickal-objects">Magickal Objects</a> | <a href="/indonesian-talisman">Indonesian Talismans</a></p></section></main>`);
  fs.writeFileSync(collectionPath, collection, "utf8");
}

console.log("Generated SEO landing pages, Gandhara pages, crawler files, and sitemaps.");
