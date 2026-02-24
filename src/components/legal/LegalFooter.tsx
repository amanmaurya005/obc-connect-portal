import { Link } from "react-router-dom";

const links = [
  { to: "/legal/privacy-policy", label: "गोपनीयता नीति", en: "Privacy Policy" },
  { to: "/legal/terms-and-conditions", label: "नियम और शर्तें", en: "Terms & Conditions" },
  { to: "/legal/refund-policy", label: "रिफंड नीति", en: "Refund Policy" },
  { to: "/legal/disclaimer", label: "अस्वीकरण", en: "Disclaimer" },
];

const LegalFooter = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center mb-6">
          <h3 className="font-hindi text-lg font-bold text-foreground">
            अखिल भारतीय संयुक्त ओ.बी.सी. महासभा
          </h3>
          <p className="text-sm text-muted-foreground">
            All India United OBC Mahasabha
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="h-1 gradient-tricolor-bar rounded-full mb-6" />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} अखिल भारतीय संयुक्त ओ.बी.सी. महासभा। सर्वाधिकार सुरक्षित।
        </p>
      </div>
    </footer>
  );
};

export default LegalFooter;
