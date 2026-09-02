import React, { useEffect, useState } from "react";
import InputField from "../../../common/fields/InputField";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { Collapse } from "antd";
import { FiTrash2 } from "react-icons/fi";

const { Panel } = Collapse;

const IngredientsInfo = ({ control , errors ,reset , onChange = () => {}, currentFormData }) => {
  // const {
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     header: "",
  //     title: "",
  //     description: "",
  //     ingredients: [], // renamed from categories
  //     ...currentFormData,
  //   },
  // });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients", // updated field array name
  });

  const values = useWatch({ control });
  const ingredients = useWatch({ control, name: "ingredients" });

  const [activeKey, setActiveKey] = useState(null);

  // Sync form when parent data changes
  useEffect(() => {
    reset(currentFormData || {});
  }, [currentFormData, reset]);

  // Send form data to parent (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, onChange]);

  // Add new ingredient
  const handleAddIngredient = () => {
    const newIndex = fields.length;
    append({ name: "" });
    setActiveKey(String(newIndex)); // open newly added
  };

  // Remove ingredient
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
                ingredients?.[index]?.name?.trim()
                  ? ingredients[index].name
                  : `Ingredient ${index + 1}`
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
              <div className="p-2">
                <InputField
                  control={control}
                  errors={errors}
                  name={`ingredients.${index}.name`}
                  label="Ingredient Name"
                  type="text"
                />
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>

      {/* Add Ingredient Button */}
      <button
        type="button"
        onClick={handleAddIngredient}
        className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100 transition-all"
      >
        + Add Ingredient
      </button>
    </div>
  );
};

export default IngredientsInfo;
