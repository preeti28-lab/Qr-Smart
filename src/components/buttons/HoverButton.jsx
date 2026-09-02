import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HoverButton = ({ className = "", children, onClick }) => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  

  return (
    <Button
      className={`group relative bg-blue-700 hover:bg-slate-50 border-blue-700 border transition-all hover:duration-700 w-[140px] h-[37px] flex justify-center items-center rounded-full normal-case text-[15px] font-medium font-montserrat shadow-none hover:shadow-none overflow-hidden ${className}`}
      // onClick={() => navigate('/home')}
      // onClick={() => navigate(`/builder`)}
      onClick={onClick}
    >
      {/* Hover background effect */}
      <div className="bg-slate-50 absolute rounded-full w-0 h-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:w-full group-hover:h-full transition-all duration-500 ease-in-out"></div>

      {/* Text */}
      <div className="absolute w-full h-full top-0 left-0 z-30 flex justify-center items-center text-white group-hover:text-blue-800 transition-colors duration-300 ease-in-out">
        {children}
      </div>
    </Button>
  );
};

export default HoverButton;
