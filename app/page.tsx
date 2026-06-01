import Image from "next/image";
import car from "../public/asset/image/Frame 5 (1).png";
import { Truck, BadgeCheck, LockKeyhole, Sliders, Eye } from "lucide-react";



const features = [
  {
    icon: <Truck size={28} strokeWidth={1.5} />,
    title: "FAST SHIPPING",
    subtitle: "Global delivery in 3–5 days",
  },
  {
    icon: <BadgeCheck size={28} strokeWidth={1.5} />,
    title: "PREMIUM QUALITY",
    subtitle: "Automotive grade materials",
  },
  {
    icon: <LockKeyhole size={28} strokeWidth={1.5} />,
    title: "SECURE CHECKOUT",
    subtitle: "Encrypted payment gateway",
  },
  {
    icon: <Sliders size={28} strokeWidth={1.5} />,
    title: "EASY INSTALLATION",
    subtitle: "Plug & play design",
  },
];

const products = [
  {
    id: 1,
    name: "Lumina Pro Kit",
    price: "$499.00",
    image: "/products/lumina-pro.jpg",
  },
  {
    id: 2,
    name: "Carbon Fiber Wheel",
    price: "$1,200.00",
    image: "/products/carbon-wheel.jpg",
  },
  {
    id: 3,
    name: "Velocity Audio Kit",
    price: "$899.00",
    image: "/products/velocity-audio.jpg",
  },
  {
    id: 4,
    name: "Stealth Wall Charger",
    price: "$649.00",
    image: "/products/stealth-charger.jpg",
  },
];

export default function Home() {
  return (
  <div>
      <section className="relative w-full h-screen mt-12">

      {/* Background Image */}
      <Image
        src={car}
        alt="Luxury car interior"
        fill
        className="object-contain "
        priority
      />

      <div className="relative  flex flex-col items-center justify-center h-full text-center text-white px-4">
        <span className="mb-[27px] px-[12px] py-[9px] rounded-full bg-[#00677F33]/20 backdrop-blur-sm text-[18px] text-white/90 ">
          Premium Automative Accessories
        </span>
        <h1 className="text-[52px] md:text-[70px] font-semibold leading-[1.1] mb-[27px] max-w-2xl">
          Upgrade Your Car Interior
        </h1>
        <p className="text-[30px] text-[#CCCBCB] w-[60%] leading-relaxed mb-[27px]">
          Transform your driving experience with premium ambient lighting and luxury accessories
        </p>
        <div className="flex items-center gap-[38px]">
          <button className="px-[24px] py-[16px] bg-[#00677F] hover:bg-[#00677F] text-white text-[30px] font-medium rounded-[8px] transition-colors duration-200">
            Shop Now
          </button>
          <button className="px-[24px] py-[16px] border border-white/50 hover:border-white text-white text-[30px] font-medium rounded-[8px]  transition-colors duration-200">
            Explore Collection
          </button>
        </div>
      </div>
    </section>
    <section className="w-full bg-white border-t border-b border-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map(({ icon, title, subtitle }) => (
          <div key={title} className="flex flex-col items-center text-center gap-2">
            <span className="text-[#1A9E9E] mb-1">{icon}</span>
            <p className="text-[11px] font-bold tracking-widest text-[#1A1B1F]">{title}</p>
            <p className="text-[11px] text-gray-400 leading-snug">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="w-full bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] text-gray-500 border border-gray-200 rounded-full px-3 py-0.5 w-fit">
              CURATED SELECTION
            </span>
            <h2 className="text-[28px] font-bold text-[#1A1B1F] leading-tight">
              Featured Collection
            </h2>
          </div>
          <button className="text-[11px] font-semibold tracking-widest text-[#1A9E9E] hover:underline mt-auto">
            VIEW ALL PRODUCTS
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-3">
              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div>
                <p className="text-[14px] font-medium text-[#1A1B1F]">{product.name}</p>
                <p className="text-[13px] text-[#1A9E9E] font-medium">{product.price}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="flex-1 bg-[#1A1B1F] hover:bg-[#2d2e33] text-white text-[12px] font-semibold tracking-widest py-2.5 rounded-md transition-colors duration-200">
                  ADD TO CART
                </button>
                <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md hover:border-gray-400 transition-colors duration-200 shrink-0">
                  <Eye size={15} strokeWidth={1.6} className="text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h2 className="text-[32px] font-bold text-[#1A1B1F] leading-tight mb-4">
              The Transformation
            </h2>
            <p className="text-[14px] text-gray-500 leading-relaxed max-w-sm">
              See the difference precision lighting makes. From a dark, standard cabin to a vibrant, personalized environment.
            </p>
          </div>

          {/* Before Card */}
          <div className="border border-gray-200 rounded-xl p-5 max-w-md">
            <p className="text-[16px] font-semibold text-[#1A1B1F] mb-2">Before</p>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              Standard factory lighting with limited visibility and generic aesthetic.
            </p>
          </div>

          {/* After Card */}
          <div className="border border-[#1A9E9E] rounded-xl p-5 max-w-md">
            <p className="text-[16px] font-semibold text-[#1A9E9E] mb-2">After LuxeDrive</p>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              Technical elegance with neon blue ambient glow and premium material highlights.
            </p>
          </div>
        </div>

        {/* Right Image Grid */}
        <div className="flex-1 relative">
          {/* Decorative white shadow block bottom-right */}
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-gray-100 rounded-2xl z-0" />

          <div className="relative z-10 grid grid-cols-2 grid-rows-2 gap-1 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/transformation/before-dash.jpg"
              alt="Before - dashboard"
              className="w-full h-[180px] object-cover"
            />
            <img
              src="/transformation/after-dash.jpg"
              alt="After - ambient lighting"
              className="w-full h-[180px] object-cover"
            />
            <img
              src="/transformation/before-settings.jpg"
              alt="Before - settings"
              className="w-full h-[180px] object-cover"
            />
            <img
              src="/transformation/after-glow.jpg"
              alt="After - glow"
              className="w-full h-[180px] object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  </div>
  );
}