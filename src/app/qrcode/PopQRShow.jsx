import React, { useState, useEffect, useRef } from "react";
import { toBlob, toPng } from "html-to-image";
import download from "downloadjs";
import { CiMobile2 } from "react-icons/ci";
import { HiOutlineQrCode } from "react-icons/hi2";
import QRCodeStyling from "qr-code-styling";
import QRPhoneFrame from "../../components/qr-frames/QRPhoneFrame";
import QRNormalFrame from "../../components/qr-frames/QRNormalFrame";
import { RiDownloadFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setQRBlob } from "../../redux/features/dashboard";

const PopQRShow = ({
  title = "",
  selectedFrame = "",
  selectedLogo = "",
  selectedLevel = "Q",
  selectedCodeStyle = "rounded",
  selectedCorner = "extra-rounded",
  selectedCenterStyle = "dot",
  selectedCodeStyleBorderColor = "#000000",
  selectedCodeStyleDotColor = "#000000",
  selectedCodeStyleCenterColor = "#000000",
  selectedCodeStyleBackgroundColor = "#ffffff",
  showDownload = "true",
  saveQR,
  setSaveQR,
  data,
  setImageBlob,
}) => {
  const [isOption, setIsOption] = useState("qr");
  const dispatch = useDispatch();
  const qrContainerRef = useRef(null);
  const downloadContainerRef = useRef(null); // ref for the entire container

  const { websiteUrl, qrType, vCardDetails, shortlink } = useSelector(
    (state) => state.dashboard
  );
  // console.log("fetched uerl", websiteUrl);
  // console.log(qrType, vCardDetails);

  const generateQRCode = () => {
    let myQR = new QRCodeStyling({
      width: 256,
      height: 256,
      data: data,
      image: selectedLogo && selectedLogo !== "" ? selectedLogo : null,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.3,
      },
      qrOptions: {
        errorCorrectionLevel: selectedLevel,
      },
      dotsOptions: {
        type: selectedCodeStyle,
        color: selectedCodeStyleBorderColor,
      },
      backgroundOptions: {
        color: selectedCodeStyleBackgroundColor,
      },
      cornersSquareOptions: {
        type: selectedCorner,
        color: selectedCodeStyleDotColor,
      },
      cornersDotOptions: {
        type: selectedCenterStyle,
        color: selectedCodeStyleCenterColor,
      },
    });

    if (qrContainerRef.current) {
      qrContainerRef.current.innerHTML = "";
      myQR.append(qrContainerRef.current);
    }
  };

  const downloadQRCode = () => {
    if (downloadContainerRef.current) {
      toPng(downloadContainerRef.current) // Convert to PNG
        .then((dataUrl) => {
          download(dataUrl, "qr-code-frame.png"); // Download as PNG
        })
        .catch((error) => {
          console.error("Error generating QR code image:", error);
        });
    }
  };

  useEffect(() => {
    if (selectedFrame || selectedFrame === "") {
      generateQRCode();
    }
  }, [
    selectedFrame,
    selectedLevel,
    selectedLogo,
    selectedCodeStyle,
    selectedCorner,
    selectedCenterStyle,
    selectedCodeStyleBorderColor,
    selectedCodeStyleDotColor,
    selectedCodeStyleCenterColor,
    selectedCodeStyleBackgroundColor,
  ]);

  // Function to capture the image and store in Redux when flag is true

 



  return (
    <div className="flex flex-col justify-start pl-4 items-start gap-y-10 w-full">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-semibold text-[20px]">{title}</h2>
      </div>

      <div
        ref={downloadContainerRef}
        className="w-full flex justify-center items-start"
      >
        {selectedFrame === "normalframe" ? (
          <>
            <QRNormalFrame className="p-0">
              <div
                ref={qrContainerRef}
                className="w-[256px] h-[256px] qr-container"
              />
            </QRNormalFrame>
          </>
        ) : selectedFrame === "phoneframe" ? (
          <>
            <QRPhoneFrame className="p-0">
              <div
                ref={qrContainerRef}
                className="w-[256px] h-[256px] qr-container"
              />
            </QRPhoneFrame>
          </>
        ) : (
          <>
            <div className="">
              <div
                ref={qrContainerRef}
                className="w-[256px] h-[256px] qr-container"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center w-full">
      <button
        onClick={downloadQRCode}
        className="rounded-full mb-5 text-[14px] text-white bg-blue-700 font-medium gap-x-2 flex justify-center items-center py-2 px-4"
      >
        <RiDownloadFill color="white" size={17} />
        Download
      </button>
      </div>
      
    </div>
  );
};

export default PopQRShow;
