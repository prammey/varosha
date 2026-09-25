"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Shows a value (email, handle, phone) that copies to the clipboard when clicked.
 * Falls back to selecting the text if the clipboard is unavailable.
 */
export function CopyText({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(e.currentTarget);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title="Click to copy"
      className={cn(
        "relative inline-block max-w-full cursor-pointer rounded-lg bg-cream-2 px-[0.6em] py-[0.25em] font-sans text-[1.05rem] font-bold text-ink transition-colors hover:bg-gold-soft",
        className,
      )}
    >
      {value}
      <span
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-plum px-2.5 py-1 font-sans text-xs font-bold text-on-plum transition-opacity",
          copied ? "opacity-100" : "opacity-0",
        )}
      >
        Copied
      </span>
    </button>
  );
}
