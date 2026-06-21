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

export const spiritDollKeywords = [
  "spirit doll",
  "air spirit",
  "wind spirit",
  "elemental spirit",
  "air elemental",
  "wind guardian",
  "sky guardian",
  "cloud spirit",
  "storm spirit",
  "breeze spirit",
  "fairy doll",
  "fantasy doll",
  "magical doll",
  "enchanted doll",
  "guardian doll",
  "spirit guardian",
  "air fae",
  "faerie spirit",
  "nature spirit",
  "nature guardian",
  "whimsical doll",
  "art doll",
  "collectible doll",
  "handmade doll",
  "fantasy collectible",
  "mystical collectible",
  "spiritual gift",
  "energy doll",
  "healing spirit",
  "healing energy",
  "protection spirit",
  "guardian figure",
  "spirit guide",
  "air guide",
  "wind guide",
  "elemental guardian",
  "ethereal being",
  "celestial spirit",
  "light spirit",
  "dream spirit",
  "good luck charm",
  "luck spirit",
  "altar doll",
  "altar guardian",
  "home blessing",
  "sacred doll",
  "mystic doll",
  "spirit companion",
  "soul companion",
  "fairy guardian",
  "wind fairy",
  "forest fairy",
  "magick doll",
  "magical companion",
  "positive energy",
  "spiritual decor",
  "fantasy decor",
  "fairytale doll",
  "storybook character",
  "white hair spirit",
  "air magic",
  "elemental magic",
  "guardian collectible",
  "OOAK doll",
  "artist doll",
  "fantasy creature",
  "mythical creature",
  "elf doll",
  "air elf",
  "nature elf",
  "spirit art",
  "folk art doll",
  "boho decor",
  "witch decor",
  "pagan decor",
  "new age gift",
  "meditation companion",
  "mindfulness gift",
  "energy healing",
  "manifestation tool",
  "abundance charm",
  "luck charm",
  "spiritual protection",
  "angelic spirit",
  "ethereal guardian",
  "peaceful spirit",
  "tranquility charm",
  "calming energy",
  "collector item",
  "unique handmade gift",
  "fantasy artwork",
  "magic creature",
  "air kingdom",
  "wind dancer",
  "heart healer",
  "dream walker",
  "sky traveler",
  "blessing doll",
  "energy guardian",
  "sacred companion"
];

export function looksLikeSpiritDoll(value) {
  return /\b(spirit\s*doll|doll|fae|faerie|fairy|guardian|elemental|air\s*spirit|wind\s*spirit|sky\s*guardian|spirit\s*companion|sacred\s*companion)\b/i.test(String(value || ""));
}

export function mergedSpiritDollKeywords(value = "") {
  const manual = String(value || "")
    .split(",")
    .map(keyword => keyword.trim())
    .filter(Boolean);
  return [...new Set([...manual, ...spiritDollKeywords])].join(", ");
}

export async function ensureSphereSeoColumns(sql) {
  await sql`alter table chant_spheres add column if not exists seo_keywords text`;
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
    throw new Error(`${name} is not set. Add it in Vercel Project Settings > Environment Variables.`);
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
