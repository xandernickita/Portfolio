import { Github, Linkedin, FileDown } from "lucide-react";
import { MotionInView } from "@/components/MotionInView"

export function DownloadsRow() {
  return (
    <section className="mt-10">
      <MotionInView>
        <div className="grid gap-3 rounded-2xl border p-4 md:grid-cols-3">
          <a
            className="flex items-center gap-3 rounded-xl border px-4 py-3 hover:opacity-80 transition"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <FileDown size={18} />
            <div>
              <div className="text-sm font-medium">Resume</div>
              <div className="text-xs opacity-70">Download PDF</div>
            </div>
          </a>

          <a
            className="flex items-center gap-3 rounded-xl border px-4 py-3 hover:opacity-80 transition"
            href="https://github.com/your-handle"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={18} />
            <div>
              <div className="text-sm font-medium">GitHub</div>
              <div className="text-xs opacity-70">@your-handle</div>
            </div>
          </a>

          <a
            className="flex items-center gap-3 rounded-xl border px-4 py-3 hover:opacity-80 transition"
            href="https://www.linkedin.com/in/your-handle/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={18} />
            <div>
              <div className="text-sm font-medium">LinkedIn</div>
              <div className="text-xs opacity-70">Let’s connect</div>
            </div>
          </a>
        </div>
      </MotionInView>
    </section>
  );
}
