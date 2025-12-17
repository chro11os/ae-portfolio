"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BigDisplay } from "./Typography";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 1 = normal scroll, 0.5 = half speed (slower/further back)
}

export const ParallaxText = ({ children, className = "", speed = 0.5 }: ParallaxTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: -50 }, // Start slightly higher
      {
        y: 100, // Move down as we scroll
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement, // Trigger based on the parent Section
          start: "top bottom", // Start when section top hits viewport bottom
          end: "bottom top",   // End when section bottom hits viewport top
          scrub: true,         // Smoothly link animation to scrollbar
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="will-change-transform">
      <BigDisplay className={className}>
        {children}
      </BigDisplay>
    </div>
  );
};