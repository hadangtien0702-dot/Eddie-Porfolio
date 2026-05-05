"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play, TrendingUp, Users, ChevronRight, ChevronLeft } from "lucide-react";
import { videoPosts, videoPortfolioHeading, VideoPostItem } from "@/data/video-post";
import SmoothScroll from "@/components/ui/SmoothScroll";

// ─── Video Card Component (Netflix Style) ───
function VideoCard({ video }: { video: VideoPostItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-none w-[300px] md:w-[400px] aspect-video rounded-xl overflow-hidden cursor-pointer group bg-[#111]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Thumbnail */}
      <Image 
        src={video.thumbnail} 
        alt={video.title} 
        fill 
        className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110 blur-[2px] brightness-50' : 'brightness-75'}`}
      />

      {/* Video Preview (Simulated with dark overlay if no video) */}
      {isHovered && video.previewVideo && (
        <video 
          src={video.previewVideo} 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
      )}

      {/* Data Overlay & Play Button */}
      <div className="absolute inset-0 z-20 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
        
        {/* Top: Stats */}
        <div className="flex gap-2">
          {video.stats.views && (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] uppercase font-bold tracking-widest shadow-[0_0_10px_rgba(255,64,0,0.3)]">
              <TrendingUp size={10} className="text-accent" />
              {video.stats.views}
            </span>
          )}
          {video.stats.leads && (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] uppercase font-bold tracking-widest">
              <Users size={10} className="text-accent" />
              {video.stats.leads}
            </span>
          )}
        </div>

        {/* Bottom: Title & Play */}
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center pl-1">
               <Play size={18} className="fill-black" />
             </div>
             <div>
               <h3 className="font-heading font-bold text-white text-lg leading-tight">{video.title}</h3>
               <p className="font-mono text-[10px] text-accent uppercase">{video.role}</p>
             </div>
          </div>
          <div className="flex gap-2">
            {video.tags.map(tag => (
               <span key={tag} className="text-[10px] font-body text-white/50 border border-white/20 rounded px-1.5 py-0.5">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───
export default function VideoEditorPage() {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (rowRef.current) rowRef.current.scrollBy({ left: -600, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (rowRef.current) rowRef.current.scrollBy({ left: 600, behavior: 'smooth' });
  };

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#050505] text-white overflow-hidden pb-32">
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-between items-center">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ChevronLeft size={16} /> Back to Work
          </Link>
          <div className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] border border-accent/30 px-3 py-1 rounded">
            SYS_VID_ARCHIVE
          </div>
        </div>

        {/* ── Hero Banner ── */}
        <section className="relative w-full h-[70vh] md:h-[85vh] flex items-end pb-20 md:pb-32 px-6 md:px-16 lg:px-24">
          <div className="absolute inset-0 z-0">
             {/* Placeholder for actual hero video. Using image and heavy gradient for now */}
             <Image 
               src="/images/02-CaseStudy/thinksmart/01-Hero/banner-01.webp" 
               alt="Hero" 
               fill 
               className="object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
             <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
             >
                <div className="font-mono text-accent text-sm md:text-base font-bold tracking-[0.2em] mb-4 uppercase">
                  {videoPortfolioHeading.headline}
                </div>
                <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                  Directing <br/> Performance
                </h1>
                <p className="font-body text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-10">
                  {videoPortfolioHeading.description}
                </p>
                <div className="flex items-center gap-4">
                  <button className="bg-white text-black px-8 py-3 rounded font-bold font-body flex items-center gap-2 hover:bg-white/80 transition-colors">
                     <Play size={20} className="fill-black" /> Play Showreel
                  </button>
                  <button className="bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-3 rounded font-bold font-body hover:bg-white/20 transition-colors">
                     More Info
                  </button>
                </div>
             </motion.div>
          </div>
        </section>

        {/* ── Cinematic Video Grid (Horizontal Scroll) ── */}
        <section className="relative z-20 -mt-10 px-6 md:px-16 lg:px-24">
          <h2 className="font-heading text-2xl font-bold mb-6 text-white flex items-center gap-3">
             High-Converting Ads
             <span className="font-mono text-[10px] text-accent font-normal tracking-widest border border-accent/30 px-2 py-0.5 rounded">PERFORMANCE</span>
          </h2>

          <div className="relative group/row">
             {/* Scroll Buttons */}
             <button onClick={scrollLeft} className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-30 flex items-center justify-start opacity-0 group-hover/row:opacity-100 transition-opacity">
                <ChevronLeft size={36} className="text-white hover:scale-125 transition-transform drop-shadow-2xl cursor-pointer" />
             </button>
             <button onClick={scrollRight} className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-30 flex items-center justify-end opacity-0 group-hover/row:opacity-100 transition-opacity">
                <ChevronRight size={36} className="text-white hover:scale-125 transition-transform drop-shadow-2xl cursor-pointer" />
             </button>

             {/* Carousel Container */}
             <div 
               ref={rowRef}
               className="flex gap-4 overflow-x-auto scrollbar-hide py-10 -my-10 px-2 snap-x snap-mandatory"
               style={{ scrollBehavior: 'smooth' }}
             >
                {videoPosts.map((video) => (
                  <div key={video.id} className="snap-start">
                    <VideoCard video={video} />
                  </div>
                ))}
             </div>
          </div>
        </section>

      </main>
    </SmoothScroll>
  );
}
