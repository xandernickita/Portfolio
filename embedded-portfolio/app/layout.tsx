import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";



const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alexandernickita.com";
const DESCRIPTION =
  "Embedded software engineer focused on firmware, real-time systems, and hardware-adjacent software.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alexander Nickita | Embedded Software Engineer",
    template: "%s | Alexander Nickita",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Alexander Nickita",
    title: "Alexander Nickita | Embedded Software Engineer",
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Alexander Nickita" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexander Nickita | Embedded Software Engineer",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
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
