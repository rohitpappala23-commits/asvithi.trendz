"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Lock,
  Upload,
  Trash2,
  Image as ImageIcon,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Camera,
  RefreshCw,
  X,
  Layers,
  HelpCircle,
  Check,
  Plus,
  Palette,
} from "lucide-react";
import {
  supabase,
  isSupabaseConfigured,
  DatabaseDressRow,
} from "@/lib/supabase";
import { ColorVariant } from "@/types";
import { ColorPickerModal } from "@/components/ColorPickerModal";

const DEFAULT_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "8897";
const CATEGORIES = [
  "Sarees",
  "Kurtis",
  "Lehengas",
  "Western Wear",
  "Bridal Wear",
] as const;

const STANDARD_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "Free Size",
] as const;

export interface CustomColorVariant {
  name: string;
  hex: string;
}

// Convert title & model code into a URL-friendly slug
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/#/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// Upload file to Supabase storage with clean slugified name and upsert: true
async function uploadFileToSupabase(
  file: File,
  dressTitle: string,
  modelCode: string,
  angle: "front" | "back"
): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const titleSlug = slugify(dressTitle) || "dress";
  const codeSlug = slugify(modelCode) || "model";
  const fileName = `${titleSlug}-${codeSlug}-${angle}.${ext}`;

  const { error } = await supabase.storage
    .from("dress-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error(`Storage upload failed for ${fileName}: ${error.message}`);
  }

  const { data } = supabase.storage
    .from("dress-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

// Upload additional gallery file to Supabase storage 'dress-images/uploads/' with clean slugified name
async function uploadGalleryFileToSupabase(
  file: File,
  dressTitle: string,
  modelCode: string,
  index: number
): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const cleanTitle = slugify(dressTitle) || "dress";
  const cleanCode = slugify(modelCode) || "model";
  const fileName = `uploads/${cleanTitle}-${cleanCode}-gallery-${index}.${ext}`;

  const { error } = await supabase.storage
    .from("dress-images")
    .upload(fileName, file, {
      contentType: file.type || undefined,
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error(`Storage upload failed for ${fileName}: ${error.message}`);
  }

  const { data } = supabase.storage
    .from("dress-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  // Form State - Dual Angle Images
  const [frontImageFile, setFrontImageFile] = useState<File | null>(null);
  const [frontImagePreview, setFrontImagePreview] = useState<string | null>(null);
  const [backImageFile, setBackImageFile] = useState<File | null>(null);
  const [backImagePreview, setBackImagePreview] = useState<string | null>(null);

  // Form State - Additional Gallery Images
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  // Form State - Product Details
  const [title, setTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [category, setCategory] = useState<string>("Sarees");
  const [fabric, setFabric] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [colorVariants, setColorVariants] = useState<CustomColorVariant[]>([]);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["Free Size"]);

  // Status & List State
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [dresses, setDresses] = useState<DatabaseDressRow[]>([]);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // File Input Refs
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Check saved session in sessionStorage
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("asvithi_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch dresses from Supabase when authenticated
  useEffect(() => {
    if (isAuthenticated && isSupabaseConfigured) {
      fetchDresses();
    }
  }, [isAuthenticated]);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("asvithi_admin_auth", "true");
      setPinError("");
    } else {
      setPinError("Incorrect PIN. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("asvithi_admin_auth");
    setPinInput("");
  };

  const fetchDresses = async () => {
    setIsLoadingList(true);
    try {
      const { data, error } = await supabase
        .from("dresses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching dresses:", error);
      } else if (data) {
        setDresses(data as DatabaseDressRow[]);
      }
    } catch (err) {
      console.error("Fetch exception:", err);
    } finally {
      setIsLoadingList(false);
    }
  };

  // Image Selection Handler
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: "front" | "back"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (slot === "front") {
        setFrontImageFile(file);
        setFrontImagePreview(reader.result as string);
      } else {
        setBackImageFile(file);
        setBackImagePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Clear Individual Image Slot
  const handleClearImage = (slot: "front" | "back") => {
    if (slot === "front") {
      setFrontImageFile(null);
      setFrontImagePreview(null);
      if (frontInputRef.current) {
        frontInputRef.current.value = "";
      }
    } else {
      setBackImageFile(null);
      setBackImagePreview(null);
      if (backInputRef.current) {
        backInputRef.current.value = "";
      }
    }
  };

  // Gallery Multi-File Selection Handler
  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const selectedFiles = Array.from(files);
    const readers = selectedFiles.map((file) => {
      return new Promise<{ file: File; preview: string }>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ file, preview: reader.result as string });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setGalleryFiles((prev) => [...prev, ...results.map((r) => r.file)]);
      setGalleryPreviews((prev) => [...prev, ...results.map((r) => r.preview)]);
    });

    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };

  // Remove Individual Gallery Image
  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setGalleryFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setGalleryPreviews((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Add Custom Color Variant from Picker
  const handleAddColor = (newColor: { name: string; hex: string }) => {
    setColorVariants((prev) => {
      const exists = prev.some(
        (c) =>
          c.name.toLowerCase() === newColor.name.toLowerCase() &&
          c.hex.toLowerCase() === newColor.hex.toLowerCase()
      );
      if (exists) return prev;
      return [...prev, newColor];
    });
  };

  // Remove Color Variant
  const handleRemoveColor = (indexToRemove: number) => {
    setColorVariants((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Toggle Individual Size
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        const next = prev.filter((s) => s !== size);
        return next.length > 0 ? next : ["Free Size"];
      } else {
        return [...prev, size];
      }
    });
  };

  // Reset entire form
  const handleResetForm = () => {
    setTitle("");
    setCode("");
    setCategory("Sarees");
    setFabric("");
    setPrice("");
    setIsFeatured(false);
    setColorVariants([]);
    setSelectedSizes(["Free Size"]);
    handleClearImage("front");
    handleClearImage("back");
    setGalleryFiles([]);
    setGalleryPreviews([]);
    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
  };

  // Publish to Supabase Storage & Database
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!title.trim() || !code.trim()) {
      setFeedback({
        type: "error",
        message: "Please enter both the dress title and model code.",
      });
      return;
    }

    if (!frontImageFile) {
      setFeedback({
        type: "error",
        message: "Front View Photo is required. Please upload or capture the main front view.",
      });
      return;
    }

    if (!isSupabaseConfigured) {
      setFeedback({
        type: "error",
        message:
          "Supabase environment variables are missing. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to enable cloud uploads.",
      });
      return;
    }

    setIsPublishing(true);

    try {
      // 1. Upload Front View Photo to 'dress-images' bucket (slugified with upsert: true)
      const frontUrl = await uploadFileToSupabase(
        frontImageFile,
        title,
        code,
        "front"
      );

      // 2. Upload Back View Photo (if provided)
      let backUrl: string | null = null;
      if (backImageFile) {
        backUrl = await uploadFileToSupabase(
          backImageFile,
          title,
          code,
          "back"
        );
      }

      // 3. Upload Additional Gallery Photos to dress-images/uploads/
      const galleryUrls: string[] = [];
      for (let i = 0; i < galleryFiles.length; i++) {
        const url = await uploadGalleryFileToSupabase(
          galleryFiles[i],
          title,
          code,
          i + 1
        );
        galleryUrls.push(url);
      }

      // 4. Format variants array matching boutique colors
      const colors =
        colorVariants.length > 0
          ? colorVariants
          : [{ name: "Original", hex: "#252E8A" }];

      const formattedVariants = colors.map((c) => ({
        colorName: c.name || "Original",
        hex: c.hex || "#252E8A",
        frontImage: frontUrl,
        backImage: backUrl || frontUrl,
      }));

      // Combined list of all uploaded images (Front, Back, and Gallery)
      const allDressImages = [frontUrl, backUrl, ...galleryUrls].filter(Boolean) as string[];

      // Construct model payload ensuring images and gallery_images are included
      const newModel: any = {
        title,
        code: code.trim().toUpperCase(),
        category,
        fabric: fabric.trim() || null,
        price: price ? parseFloat(price) : null,
        is_featured: isFeatured,
        image_url: frontUrl,
        back_image_url: backUrl || frontUrl,
        variants: formattedVariants,
        color_variants: formattedVariants,
        sizes: selectedSizes.length > 0 ? selectedSizes : ["Free Size"],
        available_sizes: selectedSizes.length > 0 ? selectedSizes : ["Free Size"],
        gallery_images: galleryUrls,
        images: allDressImages,
      };

      // Resilient Supabase Insert:
      // If the Supabase schema cache lacks any column (e.g. 'gallery_images', 'images', 'sizes', etc.),
      // dynamically remove the missing column reported by PostgREST and retry.
      let payloadToInsert = { ...newModel };
      let dbError: any = null;

      for (let attempt = 0; attempt < 8; attempt++) {
        const { error } = await supabase.from("dresses").insert([payloadToInsert]);
        if (!error) {
          dbError = null;
          break;
        }

        dbError = error;

        // Check if error is due to a missing column in Supabase schema cache
        // e.g. "Could not find the 'sizes' column of 'dresses' in the schema cache"
        const missingColMatch = error.message?.match(/Could not find the '([^']+)' column/i);
        if (missingColMatch && missingColMatch[1]) {
          const missingCol = missingColMatch[1];
          delete payloadToInsert[missingCol];
          continue;
        }

        // Check for specific column mentions in PGRST204 or PostgreSQL 42703
        if (error.code === "PGRST204" || error.code === "42703") {
          if (error.message?.toLowerCase().includes("gallery_images")) {
            delete payloadToInsert.gallery_images;
            continue;
          }
          if (error.message?.toLowerCase().includes("images")) {
            delete payloadToInsert.images;
            continue;
          }
          if (error.message?.toLowerCase().includes("color_variants")) {
            delete payloadToInsert.color_variants;
            continue;
          }
          if (error.message?.toLowerCase().includes("variants")) {
            delete payloadToInsert.variants;
            continue;
          }
          if (error.message?.toLowerCase().includes("available_sizes")) {
            delete payloadToInsert.available_sizes;
            continue;
          }
          if (error.message?.toLowerCase().includes("sizes")) {
            delete payloadToInsert.sizes;
            continue;
          }
        }

        // For other unrecoverable errors (RLS, network, etc.), stop and raise
        break;
      }

      if (dbError) {
        throw dbError;
      }

      alert("Model successfully published to live catalog!");

      // Success Notification
      setFeedback({
        type: "success",
        message: `Successfully published ${title} (${code.trim().toUpperCase()}) to the live catalog!`,
      });

      // Clear form & refresh
      handleResetForm();
      fetchDresses();
    } catch (err: any) {
      const errorMessage =
        err?.message || "An unexpected error occurred while publishing.";
      console.error("Publish error:", err);
      alert(`Publish Error: ${errorMessage}`);
      setFeedback({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async (dress: DatabaseDressRow) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${dress.title}" (${dress.code}) from the catalog?`
      )
    ) {
      return;
    }

    setDeletingId(dress.id);
    try {
      const { error } = await supabase
        .from("dresses")
        .delete()
        .eq("id", dress.id);

      if (error) {
        alert(`Error deleting record: ${error.message}`);
      } else {
        setDresses((prev) => prev.filter((d) => d.id !== dress.id));
        setFeedback({
          type: "success",
          message: `Deleted "${dress.title}" (${dress.code}) from catalog.`,
        });
      }
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // --- PIN Lock Screen in Soft White Canvas & Luxury Navy ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#F7F6F7]">
        <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl p-8 border border-[#5A7FC8]/20 shadow-xl text-center space-y-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F7F6F7] text-[#252E8A] flex items-center justify-center shadow-inner border border-[#5A7FC8]/25">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#9A4D87]">
              Boutique Owner Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E0E34] mt-1">
              Asvithi Trendz Admin
            </h1>
            <p className="text-xs sm:text-sm text-[#0E0E34]/70 mt-1">
              Enter your showroom PIN to manage collections and upload new designs.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-pin-input" className="sr-only">
                Showroom PIN
              </label>
              <input
                type="password"
                id="admin-pin-input"
                name="adminPin"
                aria-label="Showroom PIN"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError("");
                }}
                placeholder="Enter 4-digit PIN"
                className="w-full text-center text-2xl tracking-[0.5em] py-3.5 px-4 rounded-xl border border-[#5A7FC8]/30 text-[#0E0E34] focus:ring-2 focus:ring-[#252E8A] focus:outline-none bg-white"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-bold mt-1.5 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{pinError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-accent-gradient hover:opacity-95 text-white font-bold text-sm shadow-md shadow-[#9A4D87]/20 transition-all cursor-pointer"
            >
              Unlock Admin Portal
            </button>
          </form>

          <div className="pt-2 border-t border-[#5A7FC8]/15 text-xs text-[#0E0E34]/70">
            <p>
              Showroom default PIN:{" "}
              <span className="font-mono font-bold text-[#0E0E34]">
                {DEFAULT_PIN}
              </span>
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-[#252E8A] hover:text-[#9A4D87] hover:underline mt-2 font-semibold transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Authenticated Admin Dashboard in Soft White Canvas ---
  return (
    <div className="bg-[#F7F6F7] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Top Header Card */}
        <div className="flex items-center justify-between gap-4 mb-8 bg-[#FFFFFF] p-5 sm:p-6 rounded-2xl border border-[#5A7FC8]/20 shadow-sm">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#0E0E34]/70 hover:text-[#9A4D87] transition-colors mb-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Live Website</span>
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E0E34]">
              Boutique Upload Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#0E0E34]/70 font-medium mt-0.5">
              Snap multi-angle photos and publish new designs with interactive front/back hover transitions and full gallery zoom.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3.5 py-2 text-xs font-bold rounded-xl border border-[#5A7FC8]/30 text-[#0E0E34] hover:bg-[#F7F6F7] hover:text-[#9A4D87] transition-colors cursor-pointer shrink-0"
          >
            Lock / Sign Out
          </button>
        </div>

        {/* Configuration Notice if Supabase is unconfigured */}
        {!isSupabaseConfigured && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm leading-relaxed space-y-2 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Supabase Credentials Required for Live Uploads</span>
            </div>
            <p>
              To upload photos directly from your phone camera into cloud storage, add your Supabase credentials in{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-semibold">
                .env.local
              </code>
              :
            </p>
            <pre className="bg-amber-100/70 p-3 rounded-lg font-mono text-xs overflow-x-auto">
              NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co{"\n"}
              NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
            </pre>
            <p className="text-xs text-amber-800">
              Run <code className="font-semibold">supabase/schema.sql</code> in your Supabase SQL Editor to enable dual-angle support and public read access.
            </p>
          </div>
        )}

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-2xl text-xs sm:text-sm font-medium flex items-center justify-between gap-3 shadow-sm ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-rose-50 text-rose-900 border border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Upload Form Card */}
        <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#5A7FC8]/20 shadow-lg mb-12">
          <div className="flex items-center justify-between pb-4 border-b border-[#5A7FC8]/15 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#F7F6F7] text-[#252E8A] flex items-center justify-center font-bold text-base shadow-sm border border-[#5A7FC8]/20">
                +
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#0E0E34]">
                  Upload New Boutique Model
                </h2>
                <p className="text-xs text-[#0E0E34]/70">
                  Add front, back & multi-angle gallery photos directly with your camera or file library
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F6F7] text-[#252E8A] text-xs font-bold border border-[#5A7FC8]/25">
              <RefreshCw className="w-3 h-3 text-[#9A4D87]" />
              <span>Dual-Angle Hover Enabled</span>
            </div>
          </div>

          <form onSubmit={handlePublish} className="space-y-6">
            {/* Dual Angle Photo Upload Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E0E34]">
                  Dual-Angle Dress Photos
                </label>
                <span className="text-[11px] text-[#0E0E34]/70 font-medium flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-[#252E8A]" />
                  Hovering over the card on the live site reveals the back photo
                </span>
              </div>

              {/* Side-by-side dropzones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* 1. FRONT VIEW DROPZONE (Required) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0E0E34] flex items-center gap-1">
                      <span>Front View Photo</span>
                      <span className="text-[#9A4D87] font-extrabold">*</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F7F6F7] text-[#252E8A] border border-[#5A7FC8]/25">
                      Primary / Default
                    </span>
                  </div>

                  <input
                    type="file"
                    ref={frontInputRef}
                    onChange={(e) => handleFileChange(e, "front")}
                    accept="image/*"
                    className="hidden"
                    id="front-image-input"
                    name="frontImage"
                    aria-label="Upload Front View Photo"
                  />

                  {!frontImagePreview ? (
                    <label
                      htmlFor="front-image-input"
                      className="h-64 border-2 border-dashed border-[#5A7FC8]/30 hover:border-[#252E8A] bg-[#F7F6F7]/60 hover:bg-[#F7F6F7] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group select-none"
                    >
                      <div className="w-13 h-13 rounded-2xl bg-white shadow-sm border border-[#5A7FC8]/20 flex items-center justify-center text-[#252E8A] group-hover:scale-110 transition-transform mb-3">
                        <Camera className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-[#0E0E34]">
                        Capture or Browse Front View
                      </p>
                      <p className="text-xs text-[#0E0E34]/70 mt-1 max-w-[200px]">
                        Default showcase photo displayed on the catalog card
                      </p>
                      <span className="mt-3 text-[10px] font-semibold text-[#252E8A] bg-white px-2.5 py-1 rounded-full border border-[#5A7FC8]/25 shadow-2xs">
                        JPG, PNG, WEBP ready
                      </span>
                    </label>
                  ) : (
                    <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-[#252E8A] shadow-md bg-[#F7F6F7] group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={frontImagePreview}
                        alt="Front View Preview"
                        className="w-full h-full object-cover object-top"
                      />

                      {/* Front Tag */}
                      <div className="absolute top-2.5 left-2.5 bg-[#252E8A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                        Front View
                      </div>

                      {/* Remove Button (X) */}
                      <button
                        type="button"
                        onClick={() => handleClearImage("front")}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 hover:bg-rose-500 text-[#0E0E34] hover:text-white shadow-md flex items-center justify-center transition-colors cursor-pointer border border-[#5A7FC8]/20"
                        title="Remove Front Photo"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Bottom Info & Change Photo Bar */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E0E34]/90 via-[#0E0E34]/60 to-transparent p-3 flex items-center justify-between">
                        <span className="text-xs text-white font-medium truncate max-w-[140px]">
                          {frontImageFile?.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => frontInputRef.current?.click()}
                          className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm cursor-pointer border border-white/30"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. BACK VIEW DROPZONE (Optional / Recommended) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0E0E34] flex items-center gap-1">
                      <span>Back View Photo</span>
                      <span className="text-[#0E0E34]/60 text-[11px] font-normal">(Optional)</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9A4D87]/10 text-[#9A4D87] border border-[#9A4D87]/20">
                      Hover Flip Effect
                    </span>
                  </div>

                  <input
                    type="file"
                    ref={backInputRef}
                    onChange={(e) => handleFileChange(e, "back")}
                    accept="image/*"
                    className="hidden"
                    id="back-image-input"
                    name="backImage"
                    aria-label="Upload Back View Photo"
                  />

                  {!backImagePreview ? (
                    <label
                      htmlFor="back-image-input"
                      className="h-64 border-2 border-dashed border-[#5A7FC8]/30 hover:border-[#252E8A] bg-[#F7F6F7]/60 hover:bg-[#F7F6F7] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group select-none"
                    >
                      <div className="w-13 h-13 rounded-2xl bg-white shadow-sm border border-[#5A7FC8]/20 flex items-center justify-center text-[#5A7FC8] group-hover:scale-110 transition-transform mb-3">
                        <RefreshCw className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-[#0E0E34]">
                        Capture or Browse Back View
                      </p>
                      <p className="text-xs text-[#0E0E34]/70 mt-1 max-w-[200px]">
                        Seamlessly reveals when visitor hovers over the dress card
                      </p>
                      <span className="mt-3 text-[10px] font-semibold text-[#0E0E34]/70 bg-white px-2.5 py-1 rounded-full border border-[#5A7FC8]/25 shadow-2xs">
                        Recommended for 360° feel
                      </span>
                    </label>
                  ) : (
                    <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-[#252E8A] shadow-md bg-[#F7F6F7] group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={backImagePreview}
                        alt="Back View Preview"
                        className="w-full h-full object-cover object-top"
                      />

                      {/* Back Tag */}
                      <div className="absolute top-2.5 left-2.5 bg-[#0E0E34] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                        <RefreshCw className="w-2.5 h-2.5 text-[#5A7FC8]" />
                        <span>Back View</span>
                      </div>

                      {/* Remove Button (X) */}
                      <button
                        type="button"
                        onClick={() => handleClearImage("back")}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 hover:bg-rose-500 text-[#0E0E34] hover:text-white shadow-md flex items-center justify-center transition-colors cursor-pointer border border-[#5A7FC8]/20"
                        title="Remove Back Photo"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Bottom Info & Change Photo Bar */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E0E34]/90 via-[#0E0E34]/60 to-transparent p-3 flex items-center justify-between">
                        <span className="text-xs text-white font-medium truncate max-w-[140px]">
                          {backImageFile?.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => backInputRef.current?.click()}
                          className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm cursor-pointer border border-white/30"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Gallery Photos Dropzone (Optional) */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0E0E34]">
                    Additional Gallery Photos (Optional)
                  </label>
                  <p className="text-xs text-[#0E0E34]/70 mt-0.5">
                    Additional Angles & Close-ups (Pallu, Embroidery, Details)
                  </p>
                </div>

                {galleryPreviews.length > 0 && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#9A4D87]/10 text-[#9A4D87] border border-[#9A4D87]/20">
                    {galleryPreviews.length} Added
                  </span>
                )}
              </div>

              {/* Multi-file input */}
              <input
                type="file"
                multiple
                accept="image/*"
                ref={galleryInputRef}
                onChange={handleGalleryFilesChange}
                className="hidden"
                id="gallery-images-input"
                name="galleryImages"
                aria-label="Upload Additional Gallery Photos"
              />

              {galleryPreviews.length === 0 ? (
                /* Empty Dropzone State */
                <label
                  htmlFor="gallery-images-input"
                  className="border-2 border-dashed border-[#5A7FC8]/30 hover:border-[#9A4D87] bg-[#F7F6F7]/60 hover:bg-[#F7F6F7] rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-center text-center cursor-pointer transition-all group select-none"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#5A7FC8]/20 flex items-center justify-center text-[#9A4D87] group-hover:scale-110 transition-transform mb-2.5">
                    <Layers className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-[#0E0E34]">
                    Choose Multiple Photos or Snap Close-ups
                  </p>
                  <p className="text-xs text-[#0E0E34]/70 mt-1 max-w-md">
                    Upload extra angles, embroidery details, fabric texture, or pallu showcases
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#252E8A] bg-white px-3 py-1 rounded-full border border-[#5A7FC8]/25 shadow-2xs">
                      + Select Multiple Photos
                    </span>
                    <span className="text-[10px] font-semibold text-[#0E0E34]/70">
                      JPG, PNG, WEBP
                    </span>
                  </div>
                </label>
              ) : (
                /* Thumbnail Previews Grid with Add More Button */
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {galleryPreviews.map((preview, index) => (
                      <div
                        key={`gallery-preview-${index}`}
                        className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#5A7FC8]/25 shadow-xs group bg-[#F7F6F7]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview}
                          alt={`Gallery preview ${index + 1}`}
                          className="w-full h-full object-cover object-top"
                        />

                        {/* Detail Photo Tag */}
                        <span className="absolute bottom-1.5 left-1.5 bg-[#0E0E34]/85 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-xs shadow-sm">
                          #{index + 1}
                        </span>

                        {/* Small (X) Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(index)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#0E0E34]/80 hover:bg-rose-500 text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                          title="Remove photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* "+ Add More" Dropzone Tile */}
                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="aspect-[3/4] rounded-xl border-2 border-dashed border-[#5A7FC8]/30 hover:border-[#9A4D87] bg-white hover:bg-[#F7F6F7] flex flex-col items-center justify-center text-center p-3 transition-all group cursor-pointer"
                      title="Add more gallery photos"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F7F6F7] text-[#9A4D87] flex items-center justify-center group-hover:scale-110 transition-transform mb-1.5 border border-[#5A7FC8]/20">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#0E0E34]">Add More</span>
                      <span className="text-[10px] text-[#0E0E34]/70">Photos</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[#0E0E34]/70">
                      Total: <strong className="text-[#0E0E34]">{galleryPreviews.length}</strong> additional photo{galleryPreviews.length === 1 ? "" : "s"}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setGalleryFiles([]);
                        setGalleryPreviews([]);
                        if (galleryInputRef.current) galleryInputRef.current.value = "";
                      }}
                      className="text-xs font-semibold text-[#0E0E34]/70 hover:text-rose-600 underline cursor-pointer"
                    >
                      Clear Gallery Photos
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Title & Model Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dress-title" className="block text-xs font-bold uppercase tracking-wider text-[#0E0E34] mb-1.5">
                  Dress Title <span className="text-[#9A4D87]">*</span>
                </label>
                <input
                  type="text"
                  id="dress-title"
                  name="dressTitle"
                  aria-label="Dress Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Kanchipuram Bridal Silk Saree"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#5A7FC8]/30 text-sm text-[#0E0E34] placeholder:text-[#0E0E34]/40 focus:ring-2 focus:ring-[#252E8A] focus:outline-none bg-white"
                />
              </div>

              <div>
                <label htmlFor="dress-code" className="block text-xs font-bold uppercase tracking-wider text-[#0E0E34] mb-1.5">
                  Model Code <span className="text-[#9A4D87]">*</span>
                </label>
                <input
                  type="text"
                  id="dress-code"
                  name="dressCode"
                  aria-label="Model Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. AT-201"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#5A7FC8]/30 text-sm text-[#0E0E34] placeholder:text-[#0E0E34]/40 focus:ring-2 focus:ring-[#252E8A] focus:outline-none font-mono font-bold bg-white"
                />
              </div>
            </div>

            {/* Category & Fabric */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dress-category" className="block text-xs font-bold uppercase tracking-wider text-[#0E0E34] mb-1.5">
                  Category <span className="text-[#9A4D87]">*</span>
                </label>
                <select
                  id="dress-category"
                  name="dressCategory"
                  aria-label="Dress Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#5A7FC8]/30 text-sm text-[#0E0E34] focus:ring-2 focus:ring-[#252E8A] focus:outline-none bg-white font-medium"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="dress-fabric" className="block text-xs font-bold uppercase tracking-wider text-[#0E0E34] mb-1.5">
                  Fabric (Optional)
                </label>
                <input
                  type="text"
                  id="dress-fabric"
                  name="dressFabric"
                  aria-label="Fabric"
                  value={fabric}
                  onChange={(e) => setFabric(e.target.value)}
                  placeholder="e.g. Pure Silk, Georgette, Organza"
                  className="w-full px-4 py-3 rounded-xl border border-[#5A7FC8]/30 text-sm text-[#0E0E34] placeholder:text-[#0E0E34]/40 focus:ring-2 focus:ring-[#252E8A] focus:outline-none bg-white"
                />
              </div>
            </div>

            {/* Price & Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label htmlFor="dress-price" className="block text-xs font-bold uppercase tracking-wider text-[#0E0E34] mb-1.5">
                  Price (₹ Optional)
                </label>
                <input
                  type="number"
                  id="dress-price"
                  name="dressPrice"
                  aria-label="Price in Rupees"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 4999 (Leave blank for inquire only)"
                  min="0"
                  step="1"
                  className="w-full px-4 py-3 rounded-xl border border-[#5A7FC8]/30 text-sm text-[#0E0E34] placeholder:text-[#0E0E34]/40 focus:ring-2 focus:ring-[#252E8A] focus:outline-none bg-white"
                />
              </div>

              <div className="pt-4 sm:pt-6">
                <label
                  htmlFor="is-featured"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#5A7FC8]/25 bg-[#F7F6F7]/60 hover:bg-[#F7F6F7] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    id="is-featured"
                    name="isFeatured"
                    aria-label="Feature on Homepage Spotlight"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#252E8A] rounded border-[#5A7FC8]/30 focus:ring-[#252E8A]"
                  />
                  <div className="text-xs font-bold text-[#0E0E34] flex items-center gap-1.5">
                    <span>Feature on Homepage Spotlight</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#9A4D87]" />
                  </div>
                </label>
              </div>
            </div>

            {/* Color Variants Section with Custom Color Picker */}
            <div className="pt-4 border-t border-[#5A7FC8]/15 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0E0E34]">
                      Color Variants
                    </label>
                    {colorVariants.length > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9A4D87]/10 text-[#9A4D87] border border-[#9A4D87]/20">
                        {colorVariants.length} Added
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#0E0E34]/70 mt-0.5">
                    Add custom boutique colorways with exact 2D saturation & hue codes
                  </p>
                </div>

                {/* + Add Color Variant Button styled in bg-accent-gradient */}
                <button
                  type="button"
                  onClick={() => setIsColorPickerOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-accent-gradient hover:opacity-95 text-white font-bold text-xs shadow-md shadow-[#9A4D87]/25 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Color Variant</span>
                </button>
              </div>

              {/* List of Selected Color Badges */}
              {colorVariants.length > 0 ? (
                <div className="flex items-center gap-2.5 flex-wrap pt-1">
                  {colorVariants.map((variant, index) => (
                    <div
                      key={`${variant.hex}-${variant.name}-${index}`}
                      className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-[#5A7FC8]/25 shadow-xs hover:border-[#252E8A] transition-all"
                    >
                      {/* Circular Color Swatch Dot */}
                      <span
                        className="w-4 h-4 rounded-full shrink-0 border border-black/15 shadow-2xs"
                        style={{ backgroundColor: variant.hex }}
                      />

                      {/* Color Title */}
                      <span className="text-xs font-bold text-[#0E0E34]">
                        {variant.name}
                      </span>

                      {/* Uppercase Hex Code */}
                      <span className="text-[10px] font-mono font-semibold text-[#252E8A] bg-[#F7F6F7] px-1.5 py-0.5 rounded border border-[#5A7FC8]/25">
                        {variant.hex.toUpperCase()}
                      </span>

                      {/* 'x' Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(index)}
                        className="w-4 h-4 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer ml-0.5"
                        title={`Remove ${variant.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => setColorVariants([])}
                    className="text-xs font-semibold text-[#0E0E34]/70 hover:text-rose-600 underline cursor-pointer ml-1"
                  >
                    Clear All
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#F7F6F7]/60 border border-dashed border-[#5A7FC8]/30 flex items-center justify-between gap-3 text-xs text-[#0E0E34]/70">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#9A4D87] shrink-0" />
                    <span>
                      No color variants added yet. Click <strong>+ Add Color Variant</strong> to open the 2D gradient color picker.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsColorPickerOpen(true)}
                    className="text-[#9A4D87] font-bold hover:underline cursor-pointer shrink-0"
                  >
                    Open Picker
                  </button>
                </div>
              )}
            </div>

            {/* Available Sizes Section */}
            <div className="pt-4 border-t border-[#5A7FC8]/15 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0E0E34]">
                      Available Sizes
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#252E8A]/10 text-[#252E8A] border border-[#5A7FC8]/25">
                      {selectedSizes.length} Selected
                    </span>
                  </div>
                  <p className="text-xs text-[#0E0E34]/70 mt-0.5">
                    Select ready-to-wear boutique sizes for this model (multi-select)
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setSelectedSizes([...STANDARD_SIZES])}
                    className="text-[#252E8A] hover:text-[#9A4D87] hover:underline cursor-pointer transition-colors"
                  >
                    Select All
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => setSelectedSizes(["Free Size"])}
                    className="text-[#0E0E34]/70 hover:text-[#252E8A] cursor-pointer transition-colors"
                  >
                    Reset (Free Size)
                  </button>
                </div>
              </div>

              {/* Toggle Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {STANDARD_SIZES.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                        isSelected
                          ? "bg-[#252E8A] text-white shadow-md shadow-[#252E8A]/20 ring-2 ring-[#252E8A] ring-offset-1"
                          : "bg-white text-[#0E0E34] border border-[#5A7FC8]/30 hover:border-[#252E8A] hover:bg-[#F7F6F7]"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      <span>{size}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Action styled in bg-accent-gradient */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPublishing}
                className="w-full py-4 rounded-xl bg-accent-gradient hover:opacity-95 active:opacity-90 text-white font-bold text-sm sm:text-base shadow-lg shadow-[#9A4D87]/25 hover:shadow-[#9A4D87]/35 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Uploading Photos & Publishing Model...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Publish Model to Live Catalog</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Color Picker Modal Popup */}
        <ColorPickerModal
          isOpen={isColorPickerOpen}
          onClose={() => setIsColorPickerOpen(false)}
          onAddColor={handleAddColor}
        />

        {/* Previously Published Dresses */}
        <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[#5A7FC8]/20 shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-[#5A7FC8]/15 mb-6">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#0E0E34]">
                Published Boutique Designs ({dresses.length})
              </h2>
              <p className="text-xs text-[#0E0E34]/70">
                Manage active database catalog models and view front/back/gallery uploads
              </p>
            </div>

            <button
              type="button"
              onClick={fetchDresses}
              disabled={isLoadingList}
              className="p-2.5 rounded-xl text-[#0E0E34]/70 hover:text-[#252E8A] hover:bg-[#F7F6F7] transition-colors cursor-pointer border border-transparent hover:border-[#5A7FC8]/25"
              title="Refresh Catalog List"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoadingList ? "animate-spin text-[#252E8A]" : ""}`}
              />
            </button>
          </div>

          {isLoadingList ? (
            <div className="text-center py-12 text-[#0E0E34]/70 flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-[#252E8A]" />
              <p className="text-xs font-medium">Loading database designs...</p>
            </div>
          ) : dresses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dresses.map((dress) => {
                // Determine if this dress has back image
                const backUrl =
                  dress.back_image_url ||
                  (Array.isArray(dress.variants) &&
                    dress.variants[0]?.backImage) ||
                  (Array.isArray(dress.color_variants) &&
                    dress.color_variants[0]?.backImage);

                return (
                  <div
                    key={dress.id}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-[#5A7FC8]/20 hover:border-[#252E8A] transition-all bg-white shadow-sm group"
                  >
                    {/* Dual or Single Image Thumbnails */}
                    <div className="relative flex items-center shrink-0">
                      <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#F7F6F7] border border-[#5A7FC8]/20 z-10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={dress.image_url}
                          alt={`${dress.title} Front`}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {backUrl && (
                        <div
                          className="w-12 h-16 -ml-5 rounded-lg overflow-hidden bg-[#F7F6F7] border border-white shadow-sm opacity-85 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                          title="Back View Photo"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={backUrl}
                            alt={`${dress.title} Back`}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      )}
                    </div>

                    {/* Dress Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono font-bold bg-[#F7F6F7] text-[#252E8A] px-1.5 py-0.5 rounded border border-[#5A7FC8]/25">
                          {dress.code}
                        </span>
                        <span className="text-[10px] font-bold text-[#9A4D87] uppercase">
                          {dress.category}
                        </span>
                        {backUrl && (
                          <span className="text-[9px] font-bold bg-[#F7F6F7] text-[#5A7FC8] px-1 py-0.5 rounded flex items-center gap-0.5 border border-[#5A7FC8]/20">
                            <RefreshCw className="w-2 h-2" />
                            <span>Dual View</span>
                          </span>
                        )}
                        {(Array.isArray(dress.gallery_images) && dress.gallery_images.length > 0) && (
                          <span className="text-[9px] font-bold bg-[#F7F6F7] text-[#9A4D87] px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-[#5A7FC8]/25">
                            <Layers className="w-2 h-2" />
                            <span>+{dress.gallery_images.length} gallery</span>
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif font-bold text-[#0E0E34] text-sm truncate mt-1">
                        {dress.title}
                      </h4>

                      <div className="flex items-center gap-2 mt-0.5 text-xs">
                        <span className="text-[#0E0E34] font-bold">
                          {dress.price
                            ? `₹${Number(dress.price).toLocaleString("en-IN")}`
                            : "Inquire"}
                        </span>
                        {dress.fabric && (
                          <span className="text-[#0E0E34]/60 text-[11px] truncate">
                            • {dress.fabric}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Delete Action */}
                    <button
                      type="button"
                      onClick={() => handleDelete(dress)}
                      disabled={deletingId === dress.id}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
                      title="Delete Dress"
                    >
                      {deletingId === dress.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-rose-600" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-[#0E0E34]/70 bg-[#F7F6F7]/50 rounded-2xl border border-dashed border-[#5A7FC8]/30">
              <ImageIcon className="w-8 h-8 mx-auto text-[#9A4D87] mb-2" />
              <p className="text-sm font-bold text-[#0E0E34]">
                No boutique models uploaded in Supabase yet
              </p>
              <p className="text-xs text-[#0E0E34]/70 mt-0.5">
                Use the form above to upload your first dress model with front, back and gallery photos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
