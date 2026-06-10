import crypto from "node:crypto";
import { getRequiredEnv, handleOptions, json, redirect, siteUrl } from "./_shared.js";

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  if (event.httpMethod !== "GET") {
    return json(405, { error: `Method ${event.httpMethod} is not allowed.` });
  }

  try {
    const clientId = getRequiredEnv("GOOGLE_CLIENT_ID");
    const callback = `${siteUrl(event)}/.netlify/functions/auth-google-callback`;
    const state = crypto.randomUUID();
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: callback,
      response_type: "code",
      scope: "openid email profile",
      access_type: "online",
      prompt: "select_account",
      state
    });

    return redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`, [
      `ratu_oauth_state=${state}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax`
    ]);
  } catch (error) {
    return json(500, { error: error.message });
  }
}
