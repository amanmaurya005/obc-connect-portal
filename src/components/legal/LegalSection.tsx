import { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LegalSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const LegalSection = ({ id, title, icon: Icon, children }: LegalSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`bg-card rounded-2xl shadow-lg border border-border p-6 md:p-8 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
          <Icon size={20} className="text-primary" />
        </div>
        <h2 className="font-hindi text-xl md:text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="prose prose-sm max-w-none text-foreground/85 space-y-4">
        {children}
      </div>
    </section>
  );
};

export default LegalSection;
