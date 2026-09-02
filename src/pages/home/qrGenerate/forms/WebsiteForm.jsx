import React, { useState } from "react";

import StepHeading from "../../../../components/ui/StepHeading";

const WebsiteForm = ({ websiteUrl, setWebsiteUrl }) => {
  return (
    <div className="w-full   rounded-xl shadow-sm space-y-6">
      <div className="space-y-4">
        <StepHeading number="1" text="Complete the content" />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Enter your Website
          </label>

          <input
            type="text"
            placeholder="E.g. https://www.myweb.com/"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-4"></div>
    </div>
  );
};

export default WebsiteForm;
