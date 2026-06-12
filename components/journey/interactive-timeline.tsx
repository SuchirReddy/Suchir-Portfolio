"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JourneyMilestone } from "@prisma/client";
import { ArrowRight, Calendar, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface InteractiveTimelineProps {
  milestones: JourneyMilestone[];
}

export function InteractiveTimeline({ milestones }: InteractiveTimelineProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!milestones.length) return null;

  // Auto-scroll to selected card
  useEffect(() => {
    if (selectedIndex !== null && containerRef.current) {
      const activeElement = containerRef.current.children[selectedIndex] as HTMLElement;
      if (activeElement) {
        const containerWidth = containerRef.current.clientWidth;
        const scrollPosition = activeElement.offsetLeft - (containerWidth / 2) + (activeElement.clientWidth / 2);
        
        containerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h2 className="text-sm font-bold tracking-widest uppercase text-lime-400 mb-4">The Timeline</h2>
      </div>
        
      {/* Horizontal Timeline Track */}
      <div className="relative w-full">
        {/* Background ambient line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/10 dark:bg-white/10 -translate-y-1/2 z-0" />
        
        <div 
          ref={containerRef}
          className="relative flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 px-6 md:px-[20vw] py-16 items-center z-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {milestones.map((milestone, index) => {
            const isActive = index === selectedIndex;
            return (
              <motion.div
                key={milestone.id}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative shrink-0 cursor-pointer snap-center rounded-3xl transition-all duration-300 ease-out",
                  "border border-black/10 dark:border-white/10 overflow-hidden w-[280px] md:w-[320px]",
                  "bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100 hover:scale-[1.02]",
                  isActive && "ring-1 ring-lime-400/50 shadow-[0_0_30px_rgba(163,230,53,0.1)] opacity-100 scale-[1.02]"
                )}
              >
                {/* Collapsed State Header (Always visible) */}
                <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(
                      "text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2",
                      isActive ? "text-lime-500 dark:text-lime-400" : "text-zinc-500 dark:text-white/50"
                    )}>
                      <Calendar className="w-3.5 h-3.5" /> {milestone.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-white/70 text-[10px] font-medium tracking-wide uppercase">
                      {milestone.category}
                    </span>
                  </div>
                  
                  <h3 className={cn(
                    "font-bold tracking-tight transition-all text-xl",
                    isActive ? "text-zinc-900 dark:text-white mb-2" : "text-zinc-800 dark:text-white/90"
                  )}>
                    {milestone.title}
                  </h3>
                  
                  <div className="mt-4 flex items-center text-xs font-semibold text-lime-600 dark:text-lime-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>

                {/* Ambient glow when active */}
                {isActive && (
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-lime-400/5 to-transparent pointer-events-none rounded-3xl" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedIndex(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0a0a0a] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl z-10 hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              </button>
              
              {/* Content of the selected milestone */}
              {(() => {
                const milestone = milestones[selectedIndex];
                return (
                  <div className="p-6 sm:p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-sm font-bold tracking-widest uppercase text-lime-500 dark:text-lime-400 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {milestone.year}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-white/70 text-xs font-medium tracking-wide uppercase">
                        {milestone.category}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4 pr-12">
                      {milestone.title}
                    </h3>
                    
                    <p className="text-lg text-zinc-600 dark:text-white/70 leading-relaxed mb-8">
                      {milestone.shortDescription}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                      {/* Left Column: Image & Links */}
                      <div className="space-y-6">
                        {milestone.imageUrl && (
                          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-white/5">
                            <Image
                              src={milestone.imageUrl}
                              alt={milestone.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        {milestone.linkUrl && (
                          <a href={milestone.linkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lime-600 dark:text-lime-400 text-sm font-bold tracking-wide hover:text-lime-500 transition-colors group">
                            Visit Link <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        )}
                      </div>

                      {/* Right Column: Story & Metrics */}
                      <div className="flex flex-col space-y-8">
                        <div>
                          <h4 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-white/40 uppercase mb-3">The Story</h4>
                          <div className="prose dark:prose-invert prose-sm text-zinc-600 dark:text-white/70">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed">{milestone.longStory}</p>
                          </div>
                        </div>

                        {milestone.metrics && (
                          <div>
                            <h4 className="text-xs font-bold tracking-widest text-zinc-400 dark:text-white/40 uppercase mb-3">Impact</h4>
                            <div className="space-y-2">
                              {milestone.metrics.split('\n').map((metric, i) => {
                                if (!metric.trim()) return null;
                                return (
                                  <div key={i} className="flex items-start gap-3">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime-500 shrink-0" />
                                    <span className="text-sm text-zinc-600 dark:text-white/80 leading-relaxed">{metric}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
