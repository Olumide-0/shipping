"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, CircleCheck, Truck, Smartphone, Download, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

const star = "/asset/icons/Container (2).png";
const star1 = "/asset/icons/Container (3).png";

// Availability is read off the product; the rest are store-wide promises.
function perksFor(inStock: boolean) {
  return [
    inStock
      ? { icon: <CircleCheck size={16} strokeWidth={1.6} className="text-[#00677F]" />, label: "In Stock - Ready to Ship" }
      : { icon: <XCircle size={16} strokeWidth={1.6} className="text-gray-400" />, label: "Out of Stock - Back Soon" },
    { icon: <Truck size={16} strokeWidth={1.6} className="text-[#00677F]" />, label: "Free 2-Day Delivery" },
    { icon: <CircleCheck size={16} strokeWidth={1.6} className="text-[#00677F]" />, label: "2-Year Warranty" },
    { icon: <Smartphone size={16} strokeWidth={1.6} className="text-[#00677F]" />, label: "iOS & Android App" },
  ];
}

// PLACEHOLDER social proof. Reviews aren't modelled in Convex, so neither these
// quotes nor the "(128 Reviews)" rating below reflect real data — they need a
// `reviews` table and a write path before they can be presented as genuine.
const verifiedReviews = [
  { id: 1, stars: 5, quote: '"The installation was surprisingly clean. The fiber optics are so thin they look factory-installed on my Model S. The app is incredibly responsive."', initials: "JD", name: "Julian D.", tag: "Verified Purchase" },
  { id: 2, stars: 5, quote: '"Technical elegance at its best. The Arctic White setting matches the internal screens perfectly. Highly recommended for EV owners."', initials: "ML", name: "Marcus L.", tag: "Verified Purchase" },
  { id: 3, stars: 4, quote: '"Beautiful product. The setup takes some patience but the result is breathtaking. I love the automation features in the app."', initials: "SK", name: "Sarah K.", tag: "Verified Purchase" },
];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = useQuery(api.products.getBySlug, { slug });
  const related = (useQuery(api.products.list) ?? [])
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  // undefined = first paint before a color is picked; falls back to the
  // product's first image. Color variants are optional per product.
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [overrideImage, setOverrideImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

  if (product === undefined) {
    return <div className="w-full bg-white px-5 pt-32 pb-20 text-center text-gray-400">Loading…</div>;
  }

  if (product === null) {
    return (
      <div className="w-full bg-white px-5 pt-32 pb-20 flex flex-col items-center gap-4">
        <p className="text-[16px] text-gray-500">Product not found.</p>
        <Link href="/collections" className="text-[13px] font-semibold text-[#00677F] hover:underline">
          Back to Collections
        </Link>
      </div>
    );
  }

  const mainImage = overrideImage ?? product.images[activeThumb] ?? product.images[0];
  const specs = product.specs ?? [];
  const perks = perksFor(product.inStock);

  return (
    <div>
      <section className="w-full bg-white px-5 pt-22 pb-10 md:px-12 md:pt-32 md:pb-16 xl:px-[80px] xl:pt-[100px] xl:pb-[80px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mx-auto">

          {/* Left — Images */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-5 gap-2 md:gap-3">
              {product.images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => { setActiveThumb(i); setOverrideImage(null); }}
                  className={`relative aspect-square rounded-lg md:rounded-xl overflow-hidden bg-gray-100 border-2 transition-colors duration-150 ${
                    overrideImage === null && activeThumb === i ? "border-[#00677F]" : "border-transparent"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="20vw" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex-1 flex flex-col justify-center">

            <div className="flex flex-col gap-6 lg:gap-[30px]">
              <div className="flex flex-col gap-2 lg:gap-[10px]">

                {/* Reviews — PLACEHOLDER rating, see note above verifiedReviews */}
                <div className="flex items-center gap-1 md:gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <Image key={s} src={star} alt="" width={16} height={16} className="w-3.5 md:w-4" />
                  ))}
                  <Image src={star1} alt="" width={16} height={16} className="w-3.5 md:w-4" />
                  <span className="text-[12px] text-[#3C494E] font-semibold ml-1">4.5 out of 5</span>
                </div>

                {/* Title */}
                <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-semibold text-[#1A1B1F] leading-tight w-full lg:w-[90%]">
                  {product.name}
                </h1>

                {/* Price */}
                <p className="text-[20px] lg:text-[24px] font-medium text-[#00677F]">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="flex flex-col gap-5 lg:gap-[24px]">
                {/* Description */}
                <p className="text-[15px] lg:text-[18px] text-[#3C494E] w-full lg:w-[85%] leading-relaxed">
                  {product.description}
                </p>

                {/* Color Variants */}
                {product.colorVariants && product.colorVariants.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <p className="text-[12px] lg:text-[14px] font-medium tracking-widest text-[#3C494E]">
                      COLOR VARIANT
                    </p>
                    <div className="flex items-center gap-3">
                      {product.colorVariants.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => { setSelectedColor(color.name); setOverrideImage(color.image); }}
                          className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full border-2 transition-all duration-150 ${
                            selectedColor === color.name ? "border-[#00677F] scale-110" : "border-transparent"
                          }`}
                          style={{ backgroundColor: color.value }}
                          aria-label={`Select ${color.name}`}
                        />
                      ))}
                    </div>
                    {selectedColor && (
                      <p className="text-[12px] font-semibold text-[#1A1B1F]">{selectedColor}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-3 mt-6 lg:mt-[24px]">
              <p className="text-[12px] lg:text-[14px] font-medium tracking-widest text-[#3C494E]">
                QUANTITY
              </p>
              <div className="flex items-center gap-4 border border-gray-200 rounded-lg w-fit px-4 py-2">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-gray-400 hover:text-[#1A1B1F] transition-colors p-1 cursor-pointer">
                  <Minus size={14} />
                </button>
                <span className="text-[15px] font-medium text-[#1A1B1F] w-6 text-center">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="text-gray-400 hover:text-[#1A1B1F] transition-colors p-1 cursor-pointer">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:items-center gap-3 lg:gap-4 w-full lg:w-[85%] xl:w-[70%] my-6 lg:my-[24px]">
              <AddToCartButton
                productId={product._id}
                variant={selectedColor ?? undefined}
                quantity={quantity}
                inStock={product.inStock}
                className="md:w-[50%] w-full flex items-center justify-center gap-2 py-4 lg:py-[19px] bg-[#00677F] hover:bg-[#005569] disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-[13px] lg:text-[14px] font-medium tracking-widest rounded-[8px] transition-colors duration-200 cursor-pointer"
              >
                <ShoppingCart size={15} />
                ADD TO CART
              </AddToCartButton>
              <Link href="/cart" className="md:w-[50%]">
                <button className="w-full py-4 lg:py-[19px] border border-[#6C797F] hover:bg-gray-50 text-[#1A1B1F] text-[13px] lg:text-[14px] font-medium tracking-widest rounded-[8px] transition-colors duration-200 cursor-pointer">
                  VIEW CART
                </button>
              </Link>
            </div>

            {/* Perks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 lg:pt-[30px] border-t border-[#BBC9CF4D]">
              {perks.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="flex-shrink-0 text-[#00677F]">{icon}</span>
                  <span className="text-[13px] lg:text-[12px] font-semibold text-[#3C494E]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Details Section — whatever this product actually has */}
      {(specs.length > 0 || product.edgeNote) && (
        <section className="w-full bg-white px-5 py-8 md:px-12 md:py-12 lg:px-[80px] lg:py-16">
          <div>
            {/* Content */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-[64px]">

              {/* Left — Specs Table */}
              {specs.length > 0 && (
                <div className="w-full lg:w-1/2 flex flex-col">
                  <h2 className="text-[20px] md:text-[24px] font-medium text-[#1A1B1F] mb-6 lg:mb-[24px] pb-3 border-b border-gray-200">
                    Technical Details
                  </h2>
                  <div className="flex flex-col gap-4 lg:gap-[16px]">
                    {specs.map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 gap-4">
                        <span className="text-[14px] md:text-[16px] text-[#3C494E]">{label}</span>
                        <span className="text-[14px] md:text-[16px] font-semibold text-[#1A1B1F] text-right">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Right — Edge Card. Copy comes from the product doc, so one
                  product's blurb can't appear under another's name. */}
              {product.edgeNote && (
                <div className="w-full lg:w-1/2 flex items-start">
                  <div className="w-full bg-[#F4F3F8] rounded-xl md:rounded-2xl p-6 lg:p-[32px] flex flex-col gap-5 lg:gap-[24px]">
                    <h3 className="text-[20px] md:text-[24px] font-medium text-[#1A1B1F]">
                      {product.edgeNote.title}
                    </h3>
                    <p className="w-full xl:w-[85%] text-[15px] md:text-[16px] text-[#3C494E] leading-relaxed">
                      {product.edgeNote.body}
                    </p>

                    <button className="flex items-center gap-2 text-[13px] md:text-[14px] font-medium tracking-widest text-[#00677F] hover:text-[#005569] transition-colors w-fit mt-2 cursor-pointer">
                      <Download size={15} strokeWidth={2} />
                      DOWNLOAD MANUAL (PDF)
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* Verified Experiences */}
      <section className="w-full bg-white px-5 py-10 md:px-12 md:py-16 lg:px-[80px] lg:py-[80px]">
        <div className="flex flex-col gap-8 lg:gap-[48px]">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-2 lg:gap-[8px]">
              <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A1B1F]">
                Verified Experiences
              </h2>
              <p className="text-[14px] md:text-[16px] text-[#3C494E]">
                Real feedback from our premium community.
              </p>
            </div>
            <button className="text-[13px] md:text-[14px] font-medium tracking-widest text-[#00677F] hover:text-[#005569] transition-colors underline underline-offset-2 sm:pb-1 text-left sm:text-right cursor-pointer">
              WRITE A REVIEW
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[24px]">
            {verifiedReviews.map(({ id, quote, initials, name, tag }) => (
              <div
                key={id}
                className="border border-gray-200 rounded-xl md:rounded-2xl p-6 lg:p-[33px] flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-5 lg:gap-[26px]">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Image key={i} src={star} alt="" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5" />
                    ))}
                  </div>
                  <p className="text-[14px] md:text-[16px] text-[#1A1B1F] leading-relaxed italic xl:w-[85%]">
                    {quote}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E2DFE1] flex items-center justify-center flex-shrink-0">
                    <span className="text-[15px] md:text-[16px] font-bold text-[#636264]">
                      {initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#1A1B1F]">{name}</p>
                    <p className="text-[12px] font-semibold text-[#3C494E]">{tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Related products */}
      <section className="w-full bg-white px-5 py-10 md:px-12 md:py-16 lg:px-[80px] lg:py-[80px]">
        <div className="flex flex-col gap-6 lg:gap-[53px]">

          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A1B1F] leading-tight">
              Complement Your Drive
            </h2>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors duration-150">
                <ChevronLeft size={15} strokeWidth={1.8} className="text-[#1A1B1F]" />
              </button>
              <button className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors duration-150">
                <ChevronRight size={15} strokeWidth={1.8} className="text-[#1A1B1F]" />
              </button>
            </div>
          </div>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-[167px] scrollbar-hide snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0">
            {related.map((p) => (
              <Link
                href={`/collections/${p.slug}`}
                key={p._id}
                className="flex flex-col gap-3 lg:gap-[24px] cursor-pointer group w-[70vw] sm:w-[45vw] lg:w-auto flex-shrink-0 snap-start"
              >
                <div className="relative w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 70vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                <div className="flex flex-col gap-1 lg:gap-[4px]">
                  <p className="text-[10px] md:text-[12px] font-semibold tracking-widest text-[#3C494E] uppercase line-clamp-1">
                    {p.category}
                  </p>
                  <p className="text-[15px] md:text-[18px] lg:text-[24px] font-medium text-[#1A1B1F] leading-snug line-clamp-2">
                    {p.name}
                  </p>
                  <p className="text-[14px] md:text-[16px] text-[#3C494E] mt-1 md:mt-0">
                    {formatPrice(p.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
