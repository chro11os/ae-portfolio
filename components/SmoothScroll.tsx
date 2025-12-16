"use client";
import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    lenis.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.current?.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.current?.destroy();
    };
  }, []);

  return children;
};

export default SmoothScroll;