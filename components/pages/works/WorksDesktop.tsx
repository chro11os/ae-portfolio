"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../../ui/Section";
import { ParallaxText } from "../../ui/ParallaxText";
import { FadeIn } from "../../ui/FadeIn";
import { Dock } from "../../ui/Dock";
import { portfolioConfig } from "../../../config/portfolio";
import { Button } from "../../ui/Button";

// Helper function to generate grid spans for visual variety
const getGridSpan = (index: number) => {
    // Pattern based on index % 8
    const patternIndex = index % 8;
    
    switch (patternIndex) {
        case 0: return "col-span-2 row-span-2"; // 2x2
        case 3: return "col-span-1 row-span-2"; // 1x2 Tall
        case 4: return "col-span-2 row-span-1"; // 2x1 Wide
        case 6: return "col-span-2 row-span-2"; // 2x2
        default: return "col-span-1 row-span-1"; // 1x1 Standard
    }
};

const gridItemVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

export const WorksDesktop = () => {
  const { works } = portfolioConfig;
  const [activeCategoryId, setActiveCategoryId] = useState(works.categories[0].id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const activeCategory = useMemo(() => 
    works.categories.find(c => c.id === activeCategoryId) || works.categories[0], 
    [activeCategoryId, works.categories]
  );

  const handleCategoryChange = (id: string) => {
      setActiveCategoryId(id);
      const gridContainer = document.getElementById("works-grid-container");
      if (gridContainer) gridContainer.scrollTop = 0;
  };

  return (
    <Section className="lg:h-screen lg:max-h-screen lg:overflow-hidden relative bg-brand-bg flex items-center justify-center">
      
      {/* TOP NAVIGATION DOCK - Z-50 */}
      <div className="absolute top-8 left-0 right-0 flex justify-center z-50">
          <Dock 
              items={works.categories}
              activeId={activeCategoryId}
              onSelect={handleCategoryChange}
          />
      </div>

      {/* BACKGROUND TITLE - Z-0 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none">
         <FadeIn delay={0.2} duration={1.5}>
            <ParallaxText speed={0.5} className="text-[clamp(12rem,25vw,25rem)] leading-none text-brand-pink/[0.02] select-none tracking-tighter">
              {works.heading}
            </ParallaxText>
         </FadeIn>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] px-8 h-full grid grid-cols-[450px_1fr] gap-20 items-center">
        
        {/* LEFT COLUMN: Sidebar Info */}
        <div className="flex flex-col h-full justify-center relative z-10 pt-16">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="space-y-8"
                >
                    <h2 className="font-display font-bold text-6xl text-brand-pink uppercase leading-[0.9] tracking-tight">
                        {activeCategory.title}
                    </h2>
                    <div className="w-24 h-1 bg-brand-pink/30 rounded-full" />
                    
                    <p className="font-sans text-brand-text/60 text-lg leading-relaxed font-light text-justify pr-8">
                        {activeCategory.description}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Scrollable Bento Grid */}
        <div 
            id="works-grid-container"
            className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pr-4 pt-48 pb-20 scroll-smooth relative z-10"
        >
             <motion.div 
                className="grid grid-cols-3 gap-6 auto-rows-[220px]"
                layout
             >
                <AnimatePresence mode="popLayout">
                    {activeCategory.images.map((img, index) => (
                        <motion.div
                            key={`${activeCategory.id}-${index}`}
                            layout
                            variants={gridItemVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 200,
                                damping: 25
                            }}
                            className={`
                                relative group cursor-pointer overflow-hidden rounded-md border border-white/20 shadow-sm
                                ${getGridSpan(index)}
                            `}
                            onClick={() => setSelectedImage(img)}
                            whileHover={{ scale: 1.02, zIndex: 10 }}
                        >
                            <div className="absolute inset-0 bg-zinc-900/5 transition-colors duration-500" />
                            <motion.div 
                                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${img})` }}
                                layoutId={selectedImage === img ? `image-${img}` : undefined}
                            />
                            
                            {/* Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white/90 font-display tracking-widest text-sm border border-white/40 px-6 py-2 rounded-md backdrop-blur-md bg-white/10">
                                    EXPAND
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
             </motion.div>
        </div>

      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
          {selectedImage && (
              <motion.div 
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedImage(null)}
              >
                  <motion.img 
                    src={selectedImage} 
                    alt="Full Preview"
                    layoutId={`image-${selectedImage}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="max-w-[95vw] max-h-[90vh] object-contain rounded-md shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                  
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-6 right-6 bg-white/10 hover:bg-brand-pink text-white rounded-full p-3 backdrop-blur-md transition-all hover:rotate-90 cursor-pointer"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
              </motion.div>
          )}
      </AnimatePresence>
    </Section>
  );
};