// PATH: src/common/sidebar/SideLink.jsx
import React from "react";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";

/* Same gradient as the top bar (--sgps-gradient in index.css). */
const ACTIVE_GRADIENT =
  "linear-gradient(131.35deg, #104cd9 0%, #002273 100%)";

const SideLink = ({ path, icon, text = "", active, collapse = false }) => {
  return (
    <Tooltip title={collapse ? text : null} placement="right">
      <Link
        to={`/${path}`}
        className={`group relative w-full flex items-center rounded-xl
          transition-all duration-200 outline-none
          focus-visible:ring-2 focus-visible:ring-blue-400/60
          ${collapse ? "justify-center px-0 py-2.5" : "justify-start gap-x-3 px-3 py-2.5"}
          ${active ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.06]"}`}
        style={
          active
            ? {
                background: ACTIVE_GRADIENT,
                boxShadow: "0 6px 18px -8px rgba(16,76,217,0.85)",
              }
            : undefined
        }
      >
        {/* left accent bar — marks the active page even when collapsed */}
        <span
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-white
            transition-all duration-200 ${active ? "h-5 opacity-90" : "h-0 opacity-0"}`}
        />

        <span
          className={`shrink-0 grid place-items-center transition-colors duration-200
            ${active ? "text-white" : "text-slate-400 group-hover:text-white"}`}
        >
          {icon}
        </span>

        {!collapse && (
          <span
            className={`text-[13.5px] leading-tight tracking-[-0.01em] truncate
              ${active ? "font-semibold" : "font-medium"}`}
          >
            {text}
          </span>
        )}
      </Link>
    </Tooltip>
  );
};

export default SideLink;