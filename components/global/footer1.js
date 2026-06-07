import Link from "next/link";

export default function Footer1() {
  return (
    <footer className="w-full bg-[#F4F4F5]">
      <div className="w-11/12 container mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px] py-[64px] px-[80px]">

          {/* Brand */}
          <div className="flex flex-col gap-[24px]">
            <Link href="/">
            <h3 className="text-[20px] font-bold tracking-wide text-[#1A1B1F]">GENESIS AUTOMODS</h3>
            </Link>
            <p className="text-[13px] text-[#3C494E] leading-relaxed">
              Elevating the luxury electric experience through technical excellence.
            </p>
          </div>

          {/* Collections */}
          <div className="flex flex-col gap-[16px]">
            <p className="text-[15px] font-semibold text-[#1A1B1F]">Collections</p>
            <ul className="flex flex-col gap-[12px]">
              {["Performance Kits", "Interior Accents", "Aerodynamics", "New Arrivals"].map((item) => (
                <li key={item}>
                  <p  className="text-[13px] text-[#3C494E] hover:text-[#1A1B1F] transition-colors duration-150">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-[16px]">
            <p className="text-[15px] font-semibold text-[#1A1B1F]">Support</p>
            <ul className="flex flex-col gap-[12px]">
              {["Installation Guides", "Shipping & Returns", "Contact Concierge", "Warranty"].map((item) => (
                <li key={item}>
                  <p className="text-[13px] text-[#3C494E] hover:text-[#1A1B1F] transition-colors duration-150">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-[16px]">
            <p className="text-[15px] font-semibold text-[#1A1B1F]">Legal</p>
            <ul className="flex flex-col gap-[12px]">
              <li>
  <Link href="/legal?policy=privacy" className="text-[13px] text-[#3C494E] hover:text-[#1A1B1F] transition-colors duration-150">Privacy Policy</Link>
</li>
<li>
  <Link href="/legal?policy=terms" className="text-[13px] text-[#3C494E] hover:text-[#1A1B1F] transition-colors duration-150">Terms of Service</Link>
</li>
<li>
  <Link href="/legal?policy=refund" className="text-[13px] text-[#3C494E] hover:text-[#1A1B1F] transition-colors duration-150">Cookie Policy</Link>
</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between border-t border-gray-200 py-[31px]">
          <p className="text-[12px] text-[#3C494E]">© 2026 Genesis Automods. Technical Elegance in Every Detail.</p>
        </div>

      </div>
    </footer>
  );
}