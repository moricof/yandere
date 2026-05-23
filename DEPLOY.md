# Goddess Rebirth: Idle Oaths — Deployment Guide
## by Caelum Noir

---

## Prerequisites

```bash
npm install -g wrangler
wrangler login
```

---

## Step 1 — Create Cloudflare Resources

```bash
# Create D1 database
wrangler d1 create goddess-rebirth-db

# Create KV namespace
wrangler kv:namespace create SESSIONS

# Copy the IDs printed above into wrangler.toml
```

---

## Step 2 — Apply Database Schema

```bash
# Local dev
npm run db:init

# Production
npm run db:init:prod
```

---

## Step 3 — Generate VAPID Keys

```bash
node scripts/gen-vapid.js
```

Follow the printed instructions to add keys as encrypted secrets in the Cloudflare Dashboard.

---

## Step 4 — Set Worker Secrets

In **Cloudflare Dashboard → Workers → goddess-rebirth-api → Settings → Variables**, add:

| Variable               | Value                          |
|------------------------|-------------------------------|
| `JWT_SECRET`           | (long random string)          |
| `ADMIN_SECRET`         | (your admin password)         |
| `VAPID_PUBLIC_KEY`     | (from gen-vapid.js output)    |
| `VAPID_PRIVATE_KEY_JWK`| (JSON string from gen-vapid.js)|
| `VAPID_SUBJECT`        | `mailto:you@yourdomain.com`   |

---

## Step 5 — Deploy the Worker

```bash
cd workers
npx wrangler deploy
# Note the URL: https://goddess-rebirth-api.YOUR_ACCOUNT.workers.dev
```

---

## Step 6 — Update Frontend Config

Edit **`public/src/config.js`** and replace:
```js
API_URL: 'https://goddess-rebirth-api.YOUR_ACCOUNT.workers.dev',
VAPID_PUBLIC_KEY: 'YOUR_VAPID_PUBLIC_KEY_BASE64URL',
```

Also update the `<link rel="preconnect">` in `public/index.html`.

---

## Step 7 — Deploy Frontend to Cloudflare Pages

```bash
# Option A: Wrangler CLI
npm run deploy:pages

# Option B: Connect GitHub repo in Cloudflare Dashboard
# Build command: (none — static site)
# Output directory: public
```

---

## Step 8 — Access Admin Dashboard

Navigate to: `https://your-pages-domain.pages.dev/caelum-admin`

Update `API_URL` inside `public/admin/index.html` to match your Worker URL.

Sign in with your `ADMIN_SECRET` password.

---

## Admin Dashboard Usage

The admin dashboard lets you configure **all game assets** without touching code:

| Asset Type       | Key Example        | What It Changes              |
|------------------|--------------------|------------------------------|
| `character_art`  | `seraphine`        | Character illustration        |
| `character_video`| `seraphine`        | Character animated background |
| `monster_art`    | `corrupted_sprite` | Monster display image         |
| `banner_art`     | `banner_main`      | Gacha summon banner           |
| `background_art` | `battle`           | Battle screen background      |

Paste any **publicly accessible HTTPS URL** (Discord CDN, R2, etc.). Changes appear in the game within 5 minutes (CDN cache TTL).

---

## Development

```bash
# Run Worker locally
npm run dev:worker

# Serve frontend (any static file server)
npx serve public
```

---

## Cron / Scheduled Notifications

In `wrangler.toml`, add:
```toml
[triggers]
crons = ["0 * * * *"]  # Every hour
```

The worker will send push notifications to users whose offline storage is full.

---

## Game Character Keys Reference

| ID           | Name       | Rarity |
|--------------|------------|--------|
| seraphine    | Seraphine  | SSR    |
| lyraneth     | Lyraneth   | SSR    |
| veilara      | Veilara    | SSR    |
| mirael       | Mirael     | SR     |
| zephyrine    | Zephyrine  | SR     |
| solaris      | Solaris    | SR     |
| noctis       | Noctis     | SR     |
| elara        | Elara      | R      |
| fauna        | Fauna      | R      |
| pyris        | Pyris      | R      |
| aqua         | Aqua       | R      |
| terryn       | Terryn     | R      |
| lumi         | Lumi       | R      |
