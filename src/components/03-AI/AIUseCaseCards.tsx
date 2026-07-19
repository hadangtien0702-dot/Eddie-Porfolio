import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Sparkles, 
  Activity, 
  Terminal, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  Layers,
  Layout,
  Palette,
  ChevronRight,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';

const useCases = [
  {
    id: "visual",
    title: "AI VISUAL ARCHITECT",
    icon: <ImageIcon className="w-5 h-5" />,
    tag: "Neural Rendering",
    modes: {
      tools: {
        title: "DÀN VŨ KHÍ HẠNG NẶNG",
        description: "Đây là những trợ thủ đắc lực mình hay dùng để biến mọi ý tưởng từ 'mơ hồ' thành hình ảnh thực tế.",
        details: ["Flux.1: Để lấy chi tiết vật liệu siêu thực.", "Midjourney v6: Để thổi hồn nghệ thuật và ánh sáng vào bức ảnh.", "DALL-E 3: Để xử lý các chi tiết chữ và bố cục chuẩn xác."]
      },
      scripts: {
        title: "SCRIPTS TO PROMPT",
        description: "Thay vì nói suông, mình 'thủ thỉ' với AI bằng những câu lệnh kỹ thuật chuyên sâu để nó hiểu đúng từng milimet ý đồ của mình.",
        details: ["Thiết lập Subject và Environment chi tiết.", "Giả lập thông số ống kính và ánh sáng vật lý.", "Tối ưu hóa các tham số Model (--v 6, --stylize)."]
      },
      layout: {
        title: "DỰNG KHUNG Ý TƯỞNG",
        description: "Mọi thứ đẹp đều cần một cái khung vững chắc. Mình sắp xếp lại bố cục sao cho thật thuận mắt và dẫn dắt người xem.",
        details: ["Áp dụng hệ thống lưới để mọi thứ thật cân đối.", "Xác định điểm vàng để người xem nhìn vào là ấn tượng ngay.", "Tối ưu hóa không gian để bức ảnh có nhịp điệu hơn."]
      },
      design: {
        title: "HOÀN THIỆN CUỐI CÙNG",
        description: "Đây là lúc mình 'phù phép' để mọi chi tiết trở nên sắc sảo và lung linh nhất, sẵn sàng để lên sóng.",
        details: ["Nâng cấp độ phân giải cực nét mà không mất chi tiết.", "Làm mịn da, sáng vật liệu và cân chỉnh màu sắc.", "Đảm bảo hình ảnh đạt tiêu chuẩn cao nhất cho quảng cáo."]
      }
    },
    impact: "95% Faster Approval",
    tools: ["Flux.1", "Midjourney", "Grok Image", "Seedream", "DALL-E 3", "Gemini"],
    logos: ["flux.svg", "midjourney.svg", "grok.svg", "bytedanceseedream.svg", "chatgpt.svg", "gemini.svg"],
    playground: {
      scripts: `[SYSTEM_INIT]: NEURAL_VISUAL_ENGINE_v4.2\n[SUBJECT]: Futuristic cyberpunk design laboratory, complex holographic neural networks floating in mid-air, hyper-detailed workstation with multiple 8K displays.\n[TECHNICAL]: Shot on Arri Alexa LF, 35mm Master Prime, f/1.8, cinematic volumetric lighting, ray-traced glass reflections, global illumination.\n[STYLE]: High-fidelity, architectural visualization, Octane Render, 8k resolution, photorealistic material textures.\n[PARAMETERS]: --ar 16:9 --v 6.1 --stylize 850 --chaos 10 --iw 2.0 --no low-res, text, watermark, distorted.`,
      layout: "STRUCTURAL MAPPING: [Grid: 12-col] | [Balance: Golden Ratio] | [Contrast: High-Dynamic]",
      design: "HIGH-FIDELITY NEURAL OUTPUT"
    },
    color: "rgba(59, 130, 246, 0.5)"
  },
  {
    id: "ugc",
    title: "DIGITAL HUMAN ENGINE",
    icon: <Video className="w-5 h-5" />,
    tag: "Avatar Synthesis",
    modes: {
      tools: {
        title: "CÔNG NGHỆ NHÂN BẢN",
        description: "Mình dùng những model này để tạo ra những 'con người kỹ thuật số' có hồn và biết nói chuyện như thật.",
        details: ["HeyGen: Để Avatar nói chuyện khớp từng cử động môi.", "Meta Human: Tạo ra gương mặt 3D cực kỳ chi tiết.", "n8n: Tự động hóa để sản xuất hàng loạt video mà không tốn sức."]
      },
      scripts: {
        title: "SCRIPTS TO PROMPT",
        description: "Kịch bản không chỉ là chữ, mình lồng ghép cảm xúc và ngữ điệu để nhân vật AI không bị 'đơ' khi giao tiếp.",
        details: ["Dịch thuật và thuyết minh tự động trên 29 ngôn ngữ.", "Cân chỉnh giọng nói lúc vui, lúc trầm ấm tùy bối cảnh.", "Thêm cử chỉ tự nhiên để nhân vật trông sống động hơn."]
      },
      layout: {
        title: "DÀN DỰNG BỐ CỤC",
        description: "Khi đặt nhân vật vào không gian Studio ảo, mình phải tính toán ánh sáng sao cho thật hòa quyện.",
        details: ["Ghép nền và xử lý ánh sáng sao cho thật hòa quyện.", "Chọn góc quay cận hay trung để làm nổi bật nhân vật.", "Thêm các hiệu ứng chữ và thông tin chạy trên màn hình."]
      },
      design: {
        title: "XUẤT BẢN VIDEO",
        description: "Công đoạn cuối để có một video hoàn hảo, mượt mà, sẵn sàng bùng nổ trên các nền tảng mạng xã hội.",
        details: ["Xử lý chuyển động sao cho thật mượt, không bị giật.", "Lọc âm thanh trong trẻo, nghe sướng tai nhất có thể.", "Xuất video chất lượng cao cho TikTok, YouTube, Facebook."]
      }
    },
    impact: "Zero Studio Costs",
    tools: ["HeyGen", "Synthesia", "DeepFace"],
    logos: ["heygen.png", "meta.svg", "n8n.svg", "sheets.svg"],
    playground: {
      scripts: `[AVATAR_CONFIG]: MODEL_ID_8842_PREMIUM\n[BEHAVIOR]: Natural micro-expressions, 68-point facial mesh tracking, emotive hand gestures synchronized with speech.\n[AUDIO_SYNC]: Lip-sync accuracy 99.8%, tonal inflection matching 'Professional/Inspiring'.\n[OUTPUT]: 4K Resolution, 60fps, background integration with studio-grade color grading.\n[COMMANDS]: --translate [VN] --upscale [4K] --remove_background [TRUE]`,
      layout: "MESH DATA: [Face-Points: 68] | [Body-Type: Cinematic] | [Lighting: 3-Point Studio]",
      design: "4K DIGITAL AVATAR GENERATION"
    },
    color: "rgba(255, 64, 0, 0.5)"
  },
  {
    id: "voice",
    title: "SONIC INTELLIGENCE",
    icon: <Mic className="w-5 h-5" />,
    tag: "Voice Orchestration",
    modes: {
      tools: {
        title: "BỘ LỌC ÂM THANH",
        description: "Dàn công cụ mình dùng để 'đúc' ra những giọng nói AI nghe ấm áp và truyền cảm hứng nhất.",
        details: ["ElevenLabs: Cho giọng nói chân thực đến khó tin.", "RVC: Biến đổi giọng nói linh hoạt theo từng nhân vật.", "OpenVoice: Kiểm soát độ cao và tốc độ nói cực kỳ dễ dàng."]
      },
      scripts: {
        title: "SCRIPTS TO PROMPT",
        description: "Mình dạy AI cách ngắt nghỉ, nhấn nhá sao cho giống một người kể chuyện thực thụ nhất.",
        details: ["Giữ cho tông giọng luôn ổn định và truyền cảm.", "Thêm các biểu cảm như thở nhẹ, nhấn trọng âm.", "Điều chỉnh nhịp điệu để người nghe không thấy bị chán."]
      },
      layout: {
        title: "XỬ LÝ KHÔNG GIAN ÂM",
        description: "Âm thanh cũng cần có 'không gian'. Mình làm sạch mọi tiếng ồn để giọng nói được nổi bật nhất.",
        details: ["Soi sóng âm để đảm bảo tiếng không bị rè hay méo.", "Dùng AI quét sạch mọi tiếng tạp âm khó chịu xung quanh.", "Tạo cảm giác âm thanh đa chiều, nghe rât chân thực."]
      },
      design: {
        title: "BẢN THU HOÀN HẢO",
        description: "Kết quả là một file âm thanh chất lượng Studio, sẵn sàng để lồng vào bất kỳ dự án chuyên nghiệp nào.",
        details: ["Làm giọng nói trở nên trong trẻo và có nội lực hơn.", "Cân bằng âm lượng để nghe trên thiết bị nào cũng chuẩn.", "Xuất file chất lượng cao nhất cho các dự án lớn."]
      }
    },
    impact: "Instant Voiceovers",
    tools: ["ElevenLabs", "RVC", "OpenVoice"],
    logos: ["elevenlabs.svg", "claude.svg", "chatgpt.svg", "perplexity.svg"],
    playground: {
      scripts: `[VOICE_CLONE]: TARGET_VOICE_SAMPLE_v2\n[PARAMS]: Stability: 0.85 | Clarity: 0.95 | Style_Exaggeration: 0.1 | Model: Eleven_Multilingual_V2\n[INFLECTION]: Deep narrative tone, cinematic pacing, natural breath inserts at comma junctions.\n[POST_PROCESS]: Neural noise reduction, frequency balancing, 24-bit studio mastering.\n[EXPORT]: .WAV | 44.1kHz | Mono_Cured`,
      layout: "WAVEFORM: [Frequency: 44.1kHz] | [Bit-Depth: 24-bit] | [Processing: AI Noise Removal]",
      design: "CRYSTAL CLEAR NEURAL AUDIO"
    },
    color: "rgba(168, 85, 247, 0.5)"
  }
];

