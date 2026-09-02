import React from "react";
import { facilitiesList } from "../../../../constants/staticData";

const Facilities = ({ currentFormData, iconColor, iconBgColor }) => {
  if (!currentFormData) return null;

  // The facilities array is nested ([["Seat","Toilet"]])
  const selectedNames = currentFormData.facilities?.[0] || [];

  // Filter facilitiesList to only include selected ones
  const selectedFacilities = facilitiesList.filter((item) =>
    selectedNames.includes(item.name),
  );

  return (
    <div className="bg-white rounded-md p-2 flex mt-2  flex-col flex-wrap gap-3 shadow-sm">
      <p className="text-sm font-semibold">Facilites</p>
      <div className="flex flex-wrap">
        {selectedFacilities.map((facility) => {
          const Icon = facility.icon; // Get the icon component
          return (
            <div
              key={facility.name}
              className=" flex items-center  p-1 justify-center  rounded-full text-gray-600"
              title={facility.name} // shows name on hover
            >
              <Icon size={15} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Facilities;
