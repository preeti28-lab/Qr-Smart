import React from "react";
import { useDispatch } from "react-redux";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";
import Default from "./templates/Default";
import Template1 from "./templates/Template1";
import Templates2 from "./templates/Templates2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";

const PreviewScreen = ({ currentFormData, isScanPage, isEditMode }) => {
  const dispatch = useDispatch();

  const {
    bannerColor,
    company,
    description,
    pdfs,
    qrName,
    selectedTemplate,
    website,
  } = currentFormData || {};

  const firstColor = bannerColor?.[0] || "#ffffff";
  const secondClr = bannerColor?.[1] || "#f5f5f5";

  const getDomain = (url) => {
    try {
      const hostname = new URL(url).hostname;
      return hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const templateProps = {
    firstColor,
    secondClr,
    currentFormData,
    isScanPage,
    isEditMode,
  };

  return (
    <div
      className={`p-1 min-h-full relative ${selectedTemplate === 2 && "px-4 pt-5"} ${selectedTemplate === 4 && "px-4"}`}
      style={{ backgroundColor: secondClr }}
    >
      {selectedTemplate === 0 && <Default {...templateProps} />}
      {selectedTemplate === 1 && <Template1 {...templateProps} />}
      {selectedTemplate === 2 && <Templates2 {...templateProps} />}
      {selectedTemplate === 3 && <Template3 {...templateProps} />}
      {selectedTemplate === 4 && <Template4 {...templateProps} />}
    </div>
  );
};

export default PreviewScreen;
