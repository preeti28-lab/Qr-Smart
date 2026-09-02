import React from "react";
import { MdQrCode2 } from "react-icons/md";

const QRNormalFrame = ({ children, className }) => {
  return (
    <>
      <div
        className={`rounded-md flex flex-col justify-center items-center py-4 pt-6 gap-y-5 p-2 ${className}`}
      >
        {/* {children} */}
        <div className="bg-white px-4 py-6 rounded-md">
          {/* <MdQrCode2 size={180} /> */}
          {children}
        </div>

        <h2 className="font-semibold text-[18px]">Scan me!</h2>
      </div>
    </>
  );
};

export default QRNormalFrame;
