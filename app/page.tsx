import { Preloader } from "../components/ui/Preloader";
import { Responsive } from "../components/ui/Responsive";
import { Landing } from "../components/pages/Landing";
import { AboutMobile } from "../components/pages/about/AboutMobile";
import { AboutDesktop } from "../components/pages/about/AboutDesktop";
import { EducationMobile } from "../components/pages/education/EducationMobile";
import { EducationDesktop } from "../components/pages/education/EducationDesktop";
import { SkillsMobile } from "../components/pages/skills/SkillsMobile";
import { SkillsDesktop } from "../components/pages/skills/SkillsDesktop";
import { WorksMobile } from "../components/pages/works/WorksMobile";
import { WorksDesktop } from "../components/pages/works/WorksDesktop";
import { PapersMobile } from "../components/pages/papers/PapersMobile";
import { PapersDesktop } from "../components/pages/papers/PapersDesktop";
import { ContactMobile } from "../components/pages/contact/ContactMobile";
import { ContactDesktop } from "../components/pages/contact/ContactDesktop";

// Order here is page order. ids are the Navbar's scroll targets (see navItems in Navbar.tsx).
const sections = [
  { id: "landing", content: <Landing /> },
  { id: "about", content: <Responsive mobile={<AboutMobile />} desktop={<AboutDesktop />} /> },
  { id: "education", content: <Responsive mobile={<EducationMobile />} desktop={<EducationDesktop />} /> },
  { id: "skills", content: <Responsive mobile={<SkillsMobile />} desktop={<SkillsDesktop />} /> },
  { id: "works", content: <Responsive mobile={<WorksMobile />} desktop={<WorksDesktop />} /> },
  { id: "papers", content: <Responsive mobile={<PapersMobile />} desktop={<PapersDesktop />} /> },
  { id: "contact", content: <Responsive mobile={<ContactMobile />} desktop={<ContactDesktop />} /> },
];

export default function Home() {
  return (
    <>
      <Preloader />
      {sections.map(({ id, content }) => (
        <div key={id} id={id}>{content}</div>
      ))}
    </>
  );
}
