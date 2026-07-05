import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const site = "https://ratu-oracle-kar4.vercel.app";
const today = "2026-07-05";

const sharedKeywords = [
  "Spirit Doll",
  "Spirit Companion",
  "Chant Sphere",
  "Fantasy Doll",
  "Mystical Doll",
  "Guardian Spirit",
  "Collectible Spirit Doll",
  "Elemental Spirit",
  "Spiritual Companion",
  "Fantasy Collectible",
  "Magical Companion",
  "Handcrafted Spirit Doll",
  "Art Doll",
  "Mystical Artifact",
  "OOAK spirit doll",
  "Spirit Passport",
  "Free Tarot Reading",
  "Chant Sphere Collection",
];

const dolls = [
  {
    slug: "earth-guardian",
    name: "Earth Guardian Spirit Doll",
    shortName: "Earth Guardian",
    element: "Earth",
    title: "Earth Guardian Spirit Doll | Ratu Oracle Companion",
    description:
      "Earth Guardian Spirit Doll for grounding, home blessing, patience, protection, and collectible spiritual decor by Ratu Oracle.",
    image: "/assets/spirit-dolls/earth-spirit-doll.png",
    imageFileNames: [
      "earth-spirit-doll.png",
      "chant-sphere-earth-spirit.png",
      "spirit-companion-earth.png",
    ],
    price: "120.00",
    focus: "grounding, home blessing, steadiness, patience, and quiet protection",
    tone: "rooted, calm, practical, and sheltering",
    lore:
      "The Earth Guardian is written as a patient companion for homes, study spaces, shelves, altars, and collections that need a feeling of steadiness. Its lore centers on soil, stone, roots, memory, and the quiet strength that gathers when a person stops rushing.",
    symbolism:
      "Earth symbolism speaks through weight, structure, belonging, and care. This doll is connected with patience, careful planning, household peace, and respectful stewardship of material life.",
    activation:
      "I stand in steady ground, choose with patience, and protect the good work already growing around me.",
    related: ["water-guardian", "air-spirit", "fire-guardian"],
  },
  {
    slug: "air-spirit",
    name: "Air Spirit Doll",
    shortName: "Air Spirit",
    element: "Air",
    title: "Air Spirit Doll Companion | Ratu Oracle Spirit Doll",
    description:
      "Air Spirit Doll for clarity, breath, communication, inspiration, movement, and collectible spiritual decor by Ratu Oracle.",
    image: "/assets/spirit-dolls/air-spirit-doll.png",
    imageFileNames: [
      "air-spirit-doll.png",
      "chant-sphere-air-spirit.png",
      "spirit-companion-air.png",
    ],
    price: "110.00",
    focus: "clarity, breath, communication, movement, inspiration, and clean thought",
    tone: "light, observant, quick, and articulate",
    lore:
      "The Air Spirit Doll is written as a companion of breath, message, language, and subtle movement. Its story belongs to open windows, morning wind, study desks, letters, and the small moment before a clear sentence arrives.",
    symbolism:
      "Air symbolism represents perception, direction, communication, study, inspiration, and the ability to move through confusion without becoming tangled in it.",
    activation:
      "I breathe clearly, speak with care, and let the right message arrive in the right time.",
    related: ["fire-guardian", "earth-guardian", "water-guardian"],
  },
  {
    slug: "fire-guardian",
    name: "Fire Guardian Spirit Doll",
    shortName: "Fire Guardian",
    element: "Fire",
    title: "Fire Guardian Spirit Doll | Mystical Companion",
    description:
      "Fire Guardian Spirit Doll for courage, confidence, action, boundaries, protection, and fantasy collectible spiritual decor.",
    image: "/assets/spirit-dolls/fire-spirit-doll.png",
    imageFileNames: [
      "fire-spirit-doll.png",
      "chant-sphere-fire-spirit.png",
      "spirit-companion-fire.png",
    ],
    price: "125.00",
    focus: "courage, confidence, action, boundaries, and strong protection",
    tone: "bright, brave, decisive, and protective",
    lore:
      "The Fire Guardian Spirit Doll is written as a companion of flame, courage, discipline, and decisive movement. Its lore is not about chaos, but about the clean fire that warms, clarifies, protects, and helps a person act when hesitation has lasted too long.",
    symbolism:
      "Fire symbolism carries courage, life force, visibility, focused will, confidence, creative spark, and the protective boundary that says what may enter and what must remain outside.",
    activation:
      "I act with courage, keep my boundary bright, and let my will serve the good I choose.",
    related: ["air-spirit", "earth-guardian", "water-guardian"],
  },
  {
    slug: "water-guardian",
    name: "Water Guardian Spirit Doll",
    shortName: "Water Guardian",
    element: "Water",
    title: "Water Guardian Spirit Doll | Healing Companion",
    description:
      "Water Guardian Spirit Doll for emotional healing, softness, love, renewal, peaceful release, and mystical collectible decor.",
    image: "/assets/spirit-dolls/water-spirit-doll.png",
    imageFileNames: [
      "water-spirit-doll.png",
      "chant-sphere-water-spirit.png",
      "spirit-companion-water.png",
    ],
    price: "118.00",
    focus: "emotional healing, softness, love, renewal, and peaceful release",
    tone: "gentle, reflective, soothing, and restorative",
    lore:
      "The Water Guardian Spirit Doll is written as a companion of emotional weather, renewal, tenderness, and release. Its lore belongs to moonlit bowls, quiet baths, tears that finally move, and the kind of peace that returns after the heart stops defending itself.",
    symbolism:
      "Water symbolism carries empathy, renewal, affection, inner listening, memory, forgiveness, and the movement that carries old heaviness away without force.",
    activation:
      "I release what no longer serves me, receive calm renewal, and let my heart become clear again.",
    related: ["earth-guardian", "air-spirit", "fire-guardian"],
  },
];

