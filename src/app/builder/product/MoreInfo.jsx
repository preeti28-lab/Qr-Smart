import React, { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import {
  allergyImages,
  certificates,
  consumption,
  organic,
  recycleStamps,
} from "./constant";

const SELECTION_KEYS = [
  "allergies",
  "certificates",
  "organic",
  "consumption",
  "recycleStamps",
];

const MoreInfo = ({
  control,
  errors,
  reset,
  onChange = () => {},
  currentFormData, // ✅ must be passed as "currentFormData" from parent
}) => {
  const initializedRef = useRef(false);

  const [selected, setSelected] = useState({
    allergies: [],
    certificates: [],
    organic: [],
    consumption: [],
    recycleStamps: [],
  });

  const [customImages, setCustomImages] = useState({
    certificates: [],
    organic: [],
    consumption: [],
    recycleStamps: [],
  });

  const fileRefs = {
    certificates: useRef(),
    organic: useRef(),
    consumption: useRef(),
    recycleStamps: useRef(),
  };

  // ─── Seed selections ONCE when server data arrives ────────────────
  // Waits until at least one selection array has real data
  useEffect(() => {
    if (initializedRef.current) return;

    const hasData = SELECTION_KEYS.some(
      (key) =>
        Array.isArray(currentFormData?.[key]) &&
        currentFormData[key].length > 0,
    );

    if (!hasData) return;

    setSelected({
      allergies: currentFormData?.allergies || [],
      certificates: currentFormData?.certificates || [],
      organic: currentFormData?.organic || [],
      consumption: currentFormData?.consumption || [],
      recycleStamps: currentFormData?.recycleStamps || [],
    });

    initializedRef.current = true;
  }, [currentFormData]);

  // ─── Sync ONLY the selection slice back to parent ─────────────────
  // Does NOT push the full RHF values to avoid infinite loop
  const prevSelectedRef = useRef(null);

  useEffect(() => {
    if (prevSelectedRef.current === selected) return;
    prevSelectedRef.current = selected;

    onChange({ ...selected, customImages });
  }, [selected, customImages, onChange]);

  // ─── Toggle a tile ────────────────────────────────────────────────
  const toggle = (category, name) => {
    setSelected((prev) => {
      const list = prev[category] || [];
      const updated = list.includes(name)
        ? list.filter((item) => item !== name)
        : [...list, name];
      return { ...prev, [category]: updated };
    });
  };

  const handleFileChange = (e, category) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setCustomImages((prev) => ({
      ...prev,
      [category]: [...prev[category], ...newImages],
    }));
  };

  const renderItem = (item, category, isCustom = false) => {
    const isSelected = selected[category]?.includes(item.name);

    return (
      <div
        key={item.name}
        className="relative group cursor-pointer"
        onClick={() => toggle(category, item.name)}
      >
        {/* Tooltip */}
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          pointer-events-none opacity-0 translate-y-1 scale-95
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
          transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
          bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 shadow-md"
        >
          {item.name}
        </div>

        {/* Card */}
        <div
          className={`flex flex-col items-center p-2 rounded-md border transition-all duration-200 ${
            isSelected
              ? "border-blue-500 bg-blue-50 shadow-sm"
              : "border-transparent hover:border-gray-300"
          }`}
        >
          <img
            src={isCustom ? item.preview : item.src}
            alt={item.name}
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>
    );
  };

  const renderSection = (title, data, category, allowUpload = false) => (
    <div key={category}>
      <h3 className="font-semibold mb-2">{title}</h3>

      <div className="flex flex-wrap gap-3">
        {data.map((item) => renderItem(item, category))}
        {customImages[category]?.map((item) =>
          renderItem(item, category, true),
        )}
      </div>

      {/* Uncomment to re-enable custom upload
      {allowUpload && (
        <>
          <button
            type="button"
            onClick={() => fileRefs[category].current.click()}
            className="flex mt-2 items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300"
          >
            + Add {title}
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileRefs[category]}
            className="hidden"
            onChange={(e) => handleFileChange(e, category)}
          />
        </>
      )} */}
    </div>
  );

  return (
    <div className="bg-white space-y-5 px-2 py-2">
      {renderSection("Allergens", allergyImages, "allergies")}
      {renderSection("Certificates", certificates, "certificates", true)}
      {renderSection("Organic", organic, "organic", true)}
      {renderSection("Consumption", consumption, "consumption", true)}
      {renderSection("Recycle Stamps", recycleStamps, "recycleStamps", true)}
    </div>
  );
};

export default MoreInfo;