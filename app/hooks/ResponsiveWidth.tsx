import { useState, useEffect } from "react";

export function useResponsiveWidth() {
  const MIN_SCREEN = 640;  // starting breakpoint
  const MAX_SCREEN = 1024; // ending breakpoint

  const MIN_WIDTH = 300;   // width at 640px
  const MAX_WIDTH = 700;   // width at 1024px

  const interpolate = (x: number, xMin: number, xMax: number, yMin: number, yMax: number) => {
    // Clamp first, then interpolate
    const clamped = Math.min(Math.max(x, xMin), xMax);
    const ratio = (clamped - xMin) / (xMax - xMin);
    return yMin + ratio * (yMax - yMin);
  };

  const calculateWidth = () => {
    const screen = window.innerWidth;

    // Below min → lock at 200px
    if (screen <= MIN_SCREEN) return MIN_WIDTH;

    // Above max → lock at 700px
    if (screen >= MAX_SCREEN) return MAX_WIDTH;

    // Between → interpolate smoothly
    let myInterploation = interpolate(screen, MIN_SCREEN, MAX_SCREEN, MIN_WIDTH, MAX_WIDTH);
    return myInterploation;
  };

  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? calculateWidth() : MIN_WIDTH
  );

  useEffect(() => {
    const handleResize = () => setWidth(calculateWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
