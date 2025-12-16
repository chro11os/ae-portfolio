"use client";
import { ReactNode } from "react";

// Lenis has been disabled to resolve the conflict with CSS Scroll Snap.
// Native browser scrolling handles 'scroll-behavior: smooth' + 'snap' 
// much better on trackpads without jitter/blinking.
const SmoothScroll = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default SmoothScroll;