import { MotionInView } from "@/components/MotionInView";

const stack = [
  "C/C++",
  "Python",
  "RTOS",
  "I2C / SPI / UART",
  "CAN",
  "Oscilloscope / Logic Analyzer",
  "Git",
  "CI Basics",
];

export function About() {
  return (
    <section id="about" className="mt-16 scroll-mt-24">
      <MotionInView>
        <h2 className="text-2xl font-semibold tracking-tight">About</h2>
        <p className="mt-3 max-w-3xl opacity-80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>
      </MotionInView>

      <MotionInView delay={0.08}>
        <div className="mt-8 rounded-2xl border p-5">
          <div className="text-sm font-medium">Embedded Stack</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-xl border px-3 py-1 text-xs opacity-90"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </MotionInView>

      <MotionInView delay={0.12}>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { k: "Focus", v: "Firmware, control, HW/SW integration" },
            { k: "Strengths", v: "Verification, documentation, constraints" },
            { k: "Goal", v: "Ship robust systems that survive reality" },
          ].map((item) => (
            <div key={item.k} className="rounded-2xl border p-5">
              <div className="text-sm font-medium">{item.k}</div>
              <div className="mt-2 text-sm opacity-80">{item.v}</div>
            </div>
          ))}
        </div>
      </MotionInView>
    </section>
  );
}
