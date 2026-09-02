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
import LeftAccordion from "../../../components/menu/LeftAccordion";
import BusinessInfo from "./BusinessInfo";
import MenuInfo from "./MenuInfo";
import OpeningHours from "../../../components/builder/OpeningHours";
import LocationInfo from "../../../components/builder/LocationInfo";
import SocialMediaInfo from "../../../components/builder/SocialMediaInfo";
import ContactInfo from "./ContactInfo";
import SeconStepBtns from "../../../components/builder/SeconStepBtns";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createQRCode, updateQRCode } from "../../../redux/features/qrcodes";
import { useGetSingleQRCode } from "../../../hooks/useGetSingleQRCode";

const MenuBuilder = ({ currentFormData, setCurrentFormData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const isEditMode = !!id;
  const [hasInitialized, setHasInitialized] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [qrCustomization, setQrCustomization] = useState({});
  const [selectedType, setSelectedTye] = useState("menu");
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
      platforms: {},
      ...currentFormData,
    },
    // resolver: yupResolver(menuBuilderFormSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  // ---- Load existing QR data into the form in edit mode ----
  useEffect(() => {
    if (!isEditMode || !qrData) return;

    const styling = qrData?.qrStyling || {};
    const menuContent = qrData?.menuContent || {};

    // QR styling
    setSelectedTye(qrData?.type || "menu");
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

    // Normalize banner (cover image) → form shape
    const coverLogo = menuContent?.bannerUrl
      ? [
          {
            file: null,
            imageFileName: menuContent.bannerFileName,
            imageUrl: menuContent.bannerUrl,
            url: menuContent.bannerUrl,
            isExisting: true,
          },
        ]
      : [];

    // Normalize company logo → form shape
    const companyLogo = menuContent?.companyLogoUrl
      ? [
          {
            file: null,
            imageFileName: menuContent.companyLogoFileName,
            imageUrl: menuContent.companyLogoUrl,
            url: menuContent.companyLogoUrl,
            isExisting: true,
          },
        ]
      : [];

    // Normalize sections/products (API: `images` → form: `image`)
    const sections = (menuContent?.sections || []).map((section) => ({
      sectionName: section.sectionName || "",
      sectionDescription: section.sectionDescription || "",
      products: (section.products || []).map((product) => ({
        productName: product.productName || "",
        productTranslatedName: product.productTranslatedName || "",
        productDescription: product.productDescription || "",
        multiPrice: !!product.multiPrice,
        singlePrice: product.singlePrice || "",
        prices: product.prices || [],
        allergies: product.allergies || [],
        image: (product.images || []).map((img) => ({
          file: null,
          imageFileName: img.imageFileName,
          imageUrl: img.imageUrl,
          url: img.imageUrl,
          isExisting: true,
        })),
      })),
    }));

    // Normalize opening hours (keep ISO strings; wrap in new Date() if your
    // OpeningHours component expects Date objects)
    const openingHours = (menuContent?.openingHours || []).map((day) => ({
      day: day.day,
      enabled: !!day.enabled,
      slots: (day.slots || []).map((slot) => ({
        open: slot.open || null,
        close: slot.close || null,
      })),
    }));

    const formattedFormData = {
      // Basic info
      qrName: menuContent?.qrName || qrData?.label || "",
      nameOfEstablishment: menuContent?.nameOfEstablishment || "",
      description: menuContent?.description || "",
      menuTitle: menuContent?.menuTitle || "",

      // Appearance — ColorPairPicker expects a [primary, secondary] tuple
      bannerColor:
        Array.isArray(menuContent?.bannerColor) &&
        menuContent.bannerColor.length === 2
          ? menuContent.bannerColor
          : ["#FF9100", "#FFBC64"],

      // Images
      coverLogo,
      companyLogo,

      // Location
      street: menuContent?.street || "",
      number: menuContent?.number || "",
      postalCode: menuContent?.postalCode || "",
      city: menuContent?.city || "",
      state: menuContent?.state || "",
      country: menuContent?.country || "",
      mode: menuContent?.mode || "url",
      locationUrl: menuContent?.locationUrl || "",
      latitude: menuContent?.latitude || "",
      longitude: menuContent?.longitude || "",

      // Contact
      telephone: menuContent?.telephone || "",
      email: menuContent?.email || "",
      website:
        menuContent?.website && menuContent.website !== "undefined"
          ? menuContent.website
          : "",

      // Opening hours
      openingHours,
      timeFormat: menuContent?.timeFormat || "24",

      // Social networks
      platforms: menuContent?.platforms,

      // Menu structure
      sections,
    };

    setCurrentFormData(formattedFormData);
    reset(formattedFormData);
    setHasInitialized(true);
  }, [isEditMode, qrData, reset, setCurrentFormData]);

  const stepHeading = {
    1: "Complete the content of the QR",
    2: "Design the QR",
  };

  const maxStep = 3;

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
      type: "menu",
      label: currentFormData?.qrName,
    };

    const formData = new FormData();

    // helper to skip null/undefined
    const appendIfValid = (key, value) => {
      if (value !== null && value !== undefined) {
        if (typeof value === "object" && !(value instanceof File)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }
    };

    Object.keys(payload).forEach((key) => {
      if (key !== "companyLogo" && key !== "coverLogo" && key !== "sections") {
        appendIfValid(key, payload[key]);
      }
    });

    if (payload.companyLogo?.length > 0) {
      payload.companyLogo.forEach((imgObj) => {
        if (imgObj?.file) {
          formData.append("companyLogo", imgObj.file);
        }
      });
    }

    if (payload.coverLogo?.length > 0) {
      payload.coverLogo.forEach((imgObj) => {
        if (imgObj?.file) {
          formData.append("banner", imgObj.file);
        }
      });
    }

    payload?.sections?.forEach((section, sectionIndex) => {
      appendIfValid(
        `sections[${sectionIndex}][sectionName]`,
        section?.sectionName,
      );
      appendIfValid(
        `sections[${sectionIndex}][sectionDescription]`,
        section?.sectionDescription,
      );

      section.products?.forEach((product, productIndex) => {
        const baseKey = `sections[${sectionIndex}][products][${productIndex}]`;

        appendIfValid(`${baseKey}[productName]`, product?.productName);
        appendIfValid(
          `${baseKey}[productTranslatedName]`,
          product?.productTranslatedName,
        );
        appendIfValid(
          `${baseKey}[productDescription]`,
          product?.productDescription,
        );
        appendIfValid(`${baseKey}[multiPrice]`, product?.multiPrice);
        appendIfValid(`${baseKey}[singlePrice]`, product?.singlePrice);

        product.prices?.forEach((price, priceIndex) => {
          appendIfValid(`${baseKey}[prices][${priceIndex}][size]`, price?.size);
          appendIfValid(
            `${baseKey}[prices][${priceIndex}][price]`,
            price?.price,
          );
        });

        product.allergies?.forEach((allergy, allergyIndex) => {
          appendIfValid(`${baseKey}[allergies][${allergyIndex}]`, allergy);
        });

        product.image?.forEach((imgObj, imgIndex) => {
          if (imgObj?.file) {
            formData.append(`${baseKey}[image][${imgIndex}]`, imgObj.file);
          }
        });
      });
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
          <>
            <input
              type="text"
              name="qrName"
              placeholder="Name of your QR code..."
              value={currentFormData?.qrName || ""}
              onChange={(e) => handleFormDataUpdate({ qrName: e.target.value })}
              className="mb-3 border outline-none px-3 py-2 rounded-lg min-w-full border-gray-400"
            />

            <div className="flex flex-col gap-5">
              <QRMenu
                title="Appearance"
                desc="Choose the styles."
                icon={<IoMdInformationCircleOutline size={22} />}
                defualt={true}
              >
                <LeftAccordion title="Design">
                  <ColorPairPicker
                    pairs={[
                      ["#FF9100", "#FFBC64"],
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
                      ["#D7BCE1", "#7B5788"],
                      ["#FDC400", "#DA5F97"],
                      ["#EC7D43", "#A24545"],
                    ]}
                    value={
                      currentFormData?.bannerColor || ["#FF9100", "#FFBC64"]
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
                <LeftAccordion title="Category">
                  <MenuInfo
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
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

                <LeftAccordion title="Contact">
                  <ContactInfo
                    onChange={handleFormDataUpdate}
                    currentFormData={currentFormData}
                    control={control}
                    errors={errors}
                    reset={reset}
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

export default MenuBuilder;
