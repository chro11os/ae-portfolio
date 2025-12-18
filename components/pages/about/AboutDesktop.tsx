"use client";
import React from "react";
import Image from "next/image";
import { Section } from "../../ui/Section";
import { FadeIn } from "../../ui/FadeIn";
import { portfolioConfig } from "../../../config/portfolio";

export const AboutDesktop = () => {
  const { about } = portfolioConfig;

  return (
    <Section 
      id="about-desktop" 
      className="relative flex flex-col justify-center py-20 overflow-hidden hidden lg:flex"
    >
      
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[90rem] mx-auto px-12 relative z-20 h-full flex flex-row items-center gap-20">

        {/* --- LEFT COLUMN: Transparent Image + 3D Title Card --- */}
        <div className="relative w-[40%] max-w-[420px] mx-auto flex flex-col items-center justify-center mb-12">
            
            {/* PINK PORTRAIT IMAGE (TRANSPARENT) */}
            <FadeIn 
                delay={0.2} 
                direction="up" 
                className="relative w-[110%] aspect-[4/4] flex items-end justify-center z-10 left-1/2 -translate-x-1/2"
            >
                <div className="relative w-full h-full">
                    <Image 
                        src="/assets/about-me-section/above-header-photo.png"
                        alt="Portrait"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>
            </FadeIn>

            {/* 3D CARD TITLE OVERLAY */}
            <div className="absolute bottom-0 translate-y-[50%] left-1/2 -translate-x-1/2 w-[140%] z-20">
                <FadeIn delay={0.4} direction="up">
                    <div className="
                        relative
                        px-8 py-6
                        rounded-[2.5rem]
                        /* 3D EDUCATION CARD STYLES */
                        bg-gradient-to-br from-gray-50 to-gray-100
                        border border-white/60
                        shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] 
                        shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)]
                        flex items-center justify-center
                    ">
                        {/* ENGRAVED TEXT TITLE */}
                        <h1 className="
                            font-display font-bold 
                            text-[5vw] 
                            text-brand-pink 
                            whitespace-nowrap
                            leading-none
                            tracking-tight
                            /* PURE ENGRAVED EFFECT */
                            [text-shadow:0px_1px_0px_rgba(255,255,255,0.8),0px_-1px_0px_rgba(0,0,0,0.1)]
                        ">
                            {about.heading}
                        </h1>
                    </div>
                </FadeIn>
            </div>
            
        </div>

        {/* --- RIGHT COLUMN: Bio & Quote --- */}
        <div className="relative w-[60%] flex flex-col justify-center pl-8">
            
            {/* BIO TEXT & WRAPPING PHOTO CONTAINER */}
            <div className="relative z-10 w-full block">
                 
                 {/* WINTER PHOTO (Floated to allow text wrapping) */}
                 <FadeIn 
                    delay={0.6} 
                    direction="left" 
                    className="float-right w-[40%] max-w-[280px] ml-10 mb-6 relative aspect-[3/4] scale-x-[-1]"
                 >
                      <Image 
                          src="/assets/about-me-section/left-photo.png"
                          alt="Winter Portrait"
                          fill
                          className="object-contain object-bottom"
                      />
                 </FadeIn>

                 {/* BIO TEXT BLOCK */}
                 <div className="space-y-6 text-[0.95rem] leading-relaxed text-brand-text/80 font-medium text-justify">
                    <FadeIn direction="up" delay={0.4}><p>{about.bioP1}</p></FadeIn>
                    <FadeIn direction="up" delay={0.5}><p>{about.bioP2}</p></FadeIn>
                    <FadeIn direction="up" delay={0.6}><p>{about.bioP3}</p></FadeIn>
                 </div>
            </div>

            {/* QUOTE BLOCK */}
            <div className="w-full flex justify-end mt-12 pr-4 relative clear-both">
                 <FadeIn direction="up" delay={0.7} className="max-w-sm text-right z-20">
                     <blockquote className="font-display text-lg text-brand-pink italic leading-snug mb-3">
                        {about.quote}
                     </blockquote>
                     <cite className="not-italic font-sans text-[10px] text-brand-text/50 uppercase tracking-widest font-bold">
                        {about.quoteAuthor}
                     </cite>
                 </FadeIn>
            </div>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-brand-pink/5 rounded-full blur-[80px] pointer-events-none -z-10 -translate-x-1/2 translate-y-1/2" />
    </Section>
  );
};