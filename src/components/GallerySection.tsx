

import React, { useState, useEffect, useCallback } from "react";
import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

import img1 from "../assets/gellery.jpeg";
import img2 from "../assets/gellery2.jpeg";
import img3 from "../assets/gellery3.jpeg";
import img4 from "../assets/gellery4.jpeg";
import img5 from "../assets/gellery5.jpeg";
import img6 from "../assets/gellery6.jpeg";
import img7 from "../assets/gellery7.jpeg";
import img8 from "../assets/gellery8.jpeg";
import img9 from "../assets/gellery9.jpeg";
import img10 from "../assets/gellery10.jpeg";
import img11 from "../assets/gellery11.jpeg";
import img12 from "../assets/gellery12.jpeg";
import img13 from "../assets/gellery13.jpeg";
import img14 from "../assets/gellery14.jpeg";
import img15 from "../assets/gellery15.jpeg";
import img16 from "../assets/gellery16.jpeg";
import img17 from "../assets/gellery17.jpeg";
import img18 from "../assets/gellery18.jpeg";
import img19 from "../assets/gellery19.jpeg";
import img20 from "../assets/gellery20.jpeg";
import img21 from "../assets/gellery21.jpeg";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface SlideItem {
  id: number | string;
  src: string;
  alt?: string;
}

export interface AdvancedSliderProps {
  slides: SlideItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  visibleCount?: number;
  className?: string;
}

// ─── Demo slides (local assets) ───────────────────────────────────────────────
const localSlides: SlideItem[] = [
  { id: 1, src: img1, alt: "Gallery 1" },
  { id: 2, src: img2, alt: "Gallery 2" },
  { id: 3, src: img3, alt: "Gallery 3" },
  { id: 4, src: img4, alt: "Gallery 4" },
  { id: 5, src: img5, alt: "Gallery 5" },
  { id: 6, src: img6, alt: "Gallery 6" },
  { id: 7, src: img7, alt: "Gallery 7" },
  { id: 8, src: img8, alt: "Gallery 8" },
  { id: 9, src: img9, alt: "Gallery 9" },
  { id: 10, src: img10, alt: "Gallery 10" },
  { id: 11, src: img11, alt: "Gallery 11" },
  { id: 12, src: img12, alt: "Gallery 12" },
  { id: 13, src: img13, alt: "Gallery 13" },
  { id: 14, src: img14, alt: "Gallery 14" },
  { id: 15, src: img15, alt: "Gallery 15" },
  { id: 16, src: img16, alt: "Gallery 16" },
  { id: 17, src: img17, alt: "Gallery 17" },
  { id: 18, src: img18, alt: "Gallery 18" },
  { id: 19, src: img19, alt: "Gallery 19" },
  { id: 20, src: img20, alt: "Gallery 20" },
  { id: 21, src: img21, alt: "Gallery 21" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
  },
};

const slideVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      delay: i * 0.07,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const thumbVariants = {
  hidden: { opacity: 0, y: 10 },
  // Match the resolver signature so TypeScript is happy
  visible: (i: number, _info?: unknown) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.04, ease: [0.4, 0, 0.2, 1] },
  }),
};

const progressVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
};

