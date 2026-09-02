import React, { useState, useCallback, useEffect } from "react";

import BuilderLayout from "../../../components/builder/BuilderLayout";
import QRMenu from "../../../components/menu/QRMenu";
import { IoMdInformationCircleOutline } from "react-icons/io";
import ColorPicker from "../../../components/ui/ColorPicker";
import QRFrames from "../../../components/ui/QRFrames";
import QRShapes from "../../../components/ui/QRShapes";
import QRLogos from "../../../components/ui/QRLogos";
import QRCorrectionLevel from "../../../tools/qr-components/QRCorrectionLevel";
import DemoPreview from "../../../components/ui/DemoPreview";
import PreviewScreen from "./PreviewScreen";
import QRView from "../../../pages/home/qrGenerate/QRView";
import Stepper from "../../../components/ui/Stepper";
import LeftAccordion from "../../../components/menu/LeftAccordion";
import VideoInfo from "./VideoInfo";
import VideoUpload from "./VideoUpload";
import AudioPlatformInfo from "./AudioPlatformInfo";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { createQRCode, updateQRCode } from "../../../redux/features/qrcodes";
import SeconStepBtns from "../../../components/builder/SeconStepBtns";
import { useGetSingleQRCode } from "../../../hooks/useGetSingleQRCode";

