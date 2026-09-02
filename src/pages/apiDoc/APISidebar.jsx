import React, { useState } from "react";
import { sections } from "./apiDocData";

// matches image's colorful category labels — rotates per section
const palette = [
  { text: "text-blue-600", active: "bg-blue-50 text-blue-700", dot: "bg-blue-600", border: "border-blue-600" },
  { text: "text-orange-600", active: "bg-orange-50 text-orange-700", dot: "bg-orange-600", border: "border-orange-600" },
  { text: "text-purple-600", active: "bg-purple-50 text-purple-700", dot: "bg-purple-600", border: "border-purple-600" },
  { text: "text-green-600", active: "bg-green-50 text-green-700", dot: "bg-green-600", border: "border-green-600" },
  { text: "text-rose-600", active: "bg-rose-50 text-rose-700", dot: "bg-rose-600", border: "border-rose-600" },
];

const APISidebar = ({ activeId, onSelect }) => {
  const [expandedSections, setExpandedSections] = useState(
    sections.map((s) => s.id)
  );

  const toggleSection = (id) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-64 shrink-0 h-full overflow-y-auto border-r border-slate-200 bg-white sticky top-0">
      <nav className="py-4">
        {sections.map((section, idx) => {
          const isOpen = expandedSections.includes(section.id);
          const style = palette[idx % palette.length];

          return (
            <div key={section.id} className="mb-1">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors"
              >
                <span className={`text-[11.5px] font-bold uppercase tracking-widest ${style.text}`}>
                  {section.label}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {isOpen && (
                <ul className="mb-2">
                  {section.items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => onSelect(item.id)}
                          className={`w-full text-left flex items-center gap-2.5 pl-8 pr-4 py-[7px] text-[13.5px] border-l-[3px] transition-all ${
                            isActive
                              ? `${style.active} ${style.border} font-semibold`
                              : "text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? style.dot : "bg-slate-300"}`}
                          />
                          {item.label}
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

export default APISidebar;