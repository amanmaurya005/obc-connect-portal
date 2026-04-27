import { motion } from "framer-motion";
import { Award, HeartHandshake, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

import poster1 from "@/assets/poster_1.jpeg";
import poster2 from "@/assets/poster_2.jpeg";
import teamImg1 from "@/assets/gellery7.jpeg";
import teamImg2 from "@/assets/gellery12.jpeg";
import teamImg3 from "@/assets/gellery18.jpeg";

const teamMembers = [
  {
    name: "श्री धर्मेन्द्र चौधरी",
    role: "राष्ट्रीय अध्यक्ष",
    region: "राष्ट्रीय इकाई",
    image: poster1,
    highlight: "संगठन विस्तार और सामाजिक न्याय अभियानों का नेतृत्व",
  },
  {
    name: "श्रीमती रेखा चौधरी",
    role: "महिला प्रकोष्ठ संयोजक",
    region: "राजस्थान",
    image: poster2,
    highlight: "महिला सशक्तिकरण और परिवार सहायता कार्यक्रम",
  },
  {
    name: "श्री विकास यादव",
    role: "युवा मोर्चा प्रमुख",
    region: "उत्तर भारत",
    image: teamImg1,
    highlight: "युवा सदस्यता, प्रशिक्षण और जनसंपर्क अभियान",
  },
  {
    name: "श्री सुरेश प्रजापत",
    role: "संगठन मंत्री",
    region: "मध्य भारत",
    image: teamImg2,
    highlight: "जिला इकाइयों के समन्वय और विस्तार का दायित्व",
  },
  {
    name: "श्रीमती कविता मौर्य",
    role: "शिक्षा प्रकोष्ठ प्रमुख",
    region: "पूर्वी क्षेत्र",
    image: teamImg3,
    highlight: "छात्रवृत्ति, मार्गदर्शन और शिक्षा सहयोग पहल",
  },
];

const teamStats = [
  { value: "50,000+", label: "सक्रिय सदस्य" },
  { value: "500+", label: "जिला इकाइयाँ" },
  { value: "28+", label: "राज्यों में पहुंच" },
];

const Team = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="bg-cream-pattern py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-saffron-light px-4 py-1.5 text-sm font-semibold text-primary">
              <Users className="h-4 w-4" />
              टीम
            </span>
            <h1 className="mt-5 text-3xl font-heading font-bold text-foreground md:text-5xl">
              हमारे संगठन की <span className="text-primary">समर्पित टीम</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              यह टीम समाज के हर वर्ग तक संगठन की आवाज, सहयोग और अधिकारों की
              पहल पहुंचाने के लिए लगातार काम कर रही है।
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-10 grid gap-4 md:grid-cols-3"
          >
            {teamStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card px-6 py-7 text-center shadow-sm"
              >
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="aspect-[4/4.6] bg-saffron-light/30">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-4 px-6 py-6">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      {member.name}
                    </h2>
                    <p className="mt-1 text-base font-semibold text-primary">
                      {member.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <span>{member.region}</span>
                  </div>

                  <p className="leading-relaxed text-muted-foreground">
                    {member.highlight}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-3xl bg-gradient-saffron px-6 py-10 text-primary-foreground md:px-10"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
                  <HeartHandshake className="h-4 w-4" />
                  साथ मिलकर आगे बढ़ें
                </div>
                <h2 className="text-3xl font-heading font-bold md:text-4xl">
                  संगठन से जुड़कर टीम का हिस्सा बनें
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/90">
                  सदस्यता, सेवा और समाज के लिए काम करने की भावना रखने वाले सभी
                  साथियों का स्वागत है।
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl bg-white/12 px-5 py-5">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">सेवा और नेतृत्व</span>
                  </div>
                  <p className="mt-2 text-sm text-primary-foreground/85">
                    जिला, प्रदेश और राष्ट्रीय स्तर पर योगदान के अवसर
                  </p>
                </div>

                <Link
                  to="/member-form"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-primary transition-transform hover:scale-[1.02]"
                >
                  सदस्य बनें
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Team;
