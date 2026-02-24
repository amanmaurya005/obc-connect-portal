import LegalLayout from "../../components/legal/LegalLayout";
import LegalSection from "../../components/legal/LegalSection";
import HighlightBox from "../../components/legal/HighlightBox";
import {
  Database,
  CreditCard,
  Cookie,
  UserCheck,
  Shield,
  Mail,
  Eye,
  Share2,
} from "lucide-react";

const sections = [
  { id: "data-collection", title: "डेटा संग्रहण", icon: Database },
  { id: "donation-data", title: "दान डेटा प्रबंधन", icon: CreditCard },
  { id: "payment", title: "भुगतान प्रसंस्करण", icon: Shield },
  { id: "cookies", title: "कुकीज़ नीति", icon: Cookie },
  { id: "user-rights", title: "उपयोगकर्ता अधिकार", icon: UserCheck },
  { id: "data-sharing", title: "डेटा साझाकरण", icon: Share2 },
  { id: "data-protection", title: "डेटा सुरक्षा", icon: Eye },
  { id: "contact", title: "संपर्क", icon: Mail },
];

const PrivacyPolicy = () => {
  return (
    <LegalLayout
      titleHindi="गोपनीयता नीति"
      titleEnglish="Privacy Policy"
      lastUpdated="24 फरवरी 2026"
      sections={sections}
    >
      <LegalSection id="data-collection" title="डेटा संग्रहण (Data Collection)" icon={Database}>
        <p>
          अखिल भारतीय संयुक्त ओ.बी.सी. महासभा आपकी गोपनीयता का सम्मान करती है। हम निम्नलिखित
          व्यक्तिगत जानकारी एकत्र कर सकते हैं:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>नाम (Name)</strong> — सदस्यता और पहचान के लिए</li>
          <li><strong>ईमेल पता (Email Address)</strong> — संचार और अपडेट के लिए</li>
          <li><strong>फोन नंबर (Phone Number)</strong> — सत्यापन और संपर्क के लिए</li>
          <li><strong>पता (Address)</strong> — सदस्यता रिकॉर्ड के लिए</li>
          <li><strong>जाति प्रमाण पत्र विवरण</strong> — सदस्यता पात्रता सत्यापन हेतु</li>
        </ul>
        <HighlightBox variant="info">
          हम केवल वही जानकारी एकत्र करते हैं जो संगठन की सेवाओं को प्रदान करने के लिए आवश्यक है।
          आपकी जानकारी कभी भी तीसरे पक्ष को बेची नहीं जाएगी।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="donation-data" title="दान डेटा प्रबंधन (Donation Data Handling)" icon={CreditCard}>
        <p>
          जब आप दान करते हैं, तो हम निम्नलिखित जानकारी संग्रहीत करते हैं:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>दान की राशि और तिथि</li>
          <li>भुगतान विधि (केवल अंतिम 4 अंक)</li>
          <li>लेनदेन आईडी (Transaction ID)</li>
          <li>दानकर्ता का नाम और संपर्क विवरण</li>
        </ul>
        <HighlightBox variant="secure">
          आपके पूर्ण भुगतान कार्ड विवरण हमारे सर्वर पर कभी संग्रहीत नहीं किए जाते। सभी
          भुगतान Razorpay के सुरक्षित गेटवे के माध्यम से प्रसंस्कृत होते हैं।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="payment" title="Razorpay सुरक्षित भुगतान (Secure Payment Processing)" icon={Shield}>
        <p>
          हम भुगतान प्रसंस्करण के लिए <strong>Razorpay</strong> का उपयोग करते हैं,
          जो PCI DSS Level 1 प्रमाणित है — सुरक्षा का उच्चतम स्तर।
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>सभी लेनदेन 256-bit SSL एन्क्रिप्शन से सुरक्षित हैं</li>
          <li>Razorpay RBI के दिशानिर्देशों का पालन करता है</li>
          <li>हम कार्ड CVV या पूर्ण कार्ड नंबर संग्रहीत नहीं करते</li>
        </ul>
        <HighlightBox variant="secure">
          Razorpay भारत का सबसे विश्वसनीय भुगतान गेटवे है, जिसका उपयोग लाखों व्यवसायों द्वारा
          किया जाता है।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="cookies" title="कुकीज़ नीति (Cookies Policy)" icon={Cookie}>
        <p>हमारी वेबसाइट निम्नलिखित प्रकार की कुकीज़ का उपयोग करती है:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>आवश्यक कुकीज़</strong> — वेबसाइट के सामान्य कामकाज के लिए</li>
          <li><strong>एनालिटिक्स कुकीज़</strong> — वेबसाइट उपयोग को समझने के लिए</li>
          <li><strong>कार्यात्मक कुकीज़</strong> — आपकी प्राथमिकताओं को याद रखने के लिए</li>
        </ul>
        <p>
          आप अपने ब्राउज़र सेटिंग्स से कुकीज़ को अक्षम कर सकते हैं, लेकिन इससे वेबसाइट
          की कुछ सुविधाएं प्रभावित हो सकती हैं।
        </p>
      </LegalSection>

      <LegalSection id="user-rights" title="उपयोगकर्ता अधिकार (User Rights)" icon={UserCheck}>
        <p>आपके पास निम्नलिखित अधिकार हैं:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>अपने व्यक्तिगत डेटा तक पहुंचने का अधिकार</li>
          <li>गलत डेटा को सुधारने का अधिकार</li>
          <li>अपने डेटा को हटाने का अनुरोध करने का अधिकार</li>
          <li>डेटा प्रसंस्करण पर आपत्ति करने का अधिकार</li>
          <li>डेटा पोर्टेबिलिटी का अधिकार</li>
        </ul>
        <HighlightBox variant="info">
          अपने अधिकारों का प्रयोग करने के लिए, कृपया <strong>contact@obcmahasabha.org</strong> पर
          संपर्क करें। हम 30 दिनों के भीतर आपके अनुरोध का जवाब देंगे।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="data-sharing" title="डेटा साझाकरण (Data Sharing)" icon={Share2}>
        <p>
          हम आपकी व्यक्तिगत जानकारी निम्नलिखित परिस्थितियों में साझा कर सकते हैं:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>कानूनी आवश्यकता या सरकारी आदेश पर</li>
          <li>Razorpay के साथ भुगतान प्रसंस्करण के लिए</li>
          <li>संगठन की शाखाओं के बीच आंतरिक उपयोग के लिए</li>
        </ul>
        <HighlightBox variant="warning">
          हम कभी भी आपकी जानकारी विज्ञापन या मार्केटिंग उद्देश्यों के लिए तीसरे पक्ष को
          नहीं बेचते या साझा नहीं करते।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="data-protection" title="डेटा सुरक्षा प्रतिबद्धता (Data Protection)" icon={Eye}>
        <p>हम आपके डेटा की सुरक्षा के लिए प्रतिबद्ध हैं:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>SSL/TLS एन्क्रिप्शन का उपयोग</li>
          <li>नियमित सुरक्षा ऑडिट</li>
          <li>सीमित कर्मचारी पहुंच</li>
          <li>भारतीय IT अधिनियम, 2000 का अनुपालन</li>
          <li>डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 का अनुपालन</li>
        </ul>
      </LegalSection>

      <LegalSection id="contact" title="गोपनीयता संबंधी संपर्क (Privacy Contact)" icon={Mail}>
        <p>
          गोपनीयता से संबंधित किसी भी प्रश्न या चिंता के लिए, कृपया संपर्क करें:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>ईमेल:</strong> privacy@obcmahasabha.org</li>
          <li><strong>विषय:</strong> "गोपनीयता अनुरोध" लिखें</li>
          <li><strong>प्रतिक्रिया समय:</strong> 7-10 कार्य दिवस</li>
        </ul>
      </LegalSection>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
