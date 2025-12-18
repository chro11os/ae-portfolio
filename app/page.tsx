"use client";
import { Landing } from "../components/pages/Landing";
import { About } from "../components/pages/about/About"; 
import { Education } from "../components/pages/education/Education";
import { Skills } from "../components/pages/skills/Skills";
import { Works } from "../components/pages/works/Works";
import { Papers } from "../components/pages/papers/Papers";
import { Contact } from "../components/pages/contact/Contact"; 
import { Preloader } from "@/components/ui/Preloader"; 

export default function Home() {
  return (
    <main className="
      w-full 
      h-screen 
      overflow-y-auto 
      overflow-x-hidden 
      lg:snap-y 
      lg:snap-mandatory 
      scroll-smooth 
      relative
    ">
      <Preloader />
      
      {/* FIX: We wrap each component in a section with:
        1. id="..." -> So the Navbar knows where to scroll.
        2. snap-start -> So the scrolling locks here.
        3. w-full -> Ensures it takes full width.
      */}

      <section id="landing" className="w-full lg:snap-start lg:snap-always">
        <Landing />
      </section>

      <section id="about" className="w-full lg:snap-start lg:snap-always">
        <About />
      </section>

      <section id="education" className="w-full lg:snap-start lg:snap-always">
        <Education />
      </section>

      <section id="skills" className="w-full lg:snap-start lg:snap-always">
        <Skills />
      </section>

      <section id="works" className="w-full lg:snap-start lg:snap-always">
        <Works />
      </section>

      <section id="papers" className="w-full lg:snap-start lg:snap-always">
        <Papers />
      </section>

      <section id="contact" className="w-full lg:snap-start lg:snap-always">
        <Contact />
      </section>

    </main>
  );
}