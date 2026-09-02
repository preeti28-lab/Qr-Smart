// PATH: src/tools/qr-components/QRAddLogo.jsx
import React, { useState } from "react";
import QRMenu from "../../components/menu/QRMenu";
import UploadLogoButton from "../../components/buttons/UploadLogoButton";
import { MdOutlineBlock, MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

// image/assets
import linkLogo from "../../assets/linkLogo.png";
import whatsappLogo from "../../assets/whatsappLogo.png";
import locationLogo from "../../assets/locationLogo.png";
import wifiLogo from "../../assets/wifiLogo.png";
import emailLogo from "../../assets/emailLogo.png";
import scanLogo from "../../assets/scanLogo.png";
import bitcoinLogo from "../../assets/bitcoinLogo.png";

const PRESETS = [
  { src: whatsappLogo, label: "WhatsApp" },
  { src: linkLogo, label: "Link" },
  { src: locationLogo, label: "Location" },
  { src: wifiLogo, label: "Wi-Fi" },
  { src: emailLogo, label: "Email" },
  { src: scanLogo, label: "Scan" },
  { src: bitcoinLogo, label: "Bitcoin" },
];

const QRAddLogo = ({
  logo = "whatsapp",
  changeLogo = () => {},
  setIsUploadedImage,
}) => {
  const [images, setImages] = useState([]);

  const tileClass = (active) =>
    `relative flex flex-col items-center justify-center gap-1.5 border-2 rounded-xl cursor-pointer
     transition-all duration-200 shrink-0 w-[96px] h-[96px] p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
       active
         ? "border-blue-600 bg-blue-50/60 shadow-[0_6px_18px_-12px_rgba(27,87,227,0.8)]"
         : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-[1px]"
     }`;

  const CheckBadge = () => (
    <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white rounded-full p-0.5 leading-none z-10">
      <MdCheck size={11} />
    </span>
  );

  const removeImage = (url) => {
    setImages((prev) => prev.filter((item) => item !== url));
  };

  const insertImage = (urls) => {
    setImages((prev) => [...prev, ...urls]);
  };

  const selectedLabel =
    !logo || logo === ""
      ? "No logo"
      : PRESETS.find((p) => p.src === logo)?.label || "Custom logo";

  return (
    <QRMenu
      title="Add logo"
      desc="Drop your brand mark into the middle of the code."
      iconShow={true}
      defualt={true}
      glyph="logo"
      summary={selectedLabel}
      maxHeight="max-h-[700px]"
    >
      <div className="flex flex-col gap-y-5 w-full">
        {/* ── Uploads ── */}
        <div className="flex flex-col gap-y-2.5">
          <div className="flex items-baseline gap-x-2.5">
            <h3 className="font-bold text-[11px] text-slate-900 uppercase tracking-[0.13em]">
              Your logo
            </h3>
            <span className="text-[12px] font-medium text-slate-400">
              PNG or SVG with a transparent background works best
            </span>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <UploadLogoButton onChange={insertImage} />
            {images?.map((item, index) => {
              const active = logo === item;
              return (
                <div
                  key={index}
                  className={tileClass(active)}
                  onClick={() => {
                    changeLogo(item);
                    if (typeof setIsUploadedImage === "function")
                      setIsUploadedImage(true);
                  }}
                >
                  {active && <CheckBadge />}
                  <span
                    className="bg-slate-800 absolute -top-2 -right-2 hover:bg-slate-700 transition-all
                      duration-200 active:bg-black active:scale-90 rounded-full p-1.5 text-white z-20 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(item);
                    }}
                  >
                    <RxCross2 size={12} />
                  </span>
                  <img
                    src={item}
                    alt="Uploaded logo"
                    className="w-[38px] h-[38px] object-contain"
                  />
                  <span className="text-[10.5px] font-semibold text-slate-500 truncate w-full text-center">
                    Custom
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-slate-100" />

        {/* ── Presets ── */}
        <div className="flex flex-col gap-y-2.5">
          <h3 className="font-bold text-[11px] text-slate-900 uppercase tracking-[0.13em]">
            Ready-made marks
          </h3>

          <div className="flex flex-wrap gap-3">
            <div
              className={tileClass(logo === "" || !logo)}
              onClick={() => {
                changeLogo("");
                if (typeof setIsUploadedImage === "function")
                  setIsUploadedImage(false);
              }}
            >
              {(logo === "" || !logo) && <CheckBadge />}
              <MdOutlineBlock size={26} className="text-slate-400" />
              <span
                className={`text-[10.5px] font-semibold ${
                  logo === "" || !logo ? "text-blue-700" : "text-slate-500"
                }`}
              >
                None
              </span>
            </div>

            {PRESETS.map((preset) => {
              const active = logo === preset.src;
              return (
                <div
                  key={preset.label}
                  className={tileClass(active)}
                  onClick={() => {
                    changeLogo(preset.src);
                    if (typeof setIsUploadedImage === "function")
                      setIsUploadedImage(false);
                  }}
                >
                  {active && <CheckBadge />}
                  <img src={preset.src} alt={preset.label} className="w-[30px] h-[30px] object-contain" />
                  <span
                    className={`text-[10.5px] font-semibold ${
                      active ? "text-blue-700" : "text-slate-500"
                    }`}
                  >
                    {preset.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {logo ? (
          <p className="text-[12px] font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
            A logo hides part of the pattern. Set the correction level to H so the
            code still scans.
          </p>
        ) : null}
      </div>
    </QRMenu>
  );
};

export default QRAddLogo;