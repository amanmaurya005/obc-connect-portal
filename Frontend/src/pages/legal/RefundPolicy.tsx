import LegalLayout from "../../components/legal/LegalLayout";
import LegalSection from "../../components/legal/LegalSection";
import HighlightBox from "../../components/legal/HighlightBox";
import {
  RotateCcw,
  Clock,
  CreditCard,
  XCircle,
  PhoneCall,
  FileCheck,
} from "lucide-react";

const sections = [
  { id: "eligibility", title: "रिफंड पात्रता", icon: RotateCcw },
  { id: "processing-time", title: "प्रसंस्करण समय", icon: Clock },
  { id: "razorpay", title: "Razorpay प्रसंस्करण", icon: CreditCard },
  { id: "non-refundable", title: "गैर-वापसी योग्य", icon: XCircle },
  { id: "procedure", title: "रिफंड प्रक्रिया", icon: PhoneCall },
  { id: "conditions", title: "अतिरिक्त शर्तें", icon: FileCheck },
];

const RefundPolicy = () => {
  return (
    <LegalLayout
      titleHindi="रिफंड नीति"
      titleEnglish="Refund Policy"
      lastUpdated="24 फरवरी 2026"
      sections={sections}
    >
      <LegalSection id="eligibility" title="दान रिफंड पात्रता (Donation Refund Eligibility)" icon={RotateCcw}>
        <p>निम्नलिखित परिस्थितियों में दान रिफंड का अनुरोध किया जा सकता है:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>डुप्लीकेट/दोहरा भुगतान हो गया हो</li>
          <li>गलत राशि चार्ज हुई हो</li>
          <li>तकनीकी त्रुटि के कारण अनधिकृत लेनदेन हुआ हो</li>
          <li>भुगतान विफल होने के बावजूद राशि कटी हो</li>
        </ul>
        <HighlightBox variant="info">
          रिफंड अनुरोध लेनदेन की तिथि से <strong>15 दिनों के भीतर</strong> किया जाना चाहिए।
          इसके बाद के अनुरोध स्वीकार नहीं किए जाएंगे।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="processing-time" title="प्रसंस्करण समय (Processing Time)" icon={Clock}>
        <p>रिफंड प्रसंस्करण की समय-सीमा:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>रिफंड अनुरोध की समीक्षा:</strong> 2-3 कार्य दिवस</li>
          <li><strong>रिफंड अनुमोदन और प्रसंस्करण:</strong> 5-7 कार्य दिवस</li>
          <li><strong>बैंक खाते में परिलक्षित होने में:</strong> 7-10 कार्य दिवस</li>
        </ul>
        <HighlightBox variant="info">
          कुल रिफंड प्रक्रिया में अधिकतम <strong>14-20 कार्य दिवस</strong> लग सकते हैं।
          बैंक और भुगतान विधि के अनुसार समय भिन्न हो सकता है।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="razorpay" title="Razorpay प्रसंस्करण समय (Razorpay Processing)" icon={CreditCard}>
        <p>Razorpay के माध्यम से रिफंड प्रसंस्करण:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>UPI:</strong> 3-5 कार्य दिवस</li>
          <li><strong>डेबिट कार्ड:</strong> 5-7 कार्य दिवस</li>
          <li><strong>क्रेडिट कार्ड:</strong> 5-7 कार्य दिवस</li>
          <li><strong>नेट बैंकिंग:</strong> 5-7 कार्य दिवस</li>
          <li><strong>वॉलेट:</strong> 2-3 कार्य दिवस</li>
        </ul>
        <HighlightBox variant="secure">
          Razorpay का सुरक्षित रिफंड सिस्टम सुनिश्चित करता है कि रिफंड उसी भुगतान विधि
          में वापस किया जाए जिससे मूल भुगतान किया गया था।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="non-refundable" title="गैर-वापसी योग्य शर्तें (Non-Refundable Conditions)" icon={XCircle}>
        <p>निम्नलिखित परिस्थितियों में रिफंड प्रदान नहीं किया जाएगा:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>स्वैच्छिक दान जो सफलतापूर्वक प्रसंस्कृत हो चुके हैं</li>
          <li>सदस्यता शुल्क (एक बार भुगतान के बाद)</li>
          <li>कार्यक्रम/इवेंट शुल्क (कार्यक्रम से 48 घंटे पहले के बाद)</li>
          <li>15 दिन की अवधि के बाद के रिफंड अनुरोध</li>
          <li>धोखाधड़ी या दुरुपयोग की स्थिति में</li>
        </ul>
        <HighlightBox variant="warning">
          एक बार स्वीकृत और सफलतापूर्वक प्रसंस्कृत दान सामान्यतः गैर-वापसी योग्य होते हैं,
          सिवाय ऊपर उल्लिखित विशेष परिस्थितियों के।
        </HighlightBox>
      </LegalSection>

      <LegalSection id="procedure" title="रिफंड अनुरोध प्रक्रिया (Refund Request Procedure)" icon={PhoneCall}>
        <p>रिफंड का अनुरोध करने के लिए:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>ईमेल भेजें:</strong> refund@obcmahasabha.org पर</li>
          <li><strong>विषय:</strong> "रिफंड अनुरोध — [लेनदेन आईडी]"</li>
          <li>निम्नलिखित जानकारी शामिल करें:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>पूरा नाम</li>
              <li>लेनदेन आईडी / रसीद नंबर</li>
              <li>भुगतान की तिथि और राशि</li>
              <li>रिफंड का कारण</li>
              <li>बैंक खाता विवरण (IFSC और खाता संख्या)</li>
            </ul>
          </li>
          <li>हमारी टीम 2-3 कार्य दिवसों में आपसे संपर्क करेगी</li>
        </ol>
      </LegalSection>

      <LegalSection id="conditions" title="अतिरिक्त शर्तें (Additional Conditions)" icon={FileCheck}>
        <ul className="list-disc pl-5 space-y-2">
          <li>रिफंड मूल भुगतान विधि में ही जारी किया जाएगा</li>
          <li>भुगतान गेटवे शुल्क (यदि लागू हो) रिफंड राशि से काटा जा सकता है</li>
          <li>संगठन का निर्णय अंतिम और बाध्यकारी होगा</li>
          <li>बार-बार रिफंड अनुरोध करने पर खाता समीक्षा की जा सकती है</li>
        </ul>
      </LegalSection>
    </LegalLayout>
  );
};

export default RefundPolicy;
