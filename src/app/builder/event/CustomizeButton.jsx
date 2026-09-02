import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import InputField from "../../../common/fields/InputField";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const CustomizeButton = ({ control , errors ,onChange = () => {}, currentFormData }) => {
  // const {
  //   control,
  //   formState: { errors },
  //   register,
  // } = useForm({
  //   defaultValues: currentFormData || {
  //     calendar: "",
  //     website: "",
  //   },
  // });

  // Watch form values
  const values = useWatch({ control });

  // Notify parent of changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-6 ">
      <div className="flex gap-2">
        {/* Name */}
        <InputField
          control={control}
          errors={errors}
          name="calendar"
          type="text"
          defaultValue={currentFormData?.calendar || ""}
          label="Calendar"
        />
      </div>
    </div>
  );
};

export default CustomizeButton;
