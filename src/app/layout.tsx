import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asvithitrendz.com"),
  title: "Asvithi Trendz | Boutique in PM Palem, Visakhapatnam | Designer Sarees Vizag",
  description:
    "Discover premier women's fashion at Asvithi Trendz, the top boutique in PM Palem, Visakhapatnam. Handcrafted designer sarees, festive lehengas, chic kurtis, and bridal wear in Andhra Pradesh. Browse and order on WhatsApp.",
  keywords: [
    "Boutique in PM Palem, Visakhapatnam",
    "Designer Sarees Vizag",
    "Women wear Andhra Pradesh",
    "Asvithi Trendz",
    "PM Palem Boutique",
    "Pothinamallayya Palem boutique",
    "Bridal Lehengas Vizag",
    "Anand Nagar Visakhapatnam dress store",
    "Visakhapatnam ethnic wear",
    "Ready to wear boutique Vizag",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: "Asvithi Trendz | Boutique in PM Palem, Visakhapatnam | Designer Sarees Vizag",
    description:
      "Premier ethnic & modern women's wear boutique in PM Palem, Visakhapatnam. Shop designer sarees, bridal lehengas, and kurtis with direct WhatsApp ordering.",
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Asvithi Trendz Boutique Collection - Visakhapatnam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asvithi Trendz | Boutique in PM Palem, Visakhapatnam",
    description:
      "Designer Sarees, Bridal Lehengas & Kurtis at Asvithi Trendz in PM Palem, Visakhapatnam, Andhra Pradesh.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  alternates: {
    canonical: "https://asvithitrendz.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org ClothingStore Structured JSON-LD for Local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Asvithi Trendz",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
    "@id": siteConfig.mapsUrl,
    url: "https://asvithitrendz.com",
    telephone: siteConfig.phone,
    priceRange: "₹₹",
    description:
      "Boutique in PM Palem, Visakhapatnam offering curated ethnic and modern women wear in Andhra Pradesh, including designer sarees, bridal lehengas, and kurtis.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "1st Floor, Opp ICICI Bank, Bus Stop, Anand Nagar, SBI Colony, Pothinamallayya Palem",
      addressLocality: "Visakhapatnam",
      addressRegion: "Andhra Pradesh",
      postalCode: "530041",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.8184,
      longitude: 83.3444,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "21:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Visakhapatnam",
    },
    hasMap: siteConfig.mapsUrl,
    sameAs: [
      siteConfig.socialLinks.instagram,
      siteConfig.socialLinks.facebook,
      siteConfig.socialLinks.whatsapp,
    ],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#F7F6F7] text-[#0E0E34] antialiased selection:bg-[#9A4D87] selection:text-white relative"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
