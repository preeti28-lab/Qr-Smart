import React from "react";
import { FaChevronUp } from "react-icons/fa6";

const AccordionItem = ({ question, answer, isActive, onToggle }) => {
  return (
    <div className="px-5 md:px-6 py-5">
      {/* Question */}
      <button
        onClick={onToggle}
        className="flex justify-between items-center gap-4 w-full text-left font-semibold text-[17px] text-slate-900"
      >
        {question}

        <span
          className={`flex-shrink-0 text-slate-400 transform transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          }`}
        >
          <FaChevronUp size={14} />
        </span>
      </button>

      {/* Answer */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isActive
            ? "grid-rows-[1fr] opacity-100 mt-3"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-slate-500 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
