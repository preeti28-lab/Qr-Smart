import React from "react";

const DEFAULT_PROFILE = "https://img.qrfy.com/img/original/mockup_social_logo_v2.webp";

const Template6 = ({
  bannerSrc, // accepted for API consistency, not rendered
  profileSrc,
  bannerBgColor = "#f5f5f5",
  title = "Frontend Developer",
  description = "Passionate developer with experience in React and UI design.",
  iconColor = "#4F46E5",
  firstColor,
}) => {
  const finalProfile = profileSrc || DEFAULT_PROFILE;

  return (
    <div className="w-full flex flex-col">
      <div className="w-[95%] mx-auto mt-5">
        <img
          src={finalProfile}
          alt="Profile"
          className="w-[100px] h-[100px] rounded-full border-4 mx-auto object-cover"
          style={{ borderColor: bannerBgColor }}
        />

        <div className="p-3 w-full flex flex-col items-center mb-4">
          <div className="flex gap-1 justify-center font-semibold">
            <span>{title}</span>
          </div>
          <p className="text-sm text-center">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Template6;