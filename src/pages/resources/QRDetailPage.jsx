import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import ScreenView from "../../layouts/ScreenView";
import HoverButton from "../../components/buttons/HoverButton";
import { qrOnData } from "../../constants/qrTypesOnData";

// ─── Benefits Accordion ───────────────────────────────────────────────────────
function BenefitItem({ title, desc, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-200"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
      >
        <span className="text-xl font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-blue-500" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-md text-gray-700 leading-relaxed max-w-3xl">
              {desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FaqItem({ question, answer, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-gray-200"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-[18px] font-medium text-black leading-snug group-hover:text-blue-600 transition-colors">
          {question}
        </span>
        <ChevronRight
          size={24}
          className={`text-gray-400 shrink-0 transition-transform duration-300 ${open ? "rotate-90 text-blue-500" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-md text-gray-700 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Sticky Tab Bar ───────────────────────────────────────────────────────────
const NAV_TABS = [
  { id: "benefits", label: "Benefits" },
  { id: "best-practices", label: "Best practices" },
  { id: "use-cases", label: "Use Cases" },
  { id: "faq", label: "FAQ" },
];

function StickyNav({ activeSection }) {
  const navigate = useNavigate();
  return (
    <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-0">
          {NAV_TABS.map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  const el = document.getElementById(tab.id);
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`relative px-5 py-4 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-gray-800"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function QROnDetailPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const data = qrOnData[category];
  const [activeSection, setActiveSection] = useState("benefits");

  // Reset scroll position whenever this page is opened or the category
  // changes — without this, navigating here from further down the homepage
  // (e.g. a card in the "QR Codes on..." carousel) leaves the page scrolled
  // to wherever the browser happened to carry the position over from.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_TABS.map((t) => t.id);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (!data) {
    return (
      <ScreenView>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">Page not found</p>
            <button
              onClick={() => navigate("/resources/qr-on")}
              className="text-blue-600 font-semibold text-sm hover:underline"
            >
              ← Back to all
            </button>
          </div>
        </div>
      </ScreenView>
    );
  }

  return (
    <>
      <ScreenView>
        <div className="min-h-screen bg-white">
          {/* ════════════════════════════════════════════════════════
              HERO — heading + breadcrumb + description
          ════════════════════════════════════════════════════════ */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xl sm:text-2xl font-bold text-[#1e88e5] leading-tight mb-2 tracking-tight"
            >
              QR CODES ON
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 leading-tight mb-4 tracking-tight"
            >
              {data.heading}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="text-gray-700 text-base leading-relaxed max-w-2xl mx-auto"
            >
              {data.description}
            </motion.p>
          </section>

          {/* ════════════════════════════════════════════════════════
              STICKY NAV TABS
          ════════════════════════════════════════════════════════ */}
          <StickyNav activeSection={activeSection} />
          <div
            style={{
              background:
                "linear-gradient(to bottom, #ffffff 0%, #fafafa 60%, #f3f4f6 100%)",
            }}
          >
            {/* ════════════════════════════════════════════════════════
            IMAGE COLLAGE — dynamic layout based on image count
            ════════════════════════════════════════════════════════ */}
            <section
              id="benefits"
              className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 mb-14 scroll-mt-16"
            >
              {(() => {
                const imgs = data.images || [];
                const rows = [];
                let i = 0;
                let delay = 0.08;

                const Card = ({
                  src,
                  wide = false,
                  delay,
                  btnText,
                  btnPath,
                }) => (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer"
                    style={{ aspectRatio: wide ? "21/8" : "16/9" }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-fit transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <HoverButton onClick={() => navigate(btnPath)}>
                        {btnText}
                      </HoverButton>
                    </div>
                  </motion.div>
                );

                while (i < imgs.length) {
                  // 2-col pair
                  const pair = imgs.slice(i, i + 2);
                  rows.push(
                    <div
                      key={`pair-${i}`}
                      className={`grid gap-3 mb-3 ${pair.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
                    >
                      {pair.map((src, j) => (
                        <Card
                          key={j}
                          src={src}
                          wide={pair.length === 1}
                          delay={delay + j * 0.08}
                          btnText="Explore"
                          btnPath={`/feature-${i + j}`}
                        />
                      ))}
                    </div>,
                  );
                  delay += 0.18;
                  i += 2;

                  // wide
                  if (i < imgs.length) {
                    rows.push(
                      <div key={`wide-${i}`} className="mb-3">
                        <Card
                          src={imgs[i]}
                          wide
                          delay={delay}
                          btnText="Create QR code"
                          btnPath="/create-qr"
                        />
                      </div>,
                    );
                    delay += 0.1;
                    i += 1;
                  }
                }

                return <>{rows}</>;
              })()}
            </section>

            {/* ════════════════════════════════════════════════════════
              BENEFITS — big heading + description + accordion list
          ════════════════════════════════════════════════════════ */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 leading-tight mb-4 tracking-tight max-w-3xl mx-auto"
                style={{ fontWeight: 600 }}
              >
                {data.benefitsHeading}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 }}
                className="text-gray-700 text-xl leading-relaxed max-w-3xl mb-8 mx-auto"
              >
                {data.benefitsDesc}
              </motion.p>

              <div className="max-w-3xl mx-auto">
                {data.benefits.map((b, i) => (
                  <BenefitItem
                    key={i}
                    title={b.title}
                    desc={b.desc}
                    index={i}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* ════════════════════════════════════════════════════════
            HOW TO CREATE — centered heading + 3 step cards
        ════════════════════════════════════════════════════════ */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-950 text-center mb-12 tracking-tight"
              style={{ fontWeight: 700 }}
            >
              {data.howToLabel}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {data.howToSteps.map((step, i) => {
                const stepImages = [
                  "https://qrfy.com/assets/step1-C7QONyrs.webp",
                  "https://qrfy.com/assets/step2-B7HdA2hz.webp",
                  "https://qrfy.com/assets/step3-qbziYviU.webp",
                ];

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-start"
                  >
                    {/* illustration card */}
                    <div
                      className="w-full rounded-2xl bg-[#f0f4ff] border border-blue-100 overflow-hidden mb-5"
                      style={{ height: "130px" }}
                    >
                      <img
                        src={stepImages[i]}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="text-[18px] font-bold text-gray-900 mb-1.5">
                      {step.title}
                    </p>
                    <p className="text-md text-gray-700 leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════
            BEST PRACTICES — heading + intro + 4 numbered cards
          ════════════════════════════════════════════════════════ */}
          <section
            id="best-practices"
            className="bg-gray-100 py-16 px-4 sm:px-6 mb-4 scroll-mt-16 mx-auto"
          >
            <div className="max-w-5xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 mb-4 tracking-tight leading-tight text-center"
              >
                {data.bestPracticesHeading}{" "}
                <span className="text-blue-600 block">
                  {data.bestPracticesHeadingBlue}
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 }}
                className="text-gray-700 text-xl leading-relaxed max-w-2xl mb-10 mx-auto text-center"
              >
                {data.bestPracticesIntro}
              </motion.p>

              <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                {data.bestPractices.map((bp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex flex-col gap-2 p-6 border border-gray-200 rounded-xl bg-white"
                  >
                    <p className="text-[20px] font-bold text-gray-900">
                      {bp.title}
                    </p>
                    <p className="text-md text-gray-600 leading-relaxed">
                      {bp.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-10">
                <h1 className="text-2xl text-black leading-relaxed max-w-xl mx-auto">
                  Learn more about optimizing your QR codes by visiting our{" "}
                  <Link to="/contact" className="text-blue-600 hover:underline">
                    Help Center
                  </Link>
                  .
                </h1>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════
              USE CASES / EXPLORE IN ACTION
              — heading + subtext + 2-col grid cards (img + text below)
          ════════════════════════════════════════════════════════ */}
          <section
            id="use-cases"
            className="max-w-5xl mx-auto px-4 sm:px-6 py-16 scroll-mt-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-950 mb-4 tracking-tight leading-tight text-center"
            >
              {data.exploreHeading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="text-gray-700 text-xl leading-relaxed max-w-3xl mb-10 mx-auto text-center"
            >
              {data.exploreSubheading}
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-20">
              {data.exploreCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group cursor-pointer"
                >
                  {/* image */}
                  <div
                    className="overflow-hidden rounded-2xl mb-4 bg-gray-100"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  {/* text below */}
                  <h4 className="text-xl font-bold text-gray-900 my-8">
                    {card.title}
                  </h4>
                  <p className="text-md text-gray-700 leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════
              FAQ — large heading + accordion rows with > arrow
          ════════════════════════════════════════════════════════ */}
          <section
            id="faq"
            className="bg-[#f8f9fb] py-16 px-4 sm:px-6 scroll-mt-16"
          >
            <div className="max-w-5xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-extrabold text-gray-950 mb-8 tracking-tight"
              >
                FAQ
              </motion.h2>

              <div className="">
                {data.faq.map((item, i) => (
                  <FaqItem
                    key={i}
                    question={item.question}
                    answer={item.answer}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════
            HAVE MORE QUESTIONS — illustration left, text+btn right
        ════════════════════════════════════════════════════════ */}
          <section className="py-20 px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-10 bg-[#f0f4ff] rounded-3xl p-10 border border-blue-100"
            >
              {/* Image */}
              <div className="shrink-0 w-44 h-44 rounded-2xl overflow-hidden">
                <img
                  src="https://qrfy.com/assets/faq-9oS5DvPT.webp"
                  alt="Have more questions"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* text + cta */}
              <div className="flex flex-col items-start">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
                  Support
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-950 mb-3 leading-tight">
                  Have more questions?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  For more information visit our help center. Our team is ready
                  to help you get started.
                </p>
                <HoverButton onClick={() => navigate("/help")}>
                  Visit us
                </HoverButton>
              </div>
            </motion.div>
          </section>
        </div>
      </ScreenView>
    </>
  );
}