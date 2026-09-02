// PATH: src/components/fields/ColorField.jsx
import React, { useRef } from "react";

const ColorField = ({ isColor = "#000000", setIsColor = () => {} }) => {
  const colorRef = useRef(null);

  const isClick = () => {
    colorRef.current.click();
  };

  const handleChange = (e) => {
    setIsColor(e.target.value);
  };

  return (
    <div
      className="rounded-xl py-1.5 pl-1.5 pr-3 border border-slate-200 bg-white
        focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100
        hover:border-slate-300 transition-all duration-200
        flex justify-between items-center gap-x-2.5 w-full max-w-[190px]"
    >
      <button
        type="button"
        onClick={isClick}
        className="rounded-lg h-8 w-8 shrink-0 cursor-pointer border border-slate-200
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)] transition-transform duration-150 hover:scale-105 active:scale-95"
        style={{ backgroundColor: isColor }}
        aria-label="Pick a colour"
      />
      <input
        type="text"
        className="outline-none font-semibold text-slate-800 text-[13.5px] w-full bg-transparent uppercase tracking-wide"
        value={isColor}
        onChange={handleChange}
      />
      <input
        ref={colorRef}
        type="color"
        value={isColor}
        className="w-0 h-0 opacity-0 absolute"
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorField;