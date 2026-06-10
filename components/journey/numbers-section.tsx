"use client";

import { motion, useInView, animate } from "framer-motion";
import { JourneyStat } from "@prisma/client";
import { useRef, useEffect, useState } from "react";

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  // Extract number and suffix (e.g. "1000+" -> num: 1000, suffix: "+")
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    if (inView && targetNum !== null && ref.current) {
      const node = ref.current;
      const controls = animate(0, targetNum, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [inView, targetNum, suffix]);

  if (targetNum === null) {
    return <span>{value}</span>;
  }

  return <span ref={ref}>0{suffix}</span>;
}

export function NumbersSection({ stats }: { stats: JourneyStat[] }) {
  if (!stats.length) return null;

  return (
    <section className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/[0.02] backdrop-blur-sm text-center"
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white tracking-tighter mb-2" style={{ fontFamily: "'Fira Code', monospace" }}>
                <Counter value={stat.value} />
              </h3>
              <p className="text-sm md:text-base font-medium text-zinc-600 dark:text-white/50 uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
