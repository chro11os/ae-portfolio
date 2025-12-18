"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "../../ui/Section";
import { BodyText } from "../../ui/Typography";
import { ParallaxText } from "../../ui/ParallaxText";
import { FadeIn } from "../../ui/FadeIn";
import { PaperViewer } from "../../ui/PaperViewer";
import { portfolioConfig } from "../../../config/portfolio";
import { Button } from "../../ui/Button";

const MobilePaperCard = ({ onClick }: { onClick: () => void }) => {
  const { papers } = portfolioConfig;
  const activePaper = papers.items[0];

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative w-full max-w-[280px] aspect-[3/4.2] mx-auto"
    >
      <div className="absolute inset-0 z-0 bg-black/5 blur-xl translate-y-6 scale-90" />
      
      <div className="relative z-10 w-full h-full bg-[#FCFCFC] border border-black/[0.03] p-6 flex flex-col justify-between items-center text-center shadow-lg overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

        <div className="space-y-2 pt-2">
          <div className="text-[8px] tracking-[0.3em] uppercase text-brand-pink/60">
            Tap to Preview
          </div>
          <div className="w-6 h-[1px] bg-brand-pink/10 mx-auto" />
          <span className="block font-display text-brand-pink text-[8px] tracking-[0.4em] uppercase opacity-40">
            {activePaper.conference}
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="font-display font-bold text-brand-pink text-2xl uppercase leading-[0.9] tracking-tighter">
            {activePaper.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>
          <div className="w-8 h-[1px] bg-brand-pink/10" />
          <h4 className="font-sans font-medium text-brand-text/40 text-[8px] uppercase tracking-[0.2em] max-w-[90%] leading-relaxed">
            {activePaper.subtitle}
          </h4>
        </div>

        <div className="pb-2 opacity-10">
          <div className="text-[7px] tracking-[0.8em] uppercase font-bold text-brand-text">MMXXVI — PUBLISHED</div>
        </div>
      </div>
    </motion.div>
  );
};

export const PapersMobile = () => {
  const { papers } = portfolioConfig;
  const activePaper = papers.items[0];
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <Section className="flex flex-col items-center justify-start px-6 pt-20 pb-12 min-h-[100dvh] w-full">
      
      <div className="w-full flex flex-col items-center text-center mb-10">
        <FadeIn direction="down" delay={0.1}>
          <ParallaxText className="text-[18vw] mb-6 text-brand-pink leading-none">
            {papers.heading}
          </ParallaxText>
        </FadeIn>

        <div className="space-y-4 w-full">
            <FadeIn direction="up" delay={0.2}>
                <BodyText className="text-brand-text/50 text-xs uppercase tracking-[0.3em] font-bold">
                    {activePaper.type}
                </BodyText>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.3}>
                <BodyText className="text-brand-text text-sm leading-relaxed font-light text-center px-2">
                    {papers.description}
                </BodyText>
            </FadeIn>
        </div>
      </div>

      <div className="w-full mb-10">
        <FadeIn direction="up" delay={0.4}>
            <MobilePaperCard onClick={() => setIsViewerOpen(true)} />
        </FadeIn>
      </div>

      <FadeIn direction="up" delay={0.5} className="w-full mt-auto">
        <div className="flex flex-col gap-3 w-full">
          <Button 
            onClick={() => setIsViewerOpen(true)}
            variant="outline"
            size="sm"
            rounded="xl"
            className="w-full text-[10px]"
          >
            View Manuscript
          </Button>
          <Button 
            href={activePaper.fileUrl} 
            download
            variant="ghost"
            size="sm"
            rounded="xl"
            className="w-full text-[10px] border border-brand-text/10 text-brand-text/40 hover:border-brand-text hover:text-brand-text active:border-brand-text active:text-brand-text"
          >
            Download PDF
          </Button>
        </div>
      </FadeIn>

      <PaperViewer 
        isOpen={isViewerOpen} 
        onClose={() => setIsViewerOpen(false)} 
        paper={activePaper} 
      />
    </Section>
  );
};