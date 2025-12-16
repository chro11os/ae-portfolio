import React from "react";
import Image from "next/image";
import { Section } from "../ui/Section";
import { BigDisplay, BodyText } from "../ui/Typography";
import { FadeIn } from "../ui/FadeIn";
import { portfolioConfig } from "../../config/portfolio";

export const About = () => {
  const { about } = portfolioConfig;

  return (
    <Section className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
      
      {/* 1. LEFT: Text Content (Centered Alignment) */}
      <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-2xl z-20">
        
        {/* Minimalist Heading with Subtle Shadow */}
        <FadeIn direction="up" delay={0.1}>
          <BigDisplay className="text-[12vw] md:text-[6vw] mb-6 md:mb-8 text-brand-pink drop-shadow-[0_10px_10px_rgba(0,0,0,0.08)]">
            {about.heading}
          </BigDisplay>
        </FadeIn>

        {/* Minimalist Body Text */}
        <div className="space-y-6 md:space-y-8 px-6 md:px-0">
          <FadeIn direction="up" delay={0.3}>
            <BodyText className="text-brand-text/80 text-sm md:text-lg leading-loose font-light">
              {about.bioP1}
            </BodyText>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.4}>
            <BodyText className="text-brand-pink text-sm md:text-lg leading-loose font-medium">
              {about.bioP2}
            </BodyText>
          </FadeIn>
        </div>

      </div>

      {/* 2. RIGHT: Square Photo with Rounded Edges & Shadow */}
      <FadeIn 
        direction="left" 
        delay={0.5} 
        className="flex-1 w-full max-w-sm md:max-w-md aspect-square relative z-10"
      >
        {/* Photo Container */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gray-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
           {/* Replace this div with your actual image later */}
           <div className="w-full h-full bg-stone-300 flex items-center justify-center">
             <span className="text-stone-500 font-display text-sm uppercase tracking-widest">[Insert Photo]</span>
           </div>
        </div>

        {/* Name Card Below Image */}
        <div className="mt-6 flex justify-between items-center border-t border-brand-pink/30 pt-4 px-2">
          <h3 className="font-display font-bold text-brand-pink text-lg md:text-xl uppercase tracking-wide">
              {about.cardName}
          </h3>
          <span className="font-display text-brand-pink/70 text-xs md:text-sm uppercase tracking-widest">
              {about.cardRole}
          </span>
        </div>
      </FadeIn>

    </Section>
  );
};