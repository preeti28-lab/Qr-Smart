import React, { useEffect } from "react";
import InputField from "../../../../common/fields/InputField";
import { useForm, useWatch, Controller } from "react-hook-form";

const TextInfo = ({ control , errors ,onChange = () => {}, currentFormData }) => {
  // const {
  //   formState: { errors },
  //   control,
  // } = useForm({
  //   defaultValues: currentFormData || {
  //     hiddenNetwork: false,
  //   },
  // });

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white grid grid-cols-2 gap-4 p-4">
      {/* Network Name */}
      <InputField
        control={control}
        errors={errors}
        name="networkName"
        label="Network Name"
        type="text"
        defaultValue={currentFormData?.networkName || ""}
      />

      {/* Network Password */}
      <InputField
        control={control}
        errors={errors}
        name="networkPassword"
        label="Network Password"
        type="password"
        defaultValue={currentFormData?.networkPassword || ""}
      />

      {/* Encryption Type */}
      <InputField
        control={control}
        errors={errors}
        name="encryptionType"
        label="Encryption Type"
        type="option"
        options={[
          { label: "WEP", value: "wep" },
          { label: "WPA", value: "wpa" },
          { label: "WPA2-EP", value: "wpa2-ep" },
          { label: "No Password", value: "nopass" },
        ]}
        defaultValue={currentFormData?.encryptionType || ""}
      />

      {/* Hidden Network Checkbox */}
      <Controller
        control={control}
        name="hiddenNetwork"
        defaultValue={currentFormData?.hiddenNetwork || false}
        render={({ field }) => (
          <label className="flex items-center gap-2 ">
            <input
              type="checkbox"
              {...field}
              checked={field.value}
              className="w-4 h-4"
            />
            <span className="text-sm">Hidden Network</span>
          </label>
        )}
      />
    </div>
  );
};

export default TextInfo;
