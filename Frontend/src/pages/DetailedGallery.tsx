// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// import {
//   GraduationCap,
//   Stethoscope,
//   Car,
//   UtensilsCrossed,
//   Users,
//   CheckCircle2,
//   Briefcase,
//   Home,
//   HeartHandshake,
//   BookOpenCheck,
// } from "lucide-react";

// import type { LucideIcon } from "lucide-react";


// // ✅ Type define for objective
// interface Objective {
//   icon: LucideIcon;
//   title: string;
//   description: string;
// }


// // ✅ Data with type
// const objectives: Objective[] = [
//   {
//     icon: Users,
//     title: "सामाजिक उत्थान",
//     description:
//       "सामाजिक उत्थान के लिये समाज में व्याप्त कुरीतियों, कुरीतियों एवं कुप्रथाओं के लिये जागरूकता, प्रचार-प्रसार एवं तकनीकी सहायता प्रदान करना।",
//   },
//   {
//     icon: HeartHandshake,
//     title: "महिलाओं एवं कमजोर वर्गों की सहायता",
//     description:
//       "ओ.बी.सी. वर्ग की विधवा, तलाकशुदा एवं परित्यक्ता महिलाओं, असहाय एवं विकलांग, निर्धनों को मानसिक बल एवं आत्मनिर्भर बनने हेतु आर्थिक सहायता करना एवं उनके जीविकोपार्जन के लिये लघु एवं कुटीर उद्योगों की स्थापना करना।",
//   },
//   {
//     icon: Users,
//     title: "गरीब एवं असहाय लोगों का उत्थान",
//     description:
//       "ओ.बी.सी. वर्ग के वरिष्ठ नागरिक, विधवा, अपंग, विकलांग, निर्धन एवं असहाय लोगों के कल्याण के लिये कार्य करना तथा सरकार द्वारा चलाई जा रही योजनाओं की आम जनता तक पहुँच बनाना।",
//   },
//   {
//     icon: GraduationCap,
//     title: "महिलाओं की शिक्षा जागरूकता",
//     description:
//       "ओ.बी.सी. वर्ग की महिलाओं की शिक्षा एवं अधिकारों के प्रति जागरूक करना।",
//   },
//   {
//     icon: Home,
//     title: "बाल सेवा एवं देखभाल केन्द्र",
//     description:
//       "समाज में ओ.बी.सी. वर्ग के बच्चों की देखभाल एवं सेवा केन्द्र एवं वृद्धाश्रम देखभाल केन्द्र, बाल शिशु केन्द्र का संचालन करना।",
//   },
//   {
//     icon: HeartHandshake,
//     title: "असहाय एवं विकलांग सहायता",
//     description:
//       "ओ.बी.सी. वर्ग के ऐसे जरूरतमंद व्यक्ति जो असहाय, विकलांग, मानसिक, शारीरिक रूप से कमजोर हैं, उनके उत्थान एवं जीविकोपार्जन हेतु आर्थिक सहायता करना।",
//   },
//   {
//     icon: Home,
//     title: "नशामुक्ति अभियान",
//     description:
//       "समाज में नशामुक्ति केन्द्रों की स्थापना करना तथा ओ.बी.सी. वर्ग को नशामुक्त बनाने का प्रयास करना।",
//   },
//   {
//     icon: Users,
//     title: "भ्रूण हत्या रोकथाम",
//     description:
//       "ओ.बी.सी. वर्ग की लड़कियों / महिलाओं की गिरती जनसंख्या को रोकने के लिये भ्रूण हत्या रोकथाम करना एवं समाज में बेटी बचाओ-बेटी पढ़ाओ अभियान को बढ़ावा देना।",
//   },
//   {
//     icon: Briefcase,
//     title: "रोजगार सहायता",
//     description:
//       "ओ.बी.सी. वर्ग के बेरोजगार युवाओं को रोजगार उपलब्ध कराने हेतु मार्गदर्शन एवं सहायता प्रदान करना।",
//   },
//   {
//     icon: GraduationCap,
//     title: "छात्र शिक्षा सहायता",
//     description:
//       "ओ.बी.सी. वर्ग के छात्र / छात्राओं को पूर्व प्राथमिक, उच्च प्राथमिक, माध्यमिक, सीनियर सेकेंडरी एवं उच्चतर शिक्षा के लिये प्रोत्साहित करना एवं छात्रवृत्ति, शिक्षा सहायता प्रदान करना।",
//   },
//   {
//     icon: BookOpenCheck,
//     title: "शिक्षा जागरूकता कार्यक्रम",
//     description:
//       "ओ.बी.सी. वर्ग में शिक्षा के प्रति जागरूकता हेतु व्याख्यान, प्रतियोगिता, सेमिनार एवं सांस्कृतिक कार्यक्रम आयोजित करना।",
//   },
//   {
//     icon: GraduationCap,
//     title: "महिला शिक्षा विशेष व्यवस्था",
//     description:
//       "ओ.बी.सी. वर्ग की शिक्षा की जरूरतों हेतु प्रशिक्षण व्यवस्था, पुस्तकालय एवं अध्ययन केन्द्र स्थापित करना।",
//   },
//   {
//     icon: GraduationCap,
//     title: "छात्रवृत्ति एवं कोचिंग सुविधा",
//     description:
//       "ओ.बी.सी. वर्ग के छात्रों को प्रतियोगी परीक्षाओं हेतु कोचिंग, छात्रवृत्ति एवं तकनीकी शिक्षा की सुविधा प्रदान करना।",
//   },
//   {
//     icon: Stethoscope,
//     title: "चिकित्सा सहायता",
//     description:
//       "ओ.बी.सी. वर्ग के व्यक्तियों को गंभीर बीमारी के इलाज हेतु चिकित्सा सहायता प्रदान करना एवं नि:शुल्क चिकित्सा शिविर आयोजित करना।",
//   },
//   {
//     icon: HeartHandshake,
//     title: "जागरूकता कार्यक्रम आयोजन",
//     description:
//       "ओ.बी.सी. वर्ग के विकास हेतु जन जागरूकता कार्यक्रम, शिविर एवं प्रशिक्षण कार्यक्रम आयोजित करना।",
//   },
//   {
//     icon: Briefcase,
//     title: "कृषि एवं स्वरोजगार सहायता",
//     description:
//       "ओ.बी.सी. वर्ग के लिये कृषि, पशुपालन, कुटीर उद्योग एवं स्वरोजगार हेतु प्रशिक्षण एवं सहायता प्रदान करना।",
//   },
//   {
//     icon: Users,
//     title: "सरकार एवं समाज समन्वय",
//     description:
//       "ओ.बी.सी. वर्ग के हित में सरकार एवं समाज के बीच समन्वय स्थापित करना एवं योजनाओं का लाभ दिलाना।",
//   },
//   {
//     icon: Home,
//     title: "धर्मशाला एवं आश्रम संचालन",
//     description:
//       "धर्मशाला, छात्रावास, महिला आश्रम, वृद्धाश्रम एवं अन्य सामाजिक संस्थाओं का संचालन एवं रखरखाव करना।",
//   },
// ];

