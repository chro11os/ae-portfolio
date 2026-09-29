"use client";
import React, { useState, useMemo } from "react";
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

  return (
    // STRICT DESKTOP RULES: h-screen, overflow-hidden
    <Section id="education-desktop" className="hidden lg:flex flex-col justify-start px-12 xl:px-24 pt-32 overflow-hidden relative">

      {/* --- TOP HEADER ROW --- */}
      <div className="w-full max-w-[90rem] mx-auto z-20 flex justify-center mt-20">

        {/* TITLE STAYS IN PLACE */}
        <FadeIn direction="down" duration={1}>
          <h1
            className="
                    font-display font-bold 
                    text-[clamp(4rem,10vw,10rem)] leading-[0.8] 
                    uppercase tracking-tighter text-center
                    text-transparent bg-clip-text
                    bg-[linear-gradient(110deg,#F04A75_20%,#ffc4d6_40%,#F04A75_60%)]
                    bg-[length:200%_100%]
                    drop-shadow-sm
                    animate-sheen
                    will-change-[background-position]
                "
          >
            EDUCATION
          </h1>
        </FadeIn>
      </div>

      {/* --- TWO COLUMN CONTENT GRID --- */}
      {/* UPDATED: Increased 'mt-24' to 'mt-40' to push the Tree/Card lower */}
      <div className="grid grid-cols-12 gap-16 w-full max-w-[90rem] mx-auto z-20 items-start mt-40 h-full">

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