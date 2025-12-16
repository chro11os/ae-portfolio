"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export const CustomCursor = () => {
  // 1. Motion Values for precise tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Spring Physics 
  // Adjusted for a tighter, more responsive feel suitable for a smaller cursor
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // UPDATED: Subtract 10px (half of w-5/20px) to center perfectly
      mouseX.set(e.clientX - 10); 
      mouseY.set(e.clientY - 10);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" ||
        target.closest("a") || 
        target.closest("button") ||
        target.closest("[role='button']") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      // UPDATED: Added 'transform-gpu' and 'will-change-transform' for smoother, 
      // anti-aliased rendering during movement.
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block transform-gpu will-change-transform"
      style={{
        x: smoothX,
        y: smoothY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* UPDATED: Reduced size to w-5 h-5 (20px) for sharper appearance */}
      <div className="relative w-5 h-5">
        
        {/* Main Cursor */}
        <motion.div
            className="absolute inset-0"
            animate={{ 
                opacity: isHovering ? 0 : 1,
                scale: isHovering ? 0.5 : 1 
            }}
            transition={{ duration: 0.2 }}
        >
            <Image
                src="/assets/cursor/main-cursor.png"
                alt="cursor"
                fill
                // 'unoptimized' can sometimes help with small icon pixelation if 
                // Next.js compression is too aggressive.
                unoptimized 
                className="object-contain"
                priority
            />
        </motion.div>

        {/* Clickable Cursor */}
        <motion.div
            className="absolute inset-0"
            animate={{ 
                opacity: isHovering ? 1 : 0,
                // Adjusted scale to match new size ratio
                scale: isHovering ? 1.4 : 0.5
            }}
            transition={{ duration: 0.2 }}
        >
            <Image
                src="/assets/cursor/clickable-cursor.png"
                alt="cursor-hover"
                fill
                unoptimized
                className="object-contain"
                priority
            />
        </motion.div>
      </div>
    </motion.div>
  );
};