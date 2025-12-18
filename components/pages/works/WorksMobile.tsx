"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../../ui/Section";
import { ParallaxText } from "../../ui/ParallaxText";
import { FadeIn } from "../../ui/FadeIn";
import { GlassCard } from "../../ui/GlassCard"; 
import { portfolioConfig } from "../../../config/portfolio";

const MotionGlassCard = motion(GlassCard);

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 200 : -200,
        opacity: 0,
        scale: 0.9
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 200 : -200,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 }
    })
};

export const WorksMobile = () => {
  const { works } = portfolioConfig;
  const [activeCategoryId, setActiveCategoryId] = useState(works.categories[0].id);
  const activeCategory = works.categories.find(c => c.id === activeCategoryId) || works.categories[0];
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [direction, setDirection] = useState(0); 

  const handleNext = () => {
    setDirection(1);
    setFocusedIndex((prev) => (prev + 1) % activeCategory.images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setFocusedIndex((prev) => (prev - 1 + activeCategory.images.length) % activeCategory.images.length);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDirection(1);
      setActiveCategoryId(e.target.value);
      setFocusedIndex(0);
  };

  const currentImage = activeCategory.images[focusedIndex];

  return (
    <Section className="flex flex-col items-center justify-start relative overflow-hidden min-h-[100dvh] w-full px-4 pt-16 pb-6">
      
      {/* 1. HEADER & CATEGORY SELECTOR */}
      <div className="z-10 w-full flex flex-col items-center gap-4 mb-6">
         <FadeIn delay={0.1} duration={1}>
            <ParallaxText className="text-[20vw] leading-none text-brand-pink/20 select-none tracking-tighter drop-shadow-sm">
              {works.heading}
            </ParallaxText>
         </FadeIn>
         
         {/* Native Select for better mobile UX */}
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
      </div>

      {/* 2. MAIN IMAGE CAROUSEL */}
      <div className="z-10 flex-1 w-full flex flex-col items-center justify-center gap-6">
        <div className="relative w-full aspect-[4/3] max-h-[40vh] shadow-2xl rounded-2xl overflow-hidden bg-zinc-900 border-4 border-white/20">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={`${activeCategory.id}-${focusedIndex}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = Math.abs(offset.x) * velocity.x;
                        if (swipe < -10000) handleNext();
                        else if (swipe > 10000) handlePrev();
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                    <Image 
                        src={currentImage}
                        alt={`Work ${focusedIndex + 1}`}
                        fill
                        className="object-contain"
                        draggable={false}
                    />
                    <div className="absolute bottom-3 right-4 pointer-events-none bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md z-10">
                        <span className="font-display font-bold text-white text-lg">
                        {focusedIndex + 1} / {activeCategory.images.length}
                        </span>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* 3. INFO CARD */}
        <MotionGlassCard 
            layout 
            className="w-full p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/40 flex flex-col items-center text-center overflow-y-auto max-h-[25vh]"
        >
            <AnimatePresence mode="wait">
            <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="font-display font-bold text-2xl text-brand-pink uppercase mb-3 leading-none drop-shadow-sm">
                {activeCategory.title}
                </h2>
                <div className="w-10 h-1 bg-brand-pink/30 rounded-full mb-3 mx-auto" />
                <p className="font-sans text-brand-text text-sm leading-relaxed font-light text-justify px-2">
                {activeCategory.description}
                </p>
            </motion.div>
            </AnimatePresence>
        </MotionGlassCard>
      </div>

      {/* 4. NAVIGATION CONTROLS */}
      <div className="z-20 w-full flex justify-between items-center px-6 mt-4 pb-4">
        <button 
            onClick={handlePrev}
            className="p-4 rounded-full bg-white/40 backdrop-blur-md border border-white/40 shadow-sm active:scale-95 transition-transform"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </button>

        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-text/40 font-bold">
            Swipe or Click
        </span>

        <button 
            onClick={handleNext}
            className="p-4 rounded-full bg-white/40 backdrop-blur-md border border-white/40 shadow-sm active:scale-95 transition-transform"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>
      </div>

    </Section>
  );
};