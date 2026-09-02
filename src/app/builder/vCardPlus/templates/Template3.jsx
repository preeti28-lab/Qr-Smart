import React from "react";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

const Template3 = ({
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
  return (
    <>
      {profile ? (
        <img src={profile} className="h-[200px] w-full object-cover -mb-5" />
      ) : (
        <div
          className="w-32 h-32 rounded-full mb-4 flex items-center justify-center text-white text-sm font-semibold"
          style={{ backgroundColor: bannerBgColor }}
        >
          No Image
        </div>
      )}
      <div
        className=" w-full rounded-tl-3xl rounded-tr-3xl "
        style={{ backgroundColor: bannerBgColor }} // hex color applied here
      >
        <div className="w-full mx-auto rounded-tl-3xl rounded-tr-3xl ">
          {/* Name, Title, Summary */}
          <div className=" p-3  flex items-end  gap-2 justify-between mb-4  rounded-sm w-[95%] mx-auto">
            <div className="flex flex-col items-start">
              <div className="flex gap-1 justify-center font-semibold ">
                <span>{name}</span> <span>{surname}</span>
              </div>
              <p className={`text-xs text-center text-gray-800 mb-2`}>
                {title}
              </p>
              <p className="text-sm text-left">{summary}</p>
              <button
                className=" text-white px-3 mt-3 text-sm py-1 rounded-full"
                style={{ backgroundColor: iconColor }}
                onClick={onAddContact}
              >
                {footerText}
              </button>
            </div>
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
    </>
  );
};

export default Template3;
