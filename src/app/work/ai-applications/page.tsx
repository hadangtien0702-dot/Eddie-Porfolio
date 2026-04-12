"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


// ─── Constants & Types ───
interface Clip {
  id: string;
  trackId: string;
  start: number; // percentage (0 to 100)
  width: number; // percentage
  title: string;
  color: string;
  icon: string;
  description: string;
  stat?: string;
  toolsUsed: string[];
}

const CLIPS: Clip[] = [
  {
    id: "c1",
    trackId: "V3",
    start: 5,
    width: 20,
    title: "Script Automation",
    color: "#27C93F",
    icon: "⌨️",
    description: "Generative AI creates 30 variations of highly-converting hook scripts instantly based on past winning data.",
    stat: "10x Speed",
    toolsUsed: ["ChatGPT", "Analysis Scripts"]
  },
  {
    id: "c2",
    trackId: "V2",
    start: 20,
    width: 40,
    title: "HeyGen Avatar Render",
    color: "#FFBD2E",
    icon: "🤖",
    description: "AI Avatars deployed running concurrently. No actors, no physical studio rental needed. 100% scalable.",
    stat: "Cost: -$800 / vid",
    toolsUsed: ["HeyGen", "Visual AI"]
  },
  {
    id: "c3",
    trackId: "A1",
    start: 25,
    width: 35,
    title: "ElevenLabs Voiceover",
    color: "#FF5F56",
    icon: "🎙️",
    description: "High-fidelity text-to-speech dubbing. Perfectly controlled pacing, emotion, and tone mapped directly from script.",
    stat: "5 Languages",
    toolsUsed: ["ElevenLabs API"]
  },
  {
    id: "c4",
    trackId: "V1",
    start: 50,
    width: 30,
    title: "UGC / B-Roll Masking",
    color: "#a855f7",
    icon: "🎥",
    description: "Automated B-Roll clipping and dynamic captioning added natively over the synthesized avatars.",
    stat: "Retention +40%",
    toolsUsed: ["UGC AI", "Auto-Captions"]
  },
  {
    id: "c5",
    trackId: "V3",
    start: 75,
    width: 20,
    title: "Mass Export Pipeline",
    color: "#3b82f6",
    icon: "🚀",
    description: "Final rendering pipeline pushing multi-variant videos simultaneously to respective platforms.",
    stat: "Volume: 50/day",
    toolsUsed: ["Render Node"]
  }
];

const TRACKS = [
  { id: "V3", label: "Video 3" },
  { id: "V2", label: "Video 2" },
  { id: "V1", label: "Video 1" },
  { id: "A1", label: "Audio 1" },
];

function TimelineEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const playheadHeadRef = useRef<HTMLDivElement>(null);
  const [activeClipId, setActiveClipId] = useState<string | null>(null);
  
  // Real-time mouse tracking avoiding frame-dropping state re-renders
  useEffect(() => {
    let animationFrameId: number;
    let targetPos = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, width } = containerRef.current.getBoundingClientRect();
      const rawPos = ((e.clientX - left) / width) * 100;
      targetPos = Math.min(Math.max(rawPos, 0), 100);
    };

    const updatePlayhead = () => {
      if (playheadRef.current && playheadHeadRef.current) {
        // Direct DOM position update
        playheadRef.current.style.left = `${targetPos}%`;
        playheadHeadRef.current.style.left = `${targetPos}%`;
        
        // Find intersection
        const hitClip = CLIPS.find(clip => targetPos >= clip.start && targetPos <= (clip.start + clip.width));
        
        setActiveClipId(prev => {
          if (hitClip?.id !== prev) return hitClip?.id || null;
          return prev;
        });
      }
      animationFrameId = requestAnimationFrame(updatePlayhead);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updatePlayhead);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeClip = CLIPS.find(c => c.id === activeClipId);

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-6" style={{ cursor: "crosshair" }}>
      {/* ─── Active Data Monitor (Top Display) ─── */}
      <div className="h-[220px] md:h-[240px] w-full bg-[#070707] rounded-3xl border border-[#222222] p-8 relative overflow-hidden flex flex-col justify-center shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-70" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {activeClip ? (
            <motion.div 
              key={activeClip.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full h-full flex flex-col md:flex-row gap-4"
            >
              {/* Main Info Box (Bento Left) */}
              <div className="flex-1 bg-black/50 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col justify-between relative overflow-hidden shadow-xl">
                 {/* Giant Watermark Background */}
                 <div className="absolute -right-8 -bottom-12 text-[180px] opacity-5 select-none pointer-events-none leading-none" style={{ color: activeClip.color }}>
                   {activeClip.icon}
                 </div>

                 {/* Scanning laser line */}
                 <motion.div 
                   initial={{ top: "-10%" }} 
                   animate={{ top: "110%" }} 
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 w-full h-[1px] pointer-events-none z-0 opacity-50" 
                   style={{ backgroundColor: activeClip.color, boxShadow: `0 0 20px 2px ${activeClip.color}` }}
                 />

                 <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 text-[10px] font-black uppercase rounded text-black tracking-[0.2em] shadow-lg" style={{ backgroundColor: activeClip.color, boxShadow: `0 0 15px ${activeClip.color}40` }}>
                        TRK_{activeClip.trackId}
                      </span>
                      <p className="font-mono text-[11px] text-[#777] tracking-[0.2em] uppercase">
                        Duration_ {(activeClip.width / 10).toFixed(1)}s
                      </p>
                    </div>
                    <h3 className="font-heading text-3xl md:text-5xl font-black text-white mb-2 tracking-tighter uppercase leading-none drop-shadow-md">
                      {activeClip.title}
                    </h3>
                 </div>
                 
                 <div className="relative z-10 font-mono text-xs md:text-[13px] text-[#aaa] max-w-xl leading-relaxed mt-6 border-l-[3px] pl-4" style={{ borderColor: activeClip.color }}>
                    {activeClip.description}
                 </div>
              </div>

              {/* Right Side: Impact Metrics & Status (Bento Right) */}
              <div className="hidden md:flex w-[320px] flex-col gap-4">
                 {/* Impact KPI Box */}
                 <div className="flex-1 bg-black/50 border border-white/5 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden flex flex-col justify-center group shadow-xl">
                    {/* Cybernetic Corner Accents */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t border-l opacity-30" style={{ borderColor: activeClip.color }} />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r opacity-30" style={{ borderColor: activeClip.color }} />
                    
                    <p className="font-mono text-[9px] text-[#666] uppercase tracking-[0.3em] mb-1">Generated Impact</p>
                    <p className="font-heading text-4xl font-bold tracking-tighter drop-shadow-lg" style={{ color: activeClip.color }}>
                      {activeClip.stat}
                    </p>
                 </div>

                 {/* Infrastructure Dependencies Box */}
                 <div className="h-[75px] bg-black/50 border border-white/5 rounded-2xl px-5 backdrop-blur-md flex items-center justify-between shadow-xl">
                    <span className="font-mono text-[9px] text-[#555] uppercase tracking-[0.2em]">Sys_Config</span>
                    <div className="flex flex-wrap justify-end gap-2 max-w-[60%]">
                      {activeClip.toolsUsed.map(t => (
                         <span key={t} className="text-[9px] px-2.5 py-1.5 rounded bg-white/5 border border-white/10 text-[#bbb] font-mono whitespace-nowrap">
                           {t}
                         </span>
                      ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full h-full flex flex-col items-center justify-center text-[#444] bg-black/20 rounded-2xl border border-white/[0.02]"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 opacity-30">
                <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
                <path d="M12 12v.01" />
                <path d="M17 12v.01" />
                <path d="M7 12v.01" />
              </svg>
              <p className="font-mono text-xs uppercase tracking-[0.4em] opacity-80">Standby: Awaiting Data Input</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Timeline UI Canvas ─── */}
      <div className="w-full bg-[#111111] rounded-3xl border border-[#222222] overflow-hidden select-none shadow-2xl">
        {/* Timecode Ruler Container */}
        <div className="relative">
          {/* Header row (empty left space + ruler) */}
          <div className="flex h-10 md:h-12 border-b border-[#333] bg-[#1a1a1a]">
            {/* Track controls header width */}
            <div className="w-[60px] md:w-[90px] bg-[#151515] border-r border-[#222]" />
            {/* Ruler Canvas */}
            <div className="flex-1 relative flex items-center justify-between px-2">
               {[...Array(11)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                     <span className="font-mono text-[9px] md:text-[10px] text-[#666] mb-1 tracking-wider">
                       00:00:{(i * 6).toString().padStart(2, '0')}:00
                     </span>
                     <div className="h-1.5 w-[1px] bg-[#555]" />
                  </div>
               ))}
            </div>
          </div>
          
          {/* Playhead Arrow (outside scrolling bounds, fixed to top of tracks) */}
          <div 
             ref={playheadHeadRef}
             className="absolute top-10 md:top-12 -ml-[7px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px] border-t-red-600 z-[60] pointer-events-none drop-shadow-[0_2px_4px_rgba(255,0,0,0.5)]"
             style={{ left: '0%' }}
          />
        </div>

        {/* Tracks Area */}
        <div className="relative flex w-full" ref={containerRef}>
          {/* Track Headers (Left column) */}
          <div className="w-[60px] md:w-[90px] bg-[#0c0c0c] border-r border-[#222] flex flex-col z-20">
            {TRACKS.map(t => (
              <div key={t.id} className="h-[60px] md:h-[80px] border-b border-[#222] flex items-center justify-center p-2">
                <span className="font-mono text-[11px] md:text-[13px] font-bold text-[#888]">{t.id}</span>
              </div>
            ))}
          </div>

          {/* Timeline Sequence Canvas */}
          <div className="flex-1 relative bg-[#0e0e0e] overflow-hidden flex flex-col">
            {/* Striped Background Pattern for entire timeline */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:5%_100%] pointer-events-none" />

            {/* Render Tracks */}
            {TRACKS.map((t) => (
              <div key={t.id} className="h-[60px] md:h-[80px] w-full border-b border-[#222] relative group">
                {/* Horizontal Guide lines */}
                <div className="absolute inset-0 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Clips in this track */}
                {CLIPS.filter(c => c.trackId === t.id).map(clip => {
                  const isActive = activeClipId === clip.id;
                  return (
                    <div
                      key={clip.id}
                      className="absolute top-1/2 -translate-y-1/2 h-[44px] md:h-[54px] rounded-lg border flex flex-col justify-center px-3 overflow-hidden transition-all duration-200"
                      style={{
                        left: `${clip.start}%`,
                        width: `${clip.width}%`,
                        backgroundColor: isActive ? clip.color : `${clip.color}25`,
                        borderColor: isActive ? '#fff' : `${clip.color}60`,
                        boxShadow: isActive ? `0 0 25px ${clip.color}80, inset 0 0 10px rgba(255,255,255,0.3)` : 'none',
                        zIndex: isActive ? 10 : 1,
                      }}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent w-full h-full pointer-events-none" />
                      )}
                      <p className={`font-mono text-[9px] md:text-[11px] uppercase tracking-wider truncate drop-shadow-md z-10 ${isActive ? 'text-black font-extrabold' : 'text-[#ddd]'}`}>
                        {clip.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Vertical Red Playhead Line */}
            <div 
              ref={playheadRef}
              className="absolute top-0 bottom-0 w-[1.5px] bg-red-600 z-[50] pointer-events-none shadow-[0_0_12px_rgba(255,0,0,0.9)]"
              style={{ left: '0%' }}
            />

            {/* Active Range Highlight */}
            {activeClip && (
              <div 
                className="absolute top-0 bottom-0 bg-white/5 pointer-events-none transition-all duration-200 ease-out z-0"
                style={{
                  left: `${activeClip.start}%`,
                  width: `${activeClip.width}%`
                }}
              >
                 <div className="absolute w-[1px] h-full bg-white/20 left-0" />
                 <div className="absolute w-[1px] h-full bg-white/20 right-0" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page Component ───
export default function AIApplicationsPage() {
  return (
    <main className="min-h-screen bg-primary text-text-primary selection:bg-accent selection:text-white pb-32">
      {/* ─── Hero Section ─── */}
      <section className="relative w-full pt-32 pb-16 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-widest text-text-muted hover:text-white transition-colors mb-12"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Work
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
             <p className="font-body text-[11px] text-accent uppercase tracking-[0.2em] mb-4">
               Innovation / Toolset
             </p>
             <h1 className="font-heading font-bold text-5xl md:text-7xl tracking-tighter mb-6 text-white max-w-3xl">
               The Generative Pipeline.
             </h1>
             <p className="font-body text-text-secondary text-[16px] md:text-lg leading-relaxed max-w-2xl">
               Editing isn’t just manual cutting anymore. Below is my blueprint for an automated AI content pipeline. Scrub the timeline to see how AI APIs replace traditional studio overhead.
             </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Editor Canvas Section ─── */}
      <section className="px-4 md:px-8 mb-32">
         <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
         >
           <TimelineEditor />
         </motion.div>
      </section>

      {/* ─── "Rendering" CTA Button ─── */}
      <section className="px-6 relative">
        <div className="max-w-2xl mx-auto text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="group relative inline-flex"
           >
              {/* Progress bar container */}
              <Link 
                href="/#showreel"
                className="relative overflow-hidden inline-flex items-center justify-center font-heading text-lg md:text-xl font-bold tracking-widest uppercase bg-[#111] text-[#777] border border-[#333] rounded-2xl px-12 py-6 w-full md:w-[400px] transition-all duration-300 group-hover:text-white group-hover:border-accent"
              >
                <div className="absolute inset-0 bg-accent/20 w-0 group-hover:w-full transition-[width] duration-[1500ms] ease-out pointer-events-none" />
                <span className="relative z-10 flex items-center gap-3">
                  Export Showreel
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                {/* Rendering text overlay */}
                <span className="absolute right-4 bottom-4 text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity delay-300 text-accent">
                  Rendering 100%
                </span>
              </Link>
           </motion.div>
        </div>
      </section>
    </main>
  );
}
