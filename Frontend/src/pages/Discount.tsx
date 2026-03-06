import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FiMapPin, FiPhone, FiSearch, FiChevronDown, FiX,
  FiStar, FiShield, FiClock, FiCheckCircle, FiAlertCircle,
  FiHeart, FiArrowDown, FiGrid, FiList, FiAward, FiUsers,
  FiActivity, FiTarget
} from "react-icons/fi";
import {
  HiOutlineLocationMarker, HiOutlineOfficeBuilding,
  HiOutlinePhone, HiOutlineIdentification, HiOutlineDocumentText
} from "react-icons/hi";
import {
  MdLocalHospital, MdOutlineHealthAndSafety, MdOutlineDiscount,
  MdOutlineVerified, MdOutlineMedicalServices
} from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { RiHospitalLine, RiStethoscopeLine } from "react-icons/ri";
import { TbDiscount, TbBuildingHospital, TbMapPin } from "react-icons/tb";

// ─── TYPES ─────────────────────────────────────────────────────────────────

// ─── CATEGORIES ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "hospital", label: "Hospital", icon: "🏥", labelHi: "अस्पताल" },
  { id: "school", label: "School", icon: "🏫", labelHi: "स्कूल" },
  { id: "coaching", label: "Coaching", icon: "📚", labelHi: "कोचिंग" },
  { id: "hotel", label: "Hotel", icon: "🏨", labelHi: "होटल" },
  { id: "physio", label: "Physiotherapy", icon: "🦴", labelHi: "फिजियोथैरेपी" },
];

// ─── DATA ───────────────────────────────────────────────────────────────────

const STATES_DISTRICTS = {
  "राजस्थान": ["अलवर","जयपुर","जैसलमेर","जोधपुर","कोटा","उदयपुर"],
};

// ─── HOSPITAL TYPE TRANSLATION ───────────────────────────────────────────────
const TYPE_HI = {
  "Super Specialty":        "सुपर स्पेशलिटी",
  "Government":             "सरकारी",
  "Multi Specialty":        "मल्टी स्पेशलिटी",
  "Government AIIMS":       "सरकारी एम्स",
  "Government Institute":   "सरकारी संस्थान",
  "Government Teaching":    "सरकारी शिक्षण",
  "Teaching Hospital":      "शिक्षण अस्पताल",
  "Premier Govt. Institute":"प्रमुख सरकारी संस्थान",
  "Mission Hospital":       "मिशन अस्पताल",
};

function translateType(t) {
  return TYPE_HI[t] || t;
}

// ─── HOSPITAL DATA ──────────────────────────────────────────────────────────

