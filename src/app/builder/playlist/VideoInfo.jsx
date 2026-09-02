import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import { useForm, useWatch } from "react-hook-form";
import ImageField from "../../../common/fields/ImageField";

const VideoInfo = ({control , errors , onChange = () => {}, currentFormData }) => {
  // const {
  //   formState: { errors },
  //   control,
  // } = useForm({
  //   defaultValues: {
  //     title: "",
  //     description: "",
  //     name: "",
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

      {/* name */}
      <InputField
        control={control}
        errors={errors}
        name="name"
        label="Name"
        type="text"
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
    </div>
  );
};

export default VideoInfo;
