"use node";

import Stripe from "stripe";
import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { api, internal } from "./_generated/api";
import type { Doc, Id } from "./_generated/dataModel";

// Cart line as returned by carts.get (enriched with the live product doc).
type CartLine = {
  productId: Id<"products">;
  variant?: string;
  quantity: number;
  product: Doc<"products">;
};

// Creates a Stripe-hosted Checkout Session from the signed-in user's cart and
// pre-records a "pending" order keyed by the session id. Returns the URL to
// redirect the browser to. The webhook (below) finalises the order on payment.
export const createCheckoutSession = action({
  args: { origin: v.string() },
  handler: async (ctx, { origin }): Promise<{ url: string }> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const cart: { items: CartLine[] } = await ctx.runQuery(api.carts.get, {});
    if (cart.items.length === 0) throw new Error("Your cart is empty");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

    const subtotal = cart.items.reduce(
      (sum, l) => sum + l.product.price * l.quantity,
      0,
    );
    const tax = Math.round(subtotal * 0.0825);
    const total = subtotal + tax;

    // Charge tax as its own line so the Stripe total matches our order total.
    // (A real deployment would use Stripe Tax instead of a flat rate.)
    if (tax > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: tax,
          product_data: { name: "Estimated Sales Tax (8.25%)" },
        },
      });
    }

    // No `payment_method_types` — omitting it enables Stripe's dynamic payment
    // methods (configured from the Dashboard) for best conversion.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
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

// Verifies a Stripe webhook payload and, on a completed checkout, finalises the
// order. Called from the HTTP route in convex/http.ts. Runs in Node so the
// Stripe SDK's signature verification works. Throws on a bad signature so the
// HTTP route can answer 400.
export const handleWebhook = internalAction({
  args: { payload: v.string(), signature: v.string() },
  handler: async (ctx, { payload, signature }): Promise<null> => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const shipping = session.collected_information?.shipping_details ?? null;
      const addr = shipping?.address;

      const shippingAddress = shipping
        ? {
            name: shipping.name ?? session.customer_details?.name ?? "",
            line1: addr?.line1 ?? "",
            line2: addr?.line2 ?? undefined,
            city: addr?.city ?? "",
            postalCode: addr?.postal_code ?? "",
            country: addr?.country ?? "",
          }
        : undefined;

      await ctx.runMutation(internal.orders.fulfill, {
        stripeSessionId: session.id,
        shippingAddress,
      });
    }

    return null;
  },
});
