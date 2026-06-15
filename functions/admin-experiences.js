import {
  databaseError,
  ensureDemoUser,
  getSql,
  handleOptions,
  json,
  readJson,
  requireAdmin,
  requireMethod
} from "./_shared.js";

const allowedVisibility = new Set(["public", "followers", "private"]);

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["GET", "POST"]);
  if (methodError) return methodError;

  const adminError = requireAdmin(event);
  if (adminError) return adminError;

  try {
    const sql = getSql();

    if (event.httpMethod === "GET") {
      const rows = await sql`
        select
          e.id,
          e.sphere_id,
          e.story,
          e.visibility,
          e.photo_url,
          e.created_at,
          s.title as sphere_title,
          u.display_name as author_name
        from sphere_experiences e
        join chant_spheres s on s.id = e.sphere_id
        join app_users u on u.id = e.author_id
        order by e.created_at desc
        limit 200
      `;
      return json(200, { experiences: rows });
    }

    const body = await readJson(event);
    const sphereId = String(body.sphereId || "").trim();
    const story = String(body.story || "").trim();
    const visibility = allowedVisibility.has(body.visibility) ? body.visibility : "public";

    if (!sphereId) return json(400, { error: "Choose a sphere." });
    if (!story) return json(400, { error: "Experience story is required." });

    const authorId = await ensureDemoUser(sql);
    const rows = await sql`
      insert into sphere_experiences (sphere_id, author_id, story, visibility)
      values (${sphereId}, ${authorId}, ${story}, ${visibility})
      returning id, sphere_id, story, visibility, created_at
    `;

    return json(201, { experience: rows[0] });
  } catch (error) {
    return databaseError(error);
  }
}
