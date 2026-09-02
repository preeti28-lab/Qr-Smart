import React, { useEffect } from "react";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import InputField from "../../../common/fields/InputField";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const ContactInfo = ({control , errors ,  onChange = () => {}, currentFormData }) => {
  // const {
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     phones: [],
  //     emails: [],
  //     websites: [],
  //     ...currentFormData,
  //   },
  // });

  const values = useWatch({ control });

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(values);
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, onChange]);

  const {
    fields: phoneFields,
    append: addPhone,
    remove: removePhone,
  } = useFieldArray({ control, name: "phones" });

  const {
    fields: emailFields,
    append: addEmail,
    remove: removeEmail,
  } = useFieldArray({ control, name: "emails" });

  const {
    fields: websiteFields,
    append: addWebsite,
    remove: removeWebsite,
  } = useFieldArray({ control, name: "websites" });

  return (
    <div className="bg-white space-y-8">
      {/* 📞 Phones */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">Phone Numbers</p>
          <button
            type="button"
            onClick={() => addPhone({ type: "mobile", label: "", number: "" })}
            className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full  text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out"
          >
            <FiPlus size={16} />
            Add Phone
          </button>
        </div>

        {phoneFields.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-2 items-center mb-3 bg-gray-100 p-3 rounded-lg"
          >
            <InputField
              control={control}
              errors={errors}
              name={`phones.${index}.type`}
              type="option"
              options={[
                { label: "Mobile", value: "mobile" },
                { label: "Home", value: "home" },
                { label: "Work", value: "work" },
                { label: "Fax", value: "fax" },
                { label: "Other", value: "other" },
              ]}
            />

            <InputField
              control={control}
              errors={errors}
              name={`phones.${index}.label`}
              placeholder="Label"
              type="text"
            />

            <InputField
              control={control}
              errors={errors}
              name={`phones.${index}.number`}
              placeholder="Phone Number"
              type="text"
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
      </div>

      {/* 📧 Emails */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">Emails</p>
          <button
            type="button"
            onClick={() => addEmail({ label: "", email: "" })}
            className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full  text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out"
          >
            <FiPlus size={16} />
            Add Email
          </button>
        </div>

        {emailFields.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-2 items-center mb-3 bg-gray-100 p-3 rounded-lg"
          >
            <InputField
              control={control}
              errors={errors}
              name={`emails.${index}.label`}
              placeholder="Label"
              type="text"
            />

            <InputField
              control={control}
              errors={errors}
              name={`emails.${index}.email`}
              placeholder="Email"
              type="email"
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
      </div>

      {/* 🌐 Websites */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">Websites</p>
          <button
            type="button"
            onClick={() => addWebsite({ label: "", url: "" })}
            className="flex items-center gap-1 text-blue-800 px-2 py-1 rounded-full  text-sm bg-blue-50 hover:bg-blue-100 transition-all duration-300 ease-in-out"
          >
            <FiPlus size={16} />
            Add Website
          </button>
        </div>

        {websiteFields.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-2 items-center mb-3 bg-gray-100 p-3 rounded-lg"
          >
            <InputField
              control={control}
              errors={errors}
              name={`websites.${index}.label`}
              placeholder="Label"
              type="text"
            />

            <InputField
              control={control}
              errors={errors}
              name={`websites.${index}.url`}
              placeholder="Website URL"
              type="text"
            />

            <button
              type="button"
              onClick={() => removeWebsite(index)}
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

export default ContactInfo;
