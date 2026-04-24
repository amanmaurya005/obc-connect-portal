import { useEffect, useRef, useState, useCallback } from "react";
import Instance from "../AxiosConfig";
import html2canvas from "html2canvas";
import backimg from "@/assets/logo.png";
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
  "राजस्थान (Rajasthan)": [
    "अजमेर (Ajmer)",
    "अलवर (Alwar)",
    "बांसवाड़ा (Banswara)",
    "बारां (Baran)",
    "बाड़मेर (Barmer)",
    "भरतपुर (Bharatpur)",
    "भीलवाड़ा (Bhilwara)",
    "बीकानेर (Bikaner)",
    "बूंदी (Bundi)",
    "चित्तौड़गढ़ (Chittorgarh)",
    "चूरू (Churu)",
    "दौसा (Dausa)",
    "धौलपुर (Dholpur)",
    "डूंगरपुर (Dungarpur)",
    "हनुमानगढ़ (Hanumangarh)",
    "जयपुर (Jaipur)",
    "जैसलमेर (Jaisalmer)",
    "जालोर (Jalore)",
    "झालावाड़ (Jhalawar)",
    "झुंझुनू (Jhunjhunu)",
    "जोधपुर (Jodhpur)",
    "करौली (Karauli)",
    "कोटा (Kota)",
    "नागौर (Nagaur)",
    "पाली (Pali)",
    "प्रतापगढ़ (Pratapgarh)",
    "राजसमंद (Rajsamand)",
    "सवाई माधोपुर (Sawai Madhopur)",
    "सीकर (Sikar)",
    "सिरोही (Sirohi)",
    "श्री गंगानगर (Sri Ganganagar)",
    "टोंक (Tonk)",
    "उदयपुर (Udaipur)",
  ],
  "उत्तर प्रदेश (Uttar Pradesh)": [
    "आगरा (Agra)",
    "अलीगढ़ (Aligarh)",
    "अम्बेडकर नगर (Ambedkar Nagar)",
    "अमेठी (Amethi)",
    "अमरोहा (Amroha)",
    "औरैया (Auraiya)",
    "अयोध्या (Ayodhya)",
    "आजमगढ़ (Azamgarh)",
    "बागपत (Baghpat)",
    "बहराइच (Bahraich)",
    "बलिया (Ballia)",
    "बलरामपुर (Balrampur)",
    "बांदा (Banda)",
    "बाराबंकी (Barabanki)",
    "बरेली (Bareilly)",
    "बस्ती (Basti)",
    "बिजनौर (Bijnor)",
    "बदायूं (Budaun)",
    "बुलंदशहर (Bulandshahr)",
    "चंदौली (Chandauli)",
    "चित्रकूट (Chitrakoot)",
    "देवरिया (Deoria)",
    "एटा (Etah)",
    "इटावा (Etawah)",
    "फर्रुखाबाद (Farrukhabad)",
    "फतेहपुर (Fatehpur)",
    "फिरोजाबाद (Firozabad)",
    "गौतम बुद्ध नगर (Gautam Buddha Nagar)",
    "गाज़ियाबाद (Ghaziabad)",
    "गाजीपुर (Ghazipur)",
    "गोंडा (Gonda)",
    "गोरखपुर (Gorakhpur)",
    "हमीरपुर (Hamirpur)",
    "हापुड़ (Hapur)",
    "हरदोई (Hardoi)",
    "हाथरस (Hathras)",
    "जालौन (Jalaun)",
    "जौनपुर (Jaunpur)",
    "झांसी (Jhansi)",
    "कानपुर देहात (Kanpur Dehat)",
    "कानपुर नगर (Kanpur Nagar)",
    "कासगंज (Kasganj)",
    "कौशाम्बी (Kaushambi)",
    "कुशीनगर (Kushinagar)",
    "लखीमपुर खीरी (Lakhimpur Kheri)",
    "ललितपुर (Lalitpur)",
    "लखनऊ (Lucknow)",
    "महाराजगंज (Maharajganj)",
    "महोबा (Mahoba)",
    "मैनपुरी (Mainpuri)",
    "मथुरा (Mathura)",
    "मऊ (Mau)",
    "मेरठ (Meerut)",
    "मिर्जापुर (Mirzapur)",
    "मुरादाबाद (Moradabad)",
    "मुजफ्फरनगर (Muzaffarnagar)",
    "पीलीभीत (Pilibhit)",
    "प्रतापगढ़ (Pratapgarh)",
    "प्रयागराज (Prayagraj)",
    "रायबरेली (Raebareli)",
    "रामपुर (Rampur)",
    "सहारनपुर (Saharanpur)",
    "संभल (Sambhal)",
    "संत कबीर नगर (Sant Kabir Nagar)",
    "शाहजहांपुर (Shahjahanpur)",
    "शामली (Shamli)",
    "श्रावस्ती (Shravasti)",
    "सिद्धार्थनगर (Siddharthnagar)",
    "सीतापुर (Sitapur)",
    "सोनभद्र (Sonbhadra)",
    "सुल्तानपुर (Sultanpur)",
    "उन्नाव (Unnao)",
    "वाराणसी (Varanasi)",
  ],
  "मध्य प्रदेश (Madhya Pradesh)": [
    "आगर मालवा (Agar Malwa)",
    "अलीराजपुर (Alirajpur)",
    "अनूपपुर (Anuppur)",
    "अशोकनगर (Ashoknagar)",
    "बालाघाट (Balaghat)",
    "बड़वानी (Barwani)",
    "बैतूल (Betul)",
    "भिंड (Bhind)",
    "भोपाल (Bhopal)",
    "बुरहानपुर (Burhanpur)",
    "छतरपुर (Chhatarpur)",
    "छिंदवाड़ा (Chhindwara)",
    "दमोह (Damoh)",
    "दतिया (Datia)",
    "देवास (Dewas)",
    "धार (Dhar)",
    "डिंडोरी (Dindori)",
    "गुना (Guna)",
    "ग्वालियर (Gwalior)",
    "हरदा (Harda)",
    "होशंगाबाद (Hoshangabad)",
    "इंदौर (Indore)",
    "जबलपुर (Jabalpur)",
    "झाबुआ (Jhabua)",
    "कटनी (Katni)",
    "खंडवा (Khandwa)",
    "खरगोन (Khargone)",
    "मंडला (Mandla)",
    "मंदसौर (Mandsaur)",
    "मुरैना (Morena)",
    "नरसिंहपुर (Narsinghpur)",
    "नीमच (Neemuch)",
    "निवाड़ी (Niwari)",
    "पन्ना (Panna)",
    "रायसेन (Raisen)",
    "राजगढ़ (Rajgarh)",
    "रतलाम (Ratlam)",
    "रीवा (Rewa)",
    "सागर (Sagar)",
    "सतना (Satna)",
    "सीहोर (Sehore)",
    "सिओनी (Seoni)",
    "शहडोल (Shahdol)",
    "शाजापुर (Shajapur)",
    "श्योपुर (Sheopur)",
    "शिवपुरी (Shivpuri)",
    "सीधी (Sidhi)",
    "सिंगरौली (Singrauli)",
    "टीकमगढ़ (Tikamgarh)",
    "उज्जैन (Ujjain)",
    "उमरिया (Umaria)",
    "विदिशा (Vidisha)",
  ],
  "महाराष्ट्र (Maharashtra)": [
    "अहमदनगर (Ahmednagar)",
    "अकोला (Akola)",
    "अमरावती (Amravati)",
    "औरंगाबाद (Aurangabad)",
    "बीड (Beed)",
    "भंडारा (Bhandara)",
    "बुलढाणा (Buldhana)",
    "चंद्रपुर (Chandrapur)",
    "धुले (Dhule)",
    "गडचिरोली (Gadchiroli)",
    "गोंदिया (Gondia)",
    "हिंगोली (Hingoli)",
    "जलगांव (Jalgaon)",
    "जालना (Jalna)",
    "कोल्हापुर (Kolhapur)",
    "लातूर (Latur)",
    "मुंबई शहर (Mumbai City)",
    "मुंबई उपनगर (Mumbai Suburban)",
    "नागपुर (Nagpur)",
    "नांदेड़ (Nanded)",
    "नंदुरबार (Nandurbar)",
    "नासिक (Nashik)",
    "उस्मानाबाद (Osmanabad)",
    "पालघर (Palghar)",
    "परभणी (Parbhani)",
    "पुणे (Pune)",
    "रायगड (Raigad)",
    "रत्नागिरी (Ratnagiri)",
    "सांगली (Sangli)",
    "सातारा (Satara)",
    "सिंधुदुर्ग (Sindhudurg)",
    "सोलापुर (Solapur)",
    "ठाणे (Thane)",
    "वर्धा (Wardha)",
    "वाशिम (Washim)",
    "यवतमाल (Yavatmal)",
  ],
  "गुजरात (Gujarat)": [
    "अहमदाबाद (Ahmedabad)",
    "अमरेली (Amreli)",
    "आणंद (Anand)",
    "अरावली (Aravalli)",
    "बनासकांठा (Banaskantha)",
    "भरूच (Bharuch)",
    "भावनगर (Bhavnagar)",
    "बोटाद (Botad)",
    "छोटाउदेपुर (Chhota Udaipur)",
    "दाहोद (Dahod)",
    "डांग (Dang)",
    "देवभूमि द्वारका (Devbhoomi Dwarka)",
    "गांधीनगर (Gandhinagar)",
    "गिर सोमनाथ (Gir Somnath)",
    "जामनगर (Jamnagar)",
    "जूनागढ़ (Junagadh)",
    "खेड़ा (Kheda)",
    "कच्छ (Kutch)",
    "महिसागर (Mahisagar)",
    "महेसाणा (Mehsana)",
    "मोरबी (Morbi)",
    "नर्मदा (Narmada)",
    "नवसारी (Navsari)",
    "पंचमहल (Panchmahal)",
    "पाटण (Patan)",
    "पोरबंदर (Porbandar)",
    "राजकोट (Rajkot)",
    "साबरकांठा (Sabarkantha)",
    "सूरत (Surat)",
    "सुरेंद्रनगर (Surendranagar)",
    "तापी (Tapi)",
    "वडोदरा (Vadodara)",
    "वलसाड (Valsad)",
  ],
  "बिहार (Bihar)": [
    "अरवल (Arwal)",
    "औरंगाबाद (Aurangabad)",
    "बांका (Banka)",
    "बेगूसराय (Begusarai)",
    "भागलपुर (Bhagalpur)",
    "भोजपुर (Bhojpur)",
    "बक्सर (Buxar)",
    "दरभंगा (Darbhanga)",
    "पूर्वी चंपारण (East Champaran)",
    "गया (Gaya)",
    "गोपालगंज (Gopalganj)",
    "जमुई (Jamui)",
    "जहानाबाद (Jehanabad)",
    "कैमूर (Kaimur)",
    "कटिहार (Katihar)",
    "खगड़िया (Khagaria)",
    "किशनगंज (Kishanganj)",
    "लखीसराय (Lakhisarai)",
    "मधेपुरा (Madhepura)",
    "मधुबनी (Madhubani)",
    "मुंगेर (Munger)",
    "मुजफ्फरपुर (Muzaffarpur)",
    "नालंदा (Nalanda)",
    "नवादा (Nawada)",
    "पटना (Patna)",
    "पूर्णिया (Purnia)",
    "रोहतास (Rohtas)",
    "सहरसा (Saharsa)",
    "समस्तीपुर (Samastipur)",
    "सारण (Saran)",
    "शेखपुरा (Sheikhpura)",
    "शिवहर (Sheohar)",
    "सीतामढ़ी (Sitamarhi)",
    "सीवान (Siwan)",
    "सुपौल (Supaul)",
    "वैशाली (Vaishali)",
    "पश्चिमी चंपारण (West Champaran)",
  ],
  "पंजाब (Punjab)": [
    "अमृतसर (Amritsar)",
    "बरनाला (Barnala)",
    "बठिंडा (Bathinda)",
    "फरीदकोट (Faridkot)",
    "फतेहगढ़ साहिब (Fatehgarh Sahib)",
    "फाजिल्का (Fazilka)",
    "फिरोजपुर (Firozpur)",
    "गुरदासपुर (Gurdaspur)",
    "होशियारपुर (Hoshiarpur)",
    "जालंधर (Jalandhar)",
    "कपूरथला (Kapurthala)",
    "लुधियाना (Ludhiana)",
    "मानसा (Mansa)",
    "मोगा (Moga)",
    "मोहाली (Mohali)",
    "मुक्तसर (Muktsar)",
    "नवांशहर (Nawanshahr)",
    "पठानकोट (Pathankot)",
    "पटियाला (Patiala)",
    "रूपनगर (Rupnagar)",
    "संगरूर (Sangrur)",
    "तरन तारन (Tarn Taran)",
  ],
  "हरियाणा (Haryana)": [
    "अंबाला (Ambala)",
    "भिवानी (Bhiwani)",
    "चरखी दादरी (Charkhi Dadri)",
    "फरीदाबाद (Faridabad)",
    "फतेहाबाद (Fatehabad)",
    "गुरुग्राम (Gurugram)",
    "हिसार (Hisar)",
    "झज्जर (Jhajjar)",
    "झींद (Jind)",
    "कैथल (Kaithal)",
    "करनाल (Karnal)",
    "कुरुक्षेत्र (Kurukshetra)",
    "महेंद्रगढ़ (Mahendragarh)",
    "नूंह (Nuh)",
    "पलवल (Palwal)",
    "पंचकुला (Panchkula)",
    "पानीपत (Panipat)",
    "रेवाड़ी (Rewari)",
    "रोहतक (Rohtak)",
    "सिरसा (Sirsa)",
    "सोनीपत (Sonipat)",
    "यमुनानगर (Yamunanagar)",
  ],
  "दिल्ली (Delhi)": [
    "मध्य दिल्ली (Central Delhi)",
    "पूर्वी दिल्ली (East Delhi)",
    "नई दिल्ली (New Delhi)",
    "उत्तर दिल्ली (North Delhi)",
    "उत्तर पूर्वी दिल्ली (North East Delhi)",
    "उत्तर पश्चिमी दिल्ली (North West Delhi)",
    "शाहदरा (Shahdara)",
    "दक्षिण दिल्ली (South Delhi)",
    "दक्षिण पूर्वी दिल्ली (South East Delhi)",
    "दक्षिण पश्चिमी दिल्ली (South West Delhi)",
    "पश्चिमी दिल्ली (West Delhi)",
  ],
  "छत्तीसगढ़ (Chhattisgarh)": [
    "बालोद (Balod)",
    "बलौदाबाजार (Baloda Bazar)",
    "बलरामपुर (Balrampur)",
    "बस्तर (Bastar)",
    "बेमेतरा (Bemetara)",
    "बीजापुर (Bijapur)",
    "बिलासपुर (Bilaspur)",
    "दंतेवाड़ा (Dantewada)",
    "धमतरी (Dhamtari)",
    "दुर्ग (Durg)",
    "गरियाबंद (Gariaband)",
    "जांजगीर-चांपा (Janjgir-Champa)",
    "जशपुर (Jashpur)",
    "कबीरधाम (Kabirdham)",
    "कांकेर (Kanker)",
    "कोंडागांव (Kondagaon)",
    "कोरबा (Korba)",
    "कोरिया (Koriya)",
    "महासमुंद (Mahasamund)",
    "मुंगेली (Mungeli)",
    "नारायणपुर (Narayanpur)",
    "रायगढ़ (Raigarh)",
    "रायपुर (Raipur)",
    "राजनांदगांव (Rajnandgaon)",
    "सुकमा (Sukma)",
    "सूरजपुर (Surajpur)",
    "सरगुजा (Surguja)",
  ],
  "झारखंड (Jharkhand)": [
    "बोकारो (Bokaro)",
    "चतरा (Chatra)",
    "देवघर (Deoghar)",
    "धनबाद (Dhanbad)",
    "दुमका (Dumka)",
    "पूर्वी सिंहभूम (East Singhbhum)",
    "गढ़वा (Garhwa)",
    "गिरिडीह (Giridih)",
    "गोड्डा (Godda)",
    "गुमला (Gumla)",
    "हजारीबाग (Hazaribagh)",
    "जामताड़ा (Jamtara)",
    "खूंटी (Khunti)",
    "कोडरमा (Koderma)",
    "लातेहार (Latehar)",
    "लोहरदगा (Lohardaga)",
    "पाकुड़ (Pakur)",
    "पलामू (Palamu)",
    "रामगढ़ (Ramgarh)",
    "रांची (Ranchi)",
    "साहिबगंज (Sahibganj)",
    "सरायकेला खरसावां (Saraikela Kharsawan)",
    "सिमडेगा (Simdega)",
    "पश्चिमी सिंहभूम (West Singhbhum)",
  ],
  "उत्तराखंड (Uttarakhand)": [
    "अल्मोड़ा (Almora)",
    "बागेश्वर (Bageshwar)",
    "चमोली (Chamoli)",
    "चंपावत (Champawat)",
    "देहरादून (Dehradun)",
    "हरिद्वार (Haridwar)",
    "नैनीताल (Nainital)",
    "पौड़ी गढ़वाल (Pauri Garhwal)",
    "पिथौरागढ़ (Pithoragarh)",
    "रुद्रप्रयाग (Rudraprayag)",
    "टिहरी गढ़वाल (Tehri Garhwal)",
    "उधम सिंह नगर (Udham Singh Nagar)",
    "उत्तरकाशी (Uttarkashi)",
  ],
  "हिमाचल प्रदेश (Himachal Pradesh)": [
    "बिलासपुर (Bilaspur)",
    "चंबा (Chamba)",
    "हमीरपुर (Hamirpur)",
    "कांगड़ा (Kangra)",
    "किन्नौर (Kinnaur)",
    "कुल्लू (Kullu)",
    "लाहुल और स्पीति (Lahaul and Spiti)",
    "मंडी (Mandi)",
    "शिमला (Shimla)",
    "सिरमौर (Sirmaur)",
    "सोलन (Solan)",
    "ऊना (Una)",
  ],
  "केरल (Kerala)": [
    "अलाप्पुझा (Alappuzha)",
    "एर्नाकुलम (Ernakulam)",
    "इडुक्की (Idukki)",
    "कन्नूर (Kannur)",
    "कासरगोड (Kasaragod)",
    "कोल्लम (Kollam)",
    "कोट्टायम (Kottayam)",
    "कोझिकोड (Kozhikode)",
    "मलप्पुरम (Malappuram)",
    "पलक्कड़ (Palakkad)",
    "पथनमथिट्टा (Pathanamthitta)",
    "तिरुवनंतपुरम (Thiruvananthapuram)",
    "त्रिशूर (Thrissur)",
    "वायनाड (Wayanad)",
  ],
  "तमिलनाडु (Tamil Nadu)": [
    "अरियालुर (Ariyalur)",
    "चेंगलपट्टू (Chengalpattu)",
    "चेन्नई (Chennai)",
    "कोयंबटूर (Coimbatore)",
    "कुड्डालोर (Cuddalore)",
    "धर्मपुरी (Dharmapuri)",
    "डिंडीगुल (Dindigul)",
    "इरोड (Erode)",
    "कांचीपुरम (Kanchipuram)",
    "कन्याकुमारी (Kanyakumari)",
    "करूर (Karur)",
    "कृष्णागिरी (Krishnagiri)",
    "मदुरै (Madurai)",
    "नागपट्टिनम (Nagapattinam)",
    "नामक्कल (Namakkal)",
    "पेरम्बलूर (Perambalur)",
    "पुदुक्कोट्टई (Pudukkottai)",
    "रामनाथपुरम (Ramanathapuram)",
    "सलेम (Salem)",
    "शिवगंगा (Sivaganga)",
    "थंजावुर (Thanjavur)",
    "तिरुचिरापल्ली (Tiruchirappalli)",
    "तिरुनेलवेली (Tirunelveli)",
    "तिरुप्पुर (Tiruppur)",
    "तिरुवल्लुर (Tiruvallur)",
    "वेल्लोर (Vellore)",
    "विरुधुनगर (Virudhunagar)",
  ],
  "कर्नाटक (Karnataka)": [
    "बागलकोट (Bagalkot)",
    "बल्लारी (Ballari)",
    "बेलगावी (Belagavi)",
    "बेंगलुरु ग्रामीण (Bengaluru Rural)",
    "बेंगलुरु शहरी (Bengaluru Urban)",
    "बीदर (Bidar)",
    "चामराजनगर (Chamarajanagar)",
    "चिकबल्लापुर (Chikkaballapur)",
    "चिकमगलूर (Chikkamagaluru)",
    "चित्रदुर्ग (Chitradurga)",
    "दक्षिण कन्नड़ (Dakshina Kannada)",
    "दावणगेरे (Davanagere)",
    "धारवाड़ (Dharwad)",
    "गदग (Gadag)",
    "हासन (Hassan)",
    "हावेरी (Haveri)",
    "कलबुर्गी (Kalaburagi)",
    "कोडागु (Kodagu)",
    "कोलार (Kolar)",
    "कोप्पल (Koppal)",
    "मांड्या (Mandya)",
    "मैसूर (Mysuru)",
    "रायचूर (Raichur)",
    "रामनगर (Ramanagara)",
    "शिवमोग्गा (Shivamogga)",
    "तुमकुरु (Tumakuru)",
    "उडुपी (Udupi)",
    "उत्तर कन्नड़ (Uttara Kannada)",
    "विजयपुरा (Vijayapura)",
    "यादगीर (Yadgir)",
  ],
  "आंध्र प्रदेश (Andhra Pradesh)": [
    "अनंतपुर (Anantapur)",
    "चित्तूर (Chittoor)",
    "पूर्वी गोदावरी (East Godavari)",
    "गुंटूर (Guntur)",
    "कडपा (Kadapa)",
    "कृष्णा (Krishna)",
    "कुर्नूल (Kurnool)",
    "नेल्लोर (Nellore)",
    "प्रकाशम (Prakasam)",
    "श्रीकाकुलम (Srikakulam)",
    "विशाखापट्टनम (Visakhapatnam)",
    "विजयनगरम (Vizianagaram)",
    "पश्चिमी गोदावरी (West Godavari)",
  ],
  "तेलंगाना (Telangana)": [
    "आदिलाबाद (Adilabad)",
    "भद्राद्री कोठागुडेम (Bhadradri Kothagudem)",
    "हैदराबाद (Hyderabad)",
    "जगतियाल (Jagtial)",
    "जनगांव (Jangaon)",
    "करीमनगर (Karimnagar)",
    "खम्मम (Khammam)",
    "महबूबनगर (Mahabubnagar)",
    "मेडक (Medak)",
    "नलगोंडा (Nalgonda)",
    "निजामाबाद (Nizamabad)",
    "रंगारेड्डी (Rangareddy)",
    "संगारेड्डी (Sangareddy)",
    "सिद्दीपेट (Siddipet)",
    "सूर्यापेट (Suryapet)",
    "वारंगल ग्रामीण (Warangal Rural)",
    "वारंगल शहरी (Warangal Urban)",
  ],
  "ओडिशा (Odisha)": [
    "अंगुल (Angul)",
    "बलांगीर (Balangir)",
    "बालेश्वर (Baleshwar)",
    "बरगढ़ (Bargarh)",
    "बौध (Boudh)",
    "भद्रक (Bhadrak)",
    "कटक (Cuttack)",
    "देवगढ़ (Deogarh)",
    "ढेंकनाल (Dhenkanal)",
    "गजपति (Gajapati)",
    "गंजाम (Ganjam)",
    "जगतसिंहपुर (Jagatsinghpur)",
    "जाजपुर (Jajpur)",
    "झारसुगुड़ा (Jharsuguda)",
    "कालाहांडी (Kalahandi)",
    "केंद्रपाड़ा (Kendrapara)",
    "केंदुझर (Kendujhar)",
    "खोरधा (Khordha)",
    "कोरापुट (Koraput)",
    "मलकानगिरि (Malkangiri)",
    "मयूरभंज (Mayurbhanj)",
    "नबरंगपुर (Nabarangpur)",
    "नयागढ़ (Nayagarh)",
    "पुरी (Puri)",
    "रायगडा (Rayagada)",
    "संबलपुर (Sambalpur)",
    "सोनपुर (Subarnapur)",
    "सुंदरगढ़ (Sundargarh)",
  ],
  "असम (Assam)": [
    "बक्सा (Baksa)",
    "बरपेटा (Barpeta)",
    "बिश्वनाथ (Biswanath)",
    "बोंगाईगांव (Bongaigaon)",
    "कछार (Cachar)",
    "चराईदेव (Charaideo)",
    "चिरांग (Chirang)",
    "दरांग (Darrang)",
    "धेमाजी (Dhemaji)",
    "धुबरी (Dhubri)",
    "डिब्रूगढ़ (Dibrugarh)",
    "गोलपारा (Goalpara)",
    "गोलाघाट (Golaghat)",
    "हैलाकांडी (Hailakandi)",
    "जोरहाट (Jorhat)",
    "कामरूप (Kamrup)",
    "कामरूप महानगर (Kamrup Metropolitan)",
    "कार्बी आंगलोंग (Karbi Anglong)",
    "करीमगंज (Karimganj)",
    "कोकराझार (Kokrajhar)",
    "लखीमपुर (Lakhimpur)",
    "मोरीगांव (Morigaon)",
    "नगांव (Nagaon)",
    "नलबाड़ी (Nalbari)",
    "शिवसागर (Sivasagar)",
    "सोनितपुर (Sonitpur)",
    "तिनसुकिया (Tinsukia)",
    "उदलगुड़ी (Udalguri)",
  ],
  "पश्चिम बंगाल (West Bengal)": [
    "अलीपुरद्वार (Alipurduar)",
    "बांकुड़ा (Bankura)",
    "बीरभूम (Birbhum)",
    "कूच बिहार (Cooch Behar)",
    "दक्षिण दिनाजपुर (Dakshin Dinajpur)",
    "दार्जिलिंग (Darjeeling)",
    "हुगली (Hooghly)",
    "हावड़ा (Howrah)",
    "जलपाईगुड़ी (Jalpaiguri)",
    "कालिम्पोंग (Kalimpong)",
    "कोलकाता (Kolkata)",
    "मालदा (Malda)",
    "मुर्शिदाबाद (Murshidabad)",
    "नदिया (Nadia)",
    "उत्तर 24 परगना (North 24 Parganas)",
    "पश्चिम बर्धमान (Paschim Bardhaman)",
    "पश्चिम मेदिनीपुर (Paschim Medinipur)",
    "पुरुलिया (Purulia)",
    "दक्षिण 24 परगना (South 24 Parganas)",
    "पूर्व बर्धमान (Purba Bardhaman)",
    "पूर्व मेदिनीपुर (Purba Medinipur)",
    "उत्तर दिनाजपुर (Uttar Dinajpur)",
  ],
  "गोवा (Goa)": ["उत्तर गोवा (North Goa)", "दक्षिण गोवा (South Goa)"],
  "जम्मू और कश्मीर (Jammu and Kashmir)": [
    "अनंतनाग (Anantnag)",
    "बांदीपोरा (Bandipora)",
    "बारामूला (Baramulla)",
    "बडगाम (Budgam)",
    "डोडा (Doda)",
    "गांदरबल (Ganderbal)",
    "जम्मू (Jammu)",
    "कठुआ (Kathua)",
    "किश्तवाड़ (Kishtwar)",
    "कुलगाम (Kulgam)",
    "कुपवाड़ा (Kupwara)",
    "पुलवामा (Pulwama)",
    "पुंछ (Poonch)",
    "रामबन (Ramban)",
    "रियासी (Reasi)",
    "राजौरी (Rajouri)",
    "सांबा (Samba)",
    "शोपियां (Shopian)",
    "श्रीनगर (Srinagar)",
    "उधमपुर (Udhampur)",
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

interface UserCardData {
  name: string;
  father: string;
  mobile: string;
  receipt: string;
  image: string;
}

export default function MembershipPage() {
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const [timerId, setTimerId] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
const [showReceipt, setShowReceipt] = useState(false);
const [savingData, setSavingData] = useState(false); 
const [saveProgress, setSaveProgress] = useState(0);


  const cardRef = useRef<HTMLDivElement | null>(null);
  const [userData, setUserData] = useState<UserCardData | null>(null);

  const [districtVidhansabhas, setDistrictVidhansabhas] = useState([]);
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

  // Cleanup any pending timeouts on unmount.
  useEffect(() => {
    return () => {
      if (timerId) window.clearTimeout(timerId);
    };
  }, [timerId]);

  const [selectedVidhansabha, setSelectedVidhansabha] = useState("");
  const handleVidhansabhaSelect = useCallback((vidhansabha: string) => {
    setSelectedVidhansabha(vidhansabha);
    // Optional: data को filter करें getData() में vidhansabha param add करके
  }, []);

  const downloadCard = async () => {
    if (!cardRef.current) return;
  
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#ffffff",
      });
  
      const link = document.createElement("a");
      link.download = "id-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
  
      showSwipeNotifications("✅ आईडी कार्ड डाउनलोड सफल/Successfully", "#FF9933"); // केसरिया
    } catch (error) {
      console.error("Error downloading card:", error);
      showSwipeNotifications("❌ डाउनलोड विफल, पुनः प्रयास करें", "#138808"); // हरा
    }
  };
  
  // राइट से सेंटर में स्वाइप होकर आने वाला नोटिफिकेशन (इंडियन फ्लैग कलर्स के साथ)
  const showSwipeNotifications = (message, primaryColor) => {
    // पुराना नोटिफिकेशन हटाएँ
    const oldNotif = document.getElementById("swipe-notification");
    if (oldNotif) oldNotif.remove();
  
    const toast = document.createElement("div");
    toast.id = "swipe-notification";
    toast.innerText = message;
    
    // तिरंगा ग्रेडिएंट बैकग्राउंड (भारतीय ध्वज के रंग)
    if (primaryColor === "#FF9933") {
      // सफलता पर - तिरंगा ग्रेडिएंट
      toast.style.background = "linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)";
      toast.style.color = "#000";
      toast.style.fontWeight = "700";
      toast.style.textShadow = "0 0 2px rgba(255,255,255,0.5)";
    } else {
      // एरर पर - लाल और हरा मिक्स
      toast.style.background = "linear-gradient(135deg, #FF0000 0%, #138808 100%)";
      toast.style.color = "#fff";
    }
    
    // शुरुआत में राइट साइड पर (छिपा हुआ)
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "-400px";
    toast.style.padding = "14px 32px";
    toast.style.borderRadius = "50px";
    toast.style.fontSize = "18px";
    toast.style.fontWeight = "600";
    toast.style.fontFamily = "sans-serif";
    toast.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
    toast.style.zIndex = "10000";
    toast.style.textAlign = "center";
    toast.style.minWidth = "280px";
    toast.style.maxWidth = "90%";
    toast.style.whiteSpace = "nowrap";
    toast.style.backdropFilter = "blur(10px)";
    toast.style.border = "2px solid rgba(255,255,255,0.5)";
    toast.style.cursor = "pointer";
    toast.style.letterSpacing = "0.5px";
    
    // एनिमेशन के लिए ट्रांजिशन
    toast.style.transition = "right 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    
    document.body.appendChild(toast);
    
    // राइट से सेंटर में आएगा
    setTimeout(() => {
      toast.style.right = "50%";
      toast.style.transform = "translateX(50%)";
    }, 50);
    
    // 3 सेकंड बाद वापस राइट को जाएगा
    setTimeout(() => {
      toast.style.right = "-400px";
      toast.style.transform = "translateX(0)";
      setTimeout(() => toast.remove(), 500);
    }, 4500);
  };

  const downloadReceipt = async () => {
    const element = document.getElementById("receipt-capture");
    if (!element) return;
  
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#f38cb4",
        logging: false,
      });
  
      const link = document.createElement("a");
      link.download = `receipt_${receiptData.receiptNumber}.png`;
      link.href = canvas.toDataURL();
      link.click();
  
      showSwipeNotification("✅ रसीद डाउनलोड सफल/Successfully", "#10b981");
    } catch (error) {
      console.error("Error downloading receipt:", error);
      showSwipeNotification("❌ डाउनलोड विफल, पुनः प्रयास करें", "#ef4444");
    }
  };
  
  // राइट से सेंटर में स्वाइप होकर आने वाला नोटिफिकेशन
  const showSwipeNotification = (message, bgColor) => {
    // पुराना नोटिफिकेशन हटाएँ
    const oldNotif = document.getElementById("swipe-notification");
    if (oldNotif) oldNotif.remove();
  
    const toast = document.createElement("div");
    toast.id = "swipe-notification";
    toast.innerText = message;
    
    // शुरुआत में राइट साइड पर (छिपा हुआ)
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.right = "-400px"; // स्क्रीन के बाहर दाएं तरफ
    toast.style.backgroundColor = bgColor;
    toast.style.color = "white";
    toast.style.padding = "14px 32px";
    toast.style.borderRadius = "50px";
    toast.style.fontSize = "18px";
    toast.style.fontWeight = "600";
    toast.style.fontFamily = "sans-serif";
    toast.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
    toast.style.zIndex = "10000";
    toast.style.textAlign = "center";
    toast.style.minWidth = "250px";
    toast.style.maxWidth = "90%";
    toast.style.whiteSpace = "nowrap";
    toast.style.backdropFilter = "blur(10px)";
    toast.style.border = "1px solid rgba(255,255,255,0.3)";
    toast.style.cursor = "pointer";
    
    // ट्रांजिशन - स्वाइप इफेक्ट के लिए
    toast.style.transition = "right 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    
    document.body.appendChild(toast);
    
    // थोड़ी देर बाद राइट से सेंटर में आएगा
    setTimeout(() => {
      toast.style.right = "50%";
      toast.style.transform = "translateX(50%)"; // सेंटर में लाने के लिए
    }, 50);
    
    // 2.5 सेकंड बाद वापस राइट को स्वाइप करके जाएगा
    setTimeout(() => {
      toast.style.right = "-400px";
      toast.style.transform = "translateX(0)";
      setTimeout(() => toast.remove(), 500);
    }, 4500);
  };

  const numberToHindiWords = (n: unknown) => {
    const num = Number(n);
    if (!Number.isFinite(num)) return "";
    return `${num}`;
  };

  // Sequential success -> loading -> ID card flow
  const handleSuccessfulRegistration = async (
    memberId: string,
    userDataForCard: UserCardData
  ) => {
    if (timerId) window.clearTimeout(timerId);
  
    try {
      // 🔥 Fetch receipt data from backend
      const receiptResponse = await Instance.get(`/api/membership/receipt/${memberId}`);
      setReceiptData(receiptResponse.data);
      
      // Start flow immediately
      setShowSuccessMessage(true);
      setSubmitted(true);
      setShowLoading(false);
      setShowIdCard(false);
      setUserData(null);
      setShowReceipt(false);
  
      const id1 = window.setTimeout(() => {
        setShowSuccessMessage(false);
        setShowLoading(true);
  
        const id2 = window.setTimeout(() => {
          setShowLoading(false);
          setUserData(userDataForCard);
          setShowIdCard(true);
          
          // 🔥 After ID card shows, show receipt modal after 1 second
          const id3 = window.setTimeout(() => {
            setShowReceipt(true);
          }, 1000);
          
          setTimerId(id3);
        }, 1000);
  
        setTimerId(id2);
      }, 3000);
  
      setTimerId(id1);
      
    } catch (error) {
      console.error("Error fetching receipt:", error);
      // Continue without receipt if error
      // Start flow without receipt
      setShowSuccessMessage(true);
      setSubmitted(true);
      // ... rest of the flow
    }
  };

  // Reset everything function
  const resetForm = () => {
    if (timerId) window.clearTimeout(timerId);
    setTimerId(null);

    setShowSuccessMessage(false);
    setShowLoading(false);
    setShowIdCard(false);
    setSubmitted(false);
    setIsValid(false);
    setUserData(null);
    setLoading(false);

 
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
      otherEducation: "",
      dob: "",
      marriageDate: "",
      bloodGroup: "",
      tshirtSize: "",
      socialWork: "",
      specialAchievement: "",
      membershipType: "life",
      state: "",
      district: "",
      imageFile: undefined,
    });

    setSelectedVidhansabha("");
    setImagePreview("");
    setErrors({});

    const imageInput = document.getElementById("imageInput");
    if (imageInput instanceof HTMLInputElement) imageInput.value = "";
  };

  // paste.txt में STATESDISTRICTS के बाद ये add करें
  // const VIDHANSHABHAS = [
  //   { id: 1, name: "सादुलशहर" },
  //   { id: 2, name: "गंगानगर" },
  //   { id: 3, name: "करणपुर" },
  //   { id: 4, name: "सूरतगढ़" },
  //   { id: 5, name: "रायसिंहनगर" },
  //   { id: 6, name: "अनूपगढ़" },
  //   { id: 7, name: "संगरिया" },
  //   { id: 8, name: "हनुमानगढ़" },
  //   { id: 9, name: "पिलीबंगा" },
  //   { id: 10, name: "नोहर" },
  //   { id: 11, name: "भादरा" },
  //   { id: 12, name: "खाजूवाला" },
  //   { id: 13, name: "बीकानेर पश्चिम" },
  //   { id: 14, name: "बीकानेर पूर्व" },
  //   { id: 15, name: "कोलायत" },
  //   { id: 16, name: "लूणकरणसर" },
  //   { id: 17, name: "डूंगरगढ़" },
  //   { id: 18, name: "नोखा" },
  //   { id: 19, name: "सादुलपुर" },
  //   { id: 20, name: "तारानगर" },
  //   { id: 21, name: "सरदारशहर" },
  //   { id: 22, name: "चूरू" },
  //   { id: 23, name: "रतनगढ़" },
  //   { id: 24, name: "सुजानगढ़" },
  //   { id: 25, name: "पिलानी" },
  //   { id: 26, name: "सूरजगढ़" },
  //   { id: 27, name: "झुंझुनू" },
  //   { id: 28, name: "मंडावा" },
  //   { id: 29, name: "नवलगढ़" },
  //   { id: 30, name: "उदयपुरवाटी" },
  //   { id: 31, name: "खेतड़ी" },
  //   { id: 32, name: "फतेहपुर" },
  //   { id: 33, name: "लक्ष्मणगढ़" },
  //   { id: 34, name: "धोद" },
  //   { id: 35, name: "सीकर" },
  //   { id: 36, name: "दांतारामगढ़" },
  //   { id: 37, name: "खंडेला" },
  //   { id: 38, name: "नीम का थाना" },
  //   { id: 39, name: "श्रीमाधोपुर" },
  //   { id: 40, name: "कोटपूतली" },
  //   { id: 41, name: "विराटनगर" },
  //   { id: 42, name: "शाहपुरा" },
  //   { id: 43, name: "चोमू" },
  //   { id: 44, name: "फुलेरा" },
  //   { id: 45, name: "दूदू" },
  //   { id: 46, name: "झोटवाड़ा" },
  //   { id: 47, name: "आमेर" },
  //   { id: 48, name: "जामवारामगढ़" },
  //   { id: 49, name: "हवा महल" },
  //   { id: 50, name: "विद्याधर नगर" },
  //   { id: 51, name: "सिविल लाइन्स" },
  //   { id: 52, name: "किशनपोल" },
  //   { id: 53, name: "आदर्श नगर" },
  //   { id: 54, name: "मालवीय नगर" },
  //   { id: 55, name: "सांगानेर" },
  //   { id: 56, name: "बगरू" },
  //   { id: 57, name: "बासी" },
  //   { id: 58, name: "चाकसू" },
  //   { id: 59, name: "तिजारा" },
  //   { id: 60, name: "किशनगढ़ बास" },
  //   { id: 61, name: "मुंडावर" },
  //   { id: 62, name: "बहरोड़" },
  //   { id: 63, name: "बानसूर" },
  //   { id: 64, name: "थानागाजी" },
  //   { id: 65, name: "अलवर ग्रामीण" },
  //   { id: 66, name: "अलवर शहर" },
  //   { id: 67, name: "रामगढ़" },
  //   { id: 68, name: "राजगढ़-लक्ष्मणगढ़" },
  //   { id: 69, name: "कठूमर" },
  //   { id: 70, name: "कामां" },
  //   { id: 71, name: "नगर" },
  //   { id: 72, name: "डीग-कुम्हेर" },
  //   { id: 73, name: "भरतपुर" },
  //   { id: 74, name: "नदबई" },
  //   { id: 75, name: "वीर" },
  //   { id: 76, name: "बयाना" },
  //   { id: 77, name: "बसेड़ी" },
  //   { id: 78, name: "बाड़ी" },
  //   { id: 79, name: "धौलपुर" },
  //   { id: 80, name: "राजाखेड़ा" },
  //   { id: 81, name: "टोडाभीम" },
  //   { id: 82, name: "हिण्डौन" },
  //   { id: 83, name: "करौली" },
  //   { id: 84, name: "सपोटरा" },
  //   { id: 85, name: "बांदीकुई" },
  //   { id: 86, name: "महवा" },
  //   { id: 87, name: "सिकराय" },
  //   { id: 88, name: "दौसा" },
  //   { id: 89, name: "लालसोट" },
  //   { id: 90, name: "गंगापुर" },
  //   { id: 91, name: "बामनवास" },
  //   { id: 92, name: "सवाई माधोपुर" },
  //   { id: 93, name: "खंडार" },
  //   { id: 94, name: "मालपुरा" },
  //   { id: 95, name: "टोंक" },
  //   { id: 96, name: "निवाई" },
  //   { id: 97, name: "देवली-उनियारा" },
  //   { id: 98, name: "किशनगढ़" },
  //   { id: 99, name: "पुष्कर" },
  //   { id: 100, name: "अजमेर उत्तर" },
  //   { id: 101, name: "अजमेर दक्षिण" },
  //   { id: 102, name: "नसीराबाद" },
  //   { id: 103, name: "ब्यावर" },
  //   { id: 104, name: "मसूदा" },
  //   { id: 105, name: "केकड़ी" },
  //   { id: 106, name: "लाडनूं" },
  //   { id: 107, name: "डीडवाना" },
  //   { id: 108, name: "जायल" },
  //   { id: 109, name: "नागौर" },
  //   { id: 110, name: "खींवसर" },
  //   { id: 111, name: "मेड़ता" },
  //   { id: 112, name: "डेगाना" },
  //   { id: 113, name: "मकराना" },
  //   { id: 114, name: "परबतसर" },
  //   { id: 115, name: "नावां" },
  //   { id: 116, name: "जैतारण" },
  //   { id: 117, name: "सोजत" },
  //   { id: 118, name: "पाली" },
  //   { id: 119, name: "मारवाड़ जंक्शन" },
  //   { id: 120, name: "बाली" },
  //   { id: 121, name: "सुमेरपुर" },
  //   { id: 122, name: "फलोदी" },
  //   { id: 123, name: "लोहावट" },
  //   { id: 124, name: "शेरगढ़" },
  //   { id: 125, name: "ओसियां" },
  //   { id: 126, name: "भोपालगढ़" },
  //   { id: 127, name: "सरदारपुरा" },
  //   { id: 128, name: "जोधपुर" },
  //   { id: 129, name: "सूरसागर" },
  //   { id: 130, name: "लूणी" },
  //   { id: 131, name: "बिलाड़ा" },
  //   { id: 132, name: "जैसलमेर" },
  //   { id: 133, name: "पोकरण" },
  //   { id: 134, name: "शिव" },
  //   { id: 135, name: "बाड़मेर" },
  //   { id: 136, name: "बायतू" },
  //   { id: 137, name: "पचपदरा" },
  //   { id: 138, name: "सिवाना" },
  //   { id: 139, name: "गुढ़ा मालानी" },
  //   { id: 140, name: "चौहटन" },
  //   { id: 141, name: "आहोर" },
  //   { id: 142, name: "जालोर" },
  //   { id: 143, name: "भीनमाल" },
  //   { id: 144, name: "सांचौर" },
  //   { id: 145, name: "रानीवाड़ा" },
  //   { id: 146, name: "सिरोही" },
  //   { id: 147, name: "पिंडवाड़ा-आबू" },
  //   { id: 148, name: "रेवदर" },
  //   { id: 149, name: "गोगुन्दा" },
  //   { id: 150, name: "झाड़ोल" },
  //   { id: 151, name: "खेरवाड़ा" },
  //   { id: 152, name: "उदयपुर ग्रामीण" },
  //   { id: 153, name: "उदयपुर" },
  //   { id: 154, name: "मावली" },
  //   { id: 155, name: "वल्लभनगर" },
  //   { id: 156, name: "सलूम्बर" },
  //   { id: 157, name: "धरियावद" },
  //   { id: 158, name: "डूंगरपुर" },
  //   { id: 159, name: "आसपुर" },
  //   { id: 160, name: "सागवाड़ा" },
  //   { id: 161, name: "चौरासी" },
  //   { id: 162, name: "घाटोल" },
  //   { id: 163, name: "गढ़ी" },
  //   { id: 164, name: "बांसवाड़ा" },
  //   { id: 165, name: "बागीदौरा" },
  //   { id: 166, name: "कुशलगढ़" },
  //   { id: 167, name: "कपासन" },
  //   { id: 168, name: "बेगूं" },
  //   { id: 169, name: "चित्तौड़गढ़" },
  //   { id: 170, name: "निंबाहेड़ा" },
  //   { id: 171, name: "बड़ी सादड़ी" },
  //   { id: 172, name: "प्रतापगढ़" },
  //   { id: 173, name: "भींडर" },
  //   { id: 174, name: "कुम्भलगढ़" },
  //   { id: 175, name: "राजसमंद" },
  //   { id: 176, name: "नाथद्वारा" },
  //   { id: 177, name: "आसींद" },
  //   { id: 178, name: "मांडल" },
  //   { id: 179, name: "सहाड़ा" },
  //   { id: 180, name: "भीलवाड़ा" },
  //   { id: 181, name: "शाहपुरा" },
  //   { id: 182, name: "जहाजपुर" },
  //   { id: 183, name: "मांडलगढ़" },
  //   { id: 184, name: "हिंडोली" },
  //   { id: 185, name: "केशोरायपाटन" },
  //   { id: 186, name: "बूंदी" },
  //   { id: 187, name: "पीपल्दा" },
  //   { id: 188, name: "सांगोद" },
  //   { id: 189, name: "कोटा उत्तर" },
  //   { id: 190, name: "कोटा दक्षिण" },
  //   { id: 191, name: "लाडपुरा" },
  //   { id: 192, name: "रामगंज मंडी" },
  //   { id: 193, name: "अंता" },
  //   { id: 194, name: "किशनगंज" },
  //   { id: 195, name: "बारां-अटरू" },
  //   { id: 196, name: "छबड़ा" },
  //   { id: 197, name: "डग" },
  //   { id: 198, name: "झालरापाटन" },
  //   { id: 199, name: "खानपुर" },
  //   { id: 200, name: "पीरावा" },
  // ];


  const districtVidhansabhaMap = {
    // ==================== RAJASTHAN ====================
    "अजमेर (Ajmer)": ["पुष्कर", "अजमेर उत्तर", "अजमेर दक्षिण", "किशनगढ़", "नसीराबाद", "मसूदा", "केकड़ी", "ब्यावर"],
    "अलवर (Alwar)": ["अलवर ग्रामीण", "अलवर शहर", "रामगढ़", "राजगढ़-लक्ष्मणगढ़", "कठूमर", "कामां", "नगर", "बानसूर", "थानागाजी", "बहरोड़", "मुंडावर", "तिजारा", "किशनगढ़ बास"],
    "बांसवाड़ा (Banswara)": ["बांसवाड़ा", "बागीदौरा", "कुशलगढ़", "गढ़ी", "घाटोल", "चौरासी", "सागवाड़ा", "आसपुर"],
    "बारां (Baran)": ["बारां-अटरू", "छबड़ा", "किशनगंज", "अंता", "रामगंज मंडी"],
    "बाड़मेर (Barmer)": ["बाड़मेर", "बायतू", "पचपदरा", "सिवाना", "गुढ़ा मालानी", "चौहटन", "शिव", "पोकरण"],
    "भरतपुर (Bharatpur)": ["भरतपुर", "नदबई", "डीग-कुम्हेर", "वीर", "बयाना", "बसेड़ी", "बाड़ी", "राजाखेड़ा"],
    "भीलवाड़ा (Bhilwara)": ["भीलवाड़ा", "शाहपुरा", "जहाजपुर", "मांडलगढ़", "आसींद", "मांडल", "सहाड़ा"],
    "बीकानेर (Bikaner)": ["बीकानेर पश्चिम", "बीकानेर पूर्व", "कोलायत", "लूणकरणसर", "डूंगरगढ़", "नोखा", "खाजूवाला"],
    "बूंदी (Bundi)": ["बूंदी", "हिंडोली", "केशोरायपाटन", "पीपल्दा"],
    "चित्तौड़गढ़ (Chittorgarh)": ["चित्तौड़गढ़", "निंबाहेड़ा", "बड़ी सादड़ी", "कपासन", "बेगूं"],
    "चूरू (Churu)": ["चूरू", "रतनगढ़", "सुजानगढ़", "तारानगर", "सरदारशहर", "सादुलपुर"],
    "दौसा (Dausa)": ["दौसा", "बांदीकुई", "महवा", "सिकराय", "लालसोट"],
    "धौलपुर (Dholpur)": ["धौलपुर", "बाड़ी", "राजाखेड़ा", "बसेड़ी"],
    "डूंगरपुर (Dungarpur)": ["डूंगरपुर", "आसपुर", "सागवाड़ा", "चौरासी", "घाटोल", "गढ़ी"],
    "हनुमानगढ़ (Hanumangarh)": ["हनुमानगढ़", "पिलीबंगा", "नोहर", "भादरा", "संगरिया", "रायसिंहनगर", "सुरतगढ़"],
    "जयपुर (Jaipur)": ["आमेर", "हवा महल", "विद्याधर नगर", "सिविल लाइन्स", "किशनपोल", "आदर्श नगर", "मालवीय नगर", "सांगानेर", "बगरू", "चाकसू", "झोटवाड़ा", "जामवारामगढ़", "फुलेरा", "दूदू", "कोटपूतली", "विराटनगर", "शाहपुरा", "चोमू", "बासी"],
    "जैसलमेर (Jaisalmer)": ["जैसलमेर", "पोकरण"],
    "जालोर (Jalore)": ["जालोर", "आहोर", "भीनमाल", "सांचौर", "रानीवाड़ा"],
    "झालावाड़ (Jhalawar)": ["झालरापाटन", "खानपुर", "पीरावा", "डग"],
    "झुंझुनू (Jhunjhunu)": ["झुंझुनू", "मंडावा", "नवलगढ़", "उदयपुरवाटी", "खेतड़ी", "पिलानी", "सूरजगढ़"],
    "जोधपुर (Jodhpur)": ["सरदारपुरा", "जोधपुर", "सूरसागर", "लूणी", "बिलाड़ा", "फलोदी", "लोहावट", "शेरगढ़", "ओसियां", "भोपालगढ़"],
    "करौली (Karauli)": ["करौली", "टोडाभीम", "हिण्डौन", "सपोटरा"],
    "कोटा (Kota)": ["कोटा उत्तर", "कोटा दक्षिण", "लाडपुरा", "रामगंज मंडी", "अंता", "संगोद"],
    "नागौर (Nagaur)": ["नागौर", "डीडवाना", "जायल", "लाडनूं", "खींवसर", "मेड़ता", "डेगाना", "मकराना", "परबतसर", "नावां"],
    "पाली (Pali)": ["पाली", "जैतारण", "सोजत", "बाली", "सुमेरपुर", "मारवाड़ जंक्शन"],
    "प्रतापगढ़ (Pratapgarh)": ["प्रतापगढ़", "भींडर", "कुम्भलगढ़"],
    "राजसमंद (Rajsamand)": ["राजसमंद", "नाथद्वारा", "कुम्भलगढ़", "भींडर"],
    "सवाई माधोपुर (Sawai Madhopur)": ["सवाई माधोपुर", "खंडार", "बामनवास", "गंगापुर"],
    "सीकर (Sikar)": ["सीकर", "खंडेला", "श्रीमाधोपुर", "दांतारामगढ़", "नीम का थाना", "फतेहपुर", "लक्ष्मणगढ़", "धोद"],
    "सिरोही (Sirohi)": ["सिरोही", "पिंडवाड़ा-आबू", "रेवदर", "गोगुन्दा", "झाड़ोल"],
    "श्री गंगानगर (Sri Ganganagar)": ["गंगानगर", "सादुलशहर", "करणपुर", "सूरतगढ़", "रायसिंहनगर", "अनूपगढ़", "संगरिया"],
    "टोंक (Tonk)": ["टोंक", "निवाई", "देवली-उनियारा", "मालपुरा", "टोडाभीम"],
    "उदयपुर (Udaipur)": ["उदयपुर", "उदयपुर ग्रामीण", "मावली", "वल्लभनगर", "सलूम्बर", "धरियावद", "गोगुन्दा", "झाड़ोल", "खेरवाड़ा"],
  
    // ==================== UTTAR PRADESH (Main Districts) ====================
    "आगरा (Agra)": ["आगरा उत्तर", "आगरा दक्षिण", "आगरा ग्रामीण", "एत्मादपुर", "फतेहपुर सीकरी", "किरावली", "बाह"],
    "लखनऊ (Lucknow)": ["लखनऊ उत्तर", "लखनऊ पूर्व", "लखनऊ पश्चिम", "लखनऊ मध्य", "सरोजनीनगर", "मोहनलालगंज", "बख्शी का तालाब", "मलिहाबाद"],
    "वाराणसी (Varanasi)": ["वाराणसी उत्तर", "वाराणसी दक्षिण", "वाराणसी छावनी", "शिवपुर", "रोहनिया", "पिंडरा", "अजगरा", "सेवापुरी"],
    "प्रयागराज (Prayagraj)": ["प्रयागराज उत्तर", "प्रयागराज दक्षिण", "प्रयागराज छावनी", "फूलपुर", "सोराँव", "फतहपुर", "प्रतापपुर", "हंडिया"],
    "कानपुर नगर (Kanpur Nagar)": ["कानपुर छावनी", "कानपुर उत्तर", "कानपुर दक्षिण", "कानपुर मध्य", "शिवराजपुर", "बिल्हौर", "घाटमपुर", "कल्याणपुर"],
    "गोरखपुर (Gorakhpur)": ["गोरखपुर ग्रामीण", "गोरखपुर शहर", "चौरीचौरा", "सहजनवा", "खजनी", "बांसगांव", "पिपराइच"],
    "मेरठ (Meerut)": ["मेरठ छावनी", "मेरठ उत्तर", "मेरठ दक्षिण", "सरधना", "किठौर", "हस्तिनापुर", "सिवालखास"],
  
    // ==================== MADHYA PRADESH ====================
    "भोपाल (Bhopal)": ["भोपाल उत्तर", "भोपाल दक्षिण", "भोपाल मध्य", "गोविंदपुरा", "हुजूर", "बैरागढ़", "सिवनी मालवा"],
    "इंदौर (Indore)": ["इंदौर-1", "इंदौर-2", "इंदौर-3", "इंदौर-4", "इंदौर-5", "देवास", "सांवेर", "दिपालपुर", "महू", "राउ"],
    "जबलपुर (Jabalpur)": ["जबलपुर पूर्व", "जबलपुर पश्चिम", "जबलपुर उत्तर", "जबलपुर छावनी", "पनागर", "पाटन", "सिहोरा", "मझौली"],
    "ग्वालियर (Gwalior)": ["ग्वालियर", "ग्वालियर पूर्व", "ग्वालियर दक्षिण", "भितरवार", "डबरा", "भांडेर", "मुरैना"],
  
    // ==================== MAHARASHTRA ====================
    "मुंबई शहर (Mumbai City)": ["मुंबादवी", "कुलाबा", "मालाबार हिल", "मरीन लाइन्स", "ग्रांट रोड", "चर्चगेट"],
    "मुंबई उपनगर (Mumbai Suburban)": ["अंधेरी पश्चिम", "अंधेरी पूर्व", "विले पार्ले", "जोगेश्वरी", "गोरेगांव", "मालाड", "कांदिवली", "बोरीवली", "दहिसर", "भायांदर", "मीरा भयंदर"],
    "पुणे (Pune)": ["पुणे छावनी", "पुणे नगरपालिका", "शिवाजीनगर", "पर्वती", "कोथरूड", "हडपसर", "भोसरी", "खडकवासला", "चिंचवड़"],
    "नागपुर (Nagpur)": ["नागपुर दक्षिण पश्चिम", "नागपुर उत्तर", "नागपुर पूर्व", "नागपुर मध्य", "नागपुर पश्चिम", "साओनेर", "हिंगणा", "कळमेश्वर"],
    "नासिक (Nashik)": ["नासिक मध्य", "नासिक पश्चिम", "नासिक पूर्व", "नासिक ग्रामीण", "दिंडोरी", "येवला", "नंदगांव", "देवळाली"],
  
    // ==================== GUJARAT ====================
    "अहमदाबाद (Ahmedabad)": ["अहमदाबाद पूर्व", "अहमदाबाद पश्चिम", "अहमदाबाद उत्तर", "नवरंगपुरा", "वस्त्राल", "निकोल", "नरोडा", "घाटलोडिया", "वीजलपुर", "मणिनगर"],
    "सूरत (Surat)": ["सूरत पूर्व", "सूरत उत्तर", "सूरत पश्चिम", "सूरत दक्षिण", "कटारगाम", "वराछा", "चोरियासी", "ओलपाड", "मांडवी"],
    "राजकोट (Rajkot)": ["राजकोट पूर्व", "राजकोट पश्चिम", "राजकोट दक्षिण", "लोधिका", "गोंडल", "जेतपुर", "धोराजी"],
    "वडोदरा (Vadodara)": ["वडोदरा शहर", "वडोदरा ग्रामीण", "पादरा", "वाघोडिया", "सावली", "करजन", "डभोई"],
  
    // ==================== BIHAR ====================
    "पटना (Patna)": ["पटना साहिब", "पाटलिपुत्र", "दानापुर", "बख्तियारपुर", "फुलवारी", "मनेर", "मसौढ़ी", "पालीगंज", "पंडारक"],
    "गया (Gaya)": ["गया टाउन", "गया छावनी", "बोधगया", "बाराचट्टी", "आटरी", "बेलागंज", "कोंच", "तेकारी"],
    "भागलपुर (Bhagalpur)": ["भागलपुर", "नाथनगर", "सुल्तानगंज", "बिहपुर", "गोपालपुर", "पीरपैंती"],
    "मुजफ्फरपुर (Muzaffarpur)": ["मुजफ्फरपुर", "कांटी", "बरूराज", "पारू", "सकरा", "बोचहा", "गायघाट", "औराई"],
  
    // ==================== PUNJAB ====================
    "अमृतसर (Amritsar)": ["अमृतसर पूर्व", "अमृतसर पश्चिम", "अमृतसर मध्य", "अमृतसर उत्तर", "अजनाला", "राजा संसी", "अटारी"],
    "लुधियाना (Ludhiana)": ["लुधियाना पूर्व", "लुधियाना पश्चिम", "लुधियाना उत्तर", "लुधियाना दक्षिण", "खन्ना", "समराला", "जगराओं", "रायकोट", "पायल"],
    "जालंधर (Jalandhar)": ["जालंधर पूर्व", "जालंधर पश्चिम", "जालंधर छावनी", "आदमपुर", "नकोदर", "शाहकोट", "फिल्लौर"],
  
    // ==================== HARYANA ====================
    "गुरुग्राम (Gurugram)": ["गुरुग्राम", "बादशाहपुर", "सोहना", "पटौदी", "नूंह", "फिरोजपुर झिरका"],
    "फरीदाबाद (Faridabad)": ["फरीदाबाद", "निट", "बड़खल", "बल्लभगढ़", "पलवल", "हथीन", "होडल"],
    "हिसार (Hisar)": ["हिसार", "नालवा", "हांसी", "बरवाला", "उकलाना", "आदमपुर"],
  
    // ==================== DELHI ====================
    "मध्य दिल्ली (Central Delhi)": ["चांदनी चौक", "मटिया महल", "बल्लीमारान", "करोल बाग", "पटेल नगर", "राजेंद्र नगर"],
    "पूर्वी दिल्ली (East Delhi)": ["लक्ष्मी नगर", "विश्वास नगर", "कृष्णा नगर", "गांधी नगर", "शाहदरा", "सीलमपुर"],
    "दक्षिण दिल्ली (South Delhi)": ["ग्रेटर कैलाश", "दिल्ली छावनी", "लाजपत नगर", "मालवीय नगर", "साकेत", "हौज खास", "देवली", "आर के पुरम"],
    "नई दिल्ली (New Delhi)": ["नई दिल्ली", "चाणक्यपुरी", "दिल्ली कैंट", "मिंटो रोड", "गोल मार्केट"],
  
    // ==================== CHHATTISGARH ====================
    "रायपुर (Raipur)": ["रायपुर शहर पश्चिम", "रायपुर शहर पूर्व", "रायपुर ग्रामीण", "अभनपुर", "बलौदा बाजार", "भाटापारा", "आरंग", "धरसींवा"],
    "बिलासपुर (Bilaspur)": ["बिलासपुर", "कोटा", "लोरमी", "मुंगेली", "तखतपुर", "बिल्हा", "पथरिया", "श्रीकांत"],
    "दुर्ग (Durg)": ["दुर्ग ग्रामीण", "दुर्ग शहर", "भिलाई नगर", "वैशाली नगर", "आमदा", "पाटन"],
  
    // ==================== JHARKHAND ====================
    "रांची (Ranchi)": ["रांची", "खिजरी", "हटिया", "कांके", "राहे", "सिल्ली", "नामकुम", "मांडर", "चान्हो"],
    "पूर्वी सिंहभूम (East Singhbhum)": ["जमशेदपुर पूर्व", "जमशेदपुर पश्चिम", "जमशेदपुर उत्तर", "पोटका", "बहरागोड़ा", "घाटशिला"],
    "धनबाद (Dhanbad)": ["धनबाद", "सिंदरी", "बोकारो", "चंदनकियारी", "झरिया", "बाघमारा"],
  
    // ==================== UTTARAKHAND ====================
    "देहरादून (Dehradun)": ["देहरादून छावनी", "रायपुर", "धरमपुर", "मसूरी", "ऋषिकेश", "विकासनगर", "भानियावाला", "डोईवाला", "चकराता"],
    "हरिद्वार (Haridwar)": ["हरिद्वार", "भेल", "भगवानपुर", "ज्वालापुर", "लक्सर", "खानपुर", "मंगलौर"],
    "नैनीताल (Nainital)": ["नैनीताल", "हल्द्वानी", "काशीपुर", "रामनगर", "कालाढूंगी", "लालकुआं"],
  
    // ==================== HIMACHAL PRADESH ====================
    "शिमला (Shimla)": ["शिमला ग्रामीण", "शिमला शहर", "कसुम्पटी", "ठियोग", "चौपाल", "रोहड़ू", "जुब्बल-कोटखाई", "रामपुर"],
    "मंडी (Mandi)": ["मंडी", "बल्ह", "सरकाघाट", "बज्जू", "धरमपुर", "जोगिंद्रनगर", "करसोग", "सुंदरनगर"],
    "कांगड़ा (Kangra)": ["धर्मशाला", "शाहपुर", "नगरोटा सुरियां", "इंदौरा", "ज्वालामुखी", "डेहरा", "फतेहपुर", "जयसिंहपुर"],
  
    // ==================== KERALA ====================
    "तिरुवनंतपुरम (Thiruvananthapuram)": ["तिरुवनंतपुरम", "वट्टियूरकावु", "कज्जाकूट्टम", "नेमोम", "अरुविक्कारा", "पारशाला", "चिरायिंकीझु", "अट्टिंगल"],
    "एर्नाकुलम (Ernakulam)": ["कोच्चि", "कलामसेरी", "परवुर", "विपिन", "अंगमाली", "अलुवा", "पेरुम्बावूर", "पिरावोम", "मूवात्तुपुझा"],
    "कोझिकोड (Kozhikode)": ["कोझिकोड उत्तर", "कोझिकोड दक्षिण", "बालुश्शेरी", "कुत्तियादी", "कुंडमंगलम", "कोडुवल्ली", "पेराम्बरा"],
  
    // ==================== TAMIL NADU ====================
    "चेन्नई (Chennai)": ["चेन्नई मध्य", "चेन्नई उत्तर", "चेन्नई दक्षिण", "विल्लिवक्कम", "वेपेरी", "तोंडियरपेट्टई", "पुरासवल्कम", "एग्मोर", "नुंगमबक्कम", "साउथ चेन्नई"],
    "कोयंबटूर (Coimbatore)": ["कोयंबटूर उत्तर", "कोयंबटूर दक्षिण", "कोयंबटूर पश्चिम", "किनाथुकड़ावु", "मेट्टुपालयम", "अवनाशी", "सुलूर", "थोंडामुथूर"],
    "मदुरै (Madurai)": ["मदुरै पूर्व", "मदुरै पश्चिम", "मदुरै उत्तर", "मदुरै दक्षिण", "मदुरै मध्य", "थिरुपरनकुंड्रम्", "उसिलमपट्टी"],
  
    // ==================== KARNATAKA ====================
    "बेंगलुरु शहरी (Bengaluru Urban)": ["बेंगलुरु मध्य", "बेंगलुरु उत्तर", "बेंगलुरु दक्षिण", "चिकपेट", "शिवाजीनगर", "गांधीनगर", "राजाजीनगर", "विजयनगर", "जयनगर", "बसंतनगर", "आर टी नगर", "हेवीफैक्टरी"],
    "मैसूर (Mysuru)": ["मैसूर", "चामुंडेश्वरी", "कृष्णराजा", "नरसिंहराजा", "चामराजा", "हुन्सूर", "तीर्थहल्ली", "कोवेगल"],
    "बेलगावी (Belagavi)": ["बेलगावी उत्तर", "बेलगावी दक्षिण", "बेलगावी ग्रामीण", "रामदुर्ग", "बैलहोंगल", "चिक्कोडी", "सड्डलगा", "मुदलगी"],
  
    // ==================== ANDHRA PRADESH ====================
    "विशाखापट्टनम (Visakhapatnam)": ["विशाखापट्टनम पूर्व", "विशाखापट्टनम पश्चिम", "विशाखापट्टनम उत्तर", "विशाखापट्टनम दक्षिण", "भीमुनिपट्टनम", "गजुवाका", "पेंडुर्ति", "अनकापल्ली"],
    "कृष्णा (Krishna)": ["विजयवाड़ा पूर्व", "विजयवाड़ा पश्चिम", "विजयवाड़ा मध्य", "गन्नवरम", "नंदीगामा", "तिरुवूरु", "मचिलीपट्टनम"],
    "गुंटूर (Guntur)": ["गुंटूर पूर्व", "गुंटूर पश्चिम", "गुंटूर उत्तर", "गुंटूर दक्षिण", "मंगलगिरि", "तेनाली", "पोन्नूरु"],
  
    // ==================== TELANGANA ====================
    "हैदराबाद (Hyderabad)": ["हैदराबाद", "सेकंदराबाद छावनी", "खैरताबाद", "नामपल्ली", "चारमीनार", "गोशामहल", "बहादुरपुरा", "याकूतपुरा", "मलकपेट", "कारवान", "जुबली हिल्स", "संजीवैया नगर"],
    "वारंगल शहरी (Warangal Urban)": ["वारंगल पूर्व", "वारंगल पश्चिम", "वारंगल उत्तर", "वारंगल दक्षिण", "हनामकोंडा", "धर्मसागर", "पारकाल"],
    "करीमनगर (Karimnagar)": ["करीमनगर", "मानाकोंडूर", "श्रीरामपुर", "हुजूराबाद", "हुसनाबाद", "चोप्पादंडी"],
  
    // ==================== ODISHA ====================
    "खोरधा (Khordha)": ["भुवनेश्वर मध्य", "भुवनेश्वर उत्तर", "भुवनेश्वर पूर्व", "जटनी", "खोरधा", "बेगुनिया", "बालीपट्टना"],
    "कटक (Cuttack)": ["कटक सदर", "कटक छावनी", "बारबिल", "चोवारवार", "बांकी", "आठगढ़", "बारंबा"],
    "पुरी (Puri)": ["पुरी", "ब्रह्मगिरि", "सतपाड़ा", "पिपिली", "निमापड़ा", "काकतपुर"],
  
    // ==================== ASSAM ====================
    "कामरूप महानगर (Kamrup Metropolitan)": ["गुवाहाटी पूर्व", "गुवाहाटी पश्चिम", "पलाशबाड़ी", "जालुकबाड़ी", "दिसपुर", "बरखोला", "सोनापुर", "रानी"],
    "डिब्रूगढ़ (Dibrugarh)": ["डिब्रूगढ़", "चबुआ", "देहरिया", "नहरकटिया", "टिंगखांग", "मोरान"],
    "जोरहाट (Jorhat)": ["जोरहाट", "तेओक", "मरियानी", "तिताबर", "खुमताई", "धेमाजी"],
  
    // ==================== WEST BENGAL ====================
    "कोलकाता (Kolkata)": ["कोलकाता उत्तर", "कोलकाता दक्षिण", "कोलकाता पूर्व", "कोलकाता पश्चिम", "बल्लीगंज", "बेहाला", "जादवपुर", "कसबा", "बैरकपुर"],
    "हावड़ा (Howrah)": ["हावड़ा मध्य", "हावड़ा उत्तर", "हावड़ा दक्षिण", "बाली", "बागनान", "शिबपुर", "उलुबेरिया", "खारदह"],
    "दक्षिण 24 परगना (South 24 Parganas)": ["डायमंड हार्बर", "फलटा", "जयनगर", "कैनिंग", "कुलतली", "गोसाबा", "मथुरापुर", "काकद्वीप"],
  
    // ==================== GOA ====================
    "उत्तर गोवा (North Goa)": ["पणजी", "खपोरली", "पोरवोरिम", "सत्तारी", "बिचोलिम", "पेडनेम", "वालपोई", "पेरनेम"],
    "दक्षिण गोवा (South Goa)": ["मडगाँव", "कुर्चोरिम", "सालसेट", "मार्मगांव", "वास्को", "कैनाकोना", "पोंडा", "क्यूपेम"],
  
    // ==================== JAMMU & KASHMIR ====================
    "श्रीनगर (Srinagar)": ["श्रीनगर", "गंदरबल", "सोनावारी", "ज़ादिबल", "खोनमोह",]
  };


 
