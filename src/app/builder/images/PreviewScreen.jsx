import React, { useEffect, useState, useRef } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";

const PreviewScreen = ({ currentFormData, isScanPage = false, isEditMode }) => {
  const dispatch = useDispatch();

  const [imageSrcs, setImageSrcs] = useState([]);
  const [modalSrc, setModalSrc] = useState(null);

  // 🔥 cache to avoid repeated API calls
  const imageCacheRef = useRef({});

  useEffect(() => {
    if (!currentFormData) return;

    let isMounted = true;
    let createdUrls = [];

    const fetchImages = async () => {
      try {
        // ================= SCAN PAGE (UNCHANGED) =================
        if (isScanPage) {
          const urls = await Promise.all(
            currentFormData.images.map(
              ({ imageUrl }) =>
                new Promise((resolve) => {
                  const fileName = imageUrl?.split("/").pop();

                  if (!fileName) {
                    resolve("");
                    return;
                  }

                  dispatch(
                    getThePDFPrevImage(fileName, (err, blob) => {
                      if (!err && blob) {
                        const url = URL.createObjectURL(blob);
                        createdUrls.push(url);
                        resolve(url);
                      } else {
                        resolve("");
                      }
                    }),
                  );
                }),
            ),
          );

          if (isMounted) setImageSrcs(urls);
          return;
        }

        // ================= EDIT MODE =================
        if (isEditMode) {
          const urls = await Promise.all(
            currentFormData.images.map((img) => {
              return new Promise((resolve) => {
                // ✅ 1. NEWLY UPLOADED IMAGE (preview)
                if (img?.preview) {
                  resolve(img.preview);
                  return;
                }

                // ✅ 2. EXISTING API IMAGE
                const fileName = img?.imageUrl?.split("/").pop();

                if (!fileName) {
                  resolve("");
                  return;
                }

                // cache check
                if (imageCacheRef.current[fileName]) {
                  resolve(imageCacheRef.current[fileName]);
                  return;
                }

                dispatch(
                  getThePDFPrevImage(fileName, (err, blob) => {
                    if (!err && blob) {
                      const url = URL.createObjectURL(blob);
                      imageCacheRef.current[fileName] = url;
                      createdUrls.push(url);
                      resolve(url);
                    } else {
                      resolve("");
                    }
                  }),
                );
              });
            }),
          );

          if (isMounted) setImageSrcs(urls);
          return;
        }

        // ================= CREATE MODE =================
        const urls = currentFormData?.images?.map(
          ({ file, preview }) =>
            preview || (file ? URL.createObjectURL(file) : null),
        );

        createdUrls = urls.filter((u) => u && u.startsWith("blob:"));

        if (isMounted) setImageSrcs(urls);
      } catch (err) {
        console.error("Image load error:", err);
        if (isMounted) setImageSrcs([]);
      }
    };

    fetchImages();

    return () => {
      isMounted = false;
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [currentFormData, isScanPage, isEditMode, dispatch]);

  if (!currentFormData?.title) return <EmptyPreview />;

  const {
    description = "",
    title = "",
    website = "",
    bannerColor,
  } = currentFormData;

  const getDomain = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const handleImageClick = (src) => {
    if (isScanPage && src) {
      setModalSrc(src);
    }
  };

  const closeModal = () => setModalSrc(null);

  return (
    <div className="p-1 min-h-full relative">
      {/* Header */}
      <div
        className="py-8"
        style={{ backgroundColor: bannerColor || "#A0522D" }}
      >
        <p className="text-white text-center font-semibold">{title}</p>
        <p className="text-white text-center text-xs pt-1">{description}</p>
      </div>

      {/* Content */}
      <div className="bg-white p-5 -mt-2 rounded-tl-2xl rounded-tr-2xl min-h-[400px]">
        <div className="grid grid-cols-2 gap-4">
          {imageSrcs?.length > 0 ? (
            imageSrcs.map((src, index) => {
              if (!src) return null;
              const isFullWidth = (index + 1) % 3 === 0;

              return (
                <div
                  key={index}
                  className={`w-full ${isFullWidth ? "col-span-2" : ""}`}
                  onClick={() => handleImageClick(src)}
                  style={{
                    cursor: isScanPage ? "pointer" : "default",
                  }}
                >
                  <img
                    src={src}
                    alt={`uploaded-${index}`}
                    className="w-full h-[100px] object-cover rounded-lg"
                  />
                </div>
              );
            })
          ) : (
            <p className="col-span-2 text-center text-gray-400 text-sm">
              No images uploaded
            </p>
          )}
        </div>

        {/* Website */}
        {website && (
          <div className="text-center mt-5">
            <a
              href={website}
              target="blank"
              className="text-center text-xs text-gray-500 mt-4"
            >
              {getDomain(website)}
            </a>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalSrc && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img
            src={modalSrc}
            alt="modal-preview"
            className="max-h-[90%] max-w-[90%] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-white text-xl font-bold"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewScreen;
