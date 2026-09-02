import React, { useRef } from "react";
import { MdOutlineBlock } from "react-icons/md";
import { FiUpload } from "react-icons/fi";

import whatsappLogo from "../../assets/whatsappLogo.png";
import linkLogo from "../../assets/linkLogo.png";
import locationLogo from "../../assets/locationLogo.png";
import wifiLogo from "../../assets/wifiLogo.png";
import emailLogo from "../../assets/emailLogo.png";
import scanLogo from "../../assets/scanLogo.png";
import bitcoinLogo from "../../assets/bitcoinLogo.png";

const logos = [
  { id: "none", label: "None", icon: <MdOutlineBlock size={35} />, value: "" },
  { id: "whatsapp", label: "WhatsApp", value: whatsappLogo },
  { id: "link", label: "Link", value: linkLogo },
  { id: "location", label: "Location", value: locationLogo },
  { id: "wifi", label: "Wi-Fi", value: wifiLogo },
  { id: "email", label: "Email", value: emailLogo },
  { id: "scan", label: "Scan", value: scanLogo },
  { id: "bitcoin", label: "Bitcoin", value: bitcoinLogo },
];

const QRLogos = ({
  selectedLogo,
  setSelectedLogo,
  customLogo,
  setCustomLogo,
}) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    console.log(e, "called");
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedLogo(imageUrl);
      setCustomLogo(e.target.files);
    }
    // ✅ Reset input so re-selecting any file triggers onChange again
    e.target.value = "";
  };

  return (
    <>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {logos.map((logo) => (
          <div
            key={logo.id}
            onClick={() => setSelectedLogo(logo.value)}
            className={`border-2 flex flex-col items-center justify-center p-3 cursor-pointer rounded-lg ${
              selectedLogo === logo.value ? "bg-blue-50" : ""
            }`}
          >
            {logo.icon ? (
              logo.icon
            ) : (
              <img
                src={logo.value}
                alt={logo.label}
                className="w-[38px] select-none"
              />
            )}
            <span className="text-xs mt-1">{logo.label}</span>
          </div>
        ))}

        {/* Upload Custom Logo */}
        {/* <div
          onClick={handleUploadClick}
          className="border-2 flex flex-col items-center justify-center p-3 cursor-pointer rounded-lg hover:bg-gray-50"
        >
          <FiUpload size={35} />
          <span className="text-xs mt-1">Upload</span>
        </div> */}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default QRLogos;
