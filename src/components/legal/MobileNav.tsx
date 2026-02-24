import { SidebarSection } from "./LegalSidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MobileNavProps {
  sections: SidebarSection[];
}

const MobileNav = ({ sections }: MobileNavProps) => {
  return (
    <div className="lg:hidden mb-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="nav" className="border rounded-xl bg-card">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold">
            📑 विषय सूची (Table of Contents)
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-3">
            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Icon size={14} />
                    {section.title}
                  </a>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MobileNav;
