"use client";

import { useEffect } from "react";

/**
 * Scrolling past either end of the page ("rubber band") shows the <html> background.
 * In the lower half of the page it matches the footer; in the upper half, the cream
 * behind the header. Colors live in styles/globals.css.
 */
export function OverscrollColor() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const pastMiddle = window.scrollY + window.innerHeight / 2 > root.scrollHeight / 2;
      root.classList.toggle("overscroll-footer", pastMiddle);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      root.classList.remove("overscroll-footer");
    };
  }, []);

  return null;
}
