"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { portfolioConfig } from "../../../config/portfolio";
import { FadeIn } from "../../ui/FadeIn"; // Importing your persistent component

interface EducationCardProps {
  activeItem: typeof portfolioConfig.education.items[0];
  index: number;
}

export const EducationCard = ({ activeItem, index }: EducationCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // INTERNAL ANIMATION: Switch Content (Blur/Scale effect)
  useGSAP(() => {
    if (!cardRef.current) return;

    // Reset and animate
    gsap.killTweensOf([cardRef.current, ".bg-number"]);

    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 10, scale: 0.98, filter: "blur(5px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.4, ease: "power3.out" }
    );

    // Parallax number effect
    gsap.fromTo(".bg-number",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 0.04, duration: 0.6, ease: "power2.out", delay: 0.1 }
    );

  }, { dependencies: [activeItem], scope: cardRef });

  return (
    <div className="col-span-8 h-full">
      {/* PERSISTENT SCROLL ENTRY: The whole card block fades in when scrolled to */}
      <FadeIn direction="up" delay={0.2} duration={0.8} className="h-full">
        <div
            ref={cardRef}
            className="
                relative 
                bg-gradient-to-br from-gray-50 to-gray-100
                p-12 rounded-[2.5rem] 
                min-h-[450px] flex flex-col justify-center 
                border border-white/60
                shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] 
                shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)]
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
            {activeItem.title}
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
            <div className="bg-number absolute right-8 bottom-[-3rem] opacity-[0.04] pointer-events-none select-none overflow-hidden">
            <span className="font-display font-bold text-[22rem] leading-none text-black">
                {index + 1}
            </span>
            </div>
        </div>
      </FadeIn>
    </div>
  );
};