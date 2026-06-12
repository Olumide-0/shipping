"use client";
import Image from "next/image";
import { CheckIcon, TruckIcon, FileTextIcon, MapPinIcon, CreditCardIcon } from "lucide-react";


const car1 = "/asset/image/Background (9).png";
const car2 = "/asset/image/AB6AXuAY0F44SnFL2XDYpKwSQTJxKz3X4qZ4sVYekrtT3fOhrqTIS2UsZ1Q8pod5c7N4XXWTTTK2eRbG3ampsZzi8Et5xZ9ZG04u_hHuqwSImbjuN8nVNJR-D1T4FITYEMPdI9hTT0bWyPu0urWHKD7n2dBcdzerQ69XhJ8dp7Lx48IlC_RK9UfHzVN4PbvZV2vj8qixl0v_nZ2vDdBqXAexQh9G-xFC29nBGjBsHopvf6OY.png";
const car3 = "/asset/image/Background (10).png";
const car4 = "/asset/image/Background (11).png";
const car5 = "/asset/image/Background (12).png";
const car6 = "/asset/image/AB6AXuCdJYIRcd5c9e38jiUJUNWd6P5Ec3CWsMBIp498yupiYKTpk8NR99vghlZ0JChRvEgBntrWTUx0sxeAODHz8XFTG6O7lrvqmcEsrjsoIehXUzdTNxTfa-pKcy0dqdqipfuu7280J-wbHrG6ml289wyozb0N8TqPwJuiQaGYFaE6hj_33zHBM1Axpwz3JPnNK_fDqajriq5_GLp1nCqC9iYi4MCwVNiykGomY3RBrgjc.png"

const orderData = {
  orderNumber: "LXD-992-883401",
  date: "October 24, 2024",
  customerName: "Alexander",
  items: [
    {
      id: 1,
      name: "Carbon Performance Spoiler",
      description: "Matte Finish | Model S Plaid Compatible",
      qty: "01",
      price: "$2,450.00",
      image: car1,
    },
    {
      id: 2,
      name: "Stealth Wall Charger V2",
      description: "Midnight Black | 48A Rapid Charge",
      qty: "01",
      price: "$890.00",
      image: car2,
    },
  ],
  shipping: {
    name: "Alexander Vance",
    line1: "882 Skyview Terrace",
    line2: "Floor 24, Suite 102",
    city: "San Francisco, CA 94105",
    country: "United States",
  },
  payment: {
    brand: "VISA",
    last4: "4492",
    expiry: "08/27",
  },
  totals: {
    subtotal: "$3,340.00",
    installationFee: "$150.00",
    tax: "$283.90",
    total: "$3,773.90",
  },
};

const recommendations = [
  {
    id: 1,
    name: "Titanium Wheel Bolt Kit",
    price: "$420.00",
    image: car3,
    isNew: true,
  },
  {
    id: 2,
    name: "Nappa Leather Key Sleeve",
    price: "$85.00",
    image: car4,
    featured: true,
  },
  {
    id: 3,
    name: "All-Weather Digital Mats",
    price: "$250.00",
    image: car5,
  },
  {
    id: 4,
    name: "Ceramic Coating Pro Kit",
    price: "$180.00",
    image: car6,
  },
];

