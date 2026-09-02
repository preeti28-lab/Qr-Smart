import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiPlus,
  FiMinus,
  FiTag,
  FiCreditCard,
  FiRefreshCw,
  FiClock,
  FiHelpCircle,
  FiHeadphones,
  FiArrowRight,
  FiArrowDown,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import { MdQrCode2, MdQrCodeScanner } from "react-icons/md";

const PAGE_SIZE = 12;

// Har FAQ ka category - sirf grouping ke liye, content untouched
const CATEGORY_BY_KEY = {
  1: "QR Codes",
  2: "QR Codes",
  3: "QR Codes",
  4: "QR Codes",
  5: "QR Codes",
  6: "QR Codes",
  7: "QR Codes",
  8: "QR Codes",
  9: "QR Codes",
  10: "QR Codes",
  11: "QR Codes",
  12: "QR Codes",
  13: "QR Codes",
  14: "QR Codes",
  15: "QR Codes",
  16: "Plans & Pricing",
  17: "Billing & Payments",
  18: "Billing & Payments",
  19: "Billing & Payments",
  20: "Plans & Pricing",
  21: "Subscriptions",
  22: "Subscriptions",
  23: "Subscriptions",
  24: "Subscriptions",
  25: "Billing & Payments",
  26: "Trial & Access",
  27: "Trial & Access",
  28: "Trial & Access",
  29: "Trial & Access",
  30: "Trial & Access",
  31: "General",
  32: "General",
  33: "Trial & Access",
  34: "Trial & Access",
  35: "QR Codes",
};

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: MdQrCode2 },
  { id: "QR Codes", label: "QR Codes", icon: MdQrCodeScanner },
  { id: "Plans & Pricing", label: "Plans & Pricing", icon: FiTag },
  { id: "Billing & Payments", label: "Billing & Payments", icon: FiCreditCard },
  { id: "Subscriptions", label: "Subscriptions", icon: FiRefreshCw },
  { id: "Trial & Access", label: "Trial & Access", icon: FiClock },
  { id: "General", label: "General", icon: FiHelpCircle },
];

const getCategory = (panel) => CATEGORY_BY_KEY[panel.key] || "General";

