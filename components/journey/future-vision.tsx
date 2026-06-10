"use client";

import { motion } from "framer-motion";
import { JourneySettings } from "@prisma/client";

export function FutureVision({ settings }: { settings: JourneySettings | null }) {
  const title = settings?.visionTitle || "Building products, systems, and AI experiences";
  const subtitle = settings?.visionSubtitle || "that help founders move faster.";
  const description = settings?.visionDescription || "";

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden py-32 px-6 text-center border-t border-black/5 dark:border-white/5 bg-transparent">
      {/* Dynamic background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(0,0,0,0)_0%,rgba(163,230,53,0.1)_50%,rgba(0,0,0,0)_100%)] blur-[100px] rounded-full mix-blend-screen"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            {title}
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-lime-400 mt-2 leading-tight">
            {subtitle}
          </h3>
        </motion.div>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-600 dark:text-white/50 max-w-2xl mx-auto mt-8 leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
