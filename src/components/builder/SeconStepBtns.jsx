import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SeconStepBtns = ({ handleBackStep, handleFinishClick, isLoading }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleFinish = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    handleFinishClick();
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white px-5 rounded-full py-2"
        onClick={handleBackStep}
      >   
        Back
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-5 rounded-full py-2"
        onClick={handleFinish}
      >
        {isLoading ? "Please Wait ..." : "Finish"}
      </button>
    </div>
  );
};

export default SeconStepBtns;
