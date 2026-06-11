import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CinematicReveal } from "@/components/sections/CinematicReveal";
import { SkillsHologram } from "@/components/sections/SkillsHologram";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CinematicReveal />
        <SkillsHologram />
        <Experience />
        <Projects />
        <Education />
      </main>
      <Footer />
    </>
  );
}
