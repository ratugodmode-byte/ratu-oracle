import { getSql, handleOptions, json, requireAdmin, requireMethod, siteUrl, slugify } from "./_shared.js";

const staticPaths = [
  "/",
  "/free-tarot-reading.html",
  "/free-tarot-reading",
  "/free-online-tarot",
  "/free-online-tarot-reading",
  "/id/free-tarot-reading",
  "/zh/free-tarot-reading",
  "/ru/free-tarot-reading",
  "/spirit-dolls-magickal-objects.html",
  "/spirit-dolls",
  "/spirit-doll",
  "/magickal-objects",
  "/amulets-talismans",
  "/indotalisman.html",
  "/indotalisman",
  "/id/spirit-dolls",
  "/zh/spirit-dolls",
  "/ru/spirit-dolls",
  "/promotion.html",
  "/ai-crawler-index.html",
  "/llms.txt",
  "/llms-full.txt",
  "/sitemap.xml",
  "/sitemap-dynamic.xml"
];

async function productPaths() {
  if (!process.env.DATABASE_URL) return [];
  const sql = getSql();
  const rows = await sql`
    select id, title
    from chant_spheres
    order by created_at desc
    limit 300
  `;

  return rows.flatMap((sphere) => {
    const slug = slugify(sphere.title || sphere.id);
    return [
      `/?sphere=${encodeURIComponent(slug)}`,
      `/spirit-dolls/${encodeURIComponent(slug)}`
    ];
  });
}

function absoluteUrls(origin, paths) {
  return [...new Set(paths.map((path) => new URL(path, origin).href))];
}

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["GET", "POST"]);
  if (methodError) return methodError;

  const adminError = requireAdmin(event);
  if (adminError) return adminError;

  const origin = siteUrl(event).replace(/\/+$/, "");
  const key = process.env.INDEXNOW_KEY || "8c8e3d4b7f16477bb435877e5d5d7c20";
  let dynamicPaths = [];

  try {
    dynamicPaths = await productPaths();
  } catch (error) {
    console.warn("IndexNow dynamic product URLs skipped:", error.message);
  }

  const urlList = absoluteUrls(origin, [...staticPaths, ...dynamicPaths]);
  const payload = {
    host: new URL(origin).host,
    key,
    keyLocation: `${origin}/indexnow-key.txt`,
    urlList
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload)
    });

    const responseText = await response.text().catch(() => "");
    return json(response.ok ? 200 : 502, {
      ok: response.ok,
      submitted: urlList.length,
      status: response.status,
      message: response.ok
        ? "Submitted to IndexNow. Bing and participating crawlers can now discover these URLs faster."
        : responseText || response.statusText || "IndexNow rejected the submission.",
      urlList
    });
  } catch (error) {
    return json(502, {
      ok: false,
      submitted: 0,
      error: error.message || "Could not reach IndexNow."
    });
  }
}
