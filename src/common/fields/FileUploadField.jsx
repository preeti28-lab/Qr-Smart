import React, { useRef, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { LuFilePlus } from "react-icons/lu";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { delteQRAsset } from "../../redux/features/qrcodes";

const FileUploadField = ({
  control,
  errors,
  name,
  maxFiles = 5,
  label = "",
  labelClass = "",
  accept = ".pdf",
  disabled,
  isEditMode,
  id,
}) => {
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const files = useWatch({ control, name }) || [];

  useEffect(() => {
    if (errors[name] && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errors, name]);

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file?.blobURL && file.blobURL.startsWith("blob:")) {
          URL.revokeObjectURL(file.blobURL);
        }
      });
    };
  }, [files]);

  const getAllowedTypes = () => {
    return accept
      .split(",")
      .map((ext) => ext.trim().toLowerCase())
      .map((ext) => {
        if (ext === ".pdf") return "application/pdf";
        if (ext === ".mp4") return "video/mp4";
        if (ext === ".mp3") return "audio/mpeg";
        return "";
      })
      .filter(Boolean);
  };

  const allowedTypes = getAllowedTypes();

  // ✅ Resolve server asset URL from whichever key exists on the file object
  const resolveAssetUrl = (file) => {
    return (
      file?.audioUrl ||   // playlist/mp3 builder
      file?.fileUrl ||    // generic
      file?.pdfUrl ||     // pdf builder
      file?.videoUrl ||   // video builder
      null
    );
  };

  const handleDelete = (file, index, value, onChange) => {
    const assetUrl = resolveAssetUrl(file);
    const isExistingServerFile = file?.isExisting && !!assetUrl;

    // ✅ Only call delete API for existing server files
    if (isEditMode && isExistingServerFile && id) {
      const payload = { qrId: id, assetUrl };
      dispatch(delteQRAsset(payload, () => {}));
    }

    // ✅ Cleanup blob URL for newly uploaded files
    if (file?.blobURL && file.blobURL.startsWith("blob:")) {
      URL.revokeObjectURL(file.blobURL);
    }

    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div ref={containerRef} className="w-full">
      {label && (
        <label
          htmlFor={name}
          className={`font-medium ml-0.5 text-[#000000] ${labelClass}`}
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { value = [], onChange } }) => (
          <>
            <div className="border border-solid border-gray-500 rounded-md sm:p-3">
              <div className="flex flex-col gap-4 w-full">
                {value.length > 0 &&
                  value.map((file, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border border-gray-300 p-2 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <span className="truncate max-w-[200px] text-sm">
                          {file?.fileName || file?.name}
                        </span>
                        {/* ✅ Badge for existing server files */}
                        {file?.isExisting && (
                          <span className="text-xs text-green-600 font-medium shrink-0">
                            ✓ Saved
                          </span>
                        )}
                      </div>

                      <Button
                        size="sm"
                        color="red"
                        className="p-1"
                        disabled={disabled}
                        onClick={() => handleDelete(file, index, value, onChange)}
                      >
                        <MdDelete size={20} />
                      </Button>
                    </div>
                  ))}
              </div>

              {value.length < maxFiles && (
                <div
                  className={`flex justify-center items-center w-full py-12 border border-dashed text-slate-600 border-slate-600 rounded-lg mt-4 cursor-pointer ${
                    disabled ? "bg-gray-200 text-gray-400 !cursor-not-allowed" : ""
                  }`}
                  onClick={handleClick}
                >
                  <LuFilePlus size={"32px"} />
                  <h2 className="font-poppins font-semibold text-[16px] text-slate-700 ml-2">
                    Add Files
                  </h2>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={accept}
              multiple
              disabled={disabled}
              onChange={(event) => {
                const selectedFiles = Array.from(event.target.files);
                const validFiles = selectedFiles.filter((file) =>
                  allowedTypes.includes(file.type),
                );
                const invalidFiles = selectedFiles.filter(
                  (file) => !allowedTypes.includes(file.type),
                );

                if (invalidFiles.length > 0) {
                  toast.error(`Please upload files of type: ${accept}`, {
                    position: "top-right",
                    autoClose: 5000,
                  });
                }

                const newFiles = validFiles.map((file) => ({
                  file,
                  fileName: file.name,
                  blobURL: URL.createObjectURL(file),
                }));

                if (value.length + newFiles.length <= maxFiles) {
                  onChange([...(value || []), ...newFiles]);
                } else {
                  const remainingSlots = maxFiles - value.length;
                  onChange([...(value || []), ...newFiles.slice(0, remainingSlots)]);
                }

                fileInputRef.current.value = "";
              }}
            />

            {errors[name] && (
              <span className="text-red-500 text-sm mt-2 text-[12px]">
                {errors[name]?.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FileUploadField;