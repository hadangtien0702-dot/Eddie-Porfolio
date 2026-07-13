"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  ArrowLeft, 
  Printer, 
  ExternalLink,
  Sparkles,
  Award,
  Video,
  Layers,
  Cpu
} from "lucide-react";
import { brand } from "@/data/navigation";
import { contactData } from "@/data/contact";
import { businessStats } from "@/data/overview";

// Custom LinkedIn Icon component since Linkedin is missing from the custom lucide build
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Giả lập mã QR SVG để in ấn và hiển thị trực tuyến
function MockQRCode() {
  return (
    <svg width="64" height="64" viewBox="0 0 29 29" fill="currentColor" className="text-white print:text-black">
      {/* Corner Anchors */}
      <rect x="0" y="0" width="7" height="7" />
      <rect x="1" y="1" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="2" y="2" width="3" height="3" />

      <rect x="22" y="0" width="7" height="7" />
      <rect x="23" y="1" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="24" y="2" width="3" height="3" />

      <rect x="0" y="22" width="7" height="7" />
      <rect x="1" y="23" width="5" height="5" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="2" y="24" width="3" height="3" />

      {/* Random-looking QR data points */}
      <rect x="9" y="0" width="2" height="1" />
      <rect x="15" y="0" width="1" height="2" />
      <rect x="19" y="0" width="2" height="2" />
      
      <rect x="9" y="3" width="3" height="1" />
      <rect x="14" y="2" width="2" height="2" />
      <rect x="18" y="3" width="1" height="3" />
      
      <rect x="8" y="6" width="2" height="2" />
      <rect x="12" y="5" width="2" height="1" />
      <rect x="16" y="6" width="3" height="1" />
      
      <rect x="0" y="9" width="1" height="3" />
      <rect x="3" y="10" width="2" height="2" />
      <rect x="7" y="9" width="3" height="1" />
      <rect x="11" y="8" width="2" height="3" />
      <rect x="15" y="9" width="1" height="2" />
      <rect x="18" y="8" width="4" height="1" />
      <rect x="24" y="9" width="2" height="3" />
      
      <rect x="2" y="14" width="3" height="1" />
      <rect x="7" y="13" width="1" height="3" />
      <rect x="10" y="14" width="4" height="2" />
      <rect x="16" y="13" width="2" height="1" />
      <rect x="20" y="14" width="2" height="3" />
      
      <rect x="0" y="18" width="2" height="2" />
      <rect x="4" y="17" width="1" height="3" />
      <rect x="8" y="19" width="3" height="1" />
      <rect x="13" y="18" width="2" height="2" />
      <rect x="17" y="17" width="2" height="1" />
      
      <rect x="9" y="22" width="1" height="4" />
      <rect x="12" y="23" width="3" height="2" />
      <rect x="17" y="22" width="2" height="1" />
      <rect x="20" y="23" width="4" height="2" />
      
      <rect x="8" y="27" width="4" height="1" />
      <rect x="14" y="26" width="2" height="2" />
      <rect x="18" y="27" width="3" height="1" />
      <rect x="23" y="26" width="1" height="3" />
    </svg>
  );
}

