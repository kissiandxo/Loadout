# RESUME-LAUNCH — LOADOUT

Handoff for a fresh session. Read this + memory `project_loadout.md`, then continue.
Project root: `C:\Users\PhoenixJennings\loadout\` (git, branch `main`).

## What LOADOUT is
Phoenix's independent online-income business (his exit from the 9-5 — NOT tied to any day job).
Astro storefront + Claude AI skill kits sold via **Lemon Squeezy**. Positioning: **for ANY/EVERY
business** — no code, live in 30 min. Sales / customer-engagement / operations are example kits,
not the headline.

## State (done + committed)
- Core product + site built. Launch-prep commit `afc0ee8`: brand PNGs, OG image, favicons,
  cheat-sheet PDF in all 4 kit zips, SEO (robots/sitemap/JSON-LD), store placeholders,
  `npm run check:launch` gate, `.env.example`, `PROGRESS.md`.
- FB brand assets commit `422e1ab`: `brand/facebook/fb-cover.png` (1640x624),
  `fb-profile.png` (720x720). Public copies: cover https://files.catbox.moe/z3jt6u.png ,
  profile https://files.catbox.moe/ogb96w.png .
- `LEMON-SQUEEZY-SETUP.md` written (UNCOMMITTED) — exact 6-product setup + URL mapping.
- Build clean (4 pages). `check:launch` = BLOCKED until LS URLs + domain set (correct).

## Blockers (need Phoenix — accounts/money, can't be automated)
1. **Lemon Squeezy**: create store + 6 products + payout → copy 6 checkout URLs → paste into
   `src/content/bundles/sales.json` + `customer-engagement.json` (see LEMON-SQUEEZY-SETUP.md).
2. **Domain**: buy → replace `yourloadout.com` in `astro.config.mjs`, `public/robots.txt`,
   `public/sitemap.xml`, `src/pages/thanks.astro`.
3. **Deploy**: Cloudflare Pages / Vercel — build `npm run build`, output `dist`, `NODE_VERSION=20`.
4. **GitHub**: `gh` not installed — install/auth or create repo manually → `git push`.
5. **Social**: rename FB page "Claude" → "LOADOUT — AI Skill Kits"; set FB+IG profile/cover/bio
   (assets + copy ready). macOS `install.sh` still unverified on a real Mac.

## NEXT SESSION — paste this (edit as you like)
> Resume LOADOUT launch. Read RESUME-LAUNCH.md + memory project_loadout.md. I've [done X].
> Next: [e.g. paste my Lemon Squeezy URLs / set up deploy]. Keep it lean.

## Cost note
Sessions ran hot ($120-160) due to huge loaded context (many plugins/MCPs). Start FRESH sessions
for new chunks of work — far cheaper. Don't reload this whole history.
