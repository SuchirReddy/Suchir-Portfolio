"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";

type ProjectImage = {
  id: string;
  imageUrl: string;
  displayOrder: number;
  isCover: boolean;
};

export function ProjectImageManager({
  projectId,
  images,
}: {
  projectId: string;
  images: ProjectImage[];
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [localImages, setLocalImages] = useState(images);

  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setIsUploading(true);
    const toastId = toast.loading("Uploading image(s)...");
    
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));
    
    try {
      const res = await fetch(`/api/admin/projects/${projectId}/images`, {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        toast.error(`Upload failed: ${errorData?.error || res.statusText}`, { id: toastId });
        return;
      }
      
      const data = await res.json();
      if (data.images) {
        setLocalImages(prev => [...prev, ...data.images]);
        toast.success("Uploaded successfully ✓", { id: toastId });
      }
    } catch (e) {
      toast.error("Upload failed due to an unexpected error.", { id: toastId });
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
      router.refresh();
    }
  }

  async function remove(id: string) {
    const toastId = toast.loading("Deleting image...");
    setLocalImages(prev => prev.filter(img => img.id !== id));
    await fetch(`/api/admin/project-images/${id}`, { method: "DELETE" });
    toast.success("Deleted successfully ✓", { id: toastId });
    router.refresh();
  }

  async function setCover(id: string) {
    setLocalImages(prev => prev.map(img => ({ ...img, isCover: img.id === id })));
    await fetch(`/api/admin/project-images/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCover: true }),
    });
    router.refresh();
  }

  async function moveImage(index: number, direction: "up" | "down") {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === localImages.length - 1) return;

    const newArr = [...localImages];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    
    // Swap
    const temp = newArr[index];
    newArr[index] = newArr[swapIndex];
    newArr[swapIndex] = temp;

    // Update displayOrders
    const updatedArr = newArr.map((img, i) => ({ ...img, displayOrder: i }));
    setLocalImages(updatedArr);

    // Send patches
    await Promise.all([
      fetch(`/api/admin/project-images/${updatedArr[index].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: updatedArr[index].displayOrder }),
      }),
      fetch(`/api/admin/project-images/${updatedArr[swapIndex].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayOrder: updatedArr[swapIndex].displayOrder }),
      })
    ]);
    
    router.refresh();
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Screenshots</h2>
          <p className="mt-1 text-sm text-white/45">Drag images here or select files.</p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/10 transition-colors"
        >
          Upload
        </button>
      </div>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        onChange={(event) => upload(event.target.files)}
      />
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          upload(event.dataTransfer.files);
        }}
        className={`mt-4 rounded-xl border-2 border-dashed p-4 transition-colors ${
          isDragging ? "border-lime-400 bg-lime-400/5" : "border-white/15"
        }`}
      >
        <div className="mb-4 flex items-center gap-4 h-6">
          {isUploading && (
            <span className="flex items-center gap-2 text-sm text-lime-200">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-lime-400 border-t-transparent" />
              Uploading...
            </span>
          )}
        </div>
        
        {localImages.length === 0 ? (
          <p className="text-sm text-white/45 text-center py-8">No screenshots yet. Drag & drop to upload.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {localImages.map((image, index) => (
              <div key={image.id} className={`rounded-xl border p-3 transition-all ${image.isCover ? "border-lime-400/50 bg-lime-400/5" : "border-white/10 bg-black/30"}`}>
                <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                  <Image src={image.imageUrl} alt="Screenshot" fill className="object-contain" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setCover(image.id)}
                    className={`rounded-md border px-2 py-1 text-xs transition-colors ${image.isCover ? "border-lime-400/50 text-lime-300" : "border-white/10 text-white/70 hover:bg-white/10"}`}
                  >
                    {image.isCover ? "Cover" : "Set cover"}
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(index, "up")}
                    disabled={index === 0}
                    className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/70 hover:bg-white/10 disabled:opacity-30"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(index, "down")}
                    disabled={index === localImages.length - 1}
                    className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/70 hover:bg-white/10 disabled:opacity-30"
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(image.id)}
                    className="ml-auto rounded-md border border-red-400/30 px-2 py-1 text-xs text-red-200 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
