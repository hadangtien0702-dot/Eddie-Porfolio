"use client";

import React from "react";
import { motion } from "framer-motion";
import AIWorkflowDashboard from "@/components/05-AI/AIWorkflowDashboard";
import AITimelineEditor from "@/components/05-AI/AITimelineEditor";
import VerticalCutReveal from "@/components/ui/VerticalCutReveal";
import { Bot, Cpu, Zap, Brain, Sparkles } from "lucide-react";

export default function AIPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-accent selection:text-white overflow-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_80%)]" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-32 pb-20 px-6 lg:px-12 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="px-4 py-1 rounded-full bg-accent/10 border border-accent/20 flex items-center gap-2">
            <Zap className="w-3 h-3 text-accent fill-accent" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Automation First</span>
          </div>
        </motion.div>

        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 max-w-6xl mx-auto">
          <VerticalCutReveal splitBy="words" staggerDuration={0.05}>
            AI POWERED PRODUCTION PIPELINE
          </VerticalCutReveal>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-body text-white/40 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Xây dựng quy trình sản xuất nội dung tự động hóa hoàn toàn từ bước lên ý tưởng, 
          điều phối Module thông qua n8n, đến việc tạo ra các concept UGC đột phá.
        </motion.p>
      </section>

      {/* FEATURED: AI TIMELINE ENGINE */}
      <section className="relative z-10 py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2 mb-12">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.4em]">Engine Showcase</span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-white italic">AI PRODUCTION TIMELINE</h2>
          </div>
          
          <AITimelineEditor />
        </div>
      </section>

      {/* WORKFLOW DASHBOARD */}
      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
           <div className="flex items-end justify-between border-b border-white/10 pb-10">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.4em]">Architecture</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">Interactive Workflow Map</h2>
              </div>
              <div className="hidden md:flex items-center gap-4 text-white/20 font-mono text-[10px] uppercase tracking-widest">
                <span>System: Online</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
           </div>
        </div>
        
        <AIWorkflowDashboard />
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="relative z-10 py-32 px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto p-12 lg:p-20 rounded-[3rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-3xl relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,64,0,0.1),transparent)]" />
           
           <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to automate your creative vision?</h2>
           <p className="font-body text-white/40 text-lg mb-12 relative z-10">Chúng ta có thể cùng nhau tinh chỉnh quy trình này để đạt được hiệu suất cao nhất cho các chiến dịch UGC của bạn.</p>
           
           <button className="relative z-10 px-10 py-4 rounded-full bg-accent text-white font-bold font-body text-sm hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,64,0,0.3)]">
             Phân Tích Quy Trình Chi Tiết
           </button>
        </div>
      </section>
    </main>
  );
}
