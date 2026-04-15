import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";

export function ZAxisTunnelGallery({
  images,
  color = "#ff4000",
  scrollContainer,
  onImageClick,
}: {
  images: string[];
  color?: string;
  scrollContainer?: React.RefObject<HTMLElement | null>;
  onImageClick?: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tổng chiều cao để cuộn. Mỗi ảnh sẽ tốn khoảng 80vh để lướt qua màn hình
  const containerHeight = `${images.length * 80 + 100}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    ...(scrollContainer ? { container: scrollContainer } : {}),
  });

  // Tweak spring params for a buttery smooth "inertia" feeling
  const smoothY = useSpring(scrollYProgress, { 
    stiffness: 40, 
    damping: 30,
    mass: 0.5,
    restDelta: 0.0005 
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full mb-32 -mx-[5vw] px-[5vw] bg-black"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Layer sọc sáng làm nền "hầm" */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffffff15] via-transparent to-transparent" />
        
        {/* Viền máy ảnh để focus hầm */}
        <div className="absolute inset-10 border border-white/5 z-0 pointer-events-none rounded-[2rem] hidden md:block" />

        {/* Cảnh báo tốc độ */}
        <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl flex items-center gap-3 z-50 pointer-events-none">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
          />
          <span className="font-body text-[11px] font-bold uppercase tracking-widest text-white/50">
            Scroll to Fly Through
          </span>
        </div>

        {/* Các hình ảnh */}
        {images.map((src, i) => {
          // Tính toán dải scroll cho từng ảnh
          // Ta phân bổ đều không gian: Peak (Scale = 1) diễn ra khi scroll = i / (images.length)
          const peak = i / images.length;
          const end = peak + 1 / images.length;
          
          // Để ảnh ở xa hội tụ sâu, bắt đầu từ 0
          const start = 0;

          // Ảnh sẽ to dần lên từ 0.05 -> 1 (tại peak) -> 12 (kéo qua mặt người dùng ở end)
          // Ta dùng mảng nhiều điểm cho hàm exponential:
          const checkpoints = [0, Math.max(0, peak - 0.2), peak, end];
          const scales = [0.01, 0.2, 1, 15]; // Zoom khủng khiếp khúc cuối
          const opacities = [0, 0.4, 1, 0];

          return (
            <TunnelImage
              key={i}
              src={src}
              i={i}
              total={images.length}
              checkpoints={checkpoints}
              scales={scales}
              opacities={opacities}
              scrollYProgress={smoothY}
              onClick={() => onImageClick?.(i)}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
}

function TunnelImage({
  src,
  i,
  total,
  checkpoints,
  scales,
  opacities,
  scrollYProgress,
  onClick,
  color,
}: {
  src: string;
  i: number;
  total: number;
  checkpoints: number[];
  scales: number[];
  opacities: number[];
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
  color: string;
}) {
  const scale = useTransform(scrollYProgress, checkpoints, scales);
  const opacity = useTransform(scrollYProgress, checkpoints, opacities);

  // Nghiêng nhẹ xen kẽ cho ảnh có vẻ lộn xộn trong không gian
  const rotation = i % 2 === 0 ? "3deg" : "-3deg";
  const offset = i % 2 === 0 ? "5%" : "-5%";
  
  return (
    <motion.div
      style={{
        scale,
        opacity,
        rotate: rotation,
        x: offset,
        y: offset,
        zIndex: total - i, // Tấm ảnh càng xa (index cao) => vẽ phía dưới (zIndex thấp hơn)
      }}
      className="absolute flex items-center justify-center cursor-pointer group origin-center perspective-1000"
      onClick={onClick}
    >
      <div className="relative w-[75vw] md:w-[50vw] aspect-[16/10] rounded-[2rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10 group-hover:border-white/30 transition-colors">
        <Image
          src={src}
          alt={`Tunnel Image ${i}`}
          fill
          className="object-cover transition-transform duration-[1s]"
          sizes="(max-width: 1200px) 100vw, 1200px"
          unoptimized={src?.includes("unsplash.com") || src?.includes("supabase.co")}
        />
        {/* Glow overlay chớp lên khi di chuột */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ boxShadow: `inset 0 0 50px ${color}` }}
        />
      </div>
    </motion.div>
  );
}
