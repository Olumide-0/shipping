"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckIcon, TruckIcon, MapPinIcon, Loader2, XCircle } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatPrice } from "@/lib/utils";

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Confirmation() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // Auth-scoped lookup. Skip the query entirely if there's no session id.
  const order = useQuery(
    api.orders.getBySession,
    sessionId ? { sessionId } : "skip",
  );
  const recommendations = (useQuery(api.products.list) ?? []).slice(0, 4);

  // No session id in the URL — nothing to show.
  if (!sessionId) {
    return (
      <Centered>
        <p className="text-[16px] text-[#3C494E]">No order to display.</p>
        <Link href="/collections" className="text-[14px] font-semibold text-[#00677F] hover:underline">
          Continue shopping
        </Link>
      </Centered>
    );
  }

  // Loading.
  if (order === undefined) {
    return (
      <Centered>
        <Loader2 className="w-6 h-6 text-[#00677F] animate-spin" />
        <p className="text-[14px] text-[#3C494E]">Loading your order…</p>
      </Centered>
    );
  }

  // Not found / not yours.
  if (order === null) {
    return (
      <Centered>
        <p className="text-[16px] text-[#3C494E]">We couldn&apos;t find that order.</p>
        <Link href="/collections" className="text-[14px] font-semibold text-[#00677F] hover:underline">
          Continue shopping
        </Link>
      </Centered>
    );
  }

  // Order exists but the payment webhook hasn't landed yet. Convex is reactive,
  // so this view auto-swaps to the success (or failed) state the moment the
  // webhook flips the status — no refresh needed.
  const isPending = order.status === "pending";
  const isFailed = order.status === "failed";
  const firstName = order.shippingAddress?.name?.split(" ")[0];

  return (
    <main className="text-[12px] bg-white flex flex-col items-center px-5 py-22 md:px-12 lg:px-[80px] lg:py-[100px] font-sans">

      {/* Status Icon */}
      <div className={`flex items-center justify-center w-[56px] h-[56px] rounded-full mb-[24px] ${isFailed ? "bg-red-100" : "bg-[#00D1FF4D]/30"}`}>
        <div className={`flex items-center justify-center w-[40px] h-[40px] rounded-full ${isFailed ? "bg-red-500" : "bg-[#1a7a7a]"}`}>
          {isFailed ? (
            <XCircle className="w-[18px] h-[18px] text-white" strokeWidth={3} />
          ) : isPending ? (
            <Loader2 className="w-[18px] h-[18px] text-white animate-spin" strokeWidth={3} />
          ) : (
            <CheckIcon className="w-[18px] h-[18px] text-white" strokeWidth={3} />
          )}
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-[28px] md:text-[36px] xl:text-[60px] font-semibold text-[#0d1b2a] text-center leading-[1.1] mb-[12px]">
        {isFailed
          ? "Your payment didn't go through"
          : isPending
            ? "Finalising your order…"
            : `Thank you for your order${firstName ? `, ${firstName}` : ""}!`}
      </h1>
      <p className="text-[14px] lg:text-[18px] text-[#3C494E] text-center max-w-[660px] leading-[1.6] mb-[40px]">
        {isFailed
          ? "Your bank declined the payment, so this order hasn't been placed and you haven't been charged. Your items are still in your cart if you'd like to try again."
          : isPending
            ? "We're confirming your payment with Stripe. This page will update automatically — no need to refresh."
            : "Your high-performance upgrades are being prepared for dispatch. We've sent a confirmation email with all the details."}
      </p>

      {/* Main Card */}
      <div className="w-full flex flex-col lg:flex-row gap-6 items-start">

        {/* Left: Order Details */}
        <div className="w-full lg:w-[65%] border border-[#e5e7eb] rounded-[12px] p-5 md:p-[32px]">
          <div className="flex justify-between items-start mb-[24px]">
            <div>
              <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-[0.08em] mb-[4px]">Order Number</p>
              <p className="text-[14px] md:text-[16px] font-bold text-[#00677F]">{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-[0.08em] mb-[4px]">Date</p>
              <p className="text-[12px] md:text-[14px] font-semibold text-[#0d1b2a]">{formatDate(order._creationTime)}</p>
            </div>
          </div>

          <div className="border-t border-[#e5e7eb] mb-[24px]" />

          {/* Items */}
          <div className="flex flex-col gap-[20px]">
            {order.items.map((item, index) => (
              <div key={index}>
                <div className="flex items-start gap-[16px]">
                  <div className="relative w-[90px] h-[90px] rounded-[8px] overflow-hidden flex-shrink-0 bg-gray-100">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill sizes="90px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-[13px] md:text-[14px] font-semibold text-[#0d1b2a]">{item.name}</p>
                      <p className="text-[13px] md:text-[14px] font-semibold text-[#0d1b2a] ml-2">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <span className="inline-block mt-[10px] px-[10px] py-[3px] border border-[#e5e7eb] rounded-[4px] text-[#374151] text-[11px] font-medium">
                      QTY: {item.quantity}
                    </span>
                  </div>
                </div>
                {index < order.items.length - 1 && <div className="border-t border-[#e5e7eb] mt-[20px]" />}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-[14px] mt-[28px]">
            {/* Carrier tracking isn't modelled yet, so this goes to the order
                history rather than being a button that does nothing. */}
            <Link href="/orders" className="flex-1 flex items-center justify-center gap-[8px] bg-[#00677F] hover:bg-[#005569] text-white font-semibold py-[14px] px-[20px] rounded-[8px] transition-colors">
              <TruckIcon className="w-[16px] h-[16px]" /> VIEW MY ORDERS
            </Link>
            <Link href="/collections" className="flex-1 flex items-center justify-center gap-[8px] border border-[#d1d5db] hover:bg-[#f9fafb] text-[#374151] font-semibold py-[14px] px-[20px] rounded-[8px] transition-colors">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-full lg:w-[35%] flex-shrink-0 border border-[#e5e7eb] rounded-[12px] p-[24px] flex flex-col gap-[24px]">
          {order.shippingAddress && (
            <>
              <div>
                <div className="flex items-center gap-[6px] mb-[12px]">
                  <MapPinIcon className="w-[13px] h-[13px] text-[#1a7a7a]" />
                  <p className="text-[10px] font-semibold text-[#1a7a7a] uppercase tracking-[0.08em]">Shipping Address</p>
                </div>
                <p className="text-[14px] md:text-[15px] font-bold text-[#0d1b2a] mb-[6px]">{order.shippingAddress.name}</p>
                <p className="text-[12px] text-[#6b7280] leading-[1.7]">
                  {order.shippingAddress.line1}<br />
                  {order.shippingAddress.line2 && <>{order.shippingAddress.line2}<br /></>}
                  {order.shippingAddress.city} {order.shippingAddress.postalCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
              <div className="border-t border-[#e5e7eb]" />
            </>
          )}

          <div>
            <p className="text-[10px] font-semibold text-[#1a7a7a] uppercase tracking-[0.08em] mb-[14px]">Order Total</p>
            <div className="flex flex-col gap-[8px]">
              <div className="flex justify-between"><span className="text-[#6b7280]">Subtotal</span><span className="text-[#374151] font-medium">{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-[#6b7280]">Shipping</span><span className="text-[#374151] font-medium">Free</span></div>
              <div className="flex justify-between"><span className="text-[#6b7280]">Tax</span><span className="text-[#374151] font-medium">{formatPrice(order.tax)}</span></div>
              {/* Only present when a Stripe promotion code was redeemed. */}
              {order.discount ? (
                <div className="flex justify-between">
                  <span className="text-[#1a7a7a]">Discount</span>
                  <span className="text-[#1a7a7a] font-medium">−{formatPrice(order.discount)}</span>
                </div>
              ) : null}
            </div>
            <div className="border-t border-[#e5e7eb] mt-[14px] pt-[14px] flex justify-between items-center">
              <span className="text-[14px] md:text-[15px] font-bold text-[#0d1b2a]">Total</span>
              <span className="text-[16px] md:text-[18px] font-extrabold text-[#0d1b2a]">{formatPrice(order.total)}</span>
            </div>
            <p className="text-[11px] text-[#9ca3af] mt-[12px]">Paid securely via Stripe.</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className="w-full py-[80px] px-5 lg:px-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-[24px] md:text-[32px] font-semibold text-[#0d1b2a] leading-[1.2] mb-[4px]">
                Complete your setup
              </h2>
              <p className="text-[13px] md:text-[16px] text-[#3C494E]">Curated accessories for your vehicle.</p>
            </div>
            <Link href="/collections" className="text-[12px] md:text-[14px] text-[#00677F] hover:underline font-medium whitespace-nowrap">
              View All Recommendations
            </Link>
          </div>

          <div className="flex lg:grid lg:grid-cols-4 overflow-x-auto gap-4 lg:gap-6 scrollbar-hide snap-x -mx-5 px-5 lg:mx-0 lg:px-0 pb-6 lg:pb-0">
            {recommendations.map((item) => (
              <Link
                href={`/collections/${item.slug}`}
                key={item._id}
                className="cursor-pointer group flex-shrink-0 w-[240px] lg:w-full snap-start"
              >
                <div className="relative w-full aspect-square rounded-[8px] overflow-hidden mb-[14px] bg-gray-100">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 240px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <p className="text-[14px] md:text-[18px] font-semibold text-[#1A1B1F] leading-[1.3] mb-[4px]">
                  {item.name}
                </p>
                <p className="text-[13px] md:text-[16px] text-[#3C494E]">{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-white flex flex-col items-center justify-center gap-4 px-5 py-32 min-h-[60vh]">
      {children}
    </main>
  );
}

export default function OrderConfirmationPage() {
  // useSearchParams requires a Suspense boundary in the App Router.
  return (
    <Suspense fallback={<Centered><Loader2 className="w-6 h-6 text-[#00677F] animate-spin" /></Centered>}>
      <Confirmation />
    </Suspense>
  );
}
