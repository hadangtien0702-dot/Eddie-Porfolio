"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  motion, useInView, useMotionValue, useSpring,
  useScroll, useTransform
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { overviewHeading } from "@/data/overview";

export default function Overview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroMX = useMotionValue(0);
  const bgX = useSpring(mouseX, { damping: 30, stiffness: 55 });
  const bgY = useSpring(mouseY, { damping: 30, stiffness: 55 });
  const heroXSpring = useSpring(heroMX, { damping: 35, stiffness: 45 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const { left, width } = sectionRef.current.getBoundingClientRect();
    const xR = (e.clientX - left) / width - 0.5;
    mouseX.set(xR * -18);
    mouseY.set(0);
    heroMX.set(xR * -8);
  }, [mouseX, mouseY, heroMX]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { damping: 22, stiffness: 48, mass: 0.8 });
  const textOpacity = useTransform(smooth, [0, 0.28], [1, 0]);
  const textY = useTransform(smooth, [0, 0.28], ["0px", "-60px"]);
  const sceneScale = useTransform(smooth, [0, 0.72], [1, 1.05]);
  const ringRotateY = useTransform(smooth, [0, 0.75], [0, -110]); // Quay xuyên suốt hành trình cuộn để tạo dòng chảy
  // Nội dung TRÔI ĐI từ từ tới gần cuối section (thay vì biến mất ở 45%) → lấp đầy khoảng chuyển cảnh
  const ringY = useTransform(smooth, [0, 0.45, 0.78], ["0vh", "0vh", "22vh"]); // Trôi xuống nhẹ khi rời đi
  const ringScale = useTransform(smooth, [0, 0.45, 0.78], [1, 1, 0.9]);
  const ringOpacity = useTransform(smooth, [0, 0.5, 0.74], [1, 1, 0]); // Mờ ĐÚNG LÚC trôi khỏi màn hình
  const heroOpacity = useTransform(smooth, [0, 0.3, 0.62], [1, 0.6, 0]);
  const heroFilter = useTransform(
    smooth,
    [0, 0.3, 0.62],
    ["brightness(1) blur(0px)", "brightness(0.5) blur(2px)", "brightness(0.15) blur(6px)"]
  );

  // Chỉ ẩn khỏi DOM khi nội dung đã trôi khuất (gần cuối section) — tránh để lộ khoảng đen giữa 2 phần
  const ringDisplay = useTransform(smooth, (v) => v > 0.82 ? "none" : "block");
  const heroDisplay = useTransform(smooth, (v) => v > 0.82 ? "none" : "block");

  const scrollToWork = useCallback(() => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const videos = [
    "/videos/socials/creative-2.mp4",
    "/videos/socials/creative-4.mp4",
    "/videos/socials/creative-5.mp4",
    "/videos/socials/creative-1.mp4",
    "/videos/socials/creative-3.mp4",
    "/videos/socials/creative-6.mp4",
  ];

  // Cards arranged in a 3D circle/arc around the center
  const cards = [
    // LEFT (outermost → innermost)
    { id: "l3", vid: 0, angle: -80, delay: 0.70, wVW: 9.5,  hide: "hidden lg:block" },
    { id: "l2", vid: 1, angle: -50, delay: 0.55, wVW: 11,   hide: "hidden md:block" },
    { id: "l1", vid: 2, angle: -20, delay: 0.38, wVW: 12.5, hide: "block" },
    // RIGHT (innermost → outermost)
    { id: "r1", vid: 3, angle:  20, delay: 0.38, wVW: 12.5, hide: "block" },
    { id: "r2", vid: 4, angle:  50, delay: 0.55, wVW: 11,   hide: "hidden md:block" },
    { id: "r3", vid: 5, angle:  80, delay: 0.70, wVW: 9.5,  hide: "hidden lg:block" },
  ];

  return (
    <section ref={sectionRef} id="overview" className="relative w-full h-[160vh]">
      {/* ─── Sticky full-screen viewport ─── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Background ── */}
        <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-12 w-[calc(100%+96px)] h-[calc(100%+96px)] z-0">
          <Image
            src="/images/01-Overview/bg.jpg"
            alt="bg"
            fill
            sizes="110vw"
            className="object-cover"
            priority
          />
          {/* Dark overlay so text is legible */}
          <div className="absolute inset-0 bg-black/85" />
        </motion.div>

        {/* Top edge fade */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black to-transparent z-[1]" />

        {/* Red atmospheric glow — emanates from bottom center */}
        <div
          className="absolute z-[1] pointer-events-none"
          style={{
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "160vw",
            height: "55vh",
            background: "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(180,25,25,0.42) 0%, rgba(120,15,15,0.18) 50%, transparent 75%)",
          }}
        />

        {/* ════════════════════════════════════════
            TEXT BLOCK — Left aligned
            ════════════════════════════════════════ */}
        <motion.div
          className="absolute z-30 flex flex-col items-start text-left"
          style={{
            top: "15%",
            left: "5%",
            maxWidth: "44%",
            zIndex: 30,
            opacity: textOpacity as any,
            y: textY as any,
          } as any}
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif italic text-red-400 text-base md:text-[17px] mb-3 tracking-wide"
          >
            Creating content that drives real business results.
          </motion.p>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-black uppercase text-white tracking-tight leading-[0.95]
                       text-[clamp(36px,5.5vw,80px)]"
          >
            Capturing <span className="text-white/50">Moments,</span>
            <br />
            Telling Stories<span className="text-red-500">.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="font-body text-white/40 text-sm md:text-base max-w-[500px] mt-4 leading-relaxed"
          >
            {overviewHeading.description}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.60, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7"
          >
            <Link
              href="#contact"
              className="group inline-flex items-center gap-3
                         bg-red-500 hover:bg-red-600 text-white
                         font-heading font-black uppercase tracking-[0.14em] text-[11px]
                         pl-1.5 pr-6 py-1.5 rounded-full
                         shadow-[0_0_28px_rgba(239,68,68,0.52)] hover:shadow-[0_0_48px_rgba(239,68,68,0.72)]
                         transition-all duration-300"
            >
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center
                               group-hover:bg-white/30 transition-colors shrink-0">
                <ArrowRight size={14} />
              </span>
              Book Now
            </Link>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════════════
            SCENE: Hero + Cards
            Both positioned absolutely in viewport
            ════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 z-[5]"
          style={{
            inset: 0,
            position: "absolute",
            zIndex: 5,
            transformOrigin: "50% 80%",
            scale: sceneScale as any,
            perspective: "1100px",
            perspectiveOrigin: "50% 60%",
          } as any}
        >

          {/* ── Hero silhouette wrapper ── */}
          {/* Căn lề 48% để bù đắp chủ thể trong ảnh bị lệch phải, thu nhỏ tỷ lệ tương đối */}
          {/* Giảm độ mờ (opacity) dựa trên tiến trình cuộn trang để làm nổi bật vòng xoay 3D */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: "48%",
              bottom: 0,
              width: "clamp(240px, 24vw, 380px)",
              transform: "translateX(-50%) translateZ(0px)",
              transformStyle: "preserve-3d",
              opacity: heroOpacity as any,
              filter: heroFilter as any,
              display: heroDisplay as any,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: heroXSpring }}
              className="w-full h-full relative"
            >
              <Image
                src="/images/01-Overview/hero.png"
                alt="Eddie — Creative Director"
                width={380}
                height={550}
                className="object-contain object-bottom w-full h-full"
                style={{ maxHeight: "56vh" }}
                priority
              />
              {/* Foot shimmer */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden" style={{ width: "130%", height: "2px" }}>
                <motion.div
                  style={{
                    position: "absolute",
                    inset: "0 auto 0 0",
                    width: "40%",
                    background: "linear-gradient(90deg,transparent,rgba(239,68,68,0.85),rgba(255,255,255,0.45),rgba(239,68,68,0.85),transparent)",
                  }}
                  animate={{ x: ["-100%", "310%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                />
              </div>
              {/* Ground glow */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2"
                style={{
                  width: "80%",
                  height: "28px",
                  background: "radial-gradient(ellipse,rgba(239,68,68,0.48) 0%,transparent 70%)",
                  filter: "blur(8px)",
                }}
              />
            </motion.div>
          </motion.div>

          {/* ── 3D Rotating Ring Container ── */}
          {/* OUTER: lo phần fade / dịch chuyển / scale + giữ "perspective".
              opacity < 1 sẽ ÉP transform-style về flat, nên element này TUYỆT ĐỐI
              không được mang preserve-3d — nếu không vòng cung 3D sẽ xẹp thành hàng ngang.
              Đặt perspective ở đây (dưới lớp fade) để các card vẫn được chiếu 3D trong lúc mờ dần. */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              y: ringY as any,
              scale: ringScale as any,
              opacity: ringOpacity as any,
              display: ringDisplay as any,
              perspective: "1100px",
              perspectiveOrigin: "50% 60%",
            }}
          >
            {/* INNER: vòng tròn 3D thật sự — chỉ có preserve-3d + rotateY, không dính prop gây flat */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
                rotateY: ringRotateY,
              }}
            >
            {/* ── Video Cards (Xếp trên vòng tròn 3D và quay quanh Hero) ── */}
            {cards.map((c) => (
              <div
                key={c.id}
                className={`${c.hide} absolute`}
                style={{
                  left: "50%",
                  top: "60%",
                  width: `clamp(${c.wVW * 8}px, ${c.wVW}vw, ${c.wVW * 15}px)`,
                  transformStyle: "preserve-3d",
                  transform: `translate(-50%, -50%) rotateY(${c.angle}deg) translateZ(clamp(260px, 35vw, 500px))`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInView ? { opacity: 0.9, y: 0 } : {}}
                  whileHover={{
                    scale: 1.15,
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  transition={{ duration: 0.8, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full relative group"
                >
                  {/* iPhone Mockup Frame */}
                  <div
                    className="w-full rounded-[clamp(12px,1.8vw,28px)] overflow-hidden bg-black p-[clamp(2px,0.25vw,6px)] border-[clamp(1px,0.2vw,4px)] border-zinc-800/80 
                               shadow-[0_16px_50px_rgba(0,0,0,0.85)] relative transition-all duration-300
                               group-hover:border-red-500/30 group-hover:shadow-[0_20px_50px_rgba(255,64,0,0.25)]"
                    style={{ aspectRatio: "9 / 16" }}
                  >
                    {/* Phone Notch / Dynamic Island */}
                    <div className="absolute top-[clamp(4px,0.5vw,10px)] left-1/2 -translate-x-1/2 w-[clamp(18px,2vw,36px)] h-[clamp(5px,0.5vw,10px)] bg-black rounded-full z-20 flex items-center justify-center border border-white/5">
                      <div className="w-[clamp(2px,0.25vw,5px)] h-[clamp(2px,0.25vw,5px)] rounded-full bg-blue-900/40 mr-[clamp(4px,0.5vw,10px)]" />
                      <div className="w-[clamp(1.5px,0.2vw,4px)] h-[clamp(1.5px,0.2vw,4px)] rounded-full bg-zinc-900" />
                    </div>

                    {/* Inner Screen Container */}
                    <div className="w-full h-full rounded-[clamp(10px,1.5vw,24px)] overflow-hidden relative bg-zinc-950">
                      <video
                        src={videos[c.vid]}
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover"
                      />
                      {/* Glass reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10" />
                      {/* Vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 mix-blend-overlay pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
            </motion.div>
          </motion.div>

        </motion.div>

        {/* Bottom edge → black */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black to-transparent z-40 pointer-events-none" />

        {/* ── Corner viewfinder frames ── */}
        <div className="absolute inset-5 z-50 pointer-events-none hidden md:block">
          <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/10" />
          <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/10" />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/10" />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/10" />
          <div className="absolute top-3 left-7 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping opacity-60" />
            <span className="text-[8px] font-heading font-black uppercase tracking-widest text-white/22">REC</span>
          </div>
          <div className="absolute top-3 right-7 text-[8px] font-heading font-black uppercase tracking-widest text-white/22">
            24FPS · 4K · RAW
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          onClick={scrollToWork}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 cursor-pointer group"
        >
          <span className="font-body text-[8px] font-bold text-white/25 group-hover:text-white/50 uppercase tracking-[0.28em] transition-colors">
            Scroll
          </span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:stroke-white/50 transition-colors"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
