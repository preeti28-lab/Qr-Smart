import React, { useState, useCallback, useEffect, useRef } from "react";
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
import TemplateSelector from "../vCardPlus/TemplateSelection";
import SocialMediaInfo from "../../../components/builder/SocialMediaInfo";
import LinkListInfo from "./BusinessInfo";
import LinkSeparatorManager from "./LinksManager";
import ImageContent from "./ImageGrid";
import SeconStepBtns from "../../../components/builder/SeconStepBtns";

import list0 from "../../../assets/templates/list/list0.webp";
import list1 from "../../../assets/templates/list/list1.webp";
import list2 from "../../../assets/templates/list/list2.webp";
import list3 from "../../../assets/templates/list/list3.webp";
import list4 from "../../../assets/templates/list/list4.webp";
import list5 from "../../../assets/templates/list/list5.webp";
import list6 from "../../../assets/templates/list/list6.webp";
import list7 from "../../../assets/templates/list/list7.webp";
import list8 from "../../../assets/templates/list/list8.webp";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createQRCode, updateQRCode } from "../../../redux/features/qrcodes";
import { listOfLinksBuilderFormSchema } from "../../../constants/validationSchema";
import { useGetSingleQRCode } from "../../../hooks/useGetSingleQRCode";

const templates = [
  { id: 0, name: "Default", src: list0 },
  { id: 1, name: "Template 1", src: list1 },
  { id: 2, name: "Template 2", src: list2 },
  { id: 3, name: "Template 3", src: list3 },
  { id: 4, name: "Template 4", src: list4 },
  { id: 5, name: "Template 5", src: list5 },
  { id: 6, name: "Template 6", src: list6 },
  { id: 7, name: "Template 7", src: list7 },
  { id: 8, name: "Template 8", src: list8 },
];

// ✅ Debounce hook — input updates local state instantly,
// but propagates to parent only after user stops typing (400ms).
const useDebounce = (value, delay = 400) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

