# STORE-DECISION — LOADOUT

**Decision:** Sell through **Lemon Squeezy** (not Gumroad).
**Status:** Chosen. Placeholders wired into the site. Account + products = Phoenix's job (blocker).
**Fallback:** Stripe Payment Links + the existing static site, if Lemon Squeezy rejects the account.

## Why Lemon Squeezy
- **Merchant of Record.** LS is the seller of record, so it collects and remits AU GST + global
  VAT/sales tax automatically. Phoenix does not have to register for tax in every jurisdiction —
  the single most valuable property for a solo AU founder selling worldwide digital goods.
- **Digital-product native:** instant delivery of the zip files, discount codes, affiliates,
  and **license keys** out of the box.
- **License keys feed the installer.** LS-issued keys map cleanly onto the kit installer's future
  `requiredKeys` gate — buyer pastes their key, `/loadout-setup` validates and unlocks.
- **Low maintenance.** No server, no webhook required for the static-site MVP — checkout is a
  hosted LS URL the buttons point at.

## The 6 products to create in Lemon Squeezy
Mirror `LAUNCH-CHECKLIST.md` Step 4 pricing. Currency = **USD** (matches the site + JSON-LD).

| # | Product | Price | Delivery (zip from `product/*/dist/`) |
|---|---------|-------|----------------------------------------|
| 1 | The Sales Loadout — Standard | **$97** | `the-sales-loadout-v1.zip` |
| 2 | The Sales Loadout + Vault | **$144** | `the-sales-loadout-with-vault-v1.zip` |
| 3 | The Customer Engagement Loadout — Standard | **$97** | `the-customer-engagement-loadout-v1.zip` |
| 4 | The Customer Engagement Loadout + Vault | **$144** | `the-customer-engagement-loadout-with-vault-v1.zip` |
| 5 | Both-Kit Bundle (Sales + Customer Engagement) | **$149** | both Standard zips |
| 6 | Done-With-You Setup Call | **$497** | calendar link / manual fulfilment |

> **Order-bump note:** the page copy offers the Vault as a **+$47** add-on (`bumpPrice`), but
> Lemon Squeezy has no native order-bump. Implement the Vault as the separate **$144** product
> (#2 / #4) — i.e. the "+Vault" button points at the combined product, not a $47 SKU. The
> `with-vault` zips already bundle Standard + `VAULT-SCRIPTS.md` for this.

## How the site reads it — URL field → product mapping
The buy buttons read three URL fields per bundle in `src/content/bundles/*.json`:

| JSON field | Live bundle | Points at LS product |
|------------|-------------|----------------------|
| `checkoutUrl` | sales | #1 Sales Standard $97 |
| `bumpUrl` | sales | #2 Sales + Vault $144 |
| `premiumUrl` | sales | #6 Done-With-You $497 (shared) |
| `checkoutUrl` | customer-engagement | #3 CE Standard $97 |
| `bumpUrl` | customer-engagement | #4 CE + Vault $144 |
| `premiumUrl` | customer-engagement | #6 Done-With-You $497 (shared) |

`trades.json` is `status: "coming-soon"` — no page is generated and its placeholders are ignored
by the launch check. Product #5 (Both-Kit Bundle $149) has no JSON field yet — it's a homepage /
cross-sell offer; add a `bundleUrl` field when you wire it.

## What's already wired (placeholders)
Every `TODO_PASTE_*` token was replaced with a clearly-labelled, self-documenting placeholder:

```
https://REPLACE.lemonsqueezy.com/buy/<kit>-<tier>-<price>
```

These are deliberately broken (`REPLACE` host) so nothing ships half-real.

## To go live (Phoenix)
1. Create the LS store + the 6 products above; upload the matching zip to each.
2. Copy each product's **hosted checkout URL** from LS.
3. Replace the 6 live placeholders in `sales.json` + `customer-engagement.json`
   (`checkoutUrl`, `bumpUrl`, `premiumUrl` × 2 kits).
4. Buy the domain → replace `https://yourloadout.com` in `astro.config.mjs`, `public/robots.txt`,
   `public/sitemap.xml`.
5. Run the gate: **`npm run check:launch`** — it must print `[OK]` before deploy.
6. `npm run build` → deploy `dist/` (Cloudflare Pages or Vercel, `NODE_VERSION=20`).
