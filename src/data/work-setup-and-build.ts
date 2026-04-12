// ─── Work: Setup and Build ───
// Data cho trang /work/setup-and-build

export const setupAndBuildMeta = {
  overline: "Studio & Operations",
  title: "Setup and Build",
  description:
    "From a raw house to a fully operational production system — handling the complete studio setup, equipment scaling, and workflow optimization from day one.",
};

export interface SetupHighlight {
  label: string;
  value: string;
  description: string;
}

export const setupHighlights: SetupHighlight[] = [
  {
    label: "Studio Space",
    value: "Full Build",
    description:
      "Converted raw space into a professional production studio with acoustic treatment, lighting rigs, and equipment mounting.",
  },
  {
    label: "Equipment Scaled",
    value: "12+ Pieces",
    description:
      "Camera systems, audio gear, lighting, editing workstations — sourced, configured, and integrated end-to-end.",
  },
  {
    label: "Workflow Optimized",
    value: "3× Faster",
    description:
      "Standardized production pipelines reduced turnaround time by 3× compared to ad-hoc processes.",
  },
];

export interface SetupStoryMoment {
  number: string;
  title: string;
  description: string;
  images: string[];
}

export const setupStory: SetupStoryMoment[] = [
  {
    number: "01",
    title: "The Raw Canvas",
    description: "Evaluating the bare room dynamics—acoustics, light leaks, and power capacity—to architect the perfect production blueprint.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop", // Empty office/studio
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop", // Raw architectural space
    ]
  },
  {
    number: "02",
    title: "Acoustics & Foundation",
    description: "Executing the physical build. Installing high-density acoustic panels, heavy-duty rigging mounts, and cyclorama backdrops.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop", // Construction/Soundproofing vibe
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop", // Technical setup
      "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1200&auto=format&fit=crop", // Cable/Electrical work
    ]
  },
  {
    number: "03",
    title: "Gear Integration",
    description: "Deploying the technological core: multi-cam systems, dynamic RGB tube lighting, boom mics, and high-performance editing workstations.",
    images: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop", // Camera gear setup
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop", // Photo studio gear
      "https://images.unsplash.com/photo-1524143902484-fe872120e7df?q=80&w=1200&auto=format&fit=crop", // Lighting rigs
    ]
  },
  {
    number: "04",
    title: "Fully Operational",
    description: "The finalized broadcast-ready studio environment. Ready for uncompromised live-streaming and high-tier commercial photo/video shoots.",
    images: [
      "https://images.unsplash.com/photo-1598550476439-6847785fce6c?q=80&w=1200&auto=format&fit=crop", // Final glowing studio set
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1200&auto=format&fit=crop", // Professional studio environment
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop", // Podcast/Livestream setup active
    ]
  }
];
