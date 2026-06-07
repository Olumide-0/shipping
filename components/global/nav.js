"use client";

import { ShoppingCart, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Shop", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Support", href: "/support" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-[80px] py-[24px] bg-white border-b border-gray-100">
        {/* Logo */}
        <Link href="/">
        <h1 className="text-[15px] font-bold tracking-wide text-[#1A1B1F] select-none">
          GENESIS AUTOMODS
        </h1>

        </Link>

        {/* Center Nav Links */}
        <ul className="flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className={`text-[13px] relative pb-[2px] transition-colors duration-150 ${
                  pathname === href
                    ? "text-[#00677F] font-medium after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-[#00677F] after:rounded-full"
                    : "text-[#1A1B1F] hover:text-[#00677F]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button className="text-[#1A1B1F] hover:text-[#1A6BFF] transition-colors duration-150 cursor-pointer">
            <ShoppingCart size={16} strokeWidth={1.8} />
          </button>
          <button className="text-[#1A1B1F] hover:text-[#1A6BFF] transition-colors duration-150 cursor-pointer">
            <Settings size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </nav>
  );
}