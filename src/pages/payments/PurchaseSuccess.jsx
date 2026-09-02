import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppViewer from "../../layouts/AppViewer";

// React Icons
import { HiOutlineSparkles } from "react-icons/hi2";
import {
  BsCalendar3,
  BsShieldCheck,
  BsLightningChargeFill,
} from "react-icons/bs";
import { MdOutlineReceipt, MdOutlineSwapHoriz } from "react-icons/md";
import { RiVipCrownLine } from "react-icons/ri";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import HoverButton from "../../components/buttons/HoverButton";

const ConfettiPiece = ({ style }) => (
  <div className="confetti-piece" style={style} />
);

const PurchaseSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [confetti, setConfetti] = useState([]);

  // Receive data passed via navigate state
  const planName = location.state?.planName || "Premium Plan";
  const planDuration = location.state?.planDuration || "";
  const totalPrice = location.state?.totalPrice || "0.00";
  const orderId = location.state?.orderId || "3476890";

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setVisible(true), 100);

    // Generate confetti pieces
    const pieces = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${2.5 + Math.random() * 2}s`,
      backgroundColor: [
        "#6366f1",
        "#8b5cf6",
        "#ec4899",
        "#f59e0b",
        "#10b981",
        "#3b82f6",
        "#f43f5e",
        "#a78bfa",
      ][Math.floor(Math.random() * 8)],
      width: `${6 + Math.random() * 6}px`,
      height: `${6 + Math.random() * 6}px`,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
    }));
    setConfetti(pieces);
  }, []);

  const perks = [
    { icon: <BsLightningChargeFill />, text: "Instant activation" },
    { icon: <HiOutlineSparkles />, text: "Unlimited dynamic QR codes" },
    { icon: <MdOutlineReceipt />, text: "Invoice sent to your email" },
    { icon: <MdOutlineSwapHoriz />, text: "Switch or cancel anytime" },
  ];

  return (
    <div>
      <AppViewer>
        <style>{`
          @keyframes confetti-fall {
            0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          @keyframes scale-in {
            0%   { transform: scale(0.5); opacity: 0; }
            70%  { transform: scale(1.08); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes check-draw {
            0%   { stroke-dashoffset: 60; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes ring-pulse {
            0%   { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
            70%  { box-shadow: 0 0 0 18px rgba(99,102,241,0); }
            100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
          }
          @keyframes fade-up {
            0%   { opacity: 0; transform: translateY(24px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .confetti-piece {
            position: fixed;
            top: -10px;
            animation: confetti-fall linear forwards;
            pointer-events: none;
            z-index: 999;
          }
          .check-circle {
            animation: scale-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
            animation-play-state: paused;
          }
          .check-circle.visible {
            animation-play-state: running;
            animation: scale-in 0.5s 0.1s cubic-bezier(0.34,1.56,0.64,1) both, ring-pulse 1.2s 0.6s ease-out;
          }
          .check-svg path {
            stroke-dasharray: 60;
            stroke-dashoffset: 60;
          }
          .check-svg.visible path {
            animation: check-draw 0.4s 0.5s ease-out forwards;
          }
          .fade-up { opacity: 0; }
          .fade-up.visible { animation: fade-up 0.5s ease-out forwards; }
          .fade-up-1 { animation-delay: 0.3s !important; }
          .fade-up-2 { animation-delay: 0.45s !important; }
          .fade-up-3 { animation-delay: 0.6s !important; }
          .fade-up-4 { animation-delay: 0.75s !important; }
          .fade-up-5 { animation-delay: 0.9s !important; }
        `}</style>

        {/* Confetti */}
        {confetti.map((c) => (
          <ConfettiPiece
            key={c.id}
            style={{
              left: c.left,
              width: c.width,
              height: c.height,
              backgroundColor: c.backgroundColor,
              borderRadius: c.borderRadius,
              animationDelay: c.animationDelay,
              animationDuration: c.animationDuration,
            }}
          />
        ))}

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-start justify-center p-6 pt-10">
          <div className="w-full max-w-lg flex flex-col items-center gap-6">
            {/* ── Success Icon ── */}
            <div
              className={`check-circle ${visible ? "visible" : ""} w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl`}
            >
              <svg
                className={`check-svg ${visible ? "visible" : ""} w-12 h-12`}
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M10 26 L20 36 L38 16"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* ── Headline ── */}
            <div
              className={`fade-up fade-up-1 ${visible ? "visible" : ""} text-center`}
            >
              <h1 className="text-[26px] font-bold text-gray-900 leading-tight">
                🎉 Congratulations!
              </h1>
              <p className="text-gray-500 mt-1.5 text-[15px]">
                Your plan has been activated successfully.
              </p>
            </div>

            {/* ── Order Card ── */}
            <div
              className={`fade-up fade-up-2 ${visible ? "visible" : ""} w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden`}
            >
              <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-400" />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-lg">
                    <RiVipCrownLine />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-[15px] leading-tight">
                      {planName}
                    </p>
                    {planDuration && (
                      <div className="flex items-center gap-1 text-[12px] text-gray-400 mt-0.5">
                        <BsCalendar3 className="text-[11px]" />
                        <span>{planDuration}</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-bold text-gray-900 text-[20px]">
                      ₹{totalPrice}
                    </p>
                    <p className="text-[11px] text-emerald-500 font-medium">
                      Paid
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-100 mb-4" />

                {/* Order meta */}
                <div className="flex justify-between text-[12px] text-black mb-4">
                  <span className="font-semibold text-lg">Order ID</span>
                  <span className="font-semibold text-lg font-mono font-medium text-black">
                    #{orderId}
                  </span>
                </div>

                {/* Perks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {perks.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-black"
                    >
                      <span className="text-indigo-500 text-sm shrink-0">
                        {p.icon}
                      </span>
                      {p.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── CTA buttons ── */}
            <div
              className={`fade-up fade-up-4 ${visible ? "visible" : ""} w-full flex justify-center gap-3`}
            >
              <HoverButton onClick={() => navigate("/builder")}>
                Go to Builder
                <FiArrowRight />
              </HoverButton>
            </div>
          </div>
        </div>
      </AppViewer>
    </div>
  );
};

export default PurchaseSuccess;
