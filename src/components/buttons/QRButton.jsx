// PATH: src/components/buttons/QRButton.jsx
import React from "react";
import { MdArrowForward } from "react-icons/md";
import usePath from "../../hooks/usePath";

/**
 * A single QR-type option card.
 *
 * API is unchanged (icon / text / desc / to / onHover / setQRType / type) so the
 * existing Bulk.jsx usage keeps working. Two optional props were added:
 *   tint     -> accent hex used for the icon chip + hover border
 *   onSelect -> if given, the parent owns navigation (used by the new Builder)
 */
const QRButton = ({
  icon,
  text = "",
  desc = "",
  to = "",
  onHover = () => {},
  setQRType,
  type,
  tint = "#1B57E3",
  onSelect = null,
  active = false,
}) => {
  const path = usePath();

  const handleClick = () => {
    if (typeof onSelect === "function") {
      onSelect(type);
      return;
    }
    // NOTE: the old code called dispatch(setQRType({type})) — but setQRType is a
    // React setState function in both Builder.jsx and Bulk.jsx, so dispatching
    // its (undefined) return value threw "Actions may not be undefined".
    path.push(to && to !== "" ? to : "content");
    if (typeof setQRType === "function") setQRType({ type });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => onHover(text)}
      onMouseLeave={() => onHover(null)}
      style={{ "--tint": tint }}
      className={`group relative w-full text-left overflow-hidden rounded-2xl border bg-white
        px-4 py-3.5 flex items-center gap-x-4
        transition-all duration-200 ease-out
        hover:-translate-y-[2px] hover:border-[var(--tint)]
        hover:shadow-[0_10px_28px_-14px_rgba(15,23,42,0.35)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tint)] focus-visible:ring-offset-2
        active:translate-y-0
        ${active ? "border-[var(--tint)] shadow-[0_10px_28px_-16px_rgba(15,23,42,0.35)]" : "border-slate-200"}`}
    >
      {/* accent rail — reads as the "finder bar" of a QR module */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-200"
        style={{ backgroundColor: tint }}
      />

      {/* icon chip */}
      <span
        className="shrink-0 grid place-items-center rounded-xl w-[46px] h-[46px] transition-transform duration-200 group-hover:scale-[1.06]"
        style={{ backgroundColor: `${tint}14`, color: tint }}
      >
        {icon}
      </span>

      <span className="flex flex-col gap-y-0.5 min-w-0 flex-1">
        <span className="text-slate-900 text-[15px] font-semibold tracking-[-0.01em] leading-tight">
          {text}
        </span>
        <span className="text-slate-500 text-[12.5px] font-medium leading-snug line-clamp-2">
          {desc}
        </span>
      </span>

      <span
        className="shrink-0 grid place-items-center w-7 h-7 rounded-full text-slate-300
          opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-200"
        style={{ color: tint, backgroundColor: `${tint}14` }}
      >
        <MdArrowForward size={15} />
      </span>
    </button>
  );
};

export default QRButton;