// const DetailedGallery: React.FC = () => {

//   const ref = useRef<HTMLDivElement | null>(null);

//   const isInView = useInView(ref, {
//     once: true,
//     margin: "-100px",
//   });


//   return (
//     <section
//       ref={ref}
//       className="py-10 bg-cream-pattern min-h-screen"
//     >

//       <div className="container mx-auto px-4">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >

//           <span className="inline-block px-4 py-1.5 bg-green-india-light text-secondary rounded-full text-sm font-semibold mb-4">
//             सदस्यता अभियान
//           </span>

//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
//             सभी <span className="text-secondary">उद्देश्य</span>
//           </h1>

//           <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
//             ओ.बी.सी. महासभा के सदस्य बनकर इन सभी लाभों का फायदा उठाएं
//           </p>

//         </motion.div>


//         {/* ✅ Grid layout added */}
//         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-[6%]">

//           {objectives.map((obj, index) => {

//             const Icon = obj.icon;

//             return (
//               <motion.div
//                 key={obj.title}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{
//                   duration: 0.5,
//                   delay: index * 0.08,
//                 }}
//                 className="
//                   group
//                   flex gap-5
//                   bg-card
//                   rounded-xl
//                   p-6
//                   border border-border
//                   hover:border-secondary/30
//                   shadow-sm
//                   hover:shadow-lg
//                   transition-all duration-300
//                 "
//               >

//                 {/* ✅ India Flag Color Icon Background */}
//                 <div
//                   className={`
//                     shrink-0
//                     w-14 h-14
//                     rounded-xl
//                     flex items-center justify-center
//                     group-hover:scale-110
//                     transition-transform
//                     ${
//                       index % 3 === 0
//                         ? "bg-orange-500"
//                         : index % 3 === 1
//                         ? "bg-white border border-gray-300"
//                         : "bg-green-600"
//                     }
//                   `}
//                 >

