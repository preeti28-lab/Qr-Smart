import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch, Controller } from "react-hook-form";

const ImagesGrid = ({ onChange = () => {}, currentFormData }) => {
  const {
    formState: { errors },
    control,
  } = useForm({
    defaultValues: currentFormData || {},
  });

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-6 ">
      {/* Image Upload */}
      <ImageField
        control={control}
        errors={errors}
        name="imageGrid"
        maxFiles={10}
        label="Upload Profile Image"
        defaultValue={currentFormData?.image || []}
      />
    </div>
  );
};

export default ImagesGrid;
