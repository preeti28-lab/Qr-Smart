import React from "react";
import { FaChevronUp } from "react-icons/fa6";

const AccordionItem = ({ question, answer, isActive, onToggle }) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      {/* Question */}
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left font-semibold text-lg"
      >
        {question}

        <span
          className={`transform transition-transform duration-300 ${
            isActive ? "rotate-180" : ""
          }`}
        >
          <FaChevronUp />
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
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;