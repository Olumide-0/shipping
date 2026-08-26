"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

// One button, three behaviours:
//  - out of stock -> inert, labelled so
//  - signed out   -> opens the Clerk sign-in modal, then adds the item the
//                    visitor originally clicked once the session lands (the
//                    cart lives server-side, so an identity is required first)
//  - signed in    -> calls carts.addItem and briefly flips the label to confirm
// Styling is fully controlled by the caller via `className`/`children` so the
// same component works for the mobile and desktop product cards.
export function AddToCartButton({
  productId,
  variant,
  quantity = 1,
  className,
  children = "ADD TO CART",
  inStock = true,
}: {
  productId: Id<"products">;
  variant?: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
  inStock?: boolean;
}) {
  const { isSignedIn } = useAuth();
  const addItem = useMutation(api.carts.addItem);
  const [added, setAdded] = useState(false);
  const [failed, setFailed] = useState(false);
  // Set when a signed-out visitor clicks add, replayed once Clerk reports a
  // session so the click isn't silently thrown away by the sign-in detour.
  const pendingAdd = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const flash = useCallback((setter: (v: boolean) => void) => {
    setter(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setter(false), 1500);
  }, []);

  const add = useCallback(async () => {
    try {
      await addItem({ productId, variant, quantity });
      flash(setAdded);
    } catch (err) {
      // Most likely the item sold out between render and click; the mutation
      // rejects server-side. Surface it rather than pretending it worked.
      console.error(err);
      flash(setFailed);
    }
  }, [addItem, productId, variant, quantity, flash]);

  useEffect(() => {
    if (!isSignedIn || !pendingAdd.current) return;
    pendingAdd.current = false;
    void add();
  }, [isSignedIn, add]);

  if (!inStock) {
    return (
      <button className={className} disabled aria-disabled="true">
        OUT OF STOCK
      </button>
    );
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        {/* Remember the intent; the effect above completes it after sign-in. */}
        <button className={className} onClick={() => (pendingAdd.current = true)}>
          {children}
        </button>
      </SignInButton>
    );
  }

  return (
    <button className={className} onClick={() => void add()}>
      {failed ? "UNAVAILABLE" : added ? "ADDED ✓" : children}
    </button>
  );
}
