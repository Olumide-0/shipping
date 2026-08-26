"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { formatPrice } from "@/lib/utils";

// How each order status reads to a customer, plus its badge colours.
const STATUS: Record<string, { label: string; className: string }> = {
  pending: { label: "Awaiting payment", className: "bg-amber-50 text-amber-700" },
  paid: { label: "Paid", className: "bg-[#EAF4F6] text-[#00677F]" },
  failed: { label: "Payment failed", className: "bg-red-50 text-red-600" },
  shipped: { label: "Shipped", className: "bg-[#EAF4F6] text-[#00677F]" },
  delivered: { label: "Delivered", className: "bg-[#EAF4F6] text-[#00677F]" },
};

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Orders() {
  const { isSignedIn } = useAuth();
  const orders = useQuery(api.orders.listMine);

  return (
    <div className="w-full bg-white px-5 py-28 md:px-12 md:py-28 lg:px-[80px] lg:py-[80px]">
      <div className="flex flex-col gap-1 mb-8 md:mb-10">
        <h1 className="text-[24px] md:text-[32px] font-bold text-[#1A1B1F]">Your Orders</h1>
        <p className="text-[13px] md:text-[14px] text-gray-400">
          Every order placed with your account, newest first.
        </p>
      </div>

      {isSignedIn === false ? (
        <div className="border border-dashed border-gray-300 rounded-2xl py-16 flex flex-col items-center gap-4">
          <p className="text-[14px] text-gray-500">Sign in to view your orders.</p>
          <SignInButton mode="modal">
            <button className="bg-[#00677F] hover:bg-[#005569] text-white text-[12px] font-bold tracking-widest px-8 py-3.5 rounded-xl transition-colors duration-200 cursor-pointer">
              SIGN IN
            </button>
          </SignInButton>
        </div>
      ) : orders === undefined ? (
        <p className="text-[14px] text-gray-400">Loading your orders…</p>
      ) : orders.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-2xl py-16 flex flex-col items-center gap-3">
          <Package size={26} strokeWidth={1.4} className="text-gray-300" />
          <p className="text-[14px] text-gray-500">You haven&apos;t placed an order yet.</p>
          <Link href="/collections" className="text-[13px] font-semibold text-[#00677F] hover:underline">
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const status = STATUS[order.status] ?? {
              label: order.status,
              className: "bg-gray-100 text-gray-600",
            };
            const itemCount = order.items.reduce((n, i) => n + i.quantity, 0);

            return (
              <Link
                key={order._id}
                href={`/order-confirmation?session_id=${order.stripeSessionId}`}
                className="group border border-gray-200 hover:border-gray-400 rounded-2xl p-5 md:p-6 flex flex-col gap-5 transition-colors duration-150"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2.5">
                      <p className="text-[14px] md:text-[16px] font-bold text-[#00677F]">
                        {order.orderNumber}
                      </p>
                      <span
                        className={`text-[10px] font-bold tracking-widest uppercase rounded-full px-2.5 py-1 ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-400">
                      {formatDate(order._creationTime)} · {itemCount}{" "}
                      {itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[18px] md:text-[20px] font-bold text-[#1A1B1F]">
                      {formatPrice(order.total)}
                    </span>
                    <ChevronRight
                      size={17}
                      strokeWidth={1.8}
                      className="text-gray-300 group-hover:text-[#1A1B1F] transition-colors duration-150"
                    />
                  </div>
                </div>

                {/* Item thumbnails */}
                <div className="flex items-center gap-3">
                  {order.items.slice(0, 5).map((item, i) => (
                    <div
                      key={i}
                      className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0"
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      )}
                    </div>
                  ))}
                  {order.items.length > 5 && (
                    <span className="text-[12px] text-gray-400">
                      +{order.items.length - 5} more
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
