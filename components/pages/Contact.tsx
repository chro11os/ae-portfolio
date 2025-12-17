"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Section } from "../ui/Section";
import { BigDisplay, BodyText } from "../ui/Typography";
import { FadeIn } from "../ui/FadeIn";
import { portfolioConfig } from "../../config/portfolio";

// --- HELPER: LOCAL MAGNETIC WRAPPER ---
const MagneticWrapper = ({ children, strength = 0.5 }: { children: React.ReactNode, strength?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        const el = ref.current;
        if (!el) return;
        const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            xTo((clientX - centerX) * strength);
            yTo((clientY - centerY) * strength);
        };
        const handleMouseLeave = () => { xTo(0); yTo(0); };
        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, { scope: ref });
    return <div ref={ref} className="inline-block w-full">{children}</div>;
};

export const Contact = () => {
  const { contact } = portfolioConfig;
  const [formData, setFormData] = useState({ name: "", subject: "", message: "" });

  const filteredSocials = contact.socials.filter(
    (social) => !["behance", "github"].includes(social.label.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, subject, message } = formData;
    const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Section className="flex flex-col items-center justify-between relative overflow-hidden h-screen w-full px-6 py-12 md:py-20">
      
      {/* 1. TOP & MIDDLE CONTENT WRAPPER */}
      <div className="z-10 w-full max-w-4xl flex flex-col items-center justify-center flex-grow">
        
        {/* --- TITLE: Tightened spacing --- */}
        <div className="text-center space-y-2 md:space-y-4 mb-8 md:mb-12">
            <FadeIn direction="down" delay={0.1}>
                <BigDisplay className="text-[12vw] md:text-[8vw] leading-[0.8] text-brand-pink drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
                    {contact.heading}
                </BigDisplay>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
                <BodyText className="text-brand-text/60 text-base md:text-xl font-medium tracking-tight">
                    {contact.subHeading}
                </BodyText>
            </FadeIn>
        </div>

        {/* --- FORM & ACTION BUTTONS --- */}
        <FadeIn direction="up" delay={0.4} className="w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <input type="text" name="name" required placeholder="Name" value={formData.name} onChange={handleChange}
                        className="flex-1 bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-4 text-brand-text placeholder:text-brand-text/30 focus:outline-none focus:border-brand-pink/50 transition-all" />
                    <input type="text" name="subject" required placeholder="Subject" value={formData.subject} onChange={handleChange}
                        className="flex-1 bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-4 text-brand-text placeholder:text-brand-text/30 focus:outline-none focus:border-brand-pink/50 transition-all" />
                </div>
                <textarea name="message" required rows={4} placeholder="Message" value={formData.message} onChange={handleChange}
                    className="w-full bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl px-6 py-4 text-brand-text placeholder:text-brand-text/30 focus:outline-none focus:border-brand-pink/50 transition-all resize-none" />
                
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <MagneticWrapper strength={0.1}>
                        <motion.button 
                            whileHover="hover"
                            type="submit"
                            className="group relative w-full bg-brand-pink text-white font-display font-bold text-base md:text-lg uppercase tracking-widest py-4 md:py-5 rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
                        >
                            <span className="relative z-10">Send Message</span>
                            <motion.div 
                                variants={{ hover: { x: ["-100%", "200%"] } }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%]"
                            />
                        </motion.button>
                    </MagneticWrapper>

                    <MagneticWrapper strength={0.15}>
                        <motion.a 
                            whileHover="hover"
                            href="/downloadable-documents/Gatchalian_Resume.pdf" 
                            download="Gatchalian_Resume.pdf"
                            className="group relative w-full bg-white/40 backdrop-blur-xl border border-white/40 text-brand-text font-display font-bold text-xs md:text-sm uppercase tracking-widest py-4 md:py-5 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-brand-pink/30 hover:shadow-[0_0_20px_rgba(240,74,117,0.15)]"
                        >
                            <span className="relative z-10 group-hover:text-brand-pink transition-colors">Download CV</span>
                            <motion.div 
                                variants={{ hover: { x: ["-100%", "200%"] } }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-100%]"
                            />
                        </motion.a>
                    </MagneticWrapper>
                </div>
            </form>

            {/* --- SOCIAL LINKS: Improved top margin --- */}
            <div className="mt-16 md:mt-24 flex justify-center gap-8 md:gap-12">
                {filteredSocials.map((social, index) => (
                    <FadeIn key={social.label} delay={0.5 + (index * 0.1)} direction="up">
                        <MagneticWrapper strength={0.3}>
                            <a href={social.url} target="_blank" rel="noopener noreferrer" 
                               className="text-brand-text/30 font-display font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] hover:text-brand-pink transition-all p-2 block">
                                 {social.label}
                            </a>
                        </MagneticWrapper>
                    </FadeIn>
                ))}
            </div>
        </FadeIn>
      </div>

      {/* --- FOOTER: Credits & Copyright --- */}
      <div className="w-full flex flex-col items-center gap-8 md:gap-10 pb-4">
          <FadeIn delay={0.7} className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
              <div className="text-center md:text-right">
                  <span className="block text-[8px] md:text-[9px] text-brand-text/30 uppercase tracking-[0.4em] mb-1.5">Web Designer</span>
                  <span className="font-display font-bold text-[10px] md:text-xs text-brand-pink uppercase tracking-widest">
                    Jaon Ae-dam Gatchalian
                  </span>
              </div>
              <div className="hidden md:block w-px h-8 bg-brand-text/5" />
              <div className="text-center md:text-left">
                  <span className="block text-[8px] md:text-[9px] text-brand-text/30 uppercase tracking-[0.4em] mb-1.5">Web Developer</span>
                  <span className="font-display font-bold text-[10px] md:text-xs text-brand-pink uppercase tracking-widest">
                    Neil Brags Guzman
                  </span>
              </div>
          </FadeIn>

          <div className="opacity-20">
              <p className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold">{contact.copyright}</p>
          </div>
      </div>
    </Section>
  );
};