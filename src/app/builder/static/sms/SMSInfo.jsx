import React, { useEffect } from "react";
import InputField from "../../../../common/fields/InputField";
import { useForm, useWatch } from "react-hook-form";

const SMSInfo = ({ control, errors, onChange = () => {}, currentFormData }) => {
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
        name="number"
        label="Number"
        type="number"
        defaultValue={currentFormData?.number || ""}
      />

      <InputField
        control={control}
        errors={errors}
        name="message"
        label="Message"
        type="desc"
        defaultValue={currentFormData?.message || ""}
      />
    </div>
  );
};

export default SMSInfo;
