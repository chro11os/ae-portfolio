"use client";
import React from "react";
import Image from "next/image";
import { Section } from "../ui/Section";
import { BigDisplay, BodyText, SectionHeading } from "../ui/Typography";
import { Signature } from "../ui/Signature";
import { FadeIn } from "../ui/FadeIn";
import { portfolioConfig } from "../../config/portfolio";

export const Landing = () => {
  const { landing, personal } = portfolioConfig;

  return (
    <Section id="landing" className="relative flex flex-col justify-center overflow-hidden">
      {/* LOGO */}
      <FadeIn delay={0.5} className="absolute top-6 right-6 md:top-12 md:right-12 z-50">
        <SectionHeading className="text-lg md:text-xl">{personal.logo}</SectionHeading>
      </FadeIn>

      {/* GIANT TEXT CONTAINER - Moved higher up using items-start and padding-top */}
      <div className="absolute inset-0 flex items-start justify-center z-0 pointer-events-none px-4 pt-[15vh] md:pt-[10vh]">
        <FadeIn duration={1}>
          <BigDisplay className="text-[clamp(3.5rem,12vw,10rem)] text-brand-pink drop-shadow-[0_15px_15px_rgba(0,0,0,0.08)] text-center w-full uppercase">
            {landing.heading}
          </BigDisplay>
        </FadeIn>
      </div>

      {/* PORTRAIT - Anchored to bottom */}
      <FadeIn 
        direction="right" 
        delay={0.2}
        className="absolute bottom-0 left-0 z-10 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[38vw] max-h-[90vh]"
      >
        <div className="relative aspect-[3/4] md:aspect-[4/5] w-full">
           <Image 
             src="/assets/landing-page-photo-final.png"
             alt={personal.name}
             fill
             className="object-contain object-bottom"
             priority 
             sizes="(max-width: 768px) 85vw, 45vw"
           />
        </div>
      </FadeIn>

      {/* SUBHEADING */}
      <FadeIn 
        direction="left" 
        delay={0.4}
        className="absolute bottom-[25%] md:top-1/2 md:-translate-y-1/2 right-6 md:right-12 z-20 text-right max-w-[200px] md:max-w-xs"
      >
        <BodyText className="text-sm md:text-xl lg:text-2xl uppercase tracking-widest whitespace-pre-line leading-tight">
          {landing.subHeading}
        </BodyText>
      </FadeIn>

      {/* SIGNATURE */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-50">
        <Signature />
      </div>
    </Section>
  );
};