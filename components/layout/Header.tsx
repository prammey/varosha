"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { aboutMenu, donateHref, mainNav } from "./nav";

/**
 * Sticky header that slides away on scroll-down and returns on scroll-up.
 * "About" is a hover dropdown on desktop and a plain list in the phone menu.
 * "Donate" is its own full-height maroon block on the right, like the original site.
 */
export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const lastY = useRef(0);
  const aboutRef = useRef<HTMLDivElement>(null);

  // hide on scroll down, show on scroll up; close the dropdown on any scroll
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        if (y > 140 && y > lastY.current + 4) setHidden(true);
        else if (y < lastY.current - 4 || y < 140) setHidden(false);
        lastY.current = y;
        setAboutOpen(false);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus when the route changes (React's "adjust state during render" pattern)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setAboutOpen(false);
    setHidden(false);
  }

  // close the dropdown on outside click or Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAboutOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isAboutSection = aboutMenu.some((i) => pathname === i.href);
  const linkCls = (active: boolean) =>
    cn(
      "relative rounded-full px-[0.8em] py-[0.55em] font-sans text-[0.98rem] font-semibold no-underline transition-colors",
      "after:absolute after:bottom-[0.3em] after:left-[0.8em] after:right-[0.8em] after:h-0.5 after:origin-left after:scale-x-0 after:rounded after:bg-gold after:transition-transform after:duration-200",
      "hover:text-ink hover:after:scale-x-100",
      active ? "text-maroon after:scale-x-100 after:bg-maroon" : "text-ink-2",
    );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-[14px] transition-[transform,box-shadow] duration-300",
          hidden && "-translate-y-[110%]",
          scrolled && "shadow-[0_8px_30px_-18px_rgba(42,30,34,.35)]",
        )}
      >
        <div className="mx-auto flex min-h-[78px] max-w-[1400px] items-stretch justify-between pl-[clamp(16px,3vw,32px)]">
          <Logo className="self-center" />

          <div className="flex items-stretch">
            <button
              type="button"
              className="mr-3 inline-flex self-center rounded-full border-2 border-line px-[0.9em] py-[0.5em] font-sans font-bold text-ink lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              onClick={() => setMenuOpen((o) => !o)}
            >
              Menu
            </button>

            <nav
              id="site-nav"
              aria-label="Primary"
              className={cn(
                "items-center gap-0.5",
                // desktop
                "lg:flex",
                // phone: dropdown panel under the header
                "max-lg:absolute max-lg:inset-x-0 max-lg:top-full max-lg:flex-col max-lg:items-stretch max-lg:border-b max-lg:border-line max-lg:bg-cream max-lg:px-[clamp(16px,4vw,40px)] max-lg:pb-5 max-lg:pt-3 max-lg:shadow-card",
                menuOpen ? "max-lg:flex" : "max-lg:hidden",
              )}
            >
              {/* About dropdown */}
              <div
                ref={aboutRef}
                className={cn("group relative", aboutOpen && "is-open")}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <a
                  href="/about"
                  aria-haspopup="true"
                  aria-expanded={aboutOpen}
                  className={cn(linkCls(isAboutSection), "max-lg:hidden cursor-default")}
                  onClick={(e) => {
                    e.preventDefault();
                    e.currentTarget.blur();
                    // mouse users already see the menu on hover; a touch tap toggles it
                    const touch = window.matchMedia("(hover: none)").matches;
                    setAboutOpen(touch ? !aboutOpen : false);
                  }}
                >
                  About <span aria-hidden="true" className="ml-0.5 inline-block text-[0.7em] transition-transform group-hover:translate-y-0.5">▾</span>
                </a>
                <div
                  role="menu"
                  className={cn(
                    "flex flex-col gap-0.5",
                    // desktop: floating panel
                    "lg:invisible lg:absolute lg:left-0 lg:top-[calc(100%+6px)] lg:min-w-[260px] lg:-translate-y-1.5 lg:rounded-2xl lg:bg-cream lg:p-2 lg:opacity-0 lg:shadow-card lg:transition-[opacity,transform,visibility] lg:duration-200",
                    "lg:before:absolute lg:before:-top-2.5 lg:before:left-0 lg:before:right-0 lg:before:h-2.5",
                    "lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
                    "lg:group-[.is-open]:visible lg:group-[.is-open]:translate-y-0 lg:group-[.is-open]:opacity-100",
                    "lg:group-focus-within:visible lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100",
                  )}
                >
                  {aboutMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "flex flex-col gap-px rounded-[10px] px-[0.8em] py-[0.6em] font-sans font-semibold no-underline transition-colors hover:bg-rose",
                        pathname === item.href ? "text-maroon" : "text-ink",
                        "max-lg:py-[0.8em] max-lg:text-[1.1rem]",
                      )}
                    >
                      <b>{item.label}</b>
                      <span className="text-[0.8rem] font-medium text-mute">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(linkCls(pathname === item.href), "max-lg:py-[0.8em] max-lg:text-[1.1rem]")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href={donateHref}
              className="group/donate relative flex items-center justify-center overflow-hidden bg-maroon px-[clamp(22px,3vw,44px)] font-sans text-[1.1rem] font-bold tracking-wide text-white no-underline transition-colors hover:text-plum-2"
            >
              <span aria-hidden="true" className="absolute inset-0 translate-y-full bg-gold transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/donate:translate-y-0" />
              <span className="relative">Donate</span>
            </Link>
          </div>
        </div>
      </header>
      {/* keeps page content below the fixed header */}
      <div aria-hidden="true" className="h-[78px]" />
    </>
  );
}
