"use client";

interface CategoryFilterProps {
  categories: readonly string[] | string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            type="button"
            suppressHydrationWarning
            onClick={() => onSelectCategory(category)}
            aria-label={`Filter by ${category} category`}
            aria-pressed={isActive}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-accent-gradient text-white shadow-md shadow-[#9A4D87]/25 scale-105 border border-transparent"
                : "bg-white text-[#0E0E34] border border-[#5A7FC8]/30 hover:border-[#9A4D87] hover:text-[#9A4D87] hover:bg-[#F7F6F7] shadow-xs"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
