// PATH: src/components/menu/QRMenu.jsx
import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

/* ── Section glyphs ─────────────────────────────────────────────────────────
   Each design section gets a mark drawn from the QR code's own anatomy rather
   than a generic library icon, so the panel headers read as one family.       */
const Glyphs = {
  // outer bracket = the frame drawn around the code
  frame: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="9" y="9" width="6" height="6" rx="1.2" fill="currentColor" />
    </svg>
  ),
  // module grid = dot shapes + colours
  modules: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <rect x="3" y="3" width="6" height="6" rx="1.6" fill="currentColor" />
      <rect x="15" y="3" width="6" height="6" rx="3" fill="currentColor" opacity="0.55" />
      <rect x="3" y="15" width="6" height="6" rx="3" fill="currentColor" opacity="0.55" />
      <rect x="15" y="15" width="6" height="6" rx="1.6" fill="currentColor" />
    </svg>
  ),
  // centre logo
  logo: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  ),
  // shield = error correction / resilience
  shield: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M12 2.8 4.5 6v6c0 4.6 3.2 8 7.5 9.2 4.3-1.2 7.5-4.6 7.5-9.2V6L12 2.8Z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="m8.8 12 2.2 2.3 4.2-4.4" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // default: finder pattern
  finder: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
      <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.5" fill="currentColor" />
    </svg>
  ),
};

/**
 * Collapsible design section.
 *
 * Existing props are untouched. Added (all optional, safe defaults):
 *   glyph   -> 'frame' | 'modules' | 'logo' | 'shield' | 'finder'
 *   summary -> string/node shown on the right of the header (current selection)
 */
const QRMenu = ({
  children,
  title = "",
  desc = "",
  defualt: defaultValue = false,
  icon,
  maxHeight = "max-h-full",
  iconShow = true,
  glyph = "finder",
  summary = null,
}) => {
  const [isOpen, setIsOpen] = useState(defaultValue);
  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className={`w-full bg-white flex-col flex justify-start items-start rounded-2xl border transition-all duration-300
        ${isOpen
          ? "border-slate-200 shadow-[0_4px_18px_-10px_rgba(15,23,42,0.18)]"
          : "border-slate-200 hover:border-slate-300 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"}`}
    >
      <button
        type="button"
        className="flex justify-between items-center w-full cursor-pointer select-none text-left px-5 sm:px-6 py-4 gap-x-3"
        onClick={handleOpen}
        aria-expanded={isOpen}
      >
        <div className="flex justify-start gap-x-3.5 items-center min-w-0">
          {iconShow ? (
            <span
              className={`shrink-0 grid place-items-center rounded-xl w-9 h-9 transition-colors duration-300
                ${isOpen ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"}`}
            >
              {icon || Glyphs[glyph] || Glyphs.finder}
            </span>
          ) : null}
          <span className="flex justify-start items-start flex-col gap-y-0.5 min-w-0">
            <span className="font-bold text-[15.5px] text-slate-900 tracking-[-0.02em] leading-tight">
              {title}
            </span>
            {desc ? (
              <span className="text-[12.5px] font-medium text-slate-500 leading-snug">
                {desc}
              </span>
            ) : null}
          </span>
        </div>

        <div className="flex items-center gap-x-2 shrink-0">
          {summary && !isOpen ? (
            <span className="hidden sm:inline-flex items-center gap-x-1.5 max-w-[190px] truncate rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11.5px] font-semibold text-slate-600">
              {summary}
            </span>
          ) : null}
          <span
            className={`grid place-items-center rounded-full w-7 h-7 transition-all duration-300 ${
              isOpen ? "bg-slate-100 text-slate-700" : "text-slate-400"
            }`}
          >
            <MdOutlineKeyboardArrowRight
              size={20}
              className={`${isOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`}
            />
          </span>
        </div>
      </button>

      <div
        className={`w-full overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          isOpen ? `${maxHeight} opacity-100` : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-5 sm:mx-6 border-t border-slate-100" />
        <div className="px-5 sm:px-6 pb-5 pt-4">{children}</div>
      </div>
    </div>
  );
};

export default QRMenu;