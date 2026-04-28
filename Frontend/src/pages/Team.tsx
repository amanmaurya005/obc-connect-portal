import { motion } from "framer-motion";
import {
  Award,
  Check,
  ChevronDown,
  HeartHandshake,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import poster1 from "@/assets/poster_1.jpeg";
import poster2 from "@/assets/poster_2.jpeg";
import teamImg1 from "@/assets/gellery7.jpeg";
import teamImg2 from "@/assets/gellery12.jpeg";
import teamImg3 from "@/assets/gellery18.jpeg";

type TeamMember = {
  name: string;
  role: string;
  state: string;
  city: string;
  image: string;
  highlight: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "श्री धर्मेन्द्र चौधरी",
    role: "राष्ट्रीय अध्यक्ष",
    state: "राजस्थान",
    city: "जयपुर",
    image: poster1,
    highlight: "संगठन विस्तार और सामाजिक न्याय अभियानों का नेतृत्व।",
  },
  {
    name: "श्रीमती रेखा चौधरी",
    role: "महिला प्रकोष्ठ संयोजक",
    state: "राजस्थान",
    city: "सीकर",
    image: poster2,
    highlight: "महिला सशक्तिकरण और परिवार सहायता कार्यक्रमों का संचालन।",
  },
  {
    name: "श्री विकास यादव",
    role: "युवा मोर्चा प्रमुख",
    state: "उत्तर प्रदेश",
    city: "लखनऊ",
    image: teamImg1,
    highlight: "युवा सदस्यता, प्रशिक्षण और जनसंपर्क अभियान।",
  },
  {
    name: "श्री सुरेश प्रजापत",
    role: "संगठन मंत्री",
    state: "मध्य प्रदेश",
    city: "भोपाल",
    image: teamImg2,
    highlight: "जिला इकाइयों के समन्वय और विस्तार की जिम्मेदारी।",
  },
  {
    name: "श्रीमती कविता मौर्य",
    role: "शिक्षा प्रकोष्ठ प्रमुख",
    state: "बिहार",
    city: "पटना",
    image: teamImg3,
    highlight: "छात्रवृत्ति, मार्गदर्शन और शिक्षा सहयोग पहल।",
  },
];

const teamStats = [
  { value: "50,000+", label: "सक्रिय सदस्य" },
  { value: "500+", label: "जिला इकाइयाँ" },
  { value: "28+", label: "राज्यों में पहुंच" },
];

type DropdownProps = {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  disabled?: boolean;
};

