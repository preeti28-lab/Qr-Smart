import React, { useEffect, useRef } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch } from "react-hook-form";

const AppContent = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
  isEditMode,
  id,
  handleRefresh,
}) => {
  // const {
  //   formState: { errors },
  //   control,
  // } = useForm({
  //   defaultValues: currentFormData || {},
  // });

  const values = useWatch({ control });

  // ✅ was missing from the pasted code
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChangeRef.current(values);
    }, 300);
    return () => clearTimeout(timeout);
  }, [values]);

  return (
    <div className="bg-white space-y-6 p-1 md:p-4">
      <InputField
        control={control}
        errors={errors}
        name="appName"
        label="App Name"
        type="text"
      />
      <InputField
        control={control}
        errors={errors}
        name="developer"
        label="Developer / Company"
        type="text"
      />

      <ImageField
        control={control}
        errors={errors}
        name="image"
        maxFiles={1}
        label="Upload App Logo"
        isEditMode={isEditMode}
        id={id}
        handleRefresh={handleRefresh}
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
    </div>
  );
};

export default AppContent;
