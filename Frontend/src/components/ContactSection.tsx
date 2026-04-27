import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, MessageCircle, Mail } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 bg-background scroll-mt-24" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-green-india-light text-secondary rounded-full text-sm font-semibold mb-4">
            संपर्क करें
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            हमसे <span className="text-secondary">जुड़ें</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            सदस्य बनने और आई कार्ड प्राप्त करने के लिए हमसे संपर्क करें
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* WhatsApp Card */}
          <motion.a
            href="https://wa.me/9191+ 9549566300"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group bg-card rounded-2xl p-8 border border-border hover:border-secondary/30 shadow-sm hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-green flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-8 w-8 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">WhatsApp</h3>
            <p className="text-2xl font-bold text-secondary mb-2">91+ 9549566300</p>
            <p className="text-muted-foreground text-sm">तुरंत संपर्क के लिए WhatsApp करें</p>
          </motion.a>

          {/* Phone Card */}
          <motion.a
            href="tel:91+ 9549566300"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-saffron flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <Phone className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">फ़ोन करें</h3>
            <p className="text-2xl font-bold text-primary mb-2">91+ 9549566300</p>
            <p className="text-muted-foreground text-sm">सोमवार से शनिवार, सुबह 10 - शाम 6 बजे</p>
          </motion.a>

          {/* प्रधान कार्यालय Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group bg-card rounded-2xl p-8 border border-border shadow-sm text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-saffron flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <MapPin className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">प्रधान कार्यालय</h3>
            <p className="text-muted-foreground leading-relaxed">
            प्लॉट नंबर: 115, 116,
              <br />
              विनायक रेजीडेंसी - I(F3), 
              <br />
              विनायक विहार डी, हरनाथपुरा,
              <br />
              कलवार रोड, जयपुर - 302012
            </p>          
          </motion.div>

          {/* कार्यालय Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group bg-card rounded-2xl p-8 border border-border shadow-sm text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-saffron flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <MapPin className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">कार्यालय</h3>
            <p className="text-muted-foreground leading-relaxed">
            प्लॉट नंबर: 115, 116,
              <br />
              विनायक रेजीडेंसी - I(F3), 
              <br />
              विनायक विहार डी, हरनाथपुरा,
              <br />
              कलवार रोड, जयपुर - 302012
            </p>          
          </motion.div>
        </div>

        {/* Large WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://wa.me/9191+ 9549566300?text=नमस्कार,%20मुझे%20ओ.बी.सी.%20महासभा%20के%20सदस्यता%20के%20बारे%20में%20जानकारी%20चाहिए।"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-green text-secondary-foreground px-10 py-5 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            <MessageCircle className="h-6 w-6" />
            WhatsApp पर संपर्क करें
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
