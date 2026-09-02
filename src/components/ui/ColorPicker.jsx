import React, { useState } from "react";

const presetColors = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#EAB308",
  "#84CC16",
  "#22C55E",
  "#10B981",
  "#14B8A6",
  "#06B6D4",
  "#0EA5E9",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#A855F7",
  "#D946EF",
  "#EC4899",
];

const ColorPicker = ({
  value = "#3B82F6",
  onChange = () => {},
  colorPairs = [],
}) => {
  const [color, setColor] = useState(value);
  const [selectedPair, setSelectedPair] = useState(null);

  const handleChange = (newColor) => {
    setColor(newColor);
    onChange(newColor);
  };

  const handlePairChange = (pair) => {
    setSelectedPair(pair);
    onChange(pair);
  };

  const isPairMode = colorPairs && colorPairs.length > 0;

  return (
    <div className="max-w-4xl bg-white p-4 space-y-4">
      {/* 👇 PAIR MODE ONLY */}
      {isPairMode ? (
        <div>
          <p className="text-xs text-gray-500 mb-2">Color Pairs</p>
          <div className="flex gap-2 overflow-x-auto py-1 px-3">
            {colorPairs.map((pair, index) => {
              const isSelected =
                selectedPair &&
                selectedPair[0] === pair[0] &&
                selectedPair[1] === pair[1];

              return (
                <button
                  key={index}
                  onClick={() => handlePairChange(pair)}
                  className={`flex-shrink-0 w-28 h-10 rounded-lg border-2 overflow-hidden transition-transform ${
                    isSelected ? "border-black scale-105" : "border-transparent"
                  } hover:scale-105`}
                >
                  <div className="flex w-full h-full">
                    <div
                      className="w-1/2"
                      style={{ backgroundColor: pair[0] }}
                    />
                    <div
                      className="w-1/2"
                      style={{ backgroundColor: pair[1] }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Native Picker + Input */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => handleChange(e.target.value)}
              className="w-14 h-14 border rounded-lg cursor-pointer"
            />

            <input
              type="text"
              value={color}
              onChange={(e) => handleChange(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preset Colors */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Presets</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
              {presetColors.map((c) => (
                <button
                  key={c}
                  onClick={() => handleChange(c)}
                  className={`flex-shrink-0 w-28 h-10 rounded-lg border-2 transition-transform duration-200 ${
                    color === c
                      ? "border-black scale-105"
                      : "border-transparent"
                  } hover:scale-105`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPicker;
