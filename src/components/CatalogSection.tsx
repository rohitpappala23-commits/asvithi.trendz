"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, X, SlidersHorizontal } from "lucide-react";
import { DressModel } from "@/types";
import { DressCard } from "@/components/DressCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { mockDresses } from "@/data/mockDresses";

interface CatalogSectionProps {
  initialDresses?: DressModel[];
}

const CATEGORIES = ["All", "Sarees", "Kurtis", "Lehengas", "Western Wear", "Bridal Wear"] as const;

export function CatalogSection({ initialDresses = mockDresses }: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter dresses based on category and search query (Model Code or Title)
  const filteredDresses = useMemo(() => {
    return initialDresses.filter((dress) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" ||
        dress.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory.includes("Western") &&
          dress.category.toLowerCase().includes("western")) ||
        (selectedCategory.includes("Bridal") &&
          dress.category.toLowerCase().includes("bridal"));

      // Search query filter (matches code or title)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        dress.code.toLowerCase().includes(query) ||
        dress.title.toLowerCase().includes(query) ||
        dress.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialDresses, selectedCategory, searchQuery]);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <section id="catalog" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#9A4D87] border border-[#5A7FC8]/30 text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#9A4D87]" />
          <span>Curated Boutique Catalog</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E0E34] tracking-tight">
          Explore Our Handcrafted Collections
        </h2>
        <p className="text-[#0E0E34]/70 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed font-medium">
          Browse through our exclusive Sarees, Lehengas, Kurtis, and Indo-Western wear. Click &ldquo;Inquire on WhatsApp&rdquo; on any design for immediate availability and custom sizing details.
        </p>
      </div>

      {/* Interactive Controls Bar: Search & Category Pills */}
      <div className="space-y-6 mb-10">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#5A7FC8] absolute left-4 pointer-events-none" />
            <input
              type="text"
              id="catalog-search"
              name="catalogSearch"
              aria-label="Search by Model Code or dress name"
              suppressHydrationWarning
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Model Code (e.g. #AT-104) or dress name..."
              className="w-full pl-11 pr-10 py-3.5 rounded-full bg-white border border-[#5A7FC8]/30 text-[#0E0E34] placeholder:text-[#0E0E34]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#252E8A] focus:border-transparent shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setSearchQuery("")}
                className="absolute right-4 p-1 rounded-full text-[#0E0E34]/60 hover:text-[#0E0E34] hover:bg-[#5A7FC8]/10 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills Component */}
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Active Filter Indicators & Result Count */}
        <div className="flex items-center justify-between text-xs text-[#0E0E34]/70 pt-2 border-b border-[#5A7FC8]/20 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#9A4D87]" />
            <span>
              Showing <strong className="text-[#0E0E34] font-bold">{filteredDresses.length}</strong>{" "}
              {filteredDresses.length === 1 ? "design" : "designs"}
              {selectedCategory !== "All" && (
                <>
                  {" "}in <span className="text-[#9A4D87] font-bold">{selectedCategory}</span>
                </>
              )}
              {searchQuery && (
                <>
                  {" "}matching &ldquo;<span className="text-[#0E0E34] font-bold">{searchQuery}</span>&rdquo;
                </>
              )}
            </span>
          </div>

          {(selectedCategory !== "All" || searchQuery !== "") && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-[#252E8A] hover:text-[#9A4D87] font-bold underline underline-offset-2 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Catalog Grid: 2 columns on mobile, 3 on md, 4 on lg */}
      {filteredDresses.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredDresses.map((dress, index) => (
            <DressCard key={dress.id} dress={dress} index={index} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#5A7FC8]/20 shadow-sm max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#5A7FC8]/10 text-[#252E8A] flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#0E0E34]">
            No designs found
          </h3>
          <p className="text-[#0E0E34]/70 text-xs sm:text-sm mt-1 mb-6">
            We couldn&apos;t find any dresses matching your criteria. Try adjusting your search query or category filter.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent-gradient hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            <span>View All Collections</span>
          </button>
        </div>
      )}
    </section>
  );
}
