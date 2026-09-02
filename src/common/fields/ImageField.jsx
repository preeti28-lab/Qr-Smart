import React, { useRef, useEffect, useState, useCallback } from "react";
import { LuImagePlus } from "react-icons/lu";
import { Controller, useWatch } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { delteQRAsset, getThePDFPrevImage } from "../../redux/features/qrcodes";

const ImageField = ({
  control,
  errors,
  name,
  maxFiles,
  label = "",
  labelClass = "",
  isEditMode = false,
  id, // 👈 comes from parent
  handleRefresh = () => {},
}) => {
  // console.log(refetch)

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const images = useWatch({ control, name }) || [];
  const [serverPreviewMap, setServerPreviewMap] = useState({});
  const [brokenImages, setBrokenImages] = useState({});

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ REMOVED the first useEffect that mutated control._formValues directly.
  // Previews are already created at file-selection time (in the input onChange below).

  // ✅ Stable fetch: only re-run when the set of imageUrls actually changes
  const imageUrlsKey = images
    .map((item) => item?.imageUrl)
    .filter(Boolean)
    .join(",");

  useEffect(() => {
    if (!imageUrlsKey) return;

    const existingImageUrls = imageUrlsKey.split(",");
    let mounted = true;
    const createdUrls = [];

    const fetchServerImages = async () => {
      const results = await Promise.all(
        existingImageUrls.map(
          (url) =>
            new Promise((resolve) => {
              const imageName = url.split("/").pop();
              if (!imageName) {
                resolve({ url, preview: null });
                return;
              }

              dispatch(
                getThePDFPrevImage(imageName, (err, blob) => {
                  if (err || !blob) {
                    resolve({ url, preview: null });
                    return;
                  }
                  const objectUrl = URL.createObjectURL(blob);
                  createdUrls.push(objectUrl);
                  resolve({ url, preview: objectUrl });
                }),
              );
            }),
        ),
      );

      if (!mounted) return;

      const nextMap = {};
      results.forEach(({ url, preview }) => {
        if (url && preview) nextMap[url] = preview;
      });

      setServerPreviewMap((prev) => ({ ...prev, ...nextMap }));
    };

    fetchServerImages();

    return () => {
      mounted = false;
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageUrlsKey, dispatch]); // ✅ stable string dep, not the array itself

  // ✅ Clean up brokenImages entries that are no longer in the list
  const previewsKey = images
    .map((item) => {
      if (item?.preview) return item.preview;
      if (item?.imageUrl)
        return serverPreviewMap[item.imageUrl] || item.imageUrl;
      if (typeof item === "string") return item;
      return null;
    })
    .filter(Boolean)
    .join(",");

  useEffect(() => {
    const validPreviews = new Set(previewsKey ? previewsKey.split(",") : []);

    setBrokenImages((prev) => {
      const staleKeys = Object.keys(prev).filter((k) => !validPreviews.has(k));
      if (staleKeys.length === 0) return prev; // ✅ bail out if nothing changed
      const next = { ...prev };
      staleKeys.forEach((k) => delete next[k]);
      return next;
    });
  }, [previewsKey]); // ✅ stable string dep

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={
            "font-medium ml-0.5 text-[#000000]" +
            (labelClass ? ` ${labelClass}` : "")
          }
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { value = [], onChange } }) => {
          const visibleImages = value.filter((item) => {
            const preview =
              item?.preview ||
              (item?.imageUrl ? serverPreviewMap[item.imageUrl] : null) ||
              (typeof item === "string" ? item : null);
            return preview && !brokenImages[preview];
          });

          return (
            <>
              <div className="border border-solid border-gray-500 rounded-md sm:p-3">
                {visibleImages.length > 0 && (
                  <div className="flex justify-center gap-8 flex-wrap w-full">
                    {value.map((item, index) => {
                      const preview =
                        item?.preview ||
                        (item?.imageUrl
                          ? serverPreviewMap[item.imageUrl]
                          : null) ||
                        (typeof item === "string" ? item : null);

                      if (!preview || brokenImages[preview]) return null;

                      return (
                        <div
                          key={index}
                          className="flex justify-center items-center"
                        >
                          <div className="relative flex w-full mx-auto my-2 justify-center flex-col items-center border p-2 border-solid border-slate-300 rounded-md overflow-hidden">
                            <img
                              src={preview}
                              alt={`Selected ${index}`}
                              className="object-cover w-full h-[100px]"
                              onError={() => {
                                setBrokenImages((prev) => ({
                                  ...prev,
                                  [preview]: true,
                                }));
                              }}
                            />
                            <Button
                              onClick={() => {
                                const updated = [...value];
                                const removed = updated[index];

                                // ✅ API call only for existing images in edit mode
                                if (isEditMode && removed?.imageUrl) {
                                  const fileName = removed.imageUrl;

                                  const payload = {
                                    qrId: id, // 👈 from props
                                    assetUrl: fileName, // 👈 extracted from imageUrl
                                  };

                                  dispatch(
                                    delteQRAsset(payload, (success) => {
                                      if (success) {
                                        handleRefresh();
                                      }
                                    }),
                                  );
                                }

                                // ✅ Cleanup blob URLs (new uploads)
                                if (
                                  removed?.preview &&
                                  removed?.file instanceof File
                                ) {
                                  URL.revokeObjectURL(removed.preview);
                                }

                                updated.splice(index, 1);
                                onChange(updated);
                              }}
                              className="my-4 bg-red-500 w-max p-3"
                            >
                              <MdDelete size={12} />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {value.length < maxFiles && (
                  <div
                    className="flex justify-center items-center w-full py-12 border border-dashed text-slate-600 border-slate-600 cursor-pointer rounded-lg"
                    onClick={handleClick}
                  >
                    <LuImagePlus size="32px" />
                    <h2 className="font-poppins font-semibold text-[16px] ml-2">
                      Add Images
                    </h2>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.target.files);
                  // ✅ Previews created HERE, not in a useEffect
                  const formattedFiles = files.map((file) => ({
                    file,
                    preview: URL.createObjectURL(file),
                  }));

                  const remainingSlots = maxFiles - value.length;
                  const toAdd = formattedFiles.slice(0, remainingSlots);
                  onChange([...value, ...toAdd]);
                  fileInputRef.current.value = "";
                }}
              />

              {errors?.[name] && (
                <span className="text-red-500 text-[12px]">
                  {errors[name].message}
                </span>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default ImageField;
