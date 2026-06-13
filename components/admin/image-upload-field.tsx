"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
}

import { toast } from "sonner";

export function ImageUploadField({ label, name, defaultValue, required }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentUrl, setCurrentUrl] = useState<string>(defaultValue || "");
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload(file: File | null) {
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("Uploading image...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        toast.error(`Upload failed: ${errorData?.error || res.statusText}`, { id: toastId });
        return;
      }

      const data = await res.json();
      if (data.url) {
        setCurrentUrl(data.url);
        toast.success("Image uploaded successfully!", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred during upload.", { id: toastId });
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = ""; // Reset file input
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/90">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      
      <input type="hidden" name={name} value={currentUrl} />
      
      <div className="flex items-start gap-4">
        {/* Preview Area */}
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/50">
          {currentUrl ? (
            <>
              <Image src={currentUrl} alt="Preview" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setCurrentUrl("")}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white/70 hover:bg-black/90 hover:text-white backdrop-blur-sm transition-all"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <ImageIcon className="h-6 w-6 text-white/20" />
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files?.[0] || null)}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            {isUploading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
                Uploading...
              </span>
            ) : (
              <>
                <UploadCloud className="h-4 w-4" />
                Choose File
              </>
            )}
          </button>
          {currentUrl && (
            <p className="max-w-[200px] truncate text-xs text-white/40" title={currentUrl}>
              {currentUrl}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
