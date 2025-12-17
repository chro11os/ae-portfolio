"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../ui/Section";
import { BigDisplay } from "../ui/Typography";
import { FadeIn } from "../ui/FadeIn";
import { portfolioConfig } from "../../config/portfolio";

type EducationItem = typeof portfolioConfig.education.items[0];

export const Education = () => {
  const { education } = portfolioConfig;
  const [selectedId, setSelectedId] = useState(education.items[0].id);
  
  const activeItem = useMemo(() => 
    education.items.find((item) => item.id === selectedId) || education.items[0],
    [selectedId, education.items]
  );

  return (
    <Section id="education" className="flex flex-col justify-start px-6 md:px-12 lg:px-24 py-12 md:py-16 min-h-screen">
      
      {/* 1. HEADER: Title alignment base point */}
      <div className="mb-4 md:mb-6 w-full max-w-7xl mx-auto z-20 pt-6 md:pt-10">
        <FadeIn direction="down" delay={0.1}>
          <BigDisplay className="text-[11vw] md:text-[6.5vw] lg:text-[6vw] leading-[0.75] text-brand-pink uppercase tracking-tighter">
            {education.heading}
          </BigDisplay>
        </FadeIn>
        <FadeIn direction="down" delay={0.2}>
          <BigDisplay className="text-[11vw] md:text-[6.5vw] lg:text-[6vw] leading-[0.75] text-brand-pink/30 uppercase mt-[0.5vw] md:mt-[0vw] tracking-tighter">
            {education.heading2}
          </BigDisplay>
        </FadeIn>
      </div>

      {/* 2. MAIN GRID: Aligned left with header edge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 w-full max-w-7xl mx-auto z-20 items-start mt-4 md:mt-8">
        
        {/* LEFT: Navigation Tree - Padding removed to align with title edge */}
        <EducationNavigation 
          university={education.university}
          items={education.items}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        {/* RIGHT: Details Panel */}
        <EducationDetails 
          activeItem={activeItem} 
          index={education.items.findIndex(i => i.id === activeItem.id)}
        />

      </div>
    </Section>
  );
};

// --- SUB-COMPONENTS ---

const EducationNavigation = ({ 
  university, items, selectedId, onSelect 
}: { 
  university: string;
  items: EducationItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}) => {
  return (
    <div className="relative w-full">
      <FadeIn direction="right" delay={0.3} className="mb-6 md:mb-8">
        <h3 className="font-display font-bold text-brand-pink text-sm md:text-base lg:text-lg tracking-[0.3em] uppercase">
          {university}
        </h3>
      </FadeIn>

      {/* Tree container: padding-left set to 0 to align start with heading above */}
      <div className="relative pl-0 md:pl-0">
        {/* Tree Line: Adjusted position to account for 0 padding */}
        <div className="absolute left-[6px] top-2 bottom-2 w-[1px] bg-brand-pink/20" />

        <div className="space-y-3 md:space-y-4 relative">
          {items.map((item, index) => {
            const isActive = selectedId === item.id;
            const showCategory = index === 0 || items[index - 1].category !== item.category;

            return (
              <div key={item.id}>
                {showCategory && (
                   <FadeIn direction="left" delay={0.4} className={`${index !== 0 ? 'mt-6 md:mt-8' : 'mt-1'} mb-3 pl-6`}>
                      <span className="font-display font-bold text-brand-pink/40 text-[9px] md:text-[10px] tracking-[0.4em] uppercase">
                        {item.category}
                      </span>
                   </FadeIn>
                )}

                <FadeIn direction="left" delay={0.4 + (index * 0.05)}>
                  <div 
                    onClick={() => onSelect(item.id)}
                    className="group relative pl-6 cursor-pointer py-1"
                  >
                    <div 
                      className={`absolute left-[-2.5px] md:left-[-1.5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-[1.5px] border-brand-bg transition-all duration-500 z-10
                        ${isActive 
                          ? "bg-brand-pink scale-110 shadow-[0_0_8px_rgba(240,74,117,0.4)]" 
                          : "bg-brand-pink/20 group-hover:bg-brand-pink/50"
                        }
                      `} 
                    />
                    <h4 
                      className={`font-display font-bold text-xs md:text-sm lg:text-[0.95rem] uppercase tracking-wider transition-all duration-500
                        ${isActive 
                          ? "text-brand-pink translate-x-2" 
                          : "text-brand-text/50 group-hover:text-brand-text"
                        }
                      `}
                    >
                      {item.title}
                    </h4>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const EducationDetails = ({ activeItem, index }: { activeItem: EducationItem, index: number }) => (
  <div className="lg:sticky lg:top-32 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-brand-pink/10 pt-8 lg:pt-0 lg:pl-12 min-h-[350px]">
    <AnimatePresence mode="wait">
      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <span className="inline-block px-2.5 py-0.5 mb-4 rounded-full border border-brand-pink/20 bg-brand-pink/5 text-brand-pink text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase">
          {activeItem.category}
        </span>

        <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-[3.5rem] text-brand-text mb-2 uppercase leading-[0.8] tracking-tighter">
          {activeItem.title}
        </h2>

        <div className="flex items-center gap-3 text-brand-pink font-bold text-[10px] md:text-xs mb-8 tracking-widest font-sans uppercase">
          <span className="opacity-80">{activeItem.year}</span>
          <span className="w-1 h-1 rounded-full bg-brand-pink/20" />
          <span className="opacity-60">{activeItem.role || activeItem.grade}</span>
        </div>

        <p className="font-sans text-brand-text/80 text-sm md:text-base leading-relaxed font-light max-w-lg text-justify">
          {activeItem.description}
        </p>

        <div className="absolute -right-4 -bottom-10 opacity-[0.03] pointer-events-none select-none">
          <span className="font-display font-bold text-[10rem] md:text-[16rem] leading-none text-brand-text">
            {index + 1}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
);