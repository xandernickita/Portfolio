"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePathname, useRouter } from "next/navigation";

type NavItem = { label: string; href: string; kind: "hash" | "route" | "home" };

const NAV: NavItem[] = [
  { label: "Home", href: "/", kind: "home" },
  { label: "About", href: "/#about", kind: "hash" },
  { label: "Projects", href: "/#projects", kind: "hash" },
  { label: "Contact", href: "/#contact", kind: "hash" },
  { label: "Case Studies", href: "/projects", kind: "route" },
];

export function Navbar() {
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // Close mobile menu on Escape, lock background scroll while open
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Focus management: when mobile opens, focus first link; when closes, return to button
  useEffect(() => {
    if (mobileOpen) {
      setTimeout(() => {
        const firstFocusable = mobilePanelRef.current?.querySelector<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        firstFocusable?.focus();
      }, 0);
    } else {
      menuButtonRef.current?.focus();
    }
  }, [mobileOpen]);

  const headerMotion = useMemo(() => {
    if (reduceMotion) return {};
    return {
      initial: { y: -12, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.4 },
    };
  }, [reduceMotion]);

  const linkClass = [
    "relative text-sm transition opacity-80 hover:opacity-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-1 py-0.5",
    "after:absolute after:left-1 after:right-1 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-foreground after:origin-left after:transition-transform after:duration-200",
    "after:scale-x-0 hover:after:scale-x-100",
  ].join(" ");

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function goHashOnHome(href: string) {
    const id = href.split("#")[1];
    const el = document.getElementById(id);
    if (!el) return;

    // Update hash without full navigation and scroll smoothly
    window.history.pushState({}, "", `/#${id}`);
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function onNavClick(item: NavItem, e: React.MouseEvent<HTMLAnchorElement>) {
    // Route link -> let Next handle it normally
    if (item.kind === "route") {
      setMobileOpen(false);
      return;
    }

    // Home
    if (item.kind === "home") {
      e.preventDefault();
      setMobileOpen(false);

      if (pathname !== "/") {
        router.push("/");
        // scroll will naturally be at top after nav; but we can be explicit
        setTimeout(scrollToTop, 0);
      } else {
        scrollToTop();
      }
      return;
    }

    // Hash links
    if (item.kind === "hash") {
      e.preventDefault();
      setMobileOpen(false);

      if (pathname !== "/") {
        // Navigate to home WITH hash (real Next navigation)
        router.push(item.href);
        return;
      }

      // Already on home -> smooth scroll locally
      goHashOnHome(item.href);
    }
  }

  return (
    <motion.header
      {...headerMotion}
      className="fixed inset-x-0 top-0 z-50 border-b bg-background/70 backdrop-blur"
    >
      {/* Skip link for keyboard users */}
      <a href="#main" className="skip-link rounded-xl border bg-background px-3 py-2 text-sm">
        Skip to content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link
          href="/"
          className="font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-1 py-0.5"
          onClick={(e) => onNavClick({ label: "Home", href: "/", kind: "home" }, e)}
        >
          <span className="opacity-80">AN</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => onNavClick(item, e)}
              className={linkClass}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm transition hover:opacity-80
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          ref={mobilePanelRef}
          className="md:hidden border-t bg-background/95 backdrop-blur"
        >
          <div className="mx-auto max-w-6xl px-4 py-3">
            <nav className="flex flex-col gap-2" aria-label="Mobile primary">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => onNavClick(item, e)}
                  className={[
                    "rounded-xl border px-4 py-3 text-sm transition hover:opacity-80",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </motion.header>
  );
}
