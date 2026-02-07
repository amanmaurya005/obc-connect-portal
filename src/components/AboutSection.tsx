import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Heart, BookOpen, Scale } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "सामाजिक न्याय",
    description: "ओ.बी.सी. समाज को उनके संवैधानिक अधिकार दिलाने के लिए संघर्ष",
  },
  {
    icon: BookOpen,
    title: "शिक्षा का अधिकार",
    description: "छात्र-छात्राओं को शिक्षा में 10 से 30 प्रतिशत तक की छूट दिलाना",
  },
  {
    icon: Heart,
    title: "स्वास्थ्य सेवा",
    description: "हॉस्पिटलों में इलाज में छूट दिलाने का प्रयास",
  },
  {
    icon: Scale,
    title: "समानता का संघर्ष",
    description: "समाज के हर वर्ग को बराबरी का हक दिलाने का मिशन",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-saffron-light text-primary rounded-full text-sm font-semibold mb-4">
            हमारे बारे में
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            ओ.बी.सी. समाज की <span className="text-primary">एकजुट आवाज़</span>
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed">
            अखिल भारतीय सयुंक्त ओ.बी.सी. महासभा एक राष्ट्रीय स्तर का सामाजिक संगठन है जो ओ.बी.सी. समाज के अधिकारों, शिक्षा, स्वास्थ्य और सामाजिक न्याय के लिए समर्पित है। हमारा लक्ष्य समाज के हर वर्ग को संगठित करना और उन्हें उनके अधिकार दिलाना है।
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-xl p-6 border border-border hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-saffron flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <value.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-saffron rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "28+", label: "राज्यों में उपस्थिति" },
              { value: "500+", label: "जिला इकाइयाँ" },
              { value: "50,000+", label: "सक्रिय सदस्य" },
              { value: "100+", label: "सफल अभियान" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
