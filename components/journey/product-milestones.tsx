"use client";

import { motion } from "framer-motion";
import { JourneyMilestone } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProductMilestonesProps {
  products: JourneyMilestone[];
}

export function ProductMilestones({ products }: ProductMilestonesProps) {
  if (!products.length) return null;

  return (
    <section className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Product Milestones
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-white/50 text-lg max-w-2xl">
            Major platforms, companies, and products built along the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col rounded-3xl border border-black/5 dark:border-white/5 bg-white/[0.02] backdrop-blur-xl overflow-hidden hover:bg-white/[0.04] hover:border-lime-500/30 hover:shadow-[0_0_40px_rgba(163,230,53,0.15)] transition-all duration-500"
            >
              {/* Image Area */}
              {product.imageUrl && (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5 dark:bg-white/5">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />
                  
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-black/10 dark:border-white/10 text-[10px] font-semibold text-zinc-600 dark:text-white/80 uppercase tracking-widest">
                      {product.status}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm font-medium text-lime-400">
                      {product.category}
                    </p>
                  </div>
                  {product.linkUrl && (
                    <a
                      href={product.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-zinc-600 dark:text-white/50 hover:bg-lime-400 hover:text-black transition-colors shrink-0"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <p className="text-zinc-600 dark:text-white/60 text-sm leading-relaxed mb-6 flex-1">
                  {product.shortDescription}
                </p>

                {/* Footer details */}
                <div className="mt-auto pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-medium text-zinc-600 dark:text-white/40">
                  <span>{product.year}</span>
                  {product.date && (
                    <span>{new Date(product.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
