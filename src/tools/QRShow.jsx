import React, { useState, useEffect, useRef } from "react";
import { toBlob, toPng } from "html-to-image";
import download from "downloadjs";
import { CiMobile2 } from "react-icons/ci";
import { HiOutlineQrCode } from "react-icons/hi2";
import QRCodeStyling from "qr-code-styling";
import QRPhoneFrame from "../components/qr-frames/QRPhoneFrame";
import QRNormalFrame from "../components/qr-frames/QRNormalFrame";
import { RiDownloadFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setQRBlob, setQRImage } from "../redux/features/dashboard";

const QRShow = ({
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
  setImageBlob,
}) => {
  const [isOption, setIsOption] = useState("qr");
  const dispatch = useDispatch();
  const qrContainerRef = useRef(null);
  const downloadContainerRef = useRef(null); // ref for the entire container

  

  const { websiteUrl, qrType, vCardDetails , shortlink} = useSelector(
    (state) => state.dashboard
  );
  // console.log("fetched uerl", websiteUrl);
  // console.log(qrType, vCardDetails);

  const generateQRCode = () => {
    let qrData = "";

    if (qrType?.text === "vcard") {
      // Construct the vCard data in the required format
      qrData = `BEGIN:VCARD
VERSION:3.0
FN:${vCardDetails.name}
EMAIL:${vCardDetails.email}
URL:${shortlink}
END:VCARD`;
    } else {
      // Use the website URL for the QR code data
      qrData = shortlink;
    }

    let myQR = new QRCodeStyling({
      width: 256,
      height: 256,
      data: shortlink,
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


  console.log(selectedFrame,
    selectedLevel,
    selectedLogo,
    selectedCodeStyle,
    selectedCorner,
    selectedCenterStyle,
    selectedCodeStyleBorderColor,
    selectedCodeStyleDotColor,
    selectedCodeStyleCenterColor,
    selectedCodeStyleBackgroundColor,)

  // Function to capture the image and store in Redux when flag is true

  function base64ToFormData(base64String, filename) {
  const byteCharacters = atob(base64String.split(',')[1]); // Decoding base64 string
  const byteArray = new Uint8Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i);
  }

  // Create a Blob from the byte array
  const blob = new Blob([byteArray], { type: 'image/png' }); // Adjust MIME type if needed

  // Create a new FormData instance
  const formData = new FormData();
  
  // Append the Blob (file) to FormData
  formData.append('file', blob, filename);
  
  return formData;
}

  const captureAndStoreImage = () => {
    // if (saveQR && downloadContainerRef.current) {
    //   toPng(downloadContainerRef.current)
    //     .then((dataUrl) => {
    //       dispatch(setQRImage(dataUrl)); // Dispatch base64 string to Redux store
    //       console.log(dataUrl); // Log the base64 string for debugging
    //     })
    //     .catch((error) => {
    //       console.error("Error generating QR code image:", error);
    //     });
    //   setSaveQR(false);
    // }
    if (saveQR && downloadContainerRef.current) {
      toBlob(downloadContainerRef.current)
        .then((blob) => {
          setImageBlob(blob)
          dispatch(setQRBlob(blob))
          // const url = URL.createObjectURL(blob);
          // download(url, "qr-code-frame.png");
          // URL.revokeObjectURL(url); // Clean up the object URL after download
        })
        .catch((error) => {
          console.error("Error generating QR code image:", error);
        });
    }
  };

  // Trigger the image capture when the flag is true and the selectedFrame changes
  useEffect(() => {
    captureAndStoreImage();
  }, [saveQR]);

  return (
    <div className="flex flex-col justify-start pl-0 md:pl-4 items-start  gap-y-3 md:gap-y-10 w-full">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-semibold text-[20px]">{title}</h2>
      </div>

      <div
        ref={downloadContainerRef}
        className="w-full flex justify-center items-start"
      >
        {selectedFrame === "normalframe" ? (
          <QRNormalFrame>
            <div
              ref={qrContainerRef}
              className="w-[256px] h-[256px] qr-container"
            />
          </QRNormalFrame>
        ) : selectedFrame === "phoneframe" ? (
          <QRPhoneFrame>
            <div
              ref={qrContainerRef}
              className="w-[256px] h-[256px] qr-container"
            />
          </QRPhoneFrame>
        ) : (
          <div className="rounded-md flex flex-col justify-center items-center py-4 pt-6 gap-y-5 p-2">
            <div
              ref={qrContainerRef}
              className="w-[256px] h-[256px] qr-container"
            />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center w-full">
        {showDownload === "true" ? (
          <>
            <button
              onClick={downloadQRCode}
              className="rounded-full text-[14px] text-white bg-blue-700 font-medium gap-x-2 flex justify-center items-center py-2 px-4"
            >
              <RiDownloadFill color="white" size={17} />
              Download
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default QRShow;
