"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Cpu, 
  FileText, 
  Video, 
  Mic, 
  Share2, 
  Database, 
  Zap,
  Activity,
  Terminal
} from "lucide-react";

interface Node {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
  x: number;
  y: number;
  desc: string;
  stats?: string;
}

const nodes: Node[] = [
  {
    id: "scraper",
    label: "PERPLEXITY",
    sublabel: "Trend Intel",
    icon: <Search className="w-5 h-5" />,
    color: "#20b2aa",
    x: 15,
    y: 20,
    desc: "Scans global trends across FB, YT, and TikTok 24/7 to find viral content patterns.",
    stats: "1.2k queries/day"
  },
  {
    id: "n8n",
    label: "N8N CORE",
    sublabel: "Neural Hub",
    icon: <Cpu className="w-5 h-5" />,
    color: "#ff4000",
    x: 50,
    y: 20,
    desc: "The central nervous system orchestrating all tool interactions and logic flows.",
    stats: "99.9% uptime"
  },
  {
    id: "llm",
    label: "CLAUDE 3.5",
    sublabel: "Cognitive Engine",
    icon: <FileText className="w-5 h-5" />,
    color: "#a855f7",
    x: 85,
    y: 20,
    desc: "Refines raw data into high-converting scripts with specific brand personality.",
    stats: "15ms latency"
  },
  {
    id: "production",
    label: "HEYGEN AI",
    sublabel: "Avatar Render",
    icon: <Video className="w-5 h-5" />,
    color: "#3b82f6",
    x: 65,
    y: 65,
    desc: "Generates high-fidelity 4K video avatars from static images and scripts.",
    stats: "4K 60FPS"
  },
  {
    id: "voice",
    label: "ELEVENLABS",
    sublabel: "Voice Clone",
    icon: <Mic className="w-5 h-5" />,
    color: "#ec4899",
    x: 35,
    y: 65,
    desc: "Ultra-realistic voice cloning with emotion-aware speech synthesis.",
    stats: "29+ Languages"
  },
  {
    id: "distro",
    label: "DISTRIBUTION",
    sublabel: "Graph API",
    icon: <Share2 className="w-5 h-5" />,
    color: "#34a853",
    x: 50,
    y: 90,
    desc: "Automated publishing to FB/Meta APIs with scheduled optimization.",
    stats: "Zero manual work"
  }
];

const connections = [
  { from: "scraper", to: "n8n" },
  { from: "n8n", to: "llm" },
  { from: "llm", to: "n8n" },
  { from: "n8n", to: "voice" },
  { from: "n8n", to: "production" },
  { from: "voice", to: "production" },
  { from: "production", to: "distro" }
];

export default function AutomationFlowDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>("n8n");
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "[SYSTEM] Fetching trends from Perplexity...",
        "[LLM] Claude 3.5 optimizing script v2.4...",
        "[RENDER] HeyGen preparing 4K buffer...",
        "[VOICE] ElevenLabs cloning voice harmonics...",
        "[API] Scheduling post to Facebook Graph...",
        "[HUB] Pipeline heartbeat: STABLE"
      ];
      setLogs(prev => [messages[Math.floor(Math.random() * messages.length)], ...prev].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getNodeById = (id: string) => nodes.find(n => n.id === id);

  return (
    <div className="relative pt-12 pb-16 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,64,0,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT: INFO PANEL */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[10px] text-accent uppercase tracking-[0.4em]">
                Engine Status: Live
              </span>
            </div>
            
            <div className="space-y-4">
              <p className="font-body text-white/40 text-lg leading-relaxed">
                Every tool is connected through a custom N8N orchestrator. 
                The system operates as a single organism from trend analysis to publishing.
              </p>
            </div>

            {/* LIVE CONSOLE */}
            <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-white/30" />
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">System Console</span>
                </div>
                <Activity className="w-3 h-3 text-accent animate-pulse" />
              </div>
              <div className="space-y-2 font-mono text-[10px] text-white/50">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, i) => (
                    <motion.div
                      key={log + i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex gap-2"
                    >
                      <span className="text-accent/50 truncate">{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE DIAGRAM */}
          <div className="w-full lg:w-2/3 aspect-[4/3] relative rounded-[3rem] border border-white/[0.05] bg-white/[0.01] p-8 overflow-hidden group/diagram">
            {/* SVG Layer for Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,64,0,0)" />
                  <stop offset="50%" stopColor="rgba(255,64,0,0.5)" />
                  <stop offset="100%" stopColor="rgba(255,64,0,0)" />
                </linearGradient>
              </defs>

              {connections.map((conn, i) => {
                const from = getNodeById(conn.from)!;
                const to = getNodeById(conn.to)!;
                const isActive = activeNode === conn.from || activeNode === conn.to;
                
                return (
                  <React.Fragment key={`${conn.from}-${conn.to}`}>
                    {/* Background line */}
                    <line
                      x1={`${from.x}%`} y1={`${from.y}%`}
                      x2={`${to.x}%`} y2={`${to.y}%`}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                    
                    {/* Active pulse line */}
                    {isActive && (
                      <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        x1={`${from.x}%`} y1={`${from.y}%`}
                        x2={`${to.x}%`} y2={`${to.y}%`}
                        stroke="rgba(255,64,0,0.4)"
                        strokeWidth="2"
                        filter="url(#glow)"
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/node"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {/* Node Box */}
                <div className={`relative px-4 py-3 rounded-2xl border transition-all duration-500 backdrop-blur-2xl flex flex-col items-center gap-1 min-w-[120px]
                  ${activeNode === node.id 
                    ? "bg-accent/[0.08] border-accent/40 shadow-[0_0_40px_rgba(255,64,0,0.15)]" 
                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${activeNode === node.id ? "text-accent bg-accent/10" : "text-white/30 bg-white/5"}`}>
                    {node.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-heading text-[10px] font-black tracking-widest text-white">{node.label}</div>
                    <div className="font-mono text-[8px] text-white/30 uppercase tracking-tighter">{node.sublabel}</div>
                  </div>

                  {/* Tooltip-like Info */}
                  <AnimatePresence>
                    {activeNode === node.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full mt-4 w-56 left-1/2 -translate-x-1/2 p-4 rounded-2xl bg-[#111] border border-accent/20 shadow-2xl z-30 pointer-events-none"
                      >
                        <p className="font-body text-[11px] text-white/60 leading-relaxed mb-3">
                          {node.desc}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <span className="font-mono text-[9px] text-white/20 uppercase">Metric</span>
                          <span className="font-mono text-[9px] text-accent font-bold">{node.stats}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
