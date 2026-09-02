// PATH: src/app/builder/QRDesign.jsx
import React, { useEffect, useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import QRViewer from "../../layouts/QRViewer";
import QRMenu from "../../components/menu/QRMenu";
import { FaArrowLeft } from "react-icons/fa";
import { MdRestartAlt, MdCheckCircleOutline } from "react-icons/md";
import QRCorrectionLevel from "../../tools/qr-components/QRCorrectionLevel";
import QRAddLogo from "../../tools/qr-components/QRAddLogo";
import QRCodeStyle from "../../tools/qr-components/QRCodeStyle";
import QRFrames from "../../components/ui/QRFrames";
import QRTemplates from "../../tools/qr-components/QRTemplates";

import { useDispatch, useSelector } from "react-redux";
import {
  createQr,
  setDashboard,
  setQrName,
  setTextForQR,
  setTime,
  setUploadedPdf,
  setVCardDetails,
  setWebsiteUrl,
} from "../../redux/features/dashboard";
import { useLocation } from "react-router-dom";
import usePath from "../../hooks/usePath";
import { Spinner } from "@material-tailwind/react";

/* Defaults live in one place so "Start over" and the initial state can't drift. */
const DEFAULTS = {
  level: "Q",
  logo: "",
  frame: "none",
  codeStyle: "rounded",
  corner: "extra-rounded",
  centerStyle: "dot",
  borderColor: "#000000",
  dotColor: "#000000",
  centerColor: "#000000",
  backgroundColor: "#ffffff",
};

const QRDesign = () => {
  const dispatch = useDispatch();
  const path = usePath();
  const { state } = usePath();

  const { createQRLoader } = useSelector((state) => state.loader);

  const [isLevel, setIsLevel] = useState(DEFAULTS.level);
  const [isLogo, setIsLogo] = useState(DEFAULTS.logo);
  const [isFrame, setIsFrame] = useState(DEFAULTS.frame);
  const [isCodeStyle, setIsCodeStyle] = useState(DEFAULTS.codeStyle);
  const [isCorner, setIsCorner] = useState(DEFAULTS.corner);
  const [isCenterStyle, setIsCenterStyle] = useState(DEFAULTS.centerStyle);
  const [isCodeStyleBorderColor, setIsCodeStyleBorderColor] = useState(
    DEFAULTS.borderColor
  );
  const [isCodeStyleDotColor, setIsCodeStyleDotColor] = useState(DEFAULTS.dotColor);
  const [isCodeStyleCenterColor, setIsCodeStyleCenterColor] = useState(
    DEFAULTS.centerColor
  );
  const [isCodeStyleBackgroundColor, setIsCodeStyleBackgroundColor] = useState(
    DEFAULTS.backgroundColor
  );
  const [isUploadedImage, setIsUploadedImage] = useState(false);

  const {
    websiteUrl,
    qrType,
    vCardDetails,
    qrName,
    textQrName,
    imageQrName,
    videoQrName,
    pdfQrName,
    vcQrName,
    timeRange,
    shortlink,
    uploadedPdf,
    textForQR,
  } = useSelector((state) => state.dashboard);

  const location = useLocation();
  const uploadedImages = location.state;

  const [saveQR, setSaveQR] = useState(false);
  const [completeData, setCompleteData] = useState();
  const [imageBlob, setImageBlob] = useState();

  const resetDesign = () => {
    setIsLevel(DEFAULTS.level);
    setIsLogo(DEFAULTS.logo);
    setIsFrame(DEFAULTS.frame);
    setIsCodeStyle(DEFAULTS.codeStyle);
    setIsCorner(DEFAULTS.corner);
    setIsCenterStyle(DEFAULTS.centerStyle);
    setIsCodeStyleBorderColor(DEFAULTS.borderColor);
    setIsCodeStyleDotColor(DEFAULTS.dotColor);
    setIsCodeStyleCenterColor(DEFAULTS.centerColor);
    setIsCodeStyleBackgroundColor(DEFAULTS.backgroundColor);
    setIsUploadedImage(false);
  };

  const handleSubmit = async () => {
    setSaveQR(true);

    const data = {
      style: {
        isLevel,
        isLogo,
        isFrame,
        isCodeStyle,
        isCorner,
        isCenterStyle,
        isCodeStyleBorderColor,
        isCodeStyleDotColor,
        isCodeStyleCenterColor,
        isCodeStyleBackgroundColor,
        isUploadedImage,
      },
      vcard: vCardDetails ? vCardDetails : "",
      type: qrType?.type,
      scheduled: Array.isArray(timeRange) && timeRange.length > 0,
      ...(timeRange &&
        timeRange.length > 0 && {
          scheduleTimeFrom: timeRange[0],
          scheduleTimeTo: timeRange[1],
        }),
      content:
        qrType?.type === "website"
          ? websiteUrl
          : qrType?.type === "text"
          ? textForQR
          : "",
      name:
        qrType?.type === "website"
          ? qrName
          : qrType?.type === "text"
          ? textQrName
          : qrType?.type === "video"
          ? videoQrName
          : qrType?.type === "image"
          ? imageQrName
          : qrType?.type === "vcard"
          ? vcQrName
          : qrType?.type === "pdf"
          ? pdfQrName
          : "",
    };
    setCompleteData(data);
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const fetchBlobFromUrl = (blobUrl) =>
    fetch(blobUrl).then((response) => response.blob());

  const generateQr = async (completeData, shortlink, imageBlob) => {
    let isLogoBase64 = null;

    if (
      completeData?.style?.isLogo &&
      completeData?.style?.isLogo.startsWith("blob:")
    ) {
      try {
        const blob = await fetchBlobFromUrl(completeData.style.isLogo);
        isLogoBase64 = await blobToBase64(blob);
      } catch (error) {
        console.error("Error fetching or converting isLogo:", error);
      }
    }

    const payload = {
      ...completeData,
      shortLink: shortlink,
      style: {
        ...completeData.style,
        isLogo: isLogoBase64 || completeData.style.isLogo,
      },
    };

    const formData = new FormData();

    for (const key in payload) {
      if (payload[key] !== null && payload[key] !== undefined) {
        if (typeof payload[key] === "object") {
          formData.append(key, JSON.stringify(payload[key]));
        } else {
          formData.append(key, payload[key]);
        }
      }
    }

    if (imageBlob) {
      formData.append("qr", imageBlob, "qr-image.png");
    }

    if (uploadedPdf && qrType?.type === "pdf") {
      formData.append("file", uploadedPdf.files[0]);
    }

    if (uploadedImages?.data && qrType?.type === "image") {
      uploadedImages.data.image.forEach((image) => {
        formData.append(`file`, image.file);
      });
    }

    if (uploadedImages?.data && qrType?.type === "video") {
      const files = uploadedImages.data.files;
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
    }

    dispatch(
      createQr({
        formData,
        callback: (error, data) => {
          if (error) {
            console.error("QR Creation Failed:", error);
          } else {
            setCompleteData(null);
            dispatch(setTime(null));
            dispatch(setQrName(null));
            dispatch(setWebsiteUrl(null));
            dispatch(setVCardDetails());
            dispatch(setDashboard({ shortlink: null }));
            dispatch(setUploadedPdf(null));
            dispatch(setTextForQR(null));
            path.navigate(`/my-qr-codes`);
          }
        },
      })
    );
  };

  useEffect(() => {
    if (completeData && shortlink && imageBlob) {
      generateQr(completeData, shortlink, imageBlob);
    }
  }, [completeData, shortlink, imageBlob]);

  const frameSummary = !isFrame || isFrame === "none" ? "No frame" : isFrame;

  return (
    <AppViewer>
      <QRViewer
        current={2}
        selectedFrame={isFrame}
        selectedLogo={isLogo}
        selectedLevel={isLevel}
        selectedCodeStyle={isCodeStyle}
        selectedCorner={isCorner}
        selectedCenterStyle={isCenterStyle}
        selectedCodeStyleBorderColor={isCodeStyleBorderColor}
        selectedCodeStyleDotColor={isCodeStyleDotColor}
        selectedCodeStyleCenterColor={isCodeStyleCenterColor}
        selectedCodeStyleBackgroundColor={isCodeStyleBackgroundColor}
        saveQR={saveQR}
        setSaveQR={setSaveQR}
        setImageBlob={setImageBlob}
      >
        <div className="w-full flex flex-col justify-start items-start gap-y-5">
          {/* ── Page header ── */}
          <div className="w-full flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-y-1">
              <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-blue-600">
                Final step
              </span>
              <h2 className="text-[23px] font-bold text-slate-900 tracking-[-0.03em] leading-tight">
                Make it look like yours
              </h2>
              <p className="text-[13px] font-medium text-slate-500 max-w-lg leading-snug">
                Every change shows up in the preview on the right. Scan it with your
                phone before you finish.
              </p>
            </div>

            <button
              type="button"
              onClick={resetDesign}
              className="flex items-center gap-x-1.5 rounded-full border border-slate-200 bg-white
                px-3.5 py-2 text-[12.5px] font-semibold text-slate-600
                hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
            >
              <MdRestartAlt size={16} />
              Start over
            </button>
          </div>

          {/* ── Sections ── */}
          <div className="flex flex-col w-full justify-start items-start gap-y-3.5">
            <QRTemplates />

            <QRMenu
              title="Frame"
              desc="A printed outline around the code, with a call to action."
              iconShow={true}
              defualt={true}
              glyph="frame"
              summary={frameSummary}
              maxHeight="max-h-[900px]"
            >
              <QRFrames
                selectedFrame={isFrame}
                setSelectedFrame={setIsFrame}
                showGrid={true}
              />
            </QRMenu>

            <QRCodeStyle
              isCodeStyle={isCodeStyle}
              setIsCodeStyle={setIsCodeStyle}
              isCorner={isCorner}
              setIsCorner={setIsCorner}
              isCenterStyle={isCenterStyle}
              setIsCenterStyle={setIsCenterStyle}
              isCodeStyleBorderColor={isCodeStyleBorderColor}
              setIsCodeStyleBorderColor={setIsCodeStyleBorderColor}
              isCodeStyleDotColor={isCodeStyleDotColor}
              setIsCodeStyleDotColor={setIsCodeStyleDotColor}
              isCodeStyleCenterColor={isCodeStyleCenterColor}
              setIsCodeStyleCenterColor={setIsCodeStyleCenterColor}
              isCodeStyleBackgroundColor={isCodeStyleBackgroundColor}
              setIsCodeStyleBackgroundColor={setIsCodeStyleBackgroundColor}
            />

            <QRAddLogo
              logo={isLogo}
              changeLogo={setIsLogo}
              setIsUploadedImage={setIsUploadedImage}
            />

            <QRCorrectionLevel
              selectedLevel={isLevel}
              setSelectedLevel={setIsLevel}
            />
          </div>
        </div>

        {/* ── Sticky action bar ── */}
        <div className="sticky bottom-0 z-20 w-full pt-4 pb-3 mt-2">
          <div
            className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md px-4 py-3
              flex items-center justify-between gap-3 shadow-[0_-6px_28px_-16px_rgba(15,23,42,0.4)]"
          >
            <span className="hidden sm:flex items-center gap-x-1.5 text-[12.5px] font-medium text-slate-500">
              <MdCheckCircleOutline size={16} className="text-emerald-500" />
              Design saved with the code
            </span>

            <div className="flex items-center gap-x-2.5 ml-auto">
              <button
                type="button"
                onClick={() => path.back()}
                className="flex items-center gap-x-2 rounded-full border border-slate-300 bg-white
                  px-4 py-2 text-[13.5px] font-semibold text-slate-700
                  hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
              >
                <FaArrowLeft size={12} />
                Back
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={createQRLoader}
                className="flex items-center gap-x-2 rounded-full px-6 py-2 text-[13.5px] font-semibold text-white
                  bg-gradient-to-r from-emerald-600 to-emerald-500
                  hover:from-emerald-700 hover:to-emerald-600
                  shadow-[0_8px_20px_-10px_rgba(5,150,105,0.9)]
                  disabled:opacity-70 disabled:cursor-not-allowed
                  transition-all duration-200 active:scale-[0.98]"
              >
                {createQRLoader ? (
                  <>
                    Creating
                    <Spinner color="white" className="h-4 w-4" />
                  </>
                ) : (
                  "Create QR code"
                )}
              </button>
            </div>
          </div>
        </div>
      </QRViewer>
    </AppViewer>
  );
};

export default QRDesign;