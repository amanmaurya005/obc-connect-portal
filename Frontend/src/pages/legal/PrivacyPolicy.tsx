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

      {/* Data Collection */}
      <LegalSection
        id="data-collection"
        title="डेटा संग्रहण (Data Collection)"
        icon={Database}
      >

        <p className="mb-4 text-gray-700 leading-relaxed">
          अखिल भारतीय संयुक्त ओ.बी.सी. महासभा आपकी गोपनीयता का सम्मान करती है।
          हम निम्नलिखित जानकारी एकत्र कर सकते हैं:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>नाम</strong> — सदस्यता और पहचान के लिए</li>
          <li><strong>ईमेल</strong> — संचार के लिए</li>
          <li><strong>फोन नंबर</strong> — संपर्क हेतु</li>
          <li><strong>पता</strong> — रिकॉर्ड के लिए</li>
          <li><strong>जाति प्रमाण पत्र विवरण</strong> — पात्रता सत्यापन हेतु</li>
        </ul>

        <HighlightBox variant="info">
          हम केवल आवश्यक जानकारी ही एकत्र करते हैं और आपकी जानकारी कभी बेची नहीं जाएगी।
        </HighlightBox>

      </LegalSection>


      {/* Donation Data */}
      <LegalSection
        id="donation-data"
        title="दान डेटा प्रबंधन (Donation Data)"
        icon={CreditCard}
      >

        <p className="mb-4 text-gray-700">
          जब आप दान करते हैं, तो निम्न जानकारी संग्रहीत होती है:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>दान राशि और तिथि</li>
          <li>Transaction ID</li>
          <li>नाम और संपर्क विवरण</li>
        </ul>

        <HighlightBox variant="secure">
          पूर्ण कार्ड विवरण हमारे सर्वर पर संग्रहीत नहीं होते।
        </HighlightBox>

      </LegalSection>


      {/* Payment */}
      <LegalSection
        id="payment"
        title="Secure Payment Processing"
        icon={Shield}
      >

        <p className="mb-4 text-gray-700">
          हम Razorpay secure gateway का उपयोग करते हैं:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>256-bit SSL encryption</li>
          <li>PCI DSS compliant</li>
          <li>Secure transactions</li>
        </ul>

        <HighlightBox variant="secure">
          Razorpay trusted payment gateway है।
        </HighlightBox>

      </LegalSection>


      {/* Cookies */}
      <LegalSection
        id="cookies"
        title="Cookies Policy"
        icon={Cookie}
      >

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Website functionality के लिए</li>
          <li>Analytics के लिए</li>
          <li>User experience improve करने के लिए</li>
        </ul>

      </LegalSection>


      {/* User Rights */}
      <LegalSection
        id="user-rights"
        title="User Rights"
        icon={UserCheck}
      >

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Data access का अधिकार</li>
          <li>Data correction</li>
          <li>Data deletion request</li>
          <li>Processing objection</li>
        </ul>

        <HighlightBox variant="info">
          Contact: contact@obcmahasabha.org
        </HighlightBox>

      </LegalSection>


      {/* Data Sharing */}
      <LegalSection
        id="data-sharing"
        title="Data Sharing"
        icon={Share2}
      >

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Legal requirement</li>
          <li>Payment processing</li>
          <li>Internal organizational use</li>
        </ul>

        <HighlightBox variant="warning">
          हम data marketing के लिए share नहीं करते।
        </HighlightBox>

      </LegalSection>


      {/* Data Protection */}
      <LegalSection
        id="data-protection"
        title="Data Protection"
        icon={Eye}
      >

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>SSL encryption</li>
          <li>Security audits</li>
          <li>Limited access</li>
          <li>IT Act compliance</li>
        </ul>

      </LegalSection>


      {/* Contact */}
      <LegalSection
        id="contact"
        title="Privacy Contact"
        icon={Mail}
      >

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Email: privacy@obcmahasabha.org</li>
          <li>Response: 7-10 days</li>
        </ul>

      </LegalSection>


    </LegalLayout>
  );
};

export default PrivacyPolicy;