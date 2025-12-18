"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  rounded?: "full" | "xl" | "2xl";
  children: React.ReactNode;
  className?: string;
  // If it's a link
  href?: string;
  download?: string | boolean;
  target?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ 
    variant = "primary", 
    size = "md", 
    rounded = "xl", 
    className = "", 
    children, 
    href, 
    ...props 
  }, ref) => {

    const baseStyles = "relative font-display font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center overflow-hidden active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-brand-pink text-white shadow-lg hover:bg-brand-pink/90",
      secondary: "bg-white/40 backdrop-blur-xl border border-white/40 text-brand-text hover:bg-white/60 hover:shadow-md",
      outline: "border border-brand-pink/30 bg-brand-pink/5 text-brand-pink hover:bg-brand-pink hover:text-white",
      ghost: "bg-transparent text-brand-text/50 hover:text-brand-pink"
    };

    const sizes = {
      sm: "text-[10px] py-3 px-6",
      md: "text-xs py-4 px-8",
      lg: "text-sm md:text-base py-5 px-10"
    };

    const roundness = {
      full: "rounded-full",
      xl: "rounded-xl",
      "2xl": "rounded-2xl"
    };

    const combinedClasses = `
      ${baseStyles} 
      ${variants[variant]} 
      ${sizes[size]} 
      ${roundness[rounded]} 
      ${className}
    `;

    // Internal content wrapper for z-index (useful if we add hover effects later)
    const content = (
       <span className="relative z-10 flex items-center gap-2">{children}</span>
    );

    if (href) {
      return (
        <motion.a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={combinedClasses}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...(props as any)}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";