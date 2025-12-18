"use client";
import React, { useState } from "react";
import { Section } from "../../ui/Section";
import { BigDisplay, BodyText } from "../../ui/Typography";
import { FadeIn } from "../../ui/FadeIn";
import { portfolioConfig } from "../../../config/portfolio";
import { Magnetic } from "../../ui/Magnetic";
import { Input, TextArea } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useContactForm } from "../../../hooks/useContactForm";

export const ContactDesktop = () => {
  const { contact } = portfolioConfig;
  const { formData, handleChange, handleSubmit, filteredSocials } = useContactForm(contact);

  return (
    <Section className="flex flex-col items-center justify-between relative overflow-hidden w-full px-6 py-12 md:py-20">
      
      {/* 1. TOP & MIDDLE CONTENT WRAPPER */}
      <div className="z-10 w-full max-w-4xl flex flex-col items-center justify-center flex-grow">
        
        {/* --- TITLE: Tightened spacing --- */}
        <div className="text-center space-y-4 mb-12">
            <FadeIn direction="down" delay={0.1}>
                <BigDisplay className="text-[clamp(3.5rem,8vw,8rem)] leading-[0.8] text-brand-pink drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
                    {contact.heading}
                </BigDisplay>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
                <BodyText className="text-brand-text/60 text-xl font-medium tracking-tight">
                    {contact.subHeading}
                </BodyText>
            </FadeIn>
        </div>

        {/* --- FORM & ACTION BUTTONS --- */}
        <FadeIn direction="up" delay={0.4} className="w-full max-w-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    <Input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="Name" 
                        value={formData.name} 
                        onChange={handleChange}
                        className="flex-1"
                        rounded="2xl"
                    />
                    <Input 
                        type="text" 
                        name="subject" 
                        required 
                        placeholder="Subject" 
                        value={formData.subject} 
                        onChange={handleChange}
                        className="flex-1"
                        rounded="2xl"
                    />
                </div>
                <TextArea 
                    name="message" 
                    required 
                    rows={4} 
                    placeholder="Message" 
                    value={formData.message} 
                    onChange={handleChange}
                    rounded="2xl"
                />
                
                <div className="flex flex-row gap-4 mt-2">
                    <Magnetic strength={0.1} className="w-full">
                        <Button 
                            type="submit"
                            variant="primary"
                            size="lg"
                            rounded="2xl"
                            className="w-full shadow-lg"
                        >
                            Send Message
                        </Button>
                    </Magnetic>

                    <Magnetic strength={0.15} className="w-full">
                        <Button
                            href="/downloadable-documents/Gatchalian_Resume.pdf"
                            download="Gatchalian_Resume.pdf"
                            variant="secondary"
                            size="lg"
                            rounded="2xl"
                            className="w-full hover:border-brand-pink/30 hover:shadow-[0_0_20px_rgba(240,74,117,0.15)] group"
                        >
                            <span className="group-hover:text-brand-pink transition-colors">Download CV</span>
                        </Button>
                    </Magnetic>
                </div>
            </form>

            {/* --- SOCIAL LINKS: Improved top margin --- */}
            <div className="mt-24 flex justify-center gap-12">
                {filteredSocials.map((social, index) => (
                    <FadeIn key={social.label} delay={0.5 + (index * 0.1)} direction="up">
                        <Magnetic strength={0.3}>
                            <a href={social.url} target="_blank" rel="noopener noreferrer" 
                               className="text-brand-text/30 font-display font-bold text-xs uppercase tracking-[0.3em] hover:text-brand-pink transition-all p-2 block">
                                 {social.label}
                            </a>
                        </Magnetic>
                    </FadeIn>
                ))}
            </div>
        </FadeIn>
      </div>

      {/* --- FOOTER: Credits & Copyright --- */}
      <div className="w-full flex flex-col items-center gap-10 pb-4">
          <FadeIn delay={0.7} className="flex flex-row justify-center items-center gap-16">
              <div className="text-right">
                  <span className="block text-[9px] text-brand-text/30 uppercase tracking-[0.4em] mb-1.5">Web Designer</span>
                  <span className="font-display font-bold text-xs text-brand-pink uppercase tracking-widest">
                    Jaon Ae-dam Gatchalian
                  </span>
              </div>
              <div className="block w-px h-8 bg-brand-text/5" />
              <div className="text-left">
                  <span className="block text-[9px] text-brand-text/30 uppercase tracking-[0.4em] mb-1.5">Web Developer</span>
                  <span className="font-display font-bold text-xs text-brand-pink uppercase tracking-widest">
                    Neil Brags Guzman
                  </span>
              </div>
          </FadeIn>

          <div className="opacity-20">
              <p className="text-[10px] tracking-[0.5em] uppercase font-bold">{contact.copyright}</p>
          </div>
      </div>
    </Section>
  );
};
