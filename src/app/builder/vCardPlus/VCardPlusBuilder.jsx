import React, { useState, useCallback, useEffect } from "react";

import BuilderLayout from "../../../components/builder/BuilderLayout";
import QRMenu from "../../../components/menu/QRMenu";
import { IoMdInformationCircleOutline } from "react-icons/io";
import QRFrames from "../../../components/ui/QRFrames";
import QRShapes from "../../../components/ui/QRShapes";
import QRLogos from "../../../components/ui/QRLogos";
import QRCorrectionLevel from "../../../tools/qr-components/QRCorrectionLevel";
import DemoPreview from "../../../components/ui/DemoPreview";
import PreviewScreen from "./PreviewScreen";
import QRView from "../../../pages/home/qrGenerate/QRView";
import Stepper from "../../../components/ui/Stepper";
import ColorPairPicker from "../../../components/ui/ColorPairPicker";
import LeftAccordion from "../../../components/menu/LeftAccordion";
import AboutInfo from "./AboutInfo";
import ContactInfo from "./ContactInfo";
import LocationInfo from "../../../components/builder/LocationInfo";
import SummaryInfo from "./SummaryInfo";
import CompanyProfessionInfo from "./CompanyInfo";
import FooterInfo from "./FooterInfo";
import SocialMediaInfo from "../../../components/builder/SocialMediaInfo";
import TemplateSelector from "./TemplateSelection";

import vtemplate0 from "../../../assets/templates/vcard/vtemplate0.webp";
import vtemplate1 from "../../../assets/templates/vcard/vtemplate1.webp";
import vtemplate2 from "../../../assets/templates/vcard/vtemplate2.webp";
import vtemplate3 from "../../../assets/templates/vcard/vtemplate3.webp";
import vtemplate4 from "../../../assets/templates/vcard/vtemplate4.webp";
import vtemplate5 from "../../../assets/templates/vcard/vtemplate5.webp";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { createQRCode, updateQRCode } from "../../../redux/features/qrcodes";
import { yupResolver } from "@hookform/resolvers/yup";
import { vcardPlusBuilderFormSchema } from "../../../constants/validationSchema";
import { useGetSingleQRCode } from "../../../hooks/useGetSingleQRCode";

const templates = [
  { id: 0, name: "Default", src: vtemplate0 },
  { id: 1, name: "Template 1", src: vtemplate1 },
  { id: 2, name: "Template 2", src: vtemplate2 },
  { id: 3, name: "Template 3", src: vtemplate3 },
  { id: 4, name: "Template 4", src: vtemplate4 },
  { id: 5, name: "Template 5", src: vtemplate5 },
];

