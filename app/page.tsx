"use client";
import { Landing } from "../components/pages/Landing";
// UPDATED IMPORT PATH:
import { About } from "../components/pages/about/About"; 
import { Education } from "../components/pages/education/Education";
import { Skills } from "../components/pages/Skills";
import { Works } from "../components/pages/Works";
import { Papers } from "../components/pages/Papers";
import { Contact } from "../components/pages/Contact"; 
import { Preloader } from "@/components/ui/Preloader"; 

export default function Home() {
  return (
    <main className="w-full relative">
      <Preloader />
      <Landing />
      <About />
      <Education />
      <Skills />
      <Works />
      <Papers />
      <Contact />
    </main>
  );
}