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
      <div className="p-8 lg:p-12 flex flex-col justify-between border-r border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30">
              <TrendingUp size={20} className="text-accent" />
            </div>
            <div>
              <p className="font-mono text-[9px] text-accent font-bold uppercase tracking-[0.2em]">Campaign Results</p>
              <h4 className="font-heading text-xl font-bold text-white tracking-tight">Performance Data</h4>
            </div>
          </div>

          <div className="space-y-8">
            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">Views</span>
                <span className="font-heading text-3xl font-bold text-white tracking-tighter">{selectedVideo.stats.views}</span>
              </div>
              {selectedVideo.stats.leads && (
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">Leads</span>
                  <span className="font-heading text-3xl font-bold text-accent tracking-tighter">+{selectedVideo.stats.leads}</span>
                </div>
              )}
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
        
        {/* Floating Title (Mobile Hidden - Moved to Bottom to avoid YouTube UI overlap) */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 hidden lg:block pointer-events-none bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="font-heading text-3xl font-bold text-white drop-shadow-2xl tracking-tighter">{selectedVideo.title}</h3>
            <div className="flex items-center gap-3 mt-1">
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest">Directing & Post-Production</p>
              <div className="h-2 w-px bg-white/20" />
              <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{selectedVideo.brand}</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
