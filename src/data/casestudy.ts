// ─── Case Study Data ───
// Description: Data for 2 main case studies
// Thinksmart Insurance (Marketing) & Dream Talent (Organic + Events)

// ─── Types ───

// Creative work items in gallery
export interface CreativeWorkItem {
  id: string;
  type: "video-thumbnail" | "ad-screenshot";
  thumbnail: string;
  videoUrl?: string;
  caption: string;
  platform?: string;
  metric?: string;
  tag?: string;
}

// Client testimonial
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

// Timeline milestone
export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  metric?: string;
  type: "start" | "milestone" | "peak";
}

export interface CaseStudySection {
  id: string;
  number: number;
  title: string;
  headline: string;        // EN only — Clash Display
  subtitle?: string;       // Sub text below headline
  body: string;
  image?: string;
  imageAlt?: string;
  visualType?: "context" | "context-profile" | "funnel" | "workflow" | "revenue" | "social" | "cpa-challenge";
  bullets?: string[];
  stats?: { label: string; value: string }[];
  closingLine?: string;
  // Illustration image displayed alongside the chart
  sectionImage?: string;
  sectionImageAlt?: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  tagline: string;
  role: string;
  duration: string;
  description: string;
  color: string;
  website?: string;
  cardImage?: string;
  heroImage?: string;
  highlights: { value: string; label: string; description?: string; image?: string }[];
  sections: CaseStudySection[];
  // Extended fields
  creativeWork?: CreativeWorkItem[];
  testimonial?: Testimonial;
  timeline?: TimelineMilestone[];
}

// ─── 01. Thinksmart Insurance (Focus: Marketing/Revenue) ───
const thinksmartSections: CaseStudySection[] = [
  {
    id: "thinksmart-context",
    number: 1,
    title: "Context & Challenge",
    headline: "The Starting Point\n& Challenge",
    subtitle: "Bối cảnh khi vào công ty",
    body: "ThinkSmart Insurance had strong sales, but marketing operated without a unified acquisition system. CPA had skyrocketed to $180–$200 while revenue stagnated at $1.8M–$2M. My mission was clear: drive acquisition costs down and push revenue up.",
    visualType: "context",
    stats: [
      { label: "CPA in 2022", value: "$180–$200" },
      { label: "Revenue in 2022", value: "$1.8M–$2M" },
      { label: "Mission", value: "CPA ↓ Revenue ↑" },
    ],
  },
  {
    id: "thinksmart-role",
    number: 2,
    title: "My Role & System",
    headline: "Building a\nPerformance System",
    subtitle: "Vị trí đảm nhiệm (Công việc)",
    body: "I restructured how video operated within the marketing ecosystem — transforming it from standalone content into a complete performance system. I assigned team roles, implemented A/B testing on video hooks, and managed ad optimization.",
    visualType: "workflow",
    bullets: [
      "Media Team Optimization — Assigned members by category and video type to maximize output.",
      "Hook Strategy — A/B tested first 3–5 seconds of every video against old content.",
      "Ad Optimization — Focused on high-intent customers and client testimonials.",
    ],
  },
  {
    id: "thinksmart-results",
    number: 3,
    title: "The Results",
    headline: "Driving Revenue\n& Growth",
    subtitle: "Từ vị trí đảm nhiệm giúp công ty tạo ra doanh thu",
    body: "What started as a single video editor role evolved into a performance system that drove 3x revenue growth while cutting acquisition costs by nearly half. The system continues to operate and deliver results.",
    visualType: "revenue",
    stats: [
      { label: "Revenue Growth", value: "+204%" },
      { label: "CPA Reduction", value: "-63%" },
      { label: "Organic Views", value: "6.1M+" },
    ],
    closingLine: "The system I built continues to operate and deliver results independently. That's the mark of a true system.",
  }
];

