import React, { useEffect, useState } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { FiCopy, FiCalendar, FiTag } from "react-icons/fi";
import Opening from "./previews/Opening";
import Location from "./previews/Location";
import Facilities from "../../../components/builder/Facilities";
import { FaPhone, FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoIosGlobe } from "react-icons/io";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Default from "./templates/Default";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";

const PreviewScreen = ({
  currentFormData,
  isScanPage,
  isEditMode,
  
}) => {
  const [imageSrcs, setImageSrcs] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  // Default fallback images
  const defaultBannerSrc =
    "https://img.qrfy.com/img/original/mockup_social_cover_v2.webp";

  const [bannerSrc, setBannerSrc] = useState(defaultBannerSrc);

  const bgColor = currentFormData?.bannerColor?.[0] || "#f3f4f6"; // parent background
  const iconColor = currentFormData?.bannerColor?.[1] || "#16a34a"; // icon color
  const iconBgColor = `${bgColor}33`; // low opacity background (20%)

  useEffect(() => {
    // ----------- SCAN PAGE (STRICT API IMAGE) -----------
    if (isScanPage) {
      const imageName = currentFormData?.imageUrl?.split("/").pop();

      if (!imageName) {
        setBannerSrc(defaultBannerSrc);
        return;
      }

      dispatch(
        getThePDFPrevImage(imageName, (err, blob) => {
          if (!err && blob) {
            const url = URL.createObjectURL(blob);
            setBannerSrc(url);

            // cleanup
            return () => URL.revokeObjectURL(url);
          } else {
            setBannerSrc(defaultBannerSrc);
          }
        }),
      );

      return;
    }

    // ----------- EDIT MODE (API → CAN OVERRIDE) -----------
    if (isEditMode) {
      // 1. If user uploaded new image → PRIORITY
      if (currentFormData?.image?.length) {
        const file = currentFormData.image[0]?.file;

        if (file) {
          const url = URL.createObjectURL(file);
          setBannerSrc(url);

          return () => URL.revokeObjectURL(url);
        }
      }

      // 2. Otherwise fallback to API image
      const imageName = currentFormData?.imageUrl?.split("/").pop();

      if (!imageName) {
        setBannerSrc(defaultBannerSrc);
        return;
      }

      dispatch(
        getThePDFPrevImage(imageName, (err, blob) => {
          if (!err && blob) {
            const url = URL.createObjectURL(blob);
            setBannerSrc(url);

            return () => URL.revokeObjectURL(url);
          } else {
            setBannerSrc(defaultBannerSrc);
          }
        }),
      );

      return;
    }

    // ----------- CREATE MODE (ONLY UPLOAD) -----------
    if (currentFormData?.image?.length) {
      const file = currentFormData.image[0]?.file;

      if (file) {
        const url = URL.createObjectURL(file);
        setBannerSrc(url);

        return () => URL.revokeObjectURL(url);
      }
    }

    // fallback
    setBannerSrc(defaultBannerSrc);
  }, [
    isScanPage,
    isEditMode,
    currentFormData?.image,
    currentFormData?.imageUrl,
  ]);

  if (!currentFormData || Object.keys(currentFormData).length === 0) {
    return <EmptyPreview />;
  }

  return (
    <div
      className={` ${isScanPage ? "min-h-[100dvh]" : "min-h-full"}  `}
      style={{ backgroundColor: bgColor }}
    >
      {currentFormData?.selectedTemplate === 0 && (
        <Default
          firstColor={bgColor}
          company={currentFormData?.company}
          title={currentFormData?.title}
          subtitle={currentFormData?.subtitle}
          btnTxt={currentFormData?.buttonText}
          btnLink={currentFormData?.buttonLink}
          bannerSrc={bannerSrc} // Pass computed bannerSrc
          bannerImg={currentFormData?.image} // Keep original array if needed
        />
      )}
      {currentFormData?.selectedTemplate === 1 && (
        <Template1
          firstColor={bgColor}
          company={currentFormData?.company}
          title={currentFormData?.title}
          subtitle={currentFormData?.subtitle}
          btnTxt={currentFormData?.buttonText}
          btnLink={currentFormData?.buttonLink}
          bannerSrc={bannerSrc} // Pass computed bannerSrc
          bannerImg={currentFormData?.image}
        />
      )}
      {currentFormData?.selectedTemplate === 2 && (
        <Template2
          firstColor={bgColor}
          company={currentFormData?.company}
          title={currentFormData?.title}
          subtitle={currentFormData?.subtitle}
          btnTxt={currentFormData?.buttonText}
          btnLink={currentFormData?.buttonLink}
          bannerSrc={bannerSrc} // Pass computed bannerSrc
          bannerImg={currentFormData?.image}
        />
      )}

      <div className="w-[90%] mx-auto">
        <Opening
          currentFormData={currentFormData}
          bgColor={bgColor}
          iconColor={iconColor}
          iconBgColor={iconBgColor}
        />
        <Location
          currentFormData={currentFormData}
          bgColor={bgColor}
          iconColor={iconColor}
          iconBgColor={iconBgColor}
        />
        <Facilities
          currentFormData={currentFormData}
          bgColor={bgColor}
          iconColor={iconColor}
          iconBgColor={iconBgColor}
          isScanPage={isScanPage}
        />

        {/* Name */}
        <div className="bg-white rounded-md p-2 flex items-center gap-2 shadow-sm mt-2">
          {/* User icon */}
          <div className="flex items-center">
            <p
              className="p-1.5 rounded"
              style={{ backgroundColor: iconBgColor }}
            >
              <FaUser style={{ color: iconColor }} className="text-sm" />
            </p>
          </div>

          {/* Name text */}
          <div className="text-left">
            <p className="text-xs font-semibold">Name</p>
            <p className="text-gray-700 text-xs">{currentFormData?.name}</p>
          </div>
        </div>

        {/* Phones */}
        <div className="space-y-2 mt-2 bg-white rounded-md p-2 gap-2 shadow-sm">
          {currentFormData?.phones?.map((phone, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border-b border-gray-200 last:border-b-0 pb-2"
            >
              <div className="flex items-center">
                <p
                  className="p-1.5 rounded"
                  style={{ backgroundColor: iconBgColor }}
                >
                  <IoCall style={{ color: iconColor }} className="text-sm" />
                </p>
              </div>

              <div className="flex flex-col text-left">
                <p className="text-xs font-semibold">{phone.title}</p>
                <a
                  href={`tel:${phone.number}`}
                  className="text-gray-700 text-xs hover:underline"
                >
                  {phone.number}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Emails */}
        <div className="space-y-2 mt-2 bg-white rounded-md p-2 gap-2 shadow-sm">
          {currentFormData?.emails?.map((email, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border-b border-gray-200 last:border-b-0 pb-2"
            >
              <div className="flex items-center">
                <p
                  className="p-1.5 rounded"
                  style={{ backgroundColor: iconBgColor }}
                >
                  <MdEmail style={{ color: iconColor }} className="text-sm" />
                </p>
              </div>

              <div className="flex flex-col text-left">
                <p className="text-xs font-semibold">{email.emailLabel}</p>
                <a
                  href={`mailto:${email.email}`}
                  className="text-gray-700 text-xs hover:underline"
                >
                  {email.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Website */}
        <div className="mt-2 bg-white flex items-center rounded-md p-2 gap-2 shadow-sm">
          <div className="flex items-center">
            <p
              className="p-1.5 rounded"
              style={{ backgroundColor: iconBgColor }}
            >
              <IoIosGlobe style={{ color: iconColor }} className="text-base" />
            </p>
          </div>

          <div className="text-left">
            <p className="text-xs font-semibold">Website</p>
            <p className="text-gray-700 text-xs ">{currentFormData?.website}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-center items-center gap-2 pb-5">
          {currentFormData?.platforms?.facebook?.url && (
            <a
              href={currentFormData.platforms.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900"
            >
              <FaFacebookF size={17} />
            </a>
          )}
          {currentFormData?.platforms?.twitter?.url && (
            <a
              href={currentFormData.platforms.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900"
            >
              <FaTwitter size={17} />
            </a>
          )}
          {currentFormData?.platforms?.instagram?.url && (
            <a
              href={currentFormData.platforms.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900"
            >
              <FaInstagram size={17} />
            </a>
          )}
          {currentFormData?.platforms?.linkedin?.url && (
            <a
              href={currentFormData.platforms.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900"
            >
              <FaLinkedinIn size={17} />
            </a>
          )}
          {currentFormData?.platforms?.youtube?.url && (
            <a
              href={currentFormData.platforms.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900"
            >
              <FaYoutube size={17} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;
