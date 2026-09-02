import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch } from "react-hook-form";

const SummaryInfo = ({ control , errors ,onChange = () => {}, currentFormData }) => {
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
    <div className="bg-white space-y-6">
      {/* Image Upload */}

      {/* Company Name */}
      <InputField
        control={control}
        errors={errors}
        name="summary"
        type="desc"
        defaultValue={currentFormData?.summary || ""}
      />
    </div>
  );
};

export default SummaryInfo;
