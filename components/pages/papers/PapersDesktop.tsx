"use client";
import React, { useState } from "react";
import { Section } from "../../ui/Section";
import { BodyText } from "../../ui/Typography";
import { ParallaxText } from "../../ui/ParallaxText";
import { FadeIn } from "../../ui/FadeIn";
import { PaperViewer } from "../../ui/PaperViewer";
import { portfolioConfig } from "../../../config/portfolio";
import { Tilt } from "../../ui/Tilt";
import { Button } from "../../ui/Button";

const PremiumPaperCard = ({ onClick }: { onClick: () => void }) => {
  const { papers } = portfolioConfig;
  const activePaper = papers.items[0];

  return (
    <div className="w-full flex justify-center">
      <Tilt 
        className="group relative w-full max-w-[450px] aspect-[3/4.2]" 
        glare={true}
        rotationIntensity={12}
      >
        <div 
          onClick={onClick}
          className="relative w-full h-full cursor-pointer"
        >
            <div className="absolute inset-0 z-0 bg-black/10 blur-2xl translate-y-10 scale-90 group-hover:translate-y-14 group-hover:scale-95 transition-all duration-500" />
            
            <div 
            style={{ transform: "translateZ(50px)" }}
            className="relative z-10 w-full h-full bg-[#FCFCFC] border border-black/[0.03] p-10 flex flex-col justify-between items-center text-center shadow-xl overflow-hidden"
            >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

            <div className="space-y-4 pt-4" style={{ transform: "translateZ(30px)" }}>
                <div className="text-[10px] tracking-[0.4em] uppercase text-brand-text/20 group-hover:text-brand-pink/50 transition-colors">
                Click to Preview
                </div>
                <div className="w-8 h-[1px] bg-brand-pink/10 mx-auto" />
                <span className="block font-display text-brand-pink text-[10px] tracking-[0.5em] uppercase opacity-40">
                {activePaper.conference}
                </span>
            </div>

            <div className="flex flex-col items-center gap-6" style={{ transform: "translateZ(80px)" }}>
                <h3 className="font-display font-bold text-brand-pink text-3xl md:text-5xl uppercase leading-[0.9] tracking-tighter">
                {activePaper.title.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                ))}
                </h3>
                <div className="w-10 h-[1px] bg-brand-pink/10" />
                <h4 className="font-sans font-medium text-brand-text/40 text-[10px] uppercase tracking-[0.25em] max-w-[85%] leading-relaxed">
                {activePaper.subtitle}
                </h4>
            </div>

            <div className="pb-4 opacity-10" style={{ transform: "translateZ(20px)" }}>
                <div className="text-[8px] tracking-[1em] uppercase font-bold text-brand-text">MMXXVI — PUBLISHED</div>
            </div>
            
            {/* Glare is handled by Tilt component now via prop */}
            </div>
        </div>
      </Tilt>
    </div>
  );
};

export const PapersDesktop = () => {
  const { papers } = portfolioConfig;
  const activePaper = papers.items[0];
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <Section className="flex flex-row items-center justify-center gap-16 md:gap-32 px-6 max-w-7xl mx-auto">
      
      <div className="w-1/2 flex flex-col items-start text-left">
        <FadeIn direction="down" delay={0.1}>
          <ParallaxText className="text-[clamp(3.5rem,8vw,8rem)] mb-12 text-brand-pink leading-none">
            {papers.heading}
          </ParallaxText>
        </FadeIn>

        <div className="space-y-6 max-w-xl">
            <FadeIn direction="up" delay={0.3}>
                <BodyText className="text-brand-text/50 text-base uppercase tracking-[0.4em] font-bold">
                    {activePaper.type}
                </BodyText>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.4}>
                <BodyText className="text-brand-text text-lg leading-relaxed font-light text-justify">
                    {papers.description}
                </BodyText>
            </FadeIn>

            <FadeIn direction="up" delay={0.6}>
              <div className="flex flex-row gap-4 w-full pt-4">
                <Button 
                  onClick={() => setIsViewerOpen(true)}
                  variant="outline"
                  size="sm"
                  rounded="full"
                  className="flex-1"
                >
                  View Manuscript
                </Button>
                <Button 
                  href={activePaper.fileUrl} 
                  download
                  variant="ghost" 
                  size="sm"
                  rounded="full"
                  className="flex-1 border border-brand-text/10 text-brand-text/40 hover:border-brand-text hover:text-brand-text hover:bg-transparent"
                >
                  Download PDF
                </Button>
              </div>
            </FadeIn>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <FadeIn direction="left" delay={0.5} className="w-full">
            <PremiumPaperCard onClick={() => setIsViewerOpen(true)} />
        </FadeIn>
      </div>

      <PaperViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        paper={activePaper} 
      />
    </Section>
  );
};