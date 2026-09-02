import React from "react";
import QRCodeStyle from "../../tools/qr-components/QRCodeStyle";

const styles = [
  { id: "square", label: "Square" },
  { id: "rounded", label: "Rounded" },
  { id: "dots", label: "Dots" },
  { id: "classy", label: "Classy" },
  { id: "classy-rounded", label: "Classy Rounded" },
  { id: "extra-rounded", label: "Extra Rounded" },
];

const QRShapes = ({
  selectedShape,
  setSelectedShape,
  isCodeStyle,
  setIsCodeStyle,
  isCorner,
  setIsCorner,
  isCenterStyle,
  setIsCenterStyle,
  isCodeStyleBorderColor,
  setIsCodeStyleBorderColor,
  isCodeStyleDotColor,
  setIsCodeStyleDotColor,
  isCodeStyleCenterColor,
  setIsCodeStyleCenterColor,
  isCodeStyleBackgroundColor,
  setIsCodeStyleBackgroundColor,
  style,
  stylingObject
}) => {

  console.log(stylingObject)
  const baseClass =
    "border-2 flex flex-col items-center justify-center p-3 cursor-pointer rounded-lg gap-1 w-20";

  const renderPreview = (type) => {
    switch (type) {
      case "dots":
        return (
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-black rounded-full"></div>
            ))}
          </div>
        );

      case "rounded":
        return <div className="w-6 h-6 bg-black rounded-md"></div>;

      case "extra-rounded":
        return <div className="w-6 h-6 bg-black rounded-xl"></div>;

      case "classy":
        return <div className="w-6 h-6 bg-black rounded-sm rotate-12"></div>;

      case "classy-rounded":
        return <div className="w-6 h-6 bg-black rounded-lg rotate-12"></div>;

      default:
        return <div className="w-6 h-6 bg-black"></div>;
    }
  };

  return (
    <div className="">
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
        style={style}
        stylingObject={stylingObject}
      />
    </div>
  );
};

export default QRShapes;
