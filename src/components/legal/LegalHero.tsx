import { Calendar } from "lucide-react";

interface LegalHeroProps {
  titleHindi: string;
  titleEnglish: string;
  lastUpdated: string;
}

const LegalHero = ({ titleHindi, titleEnglish, lastUpdated }: LegalHeroProps) => {
  return (
    <div className="relative overflow-hidden">
      {/* Tricolor bar */}
      <div className="h-1.5 gradient-tricolor-bar" />

      <div className="bg-orange-400 gradient-saffron-dark chakra-watermark py-16 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <p className="text-primary-foreground/80 text-sm font-medium tracking-widest uppercase mb-3">
            अखिल भारतीय संयुक्त ओ.बी.सी. महासभा
          </p>
          <h1 className="font-hindi text-4xl md:text-5xl font-bold text-primary-foreground mb-3">
            {titleHindi}
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl font-medium">
            {titleEnglish}
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-primary-foreground/70 text-sm">
            <Calendar size={16} />
            <span>अंतिम अपडेट: {lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Bottom tricolor bar */}
      <div className="h-1 gradient-tricolor-bar" />
    </div>
  );
};

export default LegalHero;
