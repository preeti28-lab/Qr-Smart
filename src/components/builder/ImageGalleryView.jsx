import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../redux/features/qrcodes";

const ImageGalleryView = ({
  imagesData = [],
  isScanPage,
  isEditMode,
  selectedGridIndex = 0,
  currentFormData,
}) => {
  const dispatch = useDispatch();

  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(null);

  // ✅ FIX: Build a stable string key from the actual content of imagesData,
  // not just the length. Using length caused re-fetches to ACCUMULATE blob URLs
  // because the effect ran multiple times for the same images (e.g. once when
  // length changed from 0→3, then again when an unrelated state update caused
  // a new array reference with the same length — but effect didn't re-run for that).
  //
  // The key encodes both count AND identity: server paths for existing images,
  // blob: URLs for new uploads. This means:
  //   - Adding a new image   → key changes → effect re-runs → fresh fetch for all
  //   - Removing an image    → key changes → effect re-runs → fresh fetch for remaining
  //   - Unrelated re-renders → key unchanged → effect does NOT re-run
  const imagesDataKey = imagesData
    .map((item) => {
      if (typeof item === "string") return item;           // scan page: raw path string
      if (item?.preview) return item.preview;              // new upload: blob URL
      if (item?.imageUrl) return item.imageUrl;            // server image: path
      return "";
    })
    .filter(Boolean)
    .join("|");

  useEffect(() => {
    if (!imagesData?.length) {
      setImageUrls([]);
      return;
    }

    let mounted = true;
    const createdUrls = [];

    const fetchImages = async () => {
      try {
        setLoading(true);

        // ===================== SCAN PAGE =====================
        if (isScanPage) {
          const results = await Promise.all(
            imagesData.map(
              (imgPath) =>
                new Promise((resolve) => {
                  const imageName =
                    typeof imgPath === "string"
                      ? imgPath.split("/").pop()
                      : null;

                  if (!imageName) {
                    resolve(null);
                    return;
                  }

                  dispatch(
                    getThePDFPrevImage(imageName, (err, blob) => {
                      if (err || !blob) {
                        resolve(null);
                        return;
                      }
                      const objectUrl = URL.createObjectURL(blob);
                      createdUrls.push(objectUrl);
                      resolve(objectUrl);
                    }),
                  );
                }),
            ),
          );

          if (mounted) setImageUrls(results.filter(Boolean));
          return;
        }

        // ===================== EDIT MODE =====================
        if (isEditMode) {
          const results = await Promise.all(
            imagesData.map(
              (item) =>
                new Promise((resolve) => {
                  // New upload — already a blob URL, use directly
                  if (item?.file || item?.preview?.startsWith?.("blob:")) {
                    resolve(item.preview || null);
                    return;
                  }

                  const url = item?.imageUrl;
                  if (!url) {
                    resolve(null);
                    return;
                  }

                  // Already a blob URL (shouldn't happen but guard anyway)
                  if (url.startsWith("blob:")) {
                    resolve(url);
                    return;
                  }

                  const imageName = url.split("/").pop();
                  if (!imageName) {
                    resolve(null);
                    return;
                  }

                  dispatch(
                    getThePDFPrevImage(imageName, (err, blob) => {
                      if (err || !blob) {
                        resolve(null);
                        return;
                      }
                      const objectUrl = URL.createObjectURL(blob);
                      createdUrls.push(objectUrl);
                      resolve(objectUrl);
                    }),
                  );
                }),
            ),
          );

          // ✅ Always REPLACE imageUrls — never append.
          // Previous blob URLs from createdUrls are revoked in cleanup.
          if (mounted) setImageUrls(results.filter(Boolean));
          return;
        }

        // ===================== CREATE MODE =====================
        const validUrls = imagesData
          .map((item) => item?.preview)
          .filter(Boolean);

        if (mounted) setImageUrls(validUrls);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        if (mounted) setImageUrls([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchImages();

    return () => {
      mounted = false;
      // ✅ Revoke ALL blob URLs created in this effect run.
      // This prevents memory leaks AND ensures stale URLs don't bleed
      // into the next render cycle.
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };

    // ✅ imagesDataKey is the stable string dep — changes only when actual
    // image content changes, not on every re-render with a new array reference.
  }, [imagesDataKey, isScanPage, isEditMode, dispatch]);

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: imageUrls.length > 1,
      arrows: imageUrls.length > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      swipeToSlide: true,
    }),
    [imageUrls.length],
  );

  const layoutMap = useMemo(
    () => ({
      0: {
        type: "stack",
        wrapperClass: "flex flex-col gap-3",
        getItemClass: () => "w-full h-52",
      },
      1: { type: "slider" },
      2: {
        wrapperClass: "grid grid-cols-6 grid-rows-2 gap-3",
        getItemClass: (index) =>
          index === 0 || index === 1 ? "col-span-3 h-40" : "col-span-2 h-32",
      },
      3: {
        wrapperClass: "grid grid-cols-6 grid-rows-2 gap-3",
        getItemClass: (index) =>
          index <= 2 ? "col-span-2 h-32" : "col-span-3 h-40",
      },
      4: {
        wrapperClass: "grid grid-cols-2 gap-3",
        getItemClass: (index) =>
          index === 0 ? "row-span-2 h-[280px]" : "h-[134px]",
      },
      5: {
        wrapperClass: "grid grid-cols-2 gap-3",
        getItemClass: (index) =>
          index === 2 ? "row-span-2 h-[280px]" : "h-[134px]",
      },
      6: {
        wrapperClass: "grid grid-cols-2 grid-rows-2 gap-3",
        getItemClass: (index) => (index < 2 ? "h-44" : "h-28"),
      },
      7: {
        wrapperClass: "grid grid-cols-2 gap-3",
        getItemClass: () => "h-40",
      },
    }),
    [],
  );

  const activeLayout = layoutMap[selectedGridIndex] || layoutMap[0];

  const openPreview = (index) => setPreviewIndex(index);
  const closePreview = () => setPreviewIndex(null);

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="w-full h-40 rounded-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!imageUrls.length) {
    return (
      <div className="w-full min-h-[180px] rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-500">
        No images found
      </div>
    );
  }

  return (
    <>
      <div className="w-full p-5">
        {activeLayout.type === "slider" ? (
          <Slider {...sliderSettings}>
            {imageUrls.map((src, index) => (
              <div key={index} className="px-1">
                <div
                  className="h-64 overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                  onClick={() => openPreview(index)}
                >
                  <img
                    src={src}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className={activeLayout.wrapperClass}>
            {imageUrls.map((src, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-lg bg-gray-100 cursor-pointer ${activeLayout.getItemClass(index)}`}
                onClick={() => openPreview(index)}
              >
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {previewIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closePreview}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={closePreview}
          >
            ×
          </button>
          <div className="max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={imageUrls[previewIndex]}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGalleryView;