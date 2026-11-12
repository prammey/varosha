"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** stagger: 1, 2 or 3 adds a 0.1s / 0.2s / 0.3s delay */
  delay?: 0 | 1 | 2 | 3;
  className?: string;
  as?: ElementType;
};

/**
 * Fades and lifts its children in the first time they scroll into view.
 * "Shown" lives in React state: if it were only added to the DOM, a re-render that
 * changes the class list (e.g. a new delay after filtering) would erase it and the
 * element would stay invisible.
 * Shows immediately if IntersectionObserver is unavailable.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn("rv", delay > 0 && `d${delay}`, shown && "in", className)}>
      {children}
    </Tag>
  );
}
