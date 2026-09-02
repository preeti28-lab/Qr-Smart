import React, { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  allergyImages,
  certificates,
  consumption,
  organic,
  recycleStamps,
} from "./constant";

const MoreInfo = ({ onChange = () => {}, currentFormData }) => {
  const { control, reset } = useForm({
    defaultValues: {
      allergies: [],
      certificates: [],
      organic: [],
      consumption: [],
      recycleStamps: [],
      ...currentFormData,
    },
  });

  const values = useWatch({ control });

  const [selected, setSelected] = useState({
    allergies: currentFormData?.allergies || [],
    certificates: currentFormData?.certificates || [],
    organic: currentFormData?.organic || [],
    consumption: currentFormData?.consumption || [],
    recycleStamps: currentFormData?.recycleStamps || [],
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

  useEffect(() => {
    reset(currentFormData || {});
    setSelected({
      allergies: currentFormData?.allergies || [],
      certificates: currentFormData?.certificates || [],
      organic: currentFormData?.organic || [],
      consumption: currentFormData?.consumption || [],
      recycleStamps: currentFormData?.recycleStamps || [],
    });
  }, [currentFormData, reset]);

  useEffect(() => {
    onChange({
      ...values,
      ...selected,
      customImages,
    });
  }, [selected, customImages, values, onChange]);

  const toggle = (category, name) => {
    setSelected((prev) => {
      const list = prev[category];
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
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>

      <div className="flex flex-wrap gap-3">
        {/* Default items */}
        {data.map((item) => renderItem(item, category))}

        {/* Custom uploaded items (now selectable) */}
        {customImages[category]?.map((item) =>
          renderItem(item, category, true),
        )}
      </div>

      {/* Add button */}
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
      )}
    </div>
  );

  return (
    <div className="bg-white space-y-5 px-2 py-2">
      {renderSection("Allergens", allergyImages, "allergies")}
    </div>
  );
};

export default MoreInfo;
