import React from "react";
import { MdQrCode2 } from "react-icons/md";

const QRPhoneFrame = ({ children, className }) => {
  return (
    <>
      <div
        className={`rounded-md flex flex-col justify-center items-center py-4 pt-6 gap-y-5 p-2 ${className}`}
        style={{ backgroundColor: "#000000" }}
      >
        {/* {children} */}
        <div className="w-full flex justify-center items-center gap-x-1">
          <div className="rounded-full w-2 h-2 bg-white"></div>
          <div className="w-[30px] bg-white rounded-full h-1"></div>
        </div>

        <div className="bg-white px-4 py-6 rounded-md">
          {/* <MdQrCode2 size={180} /> */}
          {children}
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="rounded-full bg-white flex justify-center items-center p-1">
            <div className="rounded-full bg-white border-2 border-solid border-[#000000] p-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRPhoneFrame;
