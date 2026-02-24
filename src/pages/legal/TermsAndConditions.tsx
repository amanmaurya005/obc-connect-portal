import LegalLayout from "../../components/legal/LegalLayout";
import LegalSection from "../../components/legal/LegalSection";
import HighlightBox from "../../components/legal/HighlightBox";
import {
  Users,
  Heart,
  Ban,
  UserCog,
  Scale,
  ShieldAlert,
  Copyright,
  FileText,
} from "lucide-react";

const sections = [
  { id: "membership", title: "सदस्यता नियम", icon: Users },
  { id: "donations", title: "दान शर्तें", icon: Heart },
  { id: "suspension", title: "खाता निलंबन", icon: Ban },
  { id: "responsibilities", title: "उपयोगकर्ता जिम्मेदारियां", icon: UserCog },
  { id: "governing-law", title: "शासी कानून", icon: Scale },
  { id: "liability", title: "दायित्व की सीमा", icon: ShieldAlert },
  { id: "ip-rights", title: "बौद्धिक संपदा", icon: Copyright },
  { id: "general", title: "सामान्य शर्तें", icon: FileText },
];

const TermsAndConditions = () => {
  return (
    <LegalLayout
      titleHindi="नियम और शर्तें"
      titleEnglish="Terms & Conditions"
      lastUpdated="24 फरवरी 2026"
      sections={sections}
    >
      <LegalSection id="membership" title="सदस्यता नियम (Membership Rules)" icon={Users}>
        <p>अखिल भारतीय संयुक्त ओ.बी.सी. महासभा की सदस्यता निम्नलिखित शर्तों के अधीन है:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>सदस्यता के लिए न्यूनतम आयु 18 वर्ष होनी चाहिए</li>
          <li>सदस्य को भारत का नागरिक होना आवश्यक है</li>
          <li>सदस्यता फॉर्म में दी गई सभी जानकारी सत्य और सटीक होनी चाहिए</li>
          <li>सदस्यता संगठन की कार्यकारिणी के अनुमोदन के अधीन है</li>
          <li>सदस्यता शुल्क गैर-वापसी योग्य है</li>
          <li>संगठन बिना कारण बताए सदस्यता अस्वीकार करने का अधिकार सुरक्षित रखता है</li>
        </ul>
        <HighlightBox variant="info">
          सदस्यता आवेदन के 7 कार्य दिवसों के भीतर सत्यापन प्रक्रिया पूरी की जाएगी।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="donations" title="दान शर्तें (Donation Terms)" icon={Heart}>
        <p>दान से संबंधित शर्तें:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>सभी दान स्वैच्छिक हैं</li>
          <li>दान का उपयोग संगठन के उद्देश्यों के अनुसार किया जाएगा</li>
          <li>दान की रसीद ईमेल/SMS द्वारा प्रदान की जाएगी</li>
          <li>₹500 से अधिक के दान के लिए PAN कार्ड विवरण आवश्यक हो सकता है</li>
          <li>दान 80G कर छूट के लिए पात्र हो सकता है (यदि लागू हो)</li>
        </ul>
        <HighlightBox variant="secure">
          सभी दान Razorpay के माध्यम से सुरक्षित रूप से प्रसंस्कृत किए जाते हैं।
          भुगतान PCI DSS Level 1 मानकों का पालन करता है।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="suspension" title="खाता निलंबन (Account Suspension)" icon={Ban}>
        <p>संगठन निम्नलिखित कारणों से सदस्य खाता निलंबित या समाप्त कर सकता है:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>गलत या भ्रामक जानकारी प्रदान करना</li>
          <li>संगठन के नियमों या आचार संहिता का उल्लंघन</li>
          <li>संगठन की प्रतिष्ठा को नुकसान पहुंचाने वाली गतिविधि</li>
          <li>अवैध गतिविधियों में शामिल होना</li>
          <li>सदस्यता शुल्क का भुगतान न करना</li>
        </ul>
        <HighlightBox variant="warning">
          निलंबन से पहले सदस्य को लिखित सूचना दी जाएगी और स्पष्टीकरण का अवसर प्रदान किया जाएगा।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="responsibilities" title="उपयोगकर्ता जिम्मेदारियां (User Responsibilities)" icon={UserCog}>
        <ul className="list-disc pl-5 space-y-2">
          <li>अपने खाते की जानकारी को सुरक्षित और गोपनीय रखना</li>
          <li>सटीक और अद्यतन जानकारी प्रदान करना</li>
          <li>वेबसाइट का दुरुपयोग न करना</li>
          <li>अन्य सदस्यों का सम्मान करना</li>
          <li>संगठन के नियमों और आचार संहिता का पालन करना</li>
          <li>किसी भी अनधिकृत पहुंच की तुरंत सूचना देना</li>
        </ul>
      </LegalSection>

      <LegalSection id="governing-law" title="शासी कानून (Governing Law)" icon={Scale}>
        <p>
          ये नियम और शर्तें <strong>भारत के कानूनों</strong> द्वारा शासित हैं। किसी भी विवाद
          की स्थिति में, <strong>नई दिल्ली, भारत</strong> के न्यायालयों का अनन्य अधिकार
          क्षेत्र होगा।
        </p>
        <HighlightBox variant="info">
          विवाद समाधान पहले आंतरिक शिकायत निवारण तंत्र के माध्यम से किया जाएगा।
          न्यायालय अंतिम उपाय होगा।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="liability" title="दायित्व की सीमा (Limitation of Liability)" icon={ShieldAlert}>
        <ul className="list-disc pl-5 space-y-2">
          <li>संगठन किसी भी अप्रत्यक्ष, आकस्मिक, या परिणामी क्षति के लिए उत्तरदायी नहीं होगा</li>
          <li>वेबसाइट की अनुपलब्धता या तकनीकी समस्याओं के लिए संगठन जिम्मेदार नहीं है</li>
          <li>तृतीय-पक्ष सेवाओं (जैसे Razorpay) से उत्पन्न किसी भी समस्या के लिए संगठन सीमित रूप से उत्तरदायी है</li>
          <li>अधिकतम दायित्व पिछले 12 महीनों में भुगतान की गई राशि तक सीमित होगा</li>
        </ul>
      </LegalSection>

      <LegalSection id="ip-rights" title="बौद्धिक संपदा अधिकार (Intellectual Property)" icon={Copyright}>
        <ul className="list-disc pl-5 space-y-2">
          <li>वेबसाइट की सभी सामग्री, लोगो, और डिज़ाइन संगठन की संपत्ति है</li>
          <li>बिना अनुमति के सामग्री का पुनरुत्पादन या वितरण प्रतिबंधित है</li>
          <li>संगठन का नाम और लोगो ट्रेडमार्क संरक्षित है</li>
          <li>उपयोगकर्ता द्वारा प्रस्तुत सामग्री पर संगठन को उपयोग का अधिकार होगा</li>
        </ul>
      </LegalSection>

      <LegalSection id="general" title="सामान्य शर्तें (General Terms)" icon={FileText}>
        <ul className="list-disc pl-5 space-y-2">
          <li>संगठन इन शर्तों को किसी भी समय संशोधित करने का अधिकार सुरक्षित रखता है</li>
          <li>शर्तों में परिवर्तन वेबसाइट पर प्रकाशित होने पर तुरंत प्रभावी होंगे</li>
          <li>वेबसाइट का निरंतर उपयोग संशोधित शर्तों की स्वीकृति माना जाएगा</li>
          <li>यदि कोई प्रावधान अमान्य पाया जाता है, तो शेष शर्तें पूर्ण बल और प्रभाव में रहेंगी</li>
        </ul>
      </LegalSection>
    </LegalLayout>
  );
};

export default TermsAndConditions;
