import React, { useEffect, useState } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { FiPhone, FiMail, FiGlobe } from "react-icons/fi";
import { MdOutlineWork } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import Template5 from "./templates/Template5";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";

const PreviewScreen = ({ currentFormData, isScanPage, isEditMode }) => {
  const [profileSrc, setProfileSrc] = useState("");
  const dispatch = useDispatch();
  console.log(currentFormData);

  // Dynamic colors from bannerColor
  const bannerBgColor = currentFormData?.bannerColor?.[0] || "#F3F4F6"; // default light gray
  const iconColor = currentFormData?.bannerColor?.[1] || "#22C55E"; // default green

  useEffect(() => {
    let objectUrl;

    const hasNewUpload =
      currentFormData?.profileImg?.length &&
      currentFormData.profileImg[0]?.file instanceof Blob;

    // ✅ 1. If user uploaded new image → ALWAYS PRIORITY
    if (hasNewUpload) {
      objectUrl = URL.createObjectURL(currentFormData.profileImg[0].file);
      setProfileSrc(objectUrl);

      return () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }

    // ✅ 2. Scan mode OR Edit mode → fetch from API
    if ((isScanPage || isEditMode) && currentFormData?.imageUrl) {
      const imageName = currentFormData.imageUrl.split("/").pop();

      if (!imageName) {
        setProfileSrc("https://img.qrfy.com/img/original/mockup_vcard_v2.webp");
        return;
      }

      dispatch(
        getThePDFPrevImage(imageName, (err, blob) => {
          if (!err && blob) {
            objectUrl = URL.createObjectURL(blob);
            setProfileSrc(objectUrl);
          } else {
            setProfileSrc(
              "https://img.qrfy.com/img/original/mockup_vcard_v2.webp",
            );
          }
        }),
      );

      return () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    }

    // ✅ 3. Fallback default
    setProfileSrc("https://img.qrfy.com/img/original/mockup_vcard_v2.webp");
  }, [
    currentFormData?.profileImg,
    currentFormData?.imageUrl,
    isScanPage,
    isEditMode,
    dispatch,
  ]);
  if (!currentFormData || Object.keys(currentFormData).length === 0) {
    return <EmptyPreview />;
  }

  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const scrollToSection = (ref) => {
    ref?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const {
    name,
    surname,
    title,
    summary,
    footerText,
    phones,
    emails,
    websites,
    platforms,
    textAlign,
    selectedTemplate,
    bannerColor,

    location,
  } = currentFormData || {};

  const mode = currentFormData?.mode ?? currentFormData?.location?.mode;
  const locationUrl =
    currentFormData?.locationUrl ?? currentFormData?.location?.locationUrl;
  const latitude =
    currentFormData?.latitude ?? currentFormData?.location?.latitude;
  const longitude =
    currentFormData?.longitude ?? currentFormData?.location?.longitude;

  const street = currentFormData?.street ?? currentFormData?.location?.street;
  const number = currentFormData?.number ?? currentFormData?.location?.number;
  const postalCode =
    currentFormData?.postalCode ?? currentFormData?.location?.postalCode;
  const city = currentFormData?.city ?? currentFormData?.location?.city;
  const state = currentFormData?.state ?? currentFormData?.location?.state;
  const country =
    currentFormData?.country ?? currentFormData?.location?.country;

  console.log(mode);

  const getPhoneIcon = (type) => {
    switch (type) {
      case "mobile":
        return <FiPhone size={14} style={{ color: iconColor }} />;
      case "work":
        return <MdOutlineWork size={14} style={{ color: iconColor }} />;
      default:
        return <FiPhone size={14} style={{ color: iconColor }} />;
    }
  };

  const values = Object.values(currentFormData || {});

  const hasAnyValue = values.some((value) => {
    if (Array.isArray(value)) return value.length > 0; // handle arrays
    return value !== null && value !== undefined && value !== "";
  });

  const getMapUrl = () => {
    if (mode === "url" && locationUrl) {
      return locationUrl;
    }

    if (mode === "coords" && latitude && longitude) {
      return `https://www.google.com/maps?q=${latitude},${longitude}`;
    }

    const addressParts = [
      street,
      number,
      postalCode,
      city,
      state,
      country,
    ].filter(Boolean);

    if (addressParts.length === 0) return null;

    const address = encodeURIComponent(addressParts.join(", "));
    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  };

  const googleMapsUrl = getMapUrl();

  if (!hasAnyValue) {
    return <EmptyPreview />;
  }

  const handleAddToContacts = () => {
    if (!isScanPage) return;

    // Create vCard v3.0 format
    let vcard = `BEGIN:VCARD\nVERSION:3.0\n`;

    // Name (FN and N fields)
    if (name || surname) {
      vcard += `FN:${name || ""} ${surname || ""}\n`;
      vcard += `N:${surname || ""};${name || ""};;;\n`;
    }

    // Title/Job title
    if (title) vcard += `TITLE:${title}\n`;

    // Summary/Note
    if (summary) vcard += `NOTE:${summary}\n`;

    // Phone numbers
    phones?.forEach((phone) => {
      const type =
        phone.type === "work"
          ? "WORK"
          : phone.type === "home"
            ? "HOME"
            : "CELL";
      vcard += `TEL;TYPE=${type}:${phone.number}\n`;
      if (phone.label) vcard += `X-ABLabel:${phone.label}\n`;
    });

    // Emails
    emails?.forEach((email) => {
      vcard += `EMAIL:${email.email}\n`;
      if (email.label) vcard += `X-ABLabel:${email.label}\n`;
    });

    // Websites
    websites?.forEach((website) => {
      vcard += `URL:${website.url}\n`;
      if (website.label) vcard += `X-ABLabel:${website.label}\n`;
    });

    // Companies
    currentFormData?.companies?.forEach((company) => {
      vcard += `ORG:${company.companyName}\n`;
      if (company.profession) vcard += `TITLE:${company.profession}\n`;
    });

    // Address (only if manual mode and show is true)
    if (
      currentFormData?.location?.mode === "manual" &&
      currentFormData?.location?.show
    ) {
      const { street, number, postalCode, city, state, country } =
        currentFormData;
      const fullAddress = [
        street,
        number,
        `${postalCode} ${city}`,
        state,
        country,
      ]
        .filter(Boolean)
        .join(", ");
      if (fullAddress) vcard += `ADR:;;${fullAddress}\n`;
    }

    vcard += `END:VCARD`;

    // Create and trigger download
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name || "contact"}_${surname || ""}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`${selectedTemplate === 0 ? "p-4" : ""}  ${isScanPage && "!min-h-[100dvh] relative"} min-h-full flex flex-col items-center w-full `}
      style={{ backgroundColor: bannerBgColor }}
    >
      {/* Profile Image */}
      {selectedTemplate === 0 && (
        <>
          {profileSrc ? (
            <img
              src={profileSrc}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-gray-300"
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
            {footerText && (
              <button
                className="mx-auto text-white px-3 mt-3 text-sm py-1 rounded-full"
                style={{ backgroundColor: iconColor }}
                onClick={handleAddToContacts}
              >
                {footerText}
              </button>
            )}
            <div className="flex justify-center gap-2 mt-3">
              <IoCall
                style={{ color: iconColor, cursor: "pointer" }}
                onClick={() => scrollToSection(phoneRef)}
              />
              <IoMdMail
                style={{ color: iconColor, cursor: "pointer" }}
                onClick={() => scrollToSection(emailRef)}
              />
            </div>
          </div>
        </>
      )}

      {selectedTemplate === 1 && (
        <Template1
          profile={profileSrc}
          bannerBgColor={bannerBgColor}
          title={title}
          name={name}
          surname={surname}
          summary={summary}
          footerText={footerText}
          iconColor={iconColor}
          onPhoneClick={() => scrollToSection(phoneRef)}
          onEmailClick={() => scrollToSection(emailRef)}
          onAddContact={handleAddToContacts} // Add this line
          isScanPage={isScanPage}
        />
      )}
      {selectedTemplate === 2 && (
        <Template2
          profile={profileSrc}
          bannerBgColor={bannerBgColor}
          title={title}
          name={name}
          surname={surname}
          summary={summary}
          footerText={footerText}
          iconColor={iconColor}
          onPhoneClick={() => scrollToSection(phoneRef)}
          onEmailClick={() => scrollToSection(emailRef)}
          onAddContact={handleAddToContacts} // Add this line
          isScanPage={isScanPage}
        />
      )}
      {selectedTemplate === 3 && (
        <Template3
          profile={profileSrc}
          bannerBgColor={bannerBgColor}
          title={title}
          name={name}
          surname={surname}
          summary={summary}
          footerText={footerText}
          iconColor={iconColor}
          onPhoneClick={() => scrollToSection(phoneRef)}
          onEmailClick={() => scrollToSection(emailRef)}
          onAddContact={handleAddToContacts} // Add this line
        />
      )}
      {selectedTemplate === 4 && (
        <Template4
          profile={profileSrc}
          bannerBgColor={bannerBgColor}
          title={title}
          name={name}
          surname={surname}
          summary={summary}
          footerText={footerText}
          iconColor={iconColor}
          onPhoneClick={() => scrollToSection(phoneRef)}
          onEmailClick={() => scrollToSection(emailRef)}
          onAddContact={handleAddToContacts} // Add this line
        />
      )}

      {selectedTemplate === 5 && (
        <Template5
          profile={profileSrc}
          bannerBgColor={bannerBgColor}
          title={title}
          name={name}
          surname={surname}
          summary={summary}
          footerText={footerText}
          iconColor={iconColor}
          onPhoneClick={() => scrollToSection(phoneRef)}
          onEmailClick={() => scrollToSection(emailRef)}
          onAddContact={handleAddToContacts} // Add this line
        />
      )}

      {/* Phones */}
      {phones?.length > 0 && (
        <div
          ref={phoneRef}
          className={`w-full mb-4 bg-white rounded-sm ${selectedTemplate !== 0 && "!w-[85%] mx-auto"}`}
        >
          {phones?.length > 0 && (
            <div className="flex flex-col gap-2 border p-3">
              {phones.map((phone, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 border-b last:border-b-0 pb-2"
                >
                  <div
                    className="flex-shrink-0 p-2 rounded-md"
                    style={{ backgroundColor: `${bannerBgColor}33` }} // 33 = ~20% opacity
                  >
                    {getPhoneIcon(phone.type)}
                  </div>
                  <div className="flex flex-col text-gray-700 text-sm break-words text-left">
                    <span className="font-semibold text-xs">{phone.label}</span>
                    <span className="text-gray-500 text-xs">
                      {phone.number}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Emails */}
      {emails?.length > 0 && (
        <div
          ref={emailRef}
          className={`w-full mb-4 bg-white rounded-sm ${selectedTemplate !== 0 && "!w-[85%] mx-auto"}`}
        >
          <div className="flex flex-col gap-2 border p-3">
            {emails.map((email, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 border-b last:border-b-0 pb-2"
              >
                <div
                  className="flex-shrink-0 p-2 rounded-md"
                  style={{ backgroundColor: `${bannerBgColor}33` }} // 33 = ~20% opacity
                >
                  <FiMail size={14} style={{ color: iconColor }} />
                </div>
                <div className="flex flex-col text-gray-700 text-sm break-words text-left">
                  <span className="font-semibold text-xs break-all">
                    {email.label}
                  </span>
                  <span className="text-gray-500 text-xs break-all">
                    {email.email}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Websites */}
      {websites?.length > 0 && (
        <div
          className={`w-full mb-4 bg-white rounded-sm ${selectedTemplate !== 0 && "!w-[85%] mx-auto"}`}
        >
          <div className="flex flex-col gap-2 border p-3">
            {websites.map((website, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 border-b last:border-b-0 pb-2"
              >
                <div
                  className="flex-shrink-0 p-2 rounded-md"
                  style={{ backgroundColor: `${bannerBgColor}33` }} // 33 = ~20% opacity
                >
                  <CgWebsite size={14} style={{ color: iconColor }} />
                </div>
                <div className="flex flex-col text-gray-700 text-sm break-words text-left">
                  <span className="font-semibold text-xs break-all">
                    {website.label}
                  </span>
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 text-xs  break-all"
                  >
                    {website.url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Companies */}
      {currentFormData?.companies?.length > 0 && (
        <div
          className={`w-full mb-4 bg-white rounded-sm ${selectedTemplate !== 0 && "!w-[85%] mx-auto"}`}
        >
          <div className="flex flex-col gap-2 border p-3">
            {currentFormData.companies.map((company, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 border-b last:border-b-0 pb-2"
              >
                <div
                  className="flex-shrink-0 p-2 rounded-md"
                  style={{ backgroundColor: `${bannerBgColor}33` }}
                >
                  <MdOutlineWork size={14} style={{ color: iconColor }} />
                </div>
                <div className="flex flex-col text-gray-700 text-sm break-words text-left">
                  <span className="font-semibold text-xs break-all">
                    {company.companyName}
                  </span>
                  <span className="text-gray-500 text-xs break-all">
                    {company.profession}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Address */}
      {googleMapsUrl && (
        <div
          className={`w-full mb-4 bg-white rounded-sm ${
            selectedTemplate !== 0 && "!w-[85%] mx-auto"
          }`}
        >
          <div className="flex items-start gap-3 border p-3 rounded-md">
            <div
              className="flex-shrink-0 p-2 rounded-md"
              style={{ backgroundColor: `${bannerBgColor}33` }}
            >
              <FaLocationDot size={14} style={{ color: iconColor }} />
            </div>

            <div className="flex flex-col text-gray-700 text-sm break-words text-left">
              <span className="font-semibold text-xs">Address</span>

              {/* ✅ SHOW ONLY FOR MANUAL */}
              {mode === "manual" && (
                <>
                  <span className="text-gray-500 text-xs">
                    {[currentFormData.street, currentFormData.number]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {[currentFormData.postalCode, currentFormData.city]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {[currentFormData.state, currentFormData.country]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </>
              )}

              {/* ✅ COORDS MODE */}
              {mode === "coords" && (
                <span className="text-gray-500 text-xs">
                  {latitude} , {longitude}
                </span>
              )}

              {/* ✅ URL MODE */}
              {mode === "url" && (
                <span className="text-gray-500 text-xs">
                  View location link
                </span>
              )}

              {/* Show on Map */}
              <button
                onClick={() => window.open(googleMapsUrl, "_blank")}
                className="text-xs underline mt-1 text-left"
                style={{ color: iconColor }}
              >
                Show on map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Platforms */}
      {platforms && Object.keys(platforms).length > 0 && (
        <div className={`w-full mb-4 `}>
          <div className="flex gap-4 justify-center p-3 flex-wrap">
            {Object.entries(platforms).map(([key, platform], idx) => {
              let IconComponent;
              console.log(platform);
              let colorClass = "text-blue-500"; // default color

              switch (key) {
                case "twitter":
                  IconComponent = FaTwitter;
                  colorClass = "text-blue-400";
                  break;
                case "linkedin":
                  IconComponent = FaLinkedin;
                  colorClass = "text-blue-700";
                  break;
                case "youtube":
                  IconComponent = FaYoutube;
                  colorClass = "text-red-600";
                  break;
                default:
                  IconComponent = FiGlobe;
                  colorClass = "text-gray-500";
              }

              return (
                <a
                  key={idx}
                  href={platform?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center hover:scale-110 transition-transform"
                >
                  <div className={` rounded-full`}>
                    <IconComponent size={18} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewScreen;
