import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import {
  Scale,
  BookOpen,
  Network,
  Award,
  Download,
  BadgeCheck,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: unknown) => { open: () => void };
  }
}

// ── State-District Data ───────────────────────────────────────────────────────
const stateDistrictData = {
  राजस्थान: [
    "अजमेर",
    "अलवर",
    "बांसवाड़ा",
    "बारां",
    "बाड़मेर",
    "भरतपुर",
    "भीलवाड़ा",
    "बीकानेर",
    "बूंदी",
    "चित्तौड़गढ़",
    "चूरू",
    "दौसा",
    "धौलपुर",
    "डूंगरपुर",
    "हनुमानगढ़",
    "जयपुर",
    "जैसलमेर",
    "जालोर",
    "झालावाड़",
    "झुंझुनू",
    "जोधपुर",
    "करौली",
    "कोटा",
    "नागौर",
    "पाली",
    "प्रतापगढ़",
    "राजसमंद",
    "सवाई माधोपुर",
    "सीकर",
    "सिरोही",
    "श्री गंगानगर",
    "टोंक",
    "उदयपुर",
  ],
  "उत्तर प्रदेश": [
    "आगरा",
    "अलीगढ़",
    "अम्बेडकर नगर",
    "अमेठी",
    "अमरोहा",
    "औरैया",
    "अयोध्या",
    "आजमगढ़",
    "बागपत",
    "बहराइच",
    "बलिया",
    "बलरामपुर",
    "बांदा",
    "बाराबंकी",
    "बरेली",
    "बस्ती",
    "बिजनौर",
    "बदायूं",
    "बुलंदशहर",
    "चंदौली",
    "चित्रकूट",
    "देवरिया",
    "एटा",
    "इटावा",
    "फर्रुखाबाद",
    "फतेहपुर",
    "फिरोजाबाद",
    "गौतम बुद्ध नगर",
    "गाज़ियाबाद",
    "गाजीपुर",
    "गोंडा",
    "गोरखपुर",
    "हमीरपुर",
    "हापुड़",
    "हरदोई",
    "हाथरस",
    "जालौन",
    "जौनपुर",
    "झांसी",
    "कानपुर देहात",
    "कानपुर नगर",
    "कासगंज",
    "कौशाम्बी",
    "कुशीनगर",
    "लखीमपुर खीरी",
    "ललितपुर",
    "लखनऊ",
    "महाराजगंज",
    "महोबा",
    "मैनपुरी",
    "मथुरा",
    "मऊ",
    "मेरठ",
    "मिर्जापुर",
    "मुरादाबाद",
    "मुजफ्फरनगर",
    "पीलीभीत",
    "प्रतापगढ़",
    "प्रयागराज",
    "रायबरेली",
    "रामपुर",
    "सहारनपुर",
    "संभल",
    "संत कबीर नगर",
    "शाहजहांपुर",
    "शामली",
    "श्रावस्ती",
    "सिद्धार्थनगर",
    "सीतापुर",
    "सोनभद्र",
    "सुल्तानपुर",
    "उन्नाव",
    "वाराणसी",
  ],
  "मध्य प्रदेश": [
    "आगर मालवा",
    "अलीराजपुर",
    "अनूपपुर",
    "अशोकनगर",
    "बालाघाट",
    "बड़वानी",
    "बैतूल",
    "भिंड",
    "भोपाल",
    "बुरहानपुर",
    "छतरपुर",
    "छिंदवाड़ा",
    "दमोह",
    "दतिया",
    "देवास",
    "धार",
    "डिंडोरी",
    "गुना",
    "ग्वालियर",
    "हरदा",
    "होशंगाबाद",
    "इंदौर",
    "जबलपुर",
    "झाबुआ",
    "कटनी",
    "खंडवा",
    "खरगोन",
    "मंडला",
    "मंदसौर",
    "मुरैना",
    "नरसिंहपुर",
    "नीमच",
    "निवाड़ी",
    "पन्ना",
    "रायसेन",
    "राजगढ़",
    "रतलाम",
    "रीवा",
    "सागर",
    "सतना",
    "सीहोर",
    "सिओनी",
    "शहडोल",
    "शाजापुर",
    "श्योपुर",
    "शिवपुरी",
    "सीधी",
    "सिंगरौली",
    "टीकमगढ़",
    "उज्जैन",
    "उमरिया",
    "विदिशा",
  ],
  महाराष्ट्र: [
    "अहमदनगर",
    "अकोला",
    "अमरावती",
    "औरंगाबाद",
    "बीड",
    "भंडारा",
    "बुलढाणा",
    "चंद्रपुर",
    "धुले",
    "गडचिरोली",
    "गोंदिया",
    "हिंगोली",
    "जलगांव",
    "जालना",
    "कोल्हापुर",
    "लातूर",
    "मुंबई शहर",
    "मुंबई उपनगर",
    "नागपुर",
    "नांदेड़",
    "नंदुरबार",
    "नासिक",
    "उस्मानाबाद",
    "पालघर",
    "परभणी",
    "पुणे",
    "रायगड",
    "रत्नागिरी",
    "सांगली",
    "सातारा",
    "सिंधुदुर्ग",
    "सोलापुर",
    "ठाणे",
    "वर्धा",
    "वाशिम",
    "यवतमाल",
  ],
  गुजरात: [
    "अहमदाबाद",
    "अमरेली",
    "आणंद",
    "अरावली",
    "बनासकांठा",
    "भरूच",
    "भावनगर",
    "बोटाद",
    "छोटाउदेपुर",
    "दाहोद",
    "डांग",
    "देवभूमि द्वारका",
    "गांधीनगर",
    "गिर सोमनाथ",
    "जामनगर",
    "जूनागढ़",
    "खेड़ा",
    "कच्छ",
    "महिसागर",
    "महेसाणा",
    "मोरबी",
    "नर्मदा",
    "नवसारी",
    "पंचमहल",
    "पाटण",
    "पोरबंदर",
    "राजकोट",
    "साबरकांठा",
    "सूरत",
    "सुरेंद्रनगर",
    "तापी",
    "वडोदरा",
    "वलसाड",
  ],
  बिहार: [
    "अरवल",
    "औरंगाबाद",
    "बांका",
    "बेगूसराय",
    "भागलपुर",
    "भोजपुर",
    "बक्सर",
    "दरभंगा",
    "पूर्वी चंपारण",
    "गया",
    "गोपालगंज",
    "जमुई",
    "जहानाबाद",
    "कैमूर",
    "कटिहार",
    "खगड़िया",
    "किशनगंज",
    "लखीसराय",
    "मधेपुरा",
    "मधुबनी",
    "मुंगेर",
    "मुजफ्फरपुर",
    "नालंदा",
    "नवादा",
    "पटना",
    "पूर्णिया",
    "रोहतास",
    "सहरसा",
    "समस्तीपुर",
    "सारण",
    "शेखपुरा",
    "शिवहर",
    "सीतामढ़ी",
    "सीवान",
    "सुपौल",
    "वैशाली",
    "पश्चिमी चंपारण",
  ],
  पंजाब: [
    "अमृतसर",
    "बरनाला",
    "बठिंडा",
    "फरीदकोट",
    "फतेहगढ़ साहिब",
    "फाजिल्का",
    "फिरोजपुर",
    "गुरदासपुर",
    "होशियारपुर",
    "जालंधर",
    "कपूरथला",
    "लुधियाना",
    "मानसा",
    "मोगा",
    "मोहाली",
    "मुक्तसर",
    "नवांशहर",
    "पठानकोट",
    "पटियाला",
    "रूपनगर",
    "संगरूर",
    "तरन तारन",
  ],
  हरियाणा: [
    "अंबाला",
    "भिवानी",
    "चरखी दादरी",
    "फरीदाबाद",
    "फतेहाबाद",
    "गुरुग्राम",
    "हिसार",
    "झज्जर",
    "झींद",
    "कैथल",
    "करनाल",
    "कुरुक्षेत्र",
    "महेंद्रगढ़",
    "नूंह",
    "पलवल",
    "पंचकुला",
    "पानीपत",
    "रेवाड़ी",
    "रोहतक",
    "सिरसा",
    "सोनीपत",
    "यमुनानगर",
  ],
  दिल्ली: [
    "मध्य दिल्ली",
    "पूर्वी दिल्ली",
    "नई दिल्ली",
    "उत्तर दिल्ली",
    "उत्तर पूर्वी दिल्ली",
    "उत्तर पश्चिमी दिल्ली",
    "शाहदरा",
    "दक्षिण दिल्ली",
    "दक्षिण पूर्वी दिल्ली",
    "दक्षिण पश्चिमी दिल्ली",
    "पश्चिमी दिल्ली",
  ],
  छत्तीसगढ़: [
    "बालोद",
    "बलौदाबाजार",
    "बलरामपुर",
    "बस्तर",
    "बेमेतरा",
    "बीजापुर",
    "बिलासपुर",
    "दंतेवाड़ा",
    "धमतरी",
    "दुर्ग",
    "गरियाबंद",
    "जांजगीर-चांपा",
    "जशपुर",
    "कबीरधाम",
    "कांकेर",
    "कोंडागांव",
    "कोरबा",
    "कोरिया",
    "महासमुंद",
    "मुंगेली",
    "नारायणपुर",
    "रायगढ़",
    "रायपुर",
    "राजनांदगांव",
    "सुकमा",
    "सूरजपुर",
    "सरगुजा",
  ],
  झारखंड: [
    "बोकारो",
    "चतरा",
    "देवघर",
    "धनबाद",
    "दुमका",
    "पूर्वी सिंहभूम",
    "गढ़वा",
    "गिरिडीह",
    "गोड्डा",
    "गुमला",
    "हजारीबाग",
    "जामताड़ा",
    "खूंटी",
    "कोडरमा",
    "लातेहार",
    "लोहरदगा",
    "पाकुड़",
    "पलामू",
    "रामगढ़",
    "रांची",
    "साहिबगंज",
    "सरायकेला खरसावां",
    "सिमडेगा",
    "पश्चिमी सिंहभूम",
  ],
  उत्तराखंड: [
    "अल्मोड़ा",
    "बागेश्वर",
    "चमोली",
    "चंपावत",
    "देहरादून",
    "हरिद्वार",
    "नैनीताल",
    "पौड़ी गढ़वाल",
    "पिथौरागढ़",
    "रुद्रप्रयाग",
    "टिहरी गढ़वाल",
    "उधम सिंह नगर",
    "उत्तरकाशी",
  ],
  "हिमाचल प्रदेश": [
    "बिलासपुर",
    "चंबा",
    "हमीरपुर",
    "कांगड़ा",
    "किन्नौर",
    "कुल्लू",
    "लाहुल और स्पीति",
    "मंडी",
    "शिमला",
    "सिरमौर",
    "सोलन",
    "ऊना",
  ],
  केरल: [
    "अलाप्पुझा",
    "एर्नाकुलम",
    "इडुक्की",
    "कन्नूर",
    "कासरगोड",
    "कोल्लम",
    "कोट्टायम",
    "कोझिकोड",
    "मलप्पुरम",
    "पलक्कड़",
    "पथनमथिट्टा",
    "तिरुवनंतपुरम",
    "त्रिशूर",
    "वायनाड",
  ],
  तमिलनाडु: [
    "अरियालुर",
    "चेंगलपट्टू",
    "चेन्नई",
    "कोयंबटूर",
    "कुड्डालोर",
    "धर्मपुरी",
    "डिंडीगुल",
    "इरोड",
    "कांचीपुरम",
    "कन्याकुमारी",
    "करूर",
    "कृष्णागिरी",
    "मदुरै",
    "नागपट्टिनम",
    "नामक्कल",
    "पेरम्बलूर",
    "पुदुक्कोट्टई",
    "रामनाथपुरम",
    "सलेम",
    "शिवगंगा",
    "थंजावुर",
    "तिरुचिरापल्ली",
    "तिरुनेलवेली",
    "तिरुप्पुर",
    "तिरुवल्लुर",
    "वेल्लोर",
    "विरुधुनगर",
  ],
  कर्नाटक: [
    "बागलकोट",
    "बल्लारी",
    "बेलगावी",
    "बेंगलुरु ग्रामीण",
    "बेंगलुरु शहरी",
    "बीदर",
    "चामराजनगर",
    "चिकबल्लापुर",
    "चिकमगलूर",
    "चित्रदुर्ग",
    "दक्षिण कन्नड़",
    "दावणगेरे",
    "धारवाड़",
    "गदग",
    "हासन",
    "हावेरी",
    "कलबुर्गी",
    "कोडागु",
    "कोलार",
    "कोप्पल",
    "मांड्या",
    "मैसूर",
    "रायचूर",
    "रामनगर",
    "शिवमोग्गा",
    "तुमकुरु",
    "उडुपी",
    "उत्तर कन्नड़",
    "विजयपुरा",
    "यादगीर",
  ],
  "आंध्र प्रदेश": [
    "अनंतपुर",
    "चित्तूर",
    "पूर्वी गोदावरी",
    "गुंटूर",
    "कडपा",
    "कृष्णा",
    "कुर्नूल",
    "नेल्लोर",
    "प्रकाशम",
    "श्रीकाकुलम",
    "विशाखापट्टनम",
    "विजयनगरम",
    "पश्चिमी गोदावरी",
  ],
  तेलंगाना: [
    "आदिलाबाद",
    "भद्राद्री कोठागुडेम",
    "हैदराबाद",
    "जगतियाल",
    "जनगांव",
    "करीमनगर",
    "खम्मम",
    "महबूबनगर",
    "मेडक",
    "नलगोंडा",
    "निजामाबाद",
    "रंगारेड्डी",
    "संगारेड्डी",
    "सिद्दीपेट",
    "सूर्यापेट",
    "वारंगल ग्रामीण",
    "वारंगल शहरी",
  ],
  ओडिशा: [
    "अंगुल",
    "बलांगीर",
    "बालेश्वर",
    "बरगढ़",
    "बौध",
    "भद्रक",
    "कटक",
    "देवगढ़",
    "ढेंकनाल",
    "गजपति",
    "गंजाम",
    "जगतसिंहपुर",
    "जाजपुर",
    "झारसुगुड़ा",
    "कालाहांडी",
    "केंद्रपाड़ा",
    "केंदुझर",
    "खोरधा",
    "कोरापुट",
    "मलकानगिरि",
    "मयूरभंज",
    "नबरंगपुर",
    "नयागढ़",
    "पुरी",
    "रायगडा",
    "संबलपुर",
    "सोनपुर",
    "सुंदरगढ़",
  ],
  असम: [
    "बक्सा",
    "बरपेटा",
    "बिश्वनाथ",
    "बोंगाईगांव",
    "कछार",
    "चराईदेव",
    "चिरांग",
    "दरांग",
    "धेमाजी",
    "धुबरी",
    "डिब्रूगढ़",
    "गोलपारा",
    "गोलाघाट",
    "हैलाकांडी",
    "जोरहाट",
    "कामरूप",
    "कामरूप महानगर",
    "कार्बी आंगलोंग",
    "करीमगंज",
    "कोकराझार",
    "लखीमपुर",
    "मोरीगांव",
    "नगांव",
    "नलबाड़ी",
    "शिवसागर",
    "सोनितपुर",
    "तिनसुकिया",
    "उदलगुड़ी",
  ],
  "पश्चिम बंगाल": [
    "अलीपुरद्वार",
    "बांकुड़ा",
    "बीरभूम",
    "कूच बिहार",
    "दक्षिण दिनाजपुर",
    "दार्जिलिंग",
    "हुगली",
    "हावड़ा",
    "जलपाईगुड़ी",
    "कालिम्पोंग",
    "कोलकाता",
    "मालदा",
    "मुर्शिदाबाद",
    "नदिया",
    "उत्तर 24 परगना",
    "पश्चिम बर्धमान",
    "पश्चिम मेदिनीपुर",
    "पुरुलिया",
    "दक्षिण 24 परगना",
    "पूर्व बर्धमान",
    "पूर्व मेदिनीपुर",
    "उत्तर दिनाजपुर",
  ],
  गोवा: ["उत्तर गोवा", "दक्षिण गोवा"],
  "जम्मू और कश्मीर": [
    "अनंतनाग",
    "बांदीपोरा",
    "बारामूला",
    "बडगाम",
    "डोडा",
    "गांदरबल",
    "जम्मू",
    "कठुआ",
    "किश्तवाड़",
    "कुलगाम",
    "कुपवाड़ा",
    "पुलवामा",
    "पुंछ",
    "रामबन",
    "रियासी",
    "राजौरी",
    "सांबा",
    "शोपियां",
    "श्रीनगर",
    "उधमपुर",
  ],
};