const ListOfLinksBuilder = ({ currentFormData, setCurrentFormData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const isEditMode = !!id;
  const hasInitializedRef = useRef(false);

  const stepHeading = {
    1: "Complete the content of the QR",
    2: "Design the QR",
  };

  const maxStep = 3;

  const [currentStep, setCurrentStep] = useState(1);
  const [qrCustomization, setQrCustomization] = useState({});
  const [selectedType, setSelectedTye] = useState("event");
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

  // ✅ Local state for qrName input — controlled locally, debounced to parent.
  // This means typing does NOT trigger setCurrentFormData on every keystroke,
  // so PreviewScreen does not re-render (and re-fetch images) while user types.
  const [qrNameLocal, setQrNameLocal] = useState(currentFormData?.qrName || "");
  const debouncedQrName = useDebounce(qrNameLocal, 400);

  // ✅ Skip first effect run to avoid overwriting initialized data
  const isFirstQrNameSync = useRef(true);
  useEffect(() => {
    if (isFirstQrNameSync.current) {
      isFirstQrNameSync.current = false;
      return;
    }
    setCurrentFormData((prev) => ({ ...prev, qrName: debouncedQrName }));
  }, [debouncedQrName, setCurrentFormData]);

  const { qrData } = useGetSingleQRCode(id, isEditMode);

  const methods = useForm({
    defaultValues: {
      qrName: "",
      title: "",
      description: "",
      bannerColor: ["#ED7646", "#ffffff", "#220E27"],
      selectedGridIndex: 0,
      selectedTemplate: 1,
      platforms: {},
      logoUrl: "",
      logoFileName: "",
      bannerImgUrl: "",
      bannerImgFileName: "",
      gallery: [],
      links: [],
      items: [],
      image: [],
      ...currentFormData,
    },
    resolver: yupResolver(listOfLinksBuilderFormSchema),
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!isEditMode || !qrData || hasInitializedRef.current) return;

    const styling = qrData?.qrStyling || {};
    const eventContent = qrData?.listOfLinksContent || {};

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

    const backendLinks = eventContent?.links || [];

    const formattedFormData = {
      qrName: eventContent?.qrName || "",
      title: eventContent?.title || "",
      description: eventContent?.description || "",
      bannerColor: eventContent?.bannerColor || [
        "#ED7646",
        "#ffffff",
        "#220E27",
      ],
      selectedGridIndex: eventContent?.selectedGridIndex ?? 0,
      selectedTemplate: eventContent?.selectedTemplate ?? 1,
      platforms: eventContent?.platforms || {},
      logoUrl: eventContent?.logoUrl || "",
      logoFileName: eventContent?.logoFileName || "",
      logo: eventContent?.logoUrl
        ? [
            {
              imageUrl: eventContent?.logoUrl,
              imageFileName: eventContent?.logoFileName,
            },
          ]
        : [],
      bannerImg: eventContent?.bannerImgUrl
        ? [
            {
              imageUrl: eventContent?.bannerImgUrl,
              imageFileName: eventContent?.bannerImgFileName,
            },
          ]
        : [],
      bannerImgUrl: eventContent?.bannerImgUrl || "",
      bannerImgFileName: eventContent?.bannerImgFileName || "",
      image: eventContent?.gallery || [],
      links: backendLinks,
      items: backendLinks.map((link) => ({
        type: link.type || "link",
        text: link.text || "",
        url: link.url || "",
        image: link.imageUrl
          ? [
              {
                imageUrl: link.imageUrl,
                imageFileName: link.imageFileName,
                isExisting: true,
              },
            ]
          : [],
      })),
      // image: [],
    };

    // ✅ Sync local qrName input when edit data loads, and reset the debounce skip flag
    setQrNameLocal(formattedFormData.qrName);
    isFirstQrNameSync.current = true;

    setCurrentFormData(formattedFormData);
    reset(formattedFormData);
    hasInitializedRef.current = true;
  }, [isEditMode, qrData, reset, setCurrentFormData]);

  const handleFormDataUpdate = useCallback(
    (data) => {
      setCurrentFormData((prev) => {
        // ✅ Only recompute links from items when items is explicitly passed
        if (!("items" in data)) {
          const newImages = data?.image || [];
          const formattedNewGalleryImages = newImages.map((img) => ({
            imageUrl: img.preview,
            imageFileName: img.file?.name || "",
          }));

          return {
            ...prev,
            ...data,
            links: prev?.links || [],
            ...(newImages.length > 0 && {
              gallery: [...(prev?.gallery || []), ...formattedNewGalleryImages],
            }),
          };
        }

        const items = data?.items || [];
        const links = items.map((item) => ({
          type: item.type,
          text: item.text || "",
          url: item.url || "",
          imageUrl: item.image?.[0]?.imageUrl || "",
          imageFileName: item.image?.[0]?.imageFileName || "",
          image: item.image || [],
        }));

        const newImages = data?.image || [];
        const formattedNewGalleryImages = newImages.map((img) => ({
          imageUrl: img.preview,
          imageFileName: img.file?.name || "",
        }));

        return {
          ...prev,
          ...data,
          links,
          ...(newImages.length > 0 && {
            gallery: [...(prev?.gallery || []), ...formattedNewGalleryImages],
          }),
        };
      });
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
    // ✅ Flush latest local qrName before submitting (bypasses the 400ms debounce)
    const finalFormData = {
      ...currentFormData,
      qrName: qrNameLocal,
    };

    const payload = {
      ...finalFormData,
      qrStyling: qrCustomization,
      type: "listOfLinks",
      label: finalFormData?.qrName,
    };

    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
      if (
        key !== "logo" &&
        key !== "bannerImg" &&
        key !== "image" &&
        key !== "links"
      ) {
        formData.append(
          key,
          typeof payload[key] === "object"
            ? JSON.stringify(payload[key])
            : payload[key],
        );
      }
    });

    if (payload.logo?.length > 0) {
      payload.logo.forEach((imgObj) => {
        if (imgObj.file) formData.append("logo", imgObj.file);
      });
    }

    if (payload.bannerImg?.length > 0) {
      payload.bannerImg.forEach((imgObj) => {
        if (imgObj.file) formData.append("bannerImg", imgObj.file);
      });
    }

    if (payload.image?.length > 0) {
      payload.image.forEach((imgObj) => {
        if (imgObj.file) formData.append("galleryImg", imgObj.file);
      });
    }

    payload?.links?.forEach((link, linkIndex) => {
      formData.append(`links[${linkIndex}][type]`, link.type);
      if (link.text) {
        formData.append(`links[${linkIndex}][text]`, link.text);
      }
      if (link.url) {
        formData.append(`links[${linkIndex}][url]`, link.url);
      }
      if (link.type === "link" && link.image?.length > 0) {
        link.image.forEach((imgObj, imgIndex) => {
          if (imgObj.file) {
            formData.append(
              `links[${linkIndex}][image][${imgIndex}]`,
              imgObj.file,
            );
          }
        });
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
          <div className="flex flex-col gap-5">
            {/* ✅ qrName uses local state only — debounced 400ms to parent */}
            <input
              type="text"
              name="qrName"
              placeholder="Name of your QR code..."
              value={qrNameLocal}
              onChange={(e) => setQrNameLocal(e.target.value)}
              className="mb-3 border border-gray-400 outline-none px-3 py-2 rounded-lg min-w-full"
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
                    handleFormDataUpdate({ selectedTemplate: templateId });
                  }}
                />
              </LeftAccordion>

              <LeftAccordion title="Design">
                <ColorPairPicker
                  pairs={[
                    ["#ED7646", "#ffffff", "#220E27"],
                    ["#28EDC9", "#FFFFFF", "#03A183"],
                    ["#EDE728", "#FFFFFF", "#A39E0A"],
                    ["#DDBAE3", "#FFFFFF", "#866D8A"],
                    ["#FD264E", "#FFFFFF", "#B03D41"],
                    ["#3D656B", "#FFFFFF", "#FD6F70"],
                    ["#6D21B1", "#FFFFFF", "#C743D2"],
                    ["#093A32", "#FFFFFF", "#FFA103"],
                    ["#E8F86C", "#FFFFFF", "#1D59F9"],
                    ["#8A9928", "#FFFFFF", "#FDBCCB"],
                    ["#171CAB", "#FFFFFF", "#759DFE"],
                    ["#FF9100", "#FFFFFF", "#FFBC64"],
                    ["#D7BCE1", "#FFFFFF", "#7B5788"],
                    ["#FDC400", "#FFFFFF", "#DA5F97"],
                    ["#EC7D43", "#FFFFFF", "#A24545"],
                  ]}
                  value={
                    currentFormData?.bannerColor || [
                      "#ED7646",
                      "#ffffff",
                      "#220E27",
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
              <LeftAccordion title="Business Information">
                {/*
                  ✅ NOTE: If LinkListInfo calls onChange on every keystroke for
                  title/description fields, apply the same useDebounce pattern
                  inside LinkListInfo as well to fully eliminate re-fetches there.
                */}
                <LinkListInfo
                  onChange={handleFormDataUpdate}
                  currentFormData={currentFormData}
                  selectedTemplate={currentFormData?.selectedTemplate}
                  control={control}
                  errors={errors}
                />
              </LeftAccordion>
            </QRMenu>

            <QRMenu
              title="Content"
              desc="All the details about your QR"
              icon={<IoMdInformationCircleOutline size={22} />}
            >
              <LeftAccordion title="Links">
                <FormProvider {...methods}>
                  <LinkSeparatorManager
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                  />
                </FormProvider>
              </LeftAccordion>

              <LeftAccordion title="Images">
                <ImageContent
                  onChange={handleFormDataUpdate}
                  value={currentFormData}
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  isEditMode={isEditMode}
                  id={id}
                />
              </LeftAccordion>

              <LeftAccordion title="Social Networks">
                <SocialMediaInfo
                  onChange={handleFormDataUpdate}
                  value={currentFormData}
                  control={control}
                  errors={errors}
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

export default ListOfLinksBuilder;
