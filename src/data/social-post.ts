// ─── Social Post Subpage Data ───
// Mục đích: Cung cấp dữ liệu cho trang con Portfolio Social Post (Masonry Grid)
// Bao gồm: Ảnh tĩnh (Static), Carousel, và Video ngắn (Reels/Shorts).

export type PostType = "static" | "carousel" | "video";

export interface SocialPostItem {
  id: string;
  type: PostType;
  title: string;
  description: string;
  brand: string;
  // Số view hoặc kết quả nổi bật để hiển thị badge "Triệu view"
  highlightMetric?: string;
  // Mức độ ưu tiên để hiển thị lớn hơn trong lưới (1 = bình thường, 2 = lớn/rộng)
  span?: 1 | 2;
  // Đường dẫn thumbnail
  // ── Kích thước khuyến nghị ──
  //   span: 2 (ô rộng) → 1800 x 1200px (tỷ lệ 3:2)
  //   span: 1 (ô chuẩn) → 900 x 800px  (tỷ lệ ~1:1)
  thumbnail: string;
  // Đường dẫn video (nếu type = video)
  videoUrl?: string;
}

export const socialPostHeading = {
  overline: "PORTFOLIO",
  headline: "Not just posts. We build content systems that scale.",
  description: "Từ hình ảnh tĩnh, carousel đến short video — Mọi thiết kế đều được tính toán để tối ưu thuật toán, giữ chân người xem và chuyển đổi thành doanh số.",
  stats: [
    { label: "Total Organic Views", value: "15M+" },
    { label: "Assets Delivered", value: "500+" },
    { label: "Average CTR Increase", value: "45%" }
  ]
};

// ─────────────────────────────────────────────────────────
// Bảng Quy Chuẩn Kích Thước Ảnh (để chuẩn bị ảnh thật):
// ─────────────────────────────────────────────────────────
// | Vị trí            | span | Kích thước Retina  | Tỷ lệ |
// |--------------------|------|--------------------|--------|
// | Card lớn (wide)    |  2   | 1800 × 1200 px     | 3:2    |
// | Card tiêu chuẩn    |  1   | 900 × 800 px        | ~1:1   |
// ─────────────────────────────────────────────────────────

export const socialPosts: SocialPostItem[] = [
  {
    id: "sp-video-1",
    type: "video",
    title: "Insurance Mythbuster Reel",
    description: "Giải ngố các định kiến về bảo hiểm nhân thọ, thu hút tệp Gen Z mới đi làm.",
    brand: "ThinkSmart Insurance",
    highlightMetric: "🔥 1.2M Views",
    span: 2,
    thumbnail: "/images/social-post/insurance-reel.png",
  },
  {
    id: "sp-static-1",
    type: "static",
    title: "Hiring Campaign Banner",
    description: "Bộ thiết kế tuyển dụng đồng bộ trên LinkedIn & Facebook.",
    brand: "Dream Talent",
    span: 1,
    thumbnail: "/images/social-post/hiring-banner.png"
  },
  {
    id: "sp-carousel-1",
    type: "carousel",
    title: "5 Lỗi Sai Khi Mua Bảo Hiểm",
    description: "Educational carousel giúp tăng 30% tỷ lệ lưu (Saves) và chia sẻ.",
    brand: "ThinkSmart Insurance",
    span: 1,
    thumbnail: "/images/social-post/insurance-carousel.png"
  },
  {
    id: "sp-video-2",
    type: "video",
    title: "Behind the Scenes Pitch",
    description: "Video dạng vlog hậu trường xây dựng kênh, tạo trust cực mạnh.",
    brand: "Personal Branding",
    highlightMetric: "🚀 500K Views",
    span: 2,
    thumbnail: "/images/social-post/bts-vlog.png",
  },
  {
    id: "sp-static-2",
    type: "static",
    title: "Q4 Promo Ad Set",
    description: "Thiết kế tĩnh A/B testing giúp giảm 25% CPA.",
    brand: "ThinkSmart Insurance",
    span: 1,
    thumbnail: "/images/social-post/promo-ad-set.png"
  },
  {
    id: "sp-video-3",
    type: "video",
    title: "Dream Talent Intro",
    description: "Video ngắn giới thiệu văn hóa công ty cho trang tuyển dụng.",
    brand: "Dream Talent",
    span: 1,
    thumbnail: "/images/social-post/company-intro.png",
  },
  {
    id: "sp-carousel-2",
    type: "carousel",
    title: "Lộ Trình Thăng Tiến",
    description: "Swipe graphic thu hút ứng viên senior trên LinkedIn.",
    brand: "Dream Talent",
    span: 1,
    thumbnail: "/images/social-post/career-carousel.png"
  },
  {
    id: "sp-video-4",
    type: "video",
    title: "Viral Hook Template",
    description: "Series video khai thác các hook mạnh, giữ chân 3s đầu đạt 85%.",
    brand: "Client X",
    highlightMetric: "🔥 2.1M Views",
    span: 2,
    thumbnail: "/images/social-post/viral-hook.png",
  }
];
