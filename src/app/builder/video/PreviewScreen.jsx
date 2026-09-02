import React, { useEffect, useRef, useState } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { getContrastColor } from "../../../utils";
import { getTheVideoFile } from "../../../redux/features/qrcodes";
import { useDispatch } from "react-redux";

const PreviewScreen = ({ currentFormData, isScanPage, isEditMode }) => {
  const [playingVideos, setPlayingVideos] = useState({});
  const [fetchedVideos, setFetchedVideos] = useState({});
  const [localBlobUrls, setLocalBlobUrls] = useState({});
  const dispatch = useDispatch();

  // Tracks filenames currently being fetched to avoid duplicate dispatches
  const fetchingRef = useRef(new Set());

  // 🔑 Generate a stable unique key for each video
  const getVideoKey = (video) =>
    video.id || video.youtubeId || video.videoUrl || video.serverUrl;

  // ▶️ Handle play
  const handlePlayVideo = (videoKey) => {
    setPlayingVideos((prev) => ({ ...prev, [videoKey]: true }));
  };

  // 🧹 Cleanup playingVideos when videos change
  useEffect(() => {
    if (!currentFormData?.videos) return;

    const currentKeys = new Set(currentFormData.videos.map(getVideoKey));

    setPlayingVideos((prev) => {
      const filtered = Object.fromEntries(
        Object.entries(prev).filter(([key]) => currentKeys.has(key)),
      );

      return Object.keys(filtered).length !== Object.keys(prev).length
        ? filtered
        : prev;
    });
  }, [currentFormData?.videos]);

  // 📦 Fetch uploaded videos in scan mode OR edit mode (for existing server files)
  useEffect(() => {
    if (!currentFormData?.videos) return;
    if (!isScanPage && !isEditMode) return;

    currentFormData.videos.forEach((video) => {
      if (video.type !== "upload") return;

      // Scan mode uses `video.videoUrl`; edit mode normalized shape uses `serverUrl` / `url`
      const serverPath =
        video.videoUrl ||
        video.serverUrl ||
        (video.isExisting ? video.url : null);

      if (!serverPath) return;

      const fileName = serverPath.split("/").pop();

      // Skip if already fetched or currently fetching
      if (fetchedVideos[fileName]) return;
      if (fetchingRef.current.has(fileName)) return;

      fetchingRef.current.add(fileName);
      console.log("[PreviewScreen] Fetching video file:", fileName);

      dispatch(
        getTheVideoFile(fileName, (err, blob) => {
          fetchingRef.current.delete(fileName);

          if (err) {
            console.error(
              "[PreviewScreen] Failed to fetch video:",
              fileName,
              err,
            );
            return;
          }

          if (!blob) {
            console.warn("[PreviewScreen] No blob returned for:", fileName);
            return;
          }

          const blobUrl = URL.createObjectURL(blob);
          console.log(
            "[PreviewScreen] Blob URL created for:",
            fileName,
            blobUrl,
          );

          setFetchedVideos((prev) => ({
            ...prev,
            [fileName]: blobUrl,
          }));
        }),
      );
    });
  }, [
    isScanPage,
    isEditMode,
    currentFormData?.videos,
    fetchedVideos,
    dispatch,
  ]);

  // 🎞️ Create blob URLs for newly-uploaded local files (cached so we don't leak memory on re-render)
  useEffect(() => {
    if (!currentFormData?.videos) return;

    const newEntries = {};
    currentFormData.videos.forEach((video) => {
      if (video.type === "upload" && video.file && !video.isExisting) {
        const key = getVideoKey(video);
        if (key && !localBlobUrls[key]) {
          newEntries[key] = URL.createObjectURL(video.file);
        }
      }
    });

    if (Object.keys(newEntries).length > 0) {
      setLocalBlobUrls((prev) => ({ ...prev, ...newEntries }));
    }
  }, [currentFormData?.videos]);

  // 🧹 Cleanup fetched blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(fetchedVideos).forEach((url) => {
        if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [fetchedVideos]);

  // 🧹 Cleanup local blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(localBlobUrls).forEach((url) => {
        if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [localBlobUrls]);

  const {
    buttonText = "Get Deal",
    buttonLink = "#",
    bannerColor = "#ff3434",
    company,
    videoTitle,
    description,
    videos,
  } = currentFormData || {};

  // Debug logs — remove after debugging
  console.log("[Preview] isEditMode:", isEditMode, "isScanPage:", isScanPage);
  console.log("[Preview] fetchedVideos:", fetchedVideos);
  console.log("[Preview] videos:", videos);

  if (!videos || videos.length === 0) {
    return <EmptyPreview />;
  }

  const bgColor = bannerColor || "#f3f4f6";
  const textColor = getContrastColor(bannerColor);

  // 🎥 Extract YouTube ID safely across create / edit / scan modes
  const extractYouTubeId = (video) => {
    // Create & edit modes: normalized shape uses `id`
    if (!isScanPage) return video.id || video.youtubeId;

    // Scan mode: prefer explicit youtubeId, then parse from url
    if (video.youtubeId) return video.youtubeId;

    if (video.youtubeUrl) {
      try {
        const url = new URL(video.youtubeUrl);
        if (url.hostname.includes("youtu.be")) {
          return url.pathname.slice(1);
        }
        return url.searchParams.get("v");
      } catch {
        return "";
      }
    }

    return "";
  };

  return (
    <div className="min-h-full">
      <div className="pb-3" style={{ backgroundColor: bgColor }}>
        {videos.map((video) => {
          const videoKey = getVideoKey(video);
          let videoSrc = "";

          // 🎬 Upload video handling
          if (video.type === "upload") {
            if (isScanPage && video.videoUrl) {
              // Scan page — fetched blob
              const fileName = video.videoUrl.split("/").pop();
              videoSrc = fetchedVideos[fileName] || "";
              console.log(
                "[Preview] scan mode, fileName:",
                fileName,
                "found:",
                !!videoSrc,
              );
            } else if (isEditMode && video.isExisting) {
              // Edit mode, existing server file — fetched blob
              const serverPath = video.serverUrl || video.url;
              const fileName = serverPath?.split("/").pop();
              videoSrc = fileName ? fetchedVideos[fileName] || "" : "";
              console.log(
                "[Preview] edit mode existing, fileName:",
                fileName,
                "found:",
                !!videoSrc,
              );
            } else {
              // Create mode OR newly added file in edit mode — cached local blob
              videoSrc = localBlobUrls[videoKey] || "";
              console.log(
                "[Preview] local blob, key:",
                videoKey,
                "found:",
                !!videoSrc,
              );
            }
          }

          // ▶️ YouTube handling
          if (video.type === "youtube") {
            const youtubeId = extractYouTubeId(video);
            if (youtubeId) {
              videoSrc = `https://www.youtube.com/embed/${youtubeId}`;
            }
          }

          const isPlaying = !!playingVideos[videoKey];

          return (
            <div
              key={videoKey}
              className="p-4 rounded-md flex flex-col items-start gap-2"
            >
              {video.type === "youtube" ? (
                <div className="w-full aspect-video">
                  <iframe
                    title={`youtube-video-${videoKey}`}
                    src={videoSrc}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : videoSrc ? (
                <video
                  src={videoSrc}
                  controls
                  autoPlay={isPlaying}
                  className="w-full aspect-video object-cover"
                  onClick={() => handlePlayVideo(videoKey)}
                />
              ) : (
                <p className="text-sm text-gray-200 text-center w-full">
                  Loading video...
                </p>
              )}

              {video.description && (
                <p className="text-sm mt-2" style={{ color: textColor }}>
                  {video.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Content */}
      <div
        className={`bg-white mx-auto rounded-tl-3xl rounded-tr-3xl p-3 ${
          videos.length > 0 ? "-mt-4" : ""
        }`}
      >
        <p
          className="text-center text-xs font-semibold"
          style={{ color: bannerColor }}
        >
          {company}
        </p>

        <p className="text-center font-semibold text-[15px]">{videoTitle}</p>

        <p className="text-center text-sm">{description}</p>

        <div className="flex justify-center mt-2">
          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button
              className="text-white px-4 py-[2px] text-sm rounded-full"
              style={{ background: bannerColor }}
            >
              {buttonText}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;
