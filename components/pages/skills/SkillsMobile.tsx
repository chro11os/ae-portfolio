"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../../ui/Section";
import { BigDisplay } from "../../ui/Typography";
import { FadeIn } from "../../ui/FadeIn";
import { GlassCard } from "../../ui/GlassCard"; 
import { portfolioConfig } from "../../../config/portfolio";

const MotionGlassCard = motion(GlassCard);

export const SkillsMobile = () => {
  const { skills } = portfolioConfig;
  const [activeSkill, setActiveSkill] = useState<typeof skills.items[0] | null>(null);

  return (
    <Section className="flex flex-col items-center justify-start relative overflow-hidden min-h-[100dvh] w-full px-4 pt-20 pb-8">
      
      {/* BACKGROUND TEXT */}
      <div className="absolute top-20 flex items-center justify-center pointer-events-none z-0">
        <FadeIn delay={0.2} duration={1.5}>
          <BigDisplay className="text-[35vw] leading-none text-brand-pink/10 select-none tracking-tighter drop-shadow-sm">
            {skills.heading}
          </BigDisplay>
        </FadeIn>
      </div>

      {/* MAIN CONTENT */}
      <div className="z-10 w-full flex flex-col items-center gap-6 mt-10">
        
        {/* SKILLS GRID */}
        <div className="w-full grid grid-cols-4 gap-4 justify-items-center">
            {skills.items.map((skill, index) => (
                <MobileSkillIcon 
                    key={skill.name} 
                    skill={skill} 
                    index={index}
                    isActive={activeSkill?.name === skill.name}
                    onClick={() => setActiveSkill(skill)}
                />
            ))}
        </div>

        {/* INFO DISPLAY SECTION */}
        <div className="w-full relative z-20 mt-4 h-[240px]">
            <AnimatePresence mode="wait">
                {activeSkill ? (
                    <MotionGlassCard
                        key={activeSkill.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 rounded-3xl h-full flex flex-col justify-center items-center text-center overflow-hidden bg-white/40 backdrop-blur-xl border border-white/40"
                    >
                        <h3 className="font-display font-bold text-2xl text-brand-pink uppercase mb-3">
                            {activeSkill.name}
                        </h3>
                        <div className="w-12 h-1 bg-brand-pink/20 rounded-full mb-4 shrink-0" />
                        <p className="font-sans text-brand-text text-sm leading-relaxed font-light">
                            {activeSkill.description}
                        </p>
                    </MotionGlassCard>
                ) : (
                    <MotionGlassCard
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-6 rounded-3xl h-full flex flex-col justify-center items-center text-center bg-white/40 backdrop-blur-xl border border-white/40"
                    >
                        <p className="font-display text-sm uppercase tracking-[0.2em] text-brand-text/50">
                            Tap an icon to view details
                        </p>
                    </MotionGlassCard>
                )}
            </AnimatePresence>
        </div>

      </div>
    </Section>
  );
};

// --- SUB-COMPONENT ---

const MobileSkillIcon = ({ skill, index, isActive, onClick }: any) => (
  <motion.button 
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.9 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`
          relative w-[18vw] h-[18vw] max-w-[80px] max-h-[80px] rounded-2xl overflow-hidden 
          transition-all duration-300 border-2
          ${isActive 
          ? "border-brand-pink shadow-lg scale-105 opacity-100 grayscale-0" 
          : "border-transparent shadow-sm opacity-80 grayscale-[0.5]"
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
  </motion.button>
);