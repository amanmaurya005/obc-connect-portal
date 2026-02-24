import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

import { useRef } from "react";
import {
  GraduationCap,
  Stethoscope,
  Car,
  UtensilsCrossed,
  Users,
  CheckCircle2,
} from "lucide-react";

const objectives = [
  {
    icon: Users,
    title: "सभी वर्गों के लिए छूट",
    description:
      "छात्र-छात्राओं, युवाओं, महिलाओं, वयस्क और प्रौढ़ अवस्था वाले सभी वर्गों में विभिन्न जरूरतमंद क्षेत्रों में 10 से 30 प्रतिशत की अतिरिक्त छूट दिलाना।",
  },
  {
    icon: GraduationCap,
    title: "शिक्षा में छूट",
    description:
      "स्कूल, महाविद्यालय और कोचिंग की फीस में छूट दिलाने का प्रयास।",
  },
  {
    icon: Stethoscope,
    title: "स्वास्थ्य सेवा में छूट",
    description: "हॉस्पिटलों में इलाज की लागत में छूट का प्रावधान।",
  },
  {
    icon: Car,
    title: "वाहन सेवा में छूट",
    description:
      "चार पहिया और दो पहिया वाहन की सर्विस के शुल्क में छूट दिलाना।",
  },
  {
    icon: UtensilsCrossed,
    title: "होटल/रेस्टोरेंट में छूट",
    description: "होटल और रेस्टोरेंट में सदस्यों के लिए विशेष छूट।",
  },
];

const ObjectivesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
    id="objectives"
    ref={ref}
    className="py-20 bg-cream-pattern scroll-mt-24"
  >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-green-india-light text-secondary rounded-full text-sm font-semibold mb-4">
            सदस्यता अभियान
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            मुख्य <span className="text-secondary">उद्देश्य</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            ओ.बी.सी. महासभा के सदस्य बनकर इन सभी लाभों का फायदा उठाएं
          </p>
        </motion.div>

        {/* Objectives List */}
        <div className="max-w-4xl mx-auto space-y-5">
          {objectives.map((obj, index) => (
            <motion.div
              key={obj.title}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex gap-5 bg-card rounded-xl p-6 border border-border hover:border-secondary/30 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-green flex items-center justify-center group-hover:scale-110 transition-transform">
                <obj.icon className="h-7 w-7 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-bold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                  {obj.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {obj.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
        
          <Link to="/objectives" className="inline-flex items-center gap-2 bg-gradient-green text-secondary-foreground px-8 py-4 rounded-full text-base font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105">
  <Users className="h-5 w-5" />
  सभी उद्देश्य देखें
</Link>

        
        </motion.div>
      </div>
    </section>
  );
};

export default ObjectivesSection;
