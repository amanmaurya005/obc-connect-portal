import { AlertTriangle, Info, ShieldCheck } from "lucide-react";

interface HighlightBoxProps {
  variant?: "info" | "warning" | "secure";
  children: React.ReactNode;
}

const variants = {

  info: {
    bg: "bg-blue-50 border-blue-300",
    icon: Info,
    iconColor: "text-blue-600",
  },

  warning: {
    bg: "bg-yellow-50 border-yellow-300",
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
  },

  secure: {
    bg: "bg-green-50 border-green-300",
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