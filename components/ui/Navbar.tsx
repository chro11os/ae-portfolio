"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GlassCard } from "./GlassCard";

// Navigation Items Configuration
const navItems = [
  { id: "landing", label: "Home", icon: (
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> 
  )},
  { id: "about", label: "About", icon: (
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
  )},
  { id: "education", label: "Education", icon: (
    <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />
  )},
  { id: "skills", label: "Skills", icon: (
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3" />
  )},
  { id: "works", label: "Works", icon: (
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  )},
  { id: "papers", label: "Papers", icon: (
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />
  )},
  { id: "contact", label: "Contact", icon: (
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" />
  )},
];

export const Navbar = () => {
  const [isLanding, setIsLanding] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // --- 1. GSAP DOCK MAGNIFICATION LOGIC ---
  useGSAP(() => {
    const buttons = buttonRefs.current;
    const container = containerRef.current;
    
    // Only run if we have elements
    if (!container || buttons.length === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.clientX;

        buttons.forEach((btn) => {
            if (!btn) return;

            // Get the center X position of the button
            const rect = btn.getBoundingClientRect();
            const btnCenterX = rect.left + rect.width / 2;
            
            // Calculate distance from mouse to button center
            const distance = Math.abs(mouseX - btnCenterX);
            
            // MATH: Gaussian-like curve for smooth scaling
            // Max influence distance: 150px
            // Max scale: 1.5x
            const maxDistance = 150;
            let scale = 1;

            if (distance < maxDistance) {
                // Normalize distance (0 = center, 1 = edge of influence)
                const val = 1 - distance / maxDistance;
                // Apply sine ease for smoother "hump" shape
                scale = 1 + (Math.sin(val * Math.PI / 2)) * 0.6; 
            }

            // Apply to GSAP
            gsap.to(btn, {
                scale: scale,
                duration: 0.1, // Very snappy
                overwrite: "auto",
            });
        });
    };

    const handleMouseLeave = () => {
        // Reset all buttons to scale 1
        buttons.forEach((btn) => {
            if (btn) {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            }
        });
    };

    // Attach listeners
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };

  }, { scope: containerRef }); // Scope to this component


  // --- 2. SCROLL STATE LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.5;
      setIsLanding(window.scrollY < threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // --- 3. SCROLL HELPER ---
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id); 
    if (!element) {
        const index = navItems.findIndex(item => item.id === id);
        window.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
    } else {
        element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    {/* Motion Div handles the Layout Position (Bottom -> Top Left) */}
    <motion.div
      layout
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 20 
      }}
      className={`
        fixed z-[100] 
        ${isLanding 
          ? "bottom-[15%] left-1/2 -translate-x-1/2" // Center Bottom
          : "top-6 left-6 md:top-8 md:left-8"         // Top Left
        }
      `}
    >
      {/* Container Ref attached here for GSAP mouse listeners 
        Removed 'scale' from parent classes so it doesn't conflict with button scaling
      */}
      <div ref={containerRef}> 
        <GlassCard className="
          flex items-end gap-2 p-3 rounded-2xl
          bg-white/10 backdrop-blur-2xl border border-white/20
          shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)]
        ">
          {navItems.map((item, index) => (
            <NavButton 
              key={item.id} 
              // Store ref in array
              ref={(el) => { buttonRefs.current[index] = el }}
              item={item} 
              onClick={() => scrollToSection(item.id)}
              isLanding={isLanding} 
            />
          ))}
        </GlassCard>
      </div>
    </motion.div>
    </>
  );
};

// --- SUB-COMPONENT: NAV BUTTON ---
// ForwardRef needed to let parent access the DOM element for GSAP
const NavButton = React.forwardRef<HTMLButtonElement, { item: any, onClick: () => void, isLanding: boolean }>(
  ({ item, onClick, isLanding }, ref) => {
    return (
        <button
            ref={ref}
            onClick={onClick}
            // Removed Framer 'whileHover' scale to avoid conflict with GSAP
            className="
                group relative 
                w-10 h-10 md:w-12 md:h-12 
                rounded-2xl 
                flex items-center justify-center 
                transition-colors duration-300
                hover:bg-white/20
                origin-bottom 
            "
        >
            {/* Tooltip Label */}
            <span className={`
                absolute left-1/2 -translate-x-1/2 
                px-2 py-1 
                bg-black/80 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest rounded-md
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                whitespace-nowrap
                z-50
                ${isLanding 
                  ? "-top-10" // On Landing: Text is ABOVE
                  : "top-full mt-2" // On Top Left: Text is BELOW
                }
            `}>
                {item.label}
            </span>

            {/* Icon */}
            <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-5 h-5 md:w-6 md:h-6 text-brand-text/70 group-hover:text-brand-pink transition-colors pointer-events-none"
            >
                {item.icon}
            </svg>
        </button>
    )
  }
);

NavButton.displayName = "NavButton";