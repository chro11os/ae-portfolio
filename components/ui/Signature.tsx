import { FadeIn } from "./FadeIn";

export const Signature = () => (
  <FadeIn 
    delay={0.8} 
    className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-50 text-right pointer-events-none"
  >
    {/* LINE 1 */}
    <p className="font-sans text-brand-pink text-[10px] md:text-sm tracking-[0.3em] uppercase mb-0.5 md:mb-1 opacity-80">
      Presented By
    </p>
    
    {/* LINE 2: Forced into a single line regardless of screen size */}
    <div className="whitespace-nowrap">
      <h2 className="font-display font-bold text-brand-pink text-[min(4.5vw,1.2rem)] md:text-xl lg:text-2xl uppercase leading-none tracking-tighter">
        Jaon Ae-dam Gatchalian
      </h2>
    </div>
  </FadeIn>
);