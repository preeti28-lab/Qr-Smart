import React, { useEffect } from "react";
import InputField from "../../../../common/fields/InputField";
import { useForm, useWatch } from "react-hook-form";

const TextInfo = ({
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
    <div className="bg-white space-y-6 ">
      <InputField
        control={control}
        errors={errors}
        name="url"
        label="Website URL"
        type="text"
        defaultValue={currentFormData?.url || ""}
      />
    </div>
  );
};

export default TextInfo;