//                   <Icon
//                     className={`h-7 w-7 ${
//                       index % 3 === 1
//                         ? "text-green-700"
//                         : "text-white"
//                     }`}
//                   />

//                 </div>


//                 {/* Content */}
//                 <div className="flex-1">

//                   <h3 className="
//                     text-lg
//                     font-heading
//                     font-bold
//                     text-foreground
//                     mb-2
//                     flex items-center gap-2
//                   ">

//                     <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />

//                     {obj.title}

//                   </h3>


//                   <p className="text-muted-foreground leading-relaxed">
//                     {obj.description}
//                   </p>

//                 </div>

//               </motion.div>
//             );

//           })}

//         </div>

//       </div>

//     </section>
//   );
// };

// export default DetailedGallery;








import { useEffect, useRef, useState } from "react";

import g1 from "../assets/gellery.jpeg";
import g2 from "../assets/gellery2.jpeg";
import g3 from "../assets/gellery3.jpeg";
import g4 from "../assets/gellery4.jpeg";
import g5 from "../assets/gellery5.jpeg";
import g6 from "../assets/gellery6.jpeg";
import g7 from "../assets/gellery7.jpeg";
import g8 from "../assets/gellery8.jpeg";
import g9 from "../assets/gellery9.jpeg";
import g10 from "../assets/gellery10.jpeg";
import g11 from "../assets/gellery11.jpeg";
import g12 from "../assets/gellery12.jpeg";
import g13 from "../assets/gellery13.jpeg";
import g14 from "../assets/gellery14.jpeg";
import g15 from "../assets/gellery15.jpeg";
import g16 from "../assets/gellery16.jpeg";
import g17 from "../assets/gellery17.jpeg";
import g18 from "../assets/gellery18.jpeg";
import g19 from "../assets/gellery19.jpeg";
import g20 from "../assets/gellery20.jpeg";
import g21 from "../assets/gellery21.jpeg";

// ─── Types ────────────────────────────────────────────────
interface GalleryItem {
  img: string;
  title: string;
  cat: Category;
}

type Category = "सामाजिक" | "शिक्षा" | "स्वास्थ्य" | "सम्मान" | "जागरूकता";
type SocialSubFilter = "वृक्षारोपण" | "रक्तदान" | "सामूहिक विवाह";
type FilterOption = "all" | Category | SocialSubFilter;

// ─── Data ─────────────────────────────────────────────────
const galleryData: GalleryItem[] = [
  {
    img: g1,
    title: "सामाजिक सेवा कार्यक्रम",
    cat: "सामाजिक",
  },
  {
    img: g2,
    title: "शिक्षा सहायता कार्यक्रम",
    cat: "शिक्षा",
  },
  {
    img: g3,
    title: "निःशुल्क चिकित्सा शिविर",
    cat: "स्वास्थ्य",
  },
  {
    img: g4,
    title: "सामुदायिक बैठक",
    cat: "सामाजिक",
  },
  {
    img: g5,
    title: "सम्मान समारोह",
    cat: "सम्मान",
  },
  {
    img: g6,
    title: "गरीब बच्चों को सहायता",
    cat: "शिक्षा",
  },
  {
    img: g7,
    title: "जागरूकता अभियान",
    cat: "जागरूकता",
  },
  {
    img: g8,
    title: "समाज सेवा कार्यक्रम",
    cat: "सामाजिक",
  },
  {
    img: g9,
    title: "समाज सेवा कार्यक्रम",
    cat: "सामाजिक",
  },
  {
    img: g10,
    title: "सामाजिक कार्यक्रम",
    cat: "सामाजिक",
  },
  {
    img: g11,
    title: "शिक्षा कार्यक्रम",
    cat: "शिक्षा",
  },
  {
    img: g6,
    title: "स्वास्थ्य शिविर",
    cat: "स्वास्थ्य",
  },
  {
    img: g13,
    title: "सामाजिक सेवा",
    cat: "सामाजिक",
  },
  {
    img: g14,
    title: "सम्मान कार्यक्रम",
    cat: "सम्मान",
  },
  {
    img: g15,
    title: "शिक्षा सहायता",
    cat: "शिक्षा",
  },
  {
    img: g16,
    title: "जागरूकता अभियान",
    cat: "जागरूकता",
  },
  {
    img: g17,
    title: "समाज सेवा कार्यक्रम",
    cat: "सामाजिक",
  },
  {
    img: g18,
    title: "स्वास्थ्य सेवा",
    cat: "स्वास्थ्य",
  },
  {
    img: g19,
    title: "सामुदायिक कार्यक्रम",
    cat: "सामाजिक",
  },
  {
    img: g20,
    title: "सम्मान समारोह",
    cat: "सम्मान",
  },
  {
    img: g21,
    title: "सामाजिक अभियान",
    cat: "सामाजिक",
  },
];

