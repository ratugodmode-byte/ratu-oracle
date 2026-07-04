import { getSql, slugify } from "./_shared.js";

const staticUrls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/free-tarot-reading.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/shop", priority: "0.86", changefreq: "weekly" },
  { loc: "/products", priority: "0.86", changefreq: "weekly" },
  { loc: "/chant-spheres", priority: "0.86", changefreq: "weekly" },
  { loc: "/angel-chant-spheres", priority: "0.86", changefreq: "weekly" },
  { loc: "/solomon-seal-cards", priority: "0.86", changefreq: "weekly" },
  { loc: "/love-charm", priority: "0.86", changefreq: "weekly" },
  { loc: "/wealth-charm", priority: "0.86", changefreq: "weekly" },
  { loc: "/protection-charm", priority: "0.86", changefreq: "weekly" },
  { loc: "/spiritual-healing-cards", priority: "0.86", changefreq: "weekly" },
  { loc: "/spirit-dolls-magickal-objects.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/indotalisman.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/spirit-dolls", priority: "0.86", changefreq: "weekly" },
  { loc: "/spirit-doll", priority: "0.86", changefreq: "weekly" },
  { loc: "/handmade-spirit-dolls", priority: "0.86", changefreq: "weekly" },
  { loc: "/guardian-spirit-doll", priority: "0.86", changefreq: "weekly" },
  { loc: "/medicine-spirit-doll", priority: "0.86", changefreq: "weekly" },
  { loc: "/unique-spirit-dolls", priority: "0.86", changefreq: "weekly" },
  { loc: "/asian-spirit-doll", priority: "0.86", changefreq: "weekly" },
  { loc: "/hoodoo-spirit-doll", priority: "0.86", changefreq: "weekly" },
  { loc: "/spirit-doll-art", priority: "0.86", changefreq: "weekly" },
  { loc: "/magickal-objects", priority: "0.86", changefreq: "weekly" },
  { loc: "/indonesian-talisman", priority: "0.86", changefreq: "weekly" },
  { loc: "/gandhara-buddha-head", priority: "0.86", changefreq: "weekly" },
  { loc: "/gandhara-buddha-head-for-sale", priority: "0.86", changefreq: "weekly" },
  { loc: "/gandhara-buddha-head-replica", priority: "0.86", changefreq: "weekly" },
  { loc: "/greek-buddhist-art", priority: "0.86", changefreq: "weekly" },
  { loc: "/buddha-head-sculpture", priority: "0.86", changefreq: "weekly" },
  { loc: "/museum-reproduction-buddha-head", priority: "0.86", changefreq: "weekly" },
  { loc: "/spiritual-art-objects", priority: "0.86", changefreq: "weekly" },
  { loc: "/buddhist-meditation-decor", priority: "0.86", changefreq: "weekly" },
  { loc: "/free-online-tarot-reading.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/online-oracle-reading.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/spiritual-card-reading.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/energy-reading-online.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/spiritual-protection-charm.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/money-energy-charm.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/abundance-charm.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/healing-charm-cards.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/tarot-charm-cards.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/oracle-charm-cards.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/personalized-spiritual-charm.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/custom-talisman-card.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/energy-alignment-cards.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/manifestation-cards.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/spiritual-wealth-card.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/protection-against-evil-eye.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/remove-unseen-blocks.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/spiritual-cleansing-card.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/angel-wish-card.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/tree-of-life-energy-reading.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/emanation-oracle-cards.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/spiritual-marketplace.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/buy-spiritual-charms-online.html", priority: "0.86", changefreq: "weekly" },
  { loc: "/ai-crawler-index.html", priority: "0.86", changefreq: "weekly" }
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
