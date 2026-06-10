# danshly.com

> **Engineering. Infrastructure. Ownership.**
> The public site of Danshly — a family-run engineering studio that designs,
> builds, hosts, secures and operates complete web platforms end-to-end.

This repository is itself a demonstration of how we work: React Server
Components with near-zero client JavaScript, a strict nonce-based CSP,
dependency-free input validation and rate limiting, a hardened container
image, and an nginx + Cloudflare Authenticated Origin Pulls edge — all
self-hosted.

---

## Stack

| Layer      | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js (App Router, React Server Components)       |
| Language   | TypeScript, `strict` + `noUncheckedIndexedAccess`   |
| Styling    | Tailwind CSS v4 (CSS-first config in `globals.css`) |
| Fonts      | Inter + JetBrains Mono, self-hosted via `next/font` |
| Runtime    | Node 22, standalone output, distro-minimal Alpine   |
| Edge       | nginx → Cloudflare (Full strict + origin pulls)     |

Runtime dependencies: `next`, `react`, `react-dom`, `server-only`. That's the
whole list — no UI kits, no animation libraries, no analytics scripts.

## Project structure

```
app/
  layout.tsx            Root layout: fonts, metadata, viewport, skip link
  page.tsx              Home page composing the seven sections
  globals.css           Tailwind v4 theme tokens + bespoke CSS (pipes, reveal)
  sitemap.ts            Dynamic sitemap
  robots.ts             robots.txt (API routes disallowed)
  manifest.ts           Web app manifest
  icon.svg              Favicon (SVG, dark)
  opengraph-image.tsx   OG/Twitter card generated with next/og
  not-found.tsx         Styled 404
  error.tsx             Client error boundary
  api/
    contact/route.ts    Contact endpoint: size cap → rate limit → honeypot
                        → validation → pluggable delivery
    health/route.ts     Liveness probe (Docker HEALTHCHECK / k8s / uptime)
components/
  layout/               Header (server) + mobile nav (client) + footer
  sections/             Hero, team, capabilities, architecture pipeline,
                        telemetry, projects, contact (+ client form)
  ui/                   Container, section heading, button, badge, tag
  icons.tsx             Hand-drawn 24px inline icon set (no icon library)
  json-ld.tsx           schema.org @graph (Organization, founders, WebSite)
  reveal.tsx            ~1 kB IntersectionObserver scroll-reveal (progressive)
lib/
  site.ts               Site-wide constants (name, URL, socials, nav)
  metrics.ts            Typed homelab telemetry contract + demo feed
  projects.ts           Portfolio data — one entry per card
  validation.ts         Dependency-free contact validation
  rate-limit.ts         In-memory sliding-window limiter (Redis-swappable)
  contact.ts            Delivery transport (webhook or structured log)
  request.ts            Client IP resolution (CF → nginx → app)
proxy.ts                Per-request CSP with nonce + strict-dynamic
next.config.ts          Security headers, standalone output
deploy/nginx/           Production nginx vhost (Cloudflare AOP, rate limits)
Dockerfile              Multi-stage, non-root, healthchecked image
docker-compose.yml      Hardened single-service deployment
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:3001
npm run typecheck  # tsc --noEmit
npm run build      # production build (also type-checks)
npm start          # serve the production build
```

Copy `.env.example` to `.env` and adjust as needed. Everything works with no
env vars at all; `NEXT_PUBLIC_SITE_URL` defaults to `https://danshly.com`.

## Security model

- **CSP with per-request nonces** (`proxy.ts`): `script-src 'self'
  'nonce-…' 'strict-dynamic'` — no `unsafe-inline` for scripts. Next.js picks
  the nonce up from the request header and stamps it on every script it emits.
  - *Trade-off, deliberately taken:* nonces are incompatible with build-time
    static HTML, so the root layout forces dynamic rendering. The page is
    RSC-only and tiny; TTFB on our own hardware is single-digit milliseconds.
    If you ever prefer static HTML over the strict CSP, delete `proxy.ts` and
    the `force-dynamic` export in `app/layout.tsx`.
