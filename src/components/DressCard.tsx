"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Sparkles,
  RefreshCw,
  Check,
  Maximize2,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";
import { DressModel } from "@/types";

interface DressCardProps {
  dress: DressModel;
  index?: number;
}

export function DressCard({ dress, index = 0 }: DressCardProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedModalImageIndex, setSelectedModalImageIndex] = useState<number>(0);

  // Available sizes (ready-to-wear boutique sizes, with fallback)
  const filteredSizes =
    dress.sizes && dress.sizes.length > 0
      ? dress.sizes.filter(
          (s) =>
            typeof s === "string" &&
            s.toLowerCase() !== "custom stitching" &&
            s.toLowerCase() !== "bespoke alterations"
        )
      : [];
  const availableSizes =
    filteredSizes.length > 0 ? filteredSizes : ["Free Size"];

  const [selectedSize, setSelectedSize] = useState<string>(
    availableSizes[0] || "Free Size"
  );

  // Color variants logic
  const variants =
    dress.colorVariants && dress.colorVariants.length > 0
      ? dress.colorVariants
      : [
          {
            colorName: dress.color || "Classic",
            hex: "#252E8A",
            frontImage: dress.imageUrl,
            backImage: undefined,
          },
        ];

  const activeVariant = variants[activeVariantIndex] || variants[0];
  const frontImage = activeVariant.frontImage || dress.imageUrl;
  const backImage = activeVariant.backImage;
  const activeColorName = activeVariant.colorName;

  // Build a complete, unique gallery list (Front, Back, and extra detail/pallu shots)
  const galleryItems: { url: string; label: string }[] = [];
  const seenUrls = new Set<string>();

  const addGalleryItem = (url: string | undefined | null, label: string) => {
    if (url && typeof url === "string" && url.trim().length > 0 && !seenUrls.has(url)) {
      seenUrls.add(url);
      galleryItems.push({ url, label });
    }
  };

  // 1. Primary Front View
  if (frontImage) {
    addGalleryItem(frontImage, "Front View");
  }

  // 2. Back View (if provided and different from front)
  if (backImage && backImage !== frontImage) {
    addGalleryItem(backImage, "Back View");
  }

  // 3. Additional Gallery Photos from dress.images or gallery_images
  const extraImagesPool = [
    ...(Array.isArray(dress.images) ? dress.images : []),
    ...(Array.isArray((dress as any).gallery_images) ? (dress as any).gallery_images : []),
    ...(Array.isArray((dress as any).galleryImages) ? (dress as any).galleryImages : []),
  ];

  let detailIndex = 1;
  extraImagesPool.forEach((url) => {
    if (url && typeof url === "string" && !seenUrls.has(url)) {
      addGalleryItem(url, `Detail ${detailIndex++}`);
    }
  });

  if (galleryItems.length === 0 && dress.imageUrl) {
    galleryItems.push({ url: dress.imageUrl, label: "Front View" });
  }

  // Active photo shown inside the modal
  const activeModalPhoto =
    galleryItems[selectedModalImageIndex]?.url || frontImage;

  // Selected image for WhatsApp message (respects modal active photo or card hover state)
  const currentPhotoForInquiry = isModalOpen
    ? activeModalPhoto
    : isHovered && backImage
    ? backImage
    : frontImage;

  // Format code cleanly (e.g. AT-201 -> #AT-201, avoiding redundant hashes)
  const cleanCode = dress.code ? dress.code.replace(/^#+/, "").trim() : "";
  const codeDisplay = cleanCode ? `#${cleanCode}` : "";

  // Price display if specified
  const priceDisplay =
    typeof dress.price === "number" && dress.price > 0
      ? `₹${dress.price.toLocaleString("en-IN")}`
      : null;

  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // Clean Reference Photo URL (safe for SSR without window.location mismatch)
  const resolvedPhotoUrl = currentPhotoForInquiry
    ? currentPhotoForInquiry.startsWith("http")
      ? currentPhotoForInquiry
      : origin
      ? `${origin}${currentPhotoForInquiry}`
      : currentPhotoForInquiry
    : null;

  // Formatted inquiry text with bold headers
  const messageLines = [
    `*Brand:* Asvithi Trendz`,
    `*Model:* ${dress.title}${codeDisplay ? ` (Code: ${codeDisplay})` : ""}`,
    `*Color:* ${activeColorName}`,
    `*Size:* ${selectedSize}`,
    priceDisplay ? `*Price:* ${priceDisplay}` : null,
    resolvedPhotoUrl ? `*Reference Photo:* ${resolvedPhotoUrl}` : null,
  ].filter(Boolean) as string[];

  const dynamicMessage = messageLines.join("\n");
  const whatsAppUrl = `https://wa.me/918897794449?text=${encodeURIComponent(
    dynamicMessage
  )}`;

  // Handle opening lightbox modal
  const handleOpenModal = () => {
    // If user hovered and back image is showing, open modal on back image index
    if (
      isHovered &&
      backImage &&
      galleryItems.length > 1 &&
      galleryItems[1]?.label === "Back View"
    ) {
      setSelectedModalImageIndex(1);
    } else {
      setSelectedModalImageIndex(0);
    }
    setIsModalOpen(true);
  };

  // Close modal on Escape key press, left/right keyboard arrows navigation, & prevent background scrolling
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft") {
        setSelectedModalImageIndex((prev) =>
          prev > 0 ? prev - 1 : galleryItems.length - 1
        );
      } else if (e.key === "ArrowRight") {
        setSelectedModalImageIndex((prev) =>
          prev < galleryItems.length - 1 ? prev + 1 : 0
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, galleryItems.length]);

  return (
    <>
      <div
        className="group bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#5A7FC8]/15 shadow-sm hover:shadow-xl hover:border-[#5A7FC8]/35 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
        suppressHydrationWarning
      >
        {/* Dress Photo Frame with 3:4 Aspect Ratio & Front/Back Hover Transition */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`Open full size photo gallery for ${dress.title}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpenModal();
            }
          }}
          className="relative aspect-[3/4] w-full overflow-hidden bg-[#F7F6F7] cursor-pointer select-none group/img"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleOpenModal}
          title="Click to view full-screen photo"
        >
          {/* Front Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frontImage}
            alt={`${dress.title} - Front View`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
              isHovered && backImage
                ? "opacity-0 scale-105"
                : "opacity-100 scale-100 group-hover:scale-105"
            }`}
            loading={index < 2 ? "eager" : "lazy"}
            decoding={index < 2 ? "sync" : "async"}
            {...(index < 2 ? { fetchPriority: "high" as const } : {})}
          />

          {/* Back Image (transitions smoothly when hovered) */}
          {backImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={backImage}
              alt={`${dress.title} - Back View`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
              loading="lazy"
              decoding="async"
            />
          )}

          {/* Model Code Pill: Royal Navy #252E8A with white text */}
          <div className="absolute top-3 left-3 bg-[#252E8A] text-white border border-white/20 px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider shadow-sm backdrop-blur-sm z-10">
            {dress.code}
          </div>

          {/* Featured Tag in Cannon Pink Accent */}
          {dress.isFeatured && (
            <div className="absolute top-3 right-3 bg-[#9A4D87] text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1 z-10">
              <Sparkles className="w-2.5 h-2.5 text-white" />
              <span>Featured</span>
            </div>
          )}

          {/* Hover Zoom / Expand Pill Indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0E0E34]/80 hover:bg-[#252E8A] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center gap-1.5 shadow-lg pointer-events-none z-10">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>View Full Size</span>
          </div>

          {/* Front/Back View Hover Indicator Pill (if back view exists) */}
          {backImage && (
            <div className="absolute bottom-3 right-3 bg-[#0E0E34]/85 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide backdrop-blur-md flex items-center gap-1 shadow transition-opacity z-10 border border-white/10">
              <RefreshCw
                className={`w-2.5 h-2.5 ${
                  isHovered ? "rotate-180" : ""
                } transition-transform duration-500 text-[#5A7FC8]`}
              />
              <span>{isHovered ? "Back View" : "Hover for Back"}</span>
            </div>
          )}

          {/* Gallery Count Pill (if extra photos exist) */}
          {galleryItems.length > 2 && (
            <div className="absolute bottom-3 left-3 bg-[#0E0E34]/85 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-md flex items-center gap-1.5 shadow z-10 border border-white/10">
              <Layers className="w-3 h-3 text-[#9A4D87]" />
              <span>{galleryItems.length} Photos</span>
            </div>
          )}

          {/* Bottom Vignette */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0E0E34]/60 to-transparent pointer-events-none" />
        </div>

        {/* Dress Details Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#FFFFFF] space-y-3">
          <div>
            {/* Category Tag: Pill styled in #9A4D87/10 with text #9A4D87 */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#9A4D87]/10 text-[#9A4D87] border border-[#9A4D87]/20">
                {dress.category}
              </span>
              {dress.fabric && (
                <span className="text-[11px] text-[#0E0E34]/70 font-semibold truncate max-w-[140px]">
                  {dress.fabric}
                </span>
              )}
            </div>

            {/* Clickable Dress Title with Hover Color Transition (#9A4D87) */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleOpenModal}
              aria-label={`View photo showcase for ${dress.title} (${dress.code})`}
              className="w-full text-left font-serif font-bold text-[#0E0E34] text-base sm:text-lg leading-snug hover:text-[#9A4D87] transition-colors flex items-center justify-between gap-2 group/title cursor-pointer mt-0.5"
              title="Click to view full-screen image"
            >
              <span className="line-clamp-1">{dress.title}</span>
              <Maximize2 className="w-3.5 h-3.5 text-[#5A7FC8]/60 group-hover/title:text-[#9A4D87] group-hover/title:scale-110 transition-all shrink-0" />
            </button>

            {/* Color Variants Swatches */}
            {variants.length > 0 && (
              <div className="mt-3 pt-2 border-t border-[#5A7FC8]/15">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-[#0E0E34]/70 font-medium">
                    Color:{" "}
                    <strong className="text-[#0E0E34] font-bold">
                      {activeColorName}
                    </strong>
                  </span>
                  <span className="text-[#9A4D87] font-semibold text-[10px]">
                    {variants.length}{" "}
                    {variants.length === 1 ? "shade" : "shades"}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {variants.map((variant, idx) => {
                    const isSelected = idx === activeVariantIndex;
                    return (
                      <button
                        key={variant.colorName + idx}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => {
                          setActiveVariantIndex(idx);
                          setIsHovered(false);
                          setSelectedModalImageIndex(0);
                        }}
                        title={variant.colorName}
                        aria-label={`Select color ${variant.colorName} for ${dress.title}`}
                        className={`relative w-6 h-6 rounded-full transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "ring-2 ring-[#9A4D87] ring-offset-2 scale-110 shadow-sm"
                            : "ring-1 ring-slate-200 hover:scale-105 opacity-80 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: variant.hex }}
                      >
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-sm">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector Pills */}
            <div className="mt-3 pt-2 border-t border-[#5A7FC8]/15">
              <span className="text-[11px] text-[#0E0E34]/70 font-medium block mb-1.5">
                Available Sizes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => setSelectedSize(size)}
                      aria-label={`Select size ${size} for ${dress.title}`}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#252E8A] text-white shadow-sm border border-[#252E8A]"
                          : "bg-white text-[#0E0E34] border border-[#5A7FC8]/30 hover:border-[#9A4D87] hover:text-[#9A4D87]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price & Dynamic WhatsApp CTA */}
          <div className="pt-3 border-t border-[#5A7FC8]/15 space-y-3">
            {/* Price Row */}
            {typeof dress.price === "number" && (
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-xl font-bold text-[#0E0E34] tracking-tight"
                    suppressHydrationWarning
                  >
                    ₹{dress.price.toLocaleString("en-IN")}
                  </span>
                  {dress.originalPrice && dress.originalPrice > dress.price && (
                    <span
                      className="text-xs text-slate-400 line-through"
                      suppressHydrationWarning
                    >
                      ₹{dress.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-[#252E8A] bg-[#5A7FC8]/10 border border-[#5A7FC8]/30 px-2 py-0.5 rounded-full">
                  In Stock
                </span>
              </div>
            )}

            {/* Primary CTA Button: WhatsApp styled with authentic green (#25D366) */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Inquire about ${dress.title} (${dress.code}) on WhatsApp`}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1caa51] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 group/btn cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366] group-hover/btn:scale-110 transition-transform" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Full-Screen Responsive Lightbox Modal in Deep Midnight Palette */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0E0E34]/90 backdrop-blur-md animate-in fade-in duration-200 select-none"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[96vh] flex flex-col items-center justify-between text-white animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar: Title, Code, Photo Index, and Clean Close (X) Button */}
            <div className="w-full flex items-center justify-between gap-4 pb-3 border-b border-white/15 mb-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xs font-mono font-bold bg-accent-gradient text-white px-2.5 py-1 rounded-full shadow-sm">
                  {dress.code}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-xl text-white truncate drop-shadow-sm">
                  {dress.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex text-xs font-semibold text-white/80 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                  Photo {selectedModalImageIndex + 1} of {galleryItems.length}
                </span>

                {/* Clean Close (X) Button */}
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close photo gallery"
                  className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#9A4D87] text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 border border-white/20 shadow-lg cursor-pointer shrink-0"
                  title="Close lightbox (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main High-Resolution Photo Display Area */}
            <div className="relative w-full flex-1 flex items-center justify-center min-h-[46vh] max-h-[62vh] sm:max-h-[66vh] my-auto overflow-hidden group/main">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeModalPhoto}
                alt={`${dress.title} - ${galleryItems[selectedModalImageIndex]?.label || "Photo"}`}
                className="max-h-[60vh] sm:max-h-[64vh] max-w-full w-auto object-contain rounded-2xl shadow-2xl border border-white/15 transition-all duration-300"
              />

              {/* Angle/Detail Badge on Image */}
              <div className="absolute bottom-3 left-3 bg-[#0E0E34]/85 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-sm flex items-center gap-1.5 z-10">
                <Eye className="w-3.5 h-3.5 text-[#9A4D87]" />
                <span>
                  {galleryItems[selectedModalImageIndex]?.label || "Photo"} ({selectedModalImageIndex + 1}/{galleryItems.length})
                </span>
              </div>

              {/* Previous Photo Chevron Button */}
              {galleryItems.length > 1 && (
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedModalImageIndex((prev) =>
                      prev > 0 ? prev - 1 : galleryItems.length - 1
                    );
                  }}
                  aria-label="Previous photo in gallery"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0E0E34]/75 hover:bg-[#9A4D87] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all cursor-pointer shadow-lg z-10"
                  title="Previous Photo (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Photo Chevron Button */}
              {galleryItems.length > 1 && (
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedModalImageIndex((prev) =>
                      prev < galleryItems.length - 1 ? prev + 1 : 0
                    );
                  }}
                  aria-label="Next photo in gallery"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0E0E34]/75 hover:bg-[#9A4D87] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all cursor-pointer shadow-lg z-10"
                  title="Next Photo (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Thumbnail Strip / Carousel of ALL uploaded images */}
            {galleryItems.length > 1 && (
              <div className="w-full py-2.5 flex items-center justify-center">
                <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto max-w-full px-2 py-1 scrollbar-thin scrollbar-thumb-white/20">
                  {galleryItems.map((item, idx) => {
                    const isSelected = idx === selectedModalImageIndex;
                    return (
                      <button
                        key={`${item.url}-${idx}`}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setSelectedModalImageIndex(idx)}
                        aria-label={`View photo ${idx + 1}: ${item.label}`}
                        className={`relative shrink-0 w-13 h-17 sm:w-16 sm:h-20 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer border ${
                          isSelected
                            ? "ring-2 ring-[#9A4D87] ring-offset-2 ring-offset-[#0E0E34] border-white scale-105 shadow-lg opacity-100"
                            : "opacity-60 hover:opacity-100 border-white/25 hover:border-white/70"
                        }`}
                        title={`${item.label} (Click to switch)`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.url}
                          alt={item.label}
                          className="w-full h-full object-cover object-top"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-[#0E0E34]/90 text-white text-[9px] font-bold text-center truncate py-0.5 px-0.5">
                          {item.label.replace(" View", "")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Controls: Color, Size & WhatsApp Inquiry */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-2.5 border-t border-white/15">
              <div className="text-xs text-white/80 font-medium flex items-center gap-2">
                <span>
                  Color: <strong className="text-white">{activeColorName}</strong>
                </span>
                <span className="text-white/40">•</span>
                <span>
                  Size: <strong className="text-white">{selectedSize}</strong>
                </span>
                {priceDisplay && (
                  <>
                    <span className="text-white/40">•</span>
                    <strong className="text-[#9A4D87] text-sm">{priceDisplay}</strong>
                  </>
                )}
              </div>

              {/* WhatsApp Inquiry Button Inside Lightbox (Authentic Green #25D366) */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Inquire about ${dress.title} on WhatsApp`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
