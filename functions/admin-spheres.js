import { databaseError, getSql, handleOptions, json, requireAdmin, requireMethod } from "./_shared.js";

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["GET"]);
  if (methodError) return methodError;

  const adminError = requireAdmin(event);
  if (adminError) return adminError;

  try {
    const sql = getSql();
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
        s.created_at,
        coalesce(e.count, 0)::int as experiences_count,
        coalesce(l.count, 0)::int as listings_count
      from chant_spheres s
      left join (
        select sphere_id, count(*)::int as count
        from sphere_experiences
        group by sphere_id
      ) e on e.sphere_id = s.id
      left join (
        select sphere_id, count(*)::int as count
        from marketplace_listings
        group by sphere_id
      ) l on l.sphere_id = s.id
      order by s.created_at desc
      limit 200
    `;
    return json(200, { spheres: rows });
  } catch (error) {
    return databaseError(error);
  }
}