const PlaylistBuilder = ({ currentFormData, setCurrentFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const isEditMode = !!id;
  const [hasInitialized, setHasInitialized] = useState(false);

  const stepHeading = {
    1: "Complete the content of the QR",
    2: "Design the QR",
  };

  const maxStep = 3;

  const [currentStep, setCurrentStep] = useState(1);
  const [qrCustomization, setQrCustomization] = useState({});
  const [selectedType, setSelectedTye] = useState("event");
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [isCodeStyle, setIsCodeStyle] = useState(true);
  const [isCorner, setIsCorner] = useState(true);
  const [isCenterStyle, setIsCenterStyle] = useState(true);
  const [isCodeStyleBorderColor, setIsCodeStyleBorderColor] =
    useState("#000000");
  const [isCodeStyleDotColor, setIsCodeStyleDotColor] = useState("#000000");
  const [isCodeStyleCenterColor, setIsCodeStyleCenterColor] =
    useState("#000000");
  const [isCodeStyleBackgroundColor, setIsCodeStyleBackgroundColor] =
    useState("#FFFFFF");
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("M");

  const { qrData, isLoading: isLoadingQR } = useGetSingleQRCode(id, isEditMode);

  const methods = useForm({
    defaultValues: {
      audio: currentFormData?.audio || [],
      audioNames:
        currentFormData?.audio?.reduce((acc, file) => {
          const key = file.id || file.blobURL;
          acc[key] = file.name || "";
          return acc;
        }, {}) || {},
      platforms: currentFormData?.platforms || {},
      ...currentFormData,
    },
    context: { selectedTemplate: currentFormData?.selectedTemplate },
  });

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!isEditMode || !qrData) return;

    const styling = qrData?.qrStyling || {};
    const eventContent = qrData?.playlistContent || {};

    setSelectedTye(qrData?.type || "event");
    setSelectedFrame(styling?.selectedFrame ?? null);
    setSelectedShape(styling?.selectedShape ?? null);
    setIsCodeStyle(styling?.isCodeStyle ?? null);
setIsCorner(styling?.isCorner ?? null);
setIsCenterStyle(styling?.isCenterStyle ?? null);
    setIsCodeStyleBorderColor(styling?.isCodeStyleBorderColor || "#000000");
    setIsCodeStyleDotColor(styling?.isCodeStyleDotColor || "#000000");
    setIsCodeStyleCenterColor(styling?.isCodeStyleCenterColor || "#000000");
    setIsCodeStyleBackgroundColor(
      styling?.isCodeStyleBackgroundColor || "#FFFFFF",
    );
    setSelectedLogo(styling?.selectedLogo ?? null);
    setSelectedLevel(styling?.selectedLevel || "M");

    const formattedFormData = {
      qrName: eventContent?.qrName || "",
      name: eventContent?.name || "",
      title: eventContent?.title || "",
      description: eventContent?.description || "",
      bannerColor: eventContent?.bannerColor || "#000000",

      // Cover
      coverUrl: eventContent?.coverUrl || "",
      coverFileName: eventContent?.coverFileName || "",

      // Audios
      // ✅ Map audios → audio so VideoUpload can find it
      audio: (eventContent?.audios || []).map((item) => ({
        file: null,
        fileName: item.fileName || item.audioFileName,
        blobURL: item.audioUrl, // stable key fallback
        audioUrl: item.audioUrl,
        audioFileName: item.audioFileName,
        name: item.name || "",
        isExisting: true,
      })),
      platforms: eventContent?.platforms || {},

      // If you still need image array for uploads
      image: [],
    };

    setCurrentFormData(formattedFormData);
    reset(formattedFormData);
    setHasInitialized(true);
  }, [isEditMode, qrData, hasInitialized, reset, setCurrentFormData]);
  console.log(currentFormData);

  const handleFormDataUpdate = useCallback(
    (data) => {
      setCurrentFormData((prev) => ({
        ...prev,
        ...data,
      }));
    },
    [setCurrentFormData],
  );

  const handleColorChange = useCallback(
    (color) => {
      setCurrentFormData((prev) => ({
        ...prev,
        bannerColor: color,
      }));
    },
    [setCurrentFormData],
  );

  const handleNextStep = handleSubmit(() => {
    setCurrentStep((prev) => Math.min(prev + 1, maxStep));
  });

  const handleBackStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setQrCustomization({
      selectedFrame,
      selectedShape,
      isCodeStyle,
      isCorner,
      isCenterStyle,
      isCodeStyleBorderColor,
      isCodeStyleDotColor,
      isCodeStyleCenterColor,
      isCodeStyleBackgroundColor,
      selectedLogo,
      selectedLevel,
    });
  }, [
    selectedFrame,
    selectedShape,
    isCodeStyle,
    isCorner,
    isCenterStyle,
    isCodeStyleBorderColor,
    isCodeStyleDotColor,
    isCodeStyleCenterColor,
    isCodeStyleBackgroundColor,
    selectedLogo,
    selectedLevel,
  ]);

  const handleFinishClick = () => {
    const payload = {
      ...currentFormData,
      qrStyling: qrCustomization,
      type: "playlist",
      label: currentFormData?.qrName,
    };

    const formData = new FormData();

    console.log(payload);

    Object.keys(payload).forEach((key) => {
      if (key !== "audioNames" && key !== "audio" && key !== "cover") {
        if (typeof payload[key] === "object") {
          formData.append(key, JSON.stringify(payload[key]));
        } else {
          formData.append(key, payload[key]);
        }
      }
    });

    if (payload.cover && payload.cover.length > 0) {
      payload.cover.forEach((imgObj) => {
        if (imgObj.file) {
          formData.append("cover", imgObj.file);
        }
      });
    }

    if (payload.audio && payload.audio.length > 0) {
      payload.audio.forEach((item, index) => {
        formData.append(`audio[${index}][file]`, item.file);
        formData.append(`audio[${index}][fileName]`, item.fileName);
        formData.append(`audio[${index}][name]`, item.name);
      });
    }

    if (isEditMode) {
      dispatch(
        updateQRCode(id, formData, setIsLoading, (success) => {
          if (success) navigate("/my-qr-codes");
        }),
      );
    } else {
      dispatch(
        createQRCode(formData, setIsLoading, (success) => {
          if (success) {
            navigate("/my-qr-codes");
          }
        }),
      );
    }
  };

  const preview = (
    <>
      {currentStep === 1 && (
        <DemoPreview height={600}>
          <PreviewScreen
            currentFormData={currentFormData}
            isScanPage={false}
            isEditMode={isEditMode}
          />
        </DemoPreview>
      )}
      {currentStep === 2 && (
        <QRView
          link={"dummy link"}
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
      )}
    </>
  );

  return (
    <>
      <div className="pt-3">
        <Stepper currentStep={currentStep + 1} />
      </div>

      <div className="flex flex-col justify-start items-start pl-5 mt-3">
        <h2 className="font-semibold text-[20px]">
          {stepHeading[currentStep] || "Complete the content of the QR"}
        </h2>
      </div>

      <BuilderLayout preview={preview} previewTitle="Preview">
        {currentStep === 1 && (
          <>
            <div className="flex flex-col gap-5">
              <Controller
                name="qrName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Name of your QR code..."
                    className="mb-3 border border-gray-400 outline-none px-3 py-2 rounded-lg min-w-full"
                  />
                )}
              />

              <QRMenu
                title="Appearance"
                desc="Choose the styles."
                icon={<IoMdInformationCircleOutline size={22} />}
                defualt={true}
              >
                <ColorPicker onChange={handleColorChange} />
              </QRMenu>

              <QRMenu
                title="Basic Information"
                desc="Add essential information"
                icon={<IoMdInformationCircleOutline size={22} />}
              >
                <div className="w-full">
                  <LeftAccordion title="Information">
                    <VideoInfo
                      onChange={handleFormDataUpdate}
                      currentFormData={currentFormData}
                      control={control}
                      errors={errors}
                    />
                  </LeftAccordion>
                  <LeftAccordion title="Playlist">
                    <VideoUpload
                      onChange={handleFormDataUpdate}
                      currentFormData={currentFormData}
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      isEditMode={isEditMode}
                      id={id}
                    />
                  </LeftAccordion>
                </div>
              </QRMenu>

              <QRMenu
                title="Content"
                desc="All the details about your QR"
                icon={<IoMdInformationCircleOutline size={22} />}
              >
                <LeftAccordion title="Social Networks">
                  <AudioPlatformInfo
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                  />
                </LeftAccordion>
              </QRMenu>

              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 rounded-full py-2"
                  onClick={navigateBack}
                  type="button"
                >
                  Back
                </button>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-full w-max py-2"
                  onClick={handleNextStep}
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="flex flex-col gap-5">
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
            </div>

            <SeconStepBtns
              handleBackStep={handleBackStep}
              handleFinishClick={handleFinishClick}
              isLoading={isLoading}
            />
          </>
        )}
      </BuilderLayout>
    </>
  );
};

export default PlaylistBuilder;
