"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  webProjects as projects,
} from "@/data/work-web-forum-design";

export default function WebForumDesignPage() {
  return (
    <main className="min-h-screen bg-primary text-text-primary">
      {/* ─── Hero ─── */}
      <section className="relative w-full min-h-[65vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent/8 blur-[160px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-16 pt-40">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-body text-sm text-text-muted hover:text-text-primary transition-colors mb-16"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Work
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-accent tracking-[0.2em] text-[11px] font-semibold uppercase mb-6">
              UI/UX & Web
            </p>
            <h1
              className="font-heading font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl"
              style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "#FBFBFB" }}
            >
              Web & Forum Design
            </h1>
            <p className="font-body text-[16px] text-text-secondary font-light max-w-2xl leading-relaxed">
              Designed and built polished digital experiences for brands — from corporate websites to community-driven platforms.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
      </section>

      {/* ─── Projects ─── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-20 pb-32">
        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* ── Text Side ── */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`col-span-1 md:col-span-5 flex flex-col order-2 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-body text-[11px] px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                      {project.type}
                    </span>
                    <span
                      className="font-body text-[11px] px-3 py-1 rounded-full"
                      style={{
                        background: project.status === "Live" ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.06)",
                        color: project.status === "Live" ? "#22c55e" : "rgba(255,255,255,0.4)",
                        border: `1px solid ${project.status === "Live" ? "rgba(34,197,94,0.25)" : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-[32px] md:text-[40px] text-text-primary mb-5 tracking-tight leading-tight">
                    {project.name}
                  </h2>
                  <p className="font-body text-[15px] text-text-secondary leading-relaxed mb-8 max-w-lg">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-[11px] px-3 py-1.5 rounded-full text-white/50 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.url !== "#" && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit flex items-center gap-2 font-body text-[13px] font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.03] group border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-white/10"
                    >
                      Visit Live Site
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  )}
                </motion.div>

                {/* ── Visual Browser Mockup Side ── */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className={`col-span-1 md:col-span-7 order-1 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                >
                  <div className="relative w-full rounded-[1.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] group border border-white/10 bg-[#121212]">
                    {/* macOS Window Header */}
                    <div className="h-12 w-full bg-[#1e1e1e] border-b border-white/5 flex items-center px-5 gap-2.5 relative">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                      
                      {/* URL Bar Hint */}
                      <div className="absolute left-1/2 -translate-x-1/2 bg-black/50 px-6 py-1.5 rounded-md text-[11px] font-body text-white/30 tracking-wider hidden md:block">
                        {project.url !== "#" ? project.url.replace("https://", "").replace(/\/$/, "") : "localhost:3000"}
                      </div>
                    </div>
                    
                    {/* Viewport with Hover-to-scroll mechanic */}
                    <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-black cursor-ns-resize">
                      <div className="absolute top-0 left-0 w-full h-[300%] group-hover:-translate-y-[66.66%] transition-transform duration-[8s] ease-in-out">
                        <Image
                          src={project.image}
                          alt={`${project.name} preview`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 60vw"
                        />
                      </div>
                      
                      {/* Overlay Indicator */}
                      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="font-body text-[11px] uppercase tracking-[0.2em] text-white/60 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
                          Scrolling...
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl p-12 md:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,64,0,0.08) 0%, rgba(255,64,0,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="font-body text-[11px] text-accent uppercase tracking-widest mb-4">
            Case studies in progress
          </p>
          <h3 className="font-heading text-[24px] md:text-[32px] font-bold text-text-primary mb-6">
            Detailed breakdowns coming soon
          </h3>
          <p className="font-body text-[14px] text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
            Full design process, wireframes, and results for each project are being documented. Interested now?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 font-body text-[13px] font-medium px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,64,0,0.12)",
              color: "#FF4000",
              border: "1px solid rgba(255,64,0,0.28)",
            }}
          >
            Get in touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
