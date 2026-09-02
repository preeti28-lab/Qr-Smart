import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import InputField from "../../../common/fields/InputField";

const FooterInfo = ({
  control,
  errors,
  setValue,
  onChange = () => {},
  currentFormData,
}) => {
  // const { control, setValue, formState: { errors } } = useForm({
  //   defaultValues: {
  //     selectedOption: "", // track which checkbox is selected
  //     footerText: currentFormData?.footerText || "",
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

  // Handle checkbox click to allow only one selected
  const handleSelect = (option) => {
    setValue("selectedOption", values.selectedOption === option ? "" : option);
  };

  return (
    <div className="bg-gray-100 p-4 space-y-4 relative rounded-md">
      <p className="text-md font-semibold">Footer</p>

      {/* Footer Text Field */}
      <InputField
        control={control}
        errors={errors}
        name="footerText"
        type="text"
        label="Contact"
        placeholder="Enter footer text..."
      />

      {/* Mutually Exclusive Checkboxes */}
      {/* <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={values.selectedOption === "addContactAtTop"}
            onChange={() => handleSelect("addContactAtTop")}
            className="h-4 w-4 accent-blue-500"
          />
          Add contact at the top
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={values.selectedOption === "showFloating"}
            onChange={() => handleSelect("showFloating")}
            className="h-4 w-4 accent-blue-500"
          />
          Floating Button
        </label>
      </div> */}
    </div>
  );
};

export default FooterInfo;
