// PATH: src/pages/payments/PurchasePlan.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { BsCalendar3, BsShieldCheck, BsLightningChargeFill } from "react-icons/bs";
import {
  MdOutlineReceipt,
  MdOutlineSwapHoriz,
  MdOutlineLocationOn,
  MdCheck,
  MdArrowBack,
  MdLockOutline,
} from "react-icons/md";
import { FiUser, FiMail, FiCreditCard } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

import { getAllPlans, purchasePlan } from "../../redux/features/blogs";
import Navbar from "../../common/navbar/Navbar";
import PlansModal from "./PlansModal";
import { setUser } from "../../redux/features/user";

const BRAND_GRADIENT = "linear-gradient(131.35deg, #104cd9 0%, #002273 100%)";

const MODULE_TEXTURE = {
  backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};

// ─── Validation Rules ─────────────────────────────────────────────────────────

const validate = (form) => {
  const errors = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  else if (form.fullName.trim().length < 3)
    errors.fullName = "Name must be at least 3 characters";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address";

  if (!form.street.trim()) errors.street = "Street address is required";
  if (!form.city.trim()) errors.city = "City is required";
  if (!form.state.trim()) errors.state = "State is required";

  if (!form.zip.trim()) errors.zip = "ZIP code is required";
  else if (!/^\d{4,10}$/.test(form.zip.trim()))
    errors.zip = "Enter a valid ZIP code";

  if (!form.country) errors.country = "Country is required";

  return errors;
};

// ─── Reusable field ───────────────────────────────────────────────────────────

