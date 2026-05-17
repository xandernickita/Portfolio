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
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    slug: "project-alpha",
    title: "TM4C123G Smart Home Controller",
    summary:
      "A bare-metal embedded IoT system on the TM4C123G LaunchPad: DHT11 temperature/humidity, PIR motion, WS2812B LED strip, LDR ambient light, and auto-threshold fan control — all wired over HC-05 Bluetooth UART to a Tkinter dashboard with live sensor panels, a temperature sparkline, and a real-time alert log.",
    coverImage: "/images/img1.jpg",
    tags: ["Embedded C", "TM4C123", "HC-05", "UART", "DHT11", "WS2812B", "ADC", "PIR", "Python", "Tkinter", "IoT"],
    problem:
      "Demonstrate practical understanding of UART-based IoT communication, embedded peripheral integration, and cross-platform Bluetooth application development — all in bare-metal C without Arduino or RTOS abstractions.",
    constraints:
      "No RTOS or Arduino libraries; WS2812B 800 kHz bit-bang at 16 MHz requires interrupt masking (~20 cycles/bit); DHT11 1-wire needs µs-accurate timing; HC-05 SPP allows only one paired client at a time; firmware state resets on every power cycle.",
    architecture:
      "Firmware drives DHT11 (1-wire bit-bang), KY-018 via ADC0, HC-SR501 via GPIO interrupt, WS2812B via NOP-timed bit-bang, and a 2N2222A-switched DC fan; a 7-state motion LED FSM and hardware WDT0 run in the main loop; Python Tkinter GUI polls STATE every 10 s, dispatches unsolicited EVT messages, and provides full manual overrides.",
    verification:
      "All 25 commands tested from GUI and CLI; STATE queried after each peripheral change to confirm consistency; WDT reset recovery and EVT WDT_RESET receipt verified; software watchdog amber/red thresholds confirmed; motion LED FSM exercised through all 7 states.",
    metrics: [
      "Sensors: DHT11, KY-018 LDR, HC-SR501 PIR",
      "LED strip: 16× WS2812B at 800 kHz",
      "UART: 9600 8N1 via HC-05",
      "Commands: 25 (bidirectional ASCII protocol)",
      "STATE polling: every 10 s",
      "WDT timeout: 3 s",
      "Fan hysteresis: 2 °F",
    ],
    links: { repo: "https://github.com/xandernickita/Embedded_IoT_v2.0" },
    body: [
      "## Overview",
      "A bare-metal embedded IoT system on the TM4C123G LaunchPad connecting multiple hardware peripherals to a Python Tkinter dashboard over Bluetooth Classic UART — no RTOS, no Arduino libraries.",
    ],
  },
  {
    slug: "project-bravo",
    title: "Project Coming Soon",
    summary: "This project is currently in development. Check back for a full case study covering hardware design, firmware architecture, and verification results.",
    coverImage: "/images/img2.jpg",
    tags: [],
    problem: "",
    constraints: "",
    architecture: "",
    verification: "",
    metrics: [],
    links: { repo: "" },
    body: [],
    comingSoon: true,
  },
  {
    slug: "project-charlie",
    title: "Project Coming Soon",
    summary: "This project is currently in development. Check back for a full case study covering hardware design, firmware architecture, and verification results.",
    coverImage: "/images/img3.jpg",
    tags: [],
    problem: "",
    constraints: "",
    architecture: "",
    verification: "",
    metrics: [],
    links: { repo: "" },
    body: [],
    comingSoon: true,
  },
  {
    slug: "project-delta",
    title: "Project Coming Soon",
    summary: "This project is currently in development. Check back for a full case study covering hardware design, firmware architecture, and verification results.",
    coverImage: "/images/img1.jpg",
    tags: [],
    problem: "",
    constraints: "",
    architecture: "",
    verification: "",
    metrics: [],
    links: { repo: "" },
    body: [],
    comingSoon: true,
  },
];
