import { MotionInView } from "@/components/MotionInView";

const education = [
  {
    monogram: "LTU",
    institution: "Lawrence Technological University",
    location: "Southfield, MI",
    degree: "Bachelor of Applied Science — Embedded Software Engineering & Mathematics",
    period: "Aug 2024 – Present",
    status: "Expected May 2027",
    honors: "",
    coursework: [
      "Embedded Systems Design",
      "Real-Time Operating Systems",
      "Firmware Engineering",
      "Microprocessors & Microcontrollers",
      "Digital Systems Design",
      "Computer Architecture",
      "Linux Systems Programming",
      "Electronics",
    ],
  },
  {
    monogram: "OCC",
    institution: "Oakland Community College",
    location: "United States",
    degree: "Associate's Degree — Computer Software Engineering",
    period: "Jan 2022 – May 2024",
    status: "Graduated",
    honors: "Magna Cum Laude",
    coursework: [],
  },
];

export function Education() {
  return (
    <section id="education" className="mt-20 scroll-mt-24">
      <MotionInView>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Education</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </MotionInView>

      {/* Timeline */}
      <div className="relative flex flex-col gap-0">
        {/* Vertical line */}
        <div className="absolute left-5.25 top-6 bottom-6 w-px bg-border md:left-5.25" />

        {education.map((entry, idx) => (
          <MotionInView key={entry.institution} delay={0.06 + idx * 0.1}>
            <div className="relative flex gap-5 pb-8 last:pb-0">
              {/* Timeline node */}
              <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-card text-xs font-bold tracking-tight text-accent">
                {entry.monogram}
              </div>

              {/* Card */}
              <div className="flex-1 rounded-2xl border bg-card p-5 md:p-6 transition hover:border-accent/40">
                <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-semibold leading-snug">
                      {entry.institution}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {entry.location}
                    </p>
                  </div>
                  <div className="mt-1 text-right md:mt-0">
                    <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                      {entry.period}
                    </p>
                    <p className="text-xs text-muted-foreground">{entry.status}</p>
                  </div>
                </div>

                <p className="mt-3 text-sm font-medium">{entry.degree}</p>

                {/* Honors badge — only shown when honors text is set */}
                {entry.honors && (
                  <div className="mt-2">
                    <span className="rounded-md border border-accent/40 bg-accent/8 px-2.5 py-0.5 text-xs font-medium text-accent">
                      {entry.honors}
                    </span>
                  </div>
                )}

                {/* Relevant coursework — only show if list is non-empty */}
                {entry.coursework.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Relevant coursework
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {entry.coursework.map((course) => (
                        <span
                          key={course}
                          className="rounded-md border bg-muted px-2.5 py-0.5 text-xs transition hover:border-accent/50 hover:text-accent"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </MotionInView>
        ))}
      </div>
    </section>
  );
}
