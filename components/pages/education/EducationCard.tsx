"use client";
import React from "react";
import { portfolioConfig } from "../../../config/portfolio";
import { FadeIn } from "../../ui/FadeIn"; // Importing your persistent component

interface EducationCardProps {
  activeItem: typeof portfolioConfig.education.items[0];
  index: number;
}

export const EducationCard = ({ activeItem, index }: EducationCardProps) => {
  return (
    <div className="col-span-8 h-full">
      {/* PERSISTENT SCROLL ENTRY: The whole card block fades in when scrolled to */}
      <FadeIn direction="up" delay={0.2} duration={0.8} className="h-full">
        {/* key remounts the card on switch, replaying animate-card-in / animate-number-in */}
        <div
            key={activeItem.id}
            className="
                animate-card-in
                relative 
                surface-raised
                p-12 rounded-[2.5rem] 
                min-h-[450px] flex flex-col justify-center 
                will-change-transform
            "
        >
            {/* PINK PILL LABEL */}
            <div className="mb-6">
            <span className="
                inline-block px-4 py-1.5 rounded-full 
                bg-brand-pink/10 text-brand-pink 
                text-xs font-bold tracking-[0.2em] uppercase
                shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]
            ">
                {activeItem.category}
            </span>
            </div>

            {/* TITLE */}
            <h2 className="
                font-display font-bold 
                text-[3.5rem] md:text-[4.5rem] 
                text-gray-900 mb-4 
                uppercase leading-[0.9] tracking-tighter
                drop-shadow-sm
            ">
            {activeItem.cardTitle || activeItem.title}
            </h2>

            {/* METADATA */}
            <div className="flex items-center gap-4 text-brand-pink font-bold text-sm md:text-base mb-8 tracking-widest font-sans uppercase">
            <span className="drop-shadow-sm">{activeItem.year}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink/40" />
            <span className="drop-shadow-sm">{activeItem.role || activeItem.grade}</span>
            </div>

            {/* DESCRIPTION */}
            <p className="font-sans text-gray-600 text-lg leading-relaxed font-normal max-w-2xl text-justify">
            {activeItem.description}
            </p>

            {/* BACKGROUND NUMBER */}
            <div className="animate-number-in absolute right-8 bottom-[-3rem] opacity-[0.04] pointer-events-none select-none overflow-hidden">
            <span className="font-display font-bold text-[22rem] leading-none text-black">
                {index + 1}
            </span>
            </div>
        </div>
      </FadeIn>
    </div>
  );
};