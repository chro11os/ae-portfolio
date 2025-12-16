"use client";
import React from "react";
import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { BigDisplay, BodyText } from "../ui/Typography";
import { FadeIn } from "../ui/FadeIn";
import { portfolioConfig } from "../../config/portfolio";

export const Papers = () => {
  const { papers } = portfolioConfig;
  const activePaper = papers.items[0];

  return (
    <Section className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 px-6 md:px-0 max-w-6xl mx-auto">
      
      {/* 1. LEFT COLUMN: Text Context */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20 pl-0 md:pl-12">
        <FadeIn direction="down" delay={0.1}>
          <BigDisplay className="text-[15vw] md:text-[8vw] mb-6 md:mb-10 text-brand-pink leading-none drop-shadow-sm">
            {papers.heading}
          </BigDisplay>
        </FadeIn>

        <div className="space-y-6 max-w-lg">
            <FadeIn direction="up" delay={0.3}>
                <BodyText className="text-brand-text/60 text-base md:text-lg uppercase tracking-widest font-bold">
                    Latest Publication
                </BodyText>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.4}>
                <BodyText className="text-brand-text text-lg md:text-xl leading-relaxed font-light text-justify md:text-left">
                    {papers.description}
                </BodyText>
            </FadeIn>

             <FadeIn direction="up" delay={0.5}>
                <BodyText className="text-brand-text/80 text-sm md:text-base leading-relaxed italic mt-4 border-l-2 border-brand-pink/30 pl-4 text-left">
                    "{activePaper.abstract}"
                </BodyText>
            </FadeIn>

            {/* DOWNLOAD BUTTON */}
            <FadeIn direction="up" delay={0.6}>
              <a 
                href={activePaper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-3 mt-8
                  px-8 py-4 
                  rounded-full 
                  border border-brand-pink/30 
                  bg-brand-pink/5
                  text-brand-pink 
                  font-display font-bold text-sm tracking-widest uppercase 
                  transition-all duration-300
                  hover:bg-brand-pink hover:text-white hover:border-brand-pink hover:shadow-[0_10px_20px_-5px_rgba(240,74,117,0.4)]
                  group
                "
              >
                <span>Read Full Paper</span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </FadeIn>
        </div>
      </div>

      {/* 2. RIGHT COLUMN: Physical Paper Card */}
      <div className="w-full md:w-1/2 flex items-center justify-center perspective-1000 z-20">
        <FadeIn direction="left" delay={0.5} className="relative w-full max-w-md aspect-[3/4]">
            
            <motion.div
                className="relative w-full h-full bg-[#FAFAFA] rounded-[2rem] p-8 md:p-12 flex flex-col justify-center items-center text-center cursor-pointer group"
                initial={{ rotateX: 0, rotateY: 0, scale: 1 }}
                whileHover={{ 
                    y: -15, 
                    rotateX: 2, 
                    rotateY: -2, 
                    scale: 1.02,
                    boxShadow: "0 50px 100px -20px rgba(50,50,93,0.25), 0 30px 60px -30px rgba(0,0,0,0.3)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ 
                    boxShadow: "0 20px 50px -12px rgba(0,0,0,0.1)",
                    transformStyle: "preserve-3d" 
                }}
            >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none rounded-[2rem]" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <span className="font-display text-brand-pink/40 text-xs tracking-[0.3em] uppercase">
                        {activePaper.conference}
                    </span>

                    <h3 className="font-display font-bold text-brand-pink text-2xl md:text-3xl uppercase leading-tight drop-shadow-sm">
                        {activePaper.title}
                    </h3>
                    
                    <div className="w-12 h-1 bg-brand-pink/20 rounded-full" />

                    <h4 className="font-display font-bold text-brand-text/80 text-sm md:text-lg uppercase leading-relaxed tracking-wide">
                        {activePaper.subtitle}
                    </h4>

                    <span className="font-sans text-brand-text/40 text-xs font-medium uppercase tracking-widest mt-8">
                        {activePaper.date}
                    </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-brand-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
            </motion.div>

            {/* Decorative 'Stack' effect */}
            <div className="absolute top-4 left-4 w-full h-full bg-white rounded-[2rem] shadow-sm -z-10 opacity-60 rotate-2 scale-[0.98]" />
            <div className="absolute top-8 left-8 w-full h-full bg-white rounded-[2rem] shadow-sm -z-20 opacity-30 rotate-4 scale-[0.96]" />

        </FadeIn>
      </div>

    </Section>
  );
};