- **Security headers** (`next.config.ts`): HSTS (preload), nosniff,
  frame deny, referrer policy, permissions policy, COOP. Kept in the app —
  not nginx — so they ship with the code on any transport.
- **Contact endpoint defense in depth** (`app/api/contact/route.ts`):
  body-size cap (16 kB) → per-IP sliding-window rate limit (5/min) → honeypot
  (accepted silently, so bots learn nothing) → typed validation with control
  character stripping → pluggable delivery. nginx applies a second rate
  limit (10 r/min) before traffic ever reaches Node.
- **Origin lockdown**: nginx requires Cloudflare's client certificate
  (Authenticated Origin Pulls), so the origin refuses anything that isn't
  Cloudflare — direct-to-IP scanning dies at the TLS handshake.
- **Container hardening**: non-root user, read-only filesystem, `cap_drop:
  ALL`, `no-new-privileges`, loopback-only port binding, memory/CPU limits.

## Performance model

- Server components everywhere; client JavaScript is limited to three small
  islands: mobile nav, contact form, scroll-reveal (~a few kB total).
- The architecture pipeline animation is pure CSS (`.pipe-x`/`.pipe-y` dashed
  gradients) — no canvas, no animation library, zero layout cost.
- Reveal animations use `opacity`/`transform` only (CLS contribution: 0) and
  are scoped under `html.js`, so content is never hidden without JavaScript.
  `prefers-reduced-motion` disables all motion globally.
- Fonts are subset and self-hosted by `next/font` (no third-party requests,
  `font-display: swap` with size-adjusted fallbacks → no FOUT shift).
- nginx serves `/_next/static/*` from a local proxy cache with the immutable
  cache headers Next.js sets.

## Deployment (self-hosted Docker)

```bash
# 1. Build and run
docker compose up -d --build

# 2. Verify
curl -s http://127.0.0.1:3001/api/health
docker inspect --format='{{.State.Health.Status}}' danshly-web
```

The container binds to `127.0.0.1:3001` only; nginx is the public entrypoint.

### nginx + Cloudflare

1. Copy `deploy/nginx/danshly.com.conf` to `/etc/nginx/sites-available/` and
   symlink into `sites-enabled/`.
2. Place the Cloudflare **Origin CA** certificate/key at
   `/etc/nginx/ssl/danshly.com.pem` / `.key`, and the **Authenticated Origin
   Pulls** CA at `/etc/nginx/ssl/cloudflare-authenticated-origin-pull.pem`
   (the vhost sets `ssl_client_certificate` + `ssl_verify_client on`).
3. In the Cloudflare dashboard: SSL/TLS mode **Full (strict)** and
   **Authenticated Origin Pulls** enabled for the zone.
4. `mkdir -p /var/cache/nginx/danshly && nginx -t && systemctl reload nginx`.

### Kubernetes

The image is probe-ready (`/api/health`) and runs as a non-root standalone
Node server, so a Deployment + Service + Ingress maps on directly; reuse the
compose hardening (readOnlyRootFilesystem, drop capabilities) in the pod
`securityContext`.

## Extending

| Task                        | Where                                                                 |
| --------------------------- | --------------------------------------------------------------------- |
| Add a project card          | One entry in `lib/projects.ts`                                        |
| Wire live homelab metrics   | Replace the body of `getHomelabMetrics()` in `lib/metrics.ts`         |
| Deliver contact mail        | Set `CONTACT_WEBHOOK_URL` (ntfy/n8n/…), or add SMTP in `lib/contact.ts` |
| Scale to multiple replicas  | Swap `lib/rate-limit.ts` Map for Redis (contract already documented)  |
| Update socials / nav / copy | `lib/site.ts` — single source of truth                                |
| Add a page                  | New segment under `app/`; metadata template already set in layout     |

**Before going live:** replace the placeholder GitHub/LinkedIn URLs and the
contact email in `lib/site.ts` with the real accounts.

---

Designed, Engineered & Hosted by **Danshly**.
