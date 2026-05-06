export interface VideoPostItem {
  id: string;
  title: string;
  brand: string;
  category: "Ads Performance" | "Social Content";
  thumbnail: string;
  previewVideo?: string; // Optional: for hover-to-play
  fullVideoUrl?: string; // For the actual video player
  role: string;
  year: string;
  duration: string;
  description?: string;
  stats: {
    views?: string;
    leads?: string;
    retention?: string;
    likes?: string;
    comments?: string;
    shares?: string;
    saves?: string;
  };
  tags: string[];
}

export const videoPortfolioHeading = {
  headline: "Crafting the Final Cut",
  description: "Từ những đoạn phim thô đến các chiến dịch triệu view. Đây là những video có Performance tốt nhất tôi từng thực hiện.",
};

// Dummy data for the video portfolio
export const videoPosts: VideoPostItem[] = [
  // ─── ADS PERFORMANCE ───
  {
    id: "ads-1",
    title: "Campaign Tài Chính 2024",
    brand: "ThinkSmart",
    category: "Ads Performance",
    thumbnail: "/images/02-CaseStudy/thinksmart/01-Hero/banner-01.webp",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    role: "Lead Editor & Colorist",
    year: "2024",
    duration: "0:30",
    description: "Chiến dịch quảng cáo hiệu suất cao tập trung vào chuyển đổi cho sản phẩm bảo hiểm tài chính.",
    stats: { views: "3.2M+", leads: "1.2K" },
    tags: ["Commercial", "High-Performance", "Financial"],
  },
  {
    id: "ads-2",
    title: "Product Launch — VinFast EV",
    brand: "VinFast",
    category: "Ads Performance",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    role: "Video Editor",
    year: "2023",
    duration: "1:45",
    description: "Video ra mắt dòng xe điện mới với phong cách cinematic và nhịp độ nhanh.",
    stats: { views: "2.8M+" },
    tags: ["Automotive", "TVC", "Launch"],
  },
  {
    id: "ads-3",
    title: "Seasonal Promo — Shopee",
    brand: "Shopee",
    category: "Ads Performance",
    thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    role: "Motion Designer",
    year: "2024",
    duration: "0:15",
    description: "Video ngắn tối ưu cho quảng cáo đa nền tảng, tăng tỷ lệ nhấp chuột lên 45%.",
    stats: { views: "5.1M+", leads: "3.5K" },
    tags: ["E-commerce", "Motion", "Promo"],
  },
  {
    id: "ads-4",
    title: "Insurance Benefits 101",
    brand: "Manulife",
    category: "Ads Performance",
    thumbnail: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    role: "Post-Production",
    year: "2023",
    duration: "1:00",
    description: "Giải thích quyền lợi bảo hiểm bằng đồ họa trực quan, tăng độ tin cậy cho khách hàng.",
    stats: { views: "1.5M+", leads: "800" },
    tags: ["Educational", "Ads", "Finance"],
  },
  {
    id: "ads-5",
    title: "Summer Collection",
    brand: "Uniqlo",
    category: "Ads Performance",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    role: "Colorist",
    year: "2024",
    duration: "0:45",
    description: "Phối màu rực rỡ cho bộ sưu tập hè, tập trung vào cảm xúc và trải nghiệm người dùng.",
    stats: { views: "4.2M+" },
    tags: ["Fashion", "Cinematic", "Ads"],
  },

  // ─── SOCIAL CONTENT ───
  {
    id: "soc-tiktok-trump",
    title: "Thế Giới Sẽ Ra Sao Nếu Trump Đắc Cử #thinksmartnews",
    brand: "Thinksmart News",
    category: "Social Content",
    thumbnail: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop", // Placeholder image
    fullVideoUrl: "/videos/2.7M View.mp4",
    role: "Lead Creator & Editor",
    year: "2024",
    duration: "0:54",
    description: "Nội dung viral phân tích kịch bản chính trị toàn cầu. Cực kỳ bùng nổ với 2.7 triệu lượt xem, thu hút hơn 57.000 lượt yêu thích và lượng chia sẻ khổng lồ.",
    stats: { 
      views: "2.7M", 
      retention: "25.4%",
      likes: "57K",
      comments: "1,019",
      shares: "814",
      saves: "3,149"
    },
    tags: ["TikTok", "Politics", "Viral"],
  },
  {
    id: "soc-tiktok-1",
    title: "Good Debt vs. Bad Debt — The Wealth Secret",
    brand: "ThinkSmart News",
    category: "Social Content",
    thumbnail: "https://images.unsplash.com/photo-1579621909532-3d57ad93297a?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.tiktok.com/@thinksmartnews/video/7300958195294489858",
    role: "Lead Creator & Editor",
    year: "2024",
    duration: "1:00",
    description: "Một nội dung viral phân tích sự khác biệt giữa nợ tốt và nợ xấu, sử dụng hình ảnh các tỷ phú hàng đầu để minh họa tư duy tài chính.",
    stats: { views: "1.2M+", retention: "92%" },
    tags: ["TikTok", "Finance", "Viral"],
  },
  {
    id: "soc-tiktok-2",
    title: "The Economic War — China vs. USA",
    brand: "ThinkSmart News",
    category: "Social Content",
    thumbnail: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.tiktok.com/@thinksmartnews/video/7356411909618388225",
    role: "Content Strategist & Editor",
    year: "2024",
    duration: "1:15",
    description: "Phân tích sắc bén về cuộc đối đầu kinh tế giữa hai siêu cường, đạt lượt tương tác cực cao nhờ cách kể chuyện hấp dẫn.",
    stats: { views: "883K+", retention: "89%" },
    tags: ["Politics", "Economy", "Viral"],
  },
  {
    id: "soc-1",
    title: "Year End Party Recap",
    brand: "Dream Talent",
    category: "Social Content",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    role: "Director & Editor",
    year: "2024",
    duration: "3:20",
    description: "Video recap sự kiện cuối năm đầy cảm xúc và nghệ thuật.",
    stats: { views: "500K+", retention: "85%" },
    tags: ["Event", "Cinematic", "Social"],
  },
  {
    id: "soc-2",
    title: "Social Series — Coffee House",
    brand: "The Coffee House",
    category: "Social Content",
    thumbnail: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    role: "Social Media Editor",
    year: "2024",
    duration: "0:45",
    description: "Chuỗi nội dung ngắn cho TikTok và Reels giúp tăng tương tác thương hiệu.",
    stats: { views: "890K+" },
    tags: ["F&B", "Short-form", "TikTok"],
  },
  {
    id: "soc-3",
    title: "Behind the Scenes — Studio",
    brand: "Personal",
    category: "Social Content",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    role: "Content Creator",
    year: "2024",
    duration: "1:30",
    description: "Khám phá quy trình làm việc phía sau những thước phim triệu view.",
    stats: { views: "120K+", retention: "70%" },
    tags: ["Vlog", "BTS", "Educational"],
  },
  {
    id: "soc-4",
    title: "Tips for Video Editing",
    brand: "Porto Academy",
    category: "Social Content",
    thumbnail: "https://images.unsplash.com/photo-1574717024453-354056fadadf?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    role: "Instructor",
    year: "2023",
    duration: "5:00",
    description: "Chia sẻ kỹ thuật dựng phim chuyên nghiệp cho cộng đồng sáng tạo.",
    stats: { views: "250K+" },
    tags: ["Tutorial", "Long-form", "Social"],
  },
  {
    id: "soc-5",
    title: "Travel Vlog — Iceland",
    brand: "Personal Project",
    category: "Social Content",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800&auto=format&fit=crop",
    fullVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    role: "Filmmaker",
    year: "2023",
    duration: "4:20",
    description: "Hành trình khám phá thiên nhiên hùng vĩ qua lăng kính cinematic.",
    stats: { views: "400K+", retention: "90%" },
    tags: ["Travel", "Cinematic", "Personal"],
  },
];
