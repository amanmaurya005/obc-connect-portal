// import React, { useState } from "react";
// import { motion } from "framer-motion"; // ✅ added animation import

// const Donations: React.FC = () => {

//   // State types
//   const [amount, setAmount] = useState<number>(0);
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [mobile, setMobile] = useState<string>("");

//   // Handle preset amount click
//   const handleAmountClick = (value: number) => {
//     setAmount(value);
//   };

//   // Handle donate click
//   const handleDonate = () => {
//     if (!amount || !name || !email || !mobile) {
//       alert("Please fill all fields");
//       return;
//     }

//     console.log({
//       amount,
//       name,
//       email,
//       mobile,
//     });

//     alert("Proceeding to payment...");
//   };

//   return (
//     <>
//       {/* ✅ animation wrapper added */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="min-h-screen p-8 max-w-2xl mx-auto"
//       >

//         {/* Heading */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="text-3xl font-bold"
//         >
//           दान करें
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="mt-2 text-gray-600"
//         >
//           आपका सहयोग समाज के विकास में मदद करता है।
//         </motion.p>

//         {/* Amount */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="mt-6"
//         >

//           <h2 className="font-semibold">Amount Select करें</h2>

//           <div className="flex gap-3 mt-2">

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleAmountClick(100)}
//               className="border px-4 py-2 rounded hover:bg-green-100"
//             >
//               ₹100
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleAmountClick(500)}
//               className="border px-4 py-2 rounded hover:bg-green-100"
//             >
//               ₹500
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => handleAmountClick(1000)}
//               className="border px-4 py-2 rounded hover:bg-green-100"
//             >
//               ₹1000
//             </motion.button>

//           </div>

//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="number"
//             placeholder="Custom Amount"
//             value={amount || ""}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setAmount(Number(e.target.value))
//             }
//             className="border p-2 rounded mt-3 w-full"
//           />

//         </motion.div>

//         {/* User Info */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="mt-6"
//         >

//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setName(e.target.value)
//             }
//             className="border p-2 rounded w-full mt-2"
//           />

//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setEmail(e.target.value)
//             }
//             className="border p-2 rounded w-full mt-2"
//           />

//           <motion.input
//             whileFocus={{ scale: 1.02 }}
//             type="tel"
//             placeholder="Mobile Number"
//             value={mobile}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setMobile(e.target.value)
//             }
//             className="border p-2 rounded w-full mt-2"
//           />

//         </motion.div>

//         {/* Donate Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleDonate}
//           className="bg-green-600 text-white px-6 py-3 rounded mt-6 w-full hover:bg-green-700"
//         >
//           Donate Now
//         </motion.button>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-sm text-gray-500 mt-3"
//         >
//           Secure payment powered by Razorpay
//         </motion.p>

//       </motion.div>
//     </>
//   );
// };

// export default Donations;










import React, { useState } from "react";
import {
  BookOpen,
  HeartPulse,
  Scale,
  Handshake,
  Lock,
  Trophy,
  FileText,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  ThumbsUp,
  ShieldCheck,
} from "lucide-react";

// ── Validation Rules ──────────────────────────────────────────────────────────
const validationRules = {
  name: {
    regex: /^[a-zA-ZÀ-ÿ\u0900-\u097F\s]{2,60}$/,
    message: "नाम कम से कम 2 अक्षर का होना चाहिए",
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "कृपया मान्य ईमेल पता दर्ज करें",
  },
  mobile: {
    regex: /^\d{10}$/,
    message: "मोबाइल नंबर 10 अंकों का होना चाहिए",
  },
};

const presetAmounts = [100, 251, 501, 1001, 2100, 5100];

const causes = [
  { id: "education", label: "शिक्षा सहायता", Icon: BookOpen },
  { id: "health", label: "स्वास्थ्य सेवा", Icon: HeartPulse },
  { id: "legal", label: "कानूनी सहायता", Icon: Scale },
  { id: "general", label: "सामान्य कोष", Icon: Handshake },
];

// ── Helper Components ─────────────────────────────────────────────────────────
const R = () => <span className="text-orange-500">*</span>;

const ErrorText = ({ message, isValid }: { message?: string; isValid?: boolean }) => {
  if (message)
    return (
      <div className="flex items-center gap-1 text-red-500 text-xs mt-1 font-medium">
        <XCircle size={13} />
        <span>{message}</span>
      </div>
    );
  if (isValid)
    return (
      <div className="flex items-center gap-1 text-green-600 text-xs mt-1 font-medium">
        <CheckCircle size={13} />
        <span>सही है</span>
      </div>
    );
  return null;
};

// ── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  amount: number | string;
  customAmount: string;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  cause: string;
  anonymous: boolean;
  message: string;
}

