"use client";

import React, { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { caseStudies } from "@/data/casestudy";
import { ThinksmartStory, DreamTalentStory } from "@/components/03-CaseStudy/CaseStudyLayouts";
import { FullscreenLightbox } from "@/components/03-CaseStudy/CaseStudyModals";

export default function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const cs = caseStudies.find((c) => c.id === id);

  if (!cs) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <button 
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-white/10 rounded-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-primary text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-24">
        {cs.id === "dreamtalent" ? (
          <DreamTalentStory cs={cs} onBack={() => router.push("/")} />
        ) : (
          <ThinksmartStory cs={cs} onBack={() => router.push("/")} />
        )}
      </div>
    </main>
  );
}
