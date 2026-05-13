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
  logo?: string;
  description: string;
  details: string[];
  tech: string[];
  color: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: "ideation",
    title: "Intelligence Hub",
    subtitle: "PHASE 01: INSIGHTS",
    icon: <BrainCircuit className="w-6 h-6" />,
    logo: "chatgpt.svg",
    description: "Hệ thống điều phối đa nhân hợp tác (Multi-LLM Agents) để phân tích xu hướng thị trường và lên kịch bản Viral dựa trên dữ liệu thực tế.",
    details: [
      "Quét xu hướng thời gian thực",
      "Kỹ thuật tâm lý Viral",
      "Tự động hóa Storyboard"
    ],
    tech: ["n8n", "GPT-4o", "Perplexity"],
    color: "#ff4000"
  },
  {
    id: "visuals",
    title: "Visual Foundation",
    subtitle: "PHASE 02: CONCEPTS",
    icon: <Palette className="w-6 h-6" />,
    logo: "flux.svg",
    description: "Tạo ra các Key Visuals và Concept Art chất lượng cao, đảm bảo tính nhất quán của thương hiệu trên mọi tài sản hình ảnh AI.",
    details: [
      "Đồng nhất phong cách hình ảnh",
      "Thiết kế Visual theo Brand",
      "Quy trình Concept Art tự động"
    ],
    tech: ["Flux.1", "Midjourney", "ComfyUI"],
    color: "#ff8c00"
  },
  {
    id: "motion",
    title: "Digital Human Engine",
    subtitle: "PHASE 03: PRODUCTION",
    icon: <Cpu className="w-6 h-6" />,
    logo: "heygen.png",
    description: "Sử dụng nhân vật ảo và công nghệ Cinematic Video Gen để sản xuất nội dung có người dẫn dắt mà không cần quay phim truyền thống.",
    details: [
      "Render Avatar 4K",
      "Lipsync đa ngôn ngữ",
      "Cinematic Motion Gen"
    ],
    tech: ["HeyGen", "Kling AI", "Luma Dream Machine"],
    color: "#00d2ff"
  },
  {
    id: "refine",
    title: "Sonic & Visual Polish",
    subtitle: "PHASE 04: REFINEMENT",
    icon: <Zap className="w-6 h-6" />,
    logo: "elevenlabs.svg",
    description: "Ứng dụng Voice Cloning và hậu kỳ AI để đảm bảo chất lượng âm thanh - hình ảnh đạt chuẩn Cinematic và thu hút người xem tối đa.",
    details: [
      "Nhân bản giọng nói AI",
      "Caption động tự động",
      "Nâng cấp chất lượng Video"
    ],
    tech: ["ElevenLabs", "Magnific AI", "CapCut AI"],
    color: "#5a189a"
  },
  {
    id: "automation",
    title: "Global Distribution",
    subtitle: "PHASE 05: SCALE",
    icon: <Workflow className="w-6 h-6" />,
    logo: "n8n.svg",
    description: "Quy trình xuất bản tự động hoàn toàn, giúp phân phối nội dung quy mô lớn lên TikTok, Reels và YouTube Shorts với tối ưu hóa SEO.",
    details: [
      "Trung tâm điều phối n8n",
      "Tự động tối ưu Metadata",
      "Phân phối đa kênh tự động"
    ],
    tech: ["n8n", "Social APIs", "Google Cloud"],
    color: "#00ff88"
  }
];

const ToolLogo = ({ logo, title, icon }: { logo?: string, title: string, icon: React.ReactNode }) => {
  const [error, setError] = React.useState(false);

  if (!logo || error) return <>{icon}</>;

  return (
    <img 
      src={`/images/logos/${logo}`} 
      alt={title} 
      className="w-full h-full object-contain p-2" 
      onError={() => setError(true)}
    />
  );
};

export default function AIWorkflowDashboard() {
  const [activeStep, setActiveStep] = useState<string>("ideation");

  const currentStep = workflowSteps.find(s => s.id === activeStep) || workflowSteps[0];

  return (
    <div className="relative">
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
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 overflow-hidden",
                      activeStep === step.id ? "bg-accent text-white scale-110 shadow-[0_0_20px_rgba(255,64,0,0.4)]" : "bg-white/5 text-white/40"
                    )}
                    style={activeStep === step.id ? { backgroundColor: step.color } : {}}
                  >
                    <ToolLogo logo={step.logo} title={step.title} icon={step.icon} />
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
