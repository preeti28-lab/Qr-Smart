// components/qr/QRPreviewContent.jsx

import React from "react";
import DemoPreview from "../ui/DemoPreview";
import QRView from "../../pages/home/qrGenerate/QRView";
import { previewRegistry } from "../previewRegistry";

const QRPreviewContent = ({
  type, // 👈 important
  currentStep,
  currentFormData,
  qrProps,
}) => {
  const PreviewScreen = previewRegistry[type];

  if (currentStep === 1) {
    return (
      <DemoPreview height={600}>
        {PreviewScreen ? (
          <PreviewScreen currentFormData={currentFormData} />
        ) : (
          <p>No preview available</p>
        )}
      </DemoPreview>
    );
  }

  if (currentStep === 2) {
    return <QRView {...qrProps} showHeading={false} showBtn={false} />;
  }

  return null;
};

export default QRPreviewContent;