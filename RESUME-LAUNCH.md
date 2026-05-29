# RESUME-LAUNCH — LOADOUT

Handoff for a fresh session. Read this + memory `project_loadout.md`, then continue the launch.
Project root: `C:\Users\PhoenixJennings\loadout\` (git repo, branch `main`).

## What LOADOUT is
Astro storefront + two Claude AI skill kits sold as digital products: **sales-loadout** and
**customer-engagement-loadout** (each 12 skills + 12 commands + 8 plugins). Buyer opens a kit in
Claude Code, types `/loadout-setup`, installer sets everything up. Core product is DONE +
committed (`04c367f`). This phase = finish the launch.

## State of play
- Site builds clean: `npm run build` → 4 pages (`/`, `/bundles/sales`, `/bundles/customer-engagement`, `/thanks`).
- Kits built + zipped in `product/*/dist/` (re-packed with installer; `pack-product.ps1` per kit, has a personal-data leak scanner — keep it).
- `BaseLayout.astro` already has canonical + OG/Twitter meta + `ogImage` prop. MISSING: favicon, default OG image, JSON-LD, robots, sitemap, theme-color.
- `astro.config.mjs` `site` = placeholder `https://yourloadout.com`.
- Brand assets are SVG in `brand/` + `brand/gumroad/` (logo 720x200, mark 200x200, 3 covers 1280x720). Palette: graphite `#0A0A0B`, accent blue `#3B82F6`. Chrome is installed (headless render works); ImageMagick is NOT (Windows `convert.exe` is the disk tool — never run it). `gh` NOT installed.
- Checkout: bundle JSONs (`src/content/bundles/{sales,customer-engagement,trades}.json`) have `checkoutUrl`/`bumpUrl`/`premiumUrl` = `TODO_PASTE_*` (9 total). README says grep `TODO_PASTE` before launch.

## Store decision (made, not yet implemented)
Use **Lemon Squeezy** (NOT Gumroad). Reason: Merchant-of-Record handles Phoenix's AU + global
sales tax/VAT automatically; supports digital products, bundles, discount codes, affiliates,
license keys, instant delivery; low maintenance. License keys feed the kit installer's future
`requiredKeys` flow. Fallback if LS rejected: Stripe Payment Links + the existing static site.

## NEXT ACTIONS (no accounts needed — do these autonomously)
1. **Brand PNGs** via headless Chrome: render `brand/*.svg` + `brand/gumroad/*.svg` to PNG at native sizes (logo 720x200, mark 200x200, covers 1280x720). Chrome flag pattern: `--headless=new --screenshot=out.png --window-size=W,H --default-background-color=00000000 file://wrapper.html` (wrap SVG in an HTML sized to viewBox, transparent bg).
2. **OG image** 1200x630 → `public/og-default.png` (on-brand: dark bg, "LOADOUT" wordmark + tagline). Wire as default `og:image` in `BaseLayout.astro`.
3. **Favicon**: `public/favicon.svg` (copy `brand/loadout-mark.svg`) + render `favicon.png` + `apple-touch-icon.png` (180x180); add `<link rel="icon">` + theme-color `#0A0A0B` to `BaseLayout`.
4. **Cheat-sheet PDF**: Chrome `--headless=new --print-to-pdf=out.pdf --no-pdf-header-footer file://brand/cheat-sheet-print.html`; copy to both `product/*/PROMPT-CHEAT-SHEET.pdf`; add `PROMPT-CHEAT-SHEET.pdf` to each `pack-product.ps1` `$Include`; re-pack all 4 zips; confirm leak scan passes.
5. **SEO infra**: `public/robots.txt` (allow all + sitemap line); `public/sitemap.xml` (4 routes, lastmod); Organization + WebSite JSON-LD in `BaseLayout`; Product/SoftwareApplication JSON-LD with `offers` on `[slug].astro`.
6. **Store wiring**: write `STORE-DECISION.md` (the reasoning above + exact LS product setup: 6 products mirroring LAUNCH-CHECKLIST Step 4 pricing $97/$144-vault/$149-bundle/$497-DWY); replace `TODO_PASTE_*` with clearly-labeled LS placeholders like `https://REPLACE.lemonsqueezy.com/buy/...`; add `scripts/check-launch-ready.mjs` (or .ps1) that greps for `REPLACE`/`TODO_PASTE`/`yourloadout.com` and fails if found; `.env.example` if any runtime keys.
7. **Verify**: `npm run build` clean; spot-check a bundle page renders new meta (preview or grep dist html). Commit (author stays `Loadout <founder@loadout.local>`; `.gitattributes` pins `*.sh`=LF — keep).
8. Maintain `PROGRESS.md` with `/completed /progress /next-actions /blockers`.

Decisions are pre-made — do NOT re-ask the user about minor design/copy/format/tooling.
Skip heavy AI image generation unless user asks (cost). Polish bar: premium, dark, tactical,
black/graphite/silver + blue accent, no generic AI art.

## BLOCKERS (need Phoenix — his own stop-list)
- Lemon Squeezy: account + 6 products + payout/tax identity → real checkout URLs (then run step-6 replace + check script).
- Domain purchase → replace `yourloadout.com` in `astro.config.mjs` + sitemap + canonical.
- GitHub: install/auth `gh` or create repo manually → `git push -u origin main`.
- Cloudflare Pages (or Vercel) deploy: build `npm run build`, output `dist`, env `NODE_VERSION=20`.
- Demo GIF (record `brand/demo-walkthrough.html`), founder headshot (`public/founder.jpg` + `FounderNote.astro` / `FounderSection.astro`).

## Watch
- Cost: prior session hit ~$121 due to bloated context. Keep this session lean.
- Caveman mode was active (terse). Honor if still on.
- Full launch steps: `LAUNCH-CHECKLIST.md`. As-built design: `docs/specs/2026-05-29-loadout-design.md`.