const membershipOptions = [
  {
    id: "life",
    label: "आजीवन सदस्य",
    sublabel: "आजीवन",
    price: "₹251 (आजीवन)",
    popular: true,
  },
];

const benefits = [
  {
    icon: Scale,
    title: "कानूनी सहायता",
    subtitle: "निःशुल्क कानूनी मदद",
    desc: "ओबीसी संबंधित भेदभाव मामलों के लिए निःशुल्क कानूनी सहायता प्रदान की जाती है।",
  },
  {
    icon: BookOpen,
    title: "शिक्षा सहायता",
    subtitle: "छात्रवृत्ति और मार्गदर्शन",
    desc: "छात्रों को शिक्षा सहायता, छात्रवृत्ति और करियर मार्गदर्शन प्रदान किया जाता है।",
  },
  {
    icon: Network,
    title: "सामुदायिक नेटवर्क",
    subtitle: "10 लाख+ सदस्य",
    desc: "भारत भर में 10 लाख से अधिक सदस्यों के साथ जुड़कर मजबूत नेटवर्क का हिस्सा बनें।",
  },
  {
    icon: Award,
    title: "सम्मान और पहचान",
    subtitle: "प्रमाणपत्र और ID कार्ड",
    desc: "सदस्यता प्रमाणपत्र और आधिकारिक पहचान पत्र प्रदान किया जाता है।",
  },
];

