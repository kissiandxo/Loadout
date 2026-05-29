# LEMON SQUEEZY — SETUP (do this to go live)

Goal: stand up the store, get 6 checkout URLs, paste them into the site, pass the launch gate.

## 1. Account + store
1. lemonsqueezy.com → sign up → create a **Store** named `LOADOUT`.
2. Verify email. Settings → **Payouts**: connect bank/Stripe. Settings → **Store**: confirm
   Merchant-of-Record is on (default) — they collect + remit AU GST / global VAT for you.

## 2. Create 6 products (Products → + New → Digital product)
Upload the matching zip from `C:\Users\PhoenixJennings\loadout\product\*\dist\`:

| # | Product name | Price | File to upload |
|---|--------------|-------|----------------|
| 1 | The Sales Loadout — Standard | $97 | `the-sales-loadout-v1.zip` |
| 2 | The Sales Loadout + Vault | $144 | `the-sales-loadout-with-vault-v1.zip` |
| 3 | The Customer Engagement Loadout — Standard | $97 | `the-customer-engagement-loadout-v1.zip` |
| 4 | The Customer Engagement Loadout + Vault | $144 | `the-customer-engagement-loadout-with-vault-v1.zip` |
| 5 | Both-Kit Bundle (Sales + Customer Engagement) | $149 | both Standard zips |
| 6 | Done-With-You Setup Call | $497 | no file — deliver a Calendly/booking link |

Currency: **USD**. Cover image: use `brand/gumroad/gumroad-cover-*.png`.

## 3. Get the checkout URLs
Each product → **Share** → copy the hosted checkout link (looks like
`https://loadout.lemonsqueezy.com/buy/xxxxxxxx`).

## 4. Paste URLs into the site
Edit `src/content/bundles/sales.json` + `customer-engagement.json` — replace the
`REPLACE.lemonsqueezy.com` placeholders:

| JSON field | Product |
|------------|---------|
| sales `checkoutUrl` | #1 |
| sales `bumpUrl` | #2 |
| sales `premiumUrl` | #6 |
| customer-engagement `checkoutUrl` | #3 |
| customer-engagement `bumpUrl` | #4 |
| customer-engagement `premiumUrl` | #6 |

(#5 bundle = homepage cross-sell later; trades.json stays coming-soon.)

## 5. Gate
`npm run check:launch` → must print **[OK]**. (Will still flag `yourloadout.com` until the
domain is bought — that's the other blocker.)

## 6. Ship
`npm run build` → deploy `dist/` to Cloudflare Pages or Vercel (`NODE_VERSION=20`).
