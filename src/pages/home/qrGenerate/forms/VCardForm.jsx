import React from "react";
import StepHeading from "../../../../components/ui/StepHeading";

const VCardForm = ({ vCardData, setVCardData }) => {
  const handleChange = (field, value) => {
    setVCardData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full rounded-xl shadow-sm space-y-6">
      <div className="space-y-4">
        <StepHeading number="1" text="Complete the content" />

        <div className="flex flex-col gap-4">

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={vCardData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Surname */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Surname</label>
            <input
              type="text"
              value={vCardData.surname}
              onChange={(e) => handleChange("surname", e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Contact Info / Address */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">Street</label>
                <input
                  type="text"
                  value={vCardData.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">Number</label>
                <input
                  type="text"
                  value={vCardData.number}
                  onChange={(e) => handleChange("number", e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">Postal Code</label>
                <input
                  type="text"
                  value={vCardData.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">City</label>
                <input
                  type="text"
                  value={vCardData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">State</label>
                <input
                  type="text"
                  value={vCardData.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-700">Country</label>
                <input
                  type="text"
                  value={vCardData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={vCardData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={vCardData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default VCardForm;