"use client";

import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { VideoPostItem } from "@/data/video-post";
import { TrendingUp, Play, Sparkles, Eye, Target, Clock, ArrowUpRight, Filter } from "lucide-react";

function Counter({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const animation = animate(count, value, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [count, value]);

  return <motion.span>{rounded}</motion.span>;
}

export default function SocialGrid({
  videos,
  onSelectVideo,
}: {
  videos: VideoPostItem[];
  onSelectVideo: (video: VideoPostItem) => void;
}) {
  const [activeFilter, setActiveFilter] = useState("ALL PROJECTS");

  const filters = ["ALL PROJECTS", "ADS (PAID)", "ORGANIC CONTENT", "CREATIVE"];

  const filteredVideos = useMemo(() => {
    if (activeFilter === "ALL PROJECTS") return videos;
    if (activeFilter === "ADS (PAID)") return videos.filter(v => v.category === "Ads Performance");
    if (activeFilter === "ORGANIC CONTENT") return videos.filter(v => v.category === "Social Content" && !v.badge);
    if (activeFilter === "CREATIVE") return videos.filter(v => v.badge === "#creative");
    return videos;
  }, [activeFilter, videos]);

  return (
    <div className="relative z-30 w-full pb-32 bg-[#020202] text-white">
      {/* ─── PERFORMANCE HEADER ─── */}
      <div className="max-w-[1500px] mx-auto px-6 pt-24 md:pt-40 pb-12 relative overflow-visible">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative z-10"
        >
          <div className="max-w-4xl relative z-10">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-8 block"
            >
               Showreel & Works /
            </motion.span>
            <h2 className="font-heading text-6xl sm:text-7xl md:text-[6rem] lg:text-[7.5rem] font-black leading-[0.82] tracking-tighter mix-blend-screen">
              Performance <br/>
              Drives <br/>
              <span className="text-accent italic">Everything.</span>
            </h2>
            <p className="font-body text-white/50 max-w-lg mt-10 text-xl leading-relaxed">
              High-performance video content built for acquisition, retention, and brand growth across paid and organic channels.
            </p>

            {/* Clean Stats Bar */}
            <div className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-8">
               <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500 border border-white/5 group-hover:border-accent/40">
                     <Eye size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-3xl font-heading font-black tracking-tight group-hover:text-accent transition-colors"><Counter value={50} />M+</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">Total Impressions</div>
                  </div>
               </div>
               <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500 border border-white/5 group-hover:border-accent/40">
                     <TrendingUp size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-3xl font-heading font-black tracking-tight group-hover:text-accent transition-colors"><Counter value={120} />+</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">Campaigns</div>
                  </div>
               </div>
               <div className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-500 border border-white/5 group-hover:border-accent/40">
                     <Target size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-3xl font-heading font-black tracking-tight group-hover:text-accent transition-colors"><Counter value={88} />%</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">Retention Rate</div>
                  </div>
               </div>
            </div>
          </div>

          {/* New High-Impact Hero Collage - NOW POSITIONED UNDER TEXT */}
          <div className="absolute top-[-10%] right-[-10%] w-[60%] lg:w-[75%] aspect-video z-0 pointer-events-none opacity-40 lg:opacity-60 overflow-visible">
             <div className="absolute inset-0 bg-accent/30 blur-[150px] rounded-full scale-110 opacity-30 animate-pulse" />
             
             <motion.div
               style={{ rotateX: 10, rotateY: -15, perspective: 1000 }}
               initial={{ opacity: 0, scale: 0.8, x: 100 }}
               whileInView={{ opacity: 1, scale: 1.1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
             >
                <Image 
                  src="/images/04-Work/Socials/creative-main-hero.png" 
                  alt="Creative Performance Hub" 
                  fill 
                  className="object-cover scale-110"
                />
                
                {/* Overlay Scanning Line */}
                <motion.div 
                   animate={{ top: ["-10%", "110%"] }} 
                   transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-x-0 h-[2px] bg-accent/40 shadow-[0_0_30px_rgba(255,64,0,0.8)] blur-[1px] z-10" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-transparent" />
             </motion.div>

             {/* Overlays on image corners for tactical feel */}
             <div className="absolute top-10 right-10 flex flex-col items-end gap-3 z-20">
                <div className="flex items-center gap-3 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full">
                   <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(255,64,0,1)]" />
                   <span className="font-mono text-[10px] text-white font-bold uppercase tracking-[0.2em]">Live Analytics / Updated MAY 2025</span>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* ─── FILTERS & NAVIGATION ─── */}
      <div className="max-w-[1500px] mx-auto px-6 border-y border-white/5 py-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-8 overflow-x-auto w-full md:w-auto no-scrollbar">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`relative font-mono text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 pb-2 whitespace-nowrap
                  ${activeFilter === f ? 'text-accent' : 'text-white/40 hover:text-white/70'}`}
              >
                {f}
                {activeFilter === f && (
                  <motion.div layoutId="filter-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
            ))}
         </div>

         <div className="flex items-center gap-4 text-[11px] font-mono text-white/30 tracking-widest uppercase">
            <span>Sort By</span>
            <button className="flex items-center gap-2 text-white font-bold group">
               Latest
               <motion.div animate={{ rotate: 0 }} className="group-hover:translate-y-0.5 transition-transform">
                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
               </motion.div>
            </button>
         </div>
      </div>

      {/* ─── STRUCTURED VIDEO GRID ─── */}
      <div className="max-w-[1500px] mx-auto px-6">
        <motion.div 
          layout
          className={`grid gap-x-8 gap-y-16 
            ${(activeFilter === "ORGANIC CONTENT" || activeFilter === "CREATIVE") 
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, i) => {
              const isVertical = activeFilter === "ORGANIC CONTENT" || activeFilter === "CREATIVE";
              
              return (
              <motion.div
                layout
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group cursor-pointer relative"
                onClick={() => onSelectVideo(video)}
              >
                {/* Tactical Index Badge */}
                <div className="absolute -top-3 -left-3 z-30 bg-accent text-white font-mono text-[12px] font-black px-2.5 py-1 rounded-sm shadow-[0_5px_15px_rgba(255,64,0,0.4)] transition-transform group-hover:scale-110">
                   {(i + 1).toString().padStart(2, '0')}
                </div>

                {/* Thumbnail Container */}
                <div className={`relative rounded-2xl overflow-hidden bg-elevated mb-6 ${isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
                   <Image 
                     src={video.thumbnail} 
                     alt={video.title} 
                     fill 
                     className="object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                   
                   {/* Play Button Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform">
                         <Play fill="white" size={20} />
                      </div>
                   </div>

                   {/* Duration Badge */}
                   <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono font-bold text-white/90 border border-white/10">
                      {video.duration || "00:45"}
                   </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col gap-3">
                   <div className="flex items-start justify-between gap-4">
                      <h3 className={`font-heading font-bold group-hover:text-accent transition-colors line-clamp-2 leading-tight ${isVertical ? 'text-lg' : 'text-xl'}`}>
                        {video.title.split('#')[0].trim()}
                      </h3>
                      <ArrowUpRight size={isVertical ? 16 : 20} className="text-white/20 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
                   </div>

                   <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                           {video.badge === "#creative" ? "Creative Edit" : video.category.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-4 mt-2">
                           <div className="flex items-center gap-1.5">
                              <div className="w-1 h-1 rounded-full bg-white/20" />
                              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{video.brand}</span>
                           </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                         <div className="flex items-center gap-2 text-accent">
                            <TrendingUp size={isVertical ? 12 : 14} />
                            <span className={`font-heading font-black drop-shadow-[0_0_10px_rgba(255,64,0,0.3)] ${isVertical ? 'text-xl' : 'text-2xl'}`}>{video.stats.views || "Viral"}</span>
                         </div>
                         <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Views</span>
                      </div>
                   </div>

                   {/* Tags Row */}
                   <div className={`flex flex-wrap gap-2 mt-2 ${isVertical ? 'hidden sm:flex' : 'flex'}`}>
                      {video.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/[0.03] border border-white/5 rounded text-[9px] font-mono uppercase tracking-wider text-white/30 group-hover:text-white/50 transition-colors">
                           {tag}
                        </span>
                      ))}
                   </div>
                </div>
              </motion.div>
            );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── FOOTER QUOTE ─── */}
      <div className="mt-32 text-center px-6">
         <div className="flex items-center justify-center gap-8 mb-6">
            <span className="text-accent text-6xl font-serif italic leading-none h-8">“</span>
            <p className="font-heading text-[12px] sm:text-[14px] text-white font-black uppercase tracking-[0.4em] max-w-2xl leading-relaxed">
              Every project is built with purpose. Every edit is made to perform.
            </p>
            <span className="text-accent text-6xl font-serif italic leading-none h-8 rotate-180 translate-y-4">“</span>
         </div>
      </div>
    </div>
  );
}

