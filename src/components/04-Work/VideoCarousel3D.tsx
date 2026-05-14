"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { videoPosts, VideoPostItem } from "@/data/video-post";
import { X, Play, ChevronLeft, ChevronRight, TrendingUp, Clock } from "lucide-react";
import SocialPlayerLayout from "./SocialPlayerLayout";
import AdsPlayerLayout from "./AdsPlayerLayout";
import SocialGrid from "./SocialGrid";

const CARD_H = 380;
const OFFSET_X_DESKTOP = 450;
const OFFSET_X_MOBILE = 200;

export default function VideoCarousel3D({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState<"Ads Performance" | "Social Content">("Ads Performance");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoPostItem | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // ─── Lifecycle & Responsive ───
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter videos based on active category and sort by pinned status
  const filteredVideos = useMemo(() => {
    const result = videoPosts.filter(v => v.category === activeCategory);
    return [...result].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
  }, [activeCategory]);

  const total = filteredVideos.length;
  const currentVideo = filteredVideos[activeIndex];



  // ─── Auto-rotate every 5s ───
  const resetAutoPlay = useCallback(() => {
    clearInterval(autoPlayRef.current);
    if (selectedVideo) return; // Stop autoplay if a video is being watched
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5000);
  }, [total, selectedVideo]);

  useEffect(() => {
    if (!isOpen) return;
    resetAutoPlay();

    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(autoPlayRef.current);
      document.body.style.overflow = "";
    };
  }, [isOpen, resetAutoPlay, activeCategory]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
      resetAutoPlay();
    },
    [total, resetAutoPlay]
  );

  // ─── Keyboard navigation ───
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen || selectedVideo) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, activeIndex, goTo, onClose, selectedVideo]);

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x < -60) goTo(activeIndex + 1);
    else if (info.offset.x > 60) goTo(activeIndex - 1);
  };

  const getEmbedUrl = (url?: string) => {
    if (!url) return "";
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const id = url.includes("v=") ? url.split("v=")[1].split("&")[0] : url.split("/").pop();
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (url.includes("tiktok.com")) {
      const id = url.split("/video/")[1]?.split("?")[0];
      return `https://www.tiktok.com/embed/v2/${id}?autoplay=1`;
    }
    return url;
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050505] overflow-hidden"
          data-lenis-prevent="true"
          suppressHydrationWarning
        >
          {/* Global Fixed Background Layer */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {/* Base Background */}
            <div className="absolute inset-0 bg-[#050505]" />
            
            {/* Ambient Glow */}
            <div className="absolute inset-0 opacity-20 mix-blend-screen">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent blur-[150px] rounded-full" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent blur-[150px] rounded-full" />
            </div>

            {/* Social Wall Dynamic Background */}
            <AnimatePresence>
              {activeCategory === "Social Content" && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.25, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0 flex blur-[20px] saturate-50"
                >
                  <div className="w-1/3 h-[120%] -mt-[10%] bg-cover bg-center" style={{ backgroundImage: "url('/images/04-Work/Socials/Wall1.jpg')" }} />
                  <div className="w-1/3 h-[120%] mt-[5%] bg-cover bg-center" style={{ backgroundImage: "url('/images/04-Work/Socials/Wall2.jpg')" }} />
                  <div className="w-1/3 h-[120%] -mt-[5%] bg-cover bg-center" style={{ backgroundImage: "url('/images/04-Work/Socials/Wall3.jpg')" }} />
                  {/* Radial fade so center is clean, edges show images */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_90%)]" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Header */}
          <div className="relative z-30 flex items-center justify-between px-8 py-8 md:px-12">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-accent uppercase tracking-[0.4em] font-bold">Video Portfolio</span>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight">Showreel & Works</h2>
            </div>

            {/* Category Switcher */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-xl">
              {(["Ads Performance", "Social Content"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveIndex(0); }}
                  className={`px-6 py-2 rounded-full font-body text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Mobile Category Switcher */}
          <div className="md:hidden flex justify-center px-8 mb-4 relative z-30">
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full w-full max-w-xs">
              {(["Ads Performance", "Social Content"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveIndex(0); }}
                  className={`flex-1 py-2 rounded-full font-body text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat ? "bg-white text-black" : "text-white/40"
                  }`}
                >
                  {cat.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {activeCategory === "Ads Performance" ? (
            <>
              {/* Main Carousel Area */}
              <div className="relative z-30 w-full max-w-5xl mx-auto px-8 md:px-16 mb-2 mt-2 border-l-2 border-accent/20 pl-6">
                <div key={currentVideo?.id} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-accent text-[9px] font-mono font-black text-white uppercase tracking-widest rounded-sm">{currentVideo?.year || "2024"}</span>
                    <span className="font-mono text-[10px] text-accent/80 uppercase tracking-[0.2em] font-bold">{currentVideo?.role}</span>
                  </div>
                  <h2 className="font-heading text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none lg:max-w-4xl drop-shadow-2xl">
                    {currentVideo?.title}
                  </h2>
                  <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium max-w-3xl line-clamp-2">
                    {currentVideo?.description}
                  </p>
                </div>
              </div>
          <div className="relative flex-1 flex flex-col items-center justify-center pt-4" style={{ perspective: "1200px" }}>
            <motion.div
              className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
              onPanStart={() => setIsDragging(true)}
              onPanEnd={handlePanEnd}
            />

            <div className="relative flex items-center justify-center w-full" style={{ height: isMobile ? 420 : 700, transformStyle: "preserve-3d" }}>
              <AnimatePresence mode="popLayout">
                {filteredVideos.map((video, i) => {
                  let offset = i - activeIndex;
                  if (offset > total / 2) offset -= total;
                  if (offset < -total / 2) offset += total;

                  const absOffset = Math.abs(offset);
                  const isCenter = offset === 0;
                                                 const getCardSize = (ratio?: string) => {
                     if (isMobile) {
                       if (ratio === "16:9") return { w: "w-[320px]", h: "h-[180px]" };
                       if (ratio === "1:1") return { w: "w-[280px]", h: "h-[280px]" };
                       if (ratio === "4:5") return { w: "w-[260px]", h: "h-[325px]" };
                       return { w: "w-[260px]", h: "h-[360px]" };
                     }
                     if (ratio === "16:9") return { w: "w-[840px]", h: "h-[472px]" }; // Cinematic 16:9
                     if (ratio === "1:1") return { w: "w-[520px]", h: "h-[520px]" }; // Large Square
                     if (ratio === "4:5") return { w: "w-[460px]", h: "h-[575px]" }; // Professional Vertical
                     return { w: "w-[360px]", h: "h-[640px]" };
                   };

                   const { w: cardW, h: cardH } = getCardSize(video.aspectRatio);
                   const offsetX = isMobile ? OFFSET_X_MOBILE : (video.aspectRatio === "16:9" ? OFFSET_X_DESKTOP + 180 : OFFSET_X_DESKTOP);

                   return (
                     <motion.div
                       key={video.id}
                       layoutId={video.id}
                       onClick={() => !isDragging && !isCenter && goTo(i)}
                       initial={{ opacity: 0, scale: 0.8 }}
                       animate={{
                         x: offset * offsetX,
                         rotateY: offset * -45,
                         scale: isCenter ? 1 : (isMobile ? 0.85 : 1) - absOffset * 0.15,
                         opacity: isCenter ? 1 : 0.4 - absOffset * 0.1,
                         zIndex: 10 - absOffset,
                       }}
                       exit={{ opacity: 0, scale: 0.8 }}
                       transition={{ type: "spring", stiffness: 300, damping: 30 }}
                       className={`absolute ${cardW} ${cardH} rounded-[24px] cursor-pointer group ${isCenter ? 'z-20' : ''}`}
                       style={{ transformStyle: "preserve-3d" }}
                     >
                       {/* Dynamic Ambilight Glow for Center Card */}
                       {isCenter && (
                         <motion.div 
                           layoutId={`glow-${video.id}`}
                           className="absolute -inset-10 bg-accent/25 blur-[70px] rounded-full pointer-events-none opacity-60"
                         />
                       )}

                       <div className={`relative w-full h-full rounded-[24px] overflow-hidden border transition-all duration-500 ${isCenter ? 'border-accent/40 ring-1 ring-accent/20' : 'border-white/10'}`}>
                         <Image 
                           src={video.thumbnail} 
                           alt={video.title} 
                           fill 
                           className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                         />
                         
                         {/* Overlay Gradients */}
                         <div className={`absolute inset-0 transition-opacity duration-500 ${isCenter ? 'bg-gradient-to-t from-black via-black/10 to-transparent opacity-95' : 'bg-black/60 opacity-100 group-hover:opacity-40'}`} />
                         
                         {/* HUD Decorative Elements for Active Card */}
                         {isCenter && (
                           <>
                             <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-accent/60" />
                             <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-accent/60" />
                             <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-accent/60" />
                             <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-accent/60" />
                             
                             {/* Performance HUD - Left */}
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                               <div className="flex flex-col">
                                 <span className="font-mono text-[7px] text-white/40 uppercase tracking-widest">CPA Target</span>
                                 <span className="font-mono text-xs text-accent font-black">{video.stats.cpa || "$--" }</span>
                               </div>
                               <div className="w-8 h-px bg-white/10" />
                               <div className="flex flex-col">
                                 <span className="font-mono text-[7px] text-white/40 uppercase tracking-widest">Retention</span>
                                 <span className="font-mono text-xs text-white font-black">{video.stats.retention3s || "--%" }</span>
                               </div>
                             </div>

                             <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                               <span className="font-mono text-[8px] text-white/60 font-bold uppercase tracking-widest flex items-center gap-2">
                                 <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                 LIVE PREVIEW {video.duration}
                               </span>
                             </div>
                           </>
                         )}

                         {isCenter && (
                           <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <motion.button
                               whileHover={{ scale: 1.15, rotate: 5 }}
                               whileTap={{ scale: 0.9 }}
                               onClick={() => setSelectedVideo(video)}
                               className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-500 group shadow-[0_0_40px_rgba(255,64,0,0.3)]"
                             >
                               <Play fill="currentColor" size={28} className="ml-1 transition-transform group-hover:scale-110" />
                             </motion.button>
                           </div>
                         )}
                       </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            {/* Navigation Controls */}
            <div className="relative z-30 flex items-center justify-center gap-6 py-4 mt-8">
              <button onClick={() => goTo(activeIndex - 1)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-1.5">
                {filteredVideos.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-6 bg-accent' : 'w-1.5 bg-white/10'}`} />
                ))}
              </div>
              <button onClick={() => goTo(activeIndex + 1)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Detailed Info Panel */}
          <div className="relative z-30 w-full pt-4 pb-6 px-8 md:px-16 border-t border-white/5 bg-[#050505]/40 backdrop-blur-md">
            <motion.div 
              key={activeIndex + activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end"
            >
              <div className="lg:col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-white/[0.03] border border-white/10 rounded-[32px] p-6 md:p-8 backdrop-blur-3xl relative overflow-hidden group hover:border-accent/30 transition-all duration-700 shadow-2xl">
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 blur-[120px] rounded-full -mr-40 -mt-40" />
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 blur-[120px] rounded-full -ml-40 -mb-40" />

                  {/* CPA Metric */}
                  <div className="relative space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#ff4000]" />
                      <span className="font-mono text-[11px] text-white/50 uppercase tracking-[0.4em] font-black">Performance CPA</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,64,0,0.3)]">
                        {currentVideo?.stats.cpa || "$--" }
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-accent font-black uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded border border-accent/20">Target Met</span>
                        <span className="text-[9px] font-mono text-white/20 uppercase tracking-tighter mt-1 italic">Optimized</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 max-w-[200px]">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-sm ${i < 7 ? 'bg-accent shadow-[0_0_5px_#ff4000]' : 'bg-white/5'}`} />
                      ))}
                    </div>
                  </div>

                  {/* Retention Metric - Refined Gauge Style */}
                  <div className="relative flex flex-col items-center border-x border-white/10 px-12 h-full justify-center">
                    <div className="relative w-32 h-20 flex items-center justify-center overflow-hidden">
                      <svg className="w-full h-[160%] absolute top-0 -rotate-180">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="176" strokeDashoffset="0" className="text-white/5" strokeLinecap="round" />
                        <motion.circle 
                          cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" 
                          strokeDasharray="176"
                          initial={{ strokeDashoffset: 176 }}
                          animate={{ strokeDashoffset: 176 - (176 * (parseInt(currentVideo?.stats.retention3s || "0") / 100)) }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                          className="text-accent drop-shadow-[0_0_15px_rgba(255,64,0,0.6)]" 
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute bottom-2 flex flex-col items-center">
                        <span className="text-3xl font-black text-white leading-none">{currentVideo?.stats.retention3s || "0%" }</span>
                      </div>
                    </div>
                    <div className="mt-4 text-center space-y-1">
                      <span className="font-mono text-[11px] text-white/50 uppercase tracking-[0.3em] font-black">Hook Retention</span>
                      <p className="text-[10px] text-white/40 font-medium max-w-[140px] leading-relaxed mx-auto italic">High engagement in first 5s</p>
                    </div>
                  </div>

                  {/* Views Metric Only */}
                  <div className="relative flex flex-col items-center md:items-end justify-center h-full">
                    <span className="font-mono text-[11px] text-white/50 uppercase tracking-[0.4em] font-black mb-3">Archive Reach</span>
                    <div className="text-5xl font-black text-white flex items-center gap-4">
                      <div className="p-3 bg-accent/20 rounded-xl">
                        <TrendingUp className="text-accent" size={32} />
                      </div>
                      {currentVideo?.stats.views}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>


            </>
          ) : (
            <div className="flex-1 w-full overflow-y-auto min-h-0" data-lenis-prevent="true">
              <SocialGrid videos={videoPosts} onSelectVideo={setSelectedVideo} />
            </div>
          )}

          {/* Full Video Modal Player (Enhanced Split View) */}
          <AnimatePresence>
            {selectedVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-[#050505]/98 backdrop-blur-2xl"
                data-lenis-prevent="true"
              >
                <div className="h-full overflow-y-auto overscroll-contain" data-lenis-prevent="true">
                <div className="min-h-full flex items-center justify-center p-4 lg:p-12 relative">
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/30 hover:text-white transition-all z-[210] w-12 h-12 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10"
                >
                  <X size={28} />
                </button>

                {selectedVideo.category === "Social Content" ? (
                  <SocialPlayerLayout selectedVideo={selectedVideo} getEmbedUrl={getEmbedUrl} />
                ) : (
                  <AdsPlayerLayout selectedVideo={selectedVideo} getEmbedUrl={getEmbedUrl} />
                )}
                </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
