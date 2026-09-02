// PATH: src/app/bulk/Bulk.jsx
import React, { useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import QRBulkViewer from "../../layouts/QRBulkViewer";
import QRButton from "../../components/buttons/QRButton";

import { AiOutlineGlobal } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { HiOutlineRefresh } from "react-icons/hi";

import { useDispatch } from "react-redux";
import { setAction } from "../../redux/features/action";
import { setQrType } from "../../redux/features/dashboard";
import usePath from "../../hooks/usePath";

const ICON = 22;

/**
 * Types supported by the bulk flow. `type` strings must stay exactly as they
 * were — the CSV parser and backend switch on these values.
 */
const BULK_TYPES = [
  {
    type: "website",
    text: "Website",
    desc: "Open a URL",
    tint: "#2563EB",
    icon: <AiOutlineGlobal size={ICON} />,
  },
  {
    type: "text",
    text: "Text",
    desc: "Show a text",
    tint: "#475569",
    icon: <TiDocumentText size={ICON} />,
  },
  {
    type: "vcard",
    text: "vCard Plus",
    desc: "Share contact details",
    tint: "#0D9488",
    icon: <FaRegAddressCard size={ICON} />,
  },
];

const MODULE_TEXTURE = {
  backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};

const Bulk = () => {
  const dispatch = useDispatch();
  const path = usePath();
  const [qrType, setQRType] = useState();

  const onHover = (hover) => {
    dispatch(setAction({ mobileFrame: hover }));
  };

  const handleSelect = (type) => {
    setQRType({ type });
    dispatch(setQrType({ type }));
    path.push("qr-design");
  };

  return (
    <AppViewer>
      <QRBulkViewer className="flex flex-col gap-y-7" title="" showNavigate={false}>
        {/* ── Hero band ── */}
        <div
          className="relative w-full overflow-hidden rounded-2xl px-5 py-6 sm:px-7 sm:py-7"
          style={{
            background:
              "linear-gradient(135deg, #0B1E3F 0%, #12336E 55%, #1B57E3 140%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={MODULE_TEXTURE} />

          <svg
            className="absolute -right-6 -bottom-10 opacity-[0.10] hidden sm:block"
            width="190"
            height="190"
            viewBox="0 0 48 48"
            fill="none"
          >
            <rect x="3" y="3" width="17" height="17" rx="3" stroke="#fff" strokeWidth="3.5" />
            <rect x="9" y="9" width="5" height="5" fill="#fff" />
            <rect x="28" y="3" width="17" height="17" rx="3" stroke="#fff" strokeWidth="3.5" />
            <rect x="34" y="9" width="5" height="5" fill="#fff" />
            <rect x="3" y="28" width="17" height="17" rx="3" stroke="#fff" strokeWidth="3.5" />
            <rect x="9" y="34" width="5" height="5" fill="#fff" />
            <rect x="28" y="28" width="6" height="6" fill="#fff" />
            <rect x="39" y="28" width="6" height="6" fill="#fff" />
            <rect x="28" y="39" width="6" height="6" fill="#fff" />
          </svg>

          <div className="relative flex flex-col gap-y-3">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-blue-200/90">
              Step 1 of 3
            </span>
            <div className="flex flex-col gap-y-1.5 max-w-xl">
              <h1 className="text-white text-[24px] sm:text-[27px] font-bold leading-[1.15] tracking-[-0.025em]">
                What kind of codes are you making?
              </h1>
              <p className="text-[13.5px] font-medium text-blue-100/80 leading-snug">
                Pick a type, design it once, then upload a CSV — every row becomes
                its own QR code with the same styling.
              </p>
            </div>
          </div>
        </div>

        {/* ── Types ── */}
        <section className="flex flex-col gap-y-4 w-full">
          <div className="w-full flex flex-wrap items-center gap-x-3 gap-y-2">
            <div className="flex items-center gap-x-2.5">
              <span
                className="grid place-items-center w-7 h-7 rounded-lg"
                style={{ backgroundColor: "#1B57E314", color: "#1B57E3" }}
              >
                <HiOutlineRefresh size={15} />
              </span>
              <h2 className="text-[17px] font-bold text-slate-900 tracking-[-0.02em]">
                Dynamic QR
              </h2>
              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 rounded-full px-2 py-[3px] leading-none">
                {BULK_TYPES.length}
              </span>
            </div>
            <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
            <p className="text-[12.5px] font-medium text-slate-500 w-full sm:w-auto">
              Edit any code's content later without reprinting it
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5 w-full">
            {BULK_TYPES.map((item) => (
              <QRButton
                key={item.type}
                icon={item.icon}
                text={item.text}
                desc={item.desc}
                tint={item.tint}
                type={item.type}
                onHover={onHover}
                onSelect={handleSelect}
                active={qrType?.type === item.type}
              />
            ))}
          </div>
        </section>
      </QRBulkViewer>
    </AppViewer>
  );
};

export default Bulk;