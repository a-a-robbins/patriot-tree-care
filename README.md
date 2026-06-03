# Patriot Tree Care — marketing site skeleton

Angular 21 standalone app demo for a fake veteran-owned local tree service: homepage, informational sub-pages, and a **quote form** that emails submissions via the **SMTP2GO REST API** through a small Express API.

## Quick start

```bash
npm install
npm install --prefix server

copy .env.example server\.env
# Fill in server\.env for local testing

npm run dev
```

Open [http://localhost:4200](http://localhost:4200). Quote submissions POST to `/api/quote` (proxied to the API in development).

## Project structure

| Path                                         | Purpose                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------ |
| `src/app/pages/`                             | Route pages: home, services, about, gallery, safety, faq, contact, quote |
| `src/app/core/data/site-content.ts`          | Business copy, nav, services — **edit placeholders here**                |
| `src/app/core/services/quote-api.service.ts` | HTTP client for quote submission                                         |
| `server/`                                    | Express API + SMTP2GO REST                                               |
| `proxy.conf.json`                            | Dev proxy `/api` → `localhost:3001`                                      |

## Email (SMTP2GO REST API)

The API sends mail through [SMTP2GO’s HTTP API](https://developers.smtp2go.com/docs/send-an-email) using an API key and a verified sender.

**Local:** set `SMTP2GO_API_KEY`, `QUOTE_FROM_EMAIL`, and `QUOTE_TO_EMAIL` in `server/.env` (see `.env.example`).

**Production:** add the same names as **Actions secrets** in your GitHub repo (**Settings → Secrets and variables → Actions**). The deploy workflow passes them to the API host only — they are not stored in this repository.

Also add **Actions variables** in the same GitHub settings UI:

- `QUOTE_API_URL` — public URL of your deployed API (used by the GitHub Pages build)
- `PAGES_ORIGIN` — your `https://<username>.github.io` origin (API CORS)

Verify your sender in SMTP2GO before going live. The API sets `Reply-To` to the customer’s email.

## Customize content

Update `src/app/core/data/site-content.ts`:

- Company name, phone, email, service area
- Services list and FAQ
- Gallery placeholders (replace with real images in `gallery` page)

## GitHub Pages demo

**`https://<your-github-username>.github.io/patriot-tree-care/`**

Push to `main` runs `.github/workflows/deploy-pages.yml`. Enable **Settings → Pages → Source: GitHub Actions**.

The quote form works on Pages once `QUOTE_API_URL` is set. Without it, the site runs in demo mode.

Deploy the API with `.github/workflows/deploy-api.yml` (Fly.io). See [DEPLOY.md](./DEPLOY.md).

## Production notes

- GitHub Pages hosts the Angular app; Fly.io hosts the quote API.
- Never put `SMTP2GO_API_KEY` in the frontend — it stays server-side via GitHub Actions secrets.

## Scripts

| Command             | Description                |
| ------------------- | -------------------------- |
| `npm run dev`       | Angular + API concurrently |
| `npm start`         | Angular only               |
| `npm run start:api` | API only                   |
| `npm run build`     | Production Angular build   |

## Tech stack

- Angular 21 (standalone components, signals, lazy routes, view transitions)
- Reactive forms + `HttpClient` with `fetch`
- Express + SMTP2GO REST API
