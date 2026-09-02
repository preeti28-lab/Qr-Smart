import React, { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import StepHeading from "../../../components/ui/StepHeading";
import Frame from "../../../components/qr-frames/Frame";
import { frames } from "../../../constants/frames";
import { useNavigate } from "react-router-dom";

const QRView = ({
  selectedType,
  link,
  websiteUrl,
  enteredText,
  emailData,
  whatsAppData,
  selectedFrame,
  selectedLevel,
  isCodeStyle,
  isCorner,
  isCenterStyle,
  isCodeStyleBorderColor,
  isCodeStyleDotColor,
  isCodeStyleCenterColor,
  isCodeStyleBackgroundColor,
  selectedLogo,
  wifiData,
  smsData,
  vCardData,
  showHeading = true,
  showBtn = true,
  currentFormData,
}) => {
  const containerRef = useRef(); // ref on the wrapper div
  const frameRef = useRef(); // ref on the Frame component (forwardRef)
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  // Loads a Blob/File into an <img>, resolving once it's actually painted
  // and ready to be drawn onto a canvas.
  const loadImageFromBlob = (blob) =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };
      img.src = url;
    });

  const downloadQR = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const scale = 4;

      // ─── 1. Get the outer SVG (frame) ─────────────────────────────────────
      const svgElement = containerRef.current?.querySelector("svg");

      // No frame markup (e.g. "None" frame selected) — fall back to a plain
      // QR download instead of failing, since there's nothing to composite.
      if (!svgElement) {
        const qrBlob = await frameRef.current?.getQrImage();
        if (!qrBlob) {
          toast.error("QR code isn't ready yet — please try again.");
          return;
        }
        const url = URL.createObjectURL(qrBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-code.png";
        a.click();
        URL.revokeObjectURL(url);
        return;
      }

      const frameWidth = svgElement?.viewBox?.baseVal?.width || 200;
      const frameHeight = svgElement?.viewBox?.baseVal?.height || 400;

      const canvas = document.createElement("canvas");
      canvas.width = frameWidth * scale;
      canvas.height = frameHeight * scale;
      const ctx = canvas.getContext("2d");

      // ─── 2. Draw the frame SVG (paths + text, no foreignObject) ───────────
      // Clone and strip foreignObject so XMLSerializer doesn't choke
      const cloned = svgElement.cloneNode(true);
      cloned.querySelectorAll("foreignObject").forEach((el) => el.remove());
      cloned.setAttribute("width", frameWidth);
      cloned.setAttribute("height", frameHeight);

      const svgBlob = new Blob(
        [new XMLSerializer().serializeToString(cloned)],
        { type: "image/svg+xml;charset=utf-8" },
      );
      const frameImg = await loadImageFromBlob(svgBlob);
      ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

      // ─── 3. Draw the QR on top ─────────────────────────────────────────────
      // Ask the library for a fully-rendered PNG rather than reading its
      // internal <canvas> directly — the internal canvas can exist in the DOM
      // before the QR pattern has actually finished painting onto it, which
      // silently produces a blank square in the download.
      const qrBlob = await frameRef.current?.getQrImage();
      if (qrBlob) {
        const qrImg = await loadImageFromBlob(qrBlob);

        const frame = frames?.find((f) => f.name === selectedFrame);
        const rect = frame?.rect;

        if (rect) {
          // Convert frame SVG coords → output canvas pixels
          const scaleX = canvas.width / frameWidth;
          const scaleY = canvas.height / frameHeight;

          ctx.drawImage(
            qrImg,
            rect.x * scaleX,
            rect.y * scaleY,
            rect.width * scaleX,
            rect.height * scaleY,
          );
        } else {
          // No frame — just centre the QR
          const size = Math.min(canvas.width, canvas.height);
          const offsetX = (canvas.width - size) / 2;
          const offsetY = (canvas.height - size) / 2;
          ctx.drawImage(qrImg, offsetX, offsetY, size, size);
        }
      }

      // ─── 4. Download ────────────────────────────────────────────────────────
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "qr-code.png";
      a.click();
    } catch (err) {
      console.error("Failed to download QR code:", err);
      toast.error("Couldn't download the QR code. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // NOTE: Array#filter always returns an array (even [] when nothing
  // matches), and [] is truthy in JS — so `frame && (...)` below used to
  // render unconditionally, even when selectedFrame didn't match anything.
  const matchedFrames = frames?.filter((f) => f.name === selectedFrame);
  const frame = matchedFrames?.[0];

  return (
    <div className="relative">
      <div className="bg-gray-100 p-5 flex items-center flex-col gap-5 rounded-lg sticky top-20">
        {showHeading && <StepHeading number="3" text="Download your QR" />}

        <div className="relative w-[200px] md:h-[300px]">
          {/* ✅ containerRef on wrapper to find the SVG */}
          <div ref={containerRef} className="w-full h-full relative">
            <Frame
              ref={frameRef} // ✅ forwardRef to access getRawCanvas()/getQrImage()
              key={selectedFrame}
              frame={frame}
              websiteUrl={websiteUrl}
              enteredText={enteredText}
              emailData={emailData}
              whatsAppData={whatsAppData}
              selectedType={selectedType}
              selectedLevel={selectedLevel}
              isCodeStyle={isCodeStyle}
              isCorner={isCorner}
              isCenterStyle={isCenterStyle}
              isCodeStyleBorderColor={isCodeStyleBorderColor}
              isCodeStyleDotColor={isCodeStyleDotColor}
              isCodeStyleCenterColor={isCodeStyleCenterColor}
              isCodeStyleBackgroundColor={isCodeStyleBackgroundColor}
              selectedLogo={selectedLogo}
              wifiData={wifiData}
              smsData={smsData}
              vCardData={vCardData}
              currentFormData={currentFormData}
              link={link}
            />
          </div>
        </div>

        {showBtn && (
          <button
            className="rounded-full border-gray-500 border px-4 py-2 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={downloadQR}
            disabled={isDownloading}
          >
            {isDownloading ? "Preparing..." : "Download QR"} <FaChevronDown />
          </button>
        )}
      </div>
    </div>
  );
};

export default QRView;