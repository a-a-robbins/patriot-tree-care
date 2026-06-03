# Patriot Tree Care

## Quick start

```
npm install
npm install --prefix server
copy .env.example server\.env   # fill in SMTP2GO_API_KEY, QUOTE_FROM_EMAIL, QUOTE_TO_EMAIL
npm run dev                      # Angular :4200 + API :3001 concurrently
```

## Key commands

| Command                  | What it does                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`            | Angular + API concurrently                                                                                          |
| `npm start`              | Angular only                                                                                                        |
| `npm run start:api`      | API only (Node watch)                                                                                               |
| `npm run build`          | Production Angular build                                                                                            |
| `npm run build:pages`    | GitHub Pages build (`ng build --configuration production,pages` + copies `index.html` → `404.html` for SPA routing) |
| `npm test` / `ng test`   | Vitest via `@angular/build:unit-test`                                                                               |
| `npx prettier --check .` | Check formatting                                                                                                    |
| `npx prettier --write .` | Format all                                                                                                          |

## Architecture

- **`src/`** — Angular 21 standalone app, lazy-loaded routes, signals, View Transitions, `withComponentInputBinding`
- **`server/`** — Express API (ESM, `node --watch`), SMTP2GO email, shipped to Fly.io via Docker
- **`src/app/core/data/site-content.ts`** — All business copy, nav, services, FAQ, gallery placeholders (edit here)
- **`src/environments/environment.ts`** — Dev: `apiBaseUrl: ''` (proxied via `proxy.conf.json`)
- **`src/environments/environment.pages.ts`** — CI-generated from `vars.QUOTE_API_URL`
- **`proxy.conf.json`** — Dev proxy `/api` → `localhost:3001`

## Testing

Single smoke test at `src/app/app.spec.ts`. No component/page tests yet. Vitest globals via `tsconfig.spec.json`.

## CI/CD

- **GitHub Pages** (`.github/workflows/deploy-pages.yml`): runs `build:pages` on push to main. `QUOTE_API_URL` from GitHub Actions **variable** (not secret).
- **Fly.io API** (`.github/workflows/deploy-api.yml`): triggered by `server/**` changes. Secrets set via `flyctl secrets set`.
- Stale `jekyll-docker.yml` — can be ignored/deleted.

## Secrets & Variables (GitHub Actions)

| Type     | Name               | Purpose                              |
| -------- | ------------------ | ------------------------------------ |
| Secret   | `SMTP2GO_API_KEY`  | SMTP2GO API key                      |
| Secret   | `QUOTE_FROM_EMAIL` | Verified sender                      |
| Secret   | `QUOTE_TO_EMAIL`   | Notification recipient               |
| Secret   | `FLY_API_TOKEN`    | Fly.io deploy token                  |
| Variable | `QUOTE_API_URL`    | Public API URL (used in Pages build) |
| Variable | `PAGES_ORIGIN`     | GitHub Pages origin (API CORS)       |

## Conventions

- `singleQuote: true` (Prettier, .editorconfig), `printWidth: 100`
- SCSS component styles, design tokens in `src/styles.scss` (CSS custom properties)
- All components standalone — `imports` array, no NgModules
- Lazy route pattern: `loadComponent: () => import('./pages/...').then(m => m.ComponentName)`
- Server-side validation + honeypot (`website` field) on quote form
- API returns 503 if SMTP2GO env vars missing

## Content customization

Edit `src/app/core/data/site-content.ts` — company name, phone, email, services, FAQ, gallery.

## Server .env (local)

```
SMTP2GO_API_KEY=...
QUOTE_FROM_EMAIL=...
QUOTE_TO_EMAIL=...
SITE_NAME=Patriot Tree Care
PORT=3001
CORS_ORIGIN=http://localhost:4200
```
