import React from "react";
import MyButton from "../buttons/MyButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiSend } from "react-icons/fi";
import { FaShieldAlt, FaGem, FaCheck } from "react-icons/fa";

/**
 * Presentation meta for every plan duration.
 * `order` sirf display order ke liye hai (popular plan beech me aaye).
 */
const PLAN_META = {
  6: {
    tier: "Standard",
    billing: "Billed every semester",
    order: 0,
    accent: "sky",
    features: [
      "All Free features",
      "Advanced QR analytics",
      "Custom QR design",
      "Bulk QR generation",
      "Email support",
    ],
  },
  12: {
    tier: "Premium",
    billing: "Billed annually",
    order: 1,
    accent: "blue",
    popular: true,
    features: [
      "All Standard features",
      "Scan tracking & reports",
      "Custom branding",
      "API access",
      "Priority support",
    ],
  },
  3: {
    tier: "Professional",
    billing: "Billed quarterly",
    order: 2,
    accent: "violet",
    features: [
      "All Premium features",
      "Team collaboration",
      "White-label solution",
      "Advanced security",
      "Dedicated support",
    ],
  },
};

export const getPlanMeta = (months) =>
  PLAN_META[months] || {
    tier: `${months} Months`,
    billing: "",
    order: 99,
    accent: "sky",
    features: [],
  };

const ICONS = {
  sky: {
    wrapper: "bg-blue-50 border border-blue-100",
    icon: <FiSend size={24} className="text-blue-500 -rotate-12" />,
  },
  blue: {
    wrapper: "bg-blue-600 border border-blue-600 shadow-lg shadow-blue-600/25",
    icon: <FaShieldAlt size={22} className="text-white" />,
  },
  violet: {
    wrapper: "bg-violet-50 border border-violet-100",
    icon: <FaGem size={20} className="text-violet-500" />,
  },
};

const PlanCard = ({
  months = "",
  price = "",
  cancelPrice = "",
  desc = "",
  insideAdminPanel = false,
}) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const meta = getPlanMeta(months);
  const popular = !!meta.popular;
  const badge = ICONS[meta.accent] || ICONS.sky;

  const handleClick = () => {
    if (insideAdminPanel === false && !token) {
      navigate("/login", { state: { monthSelected: months } });
    } else {
      navigate("/checkout", { state: { selectedMonth: months } });
    }
  };

  return (
    <div
      className={`relative flex w-full max-w-[330px] flex-col rounded-[22px] bg-white px-6 pb-6 transition-all duration-200 sm:w-[300px] lg:w-[320px] ${
        popular
          ? "z-10 border-2 border-blue-500 pt-9 shadow-[0_22px_50px_-20px_rgba(37,99,235,0.45)] md:-my-5"
          : "border border-slate-200 pt-7 shadow-[0_14px_36px_-22px_rgba(15,23,42,0.35)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(15,23,42,0.4)]"
      }`}
    >
      {popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-white shadow-md shadow-blue-600/30">
          Most Popular
        </span>
      )}

      {/* icon */}
      <div
        className={`mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full ${badge.wrapper}`}
      >
        {badge.icon}
      </div>

      {/* tier + duration */}
      <h3 className="mt-5 text-center text-[22px] font-bold text-slate-900">
        {meta.tier}
      </h3>
      <div className="mx-auto mt-3 rounded-full bg-blue-50 px-3 py-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
          {months} Months
        </span>
      </div>

      {/* price */}
      <div className="mt-6 flex flex-col items-center gap-y-1">
        <span className="text-[15px] font-medium text-slate-400 line-through">
          {cancelPrice}
        </span>
        <div className="flex items-baseline justify-center gap-x-1">
          <span className="text-[30px] font-bold leading-none text-slate-900">
            {price}
          </span>
          <span className="text-[14px] font-medium text-slate-500">/month</span>
        </div>
        <p className="mt-1 text-center text-[13px] font-medium text-slate-500">
          {desc || meta.billing}
        </p>
      </div>

      {/* features */}
      {meta.features.length > 0 && (
        <ul className="mt-7 flex flex-col gap-y-3">
          {meta.features.map((feature) => (
            <li key={feature} className="flex items-start gap-x-2.5">
              <FaCheck
                size={12}
                className="mt-1 shrink-0 text-blue-500"
              />
              <span className="text-[13.5px] font-medium text-slate-600">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* cta */}
      <div className="mt-auto pt-8">
        <MyButton
          className={
            popular
              ? "w-full rounded-lg bg-blue-600 py-3 text-[14px] font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
              : "w-full rounded-lg border border-solid border-blue-200 bg-white py-3 text-[14px] font-semibold text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-50"
          }
          onClick={handleClick}
        >
          {popular ? "Buy Now" : "Buy Plan"}
        </MyButton>
      </div>
    </div>
  );
};

export default PlanCard;
