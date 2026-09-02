import React from "react";
import Navbar from "../../common/navbar/Navbar";
import Footer from "../../common/footer/Footer";
import { useParams } from "react-router-dom";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Text = () => {
  const { randomtext } = useParams(); // Capture the dynamic text

  return (
    <div>
      <div className="w-full bg-white border-b flex sticky top-0 left-0 z-50 text-[#000000] justify-between items-center py-4 px-8 border-solid border-b-slate-300">
        <h2 className="font-bold text-[35px] md:text-[40px] uppercase text-center w-full">
          qrsmart
        </h2>
      </div>
      <div className="container mx-auto p-3">
        <p className="text-center font-semibold ">
          {decodeURIComponent(randomtext)}
        </p>
      </div>
      <div className="w-full bg-slate-800 flex justify-center items-center text-white">
        <div className="py-10">
          <h2 className="uppercase font-bold text-center text-xl mb-1">
            qrsmart
          </h2>
          <p className="font-medium text-[14px] text-center pb-2 px-2">
            Create your own QR codes and boost your business or idea
          </p>

          <div className="flex justify-center items-center gap-x-4">
            <a className="cursor-pointer">
              <FaLinkedin size={16} />
            </a>
            <a className="cursor-pointer">
              <FaSquareXTwitter size={16} />
            </a>
            <a className="cursor-pointer">
              <FaFacebookSquare size={16} />
            </a>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Text;