export default function OrderConfirmationPage() {
  return (
    <main className="text-[12px] bg-white flex flex-col items-center px-5 py-22 md:px-12 lg:px-[80px] lg:py-[100px] font-sans">
      
      {/* Success Icon */}
      <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#00D1FF4D]/30 mb-[24px]">
        <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-[#1a7a7a]">
          <CheckIcon className="w-[18px] h-[18px] text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-[28px] md:text-[36px] xl:text-[60px] font-semibold text-[#0d1b2a] text-center leading-[1.1] mb-[12px]">
        Thank you for your order, {orderData.customerName}!
      </h1>
      <p className="text-[14px] lg:text-[18px] text-[#3C494E] text-center max-w-[660px] leading-[1.6] mb-[40px]">
        Your high-performance upgrades are being prepared for dispatch. We've sent a confirmation email with all the details.
      </p>

      {/* Main Card */}
      <div className="w-full  flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left: Order Details */}
        <div className="w-full lg:w-[65%] border border-[#e5e7eb] rounded-[12px] p-5 md:p-[32px]">
          <div className="flex justify-between items-start mb-[24px]">
            <div>
              <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-[0.08em] mb-[4px]">Order Number</p>
              <p className="text-[14px] md:text-[16px] font-bold text-[#00677F]">{orderData.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-[0.08em] mb-[4px]">Date</p>
              <p className="text-[12px] md:text-[14px] font-semibold text-[#0d1b2a]">{orderData.date}</p>
            </div>
          </div>

          <div className="border-t border-[#e5e7eb] mb-[24px]" />

          {/* Items */}
          <div className="flex flex-col gap-[20px]">
            {orderData.items.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-start gap-[16px]">
                  <div className="w-[90px] h-[90px] rounded-[8px]  overflow-hidden flex-shrink-0">
                   <img src={item.image} alt="" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-[13px] md:text-[14px] font-semibold text-[#0d1b2a]">{item.name}</p>
                      <p className="text-[13px] md:text-[14px] font-semibold text-[#0d1b2a] ml-2">{item.price}</p>
                    </div>
                    <p className="text-[11px] md:text-[12px] text-[#6b7280] mt-[4px]">{item.description}</p>
                    <span className="inline-block mt-[10px] px-[10px] py-[3px] border border-[#e5e7eb] rounded-[4px] text-[#374151] text-[11px] font-medium">
                      QTY: {item.qty}
                    </span>
                  </div>
                </div>
                {index < orderData.items.length - 1 && <div className="border-t border-[#e5e7eb] mt-[20px]" />}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-[14px] mt-[28px]">
            <button className="w-[70%] flex flex items-center justify-center gap-[8px] bg-[#00677F]  text-white font-semibold py-[14px] px-[20px] rounded-[8px] transition-colors">
              <TruckIcon className="w-[16px] h-[16px]" /> TRACK MY ORDER
            </button>
            <button className="flex flex items-center justify-center gap-[8px] border border-[#d1d5db] hover:bg-[#f9fafb] text-[#374151] font-semibold py-[20px] px-[69px] rounded-[8px] transition-colors">
              VIEW INVOICE
            </button>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-full lg:w-[35%] flex-shrink-0 border border-[#e5e7eb] rounded-[12px] p-[24px] flex flex-col gap-[24px]">
          <div>
            <div className="flex items-center gap-[6px] mb-[12px]">
              <MapPinIcon className="w-[13px] h-[13px] text-[#1a7a7a]" />
              <p className="text-[10px] font-semibold text-[#1a7a7a] uppercase tracking-[0.08em]">Shipping Address</p>
            </div>
            <p className="text-[14px] md:text-[15px] font-bold text-[#0d1b2a] mb-[6px]">{orderData.shipping.name}</p>
            <p className="text-[12px] text-[#6b7280] leading-[1.7]">
              {orderData.shipping.line1}<br />{orderData.shipping.line2}<br />{orderData.shipping.city}<br />{orderData.shipping.country}
            </p>
          </div>

          <div className="border-t border-[#e5e7eb]" />

          <div>
            <div className="flex items-center gap-[6px] mb-[12px]">
              <CreditCardIcon className="w-[13px] h-[13px] text-[#1a7a7a]" />
              <p className="text-[10px] font-semibold text-[#1a7a7a] uppercase tracking-[0.08em]">Payment Method</p>
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="flex items-center justify-center px-[8px] py-[4px] bg-[#1a3a6b] rounded-[4px]">
                <span className="text-[10px] font-extrabold text-white tracking-[0.05em]">VISA</span>
              </div>
              <div>
                <p className="text-[12px] md:text-[13px] font-semibold text-[#0d1b2a]">Visa ending in {orderData.payment.last4}</p>
                <p className="text-[11px] text-[#9ca3af]">Exp: {orderData.payment.expiry}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#e5e7eb]" />

          <div>
            <p className="text-[10px] font-semibold text-[#1a7a7a] uppercase tracking-[0.08em] mb-[14px]">Order Total</p>
            <div className="flex flex-col gap-[8px]">
              <div className="flex justify-between"><span className="text-[#6b7280]">Subtotal</span><span className="text-[#374151] font-medium">{orderData.totals.subtotal}</span></div>
              <div className="flex justify-between"><span className="text-[#6b7280]">Installation Fee</span><span className="text-[#374151] font-medium">{orderData.totals.installationFee}</span></div>
              <div className="flex justify-between"><span className="text-[#6b7280]">Tax</span><span className="text-[#374151] font-medium">{orderData.totals.tax}</span></div>
            </div>
            <div className="border-t border-[#e5e7eb] mt-[14px] pt-[14px] flex justify-between items-center">
              <span className="text-[14px] md:text-[15px] font-bold text-[#0d1b2a]">Total</span>
              <span className="text-[16px] md:text-[18px] font-extrabold text-[#0d1b2a]">{orderData.totals.total}</span>
            </div>
          </div>
        </div>
      </div>
      <section className="w-full  py-[80px] px-5 lg:px-0">
  {/* Header Row */}
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
    <div>
      <h2 className="text-[24px] md:text-[32px] font-semibold text-[#0d1b2a] leading-[1.2] mb-[4px]">
        Complete your setup
      </h2>
      <p className="text-[13px] md:text-[16px] text-[#3C494E]">Curated accessories for your vehicle model.</p>
    </div>
    <a href="#" className="text-[12px] md:text-[14px] text-[#00677F] hover:underline font-medium whitespace-nowrap">
      View All Recommendations
    </a>
  </div>

  {/* Product Container */}
  <div className="flex lg:grid lg:grid-cols-4 overflow-x-auto gap-4 lg:gap-6 scrollbar-hide snap-x -mx-5 px-5 lg:mx-0 lg:px-0 pb-6 lg:pb-0">
    {recommendations.map((item) => (
      <div
        key={item.id}
        /* 
          flex-shrink-0: prevents cards from squishing on mobile
          w-[240px]: sets a consistent card width for the scrollable view
          lg:w-full: allows cards to fill the grid columns on desktop
        */
        className={`cursor-pointer group flex-shrink-0 w-[240px] lg:w-full snap-start ${
          item.featured ? "rounded-[12px] p-[12px] bg-[#EEEDF3]" : ""
        }`}
      >
        {/* Image Container */}
        <div className="w-full aspect-square rounded-[8px] overflow-hidden mb-[14px]">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <p className="text-[14px] md:text-[18px] font-semibold text-[#1A1B1F] leading-[1.3] mb-[4px]">
          {item.name}
        </p>
        <p className="text-[13px] md:text-[16px] text-[#3C494E]">{item.price}</p>
      </div>
    ))}
  </div>
</section>
    </main>
  );
}