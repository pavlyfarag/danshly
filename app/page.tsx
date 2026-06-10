import { ArchitectureSection } from "@/components/sections/architecture";
import { CapabilitiesSection } from "@/components/sections/capabilities";
import { ContactSection } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { MetricsSection } from "@/components/sections/metrics";
import { ProjectsSection } from "@/components/sections/projects";
import { TeamSection } from "@/components/sections/team";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TeamSection />
      <CapabilitiesSection />
      <ArchitectureSection />
      <MetricsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
