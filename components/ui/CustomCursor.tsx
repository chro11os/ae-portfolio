"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If we are in a magnetic state, the position is handled by the component hover
      if (!isMagnetic) {
        mouseX.set(e.clientX - 10);
        mouseY.set(e.clientY - 10);
      }
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
      
      // Check if the target is magnetic (we'll add this class to our components)
      const magneticEl = target.closest(".magnetic-target");
      if (magneticEl) {
        setIsMagnetic(true);
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(centerX - 10);
        mouseY.set(centerY - 10);
      } else {
        setIsMagnetic(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible, isMagnetic]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block transform-gpu will-change-transform"
      style={{
        x: smoothX,
        y: smoothY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="relative w-5 h-5">
        {/* Main Cursor */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: isHovering || isMagnetic ? 0 : 1,
            scale: isHovering || isMagnetic ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Image
            src="/assets/cursor/main-cursor.png"
            alt="cursor"
            fill
            unoptimized
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Clickable/Magnetic Cursor */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: isHovering || isMagnetic ? 1 : 0,
            scale: isMagnetic ? 2.2 : isHovering ? 1.4 : 0.5, // Bigger scale for magnetic lock
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