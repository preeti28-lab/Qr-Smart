// PreviewScreen.jsx
import React, { useEffect, useState } from "react";
import EmptyPreview from "../../../components/ui/EmptyPreview";
import { FaPhone } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoIosGlobe } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BsCalendarEventFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import Facilities from "../../../components/builder/Facilities";
import { useDispatch } from "react-redux";
import { getThePDFPrevImage } from "../../../redux/features/qrcodes";

const defaultBannerSrc =
  "https://img.qrfy.com/img/original/mockup_event_v2.webp";

const PreviewScreen = ({
  currentFormData,
  isScanPage,
  isEditMode,
  fetchedImg,
}) => {
  const dispatch = useDispatch();

  const bgColor = currentFormData?.bannerColor?.[0] || "#f3f4f6";
  const secondColor = currentFormData?.bannerColor?.[1] || "#16a34a";
  const iconBgColor = `${bgColor}33`;

  const {
    since,
    until,
    sinceTime,
    untilTime,
    timeFormat,
    street,
    number,
    city,
    state,
    country,
    postalCode,
    name,
    website,
    phones,
    emails,
    summary,
    calendar,
    title,
    description,
    buttonText,
    buttonLink,
  } = currentFormData || {};

  const [imageSrc, setImageSrc] = useState(
    isEditMode && fetchedImg ? fetchedImg : defaultBannerSrc,
  );

  useEffect(() => {
    if (!currentFormData) {
      setImageSrc(defaultBannerSrc);
      return;
    }

    if (isScanPage && currentFormData?.imageUrl) {
      const imageName = currentFormData.imageUrl.split("/").pop();
      dispatch(
        getThePDFPrevImage(imageName, (err, blob) => {
          if (!err && blob) {
            setImageSrc(URL.createObjectURL(blob));
          } else {
            setImageSrc(defaultBannerSrc);
          }
        }),
      );
    } else {
      setImageSrc(defaultBannerSrc);
    }

    // 1. If `currentFormData.image` already has a local banner, use it
    if (currentFormData.image?.[0]?.preview || currentFormData.image?.length) {
      const bannerSrc = currentFormData.image?.[0]?.preview || defaultBannerSrc;
      setImageSrc(bannerSrc);
      return;
    }

    // 2. In create mode, or no banner at all: fall back to default
    if (!isEditMode) {
      setImageSrc(defaultBannerSrc);
      return;
    }

    // 3. In edit mode, and `fetchedImg` is provided (from API), use that
    if (isEditMode && fetchedImg) {
      setImageSrc(fetchedImg);
      return;
    }

    // 4. Optional: only hit API if `isScanPage` and no `imageSrc` yet
  }, [currentFormData, fetchedImg, isScanPage, isEditMode, dispatch]);

  if (!currentFormData || Object.keys(currentFormData).length === 0) {
    return <EmptyPreview />;
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateStr, format = "24") => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: format === "12",
    });
  };

  const formatAddress = () => {
    const parts = [
      street && `${street} ${number || ""}`,
      city,
      state,
      country,
      postalCode,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const getTimezone = () => {
    const offset = -new Date().getTimezoneOffset();
    const hours = String(Math.floor(offset / 60)).padStart(2, "0");
    const minutes = String(offset % 60).padStart(2, "0");
    return `GMT+${hours}:${minutes}`;
  };

  const getGoogleCalendarLink = () => {
    if (!sinceTime || !untilTime) return "#";

    const pad = (n) => String(n).padStart(2, "0");

    const formatDateForGCal = (date) => {
      const d = new Date(date);
      const YYYY = d.getUTCFullYear();
      const MM = pad(d.getUTCMonth() + 1);
      const DD = pad(d.getUTCDate());
      const hh = pad(d.getUTCHours());
      const mm = pad(d.getUTCMinutes());
      const ss = pad(d.getUTCSeconds());
      return `${YYYY}${MM}${DD}T${hh}${mm}${ss}Z`;
    };

    const start = formatDateForGCal(sinceTime);
    const end = formatDateForGCal(untilTime);

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: calendar || "Event",
      dates: `${start}/${end}`,
      details: summary || "",
      location: formatAddress() || "",
    });

    return `https://www.google.com/calendar/render?${params.toString()}`;
  };

  const getMapUrl = () => {
    if (currentFormData?.mode === "url" && currentFormData?.locationUrl) {
      return currentFormData.locationUrl;
    }

    if (
      currentFormData?.mode === "coords" &&
      currentFormData?.latitude &&
      currentFormData?.longitude
    ) {
      return `https://www.google.com/maps?q=${currentFormData.latitude},${currentFormData.longitude}`;
    }

    const address = formatAddress();
    if (!address) return null;

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
  };

  const googleMapsUrl = getMapUrl();

  const latitude = currentFormData.latitude;
  const longitude = currentFormData.longitude;

  return (
    <div className="min-h-full">
      {imageSrc && (
        <img src={imageSrc} className="h-[15rem] w-full object-cover" />
      )}
      <div
        className={`rounded-tl-3xl rounded-tr-3xl py-3 px-5 ${
          imageSrc ? "-mt-4 z-10 relative" : ""
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex flex-col items-center gap-y-2 justify-center">
          <p className="font-semibold">{title}</p>
          <span className="text-center text-sm">{description}</span>
          <a
            href={buttonLink}
            target="blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-full text-sm text-white"
            style={{ backgroundColor: secondColor }}
          >
            {buttonText}
          </a>
        </div>

        <div className="flex items-start gap-2 p-2 bg-white rounded-md mt-3">
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: iconBgColor }}
          >
            <BsCalendarEventFill size={15} color={secondColor} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold">When</span>
            <span className="text-[12px]">{formatDate(since)}</span>
            <span className="text-[12px]">{formatDate(until)}</span>
          </div>
        </div>

        <div className="flex items-start gap-2 p-2 bg-white rounded-md mt-3">
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: iconBgColor }}
          >
            <IoCall size={15} color={secondColor} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-left">Schedule</span>
            {sinceTime && untilTime ? (
              <span className="text-[12px]">
                {formatTime(sinceTime, timeFormat)} -{" "}
                {formatTime(untilTime, timeFormat)} ({getTimezone()})
              </span>
            ) : (
              <span className="text-[13px] text-gray-400">
                Time not available
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start gap-2 p-2 bg-white rounded-md mt-3">
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: iconBgColor }}
          >
            <IoLocationOutline size={15} color={secondColor} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-left">Location</span>
            {googleMapsUrl ? (
              <>
                <span className="text-[11px]">
                  {currentFormData?.mode === "coords"
                    ? `${latitude || ""}, ${longitude || ""}`
                    : formatAddress() || ""}
                </span>
                <a
                  href={
                    currentFormData?.mode === "url"
                      ? googleMapsUrl
                      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          formatAddress(),
                        )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] underline mt-1"
                  style={{ color: bgColor }}
                >
                  Show on map
                </a>
              </>
            ) : (
              <span className="text-[13px] text-gray-400">
                Location not available
              </span>
            )}
          </div>
        </div>

        <Facilities currentFormData={currentFormData} bgColor={bgColor} />

        <div className="flex items-start gap-2 p-2 bg-white rounded-md mt-3">
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: iconBgColor }}
          >
            <IoLocationOutline size={15} color={secondColor} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-left">Organizer</span>
            <span className="text-[12px]">{name}</span>
          </div>
        </div>

        {/* PHONE */}
        <div className="flex items-start gap-2 p-2 bg-white rounded-md mt-3">
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: iconBgColor }}
          >
            <FaPhone size={15} color={secondColor} />
          </div>
          <div className="flex flex-col">
            {phones?.map((phone, index) => (
              <div key={index} className="flex flex-col mb-1">
                <span className="text-[10px] font-bold text-left">
                  {phone.title || "Mobile Phone"}
                </span>
                <a
                  href={`tel:${phone.number}`}
                  className="text-[12px] break-all"
                >
                  {phone.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex items-start gap-2 p-2 bg-white rounded-md mt-3">
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: iconBgColor }}
          >
            <MdEmail size={15} color={secondColor} />
          </div>
          <div className="flex flex-col">
            {emails?.map((email, index) => (
              <div key={index} className="flex flex-col mb-1">
                <span className="text-[10px] font-bold text-left">
                  {email.emailLabel || "Email"}
                </span>
                <a
                  href={`mailto:${email.email}`}
                  className="text-[12px] break-all"
                >
                  {email.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* WEBSITE */}
        <div className="flex items-start gap-2 p-2 bg-white rounded-md mt-3">
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: iconBgColor }}
          >
            <IoIosGlobe size={15} color={secondColor} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col mb-1 text-left">
              <span className="text-[10px] font-bold">Website</span>
              <a
                href={
                  website?.startsWith("http") ? website : `https://${website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] break-all leading-3"
              >
                {website}
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 p-2 bg-white rounded-md mt-3">
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-left">About Us</p>
            <p className="text-xs mt-2">{summary}</p>
          </div>
        </div>

        <div className="flex justify-center pt-3">
          <a
            href={getGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-full text-sm text-white flex items-center gap-1"
            style={{ backgroundColor: secondColor }}
          >
            <BsCalendarEventFill size={12} color="white" />
            {calendar || "Add to Calendar"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;
