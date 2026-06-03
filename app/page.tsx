import Image from "next/image";
import car from "../public/asset/image/Frame 5 (1).png";
import { Truck, BadgeCheck, LockKeyhole, Sliders, Eye, CircleCheck  } from "lucide-react";



const car1 = "/asset/image/Background.png";
const car2 = "/asset/image/Lumina Pro Kit.png";
const car3 = "/asset/image/Velocity Audio Kit.png";

const products = [
  {
    id: 1,
    name: "Lumina Pro Kit",
    price: "$499.00",
    image: car2,
  },
  {
    id: 2,
    name: "Carbon Fiber Wheel",
    price: "$1,200.00",
    image: car1,
  },
  {
    id: 3,
    name: "Velocity Audio Kit",
    price: "$899.00",
    image: car3,
  },
  {
    id: 4,
    name: "Stealth Wall Charger",
    price: "$649.00",
    image: car2,
  },
];

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

const productHighlights = [
  "Fiber-Optic Precision",
  "Invisible Installation",
  "Smartphone App Controlled",
];

export default function Home() {
  return (
  <div>
      <section className="relative w-full h-screen ">

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
    <section className=" bg-white px-[80px] py-[80px] ">
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map(({ icon, title, subtitle }) => (
          <div key={title} className="flex flex-col items-center text-center gap-2">
            <span className="text-[#1A9E9E] mb-1">{icon}</span>
            <p className="text-[14px] font-medium tracking-widest text-[#1A1B1F]">{title}</p>
            <p className="text-[12px] font-semibold text-[#3C494E] leading-snug">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
    <section className=" bg-white px-[80px] pb-[80px]">
      <div className="flex flex-col gap-[64px]">

        {/* Header */}
        <div className="flex items-start justify-between ">
          <div className="flex flex-col gap-[15px]">
            <span className="text-[12px] font-bold text-[#00677F] bg-[#00677F1A]/60 rounded-full px-[12px] py-[4px] w-fit">
              CURATED SELECTION
            </span>
            <h2 className="text-[32px] font-semibold text-[#1A1B1F] leading-tight">
              Featured Collection
            </h2>
          </div>
          <button className="text-[14px] font-medium tracking-widest text-[#00677F] underline mt-auto">
            VIEW ALL PRODUCTS
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[32px]">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-[8px]">
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
                <p className="text-[24px] font-medium text-[#1A1B1F] pt-[16px]">{product.name}</p>
                <p className="text-[14px] text-[#00677F] font-medium">{product.price}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-[12px] pt-[16px]">
                <button className="flex-1 bg-[#1A1B1F] hover:bg-[#2d2e33] text-[#FAF8FE] text-[12px] font-semibold tracking-widest py-[20px] rounded-md transition-colors duration-200">
                  ADD TO CART
                </button>
                <button className="w-[43px] h-[37px] flex items-center justify-center border border-gray-200 rounded-md hover:border-gray-400 transition-colors duration-200 shrink-0">
                  <Eye size={15} strokeWidth={1.6} className="text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    <section className=" bg-white px-[80px] pb-[80px]">
      <div className=" flex flex-col md:flex-row items-center gap-[24px]">

        {/* Left Content */}
        <div className="w-[50%] flex flex-col gap-6">
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
        <div className="">
          <img src={car1} alt="" />
        </div>

      </div>
    </section>
    <section className="w-full bg-[#F4F4F5] px-[80px] pb-[80px]">
      <div className="flex flex-col md:flex-row items-center gap-16">

        {/* Left — Product Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="rounded-2xl overflow-hidden shadow-xl w-full max-w-[560px] aspect-[4/3]">
            <img
              src="/products/lumina-ambient-kit.jpg"
              alt="Lumina Ambient Kit"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right — Product Info */}
        <div className="flex-1 flex flex-col gap-6 max-w-md">
          {/* Badge */}
          <span className="text-[11px] font-semibold tracking-widest text-gray-500 border border-gray-300 bg-white rounded-full px-3 py-1 w-fit">
            NEW ARRIVAL
          </span>

          {/* Title */}
          <h2 className="text-[36px] font-bold text-[#1A1B1F] leading-tight">
            Lumina Ambient Kit
          </h2>

          {/* Price */}
          <p className="text-[24px] font-semibold text-[#1A9E9E]">$249.00</p>

          {/* Description */}
          <p className="text-[14px] text-gray-500 leading-relaxed">
            The definitive interior lighting experience. Featuring 64-color selection, smartphone integration, and dynamic music synchronization. Engineered specifically for seamless integration with luxury EV and performance vehicles.
          </p>

          {/* Feature List */}
          <ul className="flex flex-col gap-3">
            {productHighlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2.5">
                <CircleCheck size={18} strokeWidth={1.6} className="text-[#1A9E9E] shrink-0" />
                <span className="text-[14px] font-medium text-[#1A1B1F]">{highlight}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button className="mt-2 w-fit px-10 py-4 bg-[#1A6E7E] hover:bg-[#155f6d] text-white text-[12px] font-bold tracking-widest rounded-xl transition-colors duration-200">
            ADD TO CART
          </button>
        </div>

      </div>
    </section>
  </div>
  );
}