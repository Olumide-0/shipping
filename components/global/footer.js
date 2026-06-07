import { Share2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F4F4F5]">
      <div className="w-11/12 container mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px] py-[64px] px-[80px]">

          {/* Brand */}
          <div className="flex flex-col gap-[24px]">
            <h3 className="text-[24px] font-medium tracking-wide text-[#1A1B1F]">GENESIS AUTO</h3>
            <p className="text-[12px] font-semibold text-[#3C494E] leading-relaxed">
              Engineering the future of automotive interiors. Technical elegance for the modern driver.
            </p>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-[24px]">
            <p className="text-[14px] font-medium  tracking-widest text-[#1A1B1F]">PRODUCTS</p>
            <ul className="flex flex-col gap-[16px]">
              {["Ambient Lighting", "Carbon Trim", "Interface Upgrades"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[12px] font-semibold text-[#3C494E] hover:text-[#1A1B1F] transition-colors duration-150">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-[24px]">
            <p className="text-[14px] font-medium tracking-widest text-[#1A1B1F]">COMPANY</p>
            <ul className="flex flex-col gap-[16px]">
              {["Our Story", "Installation Partners", "Support Center"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[12px] font-semibold text-[#3C494E] hover:text-[#1A1B1F] transition-colors duration-150">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-[24px]">
            <p className="text-[11px] font-bold tracking-widest text-[#1A1B1F]">CONNECT</p>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-full bg-[#EEEDF3] border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors duration-150">
                <Share2 size={14} strokeWidth={1.6} className="text-[#1A1B1F]" />
              </button>
              <button className="w-9 h-9 rounded-full bg-[#EEEDF3] border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors duration-150">
                <Mail size={14} strokeWidth={1.6} className="text-[#1A1B1F]" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between border-t border-gray-200 py-[31px]">
          <p className="text-[12px] text-[#3C494E] ">© 2026 Genesis Automods. Technical Elegance in Every Detail.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[12px] text-[#3C494E] font-semibold hover:text-[#1A1B1F] ">Privacy Policy</a>
            <a href="#" className="text-[12px] text-[#3C494E] font-semibold hover:text-[#1A1B1F] ">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}