// ─── 02. Dream Talent (Focus: Organic Growth & Events) ───
const dreamTalentSections: CaseStudySection[] = [
  {
    id: "dt-organic",
    number: 1,
    title: "Organic Content",
    headline: "Building a\nCommunity",
    subtitle: "Phát triển nội dung Video",
    body: "Developed an organic video content strategy for Dream Talent focusing on storytelling and brand awareness. By building a community across social media platforms, we significantly grew followers and engagement.",
    stats: [
      { label: "Organic Views", value: "6M+" },
      { label: "Engagement Rate", value: "+340%" },
      { label: "Followers", value: "+50K" },
    ],
    closingLine: "Consistent storytelling turned casual viewers into a dedicated audience.",
  },
  {
    id: "ts-events-yep",
    number: 2,
    title: "Year End Party",
    headline: "Celebrating\nSuccess",
    subtitle: "Tổ chức sự kiện cuối năm",
    body: "Organized and captured the essence of the company's Year End Party, producing videos and photo collections that highlighted company culture, employee achievements, and a strong sense of community.",
    bullets: [
      "Event Planning — Co-organized the flow and theme of the event.",
      "Media Coverage — Directed the photo and video teams to capture key moments.",
      "Post-Production — Delivered highlight reels for internal use and social media.",
    ]
  },
  {
    id: "ts-events-teambuilding",
    number: 3,
    title: "Team Building",
    headline: "Strengthening\nBonds",
    subtitle: "Gắn kết đội ngũ",
    body: "Documented annual team building events. The goal was to create energetic and engaging media that reflects the dynamic environment and teamwork.",
    bullets: [
      "Action Photography — High-energy shots of team activities.",
      "Highlight Videos — Short-form recap videos to boost morale.",
    ]
  }
];

// ─── Case Studies Array ───
export const caseStudies: CaseStudy[] = [
  {
    id: "thinksmart",
    company: "Thinksmart Insurance",
    tagline: "Scaling paid funnels for insurance leads",
    role: "Video Strategist & Performance Creative",
    duration: "2023 — Present",
    description: "Built the entire video ads funnel from A-Z. From concept, scripting, and production to optimization — significantly reducing CPA and boosting conversion rates.",
    color: "#FF4000",
    website: "https://thinksmartinsurance.com/en/home",
    cardImage: "/images/casestudy/thinksmart/card-cover.png",
    heroImage: "/images/casestudy/thinksmart/HeroCaseStudy.png",
    highlights: [
      { value: "$6,000,000", label: "Total Revenue", description: "3 years of strategic growth — from $2M to $6M through video-driven acquisition.", image: "/images/casestudy/thinksmart/revenue-hero.png" },
      { value: "-44%", label: "CPA Reduction", description: "More sales at lower cost. Optimized creative testing cut acquisition cost nearly in half." },
      { value: "120+", label: "Videos Tested", description: "Hundreds of creatives tested, iterated, and optimized across paid and organic channels." },
    ],
    sections: thinksmartSections,
    timeline: [
      { date: "2022", title: "Video Editor", description: "Joined as a video editor — began building the first creative system", type: "start" },
      { date: "2023", title: "Media Team Lead", description: "Promoted to Media Team Lead — overseeing Design, UI/UX, and Editing.", type: "milestone" },
      { date: "2024", title: "Peak Performance & Events", description: "Highest performance year (CPA dropped to $67, Revenue $6.09M) and successfully managed massive internal events.", metric: "$6.09M", type: "peak" },
    ],
    creativeWork: []
  },
  {
    id: "dreamtalent",
    company: "Dream Talent",
    tagline: "Organic growth and internal culture",
    role: "Creative Director & Event Organizer",
    duration: "2022 — 2023",
    description: "Developed an organic video content strategy for Dream Talent focusing on storytelling, while also organizing and producing media for internal company events.",
    color: "#e8512d",
    website: "https://dreamtalent.com.vn/",
    highlights: [
      { value: "6M+", label: "Organic Views", description: "Massive reach across TikTok and Instagram Reels." },
      { value: "+340%", label: "Engagement", description: "High retention and interaction rates." },
      { value: "50K+", label: "Followers", description: "Grew the community from scratch." },
    ],
    sections: dreamTalentSections,
    creativeWork: [
      // Placeholders for Event videos/images so recruiters can click them.
      {
        id: "yep-video-1",
        type: "video-thumbnail",
        thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
        caption: "Year End Party Highlight Reel",
        platform: "Internal",
        tag: "Event",
      },
      {
        id: "tb-video-1",
        type: "video-thumbnail",
        thumbnail: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop",
        caption: "Annual Team Building Recap",
        platform: "Internal",
        tag: "Event",
      }
    ]
  }
];

// ─── Section heading ───
export const caseStudyHeading = {
  overline: "CASE STUDIES",
  title: "Proven Results",
  description: "Explore how I drive real business impact and build strong company culture through creative video strategy.",
};
