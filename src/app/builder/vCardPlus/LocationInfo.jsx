import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import InputField from "../../../common/fields/InputField";

const LocationInfo = ({ onChange = () => {}, currentFormData }) => {
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      show: true,
      ...currentFormData,
    },
  });

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-3 ">
      {/* Street */}
      <InputField
        control={control}
        errors={errors}
        name="street"
        label="Street"
        type="text"
        defaultValue={currentFormData?.street || ""}
      />

      {/* Number */}
      <InputField
        control={control}
        errors={errors}
        name="number"
        label="Number"
        type="text"
        defaultValue={currentFormData?.number || ""}
      />

      {/* Postal Code */}
      <InputField
        control={control}
        errors={errors}
        name="postalCode"
        label="Postal Code"
        type="text"
        defaultValue={currentFormData?.postalCode || ""}
      />

      {/* City */}
      <InputField
        control={control}
        errors={errors}
        name="city"
        label="City"
        type="text"
        defaultValue={currentFormData?.city || ""}
      />

      {/* State / Province */}
      <InputField
        control={control}
        errors={errors}
        name="state"
        label="State / Province"
        type="text"
        defaultValue={currentFormData?.state || ""}
      />

      {/* Country */}
      <InputField
        control={control}
        errors={errors}
        name="country"
        label="Country"
        type="text"
        defaultValue={currentFormData?.country || ""}
      />
    </div>
  );
};

export default LocationInfo;
