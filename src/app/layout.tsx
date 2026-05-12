// ─── Root Layout ───
// Mô tả: Layout chính của toàn bộ trang portfolio
// Font: Be Vietnam Pro (heading) + Inter Display (body)
// Giải pháp: Sử dụng Be Vietnam Pro để hỗ trợ tiếng Việt hoàn hảo cho tiêu đề

import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";

// ─── Heading Font: Be Vietnam Pro (Google Fonts) ───
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// ─── Local Font: Inter Display (Body) ───
const interDisplay = localFont({
  src: [
    {
      path: "../../assets/fonts/Inter Display/InterDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Inter Display/InterDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Inter Display/InterDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/Inter Display/InterDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter-display",
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
    <html lang="vi" className={`${beVietnam.variable} ${interDisplay.variable}`} suppressHydrationWarning>
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
             <path d="M 800 0 L 800 300 L 900 400 L 900 1000" stroke="white" strokeWidth="1" fill="none" />
             <path d="M 300 600 L 400 700 L 1200 700" stroke="white" strokeWidth="1" fill="none" />
             <circle cx="200" cy="100" r="3" fill="white" />
             <circle cx="250" cy="150" r="3" fill="white" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-50" />
        </div>

        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
