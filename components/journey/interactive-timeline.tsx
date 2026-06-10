"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JourneyMilestone } from "@prisma/client";
import { ArrowRight, Calendar, Tag, ChevronRight } from "lucide-react";
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
                layout
                onClick={() => setSelectedIndex(isActive ? null : index)}
                className={cn(
                  "relative shrink-0 cursor-pointer snap-center rounded-3xl transition-all duration-500 ease-out",
                  "border border-black/10 dark:border-white/10 overflow-hidden",
                  isActive 
                    ? "w-[85vw] md:w-[800px] bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(163,230,53,0.15)] ring-1 ring-lime-400/50" 
                    : "w-[280px] md:w-[320px] bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100 hover:scale-[1.02]"
                )}
              >
                {/* Collapsed State Header (Always visible) */}
                <motion.div layout="position" className="p-6 relative z-10">
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
                    "font-bold tracking-tight transition-all",
                    isActive ? "text-2xl md:text-3xl text-zinc-900 dark:text-white mb-2" : "text-xl text-zinc-800 dark:text-white/90"
                  )}>
                    {milestone.title}
                  </h3>
                  
                  {!isActive && (
                    <div className="mt-4 flex items-center text-xs font-semibold text-lime-600 dark:text-lime-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                  )}
                </motion.div>

                {/* Expanded State Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="px-6 pb-6 relative z-10"
                    >
                      <p className="text-sm md:text-base text-zinc-600 dark:text-white/70 leading-relaxed mb-6">
                        {milestone.shortDescription}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Image */}
                        {milestone.imageUrl && (
                          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-white/5">
                            <Image
                              src={milestone.imageUrl}
                              alt={milestone.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        {/* Details */}
                        <div className="flex flex-col justify-center space-y-4">
                          <div>
                            <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-white/40 uppercase mb-2">The Story</h4>
                            <div className="prose dark:prose-invert prose-sm text-zinc-600 dark:text-white/70">
                              <p className="whitespace-pre-wrap text-xs md:text-sm">{milestone.longStory}</p>
                            </div>
                          </div>

                          {milestone.metrics && (
                            <div>
                              <h4 className="text-[10px] font-bold tracking-widest text-zinc-400 dark:text-white/40 uppercase mb-2">Impact</h4>
                              <div className="space-y-1.5">
                                {milestone.metrics.split('\n').map((metric, i) => {
                                  if (!metric.trim()) return null;
                                  return (
                                    <div key={i} className="flex items-start gap-2">
                                      <span className="mt-1 w-1 h-1 rounded-full bg-lime-500 shrink-0" />
                                      <span className="text-xs text-zinc-600 dark:text-white/80">{metric}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {milestone.linkUrl && (
                            <a href={milestone.linkUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lime-600 dark:text-lime-400 text-sm font-bold tracking-wide hover:text-lime-500 transition-colors group mt-2 w-fit">
                              Visit Link <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Ambient glow when active */}
                {isActive && (
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-lime-400/5 to-transparent pointer-events-none rounded-3xl" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
