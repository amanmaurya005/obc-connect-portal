import { AlertTriangle, Info, ShieldCheck } from "lucide-react";

interface HighlightBoxProps {
  variant?: "info" | "warning" | "secure";
  children: React.ReactNode;
}

const variants = {

  info: {
    bg: "bg-accent border-primary/30",
    icon: Info,
    iconColor: "text-blue-600",
  },

  warning: {
    bg: "bg-destructive/5 border-destructive/30",
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
  },

  secure: {
    bg: "bg-green-india-light border-green-india/30",
    icon: ShieldCheck,
    iconColor: "text-green-600",
  },

};

const HighlightBox = ({ variant = "info", children }: HighlightBoxProps) => {

  const v = variants[variant];
  const Icon = v.icon;

  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${v.bg}`}>

      <Icon
        size={20}
        className={`mt-1 shrink-0 ${v.iconColor}`}
      />

      <div className="text-sm text-gray-700 leading-relaxed">
        {children}
      </div>

    </div>
  );
};

export default HighlightBox;