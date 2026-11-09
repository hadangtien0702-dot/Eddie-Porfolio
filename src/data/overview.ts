// ─── Overview Data ───
// Mô tả: Dữ liệu hiển thị trong section Overview
// Gồm: thông tin giới thiệu + 4 số liệu business stats nổi bật

// ─── Heading & mô tả cho Overview section ───
export const overviewHeading = {
  // Overline label phía trên heading
  overline: "HEY, I'M EDDIE",
  // Heading chính
  title: "Creative Production Team Lead",
  // Mô tả ngắn
  description:
    "I lead a production team focused on building high-quality video content — from concept to final delivery — that drives results across paid and organic channels.",
};

// ─── 4 số liệu business nổi bật ───
// Mỗi stat sẽ có hiệu ứng count-up khi scroll tới
export const businessStats = [
  {
    number: "$6.2M",
    label: "Peak Revenue",
    countValue: 6.2,
    prefix: "$",
    suffix: "M",
  },
  {
    number: "-66%",
    label: "CPA Reduction",
    countValue: 66,
    prefix: "-",
    suffix: "%",
  },
  {
    number: "100%",
    label: "Video-Sourced Leads",
    countValue: 100,
    prefix: "",
    suffix: "%",
  },
  {
    number: "-90%",
    label: "Overhead / +10x Velocity",
    countValue: 90,
    prefix: "-",
    suffix: "%",
  },
];

// ─── Hero ───
// theme: "light" (nền sáng như mẫu Mindly/Turnover) hoặc "dark" (đồng bộ với phần còn lại của trang)
export const heroContent = {
  theme: "light" as "light" | "dark",
  badge: "Creative Video Strategist",
  titleLine1: "Capturing moments,",
  titleLine2: "telling stories",
  primaryCta: { label: "Let's work together", href: "#contact" },
  // Nút "Watch reel" mở video này trong popup — đổi sang file showreel thật khi có
  reel: { label: "Watch reel", src: "/videos/2.7M View.mp4" },
  // Thẻ nổi bên trái
  leftCard: { title: "From concept to final cut.", text: "Strategy · Production · Post" },
  // Thẻ nổi bên phải
  rightCard: {
    value: "$6.2M",
    text: "Peak revenue driven by video.",
    thumbs: ["/images/reels-thumbs/hook.jpg", "/images/reels-thumbs/kaizen.jpg", "/images/reels-thumbs/term.jpg"],
  },
  // Góc dưới bên phải
  footnote: ["Less noise.", "More results."],
  // Chữ chạy vòng tròn ở góc trên bên phải
  circleText: "VIDEO THAT DRIVES GROWTH • LESS NOISE • ",
};

// Số liệu góc dưới bên trái
export const heroStats = [
  { value: "-66%", label: "CPA reduction" },
  { value: "100%", label: "Video-sourced leads" },
  { value: "10x", label: "Production velocity" },
];

// ─── Vòng thẻ 3D quay quanh ảnh chân dung ───
// angle: góc quanh trục dọc (0 = chính diện, ±180 = phía sau).
// "label" = thẻ kính có icon + chữ; "video"/"image" = thẻ media.
export type OrbitItem =
  | { kind: "label"; angle: number; icon: "clapperboard" | "sparkles" | "pen"; title: string; text: string }
  | { kind: "video" | "image"; angle: number; src: string };

export const heroOrbit: OrbitItem[] = [
  { kind: "image", angle: -128, src: "/images/04-Services/motion-graphics.jpg" },
  { kind: "video", angle: -64, src: "/videos/socials/creative-2.mp4" },
  { kind: "label", angle: -34, icon: "clapperboard", title: "Video Editing", text: "Hook-first short-form." },
  { kind: "label", angle: 32, icon: "sparkles", title: "AI Flow", text: "10x faster production." },
  { kind: "video", angle: 62, src: "/videos/socials/creative-5.mp4" },
  { kind: "image", angle: 128, src: "/images/04-Services/video-strategy.jpg" },
];
