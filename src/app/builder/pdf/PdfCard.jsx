import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { BsFilePdf } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getThePDFFile,
  getThePDFPrevImage,
} from "../../../redux/features/qrcodes";

const PdfCard = ({ pdfData, firstColor, isScanPage, isEditMode }) => {
  const [previewSrc, setPreviewSrc] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const blobUrlRef = useRef(null);
  const dispatch = useDispatch();

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Priority 1: user uploaded a new image (works in both builder and edit mode)
    const newImageFile = pdfData?.image?.[0]?.file;
    const newImagePreview = pdfData?.image?.[0]?.preview;

    if (newImageFile || newImagePreview) {
      // Use preview blob URL directly if available (no need to recreate)
      if (newImagePreview) {
        setPreviewSrc(newImagePreview);
        return;
      }
      // Otherwise create blob URL from file
      const url = URL.createObjectURL(newImageFile);
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = url;
      setPreviewSrc(url);
      return;
    }

    // Priority 2: fetch from server (scan page or edit mode with existing imageUrl, no new upload)
    const shouldFetch =
      (isScanPage && pdfData?.imageUrl) ||
      (isEditMode && pdfData?.imageUrl);

    if (!shouldFetch) {
      setPreviewSrc("");
      return;
    }

    const imageName = pdfData.imageUrl.split("/").pop();
    if (!imageName) return;

    setImageLoading(true);

    dispatch(
      getThePDFPrevImage(imageName, (err, blob) => {
        setImageLoading(false);
        if (!err && blob) {
          if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
          const url = URL.createObjectURL(blob);
          blobUrlRef.current = url;
          setPreviewSrc(url);
        } else {
          setPreviewSrc("");
        }
      }),
    );
  }, [isScanPage, isEditMode, pdfData?.imageUrl, pdfData?.image, dispatch]);

  const handleOpenPDF = () => {
    const isServerFile = isScanPage || isEditMode;
    if (!isServerFile) return;

    const pdfName = pdfData?.pdfFileUrl?.split("/").pop();
    if (!pdfName) return;

    const loadingToastId = toast.loading("Fetching PDF...");

    dispatch(
      getThePDFFile(pdfName, (err, blob) => {
        if (!err && blob) {
          const url = URL.createObjectURL(blob);
          const newWindow = window.open(url, "_blank");

          if (newWindow) newWindow.focus();
          else toast.warning("Please allow popups to open PDF");

          toast.update(loadingToastId, {
            render: "PDF opened successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });

          setTimeout(() => URL.revokeObjectURL(url), 10000);
        } else {
          toast.update(loadingToastId, {
            render: "Failed to open PDF",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }),
    );
  };

  const renderPreview = () => {
    if (imageLoading) {
      return (
        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-md">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (previewSrc) {
      return (
        <img
          src={previewSrc}
          alt={pdfData?.name}
          className="w-10 h-10 object-cover rounded-md"
        />
      );
    }

    return (
      <div className="w-10 h-10 bg-red-50 flex items-center justify-center rounded-md">
        <BsFilePdf size={22} className="text-red-500" />
      </div>
    );
  };

  return (
    <div
      onClick={handleOpenPDF}
      className="flex items-center p-2 border rounded-md shadow-sm mb-2 bg-white justify-between cursor-pointer"
    >
      <div className="flex items-center">
        <div className="w-10 h-10 flex-shrink-0 mr-2">{renderPreview()}</div>

        <div className="flex flex-col">
          <span className="font-semibold text-xs text-gray-900 break-all">
            {pdfData?.name || pdfData?.pdfFileName}
          </span>
          <span className="text-[12px] text-gray-800 break-all">
            {pdfData?.description || ""}
          </span>
        </div>
      </div>

      <div className="flex-shrink-0 ml-2 text-gray-400">
        <IoIosArrowForward size={16} style={{ color: firstColor }} />
      </div>
    </div>
  );
};

export default PdfCard;