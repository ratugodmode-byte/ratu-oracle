import { databaseError, getSql, handleOptions, json, readJson, requireAdmin, requireMethod } from "./_shared.js";

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["POST"]);
  if (methodError) return methodError;

  const adminError = requireAdmin(event);
  if (adminError) return adminError;

  try {
    const body = await readJson(event);
    const id = String(body.id || "").trim();
    if (!id) return json(400, { error: "Sphere id is required." });

    const sql = getSql();
    const rows = await sql`
      delete from chant_spheres
      where id = ${id}
      returning id, title
    `;

    if (!rows.length) return json(404, { error: "Sphere not found." });
    return json(200, { deleted: rows[0] });
  } catch (error) {
    return databaseError(error);
  }
}
