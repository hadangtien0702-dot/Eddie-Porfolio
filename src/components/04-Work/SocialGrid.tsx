"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { VideoPostItem } from "@/data/video-post";
import { TrendingUp, Play, Sparkles } from "lucide-react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
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
  return (
    <div className="relative z-30 w-full pb-32 overflow-hidden">
      {/* ─── SIDE DECORATIONS (Filling the "empty" space) ─── */}
      <div className="hidden xl:block">
        {/* Left Side: Viral Feed Indicators */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-8 pointer-events-none opacity-20">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={`left-hud-${i}`}
              animate={{ x: [0, 10, 0], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col gap-2"
            >
              <div className="w-40 h-[1px] bg-gradient-to-r from-accent to-transparent" />
              <div className="font-mono text-[8px] text-white tracking-[0.4em] uppercase">Node_Sync_{0x100 + i}</div>
              <div className="flex gap-1">
                {[...Array(8)].map((_, j) => (
                  <div key={j} className="w-1 h-3 bg-white/10" style={{ height: `${Math.random() * 15 + 5}px` }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Performance HUD */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-end gap-12 pointer-events-none opacity-20">
          <div className="flex flex-col items-end gap-3">
             <div className="font-mono text-[9px] text-accent uppercase tracking-widest">Global_Reach_Active</div>
             <div className="text-4xl font-heading font-black text-white/40">98.2%</div>
             <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-accent" />
             </div>
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="font-mono text-[8px] text-white/30 uppercase tracking-widest italic">Encrypted_Packet_Flow</div>
             <div className="grid grid-cols-4 gap-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }} className="w-2 h-2 rounded-sm bg-white/10" />
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Massive Stats Header */}
      <div className="w-full text-center py-16 md:py-24 relative overflow-hidden">
         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-2xl z-10 relative"
         >
           Viral Performance <span className="text-white/20">Command</span>
         </motion.h2>
         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="font-body text-white/50 max-w-2xl mx-auto mt-4 text-[15px] z-10 relative leading-relaxed"
         >
           Consistent high-performance content creation, generating millions of organic views and driving massive social engagement.
         </motion.p>
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="mt-12 flex justify-center items-center gap-8 md:gap-16 z-10 relative"
         >
           <div className="flex flex-col items-center">
              <span className="text-accent text-4xl md:text-5xl font-heading font-black drop-shadow-[0_0_20px_rgba(255,64,0,0.5)]">
                <Counter value={50} />M+
              </span>
              <span className="text-white/40 text-[10px] md:text-[12px] font-mono uppercase tracking-[0.2em] mt-2">Total Impressions</span>
           </div>
           <div className="w-px h-16 bg-white/10" />
           <div className="flex flex-col items-center">
              <span className="text-white text-4xl md:text-5xl font-heading font-black drop-shadow-xl">
                <Counter value={120} />+
              </span>
              <span className="text-white/40 text-[10px] md:text-[12px] font-mono uppercase tracking-[0.2em] mt-2">Viral Campaigns</span>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block" />
           <div className="hidden md:flex flex-col items-center">
              <span className="text-white text-4xl md:text-5xl font-heading font-black drop-shadow-xl">
                <Counter value={88} />%
              </span>
              <span className="text-white/40 text-[10px] md:text-[12px] font-mono uppercase tracking-[0.2em] mt-2">Retention Rate</span>
           </div>
         </motion.div>
      </div>

      {/* Masonry / Staggered Grid */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 relative z-20">
         <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
           {videos.map((video, i) => (
             <motion.div
               key={video.id}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ delay: (i % 4) * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
               whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
               className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/5 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(255,64,0,0.15)] break-inside-avoid bg-[#050505] transition-all duration-500"
               onClick={() => onSelectVideo(video)}
             >
               {/* ─── RUNNING BORDER SWEEP (Hover) ─── */}
               <div 
                  className="absolute inset-0 rounded-3xl pointer-events-none z-30 p-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    mask: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
                    WebkitMask: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_70%,#ff4000_100%)] animate-spin" 
                    style={{ animationDuration: '8s' }}
                  />
                </div>

               {/* Noise Overlay */}
               <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("/images/noise.png")' }} />

               {/* Aspect Ratio container depending on index to create masonry feel */}
               <div className={`relative w-full ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[9/16]'}`}>
                 <Image 
                   src={video.thumbnail} 
                   alt={video.title} 
                   fill 
                   sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                   className="object-cover transition-all duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 group-hover:saturate-150" 
                 />
                 
                 {/* Dark Gradients for Text Legibility */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                 
                 {/* Top Right Stats (Revealed on hover) */}
                 <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md flex items-center gap-1.5 shadow-xl">
                      <span className="text-[10px] text-white/70">Likes</span>
                      <span className="text-[11px] font-bold text-white">{video.stats.likes || "-"}</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md flex items-center gap-1.5 shadow-xl transition-all duration-500 delay-75">
                      <span className="text-[10px] text-white/70">Shares</span>
                      <span className="text-[11px] font-bold text-white">{video.stats.shares || "-"}</span>
                    </div>
                 </div>

                 {/* Play Button Center Pill */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100 z-20 pointer-events-none">
                   <div className="px-6 py-3 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 flex items-center gap-3 text-white shadow-[0_0_40px_rgba(255,64,0,0.3)]">
                     <Play fill="currentColor" size={16} />
                     <span className="font-mono text-xs uppercase tracking-widest font-bold text-white/90">Play Reel</span>
                   </div>
                 </div>

                 {/* Bottom Content */}
                 <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end z-10 pointer-events-none translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="flex items-center gap-3 mb-4">
                     {video.badge ? (
                       <div className="bg-[#5a189a]/90 text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(90,24,154,0.5)] backdrop-blur-sm border border-white/10">
                         <Sparkles size={12} strokeWidth={3} className="fill-white/50" />
                         <span className="text-xs font-black tracking-tight drop-shadow-md">{video.badge}</span>
                       </div>
                     ) : video.stats.views ? (
                       <div className="bg-accent text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(255,64,0,0.4)]">
                         <TrendingUp size={14} strokeWidth={3} />
                         <span className="text-[13px] font-black tracking-tight leading-none">{video.stats.views}</span>
                       </div>
                     ) : null}
                     <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 truncate max-w-[120px] bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/5">{video.brand}</span>
                   </div>
                   <h3 className="text-white font-sans font-bold text-lg md:text-[17px] leading-snug line-clamp-2 group-hover:text-accent drop-shadow-lg transition-colors duration-300 min-h-[2.5rem]">
                     {video.title.split('#')[0].trim()}
                   </h3>
                   
                   {/* Progress Bar Effect */}
                   <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                 </div>
               </div>
             </motion.div>
           ))}
         </div>
      </div>
    </div>
  );
}
