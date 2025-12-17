"use client";
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Section } from "../ui/Section";
import { BodyText } from "../ui/Typography";
import { ParallaxText } from "../ui/ParallaxText";
import { FadeIn } from "../ui/FadeIn";
import { PaperViewer } from "../ui/PaperViewer";
import { portfolioConfig } from "../../config/portfolio";

const PremiumPaperCard = ({ onClick }: { onClick: () => void }) => {
  const { papers } = portfolioConfig;
  const activePaper = papers.items[0];
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <div className="perspective-1000 w-full flex justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative w-full max-sm aspect-[3/4.2] cursor-none"
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
            <h3 className="font-display font-bold text-brand-pink text-3xl md:text-4xl uppercase leading-[0.9] tracking-tighter">
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

          <motion.div 
            style={{
                background: useTransform(
                    mouseXSpring, 
                    [-0.5, 0.5], 
                    ["linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.7) 50%, transparent 80%)", "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.7) 30%, transparent 60%)"]
                )
            }}
            className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
      </motion.div>
    </div>
  );
};

export const Papers = () => {
  const { papers } = portfolioConfig;
  const activePaper = papers.items[0];
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <Section className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 px-6 max-w-7xl mx-auto min-h-screen">
      
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <FadeIn direction="down" delay={0.1}>
          <ParallaxText className="text-[15vw] md:text-[8vw] mb-12 text-brand-pink leading-none">
            {papers.heading}
          </ParallaxText>
        </FadeIn>

        <div className="space-y-6 max-w-xl">
            <FadeIn direction="up" delay={0.3}>
                <BodyText className="text-brand-text/50 text-sm md:text-base uppercase tracking-[0.4em] font-bold">
                    {activePaper.type}
                </BodyText>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.4}>
                <BodyText className="text-brand-text text-base md:text-lg leading-relaxed font-light text-justify papers-description-container">
                    {papers.description}
                </BodyText>
            </FadeIn>

            <FadeIn direction="up" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 w-full pt-4">
                <button 
                  onClick={() => setIsViewerOpen(true)}
                  className="px-12 py-5 rounded-full border border-brand-pink/30 bg-brand-pink/5 text-brand-pink font-display font-bold text-xs tracking-widest uppercase hover:bg-brand-pink hover:text-white transition-all shadow-sm flex-1 cursor-none"
                >
                  View Manuscript
                </button>
                <a 
                  href={activePaper.fileUrl} 
                  download
                  className="px-12 py-5 rounded-full border border-brand-text/10 text-brand-text/40 font-display font-bold text-xs tracking-widest uppercase hover:border-brand-text hover:text-brand-text transition-all flex-1 text-center cursor-none"
                >
                  Download PDF
                </a>
              </div>
            </FadeIn>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center">
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