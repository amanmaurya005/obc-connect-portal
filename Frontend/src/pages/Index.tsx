// import Header from "@/components/Header";
// import HeroSection from "@/components/HeroSection";
// import AboutSection from "@/components/AboutSection";
// import ObjectivesSection from "@/components/ObjectivesSection";
// import LeadershipSection from "@/components/LeadershipSection";
// import GallerySection from "@/components/GallerySection";
// import ContactSection from "@/components/ContactSection";
// import Footer from "@/components/Footer";

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main>
//         <HeroSection />
//         <AboutSection />
//         <ObjectivesSection />
//         <LeadershipSection />
//         <GallerySection />
//         <ContactSection />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Index;






import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import LeadershipSection from "@/components/LeadershipSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {

  const location = useLocation();   // ✅ add

  useEffect(() => {                 // ✅ add
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        el.scrollIntoView();
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background w-[100%]">
      <main>
        <HeroSection />
        <AboutSection />
        <ObjectivesSection />
        <LeadershipSection />
        <GallerySection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;