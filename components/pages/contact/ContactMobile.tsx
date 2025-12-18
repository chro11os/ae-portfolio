"use client";
import React, { useState } from "react";
import { Section } from "../../ui/Section";
import { BigDisplay, BodyText } from "../../ui/Typography";
import { FadeIn } from "../../ui/FadeIn";
import { portfolioConfig } from "../../../config/portfolio";
import { Input, TextArea } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useContactForm } from "../../../hooks/useContactForm";

export const ContactMobile = () => {
  const { contact } = portfolioConfig;
  const { formData, handleChange, handleSubmit, filteredSocials } = useContactForm(contact);

  return (
    <Section className="flex flex-col items-center justify-between relative overflow-hidden min-h-[100dvh] w-full px-5 py-8">
      
      {/* 1. TOP & MIDDLE CONTENT WRAPPER */}
      <div className="z-10 w-full flex flex-col items-center justify-center flex-grow mt-4">
        
        {/* --- TITLE --- */}
        <div className="text-center space-y-2 mb-8">
            <FadeIn direction="down" delay={0.1}>
                <BigDisplay className="text-[clamp(3rem,14vw,6rem)] leading-[0.8] text-brand-pink drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
                    {contact.heading}
                </BigDisplay>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
                <BodyText className="text-brand-text/60 text-base font-medium tracking-tight whitespace-pre-wrap">
                    {contact.subHeading}
                </BodyText>
            </FadeIn>
        </div>

        {/* --- FORM & ACTION BUTTONS --- */}
        <FadeIn direction="up" delay={0.4} className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={handleChange}
                    rounded="xl"
                    className="text-sm"
                />
                <Input 
                    type="text" 
                    name="subject" 
                    required 
                    placeholder="Subject" 
                    value={formData.subject} 
                    onChange={handleChange}
                    rounded="xl"
                    className="text-sm"
                />
                <TextArea 
                    name="message" 
                    required 
                    rows={4} 
                    placeholder="Message" 
                    value={formData.message} 
                    onChange={handleChange}
                    rounded="xl"
                    className="text-sm"
                />
                
                <div className="flex flex-col gap-3 mt-1">
                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        rounded="xl"
                        className="w-full"
                    >
                        Send Message
                    </Button>

                    <Button
                        href="/downloadable-documents/Gatchalian_Resume.pdf"
                        download="Gatchalian_Resume.pdf"
                        variant="secondary"
                        size="md"
                        rounded="xl"
                        className="w-full active:bg-white/60"
                    >
                        Download CV
                    </Button>
                </div>
            </form>

            {/* --- SOCIAL LINKS --- */}
            <div className="mt-8 flex justify-center gap-8">
                {filteredSocials.map((social, index) => (
                    <FadeIn key={social.label} delay={0.5 + (index * 0.1)} direction="up">
                        <a href={social.url} target="_blank" rel="noopener noreferrer" 
                           className="text-brand-text/40 font-display font-bold text-[10px] uppercase tracking-[0.3em] active:text-brand-pink transition-all p-2 block">
                             {social.label}
                        </a>
                    </FadeIn>
                ))}
            </div>
        </FadeIn>
      </div>

      {/* --- FOOTER: Credits & Copyright --- */}
      <div className="w-full flex flex-col items-center gap-6 pb-2">
          <FadeIn delay={0.7} className="flex flex-row justify-between w-full max-w-xs px-4">
              <div className="text-center">
                  <span className="block text-[8px] text-brand-text/30 uppercase tracking-[0.3em] mb-1">Web Designer</span>
                  <span className="font-display font-bold text-[10px] text-brand-pink uppercase tracking-widest">
                    AE-DAM
                  </span>
              </div>
              <div className="w-px h-6 bg-brand-text/10" />
              <div className="text-center">
                  <span className="block text-[8px] text-brand-text/30 uppercase tracking-[0.3em] mb-1">Web Developer</span>
                  <span className="font-display font-bold text-[10px] text-brand-pink uppercase tracking-widest">
                    Neil Brags
                  </span>
              </div>
          </FadeIn>

          <div className="opacity-20">
              <p className="text-[9px] tracking-[0.3em] uppercase font-bold">{contact.copyright}</p>
          </div>
      </div>
    </Section>
  );
};
