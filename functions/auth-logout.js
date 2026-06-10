import { handleOptions, json, redirect } from "./_shared.js";

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  if (event.httpMethod !== "GET" && event.httpMethod !== "POST") {
    return json(405, { error: `Method ${event.httpMethod} is not allowed.` });
  }

  return redirect("/", [
    "ratu_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax"
  ]);
}
