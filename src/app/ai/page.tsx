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

        <h1 className="font-heading text-6xl md:text-[clamp(3.5rem,8vw,4.5rem)] lg:text-9xl font-black tracking-tighter mb-8 max-w-6xl mx-auto leading-[0.9] md:leading-tight">
          <VerticalCutReveal splitBy="words" staggerDuration={0.05}>
            HỆ THỐNG HÓA SỰ SÁNG TẠO BẰNG A.I
          </VerticalCutReveal>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-body text-white/40 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Tôi xây dựng những cỗ máy sản xuất nội dung tự vận hành, giúp doanh nghiệp 
          phá vỡ giới hạn về tốc độ và chi phí thông qua sức mạnh của Generative AI.
        </motion.p>

        {/* QUICK STATS / PROBLEM-SOLUTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20 text-left">
           {[
             { label: "The Bottleneck", title: "Sản xuất truyền thống quá chậm", desc: "Quy trình cũ phụ thuộc quá nhiều vào con người, khiến chi phí tăng cao và khó đảm bảo tiến độ ở quy mô lớn.", icon: <Cpu className="w-5 h-5 text-red-500" /> },
             { label: "The Framework", title: "Quy trình AI-First", desc: "Tự động hóa các khâu lặp đi lặp lại bằng n8n và LLMs, giải phóng con người để tập trung vào chiến lược và sáng tạo cốt lõi.", icon: <Zap className="w-5 h-5 text-accent" /> },
             { label: "The Impact", title: "Tăng trưởng theo cấp số nhân", desc: "Sản xuất gấp 3 lần nội dung với chỉ 40% chi phí, trong khi vẫn duy trì chất lượng Cinematic cao cấp nhất.", icon: <Sparkles className="w-5 h-5 text-purple-500" /> }
           ].map((item, i) => (
             <motion.div 
               key={item.title}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8 + (i * 0.1) }}
               className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group"
             >
               <div className="mb-6 p-3 rounded-2xl bg-white/[0.03] w-fit group-hover:scale-110 transition-transform">
                 {item.icon}
               </div>
               <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em] mb-2 block">{item.label}</span>
               <h3 className="font-heading text-xl font-bold text-white mb-3 min-h-[2.5em] flex items-end">{item.title}</h3>
               <p className="font-body text-sm text-white/40 leading-relaxed min-h-[4em]">{item.desc}</p>
             </motion.div>
           ))}
        </div>
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
           <p className="font-body text-white/40 text-lg mb-12 relative z-10">Let&apos;s refine your production pipeline to achieve maximum efficiency and impact for your content strategy.</p>
           
           <button className="relative z-10 px-10 py-4 rounded-full bg-accent text-white font-bold font-body text-sm hover:scale-105 transition-all shadow-[0_10px_40px_rgba(255,64,0,0.3)]">
             Analyze Your Workflow
           </button>
        </div>
      </section>
    </main>
  );
}
