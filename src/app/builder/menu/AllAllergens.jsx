import React from "react";
import { allergyImages as allergyIcons } from "./constant";

const AllAllergens = ({ sections }) => {
  const allAllergens = Array.from(
    new Set(
      sections?.flatMap((section) =>
        section.products?.flatMap((product) => product.allergies || [])
      )
    )
  );

  const allergenWithIcons = allAllergens
    .map((allergen) => allergyIcons.find((item) => item.name === allergen))
    .filter(Boolean);

  return (
    <>
      {allergenWithIcons.length > 0 && (
        <div className="border rounded-md p-3">
          <div className="bg-white rounded-2xl">
            <p className="text-sm font-semibold mb-2 text-left">Allergens</p>

            <div className="grid grid-cols-2 gap-2">
              {allergenWithIcons.map((item, index) => (
                <div key={index} className="flex gap-1 items-center text-xs">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-6 h-6 object-contain"
                  />
                  <span className="mt-1 text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllAllergens;