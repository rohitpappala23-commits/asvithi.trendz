"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Menu, X, Phone, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Boutique Announcement Strip in Haiti (Deep Midnight) */}
      <div className="bg-[#0E0E34] text-[#F7F6F7] text-xs py-1.5 px-4 border-b border-[#252E8A]/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#9A4D87] animate-pulse shrink-0" />
            <span className="font-medium tracking-wide">
              Curated Ethnic & Modern Women&apos;s Wear • PM Palem, Visakhapatnam
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#F7F6F7]/80">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#5A7FC8]" /> Opp ICICI Bank, Anand Nagar
            </span>
            <span>|</span>
            <a
              href={siteConfig.getPhoneCallLink()}
              className="hover:text-[#9A4D87] transition-colors"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar: Pure White / #F7F6F7 with subtle border in #5A7FC8/20 */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#5A7FC8]/20 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Boutique Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full overflow-hidden bg-white p-0.5 shadow-sm border border-[#5A7FC8]/25 group-hover:border-[#9A4D87] group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/logo.png"
                  alt="Asvithi Trendz"
                  fill
                  sizes="(max-width: 640px) 44px, 48px"
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E34] group-hover:text-[#252E8A] transition-colors">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A4D87] -mt-1">
                  Boutique • Vizag
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-sm font-semibold text-[#0E0E34] hover:text-[#252E8A] relative py-1 transition-colors hover:after:w-full after:w-0 after:h-[2px] after:bg-[#9A4D87] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Desktop Right CTA: Chat on WhatsApp & Call */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={siteConfig.getPhoneCallLink()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full text-[#0E0E34] bg-[#F7F6F7] hover:bg-[#252E8A] hover:text-white transition-all border border-[#5A7FC8]/30 group/call cursor-pointer"
                title="Call Boutique"
              >
                <Phone className="w-3.5 h-3.5 text-[#252E8A] group-hover/call:text-[#9A4D87] transition-colors" />
                <span>Call Us</span>
              </a>

              <a
                href={siteConfig.getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Mobile Actions: WhatsApp Icon + Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={siteConfig.getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#25D366] text-white shadow-sm hover:bg-[#20bd5a]"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-[#0E0E34] hover:text-[#252E8A] hover:bg-[#F7F6F7] focus:outline-none focus:ring-2 focus:ring-[#9A4D87]"
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-t border-[#5A7FC8]/20 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#0E0E34] hover:bg-[#F7F6F7] hover:text-[#252E8A] transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#5A7FC8]/20 flex flex-col gap-2">
              <a
                href={siteConfig.getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={siteConfig.getPhoneCallLink()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#5A7FC8]/30 text-[#0E0E34] bg-[#F7F6F7] hover:bg-[#252E8A] hover:text-white text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#252E8A]" />
                <span>Call {siteConfig.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
