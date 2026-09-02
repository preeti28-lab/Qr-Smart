import React, { useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import QRCorrectionLevel from "../../tools/qr-components/QRCorrectionLevel";
import MyButton from "../../components/buttons/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTemplate } from "../../redux/features/templates";
import { FaArrowLeft } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";
import QRMenu from "../../components/menu/QRMenu";
import { IoMdInformationCircleOutline } from "react-icons/io";
import QRFrames from "../../components/ui/QRFrames";
import QRShapes from "../../components/ui/QRShapes";
import QRLogos from "../../components/ui/QRLogos";
import QRView from "../home/qrGenerate/QRView";

const CreateTemplate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isTemplateLoading } = useSelector((s) => s.template);

  // ── Single source of truth — same naming as TextBuilder ──
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("M");
  const [isCodeStyle, setIsCodeStyle] = useState("rounded");
  const [isCorner, setIsCorner] = useState("extra-rounded");
  const [isCenterStyle, setIsCenterStyle] = useState("dot");
  const [isCodeStyleBorderColor, setIsCodeStyleBorderColor] = useState("#000000");
  const [isCodeStyleDotColor, setIsCodeStyleDotColor] = useState("#000000");
  const [isCodeStyleCenterColor, setIsCodeStyleCenterColor] = useState("#000000");
  const [isCodeStyleBackgroundColor, setIsCodeStyleBackgroundColor] = useState("#ffffff");

  const [templateName, setTemplateName] = useState("");
  const [nameError, setNameError] = useState("");
  const [selectedType] = useState("event");

  const handleSave = () => {
    if (!templateName.trim()) {
      setNameError("Template name is required");
      return;
    }
    setNameError("");

    const style = {
      selectedFrame,
      selectedShape,
      isCodeStyle,
      isCorner,
      isCenterStyle,
      isCodeStyleBorderColor,
      isCodeStyleDotColor,
      isCodeStyleCenterColor,
      isCodeStyleBackgroundColor,
      selectedLogo: selectedLogo || null,
      selectedLevel,
      image: selectedLogo || "",
      logoPreset: "logo4",
      corners: {
        dotColor: isCodeStyleCenterColor,
        dotStyle: isCenterStyle,
        squareColor: isCodeStyleDotColor,
        squareStyle: isCorner,
      },
      frame: {
        id: selectedFrame || null,
        text: "Scan me!",
        textColor: "#000000",
        fontSize: 100,
        color: {
          type: "solid",
          rotation: 0,
          colorStops: [{ offset: 0, color: "#000000" }],
        },
        backgroundColor: {
          type: "solid",
          rotation: 0,
          colorStops: [{ offset: 0, color: "#ffffff" }],
        },
      },
      shape: {
        dotsStyle: isCodeStyle,
        backgroundColor: isCodeStyleBackgroundColor,
        color: {
          type: "solid",
          rotation: 0,
          colorStops: [{ offset: 0, color: isCodeStyleBorderColor }],
        },
      },
    };

    dispatch(createTemplate(templateName.trim(), style));
    navigate("/templates");
  };

  return (
    <AppViewer>
      <div className="flex gap-5 p-5">
        {/* ── Left Panel: Controls ── */}
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          {/* Template Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Template Name
            </label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
                if (nameError) setNameError("");
              }}
              placeholder="Enter template name"
              className={`border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                nameError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {nameError && (
              <span className="text-xs text-red-500">{nameError}</span>
            )}
          </div>

          {/* Frame */}
          <QRMenu
            title="Frame"
            desc="Define the QR code outline by choosing from preset frames."
            icon={<IoMdInformationCircleOutline size={22} />}
            defualt={true}
          >
            <QRFrames
              selectedFrame={selectedFrame}
              setSelectedFrame={setSelectedFrame}
              showGrid={true}
            />
          </QRMenu>

          {/* QR Code Style */}
          <QRMenu
            title="QR Code Style"
            desc="Customize the central area of the QR code by combining shapes and colors."
            icon={<IoMdInformationCircleOutline size={22} />}
          >
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
          </QRMenu>

          {/* Add Logo */}
          <QRMenu
            title="Add Logo"
            desc="Add a central logo by uploading your image or choosing one of our designs."
            icon={<IoMdInformationCircleOutline size={22} />}
          >
            <QRLogos
              selectedLogo={selectedLogo}
              setSelectedLogo={setSelectedLogo}
            />
          </QRMenu>

          {/* Correction Level */}
          <QRMenu
            title="Correction Level"
            desc="Ensures a reliable reading by compensating for damage or distortion."
            icon={<IoMdInformationCircleOutline size={22} />}
          >
            <QRCorrectionLevel
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              showHeading={false}
              style="non-accordian"
            />
          </QRMenu>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => navigate("/templates")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <FaArrowLeft size={13} />
              Back
            </button>

            <MyButton
              onClick={handleSave}
              disabled={isTemplateLoading}
              className="flex items-center gap-2"
            >
              {isTemplateLoading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Save Template"
              )}
            </MyButton>
          </div>
        </div>

        {/* ── Right Panel: Live QR Preview ── */}
        <QRView
          link="dummy link"
          selectedType={selectedType}
          selectedFrame={selectedFrame}
          selectedLevel={selectedLevel}
          isCodeStyle={isCodeStyle}
          isCorner={isCorner}
          isCenterStyle={isCenterStyle}
          isCodeStyleBorderColor={isCodeStyleBorderColor}
          isCodeStyleDotColor={isCodeStyleDotColor}
          isCodeStyleCenterColor={isCodeStyleCenterColor}
          isCodeStyleBackgroundColor={isCodeStyleBackgroundColor}
          selectedLogo={selectedLogo}
          showHeading={false}
          showBtn={false}
        />
      </div>
    </AppViewer>
  );
};

export default CreateTemplate;