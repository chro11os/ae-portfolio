"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../ui/Section";
import { BigDisplay } from "../ui/Typography";
import { FadeIn } from "../ui/FadeIn";
import { portfolioConfig } from "../../config/portfolio";

// --- TYPES (Inferred for cleanliness) ---
type EducationItem = typeof portfolioConfig.education.items[0];

export const Education = () => {
  const { education } = portfolioConfig;
  
  // STATE
  const [selectedId, setSelectedId] = useState(education.items[0].id);
  
  // DERIVED STATE
  const activeItem = useMemo(() => 
    education.items.find((item) => item.id === selectedId) || education.items[0],
    [selectedId, education.items]
  );

  return (
    <Section className="flex flex-col justify-center px-4 md:px-12 lg:px-24 py-4 md:py-8">
      
      {/* 1. HEADER */}
      <EducationHeader 
        heading={education.heading} 
        heading2={education.heading2} 
      />

      {/* 2. MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-7xl mx-auto z-20 items-start">
        
        {/* LEFT: Navigation Tree */}
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

const EducationHeader = ({ heading, heading2 }: { heading: string, heading2: string }) => (
  <div className="mb-6 md:mb-10 w-full max-w-7xl mx-auto z-20">
    <FadeIn direction="down" delay={0.1}>
      <BigDisplay className="text-[8vw] md:text-[5vw] leading-[0.85] text-brand-pink uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.08)]">
        {heading}
      </BigDisplay>
    </FadeIn>
    <FadeIn direction="down" delay={0.2}>
      <BigDisplay className="text-[8vw] md:text-[5vw] leading-[0.85] text-brand-pink/40 uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.08)]">
        {heading2}
      </BigDisplay>
    </FadeIn>
  </div>
);

const EducationNavigation = ({ 
  university, items, selectedId, onSelect 
}: { 
  university: string;
  items: EducationItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}) => {
  return (
    <div className="relative">
      {/* University Name */}
      <FadeIn direction="right" delay={0.3} className="mb-6">
        <h3 className="font-display font-bold text-brand-pink text-lg md:text-xl tracking-widest uppercase">
          {university}
        </h3>
      </FadeIn>

      {/* Vertical Line */}
      <div className="absolute left-[6px] top-12 bottom-2 w-[2px] bg-brand-pink/20" />

      {/* List Items */}
      <div className="space-y-2 relative">
        {items.map((item, index) => {
          const isActive = selectedId === item.id;
          // Logic: Show category header if it's the first item OR if it's different from the previous one
          const showCategory = index === 0 || items[index - 1].category !== item.category;

          return (
            <div key={item.id}>
              {/* Category Header */}
              {showCategory && index !== 0 && (
                 <FadeIn direction="left" delay={0.4} className="mt-6 mb-2 pl-6">
                    <span className="font-display font-bold text-brand-pink/60 text-[10px] md:text-xs tracking-widest uppercase">
                      {item.category}
                    </span>
                 </FadeIn>
              )}

              {/* Interactive Item */}
              <FadeIn direction="left" delay={0.4 + (index * 0.05)}>
                <div 
                  onClick={() => onSelect(item.id)}
                  className="group relative pl-6 cursor-pointer py-1"
                >
                  {/* Dot */}
                  <div 
                    className={`absolute left-0 top-2.5 w-3 h-3 rounded-full border-[2px] border-brand-bg transition-all duration-300 z-10
                      ${isActive 
                        ? "bg-brand-pink scale-125 shadow-[0_0_10px_rgba(240,74,117,0.6)]" 
                        : "bg-brand-pink/30 group-hover:bg-brand-pink"
                      }
                    `} 
                  />
                  {/* Label */}
                  <h4 
                    className={`font-display font-bold text-base md:text-lg uppercase tracking-wide transition-all duration-300
                      ${isActive 
                        ? "text-brand-pink translate-x-2" 
                        : "text-brand-text/70 group-hover:text-brand-text"
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
  );
};

const EducationDetails = ({ activeItem, index }: { activeItem: EducationItem, index: number }) => (
  <div className="lg:sticky lg:top-20 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-brand-pink/20 pt-6 lg:pt-0 lg:pl-10">
    <AnimatePresence mode="wait">
      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Category Tag */}
        <span className="inline-block px-2 py-0.5 mb-3 rounded-full border border-brand-pink/30 bg-brand-pink/5 text-brand-pink text-[10px] md:text-xs font-bold tracking-widest uppercase">
          {activeItem.category}
        </span>

        {/* Title */}
        <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-text mb-2 uppercase leading-none">
          {activeItem.title}
        </h2>

        {/* Sub-details */}
        <div className="flex flex-wrap items-center gap-3 text-brand-pink font-medium text-sm md:text-base mb-4 font-sans">
          <span>{activeItem.year}</span>
          <span className="w-1 h-1 rounded-full bg-brand-pink/40" />
          <span>{activeItem.role || activeItem.grade}</span>
        </div>

        {/* Description */}
        <p className="font-sans text-brand-text/80 text-sm md:text-base leading-relaxed font-light max-w-md">
          {activeItem.description}
        </p>

        {/* Decorative Number */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
          <span className="font-display font-bold text-[8rem] leading-none text-brand-text">
            {index + 1}
          </span>
        </div>

      </motion.div>
    </AnimatePresence>
  </div>
);