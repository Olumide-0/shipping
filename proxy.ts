import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 16 renamed the `middleware` convention to `proxy`. Clerk's handler is
// a default export, so this is the same handler under the new filename.
// Enables Clerk auth across the app. No routes are protected at the edge here;
// access control lives in the Convex functions (server-side identity checks).
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files, run on everything else.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
