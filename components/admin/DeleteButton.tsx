"use client";

import { useState } from "react";

/** A delete link that asks once, inline, before doing anything. */
export function DeleteButton({ action, what }: { action: () => Promise<void>; what: string }) {
  const [confirming, setConfirming] = useState(false);
  if (!confirming) {
    return (
      <button type="button" onClick={() => setConfirming(true)} className="text-[0.9rem] font-semibold text-mute hover:text-maroon">
        Delete {what}
      </button>
    );
  }
  return (
    <span className="flex flex-wrap items-center gap-3 text-[0.9rem]">
      <span className="font-semibold text-maroon">Delete this {what}? This can’t be undone.</span>
      <form action={action}>
        <button type="submit" className="rounded-full bg-maroon px-4 py-1.5 font-bold text-white hover:bg-maroon-2">Yes, delete</button>
      </form>
      <button type="button" onClick={() => setConfirming(false)} className="font-semibold text-mute hover:text-ink">Keep it</button>
    </span>
  );
}
