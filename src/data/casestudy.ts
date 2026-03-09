// ─── Case Study Data ───
// Description: Data for 2 main case studies
// Thinksmart Insurance + Dream Talent
// Each case has detailed storytelling sections

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
  highlights: { value: string; label: string; description?: string; image?: string }[];
  sections: CaseStudySection[];
  // Extended fields
  creativeWork?: CreativeWorkItem[];
  testimonial?: Testimonial;
  timeline?: TimelineMilestone[];
}

// ─── Thinksmart Insurance — Sections ───
const thinksmartSections: CaseStudySection[] = [
  {
    id: "thinksmart-context",
    number: 1,
    title: "Context",
    headline: "2022 — Marketing\nRestructure begins",
    subtitle: "The starting point before I joined",
    body: "ThinkSmart Insurance had strong sales capacity, but marketing lacked a unified acquisition system. Video was used as content — not as a structured revenue driver.",
    visualType: "context-profile",
  },
  {
    id: "thinksmart-challenge",
    number: 2,
    title: "The Challenge",
    headline: "The one mission\nwhen I joined",
    subtitle: "2022 — The situation before I started",
    body: "CPA had skyrocketed to $180–$200 while revenue stagnated at $1.8M–$2M. My mission was clear: drive acquisition costs down as low as possible and push revenue as high as it could go.",
    stats: [
      { label: "CPA in 2022", value: "$180–$200" },
      { label: "Revenue in 2022", value: "$1.8M–$2M" },
      { label: "Mission", value: "CPA ↓ Revenue ↑" },
    ],
    bullets: [
      "Initial CPA of $180–$200 — far too high for the industry, needed drastic reduction.",
      "Video ads were not optimized for conversion — just generic content.",
      "No creative testing system — each video was run once and discarded, with no data to iterate on.",
      "Media and Ads teams lacked coordination — creative direction was disconnected from performance data.",
    ],
  },
  {
    id: "thinksmart-system",
    number: 3,
    title: "The System I Built",
    headline: "From content\nto performance system",
    subtitle: "The 4-pillar system I built",
    body: "I began restructuring how video operated within the marketing ecosystem — transforming it from a standalone product into a complete performance system.",
    visualType: "workflow",
    bullets: [
      "Media Team Optimization — Assigned team members by category and video type to maximize production time and minimize unnecessary feedback loops.",
      "First 3–5s Hook Strategy — Continuously changed and A/B tested opening hooks for each video. Compared old company videos with new ones to prove effectiveness.",
      "Continuous Ad Optimization — Made strong impressions on high-intent customers · Avoided Policy violations to keep campaigns alive · Proactively proposed client testimonial shoots — the strongest asset for insurance · Built sub-channels to boost brand awareness.",
      "Branding Channels — Beyond paid ads, built supplementary channels to help customers recognize the brand better, creating a multi-channel content ecosystem.",
    ],
  },
  {
    id: "thinksmart-scaling",
    number: 4,
    title: "Scaling & Brand Presence",
    headline: "Expanding into\norganic channels",
    subtitle: "Beyond paid acquisition",
    body: "Beyond paid acquisition, I expanded the video ecosystem into organic channels. Without paid social amplification:",
    visualType: "social",
    stats: [
      { label: "TikTok Views", value: "3.8M+" },
      { label: "YouTube Views", value: "2.3M+" },
    ],
  },
];

// ─── Case Studies Array ───
export const caseStudies: CaseStudy[] = [
  {
    id: "thinksmart",
    company: "Thinksmart Insurance",
    tagline: "Scaling paid funnels for insurance leads",
    role: "Video Strategist & Performance Creative",
    duration: "2023 — Present",
    description:
      "Built the entire video ads funnel from A-Z for Thinksmart Insurance. From concept, scripting, and production to optimization — significantly reducing CPA and boosting conversion rates.",
    color: "#FF4000",
    website: "https://thinksmartinsurance.com/en/home",
    cardImage: "/images/casestudy/thinksmart/card-cover.png",
    highlights: [
      { value: "$6,000,000", label: "Total Revenue", description: "3 years of strategic growth — from $2M to $6M through video-driven acquisition.", image: "/images/casestudy/thinksmart/revenue-hero.png" },
      { value: "-44%", label: "CPA Reduction", description: "More sales at lower cost. Optimized creative testing cut acquisition cost nearly in half." },
      { value: "120+", label: "Videos Tested", description: "Hundreds of creatives tested, iterated, and optimized across paid and organic channels." },
    ],
    sections: thinksmartSections,

    // ─── Journey Timeline ───
    timeline: [
      { date: "2022", title: "Video Editor", description: "Joined ThinkSmart as a video editor — began building the first creative system", type: "start" },
      { date: "2023", title: "Media Team Lead", description: "Promoted to Media Team Lead — overseeing Design, UI/UX, and Editing. Systematized production workflows", type: "milestone" },
      { date: "2024", title: "Peak Performance", description: "Highest performance year — CPA dropped to $67, Revenue reached $6.09M. Organic channels hit 6.1M views", metric: "$6.09M", type: "peak" },
      { date: "2025", title: "Production Team Lead", description: "Built a video & livestream production studio — upgraded equipment and professional production workflows", type: "milestone" },
    ],

    // ─── Client Testimonial ───
    testimonial: {
      quote: "Eddie transformed how we think about video. It went from a cost center to our primary revenue driver. The system he built continues to deliver results independently.",
      author: "Marketing Director",
      role: "Marketing Director",
      company: "Thinksmart Insurance",
    },

    // ─── Creative work — thumbnails to be added later ───
    creativeWork: [],
  },
];

// ─── Section heading ───
export const caseStudyHeading = {
  overline: "CASE STUDY",
  title: "Proven Results",
  description: "Explore how I drive real business impact through creative video strategy.",
};
