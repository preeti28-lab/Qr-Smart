import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa6";
import { panelsData, CATEGORIES } from "../../constants/qrTypes";
import SectionHeading from "../../components/ui/SectionHeading";
import { useNavigate } from "react-router-dom";
import faq from "../../assets/images/faq.png";

// ── AccordionItem (your existing component, inlined) ──────────────────────────
const AccordionItem = ({ question, answer, isActive, onToggle }) => (
  <div className="px-5 md:px-6 py-4">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full text-left font-medium text-[15px] text-slate-800"
    >
      {question}
      <span
        className={`text-slate-400 transform transition-transform duration-300 flex-shrink-0 ml-4 ${
          isActive ? "rotate-180" : ""
        }`}
      >
        <FaChevronUp size={13} />
      </span>
    </button>

    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isActive
          ? "grid-rows-[1fr] opacity-100 mt-3"
          : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="text-sm text-slate-500 leading-relaxed">{answer}</div>
      </div>
    </div>
  </div>
);

// ── Category config (label + icon) ────────────────────────────────────────────
const categoryConfig = [
  {
    key: CATEGORIES.BASIC,
    label: "Basic Info",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: CATEGORIES.DESIGN,
    label: "Design & Creation",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a4 4 0 01-1.414.93l-3 1 1-3a4 4 0 01.93-1.414z"
        />
      </svg>
    ),
  },
  {
    key: CATEGORIES.SCAN,
    label: "Scan & Print",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v1m0 14v1M4 12h1m14 0h1M6.343 6.343l.707.707M16.95 16.95l.707.707M6.343 17.657l.707-.707M16.95 7.05l.707-.707"
        />
        <circle cx="12" cy="12" r="3" strokeWidth={2} />
      </svg>
    ),
  },
  {
    key: CATEGORIES.PLANS,
    label: "Plans & Billing",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
];

// ── FAQ Page ───────────────────────────────────────────────────────────────────
const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("Basic Information");
  const [activeKey, setActiveKey] = useState(null);
  const navigate = useNavigate();

  const filtered =
    activeCategory === "all"
      ? panelsData
      : panelsData.filter((p) => p.category === activeCategory);

  const handleToggle = (key) =>
    setActiveKey((prev) => (prev === key ? null : key));

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveKey(null);
  };

  const handleNavigate = () => {
    navigate("/faq");
  };

  return (
    <div className="bg-white relative">
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-10">
        <div className="grid md:grid-cols-[minmax(0,38%)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
          {/* ── LEFT — heading, category tabs, illustration ── */}
          <div className="flex flex-col">
            <SectionHeading
              title="Do not leave with doubt."
              highlight="with doubt."
              titleClassName="text-3xl md:text-[34px] leading-tight"
              align="left"
            />

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 mt-4 border-b border-slate-200">
              {categoryConfig.map(({ key, label }) => {
                const isActive = activeCategory === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleCategoryChange(key)}
                    className={`px-2.5 py-2.5 text-[13px] font-medium transition-all duration-200 border-b-2 -mb-px ${
                      isActive
                        ? "text-blue-600 border-blue-600 font-semibold"
                        : "text-slate-500 border-transparent hover:text-blue-600 hover:border-blue-200"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Illustration */}
            <img
              src={faq}
              alt="FAQ illustration"
              className="w-[75%] max-w-xs mt-10"
            />
          </div>

          {/* ── RIGHT — question list ── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.3)] divide-y divide-slate-100 overflow-hidden">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                No questions found in this category.
              </div>
            ) : (
              filtered.slice(0, 8).map((panel) => (
                <AccordionItem
                  key={panel.key}
                  question={panel.title}
                  answer={panel.values}
                  isActive={activeKey === panel.key}
                  onToggle={() => handleToggle(panel.key)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom banner ── */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-2xl bg-[#eef4ff] px-6 md:px-10 py-8 flex flex-col md:flex-row items-center gap-6">
          {/* Icon */}
          <div className="w-14 h-14 flex-shrink-0 rounded-full rounded-bl-md bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            ?
          </div>

          {/* Copy */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Want to know more?
            </h3>
            <p className="text-sm text-slate-500 max-w-md">
              Check our FAQs to find an answer to any questions you may have
              about our QR codes.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleNavigate}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 active:scale-95 shadow-md shadow-blue-200"
          >
            Browse all FAQs
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3.5 h-3.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
