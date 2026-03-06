import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import {
  GraduationCap,
  Stethoscope,
  Car,
  UtensilsCrossed,
  Users,
  CheckCircle2,
  Briefcase,
  Home,
  HeartHandshake,
  BookOpenCheck,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";


// ✅ Type define for objective
interface Objective {
  icon: LucideIcon;
  title: string;
  description: string;
}


// ✅ Data with type
const objectives: Objective[] = [
  {
    icon: Users,
    title: "सामाजिक उत्थान",
    description:
      "सामाजिक उत्थान के लिये समाज में व्याप्त कुरीतियों, कुरीतियों एवं कुप्रथाओं के लिये जागरूकता, प्रचार-प्रसार एवं तकनीकी सहायता प्रदान करना।",
  },
  {
    icon: HeartHandshake,
    title: "महिलाओं एवं कमजोर वर्गों की सहायता",
    description:
      "ओ.बी.सी. वर्ग की विधवा, तलाकशुदा एवं परित्यक्ता महिलाओं, असहाय एवं विकलांग, निर्धनों को मानसिक बल एवं आत्मनिर्भर बनने हेतु आर्थिक सहायता करना एवं उनके जीविकोपार्जन के लिये लघु एवं कुटीर उद्योगों की स्थापना करना।",
  },
  {
    icon: Users,
    title: "गरीब एवं असहाय लोगों का उत्थान",
    description:
      "ओ.बी.सी. वर्ग के वरिष्ठ नागरिक, विधवा, अपंग, विकलांग, निर्धन एवं असहाय लोगों के कल्याण के लिये कार्य करना तथा सरकार द्वारा चलाई जा रही योजनाओं की आम जनता तक पहुँच बनाना।",
  },
  {
    icon: GraduationCap,
    title: "महिलाओं की शिक्षा जागरूकता",
    description:
      "ओ.बी.सी. वर्ग की महिलाओं की शिक्षा एवं अधिकारों के प्रति जागरूक करना।",
  },
  {
    icon: Home,
    title: "बाल सेवा एवं देखभाल केन्द्र",
    description:
      "समाज में ओ.बी.सी. वर्ग के बच्चों की देखभाल एवं सेवा केन्द्र एवं वृद्धाश्रम देखभाल केन्द्र, बाल शिशु केन्द्र का संचालन करना।",
  },
  {
    icon: HeartHandshake,
    title: "असहाय एवं विकलांग सहायता",
    description:
      "ओ.बी.सी. वर्ग के ऐसे जरूरतमंद व्यक्ति जो असहाय, विकलांग, मानसिक, शारीरिक रूप से कमजोर हैं, उनके उत्थान एवं जीविकोपार्जन हेतु आर्थिक सहायता करना।",
  },
  {
    icon: Home,
    title: "नशामुक्ति अभियान",
    description:
      "समाज में नशामुक्ति केन्द्रों की स्थापना करना तथा ओ.बी.सी. वर्ग को नशामुक्त बनाने का प्रयास करना।",
  },
  {
    icon: Users,
    title: "भ्रूण हत्या रोकथाम",
    description:
      "ओ.बी.सी. वर्ग की लड़कियों / महिलाओं की गिरती जनसंख्या को रोकने के लिये भ्रूण हत्या रोकथाम करना एवं समाज में बेटी बचाओ-बेटी पढ़ाओ अभियान को बढ़ावा देना।",
  },
  {
    icon: Briefcase,
    title: "रोजगार सहायता",
    description:
      "ओ.बी.सी. वर्ग के बेरोजगार युवाओं को रोजगार उपलब्ध कराने हेतु मार्गदर्शन एवं सहायता प्रदान करना।",
  },
  {
    icon: GraduationCap,
    title: "छात्र शिक्षा सहायता",
    description:
      "ओ.बी.सी. वर्ग के छात्र / छात्राओं को पूर्व प्राथमिक, उच्च प्राथमिक, माध्यमिक, सीनियर सेकेंडरी एवं उच्चतर शिक्षा के लिये प्रोत्साहित करना एवं छात्रवृत्ति, शिक्षा सहायता प्रदान करना।",
  },
  {
    icon: BookOpenCheck,
    title: "शिक्षा जागरूकता कार्यक्रम",
    description:
      "ओ.बी.सी. वर्ग में शिक्षा के प्रति जागरूकता हेतु व्याख्यान, प्रतियोगिता, सेमिनार एवं सांस्कृतिक कार्यक्रम आयोजित करना।",
  },
  {
    icon: GraduationCap,
    title: "महिला शिक्षा विशेष व्यवस्था",
    description:
      "ओ.बी.सी. वर्ग की शिक्षा की जरूरतों हेतु प्रशिक्षण व्यवस्था, पुस्तकालय एवं अध्ययन केन्द्र स्थापित करना।",
  },
  {
    icon: GraduationCap,
    title: "छात्रवृत्ति एवं कोचिंग सुविधा",
    description:
      "ओ.बी.सी. वर्ग के छात्रों को प्रतियोगी परीक्षाओं हेतु कोचिंग, छात्रवृत्ति एवं तकनीकी शिक्षा की सुविधा प्रदान करना।",
  },
  {
    icon: Stethoscope,
    title: "चिकित्सा सहायता",
    description:
      "ओ.बी.सी. वर्ग के व्यक्तियों को गंभीर बीमारी के इलाज हेतु चिकित्सा सहायता प्रदान करना एवं नि:शुल्क चिकित्सा शिविर आयोजित करना।",
  },
  {
    icon: HeartHandshake,
    title: "जागरूकता कार्यक्रम आयोजन",
    description:
      "ओ.बी.सी. वर्ग के विकास हेतु जन जागरूकता कार्यक्रम, शिविर एवं प्रशिक्षण कार्यक्रम आयोजित करना।",
  },
  {
    icon: Briefcase,
    title: "कृषि एवं स्वरोजगार सहायता",
    description:
      "ओ.बी.सी. वर्ग के लिये कृषि, पशुपालन, कुटीर उद्योग एवं स्वरोजगार हेतु प्रशिक्षण एवं सहायता प्रदान करना।",
  },
  {
    icon: Users,
    title: "सरकार एवं समाज समन्वय",
    description:
      "ओ.बी.सी. वर्ग के हित में सरकार एवं समाज के बीच समन्वय स्थापित करना एवं योजनाओं का लाभ दिलाना।",
  },
  {
    icon: Home,
    title: "धर्मशाला एवं आश्रम संचालन",
    description:
      "धर्मशाला, छात्रावास, महिला आश्रम, वृद्धाश्रम एवं अन्य सामाजिक संस्थाओं का संचालन एवं रखरखाव करना।",
  },
];

const AllObjectives: React.FC = () => {

  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });


  return (
    <section
      ref={ref}
      className="py-10 bg-cream-pattern min-h-screen"
    >

      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <span className="inline-block px-4 py-1.5 bg-green-india-light text-secondary rounded-full text-sm font-semibold mb-4">
            सदस्यता अभियान
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            सभी <span className="text-secondary">उद्देश्य</span>
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            ओ.बी.सी. महासभा के सदस्य बनकर इन सभी लाभों का फायदा उठाएं
          </p>

        </motion.div>


        {/* ✅ Grid layout added */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-[6%]">

          {objectives.map((obj, index) => {

            const Icon = obj.icon;

            return (
              <motion.div
                key={obj.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="
                  group
                  flex gap-5
                  bg-card
                  rounded-xl
                  p-6
                  border border-border
                  hover:border-secondary/30
                  shadow-sm
                  hover:shadow-lg
                  transition-all duration-300
                "
              >

                {/* ✅ India Flag Color Icon Background */}
                <div
                  className={`
                    shrink-0
                    w-14 h-14
                    rounded-xl
                    flex items-center justify-center
                    group-hover:scale-110
                    transition-transform
                    ${
                      index % 3 === 0
                        ? "bg-orange-500"
                        : index % 3 === 1
                        ? "bg-white border border-gray-300"
                        : "bg-green-600"
                    }
                  `}
                >

                  <Icon
                    className={`h-7 w-7 ${
                      index % 3 === 1
                        ? "text-green-700"
                        : "text-white"
                    }`}
                  />

                </div>


                {/* Content */}
                <div className="flex-1">

                  <h3 className="
                    text-lg
                    font-heading
                    font-bold
                    text-foreground
                    mb-2
                    flex items-center gap-2
                  ">

                    <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />

                    {obj.title}

                  </h3>


                  <p className="text-muted-foreground leading-relaxed">
                    {obj.description}
                  </p>

                </div>

              </motion.div>
            );

          })}

        </div>

      </div>

    </section>
  );
};

export default AllObjectives;