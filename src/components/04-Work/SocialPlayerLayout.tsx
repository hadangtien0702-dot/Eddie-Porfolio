import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TrendingUp, Heart, MessageCircle, Share2, Music, Bookmark, Play, Sparkles, Layers, Zap, Palette } from "lucide-react";
import { VideoPostItem } from "@/data/video-post";

export default function SocialPlayerLayout({ 
  selectedVideo, 
  getEmbedUrl 
}: { 
  selectedVideo: VideoPostItem; 
  getEmbedUrl: (url?: string) => string; 
}) {
  // --- Category Logic ---
  const isCreative = selectedVideo.badge === "#creative";
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
                {isCreative ? "Creative Showcase" : "Viral Performance"}
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
          {/* Main Info Area: Views (for Performance) or Craft (for Creative) */}
          <div className="flex flex-col gap-10">
            {isCreative ? (
              /* --- CREATIVE CRAFT VIEW (Removed Header) --- */
              null
            ) : (
              /* --- PERFORMANCE DATA VIEW --- */
              <div className="flex flex-col gap-2 group cursor-default">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2 group-hover:text-accent/80 transition-colors duration-300">
                  <TrendingUp size={14} className="text-accent group-hover:animate-pulse" />
                  Total Views
                </span>
                <span className="font-sans text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 tracking-tighter drop-shadow-md group-hover:scale-105 origin-left transition-transform duration-500 whitespace-nowrap">
                  {selectedVideo.stats.views}
                </span>
              </div>
            )}

            {/* Right Side: Stats Grid (Performance) or Tech Specs (Creative) */}
            <div className="flex-grow">
               {isCreative ? (
                 /* --- TECH SPECS FOR CREATIVE --- */
                 <motion.div 
                    key={`creative-grid-${selectedVideo.id}`}
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                    }}
                    className="grid grid-cols-2 gap-x-12 gap-y-8"
                 >
                    {/* 1. COLOR GRADING (Vector Scope) */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} className="flex items-center gap-4 group/item cursor-default hover:bg-white/5 p-2 -m-2 rounded-xl transition-all">
                      <div className="relative w-14 h-14 rounded-full border border-white/10 bg-black/50 flex items-center justify-center overflow-hidden shrink-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                         <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-[1px] bg-white/10"/><div className="absolute h-full w-[1px] bg-white/10"/></div>
                         <div className="absolute w-full h-full mix-blend-screen opacity-80 group-hover/item:scale-125 transition-transform duration-700 animate-[spin_8s_linear_infinite]">
                            <div className="absolute w-6 h-6 bg-red-500 rounded-full blur-[6px] top-1 left-1 animate-pulse" style={{ animationDuration: '2s' }} />
                            <div className="absolute w-5 h-5 bg-cyan-500 rounded-full blur-[5px] bottom-1 left-5 animate-pulse" style={{ animationDuration: '3s' }} />
                            <div className="absolute w-4 h-4 bg-yellow-400 rounded-full blur-[5px] top-4 right-1 animate-pulse" style={{ animationDuration: '4s' }} />
                         </div>
                         <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,1)] z-10" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-0.5 group-hover/item:text-accent/80 transition-colors">Visual Tone</span>
                        <span className="font-sans text-base font-bold text-white/90 group-hover/item:text-white transition-colors">Color Grading</span>
                      </div>
                    </motion.div>

                    {/* 2. SPEED RAMPING (Velocity Curve) */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} className="flex items-center gap-4 group/item cursor-default hover:bg-white/5 p-2 -m-2 rounded-xl transition-all">
                      <div className="relative w-14 h-14 rounded-xl border border-white/10 bg-black/50 flex items-center justify-center overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:5px_5px]" />
                        <svg viewBox="0 0 40 40" className="w-full h-full p-1 opacity-80 group-hover/item:stroke-accent transition-colors duration-500 relative z-10">
                          <path id="speed-path" d="M 0 30 C 15 30, 15 10, 20 10 C 25 10, 25 30, 40 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/80 drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]" />
                          <circle r="2.5" fill="#ff4000" className="drop-shadow-[0_0_5px_rgba(255,64,0,1)]">
                             <animateMotion dur="2.5s" repeatCount="indefinite" path="M 0 30 C 15 30, 15 10, 20 10 C 25 10, 25 30, 40 30" />
                          </circle>
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-0.5 group-hover/item:text-accent/80 transition-colors">Motion Flow</span>
                        <span className="font-sans text-base font-bold text-white/90 group-hover/item:text-white transition-colors">Speed Ramping</span>
                      </div>
                    </motion.div>

                    {/* 3. VFX & COMPOSITING (3D Layers) */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} className="flex items-center gap-4 group/item cursor-default hover:bg-white/5 p-2 -m-2 rounded-xl transition-all">
                      <div className="relative w-14 h-14 rounded-xl border border-white/10 bg-black/50 flex items-center justify-center shrink-0 [perspective:200px]">
                        <div className="absolute w-7 h-7 border border-white/20 bg-white/5 rounded-[4px] transform -rotate-x-12 rotate-y-12 -translate-z-4 translate-y-1.5 animate-[pulse_3s_ease-in-out_infinite] group-hover/item:!translate-y-2.5 group-hover/item:!-translate-x-1.5 transition-transform duration-500" />
                        <div className="absolute w-7 h-7 border border-white/40 bg-white/10 rounded-[4px] transform -rotate-x-12 rotate-y-12 translate-z-0 group-hover/item:border-accent/80 group-hover/item:bg-accent/20 transition-all duration-500 z-10" />
                        <div className="absolute w-7 h-7 border border-white/60 bg-white/20 rounded-[4px] transform -rotate-x-12 rotate-y-12 translate-z-4 -translate-y-1.5 animate-[pulse_4s_ease-in-out_infinite] group-hover/item:!-translate-y-2.5 group-hover/item:!translate-x-1.5 transition-transform duration-500 z-20" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-0.5 group-hover/item:text-accent/80 transition-colors">Compositing</span>
                        <span className="font-sans text-base font-bold text-white/90 group-hover/item:text-white transition-colors">VFX Layers</span>
                      </div>
                    </motion.div>

                    {/* 4. SOUND DESIGN (Dynamic Waveform) */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} className="flex items-center gap-4 group/item cursor-default hover:bg-white/5 p-2 -m-2 rounded-xl transition-all">
                      <div className="relative w-14 h-14 rounded-xl border border-white/10 bg-black/50 flex items-center justify-center shrink-0 gap-[2px] px-1">
                        {[4, 10, 16, 6, 22, 12, 18, 8, 14, 4].map((h, i) => (
                           <div key={i} className="w-[3px] rounded-full bg-white/40 group-hover/item:bg-accent transition-colors duration-300" style={{ height: `${h}px`, animation: `pulse-wave ${1 + (i % 3) * 0.2}s infinite ease-in-out ${i * 0.15}s` }} />
                        ))}
                      </div>
                      <style dangerouslySetInnerHTML={{__html: `
                        @keyframes pulse-wave {
                          0%, 100% { transform: scaleY(1); }
                          50% { transform: scaleY(1.8); }
                        }
                        @keyframes flow-noise { to { stroke-dashoffset: -12; } }
                      `}} />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-0.5 group-hover/item:text-accent/80 transition-colors">Immersive</span>
                        <span className="font-sans text-base font-bold text-white/90 group-hover/item:text-white transition-colors">Sound Design</span>
                      </div>
                    </motion.div>

                    {/* 5. VOICE ENHANCE (Audio Cleanup) */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} className="flex items-center gap-4 group/item cursor-default hover:bg-white/5 p-2 -m-2 rounded-xl transition-all">
                      <div className="relative w-14 h-14 rounded-xl border border-white/10 bg-black/50 flex items-center justify-center overflow-hidden shrink-0">
                         {/* Flowing Noisy Waveform (Default) */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover/item:opacity-0 transition-opacity duration-500">
                           <svg viewBox="0 0 40 40" className="w-full h-full p-2">
                             <path d="M 0 20 L 5 10 L 10 30 L 15 15 L 20 25 L 25 10 L 30 20 L 35 15 L 40 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60" strokeDasharray="3 3" style={{ animation: 'flow-noise 0.5s linear infinite' }} />
                           </svg>
                         </div>
                         {/* Clean Line (On Hover) */}
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                           <svg viewBox="0 0 40 40" className="w-full h-full p-2">
                             <path d="M 5 20 L 35 20" fill="none" stroke="#ff4000" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_4px_rgba(255,64,0,0.8)]" />
                             <circle cx="20" cy="20" r="3" fill="#fff" className="animate-pulse" />
                           </svg>
                         </div>
                         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/10 to-transparent" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-0.5 group-hover/item:text-accent/80 transition-colors">Audio Process</span>
                        <span className="font-sans text-base font-bold text-white/90 group-hover/item:text-white transition-colors">Voice Enhance</span>
                      </div>
                    </motion.div>

                    {/* 6. ELEMENTS ASSET (Motion Graphics) */}
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }} className="flex items-center gap-4 group/item cursor-default hover:bg-white/5 p-2 -m-2 rounded-xl transition-all">
                      <div className="relative w-14 h-14 rounded-xl border border-white/10 bg-black/50 flex items-center justify-center shrink-0 overflow-hidden">
                         {/* Grid background */}
                         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4px_4px]" />
                         
                         {/* Orbiting primitives */}
                         <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
                           <div className="absolute w-3 h-3 border border-blue-400 bg-blue-500/20 rounded-full top-2 left-6 group-hover/item:scale-150 transition-transform duration-500" />
                         </div>
                         <div className="absolute inset-0 animate-[spin_6s_linear_infinite_reverse]">
                           <div className="absolute w-2.5 h-2.5 border border-accent bg-accent/20 rotate-45 bottom-2 right-6 group-hover/item:scale-150 transition-transform duration-500" />
                         </div>
                         <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                           <div className="absolute w-3 h-3 border border-white/60 bg-white/10 rounded-[3px] top-6 right-2 group-hover/item:scale-150 transition-transform duration-500" />
                         </div>
                         
                         {/* Center glowing node */}
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover/item:shadow-[0_0_15px_rgba(255,64,0,0.8)] transition-shadow duration-500" />
                            <div className="absolute w-8 h-8 border border-white/10 rounded-full border-t-transparent animate-[spin_3s_linear_infinite]" />
                         </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-0.5 group-hover/item:text-accent/80 transition-colors">Motion Graph</span>
                        <span className="font-sans text-base font-bold text-white/90 group-hover/item:text-white transition-colors">Elements Asset</span>
                      </div>
                    </motion.div>
                 </motion.div>
               ) : (
                 /* --- INTERACTION GRID FOR PERFORMANCE --- */
                 <div className="grid grid-cols-2 gap-x-12 gap-y-10">
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
               )}
            </div>
          </div>

          {selectedVideo.stats.leads && (
            <div className="flex flex-col gap-1 border-t border-white/10 pt-6">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Total Leads</span>
              <span className="font-sans text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-accent to-accent/60 tracking-tighter drop-shadow-md">+{selectedVideo.stats.leads}</span>
            </div>
          )}

          {/* Metadata */}
          <motion.div 
              key={`metadata-${selectedVideo.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-white/10"
          >
              <div className="flex flex-col gap-1.5 group cursor-default">
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Channel</span>
                <span className="font-sans text-sm text-white/90 font-bold group-hover:text-white transition-colors">{selectedVideo.brand}</span>
              </div>
              <div className="flex flex-col gap-1.5 group cursor-default">
                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">Role</span>
                <span className="font-sans text-sm text-white/90 font-bold group-hover:text-white transition-colors">{selectedVideo.role}</span>
              </div>
          </motion.div>


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
