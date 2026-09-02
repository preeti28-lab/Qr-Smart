import React from "react";
import { facilitiesList } from "../../../../constants/staticData";

const Facilities = ({
  currentFormData,
  iconColor,
  iconBgColor,
  isScanPage,
}) => {
  if (!currentFormData) return null;

  console.log(currentFormData.facilities);

  // Handle facilities format based on isScanPage
  const selectedNames = isScanPage
    ? currentFormData.facilities || []        // flat array
    : currentFormData.facilities?.[0] || [];  // nested array

  // Filter facilitiesList to only include selected ones
  const selectedFacilities = facilitiesList.filter((item) =>
    selectedNames.includes(item?.name),
  );

  return (
    <div className="bg-white rounded-md p-2 flex mt-2 text-left flex-col flex-wrap gap-3 shadow-sm">
      <p className="text-sm font-semibold">Facilities</p>

      <div className="flex flex-wrap">
        {selectedFacilities.map((facility) => {
          const Icon = facility.icon;

          return (
            <div
              key={facility.name}
              className="flex items-center p-1 justify-center rounded-full text-gray-600"
              title={facility.name}
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