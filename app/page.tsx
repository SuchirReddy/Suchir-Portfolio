import Hero from "@/components/ui/portfolio-hero";
import { ProjectsSection } from "@/components/projects-section";
import { JourneySection } from "@/components/journey-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { getPublicPortfolioData } from "@/lib/public-data";
import { ScrollToTop } from "@/components/scroll-to-top";

import ProfileCard from "@/components/ui/profile-card";

export const revalidate = 3600;

export default async function Home() {
  const data = await getPublicPortfolioData();

  return (
    <div className="bg-zinc-50 dark:bg-[#020202] text-zinc-900 dark:text-white selection:bg-lime-300/30 selection:text-white transition-colors duration-500">
      <ScrollToTop />
      <Hero />
      <ProjectsSection projects={data.projects} />
      <JourneySection timeline={data.timeline} />
      <SkillsSection skills={data.skills} />
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <ProfileCard />
        </div>
      </section>
      <ContactSection />
    </div>
  );
}
