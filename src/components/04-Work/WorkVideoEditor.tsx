"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useMotionValue, useSpring, useVelocity, useMotionValueEvent } from "framer-motion";
import VideoCarousel3D from "./VideoCarousel3D";
import Image from "next/image";
import { uiSounds } from "@/utils/ui-sounds";

export default function WorkVideoEditor() {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Drag logic
  const dragX = useMotionValue(0);
  // Optional spring for smoother following if we wanted a trailing element, 
  // but for the playhead itself we'll use dragX directly.
  
  const velocity = useVelocity(dragX);
  // When dragging fast, increase glitch effect
  const glitchAmount = useTransform(velocity, [-1000, 0, 1000], [8, 0, 8]);
  const glitchFilter = useTransform(glitchAmount, val => `blur(${val}px) hue-rotate(${val * 5}deg) grayscale(${val * 0.1})`);
  const glitchScale = useTransform(glitchAmount, val => 1.05 + (val * 0.01));

  // ─── Video Control Logic ───
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(1); // default to prevent division by 0
  const [timecode, setTimecode] = useState("01:00:00:00");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0; // Mute for background
    }
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  useMotionValueEvent(dragX, "change", (latest) => {
    if (!trackRef.current || !videoRef.current) return;
    const trackWidth = trackRef.current.offsetWidth;
    // Map dragX (which can be negative or positive depending on constraints)
    // To make it simple, we constrain playhead from 0 to trackWidth.
    // Let's use getBoundingClientRect for absolute clicking instead of drag constraint limits if we want.
    // Actually, framer motion drag constraints handle limits.
    const x = Math.max(0, Math.min(latest, trackWidth));
    const percent = x / trackWidth;
    
    // Set video time
    videoRef.current.currentTime = percent * videoDuration;

    // Timecode calc
    const currentSeconds = percent * videoDuration;
    const frames = Math.floor((currentSeconds % 1) * 24);
    const s = Math.floor(currentSeconds % 60);
    const m = Math.floor(currentSeconds / 60);
    const pad = (n: number) => n.toString().padStart(2, "0");
    setTimecode(`01:${pad(m)}:${pad(s)}:${pad(frames)}`);
  });

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(x / rect.width, 1));
    dragX.set(x);
  };

  const handlePlay = () => {
    uiSounds.playClick();
    setIsCarouselOpen(true);
  };

  return (
    <section id="work" className="relative w-full h-[100vh] min-h-[850px] overflow-hidden bg-black flex flex-col justify-center border-t border-white/5">
      
      {/* ─── Background Interactive Video ─── */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          src="https://pub-9332e0501e844ae48782601867134d26.r2.dev/videos/ads/premium-creative-showcase.mp4"
          className="w-full h-full object-cover"
          onLoadedMetadata={handleLoadedMetadata}
          muted
          playsInline
          loop
        />
        {/* Dark Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8bGluZSB4MT0iMCIgeTE9IjIiIHgyPSI0IiB5Mj0iMiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+')] pointer-events-none opacity-50" />
      </div>

      {/* ─── Main Content Overlay ─── */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-10 pb-[360px] pointer-events-none flex items-center">
        <div className="max-w-2xl pointer-events-auto bg-black/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6 bg-black/40 inline-flex px-4 py-2 rounded-full border border-white/5"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#ef4444]" />
            <span className="font-mono text-[10px] text-accent uppercase tracking-[0.4em] font-bold">
              Interactive Editing Engine
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-[50px] md:text-[80px] font-black text-white uppercase leading-[1] tracking-tighter mb-6"
          >
            VIDEO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">EDITOR</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-[16px] md:text-[18px] text-white/80 max-w-xl mb-10 leading-relaxed font-medium"
          >
            Nắm kéo thanh Timeline bên dưới để tương tác trực tiếp với Video nền. Nơi những khung hình thô được cắt ghép tỉ mỉ thành Masterpiece.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.3 }}
            onClick={handlePlay}
            className="group relative flex items-center gap-4 bg-accent text-white px-8 py-4 rounded-xl font-heading font-black text-lg uppercase tracking-widest overflow-hidden hover:bg-white hover:text-black transition-all duration-300 shadow-[0_10px_40px_rgba(239,68,68,0.4)]"
          >
            <span className="relative z-10">RENDER_3D_SHOWCASE</span>
            <div className="relative z-10 flex items-center justify-center transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </motion.button>
        </div>
      </div>

      {/* ─── Premium NLE Timeline HUD (Height increased to 340px) ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-[340px] bg-[#121214] border-t border-white/20 z-30 flex flex-col font-sans select-none shadow-[0_-30px_60px_rgba(0,0,0,0.9)]">
        
        {/* 1. Top Toolbar */}
        <div className="h-10 bg-[#1e1e21] flex items-center justify-between px-4 border-b border-black/80 shadow-[0_2px_10px_rgba(0,0,0,0.5)] z-20">
          <div className="flex items-center gap-3">
            <div className="flex bg-[#121214] rounded border border-white/5 p-1 shadow-inner">
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors group relative">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 3l-6 6M21 3v6M21 3h-6M3 21l6-6M3 21v-6M3 21h6"/></svg>
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded bg-[#2a2a2e] text-accent border border-white/10 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </button>
            </div>
            <div className="h-5 w-px bg-white/10 mx-1" />
            <span className="font-mono text-[11px] text-white/60 font-bold uppercase tracking-widest bg-black/30 px-3 py-1 rounded">MAIN_SEQUENCE_01 *</span>
          </div>

          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {dragX.set(0); videoRef.current!.currentTime=0;}}>
            <span className="font-mono text-[16px] text-[#4ea8de] font-bold tracking-widest bg-[#09090b] px-6 py-1.5 rounded border border-white/10 shadow-inner flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />
              {timecode}
            </span>
          </div>

          <div className="flex items-center gap-3 text-white/40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <div className="w-32 h-2 bg-[#09090b] rounded-full overflow-hidden border border-white/10 shadow-inner">
              <div className="w-2/3 h-full bg-[#4ea8de] rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 relative overflow-hidden">
          {/* 2. Track Headers - Fixed widths and heights for realism */}
          <div className="w-[180px] bg-[#18181b] flex flex-col border-r border-black/80 shrink-0 z-20 shadow-[5px_0_20px_rgba(0,0,0,0.5)] pb-4">
             {/* Ruler placeholder space */}
             <div className="h-[28px] border-b border-black/80 bg-[#1e1e21]" />

             {/* Video Tracks */}
             {["V3", "V2", "V1"].map((track, i) => (
               <div key={track} className={`h-[40px] flex items-center justify-between px-4 border-b border-black/40 group hover:bg-white/5 transition-colors cursor-pointer ${track === "V1" ? 'bg-[#252528]' : ''}`}>
                 <div className="flex items-center gap-3">
                   <svg className="hover:stroke-white transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.8)"} strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                   <span className={`text-[12px] font-bold font-mono ${track === "V1" ? 'text-[#4ea8de]' : 'text-white/60'}`}>{track}</span>
                 </div>
                 <svg className="hover:stroke-white transition-colors" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
               </div>
             ))}

             {/* Center Divider */}
             <div className="h-2 bg-gradient-to-b from-black/80 to-[#18181b] w-full" /> 

             {/* Audio Tracks */}
             {["A1", "A2", "A3"].map((track, i) => (
               <div key={track} className={`h-[45px] flex items-center justify-between px-4 border-b border-black/40 group hover:bg-white/5 transition-colors cursor-pointer ${track === "A1" ? 'bg-[#252528]' : ''}`}>
                 <div className="flex items-center gap-3">
                   <svg className="hover:stroke-white transition-colors" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={i === 2 ? "rgba(255,255,255,0.2)" : "rgba(78,168,222,0.8)"} strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                   <span className={`text-[12px] font-bold font-mono ${track === "A1" ? 'text-[#06d6a0]' : 'text-white/60'}`}>{track}</span>
                 </div>
                 <div className="flex gap-1.5">
                    <div className="w-5 h-5 rounded flex items-center justify-center border border-white/10 bg-[#09090b] text-[9px] font-bold text-white/40 hover:bg-[#ff0000]/20 hover:text-[#ff0000] hover:border-[#ff0000]/50 shadow-inner">M</div>
                    <div className="w-5 h-5 rounded flex items-center justify-center border border-white/10 bg-[#09090b] text-[9px] font-bold text-white/40 hover:bg-[#e0a96d]/20 hover:text-[#e0a96d] hover:border-[#e0a96d]/50 shadow-inner">S</div>
                 </div>
               </div>
             ))}
          </div>

          {/* 3. Timeline Interactive Area */}
          <div className="flex-1 relative bg-[#121214] overflow-x-hidden overflow-y-auto" ref={trackRef} onClick={handleTrackClick}>
             
             {/* Ruler Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_100%] pointer-events-none" />

             {/* Ruler Top Bar */}
             <div className="sticky top-0 left-0 right-0 h-[28px] bg-[#1e1e21] border-b border-black/80 flex items-end px-4 pointer-events-none z-10 shadow-[0_2px_5px_rgba(0,0,0,0.3)]">
               {[...Array(30)].map((_, i) => (
                 <div key={i} className="flex-1 relative h-full flex items-end border-l border-white/10">
                   <div className="w-full flex justify-between px-1">
                     <div className="w-[1px] h-1.5 bg-white/20" />
                     <div className="w-[1px] h-2 bg-white/40" />
                     <div className="w-[1px] h-1.5 bg-white/20" />
                   </div>
                   <span className="absolute top-1 left-1.5 text-[9px] font-mono text-white/50 tracking-tighter">
                     00:00:{(i * 2).toString().padStart(2, '0')}:00
                   </span>
                 </div>
               ))}
             </div>

             {/* ─── Solid Track Clips Area ─── */}
             <div className="relative w-full flex flex-col pb-4">
               
               {/* V3 Track */}
               <div className="h-[40px] border-b border-white/5 relative flex items-center">
                 <div className="absolute left-[15%] right-[60%] h-[28px] bg-[#9370DB] border border-white/30 rounded-sm hover:brightness-110 hover:border-white transition-all cursor-pointer shadow-md overflow-hidden flex items-center group">
                   <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                   <span className="ml-2 text-[10px] font-mono text-white font-bold drop-shadow-md truncate z-10">COLOR_LUT_CINEMATIC.cube</span>
                 </div>
               </div>
               
               {/* V2 Track */}
               <div className="h-[40px] border-b border-white/5 relative flex items-center">
                 <div className="absolute left-[20%] right-[30%] h-[28px] bg-[#4169E1] border border-white/30 rounded-sm hover:brightness-110 hover:border-white transition-all cursor-pointer shadow-md overflow-hidden flex items-center group">
                   <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                   <div className="ml-1 bg-black/40 text-[#4ea8de] text-[8px] font-bold px-1.5 py-0.5 rounded-sm z-10">fx</div>
                   <span className="ml-2 text-[10px] font-mono text-white font-bold drop-shadow-md truncate z-10">OVERLAY_TEXT_01.png</span>
                 </div>
               </div>
               
               {/* V1 Track (Main Video) */}
               <div className="h-[40px] border-b border-black/80 relative flex items-center bg-white/[0.02]">
                 <div className="absolute left-[5%] right-[5%] h-[28px] bg-[#6B8E23] border border-white/40 rounded-sm hover:brightness-110 hover:border-white transition-all cursor-pointer shadow-[0_2px_10px_rgba(107,142,35,0.4)] overflow-hidden flex items-center group">
                   <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                   <div className="absolute left-0 top-0 bottom-0 flex gap-0.5 opacity-30 pointer-events-none">
                      {/* Fake Thumbnails pattern */}
                      {[...Array(15)].map((_, i) => (
                        <div key={i} className="h-full w-[40px] border-r border-black/40 bg-black/20" />
                      ))}
                   </div>
                   <div className="ml-1 bg-black/40 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm z-10 border border-white/10">fx</div>
                   <span className="ml-2 text-[11px] font-mono text-white font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] truncate z-10">PREMIUM_CREATIVE_SHOWCASE_FINAL.mp4 [V]</span>
                 </div>
               </div>
               
               <div className="h-2 w-full" />

               {/* A1 Track (Main Audio) */}
               <div className="h-[45px] border-b border-white/5 relative flex items-center bg-white/[0.02]">
                 <div className="absolute left-[5%] right-[5%] h-[32px] bg-[#008080] border border-white/30 rounded-sm hover:brightness-110 hover:border-white transition-all cursor-pointer shadow-md overflow-hidden flex flex-col justify-center group">
                   <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                   <span className="ml-2 mt-0.5 text-[9px] font-mono text-white/90 font-bold drop-shadow-md truncate z-10">PREMIUM_CREATIVE_SHOWCASE_FINAL.mp4 [A]</span>
                   {/* Audio Waveform */}
                   <div className="absolute bottom-0 w-full h-[18px] opacity-80 flex items-end overflow-hidden">
                     <svg width="100%" height="100%" preserveAspectRatio="none">
                       <pattern id="waveformA1" x="0" y="0" width="6" height="100%" patternUnits="userSpaceOnUse">
                         <rect x="1" y="20%" width="1.5" height="60%" fill="#06d6a0" rx="0.5"/>
                         <rect x="3.5" y="10%" width="1.5" height="80%" fill="#06d6a0" rx="0.5"/>
                       </pattern>
                       <rect x="0" y="0" width="100%" height="100%" fill="url(#waveformA1)" />
                       <path d="M0,9 L2000,9" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                     </svg>
                   </div>
                 </div>
               </div>
               
               {/* A2 Track (SFX) */}
               <div className="h-[45px] border-b border-white/5 relative flex items-center">
                 <div className="absolute left-[20%] right-[60%] h-[32px] bg-[#008080] border border-white/20 rounded-sm hover:brightness-110 hover:border-white/50 transition-all cursor-pointer overflow-hidden flex flex-col justify-center opacity-90 group">
                   <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                   <span className="ml-2 mt-0.5 text-[8px] font-mono text-white/70 font-bold z-10 truncate">IMPACT_WHOOSH_01.wav</span>
                   <div className="absolute bottom-0 w-full h-[14px] opacity-60 flex items-end overflow-hidden">
                     <svg width="100%" height="100%" preserveAspectRatio="none">
                       <pattern id="waveformA2" x="0" y="0" width="8" height="100%" patternUnits="userSpaceOnUse">
                         <rect x="1" y="40%" width="2" height="40%" fill="#06d6a0" rx="1"/>
                         <rect x="5" y="60%" width="2" height="20%" fill="#06d6a0" rx="1"/>
                       </pattern>
                       <rect x="0" y="0" width="100%" height="100%" fill="url(#waveformA2)" />
                     </svg>
                   </div>
                 </div>
               </div>
               
               {/* A3 Track (Music) */}
               <div className="h-[45px] relative flex items-center">
                 <div className="absolute left-[5%] right-[10%] h-[32px] bg-[#008080] border border-white/20 rounded-sm hover:brightness-110 hover:border-white/50 transition-all cursor-pointer overflow-hidden flex flex-col justify-center opacity-80 group">
                   <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                   <span className="ml-2 mt-0.5 text-[8px] font-mono text-white/70 font-bold z-10 truncate">BACKGROUND_EPIC_BEAT.mp3</span>
                   <div className="absolute bottom-0 w-full h-[16px] opacity-40 flex items-end overflow-hidden">
                     <svg width="100%" height="100%" preserveAspectRatio="none">
                       <pattern id="waveformA3" x="0" y="0" width="10" height="100%" patternUnits="userSpaceOnUse">
                         <rect x="1" y="30%" width="3" height="50%" fill="#06d6a0" rx="1"/>
                         <rect x="6" y="50%" width="3" height="30%" fill="#06d6a0" rx="1"/>
                       </pattern>
                       <rect x="0" y="0" width="100%" height="100%" fill="url(#waveformA3)" />
                     </svg>
                   </div>
                 </div>
               </div>
             </div>

             {/* ─── Massive Draggable Playhead ─── */}
             <motion.div
               drag="x"
               dragConstraints={{ left: 0, right: trackRef.current ? trackRef.current.offsetWidth : 2000 }}
               dragElastic={0}
               dragMomentum={false}
               style={{ x: dragX }}
               className="absolute top-0 bottom-0 w-6 -ml-[12px] z-40 cursor-ew-resize flex flex-col items-center pointer-events-auto group"
               onClick={(e) => e.stopPropagation()}
             >
                {/* Playhead Head (Premiere Pro style - Blue or Red) */}
                <div className="w-5 h-6 bg-[#4ea8de] shadow-[0_0_15px_rgba(78,168,222,0.8)] relative flex flex-col items-center group-hover:bg-white group-hover:scale-110 transition-transform origin-top z-20 rounded-b-sm">
                  <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#4ea8de] group-hover:border-t-white transition-colors" />
                  <div className="w-1 h-3 bg-black/40 mt-1 rounded-sm" />
                </div>
                {/* Playhead Line */}
                <div className="flex-1 w-[2px] bg-[#4ea8de] shadow-[0_0_10px_#4ea8de] opacity-100 group-hover:w-[3px] group-hover:bg-white transition-all z-10" />
             </motion.div>
          </div>
        </div>
      </div>

      <VideoCarousel3D isOpen={isCarouselOpen} onClose={() => setIsCarouselOpen(false)} />
    </section>
  );
}
