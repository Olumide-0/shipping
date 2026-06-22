import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// The signed-in user's stored record (name/email/phone), or null when
// unauthenticated / not yet synced. Doubles as a proof that the Clerk
// session reaches Convex.
export const current = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db
      .query("users")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();
  },
});

// Upserts a Convex user record for the current Clerk identity. name/email are
// passed from the client (Clerk's useUser) because the default Convex JWT
// template omits them; falls back to any claims present. Patches existing
// records so they stay in sync.
export const store = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const name = args.name ?? identity.name ?? undefined;
    const email = args.email ?? identity.email ?? undefined;
    const phone = args.phone ?? undefined;

    const existing = await ctx.db
      .query("users")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .unique();

    if (existing) {
      if (
        existing.name !== name ||
        existing.email !== email ||
        (phone !== undefined && existing.phone !== phone)
      ) {
        await ctx.db.patch(existing._id, {
          name,
          email,
          ...(phone !== undefined ? { phone } : {}),
        });
      }
      return existing._id;
    }

    return await ctx.db.insert("users", {
      userId: identity.subject,
      name,
      email,
      phone,
    });
  },
});
