"use client";
import React from "react";
import Image from "next/image";
import { Section } from "../ui/Section";
import { BodyText } from "../ui/Typography";
import { StaggeredTitle } from "../ui/StaggeredTitle"; // Make sure you created this file!
import { FadeIn } from "../ui/FadeIn";
import { GlassCard } from "../ui/GlassCard"; 
import { portfolioConfig } from "../../config/portfolio";

export const About = () => {
  const { about } = portfolioConfig;

  return (
    <Section className="relative flex flex-col justify-center py-20 overflow-hidden md:min-h-[80vh]">
      
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[90rem] mx-auto px-4 md:px-8 relative z-20 h-full flex flex-col lg:flex-row items-center lg:items-end gap-12 lg:gap-8 mt-12 lg:mt-0">

        {/* --- LEFT COLUMN: Main Photo (Winter/Camera) + Glass Header --- */}
        <div className="relative w-full lg:w-[45%] flex flex-col items-start mb-24 md:mb-40 lg:mb-0">
            
            {/* Main Photo (Portrait with Camera) */}
            <FadeIn 
                delay={0.2} 
                direction="right" 
                className="relative w-[80%] md:w-[70%] lg:w-[85%] aspect-[3/4] z-0 ml-auto lg:ml-0 -translate-y-12 md:-translate-y-32 lg:-translate-y-40"
            >
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                    <Image 
                        src="/assets/about-me-section/above-header-photo.png"
                        alt="Portrait with Camera"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </FadeIn>

            {/* GLASS HEADER OVERLAY */}
            <FadeIn 
                delay={0.4} 
                direction="up" 
                className="absolute bottom-0 left-0 w-full md:w-[110%] z-20 md:-translate-x-8"
            >
                <GlassCard className="
                    px-8 py-6 md:px-12 md:py-10
                    rounded-3xl md:rounded-[3rem]
                    backdrop-blur-xl bg-white/20 
                    border border-white/60
                    shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),inset_0_2px_10px_rgba(255,255,255,0.5)]
                    flex items-center justify-center
                ">
                    {/* UPDATED: 
                       1. Uses StaggeredTitle for animation.
                       2. Sizes reduced (8vw/5vw) to fit inside card without clipping.
                    */}
                    <StaggeredTitle className="
                        text-[8vw] md:text-[6vw] 
                        text-brand-pink 
                        drop-shadow-[0_10px_20px_rgba(240,74,117,0.2)]
                        whitespace-nowrap
                    ">
                        {about.heading}
                    </StaggeredTitle>
                </GlassCard>
            </FadeIn>

        </div>

        {/* --- RIGHT COLUMN: Text Content --- */}
        <div className="relative w-full lg:w-[55%] flex flex-col h-full justify-between lg:pl-12">
            
            {/* Top Text Block */}
            <div className="relative z-10 max-w-2xl ml-auto text-right lg:text-right space-y-6">
                 <FadeIn direction="down" delay={0.3}>
                    <BodyText className="text-brand-pink text-sm md:text-base font-bold tracking-widest uppercase">
                        My Journey
                    </BodyText>
                 </FadeIn>

                 <div className="space-y-4 text-xs md:text-sm lg:text-base leading-relaxed text-brand-text/80 font-medium text-justify">
                    <FadeIn direction="left" delay={0.4}>
                        <p>{about.bioP1}</p>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.5}>
                        <p>{about.bioP2}</p>
                    </FadeIn>
                    <FadeIn direction="left" delay={0.6}>
                        <p>{about.bioP3}</p>
                    </FadeIn>
                 </div>
            </div>

            {/* Quote Block */}
            <div className="relative z-20 flex flex-col items-end md:items-start text-right md:text-left mb-12 lg:mb-24 mr-auto max-w-md pointer-events-none">
                 <FadeIn direction="up" delay={0.7} className="pointer-events-auto">
                     <blockquote className="font-display text-lg md:text-xl text-brand-pink italic leading-tight mb-4 drop-shadow-sm">
                        {about.quote}
                     </blockquote>
                     <cite className="not-italic font-sans text-[10px] md:text-xs text-brand-text/50 uppercase tracking-widest font-bold block">
                        {about.quoteAuthor}
                     </cite>
                 </FadeIn>
            </div>

        </div>

      </div>

      {/* --- WINTER PHOTO (MOVED OUTSIDE CONTAINER) --- */}
      {/* Positioned absolutely at bottom-right of the SECTION */}
      <FadeIn 
          delay={0.5} 
          direction="left" 
          className="absolute bottom-0 right-0 z-10 pointer-events-none"
      >
          <div className="relative w-[50vw] md:w-[40vw] lg:w-[30vw] max-w-[500px] aspect-[3/4] scale-x-[-1] translate-y-[5%]">
              <Image 
                  src="/assets/about-me-section/left-photo.png"
                  alt="Creative Portrait"
                  fill
                  className="object-contain object-bottom"
              />
          </div>
      </FadeIn>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-brand-pink/5 rounded-full blur-[80px] pointer-events-none -z-10 -translate-x-1/2 translate-y-1/2" />

    </Section>
  );
};