useEffect(() => {
  if (form.district && districtVidhansabhaMap[form.district]) {
    setDistrictVidhansabhas(districtVidhansabhaMap[form.district]);
    setSelectedVidhansabha("");
  } else {
    setDistrictVidhansabhas([]);
  }
}, [form.district]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

   
    if (!form.imageFile) {
      newErrors.imageFile = "प्रोफाइल फोटो अपलोड करना आवश्यक है";
    }

   
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

  const searchBufferRef = useRef<string>("");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelectKeyDown = (
    e: React.KeyboardEvent<HTMLSelectElement>,
    options: string[],
    fieldName: "state" | "district"
  ) => {
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      const char = e.key.toLowerCase();
      searchBufferRef.current += char;

      const match = options.find((opt) =>
        opt.toLowerCase().includes(searchBufferRef.current)
      );

      if (match) {
        if (fieldName === "state") {
          setForm((prev) => ({ ...prev, state: match, district: "" }));
        } else {
          setForm((prev) => ({ ...prev, [fieldName]: match }));
        }
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }

      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => {
        searchBufferRef.current = "";
      }, 1000);
    }
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

  // const handleSubmit = async (e) => { 
  //   e.preventDefault();
  
  //   if (!validateForm()) return;
  
  //   setLoading(true);
  
  //   try {
  //     const { data } = await Instance.post("/api/membership/create-order");
  
  //     const options = {
  //       key: data.key,
  //       amount: data.order.amount,
  //       currency: "INR",
  //       order_id: data.order.id,
  //       name: "OBC Mahasabha",
  //       description: "Membership Fee ₹251",
  
  //       handler: async function (response) {
  //         try {
  //           const verifyRes = await Instance.post("/api/membership/verify-payment", {
  //             razorpay_order_id: response.razorpay_order_id,
  //             razorpay_payment_id: response.razorpay_payment_id,
  //             razorpay_signature: response.razorpay_signature,
              
  //           });
  
           
  //           const formDataToSend = new FormData();
  //           formDataToSend.append("memberName", form.memberName);
  //           formDataToSend.append("fatherName", form.fatherName);
  //           formDataToSend.append("businessNature", form.businessNature);
  //           formDataToSend.append("organizationPosition", form.organizationPosition);
  //           formDataToSend.append("residenceAddress", form.residenceAddress);
  //           formDataToSend.append("officeAddress", form.officeAddress);
  //           formDataToSend.append("residencePhone", form.residencePhone);
  //           formDataToSend.append("officePhone", form.officePhone);
  //           formDataToSend.append("mobile", form.mobile);
  //           formDataToSend.append("whatsapp", form.whatsapp);
  //           formDataToSend.append("email", form.email);
  //           formDataToSend.append("pan", form.pan);
  //           formDataToSend.append("aadhaar", form.aadhaar);
  //           formDataToSend.append("education", form.education);
  //           formDataToSend.append("otherEducation", form.otherEducation);
  //           formDataToSend.append("dob", form.dob);
  //           formDataToSend.append("marriageDate", form.marriageDate || "");
  //           formDataToSend.append("bloodGroup", form.bloodGroup);
  //           formDataToSend.append("tshirtSize", form.tshirtSize);
  //           formDataToSend.append("socialWork", form.socialWork);
  //           formDataToSend.append("specialAchievement", form.specialAchievement);
  //           formDataToSend.append("membershipType", form.membershipType);
  //           formDataToSend.append("state", form.state);
  //           formDataToSend.append("district", form.district);
  //           formDataToSend.append("vidhansabha", selectedVidhansabha);
  //           formDataToSend.append("membershipFee", "251");
  //           formDataToSend.append("razorpay_payment_id", response.razorpay_payment_id);
  //           formDataToSend.append("razorpay_order_id", response.razorpay_order_id);
  
          
  //           if (form.imageFile) {
  //             formDataToSend.append("imageFile", form.imageFile);
  //           }
  
  //           console.log("📤 Sending registration data to backend...");
  
  //           const registerRes = await Instance.post(
  //             "/api/membership/register",
  //             formDataToSend,
  //             {
  //               headers: {
  //                 "Content-Type": "multipart/form-data",
  //               },
  //               timeout: 30000,
  //             }
  //           );
  
  //           const memberId = registerRes?.data?.memberId;
  
  //           if (!memberId) {
  //             throw new Error("Member ID not received");
  //           }
  
  //           const previewImage =
  //             imagePreview ||
  //             (form.imageFile ? URL.createObjectURL(form.imageFile) : "");
  
  //           const userDataForCard: UserCardData = {
  //             name: form.memberName,
  //             father: form.fatherName,
  //             mobile: form.mobile,
  //             receipt: memberId,
  //             image: previewImage,
  //           };

  //           handleSuccessfulRegistration(memberId, userDataForCard);
  
  //           // Reset form
  //           setForm({
  //             memberName: "",
  //             fatherName: "",
  //             businessNature: "",
  //             organizationPosition: "",
  //             residenceAddress: "",
  //             officeAddress: "",
  //             residencePhone: "",
  //             officePhone: "",
  //             mobile: "",
  //             whatsapp: "",
  //             email: "",
  //             pan: "",
  //             aadhaar: "",
  //             education: "",
  //             dob: "",
  //             marriageDate: "",
  //             bloodGroup: "",
  //             tshirtSize: "",
  //             socialWork: "",
  //             specialAchievement: "",
  //             membershipType: "life",
  //             state: "",
  //             district: "",
  //             otherEducation: "",
  //             imageFile: undefined,
  //           });
  
  //           setSelectedVidhansabha("");
  //           setImagePreview("");
  //           setErrors({});
  
  //           const imageInput = document.getElementById("imageInput");
  //           if (imageInput instanceof HTMLInputElement) imageInput.value = "";
  
  //         } catch (error) {
  //           console.error("❌ Error:", error);
  //           alert(`Payment verification failed: ${error.response?.data?.error || error.message}`);
  //         }
  //       },
  
  //       modal: {
  //         ondismiss: function () {
  //           console.log("❌ Payment cancelled by user");
  //           alert("Payment cancelled");
  //         },
  //       },
  //     };
  
  //     if (!window.Razorpay) {
  //       alert("Razorpay SDK failed to load.");
  //       return;
  //     }
  
  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (error) {
  //     console.error("❌ Razorpay Error:", error);
  //     alert("Payment initialization failed: " + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const { data } = await Instance.post("/api/membership/create-order");
      
      setLoading(false);
      
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        order_id: data.order.id,
        name: "OBC Mahasabha",
        description: "Membership Fee ₹251",
        
        modal: {
          ondismiss: function() {
            setLoading(false);
            alert("Payment cancelled");
          },
        },
        
        handler: async function (response) {
          try {
            // ✅ Step 1: Verify payment
            const verifyRes = await Instance.post("/api/membership/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            
            if (verifyRes.data.success) {
              // ✅ Step 2: Show saving loading
              setSavingData(true);  // 🔥 YE IMPORTANT HAI
              
              // ✅ Step 3: Save membership data
              const formDataToSend = new FormData();
              formDataToSend.append("memberName", form.memberName);
              formDataToSend.append("fatherName", form.fatherName);
              formDataToSend.append("businessNature", form.businessNature);
              formDataToSend.append("organizationPosition", form.organizationPosition);
              formDataToSend.append("residenceAddress", form.residenceAddress);
              formDataToSend.append("officeAddress", form.officeAddress);
              formDataToSend.append("residencePhone", form.residencePhone);
              formDataToSend.append("officePhone", form.officePhone);
              formDataToSend.append("mobile", form.mobile);
              formDataToSend.append("whatsapp", form.whatsapp);
              formDataToSend.append("email", form.email);
              formDataToSend.append("pan", form.pan);
              formDataToSend.append("aadhaar", form.aadhaar);
              formDataToSend.append("education", form.education);
              formDataToSend.append("otherEducation", form.otherEducation);
              formDataToSend.append("dob", form.dob);
              formDataToSend.append("marriageDate", form.marriageDate || "");
              formDataToSend.append("bloodGroup", form.bloodGroup);
              formDataToSend.append("tshirtSize", form.tshirtSize);
              formDataToSend.append("socialWork", form.socialWork);
              formDataToSend.append("specialAchievement", form.specialAchievement);
              formDataToSend.append("membershipType", form.membershipType);
              formDataToSend.append("state", form.state);
              formDataToSend.append("district", form.district);
              formDataToSend.append("vidhansabha", selectedVidhansabha);
              formDataToSend.append("membershipFee", "251");
              formDataToSend.append("razorpay_payment_id", response.razorpay_payment_id);
              formDataToSend.append("razorpay_order_id", response.razorpay_order_id);
              
              if (form.imageFile) {
                formDataToSend.append("imageFile", form.imageFile);
              }
              
              const registerRes = await Instance.post(
                "/api/membership/register",
                formDataToSend,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                  timeout: 30000,
                }
              );
              
              // ✅ Step 4: Saving complete
              setSavingData(false);
              
              const memberId = registerRes?.data?.memberId;
              if (!memberId) throw new Error("Member ID not received");
              
              const userDataForCard: UserCardData = {
                name: form.memberName,
                father: form.fatherName,
                mobile: form.mobile,
                receipt: memberId,
                image: imagePreview,
              };
              
              // ✅ Step 5: Show success and ID card
              handleSuccessfulRegistration(memberId, userDataForCard);
              
              // Reset form
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
              
            } else {
              alert("Payment verification failed!");
            }
          } catch (error) {
            setSavingData(false);  // ✅ Hide loading on error
            console.error("❌ Error:", error);
            alert(`Registration failed: ${error.response?.data?.message || error.message}`);
          }
        }
      };
      
      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load.");
        setLoading(false);
        return;
      }
      
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error("❌ Razorpay Error:", error);
      alert("Payment initialization failed: " + error.message);
      setLoading(false);
    }
  };


  const formatReceiptNumber = (num) => {
    // नंबर को स्ट्रिंग में बदलें
    const numStr = String(num);
    
    // अगर 4 digits से छोटा है तो पैड करें
    if (numStr.length < 4) {
      return numStr.padStart(4, "0");
    }
    
    // अगर 4 या उससे ज्यादा digits है तो वैसा ही रखें
    return numStr;
  };
  


  // Add this component before your return statement
