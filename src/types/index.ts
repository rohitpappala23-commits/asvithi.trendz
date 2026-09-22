export type ProductCategory =
  | "Sarees"
  | "Kurtis"
  | "Lehengas"
  | "Western Wear"
  | "Bridal Wear"
  | string;

export type DressSize =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "Free Size"
  | string;

export interface ColorVariant {
  colorName: string;
  hex: string;
  frontImage: string;
  backImage?: string;
}

export interface DressModel {
  id: string;
  title: string;
  code: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  isFeatured: boolean;
  imageUrl: string;
  images?: string[];
  colorVariants?: ColorVariant[];
  fabric?: string;
  sizes?: DressSize[];
  tags: string[];
  createdAt: string | Date;
  description?: string;
  color?: string;
  inStock?: boolean;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-low-to-high"
  | "price-high-to-low";

export interface FilterState {
  category: string | "All";
  searchQuery: string;
  sortBy: SortOption;
  onlyFeatured: boolean;
}

export interface BoutiqueContactInfo {
  phone: string;
  whatsappNumber: string;
  address: string;
  mapsUrl: string;
  workingHours: string;
}
