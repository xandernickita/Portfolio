import Image from "next/image";
import Link from "next/link";
import { MotionInView } from "@/components/MotionInView";
import { projects } from "@/lib/projects";

export function Projects() {
  return (
    <section id="projects" className="mt-16 scroll-mt-24">
      <MotionInView>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
            <p className="mt-2 opacity-80">
              Problem → Constraints → Architecture → Verification (with a couple
              metrics).
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition md:inline-flex"
          >
            All case studies
          </Link>
        </div>
      </MotionInView>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.slice(0, 4).map((p, idx) => (
          <MotionInView key={p.slug} delay={idx * 0.05}>
            <div className="overflow-hidden rounded-2xl border">
              <div className="relative h-44">
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-xl border px-2 py-0.5 text-xs opacity-80"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm opacity-80">{p.summary}</p>

                <div className="mt-4 grid gap-2 text-sm">
                  <div>
                    <span className="font-medium">Problem:</span>{" "}
                    <span className="opacity-80">{p.problem}</span>
                  </div>
                  <div>
                    <span className="font-medium">Constraints:</span>{" "}
                    <span className="opacity-80">{p.constraints}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-xl border px-2 py-0.5 text-xs opacity-80"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
                  >
                    Read case study
                  </Link>
                  <a
                    href={p.links.repo}
                    className="rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Repo
                  </a>
                </div>
              </div>
            </div>
          </MotionInView>
        ))}
      </div>
    </section>
  );
}
