import React from "react";

const Template1 = ({
  backgroundImg = "https://img.qrfy.com/img/original/mockup_social_cover_v2.webp",
  profile = "https://img.qrfy.com/img/original/mockup_social_logo_v2.webp",
  bannerBgColor = "#f5f5f5",

  title = "John Doe",
  description = "Passionate developer with experience in React and UI design.",
  iconColor = "#4F46E5",

  bannerImg = [],
  logo = [],
  firstColor,
  bannerSrc,
  logoSrc,
}) => {
  // Extract blobURL if uploaded, otherwise fallback
  // const bannerSrc = bannerImg?.[0]?.preview || backgroundImg;
  // const profileSrc = logo?.[0]?.preview || profile;

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "0, 0, 0";
  };

  return (
    <div
      className="w-full flex flex-col"
      style={{ backgroundColor: firstColor }}
    >
      <div className="relative w-full h-[200px]">
        {bannerSrc ? (
          <img
            src={bannerSrc}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: iconColor }}
          >
            No Banner
          </div>
        )}

        <div
          style={{
            background: `linear-gradient(rgba(${hexToRgb(
              bannerBgColor,
            )}, 0) 16%, rgb(${hexToRgb(firstColor)}) 83%)`,
            bottom: "-1px",
            height: "138px",
            left: "0px",
            position: "absolute",
            width: "100%",
          }}
        />
      </div>

      <div className="w-[95%] mx-auto -mt-6 relative z-10">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt="Profile"
            className="w-[100px] rounded-full border-4 mx-auto h-full object-cover -mt-12"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: iconColor }}
          >
            No Profile
          </div>
        )}

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

export default Template1;
