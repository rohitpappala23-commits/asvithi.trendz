import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-white border-t border-[#5A7FC8]/20 text-[#0E0E34]/80">
      {/* Upper Footer: Visit Invitation Banner in Deep Midnight */}
      <div className="bg-[#0E0E34] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#252E8A]/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#9A4D87] font-bold">
              Visit Our Showroom
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Step Into Asvithi Trendz at PM Palem
            </h3>
            <p className="text-[#F7F6F7]/80 text-xs sm:text-sm max-w-xl font-medium">
              Experience the touch of authentic fabrics and enjoy personalized styling consultations with our fashion experts.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-gradient hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>

            <a
              href={siteConfig.getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E34] group-hover:text-[#9A4D87] transition-colors">
                {siteConfig.name}
              </span>
              <span className="block text-xs uppercase tracking-widest font-bold text-[#9A4D87] mt-0.5">
                {siteConfig.tagline}
              </span>
            </Link>

            <p className="text-sm text-[#0E0E34]/70 leading-relaxed max-w-sm font-medium">
              Your destination for handpicked ethnic and designer women&apos;s wear in Visakhapatnam. Quality craftsmanship, ready-to-wear fashion, and timeless style.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#5A7FC8]/10 hover:bg-[#5A7FC8]/20 text-[#252E8A] hover:text-[#9A4D87] flex items-center justify-center transition-colors border border-[#5A7FC8]/20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#5A7FC8]/10 hover:bg-[#5A7FC8]/20 text-[#252E8A] hover:text-[#9A4D87] flex items-center justify-center transition-colors border border-[#5A7FC8]/20"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href={siteConfig.getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] flex items-center justify-center transition-colors border border-[#25D366]/30"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Col */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-[#0E0E34] text-base tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="text-[#0E0E34]/70 hover:text-[#252E8A] transition-colors inline-flex items-center gap-1.5 font-medium"
                  >
                    <span className="text-[#9A4D87] text-xs">›</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Store Timings Col */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif font-bold text-[#0E0E34] text-base tracking-wide">
              Store Information & Timings
            </h4>

            <div className="space-y-3 text-sm text-[#0E0E34]/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#252E8A] shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[#0E0E34]">Boutique Address:</p>
                  <p className="mt-0.5 leading-relaxed font-medium">{siteConfig.address}</p>
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#252E8A] hover:text-[#9A4D87] mt-1 transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#252E8A] shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[#0E0E34]">Phone & WhatsApp:</p>
                  <a
                    href={siteConfig.getPhoneCallLink()}
                    className="text-[#0E0E34]/80 hover:text-[#252E8A] transition-colors block mt-0.5 font-semibold"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#252E8A] shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[#0E0E34]">Working Hours:</p>
                  <p className="text-[#0E0E34]/70 mt-0.5 font-medium">{siteConfig.workingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright, Owner Portal & SAMify Digital Credit */}
        <div className="mt-12 pt-8 border-t border-[#5A7FC8]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0E0E34]/70">
          <p>
            © {currentYear} <span className="font-bold text-[#0E0E34]">{siteConfig.name}</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[#0E0E34]/70 hover:text-[#252E8A] transition-colors text-[11px] font-semibold"
            >
              Owner Portal
            </Link>
            <span className="text-[#5A7FC8]/40">•</span>
            <p className="flex items-center gap-1 text-[#0E0E34]/70">
              <span>Designed & Developed by</span>
              <span className="font-bold text-[#252E8A] hover:text-[#9A4D87] transition-colors">
                SAMify Digital
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
