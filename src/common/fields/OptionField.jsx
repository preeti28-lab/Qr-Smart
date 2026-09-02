import React from "react";
import { Select } from "antd";
import { Controller } from "react-hook-form";

const OptionField = ({
  control,
  errors,
  name,
  options = [],
  placeholder = "",
  className = "",
  onSelectChange = () => {},
  label = "",
  labelClass = "",
  parentClass = "",
  disabled = false,
  defaultValue = null,
}) => {
  return (
    <div className={`flex flex-col w-full gap-2 ${parentClass}`}>
      {/* Inline style override */}
      <style>
        {`
    .custom-select .ant-select-selector {
      border-radius: 9999px !important;
      border: 2px solid #cbd5e1 !important;
      padding: 6px 12px;
      box-shadow: none !important;
    }

    .custom-select .ant-select-selector:hover {
      border-color: #94a3b8 !important; /* slightly darker on hover */
    }

    .custom-select.ant-select-focused .ant-select-selector {
      border-color: #64748b !important;
      box-shadow: 0 0 0 2px rgba(100, 116, 139, 0.2) !important;
    }
  `}
      </style>

      {label && (
        <label
          htmlFor={name}
          className={`font-medium ml-0.5 text-[#000000] ${labelClass}`}
        >
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            placeholder={placeholder}
            onChange={(selectedOption) => {
              onChange(selectedOption || null);
              onSelectChange(selectedOption);
            }}
            onBlur={onBlur}
            disabled={disabled}
            ref={ref}
            value={value}
            className={`w-full custom-select h-[35px] ${
              disabled ? "" : "bg-transparent"
            } ${className}`}
          >
            {options.map((item, index) => (
              <Select.Option
                key={index}
                value={item.value}
                className="capitalize"
              >
                {item.label}
              </Select.Option>
            ))}
          </Select>
        )}
      />

      {errors[name] && (
        <p className="text-red-500 text-[12px]">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default OptionField;
