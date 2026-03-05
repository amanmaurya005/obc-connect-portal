// import logo from "@/assets/logo.png";
// import { Phone, MapPin, MessageCircle } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-foreground text-primary-foreground">
//       {/* Tricolor strip */}
//       <div className="flex h-1.5">
//         <div className="flex-1 bg-gradient-saffron" />
//         <div className="flex-1 bg-card" />
//         <div className="flex-1 bg-gradient-green" />
//       </div>

//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           {/* Brand */}
//           <div>
//             <div className="flex items-center gap-3 mb-5">
//               <img src={logo} alt="Logo" className="h-14 w-14 rounded-full" />
//               <div>
//                 <h3 className="font-heading font-bold text-lg">अखिल भारतीय सयुंक्त</h3>
//                 <p className="font-heading text-gold font-bold">ओ.बी.सी. महासभा</p>
//               </div>
//             </div>
//             <p className="text-primary-foreground/70 leading-relaxed text-sm">
//               ओ.बी.सी. समाज के अधिकारों की रक्षा और सामाजिक न्याय के लिए समर्पित राष्ट्रीय संगठन।
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-heading font-bold text-lg mb-5">त्वरित लिंक</h4>
//             <nav className="flex flex-col gap-3">
//               {[
//                 { label: "होम", href: "#home" },
//                 { label: "हमारे बारे में", href: "#about" },
//                 { label: "उद्देश्य", href: "#objectives" },
//                 { label: "नेतृत्व", href: "#leadership" },
//                 { label: "संपर्क", href: "#contact" },
//               ].map((link) => (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
//                 >
//                   {link.label}
//                 </a>
//               ))}
//             </nav>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="font-heading font-bold text-lg mb-5">संपर्क</h4>
//             <div className="flex flex-col gap-4">
//               <a href="tel:91+ 9549566300" className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors text-sm">
//                 <Phone className="h-4 w-4 shrink-0" />
//                 91+ 9549566300
//               </a>
//               <a
//                 href="https://wa.me/9191+ 9549566300"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors text-sm"
//               >
//                 <MessageCircle className="h-4 w-4 shrink-0" />
//                 WhatsApp पर संपर्क करें
//               </a>
//               <div className="flex items-start gap-3 text-primary-foreground/70 text-sm">
//                 <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
//                 <span>
//                 प्लॉट नंबर: 115, 116, विनायक रेजीडेंसी - I(F3), 
//                   <br />
//                   विनायक विहार डी, हरनाथपुरा, कलवार रोड, जयपुर - 302012
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center">
//           <p className="text-primary-foreground/50 text-sm">
//             © {new Date().getFullYear()} अखिल भारतीय सयुंक्त ओ.बी.सी. महासभा। सर्वाधिकार सुरक्षित।
//           </p>
//           <p className="text-primary-foreground/30 text-xs mt-2 font-heading">
//             एक बनो, नेक रहो • संघर्ष ही जीवन है • संगठन में शक्ति है
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





import logo from "@/assets/logo.png";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">

      {/* Tricolor strip */}
      <div className="flex h-1.5">
        <div className="flex-1 bg-gradient-saffron" />
        <div className="flex-1 bg-card" />
        <div className="flex-1 bg-gradient-green" />
      </div>

      <div className="container mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logo}
                alt="Logo"
                className="h-14 w-14 rounded-full"
              />
              <div>
                <h3 className="font-heading font-bold text-lg">
                  अखिल भारतीय सयुंक्त
                </h3>
                <p className="font-heading text-gold font-bold">
                  ओ.बी.सी. महासभा
                </p>
              </div>
            </div>

            <p className="text-primary-foreground/70 leading-relaxed text-sm">
              ओ.बी.सी. समाज के अधिकारों की रक्षा और सामाजिक न्याय के लिए समर्पित राष्ट्रीय संगठन।
            </p>
          </div>


          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5">
              त्वरित लिंक
            </h4>

            <nav className="flex flex-col gap-3">

              {[
                { label: "होम", href: "/#home" },
                { label: "हमारे बारे में", href: "/#about" },
                { label: "उद्देश्य", href: "/#objectives" },
                { label: "नेतृत्व", href: "/#leadership" },
                { label: "संपर्क", href: "/#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>


          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5">
              संपर्क
            </h4>

            <div className="flex flex-col gap-4">

              <a
                href="tel:+919549566300"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors text-sm"
              >
                <Phone className="h-4 w-4 shrink-0" />
                +91 9549566300
              </a>

              <a
                href="https://wa.me/919549566300"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold transition-colors text-sm"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                WhatsApp पर संपर्क करें
              </a>

              <div className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  प्लॉट नंबर: 115, 116, विनायक रेजीडेंसी - I(F3),
                  <br />
                  विनायक विहार डी, हरनाथपुरा, कलवार रोड, जयपुर - 302012
                </span>
              </div>

            </div>
          </div>

        </div>


        {/* Bottom Section */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/10">

          {/* Copyright Row */}
          <div className="text-center">
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} अखिल भारतीय सयुंक्त ओ.बी.सी. महासभा।
              सर्वाधिकार सुरक्षित।
            </p>
          </div>


          {/* ✅ Separate Legal Links Row */}
          <div className="flex justify-center gap-6 mt-4 flex-wrap text-sm border-t border-primary-foreground/10 pt-4">

            
          <Link
              to="/legal"
              className="text-primary-foreground/40 hover:text-gold"
            >
              Disclaimer
            </Link>

            <Link
              to="legal/privacy-policy"
              className="text-primary-foreground/40 hover:text-gold"
            >
              Privacy Policy
            </Link>

            <Link
              to="legal/terms-and-conditions"
              className="text-primary-foreground/40 hover:text-gold"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/legal/refund-policy"
              className="text-primary-foreground/40 hover:text-gold"
            >
              Refund Policy
            </Link>

          

          </div>


          {/* Tagline Row */}
          <div className="text-center mt-4">
            <p className="text-primary-foreground/30 text-xs font-heading">
              एक बनो, नेक रहो • संघर्ष ही जीवन है • संगठन में शक्ति है
            </p>
          </div>

        </div>


      </div>
    </footer>
  );
};

export default Footer;