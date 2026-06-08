"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, useScroll, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sparkles, Video, Package, Hexagon, AudioLines, Clapperboard, FileText, Settings } from "lucide-react";

// ─── Connection Component ───
const PipelineConnection = ({ 
  sourceNode, 
  targetNode, 
  color = "rgba(255, 255, 255, 0.5)"
}: { 
  sourceNode: { x: any, y: any, width: number, height: number, outPortY?: number }, 
  targetNode: { x: any, y: any, width: number, height: number, inPortY?: number },
  color?: string
}) => {
  const srcX = useSpring(sourceNode.x, { stiffness: 400, damping: 40 });
  const srcY = useSpring(sourceNode.y, { stiffness: 400, damping: 40 });
  const tgtX = useSpring(targetNode.x, { stiffness: 400, damping: 40 });
  const tgtY = useSpring(targetNode.y, { stiffness: 400, damping: 40 });

  const outX = useTransform(srcX, x => (x as any as number) + sourceNode.width / 2);
  const outY = useTransform(srcY, y => (y as any as number) + (sourceNode.outPortY || 0));
  
  const inX = useTransform(tgtX, x => (x as any as number) - targetNode.width / 2);
  const inY = useTransform(tgtY, y => (y as any as number) + (targetNode.inPortY || 0));

  const pathD = useTransform(
    [outX, outY, inX, inY],
    ([ox, oy, ix, iy]) => {
      const distance = Math.abs((ix as any as number) - (ox as any as number));
      const cpDistance = Math.max(distance * 0.5, 50); 
      const cpX1 = (ox as any as number) + cpDistance;
      const cpY1 = oy as any as number;
      const cpX2 = (ix as any as number) - cpDistance;
      const cpY2 = iy as any as number;
      return `M ${ox} ${oy} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${ix} ${iy}`;
    }
  );

  const signalProgress = useMotionValue(0);
  useEffect(() => {
    const controls = animate(signalProgress, 1, {
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      ease: "linear",
      delay: Math.random() * 2
    });
    return () => controls.stop();
  }, [signalProgress]);

  const signalPoint = useTransform(
    [outX, outY, inX, inY, signalProgress],
    ([ox, oy, ix, iy, t]) => {
      const distance = Math.abs((ix as any as number) - (ox as any as number));
      const cpDistance = Math.max(distance * 0.5, 50);
      const p0 = { x: ox as any as number, y: oy as any as number };
      const p1 = { x: (ox as any as number) + cpDistance, y: oy as any as number };
      const p2 = { x: (ix as any as number) - cpDistance, y: iy as any as number };
      const p3 = { x: ix as any as number, y: iy as any as number };
      const progress = t as any as number;
      
      const invT = 1 - progress;
      const px = invT*invT*invT*p0.x + 3*invT*invT*progress*p1.x + 3*invT*progress*progress*p2.x + progress*progress*progress*p3.x;
      const py = invT*invT*invT*p0.y + 3*invT*invT*progress*p1.y + 3*invT*progress*progress*p2.y + progress*progress*progress*p3.y;
      
      return { x: px, y: py };
    }
  );

  const sigX = useTransform(signalPoint, p => p.x);
  const sigY = useTransform(signalPoint, p => p.y);
  const sigOpacity = useTransform(signalProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <>
      <motion.path 
        d={pathD} 
        fill="none" 
        stroke={color} 
        strokeWidth="1.5" 
        className="opacity-40" 
      />
      <motion.circle 
        r="3" 
        fill={color} 
        style={{ cx: sigX, cy: sigY, opacity: sigOpacity, filter: `drop-shadow(0 0 6px ${color})` }} 
      />
    </>
  );
};

