// import { Link } from "react-router-dom";
// import { FileText, Shield, RotateCcw, AlertCircle } from "lucide-react";

// const legalPages = [
//   { to: "/legal/privacy-policy", icon: Shield, titleHi: "गोपनीयता नीति", titleEn: "Privacy Policy", desc: "आपकी व्यक्तिगत जानकारी की सुरक्षा" },
//   { to: "/legal/terms-and-conditions", icon: FileText, titleHi: "नियम और शर्तें", titleEn: "Terms & Conditions", desc: "सदस्यता और उपयोग की शर्तें" },
//   { to: "/legal/refund-policy", icon: RotateCcw, titleHi: "रिफंड नीति", titleEn: "Refund Policy", desc: "दान रिफंड प्रक्रिया और नियम" },
//   { to: "/legal/disclaimer", icon: AlertCircle, titleHi: "अस्वीकरण", titleEn: "Disclaimer", desc: "कानूनी अस्वीकरण और सीमाएं" },
// ];

// const legaleIndex = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero */}
//       <div className="h-1.5 gradient-tricolor-bar" />
//       <div className="gradient-saffron-dark chakra-watermark py-20 px-6 text-center">
//         <h1 className="font-hindi text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
//           अखिल भारतीय संयुक्त ओ.बी.सी. महासभा
//         </h1>
//         <p className="text-primary-foreground/80 text-lg md:text-xl">
//           All India United OBC Mahasabha
//         </p>
//         <p className="text-primary-foreground/60 text-sm mt-4">
//           कानूनी दस्तावेज़ और नीतियां | Legal Documents & Policies
//         </p>
//       </div>
//       <div className="h-1 gradient-tricolor-bar" />

//       {/* Legal Pages Grid */}
//       <div className="max-w-4xl mx-auto px-6 py-16">
//         <div className="grid sm:grid-cols-2 gap-6">
//           {legalPages.map((page) => (
//             <Link
//               key={page.to}
//               to={page.to}
//               className="group bg-card rounded-2xl shadow-lg border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//             >
//               <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                 <page.icon size={24} className="text-primary group-hover:text-primary-foreground" />
//               </div>
//               <h2 className="font-hindi text-xl font-bold text-foreground mb-1">{page.titleHi}</h2>
//               <p className="text-sm font-medium text-muted-foreground mb-2">{page.titleEn}</p>
//               <p className="text-sm text-muted-foreground">{page.desc}</p>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
//         © {new Date().getFullYear()} अखिल भारतीय संयुक्त ओ.बी.सी. महासभा। सर्वाधिकार सुरक्षित।
//       </footer>
//     </div>
//   );
// };

// export default legaleIndex;




import { Link } from "react-router-dom";
import { FileText, Shield, RotateCcw, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">

      {/* Top Bar */}
      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-500" />

      {/* Hero Section */}
      <div className="bg-orange-600 py-20 px-6 text-center text-white">

        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          अखिल भारतीय संयुक्त ओ.बी.सी. महासभा
        </h1>

        <p className="text-lg md:text-xl opacity-90">
          All India United OBC Mahasabha
        </p>

        <p className="text-sm mt-4 opacity-75">
          कानूनी दस्तावेज़ और नीतियां | Legal Documents & Policies
        </p>

      </div>

      {/* Bottom Bar */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-green-500" />

      {/* Grid Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="grid sm:grid-cols-2 gap-6">

          {legalPages.map((page) => (
            <Link
              key={page.to}
              to={page.to}
              className="group bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-600 transition">

                <page.icon
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
              <p className="text-sm text-gray-600">
                {page.desc}
              </p>

            </Link>
          ))}

        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-500">

        © {new Date().getFullYear()} अखिल भारतीय संयुक्त ओ.बी.सी. महासभा।
        सर्वाधिकार सुरक्षित।

      </footer>

    </div>
  );
};

export default LegalIndex;