"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const spring = (delay = 0) => ({
  type: "spring" as const,
  stiffness: 90,
  damping: 22,
  delay,
});

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? {} : { opacity: 0, y: 22 };
  const animate = prefersReducedMotion ? {} : { opacity: 1, y: 0 };

  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-2xl border bg-card"
    >
      {/* Background texture — hardware / circuit photography at low opacity */}
      <div className="absolute inset-0 opacity-20 dark:opacity-15">
        <Image
          src="/images/img2.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden
        />
      </div>
      {/* Gradient to ensure text legibility over the texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-card/40" />

      <div className="relative grid gap-8 p-7 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-12 md:p-12">
        {/* Left — text */}
        <div>
          <motion.p
            initial={initial}
            animate={animate}
            transition={spring(0)}
            className="text-xs font-medium uppercase tracking-[0.18em] text-accent"
          >
            Embedded Software Engineer
          </motion.p>

          <motion.h1
            initial={initial}
            animate={animate}
            transition={spring(0.06)}
            className="mt-3 text-4xl font-semibold tracking-tighter leading-none md:text-5xl lg:text-6xl"
          >
            Alexander
            <br />
            Nickita
          </motion.h1>

          <motion.p
            initial={initial}
            animate={animate}
            transition={spring(0.12)}
            className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted-foreground"
          >
            Firmware, real-time systems, and hardware integration — based in
            metro-Detroit. C/C++, RTOS, CAN, and everything that runs before the
            OS does.
          </motion.p>

          <motion.div
            initial={initial}
            animate={animate}
            transition={spring(0.18)}
            className="mt-7 flex flex-wrap gap-3"
          >
            <a href="/#projects" className="btn-primary">
              View my work
            </a>
            <a href="/#contact" className="btn-secondary">
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Right — headshot */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.96 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
          transition={spring(0.14)}
          className="flex items-center justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/30 to-transparent blur-lg" />
            <div className="relative rounded-2xl border bg-background/60 p-2.5 backdrop-blur">
              <Image
                src="/images/headshot.jpg"
                alt="Alexander Nickita headshot"
                width={320}
                height={320}
                className="rounded-xl object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
