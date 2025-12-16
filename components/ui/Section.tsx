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
          h-screen 
          w-full 
          relative 
          overflow-hidden 
          
          snap-start 
          snap-always
          
          [scroll-snap-stop:always] 
          
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