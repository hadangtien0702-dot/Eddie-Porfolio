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

  // ─── Lắng nghe sự kiện Cuộn (Wheel / Touch) để nhảy xuống #work một cách mạnh mẽ ───
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      // Nếu đang trong quá trình tự động cuộn, chặn luôn thao tác cuộn tay của user
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      // Nếu người dùng cuộn xuống VÀ vẫn đang ở trong vùng Overview
      if (e.deltaY > 0 && window.scrollY < window.innerHeight - 100) {
        e.preventDefault(); 
        isScrolling = true;
        
        // Vô hiệu hóa thanh cuộn tạm thời để triệt tiêu quán tính của trackpad/chuột
        document.body.style.overflow = "hidden";
        
        const workSection = document.getElementById("work");
        if (workSection) {
          workSection.scrollIntoView({ behavior: "smooth" });
        }
        
        // Khóa cuộn trong 1.2s để animation hoàn tất, sau đó nhả thanh cuộn
        setTimeout(() => {
          document.body.style.overflow = "";
          isScrolling = false;
        }, 1200);
      }
    };

    // Mobile swipe
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      // Vuốt lên (cuộn màn hình xuống)
      if (diff > 20 && window.scrollY < window.innerHeight - 100) {
        isScrolling = true;
        
        document.body.style.overflow = "hidden";
        const workSection = document.getElementById("work");
        if (workSection) {
          workSection.scrollIntoView({ behavior: "smooth" });
        }
        
        setTimeout(() => {
          document.body.style.overflow = "";
          isScrolling = false;
        }, 1200);
      }
    };

    // Bắt sự kiện trên window với passive: false để can thiệp được e.preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      {/* ─── Huge Kinetic Background Marquee ─── */}
      <div className="absolute top-[28%] left-0 right-0 w-full overflow-hidden pointer-events-none z-[1] select-none opacity-[0.02]">
        <div className="flex w-[200%] animate-marquee">
          <div className="w-1/2 flex justify-around font-heading text-[9vw] font-black uppercase tracking-wider text-white whitespace-nowrap">
            <span>DIRECTOR</span>
            <span>PRODUCER</span>
            <span>STRATEGIST</span>
            <span>CREATOR</span>
          </div>
          <div className="w-1/2 flex justify-around font-heading text-[9vw] font-black uppercase tracking-wider text-white whitespace-nowrap">
            <span>DIRECTOR</span>
            <span>PRODUCER</span>
            <span>STRATEGIST</span>
            <span>CREATOR</span>
          </div>
        </div>
      </div>

      {/* ─── Cinematic Viewfinder Framing ─── */}
      <div className="absolute inset-8 pointer-events-none z-30 hidden md:block">
        {/* Top Left */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
        {/* Top Right */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />
        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20" />
        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20" />
        
        {/* Flashing REC indicator */}
        <div className="absolute top-4 left-10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[10px] font-heading font-black uppercase tracking-widest text-white/40">REC</span>
        </div>
        <div className="absolute top-4 right-10 text-[10px] font-heading font-black uppercase tracking-widest text-white/40">
          24FPS  ·  4K  ·  RAW
        </div>
      </div>

      {/* ─── Bottom Dark Bar — nền tối cho stats ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-[180px] z-[1]">
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-transparent" />
      </div>

      {/* ─── Main Content Container ─── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-32 lg:pt-48 pb-16 lg:pb-24 min-h-screen flex flex-col justify-between">

        {/* ─── Interactive Floating Circular Badge ─── */}
        <motion.div 
          style={{ x: glowX, y: glowY }} // Parallax movement
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[18%] left-[2%] z-20 hidden xl:block w-28 h-28 cursor-pointer group"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="fill-white/30 group-hover:fill-red-400 transition-colors duration-300 font-heading font-bold text-[8.5px] uppercase tracking-wider">
              <textPath href="#circlePath" startOffset="0%">
                • Eddie V3 • Creative Director • Video Strategist •
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-red-500 group-hover:scale-125 transition-transform duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </motion.div>

        {/* ─── Hero Area: Text + Image overlap ─── */}
        <div className="relative flex-1 flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-0">
          {/* ─── Cột trái: Overline + Heading cực lớn ─── */}
          <div className="relative z-20 flex-shrink-0 w-full lg:max-w-[70%]">
            {/* Overline — letter reveal, bắt đầu 50% opacity */}
            <motion.p
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } },
              }}
              className="font-body text-[12px] font-black uppercase tracking-[0.25em] text-white/40 mb-5 flex items-center gap-3"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {overviewHeading.overline.split("").map((char, i) => (
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
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.5 } },
              }}
              className="font-heading text-[clamp(42px,7.5vw,84px)] font-black leading-[1.05] 
                         tracking-tight break-words text-left text-balance"
            >
              {/* Line 1: creative */}
              <span className="block lg:mb-1">
                {/* Word: creative */}
                <span className="inline-block mr-[0.25em] font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 lowercase drop-shadow-[0_0_15px_rgba(239,68,68,0.25)] select-none">
                  {"creative".split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
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
                </span>
              </span>

              {/* Line 2: Production */}
              <span className="block lg:mb-1">
                {/* Word: Production */}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80">
                  {"Production".split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      variants={{
                        hidden: { opacity: 0.3, y: 30 },
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
                </span>
              </span>

              {/* Line 2: Team Lead. */}
              <span className="block">
                {/* Word: Team */}
                <span className="inline-block mr-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                  {"Team".split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      variants={{
                        hidden: { opacity: 0.3, y: 30 },
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
                </span>

                {/* Word: Lead */}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                  {"Lead".split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      variants={{
                        hidden: { opacity: 0.3, y: 30 },
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
                </span>

                {/* Dot: . */}
                <motion.span 
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 1.2 } },
                  }}
                  className="inline-block text-red-500 ml-1 select-none drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]"
                >
                  .
                </motion.span>
              </span>
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
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            whileHover={{ 
              y: -8, 
              rotateX: 2, 
              rotateY: -2,
              transition: { duration: 0.3 } 
            }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            className="relative z-20 lg:ml-auto w-full max-w-[400px] lg:max-w-[350px] self-start lg:self-center
                       bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8
                       shadow-[0_20px_50px_rgba(0,0,0,0.4)] group overflow-hidden transition-all duration-300 hover:border-red-500/20"
          >
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                 style={{
                   backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                   backgroundSize: "16px 16px"
                 }} 
            />

            {/* Subtle top glare effect */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {/* Red accent line on hover */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-red-500/0 via-red-500 to-red-500/0 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Tag Pills */}
            <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
              {["Video Strategy", "Paid Funnels", "Growth"].map((tag, i) => (
                <span 
                  key={i} 
                  className="text-[9px] font-heading font-black uppercase tracking-widest px-2.5 py-1 
                             rounded-full bg-white/[0.03] border border-white/5 text-white/50 
                             group-hover:border-red-500/10 group-hover:text-red-400/80 transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
                            
            {/* Decorative Quote Icon */}
            <div className="text-red-500/25 mb-4 relative z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21L16.411 14.1818H10.1581V3H21.5V14.1818L19.106 21H14.017ZM3.85897 21L6.25299 14.1818H0V3H11.3419V14.1818L8.94786 21H3.85897Z" />
              </svg>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-body text-base sm:text-lg text-white/70 leading-[1.7] lg:leading-[1.8] relative z-10"
            >
              {overviewHeading.description}
            </motion.p>
          </motion.div>
        </div>

        {/* ─── Scroll indicator — bouncing chevron ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={scrollToWork}
        >
          <span className="font-body text-[12px] font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-[0.2em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.3)" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:stroke-white/80 transition-colors">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
