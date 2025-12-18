import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className = "", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={`
          /* MOBILE DEFAULT: Flexible height, padding for readability */
          min-h-screen 
          w-full 
          relative 
          py-20
          
          /* DESKTOP (lg): Strict Fixed Height & Snap (Your Original Design) */
          lg:h-screen 
          lg:py-0
          lg:overflow-hidden 
          lg:snap-start 
          lg:snap-always 
          lg:[scroll-snap-stop:always] 
          
          ${className}
        `}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";