import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { MotionInView } from "@/components/MotionInView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
};

export default function ProjectsIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-24">
      <MotionInView>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Case studies
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Longer writeups covering architecture, design decisions, and
            verification.
          </p>
        </div>
      </MotionInView>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, idx) =>
          p.comingSoon ? (
            <MotionInView key={p.slug} delay={idx * 0.06}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-dashed opacity-50 transition hover:opacity-70">
                <div className="flex h-44 items-center justify-center bg-muted">
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    In progress
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.summary}
                  </p>
                </div>
              </div>
            </MotionInView>
          ) : (
            <MotionInView key={p.slug} delay={idx * 0.06}>
              <Link
                href={`/projects/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:border-accent/40 hover:shadow-[0_6px_28px_oklch(0.62_0.145_65/0.10)] hover:-translate-y-0.5"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {p.summary}
                  </p>
                  <p className="mt-auto pt-4 text-sm font-medium text-accent">
                    Read case study →
                  </p>
                </div>
              </Link>
            </MotionInView>
          )
        )}
      </div>
    </main>
  );
}
