import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch } from "react-hook-form";
import GridShowcase from "./GridShowCase";

const ImageContent = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
  isEditMode,
  id,
}) => {
  // console.log(currentFormData);

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-6 p-1 md:p-4">
      <InputField
        control={control}
        errors={errors}
        name="title"
        label="Image/Photo/Album Title"
        type="text"
      />

      <InputField
        control={control}
        errors={errors}
        name="description"
        label="Description"
        type="text"
      />

      <InputField
        control={control}
        errors={errors}
        name="website"
        label="Website"
        type="text"
      />

      <ImageField
        control={control}
        errors={errors}
        name="images"
        maxFiles={10}
        label="Upload Images "
        isEditMode={isEditMode}
        id={id}
      />
      {/* <GridShowcase /> */}
    </div>
  );
};

export default ImageContent;
