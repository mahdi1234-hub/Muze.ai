import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muze.ai — The State of the Customer Journey, 2026",
  description:
    "An interactive enterprise case study of 8.2M marketing customer journeys across 340 B2B SaaS companies. Built with Next.js, react-scrollama, Nivo, Visx, Motion and React Spring.",
  metadataBase: new URL("https://muze.ai"),
  openGraph: {
    title: "Muze.ai — The State of the Customer Journey, 2026",
    description:
      "Interactive data storytelling across awareness, acquisition, activation, engagement, conversion, retention and advocacy.",
    type: "article",
  },
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
