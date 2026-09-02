import { Button } from "@material-tailwind/react";
import { Tooltip } from "antd";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineLock, MdOutlineMailOutline } from "react-icons/md";
import { Controller } from "react-hook-form";
import RichTextEditor from "./RichTextEditor";
import ImageField from "./ImageField";

const InputField = ({
  type = "text",
  name = "",
  control,
  errors,
  placeholder = "",
  parentClass = "",
  options = [],
  maxFiles = 5,
}) => {
  const [isShow, setIsShow] = useState(false);

  const errorClass = errors?.[name] ? "border-red-700" : "border-slate-400";
  const errorMessage = errors?.[name]?.message;

  return (
    <div className={`w-full ${parentClass}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          switch (type) {
            case "text":
              return (
                <div
                  className={`w-full border ${errorClass} text-slate-800 py-2 px-3 rounded-md`}
                >
                  <input
                    {...field}
                    type="text"
                    className="w-full outline-none bg-transparent placeholder:text-slate-800 text-[#000000]"
                    placeholder={placeholder}
                  />
                </div>
              );
            case "desc":
              return (
                <div
                  className={`w-full border ${errorClass} text-slate-800 py-2 px-3 rounded-md`}
                >
                  <textarea
                    {...field}
                    className="w-full outline-none bg-transparent placeholder:text-slate-800 text-[#000000] resize-none"
                    placeholder={placeholder}
                    rows={4} // Adjust the number of visible rows as needed
                  />
                </div>
              );

            case "dropdown":
              return (
                <div
                  className={`w-full border ${errorClass} text-slate-800 py-2 px-3 rounded-md`}
                >
                  <select
                    {...field}
                    className="w-full border-none outline-none bg-transparent text-[#000000]"
                  >
                    <option value="">Select an option</option>
                    {options?.map((opt, index) => (
                      <option key={index} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            case "image":
              return (
                <div className="w-full">
                  <ImageField
                    name={field.name}
                    control={control}
                    label={placeholder}
                    errors={errors}
                    maxFiles={maxFiles}
                  />
                </div>
              );
            case "password":
              return (
                <div
                  className={`w-full border ${errorClass} text-slate-800 py-2 px-3 flex items-center gap-x-2 rounded-md`}
                >
                  <MdOutlineLock size={22} />
                  <input
                    {...field}
                    type={isShow ? "text" : "password"}
                    className="w-full outline-none bg-transparent placeholder:text-slate-800 text-[#000000]"
                    placeholder={placeholder}
                  />
                  <Tooltip title={isShow ? "Hide" : "Show"} placement="top">
                    <Button
                      className="bg-transparent rounded-full hover:bg-slate-100 shadow-none hover:shadow-none text-slate-800 p-2"
                      onClick={() => setIsShow(!isShow)}
                    >
                      {isShow ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                    </Button>
                  </Tooltip>
                </div>
              );
            case "rich-text":
              return (
                <div className="w-full">
                  <RichTextEditor
                    name={field.name}
                    control={control}
                    label={placeholder}
                    errors={errors}
                  />
                </div>
              );
            case "email":
              return (
                <div
                  className={`w-full border ${errorClass} text-slate-800 py-3 px-3 flex items-center gap-x-2 rounded-md`}
                >
                  <MdOutlineMailOutline size={20} />
                  <input
                    {...field}
                    type="email"
                    className="w-full outline-none bg-transparent placeholder:text-slate-800 text-[#000000]"
                    placeholder={placeholder}
                  />
                </div>
              );
            default:
              return (
                <div
                  className={`w-full border ${errorClass} text-slate-800 py-2 px-3 rounded-md`}
                >
                  <input
                    {...field}
                    type="text"
                    className="w-full outline-none bg-transparent placeholder:text-slate-800 text-[#000000]"
                    placeholder={placeholder}
                  />
                </div>
              );
          }
        }}
      />
      {errorMessage && (
        <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputField;
