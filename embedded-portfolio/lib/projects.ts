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
    title: "Project Alpha (Lorem)",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
    coverImage: "/images/img1.jpg",
    tags: ["C", "UART", "Drivers", "Interrupts"],
    problem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    constraints: "Power, timing, memory, noisy signals, strict deadlines.",
    architecture:
      "Modular drivers + state machine + ISR-driven sampling + ring buffers.",
    verification:
      "Unit tests (host), hardware tests (scope/LA), fault injection, logs.",
    metrics: ["Latency: ~X ms", "SR: ~X Hz", "RAM: ~X KB"],
    links: { repo: "https://github.com/your-handle/project-alpha" },
    body: [
      "## Overview",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "## Design",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "## Verification",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "## Results",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
