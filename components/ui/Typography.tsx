import React from "react";

// Updated Clamp: 
// Min: 3.5rem (Mobile safe)
// Scaler: 18vw (Responsive but impactful)
// Max: 22rem (Your original Desktop size)
export const BigDisplay = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h1 className={`
    font-display font-bold text-brand-pink leading-[0.8] tracking-tighter select-none 
    text-[clamp(3.5rem,18vw,22rem)] 
    ${className}
  `}>
    {children}
  </h1>
);

export const SectionHeading = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`
    font-display font-bold text-brand-pink uppercase tracking-widest 
    text-sm md:text-base lg:text-lg 
    ${className}
  `}>
    {children}
  </h3>
);

export const BodyText = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={`
    font-sans text-brand-text font-medium leading-relaxed 
    text-sm md:text-base lg:text-lg 
    ${className}
  `}>
    {children}
  </p>
);