"use client";

import { motion } from "framer-motion";
import { JourneyLesson } from "@prisma/client";
import { Lightbulb, Zap, Rocket, Crosshair, Sparkles, Terminal } from "lucide-react";

const icons = [Lightbulb, Zap, Rocket, Crosshair, Sparkles, Terminal];

export function LessonsLearned({ lessons }: { lessons: JourneyLesson[] }) {
  if (!lessons.length) return null;

  return (
    <section className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
            Lessons From Building
          </h2>
          <p className="text-zinc-600 dark:text-white/50 text-lg">
            Principles and mental models shaped by shipping products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform translate-x-4 -translate-y-4 group-hover:scale-110">
                  <Icon className="w-32 h-32 text-lime-400" />
                </div>
                
                <div className="w-12 h-12 rounded-2xl bg-lime-400/10 flex items-center justify-center mb-6 border border-lime-400/20 text-lime-400 relative z-10">
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 relative z-10">
                  {lesson.title}
                </h3>
                
                <p className="text-zinc-600 dark:text-white/60 leading-relaxed relative z-10">
                  {lesson.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
