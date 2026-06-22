"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ReactNode } from "react";

import { UserSync } from "@/components/auth/user-sync";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Bridges Clerk auth into Convex: Convex queries/mutations now run with the
// signed-in user's identity, so ctx.auth.getUserIdentity() works server-side.
// UserSync (mounted inside the Convex provider) upserts the user record on
// sign-in.
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <UserSync />
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
