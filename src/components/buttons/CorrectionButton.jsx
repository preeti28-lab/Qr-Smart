// PATH: src/components/buttons/CorrectionButton.jsx
import React from "react";
import { MdCheck } from "react-icons/md";

const NOTES = {
  L: "Smallest, cleanest code",
  M: "Good for screens",
  Q: "Recommended for print",
  H: "Best when you add a logo",
};

const CorrectionButton = ({
  icon,
  active = false,
  level = "Q",
  percentage = 25,
  changeLevel,
}) => {
  return (
    <button
      type="button"
      onClick={() => changeLevel(level)}
      className={`group relative border-2 rounded-2xl overflow-hidden flex flex-col justify-between items-stretch
        text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
        ${active
          ? "border-blue-600 bg-blue-50/50 shadow-[0_8px_24px_-14px_rgba(27,87,227,0.7)]"
          : "border-slate-200 bg-white hover:border-slate-300 hover:-translate-y-[2px] hover:shadow-[0_8px_22px_-16px_rgba(15,23,42,0.4)]"}`}
    >
      {active && (
        <span className="absolute top-2.5 right-2.5 grid place-items-center w-5 h-5 rounded-full bg-blue-600 text-white z-10">
          <MdCheck size={13} />
        </span>
      )}

      {/* QR mark — colour comes from currentColor so it tints on select */}
      <div
        className={`flex justify-center items-center h-[118px] px-3 transition-colors duration-200 ${
          active ? "text-blue-600" : "text-slate-800 group-hover:text-slate-900"
        }`}
      >
        {icon}
      </div>

      <div
        className={`px-3.5 py-3 border-t flex flex-col gap-y-2 ${
          active ? "border-blue-100 bg-white/70" : "border-slate-100"
        }`}
      >
        <div className="flex justify-between items-center gap-x-2">
          <span className="font-bold text-slate-900 text-[14px] tracking-[-0.01em]">
            Level {level}
          </span>
          <span
            className={`font-bold text-[11.5px] rounded-full py-[3px] px-2 leading-none ${
              active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
            }`}
          >
            {percentage}%
          </span>
        </div>

        {/* redundancy meter — 30% is the maximum a QR code supports */}
        <div className="w-full h-[3px] rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              active ? "bg-blue-600" : "bg-slate-300 group-hover:bg-slate-400"
            }`}
            style={{ width: `${(percentage / 30) * 100}%` }}
          />
        </div>

        <span
          className={`text-[11.5px] font-medium leading-snug ${
            active ? "text-blue-700" : "text-slate-500"
          }`}
        >
          {NOTES[level] || "Damage the code can survive"}
        </span>
      </div>
    </button>
  );
};

export default CorrectionButton;