"use client";

import { useState } from "react";
import { Trash2, Minus, Plus, PlusCircle, ShieldCheck, CreditCard, MessageSquarePlus, Lock, Headphones } from "lucide-react";

const car = "/asset/image/Lumina Pro Kit (1).png";

const initialItems = [
  {
    id: 1,
    badge: "BESTSELLER",
    name: "Lumina Pro Kit",
    description: "Dynamic Ambient Lighting System • Universal Fit",
    price: 499.0,
    src: car,
    quantity: 1,
  },
];

export default function Cart() {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;

  return (
    <div className="w-full bg-white px-5 py-28 md:px-12 md:py-28 lg:px-[80px] lg:py-[80px] xl:py-[120px]">

      {/* Header */}
      <div className="flex flex-col gap-1 mb-8 md:mb-10">
        <h1 className="text-[24px] md:text-[32px] font-bold text-[#1A1B1F]">Shopping Cart</h1>
        <p className="text-[13px] md:text-[14px] text-gray-400">Review your premium automotive upgrades before secure checkout.</p>
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Left — Cart Items */}
        <div className="w-full lg:w-[65%] flex flex-col gap-4">

          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 md:gap-5 border border-gray-200 rounded-2xl p-4 md:p-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-900 shrink-0">
                <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-bold tracking-widest text-gray-500 bg-gray-100 rounded-full px-2 py-0.5 w-fit uppercase">
                      {item.badge}
                    </span>
                    <h3 className="text-[15px] md:text-[18px] font-semibold text-[#1A1B1F]">{item.name}</h3>
                    <p className="text-[12px] text-gray-400 hidden sm:block">{item.description}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors duration-150">
                    <Trash2 size={17} strokeWidth={1.6} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-2 py-1 md:px-3 md:py-1.5 w-fit">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-400 hover:text-[#1A1B1F] transition-colors">
                      <Minus size={13} />
                    </button>
                    <span className="text-[13px] md:text-[14px] font-medium text-[#1A1B1F] w-5 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-400 hover:text-[#1A1B1F] transition-colors">
                      <Plus size={13} />
                    </button>
                  </div>
                  <p className="text-[16px] md:text-[20px] font-semibold text-[#00677F]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Add More */}
          <div className="border border-dashed border-gray-300 rounded-2xl py-8 md:py-10 flex flex-col items-center gap-3">
            <PlusCircle size={26} strokeWidth={1.4} className="text-gray-300" />
            <p className="text-[13px] md:text-[14px] text-gray-500">Add more performance accessories to your build</p>
            <a href="/collections" className="text-[13px] font-semibold text-[#00677F] hover:underline">
              Browse Collections
            </a>
          </div>
        </div>

        {/* Right — Order Summary */}
        <div className="w-full lg:w-[35%] flex flex-col gap-4 sticky top-5">

          <div className="border border-gray-200 rounded-2xl p-5 md:p-6 flex flex-col gap-5">
            <h2 className="text-[18px] md:text-[20px] font-bold text-[#1A1B1F]">Order Summary</h2>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-500">Subtotal</span>
                <span className="text-[14px] text-[#1A1B1F]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-500">Estimated Shipping</span>
                <span className="text-[14px] font-semibold text-[#00677F]">FREE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-500">Taxes (Estimated)</span>
                <span className="text-[14px] text-[#1A1B1F]">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="text-[16px] md:text-[18px] font-bold text-[#1A1B1F]">Total</span>
              <span className="text-[20px] md:text-[22px] font-bold text-[#1A1B1F]">${total.toFixed(2)}</span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold tracking-widest text-[#1A1B1F]">PROMO CODE</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] text-[#1A1B1F] placeholder-gray-400 outline-none focus:border-[#00677F] transition-colors duration-150"
                />
                <button className="bg-[#1A1B1F] hover:bg-[#2d2e33] text-white text-[12px] font-semibold px-4 md:px-5 py-2.5 rounded-lg transition-colors duration-200">
                  Apply
                </button>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#00677F] hover:bg-[#005569] text-white text-[12px] font-bold tracking-widest rounded-xl transition-colors duration-200">
              SECURE CHECKOUT
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
    </div>
  );
}