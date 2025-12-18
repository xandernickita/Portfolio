"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "motion/react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
  { label: "Case Studies", href: "/projects" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-x-0 top-0 z-50 border-b bg-background/70 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href="/" className="font-semibold tracking-tight">
          <span className="opacity-80">AN</span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => {
            const isHome = item.href === "/";

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (!isHome) return;

                  e.preventDefault();
                  window.history.pushState({}, "", "/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-sm opacity-80 hover:opacity-100 transition"
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
