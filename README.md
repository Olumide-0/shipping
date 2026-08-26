# Genesis Automods

A storefront built on Next.js 16 (App Router), [Convex](https://convex.dev) for
the backend, [Clerk](https://clerk.com) for auth, and Stripe-hosted Checkout for
payments. Tailwind v4 + shadcn/ui for the UI.

## Running locally

```bash
npm install
npx convex dev        # in one terminal: pushes convex/ and generates types
npm run dev           # in another
```

## Environment variables

Variables live in **two** places, and mixing them up is the most common setup
failure. Next.js reads `.env.local`; Convex functions run on Convex's servers
and only see variables set on the deployment.

### `.env.local` (the browser / Next.js server)

| Variable | Where to find it |
| --- | --- |
| `CONVEX_DEPLOYMENT` | written by `npx convex dev` |
| `NEXT_PUBLIC_CONVEX_URL` | written by `npx convex dev` |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | same as the Convex URL with `.cloud` → `.site`; the webhook host |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk dashboard → API keys |
| `CLERK_SECRET_KEY` | Clerk dashboard → API keys |
| `CLERK_FRONTEND_API_URL` | Clerk dashboard → API keys ("Frontend API URL") |

### On the Convex deployment (`npx convex env set NAME value`)

These are **not** read from `.env.local` — `convex/stripe.ts` and
`convex/auth.config.ts` run on Convex, so they must be set there or checkout and
auth will fail:

```bash
npx convex env set CLERK_JWT_ISSUER_DOMAIN https://your-app.clerk.accounts.dev
npx convex env set STRIPE_SECRET_KEY       sk_test_...
npx convex env set STRIPE_WEBHOOK_SECRET   whsec_...
```

`npx convex env list` shows what's currently set. If `STRIPE_SECRET_KEY` or
`STRIPE_WEBHOOK_SECRET` is missing, checkout throws an error naming the exact
variable rather than failing obscurely inside the Stripe SDK.

## Stripe webhook

The order is only marked paid by the webhook, so it must be reachable:

- **Endpoint:** `{NEXT_PUBLIC_CONVEX_SITE_URL}/stripe/webhook`
- **Events:** `checkout.session.completed`,
  `checkout.session.async_payment_succeeded`,
  `checkout.session.async_payment_failed`, `checkout.session.expired`
- **Locally:** `stripe listen --forward-to <that URL>` and use the `whsec_` it
  prints as `STRIPE_WEBHOOK_SECRET`.

Promotion codes are Stripe coupons (`allow_promotion_codes` is on), redeemed on
Stripe's checkout page; the webhook writes the resulting discount back onto the
order.

## Seeding the catalog

The product catalog lives in Convex. `convex/seed.ts` is an **internal**
mutation (it clears the table first, so it must not be publicly callable) and is
run from the CLI:

```bash
npx convex run seed:run
```

## Useful scripts

```bash
npm run dev         # Next.js dev server
npm run build       # production build
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run format      # prettier --write
```
