import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPlans } from "../redux/features/blogs";
import BestPriceCard from "./cards/BestPriceCard";
import PriceCard from "./cards/PriceCard";
import { TbFilterBolt } from "react-icons/tb";
import { FiBarChart2, FiLock, FiUsers } from "react-icons/fi";


const features = [
  { icon: <TbFilterBolt size={13} />, label: "Unlimited projects" },
  { icon: <FiLock size={13} />, label: "Advanced security" },
  { icon: <FiBarChart2 size={13} />, label: "Analytics & reports" },
  { icon: <FiUsers size={13} />, label: "Team collaboration" },
];

/**
 * Shared layout for TrialExpired and SubscriptionExpired.
 * @param {string} badge      — small label text e.g. "Trial ended"
 * @param {string} heading    — main heading e.g. "Your 7-day trial has"
 * @param {string} highlight  — highlighted word e.g. "expired"
 * @param {string} subtext    — supporting paragraph
 */
const ExpiredLayout = ({ badge, heading, highlight, subtext }) => {
  const [visible, setVisible] = useState(false);
  const [plans, setPlans] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    dispatch(
      getAllPlans({}, (success, data) => {
        if (success) setPlans(data || []);
      }),
    );
  }, [dispatch]);

  const filteredPlans = plans.filter(
    (plan) => !plan.name.toLowerCase().includes("test"),
  );

  const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.65); }
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .anim-pulse { animation: pulse-dot 2s ease-in-out infinite; }
        .anim-spin  { animation: spin-slow 14s linear infinite; }

        .fade-up {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .5s cubic-bezier(.22,1,.36,1),
                      transform .5s cubic-bezier(.22,1,.36,1);
        }
        .fade-up.in { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="min-h-screen bg-[#f7f6f3] flex items-start justify-center p-5">
        <div className={`fade-up w-full ${visible ? "in" : ""}`}>

          {/* ── Hero ── */}
          <div className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl px-8 sm:px-12 pt-10 pb-9 mb-6 shadow-sm">
            {/* Subtle top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
              style={{ background: "linear-gradient(131.35deg, #104cd9 0%, #002273 100%)" }}
            />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 mb-5">
              <span className="anim-pulse w-[6px] h-[6px] rounded-full bg-red-400 flex-shrink-0" />
              <span className="text-[11px] font-medium tracking-wide uppercase text-red-500">
                {badge}
              </span>
            </div>

            {/* Heading — lighter weight, not extrabold */}
            <h1 className="text-gray-900 font-semibold leading-snug text-[clamp(22px,3.5vw,34px)] max-w-md mb-2">
              {heading}{" "}
              <span className="text-red-500 font-semibold">{highlight}</span>
            </h1>

            {/* Subtext */}
            <p className="text-[14px] text-gray-500 font-normal max-w-xl mb-7 leading-relaxed">
              {subtext}
            </p>

            {/* Spinning badge */}
            <div className="absolute top-8 right-10 w-16 h-16 hidden sm:block opacity-60">
              <svg className="anim-spin w-full h-full" viewBox="0 0 90 90">
                <path
                  id="spin-path"
                  d="M45,45 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                  fill="none"
                />
                <text fontSize="8.5" fill="#94a3b8" letterSpacing="2.6">
                  <textPath href="#spin-path">UPGRADE NOW • UPGRADE NOW •</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl">
                ⏱
              </div>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <span
                  key={f.label}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] text-blue-700 bg-blue-50 border border-blue-100"
                >
                  {f.icon}
                  {f.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Plans ── */}
          <p className="text-center text-[13px] font-medium uppercase tracking-widest text-gray-400 mb-5">
            Choose a plan to continue
          </p>

          <div className="w-full flex flex-wrap justify-center items-center gap-5 mb-10">
            {filteredPlans.map((plan) => {
              const months = plan.name.split(" ")[0];
              const isBest = months === "12";

              const commonProps = {
                key: plan._id,
                months,
                price: formatPrice(plan.price),
                desc: plan.description,
                cancelPrice: formatPrice(Math.round(plan.price * 1.2)),
                insideAdminPanel: true,
              };

              return isBest ? (
                <BestPriceCard {...commonProps} />
              ) : (
                <PriceCard {...commonProps} />
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default ExpiredLayout;