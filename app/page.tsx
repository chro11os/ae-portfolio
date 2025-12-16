import { Landing } from "../components/pages/Landing";
import { About } from "../components/pages/About";
import { Education } from "../components/pages/Education"; // <--- Import

export default function Home() {
  return (
    <main className="snap-container">
      
      {/* Slide 1: Landing */}
      <Landing />

      {/* Slide 2: About */}
      <About />

      {/* Slide 3: Education */}
      <Education />

      {/* Slide 4 Placeholder */}
      <section className="snap-section flex items-center justify-center border-t border-brand-text/10">
        <h2 className="text-brand-text/20 font-display text-4xl">Coming Soon: Skills</h2>
      </section>

    </main>
  );
}