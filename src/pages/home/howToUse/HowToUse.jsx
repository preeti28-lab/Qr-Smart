import React, { useRef } from "react";
import Slider from "react-slick";
import SectionHeading from "../../../components/ui/SectionHeading";
import QRDemoCard from "../../../components/ui/QRDemoCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import businessImg from "../../../assets/images/qrcodeson/businesscard.webp";
import pamphlates from "../../../assets/images/qrcodeson/pamphlates.webp";
import brouchersImg from "../../../assets/images/qrcodeson/brouchers.webp";
import bottlescansImg from "../../../assets/images/qrcodeson/bottlescans.webp";
import productpackagingImg from "../../../assets/images/qrcodeson/productpackaging.webp";
import menuImg from "../../../assets/images/qrcodeson/menu.webp";

const qrCards = [
  {
    title: "Business cards",
    image: businessImg,
    link: "/resources/qr-on/business-cards",
    description:
      "Turn your card into an interactive tool by adding a QR code that connects clients and employers with your work, social networks and contact information.",
  },
  {
    title: "Pamphlets",
    image: pamphlates,
    link: "/resources/qr-on/flyers",
    description:
      "Expand the printed information on your pamphlets with a QR code, offering interactive content and measuring its reach in real time.",
  },
  {
    title: "Brochures",
    image: brouchersImg,
    link: "/resources/qr-on/brochures",
    description:
      "Complement the content of your brochures by adding a QR code that provides access to multimedia content such as videos and online documents.",
  },
  {
    title: "Bottles and cans",
    image: bottlescansImg,
    link: "/resources/qr-codes-on/bottle-and-cans",
    description:
      "Turn your packaging into smart labels with a QR code that offers access to information about origin, ingredients and exclusive promotions.",
  },
  {
    title: "Product packaging",
    image: productpackagingImg,
    link: "/resources/qr-codes-on/product-packaging",
    description:
      "Reduce the text on your packaging and provide access to key information, exclusive discounts and social media through a simple scan.",
  },
  {
    title: "Menu",
    image: menuImg,
    link: "/resources/qr-codes-on/menus",
    description:
      "Keep your menu up to date with a QR code on your menu. Forget about reprints and make it easy for your diners to access interactive options.",
  },
];

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

const HowToUse = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="container max-w-6xl mx-auto py-20 px-3">
      <SectionHeading
        smallHead="QR Codes on"
        title="Discover how to use QR codes to boost your marketing strategy."
        align="left"
      />

      {/* Slider */}
      <div className="py-6">
        <Slider ref={sliderRef} {...settings}>
          {qrCards.map((item, index) => (
            <div key={index} className="p-3">
              <QRDemoCard {...item} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Bottom Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-3">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="border border-slate-200 p-3 rounded-full hover:bg-slate-100 transition-colors duration-200"
            aria-label="Previous slide"
          >
            <FaArrowLeft className="text-slate-600" />
          </button>

          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="border border-slate-200 p-3 rounded-full hover:bg-slate-100 transition-colors duration-200"
            aria-label="Next slide"
          >
            <FaArrowRight className="text-slate-600" />
          </button>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 active:scale-95 shadow-sm shadow-blue-200"
          onClick={() => navigate("/resources/qr-codes-on")}
        >
          Show More <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default HowToUse;