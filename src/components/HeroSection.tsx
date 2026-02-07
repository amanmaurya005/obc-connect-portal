import { motion } from "framer-motion";
import { Users, ArrowDown } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="OBC Mahasabha community gathering"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <img src={logo} alt="Logo" className="h-20 w-20 md:h-24 md:w-24 rounded-full shadow-2xl border-2 border-primary-foreground/30" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-4"
          >
            अखिल भारतीय सयुंक्त
            <br />
            <span className="text-gold">ओ.बी.सी. महासभा</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {["एक बनो, नेक रहो", "संघर्ष ही जीवन है", "संगठन में शक्ति है"].map((slogan) => (
              <span
                key={slogan}
                className="px-4 py-1.5 bg-primary/20 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm md:text-base font-hindi rounded-full"
              >
                {slogan}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-lg md:text-xl text-primary-foreground/85 font-light mb-10 max-w-xl leading-relaxed"
          >
            ओ.बी.सी. समाज के अधिकारों की रक्षा और सामाजिक न्याय के लिए समर्पित राष्ट्रीय संगठन
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-gradient-saffron text-primary-foreground px-8 py-4 rounded-full text-base font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              <Users className="h-5 w-5" />
              सदस्य बनें
            </a>
            <a
              href="#objectives"
              className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-sm border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full text-base font-semibold hover:bg-primary-foreground/25 transition-all"
            >
              अधिक जानें
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 28C1248 32 1344 48 1392 56L1440 64V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z" fill="hsl(40, 45%, 96%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
