"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { viralVideos, ViralItem } from "@/data/viral-content";
import { TrendingUp } from "lucide-react";

function ViralCard({ item }: { item: ViralItem }) {
  return (
    <div className="relative w-[280px] h-[400px] rounded-2xl overflow-hidden group shrink-0 shadow-2xl border border-white/5">
      <Image
        src={item.thumbnail}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end gap-2">
        <div className="flex items-center gap-2">
           <div className="bg-accent px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,51,0,0.5)]">
              <TrendingUp size={12} className="text-white" />
              <span className="text-[12px] font-bold text-white tracking-tight">{item.views} Views</span>
           </div>
        </div>
        <h4 className="text-white font-heading font-bold text-lg leading-tight line-clamp-2 group-hover:text-accent transition-colors">
          {item.title}
        </h4>
      </div>
      
      {/* Hover Light Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
      </div>
    </div>
  );
}

export default function ViralWall() {
  // Triple the items to ensure smooth infinite loop
  const row1 = [...viralVideos, ...viralVideos, ...viralVideos];
  const row2 = [...viralVideos.slice().reverse(), ...viralVideos.slice().reverse(), ...viralVideos.slice().reverse()];

  return (
    <section className="pt-24 pb-32 overflow-hidden border-t border-white/5 relative z-10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col items-center text-center gap-4">
          <span className="font-mono text-accent text-[12px] font-bold uppercase tracking-[0.3em]">
            Viral Performance & Impact
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white tracking-tighter max-w-3xl">
            Stable Viral Growth <span className="text-white/20">Across Multiple Categories</span>
          </h2>
          <p className="font-body text-white/40 max-w-xl text-[16px] leading-relaxed">
             Consistent high-performance content creation, generating millions of organic views and driving massive social engagement for top brands and news channels.
          </p>
        </div>
      </div>

      {/* Marquee Rows */}
      <div className="flex flex-col gap-8 relative">
        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden group border-y border-white/[0.03] py-8">
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {row1.map((item, i) => (
              <ViralCard key={`${item.id}-r1-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden group border-b border-white/[0.03] pb-8">
          <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
            {row2.map((item, i) => (
              <ViralCard key={`${item.id}-r2-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Summary Badge */}
      <div className="mt-24 flex flex-center justify-center relative z-10">
         <div className="px-10 py-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex gap-12 items-center">
            <div className="flex flex-col items-center">
               <span className="text-white/30 text-[11px] font-mono uppercase tracking-widest mb-1">Total Impressions</span>
               <span className="text-white text-4xl font-heading font-black">50M+</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center">
               <span className="text-white/30 text-[11px] font-mono uppercase tracking-widest mb-1">Viral Campaigns</span>
               <span className="text-accent text-4xl font-heading font-black">120+</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center">
               <span className="text-white/30 text-[11px] font-mono uppercase tracking-widest mb-1">Retention Rate</span>
               <span className="text-white text-4xl font-heading font-black">88%</span>
            </div>
         </div>
      </div>
    </section>
  );
}
