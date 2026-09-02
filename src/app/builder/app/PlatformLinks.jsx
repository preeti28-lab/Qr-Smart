import React, { useState, useEffect } from "react";
import InputField from "../../../common/fields/InputField";

const platforms = [
  { key: "googlePlayLink", label: "Google Play" },
  { key: "amazonLink", label: "Amazon" },
  { key: "appleLink", label: "Apple App Store" },
];

const PlatformLinks = ({
  control,
  errors,
  watch,
  onChange = () => {},
  currentFormData,
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  // ✅ Initialize selected platforms from existing data
  useEffect(() => {
    if (!currentFormData) return;

    const activePlatforms = platforms
      .filter((platform) => {
        const value = currentFormData[platform.key];
        return value && value.trim() !== "";
      })
      .map((platform) => platform.key);

    setSelectedPlatforms(activePlatforms);
  }, [currentFormData]);

  // ✅ Watch form values and send only non-empty platform links
  useEffect(() => {
    const subscription = watch((values) => {
      const platformValues = Object.fromEntries(
        platforms
          .map((p) => [p.key, values[p.key]])
          .filter(([_, value]) => value && value.trim() !== ""),
      );

      onChange(platformValues);
    });

    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  // ✅ Toggle platform buttons
  const handleToggle = (platformKey) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformKey)
        ? prev.filter((p) => p !== platformKey)
        : [...prev, platformKey],
    );
  };

  return (
    <div className="bg-white space-y-6 p-1 md:p-4">
      {/* Platform Toggle Buttons */}
      <div className="flex gap-3 flex-wrap">
        {platforms.map((platform) => {
          const isActive = selectedPlatforms.includes(platform.key);

          return (
            <button
              key={platform.key}
              type="button"
              onClick={() => handleToggle(platform.key)}
              className={`px-4 py-2 rounded border transition ${
                isActive
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100"
              }`}
            >
              {platform.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Inputs */}
      {selectedPlatforms.map((platformKey) => {
        const platform = platforms.find((p) => p.key === platformKey);

        return (
          <InputField
            key={platformKey}
            control={control}
            errors={errors}
            name={platformKey}
            label={`${platform.label} App Link`}
            type="text"
          />
        );
      })}
    </div>
  );
};

export default PlatformLinks;
