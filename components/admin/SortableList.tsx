"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { saveListState, type ActionState } from "@/app/admin/actions";
import type { Collection } from "@/lib/data/types";
import { cn } from "@/lib/cn";
import { useUnsavedChanges } from "./useUnsavedChanges";

export type ListItem = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string | null;
  hidden?: boolean;
  /** where the row's title links; omit for rows with no edit page (newsletters) */
  href?: string;
  /** an extra link shown on the right (e.g. "Open PDF") */
  extra?: { href: string; label: string };
};

type Props = {
  collection: Collection;
  items: ListItem[];
  /** newsletters have no hidden state */
  canHide?: boolean;
  emptyText?: string;
};

/**
 * A list with up/down arrows and hide/show switches. Nothing is sent to the
 * server until "Save changes" is clicked; leaving with unsaved edits warns first.
 */
export function SortableList({ collection, items: initial, canHide = true, emptyText = "Nothing here yet." }: Props) {
  const [items, setItems] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [result, setResult] = useState<ActionState>(null);
  const [pending, startTransition] = useTransition();

  const dirty = JSON.stringify(items.map((i) => [i.id, i.hidden])) !== JSON.stringify(saved.map((i) => [i.id, i.hidden]));
  useUnsavedChanges(dirty);

  const move = (index: number, dir: -1 | 1) => {
    const next = [...items];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    setItems(next);
    setResult(null);
  };
  const toggle = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, hidden: !i.hidden } : i)));
    setResult(null);
  };
  const save = () =>
    startTransition(async () => {
      const r = await saveListState(collection, items.map((i) => ({ id: i.id, hidden: Boolean(i.hidden) })));
      setResult(r);
      if (r?.ok) setSaved(items);
    });
  const discard = () => {
    setItems(saved);
    setResult(null);
  };

  if (items.length === 0) return <p className="rounded-xl bg-white px-4 py-6 text-center text-mute">{emptyText}</p>;

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2">
        {items.map((it, i) => (
          <li key={it.id} className={cn("flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-[0_1px_2px_rgba(42,30,34,.05)]", it.hidden && "opacity-60")}>
            {it.image !== undefined && (
              <span className="relative block h-12 w-16 flex-none overflow-hidden rounded-md bg-cream-2">
                {it.image && <Image src={it.image} alt="" fill sizes="64px" unoptimized={it.image.startsWith("http") || it.image.startsWith("/uploads/")} className="object-cover" />}
              </span>
            )}
            <div className="flex min-w-0 flex-1 flex-col">
              {it.href ? (
                <Link href={it.href} className="truncate font-bold text-ink no-underline">{it.title}{it.hidden && <HiddenTag />}</Link>
              ) : (
                <span className="truncate font-bold text-ink">{it.title}{it.hidden && <HiddenTag />}</span>
              )}
              {it.subtitle && <span className="truncate text-[0.85rem] text-mute">{it.subtitle}</span>}
            </div>
            <div className="flex items-center gap-1">
              {it.extra && <a href={it.extra.href} target="_blank" rel="noopener" className="mr-2 text-[0.85rem] font-semibold">{it.extra.label}</a>}
              {canHide && (
                <button type="button" onClick={() => toggle(it.id)} title={it.hidden ? "Show on the website" : "Hide from the website"} className="rounded-md px-2 py-1 text-[0.8rem] font-semibold text-mute hover:bg-cream-2 hover:text-ink">
                  {it.hidden ? "Show" : "Hide"}
                </button>
              )}
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="rounded-md px-2 py-1 text-mute hover:bg-cream-2 hover:text-ink disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down" className="rounded-md px-2 py-1 text-mute hover:bg-cream-2 hover:text-ink disabled:opacity-30">↓</button>
            </div>
          </li>
        ))}
      </ul>

      {(dirty || result) && (
        <div className={cn("sticky bottom-4 flex flex-wrap items-center gap-4 rounded-xl px-4 py-3 shadow-card", dirty ? "bg-plum text-on-plum" : "bg-white")}>
          {dirty ? (
            <>
              <span className="text-[0.9rem] font-semibold">Unsaved changes to order or visibility.</span>
              <button type="button" onClick={save} disabled={pending} className="rounded-full bg-gold px-5 py-2 text-[0.9rem] font-bold text-plum-2 hover:bg-[#f0b84f] disabled:opacity-60">
                {pending ? "Saving…" : "Save changes"}
              </button>
              <button type="button" onClick={discard} disabled={pending} className="text-[0.9rem] font-semibold text-on-plum-2 hover:text-on-plum">Discard</button>
            </>
          ) : (
            <span role="status" className={cn("text-[0.9rem] font-semibold", result?.ok ? "text-teal" : "text-maroon")}>{result?.message}</span>
          )}
        </div>
      )}
    </div>
  );
}

function HiddenTag() {
  return <span className="ml-2 rounded-full bg-cream-2 px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-mute">Hidden</span>;
}
