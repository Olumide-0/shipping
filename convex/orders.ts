import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";

// Snapshot of a purchased line — copied off the product so the receipt stays
// accurate forever, even if the product later changes or is deleted.
const itemValidator = v.object({
  name: v.string(),
  price: v.number(), // cents, frozen at purchase time
  quantity: v.number(),
  image: v.string(),
});

const addressValidator = v.object({
  name: v.string(),
  line1: v.string(),
  line2: v.optional(v.string()),
  city: v.string(),
  postalCode: v.string(),
  country: v.string(),
});

// Created by the Stripe action right after a Checkout Session is opened, before
// the customer pays. Status starts "pending"; the webhook flips it to "paid".
export const createPending = internalMutation({
  args: {
    userId: v.string(),
    stripeSessionId: v.string(),
    items: v.array(itemValidator),
    subtotal: v.number(),
    tax: v.number(),
    total: v.number(),
  },
  handler: async (ctx, args) => {
    const orderNumber =
      "GA-" +
      Date.now().toString(36).toUpperCase().slice(-5) +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    return await ctx.db.insert("orders", {
      userId: args.userId,
      orderNumber,
      status: "pending",
      stripeSessionId: args.stripeSessionId,
      items: args.items,
      subtotal: args.subtotal,
      tax: args.tax,
      total: args.total,
    });
  },
});

// Called by the Stripe webhook on `checkout.session.completed`. Marks the order
// paid, records the shipping address Stripe collected, and empties the cart.
// Idempotent: Stripe can deliver a webhook more than once, so we no-op if the
// order is already past "pending".
export const fulfill = internalMutation({
  args: {
    stripeSessionId: v.string(),
    shippingAddress: v.optional(addressValidator),
  },
  handler: async (ctx, { stripeSessionId, shippingAddress }) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_session", (q) => q.eq("stripeSessionId", stripeSessionId))
      .unique();
    if (!order || order.status !== "pending") return;

    await ctx.db.patch(order._id, {
      status: "paid",
      ...(shippingAddress ? { shippingAddress } : {}),
    });

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_user", (q) => q.eq("userId", order.userId))
      .unique();
    if (cart) await ctx.db.patch(cart._id, { items: [] });
  },
});

// The order behind a Stripe session id, for the confirmation page. Scoped to
// the signed-in user so nobody can read someone else's order by guessing ids.
export const getBySession = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    const order = await ctx.db
      .query("orders")
      .withIndex("by_session", (q) => q.eq("stripeSessionId", sessionId))
      .unique();
    if (!order || order.userId !== identity.subject) return null;
    return order;
  },
});
