"use client";

import { useState } from "react";
import { CreditCard, Wallet, ShieldCheck, BadgeCheck, Award, Lock, Headphones } from "lucide-react";
import Link from "next/link";

// Assuming your images exist at these paths
const car = "/asset/image/Container (14).png";
const car1 = "/asset/image/Container (7).png";

const orderItems = [
  { id: 1, name: "Precision Charge Pro", variant: "Midnight Chrome Edition", qty: 1, price: 899.0, src: car1 },
  { id: 2, name: "Carbon Fiber Aero Trim", variant: "Interior Upgrade Kit", qty: 2, price: 1240.0, src: car },
];

export default function Checkout() {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("card");

  const [fullName, setFullName] = useState("Johnathan Sterling");
  const [street, setStreet] = useState("123 Innovation Drive");
  const [city, setCity] = useState("Palo Alto");
  const [postalCode, setPostalCode] = useState("94304");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="w-full bg-white px-5 py-22 md:px-12 md:py-28 xl:px-[180px] xl:py-[100px]">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">

        {/* Left Column */}
        <div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col gap-10">

          {/* Step 1 — Shipping */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#1A1B1F] text-white text-[13px] font-bold flex items-center justify-center shrink-0">1</span>
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#1A1B1F]">Shipping Information</h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-gray-500">FULL NAME</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-[#1A1B1F] outline-none focus:border-[#00677F]" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest text-gray-500">STREET ADDRESS</label>
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-[#1A1B1F] outline-none focus:border-[#00677F]" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-widest text-gray-500">CITY</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-[#1A1B1F] outline-none focus:border-[#00677F]" />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[11px] font-bold tracking-widest text-gray-500">POSTAL CODE</label>
                <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-[#1A1B1F] outline-none focus:border-[#00677F]" />
              </div>
            </div>
          </div>

          {/* Step 2 — Billing */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#1A1B1F] text-white text-[13px] font-bold flex items-center justify-center shrink-0">2</span>
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#1A1B1F]">Billing Details</h2>
            </div>
            <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 cursor-pointer w-fit">
              <input type="checkbox" checked={sameAsShipping} onChange={() => setSameAsShipping(!sameAsShipping)} className="w-4 h-4 accent-[#00677F]" />
              <span className="text-[14px] text-[#1A1B1F]">Billing address is same as shipping</span>
            </label>
          </div>

          {/* Step 3 — Payment */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#1A1B1F] text-white text-[13px] font-bold flex items-center justify-center shrink-0">3</span>
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#1A1B1F]">Payment Method</h2>
            </div>
            <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-6">
              <div className="flex items-center gap-8 border-b border-gray-200">
                <button onClick={() => setPaymentMethod("card")} className={`flex items-center gap-2 pb-3 text-[14px] font-medium ${paymentMethod === "card" ? "text-[#00677F] border-b-2 border-[#00677F]" : "text-gray-400"}`}>
                  <CreditCard size={16} /> Credit Card
                </button>
                <button onClick={() => setPaymentMethod("wallet")} className={`flex items-center gap-2 pb-3 text-[14px] font-medium ${paymentMethod === "wallet" ? "text-[#00677F] border-b-2 border-[#00677F]" : "text-gray-400"}`}>
                  <Wallet size={16} /> Digital Wallet
                </button>
              </div>

              {paymentMethod === "card" ? (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold tracking-widest text-gray-500">CARD NUMBER</label>
                    <div className="relative">
                      <input type="text" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-[#1A1B1F] outline-none focus:border-[#00677F]" />
                      <CreditCard size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold tracking-widest text-gray-500">EXPIRY DATE</label>
                      <input type="text" placeholder="MM / YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-[#1A1B1F] outline-none focus:border-[#00677F]" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold tracking-widest text-gray-500">CVC</label>
                      <input type="text" placeholder="•••" value={cvc} onChange={(e) => setCvc(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-[14px] text-[#1A1B1F] outline-none focus:border-[#00677F]" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-10 flex items-center justify-center text-[14px] text-gray-400">Digital wallet options would appear here.</div>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row items-left lg:items-center justify-between gap-5 lg:gap-10">
              <div className="flex  items-center gap-2 text-gray-400">
                <ShieldCheck size={16} strokeWidth={1.6} />
                <span className="text-[11px] font-bold tracking-widest">256-BIT SSL ENCRYPTION</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <BadgeCheck size={16} strokeWidth={1.6} />
                <span className="text-[11px] font-bold tracking-widest">PCI DSS COMPLIANT</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Award size={16} strokeWidth={1.6} />
              <span className="text-[11px] font-bold tracking-widest">CERTIFIED PARTNER</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[40%] xl:w-[35%] lg:sticky lg:top-8 flex flex-col gap-4">
          <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-[20px] font-bold text-[#1A1B1F]">Order Summary</h2>
            <div className="flex flex-col gap-5">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="rounded-lg overflow-hidden bg-gray-900 shrink-0">
                    <img src={item.src} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col lg:flex-row  lg:items-center justify-between">
                    <div className="flex flex-col ">
                      <p className="text-[14px] font-bold text-[#1A1B1F]">{item.name}</p>
                      <p className="text-[12px] text-gray-400">{item.variant}</p>
                      <p className="text-[12px] text-gray-400">Qty: {item.qty}</p>
                    </div>
                    <p className="text-[14px] font-bold text-[#00677F]">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 border-t border-gray-100 pt-5">
              <div className="flex items-center justify-between"><span className="text-[14px] text-gray-500">Subtotal</span><span className="text-[14px] text-[#1A1B1F]">${subtotal.toFixed(2)}</span></div>
              <div className="flex items-center justify-between"><span className="text-[14px] text-gray-500">Shipping (Express)</span><span className="text-[14px] text-[#1A1B1F]">Free</span></div>
              <div className="flex items-center justify-between"><span className="text-[14px] text-gray-500">Estimated Tax</span><span className="text-[14px] text-[#1A1B1F]">${tax.toFixed(2)}</span></div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="text-[18px] font-bold text-[#1A1B1F]">Total</span>
              <span className="text-[22px] font-bold text-[#00677F]">${total.toFixed(2)}</span>
            </div>
            <Link href="/order-confirmation">
            <button className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#00677F] hover:bg-[#005569] text-white text-[13px] font-semibold rounded-xl transition-colors duration-200">
              <Lock size={15} /> Secure Pay Now
            </button>
            </Link>
            <p className="text-[12px] text-gray-400 text-center leading-relaxed">Your transaction is protected by end-to-end encryption.</p>
          </div>

          <div className="bg-[#F4F4F5] rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#DCEEF1] flex items-center justify-center shrink-0">
              <Headphones size={18} className="text-[#00677F]" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#1A1B1F] mb-1">Need Assistance?</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">Our concierge is available 24/7 for technical support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}