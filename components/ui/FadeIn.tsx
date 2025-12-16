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
  duration = 0.8,
  className,
  ...props 
}: FadeInProps) => {
  
  const getInitial = () => {
    switch(direction) {
      case "up": return { y: 40, opacity: 0 };
      case "down": return { y: -40, opacity: 0 };
      case "left": return { x: 40, opacity: 0 }; // slide from right
      case "right": return { x: -40, opacity: 0 }; // slide from left
      default: return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }} // Snappy ease
      viewport={{ 
        once: false, // <--- CHANGED: Allows animation to replay
        margin: "-50px" // <--- ADDED: Triggers slightly inside the viewport
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};