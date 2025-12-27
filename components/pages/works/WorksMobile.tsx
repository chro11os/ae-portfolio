"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../../ui/Section";
import { ParallaxText } from "../../ui/ParallaxText";
import { FadeIn } from "../../ui/FadeIn";
import { portfolioConfig } from "../../../config/portfolio";

const gridItemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const WorksMobile = () => {
  const { works } = portfolioConfig;
  const [activeCategoryId, setActiveCategoryId] = useState(works.categories[0].id);

  const activeCategory = useMemo(() => 
    works.categories.find(c => c.id === activeCategoryId) || works.categories[0],
    [activeCategoryId, works.categories]
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setActiveCategoryId(e.target.value);
  };

  return (
    <Section className="flex flex-col items-center justify-start relative overflow-hidden min-h-[100dvh] w-full px-4 pt-16 pb-20 bg-brand-bg">
      
      {/* 1. HEADER & CATEGORY SELECTOR */}
      <div className="z-10 w-full flex flex-col items-center gap-6 mb-8">
         <FadeIn delay={0.1} duration={1}>
            <ParallaxText className="text-[20vw] leading-none text-brand-pink/20 select-none tracking-tighter drop-shadow-sm">
              {works.heading}
            </ParallaxText>
         </FadeIn>
         
         <div className="relative w-full max-w-xs">
            <select 
                value={activeCategoryId}
                onChange={handleCategoryChange}
                className="w-full appearance-none bg-white/20 backdrop-blur-md border border-white/30 text-brand-text py-3 px-6 pr-10 rounded-xl font-display font-bold uppercase tracking-widest text-xs focus:outline-none focus:border-brand-pink/50 transition-all"
            >
                {works.categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="text-black bg-white">
                        {cat.label}
                    </option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-pink">
                    <path d="M6 9l6 6 6-6"/>
                </svg>
            </div>
         </div>

         {/* CATEGORY DESC */}
         <AnimatePresence mode="wait">
            <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center max-w-sm"
            >
                <h2 className="font-display font-bold text-2xl text-brand-pink uppercase mb-2">
                    {activeCategory.title}
                </h2>
                <p className="font-sans text-brand-text/70 text-sm leading-relaxed font-light">
                    {activeCategory.description}
                </p>
            </motion.div>
         </AnimatePresence>
      </div>

      {/* 2. VERTICAL LIST / GRID */}
      <div className="z-10 w-full flex flex-col gap-6 pb-12">
        <AnimatePresence mode="popLayout">
            {activeCategory.images.map((img, index) => (
                <motion.div
                    key={`${activeCategory.id}-${index}`}
                    variants={gridItemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="relative w-full aspect-[4/3] rounded-md overflow-hidden border border-white/20 shadow-lg bg-zinc-900"
                >
                    <Image 
                        src={img}
                        alt={`Work ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

    </Section>
  );
};