"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useMotionValue, useSpring, useVelocity, useMotionValueEvent, useScroll, animate } from "framer-motion";
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
  const [is3DMode, setIs3DMode] = useState(true);
  const [activeTool, setActiveTool] = useState("select");
  const [isPlaying, setIsPlaying] = useState(false);
  
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

  // Mock Assets data with interactive video source mapping
  const assets = [
    {
      id: "astronaut",
      name: "ASTRONAUT_CLOSE.mp4",
      path: "/images/astronaut_cinematic.png",
      videoUrl: "https://pub-9332e0501e844ae48782601867134d26.r2.dev/videos/ads/premium-creative-showcase.mp4",
      duration: "00:05:11",
      resolution: "4K 16:9 | 60 FPS",
      camera: "CAM_01",
      iso: "ISO 400 · F/2.8 · 1/50"
    },
    {
      id: "city_drone",
      name: "CITY_DRONE_01.mp4",
      path: "/images/city_drone.png",
      videoUrl: "/videos/reels/1193408759530975.mp4",
      duration: "00:08:04",
      resolution: "4K 16:9 | 60 FPS",
      camera: "CAM_02",
      iso: "ISO 800 · F/4.0 · 1/100"
    },
    {
      id: "space_station",
      name: "SPACE_STATION_02.mp4",
      path: "/images/space_station.png",
      videoUrl: "/videos/reels/1416295406374728.mp4",
      duration: "00:07:19",
      resolution: "4K 16:9 | 60 FPS",
      camera: "CAM_03",
      iso: "ISO 200 · F/1.8 · 1/24"
    },
    {
      id: "planet_surface",
      name: "PLANET_SURFACE.mp4",
      path: "/images/planet_surface.png",
      videoUrl: "/videos/reels/1481637113705236.mp4",
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

  // ─── Draggable Clip Positions & Interaction ───
  const [clipPositions, setClipPositions] = useState<Record<string, { left: number; width: number }>>({
    V3: { left: 15, width: 25 },
    V2: { left: 20, width: 50 },
    V1: { left: 5, width: 90 },
    A1: { left: 5, width: 90 },
    A2: { left: 20, width: 20 },
    A3: { left: 5, width: 85 },
  });
  const [draggingClip, setDraggingClip] = useState<string | null>(null);

  const handleClipDrag = (clipId: string, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const container = trackRef.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const startLeft = clipPositions[clipId].left;
    const clipWidth = clipPositions[clipId].width;
    setDraggingClip(clipId);

    const handleMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      const deltaPercent = (delta / containerWidth) * 100;
      const newLeft = Math.max(0, Math.min(100 - clipWidth, startLeft + deltaPercent));
      setClipPositions(prev => ({ ...prev, [clipId]: { ...prev[clipId], left: newLeft } }));
    };

    const handleUp = () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
      setDraggingClip(null);
    };

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
  };

  const handleTrimDrag = (clipId: string, edge: 'left' | 'right', e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const container = trackRef.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const startPos = { ...clipPositions[clipId] };
    setDraggingClip(clipId);

    const handleMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      const deltaPercent = (delta / containerWidth) * 100;
      if (edge === 'left') {
        const newLeft = Math.max(0, Math.min(startPos.left + startPos.width - 5, startPos.left + deltaPercent));
        const newWidth = startPos.width - (newLeft - startPos.left);
        setClipPositions(prev => ({ ...prev, [clipId]: { left: newLeft, width: Math.max(5, newWidth) } }));
      } else {
        const newWidth = Math.max(5, startPos.width + deltaPercent);
        const maxWidth = 100 - startPos.left;
        setClipPositions(prev => ({ ...prev, [clipId]: { ...prev[clipId], width: Math.min(maxWidth, newWidth) } }));
      }
    };

    const handleUp = () => {
      document.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerup', handleUp);
      setDraggingClip(null);
    };

    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleUp);
  };

  // ─── Scroll Animation Logic ───
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // HUD Elements Assembly & Fade — lắp ráp NHANH ngay khi vào, giữ lâu, tháo trễ → giảm khoảng tối
  const editorScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.93, 1, 1, 0.93]);
  const editorOpacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0]);

  // Panel Fly-in Transforms
  const panelYTop = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [-100, 0, 0, -100]);
  const panelXLeft = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [-300, 0, 0, -300]);
  const panelXRight = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [300, 0, 0, 300]);
  const panelYBottom = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [300, 0, 0, 300]);

  // Opacity & Background Fades (Hides empty boxes before assembly)
  const panelOpTop = useTransform(scrollYProgress, [0.02, 0.12, 0.88, 0.98], [0, 1, 1, 0]);
  const panelOpSide = useTransform(scrollYProgress, [0.04, 0.14, 0.86, 0.96], [0, 1, 1, 0]);
  const panelOpBottom = useTransform(scrollYProgress, [0.06, 0.16, 0.84, 0.94], [0, 1, 1, 0]);

  const containerBg = useTransform(scrollYProgress, [0.05, 0.16, 0.84, 0.95], ["rgba(7,8,12,0)", "rgba(7,8,12,1)", "rgba(7,8,12,1)", "rgba(7,8,12,0)"]);
  const containerBorder = useTransform(scrollYProgress, [0.05, 0.16, 0.84, 0.95], ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0)"]);
  const containerShadow = useTransform(scrollYProgress, [0.05, 0.16, 0.84, 0.95], ["0px 0px 0px rgba(0,0,0,0)", "0px 25px 80px rgba(0,0,0,0.85)", "0px 25px 80px rgba(0,0,0,0.85)", "0px 0px 0px rgba(0,0,0,0)"]);
  const centerBg = useTransform(scrollYProgress, [0.05, 0.16, 0.84, 0.95], ["rgba(5,6,8,0)", "rgba(5,6,8,1)", "rgba(5,6,8,1)", "rgba(5,6,8,0)"]);

  // ─── Drag & Timeline Animation Logic ───
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
  
  // Fake video duration for fallback
  const FAKE_DURATION = 60; 

  // Sync page scroll to timeline scrubber!
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (e.g. 0.15 to 0.85) to timeline progress (0 to 1)
    const p = Math.min(Math.max((latest - 0.15) / 0.7, 0), 1);
    if (!isPlaying && !isDraggingRef.current && trackWidthRef.current > 0) {
      dragX.set(p * trackWidthRef.current);
    }
  });

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

    // Dynamic Video Scrubber Update
    if (videoRef.current) {
      const duration = videoRef.current.duration || FAKE_DURATION;
      videoRef.current.currentTime = percent * duration;
    }

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
    
    // Pause video playback on scroll scrub to prevent conflicts
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    
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

  // Synchronize new video loaded with the current scrub progress
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const handleMetadata = () => {
        if (!videoRef.current) return;
        const duration = videoRef.current.duration || FAKE_DURATION;
        videoRef.current.currentTime = dragProgress.get() * duration;
      };
      videoRef.current.addEventListener("loadedmetadata", handleMetadata);
      return () => {
        videoRef.current?.removeEventListener("loadedmetadata", handleMetadata);
      };
    }
  }, [activeAsset]);

  // Handle video playback loop to update playhead position
  useEffect(() => {
    let frameId: number;
    const updatePlayheadFromVideo = () => {
      if (videoRef.current && isPlaying && !isDraggingRef.current && trackWidthRef.current > 0) {
        const duration = videoRef.current.duration || FAKE_DURATION;
        const percent = videoRef.current.currentTime / duration;
        dragX.set(percent * trackWidthRef.current);
      }
      if (isPlaying) {
        frameId = requestAnimationFrame(updatePlayheadFromVideo);
      }
    };
    if (isPlaying) {
      frameId = requestAnimationFrame(updatePlayheadFromVideo);
    }
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, dragX]);

  // Handle video ended event to reset play status
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleEnded = () => {
      setIsPlaying(false);
      dragX.set(0);
    };
    
    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [dragX]);

  // ─── 3D Mode Layout Calculations (Smoothly Morphs between 2D & 3D) ───
  const modeAnim = useMotionValue(0);
  const autoRotateYVal = useMotionValue(0);
  const autoRotateXVal = useMotionValue(0);

  // ─── Mouse Parallax — con trỏ điều khiển góc nghiêng khung 3D (giá trị chuẩn hoá -1..1) ───
  const monitorRef = useRef<HTMLDivElement>(null);
  const pointerXVal = useMotionValue(0);
  const pointerYVal = useMotionValue(0);
  // Lò xo cho cảm giác trôi mượt & hơi "đuổi theo" con trỏ
  const pointerX = useSpring(pointerXVal, { stiffness: 70, damping: 18, mass: 0.6 });
  const pointerY = useSpring(pointerYVal, { stiffness: 70, damping: 18, mass: 0.6 });

  useEffect(() => {
    const controls = animate(modeAnim, is3DMode ? 1 : 0, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    });
    return () => controls.stop();
  }, [is3DMode, modeAnim]);

  // Auto-orbit animation for 3D mode — gentle sine-wave camera drift
  useEffect(() => {
    if (!is3DMode) {
      autoRotateYVal.set(0);
      autoRotateXVal.set(0);
      return;
    }
    let frameId: number;
    const startTime = performance.now();
    const tick = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      autoRotateYVal.set(Math.sin(elapsed * 0.25) * 8);
      autoRotateXVal.set(Math.sin(elapsed * 0.18) * 3);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [is3DMode, autoRotateYVal, autoRotateXVal]);

  // Lắng nghe con trỏ trong vùng màn hình preview → cập nhật pointer (−1..1), về 0 khi rời chuột
  useEffect(() => {
    const el = monitorRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
      pointerXVal.set(Math.max(-1, Math.min(1, nx)));
      pointerYVal.set(Math.max(-1, Math.min(1, ny)));
    };
    const handleLeave = () => {
      pointerXVal.set(0);
      pointerYVal.set(0);
    };
    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [pointerXVal, pointerYVal]);

  // Multiplied by modeAnim for smooth 2D/3D morphing transition!
  const layer1Z = useTransform([dragProgress, modeAnim], ([p, m]) => {
    const parallaxP = Math.pow(p as number, 1.3);
    const target3D = -300 + parallaxP * 300;
    return target3D * (m as number);
  });
  
  const layer2Z = useTransform([dragProgress, modeAnim], ([p, m]) => {
    const parallaxP = Math.pow(p as number, 1.1);
    const target3D = -100 + parallaxP * 100;
    return target3D * (m as number);
  });
  
  const layer3Z = useTransform([dragProgress, modeAnim], ([p, m]) => {
    const parallaxP = Math.pow(p as number, 0.9);
    const target3D = 100 - parallaxP * 100;
    return target3D * (m as number);
  });
  
  const layer4Z = useTransform([dragProgress, modeAnim], ([p, m]) => {
    const parallaxP = Math.pow(p as number, 0.7);
    const target3D = 250 - parallaxP * 250;
    return target3D * (m as number);
  });

  // Rotations (with matching parallax timing)
  const layer1RotateX = useTransform([dragProgress, modeAnim], ([p, m]) => (30 * (1 - Math.pow(p as number, 1.3))) * (m as number));
  const layer1RotateY = useTransform([dragProgress, modeAnim], ([p, m]) => (-30 * (1 - Math.pow(p as number, 1.3))) * (m as number));

  const layer2RotateX = useTransform([dragProgress, modeAnim], ([p, m]) => (-20 * (1 - Math.pow(p as number, 1.1))) * (m as number));
  const layer2RotateY = useTransform([dragProgress, modeAnim], ([p, m]) => (20 * (1 - Math.pow(p as number, 1.1))) * (m as number));

  const layer3RotateX = useTransform([dragProgress, modeAnim], ([p, m]) => (20 * (1 - Math.pow(p as number, 0.9))) * (m as number));
  const layer3RotateY = useTransform([dragProgress, modeAnim], ([p, m]) => (-20 * (1 - Math.pow(p as number, 0.9))) * (m as number));

  const layer4RotateX = useTransform([dragProgress, modeAnim], ([p, m]) => (-30 * (1 - Math.pow(p as number, 0.7))) * (m as number));
  const layer4RotateY = useTransform([dragProgress, modeAnim], ([p, m]) => (30 * (1 - Math.pow(p as number, 0.7))) * (m as number));

  // Scene cameras
  // Góc nghiêng = nền (scroll) + tự xoay (auto-orbit) + CON TRỎ (pointer) → khung "ngước nhìn" theo chuột
  const sceneRotateY = useTransform([dragProgress, modeAnim, autoRotateYVal, pointerX], ([p, m, auto, px]) => ((25 - (p as number) * 30) + (auto as number) - (px as number) * 14) * (m as number));
  const sceneRotateX = useTransform([dragProgress, modeAnim, autoRotateXVal, pointerY], ([p, m, auto, py]) => ((15 - (p as number) * 17) + (auto as number) + (py as number) * 9) * (m as number));
  const sceneScale = useTransform([dragProgress, modeAnim], ([p, m]) => {
    const flatScale = 1.0;
    const target3D = 0.65 + (p as number) * 0.30;
    return flatScale + (target3D - flatScale) * (m as number);
  });

  // Viewport helper opacity bindings
  const layer2Opacity = useTransform(modeAnim, [0, 1], [0, 1]);
  const layer3Opacity = useTransform(modeAnim, [0, 1], [0, 1]);
  const layer1Opacity = useTransform(modeAnim, [0, 1], [1, 0.7]);
  const masterGlowOpacity = useTransform([dragProgress, modeAnim], ([p, m]) => {
    const val = (p as number) > 0.85 ? ((p as number) - 0.85) / 0.15 : 0;
    return val * 0.7 * (m as number);
  });

  // Intro Glow Link Activation Flash - liên kết chuyển cảnh từ Overview ở trên
  const introGlow = useTransform(scrollYProgress, [0, 0.12, 0.24], [0, 1, 0]);
  const introGlowSpring = useSpring(introGlow, { damping: 20, stiffness: 60 });

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

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    uiSounds.playClick();
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Video Playback failed:", err));
    }
  };

  return (
    <section ref={containerRef} id="work" className="relative w-full h-[280vh] bg-[#040406]">
      {/* Pinned Sticky Workspace */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center p-3 md:p-6">
        
        {/* Main Editor UI Frame */}
        <motion.div 
          style={{ 
            scale: editorScale, 
            opacity: editorOpacity,
            backgroundColor: containerBg,
            borderColor: containerBorder,
            boxShadow: containerShadow 
          }}
          className="w-full max-w-[1580px] h-[92vh] max-h-[820px] rounded-2xl flex flex-col overflow-hidden text-[#e2e8f0] font-sans z-10 select-none border"
        >
          {/* 1. Header Bar */}
          <motion.header style={{ y: panelYTop, opacity: panelOpTop }} className="h-11 bg-[#0a0c10] border-b border-white/5 flex items-center justify-between px-4 md:px-5 shrink-0 z-20">
            <div className="flex items-center gap-4">
              {/* Menu Tabs */}
              <nav className="flex items-center gap-1 sm:gap-2 h-full text-[10px] sm:text-xs font-mono font-medium text-zinc-400">
                {["EDIT", "COLOR", "EFFECTS", "AUDIO", "EXPORT"].map(tab => (
                  <button 
                    key={tab} 
                    className={`px-3 py-1 rounded transition-colors ${tab === "EDIT" ? "text-accent bg-white/5 border border-accent/20 font-bold" : "hover:text-white"}`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Render Engine specs */}
            <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono">
              <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span className="text-zinc-400 tracking-wider text-[9px]">ENGINE</span>
                <span className="text-green-400 font-bold text-[9px]">ONLINE</span>
              </div>
              <div className="bg-zinc-900 border border-white/5 px-2.5 py-1 rounded-md text-accent font-bold text-[9px] tracking-wider hidden sm:block">
                60 FPS
              </div>
            </div>
          </motion.header>

          {/* 2. Main Work Area (Three Column Grid) */}
          <div className="flex-1 flex min-h-0 relative overflow-hidden bg-[#050608]">
            
            {/* Left Column: Project/Media Bin */}
            <motion.aside style={{ x: panelXLeft, opacity: panelOpSide }} className="w-[280px] border-r border-white/5 bg-[#090b0f] flex flex-col min-h-0 shrink-0 hidden lg:flex z-20">
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
                {/* Folder 1: Seq */}
                <div className="flex flex-col">
                  <div 
                    onClick={() => toggleFolder("sequences")} 
                    className="flex items-center gap-1.5 px-1 py-1 text-xs text-zinc-300 hover:bg-white/5 rounded cursor-pointer transition-colors"
                  >
                    {expandedFolders.sequences ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                    <Folder className="w-3.5 h-3.5 text-accent" />
                    <span className="font-mono text-[11px] truncate flex-1">01_SEQUENCES</span>
                    <span className="font-mono text-[9px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">1</span>
                  </div>
                  {expandedFolders.sequences && (
                    <div className="pl-6 flex flex-col py-0.5">
                      <div className="flex items-center gap-2 px-1.5 py-1 text-xs text-accent bg-accent/5 border border-accent/10 rounded cursor-pointer font-medium font-mono text-[11px]">
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
                          className={`flex items-center gap-2 p-1.5 rounded cursor-pointer border transition-all ${activeAsset.id === asset.id ? "bg-white/5 border-accent/20 shadow-sm" : "border-transparent hover:bg-white/5"}`}
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
            </motion.aside>

            {/* Middle Column: Program Monitor */}
            <motion.main style={{ backgroundColor: centerBg }} className="flex-1 flex flex-col min-h-0 relative z-10">
              {/* Monitor Title */}
              <div className="h-8 bg-[#090b10] border-b border-white/5 flex items-center justify-between px-4 shrink-0 font-mono text-[10px] text-zinc-400">
                <span className="font-bold text-zinc-200">SEQUENCE 01: MASTERPIECE</span>
                <span className="text-zinc-500">{activeAsset.resolution}</span>
              </div>

              {/* Viewport Box */}
              <div ref={monitorRef} className="flex-1 relative flex items-center justify-center p-4 bg-black overflow-hidden perspective-[1200px]">
                {/* 3D Morphing Viewport Canvas */}
                <div 
                  className="relative w-full aspect-video max-w-[800px] border border-white/10 bg-[#040405] rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: is3DMode ? "0 30px 60px rgba(255,64,0,0.15), 0 0 100px rgba(0,0,0,0.8)" : "0 10px 40px rgba(0,0,0,0.8)"
                  }}
                >
                  <motion.div 
                    style={{ 
                      rotateX: sceneRotateX, 
                      rotateY: sceneRotateY, 
                      scale: sceneScale, 
                      transformStyle: "preserve-3d" 
                    }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {/* Layer 1: Raw Footage Video Panel (Mounted always to preserve playback scrub) */}
                    <motion.div 
                      style={{ z: layer1Z, rotateX: layer1RotateX, rotateY: layer1RotateY, opacity: layer1Opacity, transformStyle: "preserve-3d" }}
                      className="absolute inset-0 z-10"
                    >
                      <div className="absolute inset-0 rounded-xl border border-white/10 bg-[#070709] overflow-hidden">
                        <video 
                          ref={videoRef} 
                          src={activeAsset.videoUrl} 
                          className="w-full h-full object-cover" 
                          muted 
                          playsInline 
                          preload="auto"
                          loop
                        />
                      </div>
                    </motion.div>

                    {/* Layer 2: Color LUT Diagnostic Panel (Fades in 3D mode) */}
                    <motion.div 
                      style={{ z: layer2Z, rotateX: layer2RotateX, rotateY: layer2RotateY, opacity: layer2Opacity, transformStyle: "preserve-3d" }}
                      className="absolute inset-0 z-20 pointer-events-none"
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
 
                    {/* Layer 3: VFX & Glow Diagnostic Panel (Fades in 3D mode) */}
                    <motion.div 
                      style={{ z: layer3Z, rotateX: layer3RotateX, rotateY: layer3RotateY, opacity: layer3Opacity, transformStyle: "preserve-3d" }}
                      className="absolute inset-0 z-30 pointer-events-none"
                    >
                      <div className="absolute inset-0 rounded-xl border border-accent/20 bg-accent/[0.01] mix-blend-screen backdrop-blur-[0.5px] p-4 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(255,64,0,0.12)]">
                        <div className="flex justify-between items-center opacity-50">
                          <span className="font-mono text-accent text-[8px] tracking-widest bg-accent/10 px-2 py-0.5 rounded">VFX_OPTICAL_GLOW [V2]</span>
                          <span className="font-mono text-zinc-400 text-[8px]">THR: 0.25</span>
                        </div>
                        <div className="absolute top-[30%] left-[25%] flex flex-col items-center gap-0.5 opacity-40">
                          <div className="w-5 h-5 border border-accent rounded-sm relative flex items-center justify-center">
                            <div className="w-0.5 h-0.5 bg-accent rounded-full" />
                          </div>
                          <span className="font-mono text-[6px] text-accent">TRACKPOINT_01</span>
                        </div>
                        <div className="flex justify-between items-end opacity-50">
                          <span className="font-mono text-accent text-[8px]">VFX COMPOSITE</span>
                        </div>
                      </div>
                    </motion.div>
 
                    {/* Layer 4: Typography & Guides Overlay Panel (Visible in both modes) */}
                    <motion.div 
                      style={{ z: layer4Z, rotateX: layer4RotateX, rotateY: layer4RotateY, transformStyle: "preserve-3d" }}
                      className="absolute inset-0 z-40 pointer-events-none"
                    >
                      <div className="absolute inset-0 rounded-xl border border-white/15 bg-white/[0.005] flex flex-col justify-between p-4 overflow-hidden">
                        {/* Camera metadata tags */}
                        <div className="flex justify-between items-center opacity-70">
                          <span className="font-mono text-white text-[8px] tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded border border-white/5">{activeAsset.camera}</span>
                          <span className="font-mono text-white/50 text-[8px] tracking-widest bg-black/60 px-2 py-0.5 rounded border border-white/5">{activeAsset.iso}</span>
                        </div>
 
                        <div className="flex justify-between items-end opacity-60">
                          <span className="font-mono text-white/40 text-[8px] bg-black/60 px-2 py-0.5 rounded border border-white/5">REC.709 / CINEMATIC</span>
                          <span className="font-mono text-white/40 text-[8px] bg-black/60 px-2 py-0.5 rounded border border-white/5">V4_OVERLAY</span>
                        </div>
                      </div>
                    </motion.div>
 
                    {/* Alignment Flash */}
                    <motion.div 
                      style={{ opacity: masterGlowOpacity }}
                      className="absolute inset-0 bg-white/10 shadow-[0_0_100px_rgba(255,64,0,0.3)] rounded-xl pointer-events-none mix-blend-overlay z-50"
                    />

                    {/* Intro Glow Link Activation Flash */}
                    <motion.div 
                      style={{ opacity: introGlowSpring }}
                      className="absolute inset-0 bg-accent/15 shadow-[0_0_120px_rgba(255,64,0,0.55)] rounded-xl pointer-events-none mix-blend-screen z-50 flex items-center justify-center border border-accent/40"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent animate-pulse" />
                    </motion.div>
                  </motion.div>
 
                  {/* 3D Showcase CTA Button overlayed on player */}
                  <button
                    onClick={handleRenderShowcase}
                    className="absolute bottom-4 right-4 z-50 flex items-center gap-2.5 
                               bg-gradient-to-r from-accent via-[#ff3c00] to-[#ff2a00] hover:brightness-110 active:scale-95
                               text-white font-heading font-black text-[10px] sm:text-[11px] uppercase tracking-[0.12em]
                               px-5 py-3 rounded-xl border border-white/30 
                               shadow-[0_0_30px_rgba(255,64,0,0.65),0_12px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)]
                               hover:shadow-[0_0_40px_rgba(255,64,0,0.85),0_15px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.5)]
                               hover:scale-[1.04] transition-all duration-300 cursor-pointer pointer-events-auto
                               animate-[pulse_1.8s_infinite] backdrop-blur-sm"
                  >
                    <span>TRẢI NGHIỆM 3D SHOWCASE</span>
                    <Sliders className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
 
              {/* Viewport Control Strip */}
              <div className="h-10 bg-[#090b10] border-t border-white/5 flex items-center justify-between px-4 shrink-0 font-mono text-[10px] select-none text-zinc-400">
                <div className="flex items-center gap-3">
                  {/* Current Program Timecode */}
                  <span ref={monitorTimecodeRef} className="font-bold text-accent bg-black/40 px-2 py-1 border border-white/5 rounded">01:00:00:00</span>
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
                  <button className="hover:text-white transition-colors" onClick={() => {if(videoRef.current){videoRef.current.currentTime=Math.max(0, videoRef.current.currentTime-2);}}}><Pause className="w-3.5 h-3.5" /></button>
                  <button 
                    onClick={handlePlayPause}
                    className={`w-7 h-7 border rounded-full flex items-center justify-center hover:bg-white/10 hover:border-accent/25 transition-all ${isPlaying ? "bg-accent/10 border-accent/40 text-accent" : "bg-white/5 border-white/10 text-accent"}`}
                  >
                    {isPlaying ? <Pause className="w-3 h-3 fill-accent text-accent" /> : <Play className="w-3 h-3 fill-accent text-accent ml-0.5" />}
                  </button>
                  <button className="hover:text-white transition-colors" onClick={() => {if(videoRef.current){videoRef.current.currentTime=Math.min(videoRef.current.duration, videoRef.current.currentTime+2);}}}><Play className="w-3.5 h-3.5" /></button>
                </div>
 
                {/* Right controls */}
                <div className="flex items-center gap-3">
                  {/* 3D mode Toggle */}
                  <button 
                    onClick={() => {
                      uiSounds.playClick();
                      setIs3DMode(!is3DMode);
                    }}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[9px] font-bold transition-all ${is3DMode ? "bg-accent/10 border-accent/40 text-accent font-bold animate-pulse" : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"}`}
                  >
                    <Activity className="w-3 h-3" />
                    <span>3D MODE</span>
                  </button>
                  <div className="w-px h-3 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                    <div className="w-12 h-1 bg-zinc-800 rounded-full relative cursor-pointer"><div className="absolute top-0 bottom-0 left-0 w-3/4 bg-accent rounded-full" /></div>
                  </div>
                  <Maximize2 className="w-3.5 h-3.5 hover:text-white cursor-pointer ml-1" />
                </div>
              </div>
            </motion.main>

            {/* Right Column: Effect Controls */}
            <motion.aside style={{ x: panelXRight, opacity: panelOpSide }} className="w-[320px] border-l border-white/5 bg-[#090b0f] flex flex-col min-h-0 shrink-0 hidden lg:flex font-mono text-[10px] z-20">
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
                    <span className="text-accent font-bold"><span ref={posXRef}>960.0</span> · 540.0</span>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-zinc-500">Scale</span>
                    <span ref={scaleValueRef} className="text-accent font-bold">100.0%</span>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-zinc-500">Rotation</span>
                    <span ref={rotationValueRef} className="text-accent font-bold">0.0°</span>
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
                    <span className="text-accent font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-zinc-500">Input LUT</span>
                    <span className="text-zinc-400 font-bold">Cinematic</span>
                  </div>
                  {/* Slider Control */}
                  <div className="flex flex-col gap-1.5 px-1 mt-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-zinc-500">LUT Intensity</span>
                      <span className="text-accent font-bold"><span ref={intensityValueRef}>50.0</span></span>
                    </div>
                    <input 
                      ref={intensitySliderRef}
                      type="range" 
                      min="20" 
                      max="80" 
                      defaultValue="50"
                      className="w-full accent-accent bg-zinc-800 h-1 rounded-lg cursor-pointer"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>

          {/* 3. Timeline Area (Bottom Panel) */}
          <motion.footer style={{ y: panelYBottom, opacity: panelOpBottom }} className="h-[260px] bg-[#090b0f] border-t border-white/5 flex flex-col shrink-0 z-20">
            {/* Timeline Toolbar & Ruler Header */}
            <div className="h-10 bg-[#090b10] border-b border-white/5 flex items-center justify-between px-4 shrink-0 font-mono text-[10px] text-zinc-500">
              <div className="flex items-center gap-4">
                <span className="font-bold text-zinc-200">TIMELINE: SEQUENCE 01</span>
                <div className="h-3 w-px bg-white/10" />
                <span ref={timecodeRef} className="font-bold text-accent">01:00:00:00</span>
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
                    className={`p-1.5 rounded-md cursor-pointer transition-all ${activeTool === tool.id ? "bg-accent/10 text-accent border border-accent/20" : "text-zinc-500 hover:text-white"}`}
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
                  { name: "V1", color: "text-accent", bg: "bg-accent/5" }
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
                      className={`absolute h-[22px] rounded flex items-center transition-shadow duration-150 select-none group/clip ${
                        draggingClip === 'V3' 
                          ? 'z-30 shadow-[0_0_25px_rgba(168,85,247,0.5)] bg-purple-500/35 border border-purple-300/60 cursor-grabbing' 
                          : 'shadow-[0_0_10px_rgba(168,85,247,0.15)] bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/30 cursor-grab'
                      }`}
                      style={{ 
                        left: `${clipPositions.V3.left}%`, 
                        width: `${clipPositions.V3.width}%`,
                        opacity: trackStates.V3.visible ? 1 : 0.2 
                      }}
                      onPointerDown={(e) => handleClipDrag('V3', e)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-l z-10 hover:bg-purple-400/50 group-hover/clip:bg-purple-400/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('V3', 'left', e)}
                      />
                      <span className="text-[9px] font-mono text-purple-200 font-bold truncate px-3 pointer-events-none">COLOR_GRADE.cube</span>
                      <div 
                        className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-r z-10 hover:bg-purple-400/50 group-hover/clip:bg-purple-400/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('V3', 'right', e)}
                      />
                    </div>
                  </div>
                  
                  {/* V2 Track Clip */}
                  <div className="h-[32px] border-b border-white/5 relative flex items-center">
                    <div 
                      className={`absolute h-[22px] rounded flex items-center transition-shadow duration-150 select-none group/clip ${
                        draggingClip === 'V2' 
                          ? 'z-30 shadow-[0_0_25px_rgba(59,130,246,0.5)] bg-blue-500/35 border border-blue-300/60 cursor-grabbing' 
                          : 'shadow-[0_0_10px_rgba(59,130,246,0.15)] bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 cursor-grab'
                      }`}
                      style={{ 
                        left: `${clipPositions.V2.left}%`, 
                        width: `${clipPositions.V2.width}%`,
                        opacity: trackStates.V2.visible ? 1 : 0.2 
                      }}
                      onPointerDown={(e) => handleClipDrag('V2', e)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-l z-10 hover:bg-blue-400/50 group-hover/clip:bg-blue-400/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('V2', 'left', e)}
                      />
                      <span className="text-[9px] font-mono text-blue-200 font-bold truncate px-3 pointer-events-none">OVERLAY_TEXT.png</span>
                      <div 
                        className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-r z-10 hover:bg-blue-400/50 group-hover/clip:bg-blue-400/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('V2', 'right', e)}
                      />
                    </div>
                  </div>
                  
                  {/* V1 Video Track Clip */}
                  <div className="h-[32px] border-b border-white/5 relative flex items-center bg-white/[0.01]">
                    <div 
                      className={`absolute h-[22px] rounded flex items-center overflow-hidden transition-shadow duration-150 select-none group/clip ${
                        draggingClip === 'V1' 
                          ? 'z-30 shadow-[0_0_25px_rgba(255,64,0,0.4)] bg-accent/45 border border-red-500/60 cursor-grabbing' 
                          : 'shadow-[0_0_12px_rgba(255,64,0,0.15)] bg-accent/30 border border-accent/40 hover:bg-accent/45 cursor-grab'
                      }`}
                      style={{ 
                        left: `${clipPositions.V1.left}%`, 
                        width: `${clipPositions.V1.width}%`,
                        opacity: trackStates.V1.visible ? 1 : 0.2 
                      }}
                      onPointerDown={(e) => handleClipDrag('V1', e)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-l z-20 hover:bg-accent/50 group-hover/clip:bg-accent/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('V1', 'left', e)}
                      />
                      <div className="relative h-full aspect-video opacity-45 border-r border-white/10 shrink-0 pointer-events-none"><Image src={activeAsset.path} alt={activeAsset.name} fill className="object-cover" /></div>
                      <span className="ml-2.5 text-[9px] font-mono text-zinc-200 font-bold truncate pointer-events-none">{activeAsset.name} [V]</span>
                      <div 
                        className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-r z-20 hover:bg-accent/50 group-hover/clip:bg-accent/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('V1', 'right', e)}
                      />
                    </div>
                  </div>
                  
                  <div className="h-1 w-full shrink-0" />

                  {/* A1 Audio Track Clip */}
                  <div className="h-[36px] border-b border-white/5 relative flex items-center bg-white/[0.01]">
                    <div 
                      className={`absolute h-[26px] rounded flex flex-col justify-center overflow-hidden transition-shadow duration-150 select-none group/clip ${
                        draggingClip === 'A1' 
                          ? 'z-30 shadow-[0_0_25px_rgba(34,197,94,0.4)] bg-green-600/40 border border-green-300/50 cursor-grabbing' 
                          : 'shadow-[0_0_10px_rgba(34,197,94,0.1)] bg-green-600/25 border border-green-400/30 hover:bg-green-600/35 cursor-grab'
                      }`}
                      style={{ 
                        left: `${clipPositions.A1.left}%`, 
                        width: `${clipPositions.A1.width}%`,
                        opacity: trackStates.A1.muted ? 0.25 : 1 
                      }}
                      onPointerDown={(e) => handleClipDrag('A1', e)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-l z-10 hover:bg-green-400/50 group-hover/clip:bg-green-400/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('A1', 'left', e)}
                      />
                      <span className="text-[8.5px] font-mono text-green-200 font-bold truncate z-10 px-3 pointer-events-none">{activeAsset.name.replace(".mp4", "")}.wav [A]</span>
                      {/* Audio wave vectors */}
                      <div className="absolute inset-x-2 bottom-1 h-3 opacity-30 flex items-end gap-[1px] pointer-events-none">
                        {[2,6,12,8,16,14,4,6,18,22,12,6,10,14,8,4,12,18,14,8,12,16,10,4,8,14,18,6,2,6,12,8,16,14,4,6,18,22,12,6].map((h, i) => (
                          <div key={i} className="flex-1 bg-green-400 rounded-t" style={{ height: `${h * 0.4}px` }} />
                        ))}
                      </div>
                      <div 
                        className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-r z-10 hover:bg-green-400/50 group-hover/clip:bg-green-400/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('A1', 'right', e)}
                      />
                    </div>
                  </div>

                  {/* A2 Audio Track Clip */}
                  <div className="h-[36px] border-b border-white/5 relative flex items-center">
                    <div 
                      className={`absolute h-[26px] rounded flex flex-col justify-center overflow-hidden transition-shadow duration-150 select-none group/clip ${
                        draggingClip === 'A2' 
                          ? 'z-30 shadow-[0_0_25px_rgba(52,211,153,0.4)] bg-emerald-600/35 border border-emerald-300/50 cursor-grabbing' 
                          : 'bg-emerald-600/20 border border-emerald-400/20 hover:bg-emerald-600/30 cursor-grab'
                      }`}
                      style={{ 
                        left: `${clipPositions.A2.left}%`, 
                        width: `${clipPositions.A2.width}%`,
                        opacity: trackStates.A2.muted ? 0.25 : 1 
                      }}
                      onPointerDown={(e) => handleClipDrag('A2', e)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-l z-10 hover:bg-emerald-400/50 group-hover/clip:bg-emerald-400/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('A2', 'left', e)}
                      />
                      <span className="text-[8px] font-mono text-emerald-300 font-bold truncate z-10 px-3 pointer-events-none">IMPACT_WHOOSH_01.wav</span>
                      <div className="absolute inset-x-2 bottom-1 h-2 opacity-25 flex items-end gap-[1px] pointer-events-none">
                        {[2,8,4,12,8,2,6,10,14,4,2,8,12,6,2,6,10,4].map((h, i) => (
                          <div key={i} className="flex-1 bg-emerald-400 rounded-t" style={{ height: `${h * 0.5}px` }} />
                        ))}
                      </div>
                      <div 
                        className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-r z-10 hover:bg-emerald-400/50 group-hover/clip:bg-emerald-400/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('A2', 'right', e)}
                      />
                    </div>
                  </div>

                  {/* A3 Audio Track Clip */}
                  <div className="h-[36px] relative flex items-center">
                    <div 
                      className={`absolute h-[26px] rounded flex flex-col justify-center overflow-hidden transition-shadow duration-150 select-none group/clip ${
                        draggingClip === 'A3' 
                          ? 'z-30 shadow-[0_0_25px_rgba(20,184,166,0.4)] bg-teal-700/35 border border-teal-300/50 cursor-grabbing' 
                          : 'bg-teal-700/20 border border-teal-500/20 hover:bg-teal-700/30 cursor-grab'
                      }`}
                      style={{ 
                        left: `${clipPositions.A3.left}%`, 
                        width: `${clipPositions.A3.width}%`,
                        opacity: trackStates.A3.muted ? 0.25 : 1 
                      }}
                      onPointerDown={(e) => handleClipDrag('A3', e)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div 
                        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-l z-10 hover:bg-teal-400/50 group-hover/clip:bg-teal-400/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('A3', 'left', e)}
                      />
                      <span className="text-[8px] font-mono text-teal-300 font-bold truncate z-10 px-3 pointer-events-none">BACKGROUND_EPIC_BEAT.mp3</span>
                      <div className="absolute inset-x-2 bottom-1 h-2 opacity-25 flex items-end gap-[1px] pointer-events-none">
                        {[4,6,8,6,4,6,8,10,8,6,4,8,10,12,10,8,6,8,10,8,6,8,6,4,6,8,6,4,6,8,10,8,6,4,8,10,12].map((h, i) => (
                          <div key={i} className="flex-1 bg-teal-400 rounded-t" style={{ height: `${h * 0.5}px` }} />
                        ))}
                      </div>
                      <div 
                        className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize rounded-r z-10 hover:bg-teal-400/50 group-hover/clip:bg-teal-400/20 transition-colors"
                        onPointerDown={(e) => handleTrimDrag('A3', 'right', e)}
                      />
                    </div>
                  </div>
                </div>

                {/* ─── 3D Laser Playhead ─── */}
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: trackWidth || 2000 }}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragStart={() => {
                    isDraggingRef.current = true;
                    if (videoRef.current && !videoRef.current.paused) {
                      videoRef.current.pause();
                      setIsPlaying(false);
                    }
                  }}
                  onDragEnd={() => {
                    isDraggingRef.current = false;
                  }}
                  className="absolute -top-10 bottom-0 w-8 -ml-[16px] z-40 cursor-ew-resize flex flex-col items-center pointer-events-auto group"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Laser Emitter Head */}
                  <div className="w-8 h-9 bg-black/90 border border-accent/50 rounded shadow-[0_0_15px_rgba(255,64,0,0.6)] relative flex flex-col items-center justify-end pb-1.5 group-hover:bg-orange-950 transition-colors z-20 backdrop-blur-md">
                     <div className="w-2.5 h-1 bg-white rounded-full animate-pulse shadow-[0_0_8px_#fff]" />
                     <div className="absolute -bottom-2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent border-t-accent" />
                  </div>
                  {/* Laser Beam Slicing Through tracks */}
                  <div className="flex-1 w-[2px] bg-accent shadow-[0_0_12px_#ff4000,0_0_25px_#ff4000] group-hover:w-[3px] group-hover:bg-white transition-all z-10 relative">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-24 bg-accent/25 blur-lg rounded-full pointer-events-none" />
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
                <div className="w-16 h-0.5 bg-zinc-800 rounded-full relative">
                  <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-accent rounded-full" />
                </div>
              </div>
            </div>
          </motion.footer>
        </motion.div>
      </div>

      <VideoCarousel3D isOpen={isCarouselOpen} onClose={() => setIsCarouselOpen(false)} />
    </section>
  );
}
