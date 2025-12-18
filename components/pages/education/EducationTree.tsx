"use client";
import React from "react";
import { portfolioConfig } from "../../../config/portfolio";
import { FadeIn } from "../../ui/FadeIn"; // Importing your persistent component

interface EducationTreeProps {
  items: typeof portfolioConfig.education.items;
  selectedId: string;
  onSelect: (id: string) => void;
  university: string;
}

export const EducationTree = ({ items, selectedId, onSelect, university }: EducationTreeProps) => {
  return (
    <div className="col-span-4 flex flex-col justify-start pl-4 relative">
      
      {/* UNIVERSITY HEADER - Persistent Fade In */}
      <FadeIn direction="right" delay={0.1} className="mb-8">
        <div className="inline-block border-b-4 border-brand-pink pb-2 pr-12">
          <h3 className="font-display font-bold text-brand-pink text-2xl tracking-[0.1em] uppercase">
            {university}
          </h3>
        </div>
      </FadeIn>

      {/* TREE STRUCTURE */}
      <div className="relative">
        {/* TREE LINE - Persistent Fade In */}
        <FadeIn direction="up" duration={1} className="absolute left-6 top-0 bottom-12 w-[3px] -translate-x-1/2 z-0">
             <div className="w-full h-full bg-brand-pink/30" />
        </FadeIn>

        <div className="space-y-8 relative z-10">
          {items.map((item, index) => {
            const isActive = selectedId === item.id;
            return (
              // WRAP EACH ITEM IN FADEIN FOR PERSISTENT SCROLL ANIMATION
              <FadeIn 
                key={item.id} 
                direction="left" 
                delay={index * 0.1} 
                className="relative"
              >
                <div
                  onClick={() => onSelect(item.id)}
                  className="group relative pl-16 cursor-pointer flex items-center"
                >
                  {/* DOT */}
                  <div
                    className={`absolute left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full transition-all duration-300 z-10 -translate-x-1/2
                      ${isActive
                        ? "bg-brand-pink scale-150 shadow-[0_0_15px_rgba(240,74,117,0.8)]"
                        : "bg-brand-pink/40 group-hover:bg-brand-pink"
                      }
                    `}
                  />

                  {/* TEXT LABEL */}
                  <h4
                    className={`font-display font-bold text-lg uppercase tracking-wider transition-all duration-300
                      ${isActive
                        ? "text-brand-text translate-x-2 text-xl"
                        : "text-brand-text/40 group-hover:text-brand-text/70"
                      }
                    `}
                  >
                    {item.title}
                  </h4>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
};