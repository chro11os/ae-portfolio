"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";

interface Paper {
  title: string;
  fileUrl: string;
}

interface PaperViewerProps {
  isOpen: boolean;
  onClose: () => void;
  paper: Paper;
}

export const PaperViewer = ({ isOpen, onClose, paper }: PaperViewerProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Lock background scroll
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(".viewer-content", 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div 
          className="viewer-content relative w-full max-w-6xl h-[90vh] flex flex-col items-center bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header UI */}
          <div className="w-full flex justify-between items-center px-6 py-4 bg-zinc-800/50 border-b border-white/5">
            <div className="space-y-1">
              <h3 className="text-brand-pink font-display font-bold text-sm md:text-lg uppercase tracking-tight leading-none">
                {paper.title}
              </h3>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">
                Interactive PDF Previewer
              </p>
            </div>
            <button 
              onClick={onClose}
              className="group flex items-center gap-2 text-white/50 hover:text-brand-pink transition-colors cursor-pointer"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">Close [ESC]</span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-pink/50">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </div>
            </button>
          </div>

          {/* PDF Embed Container */}
          <div className="relative flex-1 w-full bg-zinc-950">
            <iframe
              src={`${paper.fileUrl}#toolbar=0&navpanes=0&scrollbar=1`}
              className="w-full h-full border-none"
              title="Manuscript Viewer"
            />
          </div>

          {/* Footer Action */}
          <div className="w-full p-4 bg-zinc-800/30 border-t border-white/5 flex justify-center">
             <a 
               href={paper.fileUrl}
               download 
               className="px-8 py-3 bg-brand-pink text-white font-display font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-lg active:scale-95"
             >
                Download Full PDF
             </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};