import React, { useEffect, useState } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { FiCopy, FiCalendar, FiTag } from "react-icons/fi";
import { getContrastColor } from "../../../utils";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";
import { useDispatch } from "react-redux";

const PreviewScreen = ({ currentFormData, isScanPage, isEditMode }) => {
  const [imageSrcs, setImageSrcs] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // ---- SCAN PAGE: fetch image from backend ----
    if (isScanPage) {
      const imageName = currentFormData?.imageUrl?.split("/").pop();
      if (!imageName) return;

      dispatch(
        getThePDFPrevImage(imageName, (err, blob) => {
          if (!err && blob) {
            setImageSrcs(URL.createObjectURL(blob));
          } else {
            setImageSrcs("");
          }
        }),
      );
      return;
    }

    // ---- BUILDER (create + edit) ----
    if (!currentFormData?.image?.length) {
      setImageSrcs([]);
      return;
    }

    const createdUrls = []; // track blob URLs we create, for cleanup

    // Check if any image in the array is a newly uploaded File
    const hasNewUpload = currentFormData.image.some(
      (imgObj) => imgObj?.file instanceof Blob,
    );

    // ---- EDIT MODE: fetch backend image ONLY if user hasn't replaced it ----
    if (isEditMode && !hasNewUpload) {
      const existingImg = currentFormData.image.find((img) => img?.imageUrl);
      const imageName = existingImg?.imageUrl?.split("/").pop();

      if (!imageName) {
        setImageSrcs([]);
        return;
      }

      dispatch(
        getThePDFPrevImage(imageName, (err, blob) => {
          if (!err && blob) {
            const url = URL.createObjectURL(blob);
            createdUrls.push(url);
            setImageSrcs([url]);
          } else {
            // Fallback to the raw URL in case the fetch fails
            setImageSrcs([existingImg.imageUrl]);
          }
        }),
      );

      return () => createdUrls.forEach((url) => URL.revokeObjectURL(url));
    }

    // ---- CREATE MODE or EDIT MODE with a newly uploaded file ----
    const urls = currentFormData.image
      .map((imgObj) => {
        if (imgObj?.file instanceof Blob) {
          const url = URL.createObjectURL(imgObj.file);
          createdUrls.push(url);
          return url;
        }
        if (imgObj?.imageUrl) {
          return imgObj.imageUrl;
        }
        return null;
      })
      .filter(Boolean);

    setImageSrcs(urls);

    return () => createdUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [
    currentFormData?.image,
    isScanPage,
    isEditMode,
    currentFormData?.imageUrl,
    dispatch,
  ]);

  if (!currentFormData || Object.keys(currentFormData).length === 0) {
    return <EmptyPreview />;
  }

  

  const {
    description = "",
    title = "",
    companyName = "",
    salesBadge = "",
    couponCode = "",
    validUntil = "",
    buttonText = "Get Deal",
    buttonLink = "#",
    bannerColor = ["#ffffff", "#ff3434"],
    terms = "",
    backgroundColor = "#fff",
  } = currentFormData;

  const bgColor = bannerColor?.[0] || "#f3f4f6";
  const primaryColor = bannerColor?.[1] || "#16a34a";

  const textColor = getContrastColor(bgColor);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const DashedDivider = () => (
    <div className="w-full relative flex items-center">
      <div
        className="w-4 h-4 rounded-full absolute -left-2"
        style={{ backgroundColor: bgColor }}
      />
      <div className="coupon-dashed-line mx-4 my-2 w-full" />
      <div
        className="w-4 h-4 rounded-full absolute -right-2"
        style={{ backgroundColor: bgColor }}
      />
    </div>
  );

  const formattedValidUntil = validUntil
    ? new Date(validUntil).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div
      className={`p-4  ${isScanPage ? "" : "min-h-full"} `}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`${isScanPage ? "flex flex-col justify-center min-h-[99dvh] max-w-3xl mx-auto " : ""}`}
      >
        <h2
          className="font-bold text-lg text-left mb-4 pl-1"
          style={{ color: textColor }}
        >
          {companyName || "Company Name"}
        </h2>

        {/* Flip Card */}
        <div className="flip-scene">
          <div className={`flip-card ${flipped ? "is-flipped" : ""}`}>
            {/* FRONT */}
            <div
              className={`flip-face flip-front bg-white/90 backdrop-blur rounded-2xl  overflow-hidden ${flipped ? "hidden" : ""}`}
            >
              <div className="relative">
                {imageSrcs[0] && (
                  <img
                    src={isScanPage ? imageSrcs : imageSrcs[0]}
                    alt="preview"
                    className="w-full h-[8rem] md:h-[13rem] object-contain   rounded-lg"
                    style={{ background: backgroundColor }}
                  />
                )}
                {salesBadge && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <FiTag size={12} />
                    {salesBadge}
                  </span>
                )}
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
              </div>
              <DashedDivider />
              <div className="p-4 text-center">
                <button
                  onClick={() => setFlipped(true)}
                  style={{ backgroundColor: primaryColor }}
                  className="text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 mx-auto"
                >
                  <FiTag />
                  Get Coupon
                </button>
              </div>
            </div>

            {/* BACK */}
            <div className="flip-face flip-back bg-white/90 backdrop-blur rounded-2xl overflow-hidden !h-max">
              <div className="p-4 text-center">
                {/* Coupon Label */}
                <div className="flex items-center justify-center gap-1 text-xs text-gray-700">
                  <FiTag />
                  Coupon Code
                </div>

                {/* Code Box */}
                <div className="flex items-center justify-center gap-2 bg-gray-200 rounded-lg py-2 px-3 my-2">
                  <h3 className="font-bold text-sm">{couponCode}</h3>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-gray-600"
                  >
                    <FiCopy />
                  </button>
                </div>

                {copied && (
                  <p className="text-green-600 text-xs mb-2">Copied!</p>
                )}

                {/* Validity */}
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-2">
                  <FiCalendar />
                  Valid till: {formattedValidUntil}
                </div>

                {/* CTA */}
                <div className="p-4 text-center">
                  <a
                    href={buttonLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ backgroundColor: primaryColor }}
                    className="block text-white px-5 py-1 rounded-full text-sm w-max mx-auto"
                  >
                    {buttonText}
                  </a>
                </div>
              </div>

              <DashedDivider />

              {/* Back Button */}
              <div className="flex justify-center p-4">
                <button
                  onClick={() => setFlipped(false)}
                  style={{ backgroundColor: primaryColor }}
                  className="text-white px-5 py-1 rounded-full text-sm"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Terms outside the card */}
        {terms && flipped && (
          <div className="mt-4 p-2 text-[13px]  text-gray-800 bg-white/90 backdrop-blur text-left rounded-md shadow-md whitespace-pre-line">
            <p className="font-semibold text-black text-[12px] text-left">
              Terms
            </p>
            {terms}
          </div>
        )}
      </div>

      <style jsx>{`
        .flip-scene {
          perspective: 1000px;
        }

        .flip-card {
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
          display: grid;
        }

        .flip-card.is-flipped {
          transform: rotateY(180deg);
        }

        .flip-face {
          grid-area: 1 / 1;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-back {
          transform: rotateY(180deg);
        }

        .coupon-dashed-line {
          position: relative;
          background: #fff;
          border-top: 2px dashed #d1d5db;
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
};

export default PreviewScreen;
