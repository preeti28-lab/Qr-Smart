import React, { useState, useCallback, useEffect } from "react";

import BuilderLayout from "../../../components/builder/BuilderLayout";
import QRMenu from "../../../components/menu/QRMenu";
import { IoMdInformationCircleOutline } from "react-icons/io";
import ColorPairPicker from "../../../components/ui/ColorPairPicker";
import QRFrames from "../../../components/ui/QRFrames";
import QRShapes from "../../../components/ui/QRShapes";
import QRLogos from "../../../components/ui/QRLogos";
import QRCorrectionLevel from "../../../tools/qr-components/QRCorrectionLevel";
import DemoPreview from "../../../components/ui/DemoPreview";
import PreviewScreen from "./PreviewScreen";
import QRView from "../../../pages/home/qrGenerate/QRView";
import Stepper from "../../../components/ui/Stepper";
import TemplateSelector from "../vCardPlus/TemplateSelection";
import OfferInfo from "./OfferInfo";

import pdfTemplate0 from "../../../assets/templates/pdf/pdfTemplate0.webp";
import pdfTemplate1 from "../../../assets/templates/pdf/pdfTemplate1.webp";
import pdfTemplate2 from "../../../assets/templates/pdf/pdfTemplate2.webp";
import pdfTemplate3 from "../../../assets/templates/pdf/pdfTemplate3.webp";
import pdfTemplate4 from "../../../assets/templates/pdf/pdfTemplate4.webp";

import { useDispatch } from "react-redux";
import {
  createQRCode,
  getThePDFPrevImage,
  updateQRCode,
} from "../../../redux/features/qrcodes";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pdfBuilderFormSchema } from "../../../constants/validationSchema";
import SeconStepBtns from "../../../components/builder/SeconStepBtns";
import { useGetSingleQRCode } from "../../../hooks/useGetSingleQRCode";

const templates = [
  { id: 0, name: "Default", src: pdfTemplate0 },
  { id: 1, name: "Template 1", src: pdfTemplate1 },
  { id: 2, name: "Template 2", src: pdfTemplate2 },
  { id: 3, name: "Template 3", src: pdfTemplate3 },
  { id: 4, name: "Template 4", src: pdfTemplate4 },
];

const normalizeExistingPdf = (item) => ({
  ...item,
  isExisting: true,
  pdfFileUrl: item?.pdfFileUrl || null,
  pdfFileName: item?.pdfFileName || null,
  imageUrl: item?.imageUrl || null,
  image: item?.imageUrl
    ? [
        {
          imageUrl: item.imageUrl,
          isExisting: true,
        },
      ]
    : item?.image || [],
});

