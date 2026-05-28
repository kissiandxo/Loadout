# Loadout

Static sales site for curated Claude AI skill bundles, built with Astro + Tailwind CSS.

---

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

---

## How to add a new bundle

1. Create a new file in `src/content/bundles/` — name it `your-niche.json`
2. Copy the structure from `sales.json` and fill in your data
3. Set `"status": "coming-soon"` while you're building it out; change to `"live"` when ready
4. That's it. The homepage catalog and bundle page are generated automatically.

**The fields:**

| Field | What it does |
|---|---|
| `slug` | URL path — bundle lives at `/bundles/your-slug` |
| `niche` | Short label shown on cards (e.g. "Sales Reps & Dealerships") |
| `name` | Bundle name (e.g. "The Sales Loadout") |
| `tagline` | One-line outcome-focused tagline for the card |
| `price` | Core price in USD (number, no $) |
| `bumpPrice` | Order bump add-on price |
| `premiumPrice` | Done-With-You setup call price |
| `heroHeadline` | Big bold outcome headline on the bundle page |
| `heroSubhead` | One-line subheadline under the hero |
| `problem` | Array of 3-4 pains. First-person agitation, short and punchy |
| `shift` | "What if..." bridge paragraph |
| `whatsInside` | Array of outcome groups. Each has `outcome`, `description`, `items[]` |
| `skillCount` / `pluginCount` | Shown as proof-of-depth badges |
| `bonuses` | Array of bonus items shown below whatsInside |
| `bumpName` / `bumpDescription` | Name and description of the order bump add-on |
| `premiumName` / `premiumDescription` | Name and description of the Done-With-You tier |
| `faqs` | Array of `{ q, a }` objects |
| `checkoutUrl` | Primary checkout link (see below) |
| `bumpUrl` | Checkout link for Standard + Vault tier |
| `premiumUrl` | Checkout link for Done-With-You tier |
| `status` | `"live"` or `"coming-soon"` |

---

## Where to paste checkout links

Search for `TODO_PASTE_CHECKOUT_URL_HERE` in `src/content/bundles/sales.json`.

Replace each of the three URLs:

- `checkoutUrl` → your Lemon Squeezy / Gumroad standard product link
- `bumpUrl` → the link for your bundle + vault combo product (or a checkout with the bump pre-applied)
- `premiumUrl` → the link for your Done-With-You tier product (or a Calendly/booking link that triggers purchase)

**Important:** Every checkout URL that still says `TODO_PASTE_CHECKOUT_URL_HERE` will appear as a dead link in production. Do a project-wide search for `TODO_PASTE` before launching.

---

## Where to fill in your copy

| What | Where |
|---|---|
| Founder note (home) | `src/components/home/FounderSection.astro` |
| Founder note (bundle page) | `src/components/bundle/FounderNote.astro` |
| Testimonials (3 cards) | `src/components/bundle/SocialProof.astro` |
| Support email (thanks page) | `src/pages/thanks.astro` |
| Site domain | `astro.config.mjs` → `site:` |
| Privacy / Terms links | `src/components/Footer.astro` |

---

## How to deploy to Cloudflare Pages

1. Push this repo to GitHub (or GitLab)
2. Go to [Cloudflare Pages](https://pages.cloudflare.com) → Create a project → Connect your repo
3. Set these build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Done.

**Netlify** works the same way — same build command and output directory.

---

## How to deploy to Netlify

1. Push to GitHub
2. Import the repo at [app.netlify.com](https://app.netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

---

## Design system

The site uses a fixed dark palette. If you want to change the accent color from electric blue to something else:

1. Open `tailwind.config.mjs`
2. Change the `accent` values under `colors`
3. Rebuild

The background, border, and text colors are all defined there too.

---

## Project structure

```
src/
  content/
    config.ts          ← Content collection schema (Zod)
    bundles/
      sales.json       ← Sales bundle (live, flagship)
      retail.json      ← Retail bundle (coming soon stub)
      trades.json      ← Trades bundle (coming soon stub)
  layouts/
    BaseLayout.astro   ← HTML shell, fonts, scroll-reveal script
  components/
    Nav.astro
    Footer.astro
    BundleCard.astro
    bundle/            ← One component per sales page section
      Hero.astro
      Problem.astro
      TheShift.astro
      WhatsInside.astro
      SetupGuide.astro
      SocialProof.astro
      Pricing.astro
      Guarantee.astro
      FounderNote.astro
      FAQ.astro
      FinalCTA.astro
    home/              ← Home page sections
      HomeHero.astro
      HowItWorks.astro
      BundleCatalog.astro
      FounderSection.astro
      HomeFAQ.astro
  pages/
    index.astro        ← Home (/)
    bundles/
      [slug].astro     ← Bundle sales page (/bundles/sales etc.)
    thanks.astro       ← Post-purchase page (/thanks)
```
