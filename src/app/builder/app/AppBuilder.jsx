import React, { useState, useCallback, useEffect } from "react";

import QRMenu from "../../../components/menu/QRMenu";
import { IoMdInformationCircleOutline, IoMdClose } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import ColorPicker from "../../../components/ui/ColorPicker";
import QRFrames from "../../../components/ui/QRFrames";
import QRShapes from "../../../components/ui/QRShapes";
import QRLogos from "../../../components/ui/QRLogos";
import QRCorrectionLevel from "../../../tools/qr-components/QRCorrectionLevel";
import AppContent from "./AppContent";
import DemoPreview from "../../../components/ui/DemoPreview";
import QRView from "../../../pages/home/qrGenerate/QRView";
import Stepper from "../../../components/ui/Stepper";
import PlatformLinks from "./PlatformLinks";
import PlatformLinksStatic from "./PlatFormLinksStatic";
import AppPreviewScreen from "./AppPreviewScreen";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appBuilderFormSchema } from "../../../constants/validationSchema";
import { useNavigate, useParams } from "react-router-dom";
import { createQRCode, updateQRCode } from "../../../redux/features/qrcodes";
import { useDispatch } from "react-redux";
import SeconStepBtns from "../../../components/builder/SeconStepBtns";
import PreviewModal from "../../../components/builder/PreviewModal";
import { useGetSingleQRCode } from "../../../hooks/useGetSingleQRCode";

const platforms = [
  {
    key: "googlePlayBtn",
    linkKey: "googlePlayLink",
    label: "Google Play App Button",
    defaultValue: "Get it on",
  },
  {
    key: "appleBtn",
    linkKey: "appleLink",
    label: "Apple App Store Button",
    defaultValue: "Download on the",
  },
  {
    key: "amazonBtn",
    linkKey: "amazonLink",
    label: "Amazon Appstore Button",
    defaultValue: "Download Now",
  },
];

