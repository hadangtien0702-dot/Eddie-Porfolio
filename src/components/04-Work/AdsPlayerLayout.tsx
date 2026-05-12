import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { VideoPostItem } from "@/data/video-post";

export default function AdsPlayerLayout({ 
  selectedVideo, 
  getEmbedUrl 
}: { 
  selectedVideo: VideoPostItem; 
  getEmbedUrl: (url?: string) => string; 
}) {
  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[380px_1fr] bg-white/[0.02] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
    >
      {/* LEFT: Stats & Data */}
      <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-between border-r border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent max-h-screen overflow-y-auto scrollbar-hide">
        <div>
          {/* Video Title moved here */}
          <div className="mb-10 pb-10 border-b border-white/5">
            <h3 className="font-heading text-3xl font-black text-white leading-tight uppercase tracking-tighter mb-4">{selectedVideo.title}</h3>
            <div className="flex items-center gap-3">
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest font-bold">Directing & Post-Production</p>
              <div className="h-3 w-px bg-white/10" />
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{selectedVideo.brand}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30">
              <TrendingUp size={20} className="text-accent" />
            </div>
            <div>
              <p className="font-mono text-[9px] text-accent font-bold uppercase tracking-[0.2em]">Campaign Results</p>
              <h4 className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight">Performance Data</h4>
            </div>
          </div>

          <div className="space-y-8">
            {/* Editor-Focused Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 group/stat">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1 block">Hook Rate (3s)</span>
                <span className="font-heading text-2xl sm:text-3xl font-black text-white group-hover/stat:text-accent transition-colors">
                  {selectedVideo.stats.hookRate || "78%"}
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 group/stat">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1 block">Retention</span>
                <span className="font-heading text-2xl sm:text-3xl font-black text-white group-hover/stat:text-accent transition-colors">
                  {selectedVideo.stats.retention || "45%"}
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 group/stat">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1 block">CTR Impact</span>
                <span className="font-heading text-2xl sm:text-3xl font-black text-accent group-hover/stat:scale-110 origin-left transition-transform inline-block">
                  {selectedVideo.stats.ctr || "4.2%"}
                </span>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 group/stat">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1 block">Total Reach</span>
                <span className="font-heading text-2xl sm:text-3xl font-black text-white group-hover/stat:text-accent transition-colors">
                  {selectedVideo.stats.views}
                </span>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/30 font-body">Brand</span>
                  <span className="text-white font-bold">{selectedVideo.brand}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/30 font-body">Role</span>
                  <span className="text-white font-bold">{selectedVideo.role}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/30 font-body">Category</span>
                  <span className="text-white font-bold">{selectedVideo.category}</span>
                </div>
            </div>

            {/* Description */}
            <div className="pt-6">
                <p className="font-body text-[14px] text-white/50 leading-relaxed italic">
                  "{selectedVideo.description}"
                </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA or Share */}
        <div className="mt-12 flex flex-wrap gap-2">
            {selectedVideo.tags.map(tag => (
              <span key={tag} className="text-[9px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/40 uppercase tracking-widest">
                {tag}
              </span>
            ))}
        </div>
      </div>

      {/* RIGHT: Video Player */}
      <div className="relative aspect-video lg:aspect-auto bg-black flex items-center justify-center group">
        <iframe
          src={getEmbedUrl(selectedVideo.fullVideoUrl)}
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none', background: 'transparent' }}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      </div>
    </motion.div>
  );
}
