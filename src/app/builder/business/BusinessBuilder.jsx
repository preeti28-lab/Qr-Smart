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
import CouponInfo from "./CouponInfo";
import LeftAccordion from "../../../components/menu/LeftAccordion";
import TemplateSelector from "../vCardPlus/TemplateSelection";
import BusinessInfo from "./BusinessInfo";
import OpeningHours from "../../../components/builder/OpeningHours";
import LocationInfo from "../../../components/builder/LocationInfo";
import Facilities from "../event/Facilities";
import SummaryInfo from "./Summary";
import ContactInfo from "./ContactInfo";
import SocialMediaInfo from "../../../components/builder/SocialMediaInfo";

import businesstemp0 from "../../../assets/templates/business/businesstemp0.webp";
import businesstemp1 from "../../../assets/templates/business/businesstemp1.webp";
import businesstemp2 from "../../../assets/templates/business/businesstemp2.webp";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { businessBuilderFormSchema } from "../../../constants/validationSchema";
import {
  createQRCode,
  getThePDFPrevImage,
  updateQRCode,
} from "../../../redux/features/qrcodes";
import { useGetSingleQRCode } from "../../../hooks/useGetSingleQRCode";
import SeconStepBtns from "../../../components/builder/SeconStepBtns";

const templates = [
  {
    id: 0,
    name: "Default",
    src: businesstemp0,
  },
  {
    id: 1,
    name: "Template 1",
    src: businesstemp1,
  },
  {
    id: 2,
    name: "Template 2",
    src: businesstemp2,
  },
];

const BusinessBuilder = ({ currentFormData, setCurrentFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(currentFormData);

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

  const stepHeading = {
    1: "Complete the content of the QR",
    2: "Design the QR",
  };

  const maxStep = 3;

  const methods = useForm({
    defaultValues: {
      title: "",
      phones: [{ title: "", number: "" }],
      emails: [{ emailLabel: "", email: "" }],
      ...currentFormData, // 👈 Fixed: removed nested defaultValues
    },
    resolver: yupResolver(businessBuilderFormSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!isEditMode || !qrData) return;

    const styling = qrData?.qrStyling || {};
    const eventContent = qrData?.businessContent || {};

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
      // basic info
      title: eventContent?.title || "",
      subtitle: eventContent?.subtitle || "",
      qrName: eventContent?.qrName || "",
      name: eventContent?.name || "",
      company: eventContent?.company || "",
      description: eventContent?.description || "",
      summary: eventContent?.summary || "",

      // web / CTA
      website: eventContent?.website || "",
      buttonText: eventContent?.buttonText || "",
      buttonLink: eventContent?.buttonLink || "",

      // styling / misc
      bannerColor: eventContent?.bannerColor || [],
      selectedTemplate: eventContent?.selectedTemplate ?? null,

      // address
      street: eventContent?.street || "",
      number: eventContent?.number || "",
      postalCode: eventContent?.postalCode || "",
      city: eventContent?.city || "",
      state: eventContent?.state || "",
      country: eventContent?.country || "",

      // mode & settings
      mode: eventContent?.mode || "url",
      timeFormat: eventContent?.timeFormat || "24",

      // contact
      phones: eventContent?.phones || [],
      emails: eventContent?.emails || [],

      // social platforms
      platforms: eventContent?.platforms || {
        twitter: { url: "", text: "" },
        instagram: { url: "", text: "" },
      },

      // facilities
      facilities: eventContent?.facilities || [],

      // opening hours
      openingHours: eventContent?.openingHours || [],

      // media
      imageUrl: eventContent?.imageUrl || "",
      imageFileName: eventContent?.imageFileName || "",
      image: [],
    };

    setCurrentFormData(formattedFormData);
    reset(formattedFormData);
    setHasInitialized(true);
  }, [isEditMode, qrData, hasInitialized, reset, setCurrentFormData]);

  useEffect(() => {
    if (!isEditMode || !qrData?.businessContent?.imageUrl) {
      setImageSrc("");
      return;
    }

    const imageName = qrData.businessContent.imageUrl.split("/").pop();
    let objectUrl = "";

    dispatch(
      getThePDFPrevImage(imageName, (err, blob) => {
        if (err || !blob) {
          setImageSrc("");
          return;
        }

        objectUrl = URL.createObjectURL(blob);
        setImageSrc(objectUrl);
      }),
    );

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [dispatch, isEditMode, qrData]);

  // ---- Form and color updates ----
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
    // 👈 Removed data param
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
      type: "business",
      label: currentFormData?.qrName,
    };

    console.log(payload);

    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (key !== "image") {
        formData.append(
          key,
          typeof payload[key] === "object"
            ? JSON.stringify(payload[key])
            : payload[key],
        );
      }
    });

    if (payload.image && payload.image.length > 0) {
      payload.image.forEach((imgObj) => {
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
        createQRCode(formData, setIsLoading, (success) => {
          if (success) {
            navigate("/my-qr-codes");
          }
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
                    ["#0D4F43", "#ffffff"],
                    ["#28EDC9", "#03A183"],
                    ["#28ED28", "#00A301"],
                    ["#EDE728", "#A39E0A"],
                    ["#ED4C28", "#A31F01"],
                    ["#3D656B", "#FD6F70"],
                    ["#6D21B1", "#C743D2"],
                    ["#093A32", "#FFA103"],
                    ["#E8F86C", "#1D59F9"],
                    ["#8A9928", "#FDBCCB"],
                    ["#171CAB", "#759DFE"],
                    ["#FF9100", "#FFBC64"],
                    ["#D7BCE1", "#7B5788"],
                    ["#FDC400", "#DA5F97"],
                    ["#EC7D43", "#A24545"],
                  ]}
                  value={currentFormData?.bannerColor || ["#0D4F43", "#ffffff"]}
                  onChange={handleColorChange}
                />
              </LeftAccordion>
            </QRMenu>

            <QRMenu
              title="Basic Information"
              desc="All essential information"
              icon={<IoMdInformationCircleOutline size={22} />}
            >
              <LeftAccordion title="Business Information">
                <BusinessInfo
                  onChange={handleFormDataUpdate}
                  currentFormData={currentFormData}
                  control={control}
                  errors={errors}
                />
              </LeftAccordion>
              <LeftAccordion title="Opening Hours">
                <OpeningHours
                  onChange={handleFormDataUpdate}
                  currentFormData={currentFormData}
                  control={control}
                  errors={errors}
                  setValue={setValue}
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
              <LeftAccordion title="Facilities">
                <Controller
                  name="facilities"
                  control={control}
                  render={({ field }) => (
                    <Facilities
                      value={field.value || []}
                      onChange={(data) => field.onChange(data.facilities)}
                    />
                  )}
                />
              </LeftAccordion>
            </QRMenu>

            <QRMenu
              title="Content"
              desc="All the details about your QR"
              icon={<IoMdInformationCircleOutline size={22} />}
            >
              <LeftAccordion title="About your company">
                <SummaryInfo
                  control={control}
                  errors={errors}
                  onChange={handleFormDataUpdate}
                  value={currentFormData}
                />
              </LeftAccordion>
              <LeftAccordion title="Contact Information">
                <ContactInfo
                  onChange={handleFormDataUpdate}
                  value={currentFormData}
                  control={control}
                  errors={errors}
                  reset={reset}
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

export default BusinessBuilder;
