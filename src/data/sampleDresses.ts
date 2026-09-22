import { DressModel } from "@/types";

export const sampleDresses: DressModel[] = [
  {
    id: "at-001",
    title: "Gulabi Organza Handworked Saree",
    code: "AT-SR-101",
    category: "Sarees",
    price: 4999,
    originalPrice: 6499,
    isFeatured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    tags: ["Handwork", "Organza", "Pastel", "Party Wear"],
    createdAt: "2026-03-01T10:00:00Z",
    description:
      "Delicate powder rose organza saree with intricate champagne gold zardozi border and matching designer blouse piece.",
    fabric: "Pure Organza",
    inStock: true,
    color: "Dusty Rose & Champagne",
  },
  {
    id: "at-002",
    title: "Royal Emerald & Gold Festive Lehenga",
    code: "AT-LH-204",
    category: "Lehengas",
    price: 12499,
    originalPrice: 15999,
    isFeatured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    tags: ["Bridal", "Festive", "Gold Zari", "Heavy Flare"],
    createdAt: "2026-03-05T12:00:00Z",
    description:
      "Regal raw silk lehenga with elaborate champagne gold zari embroidery, handcrafted cancan flare, and embellished dupatta.",
    fabric: "Silk Blend",
    inStock: true,
    color: "Deep Rose & Gold",
  },
  {
    id: "at-003",
    title: "Chanderi Silk Anarkali Suit Set",
    code: "AT-KT-305",
    category: "Kurtis & Suits",
    price: 3299,
    originalPrice: 4199,
    isFeatured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80",
    tags: ["Festive", "Chanderi", "Anarkali", "Subtle Shimmer"],
    createdAt: "2026-03-10T14:30:00Z",
    description:
      "Graceful rose-tinted Chanderi silhouette adorned with gota patti neckline and a printed floral dupatta.",
    fabric: "Chanderi Silk",
    inStock: true,
    color: "Blush Pink",
  },
  {
    id: "at-004",
    title: "Contemporary Indo-Western Cape Set",
    code: "AT-IW-408",
    category: "Indo-Western",
    price: 5899,
    originalPrice: 7200,
    isFeatured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80",
    tags: ["Modern", "Cape Style", "Georgette", "Cocktail"],
    createdAt: "2026-03-12T09:15:00Z",
    description:
      "Flowing georgette palazzo coordinates paired with an embellished bustier and sheer embroidered cape.",
    fabric: "Georgette & Satin",
    inStock: true,
    color: "Champagne Gold",
  },
];
