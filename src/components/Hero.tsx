import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  MapPin,
  ArrowRight,
  ExternalLink,
  Crown,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-[#0E0E34]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/hero-video.mp4(2)" type="video/mp4" />
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.mp4%20(2).mp4" type="video/mp4" />
      </video>

      {/* Luxury Gradient Overlay for High Contrast Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E34]/95 via-[#252E8A]/80 to-[#9A4D87]/60 z-0 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl space-y-6 sm:space-y-8 text-center sm:text-left">
          {/* Location Tag in Cannon Pink Accent */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9A4D87]/20 backdrop-blur-md border border-[#9A4D87]/40 text-xs font-bold text-white shadow-sm">
            <Crown className="w-3.5 h-3.5 text-[#9A4D87]" />
            <span className="tracking-wide text-white">
              Visakhapatnam&apos;s Premier Women&apos;s Boutique
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.12]">
            Exquisite Ethnic &{" "}
            <span className="text-[#9A4D87]">Designer Wear</span> for Women
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-[#F7F6F7]/90 max-w-2xl leading-relaxed font-medium">
            Explore our latest arrivals. Select your favorite design and directly connect with us on WhatsApp for orders & customization.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-accent-gradient hover:opacity-95 text-white font-bold shadow-lg shadow-[#9A4D87]/30 hover:shadow-[#9A4D87]/50 hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold border-2 border-[#5A7FC8]/50 hover:border-[#9A4D87] backdrop-blur-md shadow-sm transition-all text-sm sm:text-base cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#5A7FC8]" />
              <span>Visit Store in PM Palem</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/70 ml-0.5" />
            </a>
          </div>

          {/* Trust Pills */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-[#5A7FC8]/30">
              <CheckCircle2 className="w-4 h-4 text-[#9A4D87] shrink-0" />
              <span>Handcrafted Fabrics</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-[#5A7FC8]/30">
              <Crown className="w-4 h-4 text-[#5A7FC8] shrink-0" />
              <span>Curated Designer Styles</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-[#5A7FC8]/30">
              <Sparkles className="w-4 h-4 text-[#9A4D87] shrink-0" />
              <span>Direct WhatsApp Ordering</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
