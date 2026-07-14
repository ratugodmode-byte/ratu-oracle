import { ensureSettingsTable, getSql, slugify } from "./_shared.js";

const BASE_URL = "https://ratu-oracle-kar4.vercel.app";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeSlug(value) {
  return slugify(String(value || "").replace(/\.html$/i, ""));
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function splitKeywords(value) {
  return String(value || "")
    .split(/,|\n/)
    .map(item => item.trim())
    .filter(Boolean)
    .slice(0, 120);
}

function renderBody(body) {
  const blocks = String(body || "")
    .split(/\n{2,}/)
    .map(block => block.trim())
    .filter(Boolean);

  if (!blocks.length) {
    return "<p>Explore this Ratu Oracle guide for free tarot reading, Chant Spheres, spirit dolls, talismans, spiritual objects, and personalized energy support.</p>";
  }

  return blocks.map(block => {
    if (block.startsWith("### ")) return `<h2>${escapeHtml(block.slice(4))}</h2>`;
    if (block.startsWith("## ")) return `<h2>${escapeHtml(block.slice(3))}</h2>`;
    return `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`;
  }).join("\n");
}

async function getSettings(sql) {
  await ensureSettingsTable(sql);
  const rows = await sql`
    select key, value, updated_at
    from site_settings
    where key in ('content_pages', 'site_keywords', 'site_meta_description')
  `;
  const settings = {};
  for (const row of rows) {
    settings[row.key] = row.value || "";
    settings[`${row.key}_updated_at`] = row.updated_at;
  }
  return settings;
}

function parsePages(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function findPage(pages, slug) {
  return pages
    .map(page => ({ ...page, slug: normalizeSlug(page.slug || page.title) }))
    .find(page => page.slug === slug);
}

function renderNotFound(slug) {
  return {
    statusCode: 404,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <title>Page Not Found | Ratu Oracle</title>
  <style>
    body{margin:0;font-family:Arial,sans-serif;background:#fffaf4;color:#24133a;display:grid;min-height:100vh;place-items:center}
    main{max-width:620px;padding:28px}
    a{color:#4b1978;font-weight:700}
  </style>
</head>
<body>
  <main>
    <h1>Page not found</h1>
    <p>No saved public page exists for <strong>${escapeHtml(slug)}</strong> yet.</p>
    <p><a href="/">Return to Ratu Oracle</a></p>
  </main>
</body>
</html>`
  };
}

function renderPage(page, settings) {
  const slug = normalizeSlug(page.slug || page.title);
  const canonical = `${BASE_URL}/${slug}`;
  const title = String(page.meta_title || page.title || "Ratu Oracle Guide").trim();
  const description = String(
    page.meta_description ||
    page.description ||
    settings.site_meta_description ||
    "Ratu Oracle guide for free tarot reading, Chant Spheres, spirit dolls, talismans, and spiritual objects."
  ).trim();
  const keywords = splitKeywords(`${page.keywords || ""}, ${settings.site_keywords || ""}`);
  const bodyHtml = renderBody(page.body);
  const primaryUrl = String(page.primary_url || "").trim();
  const primaryLabel = String(page.primary_label || "Explore Ratu Oracle").trim();
  const updatedAt = page.updated_at || settings.content_pages_updated_at || new Date().toISOString();
  const image = `${BASE_URL}/assets/logos/chant-sphere-logo.svg`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: canonical,
      dateModified: updatedAt,
      isPartOf: { "@type": "WebSite", name: "Ratu Oracle", url: BASE_URL }
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      image,
      dateModified: updatedAt,
      author: { "@type": "Organization", name: "Ratu Oracle" },
      publisher: { "@type": "Organization", name: "Ratu Oracle", logo: { "@type": "ImageObject", url: image } },
      mainEntityOfPage: canonical
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: title, item: canonical }
      ]
    }
  ];

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=600"
    },
    body: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="${escapeHtml(keywords.join(", "))}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  <script type="application/ld+json">${safeJson(schema)}</script>
  <style>
    :root{--ink:#24133a;--muted:#735f78;--line:#eadbcb;--purple:#542078;--gold:#b77a32;--paper:#fffaf4}
    *{box-sizing:border-box}
    body{margin:0;background:linear-gradient(180deg,#fffaf4,#f6efe6);color:var(--ink);font-family:Georgia,"Times New Roman",serif;line-height:1.65}
    a{color:var(--purple);font-weight:700;text-decoration:none}
    .shell{width:min(1120px,calc(100% - 32px));margin:0 auto}
    header{border-bottom:1px solid var(--line);background:rgba(255,250,244,.94);position:sticky;top:0;z-index:3}
    nav{display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:70px;flex-wrap:wrap}
    .brand{display:flex;align-items:center;gap:10px;font-weight:800;letter-spacing:.04em;text-transform:uppercase}
    .brand img{width:36px;height:36px}
    .links{display:flex;gap:10px;flex-wrap:wrap;font-family:Arial,sans-serif;font-size:13px}
    .hero{padding:64px 0 28px}
    .hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:28px;align-items:center}
    h1{font-size:clamp(38px,6vw,72px);line-height:.95;margin:0 0 18px}
    h2{font-size:clamp(24px,3vw,34px);margin:34px 0 8px}
    .summary{font-size:18px;color:#4d4055;max-width:760px}
    .card{background:white;border:1px solid var(--line);border-radius:10px;padding:22px;box-shadow:0 18px 50px rgba(61,34,17,.08)}
    .cta{display:inline-flex;align-items:center;justify-content:center;border-radius:8px;background:var(--purple);color:white;padding:12px 16px;margin-top:14px;font-family:Arial,sans-serif;font-size:13px;text-transform:uppercase}
    article{padding:12px 0 56px}
    article p{font-size:17px;margin:0 0 18px}
    .keyword-list{display:flex;gap:8px;flex-wrap:wrap;margin:28px 0}
    .keyword-list span{font-family:Arial,sans-serif;font-size:12px;border:1px solid var(--line);border-radius:999px;padding:7px 10px;background:white;color:#5b4860}
    footer{border-top:1px solid var(--line);padding:28px 0 36px;color:var(--muted);font-family:Arial,sans-serif;font-size:13px}
    @media (max-width:720px){
      .hero{padding-top:34px}
      .hero-grid{grid-template-columns:1fr}
      nav{align-items:flex-start;padding:12px 0}
      .links{width:100%}
      .card{padding:16px}
    }
  </style>
</head>
<body>
  <header>
    <nav class="shell" aria-label="Main navigation">
      <a class="brand" href="/"><img src="/assets/logos/chant-sphere-logo.svg" alt="Ratu Oracle logo" width="36" height="36">Ratu Oracle</a>
      <div class="links">
        <a href="/">Home</a>
        <a href="/#marketplace">Marketplace</a>
        <a href="/free-tarot-reading.html">Free Tarot Reading</a>
        <a href="/spirit-dolls-magickal-objects.html">Spirit Dolls</a>
        <a href="/indotalisman.html">Indotalisman</a>
        <a href="mailto:agi.godmode@gmail.com">Contact</a>
      </div>
    </nav>
  </header>
  <main class="shell">
    <section class="hero">
      <div class="hero-grid">
        <div>
          <p style="color:var(--gold);font-family:Arial,sans-serif;text-transform:uppercase;font-size:12px;font-weight:800;letter-spacing:.14em">Ratu Oracle public guide</p>
          <h1>${escapeHtml(title)}</h1>
          <p class="summary">${escapeHtml(description)}</p>
          ${primaryUrl ? `<a class="cta" href="${escapeHtml(primaryUrl)}">${escapeHtml(primaryLabel)}</a>` : `<a class="cta" href="/free-tarot-reading.html">Start Free Tarot Reading</a>`}
        </div>
        <aside class="card">
          <strong>Explore related Ratu Oracle pages</strong>
          <p><a href="/free-tarot-reading.html">Free tarot reading</a></p>
          <p><a href="/#marketplace">Chant Sphere marketplace</a></p>
          <p><a href="/spirit-dolls-magickal-objects.html">Spirit dolls and magickal objects</a></p>
          <p><a href="/indotalisman.html">Indonesian talismans</a></p>
        </aside>
      </div>
    </section>
    <article>
      ${bodyHtml}
      ${keywords.length ? `<section class="keyword-list" aria-label="Related topics">${keywords.map(keyword => `<span>${escapeHtml(keyword)}</span>`).join("")}</section>` : ""}
    </article>
  </main>
  <footer>
    <div class="shell">
      <a href="/">Ratu Oracle</a> | <a href="/free-tarot-reading.html">Free Tarot Reading</a> | <a href="/#marketplace">Chant Spheres</a> | <a href="/indotalisman.html">Indotalisman</a> | <a href="mailto:agi.godmode@gmail.com">Contact</a>
    </div>
  </footer>
</body>
</html>`
  };
}

export async function handler(event) {
  if (event.httpMethod && event.httpMethod !== "GET") {
    return { statusCode: 405, headers: { "Content-Type": "text/plain; charset=utf-8" }, body: "Method not allowed" };
  }

  try {
    const slug = normalizeSlug(event.queryStringParameters?.slug || "free-tarot-reading");
    const sql = getSql();
    const settings = await getSettings(sql);
    const page = findPage(parsePages(settings.content_pages), slug);
    if (!page) return renderNotFound(slug);
    return renderPage(page, settings);
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Ratu Oracle Page Error</title></head><body><main style="font-family:Arial,sans-serif;padding:28px"><h1>Page temporarily unavailable</h1><p>${escapeHtml(error.message)}</p><p><a href="/">Return home</a></p></main></body></html>`
    };
  }
}
