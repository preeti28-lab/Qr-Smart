import React from "react";

const StepHeading = ({ number, text }) => {
  return (
    <h2 className="text-lg font-semibold">
      <span className="bg-black text-white p-1 rounded-full px-2 text-sm">
        {number}
      </span>{" "}
      {text}
    </h2>
  );
};

export default StepHeading;
