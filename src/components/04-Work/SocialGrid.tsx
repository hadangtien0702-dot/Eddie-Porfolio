"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { VideoPostItem } from "@/data/video-post";
import { TrendingUp, Play, Sparkles } from "lucide-react";

export default function SocialGrid({
  videos,
  onSelectVideo,
}: {
  videos: VideoPostItem[];
  onSelectVideo: (video: VideoPostItem) => void;
}) {
  return (
    <div className="relative z-30 w-full pb-32">
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
              <span className="text-accent text-4xl md:text-5xl font-heading font-black drop-shadow-[0_0_20px_rgba(255,64,0,0.5)]">50M+</span>
              <span className="text-white/40 text-[10px] md:text-[12px] font-mono uppercase tracking-[0.2em] mt-2">Total Impressions</span>
           </div>
           <div className="w-px h-16 bg-white/10" />
           <div className="flex flex-col items-center">
              <span className="text-white text-4xl md:text-5xl font-heading font-black drop-shadow-xl">120+</span>
              <span className="text-white/40 text-[10px] md:text-[12px] font-mono uppercase tracking-[0.2em] mt-2">Viral Campaigns</span>
           </div>
           <div className="w-px h-16 bg-white/10 hidden md:block" />
           <div className="hidden md:flex flex-col items-center">
              <span className="text-white text-4xl md:text-5xl font-heading font-black drop-shadow-xl">88%</span>
              <span className="text-white/40 text-[10px] md:text-[12px] font-mono uppercase tracking-[0.2em] mt-2">Retention Rate</span>
           </div>
         </motion.div>
      </div>

      {/* Masonry / Staggered Grid */}
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12">
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
                         <TrendingUp size={12} strokeWidth={3} />
                         <span className="text-xs font-black tracking-tight">{video.stats.views}</span>
                       </div>
                     ) : null}
                     <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 truncate max-w-[120px] bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/5">{video.brand}</span>
                   </div>
                   <h3 className="text-white font-sans font-bold text-lg md:text-[17px] leading-snug line-clamp-2 group-hover:text-accent drop-shadow-lg transition-colors duration-300 min-h-[2.5rem]">
                     {video.title}
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
