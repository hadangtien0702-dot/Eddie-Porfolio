"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Layers, Sparkles, Cpu, Zap, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineBlock {
  id: string;
  track: "V3" | "V2" | "V1" | "A1";
  label: string;
  start: number; // percentage
  width: number; // percentage
  color: string;
  glowColor: string;
}

const blocks: TimelineBlock[] = [
  { id: "1", track: "V3", label: "AI DATA SCRAPER", start: 10, width: 25, color: "bg-green-500/20 border-green-500/40", glowColor: "rgba(34,197,94,0.3)" },
  { id: "2", track: "V2", label: "DIGITAL HUMAN RENDERING", start: 30, width: 40, color: "bg-yellow-500/20 border-yellow-500/40", glowColor: "rgba(234,179,8,0.3)" },
  { id: "3", track: "V1", label: "AUTO MAGIC B-ROLL", start: 60, width: 30, color: "bg-purple-500/60 border-purple-400/80", glowColor: "rgba(168,85,247,0.8)" },
  { id: "4", track: "A1", label: "AI SONIC IDENTITY", start: 35, width: 35, color: "bg-red-500/20 border-red-500/40", glowColor: "rgba(239,68,68,0.3)" },
  { id: "5", track: "V3", label: "MASS EXPORT HUB", start: 85, width: 15, color: "bg-blue-500/20 border-blue-500/40", glowColor: "rgba(59,130,246,0.3)" },
];

