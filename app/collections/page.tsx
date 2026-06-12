"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, CircleCheck, Truck, Smartphone, Download, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";


const star = "/asset/icons/Container (2).png"
const star1 = "/asset/icons/Container (3).png"
const first = "/asset/image/AB6AXuAvUrC2jEIjqZYPUxJ9kofb0j6waM238GwMi-yO0hZQ--EEOfF2Bt6BaHqHD2zSKPeqvPcR0zLY3zfKlIG3KlXiGafrABYVUh4jQyfovF88FAPnu2l5cSQIGzSoLTXaR40_u5URonnQHqN0XwmtcfcUjwKmF7vHPMWekz4ETwi7wYI1K2N4FNV3A4quiAhEgE4rn2Rpq1BS-YPPfCs8nzHK1VZ7x-HBkYXipYnIBLTT.png"
const second = "/asset/image/AB6AXuAXDW8FrZ1RYMvglhp2Ox_iByEeGwPtxQ5ULoUzstPgeJvZc4fsaXr6iFHhzkAwaYpHIDD-kSAukokSy5bFI3z59ctgLVEAuPMRw0RuQflzX3PdB6lFQRJX8pXsBO1EiS-5k9-VfyNCS_VJ87LLm57A7KmcV16x2bUMQ7yUArtlB5CpG3iheGRw_hNnFxcm9iTRdXsSs7ppXVR4WFpw0eczxW7fUsoafwvG-L2pNN8n.png"
const third = "/asset/image/Background (7).png"
const fourth = "/asset/image/Background (8).png"


const colorVariants = [
  { name: "Neon Blue", value: "#22D3EE", src: "/asset/image/AB6AXuB955-0esBpWIa0NIL6Z4VK5hRWTz3Xdo9n_uzzkxPYEc3ZH-uwcs_rHJAYzlSA2AoKlbcZPSeESjehCg8742UmEoWYEVfEUI_d26P44q1njKcWLakzQ_TAkkaIuGlSIkE5Qzvci3hxM_82xyATLhTJcXiCKmUNfaSKVAVLMBr84acyi3puNIBJ6l86E6l6xuMBJ_TscUz1PMB5_Zvyi6NKGFlbVFjuiXm86n_FJCP6.png" },
  { name: "Arctic White", value: "#F3F4F6", src: "/asset/image/Background (4).png" },
  { name: "Crimson Red", value: "#EF4444", src: "/asset/image/Background (5).png" },
];

const thumbnails = [
  { id: 0, src: "/asset/image/AB6AXuB955-0esBpWIa0NIL6Z4VK5hRWTz3Xdo9n_uzzkxPYEc3ZH-uwcs_rHJAYzlSA2AoKlbcZPSeESjehCg8742UmEoWYEVfEUI_d26P44q1njKcWLakzQ_TAkkaIuGlSIkE5Qzvci3hxM_82xyATLhTJcXiCKmUNfaSKVAVLMBr84acyi3puNIBJ6l86E6l6xuMBJ_TscUz1PMB5_Zvyi6NKGFlbVFjuiXm86n_FJCP6.png" },
  { id: 1, src: "/asset/image/AB6AXuBCKBigtsCGvZdVgiaVbic-Awpb4D16VNJnoJPP69lbVfmwAmQ0g1SMlPUd0mzg-AcDU3BhLzCRzp0UvOsJvNZs-95_zdsqCBXf9HrePc5encc6QFEKL9lx_r_Me_iMgP6JZprqAPrN1nqQxtW88mCXGqupI-DY9VvGJVl41FmhrwcLltkSYURCFsnRjkPjLZhii7Qm3Y5TXvk6S4ooH2ivgZHjwKVyVE6trsccyl5I.png" },
  { id: 2, src: "/asset/image/Background (4).png" },
  { id: 3, src: "/asset/image/Background (5).png" },
  { id: 4, src: "/asset/image/Background (6).png" },
];

