import React, { useEffect, useState } from "react";
import { Modal } from "antd";

/**
 * OnboardingSuccessModal
 * Shows a celebration screen after registration, then auto-navigates.
 *
 * Props:
 *  - open       : boolean  – controls visibility
 *  - userName   : string   – optional first name to personalise message
 *  - onDone     : () => void – called when the auto-close timer ends (navigate here)
 *  - duration   : number   – ms before auto-close (default 3000)
 */
const OnboardingSuccessModal = ({
  open,
  userName = "",
  onDone,
  duration = 3000,
}) => {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState([]);

  // Build confetti particles once on mount
  useEffect(() => {
    const colors = [
      "#6366f1",
      "#f59e0b",
      "#10b981",
      "#ef4444",
      "#3b82f6",
      "#ec4899",
    ];
    setParticles(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        color: colors[i % colors.length],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.8}s`,
        duration: `${0.9 + Math.random() * 0.8}s`,
        size: `${6 + Math.random() * 7}px`,
        rotate: `${Math.random() * 360}deg`,
      })),
    );
  }, []);

  // Progress bar + auto-close
  useEffect(() => {
    if (!open) {
      setProgress(0);
      return;
    }
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(tick);
        onDone?.();
      }
    }, 30);
    return () => clearInterval(tick);
  }, [open, duration, onDone]);

  const firstName = userName?.split(" ")?.[0] || "";

  return (
    <>
      <style>{`
       

        .osm-wrap .ant-modal-content {
          padding: 0 !important;
          border-radius: 28px !important;
          overflow: hidden !important;
          background: transparent !important;
          box-shadow: 0 40px 100px rgba(0,0,0,0.18) !important;
        }
        .osm-wrap .ant-modal-close { display: none !important; }

        @keyframes osm-pop {
          0%   { transform: scale(0.6); opacity: 0; }
          70%  { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes osm-float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes osm-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(320px) rotate(720deg); opacity: 0; }
        }
        @keyframes osm-fade-up {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes osm-check {
          0%   { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        .osm-inner   { animation: osm-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) both; }
        .osm-icon    { animation: osm-float 2.8s ease-in-out 0.6s infinite; }
        .osm-line1   { animation: osm-fade-up 0.5s ease 0.35s both; }
        .osm-line2   { animation: osm-fade-up 0.5s ease 0.5s both; }
        .osm-line3   { animation: osm-fade-up 0.5s ease 0.65s both; }
        .osm-chips   { animation: osm-fade-up 0.5s ease 0.8s both; }
        .osm-bar-wrap { animation: osm-fade-up 0.5s ease 0.95s both; }

        .osm-checkmark {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: osm-check 0.5s ease 0.2s forwards;
        }
        .osm-ring {
          animation: osm-ring 1s ease 0.1s infinite;
        }
        .osm-confetti {
          animation: osm-fall var(--dur) ease var(--delay) both;
        }
      `}</style>

      <Modal
        open={open}
        footer={null}
        closable={false}
        centered
        width={400}
        className="osm-wrap"
        maskStyle={{
          backdropFilter: "blur(4px)",
          background: "rgba(0,0,0,0.35)",
        }}
      >
        <div
          className="osm-inner relative bg-white rounded-[28px] overflow-hidden text-center"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {/* Confetti */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <div
                key={p.id}
                className="osm-confetti absolute top-0 rounded-sm"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  "--delay": p.delay,
                  "--dur": p.duration,
                  transform: `rotate(${p.rotate})`,
                }}
              />
            ))}
          </div>

          {/* Top gradient band */}
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500" />

          {/* Body */}
          <div className="px-8 pt-8 pb-7 relative z-10">
            {/* Icon */}
            <div className="osm-icon relative w-20 h-20 mx-auto mb-6">
              {/* Pulsing ring */}
              <div className="osm-ring absolute inset-0 rounded-full border-2 border-indigo-400" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path
                    className="osm-checkmark"
                    d="M8 18 L15 25 L28 11"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Text */}
            <p className="osm-line1 text-[11px] uppercase  font-semibold text-indigo-400 mb-2">
              Congratulations Account Created
            </p>
            <h2
              className="osm-line2 text-[26px] font-bold text-gray-900 leading-tight mb-2"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {firstName ? `Welcome, ${firstName}!` : "You're in! 🎉"}
            </h2>
            <p className="osm-line3 text-[14px] text-gray-400 leading-relaxed mb-6">
              Your account is ready. Let's build something amazing with your QR
              codes.
            </p>

            {/* Feature chips */}
            {/* <div className="osm-chips flex flex-wrap justify-center gap-2 mb-7">
              {[
                { icon: "⚡", label: "Dynamic QR" },
                { icon: "📊", label: "Analytics" },
                { icon: "✏️", label: "Custom Design" },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[12px] font-medium text-indigo-600"
                >
                  <span>{chip.icon}</span>
                  {chip.label}
                </span>
              ))}
            </div> */}

            {/* Auto-redirect progress bar */}
            <div className="osm-bar-wrap">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] text-gray-400">
                  Taking you to the builder…
                </span>
                <span className="text-[11px] text-indigo-400 font-medium">
                  {Math.ceil(((100 - progress) / 100) * (duration / 1000))}s
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OnboardingSuccessModal;
