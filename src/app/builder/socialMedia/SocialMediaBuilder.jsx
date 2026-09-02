import React, { useState, useCallback, useEffect } from "react";

import BuilderLayout from "../../../components/builder/BuilderLayout"; // 👈 Added
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
import ColorPairPicker from "../../../components/ui/ColorPairPicker";
import OfferInfo from "./OfferInfo";
import CouponInfo from "./ContactInfo";
import LeftAccordion from "../../../components/menu/LeftAccordion";
import SocialMediaInfo from "../../../components/builder/SocialMediaInfo";
import ContactInfo from "./ContactInfo";
import LocationInfo from "../../../components/builder/LocationInfo";
import ImageForm from "./ImageForm";
import TemplateSelector from "../vCardPlus/TemplateSelection";
import SeconStepBtns from "../../../components/builder/SeconStepBtns"; // 👈 Added

import socialtemp0 from "../../../assets/templates/social/socialtemp0.webp";
import socialtemp1 from "../../../assets/templates/social/socialtemp1.webp";
import socialtemp2 from "../../../assets/templates/social/socialtemp2.webp";
import socialtemp3 from "../../../assets/templates/social/socialtemp3.webp";
import socialtemp4 from "../../../assets/templates/social/socialtemp4.webp";
import socialtemp5 from "../../../assets/templates/social/socialtemp5.webp";
import socialtemp6 from "../../../assets/templates/social/socialtemp6.webp";
import socialtemp7 from "../../../assets/templates/social/socialtemp7.webp";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createQRCode, updateQRCode } from "../../../redux/features/qrcodes";
import { socialMediaBuilderFormSchema } from "../../../constants/validationSchema";
import { useGetSingleQRCode } from "../../../hooks/useGetSingleQRCode";

const templates = [
  {
    id: 0,
    name: "Default",
    src: socialtemp0,
  },
  {
    id: 1,
    name: "Template 1",
    src: socialtemp1,
  },
  {
    id: 2,
    name: "Template 2",
    src: socialtemp2,
  },
  {
    id: 3,
    name: "Template 3",
    src: socialtemp3,
  },
  {
    id: 4,
    name: "Template 4",
    src: socialtemp4,
  },
  {
    id: 5,
    name: "Template 5",
    src: socialtemp5,
  },
  {
    id: 6,
    name: "Template 6",
    src: socialtemp6,
  },
  {
    id: 7,
    name: "Template 7",
    src: socialtemp7,
  },
];

const SocialMediaBuilder = ({ currentFormData, setCurrentFormData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      title: "",
      ...currentFormData,
    },
    resolver: yupResolver(socialMediaBuilderFormSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
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
    const eventContent = qrData?.socialMediaContent || {};

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
      bannerColor: eventContent?.bannerColor || [],
      // bannerImgUrl: eventContent?.bannerImgUrl || "",
      description: eventContent?.description || "",
      email: eventContent?.email || "",
      imageUrl: eventContent?.imageUrl || "",
      bannerUrl: eventContent?.bannerImgUrl || "",
      image: eventContent?.imageUrl
        ? [
            {
              imageUrl: eventContent?.imageUrl,
              imageFileName: eventContent?.imageUrl?.split("/").pop() || "",
            },
          ]
        : [],
      bannerImg: eventContent?.bannerImgUrl
        ? [
            {
              imageUrl: eventContent?.bannerImgUrl,
              imageFileName: eventContent?.bannerImgUrl?.split("/").pop() || "",
            },
          ]
        : [],

      galleryImages: (eventContent?.galleryImgs || []).map((url) => ({
        imageUrl: url,
        imageFileName: url.split("/").pop() || "",
      })),
      location: eventContent?.location,
      mode: eventContent?.location?.mode,
      city: eventContent?.location?.city,
      country: eventContent?.location?.country,
      latitude: eventContent?.location?.latitude,
      locationUrl: eventContent?.location?.locationUrl,
      longitude: eventContent?.location?.longitude,
      number: eventContent?.location?.number,
      postalCode: eventContent?.location?.postalCode,
      state: eventContent?.location?.state,
      street: eventContent?.location?.street,
      platforms: eventContent?.platforms,
      qrName: eventContent?.qrName,
      selectedTemplate: eventContent?.selectedTemplate,
      telephone: eventContent?.telephone,
      website: eventContent?.website,
      title: eventContent?.title,
    };

    setCurrentFormData(formattedFormData);
    reset(formattedFormData);
    setHasInitialized(true);
  }, [isEditMode, qrData, hasInitialized, reset, setCurrentFormData]);

  console.log(currentFormData);

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
      type: "socialMedia",
      label: currentFormData?.qrName,
    };

    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (key !== "image" && key !== "bannerImg" && key !== "galleryImages") {
        formData.append(
          key,
          typeof payload[key] === "object"
            ? JSON.stringify(payload[key])
            : payload[key],
        );
      }
    });

    if (payload.image?.length > 0) {
      payload.image.forEach((imgObj) => {
        if (imgObj.file) formData.append("image", imgObj.file);
      });
    }

    if (payload.bannerImg?.length > 0) {
      payload.bannerImg.forEach((imgObj) => {
        if (imgObj.file) formData.append("bannerImg", imgObj.file);
      });
    }

    if (payload.galleryImages?.length > 0) {
      payload.galleryImages.forEach((imgObj) => {
        if (imgObj.file) formData.append("galleryImg", imgObj.file);
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
              <LeftAccordion title="Select Template">
                <TemplateSelector
                  templates={templates}
                  selectedTemplateId={currentFormData?.selectedTemplate}
                  onSelect={(templateId) => {
                    handleFormDataUpdate({
                      selectedTemplate: templateId,
                    });
                  }}
                />
              </LeftAccordion>
              <LeftAccordion title="Design">
                <ColorPairPicker
                  pairs={[
                    ["#3B82F6", "#06B6D4", "#06B6DF"],
                    ["#EF4444", "#F59E0B", "#FCD34D"],
                    ["#22C55E", "#84CC16", "#D9F99D"],
                  ]}
                  value={
                    currentFormData?.bannerColor || [
                      "#3B82F6",
                      "#06B6D4",
                      "#06B6DF",
                    ]
                  }
                  onChange={handleColorChange}
                />
              </LeftAccordion>
            </QRMenu>

            <QRMenu
              title="Basic Information"
              desc="All essential information"
              icon={<IoMdInformationCircleOutline size={22} />}
            >
              <div className="w-full">
                <OfferInfo
                  control={control}
                  reset={reset}
                  errors={errors}
                  onChange={handleFormDataUpdate}
                  currentFormData={currentFormData}
                  isEditMode={isEditMode}
                  id={id}
                />
              </div>
            </QRMenu>

            <QRMenu
              title="Content"
              desc="All the details about you QR"
              icon={<IoMdInformationCircleOutline size={22} />}
            >
              <div className="w-full">
                <LeftAccordion title="Social Networks">
                  <SocialMediaInfo
                    onChange={handleFormDataUpdate}
                    value={currentFormData}
                    control={control}
                    errors={errors}
                    setValue={setValue}
                  />
                </LeftAccordion>

                <LeftAccordion title="Contact Info">
                  <ContactInfo
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                  />
                </LeftAccordion>

                <LeftAccordion title="Location">
                  <LocationInfo
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                  />
                </LeftAccordion>

                <LeftAccordion title="Images">
                  <ImageForm
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                    setValue={setValue}
                  />
                </LeftAccordion>
              </div>
            </QRMenu>

            <div className="flex items-center gap-2">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 rounded-full py-2"
                onClick={() => navigate(-1)}
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

export default SocialMediaBuilder;