function SearchableDropdown({
  label,
  placeholder,
  value,
  options,
  onSelect,
  disabled = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      const node = ref.current;
      if (!node) return;
      if (event.target instanceof Node && !node.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
      setSearch("");
    }
  }, [disabled]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative flex flex-col">
      <label className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setOpen((current) => !current);
          setSearch("");
        }}
        className={`flex h-14 w-full items-center justify-between rounded-2xl border px-4 text-left text-sm transition ${
          disabled
            ? "cursor-not-allowed border-border bg-muted text-muted-foreground"
            : open
              ? "border-primary bg-background text-foreground shadow-[0_0_0_3px_rgba(249,115,22,0.12)]"
              : "border-border bg-background text-foreground"
        }`}
      >
        <span className={value ? "truncate" : "truncate text-muted-foreground"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-primary transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-xl">
          <div className="border-b border-primary/10 p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`${label} खोजें...`}
                className="h-11 w-full rounded-xl border border-primary/10 bg-background pl-11 pr-3 text-sm outline-none transition focus:border-primary"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-4 text-sm text-muted-foreground">
                कोई परिणाम नहीं मिला
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onSelect(option);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="flex w-full items-center gap-2 border-b border-primary/5 px-4 py-3 text-left text-sm text-foreground transition hover:bg-saffron-light/40"
                >
                  {option === value ? (
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                  ) : (
                    <span className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span>{option}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => (
  <motion.article
    key={`${member.name}-${member.city}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: index * 0.05 }}
    className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
  >
    <div className="h-40 bg-saffron-light/30">
      <img
        src={member.image}
        alt={member.name}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="space-y-2 px-4 py-3">
      <div>
        <h2 className="text-base font-heading font-bold text-foreground">
          {member.name}
        </h2>
        <p className="mt-1 text-sm font-semibold text-primary">{member.role}</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <MapPin className="h-4 w-4 text-secondary" />
        <span>
          {member.city}, {member.state}
        </span>
      </div>

      <p className="text-xs leading-5 text-muted-foreground">{member.highlight}</p>
    </div>
  </motion.article>
);

const Team = () => {
  const [stateQuery, setStateQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const isStateSelected = stateQuery.trim().length > 0;

  const rajasthanMembers = useMemo(
    () => teamMembers.filter((member) => member.state === "राजस्थान"),
    []
  );

  const filteredMembers = useMemo(() => {
    if (!stateQuery || !cityQuery) return [];

    return teamMembers.filter((member) => {
      const matchesState = member.state === stateQuery;
      const matchesCity = member.city === cityQuery;

      return matchesState && matchesCity;
    });
  }, [cityQuery, stateQuery]);

  const stateOptions = useMemo(
    () => [...new Set(teamMembers.map((member) => member.state))].sort(),
    []
  );

  const cityOptions = useMemo(() => {
    if (!stateQuery) return [];

    return [
      ...new Set(
        teamMembers
          .filter((member) => member.state === stateQuery)
          .map((member) => member.city)
      ),
    ].sort();
  }, [stateQuery]);

  const showSearchResults = Boolean(stateQuery && cityQuery);

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-cream-pattern py-14 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-saffron-light px-4 py-1.5 text-sm font-semibold text-primary">
              <Users className="h-4 w-4" />
              टीम
            </span>
            <h1 className="mt-5 text-3xl font-heading font-bold text-foreground md:text-5xl">
              हमारे संगठन की <span className="text-primary">समर्पित टीम</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              राज्य और शहर के अनुसार सदस्य खोजें, और सबसे पहले राजस्थान टीम को देखें।
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
                राजस्थान सदस्य
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                पहले राजस्थान के सदस्यों और उनकी जानकारी देखें।
              </p>
            </div>
            <div className="rounded-full bg-saffron-light px-4 py-2 text-sm font-semibold text-primary">
              {rajasthanMembers.length} सदस्य
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {rajasthanMembers.map((member, index) => (
              <TeamCard
                key={`${member.name}-${member.city}-rajasthan`}
                member={member}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-14">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-india-light text-secondary">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground md:text-2xl">
                  राज्य और शहर से सदस्य खोजें
                </h2>
                <p className="text-sm text-muted-foreground">
                  पहले राज्य चुनें, फिर शहर चुनने पर सदस्य दिखेंगे।
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SearchableDropdown
                label="राज्य"
                placeholder="राज्य चुनें"
                value={stateQuery}
                options={stateOptions}
                onSelect={(value) => {
                  setStateQuery(value);
                  setCityQuery("");
                }}
              />

              <SearchableDropdown
                label="शहर"
                placeholder={isStateSelected ? "शहर चुनें" : "पहले राज्य चुनें"}
                value={cityQuery}
                options={cityOptions}
                onSelect={setCityQuery}
                disabled={!isStateSelected}
              />
            </div>
          </div>

          {showSearchResults && (
            <>
              <div className="mt-8 flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground md:text-3xl">
                    खोज परिणाम
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    चुने गए राज्य और शहर के अनुसार सदस्य दिख रहे हैं।
                  </p>
                </div>
                <div className="rounded-full bg-green-india-light px-4 py-2 text-sm font-semibold text-secondary">
                  {filteredMembers.length} सदस्य मिले
                </div>
              </div>

              {filteredMembers.length > 0 ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {filteredMembers.map((member, index) => (
                    <TeamCard
                      key={`${member.name}-${member.city}-filtered`}
                      member={member}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center text-muted-foreground">
                  इस चयन के लिए कोई सदस्य नहीं मिला।
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="pt-6 pb-16 md:pt-8 md:pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-3xl bg-gradient-saffron px-6 py-10 text-primary-foreground md:px-10"
          >
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
                  <HeartHandshake className="h-4 w-4" />
                  साथ मिलकर आगे बढ़ें
                </div>
                <h2 className="text-3xl font-heading font-bold md:text-4xl">
                  संगठन से जुड़कर टीम का हिस्सा बनें
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/90">
                  सदस्यता, सेवा और समाज के लिए काम करने की भावना रखने वाले सभी
                  साथियों का स्वागत है।
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl bg-white/12 px-5 py-5">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5" />
                    <span className="font-semibold">सेवा और नेतृत्व</span>
                  </div>
                  <p className="mt-2 text-sm text-primary-foreground/85">
                    जिला, प्रदेश और राष्ट्रीय स्तर पर योगदान के अवसर
                  </p>
                </div>

                <Link
                  to="/member-form"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-primary transition-transform hover:scale-[1.02]"
                >
                  सदस्य बनें
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Team;
