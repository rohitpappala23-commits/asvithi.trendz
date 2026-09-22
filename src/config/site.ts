export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export const siteConfig = {
  name: "Asvithi Trendz",
  tagline: "Curated Ethnic & Modern Women's Wear",
  description:
    "Discover exquisite women's ethnic and modern fashion at Asvithi Trendz in PM Palem, Visakhapatnam. Featuring handpicked sarees, designer lehengas, chic kurtis, Indo-western ensembles, and bridal collections.",
  phone: "+91 88977 94449",
  whatsappNumber: "918897794449",
  address:
    "1st Floor, Opp ICICI Bank, Bus Stop, Anand Nagar, SBI Colony, Pothinamallayya Palem, Visakhapatnam, 530041",
  mapsUrl:
    "https://maps.google.com/?q=Asvithi+Trendz+Pothinamallayya+Palem+Visakhapatnam",
  workingHours: "Mon - Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 9:00 PM",
  email: "contact@asvithitrendz.com",
  locationShort: "PM Palem, Visakhapatnam",
  landmarks: "Opp ICICI Bank, Anand Nagar Bus Stop",
  
  // Quick Contact Helpers
  getWhatsAppLink: (message?: string): string => {
    const defaultMsg =
      "Hello Asvithi Trendz! I would like to inquire about your boutique collection.";
    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/918897794449?text=${text}`;
  },

  getProductInquiryLink: (productTitle: string, productCode: string, imageUrl?: string): string => {
    const text = encodeURIComponent(
      `Hello Asvithi Trendz! I am interested in *${productTitle}* (Code: ${productCode}).${
        imageUrl ? ` Photo: ${imageUrl}.` : ""
      } Is this available?`
    );
    return `https://wa.me/918897794449?text=${text}`;
  },

  getPhoneCallLink: (): string => {
    return "tel:+918897794449";
  },

  // Main Navigation Links
  navItems: [
    { title: "All Collections", href: "/#catalog" },
    { title: "Sarees", href: "/#sarees" },
    { title: "Lehengas", href: "/#lehengas" },
    { title: "Kurtis", href: "/#kurtis" },
    { title: "Visit Store", href: "/#visit" },
  ] as NavItem[],

  // Boutique Highlights
  highlights: [
    {
      title: "Handpicked Ethnic Styles",
      description: "Authentic sarees, pure silk, organza, and handcrafted artisanal drapes.",
    },
    {
      title: "Ready-to-Wear Perfection",
      description: "Carefully curated standard sizing tailored to flatter every silhouette effortlessly.",
    },
    {
      title: "Designer Bridal & Festive",
      description: "Glamorous lehengas and Indo-western evening wear for memorable occasions.",
    },
    {
      title: "Personalized Styling",
      description: "Dedicated one-on-one styling guidance at our PM Palem showroom.",
    },
  ],

  // Social handles (for future expansion)
  socialLinks: {
    instagram: "https://instagram.com/asvithi_trendz",
    facebook: "https://facebook.com/asvithitrendz",
    whatsapp: "https://wa.me/918897794449",
  },
} as const;

export type SiteConfig = typeof siteConfig;
