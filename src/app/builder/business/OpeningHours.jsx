import React, { useEffect, useState } from "react";
import { useWatch, useFieldArray, Controller } from "react-hook-form";
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
  control,
  errors,
  setValue, // 👈 REQUIRED from parent
  onChange = () => {},
  currentFormData,
}) => {
  const [timeFormat, setTimeFormat] = useState("24");

  // 👇 WATCH parent form state
  const values = useWatch({ control });

  // ✅ SET DEFAULT VALUES FROM API
  useEffect(() => {
    if (currentFormData?.openingHours?.length > 0) {
      setValue("openingHours", currentFormData.openingHours);
    } else {
      setValue(
        "openingHours",
        daysOfWeek.map((day) => ({
          day,
          enabled: false,
          slots: [{ open: null, close: null }],
        })),
      );
    }
  }, [currentFormData, setValue]);

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
        <button type="button" onClick={() => setTimeFormat("12")}>
          12 Hrs
        </button>
        <button type="button" onClick={() => setTimeFormat("24")}>
          24 Hrs
        </button>
      </div>

      {daysOfWeek.map((day, index) => {
        const { fields, append, remove } = useFieldArray({
          control,
          name: `openingHours.${index}.slots`,
        });

        return (
          <div key={day} className="flex justify-between border-b pb-3">
            {/* LEFT */}
            <div className="flex items-center gap-3">
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
              <span>{day}</span>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-2">
              {fields.map((item, slotIndex) => {
                const isFirst = slotIndex === 0;

                return (
                  <div key={item.id} className="flex items-center gap-2">
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

                    {/* Buttons */}
                    {isFirst ? (
                      <button
                        type="button"
                        onClick={() => append({ open: null, close: null })}
                      >
                        <FiPlusCircle />
                      </button>
                    ) : (
                      <button type="button" onClick={() => remove(slotIndex)}>
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
