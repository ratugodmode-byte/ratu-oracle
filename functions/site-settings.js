import {
  databaseError,
  ensureSettingsTable,
  getSql,
  handleOptions,
  json,
  readJson,
  requireAdmin
} from "./_shared.js";

const allowedKeys = new Set([
  "hero_background_url",
  "hero_card_visible",
  "promo_title",
  "promo_description",
  "promo_primary_url",
  "promo_primary_label",
  "promo_youtube_url",
  "promo_tiktok_url",
  "promo_kofi_url",
  "promo_netlify_url",
  "promo_keywords",
  "promo_meta_title",
  "promo_meta_description",
  "promo_article_title",
  "promo_article_body"
]);

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  try {
    const sql = getSql();
    await ensureSettingsTable(sql);

    if (event.httpMethod === "GET") {
      const rows = await sql`select key, value from site_settings`;
      const settings = Object.fromEntries(rows.map(row => [row.key, row.value]));
      return json(200, { settings });
    }

    if (event.httpMethod !== "POST") {
      return json(405, { error: `Method ${event.httpMethod} is not allowed.` });
    }

    const adminError = requireAdmin(event);
    if (adminError) return adminError;

    const body = await readJson(event);
    const entries = Object.entries(body.settings || {}).filter(([key]) => allowedKeys.has(key));
    for (const [key, value] of entries) {
      await sql`
        insert into site_settings (key, value, updated_at)
        values (${key}, ${String(value || "").trim()}, now())
        on conflict (key) do update
          set value = excluded.value,
              updated_at = now()
      `;
    }

    return json(200, { ok: true });
  } catch (error) {
    return databaseError(error);
  }
}
