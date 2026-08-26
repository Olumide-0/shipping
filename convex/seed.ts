import { internalMutation } from "./_generated/server";

// Pulled from the hardcoded arrays in app/page.tsx, app/collections/page.tsx,
// and app/order-confirmation/page.tsx. Prices are in CENTS.
const PRODUCTS = [
  {
    name: "Lumina Pro Kit",
    slug: "lumina-pro-kit",
    category: "TECH",
    description:
      "High-quality fiber optic lighting system designed for seamless integration. Control intensity and palette directly from your mobile device.",
    price: 50000,
    images: [
      "/asset/image/Lumina Pro Kit.png",
      "/asset/image/Container (11).png",
      "/asset/image/Container (12).png",
    ],
    colorVariants: [
      { name: "Neon Blue", value: "#22D3EE", image: "/asset/image/Container (11).png" },
      { name: "Arctic White", value: "#F3F4F6", image: "/asset/image/Background (4).png" },
      { name: "Crimson Red", value: "#EF4444", image: "/asset/image/Background (5).png" },
    ],
    specs: [
      { label: "Light Source", value: "SMD 5050 RGB LED" },
      { label: "Cable Length", value: "6 Meters (Trim-to-fit)" },
      { label: "Power Input", value: "DC 12V Automotive" },
      { label: "Connectivity", value: "Bluetooth 5.0 Low Energy" },
    ],
    inStock: true,
    badge: "BESTSELLER",
    // Was hardcoded into app/collections/[slug]/page.tsx, where it rendered
    // under every product's name. It only describes this one.
    edgeNote: {
      title: "The Luxedrive Edge",
      body: 'Our fiber optic cores are engineered for uniform light distribution without "hot spots." Unlike standard LED strips, Lumina Pro uses high-density glass polymers that remain flexible while maintaining optical clarity for over 10,000 hours of operation.',
    },
  },
  {
    name: "Carbon Fiber Wheel",
    slug: "carbon-fiber-wheel",
    category: "PERFORMANCE",
    description: "Lightweight carbon fiber wheel engineered for performance and elegance.",
    price: 200000,
    images: ["/asset/image/Background.png", "/asset/image/Container (9).png"],
    inStock: true,
  },
  {
    name: "Velocity Audio Kit",
    slug: "velocity-audio-kit",
    category: "AUDIO",
    description: "Premium in-car audio system tuned for high-fidelity sound.",
    price: 150000,
    images: ["/asset/image/Velocity Audio Kit.png", "/asset/image/Background (7).png"],
    inStock: true,
  },
  {
    name: "Stealth Wall Charger",
    slug: "stealth-wall-charger",
    category: "TECH",
    description: "Midnight Black | 48A Rapid Charge home charging station.",
    price: 100000,
    images: ["/asset/image/Container (10).png"],
    inStock: true,
  },
  {
    name: "Lumina Ambient Kit",
    slug: "lumina-ambient-kit",
    category: "TECH",
    description:
      "The definitive interior lighting experience. 64-color selection, smartphone integration, and dynamic music synchronization.",
    price: 10000,
    images: ["/asset/image/Container (1).png"],
    inStock: true,
    badge: "NEW ARRIVAL",
  },
  {
    name: "Apex HUD Display",
    slug: "apex-hud-display",
    category: "NAVIGATION",
    description: "Heads-up display projecting speed and navigation onto your windshield.",
    price: 20000,
    images: ["/asset/image/Container (8).png"],
    inStock: true,
  },
  {
    name: "Flux Wireless Charger",
    slug: "flux-wireless-charger",
    category: "TECH",
    description: "Fast wireless charging pad that mounts cleanly in your console.",
    // TEMPORARY: $1.00 so live-mode checkout can be tested end to end without
    // losing ~$1.75 in unrefundable Stripe fees. Restore to 5000 ($50) before
    // taking real orders, then re-run `npx convex run seed:run`.
    price: 100,
    images: ["/asset/image/Background (8).png"],
    inStock: true,
  },
];

// Run with: npx convex run seed:run
// INTERNAL on purpose: this deletes every product row before reloading, so it
// must not be reachable from the public API. The CLI can still invoke it, but
// a browser holding NEXT_PUBLIC_CONVEX_URL cannot.
// Idempotent: clears the products table, then reloads it.
export const run = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("products").collect();
    for (const p of existing) {
      await ctx.db.delete(p._id);
    }
    for (const p of PRODUCTS) {
      await ctx.db.insert("products", p);
    }
    return { inserted: PRODUCTS.length };
  },
});
