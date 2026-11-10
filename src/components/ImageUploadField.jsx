import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, X, ExternalLink, Zap } from 'lucide-react';
import { uploadImageToSupabase } from '../lib/supabase';

export default function ImageUploadField({ 
  label = "Cover Image", 
  value = "", 
  onChange, 
  folder = "general",
  helpText = "Auto-converted to modern WebP for optimal speed & quality"
}) {
  const [uploadStep, setUploadStep] = useState(""); // "" | "converting" | "uploading"
  const [uploadError, setUploadError] = useState("");
  const [successInfo, setSuccessInfo] = useState(null); // { savings: number }
  const fileInputRef = useRef(null);

  const isUploading = Boolean(uploadStep);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 15MB before WebP compression)
    if (file.size > 15 * 1024 * 1024) {
      setUploadError("Image file size must be less than 15MB.");
      return;
    }

    setUploadError("");
    setSuccessInfo(null);
    setUploadStep("converting");

    try {
      // Step 1: Converting to WebP and uploading
      setUploadStep("uploading");
      const { url, error, savingsPercent } = await uploadImageToSupabase(file, folder);
      setUploadStep("");

      if (error) {
        console.error("Image upload failed:", error);
        setUploadError(
          error.message || "Failed to upload image to Supabase 'club-images' bucket."
        );
      } else if (url) {
        onChange(url);
        setSuccessInfo({ savingsPercent: savingsPercent || 0 });
        setTimeout(() => setSuccessInfo(null), 5000);
      }
    } catch (err) {
      setUploadStep("");
      setUploadError(err.message || "Network error uploading image.");
    } finally {
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const isWebPUrl = Boolean(value && (value.includes('.webp') || value.includes('webp')));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          {label}
        </label>
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1 font-medium"
          >
            <span>View Full Image</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Preview Card & Upload Button Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
        
        {/* Thumbnail Preview */}
        <div className="w-20 h-16 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden shrink-0 flex items-center justify-center relative group">
          {value ? (
            <>
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80";
                }}
              />
              {isWebPUrl && (
                <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                  WEBP
                </span>
              )}
            </>
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-400" />
          )}
        </div>

        {/* Upload Action */}
        <div className="flex-1 space-y-1.5 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs transition-all disabled:opacity-60"
            >
              {uploadStep === "converting" ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>Converting to WebP...</span>
                </>
              ) : uploadStep === "uploading" ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>Uploading to Supabase...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Upload to Supabase (Auto WebP)</span>
                </>
              )}
            </button>

            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Clear image"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-slate-400 leading-tight flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500 shrink-0" />
            <span>{helpText}</span>
          </p>
        </div>

      </div>

      {/* Manual URL Input Fallback */}
      <div className="relative">
        <input
          type="url"
          placeholder="Or paste an image URL (https://...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 text-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-slate-400"
        />
      </div>

      {/* Status Messages */}
      {successInfo && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            Converted to WebP & uploaded successfully!
            {successInfo.savingsPercent > 0 && ` (${successInfo.savingsPercent}% size reduction)`}
          </span>
        </div>
      )}

      {uploadError && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-1.5">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span className="leading-snug">{uploadError}</span>
        </div>
      )}
    </div>
  );
}
