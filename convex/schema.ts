import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// All money is stored as integer CENTS (e.g. $499.00 -> 49900).
// Format to dollars only at display time. Stripe also expects cents.
export default defineSchema({
  // One row per Clerk user, upserted by <UserSync /> on sign-in. Holds the
  // name/email the default Convex JWT omits, so orders can carry a real
  // customer record without calling Clerk. Keyed by `userId` = Clerk
  // identity.subject — the same id used in carts/orders.
  users: defineTable({
    userId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  // The catalog. Single source of truth that replaces the hardcoded
  // product arrays scattered across the app pages.
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    description: v.string(),
    price: v.number(), // cents
    images: v.array(v.string()),
    colorVariants: v.optional(
      v.array(
        v.object({
          name: v.string(),
          value: v.string(), // hex color
          image: v.string(),
        }),
      ),
    ),
    specs: v.optional(
      v.array(v.object({ label: v.string(), value: v.string() })),
    ),
    inStock: v.boolean(),
    badge: v.optional(v.string()),
    // Long-form marketing blurb for the "Edge" card on the detail page. Per
    // product, so one product's copy can never render under another's name.
    edgeNote: v.optional(
      v.object({ title: v.string(), body: v.string() }),
    ),
  }).index("by_slug", ["slug"]),

  // One cart row per logged-in user. Stores only references + quantity;
  // names/prices are looked up live from `products` so a cart can never
  // show a stale price.
  carts: defineTable({
    userId: v.string(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        variant: v.optional(v.string()),
        quantity: v.number(),
      }),
    ),
  }).index("by_user", ["userId"]),

  // Written by the Stripe webhook after payment succeeds. Items are
  // SNAPSHOTTED (name/price/image copied) so a receipt stays accurate
  // forever, even if the product later changes or is deleted.
  orders: defineTable({
    userId: v.string(),
    orderNumber: v.string(),
    // "pending"  – session opened, payment not confirmed yet
    // "paid"     – webhook confirmed payment_status === "paid"
    // "failed"   – a delayed payment method ultimately declined
    // "expired"  – the customer never completed the Checkout Session
    // "shipped" | "delivered" – reserved for fulfilment, not written yet
    status: v.string(),
    stripeSessionId: v.string(),
    items: v.array(
      v.object({
        name: v.string(),
        price: v.number(), // cents, frozen at purchase time
        quantity: v.number(),
        image: v.string(),
      }),
    ),
    // Filled by the Stripe webhook once the customer completes the hosted
    // checkout (Stripe collects the address). Absent on a pending order.
    shippingAddress: v.optional(
      v.object({
        name: v.string(),
        line1: v.string(),
        line2: v.optional(v.string()),
        city: v.string(),
        postalCode: v.string(),
        country: v.string(),
      }),
    ),
    // Estimated at session-creation time from the cart, then overwritten with
    // Stripe's authoritative amounts once payment is confirmed (a promotion
    // code applied at checkout changes them).
    subtotal: v.number(),
    tax: v.number(),
    total: v.number(),
    discount: v.optional(v.number()), // cents off, from a Stripe promotion code
  })
    .index("by_user", ["userId"])
    .index("by_session", ["stripeSessionId"]),
});
