import React from "react";
import EmptyPreview from "../../../../components/ui/EmptyPreview";
import { FaWifi } from "react-icons/fa";

const PreviewScreen = ({ currentFormData }) => {
  const { networkName } = currentFormData || {};
  if (!currentFormData || Object.keys(currentFormData).length === 0) {
    return <EmptyPreview />;
  }

  const { number, message } = currentFormData;

  return (
    <div
      className="p-4 min-h-full"
      style={{
        background: `radial-gradient(169.69% 110.59% at 81.25% 16.81%, rgb(129, 118, 61) 0%, rgb(48, 46, 36) 100%)`,
      }}
    >
      <div className=" min-h-[65dvh]  flex items-center justify-center text-center">
        <div className="bg-white py-10 rounded-md flex justify-center  flex-col items-center px-3">
          <FaWifi size={30} />
          <p className="text-lg font-semibold">
            Join the “{networkName || "Hotel Bar"}” Wi-Fi network?
          </p>
          {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
          <button
            className="mt-2  w-full text-white px-4 py-1 rounded-full text-sm"
            style={{
              background: `radial-gradient(169.69% 110.59% at 81.25% 16.81%, rgb(129, 118, 61) 0%, rgb(48, 46, 36) 100%)`,
            }}
          >
            Connect
          </button>
          <button className="mt-2 w-full  text-brown-300 px-4 py-1 rounded-full border border-brown-300 text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;
