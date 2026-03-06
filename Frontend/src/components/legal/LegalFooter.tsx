import { Link } from "react-router-dom";

const links = [
  { to: "/legal/privacy-policy", label: "गोपनीयता नीति" },
  { to: "/legal/terms-and-conditions", label: "नियम और शर्तें" },
  { to: "/legal/refund-policy", label: "रिफंड नीति" },
  { to: "/legal/disclaimer", label: "अस्वीकरण" },
];

const LegalFooter = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Heading */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            अखिल भारतीय संयुक्त ओ.बी.सी. महासभा
          </h3>
          <p className="text-sm text-gray-500">
            All India United OBC Mahasabha
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Tricolor Bar */}
        <div className="h-1 rounded-full mb-6 bg-gradient-to-r from-orange-500 via-white to-green-600" />

        {/* Copyright */}
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} अखिल भारतीय संयुक्त ओ.बी.सी. महासभा। सर्वाधिकार सुरक्षित।
        </p>
      </div>
    </footer>
  );
};

export default LegalFooter;