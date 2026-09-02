import React, { useEffect, useState } from "react";
import { useForm, useWatch, useFieldArray, Controller } from "react-hook-form";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const OpeningHours = ({
  // control,
  // errors,
  onChange = () => {},
  currentFormData,
}) => {
  const [timeFormat, setTimeFormat] = useState("24");

  const { control } = useForm({
    defaultValues: {
      openingHours:
        currentFormData?.openingHours?.length > 0
          ? currentFormData.openingHours
          : daysOfWeek.map((day) => ({
              day,
              enabled: false, // ❌ unchecked by default
              slots: [{ open: null, close: null }],
            })),
    },
  });

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange({ ...values, timeFormat });
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, timeFormat, onChange]);

  const format = timeFormat === "12" ? "hh:mm A" : "HH:mm";

  return (
    <div className="bg-white p-4 space-y-4">
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

      {daysOfWeek.map((day, index) => {
        const { fields, append, remove } = useFieldArray({
          control,
          name: `openingHours.${index}.slots`,
        });

        return (
          <div
            key={day}
            className="flex items-start justify-between border-b pb-3"
          >
            {/* LEFT */}
            <div className="flex items-center gap-3 min-w-[150px]">
              <Controller
                control={control}
                name={`openingHours.${index}.enabled`}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    {...field}
                    checked={field.value || false}
                  />
                )}
              />
              <span className="font-medium">{day}</span>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-2 flex-1">
              {fields.map((item, slotIndex) => {
                const isFirst = slotIndex === 0;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 justify-end"
                  >
                    {/* Open */}
                    <Controller
                      control={control}
                      name={`openingHours.${index}.slots.${slotIndex}.open`}
                      render={({ field }) => (
                        <TimePicker
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(val) =>
                            field.onChange(val ? val.toISOString() : null)
                          }
                          format={format}
                          use12Hours={timeFormat === "12"}
                          disabled={!values?.openingHours?.[index]?.enabled}
                        />
                      )}
                    />

                    <span>-</span>

                    {/* Close */}
                    <Controller
                      control={control}
                      name={`openingHours.${index}.slots.${slotIndex}.close`}
                      render={({ field }) => (
                        <TimePicker
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(val) =>
                            field.onChange(val ? val.toISOString() : null)
                          }
                          format={format}
                          use12Hours={timeFormat === "12"}
                          disabled={!values?.openingHours?.[index]?.enabled}
                        />
                      )}
                    />

                    {/* Icons */}
                    {isFirst ? (
                      <button
                        type="button"
                        onClick={() => append({ open: null, close: null })}
                        className="text-green-600 text-xl"
                        disabled={!values?.openingHours?.[index]?.enabled}
                      >
                        <FiPlusCircle />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => remove(slotIndex)}
                        className="text-red-500 text-xl"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OpeningHours;
