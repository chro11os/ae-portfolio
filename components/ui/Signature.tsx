import { FadeIn } from "./FadeIn";

export const Signature = () => (
  <FadeIn 
    delay={0.8} 
    className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-50 text-right"
  >
    <p className="font-sans text-brand-pink text-xs md:text-sm tracking-widest uppercase mb-1">Presented By</p>
    <h2 className="font-display font-bold text-brand-pink text-base md:text-xl lg:text-2xl uppercase">
      Jaon Ae-dam Gatchalian
    </h2>
  </FadeIn>
);