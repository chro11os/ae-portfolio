"use client";
import { motion, HTMLMotionProps } from "framer-motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export const FadeIn = ({ 
  children, 
  delay = 0, 
  direction = "none", 
  duration = 0.5,
  className,
  ...props 
}: FadeInProps) => {
  
  const getInitial = () => {
    switch(direction) {
      case "up": return { y: 40, opacity: 0 };
      case "down": return { y: -40, opacity: 0 };
      case "left": return { x: 40, opacity: 0 };
      case "right": return { x: -40, opacity: 0 };
      default: return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      transition={{
        duration,
        delay: delay * 0.5, // ponytail: call sites pass stagger delays up to 0.8 s; halved here instead of editing ~40 of them
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{
        once: true, // animate in the first time only; replaying on every scroll made the site feel slow
        margin: "-50px"
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};