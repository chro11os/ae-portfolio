import React from "react";

// The giant background text (e.g., "AE-DAM", "WHO AM I")
// Increased preferred scaling to 32vw for a more dominant presence
export const BigDisplay = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h1 className={`
    font-display font-bold text-brand-pink leading-[0.8] tracking-tighter select-none 
    text-[clamp(5.5rem,32vw,22rem)] 
    ${className}
  `}>
    {children}
  </h1>
);

// The section headers (e.g., "MAPUA", names)
export const SectionHeading = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`
    font-display font-bold text-brand-pink uppercase tracking-widest 
    text-sm md:text-base lg:text-lg 
    ${className}
  `}>
    {children}
  </h3>
);

// Standard body text
export const BodyText = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={`
    font-sans text-brand-text font-medium leading-relaxed 
    text-sm md:text-base lg:text-lg 
    ${className}
  `}>
    {children}
  </p>
);