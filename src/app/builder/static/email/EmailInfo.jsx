import React, { useEffect } from "react";
import InputField from "../../../../common/fields/InputField";
import { useForm, useWatch } from "react-hook-form";

const EmailInfo = ({ control , errors , onChange = () => {}, currentFormData }) => {
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
        name="email"
        label="Email"
        type="email"
        defaultValue={currentFormData?.email || ""}
      />
      <InputField
        control={control}
        errors={errors}
        name="subject"
        label="Subject"
        type="text"
        defaultValue={currentFormData?.subject || ""}
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

export default EmailInfo;
