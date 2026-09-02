import { useState } from "react";
import SectionHeading from "../../components/ui/SectionHeading";

import { FaCircleCheck } from "react-icons/fa6";
import { qrTypes } from "../../constants/qrTypes";
import ScrollQRCard from "../../components/ui/ScrollQRCard";
import phoneImg from "../../../src/assets/phone.png";
import HoverButton from "../../components/buttons/HoverButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StatPill = ({ num, label }) => (
  <div className="flex-1 flex flex-col items-center gap-0.5 py-3 rounded-xl bg-slate-50 border border-slate-200">
    <span className="text-sm font-black text-blue-600">{num}</span>
    <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">
      {label}
    </span>
  </div>
);

export default function DifferentQRTypes() {
  const [activeCard, setActiveCard] = useState(qrTypes[0]);
  const [fading, setFading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, token, role } = useSelector((state) => state.auth);

  const handleSelect = (item) => {
    if (item.name === activeCard?.name) return;
    setFading(true);
    setTimeout(() => {
      setActiveCard(item);
      setFading(false);
    }, 160);
  };

  const handleCreate = () => {
    if (role) {
      navigate("/builder");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f8f9]  py-10 relative ">
      {/* Subtle background texture blobs */}
      <div className="pointer-events-none hidden md:absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-50 blur-3xl opacity-60" />
      <div className="pointer-events-none hidden md:absolute -bottom-20 right-0 w-[500px] h-[500px] rounded-full bg-slate-50 blur-3xl" />

      <div className="max-w-6xl mx-auto relative px-3">
        {/* ── Header ── */}
        <SectionHeading
          subHeading={
            "QR codes can hold a large amount of content and at QRFY, we offer them all."
          }
          title={"Generate different types of QR Codes"}
        />

        {/* ── Scrollable card row ── */}
        <div className="flex gap-2.5 overflow-x-auto py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {qrTypes.map((item) => (
            <ScrollQRCard
              key={item.name}
              item={item}
              isActive={activeCard?.name === item.name}
              onClick={() => handleSelect(item)}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8" />

        {/* ── Detail Panel ── */}
        {activeCard && (
          <div
            className={`transition-all -mb-20 duration-200 ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
          >
            <div className="grid md:grid-cols-[1fr_250px_1fr] md:grid-cols-3 gap-4">
              {/* Card 1 — Info + CTA */}
              <div className=" flex flex-col gap-5 ">
                <div className="flex items-start gap-3">
                  {/* <div className="w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center text-2xl bg-blue-50 border border-blue-100">
                    {activeCard.icon}
                  </div> */}
                  <div className="pt-1 flex flex-col gap-1.5">
                    <h3 className="text-4xl font-black text-black-500 ">
                      {activeCard.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-black-500 ">{activeCard.content}</p>

                <button
                  onClick={handleCreate}
                  className="w-full py-3 rounded-full text-sm font-bold text-white bg-blue-500 hover:bg-blue-500 transition-all duration-200 active:scale-95 shadow-sm shadow-blue-200"
                >
                  Create {activeCard.name} QR →
                </button>
              </div>

              {/* Card 2 — QR Preview */}
              <div className=" flex flex-col items-center justify-between gap-4 ">
                <div className="flex-1 flex items-center justify-center">
                  <div className="p-5 pb-0 rounded-2xl ">
                    {/* <img src={activeCard?.img} className="w-[90%] mx-auto" /> */}
                    <img src={phoneImg} className="w-[90%] mx-auto" />
                  </div>
                </div>

                {/* Scan hint */}
              </div>

              {/* Card 3 — Key Points */}
              <div className=" flex flex-col ">
                <div className="flex flex-col flex-1 divide-y divide-slate-100">
                  {activeCard.keyPoints?.map((kp, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="mt-1">
                        <FaCircleCheck
                          size={20}
                          className="text-blue-500"
                        />{" "}
                      </div>
                      <p className="text-sm text-black-500  leading-relaxed">
                        {kp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
