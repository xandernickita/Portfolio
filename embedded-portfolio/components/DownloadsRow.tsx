import { IconFileDownload, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { MotionInView } from "@/components/MotionInView";

const links = [
  {
    icon: <IconFileDownload size={20} stroke={1.5} />,
    label: "Resume",
    sub: "Download PDF",
    href: "resume/Alexander-Nickita-SWE-v3.pdf",
    external: true,
  },
  {
    icon: <IconBrandGithub size={20} stroke={1.5} />,
    label: "GitHub",
    sub: "xandernickita",
    href: "https://github.com/xandernickita",
    external: true,
  },
  {
    icon: <IconBrandLinkedin size={20} stroke={1.5} />,
    label: "LinkedIn",
    sub: "Let's connect",
    href: "https://www.linkedin.com/in/alexander-nickita-ssm-a318aa174",
    external: true,
  },
];

export function DownloadsRow() {
  return (
    <section className="mt-5">
      <MotionInView>
        <div className="grid gap-3 md:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3.5 transition-all hover:border-accent/50 hover:text-accent hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="shrink-0 text-muted-foreground">{l.icon}</span>
              <div>
                <div className="text-sm font-medium">{l.label}</div>
                <div className="text-xs text-muted-foreground">{l.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </MotionInView>
    </section>
  );
}
