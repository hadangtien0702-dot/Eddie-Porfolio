"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Share2, Info, Activity, Shield, Cpu } from "lucide-react";
import { SocialPostItem } from "@/data/social-post";
import { uiSounds } from "@/utils/ui-sounds";

interface SocialHUDLightboxProps {
  post: SocialPostItem | null;
  onClose: () => void;
}

export default function SocialHUDLightbox({ post, onClose }: SocialHUDLightboxProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const images = post ? (post.images && post.images.length > 0 ? post.images : [post.thumbnail]) : [];

  useEffect(() => {
    if (post) {
      setCurrentIdx(0);
      uiSounds.playOpen();
      // Lock scroll
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [post]);

  const next = () => {
    setCurrentIdx((p) => (p + 1) % images.length);
    uiSounds.playBeep();
  };
  const prev = () => {
    setCurrentIdx((p) => (p - 1 + images.length) % images.length);
    uiSounds.playBeep();
  };

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 overflow-hidden"
        >
          {/* ── Background Tech HUD Layers ── */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
             <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>

          {/* Scanning Line */}
          <motion.div 
            animate={{ top: ["0%", "100%"] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-accent/30 z-10 pointer-events-none shadow-[0_0_15px_rgba(255,64,0,0.5)]" 
          />

          {/* ── Main Display Container ── */}
          <div className="relative w-full max-w-6xl aspect-[4/5] md:aspect-video flex flex-col md:flex-row gap-6">
            
            {/* 1. Image Viewport */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative flex-1 bg-black border border-white/10 rounded-2xl overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,1)]"
            >
               {/* Viewport Brackets */}
               <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-accent/60 z-20" />
               <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-accent/60 z-20" />
               <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-accent/60 z-20" />
               <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-accent/60 z-20" />

               <Image
                 src={images[currentIdx]}
                 alt={post.title}
                 fill
                 className="object-contain p-2"
                 priority
               />

               {/* Carousel Nav */}
               {images.length > 1 && (
                 <>
                   <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-all z-30">
                     <ChevronLeft size={24} />
                   </button>
                   <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-all z-30">
                     <ChevronRight size={24} />
                   </button>
                 </>
               )}

               {/* Image Meta HUD Overlay */}
               <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between pointer-events-none z-20">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-accent font-bold tracking-[0.3em] uppercase">Status: Analyzing_Visual</span>
                    <div className="flex gap-1 h-3 items-end">
                       {[...Array(20)].map((_, i) => (
                         <motion.div 
                           key={i} 
                           animate={{ height: [2, 12, 4] }} 
                           transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                           className="w-[2px] bg-accent/40" 
                         />
                       ))}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-sm border border-white/10 backdrop-blur-md">
                    Frame_{currentIdx + 1}/{images.length}
                  </div>
               </div>
            </motion.div>

            {/* 2. Data Sidebar */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-[360px] flex flex-col gap-4"
            >
               {/* Post Info Panel */}
               <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-accent/30 shadow-[0_0_15px_rgba(255,64,0,0.2)]">
                      <Image src={post.avatar} alt={post.author} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white leading-none mb-1">{post.author}</h3>
                      <p className="font-mono text-[10px] text-accent uppercase tracking-widest">{post.brand} // verified_asset</p>
                    </div>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-white mb-3 tracking-tight">{post.title}</h2>
                  <p className="font-body text-sm text-white/60 leading-relaxed mb-6 italic border-l-2 border-accent/40 pl-4">
                    "{post.description}"
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl group/stat hover:border-accent/40 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity size={14} className="text-accent group-hover/stat:animate-pulse" />
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Impressions</span>
                      </div>
                      <div className="font-heading text-2xl font-bold text-white">{post.impressions || "Calculating..."}</div>
                    </div>
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl group/stat hover:border-accent/40 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield size={14} className="text-accent group-hover/stat:animate-pulse" />
                        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Saves</span>
                      </div>
                      <div className="font-heading text-2xl font-bold text-white">{post.saves || "Analyzing..."}</div>
                    </div>
                  </div>
               </div>

               {/* Technical Specs Panel */}
               <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative flex flex-col">
                  <div className="flex items-center gap-2 mb-6">
                    <Cpu size={14} className="text-accent animate-pulse" />
                    <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Metadata_Extraction</span>
                  </div>

                  <div className="space-y-4 font-mono text-[11px]">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/30">CLICK_THROUGH_RATE</span>
                      <span className="text-accent">{post.ctr || "TBD"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/30">ENGAGEMENT_RATE</span>
                      <span className="text-white/80">{post.engagementRate || "PENDING"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/30">ASSET_ID</span>
                      <span className="text-white/80">{post.id.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/30">PLATFORM_ORIGIN</span>
                      <span className="text-white/80 uppercase">Instagram_Cloud</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-white/30">TIMESTAMP</span>
                      <span className="text-white/80">{post.date}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 flex gap-3">
                    <button className="flex-1 py-3 rounded-lg bg-accent text-black font-bold font-mono text-[11px] uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                      <Share2 size={14} /> Export_Case
                    </button>
                    <button className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                      <Info size={18} />
                    </button>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-all z-[210] group"
          >
            <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* HUD Corner Accents */}
          <div className="absolute top-0 left-0 p-10 opacity-40 hidden lg:block">
            <div className="w-40 h-[1px] bg-white/20 mb-2" />
            <div className="w-[1px] h-40 bg-white/20" />
            <span className="absolute top-12 left-12 font-mono text-[10px] text-white/20 rotate-90 origin-top-left">SYS_SCAN_V3.2</span>
          </div>
          <div className="absolute bottom-0 right-0 p-10 opacity-40 hidden lg:block">
            <div className="w-[1px] h-40 bg-white/20 ml-auto" />
            <div className="w-40 h-[1px] bg-white/20 mt-2" />
            <span className="absolute bottom-12 right-12 font-mono text-[10px] text-white/20 rotate-90 origin-bottom-right">ENCRYPTED_LOG</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