const perks = [
  { icon: <CircleCheck size={16} strokeWidth={1.6} className="text-[#00677F]" />, label: "In Stock - Ready to Ship" },
  { icon: <Truck size={16} strokeWidth={1.6} className="text-[#00677F]" />, label: "Free 2-Day Delivery" },
  { icon: <CircleCheck size={16} strokeWidth={1.6} className="text-[#00677F]" />, label: "2-Year Warranty" },
  { icon: <Smartphone size={16} strokeWidth={1.6} className="text-[#00677F]" />, label: "iOS & Android App" },
];
const verifiedReviews = [
  {
    id: 1,
    stars: 5,
    quote: '"The installation was surprisingly clean. The fiber optics are so thin they look factory-installed on my Model S. The app is incredibly responsive."',
    initials: "JD",
    name: "Julian D.",
    tag: "Verified Purchase",
  },
  {
    id: 2,
    stars: 5,
    quote: '"Technical elegance at its best. The Arctic White setting matches the internal screens perfectly. Highly recommended for EV owners."',
    initials: "ML",
    name: "Marcus L.",
    tag: "Verified Purchase",
  },
  {
    id: 3,
    stars: 4,
    quote: '"Beautiful product. The setup takes some patience but the result is breathtaking. I love the automation features in the app."',
    initials: "SK",
    name: "Sarah K.",
    tag: "Verified Purchase",
  },
];
const relatedProducts = [
  { id: 1, category: "PERFORMANCE", name: "Carbon Fiber Wheel", price: "$850.00", src: second },
  { id: 2, category: "AUDIO", name: "Velocity Audio Kit", price: "$1,200.00", src: third},
  { id: 3, category: "TECH", name: "Flux Wireless Charger", price: "$145.00", src: fourth },
  { id: 4, category: "NAVIGATION", name: "Apex HUD Display", price: "$399.00", src: first},
];

const tabs = ["SPECIFICATIONS", "INSTALLATION", "COMPATIBILITY"];

const tabContent = {
  SPECIFICATIONS: {
    title: "Technical Details",
    specs: [
      { label: "Light Source", value: "SMD 5050 RGB LED" },
      { label: "Cable Length", value: "6 Meters (Trim-to-fit)" },
      { label: "Power Input", value: "DC 12V Automotive" },
      { label: "Connectivity", value: "Bluetooth 5.0 Low Energy" },
    ],
  },
  INSTALLATION: {
    title: "Installation Details",
    specs: [
      { label: "Light Source", value: "SMD 5050 RGB LED" },
      { label: "Cable Length", value: "6 Meters (Trim-to-fit)" },
      { label: "Power Input", value: "DC 12V Automotive" },
      { label: "Connectivity", value: "Bluetooth 5.0 Low Energy" },
    ],
  },
  COMPATIBILITY: {
    title: "Compatibility Details",
    specs: [
      { label: "Light Source", value: "SMD 5050 RGB LED" },
      { label: "Cable Length", value: "6 Meters (Trim-to-fit)" },
      { label: "Power Input", value: "DC 12V Automotive" },
      { label: "Connectivity", value: "Bluetooth 5.0 Low Energy" },
    ],
  },
};

