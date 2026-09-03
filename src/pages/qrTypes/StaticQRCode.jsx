import React, { useRef, useState } from "react";
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
      className={`h-full p-6 bg-white rounded-2xl transition-all duration-300
      ${
        isActive
          ? "border border-blue-200 shadow-[0_20px_45px_-24px_rgba(37,99,235,0.4)]"
          : "border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-blue-200"
      }`}
    >
      {/* Icon */}
      <div className="text-2xl mb-5 text-blue-600 p-3 bg-blue-50 w-max rounded-xl">
        <Icon />
      </div>

      <p className="font-bold text-[17px] text-slate-900">{title}</p>

      <p className="text-slate-500 text-[14px] leading-relaxed min-h-[80px] mb-8 mt-3">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-2 md:gap-5">
        <button
          onClick={handleCreate}
          className="px-6 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 active:scale-95 shadow-md shadow-blue-200"
        >
          Create QR Code
        </button>
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

      {/* Bottom controls — matches the carousel controls used on the home page.
          (Previously these were absolutely positioned but the wrapper wasn't a
          positioning context, so they anchored to the page instead of the
          slider.) */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          aria-label="Previous slide"
          className="border border-slate-200 p-3 rounded-full bg-white text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors duration-200"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={() => sliderRef.current?.slickNext()}
          aria-label="Next slide"
          className="border border-slate-200 p-3 rounded-full bg-white text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors duration-200"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default StaticQRCode;
