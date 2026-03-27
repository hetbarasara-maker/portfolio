import Starfield from "@/components/Starfield";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import LeetCodeSection from "@/components/LeetCodeSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <>
      <Starfield />
      <Navbar />
      <main className="overflow-x-hidden max-w-[100vw]">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <LeetCodeSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