// ─── Pipeline Node Component ───
const PipelineNode = ({ 
  nodeData, 
  motionX, 
  motionY 
}: { 
  nodeData: any, 
  motionX: any, 
  motionY: any 
}) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileHover={{ zIndex: 30 }}
      whileDrag={{ scale: 1.02, zIndex: 40, cursor: "grabbing" }}
      style={{
        x: motionX,
        y: motionY,
        width: nodeData.width,
        height: nodeData.height,
        position: "absolute",
        left: 0,
        top: 0,
        marginLeft: -nodeData.width / 2,
        marginTop: -nodeData.height / 2,
      }}
      className="z-20 cursor-grab group rounded-xl bg-[#141414]/90 backdrop-blur-xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col overflow-visible"
    >
      {/* Node Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/[0.03] rounded-t-xl select-none">
        <span className="text-[14px]">{nodeData.icon}</span>
        <span className="text-[10px] font-mono font-bold text-white/70 tracking-wider flex-1 truncate">{nodeData.title}</span>
        {/* Mock settings button */}
        <div className="w-4 h-4 rounded hover:bg-white/10 flex items-center justify-center transition-colors">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </div>
      </div>

      {/* Node Content */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center p-1.5 rounded-b-xl pointer-events-none select-none">
        {nodeData.type === 'prompt' && (
          <div className="p-3 h-full overflow-hidden rounded-lg border flex flex-col gap-2"
            style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.06) 0%, rgba(245,158,11,0.03) 100%)', borderColor: 'rgba(251,191,36,0.15)' }}>
            {/* Prompt badge */}
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[8px] font-mono font-bold uppercase tracking-widest" style={{ color: '#fbbf24' }}>AI PROMPT</span>
            </div>
            <p className="text-[10px] sm:text-[11px] leading-[1.7] font-mono flex-1 overflow-hidden" style={{ color: 'rgba(251,191,36,0.85)' }}>
              {nodeData.content}
            </p>
            {/* Typing cursor */}
            <div className="flex items-center gap-1 mt-auto">
              <div className="w-1 h-3 rounded-sm animate-pulse" style={{ background: '#fbbf24' }} />
              <span className="text-[8px] font-mono" style={{ color: 'rgba(251,191,36,0.4)' }}>Generating...</span>
            </div>
          </div>
        )}
        {nodeData.type === 'text' && (
          <div className="p-3 text-[10px] sm:text-[11px] text-white/60 leading-[1.6] font-body bg-black/40 rounded-lg h-full overflow-hidden border border-white/5">
            {nodeData.content}
          </div>
        )}
        {nodeData.type === 'image' && (
          <div className="w-full h-full relative rounded-lg overflow-hidden bg-black" style={{ border: `1px solid ${nodeData.color}22` }}>
            {nodeData.content.endsWith('.mp4') || nodeData.content.endsWith('.webm') ? (
              <video src={nodeData.content} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-90" />
            ) : (
              <img src={nodeData.content} alt={nodeData.title} className="w-full h-full object-cover opacity-90" />
            )}
            {/* Type badge overlay */}
            {nodeData.badge && (
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider"
                style={{ background: `${nodeData.color}30`, color: nodeData.color, border: `1px solid ${nodeData.color}50` }}>
                {nodeData.badge}
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
          </div>
        )}
        {nodeData.type === 'video' && (
          <div className="w-full h-full relative rounded-lg overflow-hidden border border-white/5 bg-black">
            <video src={nodeData.content} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-2 left-2 right-2 flex justify-center">
              <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[8px] text-white/50 font-mono text-center shadow-lg">
                Connected prompt. <span className="text-white/70">Generating frames...</span>
              </div>
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
               <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
               <span className="text-[7px] font-mono font-bold text-white/80">REC</span>
            </div>
          </div>
        )}
        {nodeData.type === 'audio' && (
          <div className="w-full h-full relative rounded-lg overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-[#12c2e9] via-[#c471ed] to-[#f64f59] opacity-80" />
            <div className="absolute inset-0 bg-black/20" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] opacity-90 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                {Array.from({length: 40}).map((_, i) => {
                  const x = 5 + i * 2.3;
                  const h = 5 + Math.random() * 35;
                  return <line key={i} x1={x} y1={50 - h} x2={x} y2={50 + h} />;
                })}
              </svg>
            </div>
            
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-1">
               <button className="w-5 h-5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-colors border border-white/20">
                 <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
               </button>
               <div className="flex-1 mx-2 h-1 bg-white/20 rounded-full overflow-hidden">
                 <div className="h-full bg-white/80 w-[45%]" />
               </div>
               <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            </div>
          </div>
        )}
        {nodeData.type === 'settings' && (
          <div className="w-full h-full relative p-4 flex flex-col justify-center gap-3 bg-black/40 rounded-lg border border-white/5">
             <div className="flex items-center justify-between">
               <span className="text-[10px] text-white/50 uppercase">Aspect Ratio</span>
               <span className="text-[11px] text-white font-mono bg-white/10 px-2 py-0.5 rounded">16:9</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-[10px] text-white/50 uppercase">Style</span>
               <span className="text-[11px] text-white font-mono bg-white/10 px-2 py-0.5 rounded">Cinematic</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-[10px] text-white/50 uppercase">Engine</span>
               <span className="text-[11px] text-[#55efc4] font-mono bg-[#55efc4]/10 px-2 py-0.5 rounded border border-[#55efc4]/20">Midjourney v6</span>
             </div>
          </div>
        )}
      </div>

      {/* Output Port */}
      {nodeData.hasOutput && (
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 z-30 pointer-events-none">
           <div className="w-3 h-3 rounded-full bg-[#111] border border-white/30 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]">
             <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: nodeData.color, boxShadow: `0 0 5px ${nodeData.color}` }} />
           </div>
        </div>
      )}
      
      {/* Input Ports */}
      {nodeData.hasInput && (
        <div 
          className="absolute left-[-6px] top-1/2 -translate-y-1/2 flex flex-col justify-between z-30 pointer-events-none"
          style={{ height: nodeData.inputSpread || 100 }}
        >
           {nodeData.inputs?.map((_: any, i: number) => (
             <div key={i} className="w-3 h-3 rounded-full bg-[#111] border border-white/30 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]">
               <div className="w-1 h-1 rounded-full bg-white/50" />
             </div>
           ))}
        </div>
      )}
    </motion.div>
  );
};

