import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CinematicReveal } from "@/components/sections/CinematicReveal";
import { SkillsHologram } from "@/components/sections/SkillsHologram";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { StatsBand } from "@/components/sections/StatsBand";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Footer } from "@/components/sections/Footer";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CinematicReveal />
        <SkillsHologram />
        <TechMarquee />
        <StatsBand />
        <SectionDivider index="04" label="FLIGHT LOG" />
        <Experience />
        <SectionDivider index="05" label="ARCHIVE" />
        <Projects />
        <SectionDivider index="06" label="ORIGIN" />
        <Education />
      </main>
      <Footer />
    </>
  );
}
