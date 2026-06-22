"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

export default function Collections() {
  // Live catalog. undefined while loading.
  const products = useQuery(api.products.list);

  return (
    <section className="w-full bg-white px-5 pt-24 pb-12 md:px-12 md:pt-32 md:pb-16 lg:px-[80px] lg:pt-[110px] lg:pb-[80px]">
      <div className="flex flex-col gap-[40px] lg:gap-[64px]">

        {/* Header */}
        <div className="flex flex-col gap-[15px]">
          <span className="text-[12px] font-bold text-[#00677F] bg-[#00677F1A]/60 rounded-full px-[12px] py-[4px] w-fit">
            CURATED SELECTION
          </span>
          <h1 className="text-[28px] md:text-[40px] font-semibold text-[#1A1B1F] leading-tight">
            The Collection
          </h1>
          <p className="text-[14px] md:text-[16px] text-[#3C494E] w-full md:w-[60%]">
            Premium automotive upgrades engineered for seamless integration. Browse the full range.
          </p>
        </div>

        {/* Loading */}
        {products === undefined ? (
          <p className="text-[14px] text-gray-400">Loading products…</p>
        ) : products.length === 0 ? (
          <p className="text-[14px] text-gray-400">No products available yet.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-[24px] lg:gap-y-[48px]">
            {products.map((product) => (
              <div key={product._id} className="flex flex-col gap-[8px]">
                {/* Image + info link to the detail page */}
                <Link href={`/collections/${product.slug}`} className="group flex flex-col gap-[8px]">
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {product.badge && (
                      <span className="absolute top-2 left-2 text-[9px] font-bold tracking-widest text-white bg-[#00677F] rounded-full px-2 py-1 uppercase">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] md:text-[12px] font-semibold tracking-widest text-[#3C494E] uppercase">
                      {product.category}
                    </p>
                    <p className="text-[16px] lg:text-[20px] font-medium text-[#1A1B1F] pt-[4px] leading-snug line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-[13px] lg:text-[14px] text-[#00677F] font-medium">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-[10px] pt-[8px]">
                  <AddToCartButton
                    productId={product._id}
                    className="flex-1 bg-[#1A1B1F] hover:bg-[#2d2e33] text-[#FAF8FE] text-[11px] text-center font-semibold tracking-widest py-[14px] rounded-md transition-colors duration-200 cursor-pointer"
                  />
                  <Link
                    href={`/collections/${product.slug}`}
                    className="w-[43px] h-[43px] flex items-center justify-center border border-gray-200 rounded-md hover:border-gray-400 transition-colors duration-200 shrink-0"
                    aria-label={`View ${product.name}`}
                  >
                    <Eye size={15} strokeWidth={1.6} className="text-gray-500" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
