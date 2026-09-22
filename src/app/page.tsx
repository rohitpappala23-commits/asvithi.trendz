import { Hero } from "@/components/Hero";
import { CatalogSection } from "@/components/CatalogSection";
import { StoreLocation } from "@/components/StoreLocation";
import {
  supabase,
  isSupabaseConfigured,
  mapRowToDressModel,
  DatabaseDressRow,
} from "@/lib/supabase";
import { mockDresses } from "@/data/mockDresses";
import { DressModel } from "@/types";

// Always re-evaluate on request so new dresses uploaded from admin appear immediately
export const revalidate = 0;

async function getDresses(): Promise<DressModel[]> {
  if (!isSupabaseConfigured) {
    return mockDresses;
  }

  try {
    const { data, error } = await supabase
      .from("dresses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase query error, using mock data:", error.message);
      return mockDresses;
    }

    if (!data || data.length === 0) {
      // If database table is empty, fall back to high quality mock dresses
      return mockDresses;
    }

    return (data as DatabaseDressRow[]).map(mapRowToDressModel);
  } catch (err) {
    console.error("Failed to connect to Supabase, falling back to mock:", err);
    return mockDresses;
  }
}

export default async function Home() {
  const dresses = await getDresses();

  return (
    <div>
      {/* Hero Showcase */}
      <Hero />

      {/* Interactive Catalog Section with Supabase/Mock Data */}
      <CatalogSection initialDresses={dresses} />

      {/* Dedicated Visit Our Store Section */}
      <StoreLocation />
    </div>
  );
}
