import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import InputField from "../../common/fields/InputField";

const TABS = {
  MANUAL: "manual",
  URL: "url",
  COORDS: "coords",
};

const getValidMode = (mode) => {
  const validModes = Object.values(TABS);
  return validModes.includes(mode) ? mode : TABS.MANUAL;
};

const LocationInfo = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
}) => {
  const [activeTab, setActiveTab] = useState(
    getValidMode(currentFormData?.mode),
  );

  const values = useWatch({ control: control ?? undefined });

  useEffect(() => {
    if (!currentFormData?.mode) return;
    setActiveTab(getValidMode(currentFormData.mode));
  }, [currentFormData?.mode]);

  useEffect(() => {
    if (!control) return;

    const timeout = setTimeout(() => {
      onChange({
        ...values,
        mode: activeTab,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [values, activeTab, onChange, control]);

  if (!control) return null;

  return (
    <div className="bg-white space-y-4">
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {[
          { key: TABS.MANUAL, label: "Manual" },
          { key: TABS.URL, label: "URL" },
          { key: TABS.COORDS, label: "Coordinates" },
        ].map((tab) => (
          <button
            type="button"
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === tab.key
                ? "bg-blue-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === TABS.MANUAL && (
        <div className="space-y-3">
          <InputField
            control={control}
            errors={errors}
            name="street"
            label="Street"
            type="text"
          />

          <InputField
            control={control}
            errors={errors}
            name="number"
            label="Number"
            type="text"
          />

          <InputField
            control={control}
            errors={errors}
            name="postalCode"
            label="Postal Code"
            type="text"
          />

          <InputField
            control={control}
            errors={errors}
            name="city"
            label="City"
            type="text"
          />

          <InputField
            control={control}
            errors={errors}
            name="state"
            label="State / Province"
            type="text"
          />

          <InputField
            control={control}
            errors={errors}
            name="country"
            label="Country"
            type="text"
          />
        </div>
      )}

      {activeTab === TABS.URL && (
        <div className="space-y-3">
          <InputField
            control={control}
            errors={errors}
            name="locationUrl"
            label="Google Maps / Location URL"
            type="text"
            placeholder="https://maps.google.com/..."
          />
        </div>
      )}

      {activeTab === TABS.COORDS && (
        <div className="space-y-3">
          <InputField
            control={control}
            errors={errors}
            name="latitude"
            label="Latitude"
            type="text"
            placeholder="e.g. 28.6139"
          />

          <InputField
            control={control}
            errors={errors}
            name="longitude"
            label="Longitude"
            type="text"
            placeholder="e.g. 77.2090"
          />
        </div>
      )}
    </div>
  );
};

export default LocationInfo;
