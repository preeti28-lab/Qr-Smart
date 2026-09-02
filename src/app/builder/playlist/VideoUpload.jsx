import React, { useEffect, useRef } from "react";
import InputField from "../../../common/fields/InputField";
import { useWatch, Controller } from "react-hook-form";

const VideoUpload = ({
  control,
  errors,
  setValue,
  onChange = () => {},
  currentFormData,
  isEditMode,
  id,
}) => {
  const audioFiles = useWatch({ control, name: "audio" }) || [];
  const seeded = useRef(false);

  // ✅ Fallback seed — only fires if reset() in parent didn't populate the field
  // (e.g. currentFormData arrived after mount)
  useEffect(() => {
    if (seeded.current) return;
    if (!currentFormData?.audio?.length) return;
    if (audioFiles.filter(Boolean).length > 0) return; // already populated by reset()

    const seededAudio = currentFormData.audio.map((item) => ({
      file: item.file || null,
      fileName: item.fileName || item.audioFileName,
      blobURL: item.blobURL || item.audioUrl,
      audioUrl: item.audioUrl,
      audioFileName: item.audioFileName,
      name: item.name || "",
      isExisting: item.isExisting ?? true,
    }));

    setValue("audio", seededAudio);
    seeded.current = true;
  }, [currentFormData?.audio]); // re-run if currentFormData.audio arrives late

  // ✅ Propagate normalized audio upward
  useEffect(() => {
    const timeout = setTimeout(() => {
      const normalizedAudio = audioFiles.map((file) => ({
        type: "audio",
        id: file?.blobURL || file?.audioUrl,
        url: file?.blobURL || file?.audioUrl,
        fileName: file?.fileName,
        file: file?.file || null,
        name: file?.name || "",
        ...(file?.isExisting && {
          audioUrl: file.audioUrl,
          audioFileName: file.audioFileName,
          isExisting: true,
        }),
      }));

      onChange({ audio: normalizedAudio });
    }, 300);

    return () => clearTimeout(timeout);
  }, [audioFiles, onChange]);

  return (
    <div className="bg-white space-y-6">
      <InputField
        control={control}
        errors={errors}
        name="audio"
        label="Upload Audio"
        type="uploadFiles"
        accept=".mp3"
        maxFiles={20}
        isEditMode={isEditMode}
        id={id}
      />

      {audioFiles.length > 0 && (
        <div className="space-y-3">
          {audioFiles.map((file, index) => {
            const fileKey = file?.blobURL || file?.audioUrl || index;

            return (
              <div key={fileKey} className="flex items-center gap-3">
                <span
                  className="text-sm text-gray-700 w-40 truncate shrink-0"
                  title={file?.fileName}
                >
                  <span className="font-semibold block text-black">
                    {file?.isExisting ? (
                      <span className="text-xs text-green-600 font-medium">
                        ✓ Existing
                      </span>
                    ) : (
                      "Enter file name"
                    )}
                  </span>
                  {file?.fileName}
                </span>

                <Controller
                  control={control}
                  name={`audio.${index}.name`}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder={`Enter name for "${file?.fileName}"`}
                      className="border border-gray-300 rounded-full px-3 py-2 text-sm w-full focus:outline-none"
                    />
                  )}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
