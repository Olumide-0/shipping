"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";

// Upserts the Convex user record once the Clerk session is recognized by
// Convex, passing name/email from Clerk (the default JWT template omits them).
// Mounted app-wide inside the Convex provider. Renders nothing.
export function UserSync() {
  const { isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const store = useMutation(api.users.store);

  useEffect(() => {
    if (!isAuthenticated) return;
    const phone = user?.primaryPhoneNumber?.phoneNumber;
    void store({
      name: user?.fullName ?? undefined,
      email: user?.primaryEmailAddress?.emailAddress ?? undefined,
      phone: typeof phone === "string" ? phone : undefined,
    });
  }, [isAuthenticated, user, store]);

  return null;
}
