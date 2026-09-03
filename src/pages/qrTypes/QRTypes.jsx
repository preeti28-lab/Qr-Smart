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
      <div className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f7faff] to-white">
        {/* ── Decorative background (same language as the home hero) ── */}
        <div className="pointer-events-none absolute inset-0 h-[560px] overflow-hidden">
          <div className="absolute -left-32 -top-16 w-[460px] h-[460px] rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute -right-28 top-0 w-[420px] h-[420px] rounded-full bg-sky-200/30 blur-3xl" />
          <div
            className="hidden md:block absolute left-6 top-24 w-28 h-28 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(#93c5fd 1.6px, transparent 1.6px)",
              backgroundSize: "13px 13px",
            }}
          />
          <div
            className="hidden md:block absolute right-8 top-20 w-32 h-28 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(#93c5fd 1.6px, transparent 1.6px)",
              backgroundSize: "13px 13px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative px-5 pt-16">
          <SectionHeading
            title="Choose the type of QR code you need to improve your business"
            subHeading="The variety of types of customizable QR codes will allow you to renew your print and digital media, improve the customer experience and integrate links to any type of content."
            highlight="QR code"
            titleClassName="text-3xl md:text-[42px] leading-[1.15] max-w-4xl"
          />

          {/* Scroll Tab Bar */}
          <div className="flex items-center gap-2 mt-10">
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors duration-200"
            >
              <ChevronLeft size={15} />
            </button>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto scroll-smooth flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
              aria-label="Scroll right"
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors duration-200"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="mt-14">
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
