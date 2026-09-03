import { useRef, useState } from "react";
import SectionHeading from "../../components/ui/SectionHeading";

import { FaCircleCheck, FaChevronRight } from "react-icons/fa6";
import { qrTypes } from "../../constants/qrTypes";
import ScrollQRCard from "../../components/ui/ScrollQRCard";
import phoneImg from "../../assets/phone-mockup.webp";
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
  const scrollRef = useRef(null);
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
        <div className="relative py-6">
          <div
            ref={scrollRef}
            className="flex gap-2.5 overflow-x-auto scroll-smooth pr-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {qrTypes.map((item) => (
              <ScrollQRCard
                key={item.name}
                item={item}
                isActive={activeCard?.name === item.name}
                onClick={() => handleSelect(item)}
              />
            ))}
          </div>

          {/* Fade + scroll-right affordance */}
          <div className="pointer-events-none absolute right-0 top-6 bottom-6 w-20 bg-gradient-to-l from-white to-transparent" />
          <button
            type="button"
            onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
            aria-label="Scroll QR types"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors duration-200"
          >
            <FaChevronRight size={13} />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-slate-200 mb-10" />

        {/* ── Detail Panel ── */}
        {activeCard && (
          <div
            className={`transition-all -mb-20 duration-200 ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
          >
            <div className="grid md:grid-cols-[1fr_250px_1fr] md:grid-cols-3 gap-4">
              {/* Card 1 — Info + CTA */}
              <div className=" flex flex-col gap-5 md:pt-6">
                <div className="flex items-start gap-3">
                  {/* <div className="w-14 h-14 flex-shrink-0 rounded-2xl flex items-center justify-center text-2xl bg-blue-50 border border-blue-100">
                    {activeCard.icon}
                  </div> */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                      {activeCard.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {activeCard.content}
                </p>

                <button
                  onClick={handleCreate}
                  className="self-start px-6 py-3 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 active:scale-95 shadow-md shadow-blue-200"
                >
                  Create {activeCard.name} QR →
                </button>
              </div>

              {/* Card 2 — QR Preview */}
              <div className=" flex flex-col items-center justify-between gap-4 ">
                <div className="flex-1 flex items-center justify-center">
                  <div className="p-5 pb-0 rounded-2xl ">
                    {/* <img src={activeCard?.img} className="w-[90%] mx-auto" /> */}
                    <img
                      src={phoneImg}
                      alt="QR code landing page shown on a phone"
                      className="w-[90%] mx-auto"
                    />
                  </div>
                </div>

                {/* Scan hint */}
              </div>

              {/* Card 3 — Key Points */}
              <div className=" flex flex-col md:pt-10">
                <div className="flex flex-col gap-2">
                  {activeCard.keyPoints?.map((kp, i) => (
                    <div key={i} className="flex items-start gap-3 py-3">
                      <div className="mt-0.5">
                        <FaCircleCheck size={18} className="text-blue-600" />
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
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
