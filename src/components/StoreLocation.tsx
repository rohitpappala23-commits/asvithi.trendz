import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  ExternalLink,
  Sparkles,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export function StoreLocation() {
  const address =
    "First Floor, Opp. ICICI Bank, Bus Stop, Anand Nagar, SBI Colony, Pothinamallayya Palem, Visakhapatnam, Andhra Pradesh 530041";
  const plusCode = "R83X+PC Visakhapatnam";
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Asvithi+Trendz+Pothinamallayya+Palem+Visakhapatnam";
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Asvithi+Trendz+Pothinamallayya+Palem+Visakhapatnam+530041&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="visit" className="bg-soft-gradient border-t border-[#5A7FC8]/20 py-16 sm:py-24 relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#9A4D87]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#252E8A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#9A4D87] border border-[#5A7FC8]/30 text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#9A4D87]" />
            <span>Showroom Experience</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E0E34] tracking-tight">
            Visit Our Boutique in PM Palem
          </h2>
          <p className="text-[#0E0E34]/70 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed font-medium">
            Experience our handpicked bridal and festive collections in person. Feel the fabrics, try custom fits, and get styling advice from our experts.
          </p>
        </div>

        {/* Store Location Card & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Location Details & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#5A7FC8]/20 shadow-xl">
            <div className="space-y-6">
              {/* Timing Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#5A7FC8]/10 border border-[#5A7FC8]/20 text-[#252E8A] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#9A4D87] animate-pulse" />
                <span>Open today until 9:00 PM</span>
              </div>

              {/* Full Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#5A7FC8]/10 border border-[#5A7FC8]/20 flex items-center justify-center text-[#252E8A] shrink-0 mt-1 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#0E0E34] text-lg">
                    Store Address
                  </h4>
                  <p className="text-[#0E0E34]/70 text-sm sm:text-base mt-1 leading-relaxed font-medium">
                    {address}
                  </p>
                </div>
              </div>

              {/* Working Hours & Plus Code Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#5A7FC8]/20">
                {/* Hours */}
                <div className="flex items-start gap-3 bg-[#F7F6F7] p-3.5 rounded-2xl border border-[#5A7FC8]/20">
                  <Clock className="w-4 h-4 text-[#252E8A] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-[#0E0E34] uppercase tracking-wider">
                      Store Hours
                    </h5>
                    <p className="text-xs text-[#0E0E34]/70 mt-0.5 font-semibold leading-relaxed">
                      {siteConfig.workingHours}
                    </p>
                  </div>
                </div>

                {/* Plus Code */}
                <div className="flex items-start gap-3 bg-[#F7F6F7] p-3.5 rounded-2xl border border-[#5A7FC8]/20">
                  <Compass className="w-4 h-4 text-[#9A4D87] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-[#0E0E34] uppercase tracking-wider">
                      Plus Code
                    </h5>
                    <p className="text-xs font-mono font-bold text-[#9A4D87] mt-0.5">
                      {plusCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Landmarks / Boutique Features */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-[#0E0E34]/60 uppercase tracking-wider block">
                  Showroom Landmarks & Amenities
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#0E0E34] font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9A4D87] shrink-0" />
                    <span>Opposite ICICI Bank</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9A4D87] shrink-0" />
                    <span>Anand Nagar Bus Stop</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9A4D87] shrink-0" />
                    <span>1st Floor Showroom</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9A4D87] shrink-0" />
                    <span>Comfortable Trial Rooms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Get Directions & Call Store */}
            <div className="pt-4 border-t border-[#5A7FC8]/20 flex flex-col sm:flex-row gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent-gradient hover:opacity-95 text-white font-bold text-sm shadow-md hover:shadow-lg shadow-[#252E8A]/25 transition-all duration-200 group cursor-pointer"
              >
                <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href="tel:08897794449"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F7F6F7] text-[#0E0E34] font-bold text-sm border-2 border-[#5A7FC8]/30 hover:border-[#252E8A] shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#252E8A]" />
                <span>Call Store</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Google Maps Iframe */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[460px] rounded-3xl overflow-hidden border-2 border-white shadow-xl bg-white flex flex-col">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Asvithi Trendz Boutique Google Map Location"
              className="flex-1 w-full h-full"
            />

            {/* Bottom Location Floating Banner on Map */}
            <div className="bg-white px-4 py-3 border-t border-[#5A7FC8]/20 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#252E8A] shrink-0" />
                <span className="font-bold text-[#0E0E34] line-clamp-1">
                  Asvithi Trendz • PM Palem, Visakhapatnam
                </span>
              </div>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#252E8A] hover:text-[#9A4D87] font-bold whitespace-nowrap inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View Larger Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