const stats = [
  { value: "500+", label: "आयोजित कार्यक्रम" },
  { value: "10,000+", label: "लाभार्थी परिवार" },
  { value: "50+", label: "जिले कवर किए" },
  { value: "15+", label: "वर्षों का अनुभव" },
];

const filterOptions: { label: string; value: FilterOption }[] = [
  { label: "सभी",         value: "all"        },
  { label: "सामाजिक सेवा", value: "सामाजिक"    },
  { label: "शिक्षा",       value: "शिक्षा"     },
  { label: "स्वास्थ्य",    value: "स्वास्थ्य"  },
  { label: "सम्मान",       value: "सम्मान"     },
  { label: "जागरूकता",     value: "जागरूकता"   },
];

const socialDropdownOptions: { label: SocialSubFilter; value: SocialSubFilter }[] = [
  { label: "वृक्षारोपण", value: "वृक्षारोपण" },
  { label: "रक्तदान", value: "रक्तदान" },
  { label: "सामूहिक विवाह", value: "सामूहिक विवाह" },
];

// ─── Fade-up hook ──────────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ─── GalleryCard ──────────────────────────────────────────
interface CardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
  delay?: number;
}

function GalleryCard({ item, index, onClick, delay = 0 }: CardProps) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useFadeUp();

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-8px) scale(1.02)"
            : "translateY(0)"
          : "translateY(36px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
        borderRadius: "14px",
        overflow: "hidden",
        cursor: "pointer",
        width: "100%",
        height: "300px",
        position: "relative",
        border: "1px solid rgba(255,107,0,0.22)",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.22), 0 0 0 2px rgba(255,107,0,0.45)"
          : "0 4px 20px rgba(0,0,0,0.10)",
      }}
    >
      {/* Tag badge */}
      <span
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 2,
          background: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(6px)",
          color: "#FF6B00",
          fontSize: "0.68rem",
          fontWeight: 700,
          padding: "3px 9px",
          borderRadius: "100px",
          letterSpacing: "0.03em",
          border: "1px solid rgba(255,107,0,0.5)",
        }}
      >
        {item.cat}
      </span>

      {/* Image */}
      <img
        src={item.img}
        alt={item.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
          transform: hovered ? "scale(1.10)" : "scale(1)",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.50) 40%, rgba(0,0,0,0.08) 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "20px",
        }}
      >
        {/* Orange accent line */}
        <div
          style={{
            width: "40px",
            height: "2px",
            background: "linear-gradient(90deg, #FF6B00, #FF9A40)",
            marginBottom: "8px",
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.4s 0.05s cubic-bezier(0.23,1,0.32,1)",
          }}
        />
        {/* Title */}
        <p
          style={{
            color: "#fff",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.4,
            margin: 0,
            transform: hovered ? "translateY(0)" : "translateY(12px)",
            transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1)",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          {item.title}
        </p>
      </div>
    </div>
  );
}

// ─── Popup ─────────────────────────────────────────────────
interface PopupProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onDot: (i: number) => void;
}

