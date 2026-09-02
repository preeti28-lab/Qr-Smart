import React from "react";
import { Dialog } from "@material-tailwind/react";
import { BsQrCode } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import PopQRShow from "./PopQRShow";

const QRPopUp = ({ isOpen = false, setIsOpen = () => {}  , qrStyle , shortLink}) => {
  const handleClose = () => setIsOpen(false);

  // console.log(qrStyle)

  return (
    <>
      <Dialog
        open={isOpen}
        handler={setIsOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <div className="flex justify-between items-center py-2 px-4 w-full">
          <h3 className="text-[23px] font-bold text-slate-900">QR Smart</h3>
          <button
            className="text-slate-900 hover:text-red-500 transition-all"
            onClick={handleClose}
          >
            <RxCross2 size={30} />
          </button>
        </div>
        <div className="flex justify-center text-[#000000] items-center popup-qr">
          <PopQRShow
            title=""
            selectedFrame={qrStyle?.isFrame}
            selectedLogo={qrStyle?.isLogo}
            selectedLevel={qrStyle?.isLevel}
            selectedCodeStyle={qrStyle?.isCodeStyle}
            selectedCorner={qrStyle?.isCorner}
            selectedCenterStyle={qrStyle?.isCenterStyle}
            selectedCodeStyleBorderColor={qrStyle?.isCodeStyleBorderColor}
            selectedCodeStyleDotColor={qrStyle?.isCodeStyleDotColor}
            selectedCodeStyleCenterColor={qrStyle?.isCodeStyleCenterColor}
            selectedCodeStyleBackgroundColor={qrStyle?.isCodeStyleBackgroundColor}
            showDownload="false"
            data={shortLink}
          />
        </div>
      </Dialog>
    </>
  );
};

export default QRPopUp;
