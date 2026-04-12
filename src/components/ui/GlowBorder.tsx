"use client";

/**
 * GlowBorder — gradient outline follows cursor
 *
 * Uses the CSS mask / xor-composite trick:
 *   • A div with `padding: borderWidth` sits inset-0
 *   • Its background is the radial gradient
 *   • The mask removes everything INSIDE the padding zone
 *   → only the thin border strip is visible
 *
 * Zero state updates → direct DOM mutation via refs = no re-renders.
 */

import { useRef, useCallback } from "react";

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Glow color — default: accent orange */
  color?: string;
  /** Radius of the radial glow circle in px — default 380 */
  glowSize?: number;
  /** Border stroke width in px — default 1.5 */
  borderWidth?: number;
  /** Must match the parent's border-radius exactly */
  borderRadius?: string;
}

export default function GlowBorder({
  children,
  className = "",
  style,
  color = "rgba(255, 64, 0, 0.65)",
  glowSize = 380,
  borderWidth = 1.5,
  borderRadius = "16px",
}: GlowBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = containerRef.current;
      const glow = overlayRef.current;
      if (!el || !glow) return;
      const { left, top } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      glow.style.background = `radial-gradient(${glowSize}px circle at ${x}px ${y}px, ${color}, transparent 60%)`;
      glow.style.opacity = "1";
    },
    [color, glowSize]
  );

  const handleMouseLeave = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ borderRadius, ...style }}
    >
      {/* Gradient border overlay — only the thin edge is revealed */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 40,
          borderRadius,
          padding: borderWidth,
          background: `radial-gradient(${glowSize}px circle at 50% 50%, ${color}, transparent 60%)`,
          /* The magic: remove interior, keep only the padding border zone */
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: 0,
          transition: "opacity 0.45s ease",
        }}
      />
      {children}
    </div>
  );
}
