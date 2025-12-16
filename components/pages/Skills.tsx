"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  motion, 
  AnimatePresence, 
  useAnimationFrame, 
  useMotionValue
} from "framer-motion";
import { Section } from "../ui/Section";
import { BigDisplay } from "../ui/Typography";
import { FadeIn } from "../ui/FadeIn";
import { GlassCard } from "../ui/GlassCard"; 
import { portfolioConfig } from "../../config/portfolio";

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

const MotionGlassCard = motion(GlassCard);

export const Skills = () => {
  const { skills } = portfolioConfig;
  
  // 6 Repeats ensures infinite scroll never runs out of content
  const REPEAT_COUNT = 6;
  const repeatedSkills = Array(REPEAT_COUNT).fill(skills.items).flat();
  
  const [hoveredSkill, setHoveredSkill] = useState<typeof skills.items[0] | null>(null);
  
  // STATE
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Track if the opening "Card Draw" animation is finished
  const [hasIntroFinished, setHasIntroFinished] = useState(false);
  
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const speed = useRef(0); // Start speed at 0

  useEffect(() => {
    // 1. Measure Width
    if (containerRef.current) {
      const totalWidth = containerRef.current.scrollWidth;
      setLoopWidth(totalWidth / REPEAT_COUNT);
    }

    // 2. TIMEOUT FOR INTRO ANIMATION
    // We have roughly 42 items. Stagger is 0.03s. 
    // Total animation time ≈ 1.2s + buffer.
    const introTimer = setTimeout(() => {
      setHasIntroFinished(true);
    }, 1800); // Wait 1.8s before starting the scroll

    return () => clearTimeout(introTimer);
  }, []); 

  useAnimationFrame((t, delta) => {
    if (loopWidth === 0) return;
    if (isDragging) return; 

    // LOGIC: If intro isn't finished, target speed is 0 (Paused).
    // Once finished, if not hovered, target is 0.05.
    const targetSpeed = (!hasIntroFinished || isHovered) ? 0 : 0.05;
    
    // Smoothly interpolate current speed to target speed
    speed.current = lerp(speed.current, targetSpeed, 0.05);

    // Only move if we have velocity
    if (Math.abs(speed.current) > 0.0001) {
        const moveBy = speed.current * delta;
        const currentX = baseX.get();
        let newX = currentX - moveBy;

        if (newX <= -loopWidth) {
            newX = 0;
        }
        baseX.set(newX);
    }
  });

  return (
    <Section className="flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 1. BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <FadeIn delay={0.2} duration={1.5}>
          <BigDisplay className="text-[40vw] leading-none text-brand-pink/20 select-none tracking-tighter drop-shadow-[0_35px_60px_rgba(0,0,0,0.3)]">
            {skills.heading}
          </BigDisplay>
        </FadeIn>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="z-10 w-full flex flex-col items-center gap-12 md:gap-16 pt-20">
        
        {/* INFINITE CAROUSEL */}
        <div 
            className="w-full overflow-x-hidden cursor-grab active:cursor-grabbing py-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div 
                ref={containerRef}
                className="flex gap-8 md:gap-12 w-max px-8" 
                style={{ x: baseX }} 
                drag="x" 
                dragMomentum={false}
                dragConstraints={{ left: -loopWidth * 2, right: 0 }} 
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
            >
                {repeatedSkills.map((skill, index) => {
                    const uniqueKey = `${skill.name}-${index}`;
                    const isHoveredItem = hoveredSkill?.name === skill.name;

                    return (
                    <motion.div 
                        key={uniqueKey}
                        className="relative group shrink-0 z-10"
                        onMouseEnter={() => setHoveredSkill(skill)}
                        
                        // --- ENTRY ANIMATION (CARD DRAW) ---
                        // "viewport={{ once: true }}" ensures STABILITY. 
                        // It runs once when loaded and never hides itself again.
                        initial={{ opacity: 0, y: 100, rotate: 5 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                        viewport={{ once: true }} 
                        transition={{ 
                            duration: 0.5, 
                            ease: "backOut", 
                            delay: index * 0.03 // Fast stagger
                        }}
                    >
                        <motion.div
                            whileHover={{ y: -15, scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={`
                                relative w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden 
                                transition-all duration-300
                                ${isHoveredItem 
                                ? "shadow-[0_20px_30px_-10px_rgba(0,0,0,0.3)] opacity-100 grayscale-0" 
                                : "shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] opacity-90 grayscale-[0.3]"
                                }
                            `}
                        >
                            <Image 
                                src={skill.icon} 
                                alt={skill.name}
                                fill
                                className="object-cover"
                                draggable={false} 
                            />
                        </motion.div>
                    </motion.div>
                    );
                })}
            </motion.div>
        </div>

        {/* 3. INFO DISPLAY SECTION (Persistent GlassCard) */}
        <div className="w-full max-w-3xl px-6 relative z-20">
          <MotionGlassCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }} 
            className="p-8 md:p-10 rounded-[2.5rem] min-h-[220px] flex flex-col justify-center items-center text-center"
          >
            <AnimatePresence mode="wait">
              {hoveredSkill ? (
                <motion.div
                  key={hoveredSkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <h3 className="font-display font-bold text-3xl md:text-5xl text-brand-pink uppercase drop-shadow-sm mb-4">
                    {hoveredSkill.name}
                  </h3>
                  
                  <div className="w-20 h-1.5 bg-brand-pink/20 rounded-full mb-6" />

                  <p className="font-sans text-brand-text text-lg md:text-2xl leading-relaxed font-light">
                    {hoveredSkill.description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                   <p className="font-display text-xl uppercase tracking-[0.2em] text-brand-text">
                    Select a Software
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </MotionGlassCard>
        </div>

      </div>
    </Section>
  );
};