const AppBuilder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentFormData, setCurrentFormData] = useState({
    appName: "",
    developer: "",
    website: "",
    description: "",
    bannerColor: "#3B82F6",
    logo: null,
  });

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const { id } = useParams();

  const isEditMode = !!id;
  const [hasInitialized, setHasInitialized] = useState(false);

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

  const {
    qrData,
    isLoading: isLoadingQR,
    refetch,
  } = useGetSingleQRCode(id, isEditMode);

  // call manually when needed
  const handleRefresh = () => {
    refetch();
  };

  const getDefaultValues = (data) => {
    return platforms.reduce((acc, platform) => {
      acc[platform.key] = data?.[platform.key] || platform.defaultValue;
      return acc;
    }, {});
  };

  const methods = useForm({
    defaultValues: getDefaultValues(currentFormData),
    resolver: yupResolver(appBuilderFormSchema),
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!isEditMode || !qrData) return;

    const styling = qrData?.qrStyling || {};
    const eventContent = qrData?.appContent || {};

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
      amazonBtn: eventContent?.amazonBtn,
      amazonLink: eventContent?.amazonLink || "",
      appName: eventContent?.appName || "",
      appleBtn: eventContent?.appleBtn || "",
      appleLink: eventContent?.appleLink || "",
      bannerColor: eventContent?.bannerColor || [],

      // ✅ FIXED
      image: eventContent?.logoUrl
        ? [
            {
              imageUrl: eventContent.logoUrl,
              imageFileName: eventContent.logoFileName || "",
            },
          ]
        : [],

      description: eventContent?.description,
      developer: eventContent?.developer || "",
      googlePlayBtn: eventContent?.googlePlayBtn || "",
      googlePlayLink: eventContent?.googlePlayLink || "",
      logoFileName: eventContent?.logoFileName || "",
      logoUrl: eventContent?.logoUrl || [],
      website: eventContent?.website || "",
      qrName: eventContent?.qrName || "",
    };

    setCurrentFormData(formattedFormData);
    reset(formattedFormData);
    setHasInitialized(true);
  }, [isEditMode, qrData, hasInitialized, reset, setCurrentFormData]);

  const handleFormDataUpdate = useCallback((newValues) => {
    setCurrentFormData((prev) => ({
      ...prev,
      ...newValues,
    }));
  }, []);

  const stepHeading = {
    1: "Complete the content of the QR",
    2: "Design the QR",
  };

  const maxStep = 3;

  const handleColorChange = useCallback(
    (color) => {
      setCurrentFormData((prev) => ({
        ...prev,
        bannerColor: color,
      }));
    },
    [setCurrentFormData],
  );

  const handleNextStep = handleSubmit((data) => {
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
      type: "app",
      label: currentFormData?.qrName,
    };

    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (key !== "image" && key !== "pdf" && key !== "pdfBanner") {
        if (typeof payload[key] === "object") {
          formData.append(key, JSON.stringify(payload[key]));
        } else {
          formData.append(key, payload[key]);
        }
      }
    });

    if (payload.image && payload.image.length > 0) {
      payload.image.forEach((imgObj) => {
        if (imgObj.file) {
          formData.append("image", imgObj.file);
        }
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

  // ---- Shared preview content (used in both sidebar and modal) ----
  const PreviewContent = () => (
    <>
      {currentStep === 1 && (
        <DemoPreview height={600}>
          <AppPreviewScreen
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

      {/* Floating Preview Button — visible only below xl */}
      <button
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg xl:hidden"
        onClick={() => setShowPreviewModal(true)}
      >
        <FaEye size={18} />
        <span className="text-sm font-medium">Preview</span>
      </button>

      <PreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        title="Preview"
      >
        <PreviewContent />
      </PreviewModal>

      <div className="flex gap-x-5 p-5">
        {/* Left — main form area */}
        <div className="w-full xl:w-[75%]">
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
                  <p>Colour Palette</p>
                  <ColorPicker
                    value={currentFormData?.bannerColor || "#3B82F6"}
                    onChange={handleColorChange}
                  />
                </QRMenu>

                <QRMenu
                  title="Basic Information"
                  desc="Add essential information"
                  icon={<IoMdInformationCircleOutline size={22} />}
                >
                  <div className="w-full">
                    <AppContent
                      control={control}
                      errors={errors}
                      onChange={handleFormDataUpdate}
                      currentFormData={currentFormData}
                      isEditMode={isEditMode}
                      id={id}
                      handleRefresh={handleRefresh}
                    />
                  </div>
                </QRMenu>

                <QRMenu
                  title="Links"
                  desc="Links to different platforms"
                  icon={<IoMdInformationCircleOutline size={22} />}
                >
                  <div className="w-full">
                    <PlatformLinks
                      onChange={handleFormDataUpdate}
                      currentFormData={currentFormData}
                      control={control}
                      errors={errors}
                      watch={watch}
                    />
                  </div>
                </QRMenu>

                <QRMenu
                  title="Buttons"
                  desc="Customize your buttons"
                  icon={<IoMdInformationCircleOutline size={22} />}
                >
                  <div className="w-full">
                    <PlatformLinksStatic
                      onChange={handleFormDataUpdate}
                      currentFormData={currentFormData}
                      control={control}
                      errors={errors}
                      watch={watch}
                      reset={reset}
                      getDefaultValues={getDefaultValues}
                    />
                  </div>
                </QRMenu>

                <div className="flex items-center gap-2">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-5 rounded-full py-2"
                    onClick={navigateBack}
                  >
                    Back
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-full w-max py-2"
                    onClick={handleNextStep}
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
                    setIsCodeStyleBackgroundColor={
                      setIsCodeStyleBackgroundColor
                    }
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
            </>
          )}

          {currentStep === 2 && (
            <SeconStepBtns
              handleBackStep={handleBackStep}
              handleFinishClick={handleFinishClick}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Right — sticky preview sidebar, hidden below xl */}
        <div className="hidden xl:flex w-[25%] !flex-col relative">
          <div className="sticky top-20">
            <PreviewContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppBuilder;
