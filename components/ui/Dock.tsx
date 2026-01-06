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
      flex items-center gap-1 p-1 
      bg-white/5 backdrop-blur-md 
      border border-white/10 
      shadow-lg
      rounded-full
      w-max
    ">
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="relative px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-colors duration-300"
          >
            {/* Active Background - Slim Highlight */}
            {isActive && (
              <motion.div
                layoutId="dock-active"
                className="absolute inset-0 bg-white/10 border border-white/5 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Label */}
            <span className={`relative z-10 font-display tracking-widest uppercase ${isActive ? "text-brand-pink" : "text-brand-text/50 hover:text-brand-text/80"}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};