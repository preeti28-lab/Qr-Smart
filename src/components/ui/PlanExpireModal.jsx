import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const PlanExpireModal = ({ open, onClose }) => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!userData?.trialEndDate) return;
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(userData.trialEndDate);
      const diff = end - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [userData]);

  const formattedDate = userData?.trialEndDate
    ? new Date(userData.trialEndDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const urgency =
    timeLeft.days < 1 ? "critical" : timeLeft.days < 3 ? "warning" : "normal";

  const lossItems = [
    { icon: "⚡", text: "Dynamic QR codes become unscannable" },
    { icon: "✏️", text: "No new QR creation or editing" },
    { icon: "📊", text: "All tracking metrics go dark" },
    { icon: "⬇️", text: "Downloads permanently disabled" },
  ];

  // Number color for countdown digits
  const numColor =
    urgency === "critical"
      ? "text-red-500"
      : urgency === "warning"
        ? "text-amber-500"
        : "text-gray-800";

  // Box border/bg for countdown cells
  const boxBorder =
    urgency === "critical"
      ? "border-red-200 bg-red-50"
      : urgency === "warning"
        ? "border-amber-200 bg-amber-50"
        : "border-gray-200 bg-gray-50";

  // Ambient glow behind header
  const glowColor =
    urgency === "critical"
      ? "bg-blue-200/60"
      : urgency === "warning"
        ? "bg-blue-200/50"
        : "bg-blue-200/50";

  const TimeUnit = ({ val, label }) => (
    <div className="flex flex-col items-center flex-1">
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-2xl border ${boxBorder} relative overflow-hidden transition-all duration-300`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
        <span
          className={`text-2xl font-bold tabular-nums transition-colors duration-300 text-blue-800`}
        >
          {String(val).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] uppercase  text-blue-800 mt-2 font-semibold">
        {label}
      </span>
    </div>
  );

  return (
    <>
      <style>{`
        .pem .ant-modal-content {
          padding: 0 !important;
          border-radius: 24px !important;
          overflow: hidden !important;
          background: transparent !important;
          box-shadow: 0 32px 80px rgba(0,0,0,0.12) !important;
        }
        .pem .ant-modal-close {
          color: rgba(0,0,0,0.30) !important;
          top: 16px !important;
          right: 16px !important;
        }
        .pem .ant-modal-close:hover {
          color: rgba(0,0,0,0.65) !important;
          background: rgba(0,0,0,0.06) !important;
          border-radius: 8px !important;
        }
      `}</style>

      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={420}
        className="pem"
      >
        <div className="relative bg-white text-gray-800 overflow-hidden rounded-3xl border border-gray-100">
          {/* Ambient glow */}
          <div
            className={`absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${glowColor}`}
          />

          {/* ── Header ── */}
          <div className="relative z-10 px-8 pt-9  text-center ">
            <h2 className="text-xl font-bold  text-gray-900 mb-1">
              {isExpired ? "Your trial has ended" : "Your trial will expire in"}
            </h2>
          </div>

          {/* ── Countdown ── */}
          {!isExpired && (
            <div className="relative z-10 flex items-center justify-center gap-1 px-8 py-7">
              <TimeUnit val={timeLeft.days} label="Days" />
              <span className="text-gray-300 text-xl font-bold mb-5">:</span>
              <TimeUnit val={timeLeft.hours} label="Hours" />
              <span className="text-gray-300 text-xl font-bold mb-5">:</span>
              <TimeUnit val={timeLeft.minutes} label="Min" />
              <span className="text-gray-300 text-xl font-bold mb-5">:</span>
              <TimeUnit val={timeLeft.seconds} label="Sec" />
            </div>
          )}

          {/* ── Body ── */}
          <div className="relative z-10 px-7 pb-7">
            {formattedDate && (
              <p className="text-sm text-gray-600 text-center mb-4">
                After{" "}
                <span className="text-gray-700 font-semibold">
                  {formattedDate}
                </span>
                , you will lose access to:
              </p>
            )}

            {/* Loss list */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden mb-6">
              {lossItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors duration-150 ${
                    i < lossItems.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="  ">
                    <RxCrossCircled size={17} className="text-red-500" />
                  </div>
                  <span className="text-[13px] text-gray-700 leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-2.5">
              <button
                onClick={onClose}
                className="flex-1 h-11 rounded-full border border-gray-200 bg-white text-gray-400 text-sm font-medium hover:bg-gray-50 hover:text-gray-600 hover:border-gray-300 transition-all duration-200 cursor-pointer"
              >
                Maybe later
              </button>
              <button
                onClick={() => navigate('/plans-and-payments')}
                className="flex-[2] h-11 rounded-full main-bg text-white text-sm font-semibold hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                Upgrade Now →
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PlanExpireModal;
