import React from "react";
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
      className={`[--card-group:1] max-w-5xl mx-auto mb-5 md:mb-7 flex overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 bg-white shadow-[0_16px_40px_-28px_rgba(15,23,42,0.3)] hover:shadow-[0_24px_50px_-28px_rgba(37,99,235,0.35)] hover:border-blue-200 transition-all duration-300 ${
        alignment === "left"
          ? "flex-col md:flex-row"
          : "flex-col md:flex-row-reverse"
      }`}
    >
      {/* Image */}
      <div className="w-full md:w-[38%] flex-shrink-0 overflow-hidden bg-gradient-to-b from-[#eef4ff] to-[#f8fbff]">
        <img
          src={imgLink}
          alt={title}
          className="w-full h-48 md:h-full object-cover md:object-contain transition-transform duration-500 [div:hover>div>&]:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-3 md:gap-5 p-5 md:p-12">
        <p className="font-bold text-2xl md:text-3xl text-slate-900 tracking-tight leading-snug">
          {title}
        </p>
        <p className="text-sm md:text-[15px] text-slate-500 leading-relaxed">
          {content}
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-1">
          <button
            onClick={handleClick}
            className="px-6 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 active:scale-95 shadow-md shadow-blue-200"
          >
            Create QR Code
          </button>
          <Link
            to={href}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 underline-offset-2 hover:underline"
          >
            More Info →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QRTypeCard;
