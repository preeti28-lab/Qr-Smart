import React, { useEffect } from "react";
import InputField from "../../../common/fields/InputField";
import { useForm, useWatch } from "react-hook-form";

const CouponInfo = ({ onChange = () => {}, currentFormData }) => {
  const {
    formState: { errors },
    control,
  } = useForm({
    defaultValues: currentFormData || {},
  });

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-6 p-1 md:p-4">
      {/* Coupon Code */}
      <InputField
        control={control}
        errors={errors}
        name="couponCode"
        label="Coupon Code"
        type="text"
        defaultValue={currentFormData?.couponCode || ""}
      />

      {/* Valid Until */}
      <InputField
        control={control}
        errors={errors}
        name="validUntil"
        label="Valid Until"
        type="date"
        defaultValue={currentFormData?.validUntil || ""}
      />

      {/* Terms & Conditions */}
      <InputField
        control={control}
        errors={errors}
        name="terms"
        label="Terms & Conditions"
        type="desc"
        defaultValue={currentFormData?.terms || ""}
      />

      <div className="grid grid-cols-2 gap-3">
        {/* Button Text */}
        <InputField
          control={control}
          errors={errors}
          name="buttonText"
          label="Button Text"
          type="text"
          defaultValue={currentFormData?.buttonText || ""}
        />

        {/* Button Link */}
        <InputField
          control={control}
          errors={errors}
          name="buttonLink"
          label="Button Link"
          type="text"
          defaultValue={currentFormData?.buttonLink || ""}
        />
      </div>
    </div>
  );
};

export default CouponInfo;
