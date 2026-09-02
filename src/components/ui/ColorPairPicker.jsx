import React, { useState, useEffect } from "react";

const ColorPairPicker = ({
  pairs = [],
  value = ["#3B82F6", "#06B6D4"], // 2 colors only
  onChange = () => {},
}) => {
  // 1. Use `value` as the source of truth
  const [selectedPair, setSelectedPair] = useState(value);

  // 2. Sync local state whenever `value` changes (e.g., on edit mode)
  useEffect(() => {
    setSelectedPair(value);
  }, [value]);

  const handlePairSelect = (pair) => {
    const copy = [...pair];
    setSelectedPair(copy);
    onChange(copy);
  };

  const handleColorChange = (index, newColor) => {
    const updated = [...selectedPair];
    updated[index] = newColor;
    setSelectedPair(updated);
    onChange(updated);
  };

  const isSelected = (pair) =>
    pair.length === selectedPair.length &&
    pair.every(
      (color, idx) => color.toLowerCase() === selectedPair[idx].toLowerCase(),
    );

  return (
    <div className="max-w-4xl bg-white p-4 space-y-4">
      {/* Pair Selection */}
      <div>
        <p className="text-xs text-gray-800 mb-2">Color Pairs</p>
        <div className="flex gap-2 overflow-x-auto p-1">
          {pairs.map((pair, index) => (
            <button
              key={index}
              onClick={() => handlePairSelect(pair)}
              className={`flex-shrink-0 w-28 h-10 rounded-lg border-2 overflow-hidden transition-transform ${
                isSelected(pair)
                  ? "border-black scale-105"
                  : "border-transparent"
              } hover:scale-105`}
            >
              <div className="flex w-full h-full">
                {pair.map((color, idx) => (
                  <div
                    key={idx}
                    className="flex-1"
                    style={{ backgroundColor: color || "#ffffff" }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Pair Editor */}
      <div>
        <p className="text-xs text-gray-800 mb-2">Selected Colors</p>

        <div className="flex flex-wrap gap-4">
          {selectedPair.map((color, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              {/* Color Picker */}
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(i, e.target.value)}
                className="w-8 h-8 border rounded-lg cursor-pointer"
              />

              {/* Hex Input */}
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(i, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPairPicker;
