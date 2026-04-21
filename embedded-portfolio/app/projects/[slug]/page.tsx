import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return notFound();

  if (p.slug === "project-alpha") {
    return (
      <main id="main" className="mx-auto max-w-5xl px-4 pb-20 pt-24">
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
          >
            ← Back to case studies
          </Link>
        </div>

        {/* Cover */}
        <div className="overflow-hidden rounded-2xl border">
          <div className="relative h-64 md:h-80">
            <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
          </div>
        </div>

        {/* Header */}
        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">{p.title}</h1>
        <p className="mt-3 max-w-3xl opacity-80">{p.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span key={tag} className="rounded-xl border px-3 py-1 text-xs opacity-80">
              {tag}
            </span>
          ))}
        </div>

        {/* At-a-glance cards */}
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <Card title="Problem" content={p.problem} />
          <Card title="Constraints" content={p.constraints} />
          <Card title="Architecture" content={p.architecture} />
          <Card title="Verification" content={p.verification} />
        </section>

        {/* Key metrics */}
        <section className="mt-6 rounded-2xl border p-5">
          <h2 className="text-base font-semibold tracking-tight">Key Metrics</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.metrics.map((m) => (
              <span key={m} className="rounded-xl border px-3 py-1 text-xs opacity-80">
                {m}
              </span>
            ))}
          </div>
        </section>

        {/* Full article */}
        <article className="mt-10 space-y-8">
          <Section heading="Background">
            <p className="opacity-80 leading-relaxed">
              Most TM4C123 tutorials stop at blinking an LED over a USB cable. The goal here was to
              remove the wire entirely and build a proper wireless interface that a developer could
              use day-to-day: scan for the COM port, connect, send commands, read responses, and
              cleanly disconnect — all from either a terminal or a GUI. The HC-05 module was chosen
              because it pairs as a standard serial port on the host side, which means no custom
              driver and no protocol library needed on either end.
            </p>
          </Section>

          <Section heading="Hardware Setup">
            <p className="opacity-80 leading-relaxed">
              The HC-05 is wired to UART1 on the TM4C123GH6PM with a standard TX/RX crossover:
              PB1 (TM4C TX) → HC-05 RX, PB0 (TM4C RX) → HC-05 TX. The module's VCC is supplied
              from the board's 5 V USB rail; its logic lines are 3.3 V compatible with the TM4C's
              GPIO, so no level-shifting is required. The onboard RGB LED (PF1 = Red, PF2 = Blue,
              PF3 = Green) is driven directly from GPIO — LED current falls within the TM4C's
              8 mA output-drive spec, so no external transistors are needed.
            </p>
            <div className="mt-4 rounded-2xl border p-4 text-sm font-mono space-y-1 opacity-80">
              <div>TM4C PB1 (TX) ──── HC-05 RXD</div>
              <div>TM4C PB0 (RX) ──── HC-05 TXD</div>
              <div>HC-05 VCC    ──── 5 V (USB)</div>
              <div>HC-05 GND    ──── GND</div>
              <div className="pt-1">PF1 → Red LED &nbsp; PF2 → Blue LED &nbsp; PF3 → Green LED</div>
            </div>
          </Section>

          <Section heading="Firmware Architecture">
            <p className="opacity-80 leading-relaxed">
              The firmware is a single-file bare-metal C application built for the TM4C123GH6PM
              without an RTOS. On startup it configures the PLL for 80 MHz, initializes
              UART1 to 9600-8-N-1, enables PF1/PF2/PF3 as push-pull outputs, then emits{" "}
              <Code>SYSTEM STATUS: READY\r\n</Code> to signal a clean bring-up. This boot message
              is the first thing to verify on any new hardware setup — if it's missing, the problem
              is upstream of the command handler (baud rate, wiring, power).
            </p>
            <p className="mt-3 opacity-80 leading-relaxed">
              The main loop pulls bytes from the UART FIFO into a 64-byte line buffer. When a
              newline arrives, the accumulated string is null-terminated and dispatched to the
              command handler via a linear search over a static command table. Every recognized
              command writes its response back over UART1 before returning. Unrecognized input
              returns <Code>ERR UNKNOWN_CMD</Code> without hanging or corrupting the buffer — a
              deliberate choice to make malformed input safe to send during development.
            </p>
          </Section>

          <Section heading="Command Protocol">
            <p className="opacity-80 leading-relaxed mb-4">
              All commands are newline-terminated ASCII strings over UART1 at 9600 baud. The
              protocol is intentionally human-readable so it can be driven from any serial
              terminal without special tooling.
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              {[
                { cmd: "HELP",      resp: "Lists all available commands" },
                { cmd: "STATE",     resp: "Returns current R/G/B bitmask" },
                { cmd: "PING",      resp: "OK PONG" },
                { cmd: "VERSION",   resp: "Firmware version string" },
                { cmd: "UPTIME",    resp: "Milliseconds since boot" },
                { cmd: "EXIT",      resp: "OK BYE (disconnect ack)" },
                { cmd: "X",         resp: "All LEDs off → OK" },
                { cmd: "R0 / R1",   resp: "Red LED off / on → OK" },
                { cmd: "G0 / G1",   resp: "Green LED off / on → OK" },
                { cmd: "B0 / B1",   resp: "Blue LED off / on → OK" },
                { cmd: "RGB:xyz",   resp: "Set all three LEDs at once (e.g. RGB:110)" },
              ].map(({ cmd, resp }) => (
                <div key={cmd} className="rounded-xl border px-4 py-3 text-sm">
                  <span className="font-mono font-medium">{cmd}</span>
                  <span className="ml-2 opacity-70">— {resp}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section heading="Desktop Tools">
            <p className="opacity-80 leading-relaxed">
              Two Python tools drive the interface. The Tkinter GUI (<Code>tiva_bt_gui.py</Code>)
              auto-scans available COM ports on launch, connects with one click, then exposes a
              labeled button for every command alongside a scrolling response log with timestamps.
              It handles the connect/disconnect lifecycle so the COM port is never left open
              accidentally — important because only one host process can hold the port at a time.
            </p>
            <p className="mt-3 opacity-80 leading-relaxed">
              The CLI sender (<Code>bluetooth_led_controller.py</Code>) is intentionally minimal:
              open port, send line, print response, close. It's suited for scripting automated
              sequences or for quick one-off commands from a terminal without launching the full GUI.
              Both tools share exactly the same 9600-baud, newline-terminated wire protocol.
            </p>
          </Section>

          <Section heading="Verification">
            <div className="space-y-3 opacity-80 leading-relaxed">
              <p>
                Testing covered three areas:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>
                  <span className="font-medium text-foreground">Command correctness</span> — every
                  command was sent from both the GUI and CLI, and the response text verified against
                  spec. Boot message, <Code>OK PONG</Code>, <Code>OK RGB=xyz</Code>, and the
                  version/uptime strings were all checked.
                </li>
                <li>
                  <span className="font-medium text-foreground">State consistency</span> — after
                  each LED command, <Code>STATE</Code> was queried and the returned bitmask
                  confirmed against the expected GPIO state. This catches any off-by-one in the
                  pin mapping.
                </li>
                <li>
                  <span className="font-medium text-foreground">Robustness</span> — the COM port
                  was released and re-acquired mid-session to verify reconnect behavior. Malformed
                  strings (empty lines, random ASCII, truncated commands) were sent to confirm{" "}
                  <Code>ERR UNKNOWN_CMD</Code> with no hang or buffer corruption.
                </li>
              </ol>
            </div>
          </Section>

          <Section heading="Results & Lessons Learned">
            <p className="opacity-80 leading-relaxed">
              The system achieved sub-10 ms round-trip latency for all commands at typical desk
              range and ran 200+ command cycles in regression without a single dropped or corrupted
              response. The baud rate ceiling (9600) is not a practical limitation for a 15-command
              control interface — the bottleneck is always human or GUI interaction speed, not the
              serial link.
            </p>
            <p className="mt-3 opacity-80 leading-relaxed">
              The most valuable design decision was the <Code>SYSTEM STATUS: READY</Code> boot
              message. On first bring-up of any new board, it immediately confirms that UART,
              baud rate, and TX/RX wiring are all correct before a single command is sent — cutting
              bring-up debug time significantly. The most common pitfall is TX/RX swap: if the boot
              message never arrives, swapping PB0 and PB1 (or the HC-05 side) is the first thing to
              try. The second most common issue is COM-port contention when both the GUI and a
              terminal are open at the same time; making that failure mode obvious in the UI is worth
              the extra few lines.
            </p>
          </Section>
        </article>

        {/* Repo link */}
        <div className="mt-10 flex gap-3">
          <a
            href={p.links.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
          >
            View repo ↗
          </a>
          <Link
            href="/projects"
            className="inline-flex rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
          >
            ← All case studies
          </Link>
        </div>
      </main>
    );
  }

  // Generic fallback for placeholder projects
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 pb-20 pt-24">
      <div className="mb-6">
        <Link
          href="/projects"
          className="inline-flex rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
        >
          ← Back to case studies
        </Link>
      </div>

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
            View repo ↗
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

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight">{heading}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border bg-muted px-1.5 py-0.5 text-xs font-mono">
      {children}
    </code>
  );
}

function Card({ title, content }: { title: string; content: string }) {
  return (
    <div className="rounded-2xl border p-5 text-sm">
      <h2 className="font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 opacity-80">{content}</p>
    </div>
  );
}

function Block({ text }: { text: string }) {
  if (text.startsWith("## ")) {
    return <h2 className="text-xl font-semibold tracking-tight">{text.replace("## ", "")}</h2>;
  }
  return <p className="opacity-85">{text}</p>;
}
