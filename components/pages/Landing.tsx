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
    <Section>
      <FadeIn delay={0.5} className="absolute top-8 right-8 md:top-12 md:right-12 z-50">
        <SectionHeading className="text-xl">{personal.logo}</SectionHeading>
      </FadeIn>

      <div className="absolute inset-0 flex items-start justify-center z-0 pointer-events-none pt-32 md:pt-24 lg:pt-16">
        <FadeIn duration={1}>
          <BigDisplay className="text-[25vw] md:text-[20vw] text-center drop-shadow-[0_15px_15px_rgba(0,0,0,0.1)]">
            {landing.heading}
          </BigDisplay>
        </FadeIn>
      </div>

      <FadeIn 
        direction="right" 
        delay={0.2}
        className="absolute bottom-0 left-0 z-10 w-[85vw] md:w-[45vw] lg:w-[38vw]"
      >
        <div className="relative aspect-[3/4] md:aspect-[4/5] w-full">
           <Image 
             src="/assets/landing-page-photo.png"
             alt={personal.name}
             fill
             className="object-contain object-bottom"
             priority 
             sizes="(max-width: 768px) 85vw, 40vw"
           />
        </div>
      </FadeIn>

      <FadeIn 
        direction="left" 
        delay={0.4}
        className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-20 text-right max-w-[200px] md:max-w-xs"
      >
        <BodyText className="text-base md:text-xl lg:text-2xl uppercase tracking-wide whitespace-pre-line hover:text-brand-pink transition-colors duration-300 cursor-default">
          {landing.subHeading}
        </BodyText>
      </FadeIn>

      <Signature />

      <FadeIn 
        delay={1} 
        direction="right"
        className="absolute bottom-24 left-8 md:bottom-32 md:left-12 z-0 pointer-events-none"
      >
         <span className="font-display font-bold text-7xl md:text-9xl text-brand-text opacity-20 select-none">
            {landing.decoration}
         </span>
      </FadeIn>
    </Section>
  );
};