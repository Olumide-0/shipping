"use node";

import Stripe from "stripe";
import { v, ConvexError } from "convex/values";
import { action, internalAction, type ActionCtx } from "./_generated/server";
import { api, internal } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";
import { TAX_LABEL, calculateTotals } from "../lib/pricing";

// Cart line as returned by carts.get (enriched with the live product doc).
type CartLine = {
  productId: Id<"products">;
  variant?: string;
  quantity: number;
  product: Doc<"products">;
};

// Both Stripe secrets live on the CONVEX deployment, not in .env.local — these
// functions run on Convex's servers, so Next.js env files are not in scope:
//   npx convex env set STRIPE_SECRET_KEY sk_test_...
//   npx convex env set STRIPE_WEBHOOK_SECRET whsec_...
// Fail loudly and specifically when they're missing, rather than letting the
// Stripe SDK throw something opaque about an invalid API key.
function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set on the Convex deployment. " +
        "Run: npx convex env set STRIPE_SECRET_KEY sk_test_...",
    );
  }
  return new Stripe(key);
}

function webhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error(
      "STRIPE_WEBHOOK_SECRET is not set on the Convex deployment. " +
        "Run: npx convex env set STRIPE_WEBHOOK_SECRET whsec_...",
    );
  }
  return secret;
}

// Creates a Stripe-hosted Checkout Session from the signed-in user's cart and
// pre-records a "pending" order keyed by the session id. Returns the URL to
// redirect the browser to. The webhook (below) finalises the order on payment.
export const createCheckoutSession = action({
  args: { origin: v.string() },
  handler: async (ctx, { origin }): Promise<{ url: string }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const cart: { items: CartLine[] } = await ctx.runQuery(api.carts.get, {});
    if (cart.items.length === 0) throw new ConvexError("Your cart is empty");

    // Last line of defence on availability: stock can sell out between the
    // page load that rendered the cart and the click that pays for it.
    const unavailable = cart.items.filter((l) => !l.product.inStock);
    if (unavailable.length > 0) {
      throw new ConvexError(
        `Out of stock: ${unavailable.map((l) => l.product.name).join(", ")}. ` +
          "Please remove these items to continue.",
      );
    }

    const stripe = stripeClient();

    // One Stripe line item per cart line. `unit_amount` is already in cents.
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: "usd",
          unit_amount: line.product.price,
          product_data: { name: line.product.name },
        },
      }));

    const { subtotal, tax, total } = calculateTotals(
      cart.items.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    );

    // Charge tax as its own line so the Stripe total matches our order total.
    // A real deployment should switch to Stripe Tax (`automatic_tax`), which
    // would also stop percentage promotion codes from discounting the tax line.
    if (tax > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: tax,
          product_data: { name: TAX_LABEL },
        },
      });
    }

    // No `payment_method_types` — omitting it enables Stripe's dynamic payment
    // methods (configured from the Dashboard) for best conversion.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      // Promotion codes are redeemed on Stripe's page against coupons defined
      // in the Dashboard. The webhook reconciles the discount back onto the
      // order, so the receipt shows what was actually charged.
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "NG"],
      },
      success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: { userId: identity.subject },
    });

    const items = cart.items.map((l) => ({
      name: l.product.name,
      price: l.product.price,
      quantity: l.quantity,
      image: l.product.images[0] ?? "",
    }));

    await ctx.runMutation(internal.orders.createPending, {
      userId: identity.subject,
      stripeSessionId: session.id,
      items,
      subtotal,
      tax,
      total,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL");
    return { url: session.url };
  },
});

// Pulls the shipping address Stripe collected during checkout into our shape.
function readShippingAddress(session: Stripe.Checkout.Session) {
  const shipping = session.collected_information?.shipping_details ?? null;
  if (!shipping) return undefined;
  const addr = shipping.address;
  return {
    name: shipping.name ?? session.customer_details?.name ?? "",
    line1: addr?.line1 ?? "",
    line2: addr?.line2 ?? undefined,
    city: addr?.city ?? "",
    postalCode: addr?.postal_code ?? "",
    country: addr?.country ?? "",
  };
}

// Marks the order paid using Stripe's authoritative amounts.
async function fulfillFromSession(
  ctx: ActionCtx,
  session: Stripe.Checkout.Session,
) {
  await ctx.runMutation(internal.orders.fulfill, {
    stripeSessionId: session.id,
    shippingAddress: readShippingAddress(session),
    total: session.amount_total ?? undefined,
    discount: session.total_details?.amount_discount ?? undefined,
  });
}

// Verifies a Stripe webhook payload and drives the order's status from it.
// Called from the HTTP route in convex/http.ts. Runs in Node so the Stripe
// SDK's signature verification works. Throws on a bad signature so the HTTP
// route can answer 400.
export const handleWebhook = internalAction({
  args: { payload: v.string(), signature: v.string() },
  handler: async (ctx, { payload, signature }): Promise<null> => {
    const stripe = stripeClient();

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret(),
    );

    switch (event.type) {
      // Fires as soon as checkout completes — which is NOT the same as being
      // paid. Card payments settle immediately (`payment_status: "paid"`), but
      // delayed methods (bank debits, some wallets) complete as "unpaid" and
      // settle later via async_payment_succeeded/failed. Only confirmed money
      // may flip an order to paid.
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.payment_status === "paid") {
          await fulfillFromSession(ctx, session);
        }
        break;
      }

      // A delayed payment method finally cleared.
      case "checkout.session.async_payment_succeeded": {
        await fulfillFromSession(ctx, event.data.object);
        break;
      }

      // A delayed payment method was declined. The order will never be paid.
      case "checkout.session.async_payment_failed": {
        await ctx.runMutation(internal.orders.markUnpaid, {
          stripeSessionId: event.data.object.id,
          status: "failed",
        });
        break;
      }

      // The customer abandoned checkout and Stripe expired the session (~24h).
      // Without this the pending order would linger indefinitely.
      case "checkout.session.expired": {
        await ctx.runMutation(internal.orders.markUnpaid, {
          stripeSessionId: event.data.object.id,
          status: "expired",
        });
        break;
      }
    }

    return null;
  },
});
