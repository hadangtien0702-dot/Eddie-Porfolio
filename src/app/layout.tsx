// ─── Root Layout ───
// Mô tả: Layout chính của toàn bộ trang portfolio
// Font: Clash Display (heading) + Inter (body) theo RULES_1.md

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// ─── Body Font — Inter Display từ Google Fonts ───
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter-display",
  display: "swap",
});

// ─── Heading Font — Clash Display từ local files ───
const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
  display: "swap",
});

// ─── SEO Metadata ───
export const metadata: Metadata = {
  title: "Eddie — Creative Video Strategist",
  description:
    "Portfolio of Eddie — Creative Video Strategist specializing in performance marketing, paid funnels, and organic growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${clashDisplay.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
