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
const MagneticButton = ({ children, onClick, label, className = "" }: { children: React.ReactNode, onClick: () => void, label: string, className?: string }) => {
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
            className={`group relative rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-brand-pink hover:border-brand-pink hover:scale-110 active:scale-95 ${className}`}
        >
            <div className="relative z-10 text-brand-text group-hover:text-white transition-colors duration-300">
                {children}
            </div>
        </button>
    );
};

// --- ANIMATION VARIANTS (TS FIXED) ---
const slideVariants = {
    enter: ({ direction, axis }: { direction: number; axis: "x" | "y" }) => {
        if (axis === "y") {
            return { x: 0, y: -300, opacity: 0, scale: 0.9 };
        }
        return { x: direction > 0 ? 300 : -300, y: 0, opacity: 0, scale: 0.9 };
    },
    center: {
        zIndex: 1,
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { 
            type: "spring" as const, // Fix: Explicitly cast to 'spring' literal
            stiffness: 300, 
            damping: 30 
        }
    },
    exit: ({ direction, axis }: { direction: number; axis: "x" | "y" }) => {
        if (axis === "y") {
            return { zIndex: 0, x: 0, y: 300, opacity: 0, scale: 0.9, transition: { duration: 0.2 } };
        }
        return { zIndex: 0, x: direction < 0 ? 300 : -300, y: 0, opacity: 0, scale: 0.9, transition: { duration: 0.2 } };
    }
};

export const Works = () => {
  const { works } = portfolioConfig;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 }); 

  const [activeCategoryId, setActiveCategoryId] = useState(works.categories[0].id);
  const activeCategory = works.categories.find(c => c.id === activeCategoryId) || works.categories[0];
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [direction, setDirection] = useState(0); 
  const [axis, setAxis] = useState<'x' | 'y'>('x');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalSheenRef = useRef<HTMLDivElement>(null);

  const isGlassDisabled = ["ui-ux", "graphic-design", "photography"].includes(activeCategory.id);

  const handleNext = () => {
    setAxis('x');
    setDirection(1);
    setFocusedIndex((prev) => (prev + 1) % activeCategory.images.length);
  };

  const handlePrev = () => {
    setAxis('x');
    setDirection(-1);
    setFocusedIndex((prev) => (prev - 1 + activeCategory.images.length) % activeCategory.images.length);
  };

  const handleCategoryChange = (id: string) => {
      setAxis('y'); 
      setDirection(1); 
      setActiveCategoryId(id);
      setFocusedIndex(0);
  };

  useGSAP(() => {
    if (!isModalOpen || isGlassDisabled) return;
    const container = modalContainerRef.current;
    const sheen = modalSheenRef.current;
    if (!container || !sheen) return;

    const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

        gsap.to(sheen, {
            background: `radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)`,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isModalOpen, isGlassDisabled]);

  useEffect(() => {
    if (!isInView || isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView, activeCategory.images.length, isModalOpen]);

  const currentImage = activeCategory.images[focusedIndex];

  return (
    <Section ref={sectionRef} className="flex flex-col items-center justify-center relative overflow-hidden h-screen perspective-1000">
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
         <FadeIn delay={0.2} duration={1.5}>
            <ParallaxText className="text-[35vw] leading-none text-brand-pink/20 select-none tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
              {works.heading}
            </ParallaxText>
         </FadeIn>
      </div>

      <div className="z-10 w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full pb-32">
        <div className="flex flex-col items-center justify-center order-1 lg:order-1 h-full">
            <div className="relative w-[320px] h-[240px] md:w-[600px] md:h-[400px] flex items-center justify-center">
                <AnimatePresence initial={false} custom={{ direction, axis }} mode="popLayout">
                    <motion.div
                        key={`${activeCategory.id}-${focusedIndex}`}
                        layoutId={`image-${activeCategory.id}-${focusedIndex}`} 
                        custom={{ direction, axis }}
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
                        <div 
                            className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                            style={{ backgroundImage: `url(${currentImage})` }}
                        />
                        <div className="absolute bottom-4 right-6 pointer-events-none">
                             <span className="font-display font-bold text-white/90 text-4xl md:text-5xl drop-shadow-md">
                                0{focusedIndex + 1}
                             </span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="absolute -bottom-24 md:-bottom-28 left-1/2 -translate-x-1/2 flex items-center gap-8 w-max z-20">
                    <MagneticButton onClick={handlePrev} label="Previous Project" className="w-14 h-14">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                    </MagneticButton>

                    <MagneticButton onClick={handleNext} label="Next Project" className="w-14 h-14">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </MagneticButton>
                </div>
            </div>
        </div>

        <div className="flex flex-col items-center lg:items-end text-center lg:text-right order-2 lg:order-2">
            <MotionGlassCard 
              layout 
              transition={{ layout: { duration: 0.5, type: "spring", stiffness: 100, damping: 20 } }}
              className="p-8 md:p-10 rounded-[2.5rem] w-full max-w-lg backdrop-blur-3xl bg-white/10 border border-white/20 overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeCategory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-pink uppercase mb-6 leading-none drop-shadow-sm text-center">
                    {activeCategory.title}
                  </h2>
                  <div className="w-16 h-1 bg-brand-pink/30 rounded-full mb-6 mx-auto lg:mx-0 lg:ml-auto" />
                  <p className="font-sans text-brand-text text-lg leading-relaxed font-light text-justify">
                    {activeCategory.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </MotionGlassCard>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center z-50 pointer-events-auto"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ type: "spring" as const, stiffness: 200, damping: 20, delay: 0.1 }}
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
                  className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12 pointer-events-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
              >
                  <motion.div 
                    ref={modalContainerRef}
                    layoutId={`image-${activeCategory.id}-${focusedIndex}`}
                    className={`
                      relative 
                      flex
                      flex-col
                      max-w-[90vw] max-h-[85vh] 
                      shadow-2xl 
                      overflow-hidden
                      ${!isGlassDisabled ? 'bg-white/5 backdrop-blur-md border border-white/20 p-2' : ''}
                    `}
                    onClick={(e) => e.stopPropagation()} 
                  >
                      {!isGlassDisabled && (
                        <>
                            <div 
                                ref={modalSheenRef}
                                className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-60"
                                style={{ 
                                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)" 
                                }}
                            />
                            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-30" />
                            </div>
                        </>
                      )}

                      <div className="relative overflow-hidden flex items-center justify-center">
                        <motion.img 
                          src={currentImage} 
                          alt="Work Preview"
                          className={`
                              block 
                              w-auto h-auto 
                              max-w-full 
                              ${!isGlassDisabled ? 'max-h-[calc(85vh-16px)]' : 'max-h-[85vh]'}
                              object-contain
                              bg-zinc-900
                          `}
                        />
                      </div>
                  </motion.div>

                  <div className="mt-8 flex justify-center" onClick={(e) => e.stopPropagation()}>
                      <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          onClick={() => setIsModalOpen(false)}
                          className="px-8 py-3 rounded-full bg-brand-pink text-white font-display font-bold uppercase tracking-widest text-sm md:text-base shadow-[0_0_20px_rgba(240,74,117,0.4)] hover:scale-105 hover:bg-white hover:text-brand-pink transition-all duration-300"
                      >
                          Back to Works
                      </motion.button>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
    </Section>
  );
};