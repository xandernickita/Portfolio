import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";

export default function ProjectCaseStudy({
  params,
}: {
  params: { slug: string };
}) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 pb-20 pt-24">
      <div className="overflow-hidden rounded-2xl border">
        <div className="relative h-56">
          <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
        </div>
      </div>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight">{p.title}</h1>
      <p className="mt-2 opacity-80">{p.summary}</p>

      <div className="mt-6 grid gap-3 rounded-2xl border p-5 text-sm">
        <div><span className="font-medium">Problem:</span> <span className="opacity-80">{p.problem}</span></div>
        <div><span className="font-medium">Constraints:</span> <span className="opacity-80">{p.constraints}</span></div>
        <div><span className="font-medium">Architecture:</span> <span className="opacity-80">{p.architecture}</span></div>
        <div><span className="font-medium">Verification:</span> <span className="opacity-80">{p.verification}</span></div>
        <div className="flex flex-wrap gap-2">
          {p.metrics.map((m) => (
            <span key={m} className="rounded-xl border px-2 py-0.5 text-xs opacity-80">
              {m}
            </span>
          ))}
        </div>
        <div className="pt-2">
          <a
            href={p.links.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
          >
            View repo
          </a>
        </div>
      </div>

      <article className="mt-8 space-y-4 leading-relaxed">
        {p.body.map((block, i) => (
          <Block key={i} text={block} />
        ))}
      </article>
    </main>
  );
}

function Block({ text }: { text: string }) {
  if (text.startsWith("## ")) {
    return <h2 className="text-xl font-semibold tracking-tight">{text.replace("## ", "")}</h2>;
  }
  return <p className="opacity-85">{text}</p>;
}
