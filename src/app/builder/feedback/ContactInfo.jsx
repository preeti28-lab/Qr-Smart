import React, { useEffect, useRef } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import InputField from "../../../common/fields/InputField";
import { Switch } from "antd";
import isEqual from "lodash/isEqual";

const ContactInfo = ({control , errors , reset, onChange = () => {}, currentFormData }) => {
  // const {
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     name: "",
  //     website: "",
  //     enableEmailReviews: false, // ✅ switch
  //     email: "", // ✅ conditional field
  //     message: "", // ✅ always visible field
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

      <div className="">
        <span className="font-medium">Enable sending reviews by email</span> <br />
        <Controller
          control={control}
          name="enableEmailReviews"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onChange={field.onChange}
              checkedChildren="Enabled"
              unCheckedChildren="Disabled"
            />
          )}
        />
      </div>

      {/* Conditional Email Field */}
      {values.enableEmailReviews && (
        <InputField
          control={control}
          errors={errors}
          name="email"
          type="email"
          label="Email"
          placeholder="Enter email"
        />
      )}

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
