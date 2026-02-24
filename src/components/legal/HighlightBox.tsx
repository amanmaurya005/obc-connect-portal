import { AlertTriangle, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface HighlightBoxProps {
  variant?: "info" | "warning" | "secure";
  children: React.ReactNode;
}

const variants = {
  info: {
    bg: "bg-accent border-primary/30",
    icon: Info,
    iconColor: "text-primary",
  },
  warning: {
    bg: "bg-destructive/5 border-destructive/30",
    icon: AlertTriangle,
    iconColor: "text-destructive",
  },
  secure: {
    bg: "bg-green-india-light border-green-india/30",
    icon: ShieldCheck,
    iconColor: "text-green-india",
  },
};

const HighlightBox = ({ variant = "info", children }: HighlightBoxProps) => {
  const v = variants[variant];
  const Icon = v.icon;

  return (
    <div className={cn("flex gap-3 p-4 rounded-xl border", v.bg)}>
      <Icon size={20} className={cn("mt-0.5 shrink-0", v.iconColor)} />
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
};

export default HighlightBox;
