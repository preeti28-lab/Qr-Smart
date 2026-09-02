import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa6";
import { panelsData, CATEGORIES } from "../../constants/qrTypes";
import SectionHeading from "../../components/ui/SectionHeading";
import HoverButton from "../../components/buttons/HoverButton";
import { useNavigate } from "react-router-dom";
import faq from "../../assets/images/faq.png";

// ── AccordionItem (your existing component, inlined) ──────────────────────────
const AccordionItem = ({ question, answer, isActive, onToggle }) => (
  <div className="border-b border-gray-200 pb-4">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full text-left font-semibold text-lg"
    >
      {question}
      <span
        className={`transform transition-transform duration-300 flex-shrink-0 ml-4 ${
          isActive ? "rotate-180" : ""
        }`}
      >
        <FaChevronUp />
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
        <div className="text-gray-600 leading-relaxed">{answer}</div>
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

  const counts = Object.fromEntries(
    Object.values(CATEGORIES).map((cat) => [
      cat,
      panelsData.filter((p) => p.category === cat).length,
    ]),
  );

  const handleNavigate = () => {
    navigate("/faq");
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}

      <div className="max-w-4xl mx-auto px-4  pt-20 text-center">
        <SectionHeading title="Do not leave with doubt." />
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-5 pb-10">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categoryConfig.map(({ key, label, icon }) => {
            const count =
              key === "all" ? panelsData.length : (counts[key] ?? 0);
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`flex items-center gap-2 px-4 py-2.5  text-sm font-medium transition-all duration-200  ${
                  isActive
                    ? "bg-blue-50 border-b-[2px] text-blue-500 border-b-blue-600 "
                    : " text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600 border-b-[2px]"
                }`}
              >
                {/* {icon} */}
                {label}
                {/* <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span> */}
              </button>
            );
          })}
        </div>

        <div className=" overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              No questions found in this category.
            </div>
          ) : (
            filtered.slice(0, 8).map((panel, idx) => (
              <div key={panel.key} className="mb-4">
                <AccordionItem
                  question={panel.title}
                  answer={panel.values}
                  isActive={activeKey === panel.key}
                  onToggle={() => handleToggle(panel.key)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="">
        <div className="max-w-4xl mx-auto px-4 pb-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left — illustration */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={faq}
                alt="FAQ illustration"
                className="w-[60%] max-w-sm mx-auto"
              />
            </div>

            {/* Right — content */}
            <div className="w-full md:w-1/2 flex flex-col items-start gap-5">
              <SectionHeading
                title="Want to know more?"
                subHeading="Check our FAQs to find an answer to any questions you may have
                about our QR codes."
                align="left"
              />

              <HoverButton onClick={handleNavigate}>
                Browse all FAQs
              </HoverButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
