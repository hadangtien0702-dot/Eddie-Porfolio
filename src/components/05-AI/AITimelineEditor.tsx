"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  { id: "1", track: "V3", label: "SCRIPT AUTOMATION", start: 10, width: 25, color: "bg-green-500/20 border-green-500/40", glowColor: "rgba(34,197,94,0.3)" },
  { id: "2", track: "V2", label: "HEYGEN AVATAR RENDER", start: 30, width: 40, color: "bg-yellow-500/20 border-yellow-500/40", glowColor: "rgba(234,179,8,0.3)" },
  { id: "3", track: "V1", label: "UGC / B-ROLL MASKING", start: 60, width: 30, color: "bg-purple-500/60 border-purple-400/80", glowColor: "rgba(168,85,247,0.8)" },
  { id: "4", track: "A1", label: "ELEVENLABS VOICEOVER", start: 35, width: 35, color: "bg-red-500/20 border-red-500/40", glowColor: "rgba(239,68,68,0.3)" },
  { id: "5", track: "V3", label: "MASS EXPORT PIPELINE", start: 85, width: 15, color: "bg-blue-500/20 border-blue-500/40", glowColor: "rgba(59,130,246,0.3)" },
];

export default function AITimelineEditor() {
  const [playheadPos, setPlayheadPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayheadPos(prev => (prev >= 100 ? 0 : prev + 0.1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
      {/* 1. TOP HEADER SECTION */}
      <div className="p-8 lg:p-10 flex flex-col md:flex-row items-center gap-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 rounded bg-purple-500/20 border border-purple-500/30 font-mono text-[10px] text-purple-400 font-bold uppercase tracking-widest">TRK_V1</span>
             <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.2em]">Duration_ 3.0s</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 italic">UGC / B-ROLL MASKING</h2>
          <div className="flex items-center gap-3">
             <div className="w-1 h-6 bg-purple-500" />
             <p className="font-mono text-xs text-white/40 max-w-md leading-relaxed">
               Automated B-Roll clipping and dynamic captioning added natively over the primary UGC track.
             </p>
          </div>
        </div>

        {/* Impact Card */}
        <div className="flex flex-col gap-4">
           <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] mb-3 block">Generated Impact</span>
              <div className="text-3xl font-black text-white tracking-tighter flex items-center gap-2">
                Retention <span className="text-purple-400">+40%</span>
              </div>
           </div>
           <div className="flex gap-2">
              <div className="flex-grow px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                 <span className="font-mono text-[8px] text-white/20 uppercase">Sys_Config</span>
                 <div className="flex gap-2">
                    <div className="px-2 py-0.5 rounded bg-white/5 text-[8px] text-white/40 font-mono border border-white/5 uppercase">UGC AI</div>
                    <div className="px-2 py-0.5 rounded bg-white/5 text-[8px] text-white/40 font-mono border border-white/5 uppercase">Auto-Captions</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* 2. TIMELINE SECTION */}
      <div className="p-6 lg:p-8 bg-black/40 relative">
        {/* Time Markers */}
        <div className="flex justify-between font-mono text-[9px] text-white/20 mb-6 px-12 border-b border-white/5 pb-2">
           {["00:00:00", "00:00:06", "00:00:12", "00:00:18", "00:00:24", "00:00:30", "00:00:36", "00:00:42", "00:00:48", "00:00:54", "00:00:60"].map(t => (
             <div key={t} className="flex flex-col items-center gap-1">
               <span>{t}</span>
               <div className="w-px h-1.5 bg-white/10" />
             </div>
           ))}
        </div>

        {/* Tracks Grid */}
        <div className="relative">
          {["V3", "V2", "V1", "A1"].map((track, i) => (
            <div key={track} className="flex h-16 border-b border-white/5 last:border-0 group/track">
              <div className="w-12 flex items-center justify-center border-r border-white/5 font-mono text-xs text-white/20 group-hover/track:text-white/40 transition-colors">
                {track}
              </div>
              <div className="flex-grow relative overflow-hidden bg-white/[0.01]">
                {/* Grid vertical lines */}
                <div className="absolute inset-0 flex justify-between px-0 pointer-events-none opacity-20">
                  {Array.from({ length: 11 }).map((_, j) => (
                    <div key={j} className="w-px h-full bg-white/5" />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Blocks Layer */}
          <div className="absolute inset-0 left-12">
             {blocks.map(block => (
               <motion.div
                 key={block.id}
                 initial={{ opacity: 0, scaleX: 0 }}
                 animate={{ opacity: 1, scaleX: 1 }}
                 className={cn(
                   "absolute h-10 top-3 rounded-lg border flex items-center px-4 font-mono text-[9px] font-bold text-white/90 overflow-hidden",
                   block.color
                 )}
                 style={{ 
                    left: `${block.start}%`, 
                    width: `${block.width}%`, 
                    top: `${(["V3", "V2", "V1", "A1"].indexOf(block.track)) * 64 + 12}px`,
                    boxShadow: `0 0 20px ${block.glowColor}`
                 }}
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                 <span className="relative z-10 truncate">{block.label}</span>
               </motion.div>
             ))}
          </div>

          {/* Playhead */}
          <motion.div 
            className="absolute top-[-30px] bottom-0 w-px bg-red-500 z-50 pointer-events-none"
            style={{ left: `calc(48px + ${playheadPos}%)` }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-500" />
            <div className="absolute inset-y-0 w-[2px] bg-red-500/40 blur-[2px]" />
          </motion.div>
        </div>
      </div>

      {/* Footer info */}
      <div className="px-8 py-4 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500" />
               <span className="font-mono text-[10px] text-white/40 uppercase">A.I Engine Active</span>
            </div>
            <div className="flex items-center gap-2">
               <Zap className="w-3 h-3 text-accent" />
               <span className="font-mono text-[10px] text-white/40 uppercase">Real-time Rendering</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/40">FPS: 60.0</div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/40">BITRATE: 12.5MBPS</div>
         </div>
      </div>
    </div>
  );
}
