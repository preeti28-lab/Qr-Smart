import React from "react";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

const Template1 = ({
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
  isScanPage,
}) => {
  return (
    <>
      <img
        src="https://img.qrfy.com/img/original/mockup_vcard_template_cover_v2.webp"
        className={`  ${isScanPage ? "h-[12rem]" : "h-[120px]"} w-full object-cover -mb-10`}
      />
      <div
        className=" w-full rounded-tl-3xl rounded-tr-3xl "
        style={{ backgroundColor: bannerBgColor }} // hex color applied here
      >
        <div className="w-[85%] mx-auto">
          {profile ? (
            <img
              src={profile}
              alt="Profile"
              className={` ${isScanPage ? "w-[120px] h-[120px]" : " w-24 h-24"}   mx-auto rounded-full object-cover mb-4 border-4 border-white -mt-10`}
            />
          ) : (
            <div
              className="w-32 h-32 rounded-full mb-4 flex items-center justify-center text-white text-sm font-semibold"
              style={{ backgroundColor: bannerBgColor }}
            >
              No Image
            </div>
          )}

          {/* Name, Title, Summary */}
          <div className="border p-3 w-full flex flex-col items-center mb-4 bg-white rounded-sm">
            <p className={`text-xs text-center text-gray-800`}>{title}</p>
            <div className="flex gap-1 justify-center font-semibold mb-2">
              <span>{name}</span> <span>{surname}</span>
            </div>
            <p className="text-sm text-center">{summary}</p>
            <button
              className="mx-auto text-white px-3 mt-3 text-sm py-1 rounded-full"
              style={{ backgroundColor: iconColor }}
              onClick={onAddContact} // Add this line
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
    </>
  );
};

export default Template1;
