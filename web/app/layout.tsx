import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

import { PostHogProvider } from "./providers";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070606",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "PREP-G | Master System Design",
    template: "%s | PREP-G",
  },
  description:
    "Master system design patterns and ace your technical interview. Practice canonical system design problems with instant AI-powered feedback.",
  keywords: [
    "System Design",
    "Interview Prep",
    "Software Engineering",
    "FAANG",
    "LLD",
    "HLD",
    "Architecture",
  ],
  authors: [{ name: "PREP-G Team" }],
  creator: "PREP-G",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prepg.com",
    title: "PREP-G | Master System Design",
    description:
      "Master system design patterns and ace your technical interview with instant AI feedback.",
    siteName: "PREP-G",
  },
  twitter: {
    card: "summary_large_image",
    title: "PREP-G | Master System Design",
    description:
      "Master system design patterns and ace your technical interview with instant AI feedback.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansFont.variable} ${monoFont.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070606] text-[#F3F3F3] selection:bg-[#E84200]/30 selection:text-white font-sans relative">
        {/* Global Noise Overlay with GPU hardware acceleration */}
        <div
          aria-hidden="true"
          className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-40 mix-blend-overlay transform-gpu"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        />
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}