const LoadingOverlay = ({ message }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 text-center min-w-[320px] shadow-2xl">
      <div className="w-16 h-16 border-4 border-[#e87722] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[#0f1d3a] font-bold text-lg mb-2">{message}</p>
      <p className="text-gray-500 text-sm">कृपया प्रतीक्षा करें...</p>
    </div>
  </div>
);


  return (
    <div className="font-sans bg-[#f5f0ea] min-h-screen">

{savingData && (
      <LoadingOverlay message="आपका पंजीकरण सहेजा जा रहा है..." />
    )}
      
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
          <div className="bg-white rounded-2xl p-8 text-center border border-[#e8dfd0]">
            {showSuccessMessage && (
              <div>
                <div className="w-[72px] h-[72px] rounded-full bg-[#fff4df] flex items-center justify-center mx-auto">
                  <BadgeCheck size={36} color="#f4a92a" />
                </div>
                <h3 className="m-0 mb-2 text-xl font-extrabold text-[#0f1d3a]">
                  पंजीकरण सफल!
                </h3>
                <p className="text-gray-500 mb-7">
                  आपका आवेदन प्राप्त हो गया है। जल्द ही संपर्क किया जाएगा।
                </p>

                <button
                  disabled
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold mt-6 cursor-not-allowed"
                >
                  नया पंजीकरण करें
                </button>
              </div>
            )}
{showLoading && (
  <div className="py-8">
    <div className="flex flex-col items-center justify-center">
      <div className="loader mb-4"></div>
      <p className="text-gray-600 font-semibold">
        आपका आईडी कार्ड तैयार किया जा रहा है...
      </p>
    </div>

    <button
      disabled
      className="bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold mt-6 cursor-not-allowed"
    >
      नया पंजीकरण करें
    </button>
  </div>
)}

{showIdCard && userData && (
  <div className="flex flex-col items-center mt-8 w-full max-w-4xl mx-auto">
    
    {/* ID Card Container */}
    <div className="w-full flex justify-center mb-8">
      <div
        id="id-card-capture"
        ref={cardRef}
        className="relative w-[320px] bg-white flex flex-col overflow-hidden"
        style={{ borderRadius: "12px", boxShadow: "0 6px 32px rgba(0,0,0,0.15)", border: "1px solid #e5e7eb" }}
      >
        {/* FULL CARD WATERMARK BACKGROUND */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url(${backimg})`,
            backgroundSize: "65%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.06,
          }}
        />
 
        {/* HEADER with wave bottom */}
        <div className="relative z-10 w-full" style={{ background: "#f97316" }}>
          <div className="px-4 pt-3 pb-7 text-center">
            <p className="text-white font-extrabold text-[15px] m-0 leading-snug tracking-wide drop-shadow-sm">
              अखिल भारतीय संयुक्त ओ.बी.सी. महासभा
            </p>
          </div>
 
          <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
            <svg
              viewBox="0 0 320 28"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ display: "block", height: "28px" }}
              preserveAspectRatio="none"
            >
              <path
                d="M0,14 C53,28 107,0 160,14 C213,28 267,0 320,14 L320,28 L0,28 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
        </div>
 
        {/* BODY */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-2 pb-4 bg-white">
          <img
            src={backimg}
            alt="logo"
            className="w-[58px] h-[58px] object-contain mb-3"
          />
 
          <div className="border-2 border-red-500 mb-3" style={{ borderRadius: "4px", padding: "2px" }}>
            <img
              src={userData.image}
              alt="Member"
              className="w-[100px] h-[110px] object-cover block"
              style={{ borderRadius: "2px" }}
            />
          </div>
 
          <p
            className="text-blue-700 font-extrabold text-[17px] text-center m-0 mb-0.5"
            style={{ fontFamily: "'Noto Sans Devanagari','Mangal',sans-serif" }}
          >
            {userData.name}
          </p>
 
          <p className="text-gray-500 text-[13px] text-center m-0 mb-4">
            (जिला अध्यक्ष)
          </p>
 
          <div className="w-full h-px bg-orange-100 mb-3" />
 
          <div className="w-full flex flex-col gap-[7px] px-1">
            {[
              { label: "ID No", value: userData.receipt },
              { label: "पिता नाम", value: userData.father },
              { label: "मोबाइल नं", value: userData.mobile },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start text-[13px]">
                <span className="text-gray-800 font-semibold w-[90px] shrink-0">{label}</span>
                <span className="text-gray-600 mr-2 font-medium">:</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
 
        {/* FOOTER with wave top */}
        <div className="relative z-10 w-full" style={{ background: "#f97316" }}>
          <div className="w-full" style={{ lineHeight: 0 }}>
            <svg
              viewBox="0 0 320 28"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ display: "block", height: "28px" }}
              preserveAspectRatio="none"
            >
              <path
                d="M0,14 C53,0 107,28 160,14 C213,0 267,28 320,14 L320,0 L0,0 Z"
                fill="#ffffff"
              />
            </svg>
          </div>
 
          <div className="px-3 pb-3 text-center">
            <p className="text-white font-bold text-[13px] m-0 tracking-wide">
              Help Line No.: 09549560000
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-4 mb-8">
      <button
        type="button"
        onClick={downloadCard}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md active:scale-95 transition-all duration-200 border-0 cursor-pointer"
      >
        ⬇️ Download ID Card PNG
      </button>
      
      <button
        onClick={() => {
          setShowIdCard(false);
          resetForm();
        }}
        className="bg-[#0f1d3a] text-white px-6 py-3 rounded-lg font-semibold"
        type="button"
      >
        नया पंजीकरण करें
      </button>
    </div>

    {/* Receipt Section - Ab ID card ke neeche */}
    {showReceipt && receiptData && (
  <div className="w-full mt-8 border-t pt-8">
    <h3 className="text-2xl font-bold text-[#0f1d3a] text-center mb-6">
      भुगतान रसीद
    </h3>

    <div className="flex justify-center">
      <div
        id="receipt-capture"
        className="w-[700px] bg-[#f38cb4] p-5 border-2 border-black font-sans text-black"
      >

        {/* Header */}
        <table className="w-full table-fixed text-[12px] font-bold">
          <tbody>
            <tr>
              <td className="w-1/3 text-left align-top">
                Regd. No. 216/JAIPUR/2024 <br />
                PAN NO.: AAKTA5604N
              </td>

              <td className="w-1/3 text-center align-top text-[18px]">
                रसीद
              </td>

              <td className="w-1/3 text-right align-top">
                Mob.: 9549566300
              </td>
            </tr>
          </tbody>
        </table>

        {/* Title (CENTER ONLY) */}
        <div className="text-center mt-2">
          <h1 className="text-[24px] font-bold m-0">
            अखिल भारतीय संयुक्त ओ.बी.सी. महासभा
          </h1>
          <p className="text-[12px] font-bold mt-1">
            पंजीकृत प्रधान कार्यालय : प्लॉट नं. 115-116, विनायक विहार-डी,<br />
            हरनाथपुरा, कालवाड़ रोड, जयपुर-302012
          </p>
        </div>

        {/* Receipt Row */}
        <table className="w-full table-fixed font-bold mt-2">
          <tbody>
            <tr>
              <td className="w-1/2 text-left">
                क्रमांक :
                <span className="text-red-500 text-[22px] ml-1">
                {formatReceiptNumber(receiptData.receiptNumber)}
                </span>
              </td>

              <td className="w-1/2 text-right">
                दिनांक :{" "}
                {new Date(receiptData.createdAt).toLocaleDateString("en-IN")}
              </td>
            </tr>
          </tbody>
        </table>

        {/* 🔥 IMPORTANT FIX: TEXT LEFT */}
        <div className="leading-[2.2] font-bold text-[13px] mt-2 text-left">

          <div className="border-b border-dotted border-black py-1">
            श्रीमान्/श्रीमती/सुश्री :
            <span className="font-normal"> {receiptData.memberName}</span>
          </div>

          <div className="border-b border-dotted border-black py-1">
            पता :
            <span className="font-normal"> {receiptData.residenceAddress}</span>
            <span className="float-right">
              मो.: <span className="font-normal">{receiptData.mobile}</span>
            </span>
          </div>

          <div className="border-b border-dotted border-black py-1">
            सदस्यता प्रकार :
            <span className="font-normal">
              {receiptData.membershipType === "life"
                ? "आजीवन सदस्य"
                : "वार्षिक सदस्य"}
            </span>
          </div>

          <div className="border-b border-dotted border-black py-1">
            जिला :
            <span className="font-normal"> {receiptData.district}</span>
            &nbsp;&nbsp; विधानसभा :
            <span className="font-normal"> {receiptData.vidhansabha}</span>

            <span className="float-right">
              राज्य :
              <span className="font-normal"> {receiptData.state}</span>
            </span>
          </div>

          <div className="border-b border-dotted border-black py-1">
            से रुपये (शब्दों में) :
            <span className="font-normal">
              {numberToHindiWords(receiptData.membershipFee)}
            </span>
          </div>

          <div className="border-b border-dotted border-black py-1">
            नकद/बैंक/ऑनलाइन सधन्यवाद प्राप्त किये।
            <span className="float-right">
              PAN :
              <span className="border border-black px-2 py-[2px] font-mono tracking-[3px] font-normal">
                {receiptData.pan || "---------"}
              </span>
            </span>
          </div>

        </div>

        {/* Amount */}
        <div className="mt-4">
          <div className="w-[200px] border-2 border-black p-2 text-center">
            <span className="text-[35px] font-bold">
              ₹ {receiptData.membershipFee}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex gap-3 mt-6 justify-center">
      <button
        onClick={() => downloadReceipt()}
        className="bg-[#e87722] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d66a1a] transition"
      >
        ⬇️ रसीद डाउनलोड करें
      </button>

      <button
        onClick={() => setShowReceipt(false)}
        className="border-2 border-[#e87722] text-[#e87722] px-6 py-2 rounded-lg font-semibold hover:bg-[#e87722] hover:text-white transition"
      >
        बंद करें
      </button>
    </div>
  </div>
)}
  </div>
)}
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
                    onKeyDown={(e) => handleSelectKeyDown(e, Object.keys(stateDistrictData), "state")}
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
                    onKeyDown={(e) => handleSelectKeyDown(e, districts, "district")}
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
                  // options={VIDHANSHABHAS.map((v) => v.name)}
                  options={districtVidhansabhas}
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
