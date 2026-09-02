import React, { useEffect, useRef } from "react";
import InputField from "../../../common/fields/InputField";
import { Switch, Radio } from "antd";
import { useForm, Controller, useWatch } from "react-hook-form";
import isEqual from "lodash/isEqual";

const BusinessInfo = ({ onChange = () => {}, currentFormData }) => {
  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      title: "",
      description: "",
      assessment: false,
      assessmentType: "", // 👈 only this is needed
      comments: false,
      ...currentFormData,
    },
  });

  const values = useWatch({ control });
  const prevValuesRef = useRef(values);

  useEffect(() => {
    if (!isEqual(currentFormData, prevValuesRef.current)) {
      reset(currentFormData || {});
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
      {/* Name */}
      <InputField
        control={control}
        errors={errors}
        name="name"
        label="Name"
        type="text"
      />

      {/* Title */}
      <InputField
        control={control}
        errors={errors}
        name="title"
        label="Title"
        type="text"
      />

      {/* Description */}
      <InputField
        control={control}
        errors={errors}
        name="description"
        label="Description"
        type="text"
      />

      {/* Assessment Switch */}
      <div className="flex flex-col items-start gap-2">
        <p>Assessment</p>
        <Controller
          control={control}
          name="assessment"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onChange={field.onChange}
              checkedChildren="Disabled"
              unCheckedChildren="OK"
            />
          )}
        />
      </div>

      {/* ONLY RADIO YOU NEED */}
      {!values.assessment && (
        <div>
          <Controller
            control={control}
            name="assessmentType"
            render={({ field }) => (
              <Radio.Group
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
                value={field.value}
              >
                <Radio value="rating">Ratings</Radio>
                <Radio value="yesNo">Answer (Yes / No)</Radio>
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
              checked={field.value}
              onChange={field.onChange}
              checkedChildren="Disabled"
              unCheckedChildren="OK"
            />
          )}
        />
      </div>
    </div>
  );
};

export default BusinessInfo;
