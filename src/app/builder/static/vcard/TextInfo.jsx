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
  //   defaultValues: currentFormData || {
  //     fullName: "",
  //     organization: "",
  //     title: "",
  //     phone: "",
  //     email: "",
  //     website: "",
  //     address: "",
  //     note: "",
  //     message: "",
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
    <div className="bg-white space-y-6">
      <InputField
        control={control}
        errors={errors}
        name="fullName"
        label="Full Name"
        type="text"
        defaultValue={currentFormData?.fullName || ""}
      />

      <InputField
        control={control}
        errors={errors}
        name="organization"
        label="Organization"
        type="text"
        defaultValue={currentFormData?.organization || ""}
      />

      <InputField
        control={control}
        errors={errors}
        name="title"
        label="Title"
        type="text"
        defaultValue={currentFormData?.title || ""}
      />

      <InputField
        control={control}
        errors={errors}
        name="phone"
        label="Phone Number"
        type="tel"
        defaultValue={currentFormData?.phone || ""}
      />

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
        name="website"
        label="Website"
        type="url"
        defaultValue={currentFormData?.website || ""}
      />

      <InputField
        control={control}
        errors={errors}
        name="address"
        label="Address"
        type="text"
        defaultValue={currentFormData?.address || ""}
      />

      <InputField
        control={control}
        errors={errors}
        name="note"
        label="Note"
        type="text"
        defaultValue={currentFormData?.note || ""}
      />

      {/* Optional message field */}
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

export default TextInfo;
