"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Popup xem video reel ───
export default function ReelModal({
  open,
  onClose,
  src,
  label,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  label: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative max-h-[86vh] max-w-full overflow-hidden rounded-2xl bg-black"
            style={{ aspectRatio: "9 / 16", height: "86vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <video src={src} autoPlay controls playsInline className="h-full w-full object-contain" />
          </motion.div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
