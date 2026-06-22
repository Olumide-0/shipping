"use client";

import { useState } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

// One button, two behaviours:
//  - signed out -> opens the Clerk sign-in modal (cart lives server-side, so we
//    need an identity before adding anything)
//  - signed in  -> calls carts.addItem and briefly flips the label to confirm
// Styling is fully controlled by the caller via `className`/`children` so the
// same component works for the mobile and desktop product cards.
export function AddToCartButton({
  productId,
  variant,
  quantity = 1,
  className,
  children = "ADD TO CART",
}: {
  productId: Id<"products">;
  variant?: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const { isSignedIn } = useAuth();
  const addItem = useMutation(api.carts.addItem);
  const [added, setAdded] = useState(false);

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button className={className}>{children}</button>
      </SignInButton>
    );
  }

  async function handleClick() {
    await addItem({ productId, variant, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button className={className} onClick={handleClick}>
      {added ? "ADDED ✓" : children}
    </button>
  );
}
