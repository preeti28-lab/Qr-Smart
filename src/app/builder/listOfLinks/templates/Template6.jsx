import React from "react";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

const Template6 = ({
  backgroundImg = "https://img.qrfy.com/img/original/mockup_social_cover_v2.webp",
  profile = "https://img.qrfy.com/img/original/mockup_social_logo_v2.webp",
  bannerBgColor = "#f5f5f5",
  title = "Frontend Developer",
  description = "Passionate developer with experience in React and UI design.",

  iconColor = "#4F46E5",
  bannerImg = [],
  logo = [],
  firstColor,
  bannerSrc,
  logoSrc,
}) => {
  // const bannerSrc = bannerImg?.[0]?.preview || backgroundImg;
  // const profileSrc = logo?.[0]?.preview || profile;
  return (
    <div
      className="w-full flex flex-col"
      //   style={{ backgroundColor: bannerBgColor }}
    >
      {/* Background Image */}
      <div className="relative w-full h-[120px] p-3">
        {bannerSrc ? (
          <img
            src={bannerSrc}
            alt="Background"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: iconColor }}
          >
            No Image
          </div>
        )}
      </div>

      {/* Bottom Card */}
      <div
        className="rounded-tl-3xl rounded-tr-3xl relative z-20 -mt-3 "
        // style={{ backgroundColor: bannerBgColor }}
      >
        <div className="w-[95%] mx-auto relative z-10">
          {/* Profile Image */}
          {logoSrc ? (
            <img
              src={logoSrc}
              alt="Profile"
              className="w-[100px] h-[100px] rounded-full border-4 mx-auto object-cover -mt-12 border-white"
            />
          ) : (
            <div
              className="w-[100px] h-[100px] mx-auto rounded-full flex items-center justify-center text-white text-sm font-semibold -mt-12"
              style={{ backgroundColor: iconColor }}
            >
              No Image
            </div>
          )}

          {/* Content */}
          <div className="p-3 w-full flex flex-col items-center mb-4">
            <div className="flex gap-1 justify-center font-semibold">
              <span>{title}</span>
            </div>

            <p className="text-sm text-center">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template6;
