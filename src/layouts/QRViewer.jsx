// PATH: src/layouts/QRViewer.jsx
import React, { useEffect, useState } from "react";
import { FloatButton } from "antd";
import { IoQrCode } from "react-icons/io5";
import { MdContentPasteSearch } from "react-icons/md";
import { LuQrCode } from "react-icons/lu";
import { FaQrcode } from "react-icons/fa";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";

import QRShow from "../tools/QRShow";
import QRModal from "../tools/QRModal";
import DemoPreview from "../components/ui/DemoPreview";
import PreviewScreen from "../app/builder/images/PreviewScreen";
import StepRail from "../components/ui/StepRail";
import usePath from "../hooks/usePath";

const BUILDER_STEPS = [
  { label: "Type of QR code", short: "Type", icon: <IoQrCode /> },
  { label: "Content", short: "Content", icon: <MdContentPasteSearch /> },
  { label: "QR design", short: "Design", icon: <LuQrCode /> },
];

const QRViewer = ({
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
  frameTitle = "Website",
  hideProgress = false,
  setWebsiteUrl = () => {},
  saveQR,
  setSaveQR,
  setImageBlob,
  uploadedImages,
  imageFormData,
}) => {
  const path = usePath();
  const { mobileFrame } = useSelector((state) => state.action);
  const { qrType, shortlink, websiteUrl, dummyTextForQr, dummyVcDetails } =
    useSelector((state) => state.dashboard);

  const [qrValue, setQrValue] = useState(shortlink);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setQrValue(shortlink);
  }, [shortlink]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F5F7FB]">
      <div className="py-4 px-4 sm:px-6 flex flex-col justify-start items-stretch gap-y-5 max-w-[1500px] mx-auto">
        {!hideProgress ? (
          <div className="w-full hidden md:block sticky top-[64px] z-20 pt-1 pb-1">
            <StepRail steps={BUILDER_STEPS} current={current} />
          </div>
        ) : null}

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

        <div className="w-full flex test flex-col md:flex-row justify-center items-start gap-x-6">
          <div className={`w-[50%] lg:w-[70%] ${className} dynamic-grids`}>
            {children}
          </div>

          <div className="w-[50%] lg:w-[30%] flex flex-col sticky top-[140px] right-0 justify-center items-center dynamic-qr-show">
            <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              {current > 1 ? (
                <QRShow
                  title={mobileFrame || frameTitle}
                  selectedFrame={selectedFrame}
                  selectedLogo={selectedLogo}
                  selectedLevel={selectedLevel}
                  selectedCodeStyle={selectedCodeStyle}
                  selectedCorner={selectedCorner}
                  selectedCenterStyle={selectedCenterStyle}
                  selectedCodeStyleBorderColor={selectedCodeStyleBorderColor}
                  selectedCodeStyleDotColor={selectedCodeStyleDotColor}
                  selectedCodeStyleCenterColor={selectedCodeStyleCenterColor}
                  selectedCodeStyleBackgroundColor={selectedCodeStyleBackgroundColor}
                  saveQR={saveQR}
                  setSaveQR={setSaveQR}
                  setImageBlob={setImageBlob}
                  uploadedImages={uploadedImages}
                />
              ) : (
                <div className="w-full flex flex-col items-center gap-y-3">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Live preview
                    </span>
                    <span className="flex items-center gap-x-1.5 text-[11px] font-semibold text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Updating
                    </span>
                  </div>

                  <div
                    className="w-full rounded-xl flex justify-center py-3"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px)",
                      backgroundSize: "12px 12px",
                    }}
                  >
                    <DemoPreview height={520}>
                      <PreviewScreen currentFormData={imageFormData} />
                    </DemoPreview>
                  </div>

                  <p className="text-[11.5px] text-center text-slate-400 font-medium leading-snug px-2">
                    This is how the scanned page will look on a phone.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <FloatButton
          icon={
            <FaQrcode className="relative right-[1px]" color="white" size={20} />
          }
          onClick={() => setModalOpen(!modalOpen)}
          className="qr-float-btn hidden"
        />

        <QRModal isOpen={modalOpen} setIsOpen={setModalOpen}>
          {current > 1 ? (
            <QRShow
              title={mobileFrame || frameTitle}
              selectedFrame={selectedFrame}
              selectedLogo={selectedLogo}
              selectedLevel={selectedLevel}
              selectedCodeStyle={selectedCodeStyle}
              selectedCorner={selectedCorner}
              selectedCenterStyle={selectedCenterStyle}
              selectedCodeStyleBorderColor={selectedCodeStyleBorderColor}
              selectedCodeStyleDotColor={selectedCodeStyleDotColor}
              selectedCodeStyleCenterColor={selectedCodeStyleCenterColor}
              selectedCodeStyleBackgroundColor={selectedCodeStyleBackgroundColor}
              qrType
              saveQR={saveQR}
              setSaveQR={setSaveQR}
              setImageBlob={setImageBlob}
              uploadedImages={uploadedImages}
            />
          ) : (
            <div className="qr-container w-[65%] mx-auto relative">
              <div className="max-w-[250px] mx-auto border-[6px] border-black rounded-[30px] p-5 h-[75%]">
                <div className="bg-black pb-3 rounded-bl-[7px] rounded-br-[7px] max-w-[40%] mx-auto mt-[-23px] mb-2"></div>
                <div className="flex flex-col items-center justify-between h-full lg:min-h-[460px]">
                  <div className="border-2 border-[#e1e1e1] rounded-md py-1 px-1 flex items-center w-full">
                    <p className="text-[9px] font-bold">https://qrsmart.us/</p>
                  </div>
                  <div className="w-full">
                    <p className="text-[10px] text-center pb-5 pt-3 font-bold">
                      QR Code Generators
                    </p>
                    {qrType?.type === "website" && (
                      <QRCode
                        value={websiteUrl ? `${encodeURIComponent(websiteUrl)}` : "abc"}
                        size={150}
                        className="testqr w-full"
                      />
                    )}
                    {qrType?.type === "text" && (
                      <QRCode
                        value={dummyTextForQr ? JSON.stringify(dummyTextForQr) : "abc"}
                        size={150}
                        className="testqr w-full"
                      />
                    )}
                    {qrType?.type === "vcard" && (
                      <QRCode
                        value={JSON.stringify(dummyVcDetails)}
                        size={150}
                        className="testqr w-full"
                      />
                    )}
                    {qrType?.type !== "website" &&
                      qrType?.type !== "text" &&
                      qrType?.type !== "vcard" && (
                        <QRCode
                          value={
                            websiteUrl
                              ? `${encodeURIComponent(websiteUrl)}`
                              : "qrsmart.us"
                          }
                          size={150}
                          className="testqr w-full"
                        />
                      )}
                    <p className="text-center font-semibold text-[10px] py-3">
                      For Development &amp; Testing Purposes Only. Not for Production
                      Use
                    </p>
                  </div>

                  <div className="w-full">
                    <div className="bg-[#e1e1e1] py-[1.2rem] rounded-md mb-5">
                      <div className="bg-[#c1c1c1] py-[0.4rem] mx-3 rounded-md"></div>
                    </div>
                    <div className="flex justify-between gap-3">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-full flex flex-col justify-center items-center"
                        >
                          <div className="p-4 rounded-full bg-[#e1e1e1]"></div>
                          <div className="p-1 bg-[#e1e1e1] mt-2 w-full rounded-md"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </QRModal>
      </div>
    </div>
  );
};

export default QRViewer;