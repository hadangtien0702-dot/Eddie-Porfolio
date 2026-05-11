"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  Layers,
  Sparkles,
  BarChart3,
  Globe
} from "lucide-react";

const useCases = [
  {
    id: "visual",
    title: "AI Visual Concepts",
    icon: <ImageIcon className="w-6 h-6" />,
    tag: "Concept Phase",
    description: "Instead of manual sketching or stock photos, I use Flux.1 and Midjourney to generate high-end concept art and layouts instantly. This drastically reduces pre-production time.",
    impact: "90% Faster Ideation",
    tools: ["Flux.1", "Midjourney", "DALL-E 3"],
    details: [
      "AI-driven concept storyboard generation",
      "Consistent character/brand styling",
      "Instant layout testing for ads"
    ],
    color: "from-blue-500/20 to-transparent"
  },
  {
    id: "ugc",
    title: "AI Avatar (UGC)",
    icon: <Video className="w-6 h-6" />,
    tag: "Production Phase",
    description: "Creating UGC content without a studio. I clone a person's physical appearance into a 4K AI avatar that can say anything, in any language, at any time.",
    impact: "Zero Filming Cost",
    tools: ["HeyGen", "Synthesia", "DeepFace"],
    details: [
      "4K resolution high-fidelity renders",
      "Natural lip-sync and body language",
      "No studio or lighting equipment needed"
    ],
    color: "from-accent/20 to-transparent"
  },
  {
    id: "voice",
    title: "Neural Voice Cloning",
    icon: <Mic className="w-6 h-6" />,
    tag: "Post Phase",
    description: "I clone real human voices to create super-realistic speech. This allows for instant updates to scripts without the need for the actor to re-record.",
    impact: "29+ Languages instantly",
    tools: ["ElevenLabs", "RVC", "OpenVoice"],
    details: [
      "Emotion-aware speech synthesis",
      "Cross-lingual voice preservation",
      "Studio-quality output without mics"
    ],
    color: "from-purple-500/20 to-transparent"
  }
];

export default function AIUseCaseCards() {
  const [activeTab, setActiveTab] = useState(useCases[1].id);

  return (
    <section className="relative py-32 px-6 lg:px-12 bg-[#050505] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-3 h-3 text-accent" />
            <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.4em]">Core Capabilities</span>
          </motion.div>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-white tracking-tighter">
            THE <span className="text-accent italic">AI TOOLKIT</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {/* TABS */}
          <div className="flex flex-wrap justify-center gap-4">
            {useCases.map((uc) => (
              <button
                key={uc.id}
                onClick={() => setActiveTab(uc.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-heading text-xs font-black uppercase tracking-widest transition-all
                  ${activeTab === uc.id 
                    ? "bg-white text-black scale-105 shadow-[0_10px_30px_rgba(255,255,255,0.2)]" 
                    : "bg-white/5 text-white/40 border border-white/5 hover:border-white/20"
                  }`}
              >
                {uc.icon}
                {uc.title}
              </button>
            ))}
          </div>

          {/* DISPLAY AREA */}
          <div className="relative min-h-[500px]">
            <AnimatePresence mode="wait">
              {useCases.map((uc) => uc.id === activeTab && (
                <motion.div
                  key={uc.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="w-full"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-1 rounded-[3rem] bg-gradient-to-br ${uc.color} border border-white/10 backdrop-blur-3xl overflow-hidden`}>
                    
                    {/* LEFT: VISUAL/ICON */}
                    <div className="relative p-12 flex flex-col justify-between min-h-[400px]">
                       <div className="absolute inset-0 bg-white/[0.02] m-2 rounded-[2.5rem]" />
                       
                       <div className="relative z-10">
                          <div className="w-16 h-16 rounded-[2rem] bg-accent/20 border border-accent/30 flex items-center justify-center text-accent mb-8">
                             {uc.icon}
                          </div>
                          <span className="font-mono text-[10px] text-accent uppercase tracking-[0.4em] block mb-2">{uc.tag}</span>
                          <h3 className="font-heading text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                            {uc.title}
                          </h3>
                       </div>

                       <div className="relative z-10 flex flex-wrap gap-2">
                          {uc.tools.map(tool => (
                            <span key={tool} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-[9px] text-white/30 uppercase tracking-widest">{tool}</span>
                          ))}
                       </div>
                    </div>

                    {/* RIGHT: INFO */}
                    <div className="p-12 lg:pl-0 flex flex-col justify-center">
                       <p className="font-body text-white/50 text-xl leading-relaxed mb-10">
                          {uc.description}
                       </p>

                       <div className="space-y-4 mb-10">
                          {uc.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-4 text-white/70">
                               <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                               <span className="font-body text-base">{detail}</span>
                            </div>
                          ))}
                       </div>

                       <div className="flex items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/5">
                          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                             <BarChart3 className="w-6 h-6" />
                          </div>
                          <div>
                             <div className="font-mono text-[9px] text-white/30 uppercase tracking-widest mb-1">Measured Impact</div>
                             <div className="font-heading text-2xl font-black text-white">{uc.impact}</div>
                          </div>
                       </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
