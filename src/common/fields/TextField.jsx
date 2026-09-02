import React, { useRef, useEffect } from "react";
import { Controller } from "react-hook-form";

const TextField = ({
  control,
  errors,
  defaultValue,
  name,
  value,
  type = "text",
  placeholder = "",
  className = "",
  parentClass = "",
  label = "",
  labelClass = "",
  disabled = false,
}) => {
  const containerRef = useRef(null); // <-- Ref to scroll to

  // Scroll to the field if there is an error
  useEffect(() => {
    if (errors[name] && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errors, name]);

  return (
    <div
      ref={containerRef}
      className={
        "flex flex-col w-full gap-2" + (parentClass !== "" ? ` ${parentClass}` : "")
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
      <div className="flex items-center w-full overflow-hidden bg-transparent rounded-sm">
        <Controller
          name={name}
          control={control}
          className={"bg-transparent w-full"}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              id={name}
              type={type}
              placeholder={placeholder}
              {...field}
              disabled={disabled}
              className={
                "outline-none rounded-full placeholder:text-slate-700 placeholder:text-[14px] placeholder:font-medium py-1 px-4 border-2 border-solid border-slate-300 w-full" +
                (className !== "" ? ` ${className}` : "")
              }
            />
          )}
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-[12px]">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default TextField;