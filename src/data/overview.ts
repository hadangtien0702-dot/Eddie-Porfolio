// ─── Overview Data ───
// Mô tả: Dữ liệu hiển thị trong section Overview
// Gồm: thông tin giới thiệu + 4 số liệu business stats nổi bật

// ─── Heading & mô tả cho Overview section ───
export const overviewHeading = {
  // Overline label phía trên heading
  overline: "HEY, I'M EDDIE",
  // Heading chính
  title: "Creative Video Strategist",
  // Mô tả ngắn
  description:
    "I build video systems that turn creative ideas into measurable growth. From strategy and production to testing and optimization, I focus on content that performs across paid and organic channels.",
};

// ─── 4 số liệu business nổi bật ───
// Mỗi stat sẽ có hiệu ứng count-up khi scroll tới
export const businessStats = [
  {
    number: "$6M+",
    label: "Annual Revenue Peak",
    countValue: 6,
    prefix: "$",
    suffix: "M+",
  },
  {
    number: "100%",
    label: "Leads Sourced by Video",
    countValue: 100,
    prefix: "",
    suffix: "%",
  },
  {
    number: "500+",
    label: "High-Performance Ads",
    countValue: 500,
    prefix: "",
    suffix: "+",
  },
  {
    number: "12M+",
    label: "Organic Video Reach",
    countValue: 12,
    prefix: "",
    suffix: "M+",
  },
];
