// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X, Phone, Users } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import logo from "@/assets/logo.png";

// const navItems = [
//   { label: "होम", href: "/#home" },
//   { label: "हमारे बारे में", href: "/#about" },
//   { label: "उद्देश्य", href: "/#objectives" },
//   { label: "नेतृत्व", href: "/#leadership" },
//   { label: "गैलरी", href: "/#gallery" },
//   { label: "संपर्क", href: "/#contact" },,
//   { label: "डोनेशन", href: "/donations" },
//   { label: "डिस्काउंट", href: "/discount" },
// ];

// const Header = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-md tricolor-border-top">
//       {/* Top marquee bar */}
//       <div className="bg-gradient-saffron py-1 overflow-hidden">
//         <div className="animate-marquee whitespace-nowrap text-primary-foreground text-sm font-medium">
//           <span className="mx-8">एक बनो, नेक रहो</span>
//           <span className="mx-8">•</span>
//           <span className="mx-8">संघर्ष ही जीवन है</span>
//           <span className="mx-8">•</span>
//           <span className="mx-8">संगठन में शक्ति है</span>
//           <span className="mx-8">•</span>
//           <span className="mx-8">एक बनो, नेक रहो</span>
//           <span className="mx-8">•</span>
//           <span className="mx-8">संघर्ष ही जीवन है</span>
//           <span className="mx-8">•</span>
//           <span className="mx-8">संगठन में शक्ति है</span>
//         </div>
//       </div>

//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between py-3">
//           {/* Logo */}
//           <a href="/#home" className="flex items-center gap-3 shrink-0">
//             <img src={logo} alt="OBC Mahasabha Logo" className="h-14 w-14 md:h-16 md:w-16 rounded-full shadow-lg" />
//             <div className="hidden sm:block">
//               <h1 className="text-base md:text-lg font-heading font-bold text-foreground leading-tight">
//                 अखिल भारतीय सयुंक्त
//               </h1>
//               <p className="text-sm md:text-base font-heading font-bold text-primary leading-tight">
//                 ओ.बी.सी. महासभा
//               </p>
//             </div>
//           </a>

//           {/* Desktop Nav */}
//           <nav className="hidden lg:flex items-center gap-1">
//             {navItems.map((item) => (
//               <a
//                 key={item.href}
//                 href={item.href}
//                 className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md transition-colors hover:bg-saffron-light"
//               >
//                 {item.label}
//               </a>
//             ))}
//           <Link
//   to="/member-form"
//   className="ml-3 flex items-center gap-2 bg-gradient-saffron text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
// >
//   <Users className="h-5 w-5" />
//   सदस्य बनें
// </Link>

//           </nav>

//           {/* Mobile Toggle */}
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="lg:hidden p-2 text-foreground hover:text-primary"
//             aria-label="Toggle menu"
//           >
//             {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="lg:hidden overflow-hidden bg-card border-t border-border"
//           >
//             <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
//               {navItems.map((item) => (
//                 <a
//                   key={item.href}
//                   href={item.href}
//                   onClick={() => setMobileOpen(false)}
//                   className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary rounded-md transition-colors hover:bg-saffron-light"
//                 >
//                   {item.label}
//                 </a>
//               ))}
//               <a
//                 href="tel:9549566300"
//                 className="mt-2 flex items-center justify-center gap-2 bg-gradient-saffron text-primary-foreground px-5 py-3 rounded-full text-sm font-semibold"
//               >
//                 <Phone className="h-4 w-4" />
//                 9549566300
//               </a>
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-marquee {
//           display: inline-block;
//           animation: marquee 20s linear infinite;
//         }
//       `}</style>
//     </header>
//   );
// };

// export default Header;





import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "होम", href: "/#home" },
  { label: "हमारे बारे में", href: "/#about" },
  { label: "उद्देश्य", href: "/#objectives" },
  { label: "नेतृत्व", href: "/#leadership" },
  { label: "गैलरी", href: "/#gallery" },
  { label: "संपर्क", href: "/#contact" },
  { label: "डोनेशन", href: "/donations" },
  { label: "डिस्काउंट", href: "/discount" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-md tricolor-border-top">

      {/* Top marquee */}
      <div className="bg-gradient-saffron py-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-primary-foreground text-sm font-medium">
          <span className="mx-8">एक बनो, नेक रहो</span>
          <span className="mx-8">•</span>
          <span className="mx-8">संघर्ष ही जीवन है</span>
          <span className="mx-8">•</span>
          <span className="mx-8">संगठन में शक्ति है</span>
          <span className="mx-8">•</span>
          <span className="mx-8">एक बनो, नेक रहो</span>
          <span className="mx-8">•</span>
          <span className="mx-8">संघर्ष ही जीवन है</span>
          <span className="mx-8">•</span>
          <span className="mx-8">संगठन में शक्ति है</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">

          {/* Logo */}
          <a href="/#home" className="flex items-center gap-3 shrink-0">
            <img
              src={logo}
              alt="OBC Mahasabha Logo"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full shadow-lg"
            />
            <div className="hidden sm:block">
              <h1 className="text-base md:text-lg font-heading font-bold text-foreground leading-tight">
                अखिल भारतीय सयुंक्त
              </h1>
              <p className="text-sm md:text-base font-heading font-bold text-primary leading-tight">
                ओ.बी.सी. महासभा
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">

            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary rounded-md transition-colors hover:bg-saffron-light"
              >
                {item.label}
              </a>
            ))}

            {/* Member button desktop */}
            <Link
              to="/member-form"
              className="ml-3 flex items-center gap-2 bg-gradient-saffron text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Users className="h-5 w-5" />
              सदस्य बनें
            </Link>

          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-card border-t border-border"
          >

            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">

              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary rounded-md transition-colors hover:bg-saffron-light"
                >
                  {item.label}
                </a>
              ))}

              {/* Member button mobile */}
              <Link
                to="/member-form"
                onClick={() => setMobileOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 bg-gradient-saffron text-primary-foreground px-5 py-3 rounded-full text-sm font-semibold shadow-lg"
              >
                <Users className="h-5 w-5" />
                सदस्य बनें
              </Link>

              {/* Phone */}
              <a
                href="tel:9549566300"
                className="mt-2 flex items-center justify-center gap-2 bg-gradient-saffron text-primary-foreground px-5 py-3 rounded-full text-sm font-semibold"
              >
                <Phone className="h-4 w-4" />
                9549566300
              </a>

            </nav>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Marquee animation */}
      <style>
        {`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
        `}
      </style>

    </header>
  );
};

export default Header;