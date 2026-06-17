// Tells the Convex backend how to validate Clerk-issued JWTs.
// CLERK_JWT_ISSUER_DOMAIN is the Clerk "Frontend API URL"; it must be set
// as an environment variable on the CONVEX deployment (not just .env.local):
//   npx convex env set CLERK_JWT_ISSUER_DOMAIN https://your-app.clerk.accounts.dev
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ],
};
