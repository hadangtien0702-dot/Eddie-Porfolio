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
    <section className="relative py-32 px-6 lg:px-12 bg-[#050505] overflow-hidden">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-12 border-b border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {["/images/logos/n8n.svg", "/images/logos/chatgpt.svg"].map((img, i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#080808] bg-white overflow-hidden shadow-2xl">
                    <img src={img} alt="tool" className="w-full h-full object-contain p-2" />
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-heading font-black text-2xl text-white tracking-[-0.03em] uppercase">AI PERFORMANCE HUB</h4>
                <div className="font-mono text-[10px] text-accent uppercase tracking-[0.4em] flex items-center gap-2 mt-2 font-bold">
                   <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#ff4000]" />
                   Live Aggregated Intelligence
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 font-mono text-[11px] text-white/50 tracking-wider font-bold">
              REPORTING PERIOD: <span className="text-white font-black">28 DAYS</span>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {mainKpis.map((kpi, i) => (
              <div key={kpi.label} className="p-12 group hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                   {React.cloneElement(kpi.icon as React.ReactElement<any>, { className: "w-32 h-32" })}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-xl">
                      {React.cloneElement(kpi.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
                    </div>
                    <div className={`px-4 py-1 rounded-full font-mono text-[10px] font-black tracking-[0.2em] uppercase ${kpi.trend === "Viral" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent shadow-[0_0_30px_rgba(255,64,0,0.15)]"}`}>
                      {kpi.trend}
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-10">
                    <div className="font-heading text-6xl font-black text-white tracking-[-0.05em] group-hover:text-accent transition-all duration-500 flex items-baseline gap-1">
                      {kpi.value}
                    </div>
                    <div className="font-mono text-[11px] text-white/30 uppercase tracking-[0.3em] font-black leading-none">
                      {kpi.label}
                    </div>
                  </div>

                  {/* SMOOTH SVG SPARKLINE */}
                  <div className="h-16 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                      <motion.path
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut", delay: i * 0.2 }}
                        d={i === 0 ? "M0,35 Q10,30 20,32 T40,20 T60,25 T80,5 T100,2" :
                           i === 1 ? "M0,38 Q20,38 40,25 T60,20 T80,5 T100,2" :
                           i === 2 ? "M0,15 Q20,12 40,14 T60,10 T80,12 T100,8" :
                           "M0,30 Q20,25 40,35 T60,15 T80,10 T100,5"}
                        fill="none"
                        stroke={kpi.trend === "Viral" ? "#3b82f6" : "#ff4000"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(255,64,0,0.5)]"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* MAIN CONTENT SPLIT - PRIORITIZING VIDEO CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* LEFT: VIDEO LEADERBOARD (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-10 order-2 lg:order-1">
            <div className="flex items-center justify-between px-6">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-lg shadow-accent/5">
                    <TrendingUp className="w-6 h-6" />
                 </div>
                 <h4 className="font-heading text-4xl font-black text-white italic tracking-[-0.04em] uppercase">VIRAL INDEX</h4>
              </div>
              <div className="font-mono text-[11px] text-white/30 uppercase tracking-[0.4em] font-black">
                 EST. REACH: <span className="text-accent">1.5M+</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {topVideos.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
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
                  className="relative aspect-[4/5] rounded-[3rem] bg-white/[0.02] border border-white/10 overflow-hidden group cursor-pointer shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:border-accent/30"
                >
                  {/* Background Video/Thumbnail Layer */}
                  <div className="absolute inset-0 z-0">
                    <video 
                      src={v.videoUrl} 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover transition-all duration-1000 opacity-[0.15] group-hover:opacity-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 group-hover:via-transparent transition-all duration-700" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 z-20 p-10 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                       <span className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center font-mono text-sm text-white font-black">
                         {String(i + 1).padStart(2, "0")}
                       </span>
                       <div className="flex flex-col items-end">
                          <div className="font-heading text-4xl font-black text-accent tracking-[-0.05em] drop-shadow-[0_0_15px_rgba(255,64,0,0.5)]">
                             {v.views}
                          </div>
                          <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.2em] font-black">REACH</span>
                       </div>
                    </div>

                    <div className="space-y-6">
                      <h5 className="font-heading text-2xl font-black text-white leading-tight group-hover:text-accent transition-colors tracking-tight">
                        {v.title}
                      </h5>
                      {(v as any).likes && (
                        <div className="flex gap-5 p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 w-fit shadow-xl">
                          <span className="font-mono text-xs text-white/80 font-bold tracking-tight">👍 {v.likes}</span>
                          <span className="font-mono text-xs text-white/80 font-bold tracking-tight">💬 {(v as any).comments}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: STRATEGIC INSIGHTS (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-12 order-1 lg:order-2">
            <div className="sticky top-24 space-y-12">
              <div className="p-14 rounded-[4rem] bg-[#0A0A0A] border border-white/5 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none" />
                
                <h3 className="font-heading text-5xl font-black text-white mb-12 italic tracking-tighter uppercase">THE STRATEGY</h3>

                <div className="space-y-14 font-body text-white/40 text-xl leading-[1.7] tracking-wide">
                  <p>
                    I engineered a <span className="text-white font-black italic underline decoration-accent decoration-8 underline-offset-8">NEURAL CONTENT ENGINE</span> that 
                    obliterates traditional production bottlenecks.
                  </p>
                  
                  <div className="space-y-12">
                     {[
                       { label: "Cost Reduction", val: "-90%", desc: "Zero crew. Zero studio costs. Zero manual editing." },
                       { label: "Viral Velocity", val: "1.5M+", desc: "Optimized for maximum organic reach on Meta." },
                       { label: "Output Frequency", val: "DAILY", desc: "30+ high-fidelity reels delivered monthly." }
                     ].map(item => (
                       <div key={item.label} className="group/item">
                          <div className="flex items-center justify-between mb-3">
                             <span className="font-heading text-xl text-white font-black uppercase tracking-tight">{item.label}</span>
                             <span className="font-heading text-4xl text-accent font-black tracking-tighter">{item.val}</span>
                          </div>
                          <p className="text-base text-white/20 leading-relaxed font-medium">{item.desc}</p>
                       </div>
                     ))}
                  </div>
                </div>
              </div>

              <a 
                href="https://www.facebook.com/hanguyen.suckhoecuocsongmy/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-14 rounded-[4rem] bg-accent group transition-all duration-500 hover:scale-[1.02] shadow-[0_40px_100px_rgba(255,64,0,0.3)] hover:shadow-accent/50"
              >
                <div className="flex items-center gap-10">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white shadow-inner">
                    <Play className="w-10 h-10 fill-white ml-1" />
                  </div>
                  <div>
                    <div className="font-heading text-4xl font-black text-white tracking-[-0.05em] uppercase leading-none">LIVE FEED</div>
                    <div className="font-mono text-sm text-white/70 font-black uppercase tracking-[0.3em] mt-3">Watch the engine in action</div>
                  </div>
                </div>
                <ArrowUpRight className="w-12 h-12 text-white group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
