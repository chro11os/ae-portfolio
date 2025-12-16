import { Landing } from "../components/pages/Landing";
import { About } from "../components/pages/About";
import { Education } from "../components/pages/Education";
import { Skills } from "../components/pages/Skills";
import { Works } from "../components/pages/Works";

export default function Home() {
  return (
    <main className="w-full relative">
      <Landing />
      <About />
      <Education />
      <Skills />
      <Works />
    </main>
  );
}