import React, { useRef, useState } from "react";
import HoverButton from "../../components/buttons/HoverButton";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../components/ui/SectionHeading";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { staticQRCodes } from "../../constants/qrTypes";
import { useSelector } from "react-redux";



const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const StaticQRCodeCard = ({ title, description, icon: Icon, isActive }) => {
  const { role } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleCreate = () => {
    if (role) {
      navigate("/builder");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={`h-full p-6 bg-white rounded-xl transition-all duration-300
      ${isActive ? "border border-black shadow-md" : "border border-gray-200"}`}
    >
      {/* Icon */}
      <div className="text-3xl mb-4 text-blue-500 p-2 bg-gray-100 w-max rounded-lg">
        <Icon />
      </div>

      <p className="font-semibold text-lg">{title}</p>

      <p className="text-gray-600 text-[14px] min-h-[80px] mb-10 mt-5">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-2 md:gap-5 mt-4">
        <HoverButton onClick={handleCreate}>Create QR Code</HoverButton>
      </div>
    </div>
  );
};

const StaticQRCode = () => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="container max-w-6xl mx-auto py-20 px-3">
      <SectionHeading title={"Static QR codes"} />

      {/* LEFT ARROW */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 border border-slate-200 p-3 rounded-full bg-white hover:bg-slate-100 items-center justify-center"
      >
        <FaArrowLeft />
      </button>

      {/* SLIDER */}
      <div className="py-6 ">
        <Slider ref={sliderRef} {...settings}>
          {staticQRCodes.map((item, index) => (
            <div key={index} className="px-3 box-border h-full">
              <StaticQRCodeCard {...item} isActive={index === activeSlide} />
            </div>
          ))}
        </Slider>
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 border border-slate-200 p-3 rounded-full bg-white hover:bg-slate-100 items-center justify-center"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default StaticQRCode;