const VCardPlusBuilder = ({ currentFormData, setCurrentFormData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { token } = useSelector((state) => state.auth);


  const { id } = useParams();
  const isEditMode = !!id;
  const [hasInitialized, setHasInitialized] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [qrCustomization, setQrCustomization] = useState({});
  const [selectedType, setSelectedTye] = useState("product");
  const [isLoading, setIsLoading] = useState(false);

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
    defaultValues: currentFormData || {},
    resolver: yupResolver(vcardPlusBuilderFormSchema),
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

  // Add this useEffect for create mode default
  useEffect(() => {
    if (!isEditMode) {
      setCurrentFormData((prev) => ({
        ...prev,
        selectedTemplate:
          prev?.selectedTemplate !== undefined ? prev.selectedTemplate : 0,
      }));
    }
  }, [isEditMode]);

  useEffect(() => {
    if (!isEditMode || !qrData) return;

    const styling = qrData?.qrStyling || {};
    const productContent = qrData?.vCardContent || {};

    // ---- QR styling ----
    setSelectedTye(qrData?.type || "product");
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
      qrName: productContent?.qrName || qrData?.label || "",
      companies: productContent?.companies || "",
      footerText: productContent?.footerText || "",
      emails: productContent?.emails || "",
      bannerColor: productContent?.bannerColor || "#F97316",
      imageUrl: productContent?.imageUrl || "",
      location: productContent?.location || "",

      city: productContent?.location?.city || "",
      country: productContent?.location?.country || "",
      latitude: productContent?.location?.latitude || "",
      locationUrl: productContent?.location?.locationUrl || "",
      longitude: productContent?.location?.longitude || "",
      mode: productContent?.location?.mode || "",
      number: productContent?.location?.number || "",
      postalCode: productContent?.location?.postalCode || "",
      state: productContent?.location?.state || "",
      street: productContent?.location?.street || "",

      // profileImg: productContent?.imageUrl
      //   ? [
      //       {
      //         imgUrl: productContent?.imageUrl,
      //         imageFileName: productContent?.imageUrl,
      //       },
      //     ]
      //   : [],

      profileImg: productContent?.imageUrl
        ? [
            {
              imageUrl: productContent.imageUrl,
              imageFileName: productContent.imageUrl || "",
            },
          ]
        : [],

      name: productContent?.name || "",
      phones: productContent?.phones || "",
      platforms: productContent?.platforms || "",
      selectedOption: productContent?.selectedOption || "",
      selectedTemplate: productContent?.selectedTemplate ?? 0, // was: || ""
      summary: productContent?.summary,
      surname: productContent?.surname,
      title: productContent?.title,
      websites: productContent?.websites,
    };

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

  const navigateBack = () => navigate(-1);

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
    if (!token) {
      navigate("/login");
      return;
    }

    const payload = {
      ...currentFormData,
      qrStyling: qrCustomization,
      type: "vCardPlus",
      label: currentFormData?.qrName,
    };

    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (key !== "profileImg") {
        formData.append(
          key,
          typeof payload[key] === "object"
            ? JSON.stringify(payload[key])
            : payload[key],
        );
      }
    });

    if (payload.profileImg?.length > 0) {
      payload.profileImg.forEach((imgObj) => {
        if (imgObj.file) formData.append("image", imgObj.file);
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
        createQRCode(
          formData,
          () => {},
          (success) => {
            if (success) navigate("/my-qr-codes");
          },
        ),
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
          currentFormData={currentFormData}
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
                  onSelect={(templateId) =>
                    handleFormDataUpdate({ selectedTemplate: templateId })
                  }
                />
              </LeftAccordion>

              <LeftAccordion title="Design">
                <ColorPairPicker
                  pairs={[
                    ["#3B82F6", "#06B6D4"],
                    ["#EF4444", "#F59E0B"],
                    ["#22C55E", "#84CC16"],
                  ]}
                  value={currentFormData?.bannerColor || ["#3B82F6", "#06B6D4"]}
                  onChange={handleColorChange}
                />
              </LeftAccordion>
            </QRMenu>

            <QRMenu
              title="Basic Information"
              desc="Add essential information"
              icon={<IoMdInformationCircleOutline size={22} />}
            >
              <div className="w-full">
                <LeftAccordion title="About You">
                  <AboutInfo
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                    isEditMode={isEditMode}
                    id={id}
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

                <LeftAccordion title="Location Info">
                  <LocationInfo
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                  />
                </LeftAccordion>

                <LeftAccordion title="Summary">
                  <SummaryInfo
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                  />
                </LeftAccordion>
              </div>
            </QRMenu>

            <QRMenu
              title="Content"
              desc="All the details about your QR"
              icon={<IoMdInformationCircleOutline size={22} />}
            >
              <div className="w-full">
                <LeftAccordion title="Companies">
                  <CompanyProfessionInfo
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                  />
                </LeftAccordion>

                <LeftAccordion title="Footer Info">
                  <FooterInfo
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                  />
                </LeftAccordion>

                <LeftAccordion title="Social Networks">
                  <SocialMediaInfo
                    control={control}
                    errors={errors}
                    onChange={handleFormDataUpdate}
                    value={currentFormData}
                    setValue={setValue}
                  />
                </LeftAccordion>
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

            <div className="flex gap-2 mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 rounded-full py-2"
                onClick={handleBackStep}
              >
                Back
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-5 rounded-full py-2"
                onClick={handleFinishClick}
              >
                Finish
              </button>
            </div>
          </>
        )}
      </BuilderLayout>
    </>
  );
};

export default VCardPlusBuilder;
