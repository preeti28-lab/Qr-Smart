import React, { useEffect, useRef, useState } from "react";
import PdfCard from "../PdfCard";
import { getContrastColor } from "../../../../utils";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../../redux/features/qrcodes";

const Template4 = ({
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

  const textColor = getContrastColor(firstColor);

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
    const newFile = pdfBanner?.[0]?.file;
    if (newFile) {
      const url = pdfBanner[0].preview || URL.createObjectURL(newFile);
      setBannerSrc(url);
      return () => { if (!pdfBanner[0].preview) URL.revokeObjectURL(url); };
    }
    if (isScanPage && pdfBannerUrl) {
      fetchBanner(pdfBannerUrl, setBannerSrc);
      return;
    }
    if (isEditMode) {
      const existing = pdfBanner?.[0];
      const serverPath = existing?.bannerUrl || existing?.url || pdfBannerUrl;
      if (serverPath) { fetchBanner(serverPath, setBannerSrc); return; }
    }
    setBannerSrc(DEFAULT_BANNER);
  }, [isScanPage, isEditMode, pdfBanner, pdfBannerUrl]);

  useEffect(() => {
    return () => {
      Object.values(fetchedRef.current).forEach((url) => {
        if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <div>
      <img
        src={bannerSrc}
        className="w-24 h-24 mx-auto rounded-full object-cover -mb-5 border-4 relative z-10"
      />

      <div className="rounded-xl bg-white pt-7">
        <p className="text-center text-xs" style={{ color: firstColor }}>
          {company}
        </p>
        <p className="text-center font-semibold pb-1 text-black">{pdfTitle}</p>
        <p className="text-center text-xs text-black px-2">{description}</p>

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
        <a href={website} target="_blank" rel="noreferrer" className="text-center text-xs" style={{ color: textColor }}>
          {website}
        </a>
      </div>
    </div>
  );
};

export default Template4;