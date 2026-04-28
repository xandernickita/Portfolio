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
        <article className="mt-10 space-y-10">

          <Section heading="Background">
            <p className="opacity-80 leading-relaxed">
              A bare-metal embedded IoT system built on the Texas Instruments TM4C123G LaunchPad.
              Sensor data is read directly from hardware peripherals, processed in firmware written
              entirely in C without any Arduino or RTOS libraries, and transmitted wirelessly over
              Bluetooth Classic (UART) to a Python desktop GUI. The primary goal is to demonstrate
              practical understanding of UART-based IoT communication, embedded peripheral
              integration, and cross-platform Bluetooth application development — all without
              relying on high-level abstraction layers.
            </p>
          </Section>

          <Section heading="Hardware">
            <p className="opacity-80 leading-relaxed mb-5">
              The system integrates six external peripherals across GPIO, ADC, and UART interfaces,
              plus the TM4C{"'"}s onboard RGB LED.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 pr-4 text-left font-semibold">Component</th>
                    <th className="py-2 pr-4 text-left font-semibold">Part</th>
                    <th className="py-2 pr-4 text-left font-semibold">Interface</th>
                    <th className="py-2 text-left font-semibold">TM4C Pin</th>
                  </tr>
                </thead>
                <tbody className="opacity-80">
                  {[
                    ["Microcontroller",    "TM4C123GH6PM LaunchPad", "—",                  "—"],
                    ["Bluetooth Module",   "HC-05 SPP",              "UART1 (9600 8N1)",    "PB0 (RX), PB1 (TX)"],
                    ["Temp/Humidity",      "DHT11",                  "1-wire bit-bang",     "PE3"],
                    ["Ambient Light",      "KY-018 LDR",             "ADC0 AIN1",           "PE2"],
                    ["PIR Motion Sensor",  "HC-SR501",               "GPIO interrupt",      "PD0"],
                    ["LED Strip",          "WS2812B × 16",           "GPIO bit-bang",       "PD1"],
                    ["DC Fan",             "5V brushless, 2-wire",   "GPIO via 2N2222A",    "PC4"],
                    ["Onboard RGB LED",    "TM4C built-in",          "GPIO",                "PF1/PF2/PF3"],
                  ].map(([component, part, iface, pin]) => (
                    <tr key={component} className="border-b last:border-0">
                      <td className="py-2 pr-4">{component}</td>
                      <td className="py-2 pr-4 font-mono text-xs">{part}</td>
                      <td className="py-2 pr-4">{iface}</td>
                      <td className="py-2 font-mono text-xs">{pin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 mb-3 opacity-80 leading-relaxed">Supporting passive components:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 pr-4 text-left font-semibold">Component</th>
                    <th className="py-2 pr-4 text-left font-semibold">Value</th>
                    <th className="py-2 text-left font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody className="opacity-80">
                  {[
                    ["NPN Transistor", "2N2222A", "Fan motor drive"],
                    ["Flyback Diode",  "1N4007",  "Fan inductive spike protection"],
                    ["Resistor",       "1 kΩ",    "Transistor base current limiting"],
                    ["Resistor",       "10 kΩ",   "DHT11 data line pull-up"],
                    ["Resistor",       "330 Ω",   "WS2812B data line series termination"],
                  ].map(([component, value, purpose]) => (
                    <tr key={component + value} className="border-b last:border-0">
                      <td className="py-2 pr-4">{component}</td>
                      <td className="py-2 pr-4 font-mono text-xs">{value}</td>
                      <td className="py-2">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-2xl border p-4 text-sm font-mono space-y-1 opacity-80 overflow-x-auto">
              <div className="font-sans font-semibold not-italic opacity-100 mb-3 text-foreground">Wiring</div>
              <div>DHT11:    VCC→3.3V  GND→GND  DATA→PE3  [10kΩ pull-up to 3.3V]</div>
              <div>KY-018:   VIN→3.3V  GND→GND  SIG→PE2</div>
              <div>HC-SR501: VCC→5V    GND→GND  OUT→PD0</div>
              <div>WS2812B:  5V→5V     GND→GND  DIN→[330Ω]→PD1</div>
              <div>Fan(+):   5V rail</div>
              <div>Fan(-):   2N2222A Collector</div>
              <div>2N2222A:  Base→[1kΩ]→PC4   Emitter→GND</div>
              <div>1N4007:   Cathode→Fan(+)   Anode→Fan(-)</div>
              <div>HC-05:    VCC→5V    GND→GND  TX→PB0    RX→PB1</div>
            </div>
          </Section>

          <Section heading="Firmware Architecture">
            <p className="opacity-80 leading-relaxed mb-4">
              The firmware is a single bare-metal C file targeting the TM4C123GH6PM at 80 MHz
              (PLL configured). No RTOS, no Arduino libraries — all peripheral drivers are written
              from scratch using TivaWare DriverLib, compiled with{" "}
              <Code>-O2</Code> (required for WS2812B bit-bang timing).
            </p>
            <div className="rounded-2xl border p-4 text-sm font-mono space-y-0.5 opacity-80 mb-6 overflow-x-auto">
              <div>main()</div>
              <div className="pl-4">├── Peripheral Init (GPIO, ADC, UART1, SysTick, WDT0)</div>
              <div className="pl-4">├── HC-05 Boot Delay (~2s, blue LED indicator)</div>
              <div className="pl-4">├── Watchdog Arm</div>
              <div className="pl-4">└── Main Loop</div>
              <div className="pl-10">├── watchdog_pet()</div>
              <div className="pl-10">├── Motion event handler  →  LED state machine</div>
              <div className="pl-10">├── LED state machine (IDLE→FLASH×2→STEADY→DIM→OFF)</div>
              <div className="pl-10">├── Buzzer timer</div>
              <div className="pl-10">├── Periodic auto-logic (fan threshold, LDR dim) every 5s</div>
              <div className="pl-10">└── UART command handler  →  handle_cmd()</div>
            </div>
            <div className="rounded-2xl border overflow-hidden">
              <Image
                src="/images/Firmware_ISR.png"
                alt="Firmware ISR Architecture & Peripheral Drivers"
                width={1400}
                height={1000}
                className="w-full h-auto"
              />
            </div>
            <p className="mt-2 text-xs opacity-60 text-center">
              Firmware ISR architecture — covers UART1, GPIOD, SysTick, and WDT0 ISRs; DHT11 1-wire driver; WS2812B 800 kHz bit-bang driver; and the 7-state motion LED FSM.
            </p>
          </Section>

          <Section heading="Key Design Decisions">
            <ul className="space-y-3 opacity-80 leading-relaxed">
              <li>
                <span className="font-medium text-foreground">Interrupts off during DHT11 reads</span>{" "}
                — the 1-wire protocol requires µs-accurate timing; SysTick is masked for the ~5 ms read duration.
              </li>
              <li>
                <span className="font-medium text-foreground">Interrupts off during WS2812B frame writes</span>{" "}
                — 800 kHz bit-bang at 16 MHz leaves ~20 cycles per bit; the timing-critical section is ~480 µs for 16 LEDs.
              </li>
              <li>
                <span className="font-medium text-foreground">NOP-based WS2812B timing</span>{" "}
                — <Code>SysCtlDelay</Code> call overhead (~8 cycles) is too coarse for the short T0H pulse; inline{" "}
                <Code>{"__asm(\" NOP\")"}</Code> provides single-cycle precision.
              </li>
              <li>
                <span className="font-medium text-foreground">Cached DHT11 readings</span>{" "}
                — a 2-second re-read guard prevents 1-wire protocol violations; all STATE queries serve cached data.
              </li>
              <li>
                <span className="font-medium text-foreground">Motion LED state machine</span>{" "}
                — a 7-state FSM handles first-trigger flash sequence, steady-on, dim warning, and auto-off; re-trigger
                silently resets the timer without re-flashing, preventing strobe effect when someone is actively in the room.
              </li>
            </ul>
          </Section>

          <Section heading="Command Protocol">
            <p className="opacity-80 leading-relaxed mb-5">
              All communication is ASCII over Bluetooth UART at 9600 8N1. Commands are{" "}
              <Code>{`\\n`}</Code>-terminated; responses are <Code>{`\\r\\n`}</Code>-terminated.
              The protocol is intentionally human-readable so it can be driven from any serial terminal.
            </p>

            <h3 className="text-base font-semibold mb-3">Host → Device</h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 pr-6 text-left font-semibold font-mono">Command</th>
                    <th className="py-2 text-left font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="opacity-80">
                  {[
                    ["PING",           "Heartbeat check"],
                    ["STATE",          "Full system state snapshot"],
                    ["TEMP",           "Current temperature (°F)"],
                    ["HUMID",          "Current humidity (%)"],
                    ["LIGHT",          "Ambient light level (0–100%)"],
                    ["FAN0",           "Manual fan off"],
                    ["FAN1",           "Manual fan on"],
                    ["FAN_AUTO",       "Return fan to auto-threshold mode"],
                    ["FANTHRESH:XX",   "Set fan trigger temperature in °F (60–100)"],
                    ["MOTION_ARM",     "Arm PIR sensor"],
                    ["MOTION_DISARM",  "Disarm PIR sensor"],
                    ["LED_ON",         "Turn LED strip on (white, current brightness)"],
                    ["LED_OFF",        "Turn LED strip off"],
                    ["LED_BRIGHT:XX",  "Set LED brightness 0–100"],
                    ["LDR_AUTO",       "Return LED to ambient-light auto-dim"],
                    ["LDR_MAN:XX",     "Manual brightness override 0–100"],
                    ["BUZZ:X",         "Buzz for X×100ms"],
                    ["BUZZ0",          "Stop buzzer"],
                    ["RGB:xyz",        "Set onboard RGB LED (e.g. RGB:100)"],
                    ["R0/R1 G0/G1 B0/B1", "Set individual onboard RGB channels"],
                    ["X",              "All onboard LEDs off"],
                    ["VERSION",        "Firmware version"],
                    ["UPTIME",         "Seconds since last boot"],
                    ["HELP",           "List all commands"],
                    ["EXIT",           "Close session"],
                  ].map(([cmd, desc]) => (
                    <tr key={cmd} className="border-b last:border-0">
                      <td className="py-2 pr-6 font-mono text-xs">{cmd}</td>
                      <td className="py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-semibold mb-3">Device → Host</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 pr-6 text-left font-semibold font-mono">Message</th>
                    <th className="py-2 text-left font-semibold">Trigger</th>
                  </tr>
                </thead>
                <tbody className="opacity-80">
                  {[
                    ["OK PONG",                              "Response to PING"],
                    ["OK TEMP=72F",                          "Response to TEMP"],
                    ["OK HUMID=45%",                         "Response to HUMID"],
                    ["OK LIGHT=63",                          "Response to LIGHT"],
                    ["OK RGB=xyz TEMP=… FAN=… (full STATE)", "Response to STATE"],
                    ["EVT MOTION",                           "Unsolicited — PIR triggered"],
                    ["EVT FAN_ON TEMP=81F",                  "Unsolicited — fan auto-activated"],
                    ["EVT FAN_OFF",                          "Unsolicited — fan auto-deactivated"],
                    ["EVT LED_OFF",                          "Unsolicited — motion auto-off timer expired"],
                    ["EVT WDT_RESET",                        "First message after watchdog reset"],
                    ["STARTUP TEMP=69F HUMID=29% LIGHT=52",  "Sent once on boot after HC-05 settles"],
                  ].map(([msg, trigger]) => (
                    <tr key={msg} className="border-b last:border-0">
                      <td className="py-2 pr-6 font-mono text-xs">{msg}</td>
                      <td className="py-2">{trigger}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section heading="GUI Application">
            <p className="opacity-80 leading-relaxed mb-4">
              The Python Tkinter dashboard (<Code>tiva_bt_gui.py</Code>) provides a full control
              interface. Pair the HC-05 in Windows Bluetooth settings (PIN: <Code>1234</Code>),
              select the assigned COM port from the dropdown, and click Connect. A 3-second
              connection timeout watchdog prevents the GUI from freezing on a bad COM port.
            </p>
            <div className="rounded-2xl border p-4 text-xs font-mono space-y-0.5 opacity-80 mb-5 overflow-x-auto">
              <div>┌─────────────────────────────────────────────────────┐</div>
              <div>│  COM Port [dropdown]   Baud [dropdown]  [Connect]  │</div>
              <div>│  ● Connected                 Last seen: 2s ago      │</div>
              <div>├──────────────┬──────────────┬──────────────────────-┤</div>
              <div>│ TEMPERATURE  │     FAN      │       LIGHTING        │</div>
              <div>│  72.4 °F     │ Mode: AUTO   │ Motion: ARMED         │</div>
              <div>│  Humidity:   │ Thresh: 80°F │ LDR: AUTO             │</div>
              <div>│  [sparkline] │ [slider]     │ Brightness [slider]   │</div>
              <div>│  [Read Now]  │ FAN ON/OFF   │ STRIP ON / STRIP OFF  │</div>
              <div>├──────────────┴──────────────┴───────────────────────┤</div>
              <div>│ RGB Controls         │  Utilities                   │</div>
              <div>├──────────────────────┴──────────────────────────────┤</div>
              <div>│ ALERTS                                               │</div>
              <div>├─────────────────────────────────────────────────────┤</div>
              <div>│ Serial Log (raw)                         [▼ Hide]   │</div>
              <div>└─────────────────────────────────────────────────────┘</div>
            </div>
            <ul className="space-y-2 opacity-80 leading-relaxed mb-6">
              <li>
                <span className="font-medium text-foreground">10-second STATE polling</span>{" "}
                — all panels update automatically without user interaction.
              </li>
              <li>
                <span className="font-medium text-foreground">Temperature sparkline</span>{" "}
                — scrolling line graph of the last 15 readings.
              </li>
              <li>
                <span className="font-medium text-foreground">Software watchdog</span>{" "}
                — "Last seen" counter; amber warning at 90 s of silence, red at 3 min.
              </li>
              <li>
                <span className="font-medium text-foreground">Alert log</span>{" "}
                — timestamped events (motion, fan auto-on/off, LED auto-off, WDT reset).
              </li>
              <li>
                <span className="font-medium text-foreground">Fan panel</span>{" "}
                — AUTO/MANUAL mode toggle, threshold slider, manual ON/OFF buttons.
              </li>
              <li>
                <span className="font-medium text-foreground">LED strip panel</span>{" "}
                — auto-dim toggle, manual brightness slider, STRIP ON/OFF.
              </li>
            </ul>
            <div className="rounded-2xl border overflow-hidden">
              <Image
                src="/images/GUI_Application.png"
                alt="GUI Application Flow"
                width={1400}
                height={1000}
                className="w-full h-auto"
              />
            </div>
            <p className="mt-2 text-xs opacity-60 text-center">
              GUI application flow — covers connection management with 3-second timeout watchdog, daemon reader thread, 50ms queue drain, periodic timers (STATE poll + software watchdog), and user control event dispatch.
            </p>
          </Section>

          <Section heading="Full System Architecture">
            <p className="opacity-80 leading-relaxed mb-5">
              End-to-end view across all four layers: Physical Hardware → TM4C Firmware →
              Bluetooth Transport → Python GUI, with every data and signal path traced between them.
            </p>
            <div className="rounded-2xl border overflow-hidden">
              <Image
                src="/images/Full_System_Spec.png"
                alt="Full System Architecture"
                width={1800}
                height={1000}
                className="w-full h-auto"
              />
            </div>
          </Section>

          <Section heading="Motion-Triggered LED Behavior">
            <p className="opacity-80 leading-relaxed mb-3">On first motion detection (strip was off):</p>
            <ol className="list-decimal list-inside space-y-2 opacity-80 pl-2 leading-relaxed mb-5">
              <li>Strip flashes ON 150 ms, OFF 150 ms (×2) — visual acknowledgment</li>
              <li>Holds steady white at 100% brightness for 25 seconds</li>
              <li>Dims to 40% for the final 5 seconds — "turning off soon" warning</li>
              <li>Strip off; <Code>EVT LED_OFF</Code> sent to the GUI</li>
            </ol>
            <p className="opacity-80 leading-relaxed">
              On re-trigger while the strip is already on: timer silently resets to 30 seconds and
              brightness restores to 100%. No flash — prevents an annoying strobe effect when
              someone is actively moving through the room.
            </p>
          </Section>

          <Section heading="Known Limitations">
            <ul className="space-y-3 opacity-80 leading-relaxed">
              <li>
                <span className="font-medium text-foreground">DHT11 precision</span>{" "}
                — ±2°C accuracy, integer-only output. Suitable for indoor ambient monitoring; not for precision applications.
              </li>
              <li>
                <span className="font-medium text-foreground">WS2812B color control</span>{" "}
                — driver is optimized for white-only output at variable brightness. Full RGB color control exists in firmware but timing at 16 MHz limits reliable color fidelity.
              </li>
              <li>
                <span className="font-medium text-foreground">Single Bluetooth client</span>{" "}
                — HC-05 SPP supports one paired device at a time. Switching between the Python GUI and an Android app requires re-pairing.
              </li>
              <li>
                <span className="font-medium text-foreground">No persistent configuration</span>{" "}
                — firmware state (thresholds, mode settings) resets to defaults on every power cycle.
              </li>
            </ul>
          </Section>

          <Section heading="Future Work">
            <ul className="space-y-2 opacity-80 leading-relaxed list-disc list-inside pl-2">
              <li>Android app (Kotlin / Jetpack Compose) — bidirectional Bluetooth Classic</li>
              <li>PWM fan speed control — replacing on/off with proportional control</li>
              <li>WS2812B full color command support with improved timing</li>
              <li>EEPROM persistence for threshold and mode settings</li>
              <li>Multiple sensor nodes via ESP32 mesh</li>
            </ul>
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
