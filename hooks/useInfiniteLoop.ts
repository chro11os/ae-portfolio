import { useRef, useEffect, useState } from "react";
import { useAnimationFrame, useMotionValue, MotionValue } from "framer-motion";

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

interface UseInfiniteLoopOptions {
  itemCount: number;
  itemWidth?: number; // Optional, can be calculated automatically if needed, but easier if driven by parent
  speedTarget?: number;
}

export function useInfiniteLoop({ itemCount, speedTarget = 0.05 }: UseInfiniteLoopOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const [loopWidth, setLoopWidth] = useState(0);
  const speed = useRef(0);

  // Measure the width of the container to know when to reset the loop
  useEffect(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.scrollWidth;
      // The logic relies on repeating the items, so the loop width is total / repeats
      // However, for simplicity in the hook, we usually just need the width of ONE set
      setLoopWidth(totalWidth / itemCount);
    }
  }, [itemCount]);

  useAnimationFrame((t, delta) => {
    if (loopWidth === 0) return;

    // Smoothly interpolate current speed to target speed
    speed.current = lerp(speed.current, speedTarget, 0.05);

    if (Math.abs(speed.current) > 0.0001) {
      const moveBy = speed.current * delta;
      const currentX = baseX.get();
      let newX = currentX - moveBy;

      // Wrap around logic
      if (newX <= -loopWidth) {
        newX = 0;
      }
      baseX.set(newX);
    }
  });

  return { containerRef, baseX };
}