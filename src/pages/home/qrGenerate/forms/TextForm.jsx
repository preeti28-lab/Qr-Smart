import React, { useState } from "react";
import QRDesignTabs from "../../../../components/ui/QRDesignTabs";
import StepHeading from "../../../../components/ui/StepHeading";

const TextForm = ({ enteredText, setEnteredText }) => {
  return (
    <div className="w-full rounded-xl shadow-sm space-y-6">
      <div className="space-y-4">
        <StepHeading number="1" text="Complete the content" />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Message</label>

          <textarea
            placeholder="Write your message..."
            value={enteredText}
            onChange={(e) => setEnteredText(e.target.value)}
            rows={4}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TextForm;
