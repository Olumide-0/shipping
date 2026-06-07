"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, CircleCheck, Truck, Smartphone, Download, ChevronLeft, ChevronRight } from "lucide-react";


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
      <section className="w-full bg-white px-[80px] pt-[100px] pb-[80px]">
        <div className="flex flex-col md:flex-row gap-12">

          {/* Left — Images */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full  rounded-2xl overflow-hidden bg-gray-100">
              <img src={mainImage} alt="Product" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-5 gap-3">
              {thumbnails.map((thumb, i) => (
                <button
                  key={thumb.id}
                  onClick={() => { setActiveThumb(i); setMainImage(thumb.src); }}
                  className={`relative aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 transition-colors duration-150 ${
                    activeThumb === i ? "border-[#00677F]" : "border-transparent"
                  }`}
                >
                  <img src={thumb.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex-1 flex flex-col">

           <div className="flex flex-col gap-[30px]">
             <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((s) => (
                <img key={s} src={star} alt="" className="w-4" />
              ))}
              <img src={star1} alt="" className="w-4" />
              <span className="text-[12px] text-[#3C494E] font-semibold">(128 Reviews)</span>
            </div>

            <h1 className="text-[64px] font-semibold text-[#1A1B1F] leading-tight w-[60%]">
              Lumina Pro Ambient Lighting
            </h1>

            <p className="text-[24px] font-medium text-[#00677F]">
              ${(199 * quantity).toFixed(2)}
            </p>
            </div>

            <div className="flex flex-col gap-[24px]">
              <p className="text-[18px] text-[#3C494E] w-[62%] leading-relaxed">
              High-quality fiber optic lighting system designed for seamless integration. Control intensity and palette directly from your mobile device.
            </p>

            <div className="flex flex-col gap-3">
              <p className="text-[14px] font-medium tracking-widest text-[#3C494E]">COLOR VARIANT</p>
              <div className="flex items-center gap-3">
                {colorVariants.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => { setSelectedColor(color); setMainImage(color.src); }}
                    className={`w-9 h-9 rounded-full border-2 transition-all duration-150 ${
                      selectedColor.name === color.name ? "border-[#00677F] scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
              <p className="text-[12px] font-semibold text-[#1A1B1F]">{selectedColor.name}</p>
            </div>
            </div>

           </div>
            <div className="flex flex-col gap-3 mt-[24px]">
              <p className="text-[14px] font-medium tracking-widest text-[#3C494E]">QUANTITY</p>
              <div className="flex items-center gap-4 border border-gray-200 rounded-lg w-fit px-4 py-2">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-gray-400 hover:text-[#1A1B1F] transition-colors">
                  <Minus size={14} />
                </button>
                <span className="text-[15px] font-medium text-[#1A1B1F] w-6 text-center">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="text-gray-400 hover:text-[#1A1B1F] transition-colors">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 w-[60%] my-[24px]">
              <button className="flex items-center justify-center gap-2 w-full py-[19px] bg-[#00677F] hover:bg-[#005569] text-white text-[14px] font-medium tracking-widest rounded-[8px] transition-colors duration-200">
                <ShoppingCart size={15} />
                ADD TO CART
              </button>
              <button className="w-full py-[19px] border border-[#6C797F]  text-[#1A1B1F] text-[14px] font-medium tracking-widest rounded-[8px] transition-colors duration-200">
                BUY NOW
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-[30px] border border-t-[#BBC9CF4D]">
              {perks.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 -[21px] h-[15px]">
                  {icon}
                  <span className="text-[12px] font-semibold text-[#3C494E] w">{label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="w-full bg-white px-[80px] py-12">

        {/* Tabs */}
        <div className="flex items-center gap-10 border-b border-gray-200 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[14px] font-medium tracking-widest transition-colors duration-150 ${
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
        <div className="flex gap-[64px]">

          {/* Left — Specs Table */}
          <div className="w-[50%] flex flex-col">
            <h2 className="text-[24px] font-medium text-[#1A1B1F] mb-[24px]">
              {tabContent[activeTab as keyof typeof tabContent].title}
            </h2>
            <div className="flex flex-col gap-[16px]">
              {tabContent[activeTab as keyof typeof tabContent].specs.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-[16px] text-[#3C494E]">{label}</span>
                  <span className="text-[16px] font-semibold text-[#1A1B1F]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Edge Card */}
          <div className="w-[50%] flex items-start">
            <div className="w-full bg-[#F4F3F8] rounded-2xl p-[32px] flex flex-col gap-[24px]">
              <h3 className="text-[24px] font-medium text-[#1A1B1F]">The Luxedrive Edge</h3>
              <p className="w-[69%] text-[16px] text-[#3C494E] leading-relaxed">
                Our fiber optic cores are engineered for uniform light distribution without "hot spots." Unlike standard LED strips, Lumina Pro uses high-density glass polymers that remain flexible while maintaining optical clarity for over 10,000 hours of operation.
              </p>
              
               <p className="flex items-center gap-2 text-[14px] font-medium tracking-widest text-[#00677F] hover:underline w-fit cursor-pointer"
>
  <Download size={15} strokeWidth={2} />
  DOWNLOAD MANUAL (PDF)
</p>
            </div>
          </div>

        </div>
      </section>
      {/* Verified Experiences */}
<section className="w-full bg-white px-[80px] py-12 flex flex-col gap-[48px]">

  {/* Header */}
  <div className="flex  justify-between ">
    <div className="flex flex-col gap-[8px]">
      <h2 className="text-[32px] font-semibold text-[#1A1B1F] ">Verified Experiences</h2>
      <p className="text-[16px] text-[#3C494E]">Real feedback from our premium community.</p>
    </div>
    <button className="text-[14px] font-medium tracking-widest text-[#00677F] underline underline-offset-2 mt-1">
      WRITE A REVIEW
    </button>
  </div>

  {/* Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
    {verifiedReviews.map(({ id, stars, quote, initials, name, tag }) => (
      <div key={id} className="border border-gray-200 rounded-2xl p-[33px] flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-[26px]">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <img key={i} src={star} alt="" />
            ))}
          </div>
          {/* Quote */}
          <p className="text-[16px] text-[#1A1B1F] leading-relaxed italic w-[85%]">{quote}</p>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-[40px] h-[40px] rounded-full bg-[#E2DFE1] flex items-center justify-center">
            <span className="text-[16px] font-bold text-[#636264]">{initials}</span>
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#1A1B1F]">{name}</p>
            <p className="text-[12px] font-semibold text-[#3C494E]">{tag}</p>
          </div>
        </div>
      </div>
    ))}
  </div>

</section>
<section className="w-full bg-white px-[80px] py-12 flex flex-col gap-[53px]">

  {/* Header */}
  <div className="flex items-center justify-between ">
    <h2 className="text-[32px] font-semibold text-[#1A1B1F]">Complement Your Drive</h2>
    <div className="flex items-center gap-2">
      <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors duration-150">
        <ChevronLeft size={15} strokeWidth={1.8} className="text-[#1A1B1F]" />
      </button>
      <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors duration-150">
        <ChevronRight size={15} strokeWidth={1.8} className="text-[#1A1B1F]" />
      </button>
    </div>
  </div>

  {/* Products Grid */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-[167px]">
    {relatedProducts.map(({ id, category, name, price, src }) => (
      <div key={id} className="flex flex-col gap-[24px] cursor-pointer">
        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <img src={src} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex flex-col gap-[4px]">
          <p className="text-[12px] font-semibold tracking-widest text-[#3C494E] ">{category}</p>
          <p className="text-[24px] font-medium text-[#1A1B1F]">{name}</p>
          <p className="text-[16px] text-[#3C494E]">{price}</p>
        </div>
      </div>
    ))}
  </div>
</section>
    </div>
  );
}