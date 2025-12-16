// The standard slide container
export const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <section className={`snap-section w-full h-full relative overflow-hidden p-6 md:p-12 ${className}`}>
    {children}
  </section>
);