// ─── Sub-Canvas: Video Generator ───
const VideoPipelineCanvas = () => {
  // Node positions — staggered left→right layout
  const pX = useMotionValue(-400); // Prompt
  const pY = useMotionValue(-150);
  const refX = useMotionValue(-150); // Reference Video
  const refY = useMotionValue(-280);
  const prodX = useMotionValue(-100); // Product Image
  const prodY = useMotionValue(-20);
  const logoX = useMotionValue(-180); // Logo
  const logoY = useMotionValue(200);
  const aX = useMotionValue(-350); // Audio / Voice
  const aY = useMotionValue(350);
  const vX = useMotionValue(320); // Video
  const vY = useMotionValue(60);

  const nodes = {
    prompt: {
      title: "Text Prompt",
      type: "prompt",
      icon: <Sparkles className="w-3.5 h-3.5" style={{ color: "#fbbf24" }} />,
      width: 290,
      height: 185,
      hasOutput: true,
      color: "#fbbf24",
    },
    refVideo: {
      title: "Reference Video",
      type: "image",
      icon: <Video className="w-3.5 h-3.5" style={{ color: "#38bdf8" }} />,
      width: 185,
      height: 270,
      hasOutput: true,
      badge: "REF VIDEO",
      content: "/videos/reels/885137540830386.mp4",
      color: "#38bdf8",
    },
    product: {
      title: "Hình ảnh Sản phẩm",
      type: "image",
      icon: <Package className="w-3.5 h-3.5" style={{ color: "#34d399" }} />,
      width: 185,
      height: 270,
      hasOutput: true,
      badge: "PRODUCT",
      content: "/videos/reels/1481637113705236.mp4",
      color: "#34d399",
    },
    logo: {
      title: "Logo Module",
      type: "image",
      icon: <Hexagon className="w-3.5 h-3.5" style={{ color: "#a78bfa" }} />,
      width: 160,
      height: 160,
      hasOutput: true,
      badge: "LOGO",
      content: "/images/logos/midjourney.svg",
      color: "#a78bfa",
    },
    audio: {
      title: "Voice Module",
      type: "audio",
      icon: <AudioLines className="w-3.5 h-3.5" style={{ color: "#c471ed" }} />,
      width: 200,
      height: 180,
      hasOutput: true,
      color: "#c471ed",
    },
    video: {
      title: "Video Generator #2",
      type: "video",
      icon: <Clapperboard className="w-3.5 h-3.5 text-white/80" />,
      width: 300,
      height: 450,
      hasInput: true,
      inputs: [1, 2, 3, 4, 5],
      inputSpread: 320,
      content: "/videos/reels/1193408759530975.mp4",
    },
  };

  const promptContent = "A Vietnamese-American woman in her 30s with shoulder-length black wavy hair, light makeup, expressive eyes, wearing a well-fitted dark maroon polo shirt, actively driving a modern mid-size car in a sunlit suburban California neighborhood.";

  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        {/* Prompt → Video */}
        <PipelineConnection
          sourceNode={{ x: pX, y: pY, width: nodes.prompt.width, height: nodes.prompt.height }}
          targetNode={{ x: vX, y: vY, width: nodes.video.width, height: nodes.video.height, inPortY: -160 }}
          color={nodes.prompt.color}
        />
        {/* RefVideo → Video */}
        <PipelineConnection
          sourceNode={{ x: refX, y: refY, width: nodes.refVideo.width, height: nodes.refVideo.height }}
          targetNode={{ x: vX, y: vY, width: nodes.video.width, height: nodes.video.height, inPortY: -80 }}
          color={nodes.refVideo.color}
        />
        {/* Product → Video */}
        <PipelineConnection
          sourceNode={{ x: prodX, y: prodY, width: nodes.product.width, height: nodes.product.height }}
          targetNode={{ x: vX, y: vY, width: nodes.video.width, height: nodes.video.height, inPortY: 0 }}
          color={nodes.product.color}
        />
        {/* Logo → Video */}
        <PipelineConnection
          sourceNode={{ x: logoX, y: logoY, width: nodes.logo.width, height: nodes.logo.height }}
          targetNode={{ x: vX, y: vY, width: nodes.video.width, height: nodes.video.height, inPortY: 80 }}
          color={nodes.logo.color}
        />
        {/* Audio → Video */}
        <PipelineConnection
          sourceNode={{ x: aX, y: aY, width: nodes.audio.width, height: nodes.audio.height }}
          targetNode={{ x: vX, y: vY, width: nodes.video.width, height: nodes.video.height, inPortY: 160 }}
          color={nodes.audio.color}
        />
      </svg>

      {/* Prompt node — amber highlight ring */}
      <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 15, pointerEvents: 'none' }}>
        <motion.div
          style={{ x: pX, y: pY, width: nodes.prompt.width, height: nodes.prompt.height, marginLeft: -nodes.prompt.width / 2, marginTop: -nodes.prompt.height / 2 }}
          className="absolute"
        >
          <div className="absolute -inset-[3px] rounded-[14px] animate-pulse" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.3), rgba(245,158,11,0.1))', filter: 'blur(6px)' }} />
        </motion.div>
      </div>
      {/* RefVideo node — cyan highlight ring */}
      <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 15, pointerEvents: 'none' }}>
        <motion.div
          style={{ x: refX, y: refY, width: nodes.refVideo.width, height: nodes.refVideo.height, marginLeft: -nodes.refVideo.width / 2, marginTop: -nodes.refVideo.height / 2 }}
          className="absolute"
        >
          <div className="absolute -inset-[3px] rounded-[14px]" style={{ background: 'rgba(56,189,248,0.15)', filter: 'blur(8px)' }} />
        </motion.div>
      </div>
      {/* Product node — emerald highlight ring */}
      <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 15, pointerEvents: 'none' }}>
        <motion.div
          style={{ x: prodX, y: prodY, width: nodes.product.width, height: nodes.product.height, marginLeft: -nodes.product.width / 2, marginTop: -nodes.product.height / 2 }}
          className="absolute"
        >
          <div className="absolute -inset-[3px] rounded-[14px]" style={{ background: 'rgba(52,211,153,0.15)', filter: 'blur(8px)' }} />
        </motion.div>
      </div>
      {/* Logo node — purple highlight ring */}
      <div style={{ position: 'absolute', left: 0, top: 0, zIndex: 15, pointerEvents: 'none' }}>
        <motion.div
          style={{ x: logoX, y: logoY, width: nodes.logo.width, height: nodes.logo.height, marginLeft: -nodes.logo.width / 2, marginTop: -nodes.logo.height / 2 }}
          className="absolute"
        >
          <div className="absolute -inset-[3px] rounded-[14px]" style={{ background: 'rgba(167,139,250,0.15)', filter: 'blur(8px)' }} />
        </motion.div>
      </div>

      <PipelineNode nodeData={{ ...nodes.prompt, content: promptContent }} motionX={pX} motionY={pY} />
      <PipelineNode nodeData={nodes.refVideo} motionX={refX} motionY={refY} />
      <PipelineNode nodeData={nodes.product} motionX={prodX} motionY={prodY} />
      <PipelineNode nodeData={nodes.logo} motionX={logoX} motionY={logoY} />
      <PipelineNode nodeData={nodes.audio} motionX={aX} motionY={aY} />
      <PipelineNode nodeData={nodes.video} motionX={vX} motionY={vY} />
    </>
  );
};

