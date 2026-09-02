import React, { useState } from "react";
import QRFrames from "./QRFrames";
import QRShapes from "./QRShapes";
import QRLogos from "./QRLogos";
import QRCorrectionLevel from "../../tools/qr-components/QRCorrectionLevel";

const tabs = ["Frame", "Shape", "Logo", "Level"];

const QRDesignTabs = ({
  selectedFrame,
  setSelectedFrame,
  selectedShape,
  setSelectedShape,
  selectedLogo,
  setSelectedLogo,
  selectedLevel,
  setSelectedLevel,
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
}) => {
  const [activeTab, setActiveTab] = useState("Frame");

  const renderContent = () => {
    switch (activeTab) {
      case "Frame":
        return (
          <QRFrames
            selectedFrame={selectedFrame}
            setSelectedFrame={setSelectedFrame}
          />
        );
      case "Shape":
        return (
          <QRShapes
            style="non-accordian"
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
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
        );
      case "Logo":
        return (
          <QRLogos
            selectedLogo={selectedLogo}
            setSelectedLogo={setSelectedLogo}
          />
        );
      case "Level":
        return (
          <QRCorrectionLevel
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            showHeading={false}
            style="non-accordian"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className=" rounded-xl">
      {/* Tabs */}
      <div className="flex ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "text-blue-600 bg-blue-50 rounded-lg"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-3 w-full min-w-0 rounded-lg border p-4 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default QRDesignTabs;
