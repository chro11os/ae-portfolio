"use client";
import React from "react";
import { motion } from "framer-motion";

interface DockProps {
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const Dock = ({ items, activeId, onSelect }: DockProps) => {
  return (
    <div className="
      flex items-center gap-2 p-2 
      bg-white/10 backdrop-blur-xl 
      border border-white/20 
      shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]
      rounded-full
    ">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="relative px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold transition-colors duration-300"
          >
            {/* Active Background Pill */}
            {isActive && (
              <motion.div
                layoutId="dock-active"
                className="absolute inset-0 bg-brand-pink rounded-full shadow-[0_0_20px_rgba(240,74,117,0.5)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Label */}
            <span className={`relative z-10 font-display tracking-wide uppercase ${isActive ? "text-white" : "text-brand-text/60 hover:text-brand-pink"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};