"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function FloatingWhatsApp() {
  const defaultMessage =
    "Hello Asvithi Trendz! I am interested in exploring your boutique collections and inquiring about designs.";
  const whatsAppUrl = siteConfig.getWhatsAppLink(defaultMessage);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip / Label visible on hover or large screens */}
      <div className="hidden sm:block mr-3 px-3.5 py-1.5 rounded-full bg-white/95 text-slate-800 text-xs font-semibold shadow-lg border border-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Chat with us on WhatsApp</span>
        </span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Asvithi Trendz on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-emerald-700/40 hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/80"
      >
        {/* Subtle Online Pulse Ring */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-300 border-2 border-white"></span>
        </span>

        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
}
