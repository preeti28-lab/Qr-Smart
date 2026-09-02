// PATH: src/layouts/QRBulkViewer.jsx
import React from "react";
import { IoQrCode } from "react-icons/io5";
import { LuQrCode } from "react-icons/lu";
import { FaArrowLeft, FaArrowRight, FaRegFileAlt } from "react-icons/fa";
import MobileFrame from "../components/frames/MobileFrame";
import MyButton from "../components/buttons/MyButton";
import usePath from "../hooks/usePath";
import QRShow from "../tools/QRShow";
import StepRail from "../components/ui/StepRail";

import mobileImage from "../assets/mobileImage.png";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const BULK_STEPS = [
  { label: "Type of QR code", short: "Type", icon: <IoQrCode /> },
  { label: "QR design", short: "Design", icon: <LuQrCode /> },
  { label: "Upload CSV", short: "Upload", icon: <FaRegFileAlt /> },
];

const QRBulkViewer = ({
  children,
  className = "",
  title = "",
  desc = null,
  showNavigate = true,
  current = 0,
  nextPath = "",
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
}) => {
  const path = usePath();
  const location = useLocation();
  const isUploadPage = location.pathname.includes(
    "bulk-qr-code-generator/upload",
  );

  const { mobileFrame } = useSelector((state) => state.action);

  const bulkStyleData = {
    selectedFrame: selectedFrame,
    selectedLogo: selectedLogo,
    selectedLevel: selectedLevel,
    selectedCodeStyle: selectedCodeStyle,
    selectedCorner: selectedCorner,
    selectedCenterStyle: selectedCenterStyle,
    selectedCodeStyleBorderColor: selectedCodeStyleBorderColor,
    selectedCodeStyleDotColor: selectedCodeStyleDotColor,
    selectedCodeStyleCenterColor: selectedCodeStyleCenterColor,
    selectedCodeStyleBackgroundColor: selectedCodeStyleBackgroundColor,
  };

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] bg-[#F5F7FB]">
        <div className="py-4 px-4 sm:px-6 flex flex-col justify-start items-stretch gap-y-5 max-w-[1500px] mx-auto">
        <div className="w-full sticky top-[64px] z-20 pt-1 pb-1">
          <StepRail steps={BULK_STEPS} current={current} />
        </div>

        {title || desc ? (
          <div className="flex flex-col justify-start items-start gap-y-0.5">
            {title ? (
              <h2 className="font-bold text-[21px] text-slate-900 tracking-[-0.025em]">
                {title}
              </h2>
            ) : null}
            {desc ? (
              <p className="text-[13px] font-medium text-slate-500">{desc}</p>
            ) : null}
          </div>
        ) : null}

        <div className="w-full flex flex-col gap-y-2 lg:flex-row justify-center items-start">
          <div className={`w-full md:w-[70%] ${className}`}>
            <div className="mb-3 w-full">{children}</div>
            {showNavigate && !isUploadPage ? (
              <>
                <div className="flex justify-center items-center gap-x-3">
                  <MyButton
                    className="text-slate-700 border border-slate-700 flex justify-center items-center gap-x-2 py-2 rounded-full bg-white font-semibold"
                    onClick={() => path.back()}
                  >
                    <FaArrowLeft size={14} />
                    <span>Back</span>
                  </MyButton>

                  {current > 1 ? (
                    <>
                      <MyButton
                        className="text-slate-50 border border-green-700 hover:bg-green-800 transition-all flex justify-center items-center gap-x-2 py-1.5 rounded-full text-[15px] bg-green-700 font-semibold"
                        // onClick={() => path.changeEndPoint(nextPath)}
                        onClick={() =>
                          path.navigate(`/${path.role}/my-qr-codes`)
                        }
                      >
                        <span>Complete</span>
                      </MyButton>
                    </>
                  ) : (
                    <>
                      <MyButton
                        className="text-slate-50 border border-blue-700 hover:bg-blue-800 transition-all flex justify-center items-center gap-x-2 py-2 rounded-full bg-blue-700 font-semibold"
                        onClick={() => {
                          path.changeEndPoint(nextPath, bulkStyleData);
                          console.log(bulkStyleData);
                        }}
                      >
                        <span>Next</span>
                        <FaArrowRight size={14} />
                      </MyButton>
                    </>
                  )}
                </div>
              </>
            ) : null}
          </div>
          <div className="w-full md:w-[30%] flex flex-col sticky top-0 right-0 justify-center items-center">
            {current > 0 ? (
              <>
                <QRShow
                  // title='Website'
                  title={mobileFrame || "Website"}
                  selectedFrame={selectedFrame}
                  selectedLogo={selectedLogo}
                  selectedLevel={selectedLevel}
                  selectedCodeStyle={selectedCodeStyle}
                  selectedCorner={selectedCorner}
                  selectedCenterStyle={selectedCenterStyle}
                  selectedCodeStyleBorderColor={selectedCodeStyleBorderColor}
                  selectedCodeStyleDotColor={selectedCodeStyleDotColor}
                  selectedCodeStyleCenterColor={selectedCodeStyleCenterColor}
                  selectedCodeStyleBackgroundColor={
                    selectedCodeStyleBackgroundColor
                  }
                />
              </>
            ) : (
              <>
                <h2 className="text-[20px] font-medium">Example</h2>
                <MobileFrame>
                  {mobileFrame ? (
                    <>
                      <img src={mobileImage} className="rounded-full" />
                    </>
                  ) : (
                    <>
                      <div className="w-full h-full flex justify-center items-center">
                        <h2 className="font-semibold text-[12px] text-gray-800">
                          Select a dynamic url.
                        </h2>
                      </div>
                    </>
                  )}
                </MobileFrame>
              </>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default QRBulkViewer;