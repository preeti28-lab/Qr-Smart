import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch } from "react-hook-form";

const BusinessInfo = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
}) => {
  // const {
  //   formState: { errors },
  //   control,
  // } = useForm({
  //   defaultValues: currentFormData || {},
  // });

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-6">
      {/* Image Upload */}
      <ImageField
        control={control}
        errors={errors}
        name="image"
        maxFiles={1}
        label="Upload Images"
        defaultValue={currentFormData?.image || []}
      />

      {/* Company Name */}
      <InputField
        control={control}
        errors={errors}
        name="title"
        label="Title"
        type="text"
        defaultValue={currentFormData?.title || ""}
      />

      {/* Subtitle */}
      <InputField
        control={control}
        errors={errors}
        name="description"
        label="Description"
        type="text"
        defaultValue={currentFormData?.description || ""}
      />

      <div className="grid grid-cols-2 gap-3">
        {/* Button Text */}
        <InputField
          control={control}
          errors={errors}
          name="buttonText"
          label="Button Text"
          type="text"
          defaultValue={currentFormData?.buttonText || ""}
        />

        {/* Button Link */}
        <InputField
          control={control}
          errors={errors}
          name="buttonLink"
          label="Button Link"
          type="text"
          defaultValue={currentFormData?.buttonLink || ""}
        />
      </div>
    </div>
  );
};

export default BusinessInfo;
