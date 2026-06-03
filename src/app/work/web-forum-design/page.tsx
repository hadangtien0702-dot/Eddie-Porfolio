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
      {/* ─── Premium Immersive Hero ─── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden border-b border-white/5 pt-20 pb-16">
        
        {/* Navigation / Back Button - Absolute Top */}
        <div className="absolute top-8 left-6 md:left-12 lg:left-16 z-50">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/40 hover:text-white transition-colors group bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Index
          </Link>
        </div>

        {/* Deep dark space background with glowing particles */}
        <div className="absolute inset-0 pointer-events-none bg-[#020202]">
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
          
          {/* Glows */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full opacity-30 mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-[#c40000]/10 blur-[180px] rounded-full opacity-40 mix-blend-screen" />
          
          {/* Floating constellation lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20%" cy="30%" r="1.5" fill="#fff" />
            <circle cx="80%" cy="20%" r="2" fill="#c40000" />
            <circle cx="70%" cy="80%" r="1.5" fill="#fff" />
            <circle cx="30%" cy="70%" r="2" fill="#fff" />
            <path d="M 20% 30% L 30% 70%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <path d="M 80% 20% L 70% 80%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full mt-12">
          
          {/* Left Text Block */}
          <motion.div 
            className="lg:col-span-3 flex flex-col justify-center h-full relative z-30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6 hidden md:flex">
              <span className="w-8 h-[1px] bg-accent" />
              <p className="font-mono text-accent tracking-[0.2em] text-[10px] uppercase">
                {meta.overline}
              </p>
            </div>
            
            <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-[6.5rem] leading-[0.9] tracking-tighter text-white mb-2 relative">
              <span className="absolute inset-0 text-white/5 blur-[2px] pointer-events-none">Web & <br/> Forum <br/> Design.</span>
              <span className="relative drop-shadow-2xl">Web & <br/> Forum <br/> Design.</span>
            </h1>
            
            <p className="font-body text-base text-white/50 mt-8 mb-10 leading-relaxed max-w-sm">
              Designing modern, responsive websites and forums that deliver seamless experiences and drive engagement.
            </p>

            <button 
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="group/scroll flex items-center justify-between w-fit gap-6 bg-[#111] hover:bg-white border border-white/10 hover:border-white rounded-full px-6 py-3 transition-all duration-500"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/80 font-bold group-hover/scroll:text-black transition-colors duration-500">View Projects</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover/scroll:text-accent group-hover/scroll:translate-x-1 transition-all duration-300">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </motion.div>

          {/* Center Floating Composition */}
          <div className="lg:col-span-6 h-[600px] lg:h-[700px] relative w-full perspective-1000 z-20 flex items-center justify-center">
            
            {/* Dark Mobile Frame (Center Base) */}
            <motion.div
              className="absolute w-[240px] md:w-[280px] h-[480px] md:h-[560px] bg-[#0a0a0a] rounded-[2.5rem] md:rounded-[3rem] border-[4px] border-[#1a1a1a] shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden z-10"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ rotateY: -15, rotateX: 10, rotateZ: 5 }}
              animate={{ 
                y: [0, -20, 0],
                rotateY: [-15, -10, -15],
                rotateX: [10, 15, 10]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              {/* Internal Mockup Content */}
              <div className="w-full h-full p-4 md:p-5 flex flex-col gap-4 relative">
                <div className="w-1/3 h-5 bg-[#1a1a1a] rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 z-20" />
                
                <div className="mt-8 flex justify-between items-center px-2">
                  <div className="w-6 h-6 rounded-full bg-white/5" />
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  </div>
                </div>
                
                <div className="w-full h-32 md:h-40 bg-white/5 rounded-2xl flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 mb-2 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-accent border-b-[4px] border-b-transparent ml-1" />
                  </div>
                  <div className="w-1/2 h-2 bg-white/20 rounded-full" />
                  <div className="w-3/4 h-2 bg-white/10 rounded-full" />
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-1 h-24 md:h-28 bg-white/5 rounded-xl flex items-end p-3"><div className="w-full h-2 bg-white/10 rounded-full" /></div>
                  <div className="flex-1 h-24 md:h-28 bg-white/5 rounded-xl flex items-end p-3"><div className="w-full h-2 bg-white/10 rounded-full" /></div>
                </div>
                
                <div className="w-full flex-1 bg-white/5 rounded-xl flex flex-col justify-end p-4">
                  <div className="w-2/3 h-2 bg-white/20 rounded-full mb-2" />
                  <div className="w-1/3 h-2 bg-white/10 rounded-full" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </motion.div>

            {/* ThinkSmart Colors Card (Top Left) */}
            <motion.div
              className="absolute top-[0%] left-[0%] lg:top-[5%] lg:left-[0%] w-[260px] md:w-[320px] bg-white rounded-3xl p-4 md:p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-30 transform -rotate-6"
              animate={{ y: [0, -15, 0], rotate: [-6, -4, -6] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-black/40 font-bold">ThinkSmart Colors</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#c40000]" />
                  <div className="w-2 h-2 rounded-full bg-[#32373c]" />
                  <div className="w-2 h-2 rounded-full bg-[#f4f4f4] border border-black/10" />
                </div>
              </div>
              <div className="flex gap-2 md:gap-3 h-16 md:h-20">
                <div className="flex-[2] bg-[#c40000] rounded-xl flex items-end p-2 md:p-3 relative overflow-hidden">
                  <span className="font-mono text-[7px] md:text-[8px] text-white">#C40000</span>
                </div>
                <div className="flex-1 bg-[#32373c] rounded-xl flex items-end p-2 md:p-3">
                  <span className="font-mono text-[7px] md:text-[8px] text-white/50">#32373C</span>
                </div>
                <div className="flex-1 bg-[#f4f4f4] border border-black/5 rounded-xl flex items-end p-2 md:p-3">
                  <span className="font-mono text-[7px] md:text-[8px] text-black/30">#F4F4</span>
                </div>
                <div className="flex-1 bg-white border border-black/10 rounded-xl flex items-end p-2 md:p-3">
                  <span className="font-mono text-[7px] md:text-[8px] text-black/30">#FFF</span>
                </div>
              </div>
            </motion.div>

            {/* ThinkSmart Buttons Card (Middle Left) */}
            <motion.div
              className="absolute top-[35%] lg:top-[40%] left-[-10%] lg:left-[-12%] w-[220px] md:w-[280px] bg-white/95 backdrop-blur-xl rounded-3xl p-4 md:p-5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-40 transform -rotate-3"
              animate={{ y: [0, -10, 0], rotate: [-3, -1, -3] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-black/40 font-bold mb-3 md:mb-4 block">ThinkSmart Buttons</span>
              <div className="flex flex-col gap-2 md:gap-3">
                <button className="w-full py-2.5 md:py-3 bg-[#c40000] rounded-full text-white font-bold text-[9px] md:text-[10px] uppercase tracking-wider shadow-[0_4px_15px_rgba(196,0,0,0.3)]">Get a Quote</button>
                <button className="w-full py-2.5 md:py-3 bg-[#f4f4f4] rounded-full text-black font-bold text-[9px] md:text-[10px] uppercase tracking-wider">Learn More</button>
                <button className="w-full py-2.5 md:py-3 bg-white border border-black/10 border-dashed rounded-full text-black/30 font-bold text-[9px] md:text-[10px] uppercase tracking-wider" disabled>Disabled</button>
              </div>
            </motion.div>

            {/* DreamTalent Type Card (Bottom Left/Center) */}
            <motion.div
              className="absolute bottom-[5%] lg:bottom-[10%] left-[5%] lg:left-[5%] w-[260px] md:w-[320px] bg-[#0c0c0c] border border-white/10 rounded-3xl p-4 md:p-5 shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-30 transform rotate-6"
              animate={{ y: [0, -12, 0], rotate: [6, 8, 6] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.5 }}
            >
              <div className="flex items-center gap-3 md:gap-4 border-b border-white/10 pb-3 md:pb-4 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#9b51e0] to-[#ff6900] flex items-center justify-center text-white font-sans text-lg md:text-xl font-bold">Aa</div>
                <div>
                  <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-widest text-white/40 block mb-0.5 md:mb-1">DreamTalent Type</span>
                  <span className="text-white font-bold font-sans tracking-tight text-sm md:text-base">Montserrat</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-white font-bold text-xl md:text-2xl font-sans">Header 1</span>
                  <span className="font-mono text-[7px] md:text-[8px] text-white/30">72px / Bold</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-white/80 font-bold text-base md:text-lg font-sans">Header 2</span>
                  <span className="font-mono text-[7px] md:text-[8px] text-white/30">48px / Semibold</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-white/50 text-xs md:text-sm font-sans">Body Text</span>
                  <span className="font-mono text-[7px] md:text-[8px] text-white/30">16px / Regular</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Text Block */}
          <motion.div 
            className="lg:col-span-3 flex flex-col justify-center h-full relative z-30 text-left lg:text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-4">UI/UX & Web</p>
            <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-[4rem] leading-[0.9] tracking-tighter text-white mb-6">
              DIGITAL<br className="hidden lg:block"/> PLATFORMS
            </h2>
            <p className="font-body text-sm text-white/50 mb-10 max-w-[280px] lg:ml-auto">
              Designing and building seamless user interfaces for polished websites and digital forums.
            </p>

            {/* Stats */}
            <div className="flex flex-col gap-6 items-start lg:items-end lg:ml-auto">
              <div className="flex items-center gap-4 flex-row-reverse lg:flex-row">
                <div className="text-left lg:text-right">
                  <span className="block text-white font-bold font-mono text-lg">50+</span>
                  <span className="block text-[9px] text-white/40 uppercase tracking-wider">Projects Completed</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-white/50 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-row-reverse lg:flex-row">
                <div className="text-left lg:text-right">
                  <span className="block text-white font-bold font-mono text-lg">30+</span>
                  <span className="block text-[9px] text-white/40 uppercase tracking-wider">Happy Clients</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-white/50 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-row-reverse lg:flex-row">
                <div className="text-left lg:text-right">
                  <span className="block text-white font-bold font-mono text-lg">5+</span>
                  <span className="block text-[9px] text-white/40 uppercase tracking-wider">Years Experience</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 text-white/50 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── Premium Project Showcase ─── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-24">
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, idx) => {
            const isThinkSmart = project.name.includes("ThinkSmart");

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="mb-40 flex flex-col gap-24 relative"
              >
                {/* ─── 01. PROJECT OVERVIEW ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  <div className="lg:col-span-8 flex flex-col">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="font-mono text-[10px] px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20 uppercase tracking-widest backdrop-blur-md">
                        Case Study 0{idx + 1}
                      </span>
                      <span className="font-mono text-[10px] px-3 py-1.5 rounded-full bg-white/5 text-white/70 border border-white/10 uppercase tracking-widest">
                        {project.type}
                      </span>
                      <span className="relative flex h-2 w-2 ml-2">
                        {project.status === "Live" && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${project.status === "Live" ? "bg-green-500" : "bg-white/20"}`}></span>
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-5xl md:text-7xl text-white mb-6 tracking-tight leading-none drop-shadow-2xl">
                      {project.name}
                    </h2>
                    
                    <p className="font-body text-xl md:text-2xl text-white/70 leading-relaxed mb-10 font-light">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-4 py-2 rounded-md bg-[#111] border border-white/10 text-white/70 uppercase tracking-wider"
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
                        className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-[11px] rounded-full overflow-hidden w-fit transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Visit Live Website
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                      </a>
                    )}
                  </div>
                  
                  <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] flex flex-col gap-6">
                    <div>
                      <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Role</h4>
                      <p className="text-white font-medium">Lead UI/UX Designer, Frontend Developer</p>
                    </div>
                    <div className="w-full h-[1px] bg-white/5" />
                    <div>
                      <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Platform</h4>
                      <p className="text-white font-medium">Responsive Web (Desktop & Mobile)</p>
                    </div>
                    <div className="w-full h-[1px] bg-white/5" />
                    <div>
                      <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">The Challenge</h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {isThinkSmart 
                          ? "Transforming a traditional insurance brand into a modern, trust-building digital platform that converts visitors into leads seamlessly."
                          : "Creating an energetic, bold, and highly visual portfolio platform for talent and entertainment acts to stand out."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ─── 02. DESIGN SYSTEM ─── */}
                <div className="w-full bg-[#050505] border border-white/5 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
                   
                   <div className="flex items-center gap-4 mb-16 relative z-10">
                     <span className="w-12 h-[1px] bg-white/20" />
                     <h3 className="font-mono text-[12px] text-white/60 uppercase tracking-[0.3em]">01 / Design System</h3>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                      {/* Colors */}
                      <div>
                        <h4 className="font-heading text-2xl md:text-3xl font-bold text-white mb-8">Color Palette</h4>
                        {isThinkSmart ? (
                          <div className="flex flex-col gap-4">
                            <div className="w-full h-32 rounded-2xl bg-[#c40000] shadow-[0_20px_50px_rgba(196,0,0,0.2)] flex items-end p-5 transition-transform hover:-translate-y-2 cursor-crosshair">
                              <div className="w-full flex justify-between items-center text-white">
                                <span className="font-bold text-lg">Primary Red</span>
                                <span className="font-mono text-sm opacity-80">#C40000</span>
                              </div>
                            </div>
                            <div className="flex gap-4 h-24">
                              <div className="flex-1 rounded-2xl bg-[#32373c] border border-white/10 flex items-end p-4 transition-transform hover:-translate-y-2 cursor-crosshair">
                                <span className="font-mono text-[10px] text-white/80">#32373C</span>
                              </div>
                              <div className="flex-1 rounded-2xl bg-[#f4f4f4] border border-black/10 flex items-end p-4 transition-transform hover:-translate-y-2 cursor-crosshair">
                                <span className="font-mono text-[10px] text-black/80">#F4F4F4</span>
                              </div>
                              <div className="flex-1 rounded-2xl bg-[#ffffff] border border-black/10 flex items-end p-4 transition-transform hover:-translate-y-2 cursor-crosshair">
                                <span className="font-mono text-[10px] text-black/80">#FFFFFF</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-4">
                            <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-[#9b51e0] to-[#ff6900] shadow-[0_20px_50px_rgba(155,81,224,0.3)] flex items-end p-5 transition-transform hover:-translate-y-2 cursor-crosshair">
                              <div className="w-full flex justify-between items-center text-white">
                                <span className="font-bold text-lg">Brand Gradient</span>
                                <span className="font-mono text-sm opacity-80">Linear 135deg</span>
                              </div>
                            </div>
                            <div className="flex gap-4 h-24">
                              <div className="flex-1 rounded-2xl bg-[#111111] border border-white/10 flex items-end p-4 transition-transform hover:-translate-y-2 cursor-crosshair">
                                <span className="font-mono text-[10px] text-white/80">#111111</span>
                              </div>
                              <div className="flex-1 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-end p-4 transition-transform hover:-translate-y-2 cursor-crosshair">
                                <span className="font-mono text-[10px] text-white/80">#1A1A1A</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Typography */}
                      <div>
                        <h4 className="font-heading text-2xl md:text-3xl font-bold text-white mb-8">Typography</h4>
                        <div className="w-full h-full min-h-[240px] rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 flex flex-col justify-center">
                           <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                             <div className="flex items-baseline gap-4">
                               <span className={`text-6xl text-white ${isThinkSmart ? 'font-sans' : 'font-sans font-black tracking-tighter'}`}>Aa</span>
                               <span className={`text-2xl text-white/50 ${isThinkSmart ? 'font-sans' : 'font-sans font-medium'}`}>Bb</span>
                             </div>
                             <div className="text-right">
                               <p className="text-white font-bold text-lg">{isThinkSmart ? 'Roboto' : 'Montserrat'}</p>
                               <p className="font-mono text-[10px] text-accent uppercase">{isThinkSmart ? 'Primary Typeface' : 'Display Typeface'}</p>
                             </div>
                           </div>
                           
                           <div className="space-y-4">
                             <div className="flex items-center justify-between">
                               <span className={`text-3xl text-white ${isThinkSmart ? 'font-bold' : 'font-black tracking-tight'}`}>Heading 1</span>
                               <span className="font-mono text-[10px] text-white/40">72px / {isThinkSmart ? 'Bold' : 'Black'}</span>
                             </div>
                             <div className="flex items-center justify-between">
                               <span className={`text-xl text-white/80 ${isThinkSmart ? 'font-medium' : 'font-bold'}`}>Heading 2</span>
                               <span className="font-mono text-[10px] text-white/40">48px / {isThinkSmart ? 'Medium' : 'Bold'}</span>
                             </div>
                             <div className="flex items-center justify-between">
                               <span className="text-base text-white/60">Body text paragraphs</span>
                               <span className="font-mono text-[10px] text-white/40">16px / Regular</span>
                             </div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>

                {/* ─── 03. WIREFRAME & COMPONENTS ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                   <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-10 flex flex-col">
                     <div className="mb-10">
                       <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">02 / User Interface</h4>
                       <h3 className="font-heading text-2xl font-bold text-white">Component System</h3>
                     </div>
                     <div className="flex-1 flex flex-col justify-center gap-6">
                        {isThinkSmart ? (
                          <>
                            {/* ThinkSmart Buttons */}
                            <div className="flex flex-wrap gap-4">
                              <button className="px-8 py-3 rounded-full text-[11px] font-bold text-white uppercase tracking-wider bg-[#c40000] hover:bg-[#a00000] shadow-[0_4px_15px_rgba(196,0,0,0.3)] transition-all">Get a Quote</button>
                              <button className="px-8 py-3 rounded-full text-[11px] font-bold text-white uppercase tracking-wider bg-[#32373c] hover:bg-[#202326] transition-colors">Learn More</button>
                            </div>
                            {/* ThinkSmart Form Card */}
                            <div className="w-full bg-gradient-to-br from-[#F8BBD0] via-[#FF9595] to-[#F37878] rounded-2xl p-6 flex flex-col gap-4 shadow-xl relative overflow-hidden">
                              <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                              </div>
                              <h5 className="text-white font-bold text-sm relative z-10">Kiểm tra sức khoẻ tài chính</h5>
                              <div className="w-full h-10 border border-white/20 rounded-md bg-white/10 backdrop-blur-sm px-3 flex items-center relative z-10">
                                <span className="text-[10px] text-white/90">Họ và tên</span>
                              </div>
                              <div className="w-full h-10 border border-white/20 rounded-md bg-white/10 backdrop-blur-sm px-3 flex items-center relative z-10">
                                <span className="text-[10px] text-white/90">Số điện thoại</span>
                              </div>
                              <button className="w-full h-10 rounded-full bg-[#c40000] text-white text-[10px] font-bold uppercase tracking-wider mt-2 relative z-10 hover:bg-[#a00000] transition-colors">Gửi ngay</button>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* DreamTalent Buttons */}
                            <div className="flex flex-wrap gap-4">
                              <button className="relative px-8 py-3 rounded-full text-[11px] font-bold text-white uppercase tracking-wider overflow-hidden group/btn">
                                <span className="absolute inset-0 bg-gradient-to-r from-[#9b51e0] to-[#ff6900] transition-transform group-hover/btn:scale-110" />
                                <span className="relative z-10">Book Artist</span>
                              </button>
                              <button className="px-8 py-3 rounded-full text-[11px] font-bold text-white uppercase tracking-wider border border-white/20 hover:bg-white/10 transition-colors">View Roster</button>
                            </div>
                            {/* DreamTalent Artist Profile Card */}
                            <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 flex gap-4 items-center shadow-2xl relative overflow-hidden group/card">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#9b51e0]/10 to-[#ff6900]/10 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#222] border border-white/5 relative z-10 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=500&q=80" alt="Artist" className="w-full h-full object-cover" />
                              </div>
                              <div className="relative z-10 flex-1">
                                <h4 className="text-white font-bold text-sm mb-1">DJ Martin</h4>
                                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2">Electronic Producer</p>
                                <div className="flex gap-2">
                                  <span className="px-2 py-1 bg-white/5 rounded text-[8px] text-white/70 border border-white/10">House</span>
                                  <span className="px-2 py-1 bg-white/5 rounded text-[8px] text-white/70 border border-white/10">Techno</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                     </div>
                   </div>

                   <div className="bg-[#050505] border border-white/5 rounded-[2rem] p-10 flex flex-col relative overflow-hidden">
                     {/* Decorative grid */}
                     <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                     <div className="relative z-10 mb-10">
                       <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">03 / Architecture</h4>
                       <h3 className="font-heading text-2xl font-bold text-white">Wireframing</h3>
                     </div>
                     <div className="relative z-10 flex-1 flex items-center justify-center min-h-[280px]">
                       {/* Wireframe Mockup based on project type */}
                       {isThinkSmart ? (
                         <div className="relative w-full h-full flex items-center justify-center">
                           {/* Left Card (Mobile) */}
                           <div className="absolute left-0 md:left-4 w-[140px] aspect-[9/16] border border-white/10 rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col scale-[0.85] opacity-50 z-0 transform -translate-x-10 md:-translate-x-16 transition-all duration-500 hover:opacity-100 hover:scale-90 hover:z-30">
                             <div className="w-full h-8 border-b border-black/10 flex items-center px-3 gap-2">
                               <div className="w-4 h-4 rounded-full bg-[#c40000]/20" />
                               <div className="flex-1 h-1.5 bg-black/10 rounded-sm" />
                             </div>
                             <div className="flex-1 p-3 flex flex-col gap-2">
                               <div className="w-full h-16 bg-[#f4f4f4] rounded-lg" />
                               <div className="w-3/4 h-2 bg-black/20 rounded-sm mx-auto" />
                               <div className="w-full h-8 bg-black/5 rounded-md mt-2" />
                               <div className="w-full h-8 bg-black/5 rounded-md" />
                             </div>
                           </div>

                           {/* Center Card (Desktop Main) */}
                           <div className="relative w-[90%] max-w-[340px] aspect-[4/3] border-2 border-white/10 rounded-xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-20">
                             {/* Sticky Header */}
                             <div className="w-full h-10 bg-white border-b border-black/10 flex justify-between items-center px-4 sticky top-0 z-20 shadow-sm">
                               <div className="w-16 h-4 bg-[#c40000] rounded-sm" />
                               <div className="flex gap-2">
                                 <div className="w-6 h-1.5 bg-black/20 rounded-sm" />
                                 <div className="w-6 h-1.5 bg-black/20 rounded-sm" />
                                 <div className="w-6 h-1.5 bg-black/20 rounded-sm" />
                               </div>
                             </div>
                             {/* Hero Banner */}
                             <div className="w-full h-28 bg-[#f4f4f4] relative flex items-center px-4">
                               <div className="w-1/2 flex flex-col gap-2 relative z-10">
                                 <div className="w-3/4 h-3 bg-black/80 rounded-sm" />
                                 <div className="w-full h-2 bg-black/40 rounded-sm" />
                                 <div className="w-5/6 h-2 bg-black/40 rounded-sm" />
                                 <div className="w-16 h-5 mt-1 bg-[#c40000] rounded-full" />
                               </div>
                               <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-50 bg-[url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80')] bg-cover bg-center [mask-image:linear-gradient(to_left,black,transparent)]" />
                             </div>
                             {/* Content Section */}
                             <div className="flex-1 p-4 bg-white flex flex-col gap-3">
                               <div className="w-1/3 h-2.5 bg-black/80 rounded-sm mx-auto mb-2" />
                               <div className="grid grid-cols-3 gap-2">
                                 <div className="h-16 border border-black/10 rounded-lg bg-black/5 flex flex-col items-center justify-center gap-1.5">
                                   <div className="w-5 h-5 rounded-full bg-[#c40000]/20" />
                                   <div className="w-10 h-1.5 bg-black/20 rounded-sm" />
                                 </div>
                                 <div className="h-16 border border-black/10 rounded-lg bg-black/5 flex flex-col items-center justify-center gap-1.5">
                                   <div className="w-5 h-5 rounded-full bg-[#c40000]/20" />
                                   <div className="w-10 h-1.5 bg-black/20 rounded-sm" />
                                 </div>
                                 <div className="h-16 border border-black/10 rounded-lg bg-black/5 flex flex-col items-center justify-center gap-1.5">
                                   <div className="w-5 h-5 rounded-full bg-[#c40000]/20" />
                                   <div className="w-10 h-1.5 bg-black/20 rounded-sm" />
                                 </div>
                               </div>
                             </div>
                           </div>

                           {/* Right Card (Tablet) */}
                           <div className="absolute right-0 md:right-4 w-[220px] aspect-[4/3] border border-white/10 rounded-xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col scale-[0.85] opacity-50 z-10 transform translate-x-10 md:translate-x-16 transition-all duration-500 hover:opacity-100 hover:scale-95 hover:z-30 overflow-hidden">
                              <div className="w-full h-8 bg-[#c40000] flex justify-between items-center px-3">
                                <div className="w-10 h-2 bg-white/50 rounded-sm" />
                                <div className="w-4 h-4 rounded bg-white/20" />
                              </div>
                              <div className="flex-1 p-3 flex gap-3">
                                <div className="flex-1 flex flex-col gap-2">
                                  <div className="w-full h-12 bg-black/5 rounded" />
                                  <div className="w-full h-12 bg-black/5 rounded" />
                                </div>
                                <div className="w-1/3 flex flex-col gap-2">
                                  <div className="w-full h-full bg-black/5 rounded" />
                                </div>
                              </div>
                           </div>
                         </div>
                       ) : (
                         <div className="w-[80%] max-w-[300px] aspect-[9/16] border border-white/20 rounded-[2rem] p-4 flex flex-col gap-4 bg-[#111] backdrop-blur-sm shadow-2xl overflow-hidden relative">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-2 relative z-10">
                              <span className="text-white font-black text-xs tracking-tighter">DREAM TALENT</span>
                              <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
                              </div>
                            </div>
                            {/* Hero Image */}
                            <div className="w-full h-32 rounded-2xl border border-white/10 relative overflow-hidden z-10">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80" alt="Concert" className="absolute inset-0 w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
                                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
                                </div>
                              </div>
                            </div>
                            {/* Titles */}
                            <div className="relative z-10">
                              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] to-[#ff6900] font-black text-sm text-center">FEATURED ARTISTS</h2>
                              <p className="text-white/50 text-[8px] text-center mb-2">Discover the best talents in the industry.</p>
                            </div>
                            {/* Artist Grid */}
                            <div className="grid grid-cols-2 gap-3 flex-1 relative z-10">
                              <div className="rounded-xl border border-white/10 relative overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=200&q=80" alt="A" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white">DJ Martin</div>
                              </div>
                              <div className="rounded-xl border border-white/10 relative overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1520638012648-4cd82470725f?w=200&q=80" alt="A" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white">Alisa</div>
                              </div>
                              <div className="rounded-xl border border-white/10 relative overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80" alt="A" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white">The Band</div>
                              </div>
                              <div className="rounded-xl border border-white/10 relative overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=200&q=80" alt="A" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white">Vocalist</div>
                              </div>
                            </div>
                         </div>
                       )}
                     </div>
                   </div>
                </div>

                {/* ─── 04. HIGH FIDELITY MOCKUPS (DESKTOP & MOBILE) ─── */}
                <div className="w-full flex flex-col gap-6 pt-10">
                   <div className="flex items-center gap-4 mb-4">
                     <span className="w-12 h-[1px] bg-accent" />
                     <h3 className="font-mono text-[12px] text-accent uppercase tracking-[0.3em]">04 / High Fidelity</h3>
                   </div>
                   
                   <div className="flex flex-col xl:flex-row gap-8 items-start">
                     {/* Desktop Safari Mockup */}
                     <div className="relative w-full xl:w-3/4 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] bg-[#0a0a0a] border border-white/10 group">
                        {/* macOS Safari Header */}
                        <div className="h-14 w-full bg-[#111111]/90 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-4 relative z-30">
                          <div className="flex gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-white/20 group-hover:bg-[#ff5f56] transition-colors duration-300" />
                            <div className="w-3.5 h-3.5 rounded-full bg-white/20 group-hover:bg-[#ffbd2e] transition-colors duration-300 delay-75" />
                            <div className="w-3.5 h-3.5 rounded-full bg-white/20 group-hover:bg-[#27c93f] transition-colors duration-300 delay-150" />
                          </div>
                          <div className="flex-1 max-w-sm mx-auto bg-black/50 border border-white/5 h-8 rounded-md flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            <span className="font-mono text-[10px] text-white/50 tracking-wider">
                              {project.url !== "#" ? project.url.replace("https://", "").replace(/\/$/, "") : "localhost:3000"}
                            </span>
                          </div>
                        </div>

                        {/* Desktop Viewport */}
                        <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] overflow-hidden bg-[#111] cursor-ns-resize">
                          <div className="absolute top-0 left-0 w-full h-[300%] group-hover:-translate-y-[66.66%] transition-transform duration-[12s] ease-in-out z-0">
                            <Image
                              src={project.image}
                              alt={`${project.name} Desktop UI`}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 1200px) 100vw, 1200px"
                              quality={100}
                            />
                          </div>
                          {/* Scrolling Indicator */}
                          <div className="absolute bottom-8 right-8 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce text-accent">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                              </svg>
                            </div>
                          </div>
                        </div>
                     </div>

                     {/* Mobile iPhone Mockup */}
                     <div className="hidden md:block w-1/4 max-w-[320px] mx-auto xl:mx-0 relative rounded-[3rem] border-[8px] border-[#1A1A1A] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden group">
                        {/* iPhone Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#1A1A1A] rounded-b-xl z-30" />
                        
                        {/* Mobile Viewport */}
                        <div className="relative w-full aspect-[9/19] overflow-hidden bg-[#111] cursor-ns-resize">
                          <div className="absolute top-0 left-0 w-full h-[300%] group-hover:-translate-y-[66.66%] transition-transform duration-[12s] ease-in-out delay-300 z-0">
                            <Image
                              src={project.image}
                              alt={`${project.name} Mobile UI`}
                              fill
                              className="object-cover object-center"
                              sizes="320px"
                              quality={80}
                            />
                          </div>
                        </div>
                     </div>
                   </div>
                </div>

              </motion.div>
            );
          })}
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
