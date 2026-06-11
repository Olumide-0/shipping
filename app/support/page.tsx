"use client";

import { useState } from "react";
import { Mail, Phone, HelpCircle, Wrench, BadgeCheck, ChevronRight, Send } from "lucide-react";

const quickLinks = [
  { icon: <HelpCircle size={16} strokeWidth={1.6} className="text-[#1A1B1F]" />, label: "Shipping & Returns" },
  { icon: <Wrench size={16} strokeWidth={1.6} className="text-[#1A1B1F]" />, label: "Installation Guide" },
  { icon: <BadgeCheck size={16} strokeWidth={1.6} className="text-[#1A1B1F]" />, label: "Warranty Details" },
];

export default function Support() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="w-full bg-white py-[120px]">
      <section className="w-full bg-white px-5 py-10 md:px-12 md:py-16 xl:px-[80px] xl:py-[80px] flex flex-col gap-10 lg:gap-[80px]">

  {/* Header */}
  <div className="flex flex-col gap-3 items-center text-center ">
    <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-semibold text-[#1A1B1F] leading-tight">
      Connect with Excellence
    </h1>
    <p className="text-[15px] md:text-[18px] text-[#3C494E] w-full sm:w-[80%] lg:w-[45%] leading-relaxed">
      Our dedicated support team is here to ensure your LuxeDrive experience remains as seamless as the vehicles we enhance.
    </p>
  </div>

  {/* Two Column Layout */}
  <div className="flex flex-col lg:flex-row gap-8 lg:gap-[24px]  w-full">

    {/* Left — Contact Form */}
    <div className="w-full lg:w-1/2 border border-[#BBC9CF33] shadow-md rounded-[12px] p-6 md:p-8 lg:p-[47px] flex flex-col gap-6 lg:gap-[32px]">
      <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A1B1F]">Send a Message</h2>

      {/* Name and Email Row */}
      <div className="flex flex-col sm:flex-row gap-4 lg:gap-[24px]">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold tracking-widest text-[#3C494E]">FULL NAME</label>
          <input
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-[#BBC9CF] shadow-sm rounded-md px-3 py-3 lg:px-[12px] lg:py-[14px] text-[15px] lg:text-[16px] text-[#6C797F] placeholder-gray-300 outline-none focus:border-[#00677F] transition-colors duration-150"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold tracking-widest text-[#3C494E]">EMAIL ADDRESS</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#BBC9CF] shadow-sm rounded-md px-3 py-3 lg:px-[12px] lg:py-[14px] text-[15px] lg:text-[16px] text-[#6C797F] placeholder-gray-300 outline-none focus:border-[#00677F] transition-colors duration-150"
          />
        </div>
      </div>

      {/* Message Area */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold tracking-widest text-[#3C494E]">MESSAGE</label>
        <textarea
          placeholder="How can we assist you today?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full border border-[#BBC9CF] shadow-sm rounded-md px-4 py-3 text-[15px] lg:text-[16px] text-[#6C797F] placeholder-gray-300 outline-none focus:border-[#00677F] transition-colors duration-150 resize-none"
        />
      </div>

      <button className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-fit px-[40px] py-[16px] bg-[#00677F] hover:bg-[#005569] text-white text-[14px] font-bold tracking-widest rounded-[9999px] transition-colors duration-200 mt-2">
        SEND MESSAGE
        <Send size={13} />
      </button>
    </div>

    {/* Right — Support Info */}
    <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-6">

      {/* Support Information Card */}
      <div className="border border-[#BBC9CF33] shadow-md rounded-[12px] p-6 lg:p-[32px] flex flex-col gap-6 lg:gap-[24px]">
        <h2 className="text-[20px] lg:text-[24px] font-medium text-[#1A1B1F]">Support Information</h2>

        <div className="flex items-start gap-[16px]">
          <div className="w-9 h-9 rounded-lg bg-[#EAF4F6] flex items-center justify-center shrink-0 mt-1">
            <Mail size={16} strokeWidth={1.6} className="text-[#00677F]" />
          </div>
          <div>
            <p className="text-[12px] font-semibold tracking-widest text-[#3C494E] mb-1">EMAIL US</p>
            <p className="text-[15px] lg:text-[16px] font-semibold text-[#00677F] break-all sm:break-normal">concierge@luxedrive.com</p>
          </div>
        </div>

        <div className="flex items-start gap-[16px]">
          <div className="w-9 h-9 rounded-lg bg-[#EAF4F6] flex items-center justify-center shrink-0 mt-1">
            <Phone size={16} strokeWidth={1.6} className="text-[#00677F]" />
          </div>
          <div>
            <p className="text-[12px] font-semibold tracking-widest text-[#3C494E] mb-1">CALL US</p>
            <p className="text-[15px] lg:text-[16px] font-semibold text-[#1A1B1F]">+1 (800) LUXE-DRV</p>
            <p className="text-[12px] font-semibold text-[#3C494E]">Mon - Fri, 9am - 6pm EST</p>
          </div>
        </div>
      </div>

      {/* Quick Links Card */}
      <div className="bg-[#E9E7ED] border border-[#BBC9CF33] rounded-[12px] p-6 lg:p-[32px] flex flex-col gap-6 lg:gap-[24px]">
        <h2 className="text-[20px] font-semibold text-[#1A1B1F]">Quick Links</h2>
        <div className="flex flex-col gap-3 lg:gap-[24px]">
          {quickLinks.map(({ icon, label }) => (
            <button
              key={label}
              className="flex items-center justify-between bg-white rounded-[8px] px-4 py-4 lg:px-[16px] lg:py-[18px] border border-transparent hover:border-gray-300 transition-colors duration-150 group"
            >
              <div className="flex items-center gap-3">
                {icon}
                <span className="text-[13px] font-medium text-[#1A1B1F] group-hover:text-[#00677F] transition-colors">{label}</span>
              </div>
              <ChevronRight size={15} strokeWidth={1.6} className="text-[#1A1B1F] group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>
      {/* Precision Banner */}
<section className="w-full px-5 py-8 md:px-12 lg:px-[160px] lg:py-[48px]">
  <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/7] rounded-xl md:rounded-2xl overflow-hidden bg-gray-200">

    {/* Background Image */}
    <img
      src="/support/precision-banner.jpg"
      alt="Precision in Every Interaction"
      className="w-full h-full object-cover"
    />

    {/* Fade overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />

    {/* Text */}
    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col gap-1 md:gap-2">
      <h2 className="text-[20px] md:text-[28px] font-bold text-[#1A1B1F]">
        Precision in Every Interaction.
      </h2>
      <p className="text-[12px] md:text-[14px] text-gray-700">
        Our global headquarters in Stuttgart, Germany.
      </p>
    </div>

  </div>
</section>
    </div>
  );
}