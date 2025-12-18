"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  rotationIntensity?: number; // degrees, default 12
  perspective?: number; // default 1000
  glare?: boolean;
  glareOpacity?: number; // max opacity
}

export const Tilt = ({ 
  children, 
  className = "", 
  rotationIntensity = 12, 
  perspective = 1000,
  glare = false,
  glareOpacity = 0.4
}: TiltProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${rotationIntensity}deg`, `-${rotationIntensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${rotationIntensity}deg`, `${rotationIntensity}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Default Glare Gradient
  const glareBackground = useTransform(
    mouseXSpring, 
    [-0.5, 0.5], 
    [
      "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.7) 50%, transparent 80%)", 
      "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.7) 30%, transparent 60%)"
    ]
  );

  return (
    <div 
        style={{ perspective: `${perspective}px` }} 
        className={className}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ 
            rotateX, 
            rotateY, 
            transformStyle: "preserve-3d" 
        }}
        className="relative w-full h-full"
      >
        {children}

        {glare && (
             <motion.div 
                style={{
                    background: glareBackground,
                }}
                className={`absolute inset-0 z-50 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
             />
        )}
      </motion.div>
    </div>
  );
};