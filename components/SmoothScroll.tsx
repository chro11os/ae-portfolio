"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const isAnimating = useRef(false);
  const currentSection = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0, // The speed of the page transition
      easing: (t) => 1 - Math.pow(1 - t, 4), // Power4 Ease Out (Premium feel)
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wrapper: window,
      content: document.documentElement,
      // We manually handle scroll via 'scrollTo', so we can disable standard smooth wheel
      // to avoid fighting the user.
      touchMultiplier: 0, 
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- ONE SCROLL LOGIC ---
    
    const handleScroll = (e: WheelEvent) => {
      // 1. If we are already moving, IGNORE further inputs (Debounce)
      if (isAnimating.current) return;

      const totalSections = document.querySelectorAll('.snap-section').length;
      const direction = e.deltaY > 0 ? 1 : -1;

      // 2. Check if we can actually move in that direction
      const nextIndex = currentSection.current + direction;

      if (nextIndex < 0 || nextIndex >= totalSections) return;

      // 3. LOCK & MOVE
      isAnimating.current = true;
      currentSection.current = nextIndex;

      const vh = window.innerHeight;
      
      lenis.scrollTo(nextIndex * vh, {
        duration: 1.2, // Slide duration
        lock: true,    // Force the scroll to happen
        onComplete: () => {
          // 4. UNLOCK after animation finishes
          // We add a tiny buffer (timeout) to let trackpad inertia die down
          setTimeout(() => {
            isAnimating.current = false;
          }, 100); 
        },
      });
    };

    // Add the listener to the window
    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      lenis.destroy();
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return <>{children}</>;
}