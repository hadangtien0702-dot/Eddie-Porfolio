// ─── Overview Data ───
// Mô tả: Dữ liệu hiển thị trong section Overview
// Gồm: thông tin giới thiệu + 4 số liệu business stats nổi bật

// ─── Heading & mô tả cho Overview section ───
export const overviewHeading = {
  // Overline label phía trên heading
  overline: "ABOUT ME",
  // Heading chính
  title: "Creative Video Strategist",
  // Mô tả ngắn
  description:
    "I craft high-converting video content that drives revenue. From concept to execution, I blend creativity with data-driven strategy to build paid funnels and organic growth engines that deliver real results.",
};

// ─── 4 số liệu business nổi bật ───
// Mỗi stat sẽ có hiệu ứng count-up khi scroll tới
export const businessStats = [
  {
    number: "$6M+",
    label: "Revenue Peak",
    // Giá trị số để count-up animation
    countValue: 6,
    prefix: "$",
    suffix: "M+",
  },
  {
    number: "$67",
    label: "CPA (from $120)",
    countValue: 67,
    prefix: "$",
    suffix: "",
  },
  {
    number: "100%",
    label: "Paid Funnel by Video",
    countValue: 100,
    prefix: "",
    suffix: "%",
  },
  {
    number: "6M+",
    label: "Organic Views",
    countValue: 6,
    prefix: "",
    suffix: "M+",
  },
];
