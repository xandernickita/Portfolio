import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies"
}

export default function ProjectsIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-24">
      <h1 className="text-3xl font-semibold tracking-tight">Case Studies</h1>
      <p className="mt-2 opacity-80">
        Longer writeups with architecture + verification details.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="overflow-hidden rounded-2xl border hover:opacity-90 transition"
          >
            <div className="relative h-44">
              <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <div className="text-sm opacity-70">{p.tags.join(" • ")}</div>
              <div className="mt-2 text-lg font-semibold">{p.title}</div>
              <div className="mt-2 text-sm opacity-80">{p.summary}</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
