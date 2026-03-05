
import { Link } from "react-router-dom";
import {
  FileText,
  Shield,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

const legalPages = [
  {
    to: "/legal/privacy-policy",
    icon: Shield,
    titleHi: "गोपनीयता नीति",
    titleEn: "Privacy Policy",
    desc: "आपकी व्यक्तिगत जानकारी की सुरक्षा",
  },
  {
    to: "/legal/terms-and-conditions",
    icon: FileText,
    titleHi: "नियम और शर्तें",
    titleEn: "Terms & Conditions",
    desc: "सदस्यता और उपयोग की शर्तें",
  },
  {
    to: "/legal/refund-policy",
    icon: RotateCcw,
    titleHi: "रिफंड नीति",
    titleEn: "Refund Policy",
    desc: "दान रिफंड प्रक्रिया और नियम",
  },
  {
    to: "/legal/disclaimer",
    icon: AlertCircle,
    titleHi: "अस्वीकरण",
    titleEn: "Disclaimer",
    desc: "कानूनी अस्वीकरण और सीमाएं",
  },
];

const LegalIndex = () => {
  return (
    <div className="min-h-screen bg-orange-50">

      {/* Top Tricolor Bar */}
      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-500" />

      {/* Hero Section */}
      <div className="bg-[#FF9933] py-20 px-6 text-center text-white shadow-md">

        <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-wide">
          अखिल भारतीय संयुक्त ओ.बी.सी. महासभा
        </h1>

        <p className="text-lg md:text-xl opacity-90">
          All India United OBC Mahasabha
        </p>

        <p className="text-sm mt-4 opacity-80">
          कानूनी दस्तावेज़ और नीतियां | Legal Documents & Policies
        </p>

      </div>

      {/* Bottom Tricolor Bar */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-green-500" />

      {/* Legal Pages Grid */}
      <div className="max-w-5xl mx-auto px-6 py-16">

        <div className="grid sm:grid-cols-2 gap-6">

          {legalPages.map((page) => {

            const Icon = page.icon;

            return (
              <Link
                key={page.to}
                to={page.to}
                className="
                  group
                  bg-white
                  rounded-2xl
                  shadow-md
                  border border-orange-200
                  p-6
                  hover:shadow-xl
                  hover:-translate-y-1
                  hover:border-orange-400
                  transition-all duration-300
                "
              >

                {/* Icon */}
                <div
                  className="
                    w-12 h-12
                    rounded-xl
                    bg-orange-100
                    flex items-center justify-center
                    mb-4
                    group-hover:bg-[#FF9933]
                    transition
                  "
                >
                  <Icon
                    size={24}
                    className="text-orange-600 group-hover:text-white"
                  />
                </div>

                {/* Hindi Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {page.titleHi}
                </h2>

                {/* English Title */}
                <p className="text-sm font-medium text-gray-500 mb-2">
                  {page.titleEn}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {page.desc}
                </p>

              </Link>
            );

          })}

        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-orange-200 py-6 text-center text-xs text-gray-600 bg-white">

        © {new Date().getFullYear()} अखिल भारतीय संयुक्त ओ.बी.सी. महासभा।
        सर्वाधिकार सुरक्षित।

      </footer>

    </div>
  );
};

export default LegalIndex;