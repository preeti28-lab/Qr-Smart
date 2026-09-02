import React, { cloneElement } from "react";

const ScrollQRCard = ({ item, isActive, onClick }) => {
  const IconSecond = item.iconSecond;

  return (
    <button
      onClick={onClick}
      className={`relative flex-shrink-0 flex flex-col items-center justify-center gap-2 w-[100px] h-[120px] transition-all duration-200 border-b-2 ${
        isActive
          ? "border-blue-500 bg-gray-50"
          : "border-slate-200 hover:bg-slate-100"
      }`}
    >
      {/* Icon */}
      <span
        className={`flex items-center justify-center transition-all duration-200 mb-3 ${
          isActive ? "text-blue-500" : "text-slate-400"
        }`}
      >
        {IconSecond ? (
          cloneElement(IconSecond, { size: 36, strokeWidth: 1.5 })
        ) : (
          <span className="text-[28px] leading-none">{item.icon}</span>
        )}
      </span>

      {/* Label */}
      <span
        className={`text-[14px] font-medium leading-tight text-center w-full px-1 transition-colors duration-200 ${
          isActive ? "text-blue-500" : "text-slate-500"
        }`}
      >
        {item.name}
      </span>
    </button>
  );
};

export default ScrollQRCard;
