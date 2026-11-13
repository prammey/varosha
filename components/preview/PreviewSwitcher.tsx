"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { PreviewTheme } from "@/lib/preview-theme";

// brand colors first: it is the default view
const options: { theme: PreviewTheme; label: string }[] = [
  { theme: "alt", label: "Brand colors" },
  { theme: "original", label: "Current design" },
];

/** Floating pill that flips between the two designs on whatever page you're on. */
export function PreviewSwitcher({ current }: { current: PreviewTheme }) {
  const pathname = usePathname();
  return (
    // phones: sits above the social icons, which share the bottom edge
    <div className="fixed bottom-[68px] left-4 z-[60] flex items-center gap-1 rounded-full border border-black/10 bg-white/95 p-1 font-sans text-[0.82rem] font-bold shadow-[0_12px_32px_-12px_rgba(0,0,0,.45)] backdrop-blur md:bottom-4">
      <span className="hidden px-2.5 text-[0.7rem] uppercase tracking-[0.12em] text-[#6b6b6b] sm:inline">Preview</span>
      {options.map((o) => (
        // plain <a>: the theme is chosen on the server, so this needs a full page load
        <a
          key={o.theme}
          href={`/${o.theme}?next=${encodeURIComponent(pathname)}`}
          aria-current={o.theme === current ? "true" : undefined}
          className={cn(
            "rounded-full px-3.5 py-2 no-underline transition-colors",
            o.theme === current ? "bg-[#1f1a17] text-white" : "text-[#3a3330] hover:bg-black/5",
          )}
        >
          {o.label}
        </a>
      ))}
    </div>
  );
}