const emanation = {
  slug: "emanation-guardian-head-gandhara-style-statue",
  name: "Emanation Guardian Head - Gandhara Style Statue",
  title:
    "Emanation Guardian Head - Gandhara Style Statue for Meditation, Wisdom & Spiritual Decor | Ratu Oracle",
  description:
    "Discover the Emanation Guardian Head, a Gandhara-inspired Chant Sphere statue symbolizing wisdom, meditation, mental clarity, spiritual protection, and sacred home decor.",
  image: "/assets/products/emanation-guardian-head-gandhara-style-statue-ratu-oracle.jpg",
  alt:
    "Emanation Guardian Head Gandhara style statue for meditation, wisdom, spiritual protection and sacred home decor",
  caption:
    "A Gandhara-inspired Chant Sphere statue for meditation, wisdom, mental clarity, and spiritual home decor.",
  price: "180.00",
  keywords: [
    "Gandhara statue",
    "Gandhara Buddha head",
    "Gandhara style sculpture",
    "Bodhisattva head",
    "Maitreya statue",
    "Greco Buddhist art",
    "ancient Gandhara art",
    "Buddhist sculpture",
    "meditation statue",
    "spiritual decor",
    "mindfulness statue",
    "sacred art",
    "meditation room decor",
    "yoga altar",
    "home altar statue",
    "wisdom statue",
    "spiritual protection",
    "higher consciousness",
    "mental clarity",
    "energy healing decor",
    "museum inspired statue",
    "Buddhist home decor",
    "Chant Sphere Collection",
    "Ratu Oracle",
  ],
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function schema(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function sharedCss() {
  return `<style>:root{--ink:#21172d;--muted:#695e74;--plum:#4b236f;--gold:#b87a2c;--line:#eadfd2;--paper:#fffaf4}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:linear-gradient(180deg,#fffdf9,#f7eee5)}img{max-width:100%;height:auto}a{color:inherit}.shell{width:min(1160px,calc(100% - 32px));margin:0 auto}.topbar{position:sticky;top:0;z-index:10;background:rgba(255,250,244,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}.nav{min-height:72px;display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.brand img{width:40px;height:40px;border-radius:10px}.links{display:flex;gap:10px;flex-wrap:wrap}.links a,.btn{border:1px solid #b89b82;border-radius:6px;background:#fff;padding:10px 13px;text-decoration:none;font-weight:850;font-size:12px;text-transform:uppercase}.btn.primary{background:linear-gradient(135deg,#44226b,#6d3b98);border-color:#44226b;color:#fff}.breadcrumbs{font-size:13px;color:var(--muted);padding-top:18px}.hero{padding:50px 0 28px;display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,360px);gap:36px;align-items:center}h1,h2,h3{font-family:Georgia,"Times New Roman",serif;font-weight:500;letter-spacing:0}h1{font-size:clamp(38px,6vw,68px);line-height:1;margin:0;color:#2d1744}h2{font-size:clamp(26px,3vw,38px)}.lede{font-size:18px;line-height:1.75;color:#352d3d}.art{background:#fff;border:1px solid var(--line);border-radius:8px;padding:10px;box-shadow:0 18px 50px rgba(57,31,23,.13)}.art img{width:100%;display:block;border-radius:6px}.grid{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:22px;padding:22px 0 58px}.panel,.product{background:rgba(255,250,244,.95);border:1px solid var(--line);border-radius:8px;padding:24px;box-shadow:0 16px 42px rgba(48,29,17,.08)}p,li{line-height:1.82}.muted{color:var(--muted)}.specs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:16px 0}.spec{background:#fff;border:1px solid var(--line);border-radius:8px;padding:14px}.spec strong{display:block;color:#2d1744}.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.card{background:#fff;border:1px solid var(--line);border-radius:8px;overflow:hidden;text-decoration:none;box-shadow:0 12px 30px rgba(48,29,17,.08)}.card img{width:100%;aspect-ratio:3/4;object-fit:cover;object-position:center top;display:block}.card div{padding:12px}.faq dt{font-weight:800;margin-top:16px}.faq dd{margin:6px 0 0;color:var(--muted);line-height:1.7}.keywords{display:flex;flex-wrap:wrap;gap:8px}.keywords span{border:1px solid rgba(184,122,44,.28);background:#fff;border-radius:999px;padding:8px 10px;color:var(--muted);font-size:12px}footer{border-top:1px solid var(--line);padding:28px 0;color:var(--muted)}.foot{display:grid;grid-template-columns:1fr 2fr;gap:20px}.foot nav{columns:2}.foot a{display:block;line-height:1.9}@media(max-width:900px){.hero,.grid,.foot{grid-template-columns:1fr}.cards{grid-template-columns:repeat(2,minmax(0,1fr))}.art{max-width:380px}}@media(max-width:640px){.shell{width:min(100% - 22px,1160px)}.nav{align-items:flex-start}.links{width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}.links a{min-height:44px;text-align:center}.specs{grid-template-columns:1fr}.cards{grid-template-columns:1fr}}</style>`;
}

function header(title, description, url, image, keywords, type = "product") {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="keywords" content="${esc(keywords.join(", "))}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/svg+xml" href="/assets/logo/chant-sphere-logo.svg">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="Ratu Oracle">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${site}${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${site}${image}">
`;
}

function nav() {
  return `<header class="topbar"><nav class="shell nav" aria-label="Main navigation"><a class="brand" href="/"><img src="/assets/logo/chant-sphere-logo.svg" alt="Ratu Oracle Chant Sphere logo">Ratu Oracle</a><div class="links"><a href="/free-tarot-reading.html">Free Tarot</a><a href="/shop">Marketplace</a><a href="/spirit-dolls-magickal-objects.html">Spirit Dolls</a><a href="/chant-spheres">Chant Spheres</a><a href="/indotalisman.html">Indotalisman</a><a href="mailto:agi.godmode@gmail.com">Contact</a></div></nav></header>`;
}

function footer() {
  return `<footer><div class="shell foot"><div><strong>Ratu Oracle</strong><p>Free tarot reading, Chant Spheres, Spirit Doll Companion pages, QR Passport pages, symbolic owner stories, Indonesian talismans, magickal objects, and spiritual marketplace discovery.</p></div><nav aria-label="Footer discovery links"><a href="/free-tarot-reading.html">Free Tarot Reading</a><a href="/shop">Marketplace</a><a href="/spirit-dolls-magickal-objects.html">All Spirit Dolls</a><a href="/chant-spheres">Chant Sphere Collection</a><a href="/#passport">Spirit Passport</a><a href="/angel-chant-spheres">Angel Healing Cards</a><a href="/love-charm">Love Charm</a><a href="/wealth-charm">Wealth Charm</a><a href="/protection-charm">Protection Charm</a><a href="/indotalisman.html">Indotalisman</a><a href="/ai-crawler-index.html">AI Index</a><a href="mailto:agi.godmode@gmail.com">Contact</a></nav></div></footer>`;
}

function dollPage(doll) {
  const url = `${site}/spirit-dolls/${doll.slug}`;
  const keywords = [
    ...sharedKeywords,
    `${doll.element} Spirit Doll`,
    `${doll.element} Spirit Companion`,
    `${doll.element} Element`,
    `${doll.element} Element Spirit Guide`,
    `What is a ${doll.element} Spirit Doll`,
    `${doll.element} Guardian Doll`,
    "Spirit Doll Meaning",
    "Fantasy Guardian Doll",
    "Magical Companion Doll",
  ];
  const relatedCards = doll.related
    .map((slug) => dolls.find((item) => item.slug === slug))
    .map(
      (item) => `<a class="card" href="/spirit-dolls/${item.slug}"><img src="${item.image}" alt="${esc(item.name)} related Spirit Doll Companion"><div><strong>${item.name}</strong><p class="muted">${item.focus}.</p></div></a>`,
    )
    .join("");
  const imageObjects = doll.imageFileNames.map((file) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: file.replaceAll("-", " ").replace(/\.[^.]+$/, ""),
    contentUrl: `${site}/assets/spirit-dolls/${file}`,
    caption: `${doll.name} image for ${doll.element.toLowerCase()} spirit companion, Chant Sphere, and fantasy collectible discovery.`,
  }));
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Ratu Oracle",
      url: site,
      logo: `${site}/assets/logo/chant-sphere-logo.svg`,
      contactPoint: {
        "@type": "ContactPoint",
        email: "agi.godmode@gmail.com",
        contactType: "customer support",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: doll.name,
      url,
      description: doll.description,
      primaryImageOfPage: `${site}${doll.image}`,
      breadcrumb: `${url}#breadcrumb`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: doll.name,
      description: doll.description,
      image: `${site}${doll.image}`,
      brand: { "@type": "Brand", name: "Ratu Oracle" },
      category: "Spirit Doll Companion / Chant Sphere / Fantasy Collectible",
      sku: `spirit-doll-${doll.slug}`,
      keywords: keywords.join(", "),
      offers: {
        "@type": "Offer",
        price: doll.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Offer",
      price: doll.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
      itemOffered: { "@type": "Product", name: doll.name },
    },
    ...imageObjects,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site },
        { "@type": "ListItem", position: 2, name: "Marketplace", item: `${site}/shop` },
        {
          "@type": "ListItem",
          position: 3,
          name: "Spirit Dolls",
          item: `${site}/spirit-dolls-magickal-objects.html`,
        },
        { "@type": "ListItem", position: 4, name: doll.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is a ${doll.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${doll.name} is a symbolic Spirit Doll Companion from Ratu Oracle connected with ${doll.focus}.`,
          },
        },
        {
          "@type": "Question",
          name: "How do I choose the right Spirit Doll?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Start with the free Ratu Oracle reading, then choose the Spirit Doll whose element and symbolic focus match your current intention.",
          },
        },
        {
          "@type": "Question",
          name: "Is this page crawlable for search engines and AI assistants?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The page is static HTML with product schema, image schema, breadcrumbs, FAQ schema, canonical metadata, OpenGraph, Twitter cards, and sitemap entries.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Ratu Oracle",
      url: site,
      potentialAction: {
        "@type": "SearchAction",
        target: `${site}/shop?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return `${header(doll.title, doll.description, url, doll.image, keywords)}
  ${schema(jsonLd)}
  ${sharedCss()}
</head>
<body>
${nav()}
<main class="shell">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/shop">Marketplace</a> / <a href="/spirit-dolls-magickal-objects.html">All Spirit Dolls</a> / ${doll.name}</nav>
  <article>
    <header class="hero">
      <div>
        <h1>${doll.name}</h1>
        <p class="lede">${doll.description}</p>
        <p><strong>Element:</strong> ${doll.element}. <strong>Symbolic focus:</strong> ${doll.focus}.</p>
        <p><strong>Price:</strong> $${doll.price} USD</p>
        <div class="links"><a class="btn primary" href="/free-tarot-reading.html">Start Free Tarot Reading</a><a class="btn" href="/spirit-dolls-magickal-objects.html">All Spirit Dolls</a><a class="btn" href="/#passport">Spirit Passport</a></div>
      </div>
      <figure class="art">
        <img src="${doll.image}" alt="${doll.name}, ${doll.element} Spirit Companion, fantasy doll, guardian spirit, collectible spirit doll, and Chant Sphere product image">
        <figcaption class="muted">${doll.name} from the Ratu Oracle Spirit Doll Companion collection.</figcaption>
      </figure>
    </header>

    <section class="grid">
      <div class="panel">
        <h2>Spirit Lore and Inspiration</h2>
        <p>${doll.lore}</p>
        <p>This page describes the ${doll.name} as a Spirit Doll, Spirit Companion, Chant Sphere related collectible, fantasy doll, mystical doll, guardian spirit symbol, and handcrafted art doll. The language is written for human visitors, Google, Bing, AI retrieval systems, and social preview tools so the product can be understood without opening a JavaScript popup. The doll may be used as spiritual decor, a mindfulness object, a symbolic altar companion, a gift for collectors, or a story object for people who enjoy fantasy guardians, elemental spirits, and magical companion dolls.</p>
        <p>Ratu Oracle presents these pieces as artistic and symbolic spiritual collectibles. Any energetic meaning is offered as folklore, meditation language, and personal reflection rather than a guaranteed outcome. The ${doll.element} element gives this companion its emotional direction: ${doll.tone}. People who arrive through a free tarot reading can compare the reading themes with this page and decide whether the ${doll.name} feels aligned with their current moment.</p>

        <h2>Element Description</h2>
        <p>The ${doll.element} element describes the atmosphere of this Spirit Doll Companion. In the Ratu Oracle system, elemental language helps visitors understand how a doll might fit a space, a mood, a collection, or a personal ritual. ${doll.symbolism} This makes the page useful for searches such as what is a Spirit Doll, ${doll.element} Spirit Doll Companion, collectible fantasy doll, ${doll.element} element spirit guide, mystical companion, fantasy guardian doll, Spirit Doll meaning, magical companion doll, and handcrafted fantasy figure.</p>

        <h2>Symbolism and Intended Purpose</h2>
        <p>The intended purpose of the ${doll.name} is symbolic, artistic, and contemplative. It can mark an intention, decorate a sacred corner, support journaling, remind a person to pause before action, or become part of a private collection of spiritual objects. The companion lore is fictional and devotional in tone, designed for people who love guardian figures, spirit guides, altar dolls, spiritual gifts, positive energy objects, fantasy decor, fairytale characters, OOAK dolls, and mystical artifacts.</p>

        <h2>Activation Section</h2>
        <p>${doll.activation}</p>
        <p>You can read this sentence before meditation, after a free tarot reading, while placing the doll on a shelf, or when adding the item to a Spirit Passport story. Keep the practice simple: breathe, name the intention, act respectfully, and let the object remind you of the quality you want to strengthen.</p>

        <h2>Product Specifications</h2>
        <div class="specs">
          <div class="spec"><strong>Product type</strong>Spirit Doll Companion</div>
          <div class="spec"><strong>Collection</strong>Ratu Oracle Chant Sphere Collection</div>
          <div class="spec"><strong>Element</strong>${doll.element}</div>
          <div class="spec"><strong>Use</strong>Collectible, spiritual decor, symbolic companion</div>
          <div class="spec"><strong>Passport</strong>QR Passport and owner story compatible</div>
          <div class="spec"><strong>Availability</strong>In stock</div>
        </div>

        <h2>Collector Information</h2>
        <p>Collectors often search for one-of-a-kind doll, OOAK doll, artist doll, fantasy creature, mythical creature, nature spirit, elemental guardian, spiritual decor, new age gift, meditation companion, mindfulness gift, manifestation tool, abundance charm, luck charm, spiritual protection, angelic spirit, ethereal guardian, peaceful spirit, tranquility charm, calming energy, collector item, and unique handmade gift. This product page connects those discovery terms naturally while keeping the visible copy readable and respectful.</p>

        <h2>Related Spirit Dolls</h2>
        <div class="cards">${relatedCards}</div>
      </div>
      <aside>
        <section class="panel">
          <h2>Important Links</h2>
          <p><a href="/shop">Marketplace</a></p>
          <p><a href="/spirit-dolls-magickal-objects.html">All Spirit Dolls</a></p>
          <p><a href="/#passport">Spirit Passport</a></p>
          <p><a href="/free-tarot-reading.html">Free Tarot Reading</a></p>
          <p><a href="/chant-spheres">Chant Sphere Collection</a></p>
          <p><a href="/indotalisman.html">Indotalisman</a></p>
        </section>
        <section class="panel">
          <h2>FAQ</h2>
          <dl class="faq">
            <dt>What is a ${doll.name}?</dt>
            <dd>${doll.name} is a symbolic Spirit Doll Companion connected with ${doll.focus}.</dd>
            <dt>Is this a real spiritual product?</dt>
            <dd>It is presented as an art doll, spiritual collectible, fantasy companion, and symbolic ritual focus. Meanings are offered as folklore and personal reflection.</dd>
            <dt>Can I connect it to a Chant Sphere?</dt>
            <dd>Yes. The page links to the Chant Sphere Collection, free tarot reading, Spirit Passport, and related elemental products.</dd>
            <dt>Is this page readable by crawlers?</dt>
            <dd>Yes. It uses static HTML, semantic sections, product schema, image schema, FAQ schema, breadcrumbs, OpenGraph, Twitter cards, canonical tags, and sitemap entries.</dd>
          </dl>
        </section>
        <section class="panel">
          <h2>SEO Keywords</h2>
          <div class="keywords">${keywords.map((keyword) => `<span>${esc(keyword)}</span>`).join("")}</div>
        </section>
      </aside>
    </section>
  </article>
</main>
${footer()}
</body>
</html>`;
}

function emanationPage() {
  const url = `${site}/${emanation.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: emanation.name,
      description:
        "A Gandhara-inspired Chant Sphere statue for meditation, wisdom, mental clarity, spiritual protection, higher awareness, and sacred home decor.",
      brand: { "@type": "Brand", name: "Ratu Oracle" },
      category: "Spiritual Decor / Meditation Statue / Gandhara Inspired Sculpture",
      image: `${site}${emanation.image}`,
      url,
      keywords: emanation.keywords.join(", "),
      offers: {
        "@type": "Offer",
        price: emanation.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: emanation.name,
      url,
      description: emanation.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      name: "Emanation Guardian Head - Gandhara Style Statue",
      contentUrl: `${site}${emanation.image}`,
      caption: emanation.caption,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site },
        { "@type": "ListItem", position: 2, name: "Chant Sphere Collection", item: `${site}/chant-spheres` },
        { "@type": "ListItem", position: 3, name: emanation.name, item: url },
      ],
    },
  ];

  return `${header(emanation.title, emanation.description, url, emanation.image, emanation.keywords)}
  ${schema(jsonLd)}
  ${sharedCss()}
</head>
<body>
${nav()}
<main class="shell">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/chant-spheres">Chant Sphere Collection</a> / ${emanation.name}</nav>
  <article>
    <header class="hero">
      <div>
        <h1>${emanation.name}</h1>
        <p class="lede">${emanation.description}</p>
        <div class="links"><a class="btn primary" href="/free-tarot-reading.html">Use Free Tarot Reading</a><a class="btn" href="/chant-spheres">Chant Sphere Collection</a></div>
      </div>
      <figure class="art"><img src="${emanation.image}" alt="${emanation.alt}" title="${emanation.name}"><figcaption class="muted">${emanation.caption}</figcaption></figure>
    </header>
    <section class="grid">
      <div class="panel">
        <h2>Intention</h2>
        <p>Inspired by ancient Gandhara art, the Emanation Guardian Head is a symbolic focus for meditation, contemplation, and sacred space decoration. Within the Ratu Oracle Chant Sphere Collection, it represents wisdom, mental clarity, spiritual protection, higher awareness, and balanced energy. Its calm Greco-Buddhist expression makes it suitable for a meditation room, yoga altar, home altar, office, or spiritual decor display.</p>
        <h2>Meaning</h2>
        <p>This page is written for people searching for Gandhara statue, Gandhara Buddha head, Gandhara style sculpture, Bodhisattva head, Maitreya statue, Greco Buddhist art, ancient Gandhara art, Buddhist sculpture, meditation statue, spiritual decor, mindfulness statue, sacred art, meditation room decor, yoga altar, home altar statue, wisdom statue, spiritual protection, higher consciousness, mental clarity, energy healing decor, museum inspired statue, Buddhist home decor, Chant Sphere Collection, and Ratu Oracle.</p>
        <h2>Best Uses</h2>
        <p>Use this object as a contemplative art piece, a symbolic reminder for clear thought, or a decorative spiritual focus. Ratu Oracle presents this item as a museum-inspired spiritual art object and symbolic decor, not as an excavated artifact unless formal provenance is provided.</p>
        <h2>SEO Keywords</h2>
        <div class="keywords">${emanation.keywords.map((keyword) => `<span>${esc(keyword)}</span>`).join("")}</div>
      </div>
      <aside class="panel">
        <h2>Related Links</h2>
        <p><a href="/gandhara-buddha-head">Gandhara Buddha Head</a></p>
        <p><a href="/buddha-head-sculpture">Buddha Head Sculpture</a></p>
        <p><a href="/buddhist-meditation-decor">Buddhist Meditation Decor</a></p>
        <p><a href="/chant-spheres">Chant Sphere Collection</a></p>
        <p><a href="/free-tarot-reading.html">Free Tarot Reading</a></p>
      </aside>
    </section>
  </article>
</main>
${footer()}
</body>
</html>`;
}

function ensureUrlEntry(xml, url, priority = "0.8") {
  const entry = `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\s*<url>\\s*<loc>${escaped}</loc>[\\s\\S]*?</url>`, "m");
  if (re.test(xml)) return xml.replace(re, `\n${entry.trimEnd()}`);
  return xml.replace("</urlset>", `${entry}</urlset>`);
}

function ensureImageEntry(xml, loc, image, title, caption) {
  const entry = `  <url>
    <loc>${loc}</loc>
    <image:image>
      <image:loc>${site}${image}</image:loc>
      <image:title>${esc(title)}</image:title>
      <image:caption>${esc(caption)}</image:caption>
    </image:image>
  </url>
`;
  const escaped = loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\s*<url>\\s*<loc>${escaped}</loc>[\\s\\S]*?</url>`, "m");
  if (re.test(xml)) return xml.replace(re, `\n${entry.trimEnd()}`);
  return xml.replace("</urlset>", `${entry}</urlset>`);
}

function ensureRobotsAgent(content, agent) {
  if (content.includes(`User-agent: ${agent}`)) return content;
  return content.replace(
    "Sitemap: https://ratu-oracle-kar4.vercel.app/sitemap.xml",
    `User-agent: ${agent}\nAllow: /\n\nSitemap: https://ratu-oracle-kar4.vercel.app/sitemap.xml`,
  );
}

mkdirSync("spirit-dolls", { recursive: true });
mkdirSync("assets/spirit-dolls", { recursive: true });

for (const doll of dolls) {
  writeFileSync(join("spirit-dolls", `${doll.slug}.html`), dollPage(doll));
}

writeFileSync(`${emanation.slug}.html`, emanationPage());

let robots = readFileSync("robots.txt", "utf8");
for (const agent of [
  "Claude-SearchBot",
  "Meta-ExternalAgent",
  "Meta External Agent",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "Common Crawl",
]) {
  robots = ensureRobotsAgent(robots, agent);
}
writeFileSync("robots.txt", robots);

let sitemap = readFileSync("sitemap.xml", "utf8");
let productSitemap = readFileSync("sitemap-products.xml", "utf8");
let imageSitemap = readFileSync("sitemap-images.xml", "utf8");
for (const doll of dolls) {
  const loc = `${site}/spirit-dolls/${doll.slug}`;
  sitemap = ensureUrlEntry(sitemap, loc, "0.9");
  productSitemap = ensureUrlEntry(productSitemap, loc, "0.9");
  imageSitemap = ensureImageEntry(
    imageSitemap,
    loc,
    doll.image,
    doll.name,
    `${doll.name}, ${doll.element} Spirit Companion, fantasy doll, guardian spirit, collectible spirit doll, and Chant Sphere product image.`,
  );
}
const emanationUrl = `${site}/${emanation.slug}`;
sitemap = ensureUrlEntry(sitemap, emanationUrl, "0.8");
productSitemap = ensureUrlEntry(productSitemap, emanationUrl, "0.8");
imageSitemap = ensureImageEntry(imageSitemap, emanationUrl, emanation.image, emanation.name, emanation.caption);

writeFileSync("sitemap.xml", sitemap);
writeFileSync("sitemap-products.xml", productSitemap);
writeFileSync("sitemap-images.xml", imageSitemap);

let vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
if (!vercel.rewrites.some((rewrite) => rewrite.source === `/${emanation.slug}`)) {
  const insertAt = vercel.rewrites.findIndex((rewrite) => rewrite.source === "/spirit-dolls/:slug");
  vercel.rewrites.splice(insertAt >= 0 ? insertAt : vercel.rewrites.length, 0, {
    source: `/${emanation.slug}`,
    destination: `/${emanation.slug}.html`,
  });
  writeFileSync("vercel.json", `${JSON.stringify(vercel, null, 2)}\n`);
}

console.log(`Generated ${dolls.length} Spirit Doll SEO pages and ${emanation.slug}.html`);
