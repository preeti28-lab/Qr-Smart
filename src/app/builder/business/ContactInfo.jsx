import React, { useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import InputField from "../../../common/fields/InputField";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const ContactInfo = ({ control , errors , onChange = () => {}, currentFormData }) => {
 

  // Watch form values
  const values = useWatch({ control });

  // Notify parent of changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, onChange]);

  // Field arrays for dynamic phone and email groups
  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: "phones" });

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({ control, name: "emails" });

  return (
    <div className="bg-white space-y-6 ">
      {/* Name */}
      <InputField
        control={control}
        errors={errors}
        name="name"
        type="text"
        defaultValue={currentFormData?.name || ""}
        label="Name"
      />

      {/* Website */}
      <InputField
        control={control}
        errors={errors}
        name="website"
        type="text"
        defaultValue={currentFormData?.website || ""}
        label="Website"
      />

      {/* Phone Groups */}
      <div className="space-y-4">
        <h3 className="font-semibold">Telephone</h3>
        {phoneFields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-wrap gap-2 items-center mb-3 bg-gray-50 p-3 rounded-lg"
          >
            <InputField
              control={control}
              errors={errors}
              name={`phones.${index}.title`}
              type="text"
              defaultValue={field.title}
              placeholder="Phone Title"
            />
            <InputField
              control={control}
              errors={errors}
              name={`phones.${index}.number`}
              type="text"
              defaultValue={field.number}
              placeholder="Number"
            />
            <button
              type="button"
              onClick={() => removePhone(index)}
              className="text-blue-500 hover:text-blue-600 border border-blue-500 p-1 rounded-full"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendPhone({ title: "", number: "" })}
          className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out"
        >
          <FiPlus size={16} />
          Add Phone
        </button>
      </div>

      {/* Email Groups */}
      <div className="space-y-4 mt-4">
        <h3 className="font-semibold">Email</h3>
        {emailFields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-wrap gap-2 items-center mb-3 bg-gray-50 p-3 rounded-lg"
          >
            <InputField
              control={control}
              errors={errors}
              name={`emails.${index}.emailLabel`}
              type="text"
              defaultValue={field.emailLabel}
              placeholder="Label"
            />
            <InputField
              control={control}
              errors={errors}
              name={`emails.${index}.email`}
              type="email"
              defaultValue={field.email}
              placeholder="Eg. name@email.com"
            />
            <button
              type="button"
              onClick={() => removeEmail(index)}
              className="text-blue-500 hover:text-blue-600 border border-blue-500 p-1 rounded-full"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendEmail({ emailLabel: "", email: "" })}
          className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out"
        >
          <FiPlus size={16} />
          Add Email
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;
