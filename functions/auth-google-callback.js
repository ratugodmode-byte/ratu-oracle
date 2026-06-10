import {
  databaseError,
  getRequiredEnv,
  getSql,
  handleOptions,
  json,
  redirect,
  signSession,
  siteUrl
} from "./_shared.js";

export async function handler(event) {
  const options = handleOptions(event);
  if (options) return options;

  if (event.httpMethod !== "GET") {
    return json(405, { error: `Method ${event.httpMethod} is not allowed.` });
  }

  try {
    const code = event.queryStringParameters?.code;
    const returnedState = event.queryStringParameters?.state;
    const stateCookie = event.headers.cookie?.match(/(?:^|;\s*)ratu_oauth_state=([^;]+)/)?.[1];

    if (!code) return json(400, { error: "Google did not return an authorization code." });
    if (!returnedState || !stateCookie || returnedState !== stateCookie) {
      return json(400, { error: "Google login state check failed. Please try again." });
    }

    const clientId = getRequiredEnv("GOOGLE_CLIENT_ID");
    const clientSecret = getRequiredEnv("GOOGLE_CLIENT_SECRET");
    const callback = `${siteUrl(event)}/.netlify/functions/auth-google-callback`;

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: callback,
        grant_type: "authorization_code"
      })
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok) {
      return json(400, { error: tokenData.error_description || tokenData.error || "Google token exchange failed." });
    }

    const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const googleUser = await userResponse.json();
    if (!userResponse.ok || !googleUser.email) {
      return json(400, { error: "Could not read your Google profile." });
    }

    const sql = getSql();
    const rows = await sql`
      insert into app_users (auth_user_id, email, auth_provider, display_name, avatar_url)
      values (${googleUser.sub}, ${googleUser.email}, 'google', ${googleUser.name || googleUser.email}, ${googleUser.picture || null})
      on conflict (email) do update
        set auth_user_id = excluded.auth_user_id,
            auth_provider = 'google',
            display_name = excluded.display_name,
            avatar_url = excluded.avatar_url,
            updated_at = now()
      returning id, email, display_name, avatar_url
    `;

    const user = rows[0];
    const session = signSession({
      userId: user.id,
      email: user.email,
      name: user.display_name,
      picture: user.avatar_url,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7
    });

    return redirect("/", [
      "ratu_oauth_state=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax",
      `ratu_session=${session}; Path=/; Max-Age=604800; HttpOnly; Secure; SameSite=Lax`
    ]);
  } catch (error) {
    if (String(error.message || "").includes("DATABASE_URL")) return databaseError(error);
    return json(500, { error: error.message || "Google login failed." });
  }
}
