"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function LoadingScreen({ duration = 1500 }: { duration?: number }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    
    // Fast premium loading sequence
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      // Ease out the progress so it slows down near the end
      const rawProgress = currentStep / steps;
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3); // Cubic ease out
      const nextProgress = Math.min(100, Math.floor(easedProgress * 100));
      
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(interval);
        // Pause briefly at 100% before animating out
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Cinematic wipe up
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020202] text-white overflow-hidden"
        >
          {/* Background glow removed as requested */}

          <div className="flex flex-col items-center z-10">
            {/* Branding Name */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xs md:text-sm tracking-[0.3em] text-white/50 uppercase mb-12 font-medium"
            >
              Suchir Reddy
            </motion.div>

            {/* Breathing Logo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: [0.6, 1, 0.6], 
                scale: [0.95, 1, 0.95],
                filter: [
                  "drop-shadow(0px 0px 0px rgba(255,255,255,0))", 
                  "drop-shadow(0px 0px 20px rgba(255,255,255,0.15))", 
                  "drop-shadow(0px 0px 0px rgba(255,255,255,0))"
                ]
              }}
              transition={{ 
                opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                filter: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative w-32 h-32 md:w-48 md:h-48"
            >
              <Image 
                src="/logo-transparent.png" 
                alt="Suchir Reddy Logo" 
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Premium Progress Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-[200px] md:w-[300px] h-[2px] bg-white/10 rounded-full mt-16 overflow-hidden relative"
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
          </div>
          
          {/* Loading status text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-12 text-[10px] uppercase tracking-[0.2em] text-white/30"
          >
            Initializing Experience
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