export default function AIUseCaseCards() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(useCases[0].id);
  const [activePlayground, setActivePlayground] = useState<"tools" | "scripts" | "layout" | "design">("tools");

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentUC = useCases.find(u => u.id === activeTab) || useCases[0];

  return (
    <section className="relative pt-32 pb-16 px-6 lg:px-12 bg-[#050505] overflow-hidden">
      {/* ─── AMBIENT BACKGROUND ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,64,0,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ─── HEADER: SYSTEM IDENTIFICATION ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-12 border-b border-white/5 pb-12">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.5em]">Neural Network Interface v3.2</span>
                <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-[0.2em] animate-pulse">Connection: Secure_AES_256</span>
              </div>
            </motion.div>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white tracking-tighter leading-none italic uppercase">
              THE AI <span className="text-accent not-italic">WORKBENCH</span>
            </h2>
          </div>

          {/* HUD COMMAND HUB - MODE SWITCHER */}
          <div className="relative p-px rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden group/hub shadow-2xl">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:15px_15px] opacity-20 pointer-events-none" />
             
             <div className="relative z-10 flex flex-col md:flex-row bg-black/40 backdrop-blur-3xl">
                <div className="px-6 py-4 border-r border-white/5 flex items-center gap-3 bg-white/[0.02]">
                   <div className="w-1 h-8 bg-accent rounded-full" />
                   <div className="flex flex-col">
                      <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black leading-none mb-1">Select_Mode</span>
                      <span className="font-heading text-lg font-black text-white leading-none tracking-tighter">CMD_CTRL</span>
                   </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3">
                  {useCases.map((uc, i) => (
                    <button 
                      key={uc.id} 
                      onClick={() => { setActiveTab(uc.id); setActivePlayground("tools"); }} 
                      className={cn(
                        "relative px-8 py-6 transition-all duration-500 group/tab border-l border-white/5 first:border-l-0 overflow-hidden", 
                        activeTab === uc.id ? "bg-accent/[0.03]" : "hover:bg-white/[0.02]"
                      )}
                    >
                      {/* Active Indicator */}
                      {activeTab === uc.id && (
                        <>
                           <motion.div 
                              layoutId="activeTabGlow"
                              className="absolute inset-0 bg-accent/[0.05] z-0" 
                           />
                           <motion.div 
                              layoutId="activeTabLine"
                              className="absolute top-0 left-0 right-0 h-0.5 bg-accent shadow-[0_0_15px_#ff4000] z-20" 
                           />
                        </>
                      )}

                      <div className="relative z-10 flex flex-col items-start gap-1">
                        <div className="flex items-center gap-3">
                           <div className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              activeTab === uc.id ? "bg-accent animate-pulse shadow-[0_0_10px_#ff4000]" : "bg-white/10"
                           )} />
                           <span className={cn(
                              "font-heading text-sm font-black uppercase tracking-tight transition-colors",
                              activeTab === uc.id ? "text-white" : "text-white/30 group-hover/tab:text-white/60"
                           )}>
                              {uc.title.split(' ')[1] || uc.title}
                           </span>
                        </div>
                        <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.3em] font-black pl-4">
                           {uc.tag}
                        </span>
                      </div>

                      {/* Micro-UI Corner Brackets (Hover) */}
                      <div className="absolute inset-0 opacity-0 group-hover/tab:opacity-100 transition-opacity pointer-events-none">
                         <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20" />
                         <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20" />
                      </div>

                      <div className="absolute bottom-2 right-4 font-mono text-[6px] text-white/5 uppercase tracking-widest font-black">
                         _X-0{i+1}
                      </div>
                    </button>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* ─── MASTER BENTO GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* SLOT 1: MAIN VISUALIZER (Large) */}
          <div className="lg:col-span-8 relative group min-h-[550px]">
             {/* HUD Brackets */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent/40 rounded-tl-2xl z-20 pointer-events-none" />
             <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/40 rounded-tr-2xl z-20 pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent/40 rounded-bl-2xl z-20 pointer-events-none" />
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent/40 rounded-br-2xl z-20 pointer-events-none" />

             <div className="h-full w-full rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md overflow-hidden relative shadow-2xl">
                {/* Background HUD elements */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
                
                {/* NEURAL GRID BACKGROUND */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,64,0,0.05),transparent_70%)]" />

                {/* Top Bar Info */}
                <div className="absolute top-0 left-0 right-0 h-12 px-6 flex items-center justify-between border-b border-white/5 bg-white/[0.02] z-10">
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="font-mono text-[9px] text-accent font-bold uppercase tracking-widest">Neural_Orchestrator_v2.0</span>
                      </div>
                   </div>
                </div>

                {/* Content Area */}
                <div className="absolute inset-0 pt-12 p-8 flex flex-col justify-center items-center">
                  <AnimatePresence mode="wait">
                    {activePlayground === "tools" && (
                      <motion.div 
                        key="tools" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="relative w-full h-full min-h-[400px] flex items-center justify-center"
                      >
                        {/* SVG CONNECTION LAYER */}
                        <svg 
                          viewBox="0 0 100 100" 
                          preserveAspectRatio="none"
                          className="absolute inset-0 w-full h-full pointer-events-none z-10"
                        >
                          <defs>
                            <filter id="hyper-glow">
                              <feGaussianBlur stdDeviation="0.8" result="coloredBlur" />
                              <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>

                          {currentUC.tools.map((_, i) => {
                             const total = currentUC.tools.length;
                             const angle = (i / total) * 360;
                             const radius = 35; 
                             const x = 50 + radius * Math.cos((angle - 90) * (Math.PI / 180));
                             const y = 50 + radius * Math.sin((angle - 90) * (Math.PI / 180));
                             
                             const isLeft = x < 50;
                             const portX = isLeft ? x + 4.5 : x - 4.5; 
                             const portY = y;

                             return (
                               <g key={`wire-${i}`} filter="url(#hyper-glow)">
                                 <path
                                   d={`M 50 50 C 50 ${portY}, ${portX} 50, ${portX} ${portY}`}
                                   fill="none"
                                   stroke="rgba(255,64,0,0.05)"
                                   strokeWidth="0.8"
                                 />
                                 
                                 <motion.path
                                   d={`M 50 50 C 50 ${portY}, ${portX} 50, ${portX} ${portY}`}
                                   fill="none"
                                   stroke="#ff4000"
                                   strokeWidth="1.5"
                                   strokeLinecap="round"
                                   initial={{ pathLength: 0.05, pathOffset: 0, opacity: 0 }}
                                   animate={{ 
                                     pathOffset: [0, 1],
                                     opacity: [0, 1, 0.8, 0]
                                   }}
                                   transition={{ 
                                     duration: 3, 
                                     repeat: Infinity, 
                                     delay: i * 0.6,
                                     ease: "linear"
                                   }}
                                 />
                               </g>
                             );
                          })}
                        </svg>

                        {/* NEURAL DUST PARTICLES */}
                        {mounted && [...Array(12)].map((_, i) => (
                           <motion.div
                             key={`dust-${i}`}
                             className="absolute w-1 h-1 bg-accent/20 rounded-full blur-[1px]"
                             initial={{ 
                               x: Math.random() * 100 + "%", 
                               y: Math.random() * 100 + "%",
                               opacity: 0 
                             }}
                             animate={{ 
                               y: ["-10%", "110%"],
                               opacity: [0, 0.5, 0]
                             }}
                             transition={{ 
                               duration: 10 + Math.random() * 20, 
                               repeat: Infinity,
                               delay: Math.random() * 10
                             }}
                           />
                        ))}

                        {/* CENTRAL CORE NODE */}
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="relative z-20 w-48 h-48 rounded-full flex items-center justify-center group/core"
                        >
                           {/* Holographic Scan Rings */}
                           <motion.div 
                             animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                             transition={{ duration: 2, repeat: Infinity }}
                             className="absolute inset-0 rounded-full border border-accent/40 bg-accent/5" 
                           />
                           <motion.div 
                             animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                             transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                             className="absolute inset-0 rounded-full border border-accent/20" 
                           />

                           <div className="relative z-10 w-full h-full rounded-full bg-black/40 border border-white/10 backdrop-blur-3xl flex flex-col items-center justify-center p-8 shadow-[0_0_100px_rgba(255,64,0,0.25)]">
                              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(255,64,0,0.1),transparent)] animate-spin-slow" />
                              
                              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent mb-4 shadow-[0_0_30px_rgba(255,64,0,0.3)]">
                                 {currentUC.icon}
                              </div>
                              <div className="text-center">
                                <div className="font-heading text-2xl font-black text-white leading-none tracking-tighter uppercase mb-1">SYSTEM</div>
                                <div className="font-mono text-[8px] text-accent font-black tracking-[0.5em] uppercase">NEURAL_HUB</div>
                              </div>
                           </div>
                        </motion.div>

                        {/* TOOL NODES (SATELLITES) */}
                        {currentUC.tools.map((tool, i) => {
                             const total = currentUC.tools.length;
                             const angle = (i / total) * 360;
                             const radius = 35;
                             const x = 50 + radius * Math.cos((angle - 90) * (Math.PI / 180));
                             const y = 50 + radius * Math.sin((angle - 90) * (Math.PI / 180));
                             const isLeft = x < 50;

                             return (
                               <motion.div 
                                 key={tool}
                                 initial={{ opacity: 0, scale: 0.5 }}
                                 animate={{ 
                                   opacity: 1, 
                                   scale: 1, 
                                   left: `${x}%`, 
                                   top: `${y}%`
                                 }}
                                 transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.1 }}
                                 className="absolute z-30 w-36 -translate-x-1/2 -translate-y-1/2 perspective-1000"
                               >
                                  <motion.div 
                                    whileHover={{ rotateY: isLeft ? -15 : 15, rotateX: -5, scale: 1.05 }}
                                    className="relative group/node cursor-pointer"
                                  >
                                     {/* Floating Status Label */}
                                     <motion.div 
                                       animate={{ y: [0, -4, 0] }}
                                       transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                                       className={`absolute -top-8 ${isLeft ? 'right-0' : 'left-0'} flex items-center gap-2`}
                                     >
                                        <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                                        <span className="font-mono text-[6px] text-white/30 uppercase tracking-widest font-black">NODE_ACTIVE: {2.4 + i*0.1}MS</span>
                                     </motion.div>

                                     {/* Holographic Card */}
                                     <div className="rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl p-6 flex flex-col items-center justify-center transition-all duration-500 group-hover/node:border-accent/60 group-hover/node:bg-black/80 group-hover/node:shadow-[0_0_50px_rgba(255,64,0,0.25)] overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                                        
                                        <div className="w-14 h-14 flex items-center justify-center mb-4">
                                           <img 
                                             src={`/images/logos/${currentUC.logos[i]}`} 
                                             alt={tool}
                                             className="w-full h-full object-contain brightness-0 invert transition-transform duration-700 group-hover/node:scale-110"
                                             onError={(e) => { (e.target as any).style.display = 'none'; (e.target as any).parentElement.innerHTML = `<div class="font-black text-white/10 text-2xl">${tool.substring(0,2)}</div>`; }} 
                                           />
                                        </div>
                                        <span className="font-mono text-[10px] text-white/40 group-hover/node:text-accent transition-colors uppercase font-black tracking-[0.2em] text-center leading-none">
                                          {tool}
                                        </span>
                                        
                                        {/* Precision Input Port - Dynamic Placement */}
                                        <div className={`absolute top-1/2 ${isLeft ? '-right-1' : '-left-1'} -translate-y-1/2 w-2 h-2 rounded-full bg-accent border border-white/20 shadow-[0_0_10px_rgba(255,64,0,0.5)]`} />
                                     </div>

                                     {/* HUD Label */}
                                     <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-all duration-300 transform group-hover/node:-translate-y-1">
                                        <div className="bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-sm backdrop-blur-md">
                                           <span className="font-mono text-[6px] text-accent font-black tracking-widest uppercase">SYNC_NODE_0x{i}</span>
                                        </div>
                                     </div>
                                  </motion.div>
                               </motion.div>
                             );
                        })}
                      </motion.div>
                    )}
                    {activePlayground === "scripts" && (
                      <motion.div 
                        key="scripts" 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: 20 }} 
                        className="w-full max-w-2xl"
                      >
                         <div className="p-8 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl font-mono text-sm leading-relaxed text-accent/80 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-accent/30" />
                            <div className="whitespace-pre-wrap font-mono text-xs md:text-sm">
                              {currentUC.playground.scripts}
                              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-2 h-4 bg-accent ml-1 translate-y-0.5" />
                            </div>
                         </div>
                      </motion.div>
                    )}
                    {activePlayground === "layout" && (
                      <motion.div 
                        key="layout" 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 1.05 }} 
                        className="w-full max-w-2xl aspect-video border-2 border-dashed border-white/10 rounded-2xl p-12 flex items-center justify-center relative overflow-hidden"
                      >
                         <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,64,0,0.05),transparent)] animate-spin-slow" />
                         <div className="relative text-center space-y-6">
                           <Layout className="w-16 h-16 text-accent mx-auto opacity-40" />
                           <div className="font-mono text-sm md:text-base text-white/70 font-bold uppercase tracking-[0.3em]">{currentUC.playground.layout}</div>
                         </div>
                      </motion.div>
                    )}
                    {activePlayground === "design" && (
                      <motion.div 
                        key="design" 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -20 }} 
                        className="relative group/design cursor-crosshair"
                      >
                          <div className="absolute -inset-16 bg-accent/20 blur-[100px] opacity-20 group-hover/design:opacity-40 transition-opacity duration-1000" />
                          <div className="relative p-12 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-3xl animate-pulse">
                            <Palette className="w-20 h-20 text-accent" />
                          </div>
                          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 font-mono text-[10px] text-accent font-black tracking-[0.5em] whitespace-nowrap">{currentUC.playground.design}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom HUD Data */}
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between z-10">
                   <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">COORD_X</span>
                        <span className="font-mono text-[10px] text-white/60 font-bold">40.7128° N</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">COORD_Y</span>
                        <span className="font-mono text-[10px] text-white/60 font-bold">74.0060° W</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">STATUS:</span>
                     <span className="font-mono text-[9px] text-accent font-bold uppercase animate-pulse">OPTIMIZED_ACTIVE</span>
                   </div>
                </div>
             </div>
          </div>

          {/* RIGHT COLUMN: MODES & DETAILS */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* SLOT 2: MODE SWITCHER (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-4">
              {[ 
                { id: 'tools', label: 'TOOLS', icon: <Cpu className="w-4 h-4" />, num: '01' }, 
                { id: 'scripts', label: 'SCRIPTS', icon: <Code className="w-4 h-4" />, num: '02' }, 
                { id: 'layout', label: 'LAYOUT', icon: <Layers className="w-4 h-4" />, num: '03' }, 
                { id: 'design', label: 'DESIGN', icon: <Palette className="w-4 h-4" />, num: '04' } 
              ].map((mode) => (
                <button 
                  key={mode.id} 
                  onClick={() => setActivePlayground(mode.id as any)} 
                  className={cn(
                    "p-6 rounded-2xl border transition-all duration-500 flex flex-col gap-4 text-left group relative overflow-hidden", 
                    activePlayground === mode.id 
                      ? "bg-accent border-accent shadow-[0_0_40px_rgba(255,64,0,0.25)]" 
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                  )}
                >
                  {activePlayground === mode.id && (
                    <motion.div 
                      layoutId="mode-bg" 
                      className="absolute inset-0 bg-accent z-0" 
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className={cn("font-mono text-xs font-black", activePlayground === mode.id ? "text-white" : "text-white/20")}>{mode.num}</span>
                    <div className={cn("p-2 rounded-lg transition-colors", activePlayground === mode.id ? "bg-white/20 text-white" : "bg-white/5 text-white/40 group-hover:text-white")}>
                      {mode.icon}
                    </div>
                  </div>
                  <span className={cn("relative z-10 font-mono text-[10px] font-bold tracking-[0.3em] uppercase mt-2", activePlayground === mode.id ? "text-white" : "text-white/40")}>
                    {mode.label}
                  </span>
                </button>
              ))}
            </div>

            {/* SLOT 3: ADAPTIVE CONTENT (The list) */}
            <div className="flex-grow p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col justify-between group relative overflow-hidden">
                <div className="space-y-8 relative z-10">
                  {(() => {
                    const currentMode = (currentUC as any).modes[activePlayground];
                    return (
                      <>
                        <motion.div 
                          key={`${activeTab}-${activePlayground}-text`} 
                          initial={{ opacity: 0, y: 10 }} 
                          animate={{ opacity: 1, y: 0 }} 
                        >
                           <span className="font-mono text-[9px] text-accent uppercase tracking-[0.3em] block mb-2 border-b border-white/5 pb-2">{currentMode.title}</span>
                           <p className="font-body text-white/50 text-xl leading-relaxed italic font-light">{currentMode.description}</p>
                        </motion.div>

                        <div className="space-y-3">
                           {currentMode.details.map((detail: string, idx: number) => (
                             <motion.div 
                               key={`${activeTab}-${activePlayground}-detail-${idx}`} 
                               initial={{ opacity: 0, x: -10 }} 
                               animate={{ opacity: 1, x: 0 }} 
                               transition={{ delay: idx * 0.1 }}
                               className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group/detail"
                             >
                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover/detail:scale-110 transition-transform">
                                  <Sparkles className="w-3 h-3" />
                                </div>
                                <span className="font-body text-sm text-white/70 leading-snug">{detail}</span>
                             </motion.div>
                           ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
                {/* HUD Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 blur-3xl rounded-full -mr-8 -mt-8" />
            </div>
          </div>

          {/* SLOT 4: PERFORMANCE HUD (Full Width) */}
          <div className="lg:col-span-12">
            <div className="relative group">
               <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 blur-[80px] transition-opacity duration-1000" />
               <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden shadow-2xl">
                  {/* Scanning Line */}
                  <motion.div 
                    initial={{ left: "-10%" }} 
                    animate={{ left: "110%" }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                    className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent z-10" 
                  />
                  
                  <div className="flex items-center gap-8">
                     <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,64,0,0.3),transparent)] animate-spin-slow" />
                        <Activity className="w-8 h-8 text-accent animate-pulse relative z-10" />
                     </div>
                     <div className="space-y-1">
                        <span className="font-mono text-[9px] text-accent uppercase tracking-[0.4em] block">System Impact</span>
                        <div className="flex items-baseline gap-2">
                           <span className="font-heading text-6xl font-black text-white italic tracking-tighter leading-none">{currentUC.impact.split(' ')[0]}</span>
                           <span className="font-heading text-lg font-bold text-accent italic uppercase tracking-tighter">{currentUC.impact.split(' ').slice(1).join(' ')}</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 w-full md:w-auto">
                     <div className="space-y-1">
                        <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em] block">Efficiency</span>
                        <div className="flex items-center gap-2">
                           <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: "82%" }} transition={{ duration: 1.5 }} className="h-full bg-accent" /></div>
                           <span className="font-mono text-[11px] text-white/70 font-bold">+82.4%</span>
                        </div>
                     </div>
                     <div className="space-y-1">
                        <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em] block">Accuracy</span>
                        <div className="flex items-center gap-2">
                           <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: "99%" }} transition={{ duration: 1.5 }} className="h-full bg-green-500" /></div>
                           <span className="font-mono text-[11px] text-white/70 font-bold">99.2%</span>
                        </div>
                     </div>
                     <div className="space-y-1">
                        <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em] block">Latency</span>
                        <span className="font-mono text-[11px] text-white/70 font-bold block">0.04ms</span>
                     </div>
                     <div className="space-y-1">
                        <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em] block">Status</span>
                        <div className="flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                           <span className="font-mono text-[11px] text-accent font-bold uppercase tracking-widest">Active</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

