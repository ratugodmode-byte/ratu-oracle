import {
  databaseError,
  ensureDemoUser,
  getSql,
  handleOptions,
  json,
  readJson,
  requireMethod
} from "./_shared.js";

const allowedVisibility = new Set(["public", "followers", "private"]);

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["GET", "POST"]);
  if (methodError) return methodError;

  try {
    const sql = getSql();

    if (event.httpMethod === "GET") {
      const sphereId = event.queryStringParameters?.sphere_id;
      const rows = sphereId
        ? await sql`
            select e.id, e.sphere_id, e.story, e.photo_url, e.visibility, e.created_at, u.display_name as author_name
            from sphere_experiences e
            join app_users u on u.id = e.author_id
            where e.sphere_id = ${sphereId}
            order by e.created_at desc
            limit 30
          `
        : await sql`
            select e.id, e.sphere_id, e.story, e.photo_url, e.visibility, e.created_at, u.display_name as author_name, s.title as sphere_title
            from sphere_experiences e
            join app_users u on u.id = e.author_id
            join chant_spheres s on s.id = e.sphere_id
            order by e.created_at desc
            limit 30
          `;

      return json(200, { experiences: rows });
    }

    const body = await readJson(event);
    const sphereId = String(body.sphereId || body.sphere_id || "").trim();
    const story = String(body.story || "").trim();
    const visibility = allowedVisibility.has(body.visibility) ? body.visibility : "public";

    if (!sphereId) return json(400, { error: "Choose a sphere before posting an experience." });
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
