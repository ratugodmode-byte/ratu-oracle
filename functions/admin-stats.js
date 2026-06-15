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
        (select count(*)::int from app_users) as users,
        (select count(*)::int from chant_spheres) as spheres,
        (select count(*)::int from sphere_experiences) as experiences,
        (select count(*)::int from marketplace_listings where status = 'open') as open_listings
    `;
    return json(200, { stats: rows[0] });
  } catch (error) {
    return databaseError(error);
  }
}
