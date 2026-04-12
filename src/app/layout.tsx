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
      <body className="antialiased bg-[#050505] text-white overflow-x-hidden min-h-screen relative" suppressHydrationWarning>
        
        {/* ─── Global Tech Motif Background ─── */}
        <div className="fixed inset-0 pointer-events-none z-[-10]">
          <div 
            className="absolute inset-0 opacity-[0.015]" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} 
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="none">
             <path d="M 0 100 L 200 100 L 250 150 L 500 150" stroke="white" strokeWidth="1" fill="none" />
             <path d="M 70% 0 L 70% 30% L 80% 40% L 80% 100%" stroke="white" strokeWidth="1" fill="none" />
             <path d="M 30% 60% L 40% 70% L 100% 70%" stroke="white" strokeWidth="1" fill="none" />
             <circle cx="200" cy="100" r="3" fill="white" />
             <circle cx="250" cy="150" r="3" fill="white" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-50" />
        </div>

        {children}
      </body>
    </html>
  );
}
