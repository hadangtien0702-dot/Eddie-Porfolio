"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function WorkSetupWebsite() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStudioHovered, setIsStudioHovered] = useState(false);
  const [isUiUxHovered, setIsUiUxHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background values that affect the entire wrapper
  const bgScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.85, 1, 1, 0.85]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["blur(25px)", "blur(0px)", "blur(0px)", "blur(25px)"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const bgBorderRadius = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], ["40px", "0px", "0px", "40px"]);

  return (
    <div ref={containerRef} className="relative w-full border-t border-white/5 bg-black overflow-hidden">
      <motion.div
        style={{ 
          scale: bgScale, 
          filter: bgBlur, 
          opacity: bgOpacity,
          borderRadius: bgBorderRadius 
        }}
        className="relative w-full z-0 overflow-hidden origin-center will-change-transform bg-black"
      >
        {/* ─── SECTION: STUDIO & OPERATIONS ─── */}
        <section 
          id="studio"
          className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center bg-black border-b border-white/10"
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
             <Image 
               src="/images/services/setup-build/IMG_0025.webp" 
               alt="Setup and Build" 
               fill 
               className="object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-[600px]"
            >
               <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] font-bold block mb-4">
                 Studio & Operations
               </span>
               <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-4">
                 SETUP <br/>& BUILD
               </h2>
               <p className="font-body text-lg text-white/60 mb-8 max-w-sm">
                 Complete studio setup, equipment scaling, and workflow optimization from concept to operational production system.
               </p>
               
               <Link 
                 href="/work/setup-and-build"
                 className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full font-heading font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors pointer-events-auto"
               >
                 View Details
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M5 12h14M12 5l7 7-7 7" />
                 </svg>
               </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── SECTION: UI/UX DESIGN ─── */}
        <section 
          id="uiux"
          className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center bg-[#050505]"
          onMouseEnter={() => setIsUiUxHovered(true)}
          onMouseLeave={() => setIsUiUxHovered(false)}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
             <Image 
               src="/images/services/web-design/Main.webp" 
               alt="Web Design" 
               fill 
               className="object-cover opacity-30 mix-blend-luminosity"
             />
             <div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-transparent" />
          </div>

          {/* Hover Floating Mockups */}
          <div className="absolute inset-0 pointer-events-none z-[5]">
             
             {/* 1. Color System - ThinkSmart Insurance */}
             <motion.div
               animate={{ opacity: isUiUxHovered ? 1 : 0, y: isUiUxHovered ? 0 : -40, rotate: isUiUxHovered ? -4 : 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="absolute pointer-events-auto top-[12%] left-[5%] xl:left-[10%] w-[300px] lg:w-[320px] bg-white rounded-2xl border border-black/10 shadow-2xl p-5 group hover:border-[#c40000]/50 transition-colors"
             >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-black/50 uppercase tracking-widest">ThinkSmart Colors</span>
                  <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#c40000]" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#32373c]" />
                     <div className="w-2.5 h-2.5 rounded-full bg-[#f4f4f4]" />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                   <div className="space-y-2">
                     <div className="h-12 rounded-lg bg-[#c40000] shadow-[0_4px_10px_rgba(196,0,0,0.3)] group-hover:-translate-y-1 transition-transform" />
                     <p className="text-[8px] font-mono text-[#c40000] text-center font-bold">#C40000</p>
                   </div>
                   <div className="space-y-2">
                     <div className="h-12 rounded-lg bg-[#32373c] border border-black/5 shadow-inner group-hover:-translate-y-1 transition-transform delay-75" />
                     <p className="text-[8px] font-mono text-black/40 text-center">#32373C</p>
                   </div>
                   <div className="space-y-2">
                     <div className="h-12 rounded-lg bg-[#f4f4f4] border border-black/5 group-hover:-translate-y-1 transition-transform delay-100" />
                     <p className="text-[8px] font-mono text-black/40 text-center">#F4F4F4</p>
                   </div>
                   <div className="space-y-2">
                     <div className="h-12 rounded-lg bg-white border border-black/10 group-hover:-translate-y-1 transition-transform delay-150" />
                     <p className="text-[8px] font-mono text-black/40 text-center">#FFFFFF</p>
                   </div>
                </div>
             </motion.div>

             {/* 2. Typography - Dream Talent */}
             <motion.div
               animate={{ opacity: isUiUxHovered ? 1 : 0, y: isUiUxHovered ? 0 : 40, rotate: isUiUxHovered ? 3 : 0 }}
               transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
               className="absolute pointer-events-auto bottom-[15%] left-[8%] lg:left-[12%] w-[260px] lg:w-[280px] bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-5 group hover:border-[#9b51e0]/50 transition-colors"
             >
                <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9b51e0] to-[#ff6900] flex items-center justify-center font-serif text-2xl text-white group-hover:scale-110 transition-transform">Aa</div>
                  <div>
                    <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest">DreamTalent Type</p>
                    <p className="text-sm font-bold text-white">Montserrat</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-end justify-between group-hover:translate-x-1 transition-transform">
                    <span className="text-2xl font-black text-white leading-none tracking-tight">Header 1</span>
                    <span className="text-[9px] font-mono text-white/40">72px / Bold</span>
                  </div>
                  <div className="flex items-end justify-between group-hover:translate-x-1 transition-transform delay-75">
                    <span className="text-lg font-bold text-white/80 leading-none tracking-tight">Header 2</span>
                    <span className="text-[9px] font-mono text-white/40">48px / Semibold</span>
                  </div>
                  <div className="flex items-end justify-between group-hover:translate-x-1 transition-transform delay-100">
                    <span className="text-sm text-white/60 leading-none">Body Text</span>
                    <span className="text-[9px] font-mono text-white/40">16px / Regular</span>
                  </div>
                </div>
             </motion.div>

             {/* 3. Button Components - ThinkSmart */}
             <motion.div
               animate={{ opacity: isUiUxHovered ? 1 : 0, x: isUiUxHovered ? 0 : -30, rotate: isUiUxHovered ? -2 : 0 }}
               transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
               className="absolute pointer-events-auto top-[48%] left-[28%] lg:left-[32%] w-[240px] lg:w-[260px] bg-white rounded-2xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-5 group hover:border-[#c40000]/30 transition-colors"
             >
                <span className="text-[10px] font-mono text-black/50 uppercase tracking-widest block mb-4">ThinkSmart Buttons</span>
                <div className="space-y-4">
                   <button className="w-full py-2.5 bg-[#c40000] hover:bg-[#a00000] rounded-full text-[10px] font-bold text-white uppercase tracking-widest transition-colors shadow-md">
                     Get a Quote
                   </button>
                   <button className="w-full py-2.5 bg-[#f4f4f4] hover:bg-[#e0e0e0] rounded-full text-[10px] font-bold text-black uppercase tracking-widest transition-colors">
                     Learn More
                   </button>
                   <button className="w-full py-2.5 bg-transparent rounded-full text-[10px] font-bold text-black/40 uppercase tracking-widest border border-dashed border-black/20 cursor-not-allowed">
                     Disabled
                   </button>
                </div>
             </motion.div>

             {/* 4. Wireframe Skeleton - Mixed Layout */}
             <motion.div
               animate={{ opacity: isUiUxHovered ? 0.9 : 0, x: isUiUxHovered ? 0 : 40, rotate: isUiUxHovered ? 6 : 0 }}
               transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
               className="absolute pointer-events-auto top-[18%] left-[35%] lg:left-[40%] w-[220px] lg:w-[240px] aspect-[3/4] bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-2xl p-4 flex flex-col gap-3 group hover:border-[#9b51e0]/30 transition-colors"
             >
                {/* Header */}
                <div className="w-full h-8 flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 animate-pulse" />
                  <div className="flex gap-2">
                    <div className="w-8 h-2 rounded-full bg-white/5 group-hover:bg-[#ff6900]/50 transition-colors" />
                    <div className="w-8 h-2 rounded-full bg-white/5 group-hover:bg-[#ff6900]/50 transition-colors delay-75" />
                    <div className="w-8 h-2 rounded-full bg-white/5 group-hover:bg-[#ff6900]/50 transition-colors delay-100" />
                  </div>
                </div>
                {/* Hero */}
                <div className="w-full flex-1 rounded-xl bg-gradient-to-br from-[#111] to-transparent border border-white/5 flex flex-col items-center justify-center gap-2 p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9b51e0]/20 to-[#ff6900]/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                  <div className="relative w-3/4 h-4 rounded-full bg-white/10" />
                  <div className="relative w-1/2 h-3 rounded-full bg-white/5" />
                  <div className="relative w-20 h-6 rounded-full bg-[#c40000]/80 mt-2" />
                </div>
                {/* Grid */}
                <div className="w-full h-24 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors" />
                  <div className="rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors delay-75" />
                </div>
             </motion.div>
             
          </div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center items-end text-right">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="max-w-[600px] flex flex-col items-end"
            >
               <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold block mb-4">
                 UI/UX & Web
               </span>
               <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-4">
                 DIGITAL <br/>PLATFORMS
               </h2>
               <p className="font-body text-lg text-white/60 mb-8 max-w-sm">
                 Designing and building seamless user interfaces for polished websites and digital forums.
               </p>
               
               <Link 
                 href="/work/web-forum-design"
                 className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full font-heading font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors pointer-events-auto"
               >
                 View Projects
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M5 12h14M12 5l7 7-7 7" />
                 </svg>
               </Link>
            </motion.div>
          </div>
        </section>

      </motion.div>
    </div>
  );
}