const inputClass = (hasError) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-[14px] font-medium text-slate-800
   placeholder:text-slate-400 placeholder:font-normal bg-white outline-none
   transition-all duration-200
   ${hasError
     ? "border-red-400 bg-red-50/60 focus:border-red-500 focus:ring-2 focus:ring-red-100"
     : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`;

const Field = ({ label, icon, error, className = "", children }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-[12px] font-semibold text-slate-600 flex items-center gap-1.5">
      {icon}
      {label}
      <span className="text-red-500">*</span>
    </label>
    {children}
    {error ? (
      <p className="text-[11.5px] text-red-500 font-medium">{error}</p>
    ) : null}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const PurchasePlan = () => {
  const { userData } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [plansModal, setPlansModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: userData?.email || "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (submitted) setErrors(validate(updated));
  };

  useEffect(() => {
    dispatch(
      getAllPlans({}, (success, data) => {
        if (success) setPlans(data || []);
      })
    );
  }, [dispatch]);

  const selectedMonth = location.state?.selectedMonth;
  const selectedPlan = plans.find((plan) =>
    plan.name?.includes(String(selectedMonth))
  );

  const planName = selectedPlan?.name || "Premium Plan";
  const planDuration = selectedMonth ? `${selectedMonth} months` : "";
  const planPrice = selectedPlan?.price || 0;
  const discount = 0;
  const tax = (0).toFixed(2);
  const totalPrice = (planPrice + parseFloat(tax)).toFixed(2);

  const perks = [
    {
      icon: <BsLightningChargeFill size={13} />,
      text: "Your plan is ready to use the moment payment goes through.",
    },
    {
      icon: <HiOutlineSparkles size={13} />,
      text: "An invoice lands in your inbox with these billing details.",
    },
    {
      icon: <MdOutlineSwapHoriz size={14} />,
      text: "Switch to a different plan whenever you need to.",
    },
    {
      icon: <MdOutlineReceipt size={13} />,
      text: "Cancel anytime — access runs to the end of the billing period.",
    },
  ];

  const handlePayNow = () => {
    setSubmitted(true);
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const payload = {
      planId: selectedPlan._id,
      paymentId: "5467897654678",
      orderId: "3476890",
    };

    dispatch(
      purchasePlan(payload, (success, data) => {
        if (success) {
          dispatch(setUser({ userData: data.user }));
          navigate("/builder");
        }
      })
    );
  };

  const errorCount = Object.keys(errors).length;

  return (
    <>
      <Navbar />

      <div className="pp-root min-h-screen bg-[#F5F7FB]">
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-5 flex flex-col gap-y-5">
          {/* ── Header band ── */}
          <div
            className="relative overflow-hidden rounded-2xl px-5 py-6 sm:px-7"
            style={{ background: BRAND_GRADIENT }}
          >
            <div className="absolute inset-0 pointer-events-none" style={MODULE_TEXTURE} />
            <div className="relative flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col gap-y-1.5">
                <button
                  type="button"
                  onClick={() => navigate("/plans-and-payments")}
                  className="flex items-center gap-x-1.5 text-[12px] font-semibold text-blue-200/90 hover:text-white transition-colors w-fit"
                >
                  <MdArrowBack size={14} />
                  Back to plans
                </button>
                <h1 className="text-white text-[24px] sm:text-[27px] font-bold leading-[1.15] tracking-[-0.025em]">
                  Checkout
                </h1>
                <p className="text-[13.5px] font-medium text-blue-100/80 leading-snug">
                  Confirm your plan and billing details to finish up.
                </p>
              </div>

              <span className="flex items-center gap-x-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur px-3 py-1.5 text-[11.5px] font-semibold text-white">
                <MdLockOutline size={14} />
                Secure checkout
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 items-start">
            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col gap-5 flex-1 min-w-0 w-full">
              {/* Selected plan */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-x-4 min-w-0">
                    <span
                      className="shrink-0 grid place-items-center w-11 h-11 rounded-xl text-white"
                      style={{ background: BRAND_GRADIENT }}
                    >
                      <BsShieldCheck size={19} />
                    </span>
                    <div className="flex flex-col gap-y-0.5 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Selected plan
                      </span>
                      <h2 className="font-bold text-slate-900 text-[17px] tracking-[-0.02em] leading-tight truncate">
                        {planName}
                      </h2>
                      {planDuration ? (
                        <span className="flex items-center gap-1.5 text-slate-500 text-[12.5px] font-medium">
                          <BsCalendar3 size={11} />
                          {planDuration}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPlansModal(!plansModal)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[12.5px] font-semibold text-slate-600
                      hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                  >
                    Change plan
                  </button>
                </div>
              </div>

              {/* Billing details */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-5 sm:p-6">
                <div className="flex items-center gap-x-3 mb-5">
                  <span className="grid place-items-center w-9 h-9 rounded-xl bg-blue-50 text-blue-600">
                    <FiCreditCard size={17} />
                  </span>
                  <div className="flex flex-col gap-y-0.5">
                    <h2 className="font-bold text-slate-900 text-[15.5px] tracking-[-0.02em]">
                      Billing details
                    </h2>
                    <p className="text-[12.5px] font-medium text-slate-500">
                      These appear on your invoice.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="Full name"
                    icon={<FiUser size={12} />}
                    error={errors.fullName}
                  >
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      className={inputClass(errors.fullName)}
                      placeholder="John Doe"
                    />
                  </Field>

                  <Field
                    label="Email address"
                    icon={<FiMail size={12} />}
                    error={errors.email}
                  >
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass(errors.email)}
                      placeholder="john@example.com"
                    />
                  </Field>

                  <Field
                    label="Street address"
                    icon={<MdOutlineLocationOn size={13} />}
                    error={errors.street}
                    className="sm:col-span-2"
                  >
                    <input
                      name="street"
                      value={form.street}
                      onChange={handleChange}
                      className={inputClass(errors.street)}
                      placeholder="1234 Elm Street"
                    />
                  </Field>

                  <Field label="City" error={errors.city}>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className={inputClass(errors.city)}
                      placeholder="Springfield"
                    />
                  </Field>

                  <div className="flex gap-3">
                    <Field label="State" error={errors.state} className="flex-1">
                      <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className={inputClass(errors.state)}
                        placeholder="Rajasthan"
                      />
                    </Field>

                    <Field label="ZIP" error={errors.zip} className="flex-1">
                      <input
                        name="zip"
                        value={form.zip}
                        onChange={handleChange}
                        className={inputClass(errors.zip)}
                        placeholder="302001"
                      />
                    </Field>
                  </div>

                  <Field
                    label="Country"
                    error={errors.country}
                    className="sm:col-span-2"
                  >
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className={inputClass(errors.country)}
                    >
                      <option value="">Select a country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </Field>
                </div>

                {submitted && errorCount > 0 && (
                  <div className="mt-4 flex items-start gap-x-2 text-[12.5px] text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                    <span className="mt-[1px]">⚠</span>
                    <span>
                      {errorCount === 1
                        ? "One field still needs attention before you can pay."
                        : `${errorCount} fields still need attention before you can pay.`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-4 lg:sticky lg:top-20">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden">
                <div className="h-1" style={{ background: BRAND_GRADIENT }} />
                <div className="p-5">
                  <h3 className="font-bold text-[11px] text-slate-900 uppercase tracking-[0.13em] mb-4">
                    Order summary
                  </h3>

                  <div className="flex flex-col gap-3 text-[13px]">
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-slate-500 font-medium truncate">
                        {planName}
                      </span>
                      <span className="font-semibold text-slate-800 shrink-0">
                        ₹{planPrice}
                      </span>
                    </div>

                    {planDuration ? (
                      <div className="flex justify-between items-center gap-3">
                        <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                          <BsCalendar3 size={11} className="text-slate-400" />
                          Duration
                        </span>
                        <span className="font-semibold text-slate-800">
                          {planDuration}
                        </span>
                      </div>
                    ) : null}

                    {discount > 0 && (
                      <div className="flex justify-between items-center text-emerald-600 font-semibold">
                        <span>Discount</span>
                        <span>−₹{discount}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center gap-3">
                      <span className="text-slate-500 font-medium">
                        Value Added Tax
                      </span>
                      <span className="font-semibold text-slate-800">₹{tax}</span>
                    </div>
                  </div>

                  <div className="h-px my-4 bg-slate-100" />

                  <div className="flex justify-between items-baseline mb-5">
                    <span className="font-bold text-slate-900 text-[14px]">
                      Total due today
                    </span>
                    <span className="font-bold text-slate-900 text-[24px] tracking-[-0.03em]">
                      ₹{totalPrice}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {perks.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-[12.5px] text-slate-600 font-medium leading-snug"
                      >
                        <span className="shrink-0 grid place-items-center w-4 h-4 rounded-full bg-blue-50 text-blue-600 mt-[2px]">
                          <MdCheck size={11} />
                        </span>
                        {p.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayNow}
                className="w-full text-white font-semibold text-[14.5px] py-3.5 rounded-full
                  flex items-center justify-center gap-2 transition-all duration-200
                  shadow-[0_10px_24px_-12px_rgba(16,76,217,0.95)] hover:brightness-110 active:scale-[0.99]"
                style={{ background: BRAND_GRADIENT }}
              >
                <BsShieldCheck size={16} />
                Pay ₹{totalPrice} now
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11.5px] font-medium text-slate-400 text-center">
                <MdLockOutline size={13} />
                Payment details are handled over an encrypted connection.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PlansModal open={plansModal} onClose={() => setPlansModal(false)} />
    </>
  );
};

export default PurchasePlan;