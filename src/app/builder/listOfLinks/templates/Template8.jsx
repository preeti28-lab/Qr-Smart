import React from "react";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

const Template8 = ({
  profile = "https://img.qrfy.com/img/original/mockup_social_logo_v2.webp",
  bannerBgColor = "#f5f5f5",
  title = "Frontend Developer",
  description = "Passionate developer with experience in React and UI design.",

  name = "John",
  surname = "Doe",
  logo = [],
  summary = "Passionate developer with experience in React and UI design.",
  iconColor = "#4F46E5",
  logoSrc,
}) => {
  const profileSrc = logo?.[0]?.preview || profile;

  return (
    <div
      className="w-full flex flex-row items-center px-4 pt-3"
      //   style={{ backgroundColor: bannerBgColor }}
    >
      {/* Profile Image */}
      <div className="flex-shrink-0">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt="Profile"
            className="w-[70px] h-[70px] rounded-full object-cover border-4 border-white"
            // style={{ borderColor: bannerBgColor }}
          />
        ) : (
          <div
            className="w-[100px] h-[100px] rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: iconColor }}
          >
            No Image
          </div>
        )}
      </div>

      {/* Content on the right */}
      <div className="ml-1.5 flex flex-col justify-center">
        <div className="flex gap-1 justify-start font-semibold">
          <span className="text-sm">{title}</span>
        </div>

        <p className="text-xs text-left ">{description}</p>
      </div>
    </div>
  );
};

export default Template8;
