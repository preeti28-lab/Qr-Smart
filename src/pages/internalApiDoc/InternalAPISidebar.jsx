import React, { useState } from "react";
import { sections } from "./InternalApidocdata";
import { getSectionTheme } from "./apiSectionTheme";

const InternalAPISidebar = ({ activeId, onSelect }) => {
  const [expandedSections, setExpandedSections] = useState(
    sections.map((s) => s.id),
  );

  const toggleSection = (id) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <aside className="w-full shrink-0 self-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] lg:sticky lg:top-[84px] lg:max-h-[calc(100vh-6rem)] lg:w-[272px] lg:overflow-y-auto">
      <nav className="px-3 py-4">
        {sections.map((section, sectionIndex) => {
          const isOpen = expandedSections.includes(section.id);
          const theme = getSectionTheme(section.label);
          const Icon = theme.icon;

          return (
            <div key={section.id}>
              {sectionIndex > 0 && (
                <div className="mx-2 my-3 h-px bg-slate-100" />
              )}

              <button
                onClick={() => toggleSection(section.id)}
                className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-slate-50"
              >
                <Icon size={15} className={`shrink-0 ${theme.text}`} />
                <span
                  className={`flex-1 text-left text-[11px] font-bold uppercase tracking-[0.12em] ${theme.text}`}
                >
                  {section.label}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`shrink-0 text-slate-300 opacity-0 transition-all duration-200 group-hover:opacity-100 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isOpen && (
                <ul className="mt-1 flex flex-col gap-0.5">
                  {section.items.map((item) => {
                    const isActive = activeId === item.id;

                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => onSelect(item.id)}
                          className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition-all ${
                            isActive
                              ? "bg-blue-50 font-semibold text-blue-700"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              isActive ? "bg-blue-600" : "bg-slate-300"
                            }`}
                          />
                          <span className="leading-snug">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default InternalAPISidebar;
