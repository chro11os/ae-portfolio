"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { BigDisplay, BodyText } from "../ui/Typography";
import { FadeIn } from "../ui/FadeIn";
import { portfolioConfig } from "../../config/portfolio";

export const Contact = () => {
  const { contact } = portfolioConfig;

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: ""
  });

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, subject, message } = formData;
    const mailtoLink = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Section className="flex flex-col items-center justify-center relative overflow-hidden h-screen w-full px-6">

      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8 mb-20 md:mb-0">
        
        {/* --- TITLE: REACH OUT! --- */}
        <div className="text-center space-y-4 mb-2">
            <FadeIn direction="down" delay={0.1}>
                {/* UPDATES:
                   1. Removed motion.div wrapper (No more floating animation)
                   2. Reduced text size from 15vw to 10vw/8vw
                */}
                <BigDisplay 
                    className="
                        text-[10vw] md:text-[8vw] 
                        leading-[0.85] 
                        text-brand-pink 
                        drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]
                        filter
                    "
                >
                    {contact.heading}
                </BigDisplay>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
                <BodyText className="text-brand-text/70 text-lg md:text-2xl whitespace-pre-line font-medium">
                    {contact.subHeading}
                </BodyText>
            </FadeIn>
        </div>

        {/* --- CONTACT FORM --- */}
        <FadeIn direction="up" delay={0.4} className="w-full max-w-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            
            {/* Top Row: Name & Subject */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-2">
                    <label className="text-xs font-bold text-brand-text/50 uppercase tracking-widest pl-2">Name</label>
                    <input 
                        type="text" 
                        name="name"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="
                            w-full 
                            bg-white/40 backdrop-blur-xl 
                            border border-white/40 
                            shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]
                            rounded-2xl px-6 py-4 
                            text-brand-text placeholder:text-brand-text/30 
                            focus:outline-none focus:border-brand-pink/50 focus:bg-white/60 
                            transition-all duration-300
                        "
                    />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <label className="text-xs font-bold text-brand-text/50 uppercase tracking-widest pl-2">Subject</label>
                    <input 
                        type="text" 
                        name="subject"
                        required
                        placeholder="Project Inquiry"
                        value={formData.subject}
                        onChange={handleChange}
                        className="
                            w-full 
                            bg-white/40 backdrop-blur-xl 
                            border border-white/40 
                            shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]
                            rounded-2xl px-6 py-4 
                            text-brand-text placeholder:text-brand-text/30 
                            focus:outline-none focus:border-brand-pink/50 focus:bg-white/60 
                            transition-all duration-300
                        "
                    />
                </div>
            </div>

            {/* Message Area */}
            <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-brand-text/50 uppercase tracking-widest pl-2">Message</label>
                <textarea 
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    className="
                        w-full 
                        bg-white/40 backdrop-blur-xl 
                        border border-white/40 
                        shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]
                        rounded-2xl px-6 py-4 
                        text-brand-text placeholder:text-brand-text/30 
                        focus:outline-none focus:border-brand-pink/50 focus:bg-white/60 
                        transition-all duration-300 resize-none
                    "
                />
            </div>

            {/* Submit Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="
                    mt-4 w-full 
                    bg-brand-pink text-white 
                    font-display font-bold text-lg uppercase tracking-widest 
                    py-5 rounded-2xl 
                    shadow-[0_10px_20px_-5px_rgba(240,74,117,0.4)] 
                    hover:shadow-[0_20px_40px_-10px_rgba(240,74,117,0.6)] 
                    hover:bg-brand-pink/90 
                    transition-all duration-300
                "
            >
                Send Message
            </motion.button>

          </form>
        </FadeIn>

      </div>

      {/* --- FOOTER --- */}
      <div className="absolute bottom-8 left-0 right-0 px-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 z-20">
        
        {/* Social Links */}
        <div className="flex gap-8">
          {contact.socials.map((social, index) => (
            <FadeIn key={social.label} delay={0.5 + (index * 0.1)} direction="up">
              <a 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-display font-bold text-sm md:text-base text-brand-text/50 uppercase tracking-widest hover:text-brand-pink transition-colors duration-300"
              >
                {social.label}
              </a>
            </FadeIn>
          ))}
        </div>

        {/* Copyright */}
        <FadeIn delay={0.8}>
          <p className="font-sans text-xs md:text-sm text-brand-text/30 font-medium tracking-wide">
            {contact.copyright}
          </p>
        </FadeIn>
      </div>

    </Section>
  );
};