import { randomUUID } from "node:crypto";
import {
  databaseError,
  getSql,
  handleOptions,
  json,
  productSeoText,
  readJson,
  requireAdmin,
  requireMethod,
  toCents
} from "./_shared.js";

async function ensureIndotalismanTable(sql) {
  await sql`
    create table if not exists indotalisman_products (
      id uuid primary key,
      title text not null,
      category text not null default 'Talisman',
      description text,
      intention text,
      price_cents integer default 0,
      currency text not null default 'USD',
      image_url text,
      status text not null default 'active',
      seo_keywords text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;
}

function normalizeProduct(row) {
  return {
    ...row,
    price_cents: row.price_cents ?? 0,
    currency: row.currency || "USD"
  };
}

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  const methodError = requireMethod(event, ["GET", "POST", "DELETE"]);
  if (methodError) return methodError;

  try {
    const sql = getSql();
    await ensureIndotalismanTable(sql);

    if (event.httpMethod === "GET") {
      const rows = await sql`
        select id, title, category, description, intention, price_cents, currency, image_url, status, seo_keywords, created_at, updated_at
        from indotalisman_products
        where status <> 'deleted'
        order by created_at desc
      `;
      return json(200, { products: rows.map(normalizeProduct) });
    }

    const adminError = requireAdmin(event);
    if (adminError) return adminError;

    if (event.httpMethod === "DELETE") {
      const body = await readJson(event);
      const id = body.id || event.queryStringParameters?.id;
      if (!id) return json(400, { error: "Product id is required." });

      const rows = await sql`
        update indotalisman_products
        set status = 'deleted',
            updated_at = now()
        where id = ${id}
        returning id
      `;

      if (!rows.length) return json(404, { error: "Indotalisman product was not found." });
      return json(200, { ok: true, deleted: rows[0].id });
    }

    const body = await readJson(event);
    const title = String(body.title || "").trim();
    if (!title) return json(400, { error: "Product name is required." });

    const category = String(body.category || "Talisman").trim() || "Talisman";
    const description = String(body.description || "").trim();
    const intention = String(body.intention || "").trim();
    const imageUrl = String(body.image_url || "").trim();
    const currency = String(body.currency || "USD").trim().toUpperCase() || "USD";
    const priceCents = body.price_cents === undefined || body.price_cents === ""
      ? toCents(body.price) || 0
      : Number(body.price_cents) || 0;
    const seoKeywords = productSeoText({
      title,
      category,
      intention: `${description} ${intention}`,
      submitted: body.seo_keywords || ""
    });
    const id = randomUUID();

    const rows = await sql`
      insert into indotalisman_products (
        id, title, category, description, intention, price_cents, currency, image_url, status, seo_keywords
      )
      values (
        ${id}, ${title}, ${category}, ${description}, ${intention}, ${priceCents}, ${currency}, ${imageUrl}, 'active', ${seoKeywords}
      )
      returning id, title, category, description, intention, price_cents, currency, image_url, status, seo_keywords, created_at, updated_at
    `;

    return json(201, { ok: true, product: normalizeProduct(rows[0]) });
  } catch (error) {
    return databaseError(error);
  }
}
