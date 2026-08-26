"use client";

import { useState } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus, PlusCircle, ShieldCheck, CreditCard, MessageSquarePlus, Lock, Headphones, AlertCircle, TicketPercent } from "lucide-react";
import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { errorMessage, formatPrice } from "@/lib/utils";
import { calculateTotals } from "@/lib/pricing";
import type { Id } from "@/convex/_generated/dataModel";

export default function Cart() {
  const { isSignedIn } = useAuth();
  // undefined while loading; { items: [...] } once resolved. Lines come
  // enriched with live product data (name/price/image) from carts.get.
  const cart = useQuery(api.carts.get);
  const setQuantity = useMutation(api.carts.setQuantity);
  const removeItem = useMutation(api.carts.removeItem);
  const createCheckoutSession = useAction(api.stripe.createCheckoutSession);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const items = cart?.items ?? [];
  // A line can go out of stock while it sits in the cart. Checkout rejects
  // these server-side, so block the button and say which ones.
  const unavailable = items.filter((line) => !line.product.inStock);

  // Kick off Stripe-hosted checkout: create the session server-side, then send
  // the browser to Stripe's payment page.
  const handleCheckout = async () => {
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      const { url } = await createCheckoutSession({ origin: window.location.origin });
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setCheckingOut(false);
      setCheckoutError(
        errorMessage(err, "We couldn't start checkout. Please try again."),
      );
    }
  };

  // All money in cents until the moment we display it. Same helper the Stripe
  // action uses, so this estimate and the amount charged can't drift apart.
  const { subtotal, tax, total } = calculateTotals(
    items.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
  );

  const updateQuantity = (productId: Id<"products">, variant: string | undefined, quantity: number) => {
    // Floor at 1 here; deletion goes through the trash button.
    void setQuantity({ productId, variant, quantity: Math.max(1, quantity) });
  };

  return (
    <div className="w-full bg-white px-5 py-28 md:px-12 md:py-28 lg:px-[80px] lg:py-[80px] xl:py-[120px]">

      {/* Header */}
      <div className="flex flex-col gap-1 mb-8 md:mb-10">
        <h1 className="text-[24px] md:text-[32px] font-bold text-[#1A1B1F]">Shopping Cart</h1>
        <p className="text-[13px] md:text-[14px] text-gray-400">Review your premium automotive upgrades before secure checkout.</p>
      </div>

      {/* Signed out */}
      {isSignedIn === false ? (
        <div className="border border-dashed border-gray-300 rounded-2xl py-16 flex flex-col items-center gap-4">
          <p className="text-[14px] text-gray-500">Sign in to view your cart.</p>
          <SignInButton mode="modal">
            <button className="bg-[#00677F] hover:bg-[#005569] text-white text-[12px] font-bold tracking-widest px-8 py-3.5 rounded-xl transition-colors duration-200 cursor-pointer">
              SIGN IN
            </button>
          </SignInButton>
        </div>
      ) : cart === undefined ? (
        /* Loading */
        <p className="text-[14px] text-gray-400">Loading your cart…</p>
      ) : items.length === 0 ? (
        /* Empty */
        <div className="border border-dashed border-gray-300 rounded-2xl py-16 flex flex-col items-center gap-3">
          <PlusCircle size={26} strokeWidth={1.4} className="text-gray-300" />
          <p className="text-[14px] text-gray-500">Your cart is empty.</p>
          <Link href="/collections" className="text-[13px] font-semibold text-[#00677F] hover:underline">
            Browse Collections
          </Link>
        </div>
      ) : (
        /* Body */
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left — Cart Items */}
          <div className="w-full lg:w-[65%] flex flex-col gap-4">

            {items.map((line) => (
              <div key={line.productId + (line.variant ?? "")} className={`flex items-center gap-4 md:gap-5 border rounded-2xl p-4 md:p-5 ${line.product.inStock ? "border-gray-200" : "border-red-200 bg-red-50/30"}`}>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-900 shrink-0">
                  <Image
                    src={line.product.images[0]}
                    alt={line.product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                      {!line.product.inStock ? (
                        <span className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-red-600 bg-red-100 rounded-full px-2 py-0.5 w-fit uppercase">
                          <AlertCircle size={10} strokeWidth={2.2} />
                          OUT OF STOCK
                        </span>
                      ) : line.product.badge ? (
                        <span className="text-[9px] font-bold tracking-widest text-gray-500 bg-gray-100 rounded-full px-2 py-0.5 w-fit uppercase">
                          {line.product.badge}
                        </span>
                      ) : null}
                      <h3 className="text-[15px] md:text-[18px] font-semibold text-[#1A1B1F]">{line.product.name}</h3>
                      <p className="text-[12px] text-gray-400 hidden sm:block">{line.product.description}</p>
                    </div>
                    <button onClick={() => void removeItem({ productId: line.productId, variant: line.variant })} className="text-gray-400 hover:text-red-500 transition-colors duration-150 cursor-pointer">
                      <Trash2 size={17} strokeWidth={1.6} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-2 py-1 md:px-3 md:py-1.5 w-fit">
                      <button onClick={() => updateQuantity(line.productId, line.variant, line.quantity - 1)} className="text-gray-400 hover:text-[#1A1B1F] transition-colors cursor-pointer">
                        <Minus size={13} />
                      </button>
                      <span className="text-[13px] md:text-[14px] font-medium text-[#1A1B1F] w-5 text-center">{line.quantity}</span>
                      <button onClick={() => updateQuantity(line.productId, line.variant, line.quantity + 1)} className="text-gray-400 hover:text-[#1A1B1F] transition-colors cursor-pointer">
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="text-[16px] md:text-[20px] font-semibold text-[#00677F]">
                      {formatPrice(line.product.price * line.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Add More */}
            <div className="border border-dashed border-gray-300 rounded-2xl py-8 md:py-10 flex flex-col items-center gap-3">
              <PlusCircle size={26} strokeWidth={1.4} className="text-gray-300" />
              <p className="text-[13px] md:text-[14px] text-gray-500">Add more performance accessories to your build</p>
              <Link href="/collections" className="text-[13px] font-semibold text-[#00677F] hover:underline">
                Browse Collections
              </Link>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="w-full lg:w-[35%] flex flex-col gap-4 sticky top-5">

            <div className="border border-gray-200 rounded-2xl p-5 md:p-6 flex flex-col gap-5">
              <h2 className="text-[18px] md:text-[20px] font-bold text-[#1A1B1F]">Order Summary</h2>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-gray-500">Subtotal</span>
                  <span className="text-[14px] text-[#1A1B1F]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-gray-500">Estimated Shipping</span>
                  <span className="text-[14px] font-semibold text-[#00677F]">FREE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-gray-500">Taxes (Estimated)</span>
                  <span className="text-[14px] text-[#1A1B1F]">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-[16px] md:text-[18px] font-bold text-[#1A1B1F]">Total</span>
                <span className="text-[20px] md:text-[22px] font-bold text-[#1A1B1F]">{formatPrice(total)}</span>
              </div>

              {/* Promo codes are Stripe promotion codes, redeemed on Stripe's
                  own checkout page (allow_promotion_codes). Validating them
                  here would mean duplicating Stripe's coupon rules, so we point
                  customers at the field that actually applies the discount. */}
              <div className="flex items-start gap-2.5 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                <TicketPercent size={15} strokeWidth={1.7} className="text-[#00677F] shrink-0 mt-0.5" />
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  Got a promo code? Enter it at checkout — your discount is applied before payment.
                </p>
              </div>

              {checkoutError && (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <AlertCircle size={15} strokeWidth={1.8} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-red-600 leading-relaxed">{checkoutError}</p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={checkingOut || unavailable.length > 0}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#00677F] hover:bg-[#005569] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[12px] font-bold tracking-widest rounded-xl transition-colors duration-200 cursor-pointer"
              >
                {checkingOut
                  ? "REDIRECTING…"
                  : unavailable.length > 0
                    ? "REMOVE OUT-OF-STOCK ITEMS"
                    : "SECURE CHECKOUT"}
                <Lock size={14} />
              </button>

              <div className="flex flex-col items-center gap-3 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-4 text-gray-400">
                  <ShieldCheck size={20} strokeWidth={1.6} />
                  <CreditCard size={20} strokeWidth={1.6} />
                  <MessageSquarePlus size={20} strokeWidth={1.6} />
                </div>
                <p className="text-[10px] md:text-[11px] font-bold text-gray-400 text-center">Secure 256-bit SSL Encrypted Payment</p>
              </div>
            </div>

            {/* Need Help */}
            <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EAF4F6] flex items-center justify-center shrink-0">
                <Headphones size={18} strokeWidth={1.6} className="text-[#00677F]" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#1A1B1F]">Need help?</p>
                <p className="text-[12px] text-gray-400">Our concierge is available 24/7</p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
