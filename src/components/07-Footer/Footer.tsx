"use client";

// ─── Footer ───
// Mô tả: Footer minimal — logo, social links, copyright

import { brand } from "@/data/navigation";
import { contactData } from "@/data/contact";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-primary border-t border-white/[0.04]">
      {/* Accent top line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]
                    bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left — Logo + tagline */}
          <div className="text-center md:text-left">
            <a href="#" className="inline-flex items-center group">
              <span className="font-heading text-[20px] font-bold text-white italic tracking-tight
                             group-hover:text-accent transition-colors duration-300">
                {brand.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mb-2" />
            </a>
            <p className="font-body text-[13px] text-white/30 mt-1">
              {brand.tagline}
            </p>
          </div>

          {/* Right — Social links */}
          <div className="flex items-center gap-3">
            {contactData.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/[0.06]
                         flex items-center justify-center
                         hover:border-accent/30 hover:bg-accent/5
                         transition-all duration-300
                         font-body text-[13px] text-white/30 hover:text-white/70"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/[0.03] text-center">
          <p className="font-body text-[12px] text-white/20">
            © {year} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
