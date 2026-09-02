import React, { useEffect, useRef } from "react";
import InputField from "../../../common/fields/InputField";
import { useWatch, Controller } from "react-hook-form";

const VideoUpload = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
  setValue,
}) => {
  const values = useWatch({ control });
  const hasDefaultSet = useRef(false); // ← prevent re-setting default

  useEffect(() => {
    if (!currentFormData || hasDefaultSet.current) return;

    setValue(
      "audio",
      currentFormData?.audio?.length
        ? currentFormData.audio
        : currentFormData?.audioUrl
          ? [
              {
                type: "audio",
                id: currentFormData.audioUrl,
                url: currentFormData.audioUrl,
                blobURL: currentFormData.audioUrl,
                fileName: currentFormData.audioFileName || "audio.mp3",
                file: null,
                isExisting: true,
              },
            ]
          : [],
      { shouldDirty: false },
    );

    setValue("allowDownload", !!currentFormData?.allowDownload, {
      shouldDirty: false,
    });

    hasDefaultSet.current = true; // ← set default only once
  }, [currentFormData, setValue]);

  useEffect(() => {
    const normalizedAudio =
      (values?.audio || []).map((file) => ({
        type: "audio",
        id: file.id || file.blobURL || file.url,
        url: file.url || file.blobURL,
        blobURL: file.blobURL || file.url,
        fileName: file.fileName,
        file: file.file,
        isExisting: file.isExisting || false,
      })) || [];

    const timeout = setTimeout(() => {
      onChange({
        audio: normalizedAudio,
        allowDownload: !!values?.allowDownload,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [values, onChange]);

  return (
    <div className="bg-white space-y-6">
      <InputField
        control={control}
        errors={errors}
        name="audio"
        label="Upload Audio"
        type="uploadFiles"
        accept=".mp3"
        maxFiles={1}
      />

      <Controller
        control={control}
        name="allowDownload"
        defaultValue={false}
        render={({ field }) => (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...field}
              checked={!!field.value}
              className="w-4 h-4 accent-[#1578bc]"
            />
            <span className="text-sm font-medium text-gray-700">
              Allow users to download audio
            </span>
          </label>
        )}
      />
    </div>
  );
};

export default VideoUpload;
