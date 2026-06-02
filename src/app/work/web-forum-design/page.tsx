"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  webProjects as projects,
  webForumMeta as meta,
} from "@/data/work-web-forum-design";

export default function WebForumDesignPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-text-primary selection:bg-accent/30">
      {/* ─── Hero ─── */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-end overflow-hidden border-b border-white/5">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full opacity-50" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full opacity-50" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-20 pt-40">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-muted hover:text-accent transition-colors mb-16 group"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Index
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-accent" />
              <p className="font-mono text-accent tracking-[0.2em] text-[10px] uppercase">
                {meta.overline}
              </p>
            </div>
            <h1 className="font-heading font-bold leading-[1.05] tracking-tighter mb-8 max-w-4xl text-5xl md:text-7xl lg:text-8xl text-white">
              {meta.title}
            </h1>
            <p className="font-body text-lg md:text-xl text-text-secondary font-light max-w-2xl leading-relaxed">
              {meta.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Premium Project Showcase ─── */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-24">
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, idx) => {
            const isThinkSmart = project.name.includes("ThinkSmart");

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="mb-40 flex flex-col gap-24 relative"
              >
                {/* ─── 01. PROJECT OVERVIEW ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  <div className="lg:col-span-8 flex flex-col">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="font-mono text-[10px] px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/20 uppercase tracking-widest backdrop-blur-md">
                        Case Study 0{idx + 1}
                      </span>
                      <span className="font-mono text-[10px] px-3 py-1.5 rounded-full bg-white/5 text-white/70 border border-white/10 uppercase tracking-widest">
                        {project.type}
                      </span>
                      <span className="relative flex h-2 w-2 ml-2">
                        {project.status === "Live" && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${project.status === "Live" ? "bg-green-500" : "bg-white/20"}`}></span>
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-5xl md:text-7xl text-white mb-6 tracking-tight leading-none drop-shadow-2xl">
                      {project.name}
                    </h2>
                    
                    <p className="font-body text-xl md:text-2xl text-white/70 leading-relaxed mb-10 font-light">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-4 py-2 rounded-md bg-[#111] border border-white/10 text-white/70 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.url !== "#" && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-[11px] rounded-full overflow-hidden w-fit transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Visit Live Website
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                      </a>
                    )}
                  </div>
                  
                  <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] flex flex-col gap-6">
                    <div>
                      <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Role</h4>
                      <p className="text-white font-medium">Lead UI/UX Designer, Frontend Developer</p>
                    </div>
                    <div className="w-full h-[1px] bg-white/5" />
                    <div>
                      <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">Platform</h4>
                      <p className="text-white font-medium">Responsive Web (Desktop & Mobile)</p>
                    </div>
                    <div className="w-full h-[1px] bg-white/5" />
                    <div>
                      <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">The Challenge</h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {isThinkSmart 
                          ? "Transforming a traditional insurance brand into a modern, trust-building digital platform that converts visitors into leads seamlessly."
                          : "Creating an energetic, bold, and highly visual portfolio platform for talent and entertainment acts to stand out."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ─── 02. DESIGN SYSTEM ─── */}
                <div className="w-full bg-[#050505] border border-white/5 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
                   
                   <div className="flex items-center gap-4 mb-16 relative z-10">
                     <span className="w-12 h-[1px] bg-white/20" />
                     <h3 className="font-mono text-[12px] text-white/60 uppercase tracking-[0.3em]">01 / Design System</h3>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                      {/* Colors */}
                      <div>
                        <h4 className="font-heading text-2xl md:text-3xl font-bold text-white mb-8">Color Palette</h4>
                        {isThinkSmart ? (
                          <div className="flex flex-col gap-4">
                            <div className="w-full h-32 rounded-2xl bg-[#c40000] shadow-[0_20px_50px_rgba(196,0,0,0.2)] flex items-end p-5 transition-transform hover:-translate-y-2 cursor-crosshair">
                              <div className="w-full flex justify-between items-center text-white">
                                <span className="font-bold text-lg">Primary Red</span>
                                <span className="font-mono text-sm opacity-80">#C40000</span>
                              </div>
                            </div>
                            <div className="flex gap-4 h-24">
                              <div className="flex-1 rounded-2xl bg-[#32373c] border border-white/10 flex items-end p-4 transition-transform hover:-translate-y-2 cursor-crosshair">
                                <span className="font-mono text-[10px] text-white/80">#32373C</span>
                              </div>
                              <div className="flex-1 rounded-2xl bg-[#f4f4f4] border border-black/10 flex items-end p-4 transition-transform hover:-translate-y-2 cursor-crosshair">
                                <span className="font-mono text-[10px] text-black/80">#F4F4F4</span>
                              </div>
                              <div className="flex-1 rounded-2xl bg-[#ffffff] border border-black/10 flex items-end p-4 transition-transform hover:-translate-y-2 cursor-crosshair">
                                <span className="font-mono text-[10px] text-black/80">#FFFFFF</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-4">
                            <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-[#9b51e0] to-[#ff6900] shadow-[0_20px_50px_rgba(155,81,224,0.3)] flex items-end p-5 transition-transform hover:-translate-y-2 cursor-crosshair">
                              <div className="w-full flex justify-between items-center text-white">
                                <span className="font-bold text-lg">Brand Gradient</span>
                                <span className="font-mono text-sm opacity-80">Linear 135deg</span>
                              </div>
                            </div>
                            <div className="flex gap-4 h-24">
                              <div className="flex-1 rounded-2xl bg-[#111111] border border-white/10 flex items-end p-4 transition-transform hover:-translate-y-2 cursor-crosshair">
                                <span className="font-mono text-[10px] text-white/80">#111111</span>
                              </div>
                              <div className="flex-1 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-end p-4 transition-transform hover:-translate-y-2 cursor-crosshair">
                                <span className="font-mono text-[10px] text-white/80">#1A1A1A</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Typography */}
                      <div>
                        <h4 className="font-heading text-2xl md:text-3xl font-bold text-white mb-8">Typography</h4>
                        <div className="w-full h-full min-h-[240px] rounded-2xl border border-white/10 bg-[#0A0A0A] p-8 flex flex-col justify-center">
                           <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                             <div className="flex items-baseline gap-4">
                               <span className={`text-6xl text-white ${isThinkSmart ? 'font-sans' : 'font-sans font-black tracking-tighter'}`}>Aa</span>
                               <span className={`text-2xl text-white/50 ${isThinkSmart ? 'font-sans' : 'font-sans font-medium'}`}>Bb</span>
                             </div>
                             <div className="text-right">
                               <p className="text-white font-bold text-lg">{isThinkSmart ? 'Roboto' : 'Montserrat'}</p>
                               <p className="font-mono text-[10px] text-accent uppercase">{isThinkSmart ? 'Primary Typeface' : 'Display Typeface'}</p>
                             </div>
                           </div>
                           
                           <div className="space-y-4">
                             <div className="flex items-center justify-between">
                               <span className={`text-3xl text-white ${isThinkSmart ? 'font-bold' : 'font-black tracking-tight'}`}>Heading 1</span>
                               <span className="font-mono text-[10px] text-white/40">72px / {isThinkSmart ? 'Bold' : 'Black'}</span>
                             </div>
                             <div className="flex items-center justify-between">
                               <span className={`text-xl text-white/80 ${isThinkSmart ? 'font-medium' : 'font-bold'}`}>Heading 2</span>
                               <span className="font-mono text-[10px] text-white/40">48px / {isThinkSmart ? 'Medium' : 'Bold'}</span>
                             </div>
                             <div className="flex items-center justify-between">
                               <span className="text-base text-white/60">Body text paragraphs</span>
                               <span className="font-mono text-[10px] text-white/40">16px / Regular</span>
                             </div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>

                {/* ─── 03. WIREFRAME & COMPONENTS ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                   <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-10 flex flex-col">
                     <div className="mb-10">
                       <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">02 / User Interface</h4>
                       <h3 className="font-heading text-2xl font-bold text-white">Component System</h3>
                     </div>
                     <div className="flex-1 flex flex-col justify-center gap-6">
                        {isThinkSmart ? (
                          <>
                            {/* ThinkSmart Buttons */}
                            <div className="flex flex-wrap gap-4">
                              <button className="px-8 py-3 rounded-full text-[11px] font-bold text-white uppercase tracking-wider bg-[#c40000] hover:bg-[#a00000] shadow-[0_4px_15px_rgba(196,0,0,0.3)] transition-all">Get a Quote</button>
                              <button className="px-8 py-3 rounded-full text-[11px] font-bold text-black uppercase tracking-wider bg-[#f4f4f4] hover:bg-white transition-colors">Learn More</button>
                            </div>
                            {/* ThinkSmart Form Card */}
                            <div className="w-full bg-white border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
                              <h5 className="text-black font-bold text-sm">Request Consultation</h5>
                              <div className="w-full h-10 border border-black/10 rounded-md bg-[#f9f9f9] px-3 flex items-center">
                                <span className="text-[10px] text-black/60">John Doe</span>
                              </div>
                              <div className="w-full h-10 border border-black/10 rounded-md bg-[#f9f9f9] px-3 flex items-center">
                                <span className="text-[10px] text-black/60">+1 234 567 8900</span>
                              </div>
                              <button className="w-full h-10 rounded-full bg-[#c40000] text-white text-[10px] font-bold uppercase tracking-wider mt-2">Submit Request</button>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* DreamTalent Buttons */}
                            <div className="flex flex-wrap gap-4">
                              <button className="relative px-8 py-3 rounded-full text-[11px] font-bold text-white uppercase tracking-wider overflow-hidden group/btn">
                                <span className="absolute inset-0 bg-gradient-to-r from-[#9b51e0] to-[#ff6900] transition-transform group-hover/btn:scale-110" />
                                <span className="relative z-10">Book Artist</span>
                              </button>
                              <button className="px-8 py-3 rounded-full text-[11px] font-bold text-white uppercase tracking-wider border border-white/20 hover:bg-white/10 transition-colors">View Roster</button>
                            </div>
                            {/* DreamTalent Artist Profile Card */}
                            <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 flex gap-4 items-center shadow-2xl relative overflow-hidden group/card">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#9b51e0]/10 to-[#ff6900]/10 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#222] border border-white/5 relative z-10 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=500&q=80" alt="Artist" className="w-full h-full object-cover" />
                              </div>
                              <div className="relative z-10 flex-1">
                                <h4 className="text-white font-bold text-sm mb-1">DJ Martin</h4>
                                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-2">Electronic Producer</p>
                                <div className="flex gap-2">
                                  <span className="px-2 py-1 bg-white/5 rounded text-[8px] text-white/70 border border-white/10">House</span>
                                  <span className="px-2 py-1 bg-white/5 rounded text-[8px] text-white/70 border border-white/10">Techno</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                     </div>
                   </div>

                   <div className="bg-[#050505] border border-white/5 rounded-[2rem] p-10 flex flex-col relative overflow-hidden">
                     {/* Decorative grid */}
                     <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                     <div className="relative z-10 mb-10">
                       <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2">03 / Architecture</h4>
                       <h3 className="font-heading text-2xl font-bold text-white">Wireframing</h3>
                     </div>
                     <div className="relative z-10 flex-1 flex items-center justify-center">
                       {/* Wireframe Mockup based on project type */}
                       {isThinkSmart ? (
                         <div className="w-[90%] max-w-[340px] aspect-[4/3] border-2 border-white/10 rounded-xl p-4 flex flex-col gap-3 bg-black/50 backdrop-blur-sm shadow-2xl">
                            {/* Navbar */}
                            <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/5">
                              <div className="w-12 h-4 bg-white/10 rounded-sm" />
                              <div className="flex gap-2">
                                <div className="w-6 h-2 bg-white/10 rounded-sm" />
                                <div className="w-6 h-2 bg-white/10 rounded-sm" />
                                <div className="w-6 h-2 bg-white/10 rounded-sm" />
                              </div>
                            </div>
                            {/* Hero Section */}
                            <div className="flex gap-4 flex-1">
                              <div className="flex-[3] flex flex-col justify-center gap-2">
                                <div className="w-full h-4 bg-white/20 rounded-sm" />
                                <div className="w-3/4 h-4 bg-white/20 rounded-sm mb-2" />
                                <div className="w-full h-2 bg-white/5 rounded-sm" />
                                <div className="w-5/6 h-2 bg-white/5 rounded-sm mb-2" />
                                <div className="flex gap-2 mt-2">
                                  <div className="w-16 h-6 bg-[#c40000]/50 rounded-full" />
                                  <div className="w-16 h-6 bg-white/10 rounded-full" />
                                  <button className="px-3 py-1 bg-[#c40000] text-white text-[8px] rounded-full font-bold">Get Quote</button>
                                  <button className="px-3 py-1 border border-white/20 text-white text-[8px] rounded-full font-bold">Learn More</button>
                                </div>
                              </div>
                              <div className="flex-[2] rounded-lg border border-white/10 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" alt="Corporate" className="w-full h-full object-cover" />
                              </div>
                            </div>
                         </div>
                       ) : (
                         <div className="w-[80%] max-w-[300px] aspect-[9/16] border border-white/20 rounded-[2rem] p-4 flex flex-col gap-4 bg-[#111] backdrop-blur-sm shadow-2xl overflow-hidden relative">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-2 relative z-10">
                              <span className="text-white font-black text-xs tracking-tighter">DREAM TALENT</span>
                              <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
                              </div>
                            </div>
                            {/* Hero Image */}
                            <div className="w-full h-32 rounded-2xl border border-white/10 relative overflow-hidden z-10">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80" alt="Concert" className="absolute inset-0 w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
                                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
                                </div>
                              </div>
                            </div>
                            {/* Titles */}
                            <div className="relative z-10">
                              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#9b51e0] to-[#ff6900] font-black text-sm text-center">FEATURED ARTISTS</h2>
                              <p className="text-white/50 text-[8px] text-center mb-2">Discover the best talents in the industry.</p>
                            </div>
                            {/* Artist Grid */}
                            <div className="grid grid-cols-2 gap-3 flex-1 relative z-10">
                              <div className="rounded-xl border border-white/10 relative overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=200&q=80" alt="A" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white">DJ Martin</div>
                              </div>
                              <div className="rounded-xl border border-white/10 relative overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1520638012648-4cd82470725f?w=200&q=80" alt="A" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white">Alisa</div>
                              </div>
                              <div className="rounded-xl border border-white/10 relative overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80" alt="A" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white">The Band</div>
                              </div>
                              <div className="rounded-xl border border-white/10 relative overflow-hidden group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://images.unsplash.com/photo-1493225457124-a1a2a5956093?w=200&q=80" alt="A" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                                <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white">Vocalist</div>
                              </div>
                            </div>
                         </div>
                       )}
                     </div>
                   </div>
                </div>

                {/* ─── 04. HIGH FIDELITY MOCKUPS (DESKTOP & MOBILE) ─── */}
                <div className="w-full flex flex-col gap-6 pt-10">
                   <div className="flex items-center gap-4 mb-4">
                     <span className="w-12 h-[1px] bg-accent" />
                     <h3 className="font-mono text-[12px] text-accent uppercase tracking-[0.3em]">04 / High Fidelity</h3>
                   </div>
                   
                   <div className="flex flex-col xl:flex-row gap-8 items-start">
                     {/* Desktop Safari Mockup */}
                     <div className="relative w-full xl:w-3/4 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] bg-[#0a0a0a] border border-white/10 group">
                        {/* macOS Safari Header */}
                        <div className="h-14 w-full bg-[#111111]/90 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-4 relative z-30">
                          <div className="flex gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-white/20 group-hover:bg-[#ff5f56] transition-colors duration-300" />
                            <div className="w-3.5 h-3.5 rounded-full bg-white/20 group-hover:bg-[#ffbd2e] transition-colors duration-300 delay-75" />
                            <div className="w-3.5 h-3.5 rounded-full bg-white/20 group-hover:bg-[#27c93f] transition-colors duration-300 delay-150" />
                          </div>
                          <div className="flex-1 max-w-sm mx-auto bg-black/50 border border-white/5 h-8 rounded-md flex items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            <span className="font-mono text-[10px] text-white/50 tracking-wider">
                              {project.url !== "#" ? project.url.replace("https://", "").replace(/\/$/, "") : "localhost:3000"}
                            </span>
                          </div>
                        </div>

                        {/* Desktop Viewport */}
                        <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] overflow-hidden bg-[#111] cursor-ns-resize">
                          <div className="absolute top-0 left-0 w-full h-[300%] group-hover:-translate-y-[66.66%] transition-transform duration-[12s] ease-in-out z-0">
                            <Image
                              src={project.image}
                              alt={`${project.name} Desktop UI`}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 1200px) 100vw, 1200px"
                              quality={100}
                            />
                          </div>
                          {/* Scrolling Indicator */}
                          <div className="absolute bottom-8 right-8 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce text-accent">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <polyline points="19 12 12 19 5 12"></polyline>
                              </svg>
                            </div>
                          </div>
                        </div>
                     </div>

                     {/* Mobile iPhone Mockup */}
                     <div className="hidden md:block w-1/4 max-w-[320px] mx-auto xl:mx-0 relative rounded-[3rem] border-[8px] border-[#1A1A1A] bg-black shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden group">
                        {/* iPhone Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#1A1A1A] rounded-b-xl z-30" />
                        
                        {/* Mobile Viewport */}
                        <div className="relative w-full aspect-[9/19] overflow-hidden bg-[#111] cursor-ns-resize">
                          <div className="absolute top-0 left-0 w-full h-[300%] group-hover:-translate-y-[66.66%] transition-transform duration-[12s] ease-in-out delay-300 z-0">
                            <Image
                              src={project.image}
                              alt={`${project.name} Mobile UI`}
                              fill
                              className="object-cover object-center"
                              sizes="320px"
                              quality={80}
                            />
                          </div>
                        </div>
                     </div>
                   </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* ─── Footer CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-24 rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden group border border-white/5 bg-white/[0.02]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <p className="font-mono text-[10px] text-accent uppercase tracking-[0.3em] mb-4">
            Case studies in progress
          </p>
          <h3 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Detailed breakdowns coming soon
          </h3>
          <p className="font-body text-base text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
            The full UI/UX design process, architectural wireframes, and performance results for each project are currently being documented.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 bg-accent text-white shadow-[0_0_20px_rgba(255,64,0,0.3)] hover:shadow-[0_0_30px_rgba(255,64,0,0.6)]"
          >
            Get in touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
