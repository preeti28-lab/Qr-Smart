import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch, Controller } from "react-hook-form";

const OfferInfo = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
  // isEditMode,
  // id,
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
    <div className="bg-white space-y-6 p-1 md:p-4">
      <ImageField
        control={control}
        errors={errors}
        name="image"
        maxFiles={1}
        label="Upload Image"
        defaultValue={currentFormData?.image || []}
        // isEditMode={isEditMode}
        // id={id}
      />

      {/* Background Color Picker */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Image Background Color
        </label>

        <Controller
          control={control}
          name="backgroundColor"
          defaultValue={currentFormData?.backgroundColor || "#ffffff"}
          render={({ field }) => (
            <div className="flex items-center gap-3">
              <input
                type="color"
                {...field}
                className="w-8 h-8 border rounded-lg cursor-pointer"
              />

              <input
                type="text"
                {...field}
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        />
      </div>

      {/* Company Name */}
      <InputField
        control={control}
        errors={errors}
        name="companyName"
        label="Company Name"
        type="text"
        defaultValue={currentFormData?.companyName || ""}
      />

      {/* Title */}
      <InputField
        control={control}
        errors={errors}
        name="title"
        label="Title"
        type="text"
        defaultValue={currentFormData?.title || ""}
      />

      {/* Description */}
      <InputField
        control={control}
        errors={errors}
        name="description"
        label="Description"
        type="text"
        defaultValue={currentFormData?.description || ""}
      />

      {/* Sales Badge */}
      <InputField
        control={control}
        errors={errors}
        name="salesBadge"
        label="Sales Badge (e.g. 50% OFF)"
        type="text"
        defaultValue={currentFormData?.salesBadge || ""}
      />

      {/* Image Upload */}
    </div>
  );
};

export default OfferInfo;
