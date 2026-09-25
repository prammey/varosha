"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
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
 * Adds the "in" class straight to the element, so there is no re-render.
 * Shows immediately if IntersectionObserver is unavailable.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn("rv", delay > 0 && `d${delay}`, className)}>
      {children}
    </Tag>
  );
}