const PdfBuilder = ({ currentFormData, setCurrentFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(currentFormData)

  const { id } = useParams();
  const isEditMode = !!id;

  const [currentStep, setCurrentStep] = useState(1);
  const [qrCustomization, setQrCustomization] = useState({});
  const [selectedType, setSelectedTye] = useState("pdf");
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

  const { qrData } = useGetSingleQRCode(id, isEditMode);

  const methods = useForm({
    defaultValues: {
      pdf: [],
      pdfs: [],
      ...currentFormData,
    },
    resolver: isEditMode ? undefined : yupResolver(pdfBuilderFormSchema),
    context: { selectedTemplate: currentFormData?.selectedTemplate },
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

    const pdfContent = qrData?.pdfContent || {};

    const formattedFormData = {
      qrName: pdfContent?.qrName || qrData?.label || "",
      company: pdfContent?.company || "",
      pdfTitle: pdfContent?.pdfTitle || "",
      description: pdfContent?.description || "",
      website: pdfContent?.website || "",
      pdfBannerUrl: pdfContent?.pdfBannerUrl || "",
      selectedTemplate: pdfContent?.selectedTemplate ?? 0,
      bannerColor:
        Array.isArray(pdfContent?.bannerColor) &&
        pdfContent.bannerColor.length === 2
          ? pdfContent.bannerColor
          : ["#8E1B13", "#8E1B13"],
      pdf: [],
      pdfs: (pdfContent?.pdfs || []).map(normalizeExistingPdf),
    };

    setCurrentFormData(formattedFormData);
    reset(formattedFormData);
  }, [isEditMode, qrData, reset, setCurrentFormData]);

  const handleFormDataUpdate = useCallback(
    (data) => {
      setCurrentFormData((prev) => ({
        ...prev,
        ...data,
        selectedTemplate:
          data.selectedTemplate !== undefined
            ? data.selectedTemplate
            : prev?.selectedTemplate, // keeps your selection
        pdfs: data.pdfs !== undefined ? data.pdfs : prev?.pdfs,
      }));
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

  const getSafeImageType = (type = "", fileName = "") => {
    if (type?.startsWith("image/")) return type;

    const lower = fileName.toLowerCase();
    if (lower.endsWith(".png")) return "image/png";
    if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
    if (lower.endsWith(".webp")) return "image/webp";
    if (lower.endsWith(".gif")) return "image/gif";

    return "image/png";
  };

  const getPdfPreviewFileFromServer = (imageUrl, index) => {
    return new Promise((resolve, reject) => {
      if (!imageUrl) {
        resolve(null);
        return;
      }

      const imageName =
        imageUrl.split("/").pop() || `pdf-preview-${index + 1}.png`;

      dispatch(
        getThePDFPrevImage(imageName, (error, blob) => {
          if (error || !blob) {
            reject(error || new Error("Failed to fetch PDF preview image"));
            return;
          }

          const safeType = getSafeImageType(blob?.type, imageName);
          const normalizedBlob = new Blob([blob], { type: safeType });

          const file = new File([normalizedBlob], imageName, {
            type: safeType,
          });

          resolve(file);
        }),
      );
    });
  };

  const resolvePdfImageFile = async (item, index) => {
    const uploadedImageFile = item?.image?.[0]?.file;
    const existingImageUrl = item?.imageUrl || item?.image?.[0]?.imageUrl;

    if (uploadedImageFile instanceof File) {
      return uploadedImageFile;
    }

    if (existingImageUrl) {
      return await getPdfPreviewFileFromServer(existingImageUrl, index);
    }

    return null;
  };

  const handleFinishClick = async () => {
    try {
      const payload = {
        ...currentFormData,
        qrStyling: qrCustomization,
        type: "pdf",
        label: currentFormData?.qrName,
      };

      const formData = new FormData();

      Object.keys(payload).forEach((key) => {
        if (key !== "pdfs" && key !== "pdf" && key !== "pdfBanner") {
          formData.append(
            key,
            typeof payload[key] === "object"
              ? JSON.stringify(payload[key])
              : payload[key],
          );
        }
      });

      const pdfsMetaData = (payload.pdfs || []).map((item) => ({
        name: item.name || "",
        description: item.description || "",
        pdfFileUrl: item.isExisting ? item.pdfFileUrl : undefined,
        pdfFileName: item.isExisting ? item.pdfFileName : undefined,
      }));

      formData.append("pdfsMetaData", JSON.stringify(pdfsMetaData));

      (payload.pdfs || []).forEach((item) => {
        if (item?.file instanceof File) {
          formData.append("pdfFiles", item.file, item.file.name);
        }
      });

      for (let i = 0; i < (payload.pdfs || []).length; i++) {
        const imageFile = await resolvePdfImageFile(payload.pdfs[i], i);
        if (imageFile instanceof File) {
          formData.append("pdfImages", imageFile, imageFile.name);
        }
      }

      if (payload.pdfBanner?.length > 0) {
        const banner = payload.pdfBanner[0];
        if (banner?.file instanceof File) {
          formData.append("pdfBanner", banner.file, banner.file.name);
        }
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
    } catch (error) {
      console.error("Error while preparing form data:", error);
    }
  };

  const preview = (
    <>
      {currentStep === 1 && (
        <DemoPreview height={600}>
          <PreviewScreen
            currentFormData={currentFormData}
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
              <TemplateSelector
                templates={templates}
                selectedTemplateId={currentFormData?.selectedTemplate}
                onSelect={(templateId) =>
                  handleFormDataUpdate({ selectedTemplate: templateId })
                }
              />
              <p>Colour Palette</p>
              <ColorPairPicker
                pairs={[
                  ["#8E1B13", "#8E1B13"],
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
                value={currentFormData?.bannerColor || ["#8E1B13", "#8E1B13"]}
                onChange={handleColorChange}
              />
            </QRMenu>

            <QRMenu
              title="Offer Information"
              desc="All the details about your offer"
              icon={<IoMdInformationCircleOutline size={22} />}
            >
              <div className="w-full">
                <OfferInfo
                  control={control}
                  errors={errors}
                  onChange={handleFormDataUpdate}
                  currentFormData={currentFormData}
                />
              </div>
            </QRMenu>

            <div className="flex gap-2 items-center">
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

export default PdfBuilder;
