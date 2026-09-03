import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const QRDemoCard = ({ image, title, description  , link}) => {
  return (
    <div className="group relative border border-slate-200 rounded-2xl p-3 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-200">

      <img src={image} alt={title} className="w-full rounded-xl mb-4" />

      <p className="font-bold text-slate-900 mb-2 px-1">{title}</p>

      <p className="text-sm text-slate-500 leading-relaxed mb-6 px-1">
        {description}
      </p>

      {/* Sliding More Info */}
      <Link 
      to={link}
      className="absolute bottom-3 left-4 right-4 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <p className="flex items-center gap-2 text-blue-500 cursor-pointer">
          More Info <FaArrowRightLong />
        </p>
      </Link>

    </div>
  );
};

export default QRDemoCard;