// ── Validation patterns ───────────────────────────────────────────────────
const validationRules = {
  mobile: { regex: /^\d{10}$/, message: "मोबाइल नंबर 10 अंकों का होना चाहिए" },
  whatsapp: {
    regex: /^\d{10}$/,
    message: "व्हाट्सएप नंबर 10 अंकों का होना चाहिए",
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "कृपया मान्य ईमेल पता दर्ज करें",
  },
  pan: {
    regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    message: "मान्य PAN नंबर दर्ज करें (ABCDE1234F)",
  },
  aadhaar: { regex: /^\d{12}$/, message: "आधार नंबर 12 अंकों का होना चाहिए" },
};

const bloodGroupOptions = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const tshirtSizeOptions = ["S", "M", "L", "XL", "XXL"];
const educationOptions = [
  "8वीं पास",
  "10वीं पास",
  "12वीं पास",
  "स्नातक",
  "स्नातकोत्तर",
  "कंप्यूटर कोर्स",
  "डिप्लोमा",
  "अन्य",
];

type DropdownProps = {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  disabled?: boolean;
};

function Dropdown({
  label,
  placeholder,
  value,
  options,
  onSelect,
  disabled,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div ref={ref} className="relative flex flex-col">
      <label className="text-sm font-semibold text-[#0f2056] mb-1">
        {label}
      </label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setOpen((v) => !v);
          setSearch("");
        }}
        className={`w-full border rounded-lg px-4 py-2 text-sm text-left focus:outline-none focus:ring-4 transition ${
          disabled
            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
            : "border-gray-200 bg-white text-[#1a1a2e] focus:border-[#e87722] focus:ring-[#e87722]/20"
        }`}
      >
        {value || placeholder}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`${label} खोजें...`}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">
                कोई परिणाम नहीं मिला
              </div>
            ) : (
              filtered.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => {
                    onSelect(o);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition ${
                    o === value
                      ? "bg-orange-50 text-[#0f2056] font-semibold"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {o}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface FormData {
  memberName: string;
  fatherName: string;
  businessNature: string;
  organizationPosition: string;
  residenceAddress: string;
  officeAddress: string;
  residencePhone: string;
  officePhone: string;
  mobile: string;
  whatsapp: string;
  email: string;
  pan: string;
  aadhaar: string;
  education: string;
  otherEducation: string;
  dob: string;
  marriageDate: string;
  bloodGroup: string;
  tshirtSize: string;
  socialWork: string;
  specialAchievement: string;
  membershipType: string;
  state: string;
  district: string;
  imageFile?: File;
}

export default function MembershipPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    memberName: "",
    fatherName: "",
    businessNature: "",
    organizationPosition: "",
    residenceAddress: "",
    officeAddress: "",
    residencePhone: "",
    officePhone: "",
    mobile: "",
    whatsapp: "",
    email: "",
    pan: "",
    aadhaar: "",
    education: "",
    dob: "",
    marriageDate: "",
    bloodGroup: "",
    tshirtSize: "",
    socialWork: "",
    specialAchievement: "",
    membershipType: "life",
    state: "",
    district: "",
    otherEducation: "",
    imageFile: undefined,
  });

  const [selectedVidhansabha, setSelectedVidhansabha] = useState("");
  const handleVidhansabhaSelect = useCallback((vidhansabha: string) => {
    setSelectedVidhansabha(vidhansabha);
    // Optional: data को filter करें getData() में vidhansabha param add करके
  }, []);

  // paste.txt में STATESDISTRICTS के बाद ये add करें
  const VIDHANSHABHAS = [
    { id: 1, name: "सादुलशहर" },
    { id: 2, name: "गंगानगर" },
    { id: 3, name: "करणपुर" },
    { id: 4, name: "सूरतगढ़" },
    { id: 5, name: "रायसिंहनगर" },
    { id: 6, name: "अनूपगढ़" },
    { id: 7, name: "संगरिया" },
    { id: 8, name: "हनुमानगढ़" },
    { id: 9, name: "पिलीबंगा" },
    { id: 10, name: "नोहर" },
    { id: 11, name: "भादरा" },
    { id: 12, name: "खाजूवाला" },
    { id: 13, name: "बीकानेर पश्चिम" },
    { id: 14, name: "बीकानेर पूर्व" },
    { id: 15, name: "कोलायत" },
    { id: 16, name: "लूणकरणसर" },
    { id: 17, name: "डूंगरगढ़" },
    { id: 18, name: "नोखा" },
    { id: 19, name: "सादुलपुर" },
    { id: 20, name: "तारानगर" },
    { id: 21, name: "सरदारशहर" },
    { id: 22, name: "चूरू" },
    { id: 23, name: "रतनगढ़" },
    { id: 24, name: "सुजानगढ़" },
    { id: 25, name: "पिलानी" },
    { id: 26, name: "सूरजगढ़" },
    { id: 27, name: "झुंझुनू" },
    { id: 28, name: "मंडावा" },
    { id: 29, name: "नवलगढ़" },
    { id: 30, name: "उदयपुरवाटी" },
    { id: 31, name: "खेतड़ी" },
    { id: 32, name: "फतेहपुर" },
    { id: 33, name: "लक्ष्मणगढ़" },
    { id: 34, name: "धोद" },
    { id: 35, name: "सीकर" },
    { id: 36, name: "दांतारामगढ़" },
    { id: 37, name: "खंडेला" },
    { id: 38, name: "नीम का थाना" },
    { id: 39, name: "श्रीमाधोपुर" },
    { id: 40, name: "कोटपूतली" },
    { id: 41, name: "विराटनगर" },
    { id: 42, name: "शाहपुरा" },
    { id: 43, name: "चोमू" },
    { id: 44, name: "फुलेरा" },
    { id: 45, name: "दूदू" },
    { id: 46, name: "झोटवाड़ा" },
    { id: 47, name: "आमेर" },
    { id: 48, name: "जामवारामगढ़" },
    { id: 49, name: "हवा महल" },
    { id: 50, name: "विद्याधर नगर" },
    { id: 51, name: "सिविल लाइन्स" },
    { id: 52, name: "किशनपोल" },
    { id: 53, name: "आदर्श नगर" },
    { id: 54, name: "मालवीय नगर" },
    { id: 55, name: "सांगानेर" },
    { id: 56, name: "बगरू" },
    { id: 57, name: "बासी" },
    { id: 58, name: "चाकसू" },
    { id: 59, name: "तिजारा" },
    { id: 60, name: "किशनगढ़ बास" },
    { id: 61, name: "मुंडावर" },
    { id: 62, name: "बहरोड़" },
    { id: 63, name: "बानसूर" },
    { id: 64, name: "थानागाजी" },
    { id: 65, name: "अलवर ग्रामीण" },
    { id: 66, name: "अलवर शहर" },
    { id: 67, name: "रामगढ़" },
    { id: 68, name: "राजगढ़-लक्ष्मणगढ़" },
    { id: 69, name: "कठूमर" },
    { id: 70, name: "कामां" },
    { id: 71, name: "नगर" },
    { id: 72, name: "डीग-कुम्हेर" },
    { id: 73, name: "भरतपुर" },
    { id: 74, name: "नदबई" },
    { id: 75, name: "वीर" },
    { id: 76, name: "बयाना" },
    { id: 77, name: "बसेड़ी" },
    { id: 78, name: "बाड़ी" },
    { id: 79, name: "धौलपुर" },
    { id: 80, name: "राजाखेड़ा" },
    { id: 81, name: "टोडाभीम" },
    { id: 82, name: "हिण्डौन" },
    { id: 83, name: "करौली" },
    { id: 84, name: "सपोटरा" },
    { id: 85, name: "बांदीकुई" },
    { id: 86, name: "महवा" },
    { id: 87, name: "सिकराय" },
    { id: 88, name: "दौसा" },
    { id: 89, name: "लालसोट" },
    { id: 90, name: "गंगापुर" },
    { id: 91, name: "बामनवास" },
    { id: 92, name: "सवाई माधोपुर" },
    { id: 93, name: "खंडार" },
    { id: 94, name: "मालपुरा" },
    { id: 95, name: "टोंक" },
    { id: 96, name: "निवाई" },
    { id: 97, name: "देवली-उनियारा" },
    { id: 98, name: "किशनगढ़" },
    { id: 99, name: "पुष्कर" },
    { id: 100, name: "अजमेर उत्तर" },
    { id: 101, name: "अजमेर दक्षिण" },
    { id: 102, name: "नसीराबाद" },
    { id: 103, name: "ब्यावर" },
    { id: 104, name: "मसूदा" },
    { id: 105, name: "केकड़ी" },
    { id: 106, name: "लाडनूं" },
    { id: 107, name: "डीडवाना" },
    { id: 108, name: "जायल" },
    { id: 109, name: "नागौर" },
    { id: 110, name: "खींवसर" },
    { id: 111, name: "मेड़ता" },
    { id: 112, name: "डेगाना" },
    { id: 113, name: "मकराना" },
    { id: 114, name: "परबतसर" },
    { id: 115, name: "नावां" },
    { id: 116, name: "जैतारण" },
    { id: 117, name: "सोजत" },
    { id: 118, name: "पाली" },
    { id: 119, name: "मारवाड़ जंक्शन" },
    { id: 120, name: "बाली" },
    { id: 121, name: "सुमेरपुर" },
    { id: 122, name: "फलोदी" },
    { id: 123, name: "लोहावट" },
    { id: 124, name: "शेरगढ़" },
    { id: 125, name: "ओसियां" },
    { id: 126, name: "भोपालगढ़" },
    { id: 127, name: "सरदारपुरा" },
    { id: 128, name: "जोधपुर" },
    { id: 129, name: "सूरसागर" },
    { id: 130, name: "लूणी" },
    { id: 131, name: "बिलाड़ा" },
    { id: 132, name: "जैसलमेर" },
    { id: 133, name: "पोकरण" },
    { id: 134, name: "शिव" },
    { id: 135, name: "बाड़मेर" },
    { id: 136, name: "बायतू" },
    { id: 137, name: "पचपदरा" },
    { id: 138, name: "सिवाना" },
    { id: 139, name: "गुढ़ा मालानी" },
    { id: 140, name: "चौहटन" },
    { id: 141, name: "आहोर" },
    { id: 142, name: "जालोर" },
    { id: 143, name: "भीनमाल" },
    { id: 144, name: "सांचौर" },
    { id: 145, name: "रानीवाड़ा" },
    { id: 146, name: "सिरोही" },
    { id: 147, name: "पिंडवाड़ा-आबू" },
    { id: 148, name: "रेवदर" },
    { id: 149, name: "गोगुन्दा" },
    { id: 150, name: "झाड़ोल" },
    { id: 151, name: "खेरवाड़ा" },
    { id: 152, name: "उदयपुर ग्रामीण" },
    { id: 153, name: "उदयपुर" },
    { id: 154, name: "मावली" },
    { id: 155, name: "वल्लभनगर" },
    { id: 156, name: "सलूम्बर" },
    { id: 157, name: "धरियावद" },
    { id: 158, name: "डूंगरपुर" },
    { id: 159, name: "आसपुर" },
    { id: 160, name: "सागवाड़ा" },
    { id: 161, name: "चौरासी" },
    { id: 162, name: "घाटोल" },
    { id: 163, name: "गढ़ी" },
    { id: 164, name: "बांसवाड़ा" },
    { id: 165, name: "बागीदौरा" },
    { id: 166, name: "कुशलगढ़" },
    { id: 167, name: "कपासन" },
    { id: 168, name: "बेगूं" },
    { id: 169, name: "चित्तौड़गढ़" },
    { id: 170, name: "निंबाहेड़ा" },
    { id: 171, name: "बड़ी सादड़ी" },
    { id: 172, name: "प्रतापगढ़" },
    { id: 173, name: "भींडर" },
    { id: 174, name: "कुम्भलगढ़" },
    { id: 175, name: "राजसमंद" },
    { id: 176, name: "नाथद्वारा" },
    { id: 177, name: "आसींद" },
    { id: 178, name: "मांडल" },
    { id: 179, name: "सहाड़ा" },
    { id: 180, name: "भीलवाड़ा" },
    { id: 181, name: "शाहपुरा" },
    { id: 182, name: "जहाजपुर" },
    { id: 183, name: "मांडलगढ़" },
    { id: 184, name: "हिंडोली" },
    { id: 185, name: "केशोरायपाटन" },
    { id: 186, name: "बूंदी" },
    { id: 187, name: "पीपल्दा" },
    { id: 188, name: "सांगोद" },
    { id: 189, name: "कोटा उत्तर" },
    { id: 190, name: "कोटा दक्षिण" },
    { id: 191, name: "लाडपुरा" },
    { id: 192, name: "रामगंज मंडी" },
    { id: 193, name: "अंता" },
    { id: 194, name: "किशनगंज" },
    { id: 195, name: "बारां-अटरू" },
    { id: 196, name: "छबड़ा" },
    { id: 197, name: "डग" },
    { id: 198, name: "झालरापाटन" },
    { id: 199, name: "खानपुर" },
    { id: 200, name: "पीरावा" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Image validation (required)
    if (!form.imageFile) {
      newErrors.imageFile = "प्रोफाइल फोटो अपलोड करना आवश्यक है";
    }

    // Required fields
    if (!form.memberName.trim()) newErrors.memberName = "यह क्षेत्र आवश्यक है";
    if (!form.fatherName.trim()) newErrors.fatherName = "यह क्षेत्र आवश्यक है";
    if (!form.residenceAddress.trim())
      newErrors.residenceAddress = "यह क्षेत्र आवश्यक है";
    if (!form.dob) newErrors.dob = "यह क्षेत्र आवश्यक है";
    if (!form.state) newErrors.state = "यह क्षेत्र आवश्यक है";
    if (!form.district) newErrors.district = "यह क्षेत्र आवश्यक है";
    if (!form.bloodGroup) newErrors.bloodGroup = "यह क्षेत्र आवश्यक है";
    if (!form.tshirtSize) newErrors.tshirtSize = "यह क्षेत्र आवश्यक है";
    if (!form.education) newErrors.education = "यह क्षेत्र आवश्यक है";

    // Mobile validation (required)
    if (!form.mobile.trim()) {
      newErrors.mobile = "यह क्षेत्र आवश्यक है";
    } else if (
      !validationRules.mobile.regex.test(form.mobile.replace(/^\+91/, ""))
    ) {
      newErrors.mobile = validationRules.mobile.message;
    }

    // // Email validation (required)
    // if (!validationRules.email.regex.test(form.email)) {
    //   newErrors.email = validationRules.email.message;
    // }

    // Email optional - sirf filled ho tab validate
if (form.email.trim() && !validationRules.email.regex.test(form.email)) {
  newErrors.email = validationRules.email.message;
}


    // Optional fields (validate only if filled)
    if (
      form.whatsapp &&
      !validationRules.whatsapp.regex.test(form.whatsapp.replace(/^\+91/, ""))
    ) {
      newErrors.whatsapp = validationRules.whatsapp.message;
    }
    if (form.pan && !validationRules.pan.regex.test(form.pan)) {
      newErrors.pan = validationRules.pan.message;
    }
    if (form.aadhaar && !validationRules.aadhaar.regex.test(form.aadhaar)) {
      newErrors.aadhaar = validationRules.aadhaar.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real-time field validation
  const validateField = (fieldName: string, value: string): string => {
    const requiredFields = [
      "memberName",
      "fatherName",
      "residenceAddress",
      "dob",
      "state",
      "district",
      "bloodGroup",
      "tshirtSize",
      "education",
      "mobile",
    ];

    if (!value.trim() && requiredFields.includes(fieldName)) {
      return "यह क्षेत्र आवश्यक है";
    }

    if (fieldName === "mobile") {
      if (value.trim()) {
        if (!/^\d+$/.test(value)) {
          return "केवल संख्याएं दर्ज करें";
        }
        if (value.length < 10) {
          return "मोबाइल नंबर 10 अंकों का होना चाहिए";
        }
        if (value.length > 10) {
          return "मोबाइल नंबर 10 अंकों का होना चाहिए";
        }
        if (!validationRules.mobile.regex.test(value)) {
          return validationRules.mobile.message;
        }
      }
    } else if (fieldName === "whatsapp") {
      if (value.trim()) {
        if (!/^\d+$/.test(value)) {
          return "केवल संख्याएं दर्ज करें";
        }
        if (value.length < 10) {
          return "व्हाट्सएप नंबर 10 अंकों का होना चाहिए";
        }
        if (value.length > 10) {
          return "व्हाट्सएप नंबर 10 अंकों का होना चाहिए";
        }
        if (!validationRules.whatsapp.regex.test(value)) {
          return validationRules.whatsapp.message;
        }
      }
    }
    else if (fieldName === 'email') {
      if (value.trim() && !validationRules.email.regex.test(value)) {
        return validationRules.email.message;
      }
      return '';
    }
    
    else if (fieldName === "pan") {
      if (value.trim()) {
        const panUpper = value.toUpperCase();
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panUpper)) {
          return validationRules.pan.message;
        }
      }
    } else if (fieldName === "aadhaar") {
      if (value.trim()) {
        if (!/^\d+$/.test(value)) {
          return "केवल संख्याएं दर्ज करें";
        }
        if (value.length < 12) {
          return "आधार नंबर 12 अंकों का होना चाहिए";
        }
        if (value.length > 12) {
          return "आधार नंबर 12 अंकों का होना चाहिए";
        }
        if (!validationRules.aadhaar.regex.test(value)) {
          return validationRules.aadhaar.message;
        }
      }
    }

    return "";
  };

  // Check if field is valid (filled and no errors)
  const isFieldValid = (fieldName: string, value?: string): boolean => {
    const safeValue = value || "";
  
    if (!safeValue.trim()) return false;
  
    const error = validateField(fieldName, safeValue);
    return error === "";
  };

  // Check if entire form is valid for submit button
  const isFormValid = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "memberName",
      "fatherName",
      "residenceAddress",
      "dob",
      "state",
      "district",
      "bloodGroup",
      "tshirtSize",
      "education",
      "mobile",
    ];

    for (const field of requiredFields) {
      const value = form[field];
      if (typeof value !== "string") continue;
      if (!value.trim()) return false;
      const error = validateField(field, value);
      if (error) return false;
    }

    if (!form.imageFile) return false;

    return true;
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    let { name, value } = e.target;

    // Only allow numeric input for mobile, whatsapp, aadhaar
    if (
      name === "mobile" ||
      name === "whatsapp" ||
      name === "aadhaar" ||
      name === "officePhone"
    ) {
      value = value.replace(/[^0-9]/g, "");
    }

    // Convert PAN to uppercase
    if (name === "pan") {
      value = value.toUpperCase();
    }

    // Real-time validation
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
    setErrors({ ...errors, [name]: error });

    if (name === "state") {
      setForm({
        ...form,
        state: value,
        district: "", // reset district
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      setForm({ ...form, imageFile: undefined });
      setImagePreview("");
      return;
    }

    // File type validation
    if (!allowedTypes.includes(file.type)) {
      setErrors({ ...errors, imageFile: "सिर्फ JPG और PNG फाइलें अनुमति हैं" });
      setForm({ ...form, imageFile: undefined });
      setImagePreview("");
      return;
    }

    if (file.size > maxSize) {
      setErrors({ ...errors, imageFile: "फाइल का आकार 5MB से कम होना चाहिए" });
      setForm({ ...form, imageFile: undefined });
      setImagePreview("");
      return;
    }

    setErrors({ ...errors, imageFile: "" });

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
      setForm({ ...form, imageFile: file });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-[#e87722]", "bg-[#fff7f0]");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-[#e87722]", "bg-[#fff7f0]");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-[#e87722]", "bg-[#fff7f0]");
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const input = document.getElementById("imageInput") as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
      handleImageChange({ target: input } as any);
    }
  };

  const districts = form.state ? stateDistrictData[form.state] || [] : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setLoading(true);
  
    try {
     
      const { data } = await axios.post(
        "https://www.obcmahasabha.co.in/api/membership/create-order",
      );
  
      const options = {
        key: "rzp_test_SPQyvTnLfHY93U",
        amount: data.order.amount,
        currency: "INR",
        order_id: data.order.id,
        name: "OBC Mahasabha",
        description: "Membership Fee ₹251",
  
        handler: async function (response) {
          try {
            console.log("✅ Payment Success:", response);
            
            // 2️⃣ FormData create
            const formData = new FormData();
            formData.append("memberName", form.memberName);
            formData.append("fatherName", form.fatherName);
            formData.append("businessNature", form.businessNature);
            formData.append("organizationPosition", form.organizationPosition);
            formData.append("residenceAddress", form.residenceAddress);
            formData.append("officeAddress", form.officeAddress);
            formData.append("residencePhone", form.residencePhone);
            formData.append("officePhone", form.officePhone);
            formData.append("mobile", form.mobile);
            formData.append("whatsapp", form.whatsapp);
            formData.append("email", form.email);
            formData.append("pan", form.pan);
            formData.append("aadhaar", form.aadhaar);
            formData.append("education", form.education);
            formData.append("otherEducation", form.otherEducation);
            formData.append("dob", form.dob);
            formData.append("marriageDate", form.marriageDate || "");
            formData.append("bloodGroup", form.bloodGroup);
            formData.append("tshirtSize", form.tshirtSize);
            formData.append("socialWork", form.socialWork);
            formData.append("specialAchievement", form.specialAchievement);
            formData.append("membershipType", form.membershipType);
            formData.append("state", form.state);
            formData.append("district", form.district);
            formData.append("vidhansabha", selectedVidhansabha);
            formData.append("membershipFee", 251);
            formData.append("razorpay_payment_id", response.razorpay_payment_id); // ✅ ADD YE
            formData.append("razorpay_order_id", response.razorpay_order_id);     // ✅ ADD YE
  
            if (form.imageFile) {
              formData.append("imageFile", form.imageFile);
            }
  
            console.log("📤 Sending form data to backend...");
  
            // 3️⃣ Save Membership
            const res = await axios.post(
              "https://www.obcmahasabha.co.in/api/membership/register",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                timeout: 30000, // 30 sec timeout
              }
            );
  
            console.log("✅ Backend Success:", res.data);
            setSubmitted(true);
            setIsValid(true);

            // Reset form to initial state
            setForm({
              memberName: "",
              fatherName: "",
              businessNature: "",
              organizationPosition: "",
              residenceAddress: "",
              officeAddress: "",
              residencePhone: "",
              officePhone: "",
              mobile: "",
              whatsapp: "",
              email: "",
              pan: "",
              aadhaar: "",
              education: "",
              dob: "",
              marriageDate: "",
              bloodGroup: "",
              tshirtSize: "",
              socialWork: "",
              specialAchievement: "",
              membershipType: "life",
              state: "",
              district: "",
              otherEducation: "",
              imageFile: undefined,
            });
            setSelectedVidhansabha("");
            setImagePreview("");
            setErrors({});
            
            const imageInput = document.getElementById("imageInput");
            if (imageInput instanceof HTMLInputElement) imageInput.value = "";
            
            setTimeout(() => {
              setSubmitted(false);
              setIsValid(false);
            }, 3000);
  
          } catch (backendError) {
            console.error("❌ Backend Registration Failed:", backendError);
            alert(`Registration failed: ${backendError.response?.data?.error || backendError.message || 'Server error'}`);
          }
        },
  
        // ❌ Payment fail handler
        modal: {
          ondismiss: function() {
            console.log("❌ Payment cancelled by user");
            alert("Payment cancelled");
          }
        }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
  
    } catch (error) {
      console.error("❌ Razorpay Error:", error);
      alert("Payment initialization failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="font-sans bg-[#f5f0ea] min-h-screen">
      {/* ── Hero ── */}
      <div className="bg-gradient-to-tr from-[#0f1d3a] via-[#1e3160] to-[#162448] py-6 px-4 text-center relative overflow-hidden ">
        <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-[#f4a92a] opacity-10 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-[#f4a92a] opacity-5 pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-block bg-[#f4a92a]/20 border border-[#f4a92a]/40 text-[#f4c96a] rounded-full px-4 py-1 text-xs font-extrabold tracking-wide mb-4">
            ओबीसी महासभा
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#f4a92a] mb-1">
            सदस्यता
          </h1>
          <p className="text-[#94a8c8] text-base max-w-xl mx-auto leading-relaxed">
            हमारे आंदोलन में शामिल हों और भारत के सबसे बड़े ओबीसी सामुदायिक
            संगठन का हिस्सा बनें।
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 py-12">
        {/* ── Benefits ── */}
        <SectionHeader title="सदस्यता लाभ" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-white rounded-lg p-4 flex items-start gap-4 border border-[#e8dfd0] shadow-sm"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#fff4df] flex items-center justify-center">
                  <Icon size={22} color="#f4a92a" />
                </div>
                <div>
                  <p className="m-0 font-bold text-sm text-[#0f1d3a]">
                    {b.title}
                  </p>
                  <p className="m-0 text-sm text-[#f4a92a] font-semibold">
                    {b.subtitle}
                  </p>
                  <p className="m-0 text-sm text-gray-600 leading-relaxed mt-1">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Offline Download Banner ── */}
        <div className="bg-gradient-to-r from-[#0f1d3a] to-[#1e3160] rounded-xl p-6 mb-14 flex items-center justify-between flex-wrap gap-4 shadow-lg">
          <div>
            <p className="m-0 font-extrabold text-white">
              ऑफलाइन फॉर्म डाउनलोड करें
            </p>
            <p className="m-0 text-[#94a8c8] text-sm">
              पीडीएफ फॉर्म डाउनलोड करें और सबमिट करें
            </p>
          </div>
          <button className="inline-flex items-center gap-3 bg-[#f4a92a] text-[#0f1d3a] px-5 py-3 rounded-lg font-extrabold text-sm shadow-md hover:opacity-95">
            <Download size={17} />
            पीडीएफ फॉर्म डाउनलोड करें
          </button>
        </div>

        {/* ── Online Registration ── */}
        <SectionHeader title="ऑनलाइन पंजीकरण" />

        {submitted ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#e8dfd0]">
            <div className="w-[72px] h-[72px] rounded-full bg-[#fff4df] flex items-center justify-center mx-auto mb-5">
              <BadgeCheck size={36} color="#f4a92a" />
            </div>
            <h3 className="m-0 mb-2 text-xl font-extrabold text-[#0f1d3a]">
              पंजीकरण सफल!
            </h3>
            <p className="text-gray-500 mb-7">
              आपका आवेदन प्राप्त हो गया है। जल्द ही संपर्क किया जाएगा।
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
              }}
              className="bg-[#0f1d3a] text-white px-6 py-3 rounded-lg font-semibold"
            >
              नया पंजीकरण करें
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 md:p-10 shadow-lg">
            <form onSubmit={handleSubmit}>
              {/* Image Upload Section */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <label className="text-sm font-semibold text-[#0f2056] mb-4 block">
                  प्रोफाइल फोटो <R />
                </label>

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
                    errors.imageFile
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-gray-50 hover:border-[#e87722] hover:bg-[#fff7f0]"
                  }`}
                >
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                    className="sr-only"
                  />

                  <div className="flex flex-col items-center gap-4">
                    {imagePreview ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#e87722] shadow-lg bg-white flex items-center justify-center">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-[#0f2056] mb-2">
                            {form.imageFile?.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById(
                                "imageInput",
                              ) as HTMLInputElement;
                              input.click();
                            }}
                            className="text-sm text-[#e87722] hover:text-[#d46a18] font-semibold"
                          >
                            फोटो बदलें
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-[#fff4df] flex items-center justify-center mx-auto mb-3 border-2 border-[#e87722]">
                          <svg
                            className="w-8 h-8 text-[#e87722]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-[#0f2056] mb-2">
                          फोटो अपलोड करें या ड्रैग करें
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          JPG या PNG (5MB तक)
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById(
                              "imageInput",
                            ) as HTMLInputElement;
                            input.click();
                          }}
                          className="inline-block bg-[#e87722] hover:bg-[#d46a18] text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                        >
                          फाइल चुनें
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Clickable area overlay */}
                  <label
                    htmlFor="imageInput"
                    className="absolute inset-0 cursor-pointer"
                  />
                </div>

                {errors.imageFile && (
                  <p className="text-red-500 text-xs mt-2">
                    ⚠️ {errors.imageFile}
                  </p>
                )}
              </div>

              {/* 1 & 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#0f2056] mb-1">
                    1. सदस्य का नाम <R />
                  </label>
                  <input
                    name="memberName"
                    value={form.memberName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="श्री/श्रीमति/"
                    required
                    className={`w-full border rounded-lg px-4 py-2 text-sm text-[#1a1a2e] bg-white focus:outline-none focus:ring-4 transition ${errors.memberName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                  />
                  <ErrorText message={errors.memberName} />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#0f2056] mb-1">
                    2. पिता/पति का नाम <R />
                  </label>
                  <input
                    name="fatherName"
                    value={form.fatherName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="श्री"
                    required
                    className={`w-full border rounded-lg px-4 py-2 text-sm text-[#1a1a2e] bg-white focus:outline-none focus:ring-4 transition ${errors.fatherName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                  />
                  <ErrorText message={errors.fatherName} />
                </div>
              </div>

              {/* 3 & 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#0f2056] mb-1">
                    3. व्यवसाय की प्रकृति
                  </label>
                  <input
                    name="businessNature"
                    value={form.businessNature}
                    onChange={handleChange}
                    placeholder="व्यापार, नौकरी, सेवा..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-[#1a1a2e] bg-white focus:outline-none focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20 transition"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#0f2056] mb-1">
                    4. संगठन में स्थिति
                  </label>
                  <input
                    name="organizationPosition"
                    value={form.organizationPosition}
                    onChange={handleChange}
                    placeholder="सदस्य, पदाधिकारी..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-[#1a1a2e] bg-white focus:outline-none focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20 transition"
                  />
                </div>
              </div>

              {/* State & District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#0f2056] mb-1">
                    राज्य <R />
                  </label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-4 transition ${errors.state ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                  >
                    <option value="">-- राज्य चुनें --</option>
                    {Object.keys(stateDistrictData)
                      .sort()
                      .map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                  </select>
                  <ErrorText message={errors.state} />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#0f2056] mb-1">
                    जिला <R />
                  </label>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    disabled={!form.state}
                    className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-4 transition ${!form.state ? "border-gray-200 bg-gray-50 text-gray-400" : "border-gray-200 bg-white text-[#1a1a2e]"} ${errors.district ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                  >
                    <option value="">
                      {form.state
                        ? "-- जिला चुनें --"
                        : "-- पहले राज्य चुनें --"}
                    </option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ErrorText message={errors.district} />
                </div>

                <Dropdown
                  label="विधानसभा"
                  placeholder="विधानसभा चुनें"
                  value={selectedVidhansabha}
                  options={VIDHANSHABHAS.map((v) => v.name)}
                  onSelect={handleVidhansabhaSelect}
                />
              </div>

              {/* 5 */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-[#0f2056] mb-1 block">
                  5. निवास का पता <R />
                </label>
                <textarea
                  name="residenceAddress"
                  value={form.residenceAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="पूरा निवास पता लिखें (गली, शहर, जिला, पिन कोड)"
                  rows={3}
                  required
                  className={`w-full border rounded-lg px-4 py-2 text-sm bg-white resize-y min-h-[80px] focus:outline-none focus:ring-4 transition ${errors.residenceAddress ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                />
                <ErrorText message={errors.residenceAddress} />
              </div>

              {/* 6 */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-[#0f2056] mb-1 block">
                  6. व्यवसाय / ऑफिस का पता
                </label>
                <textarea
                  name="officeAddress"
                  value={form.officeAddress}
                  onChange={handleChange}
                  placeholder="ऑफिस या व्यवसाय का पूरा पता लिखें"
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white resize-y min-h-[80px] focus:outline-none focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                />
              </div>

              {/* 7 Contact */}
              <div className="mb-2">
                <label className="text-sm font-semibold text-[#0f2056] mb-1 block">
                  7. सम्पर्क सूत्र
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">निवास</label>
                  <input
                    name="residencePhone"
                    value={form.residencePhone}
                    onChange={handleChange}
                    placeholder="दूरभाष नंबर"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">ऑफिस</label>
                  <input
                    name="officePhone"
                    value={form.officePhone}
                    onChange={handleChange}
                    placeholder="ऑफिस नंबर"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">
                    मोबाइल <R />
                  </label>
                  <input
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={10}
                    placeholder="+91 या 10 अंक"
                    type=""
                    required
                    className={`w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-4 transition ${errors.mobile ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : isFieldValid("mobile", form.mobile) ? "border-green-500 focus:border-green-500 focus:ring-green-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                  />
                  <ErrorText
                    message={errors.mobile}
                    isValid={isFieldValid("mobile", form.mobile)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">
                    व्हाट्सएप
                  </label>
                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={10}
                    placeholder="व्हाट्सएप नंबर (वैकल्पिक)"
                    className={`w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-4 transition ${errors.whatsapp ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : isFieldValid("whatsapp", form.whatsapp) ? "border-green-500 focus:border-green-500 focus:ring-green-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                  />
                  <ErrorText
                    message={errors.whatsapp}
                    isValid={isFieldValid("whatsapp", form.whatsapp)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">
                    ई-मेल (वैकल्पिक)
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="आपका@ईमेल.कॉम"
                    className={`w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-4 transition ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : isFieldValid("email", form.email) ? "border-green-500 focus:border-green-500 focus:ring-green-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                  />
                  <ErrorText
                    message={errors.email}
                    isValid={isFieldValid("email", form.email)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500 mb-1">
                    पैन नंबर (वैकल्पिक)
                  </label>
                  <input
                    name="pan"
                    value={form.pan}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    className={`w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-4 transition ${errors.pan ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : isFieldValid("pan", form.pan) ? "border-green-500 focus:border-green-500 focus:ring-green-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                  />
                  <ErrorText
                    message={errors.pan}
                    isValid={isFieldValid("pan", form.pan)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm text-gray-500 mb-1 block">
                  आधार नंबर (वैकल्पिक)
                </label>
                <input
                  name="aadhaar"
                  value={form.aadhaar}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={12}
                  placeholder="12 अंकों का आधार नंबर"
                  className={`w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-4 transition ${errors.aadhaar ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : isFieldValid("aadhaar", form.aadhaar) ? "border-green-500 focus:border-green-500 focus:ring-green-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                />
                <ErrorText
                  message={errors.aadhaar}
                  isValid={isFieldValid("aadhaar", form.aadhaar)}
                />
              </div>

              {/* 8 */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-[#0f2056] mb-1 block">
                  8. शैक्षणिक योग्यता एवं प्रशिक्षण / कंप्यूटर उपलब्धि <R />
                </label>
                <select
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-4 transition ${errors.education ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                >
                  <option value="">-- योग्यता चुनें --</option>
                  {educationOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                {/* Other input show when "अन्य" selected */}
                {form.education === "अन्य" && (
                  <input
                    type="text"
                    name="otherEducation"
                    value={form.otherEducation || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    placeholder="अपनी योग्यता लिखें"
                    className={`w-full border rounded-lg px-4 py-2 text-sm bg-white mt-3 focus:outline-none focus:ring-4 transition ${
                      errors.otherEducation
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"
                    }`}
                  />
                )}
                <ErrorText message={errors.education} />
              </div>

              {/* 9 & 10 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* DOB */}
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#0f2056] mb-1">
                    9. जन्म दिनांक <R />
                  </label>

                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    max={today} // ✅ future date disabled
                    required
                    className={`w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-4 transition ${
                      errors.dob
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"
                    }`}
                  />

                  <ErrorText message={errors.dob} />
                </div>

                {/* Marriage Date */}
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#0f2056] mb-1">
                    10. विवाह वर्षगांठ
                  </label>

                  <input
                    type="date"
                    name="marriageDate"
                    value={form.marriageDate}
                    onChange={handleChange}
                    max={today} // ✅ future date disabled
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                  />
                </div>
              </div>

              {/* 11 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#0f2056] mb-1">
                    11. रक्त समूह <R />
                  </label>
                  <select
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-4 transition ${errors.bloodGroup ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                  >
                    <option value="">-- रक्त समूह चुनें --</option>
                    {bloodGroupOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ErrorText message={errors.bloodGroup} />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-[#0f2056] mb-1">
                    टी-शर्ट साइज <R />
                  </label>
                  <select
                    name="tshirtSize"
                    value={form.tshirtSize}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-4 transition ${errors.tshirtSize ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-[#e87722] focus:ring-[#e87722]/20"}`}
                  >
                    <option value="">-- साइज चुनें --</option>
                    {tshirtSizeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ErrorText message={errors.tshirtSize} />
                </div>
              </div>

              {/* 12 */}
              <div className="mb-4">
                <label className="text-sm font-semibold text-[#0f2056] mb-1 block">
                  12. अन्य सामाजिक एवं धार्मिक गतिविधियों के बारे में विवरण
                </label>
                <textarea
                  name="socialWork"
                  value={form.socialWork}
                  onChange={handleChange}
                  placeholder="सामाजिक/धार्मिक गतिविधियों का विवरण लिखें"
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white resize-y min-h-[80px] focus:outline-none focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                />
              </div>

              {/* 13 */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-[#0f2056] mb-1 block">
                  13. अन्य कोई विशेष उपलब्धि
                </label>
                <textarea
                  name="specialAchievement"
                  value={form.specialAchievement}
                  onChange={handleChange}
                  placeholder="कोई विशेष उपलब्धि हो तो लिखें"
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white resize-y min-h-[80px] focus:outline-none focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                />
              </div>

              {/* Membership Radio */}
              <div className="mb-7">
                <label className="text-sm font-semibold text-[#0f2056] mb-1 block">
                  सदस्यता प्रकार <R />
                </label>
                <div className="flex gap-3 flex-wrap mt-2">
                  {membershipOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer select-none text-sm font-semibold transition ${form.membershipType === opt.id ? "border-[#e87722] bg-[#fff7f0] text-[#e87722]" : "border-gray-200 text-[#0f2056]"}`}
                    >
                      <input
                        type="radio"
                        name="membershipType"
                        value={opt.id}
                        checked={form.membershipType === opt.id}
                        onChange={handleChange}
                        className="accent-[#e87722]"
                      />
                      {opt.label}{" "}
                      <span className="text-[#e87722] font-bold">
                        {opt.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  type="submit"
                  disabled={!isFormValid() || loading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                    isFormValid() && !submitted && !loading
                      ? "bg-[#e87722] text-white hover:bg-[#d66a1a]"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  } ${submitted ? "bg-green-600 hover:bg-green-700" : ""}`}
                >
                  {loading ? (
                    <span className="loader"></span>
                  ) : submitted ? (
                    "✅ सफल!"
                  ) : (
                    "सबमिट करें"
                  )}
                </button>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 border-2 border-[#e87722] text-[#e87722] hover:bg-[#e87722] hover:text-white rounded-lg py-3 px-5 font-bold"
                >
                  <Download size={16} /> फॉर्म डाउनलोड करें
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const SectionHeader = ({ title }) => (
  <div className="text-center mb-6">
    <h2 className="m-0 font-extrabold text-lg text-[#0f1d3a]">{title}</h2>
    <div className="w-12 h-1 bg-[#f4a92a] rounded mx-auto mt-2" />
  </div>
);

const R = () => <span className="text-[#e87722]">*</span>;

const ErrorText = ({
  message,
  isValid,
}: {
  message?: string;
  isValid?: boolean;
}) => {
  if (message) {
    return (
      <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
        <span>✗</span>
        <span>{message}</span>
      </div>
    );
  }
  if (isValid) {
    return (
      <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
        <span>✓</span>
        <span>सही है</span>
      </div>
    );
  }
  return null;
};
