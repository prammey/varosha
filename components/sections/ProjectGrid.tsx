"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { categoryLabel, projectCategories, projects, type Project, type ProjectCategory } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * Filterable 3-per-row grid on the dark Projects page.
 * Clicking a card opens the full story in a fixed-height panel that scrolls inside.
 * Visiting /projects#slug opens that project directly.
 */
export function ProjectGrid() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [open, setOpen] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // open the dialog whenever a project is selected
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // deep link: /projects#jewelry-making opens that project (and again if the hash changes)
  useEffect(() => {
    const openFromHash = () => {
      const slug = window.location.hash.slice(1);
      const match = projects.find((p) => p.slug === slug);
      if (match) setOpen(match);
    };
    const id = window.setTimeout(openFromHash, 0);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  return (
    <>
      <div role="group" aria-label="Filter projects by type" className="a3 flex flex-wrap justify-center gap-2">
        {projectCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={cn(
              "rounded-full border-2 px-[1.1em] py-[0.5em] font-sans text-[0.9rem] font-bold transition-colors",
              filter === c.id ? "border-gold bg-gold text-plum-2" : "border-white/20 text-on-plum-2 hover:border-gold hover:text-on-plum",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-[clamp(20px,3vw,36px)] sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) as 0 | 1 | 2}>
            <button
              type="button"
              id={p.slug}
              onClick={() => setOpen(p)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-card bg-plum-3 text-left text-on-plum transition-[transform,translate,rotate,scale,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-24px_rgba(0,0,0,.6)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={p.image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col gap-2 px-[22px] pb-6 pt-5">
                <span className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-gold">
                  {categoryLabel[p.category]} · {p.stat}
                </span>
                <h3 className="text-[clamp(1.35rem,2vw,1.65rem)]">{p.title}</h3>
                <span className="font-sans text-[0.9rem] text-on-plum-2">{p.where}</span>
                <span className="mt-auto pt-2.5 font-sans text-[0.92rem] font-bold text-gold">Read the story →</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpen(null);
        }}
        className="m-auto h-[min(560px,84vh)] w-full max-w-[min(940px,94vw)] overflow-visible border-0 bg-transparent p-0"
      >
        {open && (
          <div className="relative grid h-full overflow-hidden rounded-card bg-cream text-ink shadow-card md:grid-cols-[5fr_6fr]">
            <div className="relative h-[180px] md:h-full">
              <Image src={open.image} alt={open.imageAlt} fill sizes="(max-width: 760px) 94vw, 45vw" className="object-cover" />
            </div>
            <div className="flex min-h-0 flex-col gap-3 overflow-y-auto px-[30px] pb-[30px] pt-7">
              <span className="eyebrow pr-11 text-[0.7rem] text-maroon">
                {categoryLabel[open.category]} · {open.where}
              </span>
              <h2 className="pr-11 text-[1.6rem]">{open.title}</h2>
              {open.paragraphs.map((para) => (
                <p key={para.slice(0, 40)} className="text-[0.95rem] leading-[1.55] text-ink-2">{para}</p>
              ))}
              <Button href="/support" size="sm" className="mt-1.5 self-start">Support this work</Button>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-3.5 top-2.5 z-[2] h-11 w-11 rounded-full font-sans text-[2.2rem] font-light leading-none text-ink transition-transform duration-200 hover:rotate-90"
            >
              ×
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
