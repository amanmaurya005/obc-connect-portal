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
    <nav className="hidden lg:block sticky top-48 space-y-1 ">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-3 px-3">
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
                ? "bg-blue-100 text-blue-900 border-l-3 border-blue-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
