"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../../ui/Section";
import { FadeIn } from "../../ui/FadeIn";
import { portfolioConfig } from "../../../config/portfolio";

export const EducationMobile = () => {
  const { education } = portfolioConfig;
  // State to track which item is expanded (null = none)
  const [expandedId, setExpandedId] = useState<string | null>(education.items[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    // MOBILE RULES: min-h-screen, fluid scroll
    <Section id="education-mobile" className="flex lg:hidden flex-col justify-start px-6 pt-24 pb-32 min-h-screen">
      
      {/* HEADER: Adjusted size to prevent overflow */}
      <div className="mb-12 w-full">
        <FadeIn direction="down">
          <h1 className="font-display font-bold text-[12vw] leading-[0.8] text-brand-pink uppercase tracking-tighter">
            {education.heading}
          </h1>
        </FadeIn>
        <FadeIn direction="down" delay={0.1}>
          <h1 className="font-display font-bold text-[12vw] leading-[0.8] text-brand-pink/30 uppercase tracking-tighter">
            {education.heading2}
          </h1>
        </FadeIn>
      </div>

      <div className="relative pl-2">
        {/* Vertical Line */}
        <div className="absolute left-[9px] top-2 bottom-6 w-[2px] bg-brand-pink/10" />

        <div className="space-y-8">
          {education.items.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const showCategory = index === 0 || education.items[index - 1].category !== item.category;

            return (
              <div key={item.id}>
                {/* Category Label */}
                {showCategory && (
                    <FadeIn direction="left" delay={0.2} className="mb-4 pl-8">
                        <span className="font-display font-bold text-brand-pink/50 text-[10px] tracking-[0.3em] uppercase">
                            {item.category}
                        </span>
                    </FadeIn>
                )}

                <FadeIn direction="left" delay={0.1 * index} className="relative pl-8">
                    {/* Dot */}
                    <div 
                        className={`absolute left-0 top-[10px] w-5 h-5 rounded-full border-[3px] border-brand-bg z-10 transition-colors duration-300
                            ${isExpanded ? "bg-brand-pink shadow-lg scale-110" : "bg-brand-pink/20"}
                        `}
                    />

                    {/* Clickable Card Area */}
                    <div onClick={() => toggleExpand(item.id)} className="cursor-pointer">
                        <h3 className={`font-display font-bold text-xl uppercase tracking-wide transition-colors ${isExpanded ? "text-brand-pink" : "text-brand-text/70"}`}>
                            {item.title}
                        </h3>
                        
                        {/* Always visible year/role line */}
                        <div className="flex items-center gap-2 mt-1 text-[10px] font-bold tracking-widest text-brand-text/40 uppercase">
                            <span>{item.year}</span>
                            <span className="w-1 h-1 rounded-full bg-brand-pink/30" />
                            <span>{item.role || item.grade}</span>
                        </div>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 pb-2">
                                    <p className="font-sans text-brand-text/80 text-sm leading-relaxed text-justify bg-white/40 p-4 rounded-xl border border-white/50 backdrop-blur-sm">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};