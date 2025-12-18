"use client";
import React from "react";
import Image from "next/image";
import { Section } from "../../ui/Section";
import { FadeIn } from "../../ui/FadeIn";
import { portfolioConfig } from "../../../config/portfolio";

export const AboutMobile = () => {
  const { about } = portfolioConfig;

  return (
    // MOBILE RULES: min-h-screen, flex-col, scrolling enabled
    <Section id="about-mobile" className="flex lg:hidden flex-col justify-start pt-24 pb-32 px-6 min-h-screen">
      
      {/* 1. Header & Portrait */}
      <div className="flex flex-col items-center gap-8 mb-12">
        <FadeIn direction="down">
             <h1 className="font-display font-bold text-5xl text-brand-pink text-center uppercase leading-none">
                {about.heading}
             </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} className="relative w-[80vw] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
            <Image 
                src="/assets/about-me-section/above-header-photo.png"
                alt="Portrait"
                fill
                className="object-cover"
            />
        </FadeIn>
      </div>

      {/* 2. Bio Content */}
      <div className="flex flex-col gap-6">
        <FadeIn direction="up" delay={0.3}>
            <h3 className="text-brand-pink text-xs font-bold tracking-[0.3em] uppercase text-center mb-4">
                My Journey
            </h3>
        </FadeIn>

        <div className="space-y-6 text-sm leading-loose text-brand-text/90 font-medium text-justify">
            <FadeIn direction="up" delay={0.4}><p>{about.bioP1}</p></FadeIn>
            <FadeIn direction="up" delay={0.45}><p>{about.bioP2}</p></FadeIn>
            <FadeIn direction="up" delay={0.5}><p>{about.bioP3}</p></FadeIn>
        </div>
      </div>

      {/* 3. Quote */}
      <div className="mt-16 pt-8 border-t border-brand-pink/10">
         <FadeIn direction="up" delay={0.6}>
             <blockquote className="font-display text-lg text-brand-pink italic leading-tight mb-4 text-center">
                {about.quote}
             </blockquote>
             <cite className="not-italic font-sans text-[10px] text-brand-text/50 uppercase tracking-widest font-bold block text-center">
                {about.quoteAuthor}
             </cite>
         </FadeIn>
      </div>

    </Section>
  );
};