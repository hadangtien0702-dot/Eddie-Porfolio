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

// ─── Hero (Pinterest style) ───
// Nội dung chữ của hero
export const heroContent = {
  overline: "Hey, I'm Eddie — Creative Video Strategist",
  titleLine1: "Capturing moments,",
  titleLine2: "telling stories.",
  primaryCta: { label: "View my work", href: "#work" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
};

// Số liệu nhỏ hiển thị dưới CTA trong hero
export const heroStats = [
  { value: "$6.2M", label: "Peak revenue" },
  { value: "-66%", label: "CPA reduction" },
  { value: "100%", label: "Video-sourced leads" },
];

// ─── Ô trong lưới masonry của hero ───
// ratio = tỉ lệ khung (width / height). type "video" sẽ tự phát (muted, loop).
// Mỗi mảng con là 1 cột; cột 3 ẩn trên mobile, cột 4 chỉ hiện từ màn hình xl.
export type HeroTile = {
  type: "image" | "video";
  src: string;
  ratio: string;
  tag: string;
};

export const heroColumns: HeroTile[][] = [
  [
    { type: "video", src: "/videos/socials/creative-2.mp4", ratio: "9 / 16", tag: "Short-form" },
    { type: "image", src: "/images/casestudy/thinksmart/social-post/sp-1020-ph-ka-tam-ve-giup-ban-nghi-huu.webp", ratio: "1 / 1", tag: "Social Ads" },
    { type: "image", src: "/images/04-Services/video-strategy.jpg", ratio: "1 / 1", tag: "Production" },
    { type: "image", src: "/images/reels-thumbs/ebtp.jpg", ratio: "9 / 16", tag: "Reels" },
    { type: "image", src: "/images/02-CaseStudy/thinksmart/01-Hero/team.webp", ratio: "3 / 2", tag: "Event" },
  ],
  [
    { type: "image", src: "/images/casestudy/thinksmart/social-post/sp-0824-ph-ka-nguoi-dau-tu.webp", ratio: "1 / 1", tag: "Key Visual" },
    { type: "video", src: "/videos/socials/creative-5.mp4", ratio: "9 / 16", tag: "Short-form" },
    { type: "image", src: "/images/02-CaseStudy/dreamtalent/teambuilding/DRT-FLYCAM-27.webp", ratio: "16 / 9", tag: "Flycam" },
    { type: "image", src: "/images/casestudy/thinksmart/social-post/sp-post-cancer.webp", ratio: "1 / 1", tag: "Social Post" },
    { type: "image", src: "/images/casestudy/thinksmart/social-post/sp-poster-trip-5-star.webp", ratio: "9 / 16", tag: "Poster" },
  ],
  [
    { type: "image", src: "/images/reels-thumbs/hook.jpg", ratio: "9 / 16", tag: "Reels" },
    { type: "image", src: "/images/04-Services/motion-graphics.jpg", ratio: "1 / 1", tag: "Motion" },
    { type: "image", src: "/images/casestudy/thinksmart/social-post/sp-1024-ph-ka-phao-cuu-sinh.webp", ratio: "1 / 1", tag: "Social Ads" },
    { type: "video", src: "/videos/socials/creative-6.mp4", ratio: "9 / 16", tag: "Short-form" },
    { type: "image", src: "/images/02-CaseStudy/dreamtalent/sportsday/sports-2.jpg", ratio: "3 / 2", tag: "Event" },
  ],
  [
    { type: "image", src: "/images/04-Services/performance-ads.jpg", ratio: "1 / 1", tag: "Performance" },
    { type: "image", src: "/images/reels-thumbs/kaizen.jpg", ratio: "9 / 16", tag: "Reels" },
    { type: "image", src: "/images/casestudy/thinksmart/social-post/sp-0624-ph-ka--tang-cha-3.webp", ratio: "1 / 1", tag: "Campaign" },
    { type: "image", src: "/images/casestudy/thinksmart/social-post/sp-0424-ph-ka-tai-chinh-vung-vang.webp", ratio: "1 / 1", tag: "Key Visual" },
    { type: "image", src: "/images/casestudy/thinksmart/social-post/sp-0324-i-ja-ka-voi-7-day.webp", ratio: "1 / 1", tag: "Social Ads" },
  ],
];
