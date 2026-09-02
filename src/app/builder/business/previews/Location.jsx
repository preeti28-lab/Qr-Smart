import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Location = ({ currentFormData, iconColor, iconBgColor }) => {
  if (!currentFormData) return null;

  const {
    street,
    number,
    city,
    state,
    country,
    mode,
    locationUrl,
    latitude,
    longitude,
  } = currentFormData;

  // 🔥 Generate URL based on mode
  const getMapUrl = () => {
    if (mode === "url" && locationUrl) {
      return locationUrl;
    }

    if (mode === "coords" && latitude && longitude) {
      return `https://www.google.com/maps?q=${latitude},${longitude}`;
    }

    // default → manual
    const address = [street, number, city, state, country]
      .filter(Boolean)
      .join(", ");

    if (!address) return null;

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
  };

  const googleMapsUrl = getMapUrl();

  // ❗ Optional: hide component if no valid location
  // if (!googleMapsUrl) return null;

  return (
    <div className="bg-white rounded-md p-2 flex items-center gap-2 shadow-sm mt-2">
      {/* Location icon */}
      <div className="flex items-center">
        <p className="p-1.5 rounded" style={{ backgroundColor: iconBgColor }}>
          <FaMapMarkerAlt className="text-sm" style={{ color: iconColor }} />
        </p>
      </div>

      {/* Address & Show on Map link */}
      <div>
        <p className="text-gray-700 text-xs">
          {mode === "manual"
            ? `${street || ""} ${number || ""}`
            : mode === "coords"
              ? `${latitude || ""}, ${longitude || ""}`
              : "View Location"}
        </p>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium hover:underline"
        >
          Show on Map
        </a>
      </div>
    </div>
  );
};

export default Location;
