"use client";

import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { X, Copy, Check, Palette, ChevronDown } from "lucide-react";

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddColor: (color: { name: string; hex: string }) => void;
  initialHex?: string;
  initialName?: string;
}

const POPULAR_PRESETS = [
  { name: "Haiti Midnight", hex: "#0E0E34" },
  { name: "Royal Navy", hex: "#252E8A" },
  { name: "Cannon Pink", hex: "#9A4D87" },
  { name: "Indigo Blue", hex: "#5A7FC8" },
  { name: "Maroon", hex: "#800020" },
  { name: "Wine Red", hex: "#722F37" },
  { name: "Crimson Red", hex: "#DC2626" },
  { name: "Emerald Green", hex: "#059669" },
  { name: "Mint Green", hex: "#34D399" },
  { name: "Mustard Gold", hex: "#D97706" },
  { name: "Champagne Gold", hex: "#D4AF37" },
  { name: "Blush Pink", hex: "#F472B6" },
];

export function ColorPickerModal({
  isOpen,
  onClose,
  onAddColor,
  initialHex = "#252E8A",
  initialName = "",
}: ColorPickerModalProps) {
  const [color, setColor] = useState<string>(initialHex);
  const [colorName, setColorName] = useState<string>(initialName);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setColor(initialHex.startsWith("#") ? initialHex : `#${initialHex}`);
      setColorName(initialName);
      setCopied(false);
    }
  }, [isOpen, initialHex, initialName]);

  if (!isOpen) return null;

  // Clean hex without '#' for input display
  const rawHex = color.replace(/^#/, "").toUpperCase();

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
    if (val.length === 6) {
      setColor(`#${val}`);
    } else if (val.length === 3) {
      setColor(`#${val}`);
    }
  };

  const handleCopyHex = async () => {
    try {
      await navigator.clipboard.writeText(color.toUpperCase());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback if clipboard API unavailable
    }
  };

  const handleSelectPreset = (preset: { name: string; hex: string }) => {
    setColor(preset.hex);
    if (!colorName.trim() || POPULAR_PRESETS.some((p) => p.name === colorName)) {
      setColorName(preset.name);
    }
  };

  const handleCommit = (e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
    }
    const finalHex = color.startsWith("#") ? color.toUpperCase() : `#${color.toUpperCase()}`;
    const finalName = colorName.trim() || `Color ${finalHex}`;
    onAddColor({ name: finalName, hex: finalHex });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E0E34]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#5A7FC8]/20 relative space-y-4 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#5A7FC8]/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#5A7FC8]/10 text-[#252E8A] flex items-center justify-center shadow-inner">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#0E0E34]">
                Custom Color Picker
              </h3>
              <p className="text-[11px] text-[#0E0E34]/60">
                Pick 2D saturation gradient & hue
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full text-[#0E0E34]/40 hover:text-[#0E0E34] hover:bg-[#5A7FC8]/10 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2D Gradient & Hue Slider using HexColorPicker */}
        <div className="custom-color-picker-wrapper">
          <style jsx global>{`
            .custom-color-picker-wrapper .react-colorful {
              width: 100% !important;
              height: 220px !important;
              border-radius: 1.25rem !important;
              box-shadow: 0 4px 16px rgba(14, 14, 52, 0.08) !important;
              border: 1px solid rgba(90, 127, 200, 0.25) !important;
            }
            .custom-color-picker-wrapper .react-colorful__saturation {
              border-radius: 1.25rem 1.25rem 0 0 !important;
              margin-bottom: 12px !important;
            }
            .custom-color-picker-wrapper .react-colorful__hue {
              height: 14px !important;
              border-radius: 9999px !important;
              margin: 0 8px 10px 8px !important;
            }
            .custom-color-picker-wrapper .react-colorful__pointer {
              width: 22px !important;
              height: 22px !important;
              border: 3px solid #ffffff !important;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35) !important;
            }
          `}</style>

          <HexColorPicker color={color} onChange={setColor} />
        </div>

        {/* Popular Quick-Pick Dots */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#0E0E34]/70 mb-1.5">
            <span>Boutique Palette Presets:</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {POPULAR_PRESETS.map((preset) => (
              <button
                key={preset.hex + preset.name}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`w-6 h-6 rounded-full border border-black/15 shadow-2xs hover:scale-115 transition-transform cursor-pointer relative ${
                  color.toUpperCase() === preset.hex.toUpperCase()
                    ? "ring-2 ring-[#9A4D87] ring-offset-1 scale-110"
                    : ""
                }`}
                style={{ backgroundColor: preset.hex }}
                title={preset.name}
              />
            ))}
          </div>
        </div>

        {/* Bottom Input Row */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#F7F6F7] border border-[#5A7FC8]/20">
          {/* Circular color preview dot */}
          <div
            className="w-8 h-8 rounded-xl shrink-0 border border-black/15 shadow-xs transition-colors"
            style={{ backgroundColor: color }}
          />

          {/* Format indicator pill */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-[#5A7FC8]/30 text-[11px] font-bold text-[#252E8A] select-none">
            <span>HEX</span>
            <ChevronDown className="w-3 h-3 text-[#0E0E34]/60" />
          </div>

          {/* Hex code input */}
          <div className="flex items-center flex-1 min-w-0 bg-white px-2.5 py-1.5 rounded-xl border border-[#5A7FC8]/30 focus-within:ring-2 focus-within:ring-[#252E8A]">
            <span className="text-xs font-mono font-bold text-[#0E0E34]/50 mr-1 select-none">
              #
            </span>
            <input
              type="text"
              id="color-picker-hex"
              name="colorPickerHex"
              aria-label="Hex color value"
              value={rawHex}
              onChange={handleHexInputChange}
              maxLength={6}
              className="w-full text-xs font-mono font-bold text-[#0E0E34] uppercase tracking-wider focus:outline-none"
              placeholder="252E8A"
            />
          </div>

          {/* Copy button */}
          <button
            type="button"
            onClick={handleCopyHex}
            aria-label="Copy Hex Code"
            className="p-2 rounded-xl bg-white hover:bg-[#F7F6F7] text-[#0E0E34]/70 hover:text-[#252E8A] border border-[#5A7FC8]/30 transition-colors cursor-pointer shrink-0"
            title="Copy Hex Code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Color Name Input & Actions */}
        <div className="space-y-4">
          <div>
            <label htmlFor="color-picker-name" className="block text-xs font-bold text-[#0E0E34] mb-1">
              Color Name (e.g. Wine Red, Royal Navy)
            </label>
            <input
              type="text"
              id="color-picker-name"
              name="colorPickerName"
              aria-label="Color Name"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCommit();
                }
              }}
              placeholder="e.g. Royal Navy"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#5A7FC8]/30 text-xs text-[#0E0E34] placeholder:text-[#0E0E34]/40 focus:ring-2 focus:ring-[#252E8A] focus:outline-none bg-white font-medium"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#5A7FC8]/30 text-xs font-bold text-[#0E0E34]/70 hover:bg-[#F7F6F7] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleCommit()}
              className="flex-1 py-2.5 rounded-xl bg-accent-gradient hover:opacity-95 text-xs font-bold text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>OK / Add Color</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
