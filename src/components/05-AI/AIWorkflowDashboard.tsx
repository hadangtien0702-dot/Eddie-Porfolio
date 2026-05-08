"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BrainCircuit, 
  Cpu, 
  Workflow, 
  Zap, 
  Bot, 
  ChevronRight,
  Sparkles,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  tech: string[];
  color: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: "ideation",
    title: "Ý tưởng & Kịch bản",
    subtitle: "PHASE 01: CONCEPT",
    icon: <BrainCircuit className="w-6 h-6" />,
    description: "Sử dụng AI Agents để phân tích xu hướng thị trường và lên kịch bản tự động, tối ưu hóa tâm lý người xem.",
    details: [
      "Trend Analysis via GPT-4o",
      "Social Psychology Mapping",
      "Scripting Autopilot"
    ],
    tech: ["ChatGPT", "Custom Agents", "Perplexity"],
    color: "#ff4000"
  },
  {
    id: "visuals",
    title: "Sản xuất Hình ảnh",
    subtitle: "PHASE 02: VISUALS",
    icon: <Palette className="w-6 h-6" />,
    description: "Tạo ra các Key Visuals và Concept Art chất lượng cao làm nền tảng cho video cinematic.",
    details: [
      "High-Fidelity Generation",
      "Concept Art Creation",
      "Style Consistency Control"
    ],
    tech: ["Flux", "Google Banana", "Higgfield"],
    color: "#ff8c00"
  },
  {
    id: "motion",
    title: "Video & UGC Engine",
    subtitle: "PHASE 03: MOTION",
    icon: <Cpu className="w-6 h-6" />,
    description: "Biến hình ảnh và kịch bản thành video cinematic hoặc nhân vật UGC nói chuyện tự nhiên.",
    details: [
      "Cinematic Video Gen",
      "HeyGen Avatar Rendering",
      "UGC Logic Animation"
    ],
    tech: ["Kling", "Google Veo 3.1", "HeyGen"],
    color: "#00d2ff"
  },
  {
    id: "refine",
    title: "Tối ưu hóa Workflow",
    subtitle: "PHASE 04: REFINE",
    icon: <Zap className="w-6 h-6" />,
    description: "Nâng cấp chất lượng hình ảnh/video lên mức chuyên nghiệp và đồng bộ hóa âm thanh hoàn hảo.",
    details: [
      "Whisper Audio Sync",
      "Magnific Upscaling",
      "Style Refinement"
    ],
    tech: ["Whisper", "Magnific", "Freepik"],
    color: "#5a189a"
  },
  {
    id: "automation",
    title: "Tự động hóa & Public",
    subtitle: "PHASE 05: AUTOMATION",
    icon: <Workflow className="w-6 h-6" />,
    description: "Kết nối toàn bộ quy trình và tự động phân phối nội dung đa kênh (TikTok, Reels, Shorts).",
    details: [
      "n8n Orchestration",
      "Multi-Platform Sync",
      "Auto-Distribution Hub"
    ],
    tech: ["n8n", "Make", "Social APIs"],
    color: "#00ff88"
  }
];

export default function AIWorkflowDashboard() {
  const [activeStep, setActiveStep] = useState<string>("ideation");

  const currentStep = workflowSteps.find(s => s.id === activeStep) || workflowSteps[0];

  return (
    <div className="w-full max-w-7xl mx-auto py-20 px-6 lg:px-12">
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[1fr_400px] lg:gap-24">
        
        {/* LEFT SIDE: THE INTERACTIVE MAP */}
        <div className="relative">
          <div className="flex flex-col gap-6 relative z-10">
            {workflowSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "relative group cursor-pointer p-6 rounded-3xl border transition-all duration-500 overflow-hidden",
                  activeStep === step.id 
                    ? "bg-white/[0.05] border-white/20 shadow-[0_0_50px_rgba(255,64,0,0.1)]" 
                    : "bg-transparent border-white/5 hover:border-white/10"
                )}
                onClick={() => setActiveStep(step.id)}
              >
                {/* Connecting Line */}
                {idx < workflowSteps.length - 1 && (
                  <div className="absolute left-10 top-full h-6 w-px bg-gradient-to-b from-white/20 to-transparent" />
                )}

                <div className="flex items-center gap-6 relative z-10">
                  <div 
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                      activeStep === step.id ? "bg-accent text-white scale-110 shadow-[0_0_20px_rgba(255,64,0,0.4)]" : "bg-white/5 text-white/40"
                    )}
                    style={activeStep === step.id ? { backgroundColor: step.color } : {}}
                  >
                    {step.icon}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 mb-1">{step.subtitle}</span>
                    <h3 className={cn(
                      "font-heading text-xl md:text-2xl font-bold transition-colors duration-500",
                      activeStep === step.id ? "text-white" : "text-white/40 group-hover:text-white/60"
                    )}>
                      {step.title}
                    </h3>
                  </div>

                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-white/20" />
                  </div>
                </div>

                {/* Background Glow */}
                {activeStep === step.id && (
                  <motion.div 
                    layoutId="step-glow"
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-transparent to-white/5 opacity-50"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* BACKGROUND DECORATION */}
          <div className="absolute -left-20 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>

        {/* RIGHT SIDE: DETAIL PANEL */}
        <div className="relative lg:sticky lg:top-32 h-fit">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="p-8 rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-3xl shadow-2xl overflow-hidden"
            >
              {/* Animated Accent */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20" 
                style={{ backgroundColor: currentStep.color }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-accent" style={{ color: currentStep.color }} />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/60">System Breakdown</span>
                </div>

                <p className="font-body text-white/80 leading-relaxed mb-10 text-lg italic">
                  &quot;{currentStep.description}&quot;
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Core Capabilities</h4>
                    <div className="flex flex-col gap-3">
                      {currentStep.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentStep.color }} />
                          <span className="font-sans text-sm text-white/70">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStep.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-white/40 uppercase tracking-widest">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* HUD Decoration */}
                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] text-white/20 uppercase">Node Status</span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-green-500">
                      <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                      OPERATIONAL
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-[1px] bg-white/10" />
                     <Bot className="w-4 h-4 text-white/20" />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
