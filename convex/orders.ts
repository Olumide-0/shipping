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

// Called by the Stripe webhook once payment is CONFIRMED (see convex/stripe.ts
// for which events qualify). Marks the order paid, records the shipping address
// Stripe collected, overwrites our estimated totals with Stripe's authoritative
// amounts, and empties the cart.
// Idempotent: Stripe can deliver a webhook more than once, so we no-op if the
// order is already past "pending".
export const fulfill = internalMutation({
  args: {
    stripeSessionId: v.string(),
    shippingAddress: v.optional(addressValidator),
    // What Stripe actually charged, in cents. Absent if Stripe didn't report
    // it, in which case the estimate written at session creation stands.
    // `subtotal`/`tax` stay as recorded: they are the pre-discount line
    // amounts, and subtotal + tax - discount === total.
    total: v.optional(v.number()),
    discount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_session", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId),
      )
      .unique();
    if (!order || order.status !== "pending") return;

    await ctx.db.patch(order._id, {
      status: "paid",
      ...(args.shippingAddress ? { shippingAddress: args.shippingAddress } : {}),
      ...(args.total !== undefined ? { total: args.total } : {}),
      ...(args.discount ? { discount: args.discount } : {}),
    });

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_user", (q) => q.eq("userId", order.userId))
      .unique();
    if (cart) await ctx.db.patch(cart._id, { items: [] });
  },
});

// Closes out an order that will never be paid: the Checkout Session expired
// without the customer finishing, or a delayed payment method (bank debit,
// etc.) came back declined. Without this, abandoned checkouts sit at "pending"
// forever. Only touches pending orders, so a paid order can't be un-paid by a
// late or duplicate event.
export const markUnpaid = internalMutation({
  args: {
    stripeSessionId: v.string(),
    status: v.union(v.literal("failed"), v.literal("expired")),
  },
  handler: async (ctx, { stripeSessionId, status }) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_session", (q) => q.eq("stripeSessionId", stripeSessionId))
      .unique();
    if (!order || order.status !== "pending") return;
    await ctx.db.patch(order._id, { status });
  },
});

// The signed-in user's order history, newest first, for /orders. Expired
// sessions (checkouts the customer abandoned) are hidden — they aren't orders
// the customer ever placed, so showing them would just be noise.
export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
    return orders.filter((o) => o.status !== "expired");
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
