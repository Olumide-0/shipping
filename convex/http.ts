import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

// Stripe webhook endpoint. Reachable at:
//   {NEXT_PUBLIC_CONVEX_SITE_URL}/stripe/webhook
// We read the raw body + signature and hand both to a Node action that verifies
// the signature and finalises the order. A failed verification answers 400 so
// Stripe knows to retry.
http.route({
  path: "/stripe/webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const signature = req.headers.get("stripe-signature");
    if (!signature) return new Response("Missing signature", { status: 400 });

    const payload = await req.text();
    try {
      await ctx.runAction(internal.stripe.handleWebhook, { payload, signature });
    } catch (err) {
      console.error("Stripe webhook error:", err);
      return new Response("Webhook verification failed", { status: 400 });
    }
    return new Response(null, { status: 200 });
  }),
});

export default http;
