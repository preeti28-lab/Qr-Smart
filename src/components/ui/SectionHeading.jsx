import React from "react";

const SectionHeading = ({
  title,
  subHeading,
  smallHead,
  align = "center",
  highlight,
  titleClassName = "text-2xl md:text-4xl",
  subHeadingClassName = "",
  // Renders a short rule on either side of the small head (see the
  // "QR Codes for" eyebrow on the home page).
  smallHeadLines = false,
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
        <span key={index} className="text-blue-600">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className={`mb-4 flex flex-col ${alignmentClass[align]}`}>
      {smallHead &&
        (smallHeadLines ? (
          <span className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-blue-300" />
            <span className="text-blue-600 font-semibold text-sm">
              {smallHead}
            </span>
            <span className="h-px w-8 bg-blue-300" />
          </span>
        ) : (
          <span className="text-blue-600 font-semibold text-sm mb-3">
            {smallHead}
          </span>
        ))}

      <h2
        className={`${titleClassName} mb-3 font-bold text-slate-900 tracking-tight max-w-4xl`}
      >
        {renderTitle()}
      </h2>

      {subHeading && (
        <p className={`text-base max-w-3xl text-slate-500 ${subHeadingClassName}`}>
          {subHeading}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
