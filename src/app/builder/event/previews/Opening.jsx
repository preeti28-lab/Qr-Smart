import React from "react";
import { FaClock, FaRegCheckCircle } from "react-icons/fa";
import { format } from "date-fns";

const Opening = ({ currentFormData, iconColor, iconBgColor }) => {
  const { openingHours = [], timeFormat = "24" } = currentFormData || {};

  const formatTime = (timeStr) => {
    if (!timeStr) return "-";
    const date = new Date(timeStr);
    return timeFormat === "12"
      ? format(date, "hh:mm a")
      : format(date, "HH:mm");
  };

  // Only keep enabled days
  const enabledDays = openingHours.filter((day) => day.enabled);

  return (
    <div className="bg-white rounded-md p-2 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <p className="p-1.5 rounded" style={{ backgroundColor: iconBgColor }}>
          <FaClock className="sm" style={{ color: iconColor }} />
        </p>
        <span className="font-semibold text-xs" >
          Opening Hours
        </span>
      </div>

      {/* Enabled Days */}
      <div className="space-y-2">
        {enabledDays.map((dayObj) => {
          const isToday =
            new Date().toLocaleDateString("en-US", { weekday: "long" }) ===
            dayObj.day;

          const slot = dayObj.slots[0] || {};
          const openTime = formatTime(slot.open);
          const closeTime = formatTime(slot.close);

          return (
            <div
              key={dayObj.day}
              className={`flex justify-between items-center ${
                isToday ? "font-semibold text-gray-800" : "text-gray-700"
              }`}
            >
              <span className="text-xs">{dayObj.day}</span>
              <span className="flex items-center gap-2 text-xs">
                {/* Optional check icon */}
                {openTime} - {closeTime}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Opening;
