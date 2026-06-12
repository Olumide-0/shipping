"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, Scale, RotateCcw } from "lucide-react";


const car = "/asset/image/Premium Packaging.png";
const icon1 = "/asset/icons/Icon.png";
const icon2 = "/asset/icons/Container (5).png";
const icon3 = "/asset/icons/Container (6).png";


// Shipping details have been removed from this array
const policies = [
  {
    id: "privacy",
    label: "Privacy Policy",
    icon: icon3,
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
    icon: icon1,
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
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
    icon: icon2,
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

          <div className="flex flex-col sm:flex-row items-start gap-5 bg-[#F4F4F5] rounded-xl p-5 mt-2">
            <img src={car} className="w-full sm:w-[120px] h-[100px] rounded-lg object-cover shrink-0" />
            <div className="flex flex-col gap-2">
              <p className="text-[15px] font-bold text-[#1A1B1F]">Quality Guarantee</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                All our components undergo a rigorous 12-point inspection before shipping. If an item arrives damaged or defective, we will cover the return shipping and provide an immediate replacement or refund.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
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
];

export default function LegalPage() {
  const searchParams = useSearchParams();
  const [activePolicy, setActivePolicy] = useState("privacy");
  
  // Finds the current policy, or defaults to "privacy" if the ID isn't found
  const current = policies.find((p) => p.id === activePolicy) || policies[0];

  useEffect(() => {
    const policy = searchParams.get("policy");
    if (policy) setActivePolicy(policy);
  }, [searchParams]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#EBF0F2] to-white">
      <div className="px-5 py-28 md:px-12 lg:px-[80px] lg:py-[80px]">
        
        {/* Header */}
        <div className="flex flex-col gap-3 mb-8 md:mb-12">
          <h1 className="text-[32px] md:text-[52px] font-bold text-[#1A1B1F]">Legal Center</h1>
          <p className="text-[14px] text-gray-500 max-w-sm leading-relaxed">
            Ensuring technical excellence and transparency in every transaction. Review our policies and terms below.
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar */}
          <div className="w-full lg:w-[30%] flex flex-col gap-3">
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {policies.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setActivePolicy(id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] md:text-[14px] font-medium transition-colors duration-150 text-left whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:flex-shrink ${
                    activePolicy === id
                      ? "bg-[#00677F] text-white"
                      : "bg-white lg:bg-transparent text-gray-500 hover:text-[#1A1B1F] border border-gray-200 lg:border-none"
                  }`}
                >
                  <img src={icon} alt="" />
                  {label}
                </button>
              ))}
            </div>

            {/* Need Help Card */}
            <div className="hidden lg:flex border border-gray-200 rounded-2xl p-5 flex-col gap-3 bg-white">
              <p className="text-[13px] font-bold text-[#00677F]">Need help?</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">Contact our legal team for any specific queries.</p>
              <button className="w-full py-2.5 bg-[#00677F] hover:bg-[#005569] text-white text-[12px] font-bold tracking-widest rounded-xl transition-colors duration-200">
                Contact Support
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-[70%] border border-gray-200 rounded-2xl p-6 md:p-10 bg-white">
            <p className="text-[11px] font-bold tracking-widest text-[#00677F] mb-2">{current.tag}</p>
            <h2 className="text-[24px] md:text-[32px] font-bold text-[#1A1B1F] mb-1">{current.title}</h2>
            <p className="text-[13px] text-gray-400 mb-8">{current.date}</p>
            {current.content}
          </div>

        </div>
      </div>
    </div>
  );
}