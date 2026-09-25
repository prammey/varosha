"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import type { ActionState } from "@/app/admin/actions";
import { cn } from "@/lib/cn";
import { useUnsavedChanges } from "./useUnsavedChanges";

/**
 * A form wired to a server action, with a Save button and a one-line result message.
 * Tracks unsaved edits and warns before the page is left.
 */
export function AdminForm({ action, children, submitLabel = "Save" }: { action: (prev: ActionState, fd: FormData) => Promise<ActionState>; children: React.ReactNode; submitLabel?: string }) {
  const [state, formAction] = useActionState(action, null);
  const [dirty, setDirty] = useState(false);
  useUnsavedChanges(dirty);

  // a successful save clears the unsaved flag (React's "adjust state during render" pattern)
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state?.ok) setDirty(false);
  }

  return (
    <form
      action={formAction}
      onInput={() => setDirty(true)}
      onChange={() => setDirty(true)}
      className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(42,30,34,.05)] md:p-8"
    >
      {children}
      <div className="flex flex-wrap items-center gap-4 border-t border-line pt-5">
        <SubmitButton label={submitLabel} />
        {state && !dirty && (
          <span role="status" className={cn("text-[0.9rem] font-semibold", state.ok ? "text-teal" : "text-maroon")}>
            {state.message}
          </span>
        )}
        {dirty && <span className="text-[0.9rem] font-semibold text-gold-2">Unsaved changes</span>}
      </div>
    </form>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="rounded-full bg-maroon px-6 py-2.5 font-bold text-white transition-colors hover:bg-maroon-2 disabled:opacity-60">
      {pending ? "Saving…" : label}
    </button>
  );
}