// ─── Sub-Canvas: Image Generator ───
const ImagePipelineCanvas = () => {
  const tX = useMotionValue(-350);
  const tY = useMotionValue(0);
  const sX = useMotionValue(-50);
  const sY = useMotionValue(-150);
  const i1X = useMotionValue(250);
  const i1Y = useMotionValue(-120);
  const i2X = useMotionValue(300);
  const i2Y = useMotionValue(200);

  const nodes = {
    text: { title: "Midjourney Prompt", type: "text", icon: "📝", width: 300, height: 180, hasOutput: true, color: "#a29bfe" },
    settings: { title: "Generation Parameters", type: "settings", icon: "⚙️", width: 220, height: 160, hasInput: true, inputs: [1], hasOutput: true, color: "#55efc4" },
    img1: { title: "Result Variant A", type: "image", icon: "🖼️", width: 260, height: 260, hasInput: true, inputs: [1], content: "/images/work/social-post/0624-ph-ka--tang-cha-3.webp", color: "#74b9ff" },
    img2: { title: "Result Variant B", type: "image", icon: "🖼️", width: 240, height: 240, hasInput: true, inputs: [1], content: "/images/work/social-post/0424-ph-ka-tai-chinh-vung-vang.webp", color: "#ff9f43" },
  };

  const textContent = "/imagine prompt: A cinematic shot of a happy Vietnamese family, father and child, golden hour lighting, 8k resolution, photorealistic, shot on 35mm lens --ar 16:9 --v 6.0";

  return (
    <>
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        <PipelineConnection sourceNode={{ x: tX, y: tY, width: nodes.text.width, height: nodes.text.height }} targetNode={{ x: sX, y: sY, width: nodes.settings.width, height: nodes.settings.height }} color={nodes.text.color} />
        <PipelineConnection sourceNode={{ x: tX, y: tY, width: nodes.text.width, height: nodes.text.height, outPortY: 30 }} targetNode={{ x: i2X, y: i2Y, width: nodes.img2.width, height: nodes.img2.height }} color={nodes.text.color} />
        <PipelineConnection sourceNode={{ x: sX, y: sY, width: nodes.settings.width, height: nodes.settings.height }} targetNode={{ x: i1X, y: i1Y, width: nodes.img1.width, height: nodes.img1.height }} color={nodes.settings.color} />
      </svg>
      <PipelineNode nodeData={{ ...nodes.text, content: textContent }} motionX={tX} motionY={tY} />
      <PipelineNode nodeData={nodes.settings} motionX={sX} motionY={sY} />
      <PipelineNode nodeData={nodes.img1} motionX={i1X} motionY={i1Y} />
      <PipelineNode nodeData={nodes.img2} motionX={i2X} motionY={i2Y} />
    </>
  );
};


