"use client";

// ─── Services Section ───
// Layout theo reference: Light section, large headline, horizontal expandable cards
// Data: import từ data/services.ts

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { services, servicesHeading } from "@/data/services";

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="work"
      className="relative w-full overflow-hidden"
      style={{ background: "#FBFBFB" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-12 lg:pt-32 lg:pb-16">
        {/* ─── Heading Area ─── */}
        <div className="relative mb-16 lg:mb-24">
          {/* Main headline — centered */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <h2
              className="font-heading font-bold leading-[0.9] tracking-[-0.03em] flex flex-col gap-1 md:gap-2"
              style={{
                fontSize: "clamp(36px, 6.5vw, 80px)",
                color: "#040404",
              }}
            >
              <span>{servicesHeading.titleBold}</span>
              <span style={{ color: "#DEDEDE" }}>
                {servicesHeading.titleFaded}
              </span>
            </h2>
          </motion.div>

          {/* Flanking descriptions — positioned at bottom of heading */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mt-6 lg:mt-10">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-body text-[13px] leading-[1.7] max-w-[280px]"
              style={{ color: "#6b6b6b" }}
            >
              {servicesHeading.descriptionLeft}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-body text-[13px] leading-[1.7] max-w-[280px] md:text-right"
              style={{ color: "#6b6b6b" }}
            >
              {servicesHeading.descriptionRight}
            </motion.p>
          </div>
        </div>

        {/* ─── Service Cards Row ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col md:flex-row gap-3 lg:gap-4"
        >
          {services.map((svc, i) => {
            const isActive = activeId === svc.id;

            return (
              <motion.div
                key={svc.id}
                layout
                onClick={() => setActiveId(isActive ? null : svc.id)}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  opacity: { duration: 0.6, delay: 0.5 + i * 0.1 },
                  y: { duration: 0.6, delay: 0.5 + i * 0.1 },
                  layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                }}
                className="relative rounded-2xl cursor-pointer overflow-hidden group"
                style={{
                  background: "#DEDEDE",
                  flex: isActive ? "2.2" : "1",
                  minHeight: "320px",
                  transition: "flex 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {/* Tag pill */}
                <motion.span
                  layout="position"
                  className="absolute top-5 left-5 z-10 font-body text-[11px] px-3.5 py-1.5 rounded-full border"
                  style={{
                    color: isActive ? "#fff" : "#666",
                    borderColor: isActive
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(0,0,0,0.12)",
                    background: isActive
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {svc.tag}
                </motion.span>

                {/* Title */}
                <motion.h3
                  layout="position"
                  className="absolute bottom-6 left-5 z-10 font-heading font-semibold text-[20px] md:text-[22px]"
                  style={{
                    color: isActive ? "#FBFBFB" : "#040404",
                  }}
                >
                  {svc.title}
                </motion.h3>

                {/* ─── Expanded State ─── */}
                <AnimatePresence>
                  {isActive && (
                    <>
                      {/* Background Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={svc.image || ""}
                          alt={svc.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                        {/* Dark overlay for readability */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)",
                          }}
                        />
                      </motion.div>

                      {/* Action Area (Links or Get Started) */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="absolute bottom-6 right-5 z-10 flex items-center gap-3"
                      >
                        {svc.links && svc.links.length > 0 ? (
                          svc.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-body text-[12px] font-medium px-4 py-2.5 rounded-full flex items-center gap-2 hover:bg-white hover:text-primary transition-all duration-300"
                              style={{
                                background: "rgba(255,255,255,0.15)",
                                color: "#fff",
                                border: "1px solid rgba(255,255,255,0.4)",
                                backdropFilter: "blur(10px)",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {link.label}
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                              </svg>
                            </a>
                          ))
                        ) : (
                          <button
                            className="font-body text-[12px] font-medium px-5 py-2.5 rounded-full hover:bg-white hover:text-primary transition-all duration-300"
                            style={{
                              background: "rgba(255,255,255,0.2)",
                              color: "#fff",
                              border: "1px solid rgba(255,255,255,0.3)",
                              backdropFilter: "blur(10px)",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              document
                                .getElementById("contact")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }}
                          >
                            Get started
                          </button>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {/* Hover subtle highlight */}
                {!isActive && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.04), transparent)",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
