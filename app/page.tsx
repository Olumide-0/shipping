"use client"
import Image from "next/image";
import { useState } from "react";
import car from "../public/asset/image/Frame 5 (1).png";
import { Truck, BadgeCheck, LockKeyhole, Sliders, Eye, CircleCheck, Star  } from "lucide-react";
import Link from "next/link";
// import Footer from "../components/global/footer"




const car1 = "/asset/image/Background.png";
const car2 = "/asset/image/Lumina Pro Kit.png";
const car3 = "/asset/image/Velocity Audio Kit.png";
const car4 = "/asset/image/Container.png";
const car5 = "/asset/image/Container (1).png";
const mobile = "/asset/image/Container (4).png";
const star = "/asset/icons/Container (2).png"
const img = "/asset/image/Background (1).png"
const img1 = "/asset/image/Background (2).png"
const img2 = "/asset/image/Background (3).png"

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
const reviews = [
  {
    id: 1,
    quote:
      '"The installation was surprisingly simple for my Tesla Model 3. The Lumina kit feels like it came straight from the factory. Absolute game changer for night driving."',
    name: "Marcus Chen",
    role: "Tesla Owner",
    avatar: img,
  },
  {
    id: 2,
    quote:
      '"The quality of the materials is second to none. I\'ve tried cheaper alternatives, but LuxeDrive is in a completely different league of elegance."',
    name: "Sarah Jenkins",
    role: "Porsche Taycan Owner",
    avatar: img1,
  },
  {
    id: 3,
    quote:
      '"Technical elegance is the perfect description. The app control is fluid and the neon blue matches my EV\'s dashboard perfectly."',
    name: "David Ross",
    role: "Audi e-tron Owner",
    avatar: img2,
  },
];
const faqs = [
  {
    id: 1,
    question: "Will this void my car's warranty?",
    answer: "No. Our products are non-invasive and use existing wiring points. They are fully removable and will not affect your manufacturer warranty.",
  },
  {
    id: 2,
    question: "How long does installation take?",
    answer: "Most installations take between 30 to 90 minutes depending on your vehicle model and the kit purchased. No specialist tools are required.",
  },
  {
    id: 3,
    question: "Are the LEDs dimmable?",
    answer: "Yes. All LuxeDrive LED systems support full dimming control via the companion smartphone app, with 64 brightness levels available.",
  },
  {
    id: 4,
    question: "Do you offer professional installation?",
    answer: "Yes. We have a network of certified installers across major cities. You can book a professional installation at checkout or through the Support page.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
  <div>
     <section className="relative w-full h-screen">
 
      {/* Background Images */}
      <Image
        src={car}
        alt="Luxury car interior"
        fill
        className="object-cover hidden md:block"
        priority
      />
      <Image
        src={mobile}
        alt="Luxury car interior mobile"
        fill
        className="object-cover md:hidden"
        priority
      />
 
      {/* Overlay – subtle gradient at bottom for text legibility on mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
 
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center
                      px-6 pb-16
                      md:px-0 lg:pb-0
                      md:items-center md:text-center
                      text-white">
 
        {/* Eyebrow */}
        <span className="
          mb-4 md:mb-[27px]
          self-start md:self-auto
          text-[11px] md:text-[18px]
          font-semibold tracking-[0.12em] uppercase
          text-[#00BFDF] md:text-white/90
          md:px-[12px] md:py-[9px] md:rounded-full
          md:bg-[#00677F33]/20 md:backdrop-blur-sm
        ">
          {/* Mobile label */}
          <span className="md:hidden">Premium Upgrades</span>
          {/* Desktop label */}
          <span className="hidden md:inline">Premium Automative Accessories</span>
        </span>
 
        {/* Heading */}
        <h1 className="
          text-[36px] md:text-[70px]
          font-bold md:font-semibold
          leading-[1.1]
          mb-4 lg:mb-[27px]
          max-w-[260px] md:max-w-2xl
          text-left md:text-center
        ">
          Upgrade Your Car Interior
        </h1>
 
        {/* Subtext – hidden on mobile, shown on desktop */}
        <p className="
          
          md:text-[30px] md:text-[#CCCBCB]  text-[15px] text-white/80 md:w-[80%]
          lg:w-[60%] leading-relaxed
          mb-[27px] text-left 
          md:text-center
        ">
          Transform your driving experience with premium ambient lighting and luxury accessories
        </p>
 
        {/* Buttons */}
        <div className="flex items-center gap-4 lg:gap-[38px]">
          {/* ✅ CHANGE 1: Added onClick scroll handler to Shop Now button */}
          <button
            onClick={() => document.getElementById("featured-collection")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 lg:px-[24px] py-4 lg:py-[16px] bg-[#00BFDF] lg:bg-[#00677F] hover:opacity-90 text-white  text-[14px] lg:text-[30px]
            font-semibold lg:font-medium rounded-[10px] lg:rounded-[8px] transition-colors duration-200
          ">
            Shop Now
          </button>
 
          <Link href="/collections">
          <button className="
            px-[24px] py-[16px]
            border border-white/50 hover:border-white
            text-white text-[14px] lg:text-[30px] font-medium
            rounded-[8px]
            transition-colors duration-200
          ">
            Explore Collection
          </button>
          </Link>
          
        </div>
      </div>
    </section>
   <section className="bg-white px-6 py-10 md:px-12 md:py-14 lg:px-[80px] lg:py-[80px]">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
    {features.map(({ icon, title, subtitle }) => (
      <div key={title} className="flex flex-col items-center text-center gap-2">
        <span className="text-[#1A9E9E] mb-1">{icon}</span>
        <p className="text-[13px] lg:text-[14px] font-medium tracking-widest text-[#1A1B1F]">{title}</p>
        <p className="text-[11px] lg:text-[12px] font-semibold text-[#3C494E] leading-snug">{subtitle}</p>
      </div>
    ))}
  </div>
</section>
     {/* ✅ CHANGE 2: Added id="featured-collection" to the third section */}
     <section id="featured-collection" className="bg-white px-0 lg:px-[10px] xl:px-[80px] md:pb-[80px] md:pt-[10px]  py-[50px]">
      <div className="flex flex-col gap-[40px] lg:gap-[64px]">
 
        {/* Header */}
        <div className="flex items-start lg:items-center justify-between px-6 lg:px-0">
          <div className="flex flex-col gap-[15px]">
            <span className="text-[12px] font-bold text-[#00677F] bg-[#00677F1A]/60 rounded-full px-[12px] py-[4px] w-fit">
              CURATED SELECTION
            </span>
            <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A1B1F] leading-tight">
              Featured Collection
            </h2>
          </div>
          <Link href="/collections">
          <button className="text-[12px] md:text-[14px] font-medium tracking-widest text-[#00677F] underline mt-auto">
            VIEW ALL
          </button>
          </Link>
        </div>
 
        {/* ── Mobile: horizontal scroll, plain stacked cards ── */}
        <div className="lg:hidden flex gap-4 overflow-x-auto px-6 pb-2">
          {products.map((product) => (
            <div key={product.id} className="flex-none w-[72vw] max-w-[280px] flex flex-col gap-[8px]">
              {/* Image */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
 
              {/* Info */}
              <div>
                <p className="text-[18px] font-medium text-[#1A1B1F] pt-[12px]">{product.name}</p>
                <p className="text-[13px] text-[#00677F] font-medium">{product.price}</p>
              </div>
 
              {/* Actions */}
              <div className="flex items-center gap-[10px] pt-[12px]">
                <Link href="/cart" className="flex-1 bg-[#1A1B1F] hover:bg-[#2d2e33] text-[#FAF8FE] text-[11px] text-center font-semibold tracking-widest py-[16px] rounded-md transition-colors duration-200">
                  ADD TO CART
                </Link>
                <button className="w-[43px] h-[43px] flex items-center justify-center border border-gray-200 rounded-md hover:border-gray-400 transition-colors duration-200 shrink-0">
                  <Eye size={15} strokeWidth={1.6} className="text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
 
        {/* ── Desktop: original 4-col grid ── */}
        <div className="hidden lg:grid grid-cols-4 gap-[32px] lg:gap-[10px] xl-gap-[32px]">
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
                <Link href="/cart"  className="flex-1 bg-[#1A1B1F] hover:bg-[#2d2e33] text-[#FAF8FE] text-center text-[12px] font-semibold tracking-widest py-[20px] rounded-md transition-colors duration-200">
                  ADD TO CART
                </Link>
                <button className="w-[43px] h-[37px] flex items-center justify-center border border-gray-200 rounded-md hover:border-gray-400 transition-colors duration-200 shrink-0">
                  <Eye size={15} strokeWidth={1.6} className="text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
 
      </div>
    </section>
     <section className="bg-white px-6 py-15 lg:px-[80px] lg:py-[80px]">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[24px]">
 
        {/* Left Content */}
        <div className="w-full lg:w-[50%] flex flex-col gap-[24px]">
          <div>
            <h2 className="text-[24px] lg:text-[32px] font-bold text-[#1A1B1F] leading-tight mb-3 lg:mb-4 text-center lg:text-left">
              The Transformation
            </h2>
            <p className="text-[15px] lg:text-[18px] text-[#3C494E] xl:w-[70%] text-center lg:text-left">
              See the difference precision lighting makes. From a dark, standard cabin to a vibrant, personalized environment.
            </p>
          </div>
 
          {/* Cards */}
          <div className="pt-2 lg:pt-[25px] flex flex-col gap-4 lg:gap-[31px]">
            {/* Before Card */}
            <div className="border border-gray-200 rounded-xl p-5 lg:max-w-md">
              <p className="text-[18px] lg:text-[24px] font-medium text-[#1A1B1F] mb-2">Before</p>
              <p className="text-[14px] lg:text-[16px] text-[#3C494E] leading-relaxed">
                Standard factory lighting with limited visibility and generic aesthetic.
              </p>
            </div>
 
            {/* After Card */}
            <div className="border border-[#00677F] rounded-xl p-5 lg:max-w-md">
              <p className="text-[18px] lg:text-[24px] font-medium text-[#00677F] mb-2">After LuxeDrive</p>
              <p className="text-[14px] lg:text-[16px] text-[#3C494E] leading-relaxed">
                Technical elegance with neon blue ambient glow and premium material highlights.
              </p>
            </div>
          </div>
        </div>
 
        {/* Right Image */}
        <div className="w-full lg:w-[60%]  xl:w-[50%] rounded-md">
          <img src={car4} alt="Car transformation" className="w-full  lg:h-[550px]  rounded-md" />
        </div>
 
      </div>
    </section>
    <section className="w-full bg-[#F4F4F5] px-6 py-10 lg:px-[80px] lg:py-[80px]">
  <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

    {/* Image */}
    <div className="w-full lg:w-[50%] flex items-center justify-center">
      <img src={car5} alt="Lumina Ambient Kit" className="w-full lg:h-[600px]  rounded-2xl" />
    </div>

    {/* Info */}
    <div className="w-full lg:w-[50%] flex flex-col gap-[16px] lg:max-w-md">
      <span className="text-[12px] font-semibold tracking-widest text-[#00677F] bg-[#E3E2E7] rounded-full px-[12px] py-[4px] w-fit">
        NEW ARRIVAL
      </span>

      <h2 className="text-[24px] lg:text-[32px] font-semibold text-[#1A1B1F] leading-tight">
        Lumina Ambient Kit
      </h2>

      <p className="text-[20px] lg:text-[24px] font-medium text-[#00677F]">$249.00</p>

      <p className="text-[14px] lg:text-[16px] text-[#3C494E] leading-relaxed">
        The definitive interior lighting experience. Featuring 64-color selection, smartphone integration, and dynamic music synchronization. Engineered specifically for seamless integration with luxury EV and performance vehicles.
      </p>

      <ul className="flex flex-col gap-3">
        {productHighlights.map((highlight) => (
          <li key={highlight} className="flex items-center gap-2.5">
            <CircleCheck size={18} strokeWidth={1.6} className="text-[#00677F] shrink-0" />
            <span className="text-[13px] lg:text-[14px] font-medium text-[#1A1B1F]">{highlight}</span>
          </li>
        ))}
      </ul>

      <Link href="/cart">
      <button className="mt-2 w-full lg:w-fit px-[48px] py-[18px] lg:py-[20px] bg-[#00677F] hover:bg-[#155f6d] text-white text-[13px] lg:text-[14px] font-medium tracking-widest rounded-[12px] transition-colors duration-200">
        ADD TO CART
      </button>
      </Link>
    </div>

  </div>
</section>
      <section className="w-full bg-white px-5 py-10 md:px-12 md:py-16 lg:px-[80px] lg:py-[80px]">
  <div className="flex flex-col items-center gap-6 md:gap-10">

    {/* Header */}
    <div className="text-center w-full md:w-[75%] lg:w-[55%]">
      <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A1B1F] mb-3 md:mb-4">
        Engineering Elegance
      </h2>
      <p className="text-[14px] md:text-[16px] text-[#3C494E] leading-relaxed">
        Watch how our Lumina Ambient system transforms a standard cockpit into a sanctuary of technical sophistication.
      </p>
    </div>

    {/* 16:9 Video Embed */}
    <div className="w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-lg relative">
      <video 
        src="/asset/video/4K Cinematic _ BMW M4 Competition.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>

  </div>
</section>
    <section className="w-full bg-[#F4F4F5] px-5 py-10 md:px-12 md:py-16 xl:px-[80px] xl:py-[80px]">
  <div className="flex flex-col items-center gap-8 md:gap-10">
    
    {/* Header */}
    <div className="text-center flex flex-col gap-2">
      <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A1B1F]">
        The Owner Experience
      </h2>
      <p className="text-[14px] md:text-[16px] text-[#3C494E] px-4 md:px-0">
        Join thousands of drivers who have upgraded their daily drive.
      </p>
    </div>

    {/* Reviews Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[32px] w-full md:w-[95%] xl:w-[80%] max-w-7xl">
      {reviews.map(({ id, quote, name, role, avatar }) => (
        <div 
          key={id} 
          className="bg-white rounded-[16px] p-6 lg:p-[33px] flex flex-col justify-between gap-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-[#BBC9CF4D]"
        >
          <div>
            <div className="flex items-center gap-0.5 mb-3 md:mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
               <img key={i} src={star} alt="star rating" className="w-4 h-4 md:w-5 md:h-5" />
              ))}
            </div>
            <p className="text-[14px] md:text-[16px] text-[#1A1B1F] leading-relaxed italic xl:w-[85%]">
              {quote}
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-2">
            <img src={avatar} alt={name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
            <div>
              <p className="text-[14px] font-medium text-[#1A1B1F]">{name}</p>
              <p className="text-[12px] font-semibold text-[#3C494E]">{role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
<section className="w-full bg-white px-8 py-10 md:px-12 md:py-16 lg:px-[80px] lg:py-[80px]">
  <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-10">
    <h2 className="text-[24px] md:text-[32px] font-semibold text-[#1A1B1F] text-center">
      Frequently Asked Questions
    </h2>

    <div className="w-full flex flex-col">
      {faqs.map(({ id, question, answer }) => (
        <div key={id} className="border-b border-gray-200">
          <button
            onClick={() => setOpenFaq(openFaq === id ? null : id)}
            className="w-full flex items-center justify-between py-4 md:pt-[16px] md:pb-[24px] text-left gap-4"
          >
            <p className="text-[18px] md:text-[20px] lg:text-[24px] font-medium text-[#1A1B1F] inter">
              {question}
            </p>
            <span
              className="text-gray-400 text-[24px] md:text-[30px] leading-none transition-transform duration-200 flex-shrink-0"
              style={{ transform: openFaq === id ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              +
            </span>
          </button>
          
          {/* Answer dropdown */}
          <div 
            className={`grid transition-all duration-200 ease-in-out ${
              openFaq === id ? "grid-rows-[1fr] opacity-100 pb-4 md:pb-6" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-[15px] md:text-[18px] text-[#3C494E] leading-relaxed">
                {answer}
              </p>
            </div>
          </div>

        </div>
      ))}
    </div>
  </div>
</section>
{/* <Footer/> */}
  </div>
  );
}