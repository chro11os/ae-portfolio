// The giant background text (e.g., "AE-DAM", "WHO AM I")
export const BigDisplay = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h1 className={`font-display font-bold text-brand-pink leading-none tracking-tighter select-none ${className}`}>
    {children}
  </h1>
);

// The section headers (e.g., "MAPUA", names)
export const SectionHeading = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`font-display font-bold text-brand-pink uppercase tracking-widest ${className}`}>
    {children}
  </h3>
);

// Standard body text
export const BodyText = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={`font-sans text-brand-text font-medium leading-relaxed ${className}`}>
    {children}
  </p>
);