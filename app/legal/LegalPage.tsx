"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, Scale, RotateCcw, Truck } from "lucide-react";

const policies = [
  {
    id: "privacy",
    label: "Privacy Policy",
    icon: <ShieldCheck size={15} strokeWidth={1.6} />,
    tag: "DATA PROTECTION",
    title: "Privacy Policy",
    date: "Last Updated: October 24, 2024",
    content: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold text-[#1A1B1F]">1. Introduction</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            At LuxeDrive, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold text-[#1A1B1F]">2. Data We Collect</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="flex flex-col gap-2 pl-4">
            {[
              "Identity Data: First name, last name, username or similar identifier.",
              "Contact Data: Billing address, delivery address, email address and telephone numbers.",
              "Technical Data: Internet protocol (IP) address, your login data, browser type and version.",
              "Usage Data: Information about how you use our website, products and services.",
            ].map((item) => (
              <li key={item} className="text-[14px] text-gray-500 leading-relaxed list-disc">{item}</li>
            ))}
          </ul>

          <div className="flex items-start gap-4 bg-[#F4F4F5] rounded-xl p-5 mt-2">
            <ShieldCheck size={18} className="text-[#00677F] mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] font-bold text-[#1A1B1F] mb-1">Encryption Standards</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                We use industry-standard TLS 1.3 encryption to protect all data transmissions. Your vehicle diagnostic data is processed on edge servers to ensure maximum latency-free security.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold text-[#1A1B1F]">3. How We Use Your Data</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            To perform the contract we are about to enter into or have entered into with you. Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "terms",
    label: "Terms & Conditions",
    icon: <Scale size={15} strokeWidth={1.6} />,
    tag: "LEGAL AGREEMENT",
    title: "Terms & Conditions",
    date: "Last Updated: September 12, 2024",
    content: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold text-[#1A1B1F]">1. Agreement to Terms</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity and LuxeDrive, concerning your access to and use of our automotive accessory marketplace.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold text-[#1A1B1F]">2. Intellectual Property Rights</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-[#F4F4F5] rounded-xl p-5">
              <p className="text-[13px] font-bold text-[#1A1B1F] mb-2">User Registration</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">You may be required to register with the Site. You agree to keep your password confidential.</p>
            </div>
            <div className="bg-[#F4F4F5] rounded-xl p-5">
              <p className="text-[13px] font-bold text-[#1A1B1F] mb-2">Prohibited Activities</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">You may not access or use the Site for any purpose other than that for which we make the Site available.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "refund",
    label: "Refund Policy",
    icon: <RotateCcw size={15} strokeWidth={1.6} />,
    tag: "CUSTOMER SATISFACTION",
    title: "Refund Policy",
    date: "Last Updated: August 05, 2024",
    content: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold text-[#1A1B1F]">1. General Returns</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            We want you to be completely satisfied with your purchase. If you are not satisfied, you may return your items within 30 days of purchase for a full refund or exchange, provided the items are in their original condition and packaging.
          </p>

          <div className="flex items-start gap-5 bg-[#F4F4F5] rounded-xl p-5 mt-2">
            <img src="/refund-quality.jpg" alt="Quality Guarantee" className="w-[120px] h-[100px] rounded-lg object-cover shrink-0" />
            <div className="flex flex-col gap-2">
              <p className="text-[15px] font-bold text-[#1A1B1F]">Quality Guarantee</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                All our components undergo a rigorous 12-point inspection before shipping. If an item arrives damaged or defective, we will cover the return shipping and provide an immediate replacement or refund.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-500 border border-gray-300 rounded-full px-3 py-1">30 DAY WINDOW</span>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 border border-gray-300 rounded-full px-3 py-1">FREE EXCHANGES</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold text-[#1A1B1F]">2. Process</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            To start a return, you can contact us at returns@luxedrive.com. If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "shipping",
    label: "Shipping Details",
    icon: <Truck size={15} strokeWidth={1.6} />,
    tag: "DELIVERY",
    title: "Shipping Details",
    date: "Last Updated: July 15, 2024",
    content: (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold text-[#1A1B1F]">1. Delivery Times</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            Standard shipping takes 3–5 business days. Express shipping is available at checkout for 1–2 business day delivery. All orders are processed within 24 hours of placement.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[20px] font-bold text-[#1A1B1F]">2. International Shipping</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            We ship to over 40 countries worldwide. International delivery typically takes 7–14 business days depending on customs clearance in your country.
          </p>
        </div>
      </div>
    ),
  },
];

export default function LegalPage() {
  const searchParams = useSearchParams();
  const [activePolicy, setActivePolicy] = useState("privacy");
  const current = policies.find((p) => p.id === activePolicy)!;

  useEffect(() => {
    const policy = searchParams.get("policy");
    if (policy) setActivePolicy(policy);
  }, [searchParams]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#EBF0F2] to-white">
      <div className="px-[80px] py-[80px]">

        {/* Header */}
        <div className="flex flex-col gap-3 mb-12">
          <h1 className="text-[52px] font-bold text-[#1A1B1F]">Legal Center</h1>
          <p className="text-[14px] text-gray-500 max-w-sm leading-relaxed">
            Ensuring technical excellence and transparency in every transaction. Review our policies and terms below.
          </p>
        </div>

        {/* Body */}
        <div className="flex gap-8 items-start">

          {/* Sidebar */}
          <div className="w-[30%] flex flex-col gap-3">
            {policies.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActivePolicy(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors duration-150 text-left ${
                  activePolicy === id
                    ? "bg-[#00677F] text-white"
                    : "text-gray-500 hover:text-[#1A1B1F]"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}

            {/* Need Help Card */}
            <div className="mt-4 border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 bg-white">
              <p className="text-[13px] font-bold text-[#00677F]">Need help?</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">Contact our legal team for any specific queries.</p>
              <button className="w-full py-2.5 bg-[#00677F] hover:bg-[#005569] text-white text-[12px] font-bold tracking-widest rounded-xl transition-colors duration-200">
                Contact Support
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-[70%] border border-gray-200 rounded-2xl p-10 bg-white">
            <p className="text-[11px] font-bold tracking-widest text-[#00677F] mb-2">{current.tag}</p>
            <h2 className="text-[32px] font-bold text-[#1A1B1F] mb-1">{current.title}</h2>
            <p className="text-[13px] text-gray-400 mb-8">{current.date}</p>
            {current.content}
          </div>

        </div>
      </div>
    </div>
  );
}