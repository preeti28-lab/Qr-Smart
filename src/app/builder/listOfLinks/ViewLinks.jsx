import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";
import { getTextColor } from "../../../utils";

const ViewLinks = ({
  bgColor = "#000000",
  linksData = [],
  selectedTemplate,
  linkBgColor,
  linkColor,
  isScanPage,
  isEditMode,
}) => {
  const dispatch = useDispatch();
  const separatorColor = getTextColor(bgColor);

  const [resolvedImages, setResolvedImages] = useState({});

  useEffect(() => {
    if (!isScanPage && !isEditMode) return;

    const createdUrls = [];

    linksData.forEach((item, index) => {
      if (item.type !== "link") return;

      const firstImage = item?.image?.[0];
      const hasNewPreview = !!firstImage?.preview && !firstImage?.isExisting;
      const hasExistingServerImage =
        !!item?.imageUrl || (!!firstImage?.imageUrl && firstImage?.isExisting);

      // If user uploaded a new image, always prefer that and do not fetch old image
      if (hasNewPreview) {
        setResolvedImages((prev) => ({
          ...prev,
          [index]: firstImage.preview,
        }));
        return;
      }

      // Current scan page logic: fetch server image blob
      if ((isScanPage || isEditMode) && hasExistingServerImage) {
        const serverPath = item?.imageUrl || firstImage?.imageUrl;
        const imageName = serverPath.split("/").pop();

        dispatch(
          getThePDFPrevImage(imageName, (err, blob) => {
            if (!err && blob) {
              const url = URL.createObjectURL(blob);
              createdUrls.push(url);

              setResolvedImages((prev) => ({
                ...prev,
                [index]: url,
              }));
            }
          }),
        );
      }
    });

    return () => {
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [isScanPage, isEditMode, linksData, dispatch]);

  return (
    <div className="space-y-3 mt-3 w-[90%] mx-auto pb-5">
      {linksData.map((item, index) => {
        if (item.type === "separator") {
          return (
            <div
              key={index}
              className="text-xs text-left font-medium"
              style={{ color: separatorColor }}
            >
              {item.text}
            </div>
          );
        }

        if (item.type === "link") {
          const firstImage = item?.image?.[0];

          const localPreview =
            firstImage?.preview && !firstImage?.isExisting
              ? firstImage.preview
              : null;

          const existingImagePath =
            item?.imageUrl || firstImage?.imageUrl || null;

          let imgSrc = null;

          if (isScanPage) {
            imgSrc = resolvedImages[index] || null;
          } else if (isEditMode) {
            imgSrc =
              localPreview ||
              resolvedImages[index] ||
              existingImagePath ||
              null;
          } else {
            imgSrc = localPreview || existingImagePath || null;
          }

          return (
            <a
              key={index}
              href={item.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div
                className={`rounded-md p-2 flex items-center gap-3 shadow-sm hover:bg-transparent border hover:border transition
                ${
                  selectedTemplate === 3 || selectedTemplate === 5
                    ? "!rounded-full"
                    : ""
                }
                ${
                  selectedTemplate === 4 || selectedTemplate === 5
                    ? "!bg-transparent"
                    : ""
                }`}
                style={{ background: linkBgColor }}
              >
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt="link"
                    className={`w-8 h-8 rounded object-cover
                    ${
                      selectedTemplate === 3 || selectedTemplate === 5
                        ? "!rounded-full"
                        : ""
                    }`}
                  />
                )}

                <p
                  className="text-xs text-gray-800 font-medium"
                  style={{ color: linkColor }}
                >
                  {item.text}
                </p>
              </div>
            </a>
          );
        }

        return null;
      })}
    </div>
  );
};

export default ViewLinks;
