import { databaseError, ensureSphereSeoColumns, getSql, handleOptions, json, productSeoText, requireMethod } from "./_shared.js";

const MAX_PUBLIC_IMAGE_URL_LENGTH = 900;

function compactText(value, maxLength) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function publicImageUrl(value) {
  const url = String(value || "").trim();
  if (!url) return "";
  if (url.startsWith("data:")) return "";
  if (url.length > MAX_PUBLIC_IMAGE_URL_LENGTH) return "";
  return url;
}

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["GET"]);
  if (methodError) return methodError;

  try {
    const sql = getSql();
    await ensureSphereSeoColumns(sql);
    const rows = await sql`
      select
        s.id,
        s.title,
        s.category,
        s.intention,
        s.status,
        s.price_cents,
        s.currency,
        s.image_url,
        s.seo_keywords,
        s.created_at,
        coalesce(experience_counts.count, 0)::int as experiences_count,
        coalesce(listing_counts.count, 0)::int as owners_count,
        latest_listing.id as listing_id,
        latest_listing.listing_type,
        latest_listing.status as listing_status,
        coalesce(latest_listing.price_cents, s.price_cents) as listing_price_cents
      from chant_spheres s
      left join (
        select sphere_id, count(*)::int as count
        from sphere_experiences
        group by sphere_id
      ) experience_counts on experience_counts.sphere_id = s.id
      left join (
        select sphere_id, count(*)::int as count
        from marketplace_listings
        group by sphere_id
      ) listing_counts on listing_counts.sphere_id = s.id
      left join lateral (
        select id, listing_type, status, price_cents
        from marketplace_listings
        where sphere_id = s.id and status = 'open'
        order by created_at desc
        limit 1
      ) latest_listing on true
      order by s.created_at desc
    `;

    const spheres = rows.map((sphere) => {
      const seoKeywords = sphere.seo_keywords || productSeoText({
        title: sphere.title,
        category: sphere.category,
        intention: sphere.intention
      });

      return {
        ...sphere,
        title: compactText(sphere.title, 140),
        category: compactText(sphere.category, 80),
        intention: compactText(sphere.intention, 700),
        image_url: publicImageUrl(sphere.image_url),
        seo_keywords: compactText(seoKeywords, 900)
      };
    });

    return json(200, { spheres }, {
      "Cache-Control": "public, max-age=30, s-maxage=300, stale-while-revalidate=86400"
    });
  } catch (error) {
    return databaseError(error);
  }
}
