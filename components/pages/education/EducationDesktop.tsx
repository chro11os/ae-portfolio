"use client";
import React, { useState } from "react";
import { Section } from "../../ui/Section";
import { FadeIn } from "../../ui/FadeIn";
import { portfolioConfig } from "../../../config/portfolio";
import { EducationTree } from "./EducationTree";
import { EducationCard } from "./EducationCard";

export const EducationDesktop = () => {
  const { education } = portfolioConfig;
  const [activeIndex, setActiveIndex] = useState(0);

  // Hovering a tree item selects it
  const selectItem = (id: string) => setActiveIndex(education.items.findIndex((item) => item.id === id));

  const activeItem = education.items[activeIndex];

  return (
    <Section id="education-desktop" className="flex flex-col justify-center gap-12 px-12 xl:px-24">

      {/* --- TITLE --- */}
      <FadeIn direction="down" duration={1} className="w-full flex justify-center z-20">
        <h1
          className="
                  font-display font-bold 
                  text-[clamp(4rem,9vw,8.5rem)] leading-[0.8] 
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

      {/* --- TREE + CARD --- */}
      <div className="grid grid-cols-12 gap-16 w-full max-w-[90rem] mx-auto z-20 items-center">
        <EducationTree
          items={education.items}
          selectedId={activeItem.id}
          onSelect={selectItem}
          university={education.university}
        />
        <EducationCard activeItem={activeItem} index={activeIndex} />
      </div>
    </Section>
  );
};
