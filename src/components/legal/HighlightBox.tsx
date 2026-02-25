import { AlertTriangle, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface HighlightBoxProps {
  variant?: "info" | "warning" | "secure";
  children: React.ReactNode;
}

const variants = {
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: Info,
    iconColor: "text-blue-600",
  },
  warning: {
    bg: "bg-yellow-50 border-yellow-200",
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
  },
  secure: {
    bg: "bg-green-50 border-green-200",
    icon: ShieldCheck,
    iconColor: "text-green-600",
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
