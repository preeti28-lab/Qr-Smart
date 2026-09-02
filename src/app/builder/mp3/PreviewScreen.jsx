import React, { useEffect, useRef, useState, useMemo } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { GoDownload } from "react-icons/go";
import { IoShareSocial } from "react-icons/io5";
import { getContrastColor } from "../../../utils";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes"; // ✅ removed getTheAudioFile

const DEFAULT_COVER =
  "https://img.qrfy.com/img/original/mockup_playlist_cover_v2.webp";

const BASE_URL = import.meta.env.VITE_SERVER_URL; // e.g. https://m.kcptl.in/procx

const PreviewScreen = ({ currentFormData, isScanPage, isEditMode }) => {
  const dispatch = useDispatch();

  const [coverImg, setCoverImg] = useState(DEFAULT_COVER);
  const coverCacheRef = useRef({});

  const {
    audio,
    allowDownload,
    title,
    description,
    website,
    bannerColor,
    cover,
    buttonLabel,
    buttonLink,
    audioUrl,
    coverUrl,
  } = currentFormData || {};

  const firstColor = bannerColor?.[0] || "#F0F0F0";
  const textColor = getContrastColor(firstColor);

  // ===============================
  // AUDIO SRC — direct stream URL
  // ✅ No axios, no blob, browser handles 206 natively
  // ===============================
  const audioSrc = useMemo(() => {
    const uploaded = audio?.[0];

    // CREATE MODE — freshly uploaded file, use object URL
    if (uploaded?.file) {
      return URL.createObjectURL(uploaded.file);
    }

    // EDIT MODE / SCAN PAGE — stream directly from server
    const url = uploaded?.audioUrl || audioUrl;
    if (!url) return null;

    const fileName = url.split("/").pop();
    if (!fileName) return null;

    return `${BASE_URL}/qr-index/files/audios/${fileName}`;
  }, [audio, audioUrl]);

  // ===============================
  // COVER LOADER (blob fetch — images don't stream, keep as is)
  // ===============================
  useEffect(() => {
    let isMounted = true;
    let coverObjectUrl;

    const loadCover = () => {
      // ---- SCAN PAGE ----
      if (isScanPage) {
        const coverName = coverUrl?.split("/").pop();
        if (!coverName) {
          setCoverImg(DEFAULT_COVER);
          return;
        }

        if (coverCacheRef.current[coverName]) {
          setCoverImg(coverCacheRef.current[coverName]);
          return;
        }

        dispatch(
          getThePDFPrevImage(coverName, (err, blob) => {
            if (!isMounted) return;
            if (!err && blob) {
              coverObjectUrl = URL.createObjectURL(blob);
              coverCacheRef.current[coverName] = coverObjectUrl;
              setCoverImg(coverObjectUrl);
            } else {
              setCoverImg(DEFAULT_COVER);
            }
          }),
        );
        return;
      }

      // ---- EDIT MODE ----
      if (isEditMode) {
        const uploaded = cover?.[0];

        // User picked a new cover file
        if (uploaded?.file) {
          coverObjectUrl = URL.createObjectURL(uploaded.file);
          setCoverImg(coverObjectUrl);
          return;
        }

        // Fall back to existing cover from server
        const coverName = coverUrl?.split("/").pop();
        if (!coverName) {
          setCoverImg(DEFAULT_COVER);
          return;
        }

        if (coverCacheRef.current[coverName]) {
          setCoverImg(coverCacheRef.current[coverName]);
          return;
        }

        dispatch(
          getThePDFPrevImage(coverName, (err, blob) => {
            if (!isMounted) return;
            if (!err && blob) {
              coverObjectUrl = URL.createObjectURL(blob);
              coverCacheRef.current[coverName] = coverObjectUrl;
              setCoverImg(coverObjectUrl);
            } else {
              setCoverImg(DEFAULT_COVER);
            }
          }),
        );
        return;
      }

      // ---- CREATE MODE ----
      const uploaded = cover?.[0];
      if (uploaded?.file) {
        coverObjectUrl = URL.createObjectURL(uploaded.file);
        setCoverImg(coverObjectUrl);
      } else {
        setCoverImg(DEFAULT_COVER);
      }
    };

    loadCover();

    return () => {
      isMounted = false;
      if (coverObjectUrl) URL.revokeObjectURL(coverObjectUrl);
    };
  }, [isScanPage, isEditMode, cover, coverUrl, dispatch]);

  // ===============================
  // MEMOIZED VALIDATION
  // ===============================
  const isEmpty = useMemo(() => {
    if (!currentFormData) return true;
    if (!title) return true;
    return Object.keys(currentFormData).length === 0;
  }, [currentFormData, title]);

  if (isEmpty) {
    return <EmptyPreview />;
  }

  return (
    <div
      className="min-h-full flex flex-col h-full"
      style={{ background: firstColor }}
    >
      {/* COVER */}
      <div className="p-3">
        <img
          src={coverImg}
          alt="Cover"
          className="rounded-md w-full h-[200px] object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-tl-3xl rounded-tr-3xl relative p-3 h-full">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs text-gray-500">{description}</p>
            <p className="font-semibold">{title}</p>
          </div>

          <div
            className="w-max rounded-full p-1"
            style={{ background: firstColor, color: textColor }}
          >
            <IoShareSocial size={17} color={textColor} />
          </div>
        </div>

        {/* AUDIO — browser streams natively, handles 206 automatically */}
        {audioSrc && (
          <div className="flex justify-center mb-3">
            <audio
              controls
              src={audioSrc}
              className="w-full rounded-md"
              preload="metadata" // ✅ loads only duration/metadata, streams on play
            />
          </div>
        )}

        {/* DOWNLOAD */}
        {allowDownload && audioSrc && (
          <div className="flex justify-center mb-3">
            <a
              href={audioSrc}
              download={audio?.[0]?.fileName || "audio.mp3"}
              className="flex items-center justify-center rounded-full border px-3 py-1 text-sm w-full"
              style={{ color: textColor }}
            >
              <GoDownload className="mr-1" />
              Download
            </a>
          </div>
        )}

        {/* BUTTON */}
        {buttonLabel && buttonLink && (
          <div className="flex justify-center">
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-full border px-3 py-1 text-sm w-max"
              style={{ background: firstColor, color: textColor }}
            >
              {buttonLabel}
            </a>
          </div>
        )}

        {/* WEBSITE */}
        {website && (
          <div className="flex justify-center mt-3 border-t pt-3">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-center"
            >
              {website}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewScreen;
