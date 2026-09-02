import React, { useEffect, useState, useRef } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import Default from "./templates/Default";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template6 from "./templates/Template6";
import Template7 from "./templates/Template7";
import Template8 from "./templates/Template8";
import ViewLinks from "./ViewLinks";
import SocialLinksView from "../../../components/builder/SocialLinksView";
import ImageGalleryView from "./ImageGalleryView";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";

const DEFAULT_BANNER =
  "https://img.qrfy.com/img/original/mockup_social_cover_v2.webp";
const DEFAULT_LOGO =
  "https://img.qrfy.com/img/original/mockup_social_logo_v2.webp";

const PreviewScreen = ({ currentFormData, isScanPage, isEditMode }) => {
  const dispatch = useDispatch();

  const [imageSrcs, setImageSrcs] = useState([]);
  const [bannerSrc, setBannerSrc] = useState(DEFAULT_BANNER);
  const [logoSrc, setLogoSrc] = useState(DEFAULT_LOGO);

  const bgColor = currentFormData?.bannerColor?.[0] || "#f3f4f6";
  const linkBgColor = currentFormData?.bannerColor?.[1] || "#16a34a";
  const linkColor = currentFormData?.bannerColor?.[2] || "#000";

  const values = Object.values(currentFormData || {});
  const hasAnyValue = values.some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object" && value !== null) {
      return Object.keys(value).length > 0;
    }
    return value !== null && value !== undefined && value !== "";
  });

  const bannerImgUrl = currentFormData?.bannerImgUrl || "";
  const logoUrl = currentFormData?.logoUrl || "";
  const bannerImgFile = currentFormData?.bannerImg?.[0]?.file || null;
  const logoFile = currentFormData?.logo?.[0]?.file || null;

  const prevBannerFileRef = useRef(null);
  const prevLogoFileRef = useRef(null);

  useEffect(() => {
    if (!currentFormData) return;

    let mounted = true;
    let createdBannerUrl = null;
    let createdLogoUrl = null;

    const loadImages = async () => {
      try {
        if (isScanPage) {
          setBannerSrc(DEFAULT_BANNER);
          setLogoSrc(DEFAULT_LOGO);

          const bannerFileName = bannerImgUrl?.split("/").pop();
          const logoFileName = logoUrl?.split("/").pop();

          if (bannerFileName) {
            dispatch(
              getThePDFPrevImage(bannerFileName, (err, blob) => {
                if (!mounted) return;
                if (!err && blob) {
                  createdBannerUrl = URL.createObjectURL(blob);
                  setBannerSrc(createdBannerUrl);
                } else {
                  setBannerSrc(DEFAULT_BANNER);
                }
              }),
            );
          }

          if (logoFileName) {
            dispatch(
              getThePDFPrevImage(logoFileName, (err, blob) => {
                if (!mounted) return;
                if (!err && blob) {
                  createdLogoUrl = URL.createObjectURL(blob);
                  setLogoSrc(createdLogoUrl);
                } else {
                  setLogoSrc(DEFAULT_LOGO);
                }
              }),
            );
          }

          return;
        }

        if (isEditMode) {
          if (bannerImgFile) {
            if (bannerImgFile !== prevBannerFileRef.current) {
              prevBannerFileRef.current = bannerImgFile;
              createdBannerUrl = URL.createObjectURL(bannerImgFile);
              setBannerSrc(createdBannerUrl);
            }
          } else if (bannerImgUrl) {
            const bannerFileName = bannerImgUrl.split("/").pop();
            dispatch(
              getThePDFPrevImage(bannerFileName, (err, blob) => {
                if (!mounted) return;
                if (!err && blob) {
                  createdBannerUrl = URL.createObjectURL(blob);
                  setBannerSrc(createdBannerUrl);
                } else {
                  setBannerSrc(DEFAULT_BANNER);
                }
              }),
            );
          } else {
            setBannerSrc(DEFAULT_BANNER);
          }

          if (logoFile) {
            if (logoFile !== prevLogoFileRef.current) {
              prevLogoFileRef.current = logoFile;
              createdLogoUrl = URL.createObjectURL(logoFile);
              setLogoSrc(createdLogoUrl);
            }
          } else if (logoUrl) {
            const logoFileName = logoUrl.split("/").pop();
            dispatch(
              getThePDFPrevImage(logoFileName, (err, blob) => {
                if (!mounted) return;
                if (!err && blob) {
                  createdLogoUrl = URL.createObjectURL(blob);
                  setLogoSrc(createdLogoUrl);
                } else {
                  setLogoSrc(DEFAULT_LOGO);
                }
              }),
            );
          } else {
            setLogoSrc(DEFAULT_LOGO);
          }

          return;
        }

        // CREATE MODE
        const localBannerSrc =
          currentFormData?.bannerImg?.[0]?.preview || DEFAULT_BANNER;
        const localLogoSrc =
          currentFormData?.logo?.[0]?.preview || DEFAULT_LOGO;

        setBannerSrc(localBannerSrc);
        setLogoSrc(localLogoSrc);
      } catch (error) {
        setBannerSrc(DEFAULT_BANNER);
        setLogoSrc(DEFAULT_LOGO);
      }
    };

    loadImages();

    return () => {
      mounted = false;
      if (createdBannerUrl) URL.revokeObjectURL(createdBannerUrl);
      if (createdLogoUrl) URL.revokeObjectURL(createdLogoUrl);
    };
  }, [bannerImgUrl, logoUrl, bannerImgFile, logoFile, isScanPage, isEditMode, dispatch]);

  useEffect(() => {
    if (isScanPage) {
      setImageSrcs([]);
      return;
    }

    if (!currentFormData?.image?.length) {
      setImageSrcs([]);
      return;
    }

    const urls = currentFormData.image
      .map((item) => item?.preview)
      .filter(Boolean);

    setImageSrcs(urls);
  }, [currentFormData?.image, isScanPage]);

  if (!hasAnyValue) {
    return <EmptyPreview />;
  }

  const { title, description, selectedTemplate, bannerImg, logo } =
    currentFormData || {};

  // ✅ FIX: Single source of truth for gallery images passed to ImageGalleryView.
  //
  // The problem was that in edit mode, BOTH `currentFormData.gallery` (raw backend array)
  // AND `currentFormData.image` (RHF field populated from gallery) were being used,
  // causing ImageGalleryView to receive and process 2x the images.
  //
  // Rule:
  //   - isScanPage  → gallery array of imageUrl strings (server paths)
  //   - isEditMode  → currentFormData.image (RHF field, already has { imageUrl } objects)
  //   - createMode  → currentFormData.image (RHF field, has { file, preview } objects)
  //
  // currentFormData.image is always the single authoritative list after ImageGrid
  // populates it from gallery on load (via setValue("image", galleryItems)).
  const galleryImagesData = isScanPage
    ? (currentFormData?.gallery || []).map((item) =>
        typeof item === "string" ? item : item?.imageUrl,
      ).filter(Boolean)
    : (currentFormData?.image || []);

  return (
    <div
      className="min-h-full"
      style={{
        background:
          selectedTemplate === 7
            ? `linear-gradient(to bottom, #ffffff, ${bgColor})`
            : bgColor,
      }}
    >
      {selectedTemplate === 0 && (
        <Default
          title={title}
          description={description}
          logo={logo}
          logoSrc={logoSrc}
          bannerSrc={bannerSrc}
        />
      )}

      {selectedTemplate === 1 && (
        <Template1
          bannerBgColor={bgColor}
          firstColor={bgColor}
          title={title}
          description={description}
          logo={logo}
          bannerImg={bannerImg}
          bannerSrc={bannerSrc}
          logoSrc={logoSrc}
        />
      )}

      {[2, 3, 4, 5].includes(selectedTemplate) && (
        <Template2
          bannerBgColor={bgColor}
          firstColor={bgColor}
          title={title}
          description={description}
          logo={logo}
          bannerImg={bannerImg}
          bannerSrc={bannerSrc}
          logoSrc={logoSrc}
        />
      )}

      {selectedTemplate === 6 && (
        <Template6
          bannerBgColor={bgColor}
          firstColor={bgColor}
          title={title}
          description={description}
          logo={logo}
          bannerImg={bannerImg}
          bannerSrc={bannerSrc}
          logoSrc={logoSrc}
        />
      )}

      {selectedTemplate === 7 && (
        <Template7
          bannerBgColor={bgColor}
          firstColor={bgColor}
          title={title}
          description={description}
          logo={logo}
          bannerImg={bannerImg}
          bannerSrc={bannerSrc}
          logoSrc={logoSrc}
        />
      )}

      {selectedTemplate === 8 && (
        <Template8
          bannerBgColor={bgColor}
          firstColor={bgColor}
          title={title}
          description={description}
          logo={logo}
          bannerImg={bannerImg}
          bannerSrc={bannerSrc}
          logoSrc={logoSrc}
        />
      )}

      <ViewLinks
        linksData={currentFormData?.links}
        bgColor={bgColor}
        selectedTemplate={currentFormData?.selectedTemplate}
        linkBgColor={linkBgColor}
        linkColor={linkColor}
        isScanPage={isScanPage}
        isEditMode={isEditMode}
      />

      {/* ✅ Always pass the single resolved galleryImagesData — never both gallery + image */}
      <ImageGalleryView
        imagesData={galleryImagesData}
        isScanPage={isScanPage}
        selectedGridIndex={currentFormData?.selectedGridIndex}
        currentFormData={currentFormData}
        isEditMode={isEditMode}
      />

      <SocialLinksView
        platforms={currentFormData?.platforms}
        iconColor={"#68676c"}
      />
    </div>
  );
};

export default PreviewScreen;