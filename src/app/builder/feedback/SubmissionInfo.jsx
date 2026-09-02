import React, { useEffect, useRef } from "react";
import { useWatch, Controller } from "react-hook-form";
import { Radio } from "antd";

const SubmissionInfo = ({ control, errors, reset, onChange = () => {}, currentFormData }) => {
  const feedbackMandatoryField = useWatch({ control, name: "feedbackMandatoryField" });
  const prevRef = useRef(feedbackMandatoryField);

  useEffect(() => {
    if (prevRef.current !== feedbackMandatoryField) {
      prevRef.current = feedbackMandatoryField;
      onChange({ feedbackMandatoryField });
    }
  }, [feedbackMandatoryField, onChange]);

  return (
    <div className="bg-white space-y-4">
      <div>
        <p className="mb-1 font-medium text-sm">
          Choose the fields that will be mandatory or optional for the user when
          sending the feedback
        </p>
        <Controller
          control={control}
          name="feedbackMandatoryField"
          render={({ field }) => (
            <Radio.Group
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <Radio value="email">Mandatory Email</Radio>
              <Radio value="phone">Mandatory Phone</Radio>
            </Radio.Group>
          )}
        />
      </div>
    </div>
  );
};

export default SubmissionInfo;