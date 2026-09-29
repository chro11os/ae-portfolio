"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BigDisplay } from "./Typography";

interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
}

export const ParallaxText = ({ children, className = "" }: ParallaxTextProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // 0 → 1 as the element travels from entering the viewport bottom to leaving the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-50, 100]);

  return (
    <motion.div ref={ref} style={{ y }} className="will-change-transform">
      <BigDisplay className={className}>
        {children}
      </BigDisplay>
    </motion.div>
  );
};
