"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StaggeredTitleProps {
  children: string;
  className?: string;
}

export const StaggeredTitle = ({ children, className = "" }: StaggeredTitleProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  
  const chars = children.split(""); 

  useGSAP(() => {
    const letters = containerRef.current?.querySelectorAll(".char");
    
    if (letters) {
      gsap.fromTo(
        letters, 
        { 
          y: 40, // Reduced from 100 to keep it closer
          opacity: 0,
          rotate: 10
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <h1 
      ref={containerRef}
      // REMOVED: 'overflow-hidden' which was causing the cut-off
      // ADDED: 'py-2 px-2' to give glyphs room to breathe
      className={`font-display font-bold text-brand-pink leading-none tracking-tighter select-none py-2 px-2 ${className}`}
    >
      {chars.map((char, index) => (
        <span 
            key={index} 
            className="char inline-block"
            style={{ minWidth: char === " " ? "0.3em" : "0" }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
};