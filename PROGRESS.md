# PROGRESS — LOADOUT launch

_Last updated: 2026-05-29. See `RESUME-LAUNCH.md` for full context, `STORE-DECISION.md` for the store plan, `LAUNCH-CHECKLIST.md` for the end-to-end list._

**Launch gate:** `npm run check:launch` → **BLOCKED** (13 placeholders). This is correct — it clears once the domain + Lemon Squeezy URLs are set. Must print `[OK]` before deploy.

## /completed (this session)
- **Brand PNGs** — rendered from SVG via headless Chrome at native sizes: `brand/loadout-logo.png` (720×200), `loadout-logo-light.png` (720×200), `loadout-mark.png` (200×200), and 3 store covers `brand/gumroad/*.png` (1280×720).
- **OG image** — `public/og-default.png` (1200×630), on-brand dark composition; wired as the default `og:image` + `twitter:image` in `BaseLayout.astro` (falls back automatically when a page passes no `ogImage`).
- **Favicons** — `public/favicon.svg` (copy of mark), `favicon.png` (512), `apple-touch-icon.png` (180); `<link>` tags + `theme-color #0A0A0B` + `robots` meta added to `BaseLayout`.
- **Cheat-sheet PDF** — `brand/PROMPT-CHEAT-SHEET.pdf` (4pp, A4) rendered from `brand/cheat-sheet-print.html`; copied into both kit source dirs; added to both `pack-product.ps1` `$Include`; **all 4 zips re-packed**, leak scan passed, `.pdf`+`.md` confirmed present in every zip.
- **SEO infra** — `public/robots.txt`, `public/sitemap.xml` (4 routes); Organization + WebSite JSON-LD in `BaseLayout`; Product + FAQPage JSON-LD on `bundles/[slug].astro` (price/USD/InStock).
- **Store wiring** — `STORE-DECISION.md` (Lemon Squeezy, 6 products, URL-field→product mapping); 9 `TODO_PASTE_*` tokens replaced with labelled `https://REPLACE.lemonsqueezy.com/buy/…` placeholders; `scripts/check-launch-ready.mjs` + `npm run check:launch` gate; `.env.example`.
- **Verified** — `npm run build` clean (4 pages); built HTML carries canonical/OG/4×JSON-LD/theme-color/apple-touch/price; all 6 public assets land in `dist/`.

## /progress (in flight)
- None — all 8 autonomous NEXT ACTIONS from `RESUME-LAUNCH.md` are done.

## /next-actions (no account needed — optional polish)
- Record demo GIF from `brand/demo-walkthrough.html`; add founder headshot `public/founder.jpg` (wire into `FounderNote.astro` / `FounderSection.astro`).
- Wire product #5 (Both-Kit Bundle $149): add a `bundleUrl` field + homepage cross-sell CTA.
- Consider `<meta name="robots" content="noindex">` on `/thanks` (post-purchase page).

## /blockers (need Phoenix)
- **Lemon Squeezy:** create account + 6 products + payout/tax identity → copy real checkout URLs → replace the 6 LS placeholders in `sales.json` + `customer-engagement.json`.
- **Domain:** buy it → replace `https://yourloadout.com` in `astro.config.mjs`, `public/robots.txt`, `public/sitemap.xml`, and `support@yourloadout.com` in `src/pages/thanks.astro` (7 spots total; all flagged by `check:launch`).
- **GitHub:** install/auth `gh` (not installed) or create repo manually → `git push -u origin main`.
- **Deploy:** Cloudflare Pages or Vercel — build `npm run build`, output `dist`, env `NODE_VERSION=20`.
- **macOS:** `install.sh` still needs validation on a real Mac.
