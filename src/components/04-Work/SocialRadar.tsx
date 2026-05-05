"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { SocialPostItem } from "@/data/social-post";

interface SocialRadarProps {
  posts: SocialPostItem[];
  dragX: MotionValue<number>;
  dragY: MotionValue<number>;
  scale?: number;
}

export default function SocialRadar({ posts, dragX, dragY, scale = 1.35 }: SocialRadarProps) {
  // Radar size is fixed
  const radarSize = 180;
  // Mapping the large canvas to the small radar
  // If canvas is +/- 6000, and radar is 180, factor is ~ 30
  const factor = 15; 

  const viewportX = useTransform(dragX, (v) => -v / factor + radarSize / 2);
  const viewportY = useTransform(dragY, (v) => -v / factor + radarSize / 2);

  return (
    <div className="fixed bottom-10 right-10 z-40">
      <div 
        className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-full overflow-hidden shadow-2xl"
        style={{ width: radarSize, height: radarSize }}
      >
        {/* Radar Sweeping Line */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-full h-full -ml-[50%] -mt-[50%] origin-center pointer-events-none z-10"
          style={{ 
            background: "conic-gradient(from 0deg, transparent 0%, rgba(255, 64, 0, 0.2) 100%)",
            borderRadius: "50%" 
          }}
        />

        {/* Radar Grid Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[75%] h-[75%] border border-white/5 rounded-full" />
          <div className="w-[50%] h-[50%] border border-white/5 rounded-full" />
          <div className="w-[25%] h-[25%] border border-white/5 rounded-full" />
          <div className="absolute w-full h-[1px] bg-white/5" />
          <div className="absolute h-full w-[1px] bg-white/5" />
        </div>

        {/* Post Indicators */}
        <div className="absolute inset-0">
          {posts.map((post) => (
            <div
              key={post.id}
              className="absolute w-1.5 h-1.5 bg-accent/40 rounded-full blur-[1px]"
              style={{
                left: `${(post.x * scale) / factor + radarSize / 2}px`,
                top: `${(post.y * scale) / factor + radarSize / 2}px`,
                transform: "translate(-50%, -50%)"
              }}
            />
          ))}
        </div>

        {/* Viewport Indicator (The dot representing YOU) */}
        <motion.div 
          style={{ x: viewportX, y: viewportY }}
          className="absolute w-3 h-3 border-2 border-white rounded-full -ml-1.5 -mt-1.5 z-20 shadow-[0_0_10px_white]"
        >
           <div className="w-full h-full bg-white/20 animate-ping rounded-full" />
        </motion.div>

        {/* Label */}
        <div className="absolute bottom-2 left-0 right-0 text-center">
           <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">Radar_Tracking</span>
        </div>
      </div>
      
      {/* HUD Corner Brackets for Radar */}
      <div className="absolute -inset-2 pointer-events-none opacity-40">
         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
         <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40" />
         <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40" />
         <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />
      </div>
    </div>
  );
}