// ─── Accordion Item ───────────────────────────────────────────────────────────
const FaqItem = ({ panel, isOpen, onToggle }) => (
  <div
    className={`rounded-xl border transition-colors ${
      isOpen
        ? "border-blue-200 bg-blue-50/50 shadow-[0_10px_28px_-22px_rgba(37,99,235,0.7)]"
        : "border-slate-200 bg-white hover:border-slate-300"
    }`}
  >
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={onToggle}
      className="flex w-full items-start gap-3 px-4 py-4 text-left"
    >
      <span
        className={`mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
          isOpen
            ? "bg-blue-600 text-white"
            : "border border-slate-200 bg-white text-slate-400"
        }`}
      >
        {isOpen ? <FiMinus size={13} /> : <FiPlus size={13} />}
      </span>

      <span
        className={`flex-1 text-[14px] font-semibold leading-snug ${
          isOpen ? "text-blue-800" : "text-slate-800"
        }`}
      >
        {panel.title}
      </span>

      <FiChevronDown
        size={17}
        className={`mt-0.5 shrink-0 transition-transform duration-200 ${
          isOpen ? "rotate-180 text-blue-600" : "text-slate-400"
        }`}
      />
    </button>

    {isOpen && (
      <div className="px-4 pb-5 pl-[52px]">
        <div className="flex flex-col gap-y-1 text-[13.5px] leading-relaxed text-slate-600 [&_a]:text-blue-600 [&_a:hover]:underline [&_h3]:mt-3 [&_h3]:text-[15px] [&_h3]:font-bold [&_h3]:text-slate-800 [&_h4]:font-bold [&_h4]:text-slate-800 [&_h5]:font-semibold [&_h5]:text-slate-800 [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_strong]:text-slate-700 [&_ul]:list-disc [&_ul]:pl-5">
          {panel.values.map((value, idx) => (
            <div key={`${panel.key}-${idx}`}>{value}</div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// ─── Main Browser ─────────────────────────────────────────────────────────────
const FaqBrowser = ({ panels = [], query = "" }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openKeys, setOpenKeys] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const counts = useMemo(() => {
    const map = { all: panels.length };
    panels.forEach((panel) => {
      const category = getCategory(panel);
      map[category] = (map[category] || 0) + 1;
    });
    return map;
  }, [panels]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return panels.filter((panel) => {
      const inCategory =
        activeCategory === "all" || getCategory(panel) === activeCategory;
      const matches = !term || panel.title.toLowerCase().includes(term);
      return inCategory && matches;
    });
  }, [panels, activeCategory, query]);

  const visible = filtered.slice(0, visibleCount);
  const allExpanded = visible.length > 0 && openKeys.length >= visible.length;

  const selectCategory = (id) => {
    setActiveCategory(id);
    setVisibleCount(PAGE_SIZE);
    setOpenKeys([]);
  };

  const toggleItem = (key) =>
    setOpenKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  const toggleAll = () =>
    setOpenKeys(allExpanded ? [] : visible.map((panel) => panel.key));

  const activeLabel =
    CATEGORIES.find((c) => c.id === activeCategory)?.label || "All Questions";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)]">
      <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* ── Sidebar ── */}
        <aside className="border-b border-slate-100 p-5 md:p-6 lg:border-b-0 lg:border-r">
          <h2 className="mb-4 text-[16px] font-bold text-slate-900">
            Browse by Category
          </h2>

          <nav className="flex flex-col gap-1">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              const count = counts[category.id] || 0;

              return (
                <button
                  key={category.id}
                  onClick={() => selectCategory(category.id)}
                  className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-blue-600" />
                  )}
                  <Icon
                    size={17}
                    className={`shrink-0 ${isActive ? "text-blue-600" : "text-slate-400"}`}
                  />
                  <span className="flex-1 text-[13.5px] font-medium leading-snug">
                    {category.label}
                  </span>
                  <span
                    className={`text-[12px] font-semibold ${
                      isActive ? "text-blue-600" : "text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Support card */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50/80 to-violet-50/60 p-5 text-center">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
              <FiHeadphones size={19} className="text-blue-600" />
            </span>
            <p className="mt-3 text-[14px] font-bold text-slate-900">
              Still have questions?
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
              Our support team is here to help
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-blue-600 transition-colors hover:bg-blue-50"
            >
              Contact Support
              <FiArrowRight size={14} />
            </Link>
          </div>
        </aside>

        {/* ── Questions ── */}
        <section className="p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-[18px] font-bold text-slate-900">
                {activeLabel}
              </h2>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[12.5px] font-semibold text-blue-600">
                {filtered.length}
              </span>
            </div>

            {visible.length > 0 && (
              <button
                onClick={toggleAll}
                className="flex items-center gap-2 text-[13.5px] font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                {allExpanded ? (
                  <FiMinimize2 size={15} />
                ) : (
                  <FiMaximize2 size={15} />
                )}
                {allExpanded ? "Collapse All" : "Expand All"}
              </button>
            )}
          </div>

          {visible.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center">
              <p className="text-[14px] font-medium text-slate-500">
                No questions match your search.
              </p>
              <p className="mt-1 text-[13px] text-slate-400">
                Try a different keyword or category.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {visible.map((panel) => (
                <FaqItem
                  key={panel.key}
                  panel={panel}
                  isOpen={openKeys.includes(panel.key)}
                  onToggle={() => toggleItem(panel.key)}
                />
              ))}
            </div>
          )}

          {filtered.length > visible.length && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-6 py-2.5 text-[13.5px] font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                Load More Questions
                <FiArrowDown size={15} />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default FaqBrowser;
