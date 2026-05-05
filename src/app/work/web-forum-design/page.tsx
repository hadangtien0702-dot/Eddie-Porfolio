"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  webProjects as projects,
  webForumMeta as meta,
} from "@/data/work-web-forum-design";

export default function WebForumDesignPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-text-primary selection:bg-accent/30">
      {/* ─── Hero ─── */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-end overflow-hidden border-b border-white/5">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full opacity-50" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full opacity-50" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-20 pt-40">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-muted hover:text-accent transition-colors mb-16 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Index
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-accent" />
              <p className="font-mono text-accent tracking-[0.2em] text-[10px] uppercase">
                {meta.overline}
              </p>
            </div>
            <h1 className="font-heading font-bold leading-[1.05] tracking-tighter mb-8 max-w-4xl text-5xl md:text-7xl lg:text-8xl text-white">
              {meta.title}
            </h1>
            <p className="font-body text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed">
              {meta.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Premium Project Showcase ─── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-24">
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] bg-[#0a0a0a] border border-white/10 group"
            >
              {/* macOS Safari Header */}
              <div className="h-14 w-full bg-[#111111]/90 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-4 relative z-30">
                {/* Window Controls */}
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-white/20 group-hover:bg-[#ff5f56] transition-colors duration-300" />
                  <div className="w-3.5 h-3.5 rounded-full bg-white/20 group-hover:bg-[#ffbd2e] transition-colors duration-300 delay-75" />
                  <div className="w-3.5 h-3.5 rounded-full bg-white/20 group-hover:bg-[#27c93f] transition-colors duration-300 delay-150" />
                </div>
                
                {/* URL Bar */}
                <div className="flex-1 max-w-sm mx-auto bg-black/50 border border-white/5 h-8 rounded-md flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <span className="font-mono text-[10px] text-white/50 tracking-wider">
                    {project.url !== "#" ? project.url.replace("https://", "").replace(/\/$/, "") : "localhost:3000"}
                  </span>
                </div>
              </div>

              {/* Viewport */}
              <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] overflow-hidden bg-black cursor-ns-resize">
                {/* Background Image that scrolls */}
                <div className="absolute top-0 left-0 w-full h-[300%] group-hover:-translate-y-[66.66%] transition-transform duration-[12s] ease-in-out z-0">
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    quality={100}
                  />
                </div>

                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent z-10 pointer-events-none transition-opacity duration-700 opacity-90 group-hover:opacity-100" />

                {/* Text Overlay Box (Left Aligned) */}
                <div className="absolute inset-0 flex items-center z-20 pointer-events-none p-6 md:p-12 lg:p-16">
                  <div className="max-w-xl flex flex-col pointer-events-auto">
                    
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="font-mono text-[10px] px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20 uppercase tracking-widest backdrop-blur-md">
                        {project.type}
                      </span>
                      <span className="relative flex h-2 w-2">
                        {project.status === "Live" && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${project.status === "Live" ? "bg-green-500" : "bg-white/20"}`}></span>
                      </span>
                      <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
                        {project.status}
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-none drop-shadow-2xl">
                      {project.name}
                    </h2>
                    
                    <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-10 drop-shadow-lg">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-12">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-3 py-1.5 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-white/70 uppercase tracking-wider"
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
                        className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-[11px] rounded-full overflow-hidden w-fit transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          View Live Project
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Overlay Scrolling Indicator */}
                <div className="absolute bottom-8 right-8 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce text-accent">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Footer CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-24 rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden group border border-white/5 bg-white/[0.02]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <p className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4">
            Case studies in progress
          </p>
          <h3 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Detailed breakdowns coming soon
          </h3>
          <p className="font-body text-base text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
            The full UI/UX design process, architectural wireframes, and performance results for each project are currently being documented.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 bg-accent text-white shadow-[0_0_20px_rgba(255,64,0,0.3)] hover:shadow-[0_0_30px_rgba(255,64,0,0.6)]"
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
