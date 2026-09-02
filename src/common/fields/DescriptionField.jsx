import React, { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";

const DescriptionField = ({
  control,
  errors,
  name,
  placeholder = "",
  className = "",
  parentClass = "",
  label = "",
  labelClass = "",
  disabled = false,
  defaultValue = "", // Added defaultValue prop
}) => {
  const textareaRef = useRef(null);
  const containerRef = useRef(null); // For scrolling into view on error

  // Auto-resize the textarea based on content
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to shrink if needed
      textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on content
    }
  };

  // Adjust height on initial render
  useEffect(() => {
    if (textareaRef.current) {
      handleInput();
    }
  }, []);

  // Scroll to the field if there is an error
  useEffect(() => {
    if (errors[name] && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      textareaRef.current?.focus(); // Optional: focus for better UX
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
      <div className="flex items-center w-full overflow-hidden bg-transparent rounded-2xl border-2 border-solid border-slate-300">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue} // This line is important
          render={({ field }) => (
            <textarea
              id={name}
              placeholder={placeholder}
              {...field}
              disabled={disabled}
              ref={textareaRef}
              onInput={(e) => {
                field.onChange(e); // Keep react-hook-form state in sync
                handleInput(); // Trigger auto-resize when typing
              }}
              className={
                "outline-none px-4 py-1 w-full placeholder:text-slate-700 placeholder:text-[14px] placeholder:font-medium" +
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

export default DescriptionField;