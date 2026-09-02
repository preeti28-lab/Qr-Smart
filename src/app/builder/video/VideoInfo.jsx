import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import { useForm, useWatch } from "react-hook-form";

const VideoInfo = ({
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
    <div className="bg-white space-y-6 p-1 md:p-4">
      {/* Company */}
      <InputField
        control={control}
        errors={errors}
        name="company"
        label="Company"
        type="text"
        defaultValue={currentFormData?.company || ""}
      />

      {/* Video Title */}
      <InputField
        control={control}
        errors={errors}
        name="videoTitle"
        label="Video Title"
        type="text"
        defaultValue={currentFormData?.videoTitle || ""}
      />

      {/* Description */}
      <InputField
        control={control}
        errors={errors}
        name="description"
        label="Description"
        type="desc"
        defaultValue={currentFormData?.description || ""}
      />

      <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-md">
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

export default VideoInfo;
