import React from "react";

const Default = ({
  backgroundImg = "https://img.qrfy.com/img/original/mockup_social_cover_v2.webp",
  profile = "https://img.qrfy.com/img/original/mockup_social_logo_v2.webp",
  bannerBgColor = "#f5f5f5",

  title = "John Doe",
  description = "Passionate developer with experience in React and UI design.",
  iconColor = "#4F46E5",

  bannerImg = [],
  image = [],
  firstColor = "#f5f5f5",

  company,

  subtitle,
  btnTxt,
  btnLink,
}) => {
  // Extract blobURL if uploaded, otherwise fallback

  const bannerSrc = bannerImg?.[0]?.blobURL || backgroundImg;
  const profileSrc = image?.[0]?.blobURL || profile;

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
      <div className="relative w-full h-[140px]">
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
      </div>

      <div
        className="w-[95%] mx-auto -mt-6 relative z-10  rounded-tl-3xl rounded-tr-3xl"
        style={{ backgroundColor: firstColor }}
      >
        <div className="p-3 w-full flex flex-col items-center ">
          <div className="flex flex-col items-center justify-center text-xs font-semibold">
            <p className="text-base font-semibold">{title}</p>
            <p className="text-xs font-medium text-gray-700">{company}</p>
          </div>

          <p className="text-sm text-center pt-2">{subtitle}</p>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <a href={btnLink} target="_blank" rel="noopener noreferrer">
          <button className="bg-white border-[1.5px] border-black rounded-full w-max text-xs py-1 px-3 mx-auto">
            {btnTxt}
          </button>
        </a>
      </div>
    </div>
  );
};

export default Default;
