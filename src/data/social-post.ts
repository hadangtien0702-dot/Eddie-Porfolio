// ─── Social Post Subpage Data ───
// Mục đích: Cung cấp dữ liệu cho trang con Portfolio Social Post (Masonry Grid)
// Bao gồm: Ảnh tĩnh (Static), Carousel, và Video ngắn (Reels/Shorts).

export type PostType = "single" | "carousel" | "grid9" | "video";

export interface SocialPostItem {
  id: string;
  type: PostType;
  title: string;
  description: string;
  brand: string;
  // Số view hoặc kết quả nổi bật
  highlightMetric?: string;
  // Content size span for legacy or grid logic
  span?: 1 | 2;
  // Thumbnail for single/video posts
  thumbnail: string;
  // Array of images for carousel/grid9
  images?: string[];
  // Video URL
  videoUrl?: string;

  // ─── UI Fields cho Social Card ───
  author: string;
  avatar: string;
  date: string;
  likes: string;
  comments: string;
  shares: string;

  // ─── Infinite Canvas Coordinates ───
  // x, y từ tâm màn hình (0,0)
  x: number;
  y: number;
  // Rotation nhẹ để tạo cảm giác lộn xộn ngẫu nhiên tự nhiên
  rotation: number;
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

// ─── Dummy Avatar ───
const EDDIE_AVATAR = "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=200&auto=format&fit=crop";

export const socialPosts: SocialPostItem[] = [
  // ── Cluster 1: Center-ish (ThinkSmart) ──
  {
    id: "sp-video-1",
    type: "video",
    title: "Insurance Mythbuster Reel",
    description: "Giải ngố các định kiến về bảo hiểm nhân thọ, thu hút tệp Gen Z mới đi làm. Video viral mạnh mẽ trên nền tảng short video.",
    brand: "ThinkSmart Insurance",
    highlightMetric: "🔥 1.2M Views",
    span: 2,
    thumbnail: "https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=800&auto=format&fit=crop",
    author: "Eddie Nguyen",
    avatar: EDDIE_AVATAR,
    date: "14 hours ago",
    likes: "45.2K",
    comments: "1,200",
    shares: "8.4K",
    x: -300,
    y: -100,
    rotation: -3,
  },
  {
    id: "sp-carousel-1",
    type: "carousel",
    title: "5 Lỗi Sai Khi Mua Bảo Hiểm",
    description: "Educational carousel giúp tăng 30% tỷ lệ lưu (Saves) và chia sẻ. Focus vào UI/UX cho IG.",
    brand: "ThinkSmart Insurance",
    span: 1,
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245396047-536af7c64e52?q=80&w=800&auto=format&fit=crop",
    ],
    author: "Eddie Nguyen",
    avatar: EDDIE_AVATAR,
    date: "2 days ago",
    likes: "12.8K",
    comments: "542",
    shares: "3.1K",
    x: 250,
    y: 150,
    rotation: 2,
  },

