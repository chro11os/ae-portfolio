"use client";
import { Landing } from "../components/pages/Landing";
import { About } from "../components/pages/about/About"; 
import { Education } from "../components/pages/education/Education";
import { Skills } from "../components/pages/Skills";
import { Works } from "../components/pages/Works";
import { Papers } from "../components/pages/Papers";
import { Contact } from "../components/pages/Contact"; 
import { Preloader } from "@/components/ui/Preloader"; 

export default function Home() {
  return (
    <main className="
      w-full 
      h-screen 
      overflow-y-auto 
      overflow-x-hidden 
      snap-y 
      snap-mandatory 
      scroll-smooth 
      relative
    ">
      <Preloader />
      
      {/* FIX: We wrap each component in a section with:
        1. id="..." -> So the Navbar knows where to scroll.
        2. snap-start -> So the scrolling locks here.
        3. w-full -> Ensures it takes full width.
      */}

      <section id="landing" className="w-full snap-start snap-always">
        <Landing />
      </section>

      <section id="about" className="w-full snap-start snap-always">
        <About />
      </section>

      <section id="education" className="w-full snap-start snap-always">
        <Education />
      </section>

      <section id="skills" className="w-full snap-start snap-always">
        <Skills />
      </section>

      <section id="works" className="w-full snap-start snap-always">
        <Works />
      </section>

      <section id="papers" className="w-full snap-start snap-always">
        <Papers />
      </section>

      <section id="contact" className="w-full snap-start snap-always">
        <Contact />
      </section>

    </main>
  );
}