export default function AITimelineEditor() {
  const [playheadPos, setPlayheadPos] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dragMode, setDragMode] = useState<"playhead" | "in" | "out" | null>(null);
  const [inPoint, setInPoint] = useState(5);
  const [outPoint, setOutPoint] = useState(95);
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);

  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || dragMode) return;
    const interval = setInterval(() => {
      setPlayheadPos(prev => {
        const next = prev + 0.15;
        return next >= outPoint ? inPoint : next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying, dragMode, inPoint, outPoint]);

  const getPercentageFromEvent = (e: MouseEvent | React.MouseEvent) => {
    if (!timelineRef.current) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 48; // Adjust for the track labels width (48px)
    const width = rect.width - 48;
    return Math.max(0, Math.min(100, (x / width) * 100));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragMode) return;
      const percentage = getPercentageFromEvent(e);
      
      if (dragMode === "playhead") setPlayheadPos(percentage);
      else if (dragMode === "in") setInPoint(Math.min(percentage, outPoint - 1));
      else if (dragMode === "out") setOutPoint(Math.max(percentage, inPoint + 1));
    };

    const handleMouseUp = () => setDragMode(null);

    if (dragMode) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragMode, inPoint, outPoint]);

  const activeBlock = [...blocks].reverse().find(b => 
    playheadPos >= b.start && playheadPos <= (b.start + b.width)
  ) || blocks[0];

  const featureDetails: Record<string, any> = {
    "1": {
      trk: "TRK_V3",
      title: "AI Data Scraper & Insight",
      description: "\"Lắng nghe\" thị trường 24/7 thông qua n8n. Hệ thống tự động quét xu hướng để tìm ra những bộ kịch bản (Viral Hooks) có tỷ lệ chuyển đổi cao nhất.",
      impact: "Idea Efficiency",
      value: "+85%",
      color: "text-green-400",
      border: "border-green-500/30",
      bg: "bg-green-500/20",
      accent: "bg-green-500",
      glow: "from-green-500/5",
      tags: ["N8N HUB", "MULTI-LLM", "YT SCRAPER"],
      logos: [
        { name: "n8n", path: "/images/logos/n8n.svg" },
        { name: "ChatGPT", path: "/images/logos/chatgpt.svg" },
        { name: "Grok", path: "/images/logos/grok.svg" },
        { name: "Gemini", path: "/images/logos/gemini.svg" }
      ]
    },
    "2": {
      trk: "TRK_V2",
      title: "Digital Human Production",
      description: "Khởi tạo nhân vật AI kỹ thuật số (Digital Human) chất lượng 4K. Loại bỏ hoàn toàn chi phí quay phim, casting và set up studio truyền thống.",
      impact: "Visual Realism",
      value: "+92%",
      color: "text-yellow-400",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/20",
      accent: "bg-yellow-500",
      glow: "from-yellow-500/5",
      tags: ["HEYGEN", "4K RENDER", "LIPSYNC"]
    },
    "3": {
      trk: "TRK_V1",
      title: "Auto Magic B-Roll",
      description: "Hệ thống tự động chèn hình ảnh minh họa (B-Roll) và tạo caption động. Tối ưu hóa tối đa tỷ lệ giữ chân (Retention) người xem trên từng giây.",
      impact: "Retention",
      value: "+40%",
      color: "text-purple-400",
      border: "border-purple-500/30",
      bg: "bg-purple-500/20",
      accent: "bg-purple-500",
      glow: "from-purple-500/5",
      tags: ["UGC AI", "AUTO-CAPTIONS", "MASKING"]
    },
    "4": {
      trk: "TRK_A1",
      title: "AI Sonic Identity",
      description: "Nhân bản giọng nói (Voice Cloning) với cảm xúc thật 100%. Hỗ trợ 29+ ngôn ngữ, giúp nội dung tiếp cận thị trường toàn cầu ngay lập tức.",
      impact: "Audio Fidelity",
      value: "+75%",
      color: "text-red-400",
      border: "border-red-500/30",
      bg: "bg-red-500/20",
      accent: "bg-red-500",
      glow: "from-red-500/5",
      tags: ["ELEVENLABS", "VOICE CLONE", "TTS"]
    },
    "5": {
      trk: "TRK_V3",
      title: "Mass Export Hub",
      description: "Quy trình xuất bản hàng loạt video đa nền tảng (TikTok, Reels, Shorts) với Metadata được tối ưu hóa SEO tự động bởi AI.",
      impact: "Workflow Speed",
      value: "10X",
      color: "text-blue-400",
      border: "border-blue-500/30",
      bg: "bg-blue-500/20",
      accent: "bg-blue-500",
      glow: "from-blue-500/5",
      tags: ["AUTO-PUBLISH", "SEO OPTIMIZED", "BATCH"]
    }
  };

  const displayBlockId = hoveredBlockId || activeBlock.id;
  const details = featureDetails[displayBlockId];

  return (
    <div className="w-full bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
      {/* 1. TOP HEADER SECTION */}
      <div className="p-8 lg:p-10 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div 
            key={displayBlockId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4">
                 <span className={cn("px-3 py-1 rounded border font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-500", details.bg, details.border, details.color)}>
                   {details.trk}
                 </span>
                 {hoveredBlockId && (
                   <span className="px-2 py-0.5 rounded bg-accent/20 text-accent font-mono text-[8px] uppercase tracking-tighter animate-pulse">Preview Mode</span>
                 )}
                 <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                 >
                    <div className={cn("w-1.5 h-1.5 rounded-full", isPlaying ? "bg-green-500 animate-pulse" : "bg-red-500")} />
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">{isPlaying ? "Live" : "Paused"}</span>
                 </button>
              </div>
              
              <h2 className="font-heading text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 italic uppercase">
                {details.title}
              </h2>

              <div className="flex items-center gap-3">
                 <div className={cn("w-1 h-6 transition-colors duration-500", details.accent)} />
                 <p className="font-mono text-xs text-white/40 max-w-xl leading-relaxed">
                   {details.description}
                 </p>
              </div>

              {details.logos && (
                <div className="flex items-center gap-6 mt-6">
                   <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Orchestrating_</span>
                   <div className="flex items-center gap-4">
                     {details.logos.map((logo: any) => (
                       <div key={logo.name} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-2 hover:bg-white/10 transition-all cursor-help" title={logo.name}>
                         <img src={logo.path} alt={logo.name} className="w-full h-full object-contain opacity-60" />
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 w-full md:w-auto">
               <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-xl relative overflow-hidden group min-w-[240px]">
                  <div className={cn("absolute inset-0 bg-gradient-to-br transition-opacity duration-700", details.glow)} />
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] mb-3 block">Generated Impact</span>
                  <div className="text-3xl font-black text-white tracking-tighter flex items-center gap-2">
                    {details.impact} <span className={cn("transition-colors duration-500", details.color)}>{details.value}</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. TIMELINE SECTION */}
      <div className="p-6 lg:p-8 bg-black/40 relative select-none">
        {/* Work Area Bar */}
        <div className="absolute top-0 left-12 right-0 h-1 bg-white/5 overflow-hidden">
           <div 
             className="absolute h-full bg-accent/30 border-x border-accent/50"
             style={{ left: `${inPoint}%`, right: `${100 - outPoint}%` }}
           />
        </div>

        {/* Time Markers */}
        <div className="flex justify-between font-mono text-[9px] text-white/20 mb-6 px-12 border-b border-white/5 pb-2">
           {Array.from({ length: 11 }).map((_, idx) => {
             const pos = idx * 10;
             const isInOut = Math.abs(pos - inPoint) < 5 || Math.abs(pos - outPoint) < 5;
             return (
              <div key={idx} className={cn("flex flex-col items-center gap-1", isInOut ? "text-accent" : "")}>
                <span>00:00:{idx * 6 < 10 ? `0${idx * 6}` : idx * 6}</span>
                <div className={cn("w-px h-1.5", isInOut ? "bg-accent" : "bg-white/10")} />
              </div>
             );
           })}
        </div>

        {/* Tracks Grid */}
        <div 
          className="relative cursor-crosshair" 
          ref={timelineRef}
          onMouseDown={(e) => {
            const percentage = getPercentageFromEvent(e);
            if (Math.abs(percentage - inPoint) < 2) setDragMode("in");
            else if (Math.abs(percentage - outPoint) < 2) setDragMode("out");
            else setDragMode("playhead");
            
            if (dragMode === "playhead") setPlayheadPos(percentage);
          }}
        >
          {["V3", "V2", "V1", "A1"].map((track) => (
            <div key={track} className="flex h-16 border-b border-white/5 last:border-0">
              <div className="w-12 flex items-center justify-center border-r border-white/5 font-mono text-xs text-white/20 uppercase">
                {track}
              </div>
              <div className="flex-grow relative bg-white/[0.01]">
                <div className="absolute inset-0 flex justify-between px-0 opacity-20 pointer-events-none">
                  {Array.from({ length: 11 }).map((_, j) => (
                    <div key={j} className="w-px h-full bg-white/5" />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Range Highlight */}
          <div 
            className="absolute inset-y-0 bg-white/[0.02] pointer-events-none"
            style={{ left: `${inPoint}%`, width: `${outPoint - inPoint}%` }}
          />

          {/* Blocks */}
          <div className="absolute inset-0 left-12">
             {blocks.map(block => {
               const isActive = activeBlock.id === block.id;
               const isHovered = hoveredBlockId === block.id;
               return (
                 <motion.div
                   key={block.id}
                   onMouseEnter={() => setHoveredBlockId(block.id)}
                   onMouseLeave={() => setHoveredBlockId(null)}
                   onDoubleClick={() => {
                     setInPoint(block.start);
                     setOutPoint(block.start + block.width);
                     setPlayheadPos(block.start);
                   }}
                   className={cn(
                     "absolute h-10 top-3 rounded-lg border flex items-center px-4 font-mono text-[9px] font-bold text-white/90 overflow-hidden cursor-pointer transition-all duration-300",
                     block.color, 
                     isActive || isHovered ? "border-white/40 opacity-100" : "border-white/10 opacity-60"
                   )}
                   style={{ 
                      left: `${block.start}%`, 
                      width: `${block.width}%`, 
                      top: `${(["V3", "V2", "V1", "A1"].indexOf(block.track)) * 64 + 12}px`,
                      boxShadow: isActive || isHovered ? `0 0 30px ${block.glowColor}` : `0 0 10px ${block.glowColor}`,
                      scale: isHovered ? 1.05 : 1
                   }}
                 >
                   <span className="relative z-10 truncate">{block.label}</span>
                 </motion.div>
               );
             })}
          </div>

          {/* Handles */}
          <div className="absolute inset-0 left-12 pointer-events-none">
            <div className="absolute top-0 bottom-0 w-px bg-accent opacity-50" style={{ left: `${inPoint}%` }}>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full cursor-ew-resize pointer-events-auto" onMouseDown={(e) => { e.stopPropagation(); setDragMode("in"); }} />
            </div>
            <div className="absolute top-0 bottom-0 w-px bg-accent opacity-50" style={{ left: `${outPoint}%` }}>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full cursor-ew-resize pointer-events-auto" onMouseDown={(e) => { e.stopPropagation(); setDragMode("out"); }} />
            </div>
          </div>

          {/* Playhead */}
          <div 
            className="absolute top-[-30px] bottom-0 w-px bg-red-500 z-50 pointer-events-none"
            style={{ left: `calc(48px + ${playheadPos}%)` }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-red-500" />
            <div className="absolute inset-y-0 w-[2px] bg-red-500/40 blur-[2px]" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-4 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between">
         <div className="flex items-center gap-6">
            <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-3 group">
               <div className={cn("w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all", isPlaying ? "bg-accent shadow-[0_0_20px_rgba(255,64,0,0.3)]" : "bg-white/5")}>
                 {isPlaying ? <div className="w-2 h-3 border-x-2 border-white" /> : <Play className="w-3 h-3 fill-white text-white" />}
               </div>
               <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{isPlaying ? "Pause Engine" : "Resume Engine"}</span>
            </button>
            <div className="h-4 w-px bg-white/5" />
            <div className="flex items-center gap-2">
               <div className={cn("w-2 h-2 rounded-full", isPlaying ? "bg-green-500 animate-pulse" : "bg-red-500")} />
               <span className="font-mono text-[10px] text-white/40 uppercase">{isPlaying ? "A.I Processing..." : "Pipeline Idle"}</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/40 uppercase">Range: {inPoint.toFixed(0)} - {outPoint.toFixed(0)}</div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/40">FPS: 60.0</div>
         </div>
      </div>
    </div>
  );
}
