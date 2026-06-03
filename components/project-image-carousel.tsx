"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectImage } from "@prisma/client";

export function ProjectImageCarousel({ 
  images, 
  title, 
  className = "" 
}: { 
  images: ProjectImage[], 
  title: string,
  className?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) return null;

  // Make sure cover image is always first
  const sortedImages = [...images].sort((a, b) => (a.isCover === b.isCover ? 0 : a.isCover ? -1 : 1));

  const WindowHeader = () => (
    <div className="absolute top-0 left-0 right-0 z-20 flex h-8 items-center gap-1.5 bg-zinc-200/50 dark:bg-zinc-800/50 px-3 backdrop-blur-md">
      <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
      <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
      <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
    </div>
  );

  if (sortedImages.length === 1) {
    return (
      <div className={`group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] shadow-2xl ${className}`}>
        <WindowHeader />
        <div className="aspect-[2560/1664] overflow-hidden pt-8 bg-zinc-100 dark:bg-black/50">
          <Image
            src={sortedImages[0].imageUrl}
            alt={title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105 !top-8"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10 z-30" />
      </div>
    );
  }

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % sortedImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] shadow-2xl ${className}`}>
      <WindowHeader />
      <div className="aspect-[2560/1664] overflow-hidden relative bg-zinc-100 dark:bg-black/50 pt-8">
        <Image
          src={sortedImages[currentIndex].imageUrl}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover object-top transition-transform duration-700 !top-8"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        
        {/* Navigation Arrows */}
        <div className="absolute inset-0 z-30 flex items-center justify-between px-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mt-8">
          <button
            onClick={prevImage}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-lime-300/80 hover:text-black hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-lime-300/80 hover:text-black hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
          {sortedImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-6 bg-lime-300" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 dark:ring-white/10 z-40" />
    </div>
  );
}
