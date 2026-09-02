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
import { Controller, useForm } from "react-hook-form";
import VideoUpload from "./VideoUpload";
import VideoInfo from "./VideoInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { videoBuilderSchema } from "../../../constants/validationSchema";
import { createQRCode, updateQRCode } from "../../../redux/features/qrcodes";
import { useDispatch } from "react-redux";
import SeconStepBtns from "../../../components/builder/SeconStepBtns";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleQRCode } from "../../../hooks/useGetSingleQRCode";

const VideoBuilder = ({ currentFormData, setCurrentFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const { qrData, isLoading: isLoadingQR } = useGetSingleQRCode(id, isEditMode);

  const methods = useForm({
    defaultValues: {
      showVideoDirectly: currentFormData?.showVideoDirectly || false,
      highlightFirstVideo: currentFormData?.highlightFirstVideo || false,
      autoplayFirstVideo: currentFormData?.autoplayFirstVideo || false,
      videoUrlInput: "",
    },
    resolver: yupResolver(videoBuilderSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const stepHeading = {
    1: "Complete the content of the QR",
    2: "Design the QR",
  };

  const maxStep = 3;

  useEffect(() => {
    if (!isEditMode || !qrData) return;

    const styling = qrData?.qrStyling || {};
    const videoContent = qrData?.videoContent || {};
    const videosFromServer = videoContent?.videos || [];

    setSelectedTye(qrData?.type || "video");
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

    // Split server videos into YouTube list + uploaded list
    const youtubeVideos = videosFromServer
      .filter((v) => v.type === "youtube")
      .map((v) => ({
        id: v.youtubeId,
        url: v.youtubeUrl,
        description: v.description || "",
      }));

    const uploadedVideos = videosFromServer
      .filter((v) => v.type === "upload")
      .map((v) => ({
        file: null, // no File object — already on server
        fileName: v.videoFileName,
        blobURL: v.videoUrl, // reuse server URL as identifier
        serverUrl: v.videoUrl,
        isExisting: true,
        description: v.description || "",
      }));

    const formattedFormData = {
      company: videoContent?.company ?? "",
      videoTitle: videoContent?.videoTitle ?? "",
      description: videoContent?.description ?? "",
      bannerColor: videoContent?.bannerColor ?? "#F97316",
      buttonText: videoContent?.buttonText ?? "",
      buttonLink: videoContent?.buttonLink ?? "",
      showVideoDirectly: videoContent?.showVideoDirectly ?? false,
      highlightFirstVideo: videoContent?.highlightFirstVideo ?? false,
      autoplayFirstVideo: videoContent?.autoplayFirstVideo ?? false,
      qrName: qrData?.label || "",
      videoUrlInput: "",
      video: uploadedVideos, // uploaded videos → video field
      videoList: youtubeVideos, // youtube list → passed to VideoUpload
    };

    // Dynamic description fields
    youtubeVideos.forEach((v) => {
      formattedFormData[`youtubeVideoDescription_${v.id}`] = v.description;
    });
    uploadedVideos.forEach((v, index) => {
      formattedFormData[`uploadedVideoDescription_${index}`] = v.description;
    });

    setCurrentFormData(formattedFormData);
    reset(formattedFormData);
    setHasInitialized(true);
  }, [isEditMode, qrData, reset, setCurrentFormData]);

  // ---- Form and color updates ----
  const handleFormDataUpdate = useCallback(
    (data) => {
      setCurrentFormData((prev) => ({ ...prev, ...data }));
    },
    [setCurrentFormData],
  );

  const handleColorChange = useCallback(
    (color) => {
      setCurrentFormData((prev) => ({ ...prev, bannerColor: color }));
    },
    [setCurrentFormData],
  );

  // ---- Step navigation ----
  const handleNextStep = handleSubmit(() => {
    setCurrentStep((prev) => Math.min(prev + 1, maxStep));
  });

  const handleBackStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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
      type: "video",
      label: currentFormData?.qrName,
    };

    const formData = new FormData();

    formData.append("type", payload.type);
    formData.append("label", payload.label);
    formData.append("bannerColor", payload.bannerColor);
    formData.append("company", payload.company);
    formData.append("videoTitle", payload.videoTitle);
    formData.append("description", payload.description);
    formData.append("buttonText", payload.buttonText);
    formData.append("buttonLink", payload.buttonLink);
    formData.append("showVideoDirectly", payload.showVideoDirectly);
    formData.append("highlightFirstVideo", payload.highlightFirstVideo);
    formData.append("autoplayFirstVideo", payload.autoplayFirstVideo);
    formData.append("qrStyling", JSON.stringify(payload.qrStyling));

    payload.videos.forEach((video, index) => {
      formData.append(`videos[${index}][type]`, video.type);
      formData.append(`videos[${index}][id]`, video.id);
      formData.append(`videos[${index}][url]`, video.url);
      formData.append(`videos[${index}][description]`, video.description);
      if (video.type === "upload" && video.file) {
        formData.append(`videos[${index}][file]`, video.file, video.fileName);
      }
    });

    if (isEditMode) {
      dispatch(
        updateQRCode(id, formData, setIsLoading, (success) => {
          if (success) navigate("/my-qr-codes");
        }),
      );
    } else {
      dispatch(
        createQRCode(formData, setIsLoading, (success) => {
          if (success) navigate("/my-qr-codes");
        }),
      );
    }
  };

  // ---- Preview node passed to BuilderLayout ----
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

      {/* ✅ BuilderLayout handles all responsive logic */}
      <BuilderLayout preview={preview} previewTitle="Preview">
        {currentStep === 1 && (
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
              <ColorPicker onChange={handleColorChange} />
            </QRMenu>

            <QRMenu
              title="Basic Information"
              desc="Add essential information"
              icon={<IoMdInformationCircleOutline size={22} />}
            >
              <div className="w-full">
                <VideoUpload
                  onChange={handleFormDataUpdate}
                  currentFormData={currentFormData}
                  control={control}
                  errors={errors}
                  setValue={methods.setValue} // ← add this
                />
              </div>
            </QRMenu>

            <QRMenu
              title="Content"
              desc="All the details about your QR"
              icon={<IoMdInformationCircleOutline size={22} />}
            >
              <div className="w-full">
                <VideoInfo
                  onChange={handleFormDataUpdate}
                  currentFormData={currentFormData}
                  control={control}
                  errors={errors}
                />
              </div>
            </QRMenu>

            <div className="flex gap-2">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 rounded-full py-2"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-full w-max py-2 "
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
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

export default VideoBuilder;
