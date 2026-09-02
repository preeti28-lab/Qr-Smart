import React from "react";
import { MdQrCode2 } from "react-icons/md";

const NormalFrameThumb = ({ children, className }) => {
  return (
    <>
      <div
        className={``}
      >
        {/* {children} */}
        <div className="">
          {/* <MdQrCode2 size={180} /> */}
          {children}
        </div>

        
      </div>
    </>
  );
};

export default NormalFrameThumb;
