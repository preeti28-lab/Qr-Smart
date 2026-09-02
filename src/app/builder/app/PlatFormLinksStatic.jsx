import React, { useEffect, useRef } from "react";
import InputField from "../../../common/fields/InputField";
import { useForm, useWatch } from "react-hook-form";

const platforms = [
  {
    key: "googlePlayBtn",
    linkKey: "googlePlayLink",
    label: "Google Play App Button",
    defaultValue: "Get it on",
  },
  {
    key: "appleBtn",
    linkKey: "appleLink",
    label: "Apple App Store Button",
    defaultValue: "Download on the",
  },
  {
    key: "amazonBtn",
    linkKey: "amazonLink",
    label: "Amazon Appstore Button",
    defaultValue: "Download Now",
  },
];

const PlatformLinksStatic = ({
  control,
  errors,
  reset,
  getDefaultValues,
  onChange = () => {},
  currentFormData,
}) => {
  // ✅ helper to build default values
  // const getDefaultValues = (data) => {
  //   return platforms.reduce((acc, platform) => {
  //     acc[platform.key] = data?.[platform.key] || platform.defaultValue;
  //     return acc;
  //   }, {});
  // };

  // const {
  //   control,
  //   formState: { errors },
  //   reset,
  // } = useForm({
  //   defaultValues: getDefaultValues(currentFormData),
  // });

  const values = useWatch({ control });

  // ✅ prevent unnecessary reset loops
  const prevDefaultsRef = useRef();

  useEffect(() => {
    if (!currentFormData) return;

    const newDefaults = getDefaultValues(currentFormData);

    const isSame =
      JSON.stringify(prevDefaultsRef.current) === JSON.stringify(newDefaults);

    if (!isSame) {
      reset(newDefaults);
      prevDefaultsRef.current = newDefaults;
    }
  }, [currentFormData, reset]);

  // ✅ prevent infinite loop when calling onChange
  const prevValuesRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isSame =
        JSON.stringify(prevValuesRef.current) === JSON.stringify(values);

      if (!isSame) {
        prevValuesRef.current = values;

        onChange({
          ...currentFormData,
          ...values,
        });
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [values, onChange]); // 🚫 no currentFormData here

  // ✅ show only platforms with link
  const activePlatforms = platforms.filter((p) => currentFormData?.[p.linkKey]);

  return (
    <div className="bg-white space-y-6 p-1 md:p-4">
      {activePlatforms.length === 0 && (
        <p className="text-gray-500 text-sm">No platform links added yet.</p>
      )}

      {activePlatforms.map((platform) => (
        <InputField
          key={platform.key}
          control={control}
          errors={errors}
          name={platform.key}
          label={platform.label}
          type="text"
        />
      ))}
    </div>
  );
};

export default PlatformLinksStatic;
