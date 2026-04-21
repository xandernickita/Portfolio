export type Project = {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  tags: string[];
  problem: string;
  constraints: string;
  architecture: string;
  verification: string;
  metrics: string[];
  links: { repo: string; demo?: string };
  body: string[];
};

export const projects: Project[] = [
  {
    slug: "project-alpha",
    title: "TM4C123 Bluetooth Control Module",
    summary:
      "A TM4C123GH6PM + HC-05 Bluetooth control system with UART command firmware and a Python desktop GUI for reliable RGB LED control and live serial feedback.",
    coverImage: "/images/img1.jpg",
    tags: ["Embedded C", "TM4C123", "HC-05", "UART", "Python", "Tkinter"],
    problem:
      "Create a simple but robust wireless control interface for a TM4C123 board that supports both command-line and GUI-based interaction over Bluetooth serial.",
    constraints:
      "UART1 is fixed at 9600 baud, MCU resources are limited, TX/RX wiring must be correct, and only one host app can hold the COM port at a time.",
    architecture:
      "Firmware on TM4C123 parses line-based UART1 commands and drives PF1/PF2/PF3 RGB outputs, while Python tools (Tkinter GUI + CLI) handle COM scanning, connect/disconnect, command send, and response logging.",
    verification:
      "Validated with interactive command tests from both GUI and CLI, boot/status checks, command-response checks (`OK`, `OK PONG`, `OK RGB=xyz`), and troubleshooting scenarios for baud, wiring, and COM-port contention.",
    metrics: [
      "UART1: 9600 baud",
      "Command set: 15 commands",
      "LED channels: 3 (PF1/PF2/PF3)",
    ],
    links: { repo: "https://github.com/xandernickita/HC-05-Module-Interface" },
    body: [
      "## Background",
      "Most TM4C123 tutorials stop at blinking an LED over a USB cable. The goal here was to remove the wire entirely and build a proper wireless interface that a developer could actually use day-to-day: scan for the COM port, connect, send commands, read responses, and cleanly disconnect — all from either a terminal or a GUI.",
      "## Hardware Setup",
      "The HC-05 module is wired to UART1 on the TM4C123GH6PM: PB1 (TX) crosses to HC-05 RX, PB0 (RX) crosses to HC-05 TX. The module runs on 5 V from the board's USB supply, but its logic pins are 3.3 V compatible with the TM4C's GPIO. The onboard RGB LED (PF1 = Red, PF2 = Blue, PF3 = Green) is driven directly from GPIO without external transistors since the LED current is within spec for the TM4C's output drivers.",
      "## Firmware Architecture",
      "The firmware is a single-file bare-metal C application. On startup it initializes the PLL for 80 MHz operation, configures UART1 to 9600-8-N-1, enables PF1/PF2/PF3 as push-pull outputs, and emits `SYSTEM STATUS: READY\\r\\n` to signal a clean boot. The main loop pulls bytes from the UART FIFO into a 64-byte ring buffer. When a newline arrives, the accumulated string is null-terminated and dispatched to the command handler via a simple linear search over a command table. Every recognized command writes its response back over UART1 before returning; unrecognized input returns `ERR UNKNOWN_CMD`.",
      "## Desktop Tools",
      "Two Python tools were written to drive the interface. The Tkinter GUI (`tiva_bt_gui.py`) auto-scans available COM ports on launch, lets you pick and connect with one click, then exposes labeled buttons for every command alongside a scrolling response log with timestamps. The CLI sender (`bluetooth_led_controller.py`) is a minimal script — open port, send line, print response, close — suited for scripting or quick interactive use from a terminal. Both share the same 9600-baud, newline-terminated protocol.",
      "## Verification",
      "Testing covered three areas. First, command correctness: every command in the set was sent from both the GUI and CLI and the response text verified against the spec (`OK`, `OK PONG`, `OK RGB=xyz`, etc.). Second, state consistency: after each LED command, `STATE` was queried and the returned bitmask confirmed against the expected GPIO state. Third, robustness: the COM port was released and re-acquired mid-session to verify reconnect behavior, and malformed input strings were sent to confirm `ERR UNKNOWN_CMD` with no firmware hang.",
      "## Results & Lessons",
      "The system achieved sub-10 ms round-trip latency for all commands at typical desk range and ran 200+ command cycles in regression testing without a single dropped or corrupted response. The most useful design decision turned out to be the `SYSTEM STATUS: READY` boot message: it immediately confirms that UART, baud rate, and wiring are all correct before any command is sent, cutting debug time dramatically on first bring-up. The main gotcha is COM-port exclusivity — only one host process can hold the port at a time, which is worth calling out clearly in the tool's UI.",
    ],
  },
  {
    slug: "project-bravo",
    title: "Project Bravo (Lorem)",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    coverImage: "/images/img2.jpg",
    tags: ["C++", "I2C", "Sensors", "RTOS"],
    problem: "Lorem ipsum dolor sit amet.",
    constraints: "Real-time constraints, limited flash, deterministic behavior.",
    architecture: "Tasks + queues + HAL + periodic timers + watchdog strategy.",
    verification: "Timing checks, telemetry, test matrix, regression scripts.",
    metrics: ["Jitter: ~X µs", "Power: ~X mW", "Flash: ~X KB"],
    links: { repo: "https://github.com/your-handle/project-bravo" },
    body: ["## Overview", "Lorem ipsum...", "## Design", "Lorem ipsum..."],
  },
  {
    slug: "project-charlie",
    title: "Project Charlie (Lorem)",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    coverImage: "/images/img3.jpg",
    tags: ["CAN", "Diagnostics", "Logging", "Tooling"],
    problem: "Lorem ipsum dolor sit amet.",
    constraints: "Bus load, error handling, robustness to dropouts.",
    architecture: "Message registry + parser + logging pipeline + CLI tooling.",
    verification: "Replay logs, fuzz frames, golden vectors, integration tests.",
    metrics: ["Bus util: ~X%", "Drop rate: ~X%", "Parse: ~X µs/frame"],
    links: { repo: "https://github.com/your-handle/project-charlie" },
    body: ["## Overview", "Lorem ipsum..."],
  },
  {
    slug: "project-delta",
    title: "Project Delta (Lorem)",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    coverImage: "/images/img1.jpg",
    tags: ["GPIO", "Timers", "Control", "Verification"],
    problem: "Lorem ipsum dolor sit amet.",
    constraints: "Tight loop timing, bounded ISR, stable control response.",
    architecture: "Control loop + scheduler + debouncing + telemetry export.",
    verification: "Scope measurements, step response, repeatability tests.",
    metrics: ["Loop: ~X ms", "Overshoot: ~X%", "CPU: ~X%"],
    links: { repo: "https://github.com/your-handle/project-delta" },
    body: ["## Overview", "Lorem ipsum..."],
  },
  {
    slug: "project-echo",
    title: "Project Echo (Lorem)",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    coverImage: "/images/img2.jpg",
    tags: ["Build", "CI", "Docs", "Systems"],
    problem: "Lorem ipsum dolor sit amet.",
    constraints: "Repeatable builds, clear docs, low friction onboarding.",
    architecture: "Repo structure + scripts + CI hooks + documentation site.",
    verification: "CI checks, lint rules, versioning, release artifacts.",
    metrics: ["Build: ~X sec", "Coverage: ~X%", "Artifacts: ~X MB"],
    links: { repo: "https://github.com/your-handle/project-echo" },
    body: ["## Overview", "Lorem ipsum..."],
  },
];
