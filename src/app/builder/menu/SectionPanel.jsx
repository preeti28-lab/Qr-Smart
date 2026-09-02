import { IoMdArrowBack } from "react-icons/io";
import AllAllergens from "./AllAllergens";
import { allergyImages as allergyIcons } from "./constant";
import Opening from "./Opening";

const SectionPanel = ({
  isOpen,
  onClose,
  sections,
  activeIndex,
  setActiveIndex,
  sectionRefs,
  bgColor,
  currentFormData,
  secondColor,
  isScanPage,
}) => {
  const hexToRgba = (hex, opacity) => {
    const cleanHex = hex.replace("#", "");

    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div
      className={`absolute top-0 right-0 w-[96%] h-full bg-white z-50 flex flex-col transform transition-transform duration-300 ${
        isOpen
          ? `translate-x-0 ${isScanPage ? "-right-1" : "right-1"}`
          : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div
        className="p-3 flex justify-between items-center pb-5"
        style={{ background: bgColor }}
      >
        <p
          className="font-semibold border cursor-pointer border-black rounded-full p-[2px]"
          onClick={onClose}
        >
          <IoMdArrowBack />
        </p>
        {/* <button onClick={onClose}>Close</button> */}
      </div>

      {/* Content */}
      <div
        className={`overflow-y-auto ${isScanPage ? "min-h-[90%] pb-2" : "h-[calc(100%-100px)]"} p-3 bg-white -mt-3 rounded-tl-2xl rounded-tr-2xl`}
      >
        <div className="mb-2">
          {sections?.map((section, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={index}
                className="px-3 py-1 text-[9px] whitespace-nowrap transition-all rounded-tl-lg rounded-tr-lg"
                style={{
                  color: secondColor,
                  borderBottom: isActive ? `2px solid ${secondColor}` : "none",
                  backgroundColor: isActive
                    ? hexToRgba(secondColor, 0.15)
                    : "transparent",
                }}
                onClick={() => {
                  setActiveIndex(index);
                  sectionRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                {section.sectionName}
              </button>
            );
          })}
        </div>
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="mb-6"
          >
            <p className="font-semibold text-base mb-2 text-left">
              {section.sectionName}
            </p>

            {section.products.map((product, i) => {
              const productAllergens = (product.allergies || [])
                .map((allergen) =>
                  allergyIcons.find(
                    (item) =>
                      item.name.toLowerCase() === allergen.toLowerCase(),
                  ),
                )
                .filter(Boolean);

              return (
                <div key={i} className="border p-2 rounded mb-2 text-left">
                  <p className="font-semibold text-sm ">
                    {product.productName || "Unnamed"}
                  </p>

                  <p className="text-xs text-black pt-1 italic">
                    {product.productTranslatedName}
                  </p>

                  <p className="text-xs text-black pt-1">
                    {product.productDescription}
                  </p>

                  {/* ✅ Pricing */}
                  <div className="pt-1">
                    {product.multiPrice ? (
                      <div className="flex  gap-2">
                        {product.prices?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col justify-between items-center text-xs"
                          >
                            <span className="text-gray-600">{item.size}</span>
                            <span
                              className="font-medium"
                              style={{ color: secondColor }}
                            >
                              {item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      product.singlePrice && (
                        <p className="text-xs font-medium">
                          ₹ {product.singlePrice}
                        </p>
                      )
                    )}
                  </div>

                  {/* ✅ Allergens */}
                  {productAllergens.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {productAllergens.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 text-[10px]  rounded"
                        >
                          <img
                            src={item.src}
                            alt={item.name}
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <AllAllergens sections={sections} />
        <Opening
          currentFormData={currentFormData}
          bgColor={bgColor}
          iconColor={secondColor}
          iconBgColor={"#f0f0f0"}
        />
      </div>
    </div>
  );
};

export default SectionPanel;
