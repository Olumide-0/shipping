"use client"

import { useState } from "react"
import {
  Mail,
  Phone,
  HelpCircle,
  Wrench,
  BadgeCheck,
  ChevronRight,
  Send,
} from "lucide-react"

const quickLinks = [
  {
    icon: <HelpCircle size={16} strokeWidth={1.6} className="text-[#1A1B1F]" />,
    label: "Shipping & Returns",
  },
  {
    icon: <Wrench size={16} strokeWidth={1.6} className="text-[#1A1B1F]" />,
    label: "Installation Guide",
  },
  {
    icon: <BadgeCheck size={16} strokeWidth={1.6} className="text-[#1A1B1F]" />,
    label: "Warranty Details",
  },
]

export default function Support() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  return (
    <div className="w-full bg-white py-[120px]">
      <section className="flex w-full flex-col gap-10 bg-white px-5 py-10 md:px-12 md:py-16 lg:gap-[80px] xl:px-[80px] xl:py-[80px]">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-[32px] leading-tight font-semibold text-[#1A1B1F] md:text-[48px] lg:text-[64px]">
            Connect with Excellence
          </h1>
          <p className="w-full text-[15px] leading-relaxed text-[#3C494E] sm:w-[80%] md:text-[18px] lg:w-[45%]">
            Our dedicated support team is here to ensure your LuxeDrive
            experience remains as seamless as the vehicles we enhance.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-[24px]">
          {/* Left — Contact Form */}
          <div className="flex w-full flex-col gap-6 rounded-[12px] border border-[#BBC9CF33] p-6 shadow-md md:p-8 lg:w-1/2 lg:gap-[32px] lg:p-[47px]">
            <h2 className="text-[24px] font-semibold text-[#1A1B1F] md:text-[32px]">
              Send a Message
            </h2>

            {/* Name and Email Row */}
            <div className="flex flex-col gap-4 sm:flex-row lg:gap-[24px]">
              <div className="flex flex-1 flex-col gap-1.5">
                <label className="text-[12px] font-semibold tracking-widest text-[#3C494E]">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-md border border-[#BBC9CF] px-3 py-3 text-[15px] text-[#6C797F] placeholder-gray-300 shadow-sm transition-colors duration-150 outline-none focus:border-[#00677F] lg:px-[12px] lg:py-[14px] lg:text-[16px]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <label className="text-[12px] font-semibold tracking-widest text-[#3C494E]">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-[#BBC9CF] px-3 py-3 text-[15px] text-[#6C797F] placeholder-gray-300 shadow-sm transition-colors duration-150 outline-none focus:border-[#00677F] lg:px-[12px] lg:py-[14px] lg:text-[16px]"
                />
              </div>
            </div>

            {/* Message Area */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold tracking-widest text-[#3C494E]">
                MESSAGE
              </label>
              <textarea
                placeholder="How can we assist you today?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full resize-none rounded-md border border-[#BBC9CF] px-4 py-3 text-[15px] text-[#6C797F] placeholder-gray-300 shadow-sm transition-colors duration-150 outline-none focus:border-[#00677F] lg:text-[16px]"
              />
            </div>

            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-[9999px] bg-[#00677F] px-[40px] py-[16px] text-[14px] font-bold tracking-widest text-white transition-colors duration-200 hover:bg-[#005569] sm:w-fit sm:justify-start">
              SEND MESSAGE
              <Send size={13} />
            </button>
          </div>

          {/* Right — Support Info */}
          <div className="flex w-full flex-col gap-4 lg:w-1/2 lg:gap-6">
            {/* Support Information Card */}
            <div className="flex flex-col gap-6 rounded-[12px] border border-[#BBC9CF33] p-6 shadow-md lg:gap-[24px] lg:p-[32px]">
              <h2 className="text-[20px] font-medium text-[#1A1B1F] lg:text-[24px]">
                Support Information
              </h2>

              <div className="flex items-start gap-[16px]">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF4F6]">
                  <Mail
                    size={16}
                    strokeWidth={1.6}
                    className="text-[#00677F]"
                  />
                </div>
                <div>
                  <p className="mb-1 text-[12px] font-semibold tracking-widest text-[#3C494E]">
                    EMAIL US
                  </p>
                  <p className="text-[15px] font-semibold break-all text-[#00677F] sm:break-normal lg:text-[16px]">
                    support@genesisautomods.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-[16px]">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF4F6]">
                  <Phone
                    size={16}
                    strokeWidth={1.6}
                    className="text-[#00677F]"
                  />
                </div>
                <div>
                  <p className="mb-1 text-[12px] font-semibold tracking-widest text-[#3C494E]">
                    CALL US
                  </p>
                  <p className="text-[15px] font-semibold text-[#1A1B1F] lg:text-[16px]">
                    +1 (800) LUXE-DRV
                  </p>
                  <p className="text-[12px] font-semibold text-[#3C494E]">
                    Mon - Fri, 9am - 6pm EST
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="flex flex-col gap-6 rounded-[12px] border border-[#BBC9CF33] bg-[#E9E7ED] p-6 lg:gap-[24px] lg:p-[32px]">
              <h2 className="text-[20px] font-semibold text-[#1A1B1F]">
                Quick Links
              </h2>
              <div className="flex flex-col gap-3 lg:gap-[24px]">
                {quickLinks.map(({ icon, label }) => (
                  <button
                    key={label}
                    className="group flex items-center justify-between rounded-[8px] border border-transparent bg-white px-4 py-4 transition-colors duration-150 hover:border-gray-300 lg:px-[16px] lg:py-[18px]"
                  >
                    <div className="flex items-center gap-3">
                      {icon}
                      <span className="text-[13px] font-medium text-[#1A1B1F] transition-colors group-hover:text-[#00677F]">
                        {label}
                      </span>
                    </div>
                    <ChevronRight
                      size={15}
                      strokeWidth={1.6}
                      className="text-[#1A1B1F] transition-transform group-hover:translate-x-1"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Precision Banner */}
      <section className="w-full px-5 py-8 md:px-12 lg:px-[160px] lg:py-[48px]">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200 sm:aspect-[16/9] md:aspect-[16/7] md:rounded-2xl">
          {/* Background Image */}
          <img
            src="/support/precision-banner.jpg"
            alt="Precision in Every Interaction"
            className="h-full w-full object-cover"
          />

          {/* Fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />

          {/* Text */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-1 md:bottom-10 md:left-10 md:gap-2">
            <h2 className="text-[20px] font-bold text-[#1A1B1F] md:text-[28px]">
              Precision in Every Interaction.
            </h2>
            <p className="text-[12px] text-gray-700 md:text-[14px]">
              Our global headquarters in Stuttgart, Germany.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
