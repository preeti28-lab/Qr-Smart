import React, { useEffect, useRef } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch } from "react-hook-form";

const OfferInfo = ({
  control,
  errors,
  reset,
  onChange = () => {},
  currentFormData,
  isEditMode,
  id,
}) => {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current && currentFormData) {
      reset(currentFormData);
      isFirstMount.current = false;
    }
  }, [currentFormData, reset]);

  const values = useWatch({ control });

  const skipEmit = useRef(true);
  useEffect(() => {
    if (skipEmit.current) {
      skipEmit.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      // Preserve parent-owned fields like selectedTemplate that are
      // not controlled by this form so they never get wiped on emit
      onChangeRef.current({
        ...values,
        selectedTemplate: currentFormData?.selectedTemplate,
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, currentFormData?.selectedTemplate]);

  const showTwoImages = [1, 2, 3, 4, 5].includes(
    currentFormData?.selectedTemplate,
  );

  return (
    <div className="bg-white space-y-6 p-1 md:p-4">
      <ImageField
        control={control}
        errors={errors}
        name="image"
        maxFiles={1}
        label="Profile Image"
      />

      {showTwoImages && (
        <ImageField
          control={control}
          errors={errors}
          name="bannerImg"
          maxFiles={1}
          label="Banner Image"
        />
      )}

      <InputField
        control={control}
        errors={errors}
        name="title"
        label="Title"
        type="text"
      />

      <InputField
        control={control}
        errors={errors}
        name="description"
        label="Description"
        type="text"
      />
    </div>
  );
};

export default OfferInfo;
