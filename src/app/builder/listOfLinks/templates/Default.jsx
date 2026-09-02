import React from "react";

const Default = ({ title, description, logo }) => {
  const logoSrc =
    logo?.[0]?.preview ||
    "https://img.qrfy.com/img/original/mockup_social_logo_v2.webp";

  return (
    <div className="pt-5">
      <img
        src={logoSrc}
        className="w-[120px] h-[120px] rounded-full mx-auto border-8 object-cover"
      />
      <h2 className="font-bold text-lg  mb-1 mt-3 text-white text-center">
        {title}
      </h2>
      <p className="text-sm text-center text-white">{description}</p>
    </div>
  );
};

export default Default;
