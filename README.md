# Ratu Oracle / Chant Sphere Marketplace

Static Netlify site with Neon Postgres-backed Netlify Functions.

## What Is Included

- Existing Ratu Oracle homepage design in `index.html`
- Netlify Functions backend in `netlify/functions`
- Neon Postgres connection through `@neondatabase/serverless`
- Marketplace spheres loaded from Neon
- Create Sphere form posts to Neon
- Experience form posts to Neon
- Friendly UI errors and empty states
- Google login through Google OAuth

## API Endpoints

- `/.netlify/functions/health`
- `/.netlify/functions/spheres`
- `/.netlify/functions/create-sphere`
- `/.netlify/functions/experiences`
- `/.netlify/functions/marketplace`
- `/.netlify/functions/auth-google-start`
- `/.netlify/functions/auth-google-callback`
- `/.netlify/functions/auth-me`
- `/.netlify/functions/auth-logout`

## Neon Setup

1. Create a Neon project.
2. Open the Neon SQL editor.
3. Run the SQL in `neon-schema.sql`.
4. Copy your Neon connection string.

Use the pooled connection string if Neon gives you one. It usually starts with:

```txt
postgresql://...
```

## Netlify Environment Variable

Do not put database or OAuth secrets in frontend JavaScript.

Add these in Netlify:

1. Open your Netlify site dashboard.
2. Go to **Site configuration**.
3. Go to **Environment variables**.
4. Add these variables:

```txt
DATABASE_URL
SITE_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
AUTH_COOKIE_SECRET
```

5. Paste your Neon Postgres connection string as `DATABASE_URL`.
6. Set `SITE_URL` to your live Netlify site URL, for example:

```txt
https://effervescent-custard-90151e.netlify.app
```

7. Set `AUTH_COOKIE_SECRET` to a long random value. Example shape:

```txt
change-this-to-a-long-random-string-at-least-32-characters
```

8. Get `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from Google Cloud OAuth.

## Google OAuth Setup

In Google Cloud Console:

1. Create or open a Google Cloud project.
2. Go to **APIs & Services** > **OAuth consent screen**.
3. Configure the app name and support email.
4. Go to **Credentials**.
5. Create **OAuth client ID**.
6. Choose **Web application**.
7. Add this authorized redirect URI:

```txt
https://YOUR-NETLIFY-SITE.netlify.app/.netlify/functions/auth-google-callback
```

For your current Netlify site, that is:

```txt
https://effervescent-custard-90151e.netlify.app/.netlify/functions/auth-google-callback
```

8. Copy the Google client ID into `GOOGLE_CLIENT_ID`.
9. Copy the Google client secret into `GOOGLE_CLIENT_SECRET`.
6. Save.
7. Redeploy the site.

## Deploy

For this real version, use a Git deploy or Netlify CLI deploy so Netlify can install `@neondatabase/serverless` from `package.json` and bundle the functions.

### Option A: Git deploy

1. Push this folder to GitHub.
2. Connect the repo in Netlify.
3. Use these settings:

```txt
Build command: npm run build
Publish directory: .
Functions directory: netlify/functions
```

Netlify will install dependencies from `package.json`.

### Option B: Netlify CLI deploy

Install dependencies, then deploy from this folder:

```bash
npm install
npm run build
npx netlify deploy --prod
```

Plain drag-and-drop is fine for a static-only preview, but the Neon-backed version needs Netlify to bundle the functions.

## Local Development

Install dependencies:

```bash
npm install
```

Create a local `.env` file:

```txt
DATABASE_URL=your_neon_connection_string
SITE_URL=http://localhost:8888
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_COOKIE_SECRET=change-this-to-a-long-random-string
```

Run locally:

```bash
npm run dev
```

Then open the Netlify Dev URL and test:

```txt
/.netlify/functions/health
```

You should see:

```json
{
  "ok": true,
  "database": "connected"
}
```

## Notes

The Google button redirects to Google OAuth. It will only work after `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `SITE_URL`, `AUTH_COOKIE_SECRET`, and `DATABASE_URL` are set in Netlify.