export default function ResumePage() {
  const router = useRouter();
  const [showPortfolioDropdown, setShowPortfolioDropdown] = useState(false);

  // Thông tin liên hệ mẫu có thể tùy chỉnh dễ dàng
  const personalInfo = {
    fullName: "HA DANG TIEN (EDDIE)",
    phone: "+84 938 169 130",
    email: "hadangtien0702@gmail.com",
    location: "Ho Chi Minh City, Vietnam (Available for Remote)",
    website: "hadangtien.com",
    portfolioUrl: "https://hadangtien.com",
  };

  const skillsData = [
    {
      category: "Production & Leadership",
      icon: <Video className="w-4 h-4 text-accent print:text-black" />,
      items: ["Creative Direction", "Media Team Leadership", "Studio Operations & Scaling", "Multi-cam Directing", "Pre-to-Post Pipeline Management"]
    },
    {
      category: "Growth & Performance",
      icon: <Layers className="w-4 h-4 text-accent print:text-black" />,
      items: ["Performance Media Acquisition", "Paid Creative A/B Testing", "CPA Reduction & Conversion Optimization", "Data-Driven Iteration", "Organic Video Growth"]
    },
    {
      category: "Tools & Platforms",
      icon: <Award className="w-4 h-4 text-accent print:text-black" />,
      items: ["Video Editing (Premiere, CapCut)", "Graphic Design (Social & Ads)", "UI/UX & Web Design", "Next.js & Frontend Prototyping", "Supabase Integration"]
    },
    {
      category: "AI & Automation Stack",
      icon: <Cpu className="w-4 h-4 text-accent print:text-black" />,
      items: ["n8n Orchestration", "AI Voice & Face Synthesis (HeyGen, ElevenLabs)", "UGC AI Content Automation", "Generative Workflow Design", "Prompt Engineering"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-body selection:bg-accent selection:text-white print:bg-[#050505] print:text-white print:p-0">
      
      {/* ─── PRINT CUSTOM STYLES ─── */}
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 16mm 18mm 16mm 18mm !important;
          bleed: 3mm;
          marks: crop;
        }
        
        @media print {
          /* Keep dark theme colors on print */
          body, html, main {
            background: #050505 !important;
            color: #ffffff !important;
            font-size: 10px !important;
            line-height: 1.3 !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Hide all screen-only UI */
          .no-print {
            display: none !important;
          }
          
          /* Show print-only UI */
          .print-only {
            display: block !important;
          }
          
          /* Remove page gaps, background patterns */
          div[class*="fixed inset-0 pointer-events-none"],
          .glow-bg, .grid-bg {
            display: none !important;
          }
          
          /* Adjust layout spacing and add safe padding inside the container for print */
          .resume-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 10mm 15mm 10mm 15mm !important; /* Balanced print padding */
            margin: 0 auto !important;
            box-sizing: border-box !important;
          }

          /* Compress header on print */
          header {
            padding-bottom: 10px !important;
            border-bottom-color: rgba(255, 255, 255, 0.1) !important;
          }
          header h1 {
            font-size: 20pt !important;
            margin-bottom: 2px !important;
            color: #ffffff !important;
          }
          header p {
            font-size: 9pt !important;
            margin-top: 0px !important;
            color: #ff4000 !important;
          }
          header div[class*="flex flex-wrap"] {
            margin-top: 6px !important;
            padding-top: 6px !important;
            gap: 12px !important;
          }
          header a {
            color: #ffffff !important;
          }

          /* Compress section headings */
          h2 {
            font-size: 11px !important;
            margin-bottom: 4px !important;
            padding-left: 6px !important;
            color: #ffffff !important;
            border-left-color: #ff4000 !important;
          }

          /* Compress profile text */
          section p {
            font-size: 9px !important;
            line-height: 1.3 !important;
            color: rgba(255, 255, 255, 0.7) !important;
          }

          /* Stats block on print */
          .stat-card {
            padding: 6px 8px !important;
            border-radius: 6px !important;
            background-color: rgba(255, 255, 255, 0.02) !important;
            border-color: rgba(255, 255, 255, 0.05) !important;
          }
          .stat-number {
            font-size: 16pt !important;
            margin-bottom: 0px !important;
            color: #ff4000 !important;
          }
          .stat-label {
            font-size: 8px !important;
            margin-top: 1px !important;
            color: rgba(255, 255, 255, 0.5) !important;
          }

          /* Work Experience blocks */
          .job-block {
            padding-left: 10px !important;
            border-left-color: rgba(255, 255, 255, 0.1) !important;
          }
          .job-block h3 {
            font-size: 10px !important;
            color: #ffffff !important;
          }
          .job-block p {
            font-size: 9px !important;
            margin-bottom: 2px !important;
            color: rgba(255, 255, 255, 0.5) !important;
          }
          .job-block ul {
            font-size: 8.8px !important;
            line-height: 1.25 !important;
            color: rgba(255, 255, 255, 0.6) !important;
          }
          .job-block ul strong {
            color: #ffffff !important;
          }

          /* Skills cards and badges */
          .skills-grid {
            gap: 8px !important;
          }
          .skill-block {
            padding: 6px !important;
            border-radius: 6px !important;
            margin-bottom: 0px !important;
            background-color: rgba(255, 255, 255, 0.01) !important;
            border-color: rgba(255, 255, 255, 0.05) !important;
          }
          .skill-block h3 {
            font-size: 9px !important;
            margin-bottom: 4px !important;
            padding-bottom: 2px !important;
            color: #ffffff !important;
          }
          .skill-badge {
            font-size: 8px !important;
            padding: 1.5px 5px !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            border-radius: 9999px !important;
            background-color: rgba(255, 255, 255, 0.05) !important;
            color: rgba(255, 255, 255, 0.8) !important;
          }

          /* Education / Languages row */
          .edu-lang-grid {
            gap: 10px !important;
          }
          .edu-lang-grid strong {
            color: #ffffff !important;
          }

          /* Compress section spacings */
          section {
            margin-top: 10px !important;
          }
          
          /* Border styles for print */
          .border-subtle {
            border-color: rgba(255, 255, 255, 0.1) !important;
          }

          /* Force background colors or borders to show nicely if checked */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Prevent page break inside items */
          .job-block, .skill-block {
            page-break-inside: avoid !important;
            margin-bottom: 4px !important;
          }

          /* Compress lists */
          ul {
            margin-top: 2px !important;
          }
          li {
            margin-bottom: 1.5px !important;
          }

          /* Force links to look standard white */
          a {
            color: #ffffff !important;
            text-decoration: none !important;
          }
          .print-only a {
            text-decoration: underline !important;
          }
          .print-only p {
            color: rgba(255, 255, 255, 0.5) !important;
          }

          /* Specific colors for accent elements */
          .text-accent {
            color: #ff4000 !important;
          }
          
          /* Fix for bullet points in job timeline */
          .absolute.left-\[-4\.5px\] {
            background-color: #ff4000 !important;
          }
        }
      `}</style>

      {/* ─── SCREEN FLOATING CONTROLS (Hiding on print) ─── */}
      <div className="no-print fixed top-6 left-0 right-0 z-50 px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex items-center justify-between w-full pointer-events-auto">
          {/* Back button */}
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-[13px] font-medium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span>Back to Portfolio</span>
          </button>

          {/* Print button */}
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white hover:bg-accent-warm font-heading text-[13px] font-bold shadow-[0_10px_25px_rgba(255,64,0,0.35)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Lưu PDF / In CV</span>
          </button>
        </div>
      </div>

      {/* ─── RESUME CONTENT CONTAINER ─── */}
      <div className="resume-container max-w-4xl mx-auto px-6 pt-28 pb-20 md:pb-32 relative z-10 print:pt-0 print:pb-0">
        
        {/* Glow ambient background for screen only */}
        <div className="no-print absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        {/* ─── HEADER SECTION ─── */}
        <header className="border-b border-white/10 pb-8 print:pb-6 border-subtle">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 no-print">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                  {contactData.availability}
                </span>
              </div>
              
              <h1 className="font-heading text-5xl md:text-6xl font-black tracking-tighter leading-none mb-3 print:text-3xl text-white print:text-black">
                {personalInfo.fullName}
              </h1>
              <p className="font-mono text-xs md:text-sm font-bold text-accent uppercase tracking-widest print:text-black">
                {brand.tagline}
              </p>
            </div>

            {/* Interactive Portfolio Links Box */}
            <div className="relative flex flex-col items-start md:items-end gap-1">
              {/* Web-only Dropdown Trigger */}
              <div className="no-print relative">
                <button 
                  onClick={() => setShowPortfolioDropdown(!showPortfolioDropdown)}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-white hover:text-accent font-semibold bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-lg border border-white/10 transition-all duration-300 cursor-pointer"
                >
                  <span>Online Portfolio</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${showPortfolioDropdown ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showPortfolioDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0e0e0e] border border-white/10 rounded-xl p-2.5 shadow-2xl z-30 flex flex-col gap-1.5 font-body">
                    <a 
                      href="https://cv-media-lead.vercel.app/" 
                      target="_blank"
                      className="flex flex-col p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 text-left group"
                    >
                      <span className="font-heading text-xs font-bold text-accent group-hover:text-accent-warm flex items-center gap-1">
                        1. Peak Portfolio
                        <ExternalLink className="w-3 h-3" />
                      </span>
                      <span className="font-body text-[10px] text-white/50 leading-normal mt-0.5">
                        Thinksmart Insurance Case Study ($6.2M Revenue, -66% CPA)
                      </span>
                    </a>
                    <div className="h-px bg-white/5 mx-1" />
                    <a 
                      href="/" 
                      target="_blank"
                      className="flex flex-col p-2 rounded-lg hover:bg-white/5 transition-colors duration-200 text-left group"
                    >
                      <span className="font-heading text-xs font-bold text-white group-hover:text-accent flex items-center gap-1">
                        2. Full Portfolio
                        <ExternalLink className="w-3 h-3" />
                      </span>
                      <span className="font-body text-[10px] text-white/50 leading-normal mt-0.5">
                        Main site with all Work, AI flow, and Showreel sections
                      </span>
                    </a>
                  </div>
                )}
              </div>

              {/* Print-only static representation */}
              <div className="print-only hidden text-left md:text-right border-l border-subtle pl-4 print:block">
                <p className="font-mono text-[9px] text-black/50 uppercase tracking-wider">
                  Online Portfolios
                </p>
                <div className="flex flex-col gap-1 mt-1 text-[10px]">
                  <a href="https://cv-media-lead.vercel.app/" className="font-semibold text-black">
                    1. Peak Portfolio: <span className="font-normal font-mono">cv-media-lead.vercel.app</span>
                  </a>
                  <a href={personalInfo.portfolioUrl} className="font-semibold text-black">
                    2. Full Portfolio: <span className="font-normal font-mono">hadangtien.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Bar */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-6 pt-6 border-t border-white/5 text-xs text-white/60 border-subtle print:mt-4 print:pt-4 print:text-black">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-white transition-colors duration-200">
              <Mail className="w-3.5 h-3.5 text-accent print:text-black no-print" />
              <span>{personalInfo.email}</span>
            </a>
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-accent print:text-black no-print" />
              <span>{personalInfo.phone}</span>
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-accent print:text-black no-print" />
              <span>{personalInfo.location}</span>
            </span>
            <a href={contactData.socials[0].href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
              <LinkedinIcon className="w-3.5 h-3.5 text-accent print:text-black no-print" />
              <span>linkedin.com/in/eddie</span>
            </a>
          </div>
        </header>

        {/* ─── PROFILE SUMMARY ─── */}
        <section className="mt-8 print:mt-6">
          <h2 className="font-heading text-lg font-black uppercase tracking-wider text-white print:text-black mb-3 border-l-2 border-accent print:border-black pl-3">
            Profile Summary
          </h2>
          <p className="text-sm md:text-[15px] text-white/70 leading-relaxed text-justify print:text-black/80">
            Creative Video Strategist & Production Team Lead with a proven track record of scaling media operations and driving high-converting paid and organic campaigns. Expert at bridging creative execution with performance marketing metrics to optimize user acquisition funnels ($6.2M peak revenue, 100% video-sourced leads). Highly skilled in setting up production studios, designing visual identity systems, and implementing next-gen AI automation workflows (n8n, HeyGen, UGC AI) to reduce production overhead by up to 90% and multiply content velocity.
          </p>
        </section>

        {/* ─── BUSINESS IMPACT STATS ─── */}
        <section className="mt-8 print:mt-6">
          <h2 className="font-heading text-lg font-black uppercase tracking-wider text-white print:text-black mb-4 border-l-2 border-accent print:border-black pl-3">
            Core Performance & Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4 print:gap-2">
            {businessStats.map((stat) => (
              <div 
                key={stat.label} 
                className="stat-card bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col justify-between print:bg-white print:border-gray-200 print:rounded-lg print:p-3"
              >
                <span className="stat-number font-mono text-3xl font-black text-accent print:text-black leading-none mb-1">
                  {stat.number}
                </span>
                <span className="stat-label font-body text-[11px] text-white/50 uppercase tracking-wider leading-tight print:text-black/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── WORK EXPERIENCE ─── */}
        <section className="mt-8 print:mt-6">
          <h2 className="font-heading text-lg font-black uppercase tracking-wider text-white print:text-black mb-6 print:mb-4 border-l-2 border-accent print:border-black pl-3">
            Professional Experience
          </h2>

          <div className="space-y-8 print:space-y-6">
            {/* Job 1 — Thinksmart */}
            <div className="job-block border-l border-white/10 pl-6 relative print:border-gray-200">
              {/* Bullet node */}
              <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent print:bg-black" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-base font-bold text-white print:text-black">
                    Head of Video Production / Performance Media Manager
                  </h3>
                  <p className="text-sm text-white/50 print:text-black/60 font-medium">
                    Thinksmart Insurance
                  </p>
                </div>
                <div className="text-right sm:text-right text-xs font-mono text-accent print:text-black/70">
                  2023 — Present | HCMC
                </div>
              </div>

              <p className="text-sm text-white/80 print:text-black/80 leading-relaxed mb-3 font-medium text-justify">
                Structured and directed a high-volume performance media acquisition machine. Managed the creative direction, filming studio operations, and scaling workflows.
              </p>

              <ul className="list-disc list-outside ml-4 text-xs md:text-sm text-white/60 space-y-1.5 text-justify print:text-black/70">
                <li>
                  <strong className="text-white print:text-black font-semibold">100% Leads Supplied:</strong> Led the media crew to adapt massive volumes of ad creatives, successfully generating 100% of the active marketing leads to supply the corporate Sales department.
                </li>
                <li>
                  <strong className="text-white print:text-black font-semibold">Creative A/B Testing:</strong> Co-operated directly with ad media buyers to analyze real-time campaign performance, iterate video assets proactively, and drive CPA down by <strong className="text-accent print:text-black font-bold">66%</strong>.
                </li>
                <li>
                  <strong className="text-white print:text-black font-semibold">Revenue Breakthrough:</strong> Contributed significantly to achieving a record-breaking corporate revenue peak of <strong className="text-accent print:text-black font-bold">$6.2M</strong> in 2024 through highly optimized paid acquisition hooks and content scaling.
                </li>
                <li>
                  <strong className="text-white print:text-black font-semibold">Product Visual Identity:</strong> Engineered the full visual style and asset guide for core financial insurance products (IUL, EBTP, Kaizen, Term Life) to make complex concepts relatable for prospects.
                </li>
              </ul>
              
              {/* Case study online link */}
              <div className="mt-3.5">
                <a 
                  href="/casestudy/thinksmart" 
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                >
                  <span>View Thinksmart Case Study Details</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Job 2 — Dream Talent */}
            <div className="job-block border-l border-white/10 pl-6 relative print:border-gray-200">
              {/* Bullet node */}
              <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent print:bg-black" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-base font-bold text-white print:text-black">
                    Event Media Director
                  </h3>
                  <p className="text-sm text-white/50 print:text-black/60 font-medium">
                    Dream Talent
                  </p>
                </div>
                <div className="text-right sm:text-right text-xs font-mono text-accent print:text-black/70">
                  2022 — 2023 | HCMC
                </div>
              </div>

              <p className="text-sm text-white/80 print:text-black/80 leading-relaxed mb-3 font-medium text-justify">
                Directed full creative coverage and brand image execution for high-profile corporate internal affairs, recruitment films, and large-scale public-facing corporate events.
              </p>

              <ul className="list-disc list-outside ml-4 text-xs md:text-sm text-white/60 space-y-1.5 text-justify print:text-black/70">
                <li>
                  <strong className="text-white print:text-black font-semibold">100% In-house Execution:</strong> Built and coordinated end-to-end production pipelines covering pre-event scripting, multi-angle camera mapping, lighting setup, and professional post-production editing.
                </li>
                <li>
                  <strong className="text-white print:text-black font-semibold">Rapid Cinematic Turnaround:</strong> Engineered post-production workflow pipelines that delivered fully graded corporate highlight videos within <strong className="text-accent print:text-black font-bold">48 hours</strong> of event completion, significantly amplifying brand engagement.
                </li>
                <li>
                  <strong className="text-white print:text-black font-semibold">Scale Event Directing:</strong> Supervised a 6+ member technical media crew executing photo/video captures across major corporate events including the Year End Party (YEP), Sports Day, and annual Team Building assemblies.
                </li>
              </ul>

              {/* Case study online link */}
              <div className="mt-3.5">
                <a 
                  href="/casestudy/dreamtalent" 
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                >
                  <span>View Dream Talent Case Study Details</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SKILLS BLOCK ─── */}
        <section className="mt-8 print:mt-6">
          <h2 className="font-heading text-lg font-black uppercase tracking-wider text-white print:text-black mb-4 border-l-2 border-accent print:border-black pl-3">
            Core Skillset & Expertise
          </h2>
          
          <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
            {skillsData.map((category) => (
              <div 
                key={category.category}
                className="skill-block bg-white/[0.01] border border-white/5 rounded-xl p-5 print:bg-white print:border-gray-200 print:rounded-lg print:p-3"
              >
                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2 border-subtle">
                  {category.icon}
                  <h3 className="font-heading text-sm font-bold text-white print:text-black uppercase tracking-wider">
                    {category.category}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span 
                      key={skill}
                      className="skill-badge font-body text-xs bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-full print:bg-gray-100 print:border-none print:text-black"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── EDUCATION & LANGUAGES ─── */}
        <section className="mt-8 print:mt-6">
          <div className="edu-lang-grid grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
            
            {/* Education */}
            <div className="job-block border-l border-white/10 pl-6 relative print:border-gray-200">
              <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent print:bg-black" />
              <h2 className="font-heading text-sm font-black uppercase tracking-wider text-white print:text-black mb-2">
                Education & Credentials
              </h2>
              <div>
                <h4 className="text-xs font-bold text-white print:text-black">
                  Creative Media Production & Digital Marketing
                </h4>
                <p className="text-xs text-white/50 print:text-black/60 mt-0.5">
                  Industry Certifications & Self-Taught Expert (Constant Learning)
                </p>
                <p className="text-[11px] text-white/30 print:text-black/40 mt-1">
                  Focus: High-Performance Media Orchestration, Video Strategy.
                </p>
              </div>
            </div>

            {/* Languages & Interests */}
            <div className="job-block border-l border-white/10 pl-6 relative print:border-gray-200">
              <div className="absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent print:bg-black" />
              <h2 className="font-heading text-sm font-black uppercase tracking-wider text-white print:text-black mb-2">
                Languages & Nationality
              </h2>
              <div className="text-xs text-white/70 print:text-black/80 space-y-1">
                <p>
                  <strong className="text-white print:text-black">Vietnamese:</strong> Native
                </p>
                <p>
                  <strong className="text-white print:text-black">English:</strong> Professional Working Proficiency
                </p>
                <p>
                  <strong className="text-white print:text-black">Nationality:</strong> Vietnamese
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ─── FOOTER LINK (Back to portfolio hint on printed page) ─── */}
        <div className="print-only hidden mt-8 pt-4 border-t border-gray-200 text-center text-[10px] text-black/50">
          This resume was compiled from Eddie&apos;s active portfolio at <strong className="text-black">{personalInfo.portfolioUrl}</strong>. Scan the QR code at the top to watch the dynamic showreels & check full case studies.
        </div>
      </div>
    </main>
  );
}
