import React from "react";
import PdfCard from "../PdfCard";

const Templates2 = ({
  currentFormData,
  firstColor,
  secondClr,
  isScanPage,
  isEditMode,
}) => {

  console.log(currentFormData)
  const { company, description, pdfTitle, website } = currentFormData || {};

  return (
    <>
      <div className="w-full flex flex-col bg-white rounded-xl py-2">
        <div>
          <p className="text-center text-xs" style={{ color: secondClr }}>
            {company}
          </p>
          <p className="text-center font-semibold pb-1">{pdfTitle}</p>
          <p className="text-center text-xs px-2">{description}</p>
        </div>
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
      <div className="flex justify-center mt-2 text-white">
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="text-center text-xs"
        >
          {website}
        </a>
      </div>
    </>
  );
};

export default Templates2;
