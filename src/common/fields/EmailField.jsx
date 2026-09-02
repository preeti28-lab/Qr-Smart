import React from "react";
import { Controller } from "react-hook-form";

const EmailField = ({
  control,
  errors,
  name,
  placeholder = "",
  className = "",
  parentClass = "",
  label = "",
  labelClass = "",
  disabled = false,
  defaultValue = "", // ✅ Added defaultValue prop
}) => {
  return (
    <div
      className={
        "flex flex-col w-full gap-2" +
        (parentClass !== "" ? ` ${parentClass}` : "")
      }
    >
      {label && (
        <label
          htmlFor={name}
          className={
            "font-medium ml-0.5 text-[#000000]" +
            (labelClass !== "" ? ` ${labelClass}` : "")
          }
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center w-full ${
          disabled ? "bg-[#eceff1] cursor-not-allowed" : "bg-transparent"
        } border-[#6E6E6E] overflow-hidden rounded-sm`}
      >
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue} // ✅ Passed defaultValue here
          render={({ field }) => (
            <input
              id={name}
              type="email"
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              className={
                "outline-none rounded-full placeholder:text-slate-700 placeholder:text-[14px] placeholder:font-medium py-1 px-4 border-2 border-solid border-slate-300 w-full" +
                (className !== "" ? ` ${className}` : "")
              }
            />
          )}
        />
      </div>
      {errors[name] && <p className="text-red-500 text-[12px]">{errors[name]?.message}</p>}
    </div>
  );
};

export default EmailField;
