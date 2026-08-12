"use client";

// ─── Resume ───
// Mô tả: Trang CV in được — screen giữ dark theme của site, print ra A4 1 trang nền trắng
// Nội dung qua 3 vòng review (19/7/2026): hội đồng 5 recruiter → QA panel 3 lens → content
// deep-review (hiring manager + performance recruiter + claim skeptic). Mọi con số đều
// truy được về nguồn công khai trong data/ — số không nguồn (500+, crew 6+) đã bị loại.
// Print scale: html 12px làm gốc rem, các rule px đè chi tiết.

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ArrowLeft,
  Palette,
  Video,
  Cpu,
} from "lucide-react";
// Printer icon + nút "Save PDF / Print" đã gỡ theo yêu cầu 12/08/2026 — người xem
// vẫn in được bằng Ctrl+P; 2 link "View ... Case Study" cũng gỡ cùng đợt.
import { contactData } from "@/data/contact";

export default function Resume() {
  const router = useRouter();

  const personalInfo = {
    fullName: "HA DANG TIEN (EDDIE)",
    headline: "Creative Production Team Lead | Performance Video Creative",
    phone: "+84 938 169 130",
    phoneHref: "tel:+84938169130",
    email: "hadangtien0702@gmail.com",
    location: "Ho Chi Minh City, Vietnam",
    // CV Full — portfolio chính (Vercel production domain); thay bằng hadangtien.com khi domain trỏ xong
    portfolioUrl: "hadangtien.vercel.app",
    portfolioHref: "https://hadangtien.vercel.app/",
    // CV Peak — case study Thinksmart chuyên sâu
    caseStudyUrl: "cv-media-lead.vercel.app",
    caseStudyHref: "https://cv-media-lead.vercel.app/",
  };

  // Số liệu resume — chỉ dùng số truy được về nguồn công khai (casestudy.ts, work-ai-applications.ts, social-post.ts)
  const keyStats = [
    { number: "-66%", label: "CPA on Paid Video" },
    { number: "100%", label: "Marketing Leads from Video" },
    { number: "15M+", label: "Organic Social Views" },
    { number: "-60%", label: "Content Production Cost via AI" },
    { number: "$6.2M", label: "Company Revenue Peak (2024)" },
  ];

  const jobs = [
    {
      title: "Head of Video Production / Performance Media Manager",
      company: "Thinksmart Insurance",
      dates: "2022 – Present",
      location: "Ho Chi Minh City",
      intro:
        "Joined in 2022 to build the media foundation for Thinksmart's insurance lead generation; promoted in 2023 to lead the full design and video production squad — creative direction, in-house studio operations, and high-volume paid-video workflows.",
      bullets: [
        {
          label: "Lead generation",
          text: "Lead the in-house media team whose ad creative generates 100% of the company's marketing leads for the Sales department.",
        },
        {
          label: "CPA reduction",
          text: "Cut CPA 66% from a $180–$200 peak through real-time campaign analysis with media buyers, rapid video-asset iteration, and structured A/B testing.",
        },
        {
          label: "Revenue contribution",
          text: "Scaled tested paid-acquisition hooks across Meta and TikTok, contributing to the company's record $6.2M revenue year in 2024.",
        },
        {
          label: "Visual identity",
          text: "Designed the brand system and asset guide for core insurance products (IUL, Max-Funded IUL, EBTP, Kaizen, Term Life), making complex financial concepts accessible to prospects.",
        },
      ],
    },
    {
      title: "Event Media Director",
      company: "Dream Talent",
      dates: "2022 – 2023",
      location: "Ho Chi Minh City",
      intro:
        "Directed creative coverage and brand storytelling for company events, recruitment films, and company-profile productions — from concept to final delivery.",
      bullets: [
        {
          label: "End-to-end production",
          text: "Ran production 100% in-house — pre-event scripting, multi-camera planning, lighting setup, and post-production — owning the entire pipeline from concept to final delivery.",
        },
        {
          label: "Rapid turnaround",
          text: "Delivered fully graded event highlight films within 48 hours of each flagship event — Year-End Party, Sports Day, annual team building.",
        },
        {
          label: "Team leadership",
          text: "Led the on-site media crew across camera, sound, and directing roles, coordinating simultaneous coverage of the company's flagship events.",
        },
      ],
    },
  ];

  const skillsData = [
    {
      category: "Creative & Strategy",
      icon: <Palette className="w-4 h-4 text-accent print:hidden" aria-hidden="true" />,
      items: [
        "Creative Direction",
        "Performance Video Strategy",
        "CPA & Conversion Optimization",
        "A/B Testing",
        "Concept Development",
      ],
    },
    {
      category: "Production & Platforms",
      icon: <Video className="w-4 h-4 text-accent print:hidden" aria-hidden="true" />,
      items: [
        "Video Editing (Premiere Pro, CapCut)",
        "Post-Production",
        "Studio Operations",
        "Multi-Camera Event Production",
        "Meta Ads",
        "TikTok Ads",
      ],
    },
    {
      category: "AI & Automation",
      icon: <Cpu className="w-4 h-4 text-accent print:hidden" aria-hidden="true" />,
      items: [
        "n8n Automation",
        "HeyGen (AI Avatars & Dubbing)",
        "ElevenLabs (Voice Cloning)",
        "AI UGC Pipelines",
        "Multilingual Ad Localization",
      ],
    },
  ];

  return (
    <main className="min-h-dvh bg-[#050505] text-white font-body selection:bg-accent selection:text-white print:bg-white print:text-black print:p-0">
      {/* ─── PRINT STYLES — light A4, 1 trang ───
          Scale: html 12px (rem gốc → Tailwind text-* co còn 75%), rule px đè cho từng khối.
          Đơn vị thống nhất px. Margin giấy 12/14mm — an toàn vùng không in của máy văn phòng. */}
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 12mm 14mm;
        }

        @media print {
          html,
          body,
          main {
            background: #ffffff !important;
            color: #141414 !important;
            font-size: 12px !important;
            line-height: 1.45 !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }

          .resume-container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          header {
            padding-bottom: 9px !important;
            border-bottom: 1px solid #e2e2e2 !important;
          }
          header h1 {
            font-size: 25px !important;
            margin-bottom: 3px !important;
            color: #111111 !important;
          }
          header .headline {
            font-size: 12px !important;
            letter-spacing: 0.12em !important;
            color: #d33500 !important;
          }

          .contact-bar {
            margin-top: 6px !important;
            padding-top: 6px !important;
            gap: 6px 16px !important;
            border-top: 1px solid #ececec !important;
            color: #333333 !important;
            font-size: 10px !important;
          }
          .contact-bar a,
          .contact-bar span {
            color: #333333 !important;
          }
          .contact-bar > *:not(:first-child)::before {
            content: "·";
            margin-right: 10px;
            color: #999999;
          }

          .section-title {
            font-size: 11.5px !important;
            letter-spacing: 0.08em !important;
            margin-bottom: 6px !important;
            padding-left: 8px !important;
            color: #111111 !important;
            border-left: 3px solid #d33500 !important;
          }

          section {
            margin-top: 10px !important;
          }
          section p {
            font-size: 11px !important;
            line-height: 1.45 !important;
            color: #2c2c2c !important;
            max-width: 95% !important;
          }

          .stat-card {
            padding: 7px 10px !important;
            border-radius: 4px !important;
            background: #ffffff !important;
            border: 1px solid #e4e4e4 !important;
          }
          .stat-number {
            font-size: 19px !important;
            margin-bottom: 2px !important;
            color: #d33500 !important;
          }
          .stat-label {
            font-size: 9px !important;
            letter-spacing: 0.03em !important;
            color: #4a4a4a !important;
          }

          .job-block {
            padding-left: 11px !important;
            border-left: 1px solid #e2e2e2 !important;
          }
          .job-block h3 {
            font-size: 12px !important;
            font-weight: 700 !important;
            color: #111111 !important;
          }
          .job-block .job-company {
            font-size: 10.5px !important;
            font-weight: 600 !important;
            color: #222222 !important;
          }
          .job-block .job-dates {
            font-size: 10px !important;
            color: #555555 !important;
          }
          .job-block ul {
            font-size: 10.5px !important;
            line-height: 1.45 !important;
            color: #333333 !important;
          }
          .job-block ul strong {
            color: #111111 !important;
          }
          .job-node {
            background: #d33500 !important;
          }

          .meta-block h2 {
            font-size: 11px !important;
            color: #111111 !important;
            margin-bottom: 5px !important;
          }
          .meta-block h3,
          .meta-block p {
            font-size: 10px !important;
            line-height: 1.4 !important;
            color: #333333 !important;
          }
          .meta-block strong {
            color: #111111 !important;
          }

          .skills-grid {
            gap: 8px !important;
          }
          .skill-block {
            padding: 8px 10px !important;
            border-radius: 4px !important;
            background: #ffffff !important;
            border: 1px solid #e4e4e4 !important;
          }
          .skill-block h3 {
            font-size: 9.5px !important;
            margin-bottom: 5px !important;
            padding-bottom: 3px !important;
            color: #111111 !important;
            border-bottom: 1px solid #ececec !important;
          }
          .skill-badge {
            font-size: 9px !important;
            padding: 2px 7px !important;
            background: #f3f3f3 !important;
            border: none !important;
            color: #222222 !important;
          }

          ul {
            margin-top: 2px !important;
          }
          li {
            margin-bottom: 3px !important;
          }

          a {
            color: #141414 !important;
            text-decoration: none !important;
          }
          .print-only a {
            text-decoration: underline !important;
            text-underline-offset: 2px;
          }

          .print-footer {
            font-size: 9.5px !important;
            margin-top: 12px !important;
            padding-top: 8px !important;
          }

          .job-block,
          .skill-block,
          .stat-card {
            page-break-inside: avoid !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* ─── SCREEN FLOATING CONTROLS ─── */}
      <div className="no-print fixed top-6 left-0 right-0 z-50 px-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex items-center justify-between w-full pointer-events-auto">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-[13px] font-medium cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-accent" aria-hidden="true" />
            <span>Back to Portfolio</span>
          </button>

        </div>
      </div>

      {/* ─── RESUME CONTENT ─── */}
      <div className="resume-container max-w-4xl mx-auto px-6 pt-28 pb-20 md:pb-32 relative z-10">
        {/* Glow ambient — screen only */}
        <div className="no-print absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        {/* ─── HEADER ─── */}
        <header className="border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end print:flex-row print:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 no-print">
                <span className="relative flex h-2 w-2">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
                  {contactData.availability}
                </span>
              </div>

              <h1 className="font-heading text-5xl md:text-6xl font-black tracking-tighter leading-none mb-3 text-white print:text-black">
                {personalInfo.fullName}
              </h1>
              <p className="headline font-mono text-xs md:text-sm font-bold text-accent uppercase tracking-widest">
                {personalInfo.headline}
              </p>
            </div>

            {/* Print-only: CV Full + CV Peak — hyperlink bấm được trong PDF */}
            <div className="print-only hidden text-left md:text-right print:text-right shrink-0">
              <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: "#555" }}>
                Portfolio & Case Studies
              </p>
              <p className="text-[10px] font-semibold mt-1">
                <a href={personalInfo.portfolioHref}>Portfolio: {personalInfo.portfolioUrl}</a>
              </p>
              <p className="text-[10px] font-semibold" style={{ marginTop: "2px" }}>
                <a href={personalInfo.caseStudyHref}>Case Study: {personalInfo.caseStudyUrl}</a>
              </p>
            </div>
          </div>

          {/* Contact bar */}
          <div className="contact-bar flex flex-wrap items-center gap-y-2 gap-x-6 mt-6 pt-6 border-t border-white/5 text-xs text-white/70 print:text-black">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors duration-200"
            >
              <Mail className="w-3.5 h-3.5 text-accent no-print" aria-hidden="true" />
              <span>{personalInfo.email}</span>
            </a>
            <a
              href={personalInfo.phoneHref}
              className="flex items-center gap-2 hover:text-white transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-accent no-print" aria-hidden="true" />
              <span>{personalInfo.phone}</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-accent no-print" aria-hidden="true" />
              <span>{personalInfo.location}</span>
            </span>
            {/* Portfolio URL: screen-only ở contact bar — bản in đã có ở góc phải + footer */}
            <a
              href={personalInfo.portfolioHref}
              target="_blank"
              rel="noopener noreferrer"
              className="no-print flex items-center gap-2 hover:text-white transition-colors duration-200"
            >
              <Globe className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>{personalInfo.portfolioUrl}</span>
            </a>
          </div>
        </header>

        {/* ─── SUMMARY ─── */}
        <section className="mt-8">
          <h2 className="section-title font-heading text-lg font-black uppercase tracking-wider text-white print:text-black mb-3 border-l-2 border-accent pl-3">
            Summary
          </h2>
          <p className="text-sm md:text-[15px] text-white/75 leading-relaxed print:text-black/80">
            Creative production lead who builds in-house video teams, studios, and workflows that
            turn short-form video into measurable growth. At Thinksmart Insurance, video creative
            sources 100% of marketing leads and has cut CPA 66% from a $180–$200 peak. Also designs
            AI-assisted production pipelines (n8n, HeyGen, ElevenLabs) that tripled content output
            and cut production costs about 60% across multilingual markets.
          </p>
        </section>

        {/* ─── KEY ACHIEVEMENTS ─── */}
        <section className="mt-8">
          <h2 className="section-title font-heading text-lg font-black uppercase tracking-wider text-white print:text-black mb-4 border-l-2 border-accent pl-3">
            Key Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 print:grid-cols-5 print:gap-2">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col justify-between"
              >
                <span className="stat-number font-mono text-3xl font-black text-accent leading-none mb-1">
                  {stat.number}
                </span>
                <span className="stat-label font-body text-[11px] text-white/60 uppercase tracking-wider leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PROFESSIONAL EXPERIENCE ─── */}
        <section className="mt-8">
          <h2 className="section-title font-heading text-lg font-black uppercase tracking-wider text-white print:text-black mb-6 border-l-2 border-accent pl-3">
            Professional Experience
          </h2>

          <div className="space-y-8 print:space-y-4">
            {jobs.map((job) => (
              <div key={job.company} className="job-block border-l border-white/10 pl-6 relative">
                <div className="job-node absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white print:text-black">{job.title}</h3>
                    <p className="job-company text-sm text-white/70 print:text-black font-semibold">
                      {job.company}
                    </p>
                  </div>
                  <div className="job-dates text-right sm:text-right text-xs font-mono text-accent">
                    {job.dates} | {job.location}
                  </div>
                </div>

                <p className="text-sm text-white/80 print:text-black/80 leading-relaxed mb-3 font-medium">
                  {job.intro}
                </p>

                <ul className="list-disc list-outside ml-4 text-xs md:text-sm text-white/70 space-y-1.5 print:text-black/80">
                  {job.bullets.map((b) => (
                    <li key={b.label}>
                      <strong className="text-white print:text-black font-semibold">
                        {b.label}:
                      </strong>{" "}
                      {b.text}
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>
        </section>

        {/* ─── SKILLS ─── */}
        <section className="mt-8">
          <h2 className="section-title font-heading text-lg font-black uppercase tracking-wider text-white print:text-black mb-4 border-l-2 border-accent pl-3">
            Skills
          </h2>

          <div className="skills-grid grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3">
            {skillsData.map((category) => (
              <div
                key={category.category}
                className="skill-block bg-white/[0.01] border border-white/5 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                  {category.icon}
                  <h3 className="font-heading text-sm font-bold text-white print:text-black uppercase tracking-wider">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="skill-badge font-body text-xs bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CURRENTLY BUILDING: AIO STUDIO ───
            Screen-only (no-print): bản in giữ kỷ luật 1 trang A4 cho recruiter.
            Số liệu 14s / 28,800+ đo thật từ AiO Studio (tài liệu AiO MVP, đo 07-08/2026).
            Ảnh: public/images/resume/aio-welcome.webp (nén từ AiO Design System/AiO WELCOME). */}
        <section className="mt-8 no-print">
          <h2 className="section-title font-heading text-lg font-black uppercase tracking-wider text-white mb-3 border-l-2 border-accent pl-3">
            Currently Building — AiO Studio
          </h2>
          <p className="text-sm md:text-[15px] text-white/75 leading-relaxed">
            A.I already saves editors time.{" "}
            <strong className="text-white">AiO Studio saves even more</strong> — a tool suite that
            runs natively inside the editing software and quietly handles the repetitive work:
            cutting silences, typing subtitles, hunting for files, reframing for every platform.
          </p>

          <div className="mt-5 rounded-xl overflow-hidden border border-white/10">
            <Image
              src="/images/resume/aio-welcome.webp"
              width={1600}
              height={1207}
              alt="AiO Studio welcome screen — 8 tools for video editors"
              className="w-full h-auto block"
            />
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2.5 mt-6 list-none">
            {[
              { name: "Auto Silent Cut", desc: "finds and removes silences right on the timeline" },
              { name: "Auto Transcripts", desc: "turns a 60-minute video into text in 14 seconds" },
              { name: "Asset Manager", desc: "28,800+ assets with instant preview, drag & drop" },
              { name: "Power Bins", desc: "brand kit that follows every new project" },
              { name: "Auto Podcast", desc: "multi-cam edit that cuts to whoever is speaking" },
              { name: "Auto Reframes", desc: "horizontal to vertical — subject always in frame" },
              { name: "Auto Short Clip", desc: "extracts highlight moments into short videos" },
              { name: "Sound Design", desc: "music that ducks under voices, synced to the beat" },
            ].map((t) => (
              <li key={t.name} className="flex items-baseline gap-2.5 text-[13px] text-white/65 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 translate-y-[-2px]" aria-hidden="true" />
                <span>
                  <strong className="text-white font-bold">{t.name}</strong>
                  {" — "}
                  {t.desc}
                </span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            {[
              { title: "Runs inside the editing software", desc: "no exporting, no uploading footage to the web" },
              { title: "100% on-device processing", desc: "client footage never leaves the machine" },
              { title: "No per-minute limits", desc: "unlike web tools that charge for every minute" },
            ].map((p) => (
              <div key={p.title} className="border border-white/10 rounded-lg px-4 py-3.5 bg-white/[0.02]">
                <p className="text-[12.5px] font-bold text-white leading-snug">{p.title}</p>
                <p className="text-[11.5px] text-white/50 leading-snug mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── EDUCATION & LANGUAGES ─── */}
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
            <div className="meta-block border-l border-white/10 pl-6">
              <h2 className="font-heading text-sm font-black uppercase tracking-wider text-white print:text-black mb-2">
                Education
              </h2>
              <div>
                <h3 className="text-xs font-bold text-white print:text-black">
                  Self-Directed Professional Education
                </h3>
                <p className="text-xs text-white/60 print:text-black/70 mt-0.5">
                  Performance marketing, video production & AI-assisted workflows
                </p>
                <p className="text-[11px] text-white/60 print:text-black/70 mt-1">
                  Focus: performance video strategy and AI-assisted production workflows — applied
                  directly in the Thinksmart systems above.
                </p>
              </div>
            </div>

            <div className="meta-block border-l border-white/10 pl-6">
              <h2 className="font-heading text-sm font-black uppercase tracking-wider text-white print:text-black mb-2">
                Languages
              </h2>
              <div className="text-xs text-white/75 print:text-black/80 space-y-1">
                <p>
                  <strong className="text-white print:text-black">Vietnamese:</strong> Native
                </p>
                <p>
                  <strong className="text-white print:text-black">English:</strong> Professional
                  Working Proficiency
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRINT FOOTER ─── */}
        <div
          className="print-footer print-only hidden mt-8 pt-3 text-center text-[9px]"
          style={{ borderTop: "1px solid #ececec", color: "#555" }}
        >
          Portfolio:{" "}
          <a href={personalInfo.portfolioHref}>
            <strong>{personalInfo.portfolioUrl}</strong>
          </a>{" "}
          · Case study:{" "}
          <a href={personalInfo.caseStudyHref}>
            <strong>{personalInfo.caseStudyUrl}</strong>
          </a>
        </div>
      </div>
    </main>
  );
}
