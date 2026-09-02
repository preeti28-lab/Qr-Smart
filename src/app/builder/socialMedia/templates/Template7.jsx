import React from "react";

const DEFAULT_PROFILE = "https://img.qrfy.com/img/original/mockup_social_logo_v2.webp";

const Template7 = ({
  profileSrc,
  bannerBgColor = "#f5f5f5",
  title = "Frontend Developer",
  description = "Passionate developer with experience in React and UI design.",
  iconColor = "#4F46E5",
}) => {
  const finalProfile = profileSrc || DEFAULT_PROFILE;

  return (
    <div className="w-full flex flex-row items-center px-4 pt-3">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={finalProfile}
          alt="Profile"
          className="w-[70px] h-[70px] rounded-full object-cover border-4"
          style={{ borderColor: bannerBgColor }}
        />
      </div>

      {/* Content on the right */}
      <div className="ml-1 flex flex-col justify-center">
        <div className="flex gap-1 justify-center font-semibold">
          <span>{title}</span>
        </div>
        <p className="text-sm text-center">{description}</p>
      </div>
    </div>
  );
};

export default Template7;