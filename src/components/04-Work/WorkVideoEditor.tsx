"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useMotionValue, useSpring, useVelocity, useMotionValueEvent, useScroll } from "framer-motion";
import VideoCarousel3D from "./VideoCarousel3D";
import Image from "next/image";
import { uiSounds } from "@/utils/ui-sounds";
import { 
  Folder, Film, Music, Play, Pause, Volume2, Maximize2, 
  Eye, EyeOff, Lock, Unlock, Search, Settings, ChevronRight, 
  ChevronDown, Video, AudioLines, Scissors, MousePointer, 
  Hand, Type, Activity, Sliders, Palette, Info, Check, RefreshCw,
  FileText
} from "lucide-react";

export default function WorkVideoEditor() {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);
  const [activeTool, setActiveTool] = useState("select");
  
  // Folders tree state in Project Bin
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    sequences: true,
    footage: true,
    audio: false,
    gfx: false,
    sfx: false
  });

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  // Mock Assets data
  const assets = [
    {
      id: "astronaut",
      name: "ASTRONAUT_CLOSE.mp4",
      path: "/images/astronaut_cinematic.png",
      duration: "00:05:11",
      resolution: "4K 16:9 | 60 FPS",
      camera: "CAM_01",
      iso: "ISO 400 · F/2.8 · 1/50"
    },
    {
      id: "city_drone",
      name: "CITY_DRONE_01.mp4",
      path: "/images/city_drone.png",
      duration: "00:08:04",
      resolution: "4K 16:9 | 60 FPS",
      camera: "CAM_02",
      iso: "ISO 800 · F/4.0 · 1/100"
    },
    {
      id: "space_station",
      name: "SPACE_STATION_02.mp4",
      path: "/images/space_station.png",
      duration: "00:07:19",
      resolution: "4K 16:9 | 60 FPS",
      camera: "CAM_03",
      iso: "ISO 200 · F/1.8 · 1/24"
    },
    {
      id: "planet_surface",
      name: "PLANET_SURFACE.mp4",
      path: "/images/planet_surface.png",
      duration: "00:06:07",
      resolution: "4K 16:9 | 60 FPS",
      camera: "CAM_04",
      iso: "ISO 640 · F/2.8 · 1/50"
    }
  ];

  const [activeAsset, setActiveAsset] = useState(assets[0]);

  // Track lock/mute/solo states
  const [trackStates, setTrackStates] = useState({
    V3: { locked: false, visible: true },
    V2: { locked: false, visible: true },
    V1: { locked: false, visible: true },
    A1: { locked: false, muted: false, soloed: false },
    A2: { locked: false, muted: false, soloed: false },
    A3: { locked: false, muted: false, soloed: false }
  });

  const toggleTrackProperty = (track: string, prop: string) => {
    setTrackStates(prev => {
      const trackState = prev[track as keyof typeof prev];
      return {
        ...prev,
        [track]: {
          ...trackState,
          [prop]: !((trackState as any)[prop])
        }
      };
    });
  };

  // ─── Scroll Animation Logic ───
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // HUD Elements Assembly & Fade
  const editorScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.93, 1, 1, 0.93]);
  const editorOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  // ─── Drag & Timeline Animation Logic ───
  const trackRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragProgress = useMotionValue(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const trackWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  
  // DOM element refs for 60fps bypass updates
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const monitorTimecodeRef = useRef<HTMLSpanElement>(null);
  const posXRef = useRef<HTMLSpanElement>(null);
  const scaleValueRef = useRef<HTMLSpanElement>(null);
  const rotationValueRef = useRef<HTMLSpanElement>(null);
  const intensityValueRef = useRef<HTMLSpanElement>(null);
  const intensitySliderRef = useRef<HTMLInputElement>(null);
  
  // Fake video duration for timecode
  const FAKE_DURATION = 60; 

  useMotionValueEvent(dragX, "change", (latest) => {
    // Self-healing: if width is not measured yet, try to measure it
    if (trackWidthRef.current <= 0 && trackRef.current) {
      const width = trackRef.current.offsetWidth;
      if (width > 0) {
        trackWidthRef.current = width;
        setTrackWidth(width);
      }
    }
    
    const currentWidth = trackWidthRef.current;
    if (currentWidth <= 0) return;
    const x = Math.max(0, Math.min(latest, currentWidth));
    const percent = x / currentWidth;
    
    dragProgress.set(percent);

    const currentSeconds = percent * FAKE_DURATION;
    const frames = Math.floor((currentSeconds % 1) * 24);
    const s = Math.floor(currentSeconds % 60);
    const m = Math.floor(currentSeconds / 60);
    const pad = (n: number) => n.toString().padStart(2, "0");
    
    const timecodeString = `01:${pad(m)}:${pad(s)}:${pad(frames)}`;
    if (timecodeRef.current) {
      timecodeRef.current.textContent = timecodeString;
    }
    if (monitorTimecodeRef.current) {
      monitorTimecodeRef.current.textContent = timecodeString;
    }

    // Dynamic Effect Controls Updates (real-time feedback without re-renders)
    const scaleVal = (90 + percent * 18).toFixed(1);
    const posXVal = (960 + (percent - 0.5) * 160).toFixed(1);
    const rotVal = ((percent - 0.5) * 15).toFixed(1);
    const intensityVal = (20 + percent * 60).toFixed(1);

    if (scaleValueRef.current) scaleValueRef.current.textContent = `${scaleVal}%`;
    if (posXRef.current) posXRef.current.textContent = posXVal;
    if (rotationValueRef.current) rotationValueRef.current.textContent = `${rotVal}°`;
    if (intensityValueRef.current) intensityValueRef.current.textContent = intensityVal;
    if (intensitySliderRef.current) intensitySliderRef.current.value = intensityVal;
  });

  // Sync scrollYProgress with playhead dragX to drive timeline scrub on page scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isDraggingRef.current) return;
    
    // Self-healing: if width is not measured yet, try to measure it
    if (trackWidthRef.current <= 0 && trackRef.current) {
      const width = trackRef.current.offsetWidth;
      if (width > 0) {
        trackWidthRef.current = width;
        setTrackWidth(width);
      }
    }

    const currentWidth = trackWidthRef.current;
    if (currentWidth <= 0) return;

    // Scrub is active over the main scroll range (scrollYProgress 0.40 to 0.75)
    if (latest >= 0.40 && latest <= 0.75) {
      const scrollPercent = (latest - 0.40) / (0.75 - 0.40);
      dragX.set(scrollPercent * currentWidth);
    } else if (latest < 0.40) {
      dragX.set(0);
    } else if (latest > 0.75) {
      dragX.set(currentWidth);
    }
  });

  // Handle initialization on mount and track width adjustments on resize
  useEffect(() => {
    const updatePlayheadAndWidth = () => {
      if (!trackRef.current) return;
      const width = trackRef.current.offsetWidth;
      trackWidthRef.current = width;
      setTrackWidth(width);
      if (width <= 0) return;

      const latest = scrollYProgress.get();
      if (latest >= 0.40 && latest <= 0.75) {
        const scrollPercent = (latest - 0.40) / (0.75 - 0.40);
        dragX.set(scrollPercent * width);
      } else if (latest < 0.40) {
        dragX.set(0);
      } else if (latest > 0.75) {
        dragX.set(width);
      }
    };

    // Run initially after DOM layout stabilizes to prevent layout race conditions
    const timer = setTimeout(updatePlayheadAndWidth, 200);

    // Also run on resize to recalculate trackWidth
    window.addEventListener("resize", updatePlayheadAndWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePlayheadAndWidth);
    };
  }, [scrollYProgress, dragX]);

  // ─── 3D Mode Layout Calculations (Scrub Aligns Layers) ───
  const layer1Z = useTransform(dragProgress, [0, 1], [-300, 0]);
  const layer1RotateX = useTransform(dragProgress, [0, 1], [30, 0]);
  const layer1RotateY = useTransform(dragProgress, [0, 1], [-30, 0]);

  const layer2Z = useTransform(dragProgress, [0, 1], [-100, 0]);
  const layer2RotateX = useTransform(dragProgress, [0, 1], [-20, 0]);
  const layer2RotateY = useTransform(dragProgress, [0, 1], [20, 0]);

  const layer3Z = useTransform(dragProgress, [0, 1], [100, 0]);
  const layer3RotateX = useTransform(dragProgress, [0, 1], [20, 0]);
  const layer3RotateY = useTransform(dragProgress, [0, 1], [-20, 0]);

  const layer4Z = useTransform(dragProgress, [0, 1], [250, 0]);
  const layer4RotateX = useTransform(dragProgress, [0, 1], [-30, 0]);
  const layer4RotateY = useTransform(dragProgress, [0, 1], [30, 0]);

  // Viewport camera rotation for depth
  const sceneRotateY = useTransform(dragProgress, [0, 1], [25, -5]);
  const sceneRotateX = useTransform(dragProgress, [0, 1], [15, -2]);
  const sceneScale = useTransform(dragProgress, [0, 1], [0.65, 0.95]);

  const masterGlowOpacity = useTransform(dragProgress, [0.85, 1], [0, 0.7]);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    dragX.set(Math.max(0, Math.min(x, rect.width)));
  };

  const handleRenderShowcase = () => {
    uiSounds.playClick();
    setIsCarouselOpen(true);
  };

  const handleAssetSelect = (asset: typeof activeAsset) => {
    uiSounds.playClick();
    setActiveAsset(asset);
  };

  return (
    <section ref={containerRef} id="work" className="relative w-full h-[280vh] bg-[#040406]">
      {/* Pinned Sticky Workspace */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center p-3 md:p-6">
        
        {/* Main Editor UI Frame */}
        <motion.div 
          style={{ scale: editorScale, opacity: editorOpacity }}
          className="w-full max-w-[1580px] h-[92vh] max-h-[820px] bg-[#07080c] border border-white/10 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-[#e2e8f0] font-sans ring-1 ring-white/5 z-10 select-none"
        >
          {/* 1. Header Bar */}
          <header className="h-11 bg-[#0a0c10] border-b border-white/5 flex items-center justify-between px-4 md:px-5 shrink-0">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIs3DMode(!is3DMode)}>
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                <span className="font-heading font-black text-xs tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">NEXUS EDIT</span>
              </div>
              <div className="h-3 w-px bg-white/10 hidden sm:block" />
              {/* Menu Tabs */}
              <nav className="flex items-center gap-1 sm:gap-2 h-full text-[10px] sm:text-xs font-mono font-medium text-zinc-400">
                {["EDIT", "COLOR", "EFFECTS", "AUDIO", "EXPORT"].map(tab => (
                  <button 
                    key={tab} 
                    className={`px-3 py-1 rounded transition-colors ${tab === "EDIT" ? "text-cyan-400 bg-white/5 border border-cyan-400/20 font-bold" : "hover:text-white"}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Render Engine specs */}
            <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono">
              <button 
                onClick={handleRenderShowcase}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#ff4000] to-[#e83600] hover:brightness-110 text-white font-heading font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/15 transition-all shadow-[0_0_15px_rgba(255,64,0,0.2)]"
              >
                <span>3D SHOWCASE</span>
                <Sliders className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span className="text-zinc-400 uppercase tracking-wider text-[9px]">ENGINE</span>
                <span className="text-green-400 font-bold text-[9px]">ONLINE</span>
              </div>
              <div className="bg-zinc-900 border border-white/5 px-2.5 py-1 rounded-md text-cyan-400 font-bold text-[9px] tracking-wider hidden sm:block">
                60 FPS
              </div>
            </div>
          </header>

          {/* 2. Main Work Area (Three Column Grid) */}
          <div className="flex-1 flex min-h-0 relative overflow-hidden bg-[#050608]">
            
            {/* Left Column: Project/Media Bin */}
            <aside className="w-[280px] border-r border-white/5 bg-[#090b0f] flex flex-col min-h-0 shrink-0 hidden lg:flex">
              {/* Folder list toolbar */}
              <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">PROJECT BIN</span>
                <div className="flex gap-2">
                  <div className="p-1 text-zinc-500 hover:text-white rounded cursor-pointer transition-colors"><Search className="w-3.5 h-3.5" /></div>
                  <div className="p-1 text-zinc-500 hover:text-white rounded cursor-pointer transition-colors"><Settings className="w-3.5 h-3.5" /></div>
                </div>
              </div>
              
              {/* Assets Tree & Grid Container */}
              <div className="flex-1 overflow-y-auto p-2 scrollbar-hide flex flex-col gap-2">
                {/* Folder 1: Sequences */}
                <div className="flex flex-col">
                  <div 
                    onClick={() => toggleFolder("sequences")} 
                    className="flex items-center gap-1.5 px-1 py-1 text-xs text-zinc-300 hover:bg-white/5 rounded cursor-pointer transition-colors"
                  >
                    {expandedFolders.sequences ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                    <Folder className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-mono text-[11px] truncate flex-1">01_SEQUENCES</span>
                    <span className="font-mono text-[9px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">1</span>
                  </div>
                  {expandedFolders.sequences && (
                    <div className="pl-6 flex flex-col py-0.5">
                      <div className="flex items-center gap-2 px-1.5 py-1 text-xs text-cyan-400 bg-cyan-500/5 border border-cyan-500/10 rounded cursor-pointer font-medium font-mono text-[11px]">
                        <Film className="w-3.5 h-3.5" />
                        <span className="truncate">SEQ_MASTER_V3</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Folder 2: Footage */}
                <div className="flex flex-col">
                  <div 
                    onClick={() => toggleFolder("footage")} 
                    className="flex items-center gap-1.5 px-1 py-1 text-xs text-zinc-300 hover:bg-white/5 rounded cursor-pointer transition-colors"
                  >
                    {expandedFolders.footage ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                    <Folder className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-mono text-[11px] truncate flex-1">02_FOOTAGE</span>
                    <span className="font-mono text-[9px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">{assets.length}</span>
                  </div>
                  {expandedFolders.footage && (
                    <div className="pl-2 flex flex-col gap-1 py-1">
                      {assets.map(asset => (
                        <div 
                          key={asset.id}
                          onClick={() => handleAssetSelect(asset)}
                          className={`flex items-center gap-2 p-1.5 rounded cursor-pointer border transition-all ${activeAsset.id === asset.id ? "bg-white/5 border-cyan-500/20 shadow-sm" : "border-transparent hover:bg-white/5"}`}
                        >
                          <div className="relative w-12 h-8 rounded overflow-hidden border border-white/10 bg-black shrink-0">
                            <Image src={asset.path} alt={asset.name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Play className="w-2.5 h-2.5 text-white fill-white" />
                            </div>
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="font-mono text-[10px] text-zinc-300 truncate font-semibold">{asset.name}</div>
                            <div className="font-mono text-[8px] text-zinc-500">{asset.duration} · {asset.resolution.split(" ")[0]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Folder 3: Audio */}
                <div className="flex flex-col">
                  <div 
                    onClick={() => toggleFolder("audio")} 
                    className="flex items-center gap-1.5 px-1 py-1 text-xs text-zinc-300 hover:bg-white/5 rounded cursor-pointer transition-colors"
                  >
                    {expandedFolders.audio ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                    <Folder className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono text-[11px] truncate flex-1">03_AUDIO</span>
                    <span className="font-mono text-[9px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">3</span>
                  </div>
                  {expandedFolders.audio && (
                    <div className="pl-6 flex flex-col py-0.5 gap-1 font-mono text-[10px] text-zinc-400">
                      <div className="flex items-center gap-1.5 p-1 rounded hover:bg-white/5"><Music className="w-3 h-3 text-emerald-400" /> <span>IMPACT_WHOOSH.wav</span></div>
                      <div className="flex items-center gap-1.5 p-1 rounded hover:bg-white/5"><Music className="w-3 h-3 text-emerald-400" /> <span>EPIC_BEAT_BG.mp3</span></div>
                    </div>
                  )}
                </div>

                {/* Folder 4: GFX */}
                <div className="flex flex-col">
                  <div 
                    onClick={() => toggleFolder("gfx")} 
                    className="flex items-center gap-1.5 px-1 py-1 text-xs text-zinc-300 hover:bg-white/5 rounded cursor-pointer transition-colors"
                  >
                    {expandedFolders.gfx ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                    <Folder className="w-3.5 h-3.5 text-pink-400" />
                    <span className="font-mono text-[11px] truncate flex-1">04_GFX</span>
                    <span className="font-mono text-[9px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">6</span>
                  </div>
                  {expandedFolders.gfx && (
                    <div className="pl-6 flex flex-col py-0.5 gap-1 font-mono text-[10px] text-zinc-400">
                      <div className="flex items-center gap-1.5 p-1 rounded hover:bg-white/5"><FileText className="w-3 h-3 text-pink-400" /> <span>OVERLAY_TEXT.png</span></div>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Middle Column: Program Monitor */}
            <main className="flex-1 flex flex-col min-h-0 bg-[#050608] relative">
              {/* Monitor Title */}
              <div className="h-8 bg-[#090b10] border-b border-white/5 flex items-center justify-between px-4 shrink-0 font-mono text-[10px] text-zinc-400">
                <span className="font-bold text-zinc-200">SEQUENCE 01: MASTERPIECE</span>
                <span className="text-zinc-500">{activeAsset.resolution}</span>
              </div>

              {/* Viewport Box */}
              <div className="flex-1 relative flex items-center justify-center p-4 bg-black overflow-hidden perspective-[1200px]">
                {/* 3D Mode Canvas Wrapper */}
                <div 
                  className="relative w-full aspect-video max-w-[800px] border border-white/10 bg-[#040405] rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ease-smooth"
                  style={{
                    transform: is3DMode ? "rotateY(16deg) rotateX(10deg) translateZ(10px)" : "none",
                    boxShadow: is3DMode ? "0 30px 60px rgba(0,255,255,0.06), 0 0 100px rgba(0,0,0,0.8)" : "0 10px 40px rgba(0,0,0,0.8)"
                  }}
                >
                  {!is3DMode ? (
                    // ─── 2D Flat Program Monitor Preview ───
                    <div className="relative w-full h-full bg-[#050507] flex items-center justify-center overflow-hidden">
                      <Image
                        src={activeAsset.path}
                        alt={activeAsset.name}
                        fill
                        priority
                        className="object-cover opacity-90 transition-transform duration-100"
                        style={{
                          // Subtle scale animation driven by dragProgress
                          scale: 1 + (dragProgress.get() * 0.10)
                        }}
                      />
                      
                      {/* Viewfinder Rule of Thirds */}
                      <div className="absolute inset-0 opacity-15 pointer-events-none">
                        <div className="w-full h-px bg-white/40 absolute top-1/3" />
                        <div className="w-full h-px bg-white/40 absolute top-2/3" />
                        <div className="w-px h-full bg-white/40 absolute left-1/3" />
                        <div className="w-px h-full bg-white/40 absolute left-2/3" />
                      </div>
                      
                      {/* Viewfinder brackets */}
                      <div className="absolute inset-4 pointer-events-none opacity-40">
                        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white" />
                      </div>
                      
                      {/* MASTERPIECE Text Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <h1 className="font-heading text-[clamp(22px,4.5vw,52px)] text-white font-black opacity-95 tracking-widest text-center select-none uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]">
                          MASTERPIECE
                        </h1>
                      </div>

                      {/* Cyber VFX Optical Glow effect */}
                      <div 
                        className="absolute inset-0 bg-cyan-500/[0.03] mix-blend-screen pointer-events-none"
                        style={{
                          opacity: 0.1 + dragProgress.get() * 0.9
                        }}
                      />

                      {/* Camera Info HUD */}
                      <div className="absolute top-3 left-4 flex gap-2 z-10 select-none">
                        <span className="font-mono text-white/50 text-[8px] tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded border border-white/5">{activeAsset.camera}</span>
                      </div>
                      <div className="absolute bottom-3 left-4 flex gap-2 z-10 select-none">
                        <span className="font-mono text-white/40 text-[8px] tracking-wider bg-black/60 px-2 py-0.5 rounded border border-white/5">REC.709 / CINEMATIC</span>
                      </div>
                    </div>
                  ) : (
                    // ─── 3D Diagnostic Mode (Deconstructed Layers) ───
                    <motion.div 
                      style={{ rotateX: sceneRotateX, rotateY: sceneRotateY, scale: sceneScale, transformStyle: "preserve-3d" }}
                      className="relative w-full h-full flex items-center justify-center"
                    >
                      {/* Layer 1: Raw Footage */}
                      <motion.div 
                        style={{ z: layer1Z, rotateX: layer1RotateX, rotateY: layer1RotateY, transformStyle: "preserve-3d" }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <div className="absolute inset-0 rounded-xl border border-white/10 bg-[#070709] flex flex-col justify-between p-4 overflow-hidden shadow-2xl">
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.01)_50%,transparent_75%)] bg-[size:12px_12px]" />
                          <Image src={activeAsset.path} alt={activeAsset.name} fill className="object-cover opacity-50" />
                          <div className="flex justify-between items-center z-10">
                            <span className="font-mono text-white/60 text-[8px] tracking-widest uppercase bg-white/5 px-2 py-0.5 rounded">{activeAsset.name}</span>
                            <span className="font-mono text-white/50 text-[8px] tracking-widest">{activeAsset.iso}</span>
                          </div>
                          <span className="font-mono text-white/50 text-[8px] z-10">RAW_FOOTAGE [V1]</span>
                        </div>
                      </motion.div>

                      {/* Layer 2: Color LUT */}
                      <motion.div 
                        style={{ z: layer2Z, rotateX: layer2RotateX, rotateY: layer2RotateY, transformStyle: "preserve-3d" }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <div className="absolute inset-0 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent mix-blend-screen backdrop-blur-[0.5px] p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.12)]">
                          <div className="flex justify-between items-center opacity-50">
                            <span className="font-mono text-purple-400 text-[8px] tracking-widest bg-purple-500/10 px-2 py-0.5 rounded">COLOR_LUT_CINEMATIC [V3]</span>
                            <span className="font-mono text-purple-300 text-[8px]">REC.709 → DCI-P3</span>
                          </div>
                          <div className="flex justify-between items-end opacity-50">
                            <span className="font-mono text-purple-400 text-[8px]">SAT: 110%</span>
                            <span className="font-mono text-purple-400 text-[8px]">5600K</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Layer 3: VFX & Glow */}
                      <motion.div 
                        style={{ z: layer3Z, rotateX: layer3RotateX, rotateY: layer3RotateY, transformStyle: "preserve-3d" }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <div className="absolute inset-0 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.01] mix-blend-screen backdrop-blur-[0.5px] p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                          <div className="flex justify-between items-center opacity-50">
                            <span className="font-mono text-cyan-400 text-[8px] tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded">VFX_OPTICAL_GLOW [V2]</span>
                            <span className="font-mono text-cyan-300 text-[8px]">THR: 0.25</span>
                          </div>
                          <div className="absolute top-[30%] left-[25%] flex flex-col items-center gap-0.5 opacity-40">
                            <div className="w-5 h-5 border border-cyan-400 rounded-sm relative flex items-center justify-center">
                              <div className="w-0.5 h-0.5 bg-cyan-400 rounded-full" />
                            </div>
                            <span className="font-mono text-[6px] text-cyan-400">TRACKPOINT_01</span>
                          </div>
                          <div className="flex justify-between items-end opacity-50">
                            <span className="font-mono text-cyan-400 text-[8px]">VFX COMPOSITE</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Layer 4: Typography Overlay */}
                      <motion.div 
                        style={{ z: layer4Z, rotateX: layer4RotateX, rotateY: layer4RotateY, transformStyle: "preserve-3d" }}
                        className="absolute inset-0 pointer-events-none"
                      >
                        <div className="absolute inset-0 rounded-xl border border-white/15 bg-white/[0.005] flex flex-col justify-between p-4 overflow-hidden">
                          <span className="font-mono text-white text-[8px] tracking-widest uppercase bg-white/10 px-2 py-0.5 rounded opacity-65">TEXT_OVERLAY [V4]</span>
                          <h1 className="font-heading text-[clamp(16px,2.5vw,38px)] text-white font-black opacity-95 tracking-widest text-center select-none uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                            MASTERPIECE
                          </h1>
                          <span className="font-mono text-white/50 text-[8px] opacity-65">OPACITY: 95%</span>
                        </div>
                      </motion.div>

                      {/* Alignment Flash */}
                      <motion.div 
                        style={{ opacity: masterGlowOpacity }}
                        className="absolute inset-0 bg-white/10 shadow-[0_0_100px_rgba(255,255,255,0.3)] rounded-xl pointer-events-none mix-blend-overlay"
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Viewport Control Strip */}
              <div className="h-10 bg-[#090b10] border-t border-white/5 flex items-center justify-between px-4 shrink-0 font-mono text-[10px] select-none text-zinc-400">
                <div className="flex items-center gap-3">
                  {/* Current Program Timecode */}
                  <span ref={monitorTimecodeRef} className="font-bold text-cyan-400 bg-black/40 px-2 py-1 border border-white/5 rounded">01:00:00:00</span>
                  <div className="w-px h-3 bg-white/10" />
                  <select className="bg-transparent border-0 outline-none text-[9px] hover:text-white cursor-pointer font-bold">
                    <option>Fit</option>
                    <option>100%</option>
                    <option>50%</option>
                  </select>
                </div>

                {/* Video controls */}
                <div className="flex items-center gap-4 text-zinc-400">
                  <button className="hover:text-white transition-colors" onClick={() => dragX.set(0)}><Play className="w-3.5 h-3.5 rotate-180" /></button>
                  <button className="hover:text-white transition-colors" onClick={() => dragX.set(Math.max(0, dragX.get() - 40))}><Pause className="w-3.5 h-3.5" /></button>
                  <button className="w-7 h-7 bg-white/5 border border-white/10 text-cyan-400 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-cyan-500/25 transition-all"><Play className="w-3 h-3 fill-cyan-400 text-cyan-400" /></button>
                  <button className="hover:text-white transition-colors" onClick={() => dragX.set(Math.min(trackWidthRef.current, dragX.get() + 40))}><Play className="w-3.5 h-3.5" /></button>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-3">
                  {/* 3D mode Toggle */}
                  <button 
                    onClick={() => {
                      uiSounds.playClick();
                      setIs3DMode(!is3DMode);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[9px] font-bold transition-all ${is3DMode ? "bg-cyan-500/10 border-cyan-400/40 text-cyan-400 font-bold" : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"}`}
                  >
                    <Activity className={`w-3 h-3 ${is3DMode ? "animate-pulse" : ""}`} />
                    <span>3D MODE</span>
                  </button>
                  <div className="w-px h-3 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                    <div className="w-12 h-1 bg-zinc-800 rounded-full relative cursor-pointer"><div className="absolute top-0 bottom-0 left-0 w-3/4 bg-cyan-400 rounded-full" /></div>
                  </div>
                  <Maximize2 className="w-3.5 h-3.5 hover:text-white cursor-pointer ml-1" />
                </div>
              </div>
            </main>

            {/* Right Column: Effect Controls */}
            <aside className="w-[320px] border-l border-white/5 bg-[#090b0f] flex flex-col min-h-0 shrink-0 hidden lg:flex font-mono text-[10px]">
              <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
                <span className="font-bold tracking-widest text-zinc-400 uppercase">EFFECT CONTROLS</span>
                <Sliders className="w-3.5 h-3.5 text-zinc-500" />
              </div>

              {/* Scrollable controls panel */}
              <div className="flex-1 overflow-y-auto p-4 scrollbar-hide flex flex-col gap-4 text-zinc-300">
                {/* Header item */}
                <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-lg">
                  <div className="text-zinc-500 text-[8px] uppercase tracking-wider mb-0.5">Active Target</div>
                  <div className="text-white font-bold truncate text-[11px]">{activeAsset.name}</div>
                </div>

                {/* Category 1: Motion */}
                <div className="flex flex-col gap-2.5 border-b border-white/5 pb-4">
                  <div className="flex items-center justify-between font-bold text-zinc-400 border-b border-white/5 pb-1">
                    <span>fx Motion</span>
                    <Settings className="w-3 h-3 text-zinc-500" />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-zinc-500">Position</span>
                    <span className="text-cyan-400 font-bold"><span ref={posXRef}>960.0</span> · 540.0</span>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-zinc-500">Scale</span>
                    <span ref={scaleValueRef} className="text-cyan-400 font-bold">100.0%</span>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-zinc-500">Rotation</span>
                    <span ref={rotationValueRef} className="text-cyan-400 font-bold">0.0°</span>
                  </div>
                </div>

                {/* Category 2: Opacity */}
                <div className="flex flex-col gap-2.5 border-b border-white/5 pb-4">
                  <div className="flex items-center justify-between font-bold text-zinc-400 border-b border-white/5 pb-1">
                    <span>fx Opacity</span>
                    <Settings className="w-3 h-3 text-zinc-500" />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-zinc-500">Opacity</span>
                    <span className="text-white font-bold">100.0%</span>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-zinc-500">Blend Mode</span>
                    <span className="text-zinc-400 hover:text-white cursor-pointer font-bold">Normal</span>
                  </div>
                </div>

                {/* Category 3: Lumetri Color */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between font-bold text-zinc-400 border-b border-white/5 pb-1">
                    <span>fx Lumetri Color</span>
                    <Palette className="w-3 h-3 text-zinc-500" />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-zinc-500">Basic Correction</span>
                    <span className="text-cyan-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-zinc-500">Input LUT</span>
                    <span className="text-zinc-400 font-bold">Cinematic</span>
                  </div>
                  {/* Slider Control */}
                  <div className="flex flex-col gap-1.5 px-1 mt-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-zinc-500">LUT Intensity</span>
                      <span className="text-cyan-400 font-bold"><span ref={intensityValueRef}>50.0</span></span>
                    </div>
                    <input 
                      ref={intensitySliderRef}
                      type="range" 
                      min="20" 
                      max="80" 
                      defaultValue="50"
                      className="w-full accent-cyan-400 bg-zinc-800 h-1 rounded-lg cursor-pointer"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* 3. Timeline Area (Bottom Panel) */}
          <footer className="h-[260px] bg-[#090b0f] border-t border-white/5 flex flex-col shrink-0">
            {/* Timeline Toolbar & Ruler Header */}
            <div className="h-10 bg-[#090b10] border-b border-white/5 flex items-center justify-between px-4 shrink-0 font-mono text-[10px] text-zinc-500">
              <div className="flex items-center gap-4">
                <span className="font-bold text-zinc-200">TIMELINE: SEQUENCE 01</span>
                <div className="h-3 w-px bg-white/10" />
                <span ref={timecodeRef} className="font-bold text-cyan-400">01:00:00:00</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-[#ff4000]/10 border border-[#ff4000]/20 px-2 py-0.5 rounded text-[#ff4000] text-[9px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff4000] animate-pulse" />
                  <span>REC MODE</span>
                </div>
              </div>
            </div>

            {/* Tracks Area */}
            <div className="flex-1 flex min-h-0 relative overflow-hidden">
              
              {/* Vertical Tools Sidebar */}
              <div className="w-11 border-r border-white/5 bg-[#08090d] flex flex-col items-center py-2 gap-2.5 shrink-0 select-none">
                {[
                  { id: "select", icon: MousePointer, label: "Selection" },
                  { id: "razor", icon: Scissors, label: "Razor Tool" },
                  { id: "hand", icon: Hand, label: "Hand Tool" },
                  { id: "text", icon: Type, label: "Text Tool" }
                ].map(tool => (
                  <div 
                    key={tool.id}
                    title={tool.label}
                    onClick={() => setActiveTool(tool.id)}
                    className={`p-1.5 rounded-md cursor-pointer transition-all ${activeTool === tool.id ? "bg-cyan-500/10 text-cyan-400 border border-cyan-400/20" : "text-zinc-500 hover:text-white"}`}
                  >
                    <tool.icon className="w-4 h-4" />
                  </div>
                ))}
              </div>

              {/* Track Headers (V3, V2, V1, A1, A2, A3) */}
              <div className="w-[140px] bg-black/40 flex flex-col border-r border-white/5 shrink-0 z-20 backdrop-blur-md font-mono select-none">
                <div className="h-[20px] border-b border-white/5" /> {/* Spacer for ruler */}
                
                {/* Video Track Headers */}
                {([
                  { name: "V3", color: "text-purple-400", bg: "bg-purple-500/5" },
                  { name: "V2", color: "text-blue-400", bg: "bg-blue-500/5" },
                  { name: "V1", color: "text-cyan-400", bg: "bg-cyan-500/5" }
                ] as const).map(track => {
                  const state = trackStates[track.name];
                  return (
                    <div key={track.name} className={`h-[32px] flex items-center justify-between px-3 border-b border-white/5 ${track.bg}`}>
                      <span className={`text-[10px] font-bold ${track.color}`}>{track.name}</span>
                      <div className="flex gap-1.5 text-zinc-500">
                        <button 
                          onClick={() => toggleTrackProperty(track.name, "locked")}
                          className={`hover:text-white transition-colors ${state.locked ? "text-red-400" : ""}`}
                        >
                          {state.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3 opacity-60" />}
                        </button>
                        <button 
                          onClick={() => toggleTrackProperty(track.name, "visible")}
                          className="hover:text-white transition-colors"
                        >
                          {state.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-red-400" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
                
                <div className="h-1 bg-white/5 w-full shrink-0" /> 
                
                {/* Audio Track Headers */}
                {([
                  { name: "A1", color: "text-green-400", bg: "bg-green-500/5" },
                  { name: "A2", color: "text-emerald-500", bg: "bg-emerald-500/5" },
                  { name: "A3", color: "text-teal-600", bg: "bg-teal-600/5" }
                ] as const).map(track => {
                  const state = trackStates[track.name];
                  return (
                    <div key={track.name} className={`h-[36px] flex items-center justify-between px-3 border-b border-white/5 ${track.bg}`}>
                      <span className={`text-[10px] font-bold ${track.color}`}>{track.name}</span>
                      <div className="flex gap-1 text-[9px] font-bold">
                        <button 
                          onClick={() => toggleTrackProperty(track.name, "muted")}
                          className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-all ${state.muted ? "bg-red-500/10 border-red-500/20 text-red-500" : "border-white/5 text-zinc-500 hover:text-white"}`}
                        >
                          M
                        </button>
                        <button 
                          onClick={() => toggleTrackProperty(track.name, "soloed")}
                          className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-all ${state.soloed ? "bg-green-500/10 border-green-500/20 text-green-500" : "border-white/5 text-zinc-500 hover:text-white"}`}
                        >
                          S
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Timeline Tracks Panel */}
              <div className="flex-1 relative bg-[#06070a] overflow-hidden" ref={trackRef} onClick={handleTrackClick}>
                {/* Timeline Grid ticks */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_100%] pointer-events-none" />
                
                {/* Ruler timeline indicators */}
                <div className="sticky top-0 left-0 right-0 h-[20px] border-b border-white/5 flex items-end px-4 pointer-events-none z-10 bg-[#090b0f]/80 backdrop-blur-sm select-none">
                  {Array.from({ length: 13 }).map((_, i) => {
                    const seconds = i * 5;
                    const timeString = seconds === 60 ? "01:00" : `00:${seconds.toString().padStart(2, '0')}`;
                    return (
                      <div key={i} className="flex-1 relative h-full flex items-end border-l border-white/5 last:border-r">
                        <span className="absolute top-0.5 left-1 text-[7.5px] font-mono text-zinc-600 tracking-tighter">
                          {timeString}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Clips Container */}
                <div className="relative w-full flex flex-col pb-4">
                  {/* V3 Track Clip */}
                  <div className="h-[32px] border-b border-white/5 relative flex items-center">
                    <div 
                      className="absolute left-[15%] right-[60%] h-[22px] bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/30 rounded cursor-pointer shadow-[0_0_10px_rgba(168,85,247,0.15)] flex items-center px-2 transition-all"
                      style={{ opacity: trackStates.V3.visible ? 1 : 0.2 }}
                    >
                      <span className="text-[9px] font-mono text-purple-200 font-bold truncate">COLOR_GRADE.cube</span>
                    </div>
                  </div>
                  
                  {/* V2 Track Clip */}
                  <div className="h-[32px] border-b border-white/5 relative flex items-center">
                    <div 
                      className="absolute left-[20%] right-[30%] h-[22px] bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 rounded cursor-pointer shadow-[0_0_10px_rgba(59,130,246,0.15)] flex items-center px-2 transition-all"
                      style={{ opacity: trackStates.V2.visible ? 1 : 0.2 }}
                    >
                      <span className="text-[9px] font-mono text-blue-200 font-bold truncate">OVERLAY_TEXT.png</span>
                    </div>
                  </div>
                  
                  {/* V1 Video Track Clip */}
                  <div className="h-[32px] border-b border-white/5 relative flex items-center bg-white/[0.01]">
                    <div 
                      className="absolute left-[5%] right-[5%] h-[22px] bg-cyan-600/30 border border-cyan-400/40 hover:bg-cyan-600/45 rounded cursor-pointer shadow-[0_0_12px_rgba(34,211,238,0.2)] flex items-center overflow-hidden transition-all"
                      style={{ opacity: trackStates.V1.visible ? 1 : 0.2 }}
                    >
                      <div className="relative h-full aspect-video opacity-45 border-r border-white/10 shrink-0"><Image src={activeAsset.path} alt={activeAsset.name} fill className="object-cover" /></div>
                      <span className="ml-2.5 text-[9px] font-mono text-cyan-200 font-bold truncate">{activeAsset.name} [V]</span>
                    </div>
                  </div>
                  
                  <div className="h-1 w-full shrink-0" />

                  {/* A1 Audio Track Clip */}
                  <div className="h-[36px] border-b border-white/5 relative flex items-center bg-white/[0.01]">
                    <div 
                      className="absolute left-[5%] right-[5%] h-[26px] bg-green-600/25 border border-green-400/30 hover:bg-green-600/35 rounded cursor-pointer shadow-[0_0_10px_rgba(34,197,94,0.1)] flex flex-col justify-center px-2 relative overflow-hidden transition-all"
                      style={{ opacity: trackStates.A1.muted ? 0.25 : 1 }}
                    >
                      <span className="text-[8.5px] font-mono text-green-200 font-bold truncate z-10">{activeAsset.name.replace(".mp4", "")}.wav [A]</span>
                      {/* Audio wave vectors */}
                      <div className="absolute inset-x-2 bottom-1 h-3 opacity-30 flex items-end gap-[1px]">
                        {[2,6,12,8,16,14,4,6,18,22,12,6,10,14,8,4,12,18,14,8,12,16,10,4,8,14,18,6,2,6,12,8,16,14,4,6,18,22,12,6].map((h, i) => (
                          <div key={i} className="flex-1 bg-green-400 rounded-t" style={{ height: `${h * 0.4}px` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* A2 Audio Track Clip */}
                  <div className="h-[36px] border-b border-white/5 relative flex items-center">
                    <div 
                      className="absolute left-[20%] right-[60%] h-[26px] bg-emerald-600/20 border border-emerald-400/20 hover:bg-emerald-600/30 rounded cursor-pointer flex flex-col justify-center px-2 relative overflow-hidden transition-all"
                      style={{ opacity: trackStates.A2.muted ? 0.25 : 1 }}
                    >
                      <span className="text-[8px] font-mono text-emerald-300 font-bold truncate z-10">IMPACT_WHOOSH_01.wav</span>
                      <div className="absolute inset-x-2 bottom-1 h-2 opacity-25 flex items-end gap-[1px]">
                        {[2,8,4,12,8,2,6,10,14,4,2,8,12,6,2,6,10,4].map((h, i) => (
                          <div key={i} className="flex-1 bg-emerald-400 rounded-t" style={{ height: `${h * 0.5}px` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* A3 Audio Track Clip */}
                  <div className="h-[36px] relative flex items-center">
                    <div 
                      className="absolute left-[5%] right-[10%] h-[26px] bg-teal-700/20 border border-teal-500/20 hover:bg-teal-700/30 rounded cursor-pointer flex flex-col justify-center px-2 relative overflow-hidden transition-all"
                      style={{ opacity: trackStates.A3.muted ? 0.25 : 1 }}
                    >
                      <span className="text-[8px] font-mono text-teal-300 font-bold truncate z-10">BACKGROUND_EPIC_BEAT.mp3</span>
                      <div className="absolute inset-x-2 bottom-1 h-2 opacity-25 flex items-end gap-[1px]">
                        {[4,6,8,6,4,6,8,10,8,6,4,8,10,12,10,8,6,8,10,8,6,8,6,4,6,8,6,4,6,8,10,8,6,4,8,10,12].map((h, i) => (
                          <div key={i} className="flex-1 bg-teal-400 rounded-t" style={{ height: `${h * 0.5}px` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── 3D Laser Playhead ─── */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: trackWidth || 2000 }}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => { isDraggingRef.current = true; }}
                  onDragEnd={() => { isDraggingRef.current = false; }}
                  style={{ x: dragX }}
                  className="absolute -top-10 bottom-0 w-8 -ml-[16px] z-40 cursor-ew-resize flex flex-col items-center pointer-events-auto group"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Laser Emitter Head */}
                  <div className="w-8 h-9 bg-black/90 border border-cyan-400/50 rounded shadow-[0_0_15px_rgba(34,211,238,0.7)] relative flex flex-col items-center justify-end pb-1.5 group-hover:bg-cyan-950 transition-colors z-20 backdrop-blur-md">
                     <div className="w-2.5 h-1 bg-white rounded-full animate-pulse shadow-[0_0_8px_#fff]" />
                     <div className="absolute -bottom-2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent border-t-cyan-400" />
                  </div>
                  {/* Laser Beam Slicing Through tracks */}
                  <div className="flex-1 w-[2px] bg-cyan-400 shadow-[0_0_12px_#22d3ee,0_0_25px_#22d3ee] group-hover:w-[3px] group-hover:bg-white transition-all z-10 relative">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-24 bg-cyan-400/25 blur-lg rounded-full pointer-events-none" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Timeline Bottom Status bar */}
            <div className="h-6 bg-[#08090c] border-t border-white/5 flex items-center justify-between px-4 shrink-0 font-mono text-[9px] text-zinc-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-zinc-400">Auto Save: ON</span>
                </div>
                <span>|</span>
                <span>Project: 23 Items</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Zoom</span>
                <div className="w-16 h-0.5 bg-zinc-800 rounded-full relative"><div className="absolute top-0 bottom-0 left-0 w-1/3 bg-cyan-400 rounded-full" /></div>
              </div>
            </div>
          </footer>
        </motion.div>
      </div>

      <VideoCarousel3D isOpen={isCarouselOpen} onClose={() => setIsCarouselOpen(false)} />
    </section>
  );
}
