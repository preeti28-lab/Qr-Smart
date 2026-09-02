import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Location = ({ currentFormData, iconColor, iconBgColor }) => {
  if (!currentFormData) return null;

  const { street, number, city, state, country } = currentFormData;

  // Combine address components into a single string for Google Maps
  const address = [street, number, city, state, country]
    .filter(Boolean)
    .join(", ");

  // Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

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
        <p className="text-gray-700 text-xs">{`${street || ""} ${number || ""}`}</p>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium hover:underline"
          // style={{ color: iconColor }}
        >
          Show on Map
        </a>
      </div>
    </div>
  );
};

export default Location;
