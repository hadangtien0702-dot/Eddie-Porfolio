"use client";

import React from "react";
import { motion } from "framer-motion";
import AIWorkflowDashboard from "@/components/05-AI/AIWorkflowDashboard";
import AITimelineEditor from "@/components/05-AI/AITimelineEditor";
import AIUseCaseCards from "@/components/05-AI/AIUseCaseCards";
import AutomationFlowDiagram from "@/components/05-AI/AutomationFlowDiagram";
import AICaseStudy from "@/components/05-AI/AICaseStudy";
import VerticalCutReveal from "@/components/ui/VerticalCutReveal";
import { Zap, Clock, Users, TrendingUp, Sparkles, Terminal } from "lucide-react";

export default function AIPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-accent selection:text-white overflow-hidden">
      {/* ─── NEURAL GRID BACKGROUND ─── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" />
      </div>

      {/* ─── SECTION 1: CINEMATIC HERO ─── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hidden lg:flex items-center gap-3"
          >
             <Terminal className="w-4 h-4 text-accent" />
             <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Pipeline: Optimized</span>
          </motion.div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/10 border border-accent/20 mb-10">
            <Sparkles className="w-3 h-3 text-accent fill-accent" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              Systems Architect & AI Automation
            </span>
          </div>

          <h1 className="font-heading text-6xl md:text-8xl lg:text-[clamp(4rem,10vw,9rem)] font-black tracking-tighter leading-[0.8] mb-12">
            <VerticalCutReveal splitBy="words" staggerDuration={0.05}>
              THE AGE OF
            </VerticalCutReveal>
            <span className="text-accent italic block">
              <VerticalCutReveal splitBy="words" staggerDuration={0.05}>
                AUTOMATED SCALE.
              </VerticalCutReveal>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-body text-white/40 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-16"
          >
            I design and deploy AI engines that transform manual marketing into 
            high-velocity content machines. Reaching millions, powered by intelligence.
          </motion.p>

          {/* Core Impact Row */}
          <div className="flex flex-wrap items-center justify-center gap-12 text-left">
             {[
               { label: "Reach Generated", value: "1.5M+" },
               { label: "Manual Effort", value: "0%" },
               { label: "Production Cost", value: "-90%" },
             ].map((stat, i) => (
               <motion.div
                 key={stat.label}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1 + i * 0.1 }}
               >
                 <div className="font-heading text-4xl font-black text-white">{stat.value}</div>
                 <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{stat.label}</div>
               </motion.div>
             ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-accent to-transparent"
        />
      </section>

      {/* ─── SECTION 2: THE TOOLKIT (Modules) ─── */}
      <AIUseCaseCards />

      {/* ─── SECTION 3: NEURAL INFRASTRUCTURE (Map + Diagram) ─── */}
      <section className="relative pt-24 pb-16 px-6 lg:px-12 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-20">
             <span className="font-mono text-[11px] text-accent uppercase tracking-[0.5em]">The Infrastructure</span>
             <h2 className="font-heading text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">
               NEURAL <span className="text-accent not-italic">ARCHITECTURE</span>
             </h2>
          </div>
          
          <div className="space-y-32">
            <AIWorkflowDashboard />
            <div className="pt-20 border-t border-white/5">
              <AutomationFlowDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: THE MISSION (Case Study) ─── */}
      <AICaseStudy />

      {/* ─── SECTION 6: THE PRODUCTION ENGINE (Timeline) ─── */}
      <section className="relative pt-12 pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-16">
             <span className="font-mono text-[11px] text-accent uppercase tracking-[0.5em]">Phase breakdown</span>
             <h2 className="font-heading text-5xl font-black text-white italic uppercase tracking-tighter">OPERATIONAL TIMELINE</h2>
          </div>
          <AITimelineEditor />
        </div>
      </section>

      {/* ─── SECTION 7: SCALE CALL ─── */}
      <section className="relative pt-12 pb-40 px-6 lg:px-12 text-center">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,64,0,0.05)_0%,transparent_70%)] pointer-events-none" />
         
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto"
         >
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white tracking-tighter mb-10">
              READY TO <span className="text-accent italic">AUTOMATE?</span>
            </h2>
            <p className="font-body text-white/40 text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
              I don&apos;t just use AI tools; I build custom orchestration systems that replace entire production teams.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/hadangtien"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 rounded-full bg-accent text-white font-black font-heading text-sm hover:scale-105 transition-all shadow-[0_15px_50px_rgba(255,64,0,0.4)]"
              >
                REQUEST SYSTEM AUDIT
              </a>
              <div className="flex items-center gap-4 px-6 py-4 rounded-full bg-white/5 border border-white/10">
                <div className="flex -space-x-2">
                  {["n8n.svg", "chatgpt.svg", "claude.svg", "perplexity.svg", "meta.svg"].map((img, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-white overflow-hidden shadow-xl">
                      <img src={`/images/logos/${img}`} alt="tool" className="w-full h-full object-contain p-1.5" />
                    </div>
                  ))}
                </div>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest ml-2">Orchestrated Stack</span>
              </div>
            </div>
         </motion.div>
      </section>
    </main>
  );
}
