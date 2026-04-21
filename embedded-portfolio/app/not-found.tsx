import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-4 text-center"
    >
      <p className="text-sm font-mono opacity-50">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-sm opacity-70">
        This page doesn&apos;t exist or was moved. Head back home and everything should be where
        you left it.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
        >
          ← Back to home
        </Link>
        <Link
          href="/projects"
          className="rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
        >
          Case studies
        </Link>
      </div>
    </main>
  );
}
