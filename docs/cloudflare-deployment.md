# Deploying to Cloudflare

This project is a fully static Astro site (no SSR adapter) that builds to `dist/`. As of 2026, Cloudflare's recommended path for static sites is **Workers with static assets** (Pages is being consolidated into Workers).

## Option A — Deploy now from your machine (Wrangler CLI)

1. Install Wrangler as a dev dependency:
   ```bash
   pnpm add -D wrangler
   ```

2. Log in to Cloudflare:
   ```bash
   npx wrangler login
   ```
   This opens a browser to authorize your Cloudflare account.

3. Build the site:
   ```bash
   pnpm build
   ```
   This outputs static files to `dist/`.

4. Deploy:
   ```bash
   npx wrangler deploy dist
   ```
   Since there's no `wrangler.jsonc` yet, Wrangler will interactively ask:
   - Confirm you're deploying a directory of static assets → yes
   - Project name (defaults to your folder name, e.g. `portfoilio-site`)

   It then creates a `wrangler.jsonc` like:
   ```jsonc
   {
     "name": "portfoilio-site",
     "compatibility_date": "2026-08-18",
     "assets": { "directory": "dist" }
   }
   ```
   and deploys. You'll get a live URL at `https://<name>.<your-subdomain>.workers.dev`.

   From then on, redeploying is just:
   ```bash
   pnpm build && npx wrangler deploy
   ```

## Option B — Auto-deploy on every git push (recommended long-term)

1. In the Cloudflare dashboard, go to **Workers & Pages** → **Create application** → **Import a repository** (or **Connect** from an existing Worker's **Settings → Builds** if you already created one via Option A).
2. Authorize Cloudflare's GitHub app and select `PJNoob/portfoilioSite`.
3. Set build config:

   | Setting | Value |
   |---|---|
   | Build command | `pnpm build` |
   | Deploy command | `npx wrangler deploy` |
   | Root directory | `/` |
   | Production branch | `main` |

4. Save and deploy — Cloudflare builds and deploys immediately, then rebuilds automatically on every push to `main`. Pull requests get their own preview URLs automatically.

## Custom domain (optional)

Once deployed, if you own a domain (and it's on Cloudflare DNS):

1. Go to your Worker → **Settings** → **Domains & Routes** → **Add** → **Custom Domain**.
2. Enter your domain (e.g. `yourname.com`) and confirm.

Cloudflare issues the certificate and wires DNS automatically — no manual CNAME needed.

## Before deploying

Update `astro.config.mjs` — the `site` field is still set to `https://example.com`. Change it to your real Workers or custom domain URL so canonical links and Open Graph tags are correct.