export default function WorkAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'image'>('video');

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0]);
  const scaleAnim = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.92, 1, 0.92]);

  return (
    <section ref={containerRef} id="ai" className="relative w-full h-screen min-h-[900px] overflow-hidden bg-[#0A0A0A] border-t border-white/5">
      {mounted && (
        <>
      
      {/* ─── Dot Grid Background ─── */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "center center"
        }}
      />
      
      {/* Deep Vignette Shadow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_10%,#0A0A0A_85%)]" />

      {/* ─── Toggle Switch UI — Premium Segmented Control ─── */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        {/* Outer glow aura */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-40 transition-all duration-700 pointer-events-none"
          style={{
            background: activeTab === 'video'
              ? 'radial-gradient(ellipse, #ff5a1f 0%, transparent 70%)'
              : 'radial-gradient(ellipse, #00cec9 0%, transparent 70%)',
            transform: 'scale(1.6) translateY(6px)',
          }}
        />
        {/* Control container */}
        <div
          className="relative flex items-center p-1"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '9999px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Video Button */}
          <button
            onClick={() => setActiveTab('video')}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full z-10 transition-all duration-300 group"
            style={{ minWidth: '120px', justifyContent: 'center' }}
          >
            {/* Sliding pill — always in DOM, moved by layoutId */}
            {activeTab === 'video' && (
              <motion.div
                layoutId="ai-premium-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,90,31,0.25) 0%, rgba(255,159,67,0.15) 100%)',
                  border: '1px solid rgba(255,90,31,0.4)',
                  boxShadow: '0 0 20px rgba(255,90,31,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {/* Video SVG Icon */}
            <span className="relative z-10 flex-shrink-0 transition-all duration-300" style={{ color: activeTab === 'video' ? '#ff7f50' : 'rgba(255,255,255,0.3)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 10l4.553-2.553A1 1 0 0121 8.382v7.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
              </svg>
            </span>
            <span
              className="relative z-10 font-heading text-[11px] uppercase tracking-[0.12em] font-bold transition-all duration-300"
              style={{ color: activeTab === 'video' ? '#ffffff' : 'rgba(255,255,255,0.3)' }}
            >
              Video
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-4 mx-0.5 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Image Button */}
          <button
            onClick={() => setActiveTab('image')}
            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full z-10 transition-all duration-300 group"
            style={{ minWidth: '120px', justifyContent: 'center' }}
          >
            {activeTab === 'image' && (
              <motion.div
                layoutId="ai-premium-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,206,201,0.25) 0%, rgba(85,239,196,0.15) 100%)',
                  border: '1px solid rgba(0,206,201,0.4)',
                  boxShadow: '0 0 20px rgba(0,206,201,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {/* Image SVG Icon */}
            <span className="relative z-10 flex-shrink-0 transition-all duration-300" style={{ color: activeTab === 'image' ? '#55efc4' : 'rgba(255,255,255,0.3)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </span>
            <span
              className="relative z-10 font-heading text-[11px] uppercase tracking-[0.12em] font-bold transition-all duration-300"
              style={{ color: activeTab === 'image' ? '#ffffff' : 'rgba(255,255,255,0.3)' }}
            >
              Image
            </span>
          </button>
        </div>
      </div>

      <motion.div 
        style={{ opacity: contentOpacity, scale: scaleAnim }} 
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-full h-full max-w-[1400px] mx-auto pointer-events-auto overflow-hidden">
          
          {/* ─── Node Canvas Center Anchor ─── */}
          <div className="absolute left-1/2 top-1/2 w-[1px] h-[1px] overflow-visible scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 transition-transform duration-500">
            <AnimatePresence mode="wait">
              {activeTab === 'video' ? (
                <motion.div key="video-canvas" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}>
                  <VideoPipelineCanvas />
                </motion.div>
              ) : (
                <motion.div key="image-canvas" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}>
                  <ImagePipelineCanvas />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* ─── Foreground Title & Text Overlay ─── */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 pointer-events-none flex flex-col justify-end items-start z-50 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pt-32">
        <div className="max-w-2xl pointer-events-auto relative z-50">
          <h2 className="font-heading text-[clamp(40px,7vw,90px)] text-white font-black leading-[0.9] tracking-tight uppercase">
            A.I<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5a1f] to-[#ff9f43]">
              FLOW
            </span>
          </h2>
          
          <div className="mt-8 relative max-w-[420px]">
            <div className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md pointer-events-none" />
            <p className="relative z-10 font-body text-[15px] text-white/60 leading-relaxed p-6">
              Applied generative AI models to scale production. Try dragging the nodes around the canvas to feel the physical network connection and pipeline flow.
            </p>
          </div>

          <div className="mt-8">
            <Link 
              href="/ai" 
              className="relative z-[100] pointer-events-auto cursor-pointer group flex items-center gap-3 bg-[#111] hover:bg-[#ff5a1f]/10 border border-[#ff5a1f]/20 hover:border-[#ff5a1f]/50 
                         px-6 py-3.5 rounded-full transition-all duration-300 backdrop-blur-md w-fit"
            >
              <span className="font-heading text-[11px] font-black tracking-widest text-[#ff5a1f] uppercase">
                Enter AI Dashboard
              </span>
              <svg 
                className="w-4 h-4 text-[#ff5a1f] group-hover:translate-x-1 transition-transform" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      </>
      )}
    </section>
  );
}
