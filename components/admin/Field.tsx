import { cn } from "@/lib/cn";

const inputCls = "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition-colors focus:border-maroon focus:ring-2 focus:ring-maroon/15";

type Base = { label: string; name: string; hint?: string; required?: boolean };

/** A labelled text input with an optional hint underneath. */
export function TextField({ label, name, hint, required, defaultValue, placeholder, type = "text" }: Base & { defaultValue?: string | number; placeholder?: string; type?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.9rem] font-bold">{label}{required && <span className="text-maroon"> *</span>}</span>
      <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required} className={inputCls} />
      {hint && <span className="text-[0.82rem] text-mute">{hint}</span>}
    </label>
  );
}

export function TextArea({ label, name, hint, required, defaultValue, rows = 6, placeholder }: Base & { defaultValue?: string; rows?: number; placeholder?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.9rem] font-bold">{label}{required && <span className="text-maroon"> *</span>}</span>
      <textarea name={name} defaultValue={defaultValue} rows={rows} placeholder={placeholder} required={required} className={cn(inputCls, "font-serif leading-relaxed")} />
      {hint && <span className="text-[0.82rem] text-mute">{hint}</span>}
    </label>
  );
}

export function SelectField({ label, name, hint, defaultValue, options }: Base & { defaultValue?: string; options: { value: string; label: string }[] }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.9rem] font-bold">{label}</span>
      <select name={name} defaultValue={defaultValue} className={inputCls}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <span className="text-[0.82rem] text-mute">{hint}</span>}
    </label>
  );
}

export function Checkbox({ label, name, hint, defaultChecked }: Base & { defaultChecked?: boolean }) {
  return (
    <label className="flex items-start gap-3">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-1 h-4 w-4 accent-maroon" />
      <span className="flex flex-col">
        <span className="text-[0.95rem] font-semibold">{label}</span>
        {hint && <span className="text-[0.82rem] text-mute">{hint}</span>}
      </span>
    </label>
  );
}

/** Two fields side by side on wide screens. */
export function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
