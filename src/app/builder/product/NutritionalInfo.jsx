import React, { useEffect, useState } from "react";
import InputField from "../../../common/fields/InputField";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { Collapse } from "antd";
import { FiTrash2 } from "react-icons/fi";

const { Panel } = Collapse;

const NutritionalInfo = ({ control , errors , reset ,onChange = () => {}, currentFormData }) => {
  // const {
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     header: "",
  //     title: "",
  //     description: "",
  //     nutritions: [], // renamed from ingredients
  //     ...currentFormData,
  //   },
  // });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "nutritions", // updated field array name
  });

  const values = useWatch({ control });
  const nutritions = useWatch({ control, name: "nutritions" }); // updated watch

  const [activeKey, setActiveKey] = useState(null);

  // Sync form with parent data
  useEffect(() => {
    reset(currentFormData || {});
  }, [currentFormData, reset]);

  // Send data to parent (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, onChange]);

  // Add new nutrition
  const handleAddNutrition = () => {
    const newIndex = fields.length;
    append({ nutrition: "", nutritionValue: "" });
    setActiveKey(String(newIndex));
  };

  // Remove nutrition
  const handleRemove = (index) => {
    remove(index);
    setActiveKey((prev) => {
      if (prev === String(index)) return null;
      if (Number(prev) > index) return String(Number(prev) - 1);
      return prev;
    });
  };

  return (
    <div className="bg-white space-y-6">
      {/* Collapse */}
      <InputField
        control={control}
        errors={errors}
        name="qualification"
        label="Qaulification"
        type="text"
      />
      <div>
        <Collapse
          accordion
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key || null)}
          bordered={false}
        >
          {fields.map((item, index) => (
            <Panel
              key={String(index)}
              header={
                nutritions?.[index]?.nutrition?.trim()
                  ? nutritions[index].nutrition
                  : `Nutrition ${index + 1}`
              }
              extra={
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  className="text-blue-500 hover:text-blue-600 border border-blue-500 p-1 rounded-full"
                >
                  <FiTrash2 />
                </button>
              }
            >
              <div className="grid md:grid-cols-2 gap-2 p-2">
                <InputField
                  control={control}
                  errors={errors}
                  name={`nutritions.${index}.nutrition`}
                  label="Nutrition"
                  type="text"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name={`nutritions.${index}.nutritionValue`}
                  label="Nutrition Value"
                  type="text"
                />
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>

      {/* Add Nutrition Button */}
      <button
        type="button"
        onClick={handleAddNutrition}
        className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100 transition-all"
      >
        + Add Nutrition
      </button>
    </div>
  );
};

export default NutritionalInfo;
