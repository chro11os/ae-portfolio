"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../../ui/Section";
import { BigDisplay } from "../../ui/Typography";
import { FadeIn } from "../../ui/FadeIn";
import { GlassCard } from "../../ui/GlassCard"; 
import { portfolioConfig } from "../../../config/portfolio";
import { useInfiniteLoop } from "../../../hooks/useInfiniteLoop";

const MotionGlassCard = motion(GlassCard);

export const SkillsDesktop = () => {
  const { skills } = portfolioConfig;
  
  // CONFIGURATION
  const REPEAT_COUNT = 6;
  const repeatedSkills = Array(REPEAT_COUNT).fill(skills.items).flat();
  
  // STATE
  const [hoveredSkill, setHoveredSkill] = useState<typeof skills.items[0] | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasIntroFinished, setHasIntroFinished] = useState(false);

  // HOOK: Handles the infinite scrolling math
  const { containerRef, baseX } = useInfiniteLoop({
    itemCount: REPEAT_COUNT,
    speedTarget: (!hasIntroFinished || isHovered) ? 0 : 0.05
  });

  // INTRO TIMER
  useEffect(() => {
    const introTimer = setTimeout(() => setHasIntroFinished(true), 1800); 
    return () => clearTimeout(introTimer);
  }, []); 

  return (
    <Section className="flex flex-col items-center justify-center relative overflow-hidden w-full">
      
      {/* BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <FadeIn delay={0.2} duration={1.5}>
          <BigDisplay className="text-[clamp(15rem,35vw,30rem)] leading-none text-brand-pink/20 select-none tracking-tighter drop-shadow-[0_35px_60px_rgba(0,0,0,0.3)]">
            {skills.heading}
          </BigDisplay>
        </FadeIn>
      </div>

      {/* MAIN CONTENT */}
      <div className="z-10 w-full flex flex-col items-center gap-16">
        
        {/* INFINITE CAROUSEL */}
        <div 
            className="w-full overflow-hidden py-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div 
                ref={containerRef}
                className="flex gap-12 w-max px-8" 
                style={{ x: baseX }} 
            >
                {repeatedSkills.map((skill, index) => (
                    <SkillCard 
                      key={`${skill.name}-${index}`} 
                      skill={skill} 
                      index={index} 
                      onHover={setHoveredSkill} 
                      isHovered={hoveredSkill?.name === skill.name}
                    />
                ))}
            </motion.div>
        </div>

        {/* INFO DISPLAY SECTION */}
        <SkillInfoDisplay activeSkill={hoveredSkill} />

      </div>
    </Section>
  );
};

// --- SUB-COMPONENTS ---

const SkillCard = ({ skill, index, onHover, isHovered }: any) => (
  <motion.div 
      className="relative group shrink-0 z-10"
      onMouseEnter={() => onHover(skill)}
      initial={{ opacity: 0, y: 100, rotate: 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: false, margin: "-10% 0px" }} 
      transition={{ duration: 0.5, ease: "backOut", delay: index * 0.03 }}
  >
      <motion.div
          whileHover={{ y: -15, scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`
              relative w-32 h-32 rounded-3xl overflow-hidden 
              transition-all duration-300
              ${isHovered 
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

const SkillInfoDisplay = ({ activeSkill }: { activeSkill: any }) => (
  <div className="w-full max-w-4xl px-6 relative z-20">
    <MotionGlassCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: 0.5 }} 
      className="p-10 rounded-[2.5rem] h-[300px] flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {activeSkill ? (
          <motion.div
            key={activeSkill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center justify-center h-full"
          >
            <h3 className="font-display font-bold text-5xl text-brand-pink uppercase drop-shadow-sm mb-4">
              {activeSkill.name}
            </h3>
            <div className="w-24 h-1.5 bg-brand-pink/20 rounded-full mb-6 shrink-0" />
            <p className="font-sans text-brand-text text-2xl leading-relaxed font-light max-w-3xl">
              {activeSkill.description}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full flex items-center"
          >
              <p className="font-display text-xl uppercase tracking-[0.2em] text-brand-text">
              Select a Software
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionGlassCard>
  </div>
);