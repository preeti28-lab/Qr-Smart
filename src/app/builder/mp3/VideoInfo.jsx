import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import { useForm, useWatch } from "react-hook-form";
import ImageField from "../../../common/fields/ImageField";

const VideoInfo = ({control , errors ,  onChange = () => {}, currentFormData }) => {
  // const {
  //   formState: { errors },
  //   control,
  // } = useForm({
  //   defaultValues: {
  //     title: "",
  //     description: "",
  //     website: "",
  //     buttonLabel: "",
  //     buttonLink: "",
  //     ...currentFormData,
  //   },
  // });

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-6 ">
      <ImageField
        control={control}
        errors={errors}
        name="cover"
        maxFiles={1}
        label="Upload Cover"
        defaultValue={currentFormData?.cover || []}
      />
      {/* Title */}
      <InputField
        control={control}
        errors={errors}
        name="title"
        label="Title"
        type="text"
      />

      {/* Description */}
      <InputField
        control={control}
        errors={errors}
        name="description"
        label="Description"
        type="desc"
      />

      {/* Website */}
      <InputField
        control={control}
        errors={errors}
        name="website"
        label="Website"
        type="text"
        placeholder="https://example.com"
      />

      {/* Button Section */}
      <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-md">
        {/* Button Label */}
        <InputField
          control={control}
          errors={errors}
          name="buttonLabel"
          label="Button Label"
          type="text"
        />

        {/* Button Link */}
        <InputField
          control={control}
          errors={errors}
          name="buttonLink"
          label="Button Link"
          type="text"
        />
      </div>
    </div>
  );
};

export default VideoInfo;
