import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch } from "react-hook-form";
import GridShowcaseIcons from "../../../components/builder/GridShowCase";

const ImageContent = ({
  control,
  errors,
  setValue,
  onChange = () => {},
  currentFormData,
  isEditMode,
  id,
}) => {
  // const {
  //   formState: { errors },
  //   control,
  //   setValue,
  // } = useForm({
  //   defaultValues: currentFormData || {}, // ✅ populate form with currentFormData
  // });

  // ✅ useWatch is more stable than watch()
  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-3">
      <ImageField
        control={control}
        errors={errors}
        name="image"
        maxFiles={10}
        label="Upload Images "
        // defaultValue={currentFormData?.image || []} // ✅ populate images
        id={id}
        isEditMode={isEditMode}
      />
      <GridShowcaseIcons onSelect={onChange} />
    </div>
  );
};

export default ImageContent;
