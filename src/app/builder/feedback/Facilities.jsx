import React, { useState, useEffect } from "react";
import { facilitiesList } from "../../../constants/staticData";

const Facilities = ({ onChange = () => {}, value = [] }) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    const facilities = [selected];
    onChange({ facilities: facilities });
  }, [selected, onChange]);

  const toggleFacility = (name) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-wrap gap-3">
        {facilitiesList.map((item) => {
          const Icon = item.icon;
          const isActive = selected?.includes(item?.name);

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => toggleFacility(item.name)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition
                ${
                  isActive
                    ? " bg-blue-50 text-blue-700 border-blue-700"
                    : "bg-white text-blue-700 border-gray-300 hover:border-blue-400"
                }`}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Facilities;
