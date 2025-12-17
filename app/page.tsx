"use client";
import { Landing } from "../components/pages/Landing";
import { About } from "../components/pages/About";
import { Education } from "../components/pages/Education";
import { Skills } from "../components/pages/Skills";
import { Works } from "../components/pages/Works";
import { Papers } from "../components/pages/Papers";
import { Contact } from "../components/pages/Contact"; 
import { Preloader } from "@/components/ui/Preloader"; // IMPORTED

export default function Home() {
  return (
    <main className="w-full relative">
      {/* 1. Preloader goes first so it sits on top */}
      <Preloader />

      {/* 2. Main Content */}
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