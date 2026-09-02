import React, { useEffect, useRef, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";

const imageCache = new Map();

const PreviewLogo = memo(
  function PreviewLogo({ image, logoUrl, isScanPage, isEditMode }) {
    const [logoSrc, setLogoSrc] = useState(null);
    const dispatch = useDispatch();
    const localObjectUrlRef = useRef(null);

    const clearLocalObjectUrl = () => {
      if (localObjectUrlRef.current) {
        URL.revokeObjectURL(localObjectUrlRef.current);
        localObjectUrlRef.current = null;
      }
    };

    useEffect(() => {
      let cancelled = false;

      clearLocalObjectUrl();

      // ✅ Normalize logoUrl safely
      const safeLogoUrl =
        typeof logoUrl === "string" ? logoUrl : null;

      // ✅ Case 1: New uploaded image (preview already exists)
      if (image?.length) {
        const fileObj = image[0];

        if (fileObj?.preview) {
          setLogoSrc(fileObj.preview);
          return;
        }

        if (fileObj?.file) {
          const objectUrl = URL.createObjectURL(fileObj.file);
          localObjectUrlRef.current = objectUrl;
          setLogoSrc(objectUrl);
          return;
        }
      }

      // ❌ No logo available
      if (!safeLogoUrl) {
        setLogoSrc(null);
        return;
      }

      // ❌ Not allowed to fetch
      if (!isScanPage && !isEditMode) {
        setLogoSrc(null);
        return;
      }

      // ✅ Use cache if available
      if (imageCache.has(safeLogoUrl)) {
        setLogoSrc(imageCache.get(safeLogoUrl));
        return;
      }

      // ✅ Extract filename safely
      const imageName = safeLogoUrl.split("/").pop();

      // ✅ Fetch from server
      dispatch(
        getThePDFPrevImage(imageName, (err, blob) => {
          if (cancelled) return;

          if (!err && blob) {
            const objectUrl = URL.createObjectURL(blob);
            imageCache.set(safeLogoUrl, objectUrl);
            setLogoSrc(objectUrl);
          } else {
            setLogoSrc(null);
          }
        })
      );

      return () => {
        cancelled = true;
      };
    }, [image, logoUrl, isScanPage, isEditMode, dispatch]);

    // ✅ Cleanup on unmount
    useEffect(() => {
      return () => {
        clearLocalObjectUrl();
      };
    }, []);

    if (logoSrc) {
      return (
        <div className="w-24 h-24 rounded-lg overflow-hidden border shadow -mt-12">
          <img
            src={logoSrc}
            alt="app-logo"
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className="w-24 h-24 rounded-lg border flex items-center justify-center text-gray-400 text-xs">
        No Logo
      </div>
    );
  },
  (prev, next) => {
    const prevPreview = prev?.image?.[0]?.preview;
    const nextPreview = next?.image?.[0]?.preview;
    const prevFile = prev?.image?.[0]?.file;
    const nextFile = next?.image?.[0]?.file;

    return (
      prev.logoUrl === next.logoUrl &&
      prev.isScanPage === next.isScanPage &&
      prev.isEditMode === next.isEditMode &&
      prevPreview === nextPreview &&
      prevFile === nextFile
    );
  }
);

export default PreviewLogo;