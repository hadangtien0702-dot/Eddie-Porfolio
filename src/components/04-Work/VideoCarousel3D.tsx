"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { videoPosts, VideoPostItem } from "@/data/video-post";
import { X, Play, ChevronLeft, ChevronRight, TrendingUp, Users, Calendar, Clock } from "lucide-react";
import ViralWall from "./ViralWall";
import SocialPlayerLayout from "./SocialPlayerLayout";
import AdsPlayerLayout from "./AdsPlayerLayout";
import SocialGrid from "./SocialGrid";

const CARD_W = 260;
const CARD_H = 360;
const OFFSET_X = 290;

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
  const [selectedVideo, setSelectedVideo] = useState<VideoPostItem | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Filter videos based on active category
  const filteredVideos = useMemo(() => 
    videoPosts.filter(v => v.category === activeCategory),
    [activeCategory]
  );

  const total = filteredVideos.length;
  const currentVideo = filteredVideos[activeIndex];

  // Reset index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

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
    return () => clearInterval(autoPlayRef.current);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-[#050505]"
          data-lenis-prevent="true"
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
                  onClick={() => setActiveCategory(cat)}
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
                  onClick={() => setActiveCategory(cat)}
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
          <div className="relative flex-1 flex flex-col items-center justify-center pt-4" style={{ perspective: "1200px" }}>
            <motion.div
              className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
              onPanStart={() => setIsDragging(true)}
              onPanEnd={handlePanEnd}
            />

            <div className="relative flex items-center justify-center w-full" style={{ height: CARD_H + 100, transformStyle: "preserve-3d" }}>
              <AnimatePresence mode="popLayout">
                {filteredVideos.map((video, i) => {
                  let offset = i - activeIndex;
                  if (offset > total / 2) offset -= total;
                  if (offset < -total / 2) offset += total;

                  const absOffset = Math.abs(offset);
                  const isCenter = offset === 0;
                  const visible = absOffset <= 2;

                  if (!visible) return null;

                  return (
                    <motion.div
                      key={video.id}
                      layoutId={video.id}
                      onClick={() => !isDragging && !isCenter && goTo(i)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        x: offset * OFFSET_X,
                        rotateY: offset * -45,
                        scale: isCenter ? 1 : 1 - absOffset * 0.15,
                        opacity: isCenter ? 1 : 0.4 - absOffset * 0.1,
                        zIndex: 10 - absOffset,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`absolute w-[260px] md:w-[280px] h-[360px] md:h-[400px] rounded-2xl overflow-hidden cursor-pointer group ${isCenter ? 'ring-2 ring-accent shadow-[0_0_50px_rgba(255,64,0,0.2)]' : ''}`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
                      <div className={`absolute inset-0 transition-opacity duration-500 ${isCenter ? 'bg-gradient-to-t from-black via-black/20 to-transparent opacity-100' : 'bg-black/60 opacity-100 group-hover:opacity-40'}`} />
                      
                      {isCenter && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedVideo(video)}
                            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300 group"
                          >
                            <Play fill="currentColor" size={24} className="ml-1 transition-transform group-hover:scale-110" />
                          </motion.button>
                        </div>
                      )}

                      {isCenter && (
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-[0.2em] mb-2 block">{video.role}</span>
                          <h3 className="font-heading text-lg font-bold text-white leading-tight uppercase">{video.title}</h3>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-10 flex items-center gap-6 z-30">
               <button onClick={() => goTo(activeIndex - 1)} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                  <ChevronLeft size={24} />
               </button>
               <div className="flex gap-2">
                 {filteredVideos.map((_, i) => (
                    <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-accent' : 'bg-white/20'}`} />
                 ))}
               </div>
               <button onClick={() => goTo(activeIndex + 1)} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                  <ChevronRight size={24} />
               </button>
            </div>
          </div>

          {/* Detailed Info Panel */}
          <div className="relative z-30 w-full pt-10 pb-12 px-8 md:px-16 border-t border-white/5 bg-[#050505]/40 backdrop-blur-md">
            <motion.div 
              key={activeIndex + activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest bg-accent/10 px-2 py-1 rounded">{currentVideo?.year}</span>
                  <div className="flex items-center gap-2 text-white/30 text-[11px] font-mono">
                    <Clock size={12} /> {currentVideo?.duration}
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <div className="flex flex-wrap gap-2">
                    {currentVideo?.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-white/40 uppercase tracking-tighter">#{tag}</span>
                    ))}
                  </div>
                </div>
                <p className="font-body text-[15px] text-white/60 leading-relaxed max-w-2xl">
                  {currentVideo?.description}
                </p>
              </div>

              <div className="flex flex-col md:items-end justify-between gap-6">
                <div className="flex gap-8">
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest mb-1">Views</span>
                    <span className="font-heading text-xl font-bold text-white flex items-center gap-2">
                      <TrendingUp size={16} className="text-accent" />
                      {currentVideo?.stats.views}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest mb-1">Client</span>
                    <span className="font-heading text-xl font-bold text-white">{currentVideo?.brand}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedVideo(currentVideo)}
                  className="group relative inline-flex items-center gap-3 bg-accent text-white px-8 py-3.5 rounded-full font-bold font-body text-sm hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,64,0,0.3)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                  Watch Full Video
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>

            </>
          ) : (
            <SocialGrid videos={filteredVideos} onSelectVideo={setSelectedVideo} />
          )}

          {/* Full Video Modal Player (Enhanced Split View) */}
          <AnimatePresence>
            {selectedVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-[#050505]/98 backdrop-blur-2xl flex items-center justify-center p-4 lg:p-12"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
