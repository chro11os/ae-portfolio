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

  // Filter out Behance and GitHub from social links
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
    <Section className="flex flex-col items-center justify-center relative overflow-hidden h-screen w-full px-6">
      
      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        
        {/* --- TITLE --- */}
        <div className="text-center space-y-4 mb-10">
            <FadeIn direction="down" delay={0.1}>
                <BigDisplay className="text-[10vw] md:text-[8vw] leading-[0.85] text-brand-pink drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
                    {contact.heading}
                </BigDisplay>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
                <BodyText className="text-brand-text/70 text-lg md:text-2xl font-medium">
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
                
                {/* --- ACTION BUTTONS WITH SHEEN --- */}
                <div className="flex flex-col md:flex-row gap-4 mt-2">
                    <MagneticWrapper strength={0.1}>
                        <motion.button 
                            whileHover="hover"
                            type="submit"
                            className="group relative w-full bg-brand-pink text-white font-display font-bold text-lg uppercase tracking-widest py-5 rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
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
                            className="group relative w-full bg-white/40 backdrop-blur-xl border border-white/40 text-brand-text font-display font-bold text-sm uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-brand-pink/30 hover:shadow-[0_0_20px_rgba(240,74,117,0.15)]"
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

            {/* --- UPDATED SOCIAL TEXT LINKS --- */}
            <div className="mt-12 flex justify-center gap-10">
                {filteredSocials.map((social, index) => (
                    <FadeIn key={social.label} delay={0.5 + (index * 0.1)} direction="up">
                        <MagneticWrapper strength={0.3}>
                            <a href={social.url} target="_blank" rel="noopener noreferrer" 
                               className="text-brand-text/40 font-display font-bold text-xs md:text-sm uppercase tracking-[0.2em] hover:text-brand-pink transition-colors p-2 block">
                                {social.label}
                            </a>
                        </MagneticWrapper>
                    </FadeIn>
                ))}
            </div>
        </FadeIn>
      </div>

      {/* --- FOOTER COPYRIGHT --- */}
      <div className="absolute bottom-8 w-full flex justify-center opacity-30">
          <p className="text-xs tracking-widest uppercase font-bold">{contact.copyright}</p>
      </div>
    </Section>
  );
};