import { useEffect, useState } from "react";
import LegalHero from "./LegalHero";
import LegalSidebar, { SidebarSection } from "./LegalSidebar";
import MobileNav from "./MobileNav";
import TrustIndicators from "./TrustIndicators";
import ContactCard from "./ContactCard";
import ActionButtons from "./ActionButtons";
import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";
import LegalFooter from "./LegalFooter";

interface LegalLayoutProps {
  titleHindi: string;
  titleEnglish: string;
  lastUpdated: string;
  sections: SidebarSection[];
  children: React.ReactNode;
}

const LegalLayout = ({
  titleHindi,
  titleEnglish,
  lastUpdated,
  sections,
  children,
}: LegalLayoutProps) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <LegalHero titleHindi={titleHindi} titleEnglish={titleEnglish} lastUpdated={lastUpdated} />

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Action buttons */}
        <div className="flex justify-end mb-6">
          <ActionButtons />
        </div>

        {/* Mobile nav */}
        <MobileNav sections={sections} />

        <div className="flex gap-10">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <LegalSidebar sections={sections} activeSection={activeSection} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-8">{children}</div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16">
          <TrustIndicators />
        </div>

        {/* Contact Card */}
        <div className="mt-10">
          <ContactCard />
        </div>
      </div>

      <LegalFooter />
      <BackToTop />
    </div>
  );
};

export default LegalLayout;
