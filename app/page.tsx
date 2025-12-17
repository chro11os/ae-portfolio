import { Landing } from "../components/pages/Landing";
import { About } from "../components/pages/About";
import { Education } from "../components/pages/Education";
import { Skills } from "../components/pages/Skills";
import { Works } from "../components/pages/Works";
import { Papers } from "../components/pages/Papers";
import { Contact } from "../components/pages/Contact"; // Import

export default function Home() {
  return (
    <main className="w-full relative">
      <Landing />
      <About />
      <Education />
      <Skills />
      <Works />
      <Papers />
      <Contact /> {/* Add here */}
    </main>
  );
}