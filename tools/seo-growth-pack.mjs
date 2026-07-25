import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = "https://ratu-oracle-kar4.vercel.app";
const today = "2026-07-25";

const sharedLinks = [
  ["/free-tarot-reading.html", "free tarot reading"],
  ["/#marketplace", "Chant Sphere marketplace"],
  ["/spirit-dolls.html", "spirit dolls"],
  ["/spirit-dolls-magickal-objects.html", "magickal objects"],
  ["/indotalisman.html", "Indotalisman"],
  ["/chant-spheres.html", "Chant Spheres"],
  ["/shop.html", "shop"],
  ["mailto:agi.godmode@gmail.com", "contact Ratu Oracle"],
];

const pages = [
  {
    file: "free-tarot-reading-love.html",
    title: "Free Love Tarot Reading Online | Ratu Oracle",
    description:
      "Try a free love tarot reading online with Ratu Oracle for relationship clarity, emotional guidance, attraction energy, protection and next-step insight.",
    h1: "Free Love Tarot Reading Online",
    keyword: "free love tarot reading",
    sections: [
      ["Love Questions Need Clear Energy", "A love question is rarely only about romance. It can be about trust, timing, self-worth, attraction, protection, forgiveness, or the courage to stop repeating an old pattern. Ratu Oracle treats a free love tarot reading as a reflective energy check, helping visitors slow down and name what they are feeling before they choose their next step."],
      ["How Ratu Oracle Connects Love Readings to Chant Spheres", "After the reading, the visitor can explore Chant Spheres for love, harmony, clarity, and protection. A Chant Sphere is presented as a symbolic card and story object that holds intention, owner journey, QR passport, and marketplace history. This makes the reading page part of a larger spiritual marketplace instead of a single thin tarot page."],
      ["Relationship Clarity Without Pressure", "The page is written for people searching for free online tarot reading, love tarot reading, daily tarot reading, yes no tarot reading, and spiritual card reading. It invites them to use the free tarot reading first, then compare related love, healing, and protection products if they want deeper symbolic support."],
    ],
  },
  {
    file: "free-tarot-reading-money.html",
    title: "Free Money Tarot Reading Online | Ratu Oracle",
    description:
      "Use Ratu Oracle for a free money tarot reading online for prosperity, confidence, choices, abundance blocks, career timing and wealth energy.",
    h1: "Free Money Tarot Reading Online",
    keyword: "free money tarot reading",
    sections: [
      ["Money Readings for Decisions and Confidence", "A money reading should help a person think more clearly about effort, choices, fear, opportunity, and confidence. Ratu Oracle frames a free money tarot reading as a symbolic guide for attention and intention, not as financial advice or a promise of guaranteed wealth."],
      ["Wealth Chant Spheres and Abundance Symbols", "Visitors can move from the free tarot reading into wealth Chant Spheres, abundance charm cards, prosperity talismans, and spiritual marketplace listings. These pages give crawlers useful connections between free online tarot reading, money energy charm, abundance charm, and personalized spiritual objects."],
      ["Practical Spiritual Language", "The content uses human-readable language around prosperity, discipline, focus, attraction, and protection. It avoids stuffing the same phrase repeatedly, while still helping search engines understand that Ratu Oracle is relevant to free tarot reading, online oracle reading, wealth charm, and money energy searches."],
    ],
  },
  {
    file: "daily-free-tarot-reading.html",
    title: "Daily Free Tarot Reading | Ratu Oracle",
    description:
      "Start the day with a daily free tarot reading from Ratu Oracle for clarity, protection, love, money, spiritual balance and practical focus.",
    h1: "Daily Free Tarot Reading",
    keyword: "daily free tarot reading",
    sections: [
      ["A Daily Reading for the Present Moment", "Many visitors do not need a complicated spread. They need a simple daily reading that helps them notice the energy of the moment. Ratu Oracle gives people a place to pause, ask what matters today, and then follow the result toward related Chant Spheres or spiritual objects."],
      ["Daily Tarot and Energy Alignment", "The daily free tarot reading page connects everyday questions with love, money, clarity, healing, and protection themes. It also points visitors to free tarot reading online, three card tarot reading, yes no tarot reading, and the Chant Sphere marketplace."],
      ["Why Daily Readings Bring Repeat Visitors", "Daily pages are important because people return when the tool feels useful. This page gives crawlers clear text, internal links, FAQ data, and a visible call to action so the free tarot experience can become a repeat entry point for Ratu Oracle."],
    ],
  },
  {
    file: "yes-no-tarot-reading-online.html",
    title: "Yes No Tarot Reading Online | Ratu Oracle",
    description:
      "Ask a yes or no tarot question online with Ratu Oracle for quick symbolic guidance, decision clarity, timing, protection and next steps.",
    h1: "Yes No Tarot Reading Online",
    keyword: "yes no tarot reading online",
    sections: [
      ["Simple Questions, Better Choices", "A yes no tarot reading is useful when a person feels stuck between two choices. Ratu Oracle presents the result as a reflective signal: pause, notice the pattern, then decide with more clarity."],
      ["From Yes or No to Chant Sphere Guidance", "After a quick yes or no reading, visitors can explore Chant Spheres tied to love, wealth, healing, protection, confidence, or clarity. This makes the yes no tarot page a gateway into specific marketplace products and stories."],
      ["Search Intent Covered Clearly", "This page is built for people looking for yes no tarot reading, free yes no tarot, online tarot reading, and free online tarot reading with Ratu Oracle. The content stays readable for people while giving search crawlers the exact context they need."],
    ],
  },
  {
    file: "online-tarot-reading-guide.html",
    title: "Online Tarot Reading Guide | Ratu Oracle",
    description:
      "Learn how to use online tarot reading with Ratu Oracle, including free tarot, daily readings, yes no questions, Chant Spheres and spiritual objects.",
    h1: "Online Tarot Reading Guide",
    keyword: "online tarot reading guide",
    sections: [
      ["How Online Tarot Reading Works", "Online tarot reading works best when the visitor asks a focused question and uses the answer as a mirror for awareness. Ratu Oracle connects card-style guidance with Chant Spheres, spiritual products, and owner stories so the experience has more depth than a random result."],
      ["Free Reading First, Marketplace Second", "The recommended path is simple: start with the free tarot reading, notice the theme, then explore matching Chant Spheres or spiritual objects. Love, wealth, healing, clarity, and protection categories help visitors move naturally from insight to action."],
      ["A Better Crawlable Guide", "This guide gives search engines a stable page for online tarot reading, virtual tarot reading, AI tarot reading style guidance, spiritual card reading, and free tarot reading. It also links to product and category pages so crawlers can map the whole site."],
    ],
  },
  {
    file: "chant-spheres-love-protection-wealth.html",
    title: "Chant Spheres for Love Protection Wealth | Ratu Oracle",
    description:
      "Explore Chant Spheres for love, protection, wealth, healing, clarity and spiritual alignment with QR passports, stories and marketplace listings.",
    h1: "Chant Spheres for Love, Protection and Wealth",
    keyword: "Chant Spheres",
    sections: [
      ["What Chant Spheres Are", "Chant Spheres are Ratu Oracle objects that combine a visual card, intention, owner story, QR passport, and marketplace listing. They are designed for people who want a symbolic spiritual item connected to a journey rather than a generic image."],
      ["Love, Protection, Wealth and Clarity", "Each Chant Sphere can be linked with an intention such as love, harmony, protection, prosperity, confidence, healing, clarity, or spiritual alignment. Visitors can use the free tarot reading to discover which category fits the moment."],
      ["Why Search Engines Need This Page", "This page explains the core product in plain language and links to the marketplace, free tarot reading, spiritual charm pages, and related product collections. It helps crawlers understand Ratu Oracle as both a reading site and a spiritual marketplace."],
    ],
  },
  {
    file: "spirit-dolls-for-sale.html",
    title: "Spirit Dolls for Sale | Ratu Oracle",
    description:
      "Browse spirit dolls for sale, OOAK spirit companions, guardian dolls, elemental dolls, fantasy collectibles and spiritual art objects by Ratu Oracle.",
    h1: "Spirit Dolls for Sale",
    keyword: "spirit dolls for sale",
    sections: [
      ["Spirit Doll Companions and Collector Objects", "Ratu Oracle spirit dolls are presented as art dolls, guardian companions, elemental figures, and symbolic collectibles. They are designed for collectors who love fantasy dolls, mystical objects, OOAK spirit dolls, handmade doll art, and spiritual decor."],
      ["Elemental Spirit Doll Keywords", "Spirit dolls may connect with air spirit, wind guardian, fire spirit, earth guardian, water guide, fairy doll, faerie spirit, altar doll, spirit companion, energy doll, healing spirit, protection spirit, good luck charm, and sacred companion themes."],
      ["For Buyers and Crawlers", "This page gives a clear route for people searching for spirit doll, guardian spirit doll, art doll, fantasy collectible, mystical doll, magical companion, OOAK custom toy, doll repaint, and collectible spiritual gift. It links back to the marketplace and free tarot reading so visitors can choose by energy and story."],
    ],
  },
  {
    file: "indonesian-talismans-mustika-guide.html",
    title: "Indonesian Talismans and Mustika Guide | Ratu Oracle",
    description:
      "Learn about Indonesian talismans, mustika stones, bezoar pearls, sacred relics, spiritual heritage, amulets and Indotalisman products.",
    h1: "Indonesian Talismans and Mustika Guide",
    keyword: "Indonesian talismans",
    sections: [
      ["Traditional Objects and Cultural Heritage", "Indotalisman is the Ratu Oracle section for Indonesian talismans, mustika stones, bezoar pearls, mystical oils, sacred relics, ritual objects, and traditional spiritual collectibles. The page explains these objects as cultural and symbolic items connected to Indonesian heritage."],
      ["Mustika, Khodam Alami and Sacred Objects", "Collectors often search for mustika, khodam alami, benda sakral, benda magis, pusaka, yoni, tuah, pengisian, pendamping, semer mesem, jenglot, batara karang, bulu perindu, and Raja Sulaiman inspired talisman language. This guide gives crawlers a respectful context for those terms."],
      ["How to Choose a Piece", "Visitors can contact Ratu Oracle and share what they seek: protection, prosperity, confidence, love, clarity, healing, or a rare cultural object. The guide helps them move from research into the Indotalisman shop without mixing Indotalisman products into Chant Sphere marketplace cards."],
    ],
  },
  {
    file: "spiritual-products-buyers-guide.html",
    title: "Spiritual Products Buyers Guide | Ratu Oracle",
    description:
      "A buyer guide for Chant Spheres, spirit dolls, Indonesian talismans, amulets, Solomon-inspired seals, oracle cards and spiritual collectibles.",
    h1: "Spiritual Products Buyers Guide",
    keyword: "spiritual products buyers guide",
    sections: [
      ["A Clear Buyer Path", "Ratu Oracle now has several product paths: free tarot reading, Chant Spheres, spirit dolls, Indotalisman, Solomon-inspired seals, spiritual art objects, and magickal collectibles. A buyer guide helps visitors understand what to explore first."],
      ["Choose by Intention", "Love, wealth, protection, clarity, healing, confidence, abundance, spiritual cleansing, and good fortune are common intentions. Visitors should read the product story, image, category, price, and disclaimer before contacting Ratu Oracle or choosing a product."],
      ["Internal Links Help People and Crawlers", "This guide links the main public pages together so Google, Bing, DuckDuckGo, Brave, Applebot, OpenAI, Perplexity, Claude, and other crawlers can understand the site structure more easily."],
    ],
  },
  {
    file: "ratu-oracle-spiritual-marketplace-guide.html",
    title: "Ratu Oracle Spiritual Marketplace Guide",
    description:
      "Discover Ratu Oracle as a spiritual marketplace for free tarot reading, Chant Spheres, spirit dolls, Indotalisman, amulets and sacred art.",
    h1: "Ratu Oracle Spiritual Marketplace Guide",
    keyword: "Ratu Oracle spiritual marketplace",
    sections: [
      ["More Than One Product Type", "Ratu Oracle is built around a free reading experience and a marketplace of symbolic products. Visitors can start with free tarot reading, then explore Chant Spheres, spirit dolls, Indotalisman items, spiritual art objects, and related guides."],
      ["Why the Free Reading Matters", "The free tarot reading helps people identify the energy of the moment before browsing. A person might discover they need clarity, love, prosperity, protection, healing, or grounding, then follow that theme into the marketplace."],
      ["A Site Built for Discovery", "Search engines need clear public pages, internal links, sitemaps, image alt text, and structured data. This guide is one of the pages that helps crawlers understand Ratu Oracle as a full spiritual marketplace instead of a single homepage."],
    ],
  },
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function linkList() {
  return sharedLinks.map(([href, text]) => `<a href="${href}">${esc(text)}</a>`).join(" · ");
}

function pageHtml(page) {
  const url = `${site}/${page.file}`;
  const faq = [
    ["Is this a free Ratu Oracle page?", "Yes. You can start from the free tarot reading and then explore related Ratu Oracle products if you want."],
    ["Are spiritual products guaranteed to change my life?", "No. Ratu Oracle presents spiritual products as symbolic, traditional, collectible, and reflective objects. They do not replace medical, legal, or financial advice."],
    ["How do I choose the right product?", "Begin with your intention, read the product story, compare related pages, and contact Ratu Oracle if you need help choosing."],
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${site}/#website` },
        about: page.keyword,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
          { "@type": "ListItem", position: 2, name: page.h1, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(([name, answer]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
  const sections = page.sections.map(([heading, text]) => `
      <section>
        <h2>${esc(heading)}</h2>
        <p>${esc(text)}</p>
      </section>`).join("\n");
  const longCopy = `
      <section>
        <h2>Start Here</h2>
        <p>Use the <a href="/free-tarot-reading.html">free tarot reading</a> as the first doorway. Then follow the result into <a href="/#marketplace">Chant Spheres</a>, <a href="/spirit-dolls.html">spirit dolls</a>, <a href="/indotalisman.html">Indotalisman</a>, and related spiritual marketplace guides. This page is written as a real public resource so people and search crawlers can understand the topic without needing to open a popup or log in.</p>
        <p>Ratu Oracle focuses on reflective guidance, symbolic cards, spiritual collectibles, art objects, and traditional inspiration. Every buyer should read the story, purpose, image description, price, and care notes before deciding. For personal help, email <a href="mailto:agi.godmode@gmail.com">agi.godmode@gmail.com</a>.</p>
      </section>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${site}/assets/logo/chant-sphere-logo.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${site}/assets/logo/chant-sphere-logo.svg">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    :root { --ink:#2b143d; --muted:#725f77; --gold:#b88746; --line:#eadbc9; --soft:#fff8ef; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color:var(--ink); background:linear-gradient(180deg,#fffaf3,#f7ecde); line-height:1.65; }
    header, main, footer { width:min(1120px, calc(100% - 32px)); margin:auto; }
    nav { display:flex; flex-wrap:wrap; gap:10px; align-items:center; padding:18px 0; }
    nav a, .button { min-height:42px; display:inline-flex; align-items:center; justify-content:center; padding:10px 14px; border:1px solid var(--line); border-radius:8px; color:var(--ink); background:#fff; text-decoration:none; font-weight:800; font-size:14px; }
    .brand { margin-right:auto; font-family: Georgia, serif; font-size:24px; font-weight:700; }
    .hero { padding:54px 0 28px; display:grid; grid-template-columns: minmax(0,1fr) 320px; gap:28px; align-items:center; }
    h1 { font-family: Georgia, serif; font-size: clamp(38px, 7vw, 76px); line-height:1; margin:0 0 18px; letter-spacing:0; }
    h2 { font-family: Georgia, serif; font-size: clamp(24px, 4vw, 34px); margin:0 0 10px; }
    p { margin:0 0 18px; }
    .panel { background:rgba(255,255,255,.86); border:1px solid var(--line); border-radius:12px; padding:22px; box-shadow:0 18px 46px rgba(70,43,25,.08); }
    .hero-card { min-height:280px; background:radial-gradient(circle at 48% 42%, rgba(184,135,70,.36), transparent 28%), linear-gradient(135deg,#351339,#875642); color:white; display:grid; place-items:center; text-align:center; }
    .hero-card strong { font-family:Georgia,serif; font-size:28px; max-width:240px; }
    .grid { display:grid; grid-template-columns:2fr 1fr; gap:24px; margin:20px 0 34px; }
    .links { display:flex; flex-wrap:wrap; gap:10px; margin-top:14px; }
    .links a { color:var(--ink); font-weight:800; }
    footer { padding:28px 0 48px; color:var(--muted); }
    @media (max-width: 760px) {
      header, main, footer { width:min(100% - 22px, 1120px); }
      nav { gap:8px; }
      .brand { width:100%; }
      nav a { flex:1 1 auto; font-size:13px; padding:9px 10px; }
      .hero, .grid { grid-template-columns:1fr; }
      .hero { padding-top:28px; }
      .hero-card { min-height:190px; }
    }
  </style>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <a class="brand" href="/">Ratu Oracle</a>
      <a href="/free-tarot-reading.html">Free Tarot Reading</a>
      <a href="/#marketplace">Marketplace</a>
      <a href="/spirit-dolls.html">Spirit Dolls</a>
      <a href="/indotalisman.html">Indotalisman</a>
      <a href="mailto:agi.godmode@gmail.com">Contact</a>
    </nav>
    <section class="hero">
      <div>
        <p><a href="/">Home</a> / ${esc(page.h1)}</p>
        <h1>${esc(page.h1)}</h1>
        <p>${esc(page.description)}</p>
        <p class="links">${linkList()}</p>
      </div>
      <aside class="panel hero-card" aria-label="Ratu Oracle guidance"><strong>${esc(page.keyword)}</strong></aside>
    </section>
  </header>
  <main>
    <article class="grid">
      <div class="panel">
${sections}
${longCopy}
      </div>
      <aside class="panel">
        <h2>Related Ratu Oracle Pages</h2>
        <p>${linkList()}</p>
        <h2>Contact</h2>
        <p>For product questions, image updates, spiritual-object listings, or custom guidance, email <a href="mailto:agi.godmode@gmail.com">agi.godmode@gmail.com</a>.</p>
      </aside>
    </article>
    <section class="panel">
      <h2>Frequently Asked Questions</h2>
      ${faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join("\n")}
    </section>
  </main>
  <footer>
    <p><strong>Ratu Oracle</strong> connects free tarot reading, Chant Spheres, spirit dolls, Indotalisman, spiritual objects, and symbolic marketplace stories.</p>
    <p>${linkList()}</p>
  </footer>
</body>
</html>
`;
}

for (const page of pages) {
  fs.writeFileSync(path.join(root, page.file), pageHtml(page), "utf8");
}

const growthLinks = `<!-- SEO_GROWTH_LINKS_START -->
<section class="seo-growth-links" aria-label="Popular Ratu Oracle guides" style="max-width:1280px;margin:28px auto;padding:24px 28px;border:1px solid #eadbc9;background:#fffaf4;border-radius:10px;">
  <h2 style="font-family:Georgia,serif;margin:0 0 12px;color:#2b143d;">Popular Ratu Oracle Guides</h2>
  <p style="margin:0 0 14px;color:#4d4053;">Start with the free tarot reading, then explore Chant Spheres, spirit dolls, Indonesian talismans, and buyer guides.</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;">
    ${pages.map((page) => `<a href="/${page.file}" style="padding:10px 12px;border:1px solid #d8c1ac;border-radius:8px;text-decoration:none;color:#2b143d;background:white;font-weight:700;">${esc(page.h1)}</a>`).join("\n    ")}
  </div>
</section>
<!-- SEO_GROWTH_LINKS_END -->`;

const indexPath = path.join(root, "index.html");
let index = fs.readFileSync(indexPath, "utf8");
if (index.includes("<!-- SEO_GROWTH_LINKS_START -->")) {
  index = index.replace(/<!-- SEO_GROWTH_LINKS_START -->[\s\S]*?<!-- SEO_GROWTH_LINKS_END -->/, growthLinks);
} else {
  index = index.replace(/<\/body>/i, `${growthLinks}\n</body>`);
}
fs.writeFileSync(indexPath, index, "utf8");

function updateSitemap() {
  const sitemapPath = path.join(root, "sitemap.xml");
  let xml = fs.existsSync(sitemapPath)
    ? fs.readFileSync(sitemapPath, "utf8")
    : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>`;
  const entries = pages.map((page) => `  <url>
    <loc>${site}/${page.file}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.84</priority>
  </url>`).join("\n");
  for (const page of pages) {
    xml = xml.replace(new RegExp(`\\s*<url>\\s*<loc>${site.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/${page.file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>[\\s\\S]*?</url>`, "g"), "");
  }
  xml = xml.includes("</urlset>") ? xml.replace("</urlset>", `${entries}\n</urlset>`) : `${xml}\n${entries}\n`;
  fs.writeFileSync(sitemapPath, xml, "utf8");
}
updateSitemap();

const robotsPath = path.join(root, "robots.txt");
const robots = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Bravebot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: Common Crawl
Allow: /

User-agent: Pinterestbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: ia_archiver
Allow: /

Sitemap: ${site}/sitemap.xml
Sitemap: ${site}/sitemap-products.xml
Sitemap: ${site}/sitemap-images.xml
`;
fs.writeFileSync(robotsPath, robots, "utf8");

const textBlock = `SEO_GROWTH_PACK_START
Ratu Oracle crawlable traffic pages added ${today}:
${pages.map((page) => `- ${site}/${page.file} :: ${page.title} :: ${page.description}`).join("\n")}
Core internal destinations: ${sharedLinks.map(([href, text]) => `${text} (${href.startsWith("http") || href.startsWith("mailto") ? href : site + href})`).join("; ")}
SEO_GROWTH_PACK_END`;

for (const file of ["llms.txt", "llms-full.txt", "ai.txt"]) {
  const filePath = path.join(root, file);
  let content = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  if (content.includes("SEO_GROWTH_PACK_START")) {
    content = content.replace(/SEO_GROWTH_PACK_START[\s\S]*?SEO_GROWTH_PACK_END/, textBlock);
  } else {
    content = `${content.trim()}\n\n${textBlock}\n`;
  }
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
}

const aiIndexPath = path.join(root, "ai-crawler-index.html");
let aiIndex = fs.existsSync(aiIndexPath) ? fs.readFileSync(aiIndexPath, "utf8") : "<!doctype html><html><body><h1>Ratu Oracle AI Crawler Index</h1></body></html>";
const aiHtml = `<!-- SEO_GROWTH_PACK_START -->
<section>
  <h2>Ratu Oracle Search and Buyer Entry Pages</h2>
  <ul>
    ${pages.map((page) => `<li><a href="/${page.file}">${esc(page.h1)}</a> - ${esc(page.description)}</li>`).join("\n    ")}
  </ul>
</section>
<!-- SEO_GROWTH_PACK_END -->`;
if (aiIndex.includes("<!-- SEO_GROWTH_PACK_START -->")) {
  aiIndex = aiIndex.replace(/<!-- SEO_GROWTH_PACK_START -->[\s\S]*?<!-- SEO_GROWTH_PACK_END -->/, aiHtml);
} else {
  aiIndex = aiIndex.replace(/<\/body>/i, `${aiHtml}\n</body>`);
}
fs.writeFileSync(aiIndexPath, aiIndex, "utf8");

console.log(`Created ${pages.length} SEO growth pages and updated index, robots, sitemap, llms, ai files.`);
