"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ActionState } from "@/app/admin/actions";
/** Confirmation stays inside the existing editing panel. Failed deletes remain visible. */
export function DeleteButton({ action, what }: { action: () => Promise<ActionState>; what: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  if (!confirming) return <button type="button" onClick={() => setConfirming(true)} className="text-[0.9rem] font-semibold text-mute hover:text-maroon">Delete {what}</button>;
  return (
    <span className="flex flex-wrap items-center gap-3 text-[0.9rem]">
      <span className="font-semibold text-maroon">Delete this {what}? This can’t be undone.</span>
      <button type="button" disabled={pending} className="rounded-full bg-maroon px-4 py-1.5 font-bold text-white hover:bg-maroon-2 disabled:opacity-60" onClick={() => startTransition(async () => {
        try {
          const result = await action();
          if (!result?.ok) { setError(result?.message ?? "Could not delete. Try again."); return; }
          if (result.redirectTo) router.replace(result.redirectTo);
          router.refresh();
        } catch { setError("Could not delete. Check your connection and reload before trying again."); }
      })}>{pending ? "Deleting…" : "Yes, delete"}</button>
      <button type="button" disabled={pending} onClick={() => setConfirming(false)} className="font-semibold text-mute hover:text-ink">Keep it</button>
      {error && <span role="alert" className="font-semibold text-maroon">{error}</span>}
    </span>
  );
}
