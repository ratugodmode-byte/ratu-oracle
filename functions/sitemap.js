import { getSql, slugify } from "./_shared.js";

const staticUrls = [
  { loc: "/", priority: "1.0", changefreq: "daily" },
  { loc: "/free-tarot-reading.html", priority: "0.95", changefreq: "weekly" },
  { loc: "/free-online-tarot", priority: "0.9", changefreq: "weekly" },
  { loc: "/free-tarot-reading", priority: "0.9", changefreq: "weekly" },
  { loc: "/free-online-tarot-reading", priority: "0.9", changefreq: "weekly" },
  { loc: "/spirit-dolls-magickal-objects.html", priority: "0.94", changefreq: "weekly" },
  { loc: "/spirit-dolls", priority: "0.88", changefreq: "weekly" },
  { loc: "/spirit-doll", priority: "0.86", changefreq: "weekly" },
  { loc: "/magickal-objects", priority: "0.88", changefreq: "weekly" },
  { loc: "/amulets-talismans", priority: "0.86", changefreq: "weekly" },
  { loc: "/promotion.html", priority: "0.9", changefreq: "weekly" },
  { loc: "/ai-crawler-index.html", priority: "0.85", changefreq: "weekly" },
  { loc: "/llms.txt", priority: "0.65", changefreq: "weekly" },
  { loc: "/llms-full.txt", priority: "0.75", changefreq: "weekly" }
];

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function originFromEvent(event) {
  return process.env.SITE_URL || `https://${event.headers.host || "ratu-oracle-kar4.vercel.app"}`;
}

function urlEntry(origin, item) {
  const lastmod = item.lastmod || new Date().toISOString().slice(0, 10);
  return [
    "  <url>",
    `    <loc>${xmlEscape(new URL(item.loc, origin).href)}</loc>`,
    `    <lastmod>${xmlEscape(lastmod)}</lastmod>`,
    `    <changefreq>${xmlEscape(item.changefreq || "weekly")}</changefreq>`,
    `    <priority>${xmlEscape(item.priority || "0.7")}</priority>`,
    "  </url>"
  ].join("\n");
}

async function sphereUrls() {
  if (!process.env.DATABASE_URL) return [];
  const sql = getSql();
  const rows = await sql`
    select id, title, updated_at, created_at
    from chant_spheres
    order by created_at desc
    limit 500
  `;

  return rows.map((sphere) => ({
    loc: `/?sphere=${encodeURIComponent(slugify(sphere.title || sphere.id))}`,
    lastmod: new Date(sphere.updated_at || sphere.created_at || Date.now()).toISOString().slice(0, 10),
    changefreq: "weekly",
    priority: "0.72"
  }));
}

export async function handler(event) {
  const origin = originFromEvent(event);
  let dynamicUrls = [];

  try {
    dynamicUrls = await sphereUrls();
  } catch (error) {
    console.warn("Dynamic sitemap sphere URLs skipped:", error.message);
  }

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...staticUrls, ...dynamicUrls].map((item) => urlEntry(origin, item)),
    "</urlset>"
  ].join("\n");

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    },
    body
  };
}
