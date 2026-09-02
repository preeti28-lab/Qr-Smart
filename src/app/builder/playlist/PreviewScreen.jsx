import React, { useState, useEffect, useRef, useMemo } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import {
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPlay,
  IoPause,
} from "react-icons/io5";
import { getContrastColor } from "../../../utils";
import { audioPlatforms } from "../menu/constant";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes"; // ✅ removed getTheAudioFile

const DEFAULT_COVER =
  "https://img.qrfy.com/img/original/mockup_playlist_cover_v2.webp";

const BASE_URL = import.meta.env.VITE_SERVER_URL || "https://m.kcptl.in/procx";

const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

// ✅ Build direct stream URL from audioUrl path
const buildAudioStreamUrl = (audioUrl) => {
  if (!audioUrl) return null;
  const fileName = audioUrl.split("/").pop();
  if (!fileName) return null;
  return `${BASE_URL}/qr-index/files/audios/${fileName}`;
};

const PreviewScreen = ({ currentFormData, isScanPage, isEditMode }) => {
  const dispatch = useDispatch();

  const [coverImg, setCoverImg] = useState(null);
  const [isCoverLoading, setIsCoverLoading] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const { title, description, name, bannerColor, cover, coverUrl, platforms } =
    currentFormData || {};

  const audioFiles = isScanPage
    ? currentFormData?.audios || []
    : currentFormData?.audio || [];

  const firstColor = bannerColor || "#FFFFFF";
  const textColor = getContrastColor(firstColor);

  const imgSrc = coverImg || cover?.[0]?.preview || coverUrl || DEFAULT_COVER;

  // ===============================
  // ✅ AUDIO LIST — direct stream URLs, no blob fetching
  // ===============================
  const audioList = useMemo(() => {
    if (!audioFiles.length) return [];

    return audioFiles.map((track) => {
      // CREATE MODE or newly uploaded file
      if (track.file) {
        return {
          ...track,
          url: URL.createObjectURL(track.file),
        };
      }

      // EDIT MODE existing track / SCAN PAGE — stream directly
      const streamUrl =
        buildAudioStreamUrl(track.audioUrl) ||
        buildAudioStreamUrl(track.blobURL) ||
        null;

      return {
        ...track,
        url: streamUrl,
      };
    });
  }, [audioFiles]);

  // ===============================
  // COVER LOADER (blob fetch — keep as is)
  // ===============================
  useEffect(() => {
    let isMounted = true;
    let objectUrl = null;

    // ---- SCAN PAGE ----
    if (isScanPage) {
      if (!coverUrl) {
        setCoverImg(DEFAULT_COVER);
        return;
      }

      setIsCoverLoading(true);
      const coverName = coverUrl.split("/").pop();

      dispatch(
        getThePDFPrevImage(coverName, (err, blob) => {
          if (!isMounted) return;
          if (!err && blob) {
            objectUrl = URL.createObjectURL(blob);
            setCoverImg(objectUrl);
          } else {
            setCoverImg(DEFAULT_COVER);
          }
          setIsCoverLoading(false);
        }),
      );

      return () => {
        isMounted = false;
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }

    // ---- EDIT MODE ----
    if (isEditMode) {
      if (cover?.length && cover[0]?.file) {
        objectUrl = URL.createObjectURL(cover[0].file);
        setCoverImg(objectUrl);
        return () => {
          if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
      }

      if (coverUrl) {
        setIsCoverLoading(true);
        const coverName = coverUrl.split("/").pop();

        dispatch(
          getThePDFPrevImage(coverName, (err, blob) => {
            if (!isMounted) return;
            if (!err && blob) {
              objectUrl = URL.createObjectURL(blob);
              setCoverImg(objectUrl);
            } else {
              setCoverImg(DEFAULT_COVER);
            }
            setIsCoverLoading(false);
          }),
        );

        return () => {
          isMounted = false;
          if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
      }

      setCoverImg(DEFAULT_COVER);
      return;
    }

    // ---- CREATE MODE ----
    if (cover?.length && cover[0]?.file) {
      objectUrl = URL.createObjectURL(cover[0].file);
      setCoverImg(objectUrl);
      return () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }

    setCoverImg(DEFAULT_COVER);
    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [isScanPage, isEditMode, cover, coverUrl, dispatch]);

  const currentTrack = audioList[currentIndex];

  // ▶️ PLAY / PAUSE
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => setIsPlaying((prev) => !prev);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? audioList.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === audioList.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const handleEnded = () => handleNext();

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  if (
    !currentFormData ||
    (!isScanPage && !currentFormData.audio?.length) ||
    (isScanPage && !currentFormData.audios?.length)
  ) {
    return <EmptyPreview />;
  }

  return (
    <div
      className={`${isScanPage ? "min-h-[100dvh]" : "min-h-full"}`}
      style={{ background: firstColor }}
    >
      {/* COVER */}
      <div className="relative w-full h-[250px]">
        {isCoverLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 animate-pulse rounded-md">
            <span className="text-xs text-gray-500">Loading cover...</span>
          </div>
        ) : (
          <img
            src={imgSrc}
            alt="Cover"
            className="rounded-md w-full h-full object-cover"
          />
        )}

        {/* CONTROLS */}
        {currentTrack && (
          <div className="absolute bottom-3 left-3 right-3 bg-black/40 rounded-md p-3 flex flex-col items-center gap-2">
            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${(currentTime / duration) * 100 || 0}%`,
                  background: firstColor,
                }}
              />
            </div>

            <div className="w-full flex justify-between text-xs text-white">
              <span>{formatDuration(currentTime)}</span>
              <span>{formatDuration(duration)}</span>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button onClick={handlePrev} className="text-white">
                <IoPlaySkipBack size={20} />
              </button>
              <button onClick={handlePlayPause} className="text-white">
                {isPlaying ? <IoPause size={30} /> : <IoPlay size={30} />}
              </button>
              <button onClick={handleNext} className="text-white">
                <IoPlaySkipForward size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PLAYLIST */}
      <div className="bg-[#220e27] px-3 py-3 pb-6">
        {audioList.map((track, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={track.id || index}
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                isActive ? "bg-[#39273d] font-semibold" : "hover:bg-[#594a5d]"
              }`}
            >
              <span className="w-4 text-white">
                {isActive ? "▶" : index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-white text-xs">
                  {track.name || track.fileName}
                </p>
                <p className="text-xs truncate text-white">{track.fileName}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* HIDDEN AUDIO ELEMENT — browser streams natively, handles 206 */}
      {currentTrack?.url && (
        <audio
          ref={audioRef}
          src={currentTrack.url}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          preload="metadata" // ✅ stream on play, only metadata on load
        />
      )}

      {/* INFO */}
      <div
        className="bg-white rounded-tl-3xl rounded-tr-3xl py-4 px-3 -mt-3 pb-7"
        style={{ background: firstColor }}
      >
        <p className="text-xs text-center" style={{ color: textColor }}>
          {name}
        </p>
        <p
          className="text-sm text-center font-semibold"
          style={{ color: textColor }}
        >
          {title}
        </p>
        <p
          className="text-xs text-center font-semibold"
          style={{ color: textColor }}
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-3 mt-4">
          {Object.entries(platforms || {}).map(
            ([platformName, platformData]) => {
              const icon = audioPlatforms.find((p) => p.name === platformName);
              return (
                <div
                  key={platformName}
                  className="flex justify-between items-center bg-white border rounded p-2 w-full"
                >
                  <div className="flex gap-1 items-center">
                    {icon && (
                      <img
                        src={icon.src}
                        alt={platformName}
                        className="w-8 h-8 rounded-lg bg-gray-100 p-1"
                      />
                    )}
                    <span className="text-xs font-medium">
                      {platformData.text || platformName}
                    </span>
                  </div>
                  <a
                    href={platformData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-black border rounded-full px-2 py-0.5"
                  >
                    {platformData.buttonText || "Play"}
                  </a>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;
