import LegalLayout from "../../components/legal/LegalLayout";
import LegalSection from "../../components/legal/LegalSection";
import HighlightBox from "../../components/legal/HighlightBox";
import {
  AlertCircle,
  Scale,
  ExternalLink,
  RefreshCw,
  FileWarning,
  MessageCircle,
} from "lucide-react";

const sections = [
  { id: "accuracy", title: "सूचना सटीकता", icon: AlertCircle },
  { id: "no-liability", title: "कानूनी दायित्व", icon: Scale },
  { id: "external-links", title: "बाहरी लिंक", icon: ExternalLink },
  { id: "content-change", title: "सामग्री परिवर्तन", icon: RefreshCw },
  { id: "professional-advice", title: "व्यावसायिक सलाह", icon: FileWarning },
  { id: "feedback", title: "प्रतिक्रिया", icon: MessageCircle },
];

const Disclaimer = () => {
  return (
    <LegalLayout
      titleHindi="अस्वीकरण"
      titleEnglish="Disclaimer"
      lastUpdated="24 फरवरी 2026"
      sections={sections}
    >
      <LegalSection id="accuracy" title="सूचना सटीकता (Information Accuracy)" icon={AlertCircle}>
        <p>
          अखिल भारतीय संयुक्त ओ.बी.सी. महासभा इस वेबसाइट पर उपलब्ध जानकारी को सटीक और
          अद्यतन रखने का हर संभव प्रयास करती है। हालांकि:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>वेबसाइट पर उपलब्ध सभी जानकारी "जैसी है" के आधार पर प्रदान की जाती है</li>
          <li>हम जानकारी की पूर्णता, सटीकता, विश्वसनीयता की कोई गारंटी नहीं देते</li>
          <li>तथ्यात्मक त्रुटियां हो सकती हैं और उन्हें समय-समय पर सुधारा जाएगा</li>
          <li>उपयोगकर्ता को महत्वपूर्ण निर्णयों से पहले स्वतंत्र सत्यापन करना चाहिए</li>
        </ul>
        <HighlightBox variant="warning">
          इस वेबसाइट पर उपलब्ध जानकारी के आधार पर किए गए किसी भी निर्णय की जिम्मेदारी
          पूर्णतः उपयोगकर्ता की होगी।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="no-liability" title="कानूनी दायित्व अस्वीकरण (No Legal Liability)" icon={Scale}>
        <p>संगठन निम्नलिखित के लिए कोई कानूनी दायित्व स्वीकार नहीं करता:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>वेबसाइट के उपयोग से उत्पन्न किसी भी प्रत्यक्ष या अप्रत्यक्ष हानि</li>
          <li>वेबसाइट की अनुपलब्धता या तकनीकी विफलता</li>
          <li>तृतीय-पक्ष सेवाओं या लिंक से होने वाली किसी भी समस्या</li>
          <li>वायरस या मैलवेयर जो वेबसाइट उपयोग के दौरान आ सकते हैं</li>
          <li>डेटा हानि या सिस्टम क्षति</li>
        </ul>
        <HighlightBox variant="info">
          उपयोगकर्ता अपने जोखिम पर वेबसाइट का उपयोग करता है। संगठन अधिकतम कानूनी सीमा
          तक सभी दायित्वों को अस्वीकार करता है।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="external-links" title="बाहरी लिंक अस्वीकरण (External Links Disclaimer)" icon={ExternalLink}>
        <p>
          हमारी वेबसाइट में तृतीय-पक्ष वेबसाइटों के लिंक हो सकते हैं। इन बाहरी लिंक्स
          के संबंध में:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>हमारा इन बाहरी वेबसाइटों की सामग्री पर कोई नियंत्रण नहीं है</li>
          <li>बाहरी लिंक्स का समावेश उनकी अनुशंसा नहीं है</li>
          <li>बाहरी वेबसाइटों की गोपनीयता नीतियां हमसे भिन्न हो सकती हैं</li>
          <li>बाहरी लिंक्स के माध्यम से होने वाली किसी भी समस्या के लिए हम उत्तरदायी नहीं हैं</li>
        </ul>
        <HighlightBox variant="warning">
          बाहरी वेबसाइटों पर जाने से पहले उनकी शर्तों और गोपनीयता नीतियों की समीक्षा करें।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="content-change" title="सामग्री परिवर्तन (Content Subject to Change)" icon={RefreshCw}>
        <ul className="list-disc pl-5 space-y-2">
          <li>संगठन बिना पूर्व सूचना के वेबसाइट की सामग्री को संशोधित, अपडेट, या हटा सकता है</li>
          <li>नीतियों, शर्तों और कार्यक्रमों में परिवर्तन किया जा सकता है</li>
          <li>उपयोगकर्ताओं को नियमित रूप से इन पृष्ठों की समीक्षा करने की सलाह दी जाती है</li>
          <li>महत्वपूर्ण परिवर्तनों की सूचना वेबसाइट पर और/या ईमेल द्वारा दी जाएगी</li>
        </ul>
      </LegalSection>

      <LegalSection id="professional-advice" title="व्यावसायिक सलाह (Professional Advice)" icon={FileWarning}>
        <p>
          इस वेबसाइट पर उपलब्ध कोई भी जानकारी कानूनी, वित्तीय, चिकित्सा, या
          अन्य व्यावसायिक सलाह का विकल्प नहीं है।
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>कानूनी मामलों के लिए योग्य वकील से परामर्श करें</li>
          <li>वित्तीय निर्णयों के लिए प्रमाणित वित्तीय सलाहकार से संपर्क करें</li>
          <li>संगठन की जानकारी केवल सामान्य मार्गदर्शन के लिए है</li>
        </ul>
      </LegalSection>

      <LegalSection id="feedback" title="प्रतिक्रिया और सुझाव (Feedback)" icon={MessageCircle}>
        <p>
          यदि आपको वेबसाइट पर कोई गलत या भ्रामक जानकारी मिलती है, तो कृपया हमें सूचित करें:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>ईमेल:</strong> feedback@obcmahasabha.org</li>
          <li><strong>विषय:</strong> "सामग्री सुधार अनुरोध"</li>
          <li>हम हर सुझाव की सराहना करते हैं और उचित कार्रवाई करेंगे</li>
        </ul>
      </LegalSection>
    </LegalLayout>
  );
};

export default Disclaimer;
