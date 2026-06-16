import { neon } from "@neondatabase/serverless";
import crypto from "node:crypto";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, X-Admin-Secret",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Content-Type": "application/json"
};

export function json(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body)
  };
}

export function handleOptions(event) {
  if (event.httpMethod === "OPTIONS") {
    return json(204, {});
  }
  return null;
}

export function requireMethod(event, methods) {
  if (!methods.includes(event.httpMethod)) {
    return json(405, { error: `Method ${event.httpMethod} is not allowed.` });
  }
  return null;
}

export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Add it in Vercel Project Settings > Environment Variables.");
  }
  return neon(process.env.DATABASE_URL);
}

export function toCents(value) {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return null;
  return Math.round(number * 100);
}

export function slugify(value) {
  return String(value || "sphere")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "sphere";
}

export async function readJson(event) {
  if (!event.body) return {};
  try {
    return JSON.parse(event.body);
  } catch (error) {
    throw new Error("Request body must be valid JSON.");
  }
}

export async function ensureDemoUser(sql) {
  const rows = await sql`
    insert into app_users (email, auth_provider, display_name)
    values ('demo@ratuoracle.local', 'placeholder', 'Ratu Oracle Visitor')
    on conflict (email) do update
      set display_name = excluded.display_name,
          updated_at = now()
    returning id
  `;
  return rows[0].id;
}

export function databaseError(error) {
  const message = error && error.message ? error.message : "Database request failed.";
  return json(500, {
    error: message,
    hint: "Check DATABASE_URL and make sure the Ratu Oracle schema has been created in Neon."
  });
}

export function requireAdmin(event) {
  const configuredSecret = process.env.ADMIN_SECRET;
  if (!configuredSecret) {
    return json(500, { error: "ADMIN_SECRET is not set. Add it in Vercel Project Settings > Environment Variables." });
  }
  const providedSecret = event.headers["x-admin-secret"] || event.headers["X-Admin-Secret"];
  if (!providedSecret || providedSecret !== configuredSecret) {
    return json(401, { error: "Admin secret is missing or incorrect." });
  }
  return null;
}

export async function ensureSettingsTable(sql) {
  await sql`
    create table if not exists site_settings (
      key text primary key,
      value text,
      updated_at timestamptz not null default now()
    )
  `;
}

export function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Add it in Netlify site settings > Environment variables.`);
  }
  return value;
}

export function siteUrl(event) {
  return process.env.SITE_URL || `${event.headers["x-forwarded-proto"] || "https"}://${event.headers.host}`;
}

export function signSession(payload) {
  const secret = getRequiredEnv("AUTH_COOKIE_SECRET");
  const value = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(value).digest("base64url");
  return `${value}.${signature}`;
}

export function verifySession(cookieHeader = "") {
  const match = cookieHeader.match(/(?:^|;\s*)ratu_session=([^;]+)/);
  if (!match) return null;
  const [value, signature] = match[1].split(".");
  if (!value || !signature) return null;
  const secret = process.env.AUTH_COOKIE_SECRET;
  if (!secret) return null;
  const expected = crypto.createHmac("sha256", secret).update(value).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch (error) {
    return null;
  }
}

export function redirect(location, cookies = []) {
  return {
    statusCode: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store"
    },
    multiValueHeaders: cookies.length ? { "Set-Cookie": cookies } : undefined,
    body: ""
  };
}
