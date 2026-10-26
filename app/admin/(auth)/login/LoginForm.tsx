"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/app/admin/actions";

const inputCls = "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-base outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/15";

export function LoginForm() {
  const [state, action] = useActionState(login, null);
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-[0.9rem] font-bold">Password</span>
        <input name="password" type="password" autoComplete="current-password" required className={inputCls} />
      </label>
      {state && !state.ok && <p role="alert" className="text-[0.9rem] font-semibold text-maroon">{state.message}</p>}
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="mt-1 rounded-full bg-maroon py-2.5 font-bold text-white hover:bg-maroon-2 disabled:opacity-60">
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}
