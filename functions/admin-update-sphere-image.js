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
    const imageUrl = String(body.image_url || "").trim();

    if (!id) return json(400, { error: "Sphere id is required." });
    if (imageUrl && !/^(https?:\/\/|assets\/|data:image\/(png|jpe?g|webp|gif);base64,)/i.test(imageUrl)) {
      return json(400, { error: "Image must be a direct https:// image URL, a site path starting with assets/, or an uploaded image from the admin dashboard." });
    }

    const sql = getSql();
    const rows = await sql`
      update chant_spheres
      set image_url = ${imageUrl || null},
          updated_at = now()
      where id = ${id}
      returning id, title, image_url
    `;

    if (!rows.length) return json(404, { error: "Sphere not found." });
    return json(200, { sphere: rows[0] });
  } catch (error) {
    return databaseError(error);
  }
}
