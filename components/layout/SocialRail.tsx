import { cn } from "@/lib/cn";
import { getSiteDetails } from "@/lib/data";

type Item = { key: string; label: string; href: string; hover: string; path: string };

/**
 * Social links pinned to the right edge. Each one slides out with its label
 * and takes its brand color on hover. Networks without an account yet point
 * to the contact page (see content/site.ts).
 */
const buildItems = (site: { facebook: string; x: string; youtube: string; instagram: string }): Item[] => [
  {
    key: "fb", label: "Facebook", href: site.facebook || "/contact", hover: "hover:bg-[#1877F2] hover:text-white",
    path: "M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.4V14h2.8v8h3.3z",
  },
  {
    key: "x", label: "X / Twitter", href: site.x || "/contact", hover: "hover:bg-black hover:text-white",
    path: "M17.5 3h3l-6.8 7.8L21.7 21h-6.2l-4.9-6.4L5 21H2l7.3-8.3L1.6 3h6.4l4.4 5.8L17.5 3zm-1 16h1.7L6.6 4.9H4.8L16.5 19z",
  },
  {
    key: "yt", label: "YouTube", href: site.youtube || "/contact", hover: "hover:bg-[#FF0000] hover:text-white",
    path: "M23 7.2c-.3-1-1-1.8-2-2C19.2 4.7 12 4.7 12 4.7s-7.2 0-9 .5c-1 .3-1.8 1-2 2C.5 9 .5 12 .5 12s0 3 .5 4.8c.3 1 1 1.8 2 2 1.8.5 9 .5 9 .5s7.2 0 9-.5c1-.3 1.8-1 2-2 .5-1.8.5-4.8.5-4.8s0-3-.5-4.8zM9.7 15.3V8.7l6 3.3-6 3.3z",
  },
  {
    key: "ig", label: "Instagram", href: site.instagram || "/contact", hover: "hover:bg-[linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)] hover:text-white",
    path: "M12 7.3a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zm0 7.7a3 3 0 110-6 3 3 0 010 6zm6-7.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0zM21.9 8.3c-.1-1.5-.4-2.8-1.5-3.9S18 3 16.6 2.9C15.1 2.8 8.9 2.8 7.4 2.9 6 3 4.7 3.3 3.6 4.4S2.2 6.8 2.1 8.3C2 9.8 2 15.2 2.1 16.7c.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.5.1 7.7.1 9.2 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.5.1-7.7-.2-8.4zM19.9 18.4c-.3.8-1 1.5-1.8 1.8-1.3.5-4.2.4-5.6.4s-4.4.1-5.6-.4c-.8-.3-1.5-1-1.8-1.8-.5-1.3-.4-4.2-.4-5.6s-.1-4.4.4-5.6c.3-.8 1-1.5 1.8-1.8 1.3-.5 4.2-.4 5.6-.4s4.4-.1 5.6.4c.8.3 1.5 1 1.8 1.8.5 1.3.4 4.2.4 5.6s.1 4.4-.4 5.6z",
  },
];

export async function SocialRail() {
  const items = buildItems(await getSiteDetails());
  return (
    <aside
      aria-label="Social media"
      className={cn(
        "fixed z-40 flex",
        "max-md:bottom-4 max-md:right-3 max-md:flex-row max-md:gap-2",
        "md:right-0 md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-1.5 md:py-2 md:pl-2",
      )}
    >
      {items.map((it) => {
        const external = it.href.startsWith("http");
        return (
          <a
            key={it.key}
            href={it.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener" : undefined}
            className={cn(
              "group flex h-11 items-center gap-2.5 bg-plum font-sans text-[0.85rem] font-bold text-on-plum no-underline shadow-[0_8px_20px_-10px_rgba(0,0,0,.5)] transition-[translate,background-color,color] duration-300 ease-[cubic-bezier(.2,.7,.2,1)]",
              "max-md:w-11 max-md:justify-center max-md:rounded-full",
              // tucked in so only the icon shows; slides fully out on hover
              "md:translate-x-[calc(100%-40px)] md:rounded-l-full md:pl-2.5 md:pr-4 md:hover:translate-x-0 md:focus-visible:translate-x-0",
              it.hover,
            )}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none fill-current" aria-hidden="true">
              <path d={it.path} />
            </svg>
            <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 max-md:sr-only">{it.label}</span>
          </a>
        );
      })}
    </aside>
  );
}
