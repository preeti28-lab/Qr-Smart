import React, { useState } from "react";
import { ChevronDown } from "react-feather";

/**
 * Pricing page FAQ - do column me split, ek time par ek hi panel open.
 *
 * @param items Array [{ title: '', values: [] }]
 */
const PlanFaq = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const mid = Math.ceil(items.length / 2);
  const columns = [
    { list: items.slice(0, mid), offset: 0 },
    { list: items.slice(mid), offset: mid },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-y-3">
          {column.list.map((panel, index) => {
            const key = column.offset + index;
            const isOpen = openIndex === key;

            return (
              <div
                key={panel.key || key}
                className={`overflow-hidden rounded-xl border bg-white transition-colors ${
                  isOpen
                    ? "border-blue-200 shadow-[0_10px_28px_-20px_rgba(37,99,235,0.55)]"
                    : "border-slate-200 shadow-[0_6px_18px_-16px_rgba(15,23,42,0.4)] hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`plan-faq-panel-${key}`}
                  id={`plan-faq-header-${key}`}
                  onClick={() => setOpenIndex(isOpen ? null : key)}
                  className="flex w-full items-center justify-between gap-x-4 px-5 py-4 text-left"
                >
                  <span
                    className={`text-[14px] font-semibold leading-snug ${
                      isOpen ? "text-blue-700" : "text-slate-800"
                    }`}
                  >
                    {panel.title}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                  />
                </button>

                <div
                  id={`plan-faq-panel-${key}`}
                  role="region"
                  aria-labelledby={`plan-faq-header-${key}`}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 px-5 py-4">
                      {Array.isArray(panel.values) && panel.values.length > 0 ? (
                        panel.values.map((value, idx) => (
                          <div
                            key={`${key}-${idx}`}
                            className="flex flex-col gap-y-2 text-[14px] font-medium leading-relaxed text-slate-600 [&_a]:text-blue-600 [&_a:hover]:underline"
                          >
                            {value}
                          </div>
                        ))
                      ) : (
                        <div className="text-[14px] text-slate-400">
                          No content available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default PlanFaq;
