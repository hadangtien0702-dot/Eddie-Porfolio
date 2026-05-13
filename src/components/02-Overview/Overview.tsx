"use client";

// ─── Overview Section ───
// Mô tả: Section giới thiệu — layout sáng tạo kiểu editorial
// Heading lớn bên trái overlap với hero image ở giữa
// Description text bên phải hero image
// Stats #01-#04 hàng ngang phía dưới
// Background: bg2.jpg hiển thị sáng rõ, overlay rất nhẹ
// Data: import từ data/overview.ts

import { useRef, useEffect, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { overviewHeading } from "@/data/overview";

// ─── Overview Section chính ───
export default function Overview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // ─── Mouse Parallax — di chuyển background theo chuột ───
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config — mượt mà, không giật
  const springConfig = { damping: 25, stiffness: 60, mass: 1 };
  const bgX = useSpring(mouseX, springConfig);
  const bgY = useSpring(mouseY, springConfig);

  // Layer 2 — hero image di chuyển nhiều hơn (chiều sâu trung bình)
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);
  const heroX = useSpring(heroMouseX, { damping: 30, stiffness: 50, mass: 1 });
  const heroY = useSpring(heroMouseY, { damping: 30, stiffness: 50, mass: 1 });

  // Layer 3 — glow orb di chuyển nhiều nhất (theo chuột, rất rõ)
  const glowMouseX = useMotionValue(0);
  const glowMouseY = useMotionValue(0);
  const glowX = useSpring(glowMouseX, { damping: 20, stiffness: 40, mass: 1 });
  const glowY = useSpring(glowMouseY, { damping: 20, stiffness: 40, mass: 1 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    // Tính vị trí chuột tương đối (-0.5 đến 0.5)
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    // Background di chuyển ngược hướng chuột — biên độ lớn
    mouseX.set(xRatio * -40);
    mouseY.set(yRatio * -40);

    // Hero image di chuyển ngược, ít hơn — lớp chiều sâu
    heroMouseX.set(xRatio * -25);
    heroMouseY.set(yRatio * -15);

    // Glow orb di chuyển theo hướng chuột — nhiều nhất
    glowMouseX.set(xRatio * 60);
    glowMouseY.set(yRatio * 60);
  }, [mouseX, mouseY, heroMouseX, heroMouseY, glowMouseX, glowMouseY]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
      id="overview"
    >
      {/* ─── Background — bg2.jpg + Mouse Parallax + Cinematic Reveal ─── */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute -inset-6 z-0"
      >
        <Image
          src="/images/01-Overview/bg2.jpg"
          alt="Overview background"
          fill
          sizes="100vw"
          className="object-cover scale-110"
          priority
        />
        {/* Overlay tối ban đầu → sáng dần (cinematic reveal) */}
        <motion.div
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 0.25 }}
          transition={{
            duration: 2.5,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 bg-primary"
        />
        {/* Fade top — blend với section trên */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>

      {/* ─── Glow Orb — ánh sáng đỏ di chuyển theo chuột ─── */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]
                   w-[500px] h-[500px] rounded-full pointer-events-none
                   bg-accent/15 blur-[100px]"
      />

      {/* ─── Bottom Dark Bar — nền tối cho stats ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-[180px] z-[1]">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-transparent" />
      </div>

      {/* ─── Main Content Container ─── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32 lg:pt-48 pb-16 lg:pb-24 min-h-screen flex flex-col justify-between">

        {/* ─── Hero Area: Text + Image overlap ─── */}
        <div className="relative flex-1 flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-0">
          {/* ─── Cột trái: Overline + Heading cực lớn ─── */}
          <div className="relative z-20 flex-shrink-0 w-full lg:max-w-[65%]">
            {/* Overline — letter reveal, bắt đầu 50% opacity */}
            <motion.p
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } },
              }}
              className="font-body text-[12px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4"
            >
              {"Hey, I'm a".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0.5, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="inline-block"
                  style={{ whiteSpace: char === " " ? "pre" : undefined }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.p>

            <motion.h2
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
              }}
              className="font-heading text-[clamp(42px,8vw,88px)] font-bold leading-[0.9] text-white
                         tracking-tight break-words text-left"
            >
              {overviewHeading.title.split(" ").map((word, wi) => (
                <motion.span
                  key={wi}
                  className="inline-block mr-[0.25em]"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.025 } },
                  }}
                >
                  {word.split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      variants={{
                        hidden: { opacity: 0.5, y: 40 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          {/* ─── Hero Image — giữa, overlap với heading + parallax layer 2 ─── */}
          {/* ─── Hero Image — Hide as requested ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ x: heroX, y: heroY }}
            className="absolute top-1/2 left-[32%] -translate-y-[42%] z-10
                       w-[400px] h-[530px] sm:w-[440px] sm:h-[580px] md:w-[500px] md:h-[660px] lg:w-[580px] lg:h-[770px]"
          >
            <Image
              src="/images/01-Overview/hero.png"
              alt="Eddie — Creative Video Strategist"
              fill
              sizes="(max-width: 768px) 350px, (max-width: 1024px) 420px, 480px"
              className="object-contain object-bottom"
              priority
            />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[130%] h-[2px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <motion.div
                className="absolute inset-y-0 w-[45%]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.9), rgba(255,255,255,0.6), rgba(239,68,68,0.9), transparent)",
                  filter: "blur(0.5px)",
                }}
                animate={{ x: ["-100%", "280%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.8,
                }}
              />
            </div>
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-[28px] rounded-full"
              style={{ background: "radial-gradient(ellipse, rgba(239,68,68,0.25) 0%, transparent 70%)" }}
              animate={{ opacity: [0.4, 0.9, 0.4], scaleX: [0.9, 1.05, 0.9] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.8 }}
            />
          </motion.div>

          {/* ─── Cột phải: Description text ─── */}
          <div className="relative z-20 lg:ml-auto w-full max-w-[400px] lg:max-w-[320px] self-start lg:self-center">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-heading text-xl sm:text-2xl font-semibold leading-snug text-white mb-4"
            >
              {overviewHeading.description.split(".")[0]}.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-body text-base sm:text-lg lg:text-[19px] text-white/60 leading-[1.7] lg:leading-[1.8]"
            >
              {overviewHeading.description.split(".").slice(1).join(".").trim()}
            </motion.p>
          </div>
        </div>

        {/* ─── Scroll indicator — bouncing chevron ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-body text-[12px] font-bold text-white/40 uppercase tracking-[0.2em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.3)" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
