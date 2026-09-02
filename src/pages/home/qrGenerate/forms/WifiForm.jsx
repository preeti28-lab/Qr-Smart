import React from "react";
import QRDesignTabs from "../../../../components/ui/QRDesignTabs";
import StepHeading from "../../../../components/ui/StepHeading";

const WifiForm = ({ wifiData, setWifiData }) => {

  const handleChange = (field, value) => {
    setWifiData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full rounded-xl shadow-sm space-y-12">
      <div className="space-y-4">
        <StepHeading number="1" text="Complete the content" />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          
          {/* SSID */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Network name (SSID)
            </label>

            <input
              type="text"
              placeholder="E.g. Wifi home"
              value={wifiData.networkName}
              onChange={(e) => handleChange("networkName", e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Network password
            </label>

            <input
              type="text"
              placeholder="E.g. Mypassword"
              value={wifiData.networkPassword}
              onChange={(e) =>
                handleChange("networkPassword", e.target.value)
              }
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Encryption Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Encryption
            </label>

            <select
              value={wifiData.encryptionType}
              onChange={(e) =>
                handleChange("encryptionType", e.target.value)
              }
              className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="WPA/WPA2">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="None">None</option>
            </select>
          </div>

          {/* Hidden Network Checkbox */}
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              checked={wifiData.isHiddenNetwork}
              onChange={(e) =>
                handleChange("isHiddenNetwork", e.target.checked)
              }
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">Hidden network</label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WifiForm;