import React, { useEffect } from "react";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import InputField from "../../../common/fields/InputField";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const CompanyProfessionInfo = ({ control , errors , onChange = () => {}, currentFormData }) => {
 

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, onChange]);

  const { fields, append, remove } = useFieldArray({ control, name: "companies" });

  return (
    <div className="bg-white space-y-8">
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">Companies & Professions</p>
          <button
            type="button"
            onClick={() => append({ companyName: "", profession: "" })}
            className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out"
          >
            <FiPlus size={16} />
            Add Company
          </button>
        </div>

        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-2 items-center mb-3 bg-gray-100 p-3 rounded-lg"
          >
            <InputField
              control={control}
              errors={errors}
              name={`companies.${index}.companyName`}
              placeholder="Company Name"
              type="text"
            />

            <InputField
              control={control}
              errors={errors}
              name={`companies.${index}.profession`}
              placeholder="Profession / Role"
              type="text"
            />

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-blue-500 hover:text-blue-600 border border-blue-500 p-1 rounded-full"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProfessionInfo;