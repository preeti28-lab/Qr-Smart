import React, { useEffect, useState } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { FiCalendar } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template5 from "./templates/Template5";
import Template6 from "./templates/Template6";
import Template7 from "./templates/Template7";

import { getThePDFPrevImage } from "../../../redux/features/qrcodes";
import { useDispatch } from "react-redux";
import ImageGalleryView from "../../../components/builder/ImageGalleryView";

const DEFAULT_PROFILE =
  "https://img.qrfy.com/img/original/mockup_social_logo_v2.webp";
const DEFAULT_BANNER =
  "https://img.qrfy.com/img/original/mockup_social_cover_v2.webp";

const PreviewScreen = ({ currentFormData, isScanPage = false, isEditMode }) => {
  const dispatch = useDispatch();

  const [profileSrc, setProfileSrc] = useState(DEFAULT_PROFILE);
  const [bannerSrc, setBannerSrc] = useState(DEFAULT_BANNER);

  const {
    selectedTemplate,
    platforms,
    bannerColor,
    title,
    description,
    telephone,
    email,
    website,
    bannerImg,
    image,
    imageUrl,
    bannerUrl,
  } = currentFormData || {};

  console.log(currentFormData);

  // =========================
  // ✅ IMAGE HANDLING
  // =========================
  useEffect(() => {
    let mounted = true;
    const createdUrls = [];

    // ============ PROFILE IMAGE ============
    const loadProfile = () => {
      // Priority 1: newly uploaded File
      const newUpload = image?.find((img) => img?.file instanceof Blob);
      if (newUpload) {
        const url = URL.createObjectURL(newUpload.file);
        createdUrls.push(url);
        if (mounted) setProfileSrc(url);
        return;
      }

      // Priority 2: existing preview (already a blob url)
      const existingPreview = image?.find((img) => img?.preview);
      if (existingPreview) {
        if (mounted) setProfileSrc(existingPreview.preview);
        return;
      }

      // Priority 3: API image (scan OR edit mode)
      const apiUrl = imageUrl || image?.[0]?.imageUrl;
      if ((isScanPage || isEditMode) && apiUrl) {
        const imageName = apiUrl.split("/").pop();
        if (!imageName) {
          if (mounted) setProfileSrc(DEFAULT_PROFILE);
          return;
        }

        dispatch(
          getThePDFPrevImage(imageName, (err, blob) => {
            if (!mounted) return;
            if (!err && blob) {
              const url = URL.createObjectURL(blob);
              createdUrls.push(url);
              setProfileSrc(url);
            } else {
              // Fallback to raw URL (prepend base if your backend serves from a different origin)
              setProfileSrc(apiUrl);
            }
          }),
        );
        return;
      }

      // Priority 4: default
      if (mounted) setProfileSrc(DEFAULT_PROFILE);
    };

    // ============ BANNER IMAGE ============
    const loadBanner = () => {
      const newUpload = bannerImg?.find((img) => img?.file instanceof Blob);
      if (newUpload) {
        const url = URL.createObjectURL(newUpload.file);
        createdUrls.push(url);
        if (mounted) setBannerSrc(url);
        return;
      }

      const existingPreview = bannerImg?.find((img) => img?.preview);
      if (existingPreview) {
        if (mounted) setBannerSrc(existingPreview.preview);
        return;
      }

      const apiUrl = bannerUrl || bannerImg?.[0]?.imageUrl;
      if ((isScanPage || isEditMode) && apiUrl) {
        const imageName = apiUrl.split("/").pop();
        if (!imageName) {
          if (mounted) setBannerSrc(DEFAULT_BANNER);
          return;
        }

        dispatch(
          getThePDFPrevImage(imageName, (err, blob) => {
            if (!mounted) return;
            if (!err && blob) {
              const url = URL.createObjectURL(blob);
              createdUrls.push(url);
              setBannerSrc(url);
            } else {
              setBannerSrc(apiUrl);
            }
          }),
        );
        return;
      }

      if (mounted) setBannerSrc(DEFAULT_BANNER);
    };

    loadProfile();
    loadBanner();

    return () => {
      mounted = false;
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [isScanPage, isEditMode, image, bannerImg, imageUrl, bannerUrl, dispatch]);

  // =========================
  // UI LOGIC
  // =========================

  if (!currentFormData || Object.keys(currentFormData).length === 0) {
    return <EmptyPreview />;
  }

  const bgColor = bannerColor?.[0] || "#f3f4f6";
  const primaryColor = bannerColor?.[1] || "#16a34a";

  const platformConfig = {
    facebook: { label: "Facebook", icon: <FaFacebookF size={14} /> },
    instagram: { label: "Instagram", icon: <FaInstagram size={14} /> },
    twitter: { label: "Twitter", icon: <FaTwitter size={14} /> },
    linkedin: { label: "LinkedIn", icon: <FaLinkedinIn size={14} /> },
  };

  const platformList = Object.entries(platforms || {})
    .filter(([_, value]) => value?.url || value?.text)
    .map(([key, value]) => ({
      key,
      label: platformConfig[key]?.label || key,
      icon: platformConfig[key]?.icon,
      url: value.url,
    }));

  return (
    <div className="min-h-full" style={{ background: bgColor }}>
      <div className={`${isScanPage && "max-w-3xl mx-auto"}`}>
        {/* ===================== */}
        {/* TEMPLATE HANDLING */}
        {/* ===================== */}

        {selectedTemplate === 1 && (
          <Template1
            bannerSrc={bannerSrc}
            profileSrc={profileSrc}
            title={title}
            description={description}
            firstColor={bgColor}
          />
        )}

        {[2, 3, 4].includes(selectedTemplate) && (
          <Template2
            bannerSrc={bannerSrc}
            profileSrc={profileSrc}
            title={title}
            description={description}
            firstColor={bgColor}
          />
        )}

        {selectedTemplate === 5 && (
          <Template5
            bannerSrc={bannerSrc}
            profileSrc={profileSrc}
            title={title}
            description={description}
            firstColor={bgColor}
          />
        )}

        {selectedTemplate === 6 && (
          <Template6
            bannerSrc={bannerSrc}
            profileSrc={profileSrc}
            title={title}
            description={description}
            firstColor={bgColor}
          />
        )}

        {selectedTemplate === 7 && (
          <Template7
            profileSrc={profileSrc}
            title={title}
            description={description}
            firstColor={bgColor}
          />
        )}

        {/* ===================== */}
        {/* DEFAULT TEMPLATE (0) */}
        {/* ===================== */}

        {selectedTemplate === 0 && (
          <div className="text-center p-4">
            <img
              src={profileSrc}
              alt="Profile"
              className="w-[130px] h-[130px] object-cover rounded-full mx-auto border-8"
            />
            <h2 className="font-bold text-lg mt-3 text-white">{title}</h2>
            <p className="text-sm text-white">{description}</p>
          </div>
        )}

        {/* ===================== */}
        {/* DEFAULT TEMPLATE */}
        {/* ===================== */}

     
        {/* ===================== */}
        {/* CONTACT BUTTONS */}
        {/* ===================== */}

        <div className="flex justify-center gap-2 mt-4">
          {telephone && (
            <div
              onClick={() => window.open(`tel:${telephone}`)}
              className="cursor-pointer p-2 bg-white rounded"
            >
              <FaPhoneAlt color={primaryColor} />
            </div>
          )}

          {email && (
            <div
              onClick={() => window.open(`mailto:${email}`)}
              className="cursor-pointer p-2 bg-white rounded"
            >
              <FiMail color={primaryColor} />
            </div>
          )}

          {website && (
            <div
              onClick={() => window.open(website, "_blank")}
              className="cursor-pointer p-2 bg-white rounded"
            >
              <FiCalendar color={primaryColor} />
            </div>
          )}
        </div>

        {/* ===================== */}
        {/* GALLERY */}
        {/* ===================== */}

        <ImageGalleryView
          imagesData={
            isScanPage
              ? currentFormData?.galleryImgs
              : currentFormData?.galleryImages
          }
          isScanPage={isScanPage}
          isEditMode={isEditMode}
          selectedGridIndex={currentFormData?.selectedGridIndex}
        />
      </div>
    </div>
  );
};

export default PreviewScreen;
