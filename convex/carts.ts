import { query, mutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { QueryCtx, MutationCtx } from "./_generated/server";

// Returns the signed-in user's id, or throws. Identity is verified by Convex
// from the Clerk JWT — never trust a client-supplied userId.
async function requireUserId(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  return identity.subject; // the Clerk user id
}

// The current user's cart, with each line enriched with live product data
// (name/price/image) so the UI never stores a stale price.
export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { items: [] }; // signed out -> empty cart
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();
    if (!cart) return { items: [] };

    const items = await Promise.all(
      cart.items.map(async (line) => {
        const product = await ctx.db.get(line.productId);
        if (!product) return null; // product was deleted; drop the line
        return { ...line, product };
      }),
    );
    return { items: items.filter((i) => i !== null) };
  },
});

// Add a product (or bump quantity if the same product+variant is already in).
export const addItem = mutation({
  args: {
    productId: v.id("products"),
    variant: v.optional(v.string()),
    quantity: v.optional(v.number()),
  },
  handler: async (ctx, { productId, variant, quantity }) => {
    const userId = await requireUserId(ctx);
    const qty = quantity ?? 1;

    // Availability is enforced here, not just hidden in the UI — the mutation
    // is callable directly, and stock can change between render and click.
    // ConvexError (rather than Error) so the message reaches the browser intact
    // and the UI can show the actual reason instead of "something went wrong".
    const product = await ctx.db.get(productId);
    if (!product) throw new ConvexError("That product no longer exists");
    if (!product.inStock) {
      throw new ConvexError(`${product.name} is out of stock`);
    }

    const cart = await ctx.db
      .query("carts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();

    if (!cart) {
      await ctx.db.insert("carts", {
        userId,
        items: [{ productId, variant, quantity: qty }],
      });
      return;
    }

    const items = [...cart.items];
    const idx = items.findIndex(
      (i) => i.productId === productId && i.variant === variant,
    );
    if (idx >= 0) {
      items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
    } else {
      items.push({ productId, variant, quantity: qty });
    }
    await ctx.db.patch(cart._id, { items });
  },
});

// Set an exact quantity for a line. Quantity <= 0 removes the line.
export const setQuantity = mutation({
  args: {
    productId: v.id("products"),
    variant: v.optional(v.string()),
    quantity: v.number(),
  },
  handler: async (ctx, { productId, variant, quantity }) => {
    const userId = await requireUserId(ctx);
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (!cart) return;

    const items = cart.items
      .map((i) =>
        i.productId === productId && i.variant === variant
          ? { ...i, quantity }
          : i,
      )
      .filter((i) => i.quantity > 0);
    await ctx.db.patch(cart._id, { items });
  },
});

// Remove a single line regardless of quantity.
export const removeItem = mutation({
  args: { productId: v.id("products"), variant: v.optional(v.string()) },
  handler: async (ctx, { productId, variant }) => {
    const userId = await requireUserId(ctx);
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (!cart) return;
    const items = cart.items.filter(
      (i) => !(i.productId === productId && i.variant === variant),
    );
    await ctx.db.patch(cart._id, { items });
  },
});

// Empty the cart. Called after a successful checkout.
export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUserId(ctx);
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .unique();
    if (cart) await ctx.db.patch(cart._id, { items: [] });
  },
});
