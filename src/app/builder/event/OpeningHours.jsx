import React, { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import InputField from "../../../common/fields/InputField";

const OpeningHours = ({control , errors , onChange = () => {}, currentFormData }) => {
  const [timeFormat, setTimeFormat] = useState("24");

  // const {
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     since: currentFormData?.since || null,
  //     until: currentFormData?.until || null,
  //     sinceTime: currentFormData?.sinceTime || null,
  //     untilTime: currentFormData?.untilTime || null,
  //   },
  // });

  const values = useWatch({ control });

  // Call onChange when values or format changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange({ ...values, timeFormat });
    }, 200);
    return () => clearTimeout(timeout);
  }, [values, timeFormat, onChange]);

  const format = timeFormat === "12" ? "hh:mm A" : "HH:mm";

  return (
    <div className="bg-white  space-y-4">
      {/* Time Format Toggle */}
      <div className="flex gap-3 mb-2">
        <button
          type="button"
          onClick={() => setTimeFormat("12")}
          className={`px-3 py-1 rounded-full text-sm border ${
            timeFormat === "12"
              ? "bg-blue-500 text-white"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          12 Hrs (AM/PM)
        </button>

        <button
          type="button"
          onClick={() => setTimeFormat("24")}
          className={`px-3 py-1 rounded-full text-sm border ${
            timeFormat === "24"
              ? "bg-blue-500 text-white"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          24 Hrs
        </button>
      </div>

      {/* Since Field */}
      <div className="flex items-end gap-2">
        <InputField
          control={control}
          errors={errors}
          name="since"
          label="Since"
          type="date"
          defaultValue={currentFormData?.since || ""}
        />
        <Controller
          control={control}
          name="sinceTime"
          render={({ field }) => (
            <TimePicker
              value={field.value ? dayjs(field.value) : null}
              onChange={(val) => field.onChange(val ? val.toISOString() : null)}
              format={format}
              use12Hours={timeFormat === "12"}
              placeholder="Select time"
            />
          )}
        />
      </div>

      {/* Until Field */}
      <div className="flex items-end gap-2">
        <InputField
          control={control}
          errors={errors}
          name="until"
          label="Until"
          type="date"
          defaultValue={currentFormData?.until || ""}
        />
        <Controller
          control={control}
          name="untilTime"
          render={({ field }) => (
            <TimePicker
              value={field.value ? dayjs(field.value) : null}
              onChange={(val) => field.onChange(val ? val.toISOString() : null)}
              format={format}
              use12Hours={timeFormat === "12"}
              placeholder="Select time"
            />
          )}
        />
      </div>
    </div>
  );
};

export default OpeningHours;
