import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import InputField from "../../../common/fields/InputField";

const SummaryInfo = ({ control , errors , onChange = () => {}, currentFormData }) => {
  // const {
  //   control,
  //   formState: { errors },
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

      {/* Summary Field */}
      <InputField
        control={control}
        errors={errors}
        name="summary"
        // label="Summary"
        type="desc"
        placeholder="Enter summary..."
        defaultValue={currentFormData?.summary || ""}
      />

    </div>
  );
};

export default SummaryInfo;