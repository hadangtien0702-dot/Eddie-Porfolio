"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { socialPostHeading, socialPosts, SocialPostItem } from "@/data/social-post";

// ─── Icons ───
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);
const CommentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);
const ShareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);
const BookmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

import SocialHUDLightbox from "@/components/04-Work/SocialHUDLightbox";
import SocialRadar from "@/components/04-Work/SocialRadar";
import { uiSounds } from "@/utils/ui-sounds";

// ─── SocialCard Component ───
function SocialCard({ post, onSelect }: { post: SocialPostItem, onSelect: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = post.images && post.images.length > 0 ? post.images : [post.thumbnail];
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    uiSounds.playBeep();
    setCurrentSlide((p) => (p - 1 + images.length) % images.length);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    uiSounds.playBeep();
    setCurrentSlide((p) => (p + 1) % images.length);
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 w-0 h-0"
      style={{
        transform: `translate(${post.x * 1.35}px, ${post.y * 1.35}px)`,
        zIndex: 50
      }}
    >
      <motion.div
        whileHover={{ 
          scale: 1.05, 
          zIndex: 100,
          rotate: 0,
        }}
        onHoverStart={() => uiSounds.playBeep()}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => {
          uiSounds.playClick();
          onSelect();
        }}
        className="absolute w-[340px] md:w-[400px] -translate-x-1/2 -translate-y-1/2 bg-[#1a1a1a] rounded-[24px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 pb-4 cursor-pointer group"
        style={{
          rotate: post.rotation,
          transformOrigin: "center center",
        }}
      >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-accent/40 transition-colors">
            <Image src={post.avatar} alt={post.author} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-body text-[14px] font-semibold text-white leading-none mb-1 group-hover:text-accent transition-colors">{post.author}</h4>
            <div className="flex items-center gap-1.5 font-body text-[12px] text-white/50">
              <span>{post.date}</span>
              <span>•</span>
              <span className="font-medium text-accent">{post.brand}</span>
            </div>
          </div>
        </div>
        <button className="text-white/50 hover:text-white transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/>
          </svg>
        </button>
      </div>

      {/* Media Content */}
      <div className="relative w-full bg-black overflow-hidden">
        {post.type === "grid9" ? (
           <div className="grid grid-cols-3 gap-[2px] w-full aspect-square bg-[#1a1a1a]">
             {images.slice(0, 9).map((img, i) => (
               <div key={i} className="relative w-full h-full overflow-hidden">
                 <Image 
                   src={img} 
                   alt={`Grid ${i}`} 
                   fill 
                   className="object-cover transition-transform duration-700 group-hover:scale-110" 
                   sizes="(max-width: 768px) 33vw, 15vw" 
                 />
               </div>
             ))}
           </div>
        ) : (
          <div className={`relative w-full overflow-hidden ${post.type === "carousel" ? "aspect-square" : post.span === 2 ? "aspect-[4/5]" : "aspect-square"}`}>
            <Image
              src={images[currentSlide]}
              alt={post.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              sizes="(max-width: 768px) 100vw, 400px"
              priority={post.type === "video"}
            />

            {/* Carousel Controls */}
            {post.type === "carousel" && images.length > 1 && (
              <>
                <button onPointerDown={handlePrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all z-10 opacity-0 group-hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button onPointerDown={handleNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all z-10 opacity-0 group-hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
                {/* Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                  {images.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "w-3 bg-accent" : "w-1.5 bg-white/50"}`} />
                  ))}
                </div>
              </>
            )}

            {/* Video Play Button */}
            {post.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-500">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="group-hover:fill-accent transition-colors"><polygon points="8,5 20,12 8,19" /></svg>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-[#1a1a1a]">
        {/* Actions */}
        <div className="flex items-center justify-between mb-3 text-white">
          <div className="flex items-center gap-4">
             <button className="hover:text-accent transition-colors transform hover:scale-110" onClick={(e) => { e.stopPropagation(); uiSounds.playBeep(); }}><HeartIcon /></button>
             <button className="hover:text-white/70 transition-colors transform hover:scale-110" onClick={(e) => { e.stopPropagation(); uiSounds.playBeep(); }}><CommentIcon /></button>
             <button className="hover:text-white/70 transition-colors transform hover:scale-110" onClick={(e) => { e.stopPropagation(); uiSounds.playBeep(); }}><ShareIcon /></button>
          </div>
          <button className="hover:text-white/70 transition-colors transform hover:scale-110" onClick={(e) => { e.stopPropagation(); uiSounds.playBeep(); }}><BookmarkIcon /></button>
        </div>

        {/* Likes */}
        <div className="font-body text-[14px] font-semibold text-white mb-2 group-hover:text-accent transition-colors">
          {post.likes} likes
        </div>

        {/* Caption */}
        <div className="font-body text-[14px] text-white/90 leading-snug">
          <span className="font-bold mr-2">{post.author}</span>
          {post.title} — <span className="text-white/60 group-hover:text-white/80 transition-colors">{post.description}</span>
        </div>

        {/* Comments link */}
        <div className="font-body text-[13px] text-white/40 mt-2">
          View all {post.comments} comments
        </div>
      </div>

      {/* Cool glow effect behind card */}
      <div className="absolute inset-0 -z-10 rounded-[24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 50px 10px rgba(255, 64, 0, 0.2)' }} />
      </motion.div>
    </div>
  );
}

// ─── Main Page ───
export default function SocialPostPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<SocialPostItem | null>(null);
  const [activeBrand, setActiveBrand] = useState<string>("ALL");
  
  // Controls for canvas panning
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const dragX = useSpring(x, { stiffness: 400, damping: 40 });
  const dragY = useSpring(y, { stiffness: 400, damping: 40 });

  // Handle re-center
  const handleRecenter = () => {
    uiSounds.playClick();
    x.set(0);
    y.set(0);
  };

  const brands = ["ALL", ...Array.from(new Set(socialPosts.map(p => p.brand)))];

  const filteredPosts = activeBrand === "ALL" 
    ? socialPosts 
    : socialPosts.filter(p => p.brand === activeBrand);

  return (
    <main className="relative w-full h-screen h-[100dvh] bg-[#0a0a0a] overflow-hidden select-none">
      {/* ── Background Dot Pattern ── */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0",
          x: dragX,
          y: dragY, // Move dots slightly with drag (parallax) or match the drag
        }}
      />
      
      {/* Heavy vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(circle at center, transparent 30%, #0a0a0a 100%)' }} />

      {/* ── Draggable Infinite Canvas ── */}
      <div ref={containerRef} className="absolute inset-0 z-20 overflow-hidden touch-none pointer-events-none">
        <motion.div
           drag
           dragConstraints={{ left: -4000, right: 4000, top: -4000, bottom: 4000 }}
           dragElastic={0.1}
           dragMomentum={true}
           style={{ x, y }}
           // Massive draggable area to capture mouse movements
           className="absolute top-1/2 left-1/2 w-[12000px] h-[12000px] -ml-[6000px] -mt-[6000px] focus:outline-none pointer-events-auto cursor-grab active:cursor-grabbing"
        >
           {/* Center Marker (optional debug/aesthetic) */}
           <div className="absolute top-1/2 left-1/2 -ml-20 -mt-20 w-40 h-40 bg-accent/20 blur-[60px] rounded-full pointer-events-none" />
           <div className="absolute top-1/2 left-1/2 -ml-2 -mt-2 w-4 h-4 rounded-full border border-white/20 flex items-center justify-center pointer-events-none">
             <div className="w-1 h-1 bg-white/50 rounded-full" />
           </div>

           {/* Render all post cards */}
           <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <SocialCard 
                  post={post} 
                  onSelect={() => setSelectedPost(post)}
                />
              </motion.div>
            ))}
           </AnimatePresence>
        </motion.div>
      </div>

      {/* ── UI Overlays (Fixed to screen) ── */}
      
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 md:p-10 z-30 flex flex-col md:flex-row items-start justify-between pointer-events-none">
        <div className="max-w-xl pointer-events-auto">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-body text-sm text-white/50 hover:text-white transition-colors mb-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
            onMouseEnter={() => uiSounds.playBeep()}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Work
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-white tracking-tight mb-4 drop-shadow-2xl">
            Social Media <span className="text-accent">Archive</span>
          </h1>
          
          {/* Brand Filter */}
          <div className="flex flex-wrap gap-2 mt-6">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => {
                  uiSounds.playClick();
                  setActiveBrand(brand);
                }}
                onMouseEnter={() => uiSounds.playBeep()}
                className={`px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                  activeBrand === brand 
                    ? "bg-accent border-accent text-black font-bold shadow-[0_0_20px_rgba(255,64,0,0.4)]" 
                    : "bg-black/40 border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Re-center Button */}
        <div className="mt-6 md:mt-0 flex gap-4 pointer-events-auto">
          <button
            onClick={handleRecenter}
            onMouseEnter={() => uiSounds.playBeep()}
            className="flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300 group"
            title="Khôi phục góc nhìn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-90 transition-transform duration-500">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span className="hidden md:block font-body text-sm text-white ml-2">Center View</span>
          </button>
        </div>
      </div>


      {/* Footer Overlay (Stats) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-30 flex items-end justify-center pointer-events-none">
        <div className="flex items-center gap-6 md:gap-12 bg-black/50 backdrop-blur-2xl px-8 py-5 rounded-full border border-white/10 shadow-2xl pointer-events-auto">
          {socialPostHeading.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-heading text-xl md:text-2xl font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="font-body text-[10px] md:text-[11px] text-white/40 font-medium uppercase tracking-[0.1em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Radar Mini-Map ── */}
      <SocialRadar 
        posts={filteredPosts} 
        dragX={dragX} 
        dragY={dragY} 
      />

      {/* ── HUD Lightbox ── */}
      <SocialHUDLightbox 
        post={selectedPost} 
        onClose={() => setSelectedPost(null)} 
      />
      
    </main>
  );
}
