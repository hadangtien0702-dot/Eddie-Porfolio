"use client";

import { brand } from "@/data/navigation";
import { contactData } from "@/data/contact";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-primary">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left — Logo */}
          <a href="#" className="group inline-flex items-center gap-1">
            <span className="font-heading text-[18px] font-bold text-white/70 italic tracking-tight group-hover:text-white transition-colors duration-500">
              {brand.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent mb-1.5" />
          </a>

          {/* Right — Social links as text */}
          <div className="flex items-center gap-7">
            {contactData.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group font-body text-[12px] text-white/40 hover:text-white/55 uppercase tracking-[0.2em] transition-colors duration-300 relative"
              >
                {social.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-5 pt-4 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-[12px] text-white/15">
            © {year} {brand.name}. All rights reserved.
          </p>
          <p className="font-body text-[12px] text-white/10 uppercase tracking-[0.1em]">
            {brand.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