// ── Main Component ────────────────────────────────────────────────────────────
const Donations = () => {
  const [form, setForm] = useState<FormData>({
    amount: 0,
    customAmount: "",
    name: "",
    email: "",
    mobile: "",
    pan: "",
    cause: "general",
    anonymous: false,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const effectiveAmount =
    form.amount === "custom"
      ? Number(form.customAmount)
      : Number(form.amount);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validateField = (name: string, value: string): string => {
    if (name === "name") {
      if (!value.trim()) return "यह क्षेत्र आवश्यक है";
      if (!validationRules.name.regex.test(value))
        return validationRules.name.message;
    }
    if (name === "email") {
      if (!value.trim()) return "यह क्षेत्र आवश्यक है";
      if (!validationRules.email.regex.test(value))
        return validationRules.email.message;
    }
    if (name === "mobile") {
      if (!value.trim()) return "यह क्षेत्र आवश्यक है";
      const cleaned = value.replace(/\D/g, "");
      if (!validationRules.mobile.regex.test(cleaned))
        return validationRules.mobile.message;
    }
    if (name === "pan" && value.trim()) {
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase()))
        return "मान्य PAN दर्ज करें (ABCDE1234F)";
    }
    return "";
  };

  const isFieldValid = (name: string, value: string) => {
    if (!value.trim()) return false;
    return validateField(name, value) === "";
  };

  const validateCustomAmount = (value: string): string => {
    if (!value) return "";
    const amount = Number(value);
    if (amount > 50000) return "दान की अधिकतम राशि ₹50,000 है";
    return "";
  };

  const isStep1Valid = () => effectiveAmount >= 1 && !validateCustomAmount(form.customAmount);

  const isStep2Valid = () => {
    if (form.anonymous) return true;
    return (
      isFieldValid("name", form.name) &&
      isFieldValid("email", form.email) &&
      isFieldValid("mobile", form.mobile)
    );
  };

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    let sanitized = value;
    if (name === "mobile") sanitized = value.replace(/\D/g, "").slice(0, 10);
    if (name === "pan") sanitized = value.toUpperCase().slice(0, 10);
    if (name === "customAmount") sanitized = value.replace(/\D/g, "");

    const newVal = type === "checkbox" ? checked : sanitized;
    setForm((f) => ({ ...f, [name]: newVal }));

    if (name !== "customAmount" && name !== "anonymous" && name !== "message") {
      const err = validateField(name, sanitized);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.anonymous) {
      newErrors.name = validateField("name", form.name);
      newErrors.email = validateField("email", form.email);
      newErrors.mobile = validateField("mobile", form.mobile);
    }
    if (form.pan) newErrors.pan = validateField("pan", form.pan);
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some(Boolean);
    if (!hasErrors && effectiveAmount >= 1) setSubmitted(true);
  };

  const selectedCause = causes.find((c) => c.id === form.cause);

  // ── Success Screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4 py-12 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center border border-[#e8dfd0]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0f1d3a] mb-2 flex items-center justify-center gap-2">
            धन्यवाद! <ThumbsUp size={22} className="text-[#e87722]" />
          </h2>
          <p className="text-gray-500 mb-2 text-sm">आपका दान सफलतापूर्वक प्राप्त हुआ।</p>

          <div className="bg-[#f5f0e8] rounded-xl p-5 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">दान राशि</span>
              <span className="font-bold text-[#0f1d3a]">₹{effectiveAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-500">उद्देश्य</span>
              <span className="font-semibold text-[#0f1d3a] flex items-center gap-1">
                {selectedCause && <selectedCause.Icon size={14} />}
                {selectedCause?.label}
              </span>
            </div>
            {!form.anonymous && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">नाम</span>
                <span className="font-semibold text-[#0f1d3a]">{form.name}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mb-6">
            भुगतान की पुष्टि आपके ईमेल पर भेजी जाएगी।
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setForm({
                amount: 0, customAmount: "", name: "", email: "",
                mobile: "", pan: "", cause: "general", anonymous: false, message: "",
              });
              setErrors({});
            }}
            className="w-full bg-[#0f1d3a] hover:bg-[#162448] text-white rounded-xl py-3 font-bold transition"
          >
            नया दान करें
          </button>
        </div>
      </div>
    );
  }

  // ── Main Form ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f5f0e8] font-sans">

      {/* Hero */}
      <div className="bg-gradient-to-tr from-[#0f1d3a] via-[#1e3160] to-[#162448] py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#f4a92a] opacity-10 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#f4a92a] opacity-5 pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-block bg-[#f4a92a]/20 border border-[#f4a92a]/40 text-[#f4c96a] rounded-full px-4 py-1 text-xs font-extrabold tracking-wide mb-4">ओबीसी महासभा</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#f4a92a] mb-1">दान करें</h1>
          <p className="text-[#94a8c8] text-sm max-w-md mx-auto mt-2 leading-relaxed">
            आपका सहयोग समाज के विकास में मदद करता है। हर दान महत्वपूर्ण है।
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-10">

        {/* Progress Steps */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= 1 ? "bg-[#e87722] border-[#e87722] text-white" : "border-gray-300 text-gray-400"}`}>1</div>
            <span className={`text-sm font-semibold ${step >= 1 ? "text-[#0f1d3a]" : "text-gray-400"}`}>राशि चुनें</span>
          </div>
          <div className={`flex-1 h-0.5 rounded transition-all ${step >= 2 ? "bg-[#e87722]" : "bg-gray-200"}`} />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= 2 ? "bg-[#e87722] border-[#e87722] text-white" : "border-gray-300 text-gray-400"}`}>2</div>
            <span className={`text-sm font-semibold ${step >= 2 ? "text-[#0f1d3a]" : "text-gray-400"}`}>विवरण भरें</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-lg border border-[#e8dfd0] overflow-hidden">

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <div className="p-6 md:p-8">

                {/* Cause Selection */}
                <div className="mb-6">
                  <label className="text-sm font-bold text-[#0f2056] mb-3 block">उद्देश्य चुनें <R /></label>
                  <div className="grid grid-cols-2 gap-3">
                    {causes.map((c) => (
                      <label
                        key={c.id}
                        className={`flex items-center gap-3 border-2 rounded-xl p-3 cursor-pointer select-none transition-all ${
                          form.cause === c.id
                            ? "border-[#e87722] bg-[#fff7f0]"
                            : "border-gray-200 hover:border-[#e87722]/50 hover:bg-[#fff7f0]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="cause"
                          value={c.id}
                          checked={form.cause === c.id}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <c.Icon
                          size={20}
                          className={form.cause === c.id ? "text-[#e87722]" : "text-[#0f2056]"}
                        />
                        <span className={`text-sm font-semibold ${form.cause === c.id ? "text-[#e87722]" : "text-[#0f2056]"}`}>
                          {c.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="text-sm font-bold text-[#0f2056] mb-3 block">दान राशि चुनें <R /></label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {presetAmounts.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, amount: val, customAmount: "" }))}
                        className={`py-3 rounded-xl font-bold text-sm border-2 transition-all ${
                          form.amount === val
                            ? "border-[#e87722] bg-[#e87722] text-white shadow-md"
                            : "border-gray-200 bg-white text-[#0f2056] hover:border-[#e87722] hover:text-[#e87722]"
                        }`}
                      >
                        ₹{val.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                    <input
                      type="text"
                      name="customAmount"
                      placeholder="अन्य राशि दर्ज करें (अधिकतम ₹50,000)"
                      value={form.amount === "custom" ? form.customAmount : ""}
                      onFocus={() => setForm((f) => ({ ...f, amount: "custom" }))}
                      onChange={handleChange}
                      className={`w-full border-2 rounded-xl pl-8 pr-4 py-3 text-sm text-[#1a1a2e] transition outline-none ${
                        validateCustomAmount(form.customAmount)
                          ? "border-red-400 focus:ring-4 focus:ring-red-100"
                          : form.amount === "custom"
                          ? "border-[#e87722] ring-4 ring-[#e87722]/20"
                          : "border-gray-200 focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                      }`}
                    />
                  </div>
                  {validateCustomAmount(form.customAmount) && (
                    <div className="flex items-center gap-1 text-red-500 text-xs mt-1 font-medium">
                      <XCircle size={13} />
                      <span>{validateCustomAmount(form.customAmount)}</span>
                    </div>
                  )}
                  {effectiveAmount > 0 && form.amount === "custom" && !validateCustomAmount(form.customAmount) && (
                    <div className="mt-3 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 flex items-center justify-between">
                      <span className="text-sm text-green-700">चयनित राशि</span>
                      <span className="text-lg font-extrabold text-green-700">₹{effectiveAmount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  disabled={!isStep1Valid()}
                  onClick={() => setStep(2)}
                  className={`w-full rounded-xl py-4 text-base font-extrabold transition-all flex items-center justify-center gap-2 ${
                    isStep1Valid()
                      ? "bg-[#e87722] hover:bg-[#d46a18] text-white shadow-md hover:shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  आगे बढ़ें <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <div className="p-6 md:p-8">

                {/* Selected amount banner */}
                <div className="bg-[#0f1d3a] rounded-xl px-4 py-3 flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[#94a8c8] text-xs">दान राशि</p>
                    <p className="text-[#f4a92a] text-xl font-extrabold">₹{effectiveAmount.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#94a8c8] text-xs">उद्देश्य</p>
                    <p className="text-white text-sm font-semibold flex items-center justify-end gap-1">
                      {selectedCause && <selectedCause.Icon size={14} />}
                      {selectedCause?.label}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-[#f4a92a] underline font-semibold"
                  >
                    बदलें
                  </button>
                </div>

                {/* Anonymous toggle */}
                <label className="flex items-center gap-3 mb-6 cursor-pointer group">
                  <div className={`relative w-11 h-6 rounded-full transition-all ${form.anonymous ? "bg-[#e87722]" : "bg-gray-200"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.anonymous ? "left-6" : "left-1"}`} />
                    <input
                      type="checkbox"
                      name="anonymous"
                      checked={form.anonymous}
                      onChange={handleChange}
                      className="sr-only"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f2056]">गुमनाम दान करें</p>
                    <p className="text-xs text-gray-400">आपकी जानकारी सार्वजनिक नहीं होगी</p>
                  </div>
                </label>

                {/* Personal Info */}
                {!form.anonymous && (
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="text-sm font-semibold text-[#0f2056] mb-1 block">पूरा नाम <R /></label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="आपका पूरा नाम"
                        className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition ${
                          errors.name
                            ? "border-red-400 focus:ring-4 focus:ring-red-100"
                            : isFieldValid("name", form.name)
                            ? "border-green-400 focus:ring-4 focus:ring-green-100"
                            : "border-gray-200 focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                        }`}
                      />
                      <ErrorText message={errors.name} isValid={isFieldValid("name", form.name)} />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-[#0f2056] mb-1 block">ईमेल <R /></label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="आपका@ईमेल.कॉम"
                        className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition ${
                          errors.email
                            ? "border-red-400 focus:ring-4 focus:ring-red-100"
                            : isFieldValid("email", form.email)
                            ? "border-green-400 focus:ring-4 focus:ring-green-100"
                            : "border-gray-200 focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                        }`}
                      />
                      <ErrorText message={errors.email} isValid={isFieldValid("email", form.email)} />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-[#0f2056] mb-1 block">मोबाइल नंबर <R /></label>
                      <input
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={10}
                        placeholder="10 अंकों का मोबाइल नंबर"
                        className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition ${
                          errors.mobile
                            ? "border-red-400 focus:ring-4 focus:ring-red-100"
                            : isFieldValid("mobile", form.mobile)
                            ? "border-green-400 focus:ring-4 focus:ring-green-100"
                            : "border-gray-200 focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                        }`}
                      />
                      <ErrorText message={errors.mobile} isValid={isFieldValid("mobile", form.mobile)} />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-[#0f2056] mb-1 block">
                        PAN नंबर <span className="text-gray-400 font-normal text-xs">(वैकल्पिक — 80G रसीद के लिए)</span>
                      </label>
                      <input
                        name="pan"
                        value={form.pan}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={10}
                        placeholder="ABCDE1234F"
                        className={`w-full border-2 rounded-xl px-4 py-3 text-sm outline-none transition font-mono tracking-widest ${
                          errors.pan
                            ? "border-red-400 focus:ring-4 focus:ring-red-100"
                            : isFieldValid("pan", form.pan)
                            ? "border-green-400 focus:ring-4 focus:ring-green-100"
                            : "border-gray-200 focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20"
                        }`}
                      />
                      <ErrorText message={errors.pan} isValid={isFieldValid("pan", form.pan)} />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-[#0f2056] mb-1 block">
                        संदेश <span className="text-gray-400 font-normal text-xs">(वैकल्पिक)</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="कोई संदेश हो तो लिखें..."
                        rows={3}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#e87722] focus:ring-4 focus:ring-[#e87722]/20 resize-none transition"
                      />
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3 rounded-xl border-2 border-gray-200 text-[#0f2056] font-semibold text-sm hover:border-[#e87722] hover:text-[#e87722] transition flex items-center gap-1"
                  >
                    <ChevronLeft size={16} /> वापस
                  </button>
                  <button
                    type="submit"
                    disabled={!isStep2Valid()}
                    className={`flex-1 rounded-xl py-3 font-extrabold text-base transition-all flex items-center justify-center gap-2 ${
                      isStep2Valid()
                        ? "bg-[#e87722] hover:bg-[#d46a18] text-white shadow-md hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <CreditCard size={18} /> Donate Now — ₹{effectiveAmount.toLocaleString("en-IN")}
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-3 text-center flex items-center justify-center gap-1">
                  <Lock size={12} /> Secure payment powered by Razorpay
                </p>
              </div>
            )}
          </div>
        </form>

        {/* Trust badges */}
        <div className="mt-6 flex justify-center gap-6 flex-wrap">
          {[
            { Icon: ShieldCheck, label: "SSL Secured" },
            { Icon: Trophy, label: "NGO Certified" },
            
          ].map(({ Icon, label }) => (
            <span key={label} className="text-xs text-gray-500 font-medium flex items-center gap-1">
              <Icon size={13} className="text-[#e87722]" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donations;