import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import { useForm, useWatch } from "react-hook-form";

const ContactInfo = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
}) => {
  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-6">
      {/* Telephone */}
      <InputField
        control={control}
        errors={errors}
        name="telephone"
        label="Telephone"
        type="text"
        defaultValue={currentFormData?.telephone || ""}
      />

      {/* Email */}
      <InputField
        control={control}
        errors={errors}
        name="email"
        label="Email"
        type="email"
        defaultValue={currentFormData?.email || ""}
      />

      {/* Website */}
      <InputField
        control={control}
        errors={errors}
        name="website"
        label="Website"
        type="text"
        defaultValue={currentFormData?.website || ""}
      />
    </div>
  );
};

export default ContactInfo;