const HOSPITAL_DB = {

  "राजस्थान_जयपुर": [
    {
      id: 1,
      name: "Fortis Escorts Hospital",
      discount: 20,
      address: "जवाहर लाल नेहरू मार्ग, मालवीय नगर, जयपुर 302017",
      phone: "+91 141-254-7000",
      departments: ["कार्डियक सर्जरी", "ऑन्कोलॉजी", "गैस्ट्रोएंटरोलॉजी", "ईएनटी", "न्यूरोलॉजी"],
      terms: ["सदस्यता सत्यापन अनिवार्य", "चयनित उपचारों पर लागू", "वैध OBC कार्ड आवश्यक", "आपातकालीन सेवाओं पर लागू नहीं", "पूर्व अपॉइंटमेंट आवश्यक"],
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&q=85",
      rating: 4.8,
      beds: 262,
      established: "1996",
      type: "सुपर स्पेशलिटी",
    },
    {
      id: 2,
      name: "सवाई मान सिंह अस्पताल",
      discount: 15,
      address: "जेएलएन मार्ग, जयपुर, राजस्थान 302004",
      phone: "+91 141-256-0291",
      departments: ["सामान्य चिकित्सा", "ऑर्थोपेडिक्स", "स्त्री रोग", "बाल रोग", "आपातकाल"],
      terms: ["OBC सदस्यता कार्ड दिखाएं", "केवल ओपीडी पर छूट", "पूर्व अपॉइंटमेंट आवश्यक", "चिकित्सक उपलब्धता पर निर्भर", "सरकारी सुविधा लाभ"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=85",
      rating: 4.5,
      beds: 1500,
      established: "1934",
      type: "सरकारी",
    },
    {
      id: 3,
      name: "नारायणा मल्टीस्पेशलिटी",
      discount: 25,
      address: "सेक्टर 28, कुम्भा मार्ग, प्रताप नगर, जयपुर 302033",
      phone: "+91 141-477-3700",
      departments: ["कार्डियोलॉजी", "न्यूरोलॉजी", "यूरोलॉजी", "त्वचा रोग", "ऑन्कोलॉजी"],
      terms: ["ओपीडी व चयनित आईपीडी पर वैध", "सदस्यता प्रमाण पत्र लाएं", "लैब टेस्ट पर भी छूट शामिल", "दवाखाने पर 10% छूट", "1 वर्ष की वैधता"],
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=700&q=85",
      rating: 4.7,
      beds: 350,
      established: "2010",
      type: "सुपर स्पेशलिटी",
    },
    {
      id: 4,
      name: "Apex Hospital जयपुर",
      discount: 18,
      address: "एसपी-4 और 6, मालवीय औद्योगिक क्षेत्र, जयपुर 302017",
      phone: "+91 141-251-3000",
      departments: ["स्पाइन सर्जरी", "जोड़ प्रत्यारोपण", "खेल चिकित्सा", "फिजियोथेरेपी", "दर्द प्रबंधन"],
      terms: ["सदस्यता कार्ड अनिवार्य", "केवल सोम–शनि लागू", "सरकारी योजना मरीजों पर नहीं", "उपचार से पहले परामर्श करें", "एक्स-रे व MRI पर 15% छूट"],
      image: "https://images.unsplash.com/photo-1632053002928-1919051e6364?w=700&q=85",
      rating: 4.6,
      beds: 200,
      established: "2004",
      type: "मल्टी स्पेशलिटी",
    },
    {
      id: 5,
      name: "Eternal Hospital",
      discount: 30,
      address: "प्लॉट D-14A, प्रताप नगर, सांगानेर, जयपुर 302033",
      phone: "+91 141-500-3000",
      departments: ["किडनी प्रत्यारोपण", "लिवर देखभाल", "मधुमेह", "एंडोक्राइनोलॉजी", "यूरोलॉजी"],
      terms: ["ओपीडी परामर्श पर 30%", "डायग्नोस्टिक्स पर 15%", "शामिल होने की तिथि से 1 वर्ष वैध", "परिवार के सदस्य पात्र", "रविवार सहित सभी दिन"],
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=700&q=85",
      rating: 4.9,
      beds: 180,
      established: "2009",
      type: "सुपर स्पेशलिटी",
    },
    {
      id: 6,
      name: "महात्मा गांधी अस्पताल",
      discount: 10,
      address: "सीताबाड़ी, टोंक रोड, जयपुर 302019",
      phone: "+91 141-251-4145",
      departments: ["आपातकाल", "सामान्य सर्जरी", "प्रसूति", "आईसीयू", "ट्रॉमा केयर"],
      terms: ["सरकारी अस्पताल, नाममात्र शुल्क", "पंजीकरण पर OBC कार्ड दिखाएं", "निजी वार्ड पर छूट", "सभी दिन उपलब्ध", "प्रतीक्षा शुल्क नहीं"],
      image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=700&q=85",
      rating: 4.3,
      beds: 900,
      established: "1960",
      type: "सरकारी",
    },
    {
      id: 7,
      name: "CK Birla Hospital जयपुर",
      discount: 22,
      address: "गोपालपुरा बाईपास रोड, जयपुर 302018",
      phone: "+91 141-316-0000",
      departments: ["प्रसूति", "नवजात विज्ञान", "ऑर्थोपेडिक्स", "नेत्र रोग", "IVF"],
      terms: ["चयनित प्रक्रियाओं पर छूट", "वैध OBC सदस्यता आवश्यक", "सौंदर्य प्रक्रियाओं पर नहीं", "बिस्तर उपलब्धता पर निर्भर", "दवाखाने पर 8% छूट"],
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=700&q=85",
      rating: 4.7,
      beds: 120,
      established: "2014",
      type: "मल्टी स्पेशलिटी",
    },
    {
      id: 8,
      name: "NIMS Hospital जयपुर",
      discount: 12,
      address: "शोभा नगर, जयपुर अजमेर हाईवे, जयपुर 303121",
      phone: "+91 141-298-7654",
      departments: ["कैंसर देखभाल", "रेडियोलॉजी", "पैथोलॉजी", "पुनर्वास", "न्यूक्लियर मेडिसिन"],
      terms: ["लैब व रेडियोलॉजी पर लागू", "बिलिंग काउंटर पर कार्ड दिखाएं", "दवाखाने पर 8% अतिरिक्त छूट", "वैध सदस्यता आवश्यक", "सोमवार–शनिवार"],
      image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=700&q=85",
      rating: 4.4,
      beds: 280,
      established: "2000",
      type: "मल्टी स्पेशलिटी",
    },
  ],

  "राजस्थान_जोधपुर": [
    {
      id: 1,
      name: "AIIMS जोधपुर",
      discount: 10,
      address: "बासनी फेज-II, जोधपुर, राजस्थान 342005",
      phone: "+91 291-270-0800",
      departments: ["सामान्य चिकित्सा", "सर्जरी", "स्त्री रोग", "बाल रोग", "शोध"],
      terms: ["सरकारी सुविधा छूट", "सदस्यता कार्ड आवश्यक", "ओपीडी पंजीकरण प्राथमिकता", "24x7 आपातकाल सेवा", "ABHA एकीकरण उपलब्ध"],
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&q=85",
      rating: 4.9,
      beds: 500,
      established: "2012",
      type: "सरकारी एम्स",
    },
    {
      id: 2,
      name: "उमेद अस्पताल जोधपुर",
      discount: 15,
      address: "रेजीडेंसी रोड, जोधपुर 342001",
      phone: "+91 291-251-0003",
      departments: ["प्रसूति", "स्त्री रोग", "नवजात विज्ञान", "बाल रोग", "एनआईसीयू"],
      terms: ["OBC कार्ड अनिवार्य", "ओपीडी पर लागू", "पूर्व अपॉइंटमेंट आवश्यक", "आपातकाल पर नहीं", "लैब पर 12% छूट"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=85",
      rating: 4.5,
      beds: 700,
      established: "1942",
      type: "सरकारी",
    },
    {
      id: 3,
      name: "गोयल अस्पताल जोधपुर",
      discount: 20,
      address: "चोपासनी रोड, जोधपुर 342001",
      phone: "+91 291-264-2244",
      departments: ["हृदय रोग", "न्यूरोलॉजी", "यूरोलॉजी", "कैंसर", "ऑर्थोपेडिक्स"],
      terms: ["6 माह के लिए वैध", "परिवार शामिल", "लैब पर 15%", "हेल्पडेस्क से परामर्श करें", "24x7 आपातकाल"],
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=700&q=85",
      rating: 4.6,
      beds: 150,
      established: "1998",
      type: "मल्टी स्पेशलिटी",
    },
    {
      id: 4,
      name: "मथुरादास माथुर अस्पताल",
      discount: 8,
      address: "एमजी अस्पताल परिसर, जोधपुर 342001",
      phone: "+91 291-264-3000",
      departments: ["सामान्य चिकित्सा", "सर्जरी", "ईएनटी", "नेत्र रोग", "त्वचा रोग"],
      terms: ["प्राथमिकता ओपीडी", "काउंटर पर कार्ड", "सभी दिन वैध", "आपातकाल बाहर", "छूट एक साथ लागू"],
      image: "https://images.unsplash.com/photo-1632053002928-1919051e6364?w=700&q=85",
      rating: 4.4,
      beds: 1200,
      established: "1956",
      type: "सरकारी",
    },
  ],

  "राजस्थान_कोटा": [
    {
      id: 1,
      name: "न्यू मेडिकल कॉलेज अस्पताल",
      discount: 12,
      address: "रंगबाड़ी रोड, कोटा, राजस्थान 324005",
      phone: "+91 744-250-0777",
      departments: ["सामान्य चिकित्सा", "सर्जरी", "ऑर्थोपेडिक्स", "ईएनटी", "स्त्री रोग"],
      terms: ["OBC कार्ड अनिवार्य", "ओपीडी प्राथमिकता", "सरकारी दरें लागू", "24x7 आपातकाल", "PMJAY स्वीकार्य"],
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&q=85",
      rating: 4.3,
      beds: 1000,
      established: "1965",
      type: "सरकारी",
    },
    {
      id: 2,
      name: "भारत विकास परिषद अस्पताल",
      discount: 18,
      address: "दादाबाड़ी, कोटा 324009",
      phone: "+91 744-236-5555",
      departments: ["कार्डियोलॉजी", "न्यूरोलॉजी", "गैस्ट्रो", "यूरोलॉजी", "ऑर्थोपेडिक्स"],
      terms: ["OBC सदस्यता दिखाएं", "लैब पर 10% छूट", "दवाखाने पर 8%", "1 वर्ष वैध", "सोम–शनि"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=85",
      rating: 4.5,
      beds: 200,
      established: "2001",
      type: "मल्टी स्पेशलिटी",
    },
    {
      id: 3,
      name: "गुरुनानक अस्पताल कोटा",
      discount: 22,
      address: "नयापुरा, कोटा 324001",
      phone: "+91 744-232-1234",
      departments: ["कैंसर", "हृदय रोग", "रीढ़", "लिवर", "किडनी"],
      terms: ["सदस्यता अनिवार्य", "परिवार पात्र", "डायग्नोस्टिक्स पर 20%", "दवाखाने पर 12%", "1 वर्ष वैध"],
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=700&q=85",
      rating: 4.6,
      beds: 300,
      established: "2005",
      type: "सुपर स्पेशलिटी",
    },
  ],

  "राजस्थान_उदयपुर": [
    {
      id: 1,
      name: "GBH अमेरिकन हॉस्पिटल",
      discount: 20,
      address: "बेडवास रोड, एयरपोर्ट रोड, उदयपुर 313001",
      phone: "+91 294-248-8000",
      departments: ["हृदय रोग", "कैंसर", "न्यूरो", "ऑर्थोपेडिक्स", "सौंदर्य चिकित्सा"],
      terms: ["OBC कार्ड आवश्यक", "ओपीडी व आईपीडी दोनों", "लैब पर 15%", "दवाखाने पर 10%", "1 वर्ष वैध"],
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&q=85",
      rating: 4.7,
      beds: 300,
      established: "2008",
      type: "सुपर स्पेशलिटी",
    },
    {
      id: 2,
      name: "RNT मेडिकल कॉलेज",
      discount: 8,
      address: "चेतक सर्कल, उदयपुर 313001",
      phone: "+91 294-248-9000",
      departments: ["सभी विशेषताएं", "आपातकाल", "आईसीयू", "जलन", "ट्रॉमा"],
      terms: ["सरकारी दरें", "प्राथमिकता ओपीडी", "पंजीकरण पर कार्ड", "24x7 आपातकाल", "बीपीएल के लिए निःशुल्क"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=85",
      rating: 4.4,
      beds: 1500,
      established: "1952",
      type: "सरकारी",
    },
    {
      id: 3,
      name: "Pacific Medical College",
      discount: 15,
      address: "भीलों का बेड़ला, उदयपुर 313024",
      phone: "+91 294-266-0606",
      departments: ["सामान्य चिकित्सा", "सर्जरी", "स्त्री रोग", "बाल रोग", "दंत चिकित्सा"],
      terms: ["OBC कार्ड दिखाएं", "केवल सोम–शनि", "लैब पर 12%", "आपातकाल नहीं", "पूर्व अपॉइंटमेंट"],
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=700&q=85",
      rating: 4.5,
      beds: 750,
      established: "2004",
      type: "शिक्षण अस्पताल",
    },
  ],

  "राजस्थान_अलवर": [
    {
      id: 1,
      name: "राजकीय जिला अस्पताल अलवर",
      discount: 8,
      address: "होप सर्कस, अलवर 301001",
      phone: "+91 144-233-0256",
      departments: ["सामान्य चिकित्सा", "शल्य", "स्त्री रोग", "बाल रोग", "आपातकाल"],
      terms: ["सरकारी दरें", "OBC प्राथमिकता", "24x7 आपातकाल", "PMJAY स्वीकार्य", "मुफ्त ओपीडी"],
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&q=85",
      rating: 4.1,
      beds: 500,
      established: "1955",
      type: "सरकारी",
    },
    {
      id: 2,
      name: "Alwar City Hospital",
      discount: 18,
      address: "महावीर मार्ग, अलवर 301001",
      phone: "+91 144-270-4444",
      departments: ["हृदय रोग", "ऑर्थोपेडिक्स", "न्यूरोलॉजी", "ENT", "त्वचा रोग"],
      terms: ["OBC कार्ड अनिवार्य", "ओपीडी पर लागू", "लैब पर 10%", "1 वर्ष वैध", "सोम–शनि"],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=85",
      rating: 4.4,
      beds: 150,
      established: "2005",
      type: "मल्टी स्पेशलिटी",
    },
  ],
};

// ─── SCHOOL DATA ─────────────────────────────────────────────────────────────

const SCHOOL_DB = {
  "राजस्थान_जयपुर": [
    {
      id: 1,
      name: "Maharaja Sawai Man Singh Vidyalaya",
      discount: 15,
      address: "सांगानेरी गेट, जयपुर 302001",
      phone: "+91 141-256-1200",
      departments: ["कक्षा 1-12", "विज्ञान", "कॉमर्स", "कला", "खेल"],
      terms: ["OBC कार्ड अनिवार्य", "प्रवेश शुल्क पर छूट", "ट्यूशन फीस पर 15%", "वर्दी पर 10%", "वार्षिक शुल्क पर लागू"],
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=85",
      rating: 4.6,
      beds: 2500,
      established: "1945",
      type: "सरकारी",
    },
    {
      id: 2,
      name: "Ryan International School जयपुर",
      discount: 20,
      address: "वैशाली नगर, जयपुर 302021",
      phone: "+91 141-410-5555",
      departments: ["प्री-प्राइमरी", "प्राइमरी", "सेकेंडरी", "CBSE", "खेल"],
      terms: ["OBC सदस्यता दिखाएं", "नए प्रवेश पर 20%", "किताबों पर 10%", "गणवेश पर 12%", "1 वर्ष वैध"],
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=85",
      rating: 4.7,
      beds: 3000,
      established: "2002",
      type: "निजी",
    },
    {
      id: 3,
      name: "Rajasthan Board Model School",
      discount: 10,
      address: "झालाना डूंगरी, जयपुर 302004",
      phone: "+91 141-272-0100",
      departments: ["कक्षा 6-12", "विज्ञान", "गणित", "हिंदी माध्यम", "संस्कृत"],
      terms: ["सरकारी दरें", "OBC प्राथमिकता प्रवेश", "छात्रवृत्ति उपलब्ध", "मुफ्त पाठ्यपुस्तकें", "परिवहन सुविधा"],
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=85",
      rating: 4.3,
      beds: 1800,
      established: "1968",
      type: "सरकारी",
    },
  ],
  "राजस्थान_जोधपुर": [
    {
      id: 1,
      name: "Central Academy School जोधपुर",
      discount: 18,
      address: "पाल रोड, जोधपुर 342001",
      phone: "+91 291-274-5555",
      departments: ["CBSE", "कक्षा 1-12", "विज्ञान", "कॉमर्स", "कला"],
      terms: ["OBC कार्ड आवश्यक", "फीस पर 18%", "किताबों पर 8%", "1 वर्ष वैध", "सोम–शनि"],
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=85",
      rating: 4.5,
      beds: 2000,
      established: "1988",
      type: "निजी",
    },
  ],
  "राजस्थान_कोटा": [
    {
      id: 1,
      name: "Kendriya Vidyalaya कोटा",
      discount: 12,
      address: "नयापुरा, कोटा 324001",
      phone: "+91 744-232-5555",
      departments: ["CBSE", "कक्षा 1-12", "विज्ञान", "आर्ट्स", "वाणिज्य"],
      terms: ["OBC कार्ड अनिवार्य", "प्रवेश शुल्क पर छूट", "VVN पर लागू", "1 वर्ष वैध", "सभी दिन"],
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=85",
      rating: 4.6,
      beds: 2200,
      established: "1975",
      type: "केंद्रीय",
    },
  ],
  "राजस्थान_उदयपुर": [
    {
      id: 1,
      name: "Delhi Public School उदयपुर",
      discount: 20,
      address: "हिरण मगरी, उदयपुर 313002",
      phone: "+91 294-246-8888",
      departments: ["CBSE", "कक्षा 1-12", "विज्ञान", "कॉमर्स", "खेल"],
      terms: ["OBC कार्ड दिखाएं", "फीस पर 20%", "वर्दी पर 15%", "परिवहन पर 10%", "1 वर्ष वैध"],
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=85",
      rating: 4.7,
      beds: 2800,
      established: "2005",
      type: "निजी",
    },
  ],
  "राजस्थान_अलवर": [
    {
      id: 1,
      name: "Rajkiya Uchch Madhyamik Vidyalaya अलवर",
      discount: 8,
      address: "स्टेशन रोड, अलवर 301001",
      phone: "+91 144-233-1234",
      departments: ["कक्षा 9-12", "विज्ञान", "कला", "हिंदी माध्यम", "व्यावसायिक"],
      terms: ["सरकारी दरें", "OBC प्राथमिकता", "छात्रवृत्ति उपलब्ध", "मुफ्त पुस्तकें", "24x7 पुस्तकालय"],
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=85",
      rating: 4.2,
      beds: 1200,
      established: "1962",
      type: "सरकारी",
    },
  ],
};

// ─── COACHING DATA ───────────────────────────────────────────────────────────

const COACHING_DB = {
  "राजस्थान_जयपुर": [
    {
      id: 1,
      name: "Allen Career Institute जयपुर",
      discount: 20,
      address: "गांधी नगर, जयपुर 302015",
      phone: "+91 141-406-0000",
      departments: ["IIT-JEE", "NEET", "UPSC", "RAS", "SSC"],
      terms: ["OBC कार्ड अनिवार्य", "फीस पर 20%", "स्टडी मटेरियल पर 15%", "टेस्ट सीरीज पर 10%", "1 वर्ष वैध"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85",
      rating: 4.8,
      beds: 5000,
      established: "1998",
      type: "प्रीमियम",
    },
    {
      id: 2,
      name: "Resonance Kota जयपुर",
      discount: 15,
      address: "मानसरोवर, जयपुर 302020",
      phone: "+91 141-274-0000",
      departments: ["IIT-JEE", "NEET", "11th-12th", "Foundation", "NTSE"],
      terms: ["OBC सदस्यता दिखाएं", "फीस पर 15%", "हॉस्टल पर 10%", "किताबों पर 12%", "परिवार पात्र"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85",
      rating: 4.7,
      beds: 4000,
      established: "2001",
      type: "प्रीमियम",
    },
    {
      id: 3,
      name: "Aakash Institute जयपुर",
      discount: 18,
      address: "वैशाली नगर, जयपुर 302021",
      phone: "+91 141-276-5555",
      departments: ["NEET", "IIT-JEE", "Foundation", "AIIMS", "BITSAT"],
      terms: ["OBC कार्ड आवश्यक", "प्रवेश शुल्क पर 18%", "मॉक टेस्ट पर 15%", "1 वर्ष वैध", "सोम–शनि"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85",
      rating: 4.6,
      beds: 3500,
      established: "1988",
      type: "प्रीमियम",
    },
  ],
  "राजस्थान_कोटा": [
    {
      id: 1,
      name: "Allen Career Institute कोटा",
      discount: 25,
      address: "ओपीडी सर्किल, कोटा 324005",
      phone: "+91 744-271-6000",
      departments: ["IIT-JEE", "NEET", "Pre-Foundation", "AIIMS", "NTSE"],
      terms: ["OBC कार्ड अनिवार्य", "फीस पर 25%", "हॉस्टल पर 15%", "स्टडी मटेरियल पर 20%", "1 वर्ष वैध"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85",
      rating: 4.9,
      beds: 10000,
      established: "1988",
      type: "प्रीमियम",
    },
    {
      id: 2,
      name: "Resonance कोटा",
      discount: 22,
      address: "CG Tower, कोटा 324005",
      phone: "+91 744-265-0000",
      departments: ["IIT-JEE", "NEET", "Commerce", "Foundation", "NTSE"],
      terms: ["OBC सदस्यता दिखाएं", "फीस पर 22%", "हॉस्टल पर 12%", "किताबें पर 18%", "परिवार पात्र"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85",
      rating: 4.8,
      beds: 8000,
      established: "2001",
      type: "प्रीमियम",
    },
  ],
  "राजस्थान_जोधपुर": [
    {
      id: 1,
      name: "Parishkar College जोधपुर",
      discount: 15,
      address: "रातानाडा, जोधपुर 342001",
      phone: "+91 291-262-5555",
      departments: ["UPSC", "RAS", "Banking", "SSC", "Railway"],
      terms: ["OBC कार्ड आवश्यक", "फीस पर 15%", "टेस्ट सीरीज पर 10%", "1 वर्ष वैध", "सोम–शनि"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85",
      rating: 4.5,
      beds: 2000,
      established: "2000",
      type: "मध्यम",
    },
  ],
  "राजस्थान_उदयपुर": [
    {
      id: 1,
      name: "Career Point उदयपुर",
      discount: 18,
      address: "सहेलियों की बाड़ी के पास, उदयपुर 313001",
      phone: "+91 294-241-0000",
      departments: ["IIT-JEE", "NEET", "Foundation", "RAS", "UPSC"],
      terms: ["OBC कार्ड दिखाएं", "फीस पर 18%", "स्टडी मटेरियल पर 12%", "1 वर्ष वैध", "परिवार पात्र"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85",
      rating: 4.6,
      beds: 3000,
      established: "2003",
      type: "प्रीमियम",
    },
  ],
  "राजस्थान_अलवर": [
    {
      id: 1,
      name: "Success Point Coaching अलवर",
      discount: 12,
      address: "गांधी नगर, अलवर 301001",
      phone: "+91 144-234-1234",
      departments: ["SSC", "Banking", "Railway", "RPSC", "पुलिस"],
      terms: ["OBC कार्ड अनिवार्य", "फीस पर 12%", "टेस्ट सीरीज पर 8%", "1 वर्ष वैध", "सोम–शनि"],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85",
      rating: 4.3,
      beds: 800,
      established: "2008",
      type: "मध्यम",
    },
  ],
};

// ─── HOTEL DATA ──────────────────────────────────────────────────────────────

const HOTEL_DB = {
  "राजस्थान_जयपुर": [
    {
      id: 1,
      name: "Hotel Clarks Amer जयपुर",
      discount: 20,
      address: "जवाहर लाल नेहरू मार्ग, जयपुर 302018",
      phone: "+91 141-255-0616",
      departments: ["डीलक्स रूम", "सूट", "रेस्टोरेंट", "स्विमिंग पूल", "बैंक्वेट"],
      terms: ["OBC कार्ड आवश्यक", "कमरे पर 20%", "रेस्टोरेंट पर 10%", "1 वर्ष वैध", "पूर्व बुकिंग आवश्यक"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
      rating: 4.5,
      beds: 200,
      established: "1958",
      type: "4 स्टार",
    },
    {
      id: 2,
      name: "ITC Rajputana जयपुर",
      discount: 15,
      address: "पुलिस मेमोरियल रोड, जयपुर 302001",
      phone: "+91 141-510-0100",
      departments: ["लक्जरी रूम", "स्पा", "फाइन डाइनिंग", "कॉन्फ्रेंस", "स्विमिंग पूल"],
      terms: ["OBC सदस्यता दिखाएं", "कमरे पर 15%", "स्पा पर 20%", "डाइनिंग पर 10%", "1 वर्ष वैध"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
      rating: 4.8,
      beds: 250,
      established: "1977",
      type: "5 स्टार",
    },
    {
      id: 3,
      name: "Trident Hotel जयपुर",
      discount: 18,
      address: "अंबावाड़ी, जयपुर 302023",
      phone: "+91 141-267-0101",
      departments: ["प्रीमियम रूम", "रेस्टोरेंट", "बार", "जिम", "बैंक्वेट"],
      terms: ["OBC कार्ड अनिवार्य", "कमरे पर 18%", "भोजन पर 12%", "1 वर्ष वैध", "सोम–शुक्र"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
      rating: 4.6,
      beds: 140,
      established: "1995",
      type: "5 स्टार",
    },
  ],
  "राजस्थान_जोधपुर": [
    {
      id: 1,
      name: "Ajit Bhawan Palace जोधपुर",
      discount: 15,
      address: "नेहरू पार्क के पास, जोधपुर 342006",
      phone: "+91 291-251-0410",
      departments: ["हेरिटेज सूट", "रेस्टोरेंट", "पूल", "सफारी", "बैंक्वेट"],
      terms: ["OBC कार्ड आवश्यक", "कमरे पर 15%", "डाइनिंग पर 10%", "1 वर्ष वैध", "पूर्व बुकिंग"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
      rating: 4.7,
      beds: 80,
      established: "1927",
      type: "हेरिटेज",
    },
  ],
  "राजस्थान_उदयपुर": [
    {
      id: 1,
      name: "Hotel Fateh Prakash Palace उदयपुर",
      discount: 20,
      address: "सिटी पैलेस, उदयपुर 313001",
      phone: "+91 294-252-8016",
      departments: ["हेरिटेज रूम", "लेक व्यू", "फाइन डाइनिंग", "स्पा", "बोटिंग"],
      terms: ["OBC कार्ड दिखाएं", "कमरे पर 20%", "स्पा पर 15%", "डाइनिंग पर 10%", "1 वर्ष वैध"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
      rating: 4.9,
      beds: 70,
      established: "1620",
      type: "हेरिटेज",
    },
    {
      id: 2,
      name: "Radisson Blu उदयपुर",
      discount: 18,
      address: "हिरण मगरी, उदयपुर 313002",
      phone: "+91 294-661-0000",
      departments: ["डीलक्स रूम", "रेस्टोरेंट", "रूफटॉप बार", "पूल", "जिम"],
      terms: ["OBC सदस्यता अनिवार्य", "कमरे पर 18%", "भोजन पर 12%", "1 वर्ष वैध", "सोम–शुक्र"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
      rating: 4.6,
      beds: 120,
      established: "2010",
      type: "5 स्टार",
    },
  ],
  "राजस्थान_कोटा": [
    {
      id: 1,
      name: "WelcomHotel कोटा",
      discount: 15,
      address: "सिविल लाइन्स, कोटा 324001",
      phone: "+91 744-232-4444",
      departments: ["डीलक्स रूम", "रेस्टोरेंट", "कॉन्फ्रेंस", "पूल", "जिम"],
      terms: ["OBC कार्ड आवश्यक", "कमरे पर 15%", "भोजन पर 10%", "1 वर्ष वैध", "पूर्व बुकिंग"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
      rating: 4.4,
      beds: 100,
      established: "1990",
      type: "4 स्टार",
    },
  ],
  "राजस्थान_अलवर": [
    {
      id: 1,
      name: "Hotel Alwar Bagh",
      discount: 12,
      address: "मालाखेड़ा रोड, अलवर 301001",
      phone: "+91 144-270-0000",
      departments: ["स्टैंडर्ड रूम", "रेस्टोरेंट", "पार्किंग", "वाई-फाई", "बैंक्वेट"],
      terms: ["OBC कार्ड अनिवार्य", "कमरे पर 12%", "भोजन पर 8%", "1 वर्ष वैध", "सभी दिन"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
      rating: 4.2,
      beds: 60,
      established: "2005",
      type: "3 स्टार",
    },
  ],
};

// ─── PHYSIOTHERAPY DATA ──────────────────────────────────────────────────────

const PHYSIO_DB = {
  "राजस्थान_जयपुर": [
    {
      id: 1,
      name: "Jaipur Physiotherapy & Rehab Centre",
      discount: 20,
      address: "C-12, मालवीय नगर, जयपुर 302017",
      phone: "+91 141-274-8800",
      departments: ["स्पोर्ट्स इंजरी", "स्पाइन थेरेपी", "न्यूरो रिहैब", "पोस्ट-सर्जरी", "दर्द प्रबंधन"],
      terms: ["OBC कार्ड अनिवार्य", "ओपीडी पर 20% छूट", "होम विजिट पर 10%", "1 वर्ष वैध", "सोम–शनि"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85",
      rating: 4.7,
      beds: 20,
      established: "2010",
      type: "स्पेशलिटी",
    },
    {
      id: 2,
      name: "ActiveCare Physio Jaipur",
      discount: 15,
      address: "वैशाली नगर, जयपुर 302021",
      phone: "+91 141-410-7777",
      departments: ["ऑर्थो फिजियो", "पीडियाट्रिक", "न्यूरोलॉजी", "पोस्चर करेक्शन", "इलेक्ट्रोथेरेपी"],
      terms: ["OBC सदस्यता दिखाएं", "प्रति सत्र 15% छूट", "10 सत्र पैकेज पर 20%", "परिवार पात्र", "1 वर्ष वैध"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85",
      rating: 4.6,
      beds: 15,
      established: "2014",
      type: "क्लिनिक",
    },
    {
      id: 3,
      name: "SMS Hospital Physio Dept.",
      discount: 10,
      address: "जेएलएन मार्ग, जयपुर 302004",
      phone: "+91 141-256-0291",
      departments: ["पोस्ट-स्ट्रोक", "फ्रैक्चर रिहैब", "आर्थ्राइटिस", "स्पाइन", "ट्रॉमा"],
      terms: ["सरकारी दरें", "OBC प्राथमिकता", "24x7 उपलब्ध", "PMJAY स्वीकार्य", "मुफ्त OPD"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85",
      rating: 4.4,
      beds: 30,
      established: "1934",
      type: "सरकारी",
    },
    {
      id: 4,
      name: "Physiocare Plus जयपुर",
      discount: 25,
      address: "प्रताप नगर, जयपुर 302033",
      phone: "+91 141-500-1122",
      departments: ["स्पोर्ट्स रिहैब", "गर्दन-कमर दर्द", "घुटना", "कंधा", "साइटिका"],
      terms: ["OBC कार्ड आवश्यक", "पहले सत्र पर 25%", "पैकेज पर अतिरिक्त 10%", "होम विजिट उपलब्ध", "1 वर्ष वैध"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85",
      rating: 4.8,
      beds: 12,
      established: "2018",
      type: "प्रीमियम",
    },
  ],
  "राजस्थान_जोधपुर": [
    {
      id: 1,
      name: "Jodhpur Spine & Physio Clinic",
      discount: 18,
      address: "पाल रोड, जोधपुर 342001",
      phone: "+91 291-264-9900",
      departments: ["स्पाइन", "घुटना प्रत्यारोपण रिहैब", "न्यूरो", "स्पोर्ट्स", "बुजुर्ग देखभाल"],
      terms: ["OBC कार्ड अनिवार्य", "प्रति सत्र 18%", "पैकेज पर 22%", "1 वर्ष वैध", "सोम–शनि"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85",
      rating: 4.6,
      beds: 18,
      established: "2008",
      type: "स्पेशलिटी",
    },
    {
      id: 2,
      name: "AIIMS Jodhpur Physio Dept.",
      discount: 10,
      address: "बासनी फेज-II, जोधपुर 342005",
      phone: "+91 291-270-0800",
      departments: ["पोस्ट-सर्जरी", "न्यूरो रिहैब", "ऑर्थो", "बाल रोग", "ट्रॉमा"],
      terms: ["सरकारी सुविधा", "OBC प्राथमिकता", "ABHA एकीकरण", "24x7 आपातकाल", "PMJAY स्वीकार्य"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85",
      rating: 4.8,
      beds: 25,
      established: "2012",
      type: "सरकारी एम्स",
    },
  ],
  "राजस्थान_कोटा": [
    {
      id: 1,
      name: "Kota Physiotherapy Centre",
      discount: 20,
      address: "दादाबाड़ी, कोटा 324009",
      phone: "+91 744-236-7777",
      departments: ["स्पोर्ट्स", "स्पाइन", "घुटना", "कंधा", "इलेक्ट्रोथेरेपी"],
      terms: ["OBC कार्ड दिखाएं", "प्रति सत्र 20%", "5+ सत्र पैकेज पर 25%", "1 वर्ष वैध", "सभी दिन"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85",
      rating: 4.5,
      beds: 10,
      established: "2012",
      type: "क्लिनिक",
    },
  ],
  "राजस्थान_उदयपुर": [
    {
      id: 1,
      name: "GBH Physio & Rehab उदयपुर",
      discount: 20,
      address: "एयरपोर्ट रोड, उदयपुर 313001",
      phone: "+91 294-248-8001",
      departments: ["न्यूरो रिहैब", "ऑर्थो", "स्पोर्ट्स", "पोस्चर", "दर्द प्रबंधन"],
      terms: ["OBC कार्ड आवश्यक", "सत्र पर 20%", "डायग्नोस्टिक्स पर 15%", "1 वर्ष वैध", "सोम–शनि"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85",
      rating: 4.7,
      beds: 20,
      established: "2010",
      type: "स्पेशलिटी",
    },
  ],
  "राजस्थान_अलवर": [
    {
      id: 1,
      name: "Alwar Physio Wellness Clinic",
      discount: 15,
      address: "महावीर मार्ग, अलवर 301001",
      phone: "+91 144-270-5555",
      departments: ["कमर दर्द", "घुटना", "गर्दन", "स्पोर्ट्स", "बुजुर्ग देखभाल"],
      terms: ["OBC कार्ड अनिवार्य", "प्रति सत्र 15%", "पैकेज पर 20%", "1 वर्ष वैध", "सोम–शनि"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85",
      rating: 4.4,
      beds: 8,
      established: "2015",
      type: "क्लिनिक",
    },
  ],
};

// ─── GET DATA BY CATEGORY ─────────────────────────────────────────────────────

function generateGeneric(state, district, category) {
  const images = {
    hospital: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&q=85",
    school: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=85",
    coaching: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85",
    physio: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85",
    hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85",
  };
  const templates = {
    hospital: [
      { suffix: "जिला अस्पताल", dept: ["सामान्य चिकित्सा","सर्जरी","स्त्री रोग","बाल रोग","आपातकाल"], discount: 8, type: "सरकारी" },
      { suffix: "मल्टीस्पेशलिटी अस्पताल", dept: ["कार्डियोलॉजी","ऑर्थोपेडिक्स","न्यूरोलॉजी","कैंसर","ईएनटी"], discount: 15, type: "मल्टी स्पेशलिटी" },
    ],
    school: [
      { suffix: "राजकीय उच्च माध्यमिक विद्यालय", dept: ["कक्षा 1-12","विज्ञान","कला","हिंदी","गणित"], discount: 10, type: "सरकारी" },
      { suffix: "पब्लिक स्कूल", dept: ["CBSE","कक्षा 1-12","खेल","संगीत","विज्ञान"], discount: 15, type: "निजी" },
    ],
    coaching: [
      { suffix: "कैरियर अकादमी", dept: ["SSC","Banking","Railway","RPSC","पुलिस"], discount: 12, type: "मध्यम" },
      { suffix: "एजुकेशन हब", dept: ["UPSC","RAS","IIT-JEE","NEET","Foundation"], discount: 18, type: "प्रीमियम" },
    ],
    physio: [
      { suffix: "फिजियोथैरेपी क्लिनिक", dept: ["कमर दर्द","घुटना","गर्दन","स्पोर्ट्स","इलेक्ट्रोथेरेपी"], discount: 15, type: "क्लिनिक" },
      { suffix: "रिहैब सेंटर", dept: ["न्यूरो रिहैब","ऑर्थो","पोस्ट-सर्जरी","बुजुर्ग देखभाल","पोस्चर"], discount: 20, type: "स्पेशलिटी" },
    ],
    hotel: [
      { suffix: "गेस्ट हाउस", dept: ["स्टैंडर्ड रूम","रेस्टोरेंट","वाई-फाई","पार्किंग","बैंक्वेट"], discount: 10, type: "3 स्टार" },
      { suffix: "Hotel", dept: ["डीलक्स रूम","रेस्टोरेंट","पूल","जिम","कॉन्फ्रेंस"], discount: 15, type: "4 स्टार" },
    ],
  };
  return (templates[category] || templates.hospital).map((t, i) => ({
    id: i + 1,
    name: `${district} ${t.suffix}`,
    discount: t.discount,
    address: `${["सिविल लाइन्स","गांधी नगर"][i]}, ${district}, ${state}`,
    phone: `+91 ${90000 + i * 1111} ${10000 + i * 2222}`,
    departments: t.dept,
    terms: ["OBC सदस्यता कार्ड आवश्यक","ओपीडी परामर्श पर लागू","पूर्व अपॉइंटमेंट अनुशंसित","आपातकाल पर लागू नहीं","1 वर्ष के लिए वैध"],
    image: images[category] || images.hospital,
    rating: parseFloat((4.2 + Math.random() * 0.7).toFixed(1)),
    beds: [200,300][i],
    established: ["2000","2005"][i],
    type: t.type,
  }));
}

function getData(category, state, district) {
  const key = `${state}_${district}`;
  const db = { hospital: HOSPITAL_DB, school: SCHOOL_DB, coaching: COACHING_DB, hotel: HOTEL_DB, physio: PHYSIO_DB }[category];
  return (db && db[key]) ? db[key] : generateGeneric(state, district, category);
}

// ─── CATEGORY LABELS ──────────────────────────────────────────────────────────

const CAT_LABEL = {
  hospital: { singular: "अस्पताल", plural: "अस्पताल", typeLabel: "प्रकार", unitLabel: "बिस्तर", unitIcon: "🛏️" },
  school:   { singular: "स्कूल",   plural: "स्कूल",   typeLabel: "बोर्ड",  unitLabel: "छात्र",  unitIcon: "👨‍🎓" },
  coaching: { singular: "कोचिंग",  plural: "कोचिंग",  typeLabel: "श्रेणी", unitLabel: "छात्र",  unitIcon: "👨‍🎓" },
  hotel:    { singular: "होटल",    plural: "होटल",    typeLabel: "श्रेणी", unitLabel: "कमरे",   unitIcon: "🛏️" },
  physio:   { singular: "सेंटर",   plural: "फिजियोथैरेपी सेंटर", typeLabel: "प्रकार", unitLabel: "बेड", unitIcon: "🛏️" },
};

// ─── SKELETON ───────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="rounded-3xl overflow-hidden border border-orange-100/60" style={{ background: "rgba(255,255,255,0.7)" }}>
    <div className="h-52 shimmer-bg" />
    <div className="p-5 space-y-3">
      <div className="h-5 shimmer-bg rounded-xl w-3/4" />
      <div className="h-1 shimmer-bg rounded" />
      <div className="h-4 shimmer-bg rounded-lg w-full" />
      <div className="h-4 shimmer-bg rounded-lg w-2/3" />
      <div className="h-11 shimmer-bg rounded-2xl mt-4" />
    </div>
  </div>
);

// ─── HOSPITAL CARD ───────────────────────────────────────────────────────────

const HospitalCard = ({ hospital, index, onViewDetails, category }) => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 110);
    return () => clearTimeout(t);
  }, [index]);

  const discountColor =
    hospital.discount >= 25 ? { from: "#16a34a", to: "#15803d" } :
    hospital.discount >= 15 ? { from: "#f97316", to: "#ea580c" } :
    { from: "#3b82f6", to: "#2563eb" };

  const catL = CAT_LABEL[category] || CAT_LABEL.hospital;

  return (
    <div
      className="rounded-3xl overflow-hidden border cursor-pointer relative group"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(24px)",
        borderColor: hovered ? "rgba(249,115,22,0.3)" : "rgba(249,115,22,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s, box-shadow 0.3s ease, border-color 0.3s ease`,
        boxShadow: hovered
          ? "0 24px 64px rgba(249,115,22,0.18), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover"
          style={{ transform: hovered ? "scale(1.09)" : "scale(1)", transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.52) 100%)" }} />
        <div
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${discountColor.from}, ${discountColor.to})`,
            boxShadow: `0 4px 16px rgba(0,0,0,0.3)`,
          }}
        >
          <TbDiscount size={14} color="white" />
          <span className="text-white font-black text-sm tracking-wide">{hospital.discount}% छूट</span>
        </div>
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl text-xs font-bold text-white/90"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
          {hospital.type}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-xl"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}>
          <FiStar size={11} fill="#fbbf24" color="#fbbf24" />
          <span className="text-white text-xs font-bold">{hospital.rating}</span>
          <span className="text-white/60 text-xs">· {hospital.beds} {catL.unitLabel}</span>
        </div>
        <div className="absolute bottom-3 right-3 text-white/70 text-xs font-medium"
          style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)", padding: "2px 8px", borderRadius: "8px" }}>
            स्थापित {hospital.established}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-black text-gray-800 text-lg leading-snug mb-1 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          {hospital.name}
        </h3>
        <div className="h-px mb-3" style={{ background: "linear-gradient(90deg, rgba(249,115,22,0.3), transparent)" }} />

        <div className="flex items-start gap-2 mb-2">
          <HiOutlineLocationMarker size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{hospital.address}</p>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <FiPhone size={13} className="text-orange-400 flex-shrink-0" />
          <p className="text-orange-500 text-xs font-semibold">{hospital.phone}</p>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {hospital.departments.slice(0, 3).map(d => (
            <span key={d} className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "rgba(249,115,22,0.08)", color: "#ea580c", border: "1px solid rgba(249,115,22,0.18)" }}>
              {d}
            </span>
          ))}
          {hospital.departments.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium text-gray-400"
              style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" }}>
              +{hospital.departments.length - 3} और
            </span>
          )}
        </div>

        <button
          onClick={() => onViewDetails(hospital)}
          className="w-full py-2.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            background: hovered ? "linear-gradient(135deg, #f97316, #ea580c)" : "transparent",
            color: hovered ? "white" : "#f97316",
            border: "1.5px solid",
            borderColor: hovered ? "transparent" : "rgba(249,115,22,0.5)",
            boxShadow: hovered ? "0 8px 28px rgba(249,115,22,0.35), 0 2px 8px rgba(249,115,22,0.2)" : "none",
          }}
        >
          <MdLocalHospital size={16} />
          विवरण देखें
          <span style={{ transform: hovered ? "translateX(3px)" : "none", transition: "transform 0.2s" }}>→</span>
        </button>
      </div>
    </div>
  );
};

// ─── MODAL ──────────────────────────────────────────────────────────────────

const Modal = ({ hospital, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: visible ? "rgba(0,0,0,0.65)" : "rgba(0,0,0,0)",
        backdropFilter: "blur(12px)",
        transition: "background 0.35s ease",
      }}
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(40px)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.88) translateY(24px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.38s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.35), 0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:rotate-90 transition-transform duration-300 text-gray-500 hover:text-gray-800"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
        >
          <FiX size={18} />
        </button>

        <div className="relative h-60 rounded-t-3xl overflow-hidden">
          <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)" }} />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-2xl"
            style={{ background: "linear-gradient(135deg, #f97316, #dc2626)", boxShadow: "0 4px 20px rgba(249,115,22,0.5)" }}>
            <MdOutlineDiscount size={18} color="white" />
            <span className="text-white font-black text-xl">{hospital.discount}% छूट</span>
          </div>
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}>
            <FiStar size={13} fill="#fbbf24" color="#fbbf24" />
            <span className="text-white text-sm font-bold">{hospital.rating}</span>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-2xl font-black text-gray-800 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {hospital.name}
              </h2>
              <span className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-bold text-orange-600"
                style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
                {hospital.type}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1"><BiBuildingHouse size={13} />{hospital.beds}</span>
              <span className="flex items-center gap-1"><FiClock size={13} />स्थापित {hospital.established}</span>
            </div>
          </div>

          <div className="h-px" style={{ background: "linear-gradient(90deg, #f97316, #22c55e, transparent)" }} />

          <div className="flex items-start gap-3 p-3.5 rounded-2xl" style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.1)" }}>
            <TbMapPin size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">पता</p>
              <p className="text-gray-700 text-sm font-medium leading-relaxed">{hospital.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl" style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.12)" }}>
            <HiOutlinePhone size={20} className="text-green-500 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">संपर्क</p>
              <p className="text-green-600 font-bold text-sm">{hospital.phone}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <RiStethoscopeLine size={18} className="text-orange-500" />
              <p className="text-xs font-black text-gray-700 uppercase tracking-widest">विभाग / सेवाएं</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {hospital.departments.map(d => (
                <span key={d} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: "rgba(249,115,22,0.08)", color: "#ea580c", border: "1px solid rgba(249,115,22,0.2)" }}>
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(249,115,22,0.15)" }}>
            <div className="px-4 py-3 flex items-center gap-2" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(249,115,22,0.04))" }}>
              <HiOutlineDocumentText size={18} className="text-orange-500" />
              <p className="text-xs font-black text-gray-700 uppercase tracking-widest">शर्तें व नियम</p>
            </div>
            <div className="p-4 space-y-2">
              {hospital.terms.map((t, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <FiCheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{t}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 rounded-2xl" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.12)" }}>
            <FiAlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-red-500 leading-relaxed">छूट लाभ प्राप्त करने के लिए वैध OBC महासभा सदस्यता कार्ड प्रस्तुत करना आवश्यक है।</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── CATEGORY DROPDOWN ──────────────────────────────────────────────────────

const CategoryDropdown = ({ value, onSelect }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const selected = CATEGORIES.find(c => c.id === value);

  return (
    <div ref={ref} className="relative">
      <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
        <FiGrid size={13} /> Category चुनें
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3.5 rounded-2xl border text-left text-sm font-semibold flex items-center justify-between transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.95)",
          borderColor: open ? "#f97316" : "rgba(249,115,22,0.25)",
          boxShadow: open
            ? "0 0 0 3px rgba(249,115,22,0.12), 0 4px 16px rgba(0,0,0,0.06)"
            : "0 2px 8px rgba(0,0,0,0.04)",
          color: selected ? "#1f2937" : "#9ca3af",
          cursor: "pointer",
        }}
      >
        <span className="flex items-center gap-3 truncate">
          {selected ? (
            <>
              <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>{selected.icon}</span>
              <span className="font-bold text-gray-800">{selected.labelHi}</span>
              <span className="text-xs text-orange-400 font-semibold">({selected.label})</span>
            </>
          ) : (
            <span className="text-gray-400">Category चुनें — Hospital / School / Coaching / Hotel</span>
          )}
        </span>
        <FiChevronDown
          size={16}
          className="text-orange-400 flex-shrink-0"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s ease" }}
        />
      </button>

      {open && (
        <div
          className="absolute z-40 w-full mt-2 rounded-2xl border overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(24px)",
            borderColor: "rgba(249,115,22,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.06)",
            animation: "dropdownIn 0.2s ease",
          }}
        >
          {CATEGORIES.map((cat, i) => {
            const isActive = value === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { onSelect(cat.id); setOpen(false); }}
                className="w-full text-left px-4 py-3.5 flex items-center gap-3 transition-all"
                style={{
                  borderBottom: i < CATEGORIES.length - 1 ? "1px solid rgba(249,115,22,0.07)" : "none",
                  background: isActive ? "rgba(249,115,22,0.08)" : "transparent",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(249,115,22,0.05)"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, #f97316, #ea580c)"
                      : "rgba(249,115,22,0.08)",
                    fontSize: "1.3rem",
                    lineHeight: 1,
                    boxShadow: isActive ? "0 4px 12px rgba(249,115,22,0.35)" : "none",
                  }}
                >
                  {cat.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-800">{cat.labelHi}</p>
                  <p className="text-xs text-gray-400">{cat.label}</p>
                </div>
                {isActive && (
                  <FiCheckCircle size={16} className="text-orange-500 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── DROPDOWN ───────────────────────────────────────────────────────────────

const Dropdown = ({ label, placeholder, value, options, onSelect, disabled, icon }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={ref} className="relative">
      <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
        {icon} {label}
      </label>
      <button
        disabled={disabled}
        onClick={() => { if (!disabled) { setOpen(!open); setSearch(""); } }}
        className="w-full px-4 py-3.5 rounded-2xl border text-left text-sm font-semibold flex items-center justify-between transition-all duration-200"
        style={{
          background: disabled ? "rgba(243,244,246,0.8)" : "rgba(255,255,255,0.95)",
          borderColor: open ? "#f97316" : "rgba(249,115,22,0.25)",
          boxShadow: open ? "0 0 0 3px rgba(249,115,22,0.12), 0 4px 16px rgba(0,0,0,0.06)" : "0 2px 8px rgba(0,0,0,0.04)",
          color: value ? "#1f2937" : "#9ca3af",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <span className="flex items-center gap-2 truncate">
          {value && <MdOutlineVerified size={15} className="text-green-500 flex-shrink-0" />}
          {value || placeholder}
        </span>
        <FiChevronDown size={16} className="text-orange-400 flex-shrink-0" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s ease" }} />
      </button>

      {open && (
        <div
          className="absolute z-40 w-full mt-2 rounded-2xl border overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(24px)",
            borderColor: "rgba(249,115,22,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.06)",
            animation: "dropdownIn 0.2s ease",
          }}
        >
          <div className="p-2 border-b" style={{ borderColor: "rgba(249,115,22,0.1)" }}>
            <div className="relative">
              <FiSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`${label} खोजें...`}
                className="w-full pl-8 pr-3 py-2 rounded-xl text-xs outline-none"
                style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.1)" }}
              />
            </div>
          </div>
          <div style={{ maxHeight: "240px", overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-gray-400">कोई परिणाम नहीं मिला</div>
            ) : filtered.map(o => (
              <button
                key={o}
                onClick={() => { onSelect(o); setOpen(false); setSearch(""); }}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 flex items-center gap-2 transition-colors"
                style={{ borderBottom: "1px solid rgba(249,115,22,0.05)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = ""; }}
              >
                {o === value && <FiCheckCircle size={13} className="text-green-500 flex-shrink-0" />}
                {o}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── MAIN APP ───────────────────────────────────────────────────────────────

const OBCMahasabha = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [modalHospital, setModalHospital] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  const states = Object.keys(STATES_DISTRICTS).sort();
  const districts = selectedState ? [...STATES_DISTRICTS[selectedState]].sort() : [];

  const handleCategorySelect = useCallback((catId) => {
    setSelectedCategory(catId);
    setSelectedState("");
    setSelectedDistrict("");
    setHospitals([]);
    setSearch("");
  }, []);

  const handleStateSelect = useCallback((state) => {
    setSelectedState(state);
    setSelectedDistrict("");
    setHospitals([]);
  }, []);

  const handleDistrictSelect = useCallback((district) => {
    setSelectedDistrict(district);
    setLoading(true);
    setHospitals([]);
    setTimeout(() => {
      setHospitals(getData(selectedCategory, selectedState, district));
      setLoading(false);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }, 1300);
  }, [selectedState, selectedCategory]);

  const filtered = hospitals.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.address.toLowerCase().includes(search.toLowerCase()) ||
    h.departments.some(d => d.toLowerCase().includes(search.toLowerCase()))
  );

  const showResults = !!selectedCategory && !!selectedState && !!selectedDistrict;
  const selectedCat = CATEGORIES.find(c => c.id === selectedCategory);
  const catL = CAT_LABEL[selectedCategory] || CAT_LABEL.hospital;

  const stats = [
    { icon: <FiUsers size={20} />, val: "50,000+", label: "सदस्य" },
    { icon: <TbBuildingHospital size={20} />, val: "500+", label: "पार्टनर" },
    { icon: <FiAward size={20} />, val: "36", label: "राज्य व केंद्र शासित प्रदेश" },
    { icon: <MdOutlineHealthAndSafety size={20} />, val: "10–30%", label: "छूट की सीमा" },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Nunito', sans-serif", background: "#fafaf8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes gradient-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(2deg)} }
        @keyframes bounce-arrow { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes dropdownIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .shimmer-bg { background: linear-gradient(90deg, #fde8d0 25%, #fff7ed 50%, #fde8d0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
        .hero-gradient { background: linear-gradient(135deg, #f97316 0%, #fb923c 12%, #fed7aa 28%, #fef9c3 44%, #dcfce7 62%, #86efac 78%, #22c55e 100%); background-size: 300% 300%; animation: gradient-shift 10s ease infinite; }
        .line-clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.3); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(249,115,22,0.5); }
        .cat-btn { transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        .cat-btn:hover { transform: translateY(-3px) scale(1.04); }
        .cat-btn.active { transform: translateY(-2px) scale(1.06); }
      `}</style>

      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section className="hero-gradient min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-16 w-72 h-72 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #f97316, transparent)", filter: "blur(48px)" }} />
          <div className="absolute bottom-24 right-16 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #22c55e, transparent)", filter: "blur(64px)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-128 h-128 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #fbbf24, transparent)", filter: "blur(80px)" }} />
          <div className="absolute top-16 right-32 w-24 h-24 rounded-full border-2 border-orange-300/30 opacity-60" style={{ animation: "spin-slow 20s linear infinite" }} />
          <div className="absolute bottom-40 left-24 w-16 h-16 rounded-full border-2 border-green-300/30 opacity-50" style={{ animation: "spin-slow 15s linear infinite reverse" }} />
        </div>

        <div
          className="text-center max-w-4xl relative z-10"
          style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1)" }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full border border-orange-300/60 text-xs font-bold text-orange-700 tracking-widest uppercase"
            style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(12px)", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
            <MdOutlineHealthAndSafety size={16} />
            अखिल भारतीय संयुक्त OBC महासभा
            <MdOutlineHealthAndSafety size={16} />
          </div>

          <h1 className="font-black leading-tight mb-2 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 6vw, 4.5rem)", color: "#1a1a1a" }}>
            OBC महासभा
          </h1>
          <h1 className="font-black leading-tight mb-6 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 6vw, 4.5rem)", background: "linear-gradient(135deg, #f97316, #ea580c, #dc2626)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            सदस्य छूट लाभ
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 px-2"
            style={{ fontFamily: "'Nunito', sans-serif" }}>
            अखिल भारतीय संयुक्त OBC महासभा से जुड़ने पर आपको राज्य एवं जिले के अनुसार<br className="hidden md:block" />
            विभिन्न संस्थानों में <strong className="text-orange-600">विशेष छूट</strong> प्रदान की जाएगी।
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
            {stats.map((s, i) => (
              <div key={i}
                className="p-3 rounded-2xl text-center"
                style={{
                  background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.7)", boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${0.2 + i * 0.08}s`,
                }}>
                <div className="flex justify-center mb-1 text-orange-500">{s.icon}</div>
                <div className="font-black text-gray-800 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                <div className="text-gray-500 text-xs font-semibold">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="h-0.5 w-12 rounded-full" style={{ background: "#f97316" }} />
            <div className="h-0.5 w-12 rounded-full" style={{ background: "white" }} />
            <div className="h-0.5 w-12 rounded-full" style={{ background: "#22c55e" }} />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2" style={{ animation: "bounce-arrow 2.2s ease-in-out infinite" }}>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-xs text-gray-500 font-semibold tracking-wider">नीचे स्क्रॉल करें</span>
            <div className="w-9 h-9 rounded-full border-2 border-orange-300/60 flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}>
              <FiArrowDown size={16} className="text-orange-500" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SELECTION PANEL ════════════════════════════════════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-3xl p-8 border"
            style={{
              background: "rgba(255,255,255,0.85)", backdropFilter: "blur(32px)",
              borderColor: "rgba(249,115,22,0.15)", boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(249,115,22,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            {/* Panel Header */}
            <div className="flex items-center gap-3 mb-7">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.35)" }}>
                <FiTarget size={22} color="white" />
              </div>
              <div>
                <h2 className="font-black text-gray-800 text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>अपने लाभ खोजें</h2>
                <p className="text-gray-400 text-sm">पहले Category चुनें, फिर राज्य और जिला चुनें</p>
              </div>
            </div>

            {/* ── STEP 1: CATEGORY DROPDOWN ── */}
            <div className="mb-6">
              <CategoryDropdown
                value={selectedCategory}
                onSelect={handleCategorySelect}
              />
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent)" }} />

            {/* ── STEP 2 & 3: STATE + DISTRICT ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Dropdown
                label="राज्य चुनें"
                placeholder={selectedCategory ? "अपना राज्य चुनें" : "पहले Category चुनें"}
                value={selectedState}
                options={states}
                onSelect={handleStateSelect}
                disabled={!selectedCategory}
                icon={<HiOutlineOfficeBuilding size={13} />}
              />
              <Dropdown
                label="जिला चुनें"
                placeholder={selectedState ? "जिला चुनें" : "पहले राज्य चुनें"}
                value={selectedDistrict}
                options={districts}
                onSelect={handleDistrictSelect}
                disabled={!selectedState}
                icon={<HiOutlineLocationMarker size={13} />}
              />
            </div>

            {/* Progress indicator */}
            {(selectedCategory || selectedState || selectedDistrict) && (
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full transition-colors duration-300" style={{ background: selectedCategory ? "#22c55e" : "#e5e7eb" }} />
                  <span className="text-xs text-gray-500">Category</span>
                </div>
                <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full transition-colors duration-300" style={{ background: selectedState ? "#22c55e" : "#e5e7eb" }} />
                  <span className="text-xs text-gray-500">राज्य चुना गया</span>
                </div>
                <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full transition-colors duration-300" style={{ background: selectedDistrict ? "#22c55e" : "#e5e7eb" }} />
                  <span className="text-xs text-gray-500">जिला चुना गया</span>
                </div>
                <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full transition-colors duration-300" style={{ background: hospitals.length > 0 ? "#22c55e" : "#e5e7eb" }} />
                  <span className="text-xs text-gray-500">डेटा लोड</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ RESULTS ════════════════════════════════════════════════════════ */}
      {showResults && (
        <section ref={resultsRef} className="pb-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.06))", border: "1px solid rgba(249,115,22,0.2)" }}>
                  {selectedCat && <span style={{ fontSize: "1.4rem" }}>{selectedCat.icon}</span>}
                </div>
                <div>
                  <h2 className="font-black text-gray-800 text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {selectedDistrict} में {catL.plural}
                  </h2>
                  {!loading && (
                    <p className="text-gray-400 text-sm flex items-center gap-1.5">
                      <FiActivity size={13} className="text-orange-400" />
                      {filtered.length} {catL.plural} विशेष OBC सदस्य छूट के साथ
                    </p>
                  )}
                </div>
              </div>

              <div className="relative w-full md:w-80">
                <FiSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="नाम या विभाग से खोजें..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border text-sm outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)",
                    borderColor: "rgba(249,115,22,0.2)", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onFocus={e => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.12)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(249,115,22,0.2)"; e.target.style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.04)"; }}
                />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-28 px-4">
                <div className="text-7xl mb-6" style={{ animation: "float 3s ease-in-out infinite", display: "inline-block" }}>
                  {selectedCat?.icon || "🏥"}
                </div>
                <h3 className="font-black text-gray-700 text-2xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {search ? "कोई परिणाम नहीं मिला" : "जल्द ही आने वाला!"}
                </h3>
                <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed mb-6">
                  {search
                    ? `"${search}" से कोई मिलान नहीं मिला।`
                    : "हम सक्रिय रूप से आपके जिले में भागीदारों को जोड़ रहे हैं।"}
                </p>
                {search && (
                  <button onClick={() => setSearch("")}
                    className="px-6 py-2.5 rounded-2xl text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", boxShadow: "0 8px 24px rgba(249,115,22,0.3)" }}>
                    खोज साफ करें
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((h, i) => (
                  <HospitalCard key={h.id} hospital={h} index={i} onViewDetails={setModalHospital} category={selectedCategory} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══ FOOTER ═════════════════════════════════════════════════════════ */}
      <footer className="border-t" style={{ borderColor: "rgba(249,115,22,0.1)" }}>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}>
                <MdLocalHospital size={20} color="white" />
              </div>
              <div>
                <p className="font-black text-gray-700 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>अखिल भारतीय संयुक्त OBC महासभा</p>
                <p className="text-gray-400 text-xs">सदस्य छूट लाभ पोर्टल</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-8 rounded-full" style={{ background: "#f97316" }} />
              <div className="h-2 w-8 rounded-full" style={{ background: "#ffffff", border: "1px solid #e5e7eb" }} />
              <div className="h-2 w-8 rounded-full" style={{ background: "#22c55e" }} />
            </div>
            <p className="text-gray-400 text-xs text-center">
              © 2025 अखिल भारतीय संयुक्त OBC महासभा — सर्वाधिकार सुरक्षित
            </p>
          </div>
        </div>
      </footer>

      {modalHospital && (
        <Modal hospital={modalHospital} onClose={() => setModalHospital(null)} />
      )}
    </div>
  );
};

export default OBCMahasabha;