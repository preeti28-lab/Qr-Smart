import React, { useMemo } from "react";
import { facilitiesList } from "../../constants/staticData";

const Facilities = ({ currentFormData }) => {
  if (!currentFormData) return null;

  console.log(currentFormData)

  // Use useMemo to compute selected facilities whenever currentFormData.facilities changes
  const selectedFacilities = useMemo(() => {
    // Ensure we get an array
    const selectedNames = Array.isArray(currentFormData.facilities?.[0])
      ? currentFormData.facilities[0]
      : currentFormData.facilities || [];

    return facilitiesList.filter((item) => selectedNames.includes(item.name));
  }, [currentFormData.facilities]);

  if (selectedFacilities?.length === 0) {
    return;
  }

  return (
    <div className="bg-white rounded-md p-2 flex mt-2 flex-col flex-wrap gap-1 shadow-sm">
      <p className="text-sm font-semibold text-left">Facilities</p>
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
