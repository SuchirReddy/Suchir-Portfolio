"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

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
  const [localImages, setLocalImages] = useState(images);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function showSuccess(message: string) {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  }

  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setIsUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));
    const res = await fetch(`/api/admin/projects/${projectId}/images`, {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      alert(`Upload failed: ${errorData?.error || res.statusText}`);
      setIsUploading(false);
      return;
    }
    
    const data = await res.json();
    if (data.images) {
      setLocalImages(prev => [...prev, ...data.images]);
      showSuccess("Uploaded successfully ✓");
    }
    
    setIsUploading(false);
    router.refresh();
  }

  async function remove(id: string) {
    setLocalImages(prev => prev.filter(img => img.id !== id));
    await fetch(`/api/admin/project-images/${id}`, { method: "DELETE" });
    showSuccess("Deleted successfully ✓");
    router.refresh();
  }

  async function patch(id: string, body: Record<string, unknown>) {
    setLocalImages(prev => {
      const updated = prev.map(img => {
        if (img.id === id) {
          return { ...img, ...body } as ProjectImage;
        }
        if (body.isCover && img.isCover) {
          return { ...img, isCover: false };
        }
        return img;
      });
      return updated.sort((a, b) => a.displayOrder - b.displayOrder);
    });
    
    await fetch(`/api/admin/project-images/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
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
          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/10"
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
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          upload(event.dataTransfer.files);
        }}
        className="mt-4 rounded-xl border border-dashed border-white/15 p-4"
      >
        <div className="mb-4 flex items-center gap-4">
          {isUploading ? <p className="text-sm text-lime-200">Uploading...</p> : null}
          {successMessage ? <p className="text-sm font-medium text-lime-400 transition-opacity">{successMessage}</p> : null}
        </div>
        {localImages.length === 0 ? (
          <p className="text-sm text-white/45">No screenshots yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {localImages.map((image, index) => (
              <div key={image.id} className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                  <Image src={image.imageUrl} alt="" fill className="object-contain" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => patch(image.id, { isCover: true })}
                    className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/70 hover:bg-white/10"
                  >
                    {image.isCover ? "Cover" : "Set cover"}
                  </button>
                  <button
                    type="button"
                    onClick={() => patch(image.id, { displayOrder: Math.max(0, index - 1) })}
                    className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/70 hover:bg-white/10"
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => patch(image.id, { displayOrder: index + 1 })}
                    className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/70 hover:bg-white/10"
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(image.id)}
                    className="rounded-md border border-red-400/30 px-2 py-1 text-xs text-red-200 hover:bg-red-500/10"
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
