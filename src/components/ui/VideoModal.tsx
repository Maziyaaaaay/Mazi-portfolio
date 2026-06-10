"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { asset } from "@/lib/asset";
import { EASE_CINE } from "@/lib/animations";

interface VideoModalProps {
  open: boolean;
  src: string | null;
  title?: string;
  onClose: () => void;
}

export default function VideoModal({
  open,
  src,
  title,
  onClose,
}: VideoModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_CINE }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title ?? "Video player"}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="absolute right-5 top-5 text-cream/70 transition-colors duration-300 hover:text-gold"
          >
            <X size={32} />
          </button>

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_CINE }}
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-gold">
                {title}
              </p>
            )}
            {/* Video only mounts when the modal opens — nothing preloads. */}
            <video
              src={asset(src)}
              controls
              autoPlay
              playsInline
              className="max-h-[80vh] w-full rounded-sm bg-black"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
