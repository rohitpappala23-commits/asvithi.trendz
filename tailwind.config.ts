import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Asvithi Trendz Luxury Palette
        brand: {
          midnight: "#0E0E34",    // Haiti (Deep Midnight)
          navy: "#252E8A",        // Bay of Many (Royal Navy)
          pink: "#9A4D87",        // Cannon Pink (Magenta Accent)
          indigo: "#5A7FC8",      // Indigo (Soft Blue Accent)
          canvas: "#F7F6F7",      // Soft White Canvas

          // Legacy semantic aliases mapping to the luxury palette
          bg: "#F7F6F7",
          primary: "#252E8A",
          "primary-hover": "#1e256f",
          surface: "#FFFFFF",
          border: "rgba(90, 127, 200, 0.2)",
          subtle: "#ECE9F2",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          hover: "#20bd5a",
          dark: "#128C7E",
        },
      },
      backgroundImage: {
        "royal-gradient": "linear-gradient(135deg, #0E0E34 0%, #252E8A 50%, #9A4D87 100%)",
        "accent-gradient": "linear-gradient(90deg, #252E8A 0%, #9A4D87 100%)",
        "soft-gradient": "linear-gradient(180deg, #F7F6F7 0%, #ECE9F2 100%)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(14, 14, 52, 0.06), 0 2px 6px -1px rgba(14, 14, 52, 0.04)",
        "card-hover": "0 12px 30px -4px rgba(154, 77, 135, 0.18), 0 4px 12px -2px rgba(37, 46, 138, 0.12)",
        luxury: "0 8px 25px -4px rgba(154, 77, 135, 0.3)",
      },
      borderRadius: {
        boutique: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
