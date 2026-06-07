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
      <div className="px-[80px] py-[80px] flex flex-col gap-[80px]">

        {/* Header */}
        <div className="flex flex-col gap-3 items-center text-center">
          <h1 className="text-[64px] font-semibold text-[#1A1B1F] leading-tight">Connect with Excellence</h1>
          <p className="text-[18px] text-[#3C494E] w-[45%] leading-relaxed">
            Our dedicated support team is here to ensure your LuxeDrive experience remains as seamless as the vehicles we enhance.
          </p>
        </div>

        {/* Two Column */}
        <div className="flex gap-[24px]">

          {/* Left — Contact Form */}
          <div className="w-[50%] border border-[#BBC9CF33] shadow-md rounded-[12px] p-[47px] flex flex-col gap-[32px]">
            <h2 className="text-[32px] font-semibold text-[#1A1B1F]">Send a Message</h2>

            <div className="flex gap-[24px]">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold tracking-widest text-[#3C494E]">FULL NAME</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-[#BBC9CF] shadow-b px-[12px] py-[14px] text-[16px] text-[#6C797F] placeholder-gray-300 outline-none focus:border-[#00677F] transition-colors duration-150"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold tracking-widest text-[#3C494E]">EMAIL ADDRESS</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#BBC9CF] shadow-b px-[12px] py-[14px] text-[16px] text-[#6C797F] placeholder-gray-300 outline-none focus:border-[#00677F] transition-colors duration-150"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold tracking-widest text-[#3C494E]">MESSAGE</label>
              <textarea
                placeholder="How can we assist you today?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full border border-[#BBC9CF]  px-4 py-3 text-[16px] text-[##6C797F] placeholder-gray-300 outline-none focus:border-[#00677F] transition-colors duration-150 resize-none"
              />
            </div>

            <button className="flex items-center gap-2 w-fit px-[40px] py-[16px] bg-[#00677F] hover:bg-[#005569] text-white text-[14px] font-bold tracking-widest rounded-[9999px] transition-colors duration-200">
              SEND MESSAGE
              <Send size={13} />
            </button>
          </div>

          {/* Right — Support Info */}
          <div className="w-[50%] flex flex-col gap-4">

            {/* Support Information */}
            <div className="border border-[#BBC9CF33] shadow-md rounded-[12px]  p-[32px] flex flex-col gap-[24px]">
              <h2 className="text-[24px] font-medium text-[#1A1B1F]">Support Information</h2>

              <div className="flex items-start gap-[16px]">
                <div className="w-9 h-9 rounded-lg bg-[#EAF4F6] flex items-center justify-center shrink-0">
                  <Mail size={16} strokeWidth={1.6} className="text-[#00677F]" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold tracking-widest text-[#3C494E] mb-1">EMAIL US</p>
                  <p className="text-[16px] font-semibold text-[#00677F]">concierge@luxedrive.com</p>
                </div>
              </div>

              <div className="flex items-start gap-[16px]">
                <div className="w-9 h-9 rounded-lg bg-[#EAF4F6] flex items-center justify-center shrink-0">
                  <Phone size={16} strokeWidth={1.6} className="text-[#00677F]" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold tracking-widest text-[#3C494E] mb-1">CALL US</p>
                  <p className="text-[16px] font-semibold text-[#1A1B1F]">+1 (800) LUXE-DRV</p>
                  <p className="text-[12px] font-semibold text-[#3C494E]">Mon - Fri, 9am - 6pm EeT</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#E9E7ED] border border-[#BBC9CF33] rounded-[12px] p-[32px] flex flex-col gap-[24px]">
              <h2 className="text-[20px] font-semibold text-[#1A1B1F]">Quick Links</h2>
              <div className="flex flex-col gap-[24px]">
                {quickLinks.map(({ icon, label }) => (
                  <button
                    key={label}
                    className="flex items-center justify-between bg-white rounded-[8px] px-[16px] py-[18px]  border border-transparent transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      {icon}
                      <span className="text-[13px] font-medium text-[#1A1B1F]">{label}</span>
                    </div>
                    <ChevronRight size={15} strokeWidth={1.6} className="text-[#1A1B1F]" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Precision Banner */}
<section className="w-full px-[160px] py-[48px]">
  <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden bg-gray-200">

    {/* Background Image */}
    <img
      src="/support/precision-banner.jpg"
      alt="Precision in Every Interaction"
      className="w-full h-full object-cover"
    />

    {/* Fade overlay — bottom left */}
    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

    {/* Text */}
    <div className="absolute bottom-10 left-10 flex flex-col gap-2">
      <h2 className="text-[28px] font-bold text-[#1A1B1F]">Precision in Every Interaction.</h2>
      <p className="text-[14px] text-gray-500">Our global headquarters in Stuttgart, Germany.</p>
    </div>

  </div>
</section>
    </div>
  );
}