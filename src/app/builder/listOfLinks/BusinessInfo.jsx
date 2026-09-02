import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch } from "react-hook-form";

const BANNER_TEMPLATES = [1, 2, 3, 4, 5, 6];

const LinkListInfo = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
  selectedTemplate,
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

  const showBanner = BANNER_TEMPLATES.includes(selectedTemplate);

  return (
    <div className="bg-white space-y-6">
      {/* Logo Upload */}
      <ImageField
        control={control}
        errors={errors}
        name="logo"
        maxFiles={1}
        label="Upload Logo"
        // defaultValue={currentFormData?.image || []}
      />

      {/* Banner Image — only for templates 1–6 */}
      {showBanner && (
        <ImageField
          control={control}
          errors={errors}
          name="bannerImg"
          maxFiles={1}
          label="Upload Banner Image"
          // defaultValue={currentFormData?.bannerImg || []}
        />
      )}

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
    </div>
  );
};

export default LinkListInfo;
