"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Section } from "../ui/Section";
import { ParallaxText } from "../ui/ParallaxText";
import { FadeIn } from "../ui/FadeIn";
import { GlassCard } from "../ui/GlassCard"; 
import { Dock } from "../ui/Dock";
import { portfolioConfig } from "../../config/portfolio";

const MotionGlassCard = motion(GlassCard);

// --- HELPER: MAGNETIC BUTTON ---
const MagneticButton = ({ children, onClick, label }: { children: React.ReactNode, onClick: () => void, label: string }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useGSAP(() => {
        const btn = buttonRef.current;
        if (!btn) return;
        const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.3); 
            yTo(y * 0.3);
        };

        const mouseLeave = () => { xTo(0); yTo(0); };
        btn.addEventListener("mousemove", mouseMove);
        btn.addEventListener("mouseleave", mouseLeave);
        return () => {
            btn.removeEventListener("mousemove", mouseMove);
            btn.removeEventListener("mouseleave", mouseLeave);
        };
    }, { scope: buttonRef });

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            aria-label={label}
            className="group relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-brand-pink hover:border-brand-pink hover:scale-110 active:scale-95"
        >
            <div className="relative z-10 text-brand-text group-hover:text-white transition-colors duration-300">
                {children}
            </div>
        </button>
    );
};

// --- ANIMATION VARIANTS ---
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 }
    })
};

// --- MAIN COMPONENT ---
export const Works = () => {
  const { works } = portfolioConfig;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 }); 

  // State
  const [activeCategoryId, setActiveCategoryId] = useState(works.categories[0].id);
  const activeCategory = works.categories.find(c => c.id === activeCategoryId) || works.categories[0];
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [direction, setDirection] = useState(0); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers
  const handleNext = () => {
    setDirection(1);
    setFocusedIndex((prev) => (prev + 1) % activeCategory.images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setFocusedIndex((prev) => (prev - 1 + activeCategory.images.length) % activeCategory.images.length);
  };

  // Keyboard Support
  useEffect(() => {
    if (!isInView || isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView, activeCategory.images.length, isModalOpen]);

  // Reset index when category changes
  const handleCategoryChange = (id: string) => {
      setActiveCategoryId(id);
      setFocusedIndex(0);
      setDirection(0);
  };

  const currentImage = activeCategory.images[focusedIndex];

  return (
    <Section ref={sectionRef} className="flex flex-col items-center justify-center relative overflow-hidden h-screen perspective-1000">
      
      {/* BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
         <FadeIn delay={0.2} duration={1.5}>
            <ParallaxText className="text-[35vw] leading-none text-brand-pink/20 select-none tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
              {works.heading}
            </ParallaxText>
         </FadeIn>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="z-10 w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pb-32">
        
        {/* LEFT COLUMN: SINGLE IMAGE + CONTROLS */}
        <div className="flex flex-col items-center gap-8 md:gap-10">
            
            {/* SINGLE IMAGE CONTAINER */}
            <div className="relative w-[320px] h-[240px] md:w-[500px] md:h-[350px] flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={`${activeCategory.id}-${focusedIndex}`}
                        layoutId={`image-${activeCategory.id}-${focusedIndex}`} 
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        onClick={() => setIsModalOpen(true)}
                        className="
                            absolute inset-0
                            cursor-zoom-in 
                            rounded-3xl 
                            shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] 
                            overflow-hidden 
                            border-[6px] border-white/20
                            bg-zinc-900
                        "
                        whileHover={{ 
                            scale: 1.02, 
                            rotate: 1,
                            borderColor: "rgba(255,255,255,0.4)" 
                        }}
                    >
                        {/* Image */}
                        <div 
                            className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                            style={{ backgroundImage: `url(${currentImage})` }}
                        />

                        {/* Number Badge */}
                        <div className="absolute bottom-4 right-6 pointer-events-none">
                             <span className="font-display font-bold text-white/90 text-4xl md:text-5xl drop-shadow-md">
                                0{focusedIndex + 1}
                             </span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* CONTROLS (Next/Prev) */}
            <div className="flex items-center gap-8">
                <MagneticButton onClick={handlePrev} label="Previous Project">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </MagneticButton>

                <MagneticButton onClick={handleNext} label="Next Project">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </MagneticButton>
            </div>
        </div>

        {/* RIGHT COLUMN: DETAILS PANEL */}
        <div className="flex justify-center lg:justify-start z-30 pointer-events-none">
           <MotionGlassCard 
             className="p-8 md:p-12 rounded-[2.5rem] max-w-xl text-center lg:text-left pointer-events-auto backdrop-blur-3xl bg-white/15 min-h-[300px] flex flex-col justify-center border border-white/30"
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

      {/* BOTTOM DOCK */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
      >
        <Dock 
          items={works.categories}
          activeId={activeCategoryId}
          onSelect={handleCategoryChange}
        />
      </motion.div>

      {/* --- FULLSCREEN PREVIEW MODAL --- */}
      <AnimatePresence>
          {isModalOpen && (
              <motion.div 
                  className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
              >
                  {/* Enlarged Image (Morphing) */}
                  <motion.div 
                    layoutId={`image-${activeCategory.id}-${focusedIndex}`} // MATCHES CARD ID
                    className="relative w-full max-w-5xl max-h-[75vh] aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8"
                    onClick={(e) => e.stopPropagation()} 
                  >
                      <motion.img 
                        src={currentImage} 
                        alt="Work Preview"
                        className="w-full h-full object-contain bg-black"
                      />
                  </motion.div>

                  {/* "Back to Works" / Escape Button */}
                  <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={() => setIsModalOpen(false)}
                      className="
                        px-8 py-3 
                        rounded-full 
                        bg-brand-pink text-white 
                        font-display font-bold uppercase tracking-widest text-sm md:text-base
                        shadow-[0_0_20px_rgba(240,74,117,0.4)]
                        hover:scale-105 hover:bg-white hover:text-brand-pink
                        transition-all duration-300
                      "
                  >
                      Back to Works
                  </motion.button>

              </motion.div>
          )}
      </AnimatePresence>

    </Section>
  );
};