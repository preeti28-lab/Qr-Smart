import React, { useState } from "react";
import StepHeading from "../../../../components/ui/StepHeading";
import QRDesignTabs from "../../../../components/ui/QRDesignTabs";

const WhatsAppForm = ({}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="w-full rounded-xl shadow-sm space-y-6">
      <div className="space-y-4">
        <StepHeading number="1" text="Complete the content" />

        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Number</label>

            <input
              type="email"
              //   placeholder="E.g. example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Message</label>

            <textarea
              //   placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppForm;
