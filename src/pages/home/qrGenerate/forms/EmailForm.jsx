import React, { useState, useEffect } from "react";
import StepHeading from "../../../../components/ui/StepHeading";


const EmailForm = ({ emailData, setEmailData }) => {
  const handleInputChange = (field, value) => {
    setEmailData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="w-full rounded-xl shadow-sm space-y-6">
      <div className="space-y-4">
        <StepHeading number="1" text="Complete the content" />

        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>

            <input
              type="email"
              placeholder="E.g. example@email.com"
              value={emailData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Subject</label>

            <input
              type="text"
              placeholder="E.g. Inquiry about services"
              value={emailData.subject || ""}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Message</label>

            <textarea
              placeholder="Write your message..."
              value={emailData.message || ""}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={4}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
