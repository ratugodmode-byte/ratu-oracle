import {
  databaseError,
  ensureDemoUser,
  ensureSphereSeoColumns,
  getSql,
  handleOptions,
  json,
  productSeoText,
  readJson,
  requireMethod,
  toCents
} from "./_shared.js";

const allowedTypes = new Set(["sell", "trade", "sell_or_trade"]);

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["GET", "POST"]);
  if (methodError) return methodError;

  try {
    const sql = getSql();
    await ensureSphereSeoColumns(sql);

    if (event.httpMethod === "GET") {
      const rows = await sql`
        select
          l.id,
          l.sphere_id,
          l.listing_type,
          l.price_cents,
          l.status,
          l.created_at,
          s.title,
          s.category,
          s.intention,
          s.currency,
          s.image_url,
          s.seo_keywords,
          u.display_name as seller_name
        from marketplace_listings l
        join chant_spheres s on s.id = l.sphere_id
        join app_users u on u.id = l.seller_id
        where l.status = 'open'
        order by l.created_at desc
        limit 60
      `;

      const listings = rows.map((listing) => ({
        ...listing,
        seo_keywords: listing.seo_keywords || productSeoText({
          title: listing.title,
          category: listing.category,
          intention: listing.intention
        })
      }));

      return json(200, { listings });
    }

    const body = await readJson(event);
    const sphereId = String(body.sphereId || body.sphere_id || "").trim();
    const listingType = String(body.listingType || body.listing_type || "").trim();
    const priceCents = toCents(body.price);

    if (!sphereId) return json(400, { error: "Sphere id is required to create a listing." });
    if (!allowedTypes.has(listingType)) return json(400, { error: "Listing type must be sell, trade, or sell_or_trade." });

    const sellerId = await ensureDemoUser(sql);
    const rows = await sql`
      insert into marketplace_listings (sphere_id, seller_id, listing_type, price_cents, status)
      values (${sphereId}, ${sellerId}, ${listingType}, ${priceCents}, 'open')
      returning id, sphere_id, listing_type, price_cents, status, created_at
    `;

    return json(201, { listing: rows[0] });
  } catch (error) {
    return databaseError(error);
  }
}
