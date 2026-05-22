"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { uiSounds } from "@/utils/ui-sounds";

export default function WorkSetupWebsite() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background values
  const bgScale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.85, 1, 1, 0.85]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["blur(25px)", "blur(0px)", "blur(0px)", "blur(25px)"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const bgBorderRadius = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], ["40px", "0px", "0px", "40px"]);

  // Unique scroll-driven divider & content movements
  const dividerHeight = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], ["0%", "100%", "100%", "0%"]);
  const leftContentX = useTransform(scrollYProgress, [0.1, 0.25], [-120, 0]);
  const rightContentX = useTransform(scrollYProgress, [0.1, 0.25], [120, 0]);

  // Foreground values
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 1, 1, 0]);

  const [isHovered, setIsHovered] = useState(false);
  
  // Motion value for the split percentage (0 to 100)
  const splitX = useMotionValue(50);
  // Add a spring to smooth out the mouse movement
  const springSplitX = useSpring(splitX, { stiffness: 100, damping: 20 });

  const handlePointerLeave = () => {
    setIsHovered(false);
    // Return to center when mouse leaves the whole section
    splitX.set(50);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  return (
    <section 
      id="setup"
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden border-t border-white/5 bg-black"
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
    >
      
      {/* ─── Animated Background Wrapper ─── */}
      <motion.div
        style={{ 
          scale: bgScale, 
          filter: bgBlur, 
          opacity: bgOpacity,
          borderRadius: bgBorderRadius 
        }}
        className="absolute inset-0 z-0 overflow-hidden origin-center will-change-transform bg-black"
      >
        {/* ─── LEFT PANEL (Setup & Build) ─── */}
        <motion.div 
          className="absolute top-0 left-0 bottom-0 overflow-hidden bg-black z-10 border-r border-white/10"
          style={{ width: useTransform(springSplitX, x => `${x}%`) }}
          onMouseEnter={() => splitX.set(70)}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-[100vw] h-full pointer-events-none">
             <Image 
               src="/images/services/setup-build/Main.webp" 
               alt="Setup and Build" 
               fill 
               className="object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-y-0 left-0 w-full max-w-[700px] p-6 md:p-12 lg:p-16 flex flex-col justify-center">
            <motion.div style={{ opacity: contentOpacity, x: leftContentX }} className="w-[100vw] max-w-[500px]">
               <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] font-bold block mb-4">
                 Studio & Operations
               </span>
               <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-4 whitespace-nowrap">
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
        </motion.div>


        {/* ─── RIGHT PANEL (Web Design) ─── */}
        <motion.div 
          className="absolute top-0 right-0 bottom-0 overflow-hidden bg-[#050505] z-0"
          style={{ width: useTransform(springSplitX, x => `${100 - x}%`) }}
          onMouseEnter={() => splitX.set(30)}
        >
          {/* Background Image. Need to anchor it to the right so it doesn't move weirdly */}
          <div className="absolute inset-0 w-[100vw] h-full pointer-events-none" style={{ right: 0, left: 'auto' }}>
             <Image 
               src="/images/services/web-design/Main.webp" 
               alt="Web Design" 
               fill 
               className="object-cover opacity-40 mix-blend-luminosity"
             />
             <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-y-0 right-0 w-full max-w-[700px] p-6 md:p-12 lg:p-16 flex flex-col justify-center items-end text-right">
            <motion.div style={{ opacity: contentOpacity, x: rightContentX }} className="w-[100vw] max-w-[500px]">
               <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold block mb-4">
                 UI/UX & Web
               </span>
               <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-4 whitespace-nowrap">
                 DIGITAL <br/>PLATFORMS
               </h2>
               <p className="font-body text-lg text-white/60 mb-8 ml-auto max-w-sm">
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
        </motion.div>

        {/* ─── Center Divider Line ─── */}
        <motion.div 
          className="absolute top-0 w-px bg-white/20 z-20 pointer-events-none flex items-center justify-center origin-top"
          style={{ 
            left: useTransform(springSplitX, x => `${x}%`), 
            x: "-50%",
            height: dividerHeight
          }}
        />
      </motion.div>

      {/* Helper text overlay */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2"
        >
          <span className="font-mono text-[10px] text-white/70 uppercase tracking-[0.3em] font-bold">
            Hover to Shift Focus
          </span>
        </motion.div>
      </motion.div>

    </section>
  );
}
