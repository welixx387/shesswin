"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

type CountUpProps = {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
};

export function CountUp({
  value,
  duration = 1.6,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let controls: ReturnType<typeof animate> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          controls = animate(0, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setDisplay(v),
          });
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      controls?.stop();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
