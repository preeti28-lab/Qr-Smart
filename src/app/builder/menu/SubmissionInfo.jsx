import React, { useEffect, useRef } from "react";
import InputField from "../../../common/fields/InputField";
import { useForm, useWatch, Controller } from "react-hook-form";
import { Radio } from "antd";
import isEqual from "lodash/isEqual";

const SubmissionInfo = ({ onChange = () => {}, currentFormData }) => {
  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contactType: "", // email / phone
      ...currentFormData,
    },
  });

  const values = useWatch({ control });
  const prevValuesRef = useRef(values);

  // Sync form when parent data changes
  useEffect(() => {
    if (!isEqual(currentFormData, prevValuesRef.current)) {
      reset(currentFormData || {});
    }
  }, [currentFormData, reset]);

  // Send form data to parent
  useEffect(() => {
    if (!isEqual(prevValuesRef.current, values)) {
      prevValuesRef.current = values;
      onChange(values);
    }
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-4 ">
      {/* Radio Selection */}
      <div>
        <p className="mb-1 font-medium text-sm">
          Choose the fields that will be mandatory or optional for the user when
          sending the feedback
        </p>
        <Controller
          control={control}
          name="contactType"
          render={({ field }) => (
            <Radio.Group
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <Radio value="email text-black">Mandatory Email</Radio>
              <Radio value="phone text-black">Mandatory Phone</Radio>
            </Radio.Group>
          )}
        />
      </div>
    </div>
  );
};

export default SubmissionInfo;
