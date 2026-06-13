"use client";

import { motion } from "framer-motion";

export function BuildingInPublic() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-40 pb-32 px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-lime-500/10 blur-[150px] rounded-full mix-blend-screen opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/[0.03] backdrop-blur-md mb-8 lg:mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-zinc-600 dark:text-white/80 uppercase">The Journey</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter uppercase text-zinc-900 dark:text-white leading-[0.9] w-full mb-8 lg:mb-12"
        >
          Building<br />
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-lime-600 block mt-2">In Public</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-2xl lg:text-3xl font-light text-zinc-600 dark:text-white/60 max-w-4xl mx-auto leading-relaxed"
        >
          From Learning things to building AI products, startups, and ambitious ideas.
        </motion.p>
      </div>
    </section>
  );
}
