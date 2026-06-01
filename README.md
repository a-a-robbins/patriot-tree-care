# Patriot Tree Care — marketing site skeleton

Angular 21 standalone app demo for a fake veteran-owned local tree service: homepage, informational sub-pages, and a **quote form** that emails submissions via **SendGrid** through a small Express API.

## Quick start

```bash
# Install frontend + API dependencies
npm install
npm install --prefix server

# Configure SendGrid (see below)
copy .env.example server\.env
# Edit server\.env with your keys

# Run web + API together (API on :3001, Angular on :4200)
npm run dev
```

Open [http://localhost:4200](http://localhost:4200). Quote submissions POST to `/api/quote` (proxied to the API in development).

## Project structure

| Path | Purpose |
|------|---------|
| `src/app/pages/` | Route pages: home, services, about, gallery, safety, faq, contact, quote |
| `src/app/core/data/site-content.ts` | Business copy, nav, services — **edit placeholders here** |
| `src/app/core/services/quote-api.service.ts` | HTTP client for quote submission |
| `server/` | Express API + SendGrid |
| `proxy.conf.json` | Dev proxy `/api` → `localhost:3001` |

## SendGrid setup

1. Create an API key at [SendGrid](https://app.sendgrid.com/settings/api_keys).
2. Verify a **sender** (Single Sender Verification or domain authentication).
3. Set in `server/.env`:
   - `SENDGRID_API_KEY`
   - `QUOTE_FROM_EMAIL` — verified sender address
   - `QUOTE_TO_EMAIL` — inbox that receives quote requests

The API sets `replyTo` to the customer’s email so you can reply directly.

## Customize content

Update `src/app/core/data/site-content.ts`:

- Company name, phone, email, service area
- Services list and FAQ
- Gallery placeholders (replace with real images in `gallery` page)

## GitHub Pages demo

Public demo URL (after deploy):

**`https://<your-github-username>.github.io/patriot-tree-care/`**

Deployment is automated: push to `main` runs `.github/workflows/deploy-pages.yml`.

1. Create a public repo named **`patriot-tree-care`** on GitHub.
2. Push this project to `main` (see [DEPLOY.md](./DEPLOY.md)).
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. After the workflow finishes, open the URL above (allow a few minutes on first deploy).

The quote form is disabled on `github.io` (static hosting only). Run `npm run dev` locally or host the `server/` API for live submissions.

## Production notes

- Deploy the Angular build (`dist/`) to static hosting (Netlify, Cloudflare Pages, S3, etc.).
- Deploy `server/` to any Node host (Railway, Render, Fly.io, Azure App Service).
- Point your host’s `/api` routes to the API, or set an environment-specific API URL in `QuoteApiService`.
- Set `CORS_ORIGIN` on the API to your production domain.
- **Never** expose `SENDGRID_API_KEY` in the Angular bundle — it stays server-side only.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Angular + API concurrently |
| `npm start` | Angular only |
| `npm run start:api` | API only |
| `npm run build` | Production Angular build |

## Tech stack

- Angular 21 (standalone components, signals, lazy routes, view transitions)
- Reactive forms + `HttpClient` with `fetch`
- Express + `@sendgrid/mail`
