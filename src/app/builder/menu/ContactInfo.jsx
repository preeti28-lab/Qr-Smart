import React, { useEffect, useRef } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import InputField from "../../../common/fields/InputField";
import { Switch } from "antd";
import isEqual from "lodash/isEqual";

const ContactInfo = ({
  control,
  errors,
  reset,
  onChange = () => {},
  currentFormData,
}) => {
  // const {
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     // telephone: "",
  //     // email: "",
  //     // website:'',
  //     ...currentFormData,
  //   },
  // });

  const values = useWatch({ control });
  const prevValuesRef = useRef(values);

  // Sync form when parent data changes
  useEffect(() => {
    if (!isEqual(currentFormData, prevValuesRef.current)) {
      reset(currentFormData || {});
    }
  }, [currentFormData, reset]);

  // Send data to parent
  useEffect(() => {
    if (!isEqual(prevValuesRef.current, values)) {
      prevValuesRef.current = values;
      onChange(values);
    }
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-4">
      {/* Name */}

      <div className="grid grid-cols-2 gap-3">
        {/* Website */}
        <InputField
          control={control}
          errors={errors}
          name="telephone"
          type="numnber"
          label="Telephone"
        />

        {/* Website */}
        <InputField
          control={control}
          errors={errors}
          name="email"
          type="email"
          label="Email"
        />
      </div>

      {/* Website */}
      <InputField
        control={control}
        errors={errors}
        name="website"
        type="text"
        label="Website"
      />

      {/* Switch */}
    </div>
  );
};

export default ContactInfo;
