import { ShieldCheck, Lock, Globe, Building2 } from "lucide-react";

const indicators = [
  { icon: ShieldCheck, label: "100% पारदर्शी नीतियां", sublabel: "Transparent Policies" },
  { icon: Lock, label: "Razorpay सुरक्षित भुगतान", sublabel: "Secure Payments" },
  { icon: Globe, label: "SSL सुरक्षित वेबसाइट", sublabel: "SSL Secured" },
  { icon: Building2, label: "राष्ट्रीय संगठन अनुपालन", sublabel: "National Compliance" },
];

const TrustIndicators = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {indicators.map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-green-india-light flex items-center justify-center mb-3">
            <item.icon size={22} className="text-green-india" />
          </div>
          <p className="font-hindi text-sm font-semibold text-foreground">{item.label}</p>
          <p className="text-xs text-muted-foreground">{item.sublabel}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators;
