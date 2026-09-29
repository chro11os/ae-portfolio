"use client";
import React, { useRef } from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // 0 to 1 (usually around 0.3 - 0.5)
  className?: string;
}

export const Magnetic = ({ children, strength = 0.5, className = "" }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * strength;
    const y = (e.clientY - (top + height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    // Overshoot curve stands in for the old GSAP elastic ease
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${className}`}
    >
      {children}
    </div>
  );
};
