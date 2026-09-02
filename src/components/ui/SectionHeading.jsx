import React from "react";

const SectionHeading = ({
  title,
  subHeading,
  smallHead,
  align = "center",
  highlight,
}) => {
  const alignmentClass = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  };

  // Function to highlight word
  const renderTitle = () => {
    if (!highlight) return title;

    const parts = title.split(new RegExp(`(${highlight})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-blue-500">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className={`mb-4 flex flex-col ${alignmentClass[align]}`}>
      {smallHead && (
        <span className="text-blue-500 font-semibold text-sm mb-3">
          {smallHead}
        </span>
      )}

      <h2 className="text-2xl md:text-4xl mb-3 font-semibold max-w-4xl">{renderTitle()}</h2>

      {subHeading && (
        <p className="text-base max-w-3xl text-gray-700">{subHeading}</p>
      )}
    </div>
  );
};

export default SectionHeading;
