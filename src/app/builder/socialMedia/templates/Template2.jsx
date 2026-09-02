import React from "react";

const DEFAULT_BANNER = "https://img.qrfy.com/img/original/mockup_social_cover_v2.webp";
const DEFAULT_PROFILE = "https://img.qrfy.com/img/original/mockup_social_logo_v2.webp";

const Template2 = ({
  bannerSrc,
  profileSrc,
  bannerBgColor = "#f5f5f5",
  title = "Frontend Developer",
  description = "Passionate developer with experience in React and UI design.",
  iconColor = "#4F46E5",
  firstColor,
}) => {
  const finalBanner = bannerSrc || DEFAULT_BANNER;
  const finalProfile = profileSrc || DEFAULT_PROFILE;

  return (
    <div className="w-full flex flex-col">
      {/* Background Image */}
      <div className="relative w-full h-[200px]">
        <img src={finalBanner} alt="Background" className="w-full h-full object-cover" />
      </div>

      {/* Bottom Card */}
      <div
        className="rounded-tl-3xl rounded-tr-3xl relative z-20 -mt-10"
        style={{ backgroundColor: firstColor }}
      >
        <div className="w-[95%] mx-auto relative z-10">
          <img
            src={finalProfile}
            alt="Profile"
            className="w-[100px] h-[100px] rounded-full border-4 mx-auto object-cover -mt-12"
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
    </div>
  );
};

export default Template2;