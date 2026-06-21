import {
  databaseError,
  ensureDemoUser,
  ensureSphereSeoColumns,
  getSql,
  handleOptions,
  json,
  looksLikeSpiritDoll,
  mergedSpiritDollKeywords,
  readJson,
  requireMethod,
  slugify,
  toCents
} from "./_shared.js";

const allowedCategories = new Set(["Love", "Wealth", "Protection", "Healing", "Clarity"]);
const listingTypeMap = {
  "Keep private": null,
  Sell: "sell",
  Trade: "trade",
  "Sell or trade": "sell_or_trade",
  sell: "sell",
  trade: "trade",
  sell_or_trade: "sell_or_trade"
};

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["POST"]);
  if (methodError) return methodError;

  try {
    const body = await readJson(event);
    const title = String(body.title || "").trim();
    const category = String(body.category || "").trim();
    const intention = String(body.intention || "").trim();
    const imageUrl = String(body.image_url || "").trim();
    const submittedSeoKeywords = String(body.seo_keywords || "").trim();
    const listingType = listingTypeMap[body.listingType] ?? null;
    const priceCents = toCents(body.price);

    if (!title) return json(400, { error: "Sphere name is required." });
    if (!allowedCategories.has(category)) return json(400, { error: "Choose a valid sphere category." });
    if (!intention) return json(400, { error: "Intention is required." });
    if (imageUrl && !/^(https?:\/\/|assets\/|data:image\/(png|jpe?g|webp|gif);base64,)/i.test(imageUrl)) {
      return json(400, { error: "Image must be a direct https:// image URL, a site path starting with assets/, or an uploaded image from the admin dashboard." });
    }

    const sql = getSql();
    await ensureSphereSeoColumns(sql);
    const ownerId = await ensureDemoUser(sql);
    const status = body.private === true || !listingType ? "private" : "active";
    const shouldTagAsSpiritDoll = looksLikeSpiritDoll(`${title} ${category} ${intention} ${submittedSeoKeywords}`);
    const seoKeywords = shouldTagAsSpiritDoll
      ? mergedSpiritDollKeywords(submittedSeoKeywords)
      : submittedSeoKeywords || null;

    const spheres = await sql`
      insert into chant_spheres (owner_id, creator_id, title, category, intention, status, price_cents, image_url, seo_keywords)
      values (${ownerId}, ${ownerId}, ${title}, ${category}, ${intention}, ${status}, ${priceCents}, ${imageUrl || null}, ${seoKeywords})
      returning id, title, category, intention, status, price_cents, currency, image_url, seo_keywords, created_at
    `;
    const sphere = spheres[0];

    const slug = `${slugify(title)}-${String(sphere.id).slice(0, 8)}`;
    await sql`
      insert into sphere_passports (sphere_id, public_slug, qr_target_url, activated_at)
      values (${sphere.id}, ${slug}, ${`/passport/${slug}`}, now())
      on conflict (sphere_id) do nothing
    `;

    let listing = null;
    if (listingType) {
      const listings = await sql`
        insert into marketplace_listings (sphere_id, seller_id, listing_type, price_cents, status)
        values (${sphere.id}, ${ownerId}, ${listingType}, ${priceCents}, 'open')
        returning id, listing_type, price_cents, status, created_at
      `;
      listing = listings[0];
    }

    return json(201, { sphere, listing });
  } catch (error) {
    return databaseError(error);
  }
}
