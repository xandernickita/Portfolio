import { MotionInView } from "@/components/MotionInView";

export function Contact() {
  return (
    <section id="contact" className="mt-16">
      <MotionInView>
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-2 opacity-80">
          Easiest way: email. We can add a form later if you want.
        </p>
      </MotionInView>

      <MotionInView delay={0.08}>
        <div className="mt-6 rounded-2xl border p-6">
          <div className="text-sm font-medium">Email</div>
          <a
            href="mailto:your.email@example.com"
            className="mt-2 inline-flex rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
          >
            your.email@example.com
          </a>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <a className="rounded-xl border px-4 py-3 text-sm hover:opacity-80 transition" href="https://github.com/your-handle" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="rounded-xl border px-4 py-3 text-sm hover:opacity-80 transition" href="https://www.linkedin.com/in/your-handle/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="rounded-xl border px-4 py-3 text-sm hover:opacity-80 transition" href="/resume.pdf" target="_blank" rel="noreferrer">
              Resume PDF
            </a>
          </div>
        </div>
      </MotionInView>
    </section>
  );
}
