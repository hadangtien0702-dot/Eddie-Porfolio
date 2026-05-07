import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TrendingUp, Heart, MessageCircle, Share2, Music, Bookmark, Play, Pause } from "lucide-react";
import { VideoPostItem } from "@/data/video-post";

export default function SocialPlayerLayout({ 
  selectedVideo, 
  getEmbedUrl 
}: { 
  selectedVideo: VideoPostItem; 
  getEmbedUrl: (url?: string) => string; 
}) {
  // Kiểm tra xem user có truyền link MP4 trực tiếp không
  const isNativeVideo = selectedVideo.fullVideoUrl?.toLowerCase().includes('.mp4');

  // --- Play/Pause State ---
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambilightRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (ambilightRef.current) ambilightRef.current.pause();
      } else {
        videoRef.current.play();
        if (ambilightRef.current) ambilightRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // --- 3D Hover State ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Tách riêng phần Hashtag ra khỏi Title để style cho đẹp
  const titleParts = selectedVideo.title.split(/(#.*)/);
  const mainTitle = titleParts[0];
  const hashtags = titleParts[1] || "";

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* PHILIPS HUE AMBILIGHT BACKGROUND */}
      {isNativeVideo && (
        <div className={`absolute inset-[-100px] -z-10 pointer-events-none blur-[100px] saturate-[2.5] mix-blend-screen transition-opacity duration-1000 ${isPlaying ? 'opacity-40' : 'opacity-10'}`}>
          <video 
            ref={ambilightRef}
            src={selectedVideo.fullVideoUrl}
            className="w-full h-full object-cover rounded-[100px]"
            autoPlay 
            loop 
            muted 
            playsInline
          />
        </div>
      )}

      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full h-full flex flex-col lg:flex-row bg-[#050505]/70 backdrop-blur-3xl border border-white/10 rounded-[48px] shadow-[0_0_100px_rgba(0,0,0,0.7)] overflow-hidden group/modal"
      >
      {/* Animated Glowing Border Sweep (Linked to Video Play State) */}
      <div 
        className={`absolute inset-0 rounded-[48px] pointer-events-none z-50 p-[2px] transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        style={{
          mask: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
          WebkitMask: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_80%,#ff4000_100%)] animate-spin" 
          style={{ animationDuration: '15s' }}
        />
      </div>

      {/* 1. CREATIVE DYNAMIC BACKGROUND (Card scoped) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Lớp nền Socials Wall */}
        <div className="absolute inset-0 flex opacity-[0.15] blur-[40px] scale-110 saturate-50 pointer-events-none">
            <div className="w-1/3 h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/04-Work/Socials/Wall1.jpg')" }} />
            <div className="w-1/3 h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/04-Work/Socials/Wall2.jpg')" }} />
            <div className="w-1/3 h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/04-Work/Socials/Wall3.jpg')" }} />
        </div>
        {/* Gradient làm dịu */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/80 to-[#050505]" />
        
        <div className="absolute inset-0 w-[100%] h-[100%] rounded-full bg-accent/20 blur-[150px] mix-blend-screen" />
        
        {selectedVideo.thumbnail && (
          <div 
            className="absolute inset-0 blur-[100px] opacity-10 scale-110 bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedVideo.thumbnail})` }}
          />
        )}
      </div>

      {/* 2. LEFT PANE: STATS & INFO (Connected Design) */}
      <div className="w-full lg:w-[45%] flex flex-col p-10 lg:p-14 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent">
        {/* Glass Glare */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

        {/* Video Title Area */}
        <div className="mb-10 group">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 font-mono text-[9px] text-accent uppercase tracking-widest shadow-[0_0_15px_rgba(255,64,0,0.1)] hover:bg-accent/40 hover:shadow-[0_0_20px_rgba(255,64,0,0.4)] hover:-translate-y-0.5 transition-all cursor-pointer">
                Viral Performance
              </span>
            </div>
            <h3 className="font-sans font-black tracking-tight drop-shadow-xl leading-[1.2]">
              <span className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 group-hover:to-white transition-colors duration-500">
                {mainTitle}
              </span>
              {hashtags && (
                <span className="block mt-2 text-lg md:text-xl text-accent font-bold opacity-70 tracking-wide group-hover:opacity-100 transition-opacity duration-500">
                  {hashtags}
                </span>
              )}
            </h3>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-10" />

        <div className="space-y-10 flex-grow">
          {/* Main Stats Area: Views + 4 Interactions */}
          <div className="flex flex-col xl:flex-row xl:items-center gap-8">
            {/* Massive Views */}
            <div className="flex flex-col gap-2 min-w-[140px] group cursor-default">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2 group-hover:text-accent/80 transition-colors duration-300">
                <TrendingUp size={14} className="text-accent group-hover:animate-pulse" />
                Total Views
              </span>
              <span className="font-sans text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 tracking-tighter drop-shadow-md group-hover:scale-105 origin-left transition-transform duration-500">
                {selectedVideo.stats.views}
              </span>
            </div>

            {/* Interaction 2x2 Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-l border-white/10 pl-8">
               <div className="flex flex-col gap-1 group cursor-default hover:bg-white/5 p-2 -m-2 rounded-xl transition-all duration-300">
                 <div className="flex items-center gap-2 text-white/40 mb-1 group-hover:text-white/80 transition-colors">
                   <Heart size={14} className="text-accent fill-accent/20 group-hover:fill-accent group-hover:scale-125 transition-all duration-300" />
                   <span className="font-mono text-[9px] uppercase tracking-widest">Likes</span>
                 </div>
                 <span className="font-sans text-2xl font-bold text-white tracking-tight group-hover:text-accent transition-colors">{selectedVideo.stats.likes || "-"}</span>
               </div>
               
               <div className="flex flex-col gap-1 group cursor-default hover:bg-white/5 p-2 -m-2 rounded-xl transition-all duration-300">
                 <div className="flex items-center gap-2 text-white/40 mb-1 group-hover:text-white/80 transition-colors">
                   <MessageCircle size={14} className="text-accent fill-accent/20 group-hover:fill-accent group-hover:scale-125 transition-all duration-300" />
                   <span className="font-mono text-[9px] uppercase tracking-widest">Comments</span>
                 </div>
                 <span className="font-sans text-2xl font-bold text-white tracking-tight group-hover:text-accent transition-colors">{selectedVideo.stats.comments || "-"}</span>
               </div>

               <div className="flex flex-col gap-1 group cursor-default hover:bg-white/5 p-2 -m-2 rounded-xl transition-all duration-300">
                 <div className="flex items-center gap-2 text-white/40 mb-1 group-hover:text-white/80 transition-colors">
                   <Bookmark size={14} className="text-accent fill-accent/20 group-hover:fill-accent group-hover:scale-125 transition-all duration-300" />
                   <span className="font-mono text-[9px] uppercase tracking-widest">Saves</span>
                 </div>
                 <span className="font-sans text-2xl font-bold text-white tracking-tight group-hover:text-accent transition-colors">{selectedVideo.stats.saves || "-"}</span>
               </div>

               <div className="flex flex-col gap-1 group cursor-default hover:bg-white/5 p-2 -m-2 rounded-xl transition-all duration-300">
                 <div className="flex items-center gap-2 text-white/40 mb-1 group-hover:text-white/80 transition-colors">
                   <Share2 size={14} className="text-accent group-hover:scale-125 transition-all duration-300" />
                   <span className="font-mono text-[9px] uppercase tracking-widest">Shares</span>
                 </div>
                 <span className="font-sans text-2xl font-bold text-white tracking-tight group-hover:text-accent transition-colors">{selectedVideo.stats.shares || "-"}</span>
               </div>
            </div>
          </div>

          {selectedVideo.stats.leads && (
            <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Total Leads</span>
              <span className="font-sans text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-accent to-accent/60 tracking-tighter drop-shadow-md">+{selectedVideo.stats.leads}</span>
            </div>
          )}

          {/* Metadata */}
          <div className="space-y-2 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center text-sm group cursor-default hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                <span className="text-white/40 font-mono text-[11px] uppercase tracking-wider group-hover:text-accent transition-colors">Channel</span>
                <span className="font-sans text-white font-bold group-hover:translate-x-[-4px] transition-transform">{selectedVideo.brand}</span>
              </div>
              <div className="flex justify-between items-center text-sm group cursor-default hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                <span className="text-white/40 font-mono text-[11px] uppercase tracking-wider group-hover:text-accent transition-colors">Role</span>
                <span className="font-sans text-white font-bold group-hover:translate-x-[-4px] transition-transform">{selectedVideo.role}</span>
              </div>
              <div className="flex justify-between items-center text-sm group cursor-default hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                <span className="text-white/40 font-mono text-[11px] uppercase tracking-wider group-hover:text-accent transition-colors">Category</span>
                <span className="font-sans text-white font-bold group-hover:translate-x-[-4px] transition-transform">{selectedVideo.category}</span>
              </div>
          </div>

          {/* Description */}
          <div className="pt-4">
              <p className="font-sans text-[14px] text-white/60 leading-relaxed italic border-l-2 border-accent/40 pl-4 hover:border-accent hover:text-white/90 hover:bg-white/5 p-3 -ml-3 rounded-r-xl transition-all duration-300 cursor-default">
                "{selectedVideo.description}"
              </p>
          </div>
        </div>

        {/* Bottom Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
            {selectedVideo.tags.map(tag => (
              <span key={tag} className="font-sans text-[10px] px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/60 uppercase tracking-widest backdrop-blur-md hover:bg-accent/20 hover:text-accent hover:border-accent/40 hover:-translate-y-1 transition-all cursor-pointer">
                {tag}
              </span>
            ))}
        </div>
      </div>

      {/* 3. RIGHT PANE: PREMIUM SHOWCASE */}
      <div className="w-full lg:w-[55%] relative flex flex-col items-center justify-center p-6 lg:p-10 bg-gradient-to-bl from-white/[0.02] to-transparent h-full">
        {/* The Phone (Scale by height to ensure it looks tall and premium while keeping 9:16) */}
        <div style={{ perspective: "1500px" }} className="relative h-[80vh] max-h-[850px] w-auto aspect-[9/16] shrink-0">
          <motion.div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="absolute inset-0 rounded-[42px] shadow-[0_0_120px_rgba(255,64,0,0.15)] ring-[10px] ring-[#030303] bg-black flex items-center justify-center group pointer-events-auto cursor-pointer"
            onClick={togglePlay}
          >
          {/* Titanium Edge Highlight */}
          <div className="absolute inset-0 rounded-[42px] ring-1 ring-white/10 pointer-events-none z-30" />
          
          {/* Glass Screen Glare */}
          <div className="absolute top-0 left-[-100%] w-[200%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-45 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-40 flex items-center justify-between px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)] pointer-events-none">
              <div className="w-12 h-2 bg-[#1a1a1a] rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
              <div className="relative w-3.5 h-3.5 rounded-full bg-[#0a0a2a] shadow-[0_0_4px_rgba(255,255,255,0.1)] flex items-center justify-center">
                <div className="w-1 h-1 bg-blue-500/40 rounded-full blur-[1px]" />
                <div className="absolute w-0.5 h-0.5 bg-white rounded-full top-1 left-1" />
              </div>
          </div>
          
          {/* Screen Content */}
          <div className="absolute inset-0 rounded-[32px] overflow-hidden bg-[#050505] z-10 flex items-center justify-center">
            {isNativeVideo ? (
              <div className="relative w-full h-full text-white font-sans">
                {/* NATIVE MP4 PLAYER */}
                <video 
                  ref={videoRef}
                  src={selectedVideo.fullVideoUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay 
                  loop 
                  playsInline
                />
                
                {/* Play/Pause Center Indicator */}
                {!isPlaying && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/90 border border-white/20">
                      <Play fill="currentColor" size={28} className="ml-1" />
                    </div>
                  </div>
                )}
                
                {/* Dark Gradient Overlay for Text Visibility */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none z-10" />

                {/* Toàn bộ không gian được giải phóng cho Video */}

                {/* Bottom Text Area - Phóng to Text */}
                <div className="absolute left-5 bottom-8 right-20 z-20">
                   <h4 className="font-bold text-base mb-1.5 drop-shadow-md">@{selectedVideo.brand.replace(/\s+/g, '').toLowerCase()}</h4>
                   <p className="text-sm text-white/90 line-clamp-2 leading-snug mb-4 drop-shadow-md">
                     {selectedVideo.title}
                   </p>
                   <div className="flex items-center gap-2 text-xs font-medium text-white/70 bg-black/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                     <Music size={14} className="animate-pulse" />
                     <span className="truncate max-w-[140px]">Original Sound - {selectedVideo.brand}</span>
                   </div>
                </div>
              </div>
            ) : (
              /* FALLBACK IFRAME (If user provides tiktok link instead of mp4) */
              <div className="relative w-full h-full flex items-center justify-center">
                <p className="absolute text-center px-4 text-xs text-white/40 z-0 font-sans">
                  Loading TikTok Web View...<br/>(Dùng file .mp4 để bật giao diện Native Premium)
                </p>
                <iframe
                  src={getEmbedUrl(selectedVideo.fullVideoUrl)}
                  className="absolute w-full h-[calc(100%+120px)] -top-[60px] left-0 z-10" 
                  style={{ border: 'none', background: 'transparent' }}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
    </div>
  );
}