  // ── Cluster 2: Top Right (Dream Talent) ──
  {
    id: "sp-grid-1",
    type: "grid9",
    title: "Dream Talent Year End Party",
    description: "Coverage toàn bộ sự kiện YEP của công ty với layout 9 ảnh Instagram thần thánh.",
    brand: "Dream Talent",
    span: 2,
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502635617214-171b5c827259?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504933350103-e840ede978d4?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
    ],
    author: "Eddie Nguyen",
    avatar: EDDIE_AVATAR,
    date: "1 week ago",
    likes: "8.9K",
    comments: "300",
    shares: "1.2K",
    x: 800,
    y: -300,
    rotation: 5,
  },
  {
    id: "sp-static-1",
    type: "single",
    title: "Hiring Campaign Banner",
    description: "Bộ thiết kế tuyển dụng đồng bộ trên LinkedIn & Facebook. Visual hướng tới sự chuyên nghiệp.",
    brand: "Dream Talent",
    span: 1,
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
    author: "Eddie Nguyen",
    avatar: EDDIE_AVATAR,
    date: "Oct 12, 2025",
    likes: "2,450",
    comments: "142",
    shares: "89",
    x: 700,
    y: 350,
    rotation: -4,
  },

  // ── Cluster 3: Bottom Left (Personal / Hooks) ──
  {
    id: "sp-video-2",
    type: "video",
    title: "Behind the Scenes Pitch",
    description: "Video vlog hậu trường xây dựng kênh, tạo trust cực mạnh. Hook giữ chân 90% viewers.",
    brand: "Personal Branding",
    highlightMetric: "🚀 500K Views",
    span: 2,
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    author: "Eddie Nguyen",
    avatar: EDDIE_AVATAR,
    date: "Sep 20, 2025",
    likes: "34.1K",
    comments: "800",
    shares: "5.5K",
    x: -850,
    y: 400,
    rotation: 4,
  },
  {
    id: "sp-carousel-2",
    type: "carousel",
    title: "Lộ Trình Thăng Tiến",
    description: "Swipe graphic thu hút ứng viên senior trên LinkedIn. Rất chi tiết và trực quan.",
    brand: "Dream Talent",
    span: 1,
    thumbnail: "https://images.unsplash.com/photo-1542744173-86d4e16c3396?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542744173-86d4e16c3396?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245396047-536af7c64e52?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    ],
    author: "Eddie Nguyen",
    avatar: EDDIE_AVATAR,
    date: "Aug 15, 2025",
    likes: "5,120",
    comments: "210",
    shares: "320",
    x: -800,
    y: -400,
    rotation: -2,
  },

  // ── Cluster 4: Far Right & Bottom Right ──
  {
    id: "sp-static-2",
    type: "single",
    title: "Q4 Promo Ad Set",
    description: "Thiết kế tĩnh A/B testing giúp giảm 25% CPA. Chạy ads chuyển đổi mạnh mẽ trên FB.",
    brand: "ThinkSmart Insurance",
    span: 1,
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop",
    author: "Eddie Nguyen",
    avatar: EDDIE_AVATAR,
    date: "Jul 05, 2025",
    likes: "1,800",
    comments: "50",
    shares: "22",
    x: 1300,
    y: 100,
    rotation: -6,
  },
  {
    id: "sp-video-4",
    type: "video",
    title: "Viral Hook Template",
    description: "Series video khai thác các hook mạnh, giữ chân 3s đầu đạt 85%.",
    brand: "Client X",
    highlightMetric: "🔥 2.1M Views",
    span: 2,
    thumbnail: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=800&auto=format&fit=crop",
    author: "Eddie Nguyen",
    avatar: EDDIE_AVATAR,
    date: "Jun 10, 2025",
    likes: "89.4K",
    comments: "2,050",
    shares: "15K",
    x: 400,
    y: 600,
    rotation: 3,
  },
  
  // ── Cluster 5: Extra items to fill the canvas ──
  {
    id: "sp-grid-2",
    type: "grid9",
    title: "Company Retreat 2024",
    description: "Kỷ niệm đi chơi xa cùng team, ảnh đẹp chuẩn editorial.",
    brand: "Life @ Work",
    span: 2,
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=400&auto=format&fit=crop",
    ],
    author: "Eddie Nguyen",
    avatar: EDDIE_AVATAR,
    date: "Jan 12, 2025",
    likes: "6.2K",
    comments: "155",
    shares: "410",
    x: -1400,
    y: -100,
    rotation: -5,
  },
  {
    id: "sp-video-3",
    type: "video",
    title: "Dream Talent Intro",
    description: "Video ngắn giới thiệu văn hóa công ty cho trang tuyển dụng. Năng động và trẻ trung.",
    brand: "Dream Talent",
    span: 1,
    thumbnail: "/images/social-post/company-intro.png",
    author: "Eddie Nguyen",
    avatar: EDDIE_AVATAR,
    date: "Mar 05, 2025",
    likes: "12.4K",
    comments: "300",
    shares: "1.1K",
    x: 1200,
    y: -500,
    rotation: 4,
  },
];
