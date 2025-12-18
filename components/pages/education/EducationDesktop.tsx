"use client";
import React, { useState, useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Section } from "../../ui/Section";
import { FadeIn } from "../../ui/FadeIn"; 
import { portfolioConfig } from "../../../config/portfolio";
import { EducationTree } from "./EducationTree";
import { EducationCard } from "./EducationCard";

export const EducationDesktop = () => {
  const { education } = portfolioConfig;
  const [selectedId, setSelectedId] = useState(education.items[0].id);
  
  const activeItem = useMemo(() => 
    education.items.find((item) => item.id === selectedId) || education.items[0],
    [selectedId, education.items]
  );

  const activeIndex = education.items.findIndex(i => i.id === selectedId);

  // --- CONTINUOUS SHEEN LOOP (GSAP) ---
  const titleRef = useRef<HTMLHeadingElement>(null);
  useGSAP(() => {
    gsap.to(titleRef.current, {
        backgroundPosition: "-200% 0",
        duration: 4,
        repeat: -1,
        ease: "linear",
    });
  }, { scope: titleRef });

  return (
    // STRICT DESKTOP RULES: min-h-[100dvh] to allow scrolling on short screens
    <Section id="education-desktop" className="hidden lg:flex flex-col justify-start px-12 xl:px-24 pt-24 2xl:pt-32 min-h-[100dvh] relative">
      
      {/* --- TOP HEADER ROW --- */}
      <div className="w-full max-w-[90rem] mx-auto z-20 flex justify-end">
         
         {/* TITLE STAYS IN PLACE */}
         <FadeIn direction="down" duration={1}>
            <h1 
                ref={titleRef}
                className="
                    font-display font-bold 
                    text-[clamp(4rem,10vw,10rem)] leading-[0.8] 
                    uppercase tracking-tighter text-right
                    text-transparent bg-clip-text
                    bg-[linear-gradient(110deg,#F04A75_20%,#ffc4d6_40%,#F04A75_60%)]
                    bg-[length:200%_100%]
                    drop-shadow-sm
                    will-change-[background-position]
                "
            >
              EDUCATION
            </h1>
         </FadeIn>
      </div>

      {/* --- TWO COLUMN CONTENT GRID --- */}
      {/* UPDATED: Reduced 'mt-40' to 'mt-16' for laptops, keeping 'mt-40' for large screens */}
      <div className="grid grid-cols-12 gap-16 w-full max-w-[90rem] mx-auto z-20 items-start mt-16 2xl:mt-40 h-full pb-20">
            
            {/* LEFT COLUMN: TREE */}
            <EducationTree 
                items={education.items} 
                selectedId={selectedId} 
                onSelect={setSelectedId} 
                university={education.university}
            />

            {/* RIGHT COLUMN: CARD */}
            <EducationCard 
                activeItem={activeItem} 
                index={activeIndex}
            />

      </div>
    </Section>
  );
};