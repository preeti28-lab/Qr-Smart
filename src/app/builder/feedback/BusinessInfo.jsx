import React, { useEffect, useRef } from "react";
import InputField from "../../../common/fields/InputField";
import { Switch, Radio } from "antd";
import { useForm, Controller, useWatch } from "react-hook-form";
import isEqual from "lodash/isEqual";

const BusinessInfo = ({ control , errors , reset , onChange = () => {}, currentFormData }) => {
  // const {
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     name: "",
  //     title: "",
  //     description: "",
  //     assessment: true,       // ✅ default ON
  //     assessmentType: "rating", // optional default
  //     comments: true,        // ✅ default ON
  //     ...currentFormData,
  //   },
  // });

  const values = useWatch({ control });
  const prevValuesRef = useRef(values);

  useEffect(() => {
    if (!isEqual(currentFormData, prevValuesRef.current)) {
      reset({
        name: "",
        title: "",
        description: "",
        assessment: true,
        assessmentType: "rating",
        comments: true,
        ...currentFormData,
      });
    }
  }, [currentFormData, reset]);

  useEffect(() => {
    if (!isEqual(prevValuesRef.current, values)) {
      prevValuesRef.current = values;
      onChange(values);
    }
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-4">
      <InputField control={control} errors={errors} name="name" label="Name" type="text" />
      <InputField control={control} errors={errors} name="title" label="Title" type="text" />
      <InputField control={control} errors={errors} name="description" label="Description" type="text" />

      {/* Assessment Switch */}
      <div className="flex flex-col items-start gap-2">
        <p>Assessment</p>
        <Controller
          control={control}
          name="assessment"
          render={({ field }) => (
            <Switch
              checked={field.value}   // ✅ true = enabled
              onChange={field.onChange}
              checkedChildren="ON"
              unCheckedChildren="OFF"
            />
          )}
        />
      </div>

      {/* Show options when assessment is enabled */}
      {values.assessment && (
        <div>
          <Controller
            control={control}
            name="assessmentType"
            render={({ field }) => (
              <Radio.Group
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              >
                <Radio value="rating">Ratings</Radio>
                <Radio value="yesNo">Yes / No</Radio>
              </Radio.Group>
            )}
          />
        </div>
      )}

      {/* Comments Switch */}
      <div className="flex flex-col items-start gap-2">
        <span>Allow Comments</span>
        <Controller
          control={control}
          name="comments"
          render={({ field }) => (
            <Switch
              checked={field.value}   // ✅ true = allowed
              onChange={field.onChange}
              checkedChildren="ON"
              unCheckedChildren="OFF"
            />
          )}
        />
      </div>
    </div>
  );
};

export default BusinessInfo;