export default function Collection() {
  const [selectedColor, setSelectedColor] = useState(colorVariants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [mainImage, setMainImage] = useState(thumbnails[0].src);
  const [activeTab, setActiveTab] = useState("SPECIFICATIONS");

  return (
    <div>
      <section className="w-full bg-white px-5 pt-22 pb-10 md:px-12 md:pt-32 md:pb-16 xl:px-[80px] xl:pt-[100px] xl:pb-[80px]">
  <div className=" flex flex-col lg:flex-row gap-8 lg:gap-12  mx-auto">

    {/* Left — Images */}
    <div className="flex-1 flex flex-col gap-4">
      {/* Set an aspect ratio so the image doesn't stretch weirdly on different screens */}
      <div className="w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
        <img src={mainImage} alt="Product" className="w-full h-full object-cover" />
      </div>

      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {thumbnails.map((thumb, i) => (
          <button
            key={thumb.id}
            onClick={() => { setActiveThumb(i); setMainImage(thumb.src); }}
            className={`relative aspect-square rounded-lg md:rounded-xl overflow-hidden bg-gray-100 border-2 transition-colors duration-150 ${
              activeThumb === i ? "border-[#00677F]" : "border-transparent"
            }`}
          >
            <img src={thumb.src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>

    {/* Right — Info */}
    <div className="flex-1 flex flex-col justify-center">

      <div className="flex flex-col gap-6 lg:gap-[30px]">
        <div className="flex flex-col gap-2 lg:gap-[10px]">
          
          {/* Reviews */}
          <div className="flex items-center gap-1 md:gap-2">
            {[1, 2, 3, 4].map((s) => (
              <img key={s} src={star} alt="star" className="w-3.5 md:w-4" />
            ))}
            <img src={star1} alt="half-star" className="w-3.5 md:w-4" />
            <span className="text-[12px] text-[#3C494E] font-semibold ml-1">(128 Reviews)</span>
          </div>

          {/* Title */}
          <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-semibold text-[#1A1B1F] leading-tight w-full lg:w-[90%]">
            Lumina Pro Ambient Lighting
          </h1>

          {/* Price */}
          <p className="text-[20px] lg:text-[24px] font-medium text-[#00677F]">
            ${(199 * quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:gap-[24px]">
          {/* Description */}
          <p className="text-[15px] lg:text-[18px] text-[#3C494E] w-full lg:w-[85%] leading-relaxed">
            High-quality fiber optic lighting system designed for seamless integration. Control intensity and palette directly from your mobile device.
          </p>

          {/* Color Variants */}
          <div className="flex flex-col gap-3">
            <p className="text-[12px] lg:text-[14px] font-medium tracking-widest text-[#3C494E]">
              COLOR VARIANT
            </p>
            <div className="flex items-center gap-3">
              {colorVariants.map((color) => (
                <button
                  key={color.name}
                  onClick={() => { setSelectedColor(color); setMainImage(color.src); }}
                  className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full border-2 transition-all duration-150 ${
                    selectedColor.name === color.name ? "border-[#00677F] scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name}`}
                />
              ))}
            </div>
            <p className="text-[12px] font-semibold text-[#1A1B1F]">{selectedColor.name}</p>
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-3 mt-6 lg:mt-[24px]">
        <p className="text-[12px] lg:text-[14px] font-medium tracking-widest text-[#3C494E]">
          QUANTITY
        </p>
        <div className="flex items-center gap-4 border border-gray-200 rounded-lg w-fit px-4 py-2">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-gray-400 hover:text-[#1A1B1F] transition-colors p-1">
            <Minus size={14} />
          </button>
          <span className="text-[15px] font-medium text-[#1A1B1F] w-6 text-center">{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)} className="text-gray-400 hover:text-[#1A1B1F] transition-colors p-1">
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-4 w-full lg:w-[85%] xl:w-[70%] my-6 lg:my-[24px]">
        <Link href="/cart" className="w-[50%]">
        <button className="w-full flex items-center justify-center gap-2  py-4 lg:py-[19px] bg-[#00677F] hover:bg-[#005569] text-white text-[13px] lg:text-[14px] font-medium tracking-widest rounded-[8px] transition-colors duration-200">
          <ShoppingCart size={15} />
          ADD TO CART
        </button>
        </Link>
        <Link href="/checkout" className="w-[50%]">
        <button className="w-full py-4 lg:py-[19px] border border-[#6C797F] hover:bg-gray-50 text-[#1A1B1F] text-[13px] lg:text-[14px] font-medium tracking-widest rounded-[8px] transition-colors duration-200">
          BUY NOW
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

      {/* Specifications Section */}
      <section className="w-full bg-white px-5 py-8 md:px-12 md:py-12 lg:px-[80px] lg:py-16">
  <div className="">
    
    {/* Tabs */}
    {/* Added overflow-x-auto and whitespace-nowrap so tabs can be swiped on mobile */}
    <div className="flex items-center gap-6 md:gap-10 border-b border-gray-200 mb-8 md:mb-10 overflow-x-auto scrollbar-hide whitespace-nowrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-3 text-[13px] md:text-[14px] font-medium tracking-widest transition-colors duration-150 flex-shrink-0 ${
            activeTab === tab
              ? "text-[#1A1B1F] border-b-2 border-[#00677F]"
              : "text-[#3C494E] hover:text-[#3C494E]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Content */}
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-[64px]">

      {/* Left — Specs Table */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <h2 className="text-[20px] md:text-[24px] font-medium text-[#1A1B1F] mb-6 lg:mb-[24px]">
          {tabContent[activeTab as keyof typeof tabContent].title}
        </h2>
        <div className="flex flex-col gap-4 lg:gap-[16px]">
          {tabContent[activeTab as keyof typeof tabContent].specs.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 gap-4">
              <span className="text-[14px] md:text-[16px] text-[#3C494E]">{label}</span>
              <span className="text-[14px] md:text-[16px] font-semibold text-[#1A1B1F] text-right">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Edge Card */}
      <div className="w-full lg:w-1/2 flex items-start">
        <div className="w-full bg-[#F4F3F8] rounded-xl md:rounded-2xl p-6 lg:p-[32px] flex flex-col gap-5 lg:gap-[24px]">
          <h3 className="text-[20px] md:text-[24px] font-medium text-[#1A1B1F]">
            The Luxedrive Edge
          </h3>
          <p className="w-full xl:w-[85%] text-[15px] md:text-[16px] text-[#3C494E] leading-relaxed">
            Our fiber optic cores are engineered for uniform light distribution without "hot spots." Unlike standard LED strips, Lumina Pro uses high-density glass polymers that remain flexible while maintaining optical clarity for over 10,000 hours of operation.
          </p>
          
          <button className="flex items-center gap-2 text-[13px] md:text-[14px] font-medium tracking-widest text-[#00677F] hover:text-[#005569] transition-colors w-fit mt-2">
            <Download size={15} strokeWidth={2} />
            DOWNLOAD MANUAL (PDF)
          </button>
        </div>
      </div>

    </div>
  </div>
</section>
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
      <button className="text-[13px] md:text-[14px] font-medium tracking-widest text-[#00677F] hover:text-[#005569] transition-colors underline underline-offset-2 sm:pb-1 text-left sm:text-right">
        WRITE A REVIEW
      </button>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[24px]">
      {verifiedReviews.map(({ id, stars, quote, initials, name, tag }) => (
        <div 
          key={id} 
          className="border border-gray-200 rounded-xl md:rounded-2xl p-6 lg:p-[33px] flex flex-col justify-between gap-6"
        >
          <div className="flex flex-col gap-5 lg:gap-[26px]">
            {/* Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <img key={i} src={star} alt="star" className="w-4 h-4 md:w-5 md:h-5" />
              ))}
            </div>
            {/* Quote - Removed w-[85%] to let text flow naturally */}
            <p className="text-[14px] md:text-[16px] text-[#1A1B1F] leading-relaxed italic xl:w-[85%]">
              {quote}
            </p>
          </div>

          {/* Author */}
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
<section className="w-full bg-white px-5 py-10 md:px-12 md:py-16 lg:px-[80px] lg:py-[80px]">
  <div className="flex flex-col gap-6 lg:gap-[53px]">

    {/* Header */}
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

    {/* Products Row (Scrollable on mobile, Fixed Columns on desktop) */}
    <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 lg:gap-5 lg:gap-6 mb-12 lg:mb-[167px] scrollbar-hide snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0">
      {relatedProducts.map(({ id, category, name, price, src }) => (
        <div 
          key={id} 
          className="flex flex-col gap-3 lg:gap-[24px] cursor-pointer group w-[70vw] sm:w-[45vw] lg:w-auto flex-shrink-0 snap-start"
        >
          
          <div className="w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
            <img 
              src={src} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
            />
          </div>
          
          <div className="flex flex-col gap-1 lg:gap-[4px]">
            <p className="text-[10px] md:text-[12px] font-semibold tracking-widest text-[#3C494E] uppercase line-clamp-1">
              {category}
            </p>
            <p className="text-[15px] md:text-[18px] lg:text-[24px] font-medium text-[#1A1B1F] leading-snug line-clamp-2">
              {name}
            </p>
            <p className="text-[14px] md:text-[16px] text-[#3C494E] mt-1 md:mt-0">
              {price}
            </p>
          </div>

        </div>
      ))}
    </div>

  </div>
</section>
    </div>
  );
}