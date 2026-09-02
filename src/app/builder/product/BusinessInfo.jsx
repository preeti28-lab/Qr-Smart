import React, { useEffect, useRef, useState } from "react";
import InputField from "../../../common/fields/InputField";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { Collapse } from "antd";
import { FiTrash2 } from "react-icons/fi";
import ImageField from "../../../common/fields/ImageField";
import isEqual from "lodash/isEqual";

const { Panel } = Collapse;

const BusinessInfo = ({
  control,
  errors,
  reset,
  onChange = () => {},
  currentFormData,
  // isEditMode,
  // id,
}) => {
  // const {
  //   control,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     header: "",
  //     title: "",
  //     description: "",
  //     categories: [],
  //     ...currentFormData,
  //   },
  // });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const values = useWatch({ control });
  const categories = useWatch({ control, name: "categories" });

  const [activeKey, setActiveKey] = useState(null);

  // ✅ Track previous values to prevent infinite loop
  const prevValuesRef = useRef(values);

  // Sync form when parent data changes
  useEffect(() => {
    if (!isEqual(currentFormData, prevValuesRef.current)) {
      reset(currentFormData || {});
    }
  }, [currentFormData, reset]);

  // Send form data to parent (ONLY if changed)
  useEffect(() => {
    if (!isEqual(prevValuesRef.current, values)) {
      prevValuesRef.current = values;
      onChange(values);
    }
  }, [values, onChange]);

  const handleAddCategory = () => {
    const newIndex = fields.length;
    append({ category: "", categoryValue: "" });
    setActiveKey(String(newIndex));
  };

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
      <ImageField
        control={control}
        errors={errors}
        name="profileImg"
        maxFiles={1}
        label="Upload Profile Image"
        defaultValue={currentFormData?.image || []}
        // isEditMode={isEditMode}
        // id={id}
      />

      <InputField
        control={control}
        errors={errors}
        name="title"
        label="Title"
        type="text"
      />

      <InputField
        control={control}
        errors={errors}
        name="description"
        label="Description"
        type="text"
      />

      <InputField
        control={control}
        errors={errors}
        name="header"
        label="Header"
        type="text"
      />

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
              categories?.[index]?.category?.trim()
                ? categories[index].category
                : `Category ${index + 1}`
            }
            extra={
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="text-blue-500 border border-blue-500 p-1 rounded-full"
              >
                <FiTrash2 />
              </button>
            }
          >
            <div className="grid md:grid-cols-2 gap-2">
              <InputField
                control={control}
                errors={errors}
                name={`categories.${index}.category`}
                label="Category"
                type="text"
              />
              <InputField
                control={control}
                errors={errors}
                name={`categories.${index}.categoryValue`}
                label="Category Value"
                type="text"
              />
            </div>
          </Panel>
        ))}
      </Collapse>

      <button
        type="button"
        onClick={handleAddCategory}
        className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100"
      >
        + Add Category
      </button>
    </div>
  );
};

export default BusinessInfo;
