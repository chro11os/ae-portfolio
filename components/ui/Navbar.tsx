"use client";
import React, { useRef } from "react";

// Navigation Items Configuration
const navItems = [
  { id: "landing", label: "Home", icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
  { id: "about", label: "About", icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" /> },
  { id: "education", label: "Education", icon: <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" /> },
  { id: "skills", label: "Skills", icon: <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3" /> },
  { id: "works", label: "Works", icon: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /> },
  { id: "papers", label: "Papers", icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" /> },
  { id: "contact", label: "Contact", icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6" /> },
];

export const Navbar = () => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // --- DOCK MAGNIFICATION: scale each button by horizontal distance to the cursor ---
  const handleMouseMove = (e: React.MouseEvent) => {
    const maxDistance = 150;
    buttonRefs.current.forEach((btn) => {
      if (!btn || btn.offsetWidth < 40) return; // still expanding — its position isn't final yet
      const rect = btn.getBoundingClientRect();
      const distance = Math.abs(e.clientX - (rect.left + rect.width / 2));
      const scale = distance < maxDistance ? 1 + Math.sin((1 - distance / maxDistance) * Math.PI / 2) * 0.6 : 1;
      btn.style.transform = `scale(${scale})`;
    });
  };

  const handleMouseLeave = () => {
    buttonRefs.current.forEach((btn) => {
      if (btn) btn.style.transform = "";
    });
  };

  // --- SCROLL HELPER ---
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hidden md:block fixed z-[100] top-8 left-8">
      {/* Collapsed to the menu icon; hover (or keyboard focus) slides the section buttons out to the right */}
      <nav aria-label="Sections" className="group/nav" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="flex items-end p-3 rounded-2xl surface-raised">
          <button
            aria-label="Open navigation"
            className="w-12 h-12 rounded-2xl flex items-center justify-center hover:surface-inset transition-[background,box-shadow]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6 text-brand-text/70 group-hover/nav:text-brand-pink transition-colors">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {navItems.map((item, index) => (
            <NavButton
              key={item.id}
              ref={(el) => { buttonRefs.current[index] = el }}
              item={item}
              onClick={() => scrollToSection(item.id)}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

// --- NAV BUTTON ---
interface NavButtonProps {
  item: { id: string; label: string; icon: React.ReactNode };
  onClick: () => void;
}

const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(({ item, onClick }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="
                group relative 
                h-12 rounded-2xl 
                flex items-center justify-center 
                hover:surface-inset
                origin-bottom 
                /* collapsed: zero width, invisible; expanded when the nav is hovered or focused */
                w-0 ml-0 opacity-0 pointer-events-none
                group-hover/nav:w-12 group-hover/nav:ml-2 group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto
                group-focus-within/nav:w-12 group-focus-within/nav:ml-2 group-focus-within/nav:opacity-100 group-focus-within/nav:pointer-events-auto
                transition-[width,margin,opacity,background,box-shadow,transform] duration-200 ease-out
            "
    >
      <span className={`
                absolute left-1/2 -translate-x-1/2 
                px-2 py-1 
                bg-brand-text shadow-md text-white text-[10px] uppercase font-bold tracking-widest rounded-md
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                whitespace-nowrap
                z-50
                top-full mt-2
            `}>
        {item.label}
      </span>
      <svg
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="w-6 h-6 shrink-0 text-brand-text/70 group-hover:text-brand-pink transition-colors pointer-events-none"
      >
        {item.icon}
      </svg>
    </button>
  )
});
NavButton.displayName = "NavButton";