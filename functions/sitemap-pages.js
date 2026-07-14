import { ensureSettingsTable, getSql, slugify } from "./_shared.js";

const BASE_URL = "https://ratu-oracle-kar4.vercel.app";

function xmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeSlug(value) {
  return slugify(String(value || "").replace(/\.html$/i, ""));
}

function parsePages(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function loadPages(sql) {
  await ensureSettingsTable(sql);
  const rows = await sql`select value, updated_at from site_settings where key = 'content_pages'`;
  if (!rows.length) return [];
  return parsePages(rows[0].value).map(page => ({
    ...page,
    slug: normalizeSlug(page.slug || page.title),
    updated_at: page.updated_at || rows[0].updated_at
  }));
}

function renderSitemap(pages) {
  const now = new Date().toISOString();
  const unique = new Map();

  for (const page of pages) {
    const slug = normalizeSlug(page.slug || page.title);
    if (!slug) continue;
    unique.set(slug, page.updated_at || now);
  }

  if (!unique.has("free-tarot-reading")) unique.set("free-tarot-reading", now);

  const urls = [...unique.entries()].map(([slug, updatedAt]) => `  <url>
    <loc>${xmlEscape(`${BASE_URL}/${slug}`)}</loc>
    <lastmod>${xmlEscape(new Date(updatedAt || now).toISOString())}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.78</priority>
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function handler() {
  try {
    const sql = getSql();
    const pages = await loadPages(sql);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=600"
      },
      body: renderSitemap(pages)
    };
  } catch {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8" },
      body: renderSitemap([])
    };
  }
}
