import { createClient } from "@supabase/supabase-js";
import { DressModel, ColorVariant } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("https://") &&
    !supabaseUrl.includes("your-project-ref")
);

export interface DatabaseDressRow {
  id: string;
  title: string;
  code: string;
  category: string;
  price: number | null;
  image_url: string;
  back_image_url?: string | null;
  variants?: ColorVariant[] | any;
  color_variants?: ColorVariant[] | any;
  gallery_images?: string[] | null;
  images?: string[] | null;
  fabric?: string | null;
  sizes?: string[] | null;
  available_sizes?: string[] | null;
  is_featured?: boolean;
  created_at: string;
}

// Map a Supabase row to our frontend DressModel
export function mapRowToDressModel(row: DatabaseDressRow): DressModel {
  // Determine color variants with front & back images
  let variants: ColorVariant[] = [];
  const rawVariants = row.variants || row.color_variants;
  if (Array.isArray(rawVariants) && rawVariants.length > 0) {
    variants = rawVariants;
  } else if (row.image_url) {
    variants = [
      {
        colorName: "Original",
        hex: "#252E8A",
        frontImage: row.image_url,
        backImage: row.back_image_url || row.image_url,
      },
    ];
  }

  // Ready-to-wear sizes resolution (filter out any legacy custom stitching)
  const rawSizes = row.available_sizes || row.sizes;
  const sanitizedSizes = Array.isArray(rawSizes)
    ? rawSizes.filter(
        (s) =>
          typeof s === "string" &&
          s.toLowerCase() !== "custom stitching" &&
          s.toLowerCase() !== "bespoke alterations"
      )
    : undefined;

  // Compile all unique images for multi-image gallery support
  const allImages: string[] = [
    row.image_url,
    row.back_image_url,
    ...(Array.isArray(row.gallery_images) ? row.gallery_images : []),
    ...(Array.isArray(row.images) ? row.images : []),
  ].filter((url): url is string => typeof url === "string" && url.trim().length > 0);
  const uniqueImages = Array.from(new Set(allImages));

  return {
    id: row.id,
    title: row.title,
    code: row.code.startsWith("#") ? row.code : `#${row.code}`,
    category: row.category,
    price: row.price ? Number(row.price) : 0,
    isFeatured: Boolean(row.is_featured),
    imageUrl: row.image_url,
    images: uniqueImages.length > 0 ? uniqueImages : (row.image_url ? [row.image_url] : undefined),
    colorVariants: variants,
    fabric: row.fabric || undefined,
    sizes: sanitizedSizes && sanitizedSizes.length > 0 ? sanitizedSizes : undefined,
    tags: [row.category],
    createdAt: row.created_at,
    inStock: true,
  };
}

// Create Supabase client instance (with dummy fallback if env vars missing to prevent build-time crash)
export const supabase = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
