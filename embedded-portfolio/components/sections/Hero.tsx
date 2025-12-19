import Image from "next/image";
import { MotionInView } from "@/components/MotionInView";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden rounded-3xl border">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/img2.jpg"
          alt="Microcontroller background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative grid gap-10 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
        <div>
          <MotionInView>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Embedded Software
              <span className="opacity-80"> • Embedded Systems • </span>
              <span className="opacity-70">Firmware Engineer</span>
            </h1>
          </MotionInView>

          <MotionInView delay={0.08}>
            <p className="mt-4 max-w-xl text-base opacity-80 md:text-lg">
              Motivated Embedded Software Engineer based out of the metro-Detroit area. Experienced in 
              low-level programming and hardware integration, with extensive knowledge in C/C++, Python, 
              RTOS, CAN, and many other embedded specialties.
            </p>
          </MotionInView>

          <MotionInView delay={0.16}>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/#projects"
                className="rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
              >
                View Projects
              </a>
              <a
                href="/projects"
                className="rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
              >
                Case Studies
              </a>
              <a
                href="/#contact"
                className="rounded-xl border px-4 py-2 text-sm hover:opacity-80 transition"
              >
                Contact
              </a>
            </div>
          </MotionInView>
        </div>

        <MotionInView delay={0.12}>
          <div className="flex items-center justify-center">
            <div className="rounded-3xl border bg-background/70 p-3 backdrop-blur">
              <Image
                src="/images/headshot.jpg"
                alt="Headshot"
                width={340}
                height={340}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
