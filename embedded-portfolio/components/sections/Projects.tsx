import Image from "next/image";
import Link from "next/link";
import { MotionInView } from "@/components/MotionInView";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section id="projects" className="mt-20 scroll-mt-24">
      <MotionInView>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
          <div className="h-px flex-1 bg-border" />
          <Link
            href="/projects"
            className="btn-secondary hidden md:inline-flex whitespace-nowrap"
          >
            All case studies
          </Link>
        </div>
      </MotionInView>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.slice(0, 4).map((p, idx) => (
          <MotionInView key={p.slug} delay={idx * 0.06}>
            {p.comingSoon ? (
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
            ) : (
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:border-accent/40 hover:shadow-[0_6px_28px_oklch(0.62_0.145_65/0.10)] hover:-translate-y-0.5">
                {/* Cover image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  {/* Tags */}
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

                  {/* Problem / constraints */}
                  <div className="mt-4 grid gap-1.5 text-sm">
                    <p>
                      <span className="font-medium">Problem:</span>{" "}
                      <span className="text-muted-foreground">{p.problem}</span>
                    </p>
                    <p>
                      <span className="font-medium">Constraints:</span>{" "}
                      <span className="text-muted-foreground">
                        {p.constraints}
                      </span>
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-md border border-accent/30 bg-accent/8 px-2 py-0.5 text-xs text-accent"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  {/* CTAs — pinned to bottom */}
                  <div className="mt-auto pt-5 flex items-center gap-3">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="btn-primary"
                    >
                      Read case study
                    </Link>
                    <a
                      href={p.links.repo}
                      className="btn-secondary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repo
                    </a>
                  </div>
                </div>
              </div>
            )}
          </MotionInView>
        ))}
      </div>

      {/* Mobile link */}
      <MotionInView delay={0.28}>
        <div className="mt-6 flex md:hidden">
          <Link href="/projects" className="btn-secondary w-full justify-center">
            All case studies
          </Link>
        </div>
      </MotionInView>
    </section>
  );
}
