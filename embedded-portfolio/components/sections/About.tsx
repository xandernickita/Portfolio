import { MotionInView } from "@/components/MotionInView";

const stack = [
  { label: "C / C++", hot: true },
  { label: "Python", hot: true },
  { label: "Java", hot: false },
  { label: "Linux", hot: true },
  { label: "Yocto Project", hot: true },
  { label: "RTOS", hot: true },
  { label: "I2C / SPI / UART", hot: false },
  { label: "CAN", hot: false },
  { label: "Oscilloscope / Logic Analyzer", hot: false },
  { label: "Git", hot: false },
  { label: "SAFe / Agile", hot: false },
];

const stats = [
  {
    k: "Currently at",
    v: "General Dynamics Land Systems — delivering defense-grade firmware",
  },
  {
    k: "Certified",
    v: "SAFe 6 Scrum Master",
  },
  {
    k: "Leadership",
    v: "IEEE Chapter Chairman"
  },
];

export function About() {
  return (
    <section id="about" className="mt-20 scroll-mt-24">
      <MotionInView>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </MotionInView>

      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        {/* Bio + stack */}
        <MotionInView delay={0.06}>
          <div className="rounded-2xl border bg-card p-6 h-full">
            <p className="text-sm leading-relaxed text-muted-foreground max-w-[65ch]">
              Software engineer with 2+ years building and shipping software in
              C, C++, Python, and Java across embedded systems and Linux
              environments. Currently delivering defense-grade firmware at
              General Dynamics Land Systems — with a track record of code
              reviews, cross-functional collaboration, and scalable solutions
              validated in Agile sprints.
            </p>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.map((s) => (
                  <span
                    key={s.label}
                    className={[
                      "rounded-lg border px-3 py-1 text-xs transition",
                      s.hot
                        ? "border-accent/50 bg-accent/10 text-accent font-medium"
                        : "bg-muted hover:border-accent/40 hover:text-accent",
                    ].join(" ")}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MotionInView>

        {/* Stats */}
        <div className="flex flex-col gap-4">
          {stats.map((item, idx) => (
            <MotionInView key={item.k} delay={0.1 + idx * 0.06}>
              <div className="rounded-2xl border bg-card p-5 transition hover:border-accent/40">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.k}
                </p>
                <p className="mt-2 text-sm leading-snug">{item.v}</p>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
