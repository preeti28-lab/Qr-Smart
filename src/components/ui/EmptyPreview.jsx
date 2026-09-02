import React from "react";

const EmptyPreview = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90%]">
      <img
        src="https://qrfy.com/assets/empty_preview-C1vzHOeI.webp"
        className="w-[100px]"
      />
      <p className="text-sm text-center px-3">
        Complete the data and you will be able to preview your QR code
      </p>
    </div>
  );
};

export default EmptyPreview;
