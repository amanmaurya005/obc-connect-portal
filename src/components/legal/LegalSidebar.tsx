import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface SidebarSection {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface LegalSidebarProps {
  sections: SidebarSection[];
  activeSection: string;
}

const LegalSidebar = ({ sections, activeSection }: LegalSidebarProps) => {
  return (
    <nav className="hidden lg:block sticky top-8 space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-3">
        विषय सूची
      </p>
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              activeSection === section.id
                ? "bg-accent text-accent-foreground border-l-3 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Icon size={16} />
            <span className="truncate">{section.title}</span>
          </a>
        );
      })}
    </nav>
  );
};

export default LegalSidebar;