function Popup({ items, currentIndex, onClose, onNext, onPrev, onDot }: PopupProps) {
  const item = items[currentIndex];
  const [imgVisible, setImgVisible] = useState(true);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onPrev, onClose]);

  const touchStartX = useRef(0);

  useEffect(() => {
    setImgVisible(false);
    setTimeout(() => setImgVisible(true), 100);
  }, [currentIndex]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.96)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) < 40) return;
        diff > 0 ? onNext() : onPrev();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "860px",
          width: "92vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: -18,
            right: -18,
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(255,107,0,0.18)",
            border: "1.5px solid rgba(255,107,0,0.6)",
            color: "#FF6B00",
            fontSize: "1.1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            transition: "background 0.2s",
          }}
        >
          ✕
        </button>

        {/* Image wrapper */}
        <div
          style={{
            width: "100%",
            maxHeight: "70vh",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1.5px solid rgba(255,107,0,0.35)",
            boxShadow: "0 0 60px rgba(255,107,0,0.18)",
            position: "relative",
          }}
        >
          <img
            src={item.img}
            alt={item.title}
            style={{
              width: "100%",
              maxHeight: "70vh",
              objectFit: "cover",
              display: "block",
              opacity: imgVisible ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}
          />

          {/* Prev */}
          <button
            onClick={onPrev}
            style={{
              position: "absolute",
              top: "50%",
              left: -58,
              transform: "translateY(-50%)",
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "rgba(255,107,0,0.15)",
              border: "1.5px solid rgba(255,107,0,0.5)",
              color: "#FF6B00",
              fontSize: "1.3rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
          >
            ←
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            style={{
              position: "absolute",
              top: "50%",
              right: -58,
              transform: "translateY(-50%)",
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: "rgba(255,107,0,0.15)",
              border: "1.5px solid rgba(255,107,0,0.5)",
              color: "#FF6B00",
              fontSize: "1.3rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
          >
            →
          </button>
        </div>

        {/* Title */}
        <p
          style={{
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#FF6B00",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          {item.title}
        </p>

        {/* Counter */}
        <p style={{ fontSize: "0.78rem", color: "#666", marginTop: "6px", fontFamily: "monospace", letterSpacing: "0.1em" }}>
          {currentIndex + 1} / {items.length}
        </p>

        {/* Dots */}
        <div style={{ display: "flex", gap: "7px", marginTop: "14px" }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => onDot(i)}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: i === currentIndex ? "#FF6B00" : "#333",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
                transition: "background 0.2s, transform 0.2s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────
export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [socialDropdownOpen, setSocialDropdownOpen] = useState(false);
  const [popupOpen, setPopupOpen]       = useState(false);
  const [popupIndex, setPopupIndex]     = useState(0);

  const { ref: headerRef, visible: headerVisible } = useFadeUp();
  const { ref: statsRef,  visible: statsVisible  } = useFadeUp();
  const { ref: filterRef, visible: filterVisible } = useFadeUp();

  const isSocialFilter =
    activeFilter === "सामाजिक" ||
    activeFilter === "वृक्षारोपण" ||
    activeFilter === "रक्तदान" ||
    activeFilter === "सामूहिक विवाह";

  const filtered = galleryData.filter((item) => {
    if (activeFilter === "all") return true;
    if (isSocialFilter) return item.cat === "सामाजिक";
    return item.cat === activeFilter;
  });

  const socialFilterActive = isSocialFilter;

  const handleFilterChange = (value: FilterOption) => {
    setActiveFilter(value);
    setPopupIndex(0);
    setSocialDropdownOpen(false);
  };

  const openPopup = (index: number) => {
    setPopupIndex(index);
    setPopupOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setPopupOpen(false);
    document.body.style.overflow = "";
  };

  const goNext = () => setPopupIndex((i) => (i + 1) % filtered.length);
  const goPrev = () => setPopupIndex((i) => (i - 1 + filtered.length) % filtered.length);

  return (
    <>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <section
        style={{
          background: `
            radial-gradient(ellipse 70% 40% at 15% 10%, rgba(255,107,0,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 85% 90%, rgba(255,107,0,0.04) 0%, transparent 60%),
            #F8F5F2
          `,
          padding: "80px 24px",
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Top pattern strip */}
       

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
            marginBottom: "48px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          {/* Tagline */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
         
           
          
          </div>

          {/* Main heading — orange to black gradient */}
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-primary leading-tight mb-6">
  हमारे द्वारा किए गए उत्कृष्ट कार्य
</h2>

          {/* Decorative lines under heading */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
            <div style={{ width: 120, height: 3, background: "linear-gradient(90deg,transparent,#FF6B00,#CC4400,#FF6B00,transparent)", borderRadius: 2 }} />
            <div style={{ width: 60, height: 2, background: "linear-gradient(90deg,transparent,#111,transparent)", borderRadius: 2 }} />
          </div>

          {/* Description */}
          <p style={{ color: "#1a1a1a", fontSize: "1rem", lineHeight: 1.8, maxWidth: "700px", margin: "0 auto", fontWeight: 500 }}>
            यहां हमारे द्वारा किए गए सामाजिक कार्यक्रमों, सामुदायिक बैठकों, सेवा कार्यों और
            समाज के विकास के लिए किए गए महत्वपूर्ण प्रयासों की झलक देख सकते हैं।
          </p>

          {/* Star divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg,transparent,#FF6B00)" }} />
            <svg width="18" height="18" viewBox="0 0 20 20" fill="#FF6B00" opacity={0.85}>
              <polygon points="10,1 12.4,7.6 19.5,7.6 13.8,11.8 16.2,18.4 10,14.2 3.8,18.4 6.2,11.8 0.5,7.6 7.6,7.6" />
            </svg>
            <div style={{ height: 1, width: 60, background: "linear-gradient(90deg,#FF6B00,transparent)" }} />
          </div>
        </div>

        {/* ── Stats ── */}
        <div
          ref={statsRef}
          style={{
            maxWidth: "1200px",
            margin: "0 auto 40px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.6s ease 100ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) 100ms",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={statCard}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #FF6B00, #CC3300, #111)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#1a1a1a", marginTop: "4px", fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Filter ── */}
        <div
          ref={filterRef}
          style={{
            maxWidth: "1200px",
            margin: "0 auto 24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            position: "relative",
            zIndex: 200,
            overflow: "visible",
            opacity: filterVisible ? 1 : 0,
            transform: filterVisible ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 0.6s ease 150ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) 150ms",
          }}
        >
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.value;
            if (opt.value === "सामाजिक") {
              return (
                <div
                  key={opt.value}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setSocialDropdownOpen(true)}
                  onMouseLeave={() => setSocialDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => handleFilterChange(opt.value)}
                    style={{
                      padding: "6px 18px",
                      borderRadius: "100px",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                      border: socialFilterActive ? "1.5px solid transparent" : "1.5px solid rgba(255,107,0,0.4)",
                      background: socialFilterActive
                        ? "linear-gradient(135deg, #FF6B00, #CC3300)"
                        : "#fff",
                      color: socialFilterActive ? "#fff" : "#111",
                      boxShadow: socialFilterActive ? "0 4px 15px rgba(255,107,0,0.4)" : "none",
                      transition: "all 0.22s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {opt.label}
                    <span
                      style={{
                        fontSize: "0.7rem",
                        transform: socialDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  {socialDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        minWidth: "180px",
                        background: "#fff",
                        border: "1px solid rgba(255,107,0,0.18)",
                        borderRadius: "12px",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                        padding: "8px",
                        zIndex: 100,
                      }}
                    >
                      {socialDropdownOptions.map((socialOpt) => {
                        const isSocialActive = activeFilter === socialOpt.value;
                        return (
                          <button
                            key={socialOpt.value}
                            type="button"
                            onClick={() => handleFilterChange(socialOpt.value)}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              padding: "10px 12px",
                              borderRadius: "8px",
                              border: "none",
                              background: isSocialActive ? "rgba(255,107,0,0.10)" : "transparent",
                              color: isSocialActive ? "#CC3300" : "#111",
                              fontFamily: "'Noto Sans Devanagari', sans-serif",
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            {socialOpt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleFilterChange(opt.value)}
                style={{
                  padding: "6px 18px",
                  borderRadius: "100px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  border: isActive ? "1.5px solid transparent" : "1.5px solid rgba(255,107,0,0.4)",
                  background: isActive
                    ? "linear-gradient(135deg, #FF6B00, #CC3300)"
                    : "#fff",
                  color: isActive ? "#fff" : "#111",
                  boxShadow: isActive ? "0 4px 15px rgba(255,107,0,0.4)" : "none",
                  transition: "all 0.22s ease",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Item count */}
        <p style={{ textAlign: "center", color: "#555", fontSize: "0.8rem", marginBottom: "24px", letterSpacing: "0.05em", fontWeight: 600 }}>
          {filtered.length} तस्वीरें
        </p>

        {/* ── Grid ── */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {filtered.map((item, i) => (
            <GalleryCard
              key={`${item.title}-${i}`}
              item={item}
              index={i}
              delay={(i % 4) * 80}
              onClick={() => openPopup(i)}
            />
          ))}
        </div>

    
      </section>

      {/* ── Popup ── */}
      {popupOpen && (
        <Popup
          items={filtered}
          currentIndex={popupIndex}
          onClose={closePopup}
          onNext={goNext}
          onPrev={goPrev}
          onDot={setPopupIndex}
        />
      )}
    </>
  );
}


const statCard: React.CSSProperties = {
  background: "linear-gradient(135deg, #fff 0%, #FFF5EF 100%)",
  border: "1px solid rgba(255,107,0,0.25)",
  borderRadius: "12px",
  padding: "20px 28px",
  textAlign: "center",
  boxShadow: "0 2px 12px rgba(255,107,0,0.08)",
};
