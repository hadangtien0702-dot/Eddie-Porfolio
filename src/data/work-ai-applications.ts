// ─── Work: A.I Applications ───
// Data cho trang /work/ai-applications

export const aiApplicationsMeta = {
  overline: "Innovation",
  title: "A.I Applications",
  description:
    "Applying generative AI models to scale production — from AI-generated UGC and avatar videos to automated multilingual voiceover pipelines.",
};

export interface AITool {
  name: string;
  role: string;
  description: string;
  tags: string[];
  icon: string;
}

export const aiTools: AITool[] = [
  {
    name: "UGC A.I",
    role: "AI-Generated User Content",
    description:
      "Leveraged AI UGC platforms to produce authentic-looking user-generated content at scale — reducing actor costs and increasing output volume.",
    tags: ["UGC", "Automation", "Content Scale"],
    icon: "🎬",
  },
  {
    name: "HeyGen",
    role: "AI Avatar & Dubbing",
    description:
      "Used HeyGen to create multilingual AI avatar videos and auto-dub existing content for Vietnamese and English audiences simultaneously.",
    tags: ["Avatar", "Dubbing", "Multilingual"],
    icon: "🤖",
  },
  {
    name: "ElevenLabs",
    role: "AI Voice Synthesis",
    description:
      "Applied ElevenLabs voice cloning to generate consistent, natural-sounding voiceovers for ads, product demos, and social content.",
    tags: ["Voice AI", "Text-to-Speech", "Voiceover"],
    icon: "🎙️",
  },
];

export interface AIStat {
  value: string;
  label: string;
}

export const aiStats: AIStat[] = [
  { value: "3×", label: "Content Output" },
  { value: "60%", label: "Cost Reduction" },
  { value: "5 Languages", label: "Markets Reached" },
];
