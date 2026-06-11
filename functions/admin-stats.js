import { databaseError, getSql, handleOptions, json, requireMethod } from "./_shared.js";

function forbidden() {
  return json(403, { error: "Invalid admin secret." });
}

function requireAdmin(event) {
  const expected = process.env.ADMIN_SECRET;
  const received = event.headers["x-admin-secret"] || event.headers["X-Admin-Secret"];

  if (!expected) return json(500, { error: "ADMIN_SECRET is not set." });
  if (received !== expected) return forbidden();
  return null;
}

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["GET"]);
  if (methodError) return methodError;

  const adminError = requireAdmin(event);
  if (adminError) return adminError;

  try {
    const sql = getSql();

    const [spheres] = await sql`select count(*)::int as count from chant_spheres`;
    const [experiences] = await sql`select count(*)::int as count from sphere_experiences`;
    const [openListings] = await sql`select count(*)::int as count from marketplace_listings where status = 'open'`;
    const [users] = await sql`select count(*)::int as count from profiles`;

    return json(200, {
      stats: {
        spheres: spheres.count,
        experiences: experiences.count,
        open_listings: openListings.count,
        users: users.count
      }
    });
  } catch (error) {
    return databaseError(error);
  }
}
