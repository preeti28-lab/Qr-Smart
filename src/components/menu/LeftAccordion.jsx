import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const LeftAccordion = ({ title = "", children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="w-full bg-white  py-3  border-b">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdOutlineKeyboardArrowRight
          size={22}
          className={`${
            isOpen ? "rotate-90" : "rotate-0"
          } transition-transform duration-300 ease-in-out text-blue-500 rounded-full hover:bg-blue-50`}
        />
        <h3 className="text-[16px] font-semibold">{title}</h3>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-auto opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-3 md:px-6 pb-3">{children}</div>
      </div>
    </div>
  );
};

export default LeftAccordion;
