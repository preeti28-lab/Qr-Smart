import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch } from "react-hook-form";
import GridShowcase from "../images/GridShowCase";

const ImageForm = ({control , errors , setValue , onChange = () => {}, currentFormData }) => {
  

  // ✅ useWatch is more stable than watch()
  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-6 ">
      <ImageField
        control={control}
        errors={errors}
        name="galleryImages"
        maxFiles={10}
        label="Upload Images "
        defaultValue={currentFormData?.image || []} // ✅ populate images
      />
      <GridShowcase onSelect={onChange} />
    </div>
  );
};

export default ImageForm;
