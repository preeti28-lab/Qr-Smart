import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { getContrastColor } from "../../../../utils";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getThePDFFile } from "../../../../redux/features/qrcodes";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const usePdfPreview = (pdfFile) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pdfFile) return;
    let cancelled = false;

    const generatePreview = async () => {
      setLoading(true);
      try {
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");
        await page.render({ canvasContext: context, viewport }).promise;

        if (!cancelled) setPreviewUrl(canvas.toDataURL("image/png"));
      } catch (err) {
        console.error("PDF preview error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    generatePreview();
    return () => { cancelled = true; };
  }, [pdfFile]);

  return { previewUrl, loading };
};

const PdfSlide = ({ pdf, index, isScanPage, isEditMode, dispatch }) => {
  const [pdfFile, setPdfFile] = useState(isScanPage ? null : pdf.file);

  useEffect(() => {
    // Scan mode OR edit mode with existing server PDF — fetch blob for preview
    if ((isScanPage || (isEditMode && pdf?.isExisting)) && pdf?.pdfFileUrl) {
      const pdfName = pdf.pdfFileUrl.split("/").pop();
      dispatch(
        getThePDFFile(pdfName, (err, blob) => {
          if (!err && blob) setPdfFile(blob);
          else console.error("Failed to fetch PDF for preview:", pdfName);
        }),
      );
    }
  }, [isScanPage, isEditMode, pdf, dispatch]);

  const { previewUrl, loading } = usePdfPreview(pdfFile);

  return (
    <div className="cursor-pointer">
      {loading && (
        <div className="w-28 h-36 mx-auto border-2 rounded-xl flex items-center justify-center bg-gray-100">
          <span className="text-xs text-gray-400">Loading...</span>
        </div>
      )}
      {!loading && previewUrl && (
        <img
          src={previewUrl}
          alt={pdf?.name || `PDF ${index + 1}`}
          className="w-28 h-36 mx-auto border-2 object-cover rounded-xl"
        />
      )}
      {!loading && !previewUrl && (
        <div className="w-28 h-36 mx-auto border-2 rounded-xl flex items-center justify-center bg-gray-100">
          <span className="text-xs text-gray-400 text-center px-1">
            {pdf?.name || pdf?.pdfFileName || `PDF ${index + 1}`}
          </span>
        </div>
      )}
    </div>
  );
};

const Default = ({ currentFormData, firstColor, isScanPage, isEditMode }) => {
  const dispatch = useDispatch();
  const {
    pdfs = [],
    company,
    description,
    pdfTitle,
    website,
    btnTxt,
  } = currentFormData || {};
  const [slides, setSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const textColor = getContrastColor(firstColor);

  useEffect(() => {
    setSlides(pdfs);
  }, [pdfs]);

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 border rounded-full right-2 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <IoIosArrowForward size={20} className="text-white" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute border rounded-full top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <IoIosArrowBack size={20} className="text-white" />
    </div>
  );

  const settings = {
    dots: false,
    infinite: slides.length > 1,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setActiveSlide(next),
  };

  const handleSeePdf = () => {
    const currentPdf = slides[activeSlide];
    if (!currentPdf) return;

    if ((isScanPage || (isEditMode && currentPdf?.isExisting)) && currentPdf?.pdfFileUrl) {
      const pdfName = currentPdf.pdfFileUrl.split("/").pop();
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
    } else {
      const pdfURL = currentPdf?.file
        ? URL.createObjectURL(currentPdf.file)
        : currentPdf?.blobURL;
      if (pdfURL) window.open(pdfURL, "_blank");
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto overflow-hidden py-5 ${isScanPage && "min-h-[100dvh] flex flex-col justify-center"}`}>
      <div className="-mb-10 z-10 relative px-3">
        {slides.length > 0 ? (
          <Slider {...settings}>
            {slides.map((pdf, index) => (
              <PdfSlide
                key={index}
                pdf={pdf}
                index={index}
                isScanPage={isScanPage}
                isEditMode={isEditMode}
                dispatch={dispatch}
              />
            ))}
          </Slider>
        ) : (
          <p className="text-center py-10 text-gray-400">No PDFs added yet</p>
        )}
      </div>

      <div className="bg-white py-2 relative rounded-2xl rounded-tr-2xl mt-2 pt-9 pb-5 mx-4">
        <p className="text-center text-xs">{company}</p>
        <p className="text-center font-semibold pb-1 text-black">{pdfTitle}</p>
        <p className="text-center text-xs text-black px-2">{description}</p>

        <div className="flex justify-center mt-3">
          <button
            onClick={handleSeePdf}
            style={{ background: firstColor, color: textColor }}
            className="px-3 py-1 text-sm rounded-full"
          >
            {btnTxt || "See Pdf"}
          </button>
        </div>
        <div className="flex justify-center border-t mt-5 pt-3">
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="text-center text-xs"
            style={{ color: textColor }}
          >
            {website}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Default;