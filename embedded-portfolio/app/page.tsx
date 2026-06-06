import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { DownloadsRow } from "@/components/DownloadsRow";

export default function HomePage() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 pb-24 pt-24">
      <Hero />
      <DownloadsRow />
      <About />
      <Education />
      <Projects />
      <Contact />
      <footer className="mt-12 border-t pt-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Alexander Nickita — Built with Next.js
      </footer>
    </main>
  );
}
