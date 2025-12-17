"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // 1. Lock Scroll
    document.body.style.overflow = "hidden";

    // 2. Counter Animation
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 20); // Adjust speed here (lower = faster)

    // 3. Cleanup & Unlock
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = ""; // Unlock scroll
    }, 2500); // Total load time (matches counter speed approx)

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
          }}
        >
          {/* CONTENT CONTAINER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="flex flex-col items-center gap-4 relative"
          >
            {/* LARGE PERCENTAGE */}
            <div className="flex items-start">
                <span className="font-display font-bold text-9xl md:text-[12rem] text-brand-pink leading-none tracking-tighter">
                    {counter}
                </span>
                <span className="font-display font-bold text-2xl md:text-4xl text-brand-pink/50 mt-4 md:mt-8">
                    %
                </span>
            </div>

            {/* LOADING TEXT */}
            <div className="absolute -bottom-12 flex flex-col items-center gap-2">
                <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-brand-pink"
                        style={{ width: `${counter}%` }}
                    />
                </div>
                <span className="font-mono text-xs text-brand-text/30 uppercase tracking-[0.3em]">
                    Loading Portfolio
                </span>
            </div>

          </motion.div>
          
          {/* CURTAIN BOTTOM SHADOW (For depth during slide up) */}
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};