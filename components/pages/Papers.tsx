"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Section } from "../ui/Section";
import { BodyText } from "../ui/Typography";
import { ParallaxText } from "../ui/ParallaxText";
import { FadeIn } from "../ui/FadeIn";
import { portfolioConfig } from "../../config/portfolio";

// --- HELPER: MAGNETIC BUTTON ---
const MagneticButton = ({ children, href, className = "" }: { children: React.ReactNode, href: string, className?: string }) => {
    const buttonRef = useRef<HTMLAnchorElement>(null);

    useGSAP(() => {
        const btn = buttonRef.current;
        if (!btn) return;

        const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = btn.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.3);
            yTo(y * 0.3);
        };

        const mouseLeave = () => { xTo(0); yTo(0); };
        btn.addEventListener("mousemove", mouseMove);
        btn.addEventListener("mouseleave", mouseLeave);
        return () => {
            btn.removeEventListener("mousemove", mouseMove);
            btn.removeEventListener("mouseleave", mouseLeave);
        };
    }, { scope: buttonRef });

    return (
        <a 
            ref={buttonRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block ${className}`}
        >
            {children}
        </a>
    );
};

// --- MAIN COMPONENT ---
export const Papers = () => {
  const { papers } = portfolioConfig;
  const activePaper = papers.items[0];

  // Refs
  const containerRef = useRef<HTMLDivElement>(null); // The interaction zone
  const cardRef = useRef<HTMLDivElement>(null);      // The moving paper
  const sheenRef = useRef<HTMLDivElement>(null);     // The light reflection

  useGSAP(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const sheen = sheenRef.current;

    if (!container || !card || !sheen) return;

    // Initial Set to ensure 3D space works
    gsap.set(container, { perspective: 1000 });
    gsap.set(card, { transformStyle: "preserve-3d" });

    const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate percentages (-1 to 1) for Rotation
        const xPct = (mouseX / width - 0.5) * 2; 
        const yPct = (mouseY / height - 0.5) * 2; 

        // Calculate percentages (0% to 100%) for Light Position
        const lightX = (mouseX / width) * 100;
        const lightY = (mouseY / height) * 100;

        // 1. ROTATION & DROP SHADOW
        gsap.to(card, {
            rotationY: xPct * 12,  // Tilt L/R
            rotationX: -yPct * 12, // Tilt U/D (inverted)
            // Shadow moves OPPOSITE to the card tilt to create depth
            boxShadow: `${-xPct * 25}px ${-yPct * 25}px 40px rgba(0,0,0,0.15)`,
            duration: 0.1, 
            ease: "power1.out",
            overwrite: "auto"
        });

        // 2. INNER LIGHTING (SHEEN)
        // Moves a radial gradient across the surface to mimic light
        gsap.to(sheen, {
            background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
            duration: 0.1,
            overwrite: "auto"
        });
    };

    const handleMouseLeave = () => {
        // Reset everything on leave
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.1)", // Default subtle shadow
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto"
        });

        // Reset light
        gsap.to(sheen, {
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)`,
            duration: 0.6
        });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef });

  return (
    <Section className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 px-6 md:px-0 max-w-6xl mx-auto">
      
      {/* 1. LEFT COLUMN: Text Context */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20 pl-0 md:pl-12">
        <FadeIn direction="down" delay={0.1}>
          {/* UPDATED: Increased mb-12 to mb-16 to prevent clipping */}
          <ParallaxText className="text-[15vw] md:text-[8vw] mb-12 md:mb-16 text-brand-pink leading-none drop-shadow-sm">
            {papers.heading}
          </ParallaxText>
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

            {/* MAGNETIC BUTTON */}
            <FadeIn direction="up" delay={0.6}>
              <MagneticButton 
                href={activePaper.link}
                className="
                  group relative
                  inline-flex items-center gap-3 mt-8
                  px-8 py-4 
                  rounded-full 
                  border border-brand-pink/30 
                  bg-brand-pink/5
                  text-brand-pink 
                  font-display font-bold text-sm tracking-widest uppercase 
                  transition-all duration-300
                  hover:bg-brand-pink hover:text-white hover:shadow-[0_10px_20px_-5px_rgba(240,74,117,0.4)]
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
              </MagneticButton>
            </FadeIn>
        </div>
      </div>

      {/* 2. RIGHT COLUMN: SINGLE 3D PAPER CARD */}
      <div className="w-full md:w-1/2 flex items-center justify-center z-20">
        <FadeIn direction="left" delay={0.5} className="relative w-full max-w-md aspect-[3/4]">
            
            {/* INTERACTION CONTAINER */}
            <div 
                ref={containerRef} 
                className="w-full h-full relative cursor-pointer"
            >
                {/* THE CARD ITSELF */}
                <div
                    ref={cardRef}
                    className="
                        relative w-full h-full 
                        bg-[#FAFAFA] rounded-[2rem] 
                        p-8 md:p-12 
                        flex flex-col justify-center items-center text-center
                        overflow-hidden
                    "
                    style={{ 
                        boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" // Initial shadow
                    }}
                >
                    {/* 1. Paper Texture */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />

                    {/* 2. Content */}
                    <div className="relative z-20 flex flex-col items-center gap-6">
                        <span className="font-display text-brand-pink/40 text-xs tracking-[0.3em] uppercase">
                            {activePaper.conference}
                        </span>

                        <h3 className="font-display font-bold text-brand-pink text-2xl md:text-3xl uppercase leading-tight drop-shadow-sm select-none">
                            {activePaper.title}
                        </h3>
                        
                        <div className="w-12 h-1 bg-brand-pink/20 rounded-full" />

                        <h4 className="font-display font-bold text-brand-text/80 text-sm md:text-lg uppercase leading-relaxed tracking-wide select-none">
                            {activePaper.subtitle}
                        </h4>

                        <span className="font-sans text-brand-text/40 text-xs font-medium uppercase tracking-widest mt-8 select-none">
                            {activePaper.date}
                        </span>
                    </div>

                    {/* 3. Dynamic Sheen/Lighting Layer */}
                    <div 
                        ref={sheenRef}
                        className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay"
                        style={{ 
                            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)" 
                        }}
                    />
                </div>
            </div>
        </FadeIn>
      </div>

    </Section>
  );
};