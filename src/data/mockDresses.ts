import { DressModel } from "@/types";

export const mockDresses: DressModel[] = [
  {
    id: "at-101",
    title: "Gulabi Organza Handworked Saree",
    code: "#AT-101",
    category: "Sarees",
    price: 4999,
    originalPrice: 6499,
    isFeatured: true,
    fabric: "Pure Organza & Silk",
    sizes: ["Free Size"],
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    colorVariants: [
      {
        colorName: "Blush Rose",
        hex: "#e28292",
        frontImage:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
      },
      {
        colorName: "Champagne Gold",
        hex: "#d4af37",
        frontImage:
          "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85",
      },
      {
        colorName: "Mint Aqua",
        hex: "#70c1b3",
        frontImage:
          "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
      },
    ],
    tags: ["Organza", "Zari Border", "Pastel Pink", "Party Wear"],
    createdAt: "2026-03-01T10:00:00Z",
    description:
      "Exquisite soft blush organza drape embellished with delicate scalloped zardozi borders and an unstitched designer blouse piece.",
    inStock: true,
  },
  {
    id: "at-102",
    title: "Kanjivaram Heritage Silk Saree",
    code: "#AT-102",
    category: "Sarees",
    price: 8999,
    originalPrice: 11999,
    isFeatured: true,
    fabric: "Pure Silk Blend",
    sizes: ["Free Size"],
    imageUrl:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85",
    colorVariants: [
      {
        colorName: "Deep Crimson",
        hex: "#881337",
        frontImage:
          "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
      },
      {
        colorName: "Royal Teal",
        hex: "#006d77",
        frontImage:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=85",
      },
    ],
    tags: ["Silk", "Kanjivaram", "Gold Brocade", "Traditional"],
    createdAt: "2026-03-03T11:00:00Z",
    description:
      "Regal woven Kanjivaram silk saree with traditional temple motifs, heavy contrast pallu, and matching blouse fabric.",
    inStock: true,
  },
  {
    id: "at-301",
    title: "Chanderi Silk Anarkali Suit Set",
    code: "#AT-301",
    category: "Kurtis",
    price: 3499,
    originalPrice: 4499,
    isFeatured: true,
    fabric: "Chanderi Silk & Mulmul",
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageUrl:
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=85",
    colorVariants: [
      {
        colorName: "Dusty Peach",
        hex: "#e8927c",
        frontImage:
          "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
      },
      {
        colorName: "Powder Blue",
        hex: "#7ba7d7",
        frontImage:
          "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=85",
      },
      {
        colorName: "Sage Olive",
        hex: "#588157",
        frontImage:
          "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=85",
      },
    ],
    tags: ["Anarkali", "Chanderi", "Gota Patti", "Festive"],
    createdAt: "2026-03-08T15:20:00Z",
    description:
      "Three-piece flared Chanderi Anarkali kurti featuring handcrafted gota patti yoke, cigarette pants, and a floral organza dupatta.",
    inStock: true,
  },
  {
    id: "at-302",
    title: "Pure Muslin Straight Cut Tunic Set",
    code: "#AT-302",
    category: "Kurtis",
    price: 2299,
    originalPrice: 2899,
    isFeatured: false,
    fabric: "100% Breathable Muslin",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    imageUrl:
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
    colorVariants: [
      {
        colorName: "Sky Azure",
        hex: "#48cae4",
        frontImage:
          "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=85",
      },
      {
        colorName: "Lemon Butter",
        hex: "#f4d35e",
        frontImage:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
      },
    ],
    tags: ["Daily Chic", "Muslin", "Comfort Fit", "Straight Cut"],
    createdAt: "2026-03-09T16:00:00Z",
    description:
      "Everyday luxury straight kurti tailored from handloom muslin with thread embroidered placket and cropped trousers.",
    inStock: true,
  },
  {
    id: "at-401",
    title: "Contemporary Georgette Cape Jumpsuit",
    code: "#AT-401",
    category: "Western Wear",
    price: 5499,
    originalPrice: 6999,
    isFeatured: true,
    fabric: "Georgette & Crepe",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
    colorVariants: [
      {
        colorName: "Royal Navy",
        hex: "#252E8A",
        frontImage:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
      },
      {
        colorName: "Indigo Blue",
        hex: "#5A7FC8",
        frontImage:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
      },
    ],
    tags: ["Indo-Western", "Cape Style", "Cocktail", "Fusion"],
    createdAt: "2026-03-10T10:45:00Z",
    description:
      "Modern tailored cocktail jumpsuit paired with a floor-length sheer embroidered cape with delicate crystal borders.",
    inStock: true,
  },
  {
    id: "at-402",
    title: "Emerald Satin Flared Evening Gown",
    code: "#AT-402",
    category: "Western Wear",
    price: 6899,
    originalPrice: 8500,
    isFeatured: false,
    fabric: "Heavy Silk Satin",
    sizes: ["S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    colorVariants: [
      {
        colorName: "Emerald Jewel",
        hex: "#1b4931",
        frontImage:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
      },
      {
        colorName: "Midnight Navy",
        hex: "#0E0E34",
        frontImage:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
      },
    ],
    tags: ["Evening Wear", "Satin", "Flared Gown", "Modern"],
    createdAt: "2026-03-11T13:30:00Z",
    description:
      "Floor-sweeping satin gown featuring structured corset boning, a draped neckline, and fluid pleated flare.",
    inStock: true,
  },
  {
    id: "at-201",
    title: "Royal Crimson Velvet Bridal Lehenga",
    code: "#AT-201",
    category: "Bridal Wear",
    price: 24999,
    originalPrice: 32000,
    isFeatured: true,
    fabric: "Micro Velvet & Silk",
    sizes: ["Free Size"],
    imageUrl:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
    colorVariants: [
      {
        colorName: "Scarlet Maroon",
        hex: "#6b0f1a",
        frontImage:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=85",
      },
      {
        colorName: "Imperial Violet",
        hex: "#3c096c",
        frontImage:
          "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
      },
    ],
    tags: ["Bridal", "Heavy Flare", "Velvet", "Gold Zari"],
    createdAt: "2026-03-05T09:30:00Z",
    description:
      "Grand scarlet bridal lehenga adorned with dense gold dabka work, cancan structured flare, and dual embellished dupattas.",
    inStock: true,
  },
  {
    id: "at-202",
    title: "Champagne Sequin Party Lehenga",
    code: "#AT-202",
    category: "Lehengas",
    price: 14500,
    originalPrice: 18000,
    isFeatured: true,
    fabric: "Net & Satin",
    sizes: ["S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=85",
    colorVariants: [
      {
        colorName: "Champagne Shimmer",
        hex: "#dfbe7a",
        frontImage:
          "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=85",
      },
      {
        colorName: "Rose Quartz",
        hex: "#e8a598",
        frontImage:
          "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
        backImage:
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
      },
    ],
    tags: ["Champagne", "Sequin Work", "Sangeet", "Festive"],
    createdAt: "2026-03-06T14:15:00Z",
    description:
      "Metallic shimmer lehenga with tonal sequin embroidery, plunging designer choli, and soft net dupatta.",
    inStock: true,
  },
];
