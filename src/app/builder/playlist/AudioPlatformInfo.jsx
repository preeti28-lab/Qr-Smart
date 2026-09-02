import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { audioPlatforms } from "../menu/constant";
import InputField from "../../../common/fields/InputField";

const AudioPlatformInfo = ({
  control,
  errors,
  setValue,
  getValues,
  onChange = () => {},
  currentFormData,
}) => {
  const values = useWatch({
    control,
    name: "platforms",
    defaultValue: currentFormData?.platforms || {}, // ✅ Initialize from API data
  });

  // Propagate changes upward
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange({ platforms: values });
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, onChange]);

  const togglePlatform = (platformName) => {
    const current = getValues("platforms") || {};
    if (current[platformName]) {
      // remove platform — use exact path for safety
      const newPlatforms = { ...current };
      delete newPlatforms[platformName];
      setValue("platforms", newPlatforms);
    } else {
      // add platform with defaults
      setValue("platforms", {
        ...current,
        [platformName]: { url: "", text: "", buttonText: "" },
      });
    }
  };

  const isSelected = (platformName) => !!values?.[platformName];

  return (
    <div className="bg-white space-y-6">
      {/* Platform Fields — ✅ No defaultValue props */}
      {Object.entries(values || {}).map(([platformName, data]) =>
        data ? (
          <div
            key={platformName}
            className="border p-3 rounded-md space-y-3 bg-gray-50"
          >
            <h4 className="font-semibold">{platformName}</h4>

            <div className="grid grid-cols-2 gap-2">
              <InputField
                control={control}
                errors={errors}
                name={`platforms.${platformName}.url`}
                label="URL"
                type="text"
              />

              <InputField
                control={control}
                errors={errors}
                name={`platforms.${platformName}.text`}
                label="Text"
                type="text"
              />
            </div>

            <InputField
              control={control}
              errors={errors}
              name={`platforms.${platformName}.buttonText`}
              label="Button Text"
              type="text"
            />
          </div>
        ) : null,
      )}

      {/* Platform toggles */}
      <div className="flex flex-wrap gap-4">
        {audioPlatforms.map((platform) => (
          <div
            key={platform.name}
            className={`cursor-pointer p-2 border rounded-md flex flex-col items-center ${
              isSelected(platform.name)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
            onClick={() => togglePlatform(platform.name)}
          >
            <img src={platform.src} alt={platform.name} className="w-6 h-6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioPlatformInfo;
