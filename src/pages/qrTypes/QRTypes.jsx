import React, { useRef } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import ScrollQRCard from "../../components/ui/ScrollQRCard";
import { qrTypes, qrTypesCardData } from "../../constants/qrTypes";
import QRTypeCard from "../../components/ui/QRTypeCard";
import StaticQRCode from "./StaticQRCode";
import ScreenView from "../../layouts/ScreenView";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";



const QRTypes = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 250, behavior: "smooth" });
  };

  return (
    <ScreenView>
      <div className="bg-[linear-gradient(254deg,_rgb(201,201,255)_-50%,_rgb(255,255,255)_30%)]">
        <div className="max-w-6xl mx-auto relative px-5 pt-16">
          <SectionHeading
            title="Choose the type of QR code you need to improve your business"
            subHeading="The variety of types of customizable QR codes will allow you to renew your print and digital media, improve the customer experience and integrate links to any type of content."
            highlight="QR code"
          />

          {/* Scroll Tab Bar */}
          <div className="flex items-center gap-2 mt-6">
            <button
              onClick={() => scroll(-1)}
              className="flex-shrink-0 w-7 h-7 ml-2 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-all duration-200"
            >
              <ChevronLeft size={15} />
            </button>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {qrTypes.map((item) => (
                <ScrollQRCard
                  key={item.name}
                  item={item}
                  isActive={false}
                  onClick={() => navigate(`/qr-type/${item.type}`)}
                />
              ))}
            </div>

            <button
              onClick={() => scroll(1)}
              className="flex-shrink-0 w-7 h-7 mr-2 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-all duration-200"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="mt-10">
            {qrTypesCardData?.map((item, index) => (
              <QRTypeCard
                item={item}
                key={index}
                alignment={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
          <StaticQRCode />
        </div>
      </div>
    </ScreenView>
  );
};

export default QRTypes;
