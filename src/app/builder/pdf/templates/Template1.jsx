import React, { useEffect, useRef, useState } from "react";
import PdfCard from "../PdfCard";
import { getContrastColor } from "../../../../utils";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../../redux/features/qrcodes";

const Template1 = ({
  currentFormData,
  firstColor,
  secondClr,
  isScanPage,
  isEditMode,
}) => {

  console.log(currentFormData)
  const { company, description, pdfTitle, pdfBanner, pdfBannerUrl, website } =
    currentFormData || {};

  const dispatch = useDispatch();
  const fetchedRef = useRef({});
  const fetchingRef = useRef(new Set());

  const DEFAULT_BANNER = "https://img.qrfy.com/img/original/mockup_pdf_template2.webp";
  const [bannerSrc, setBannerSrc] = useState(DEFAULT_BANNER);

  const textColor = getContrastColor(secondClr);

  const fetchBanner = (serverPath, onUrl) => {
    if (!serverPath) return;
    const fileName = serverPath.split("/").pop();
    if (!fileName) return;
    if (fetchedRef.current[fileName]) { onUrl(fetchedRef.current[fileName]); return; }
    if (fetchingRef.current.has(fileName)) return;
    fetchingRef.current.add(fileName);
    dispatch(
      getThePDFPrevImage(fileName, (err, blob) => {
        fetchingRef.current.delete(fileName);
        if (!err && blob) {
          const url = URL.createObjectURL(blob);
          fetchedRef.current[fileName] = url;
          onUrl(url);
        }
      }),
    );
  };

  useEffect(() => {
    // Priority 1: new upload
    const newFile = pdfBanner?.[0]?.file;
    if (newFile) {
      const url = pdfBanner[0].preview || URL.createObjectURL(newFile);
      setBannerSrc(url);
      return () => { if (!pdfBanner[0].preview) URL.revokeObjectURL(url); };
    }
    // Priority 2: scan mode
    if (isScanPage && pdfBannerUrl) {
      fetchBanner(pdfBannerUrl, setBannerSrc);
      return;
    }
    // Priority 3: edit mode existing banner
    if (isEditMode) {
      const existing = pdfBanner?.[0];
      const serverPath = existing?.bannerUrl || existing?.url || pdfBannerUrl;
      if (serverPath) { fetchBanner(serverPath, setBannerSrc); return; }
    }
    setBannerSrc(DEFAULT_BANNER);
  }, [isScanPage, isEditMode, pdfBanner, pdfBannerUrl]);

  // Cleanup cached blobs on unmount
  useEffect(() => {
    return () => {
      Object.values(fetchedRef.current).forEach((url) => {
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <div>
      <img src={bannerSrc} className="w-full h-[180px] object-cover" />

      <div
        style={{ background: secondClr, color: textColor }}
        className="-mt-5 relative rounded-tl-3xl rounded-tr-3xl pt-3 px-2"
      >
        <p className="text-center text-xs">{company}</p>
        <p className="text-center font-semibold pb-1">{pdfTitle}</p>
        <p className="text-center text-xs">{description}</p>

        <div className="p-2 mt-2">
          {currentFormData?.pdfs?.map((pdf, index) => (
            <PdfCard
              key={index}
              pdfData={pdf}
              index={index}
              firstColor={firstColor}
              isScanPage={isScanPage}
              isEditMode={isEditMode}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <a href={website} target="_blank" rel="noreferrer" className="text-center text-xs text-black">
          {website}
        </a>
      </div>
    </div>
  );
};

export default Template1;