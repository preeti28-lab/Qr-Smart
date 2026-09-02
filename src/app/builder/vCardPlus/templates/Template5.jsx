import React from "react";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

const Template5 = ({
  profile,
  bannerBgColor,
  title,
  name,
  surname,
  summary,
  footerText,
  iconColor,
  onPhoneClick,
  onEmailClick,
  onAddContact,
}) => {
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "0, 0, 0";
  };

  return (
    <div
      className="w-full flex flex-col"
      style={{ backgroundColor: bannerBgColor }}
    >
      {/* Full-width profile image with gradient overlay at bottom */}
      <div className="relative w-full h-[200px] p-4 ">
        {profile ? (
          <img
            src={profile}
            alt="Profile"
            className="w-full h-full object-cover rounded-md"
            style={{}}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ backgroundColor: iconColor }}
          >
            No Image
          </div>
        )}

        {/* Gradient overlay — fades from transparent to bannerBgColor */}
        {/* Gradient overlay */}
      </div>

      {/* Content — sits flush, gradient makes it feel connected */}
      <div className="w-full mx-auto -mt-4 relative z-10">
        {/* Card */}
        <div className="flex flex-col items-start mb-3 w-[95%] mx-auto">
          <div className=" p-3 w-full flex flex-col items-start mb-4  ">
            <div className="flex gap-1 justify-center font-semibold ">
              <span>{name}</span> <span>{surname}</span>
            </div>
            <p className={`text-xs text-center text-gray-800 mb-2`}>{title}</p>
            <p className="text-sm text-center">{summary}</p>
            <div className="flex justify-between items-center w-full">
              <button
                className=" text-white px-3 mt-3 text-sm py-1 rounded-full"
                style={{ backgroundColor: iconColor }}
                onClick={onAddContact}
              >
                {footerText}
              </button>
              <div className="flex gap-2 mt-3">
                <IoCall
                  style={{ color: iconColor, cursor: "pointer" }}
                  onClick={onPhoneClick}
                />

                <IoMdMail
                  style={{ color: iconColor, cursor: "pointer" }}
                  onClick={onEmailClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template5;
