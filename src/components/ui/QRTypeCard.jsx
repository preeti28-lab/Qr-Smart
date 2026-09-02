import React from "react";
import HoverButton from "../buttons/HoverButton";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const QRTypeCard = ({ item, key, alignment }) => {
  const { title, content, type, imgLink, index, href } = item;
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const handleClick = () => {
    if (token) {
      navigate("/builder");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      className={`[--card-group:1] max-w-5xl mx-auto mb-4 md:mb-6 flex overflow-hidden rounded-2xl md:rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 ${
        alignment === "left"
          ? "flex-col md:flex-row"
          : "flex-col md:flex-row-reverse"
      }`}
    >
      {/* Image */}
      <div className="w-full md:w-[38%] flex-shrink-0 overflow-hidden">
        <img
          src={imgLink}
          className="w-full h-48 md:h-full object-cover md:object-contain transition-transform duration-500 [div:hover>div>&]:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-3 md:gap-5 p-5 md:p-12">
        <p className="font-bold text-2xl md:text-3xl text-slate-800 leading-snug">
          {title}
        </p>
        <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed">
          {content}
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-1">
          <HoverButton onClick={handleClick}>Create QR Code</HoverButton>
          <Link
            to={href}
            className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors duration-200 underline-offset-2 hover:underline"
          >
            More Info →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QRTypeCard;