// ─── Slider Component ─────────────────────────────────────────────────────────
export const AdvancedSlider: React.FC<AdvancedSliderProps> = ({
  slides,
  autoPlay = false,
  autoPlayInterval = 4000,
  visibleCount = 2,
  className = "",
}) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered entrance
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const total = slides.length;
  const clamp = (n: number) => ((n % total) + total) % total;

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      const clamped = clamp(index);
      setCurrent(clamped);

      if (trackRef.current) {
        const cardWidth = trackRef.current.scrollWidth / total;
        trackRef.current.scrollTo({
          left: clamped * cardWidth,
          behavior: "smooth",
        });
      }

      setTimeout(() => setAnimating(false), 600);
    },
    [animating, total]
  );

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const onScroll = useCallback(() => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.scrollWidth / total;
    const newIdx = Math.round(trackRef.current.scrollLeft / cardWidth);
    setCurrent(clamp(newIdx));
  }, [total]);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(() => goTo(current + 1), autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayInterval, current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  const thumbWindow = 8;
  const thumbStart = Math.max(0, Math.min(current - 3, total - thumbWindow));
  const visibleThumbs = slides.slice(thumbStart, thumbStart + thumbWindow);

  const progressWidth = `${((current + 1) / total) * 100}%`;

  return (
    <section id="gallery" className="py-20 bg-cream-pattern scroll-mt-24" ref={sectionRef}>

      {/* ── Section Heading ── */}
      <motion.div
        variants={headingVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center mb-10"
      >
        <span className="inline-block px-4 py-1.5 bg-saffron-light text-primary rounded-full text-sm font-semibold mb-4">
          गैलरी
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
          फोटो <span className="text-primary">गैलरी</span>
        </h2>
      </motion.div>

      {/* ── Scroll-triggered entrance wrapper ── */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`flex flex-col items-center justify-center px-5 py-10 bg-[#f5f0e8] select-none box-border font-serif ${className}`}
      >

        {/* ── MAIN TRACK ── */}
        <div className="relative w-full max-w-5xl flex items-center">

          {/* Prev Button */}
          <motion.button
            onClick={prev}
            aria-label="Previous"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="w-11 h-11 rounded-full border-none bg-white/90 text-gray-900 flex items-center justify-center cursor-pointer shadow-md shrink-0 z-10 mx-2.5 transition-all duration-200 hover:bg-gray-900 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>

          {/* Gallery Track */}
          <div
            ref={trackRef}
            className="flex flex-1 overflow-x-auto gap-4 cursor-grab active:cursor-grabbing scroll-smooth [scroll-snap-type:x_mandatory] [scrollbar-width:thin] [scrollbar-color:#b5803a_#e8e0d0] [-webkit-overflow-scrolling:touch]"
            onScroll={onScroll}
            style={{ scrollbarColor: "#b5803a #e8e0d0" }}
          >
            {slides.map((slide, slideIdx) => (
              <motion.div
                key={slide.id}
                custom={slideIdx}
                variants={slideVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="flex-none w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-8px)] [scroll-snap-align:start] rounded-2xl overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.13)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group hover:shadow-[0_20px_56px_rgba(0,0,0,0.22)] h-[320px] bg-white flex items-center justify-center aspect-[3/4]"
              >
                {/* Slide Number Badge */}
                <span className="absolute top-3.5 left-3.5 z-10 bg-black/70 text-white text-[11px] font-mono tracking-[0.15em] px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {String(slideIdx + 1).padStart(2, "0")}
                </span>

                <img
                  src={slide.src}
                  alt={slide.alt ?? `Slide ${slideIdx + 1}`}
                  draggable={false}
                  loading="lazy"
                  className="w-auto h-auto max-w-full max-h-full object-contain block transition-all duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)] brightness-95 group-hover:brightness-100"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            onClick={next}
            aria-label="Next"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="w-11 h-11 rounded-full border-none bg-white/90 text-gray-900 flex items-center justify-center cursor-pointer shadow-md shrink-0 z-10 mx-2.5 transition-all duration-200 hover:bg-gray-900 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>
        </div>

        {/* ── THUMBNAIL STRIP ── */}
        <div className="flex gap-2.5 mt-7 items-center">
          <AnimatePresence mode="popLayout">
            {visibleThumbs.map((slide, i) => {
              const realIdx = thumbStart + i;
              const isActive = realIdx === current;
              return (
                <motion.button
                  key={slide.id}
                  custom={i}
                  variants={thumbVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goTo(realIdx)}
                  aria-label={`Go to slide ${realIdx + 1}`}
                  className={`rounded-[10px] overflow-hidden p-0 cursor-pointer transition-all duration-300 shrink-0 bg-transparent border-[2.5px] ${
                    isActive
                      ? "w-[54px] h-[54px] border-[#b5803a] shadow-[0_4px_16px_rgba(181,128,58,0.4)]"
                      : "w-[46px] h-[46px] border-transparent"
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    loading="lazy"
                    className={`w-full h-full object-contain block bg-black/5 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-65"
                    }`}
                  />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── PROGRESS BAR ── */}
        <motion.div
          variants={progressVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-[22px] flex items-center gap-3.5 w-full max-w-[520px]"
        >
          <span className="font-mono text-[13px] text-gray-400 tracking-[0.1em]">
            {String(current + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 h-[3px] bg-gray-300 rounded-sm overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#b5803a] to-[#e0a84e] rounded-sm"
              animate={{ width: progressWidth }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          <span className="font-mono text-[13px] text-gray-400 tracking-[0.1em]">
            {String(total).padStart(2, "0")}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── GallerySection (default export) ──────────────────────────────────────────
const GallerySection: React.FC = () => {
  const slides = localSlides.length ? localSlides : [];
  return <AdvancedSlider slides={slides} autoPlay={false} visibleCount={2} />;
};

export default GallerySection;