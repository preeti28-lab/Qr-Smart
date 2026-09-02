import React, { useState, useRef, useEffect } from "react";
import { qrTypes } from "../../../constants/qrTypes";
import { FaEllipsisH, FaChevronDown, FaCheck } from "react-icons/fa";

const QRTypesBar = ({ selectedType, setSelectedType }) => {
  const firstSix = qrTypes.slice(0, 6);
  const restTypes = qrTypes.slice(6);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const popoverRef = useRef(null);
  const moreButtonRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const mobileTriggerRef = useRef(null);

  const isMoreActive = restTypes.some((item) => item.type === selectedType);
  const selectedItem = qrTypes.find((item) => item.type === selectedType);

  // Close desktop popover on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(e.target)
      ) {
        setPopoverOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target) &&
        mobileTriggerRef.current &&
        !mobileTriggerRef.current.contains(e.target)
      ) {
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (type) => {
    setSelectedType(type);
    setPopoverOpen(false);
    setMobileDropdownOpen(false);
  };

  return (
    <>
      {/* ── MOBILE: single full-width dropdown (visible below lg) ── */}
      <div className="relative lg:hidden w-full" ref={mobileTriggerRef}>
        <button
          onClick={() => setMobileDropdownOpen((prev) => !prev)}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-gray-100 border border-gray-200
            rounded-xl text-sm font-medium text-gray-700 transition-all duration-150
            hover:bg-gray-200"
        >
          {/* Active type icon */}
          <span className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex-shrink-0">
            {selectedItem?.iconSecond}
          </span>

          {/* Active type name */}
          <span className="text-blue-600 font-medium flex-1 text-left">
            {selectedItem?.name ?? "Select type"}
          </span>

          {/* QR type count badge */}
          <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
            {qrTypes.length} types
          </span>

          <FaChevronDown
            size={12}
            className={`text-gray-400 transition-transform duration-200 flex-shrink-0
              ${mobileDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Mobile dropdown panel */}
        {mobileDropdownOpen && (
          <div
            ref={mobileDropdownRef}
            className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-white border
              border-gray-200 rounded-xl shadow-lg p-1.5 max-h-[280px] overflow-y-auto
              flex flex-col gap-0.5"
          >
            <div className="px-2 py-1 mb-1 sticky top-0 bg-white">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Select QR type
              </p>
            </div>

            {qrTypes.map((item) => {
              const isActive = selectedType === item.type;
              return (
                <button
                  key={item.type}
                  onClick={() => handleSelect(item.type)}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm
                    cursor-pointer border-none w-full text-left transition-colors duration-100
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-md text-sm flex-shrink-0
                      ${isActive ? "bg-blue-100" : "bg-gray-100"}`}
                  >
                    {item.iconSecond}
                  </span>
                  <span>{item.name}</span>
                  {isActive && (
                    <FaCheck size={12} className="ml-auto text-blue-500" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── DESKTOP: original tab bar (visible from lg+) ── */}
      <div className="hidden lg:flex w-full items-center gap-1 flex-wrap p-1 bg-gray-100 rounded-xl border border-gray-200">
        {/* First 6 items */}
        {firstSix.map((item) => {
          const isActive = selectedType === item.type;
          return (
            <button
              key={item.type}
              onClick={() => handleSelect(item.type)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border-none
                text-sm font-medium transition-all duration-150 whitespace-nowrap
                ${
                  isActive
                    ? "bg-white text-blue-600 shadow-sm ring-1 ring-blue-200"
                    : "bg-transparent text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm"
                }`}
            >
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-md text-sm
                  transition-colors duration-150
                  ${isActive ? "bg-blue-50" : "bg-gray-200"}`}
              >
                {item.iconSecond}
              </span>
              <span>{item.name}</span>
            </button>
          );
        })}

        {/* More dropdown */}
        <div className="relative ml-auto" ref={moreButtonRef}>
          <button
            onClick={() => setPopoverOpen((prev) => !prev)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border-none
              text-sm font-medium transition-all duration-150 whitespace-nowrap
              ${
                isMoreActive || popoverOpen
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-blue-200"
                  : "bg-transparent text-gray-500 hover:bg-white hover:text-gray-800 hover:shadow-sm"
              }`}
          >
            <span
              className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-150
                ${isMoreActive || popoverOpen ? "bg-blue-50" : "bg-gray-200"}`}
            >
              <FaEllipsisH size={14} />
            </span>
            <span>
              {isMoreActive
                ? (restTypes.find((i) => i.type === selectedType)?.name ??
                  "More")
                : "More"}
            </span>
            <FaChevronDown
              size={12}
              className={`transition-transform duration-200 ${popoverOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Desktop popover */}
          {popoverOpen && (
            <div
              ref={popoverRef}
              className="absolute top-[calc(100%+8px)] max-h-[200px] overflow-y-auto right-0
                z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5
                min-w-[200px] flex flex-col gap-0.5"
            >
              <div className="px-2 py-1 mb-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  More types
                </p>
              </div>
              {restTypes.map((item) => {
                const isActive = selectedType === item.type;
                return (
                  <button
                    key={item.type}
                    onClick={() => handleSelect(item.type)}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm
                      cursor-pointer border-none w-full text-left transition-colors duration-100
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-md text-sm flex-shrink-0
                        ${isActive ? "bg-blue-100" : "bg-gray-100"}`}
                    >
                      {item.iconSecond}
                    </span>
                    <span>{item.name}</span>
                    {isActive && (
                      <FaCheck size={12} className="ml-auto text-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QRTypesBar;
