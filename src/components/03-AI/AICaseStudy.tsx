"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Target,
  ArrowUpRight,
  Play
} from "lucide-react";

const topVideos = [
  { 
    title: "Việt Kiều Vẫn Nghĩ Việt Nam Nghèo", 
    views: "418K", 
    engagement: "24.5k",
    videoUrl: "/videos/reels/1679868159699068.mp4" 
  },
  { 
    title: "Sang Mỹ Làm Người Nghèo?", 
    views: "331K", 
    likes: "4.7K", 
    comments: "929", 
    shares: "671",
    videoUrl: "/videos/reels/1859098374750947.mp4"
  },
  { 
    title: "Ai Cũng Thích Qua Mỹ!", 
    views: "275K", 
    likes: "2.7K", 
    comments: "477", 
    shares: "302",
    videoUrl: "/videos/reels/25256283237337349.mp4"
  },
  { 
    title: "Lời Khuyên Cho Người Việt Tại Mỹ", 
    views: "213K", 
    likes: "3K", 
    comments: "250", 
    shares: "218",
    videoUrl: "/videos/reels/1193408759530975.mp4"
  },
  { 
    title: "Ở Mỹ Buồn Lắm", 
    views: "175K", 
    likes: "2.1K", 
    comments: "300", 
    shares: "271",
    videoUrl: "/videos/reels/1917627699169217.mp4"
  },
  { 
    title: "Cuộc Sống Ở Mỹ Không Dễ Dàng", 
    views: "94K", 
    likes: "867", 
    comments: "42", 
    shares: "54",
    videoUrl: "/videos/reels/1416295406374728.mp4"
  },
];

const mainKpis = [
  { icon: <Eye />, value: "366K+", label: "Monthly Reach", trend: "+43%" },
  { icon: <Users />, value: "96.8%", label: "Discovery Rate", trend: "Viral" },
  { icon: <Clock />, value: "75 Days", label: "Watch Time", trend: "+30%" },
  { icon: <TrendingUp />, value: "8,180", label: "Monthly Engagement", trend: "+14%" },
];

