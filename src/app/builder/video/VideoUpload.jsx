import React, { useEffect, useState } from "react";
import InputField from "../../../common/fields/InputField";
import ImageField from "../../../common/fields/ImageField";
import { useForm, useWatch, Controller } from "react-hook-form";

// Helper to extract YouTube video ID from various URL formats
const getYouTubeId = (url) => {
  const match = url?.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
};

const VideoUpload = ({
  control,
  errors,
  onChange = () => {},
  currentFormData,
  setValue, // ← add this prop
}) => {
  // const {
  //   formState: { errors },
  //   control,
  //   register,
  //   getValues,
  //   setValue,
  //   watch,
  // } = useForm({
  //   defaultValues: {
  //     showVideoDirectly: currentFormData?.showVideoDirectly || false,
  //     highlightFirstVideo: currentFormData?.highlightFirstVideo || false,
  //     autoplayFirstVideo: currentFormData?.autoplayFirstVideo || false,
  //     videoUrlInput: "",
  //   },
  // });

  const showVideoDirectly = useWatch({ control, name: "showVideoDirectly" });

  const [videoList, setVideoList] = useState(
    currentFormData?.videoList || [],
    // Each item: { id, url, description, cover }
  );
  const [urlError, setUrlError] = useState("");
  const values = useWatch({ control });
  const uploadedFile = useWatch({ control, name: "video" });
  const videoUrlInput = useWatch({ control, name: "videoUrlInput" });

  useEffect(() => {
    if (
      currentFormData?.videoList &&
      currentFormData.videoList.length > 0 &&
      videoList.length === 0
    ) {
      setVideoList(currentFormData.videoList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFormData?.videoList]);

  // Propagate changes upward
  // Propagate changes upward
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Build unified video array
      const normalizedVideos = [
        // YouTube URLs
        ...videoList.map((video) => ({
          type: "youtube",
          id: video.id,
          url: video.url,
          description: values[`youtubeVideoDescription_${video.id}`] || "",
          // cover: null, // no cover for youtube (or add ImageField later)
        })),

        // Uploaded files
        ...(values.video || []).map((file, index) => ({
          type: "upload",
          id: file.blobURL, // unique identifier
          url: file.blobURL,
          fileName: file.fileName,
          file: file.file,
          isExisting: file.isExisting || false, // ← add
          serverUrl: file.serverUrl || null, // ← add
          description: values[`uploadedVideoDescription_${index}`] || "",
          // cover: values[`uploadedVideoCover_${index}`]?.[0] || null,
        })),
      ];

      onChange({
        showVideoDirectly: values.showVideoDirectly,
        highlightFirstVideo: values.highlightFirstVideo,
        autoplayFirstVideo: values.autoplayFirstVideo,
        videos: normalizedVideos,
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [values, videoList, onChange]);

  const handleAddVideo = () => {
    const url = videoUrlInput?.trim();
    if (!url) {
      setUrlError("Please enter a URL.");
      return;
    }
    const ytId = getYouTubeId(url);
    if (!ytId) {
      setUrlError("Please enter a valid YouTube URL.");
      return;
    }
    const alreadyAdded = videoList.some((v) => getYouTubeId(v.url) === ytId);
    if (alreadyAdded) {
      setUrlError("This video has already been added.");
      return;
    }
    setUrlError("");
    setVideoList((prev) => [...prev, { id: ytId, url, description: "" }]);
    setValue("videoUrlInput", "");
  };

  const handleRemoveVideo = (id) => {
    setVideoList((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="bg-white space-y-6 p-1 md:p-4">
      {/* Video URL input + Add button */}
      <div className="space-y-1">
        <div className="grid gap-2 items-end">
          <div className="w-full">
            <InputField
              control={control}
              errors={errors}
              name="videoUrlInput"
              label="Video URL"
              type="text"
              placeholder="Paste a YouTube URL..."
            />
          </div>
          <button
            type="button"
            onClick={handleAddVideo}
            className={`flex w-max items-center gap-1 text-blue-800 px-2 py-1 rounded-full text-sm transition-all duration-300 ease-in-out ${
              showVideoDirectly
                ? "bg-gray-200 cursor-not-allowed text-gray-400"
                : "bg-blue-50 hover:bg-blue-100"
            }`}
          >
            + Add Video
          </button>
        </div>
        {urlError && <p className="text-red-500 text-xs">{urlError}</p>}
      </div>

      {/* Added video list */}
      {videoList.length > 0 && (
        <div className="space-y-4">
          {videoList.map((video, index) => (
            <div
              key={video.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3"
            >
              {/* Header row */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Video {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveVideo(video.id)}
                  className="text-red-400 hover:text-red-600 text-xs transition"
                >
                  ✕ Remove
                </button>
              </div>

              {/* Thumbnail preview */}
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt="Video thumbnail"
                className="w-full max-w-xs rounded-md object-cover"
              />

              {/* URL (read-only display) */}
              <p className="text-xs text-gray-400 truncate">{video.url}</p>

              {/* Description */}
              <div>
                {/* Description */}
                <InputField
                  control={control}
                  errors={errors}
                  name={`youtubeVideoDescription_${video.id}`}
                  label="Video Description"
                  type="desc"
                  placeholder="Enter video description..."
                />
              </div>

              {/* Cover image */}
            </div>
          ))}
        </div>
      )}

      {/* Video file upload */}
      <InputField
        control={control}
        errors={errors}
        name="video"
        label="Upload Video"
        type="uploadFiles"
        accept=".mp4"
        maxFiles={5}
        disabled={showVideoDirectly} // <-- disable if checked
      />

      {/* Conditionally render description and cover image for uploaded file */}

      {uploadedFile?.length > 0 && (
        <div className="space-y-4">
          {uploadedFile.map((file, index) => (
            <div
              key={file.blobURL || index}
              className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3"
            >
              {/* File header */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <p className="text-sm font-medium text-gray-700 truncate">
                  {file.fileName}
                </p>
              </div>

              {/* Description */}
              <InputField
                control={control}
                errors={errors}
                name={`uploadedVideoDescription_${index}`}
                label="Video Description"
                type="desc"
                placeholder="Enter description for this video..."
              />
            </div>
          ))}
        </div>
      )}

      {/* Three checkboxes */}
      <div className="bg-gray-50 rounded-md p-3 grid gap-2">
        {/* Only show 'Show the video directly' if no uploaded videos */}
        {(!uploadedFile || uploadedFile.length === 0) && (
          <Controller
            control={control}
            name="showVideoDirectly"
            render={({ field }) => (
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...field} checked={field.value} />
                Show the video directly
              </label>
            )}
          />
        )}
        <Controller
          control={control}
          name="highlightFirstVideo"
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...field} checked={field.value} />
              Highlight the first video
            </label>
          )}
        />
        <Controller
          control={control}
          name="autoplayFirstVideo"
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...field} checked={field.value} />
              Autoplay the first video
            </label>
          )}
        />
      </div>
    </div>
  );
};

export default VideoUpload;
