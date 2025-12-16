"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Section } from "../ui/Section";
import { BigDisplay } from "../ui/Typography";
import { FadeIn } from "../ui/FadeIn";
import { GlassCard } from "../ui/GlassCard"; 
import { Dock } from "../ui/Dock";
import { portfolioConfig } from "../../config/portfolio";

const MotionGlassCard = motion(GlassCard);

// --- STATIC CONFIG & HELPERS ---

const getPosition = (index: number, focusedIndex: number, total: number) => {
  if (index === focusedIndex) return "center";
  const nextIndex = (focusedIndex + 1) % total;
  if (index === nextIndex) return "right";
  return "left";
};

const cardVariants = {
  center: { 
    zIndex: 30, 
    scale: 1, 
    x: 0, 
    rotateY: 0,
    opacity: 1,
    filter: "brightness(1) blur(0px)",
    transition: { type: "spring" as const, stiffness: 200, damping: 25 }
  },
  left: { 
    zIndex: 10, 
    scale: 0.8, 
    x: "-65%", 
    rotateY: 15,
    opacity: 0.7,
    filter: "brightness(0.5) blur(2px)",
    transition: { type: "spring" as const, stiffness: 200, damping: 25 }
  },
  right: { 
    zIndex: 20, 
    scale: 0.8, 
    x: "65%", 
    rotateY: -15,
    opacity: 0.7,
    filter: "brightness(0.5) blur(2px)",
    transition: { type: "spring" as const, stiffness: 200, damping: 25 }
  }
};

// --- MAIN COMPONENT ---

export const Works = () => {
  const { works } = portfolioConfig;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 }); 

  const [activeCategoryId, setActiveCategoryId] = useState(works.categories[0].id);
  const activeCategory = works.categories.find(c => c.id === activeCategoryId) || works.categories[0];
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <Section ref={sectionRef} className="flex flex-col items-center justify-center relative overflow-hidden h-screen perspective-1000">
      
      {/* BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
         <FadeIn delay={0.2} duration={1.5}>
            {/* UPDATED: Increased opacity to /20 and added a tighter shadow */}
            <BigDisplay className="text-[35vw] leading-none text-brand-pink/20 select-none tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
              {works.heading}
            </BigDisplay>
         </FadeIn>
      </div>

      <div className="z-10 w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pb-32">
        
        {/* CARDS DECK */}
        <div className="relative h-[300px] md:h-[450px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {activeCategory.images.map((_, index) => {
              const position = getPosition(index, focusedIndex, activeCategory.images.length);
              
              return (
                <motion.div
                  key={`${activeCategory.id}-${index}`}
                  layoutId={`${activeCategory.id}-card-${index}`}
                  onClick={() => handleImageClick(index)}
                  initial={false}
                  animate={position}
                  variants={cardVariants}
                  className="absolute w-[300px] h-[220px] md:w-[500px] md:h-[350px] cursor-pointer rounded-3xl shadow-2xl overflow-hidden border-[6px] border-white/10"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-center p-6 group">
                     
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-pink/20 to-transparent opacity-50" />
                     
                     <span className="relative z-10 font-display font-bold text-brand-pink/50 text-sm md:text-lg tracking-[0.2em] uppercase mb-2">
                        {activeCategory.label}
                     </span>
                     
                     <span className="relative z-10 font-display font-bold text-white text-7xl md:text-9xl group-hover:scale-110 transition-transform duration-300">
                        0{index + 1}
                     </span>

                     <span className="relative z-10 font-sans text-brand-text/40 text-xs uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to Focus
                     </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* DETAILS PANEL */}
        <div className="flex justify-center lg:justify-start z-30 pointer-events-none">
           <MotionGlassCard 
             // UPDATED: Added 'backdrop-blur-3xl' and 'bg-white/15' for a stronger glass effect
             className="p-8 md:p-12 rounded-[2.5rem] max-w-xl text-center lg:text-left pointer-events-auto backdrop-blur-3xl bg-white/15"
             initial={{ opacity: 0, x: 50 }}
             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
             transition={{ delay: 0.3 }}
           >
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeCategory.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.3 }}
               >
                 <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-pink uppercase mb-6 leading-none drop-shadow-sm">
                   {activeCategory.title}
                 </h2>
                 
                 <div className="w-16 h-1 bg-brand-pink/30 rounded-full mb-6 mx-auto lg:mx-0" />

                 <p className="font-sans text-brand-text text-lg md:text-xl leading-relaxed font-light">
                   {activeCategory.description}
                 </p>
               </motion.div>
             </AnimatePresence>
           </MotionGlassCard>
        </div>

      </div>

      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
      >
        <Dock 
          items={works.categories}
          activeId={activeCategoryId}
          onSelect={(id) => {
            setActiveCategoryId(id);
            setFocusedIndex(0); 
          }}
        />
      </motion.div>

    </Section>
  );
};