import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full 
      bg-gradient-to-r from-orange-500 to-red-500 
      text-white shadow-lg hover:shadow-2xl 
      flex items-center justify-center 
      transition-all duration-300 
      hover:scale-110
      ${show ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
      `}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;