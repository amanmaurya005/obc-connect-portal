import { motion } from "framer-motion";
import { Users, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section
    id="home"
    className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden scroll-mt-24"
  >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="OBC Mahasabha community gathering"
          className="w-full h-full object-cover"
          loading="eager"
        />  

        {/* Dark overlay responsive */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 sm:from-black/70 sm:via-black/50 sm:to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">

        {/* Main content wrapper */}
        <div className="max-w-full sm:max-w-2xl lg:max-w-3xl ml-2 sm:ml-6 lg:ml-12">


          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              xl:text-6xl
              font-heading font-bold
              text-white
              leading-tight
              mb-4
            "
          >
            अखिल भारतीय सयुंक्त
            <br />
            <span className="text-gold">ओ.बी.सी. महासभा</span>
          </motion.h1>


          {/* slogans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="
              flex flex-wrap
              gap-2 sm:gap-3
              mb-6 sm:mb-8
            "
          >
            {[
              "एक बनो, नेक रहो",
              "संघर्ष ही जीवन है",
              "संगठन में शक्ति है",
            ].map((slogan) => (
              <span
                key={slogan}
                className="
                  px-3 py-1
                  sm:px-4 sm:py-1.5
                  bg-primary/20
                  backdrop-blur-sm
                  border border-white/20
                  text-white
                  text-xs sm:text-sm md:text-base
                  rounded-full
                "
              >
                {slogan}
              </span>
            ))}
          </motion.div>


          {/* description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="
              text-sm
              sm:text-base
              md:text-lg
              lg:text-xl
              text-white/90
              mb-8 sm:mb-10
              max-w-xl
            "
          >
            ओ.बी.सी. समाज के अधिकारों की रक्षा और सामाजिक न्याय के लिए समर्पित राष्ट्रीय संगठन
          </motion.p>


          {/* buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="
              flex
              flex-col sm:flex-row
              gap-3 sm:gap-4
              w-full sm:w-auto
            "
          >
            <Link
              to="/member-form"
              className="
                flex items-center justify-center gap-2
                bg-gradient-saffron
                text-white
                px-6 py-3
                sm:px-8 sm:py-4
                rounded-full
                text-sm sm:text-base
                font-semibold
                shadow-xl
                hover:scale-105
                transition
                w-full sm:w-auto
              "
            >
              <Users className="h-5 w-5" />
              सदस्य बनें
            </Link>

            <a
              href="#objectives"
              className="
                flex items-center justify-center gap-2
                bg-white/15
                backdrop-blur-sm
                border border-white/30
                text-white
                px-6 py-3
                sm:px-8 sm:py-4
                rounded-full
                text-sm sm:text-base
                font-semibold
                hover:bg-white/25
                transition
                w-full sm:w-auto
              "
            >
              अधिक जानें
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>

        </div>


        {/* RIGHT SIDE LOGO responsive */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="
            hidden lg:flex
            absolute
            right-4 lg:right-16 xl:right-24
            top-1/4
            -translate-y-1/2
            opacity-60
          "
        >
          <div className="bg-white p-2 rounded-full">
            <img
              src={logo}
              alt="OBC Logo"
              className="
                w-32
                md:w-44
                lg:w-56
                xl:w-64
                object-contain
              "
            />
          </div>
        </motion.div>

      </div>


      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path
            d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 28C1248 32 1344 48 1392 56L1440 64V80H0Z"
            fill="hsl(40, 45%, 96%)"
          />
        </svg>
      </div>

    </section>
  );
};

export default HeroSection;
