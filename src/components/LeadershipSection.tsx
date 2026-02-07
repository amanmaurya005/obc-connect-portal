import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import poster1 from "@/assets/poster_1.jpeg";

const LeadershipSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="leadership" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-saffron-light text-primary rounded-full text-sm font-semibold mb-4">
            नेतृत्व
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            हमारा <span className="text-primary">नेतृत्व</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Leader Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/20">
              <img
                src={poster1}
                alt="राष्ट्रीय अध्यक्ष - धर्मेन्द्र चौधरी"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Leader Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
              श्री धर्मेन्द्र चौधरी
            </h3>
            <p className="text-primary font-semibold text-lg mb-6 font-heading">
              राष्ट्रीय अध्यक्ष
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              श्री धर्मेन्द्र चौधरी जी ने ओ.बी.सी. समाज के अधिकारों की लड़ाई में अपना जीवन समर्पित किया है। उनके नेतृत्व में महासभा ने अनेक सफल अभियान चलाए हैं और समाज के हर वर्ग तक अपनी पहुंच बनाई है।
            </p>
            <blockquote className="border-l-4 border-primary pl-4 py-2 mb-8 bg-saffron-light/50 rounded-r-lg">
              <p className="text-foreground font-heading text-lg italic">
                "ओ.बी.सी. समाज के बंधुगण, महासभा से जुड़ने के लिए आगे आएं। एकजुट होकर हम अपने अधिकार प्राप्त कर सकते हैं।"
              </p>
            </blockquote>

            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-saffron-light rounded-lg text-center">
                <div className="text-lg font-bold text-primary">28+</div>
                <div className="text-xs text-muted-foreground">राज्यों में कार्य</div>
              </div>
              <div className="px-4 py-2 bg-green-india-light rounded-lg text-center">
                <div className="text-lg font-bold text-secondary">15+</div>
                <div className="text-xs text-muted-foreground">वर्षों का अनुभव</div>
              </div>
              <div className="px-4 py-2 bg-saffron-light rounded-lg text-center">
                <div className="text-lg font-bold text-primary">100+</div>
                <div className="text-xs text-muted-foreground">सफल अभियान</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
