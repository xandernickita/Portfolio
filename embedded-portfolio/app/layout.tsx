import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";



export const metadata: Metadata = {
  title: {
    default: "Alexander Nickita | Embedded Software Engineer",
    template: "%s | Alexander Nickita",
  },
  description:
    "Embedded software engineer focused on firmware, real-time systems, and hardware-adjacent software.",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <Analytics />
          <Navbar />
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
