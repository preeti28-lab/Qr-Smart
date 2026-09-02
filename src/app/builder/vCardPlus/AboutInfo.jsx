import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch, Controller } from "react-hook-form";

const AboutInfo = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
  isEditMode,
  id,
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
    <div className="bg-white space-y-6 ">
      {/* Image Upload */}
      <ImageField
        control={control}
        errors={errors}
        name="profileImg"
        maxFiles={1}
        label="Upload Profile Image"
        defaultValue={currentFormData?.image || []}
        // isEditMode={isEditMode}
        // id={id}
      />

      {/* Name */}
      <InputField
        control={control}
        errors={errors}
        name="name"
        label="First Name"
        type="text"
        defaultValue={currentFormData?.name || ""}
      />

      {/* Surname */}
      <InputField
        control={control}
        errors={errors}
        name="surname"
        label="Surname"
        type="text"
        defaultValue={currentFormData?.surname || ""}
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

      {/* Text Align */}
      {/* <div>
        <InputField
          control={control}
          errors={errors}
          name="textAlign"
          label="Text Alignment"
          type="option"
          options={[
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
            { label: "Center", value: "center" },
          ]}

          // defaultValue={currentFormData?.title || ""}
        />
      </div> */}
    </div>
  );
};

export default AboutInfo;