export default function AICaseStudy() {
  return (
    <section className="relative pt-12 pb-20 px-6 lg:px-12 bg-[#050505] overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-accent/5 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-500/5 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="px-4 py-1 rounded-full bg-accent/10 border border-accent/20 flex items-center gap-2">
                <Target className="w-3 h-3 text-accent" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-accent">
                  Mission Report: 001
                </span>
              </div>
            </motion.div>
            
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] mb-8">
              SCALING AN <br />
              <span className="text-accent italic underline decoration-accent/30 decoration-8 underline-offset-8">AGENT BRAND</span>
            </h2>
            
            <p className="font-body text-white/40 text-xl leading-relaxed">
              How I transformed one insurance agent&apos;s digital presence from zero to millions using a 100% automated AI video engine.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-end">
             <div className="font-mono text-[11px] text-white/30 uppercase tracking-[0.4em]">Project Partner</div>
             <div className="flex items-center gap-4 px-6 py-4 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-black text-accent">H</div>
                <div className="font-heading font-bold text-white uppercase tracking-tight">Ha Nguyen — USA</div>
             </div>
          </div>
        </div>

        {/* PERFORMANCE DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-20 rounded-[3rem] border border-white/10 bg-[#080808] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-10 py-8 border-b border-white/5 bg-white/[0.02] relative overflow-hidden">
            <div className="absolute inset-0 bg-[grid-white/5] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-20 pointer-events-none" />
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="flex -space-x-3">
                {["n8n.svg", "chatgpt.svg", "claude.svg", "perplexity.svg", "meta.svg"].map((img, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#080808] bg-white overflow-hidden shadow-xl">
                    <img src={`/images/logos/${img}`} alt="tool" className="w-full h-full object-contain p-2" />
                  </div>
                ))}
              </div>
              <div className="h-10 w-px bg-white/10 mx-2 hidden sm:block" />
              <div>
                <h4 className="font-heading font-black text-2xl text-white tracking-tighter uppercase">AI PERFORMANCE HUB</h4>
                <div className="font-mono text-[9px] text-accent uppercase tracking-[0.4em] flex items-center gap-3 mt-1 font-bold">
                   <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#ff4000]" />
                   SENS_DATA_STREAM_v4.2
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex items-center gap-6 relative z-10">
              <div className="flex flex-col items-end gap-1">
                 <span className="font-mono text-[8px] text-white/20 uppercase">Network Load</span>
                 <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i < 4 ? "bg-accent" : "bg-white/10"}`} />)}
                 </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-[10px] text-white tracking-widest font-black">
                SYST_LOG: <span className="text-accent">28_DAYS</span>
              </div>
            </div>
          </div>

          {/* Dashboard Grid - ADVANCED BENTO HUD */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5">
            
            {/* CARD 1: MONTHLY REACH (Large 7-col) */}
            <div className="md:col-span-7 p-12 bg-[#080808] relative group overflow-hidden">
               {/* HUD Background Details */}
               <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/5 tracking-[0.5em] pointer-events-none uppercase">Metric_ID: REF_01</div>
               <div className="absolute bottom-0 left-0 p-10 w-full h-1/2 bg-gradient-to-t from-accent/[0.03] to-transparent pointer-events-none" />
               
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start mb-12">
                     <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           <div className="p-3 rounded-xl bg-accent text-white shadow-[0_0_30px_rgba(255,64,0,0.3)]">
                              <Eye className="w-6 h-6" />
                           </div>
                           <h5 className="font-mono text-[11px] text-white/30 uppercase tracking-[0.3em] font-black">Monthly Reach</h5>
                        </div>
                        <div className="font-heading text-8xl font-black text-white tracking-tighter leading-none">
                           366K<span className="text-accent">+</span>
                        </div>
                     </div>
                     <div className="flex flex-col items-end gap-2">
                        <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] font-black">+43% YOY</div>
                        <div className="font-mono text-[8px] text-white/10 uppercase tracking-widest">Confidence: 99.8%</div>
                     </div>
                  </div>

                  {/* LARGE AREA CHART */}
                  <div className="h-32 w-full mt-4">
                     <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                        <defs>
                           <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="rgba(255,64,0,0.2)" />
                              <stop offset="100%" stopColor="rgba(255,64,0,0)" />
                           </linearGradient>
                        </defs>
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          d="M0,35 Q10,30 20,32 T40,20 T60,25 T80,5 T100,2 L100,40 L0,40 Z"
                          fill="url(#areaGrad)"
                        />
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          d="M0,35 Q10,30 20,32 T40,20 T60,25 T80,5 T100,2"
                          fill="none"
                          stroke="#ff4000"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                     </svg>
                  </div>
               </div>
            </div>

            {/* RIGHT SIDE STACK (5-col) */}
            <div className="md:col-span-5 grid grid-rows-2 gap-px bg-white/5">
               
               {/* CARD 2: DISCOVERY RATE (Half-height) */}
               <div className="p-10 bg-[#080808] relative group flex items-center justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/5 tracking-[0.5em] pointer-events-none uppercase">Metric_ID: REF_02</div>
                  <div className="relative z-10 flex-1">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                           <Users className="w-5 h-5" />
                        </div>
                        <h5 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">Discovery Rate</h5>
                     </div>
                     <div className="font-heading text-6xl font-black text-white tracking-tighter leading-none mb-4">
                        96.8<span className="text-blue-400 text-3xl">%</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: "96.8%" }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                              className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                           />
                        </div>
                        <span className="font-mono text-[10px] text-blue-400 font-bold italic uppercase tracking-widest">Viral</span>
                     </div>
                  </div>
                  
                  {/* PROGRESS RING DECOR */}
                  <div className="w-32 h-32 relative hidden lg:flex items-center justify-center opacity-20">
                     <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="376.8" strokeDashoffset="12" className="text-blue-500" />
                     </svg>
                  </div>
               </div>

               {/* BOTTOM STACK (Two cards side by side) */}
               <div className="grid grid-cols-2 gap-px bg-white/5">
                  {/* CARD 3: WATCH TIME */}
                  <div className="p-8 bg-[#080808] relative group overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 font-mono text-[7px] text-white/5 tracking-[0.5em] pointer-events-none uppercase">ID: 03</div>
                     <div className="relative z-10">
                        <Clock className="w-5 h-5 text-white/20 mb-6 group-hover:text-accent transition-colors" />
                        <div className="font-heading text-4xl font-black text-white tracking-tighter mb-2">75 DAYS</div>
                        <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">Total Watch Time</div>
                        <div className="mt-6 flex gap-1">
                           {[1,2,3,4,5,6,7,8].map(i => <div key={i} className={`h-1 flex-1 ${i < 6 ? "bg-accent/40" : "bg-white/5"}`} />)}
                        </div>
                     </div>
                  </div>
                  
                  {/* CARD 4: ENGAGEMENT */}
                  <div className="p-8 bg-[#080808] relative group overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 font-mono text-[7px] text-white/5 tracking-[0.5em] pointer-events-none uppercase">ID: 04</div>
                     <div className="relative z-10">
                        <TrendingUp className="w-5 h-5 text-white/20 mb-6 group-hover:text-blue-400 transition-colors" />
                        <div className="font-heading text-4xl font-black text-white tracking-tighter mb-2">8,180</div>
                        <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">Monthly Eng.</div>
                        <div className="mt-6 text-blue-400 font-mono text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
                           <ArrowUpRight className="w-3 h-3" />
                           +14.5% TREND
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* MAIN CONTENT BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: STRATEGIC INSIGHTS (Col 1-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* INTEGRATED STRATEGY CONSOLE */}
            <div className="flex-1 relative p-12 rounded-[3rem] bg-[#0A0A0A] border border-white/10 overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
              {/* HUD Background Decoration */}
              <div className="absolute top-0 right-0 p-8 font-mono text-[8px] text-white/5 tracking-[0.4em] pointer-events-none uppercase">MODULE: STRAT_CTRL_v2.0</div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(255,64,0,0.05),transparent_50%)] pointer-events-none" />
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="mb-16">
                  <h3 className="font-heading text-5xl font-black text-white leading-[0.9] tracking-tighter uppercase mb-8">
                    THE<br/><span className="text-accent italic">STRATEGY</span>
                  </h3>
                  <p className="text-white/40 text-lg leading-relaxed max-w-[280px] font-medium tracking-tight">
                    I engineered a <span className="text-white font-bold underline decoration-accent decoration-2 underline-offset-4 uppercase italic">Neural Content Engine</span> that obliterates traditional production bottlenecks.
                  </p>
                </div>

                {/* Stats Grid - Strict Alignment */}
                <div className="space-y-10 flex-1">
                  {[
                    { label: "Cost Reduction", value: "-90%", desc: "Zero crew. Zero studio costs." },
                    { label: "Viral Velocity", value: "1.5M+", desc: "Optimized for Meta organic reach." },
                    { label: "Output Frequency", value: "DAILY", desc: "30+ high-fidelity reels monthly." }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-start group/stat">
                      <div className="space-y-1">
                        <h6 className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] font-black group-hover/stat:text-accent transition-colors">{stat.label}</h6>
                        <p className="text-white/30 text-xs font-medium">{stat.desc}</p>
                      </div>
                      <div className="font-heading text-3xl font-black text-white tracking-tighter group-hover/stat:text-accent transition-all">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* INTEGRATED ACTION PANEL */}
                <div className="mt-16 pt-10 border-t border-white/5 flex flex-col gap-4">
                  <a 
                    href="https://www.facebook.com/hanguyen.suckhoecuocsongmy/reels/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full group/btn relative p-6 rounded-2xl bg-accent overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(255,64,0,0.3)]"
                  >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent">
                              <Play className="w-5 h-5 fill-current" />
                            </div>
                            <div className="text-left">
                              <div className="font-heading text-xl font-black text-white uppercase tracking-tighter">LIVE FEED</div>
                              <div className="font-mono text-[8px] text-white/60 uppercase tracking-widest font-black">Watch in Action</div>
                            </div>
                        </div>
                        <ArrowUpRight className="w-6 h-6 text-white opacity-40 group-hover/btn:opacity-100 transition-opacity" />
                      </div>
                  </a>

                  <a 
                    href="https://drive.google.com/drive/folders/1Q6RI5z_G1jU6eP815x8zCGEumAfdPq4s?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full group/btn relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20"
                  >
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover/btn:text-white transition-colors">
                              <ExternalLink className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <div className="font-heading text-xl font-black text-white uppercase tracking-tighter">ASSET VAULT</div>
                              <div className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">100+ AI Samples</div>
                            </div>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-white opacity-20 group-hover/btn:opacity-100 transition-opacity" />
                      </div>
                  </a>
                </div>
              </div>

              {/* Micro-UI Corner Accent */}
              <div className="absolute bottom-4 right-4 font-mono text-[6px] text-white/10 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">SYSTEM_SECURE</div>
            </div>
          </div>
          
          {/* RIGHT: COMPACT VIDEO GRID (Col 5-12) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <TrendingUp className="w-5 h-5" />
                 </div>
                 <h4 className="font-heading text-3xl font-black text-white italic tracking-tighter uppercase">VIRAL INDEX</h4>
              </div>
              <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
                 EST. REACH: <span className="text-accent font-bold">1.5M+</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {topVideos.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  onMouseEnter={(e) => {
                    const video = e.currentTarget.querySelector('video');
                    if (video) video.play();
                  }}
                  onMouseLeave={(e) => {
                    const video = e.currentTarget.querySelector('video');
                    if (video) {
                      video.pause();
                      video.currentTime = 0;
                    }
                  }}
                  className="relative aspect-[9/16] rounded-[2rem] bg-black border border-white/10 overflow-hidden group cursor-pointer shadow-2xl transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(255,64,0,0.1)]"
                >
                  {/* HUD Corner Brackets */}
                  <div className="absolute inset-0 z-30 pointer-events-none">
                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 rounded-tl-lg group-hover:border-accent transition-colors" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 rounded-tr-lg group-hover:border-accent transition-colors" />
                    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 rounded-bl-lg group-hover:border-accent transition-colors" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 rounded-br-lg group-hover:border-accent transition-colors" />
                  </div>

                  {/* Scanning Animation */}
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.div 
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-full h-20 bg-gradient-to-b from-transparent via-accent/10 to-transparent blur-md"
                    />
                  </div>

                  {/* Background Video Layer */}
                  <div className="absolute inset-0 z-0 scale-105 group-hover:scale-100 transition-transform duration-1000">
                    <video 
                      src={v.videoUrl} 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover opacity-[0.3] group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 group-hover:via-transparent transition-all duration-700" />
                  </div>

                  {/* Top HUD Metadata */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full px-6 z-20 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                     <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-red-500 animate-pulse" : "bg-white/40"}`} />
                        <span className="font-mono text-[7px] text-white font-black tracking-widest uppercase">
                           {i === 0 ? "ANALYZING" : "ARCHIVE_SYNC"}
                        </span>
                     </div>
                     <span className="font-mono text-[7px] text-white/50 tracking-widest font-bold">NODE: US-W0{i+1}</span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                    <div className="flex items-start justify-between mt-6">
                       <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.2em] [writing-mode:vertical-lr]">RANK_{String(i + 1).padStart(2, "0")}</span>
                       
                       {/* HOLOGRAPHIC VIEW COUNT TAG */}
                       <div className="relative group/tag">
                          <div className="absolute inset-0 bg-accent/20 blur-md rounded-xl opacity-0 group-hover/tag:opacity-100 transition-opacity" />
                          <div className="relative px-4 py-2 rounded-xl bg-white/[0.05] backdrop-blur-xl border border-white/10 flex flex-col items-end">
                             <div className="font-heading text-3xl font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                {v.views}
                             </div>
                             <span className="font-mono text-[7px] text-accent font-black uppercase tracking-[0.3em] leading-none">REACH</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                      {/* WAVEFORM DECOR */}
                      <div className="h-4 flex items-end gap-0.5 opacity-30 group-hover:opacity-60">
                         {[1,2,3,4,5,6,7,8,9,10].map(j => (
                           <motion.div 
                              key={j}
                              animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.1 }}
                              className="w-1 bg-accent rounded-full"
                           />
                         ))}
                      </div>

                      <h5 className="font-heading text-lg font-black text-white leading-tight group-hover:text-accent transition-colors line-clamp-2 uppercase tracking-tight italic">
                        {v.title}
                      </h5>
                      
                      <div className="flex items-center justify-between border-t border-white/5 pt-4">
                         {(v as any).likes && (
                           <div className="flex gap-4">
                             <span className="font-mono text-[8px] text-white/40 font-bold uppercase tracking-widest">👍 {v.likes}</span>
                             <span className="font-mono text-[8px] text-white/40 font-bold uppercase tracking-widest">💬 {(v as any).comments}</span>
                           </div>
                         )}
                         <span className="font-mono text-[7px] text-white/20 uppercase tracking-[0.4em]">60_FPS</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
