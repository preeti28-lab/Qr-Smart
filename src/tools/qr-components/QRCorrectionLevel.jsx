// PATH: src/tools/qr-components/QRCorrectionLevel.jsx
import React from "react";
import QRMenu from "../../components/menu/QRMenu";
import CorrectionButton from "../../components/buttons/CorrectionButton";
import { BsQrCode } from "react-icons/bs";
import { ImQrcode } from "react-icons/im";
import { LiaQrcodeSolid } from "react-icons/lia";
import { MdQrCode2 } from "react-icons/md";

/**
 * Ordered low -> high redundancy, so the row itself reads as a scale.
 *
 * The four glyphs are different QR marks on purpose: the denser the pattern,
 * the higher the correction level, so the artwork carries the same information
 * as the percentage badge. Sizes are tuned per icon because each one ships with
 * a different amount of internal padding.
 */
const LEVELS = [
  { level: "L", percentage: 7, icon: <MdQrCode2 size={86} /> },
  { level: "M", percentage: 15, icon: <LiaQrcodeSolid size={94} /> },
  { level: "Q", percentage: 25, icon: <BsQrCode size={70} /> },
  { level: "H", percentage: 30, icon: <ImQrcode size={70} /> },
];

const QRCorrectionLevel = ({
  selectedLevel,
  setSelectedLevel = () => {},
  showHeading,
  style = "accordion",
}) => {
  const content = (
    <>
      {style === "accordion" && (
        <p className="text-start font-medium text-[13px] text-slate-500 leading-relaxed max-w-2xl">
          A higher level lets the code survive more scratches, glare and fading —
          the trade-off is a denser pattern that needs to be printed slightly larger.
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {LEVELS.map(({ level, percentage, icon }) => (
          <CorrectionButton
            key={level}
            icon={icon}
            active={selectedLevel === level}
            level={level}
            percentage={percentage}
            changeLevel={() => setSelectedLevel(level)}
          />
        ))}
      </div>
    </>
  );

  return style === "accordion" ? (
    <QRMenu
      title="Correction level"
      desc="How much damage the code can take and still scan."
      iconShow={true}
      defualt={true}
      glyph="shield"
      summary={`Level ${selectedLevel || "Q"}`}
      maxHeight="max-h-[900px]"
    >
      {content}
    </QRMenu>
  ) : (
    <div>{content}</div>
  );
};

export default QRCorrectionLevel;