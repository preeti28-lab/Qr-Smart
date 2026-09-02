// PATH: src/pages/payments/Payments.jsx
import React, { useEffect, useMemo, useState } from "react";
import AppViewer from "../../layouts/AppViewer";
import { MdCheck, MdOutlineInfo } from "react-icons/md";
import PlanCard from "../../components/cards/PlanCard";
import PaymentModal from "./PaymentModal";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TrialModal from "./TrialModal";
import { getAllPlans } from "../../redux/features/blogs";

const BRAND_GRADIENT = "linear-gradient(131.35deg, #104cd9 0%, #002273 100%)";

const MODULE_TEXTURE = {
  backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};

const Payments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lists = [
    "Unlimited dynamic QR",
    "Variety of QR types",
    "Editing and management of QR codes",
    "Unlimited scans",
    "Complete QR analytics",
    "Variety of download formats",
    "Unlimited users",
    "Bulk create",
    "Integrate Google and Facebook pixel",
    "Premium Support",
    "Cancel whenever you want",
    "Custom domain",
  ];

  const [paymentModal, setPaymentModal] = useState(false);
  const [trialModal, setTrialModal] = useState(false);
  const [plans, setPlans] = useState([]);

  const { userData } = useSelector((state) => state.user);
  const { token, paidPlan } = useSelector((state) => state.auth);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch(
      getAllPlans({}, (success, data) => {
        if (success) {
          setPlans(data || []);
        }
      })
    );
  }, [dispatch]);

  const getMonths = (name) => {
    return name?.split(" ")[0]; // "12 MONTHS" -> "12"
  };

  const currentPlanId = userData?.currentPlan?._id;

  const selectedPlanObj = plans.find((p) => getMonths(p.name) === isActive);
  const isCurrentPlanSelected = selectedPlanObj?._id === currentPlanId;

  /**
   * Sort shortest -> longest so the price ladder reads top to bottom, and work
   * out what each longer commitment actually saves against the priciest
   * per-month option. Plans whose name isn't a number (e.g. "Test Months")
   * fall to the bottom and never take part in the savings maths.
   */
  const activePlans = useMemo(() => {
    const list = plans?.filter((p) => p.isActive) || [];

    const monthsOf = (p) => {
      const n = Number(getMonths(p.name));
      return Number.isFinite(n) ? n : null;
    };

    const numeric = list.filter((p) => monthsOf(p) !== null);
    const baseline = numeric.length
      ? Math.max(...numeric.map((p) => Number(p.price) || 0))
      : 0;

    return [...list]
      .sort((a, b) => {
        const am = monthsOf(a);
        const bm = monthsOf(b);
        if (am === null && bm === null) return 0;
        if (am === null) return 1;
        if (bm === null) return -1;
        return am - bm;
      })
      .map((plan) => {
        const m = monthsOf(plan);
        const price = Number(plan.price) || 0;
        const savings =
          baseline > 0 && m !== null && price < baseline
            ? Math.round((1 - price / baseline) * 100)
            : 0;

        return {
          plan,
          months: getMonths(plan.name),
          numericMonths: m,
          savings,
          total:
            m !== null && price > 0
              ? `₹${(price * m).toLocaleString("en-IN")} billed upfront`
              : "",
        };
      });
  }, [plans]);

  const handleBuyPlan = () => {
    if (!isActive && token) {
      toast.info("Select A Plan First ...", {
        position: "top-right",
        autoClose: 2000,
      });
    } else if (isCurrentPlanSelected) {
      toast.info("This is already your active plan.", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      if (userData) {
        navigate("/checkout", {
          state: { selectedMonth: isActive },
        });
        setPaymentModal(!paymentModal);
      } else {
        navigate("/login");
      }
    }
  };

  const currentPlanName = userData?.currentPlan?.name;

  return (
    <>
      <AppViewer>
        <div className="min-h-[calc(100vh-64px)] bg-[#F5F7FB]">
          <div className="py-5 px-4 sm:px-6 max-w-[1500px] mx-auto flex flex-col gap-y-5">
            {/* ── Header band ── */}
            <div
              className="relative overflow-hidden rounded-2xl px-5 py-6 sm:px-7"
              style={{ background: BRAND_GRADIENT }}
            >
              <div className="absolute inset-0 pointer-events-none" style={MODULE_TEXTURE} />
              <div className="relative flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-y-1.5 max-w-xl">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-blue-200/90">
                    Billing
                  </span>
                  <h1 className="text-white text-[24px] sm:text-[27px] font-bold leading-[1.15] tracking-[-0.025em]">
                    Plans and payments
                  </h1>
                  <p className="text-[13.5px] font-medium text-blue-100/80 leading-snug">
                    Every plan unlocks the same features. Pick the billing period
                    that suits you — longer commitments cost less per month.
                  </p>
                </div>

                {currentPlanName ? (
                  <div className="rounded-xl bg-white/10 border border-white/15 backdrop-blur px-4 py-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-200/90">
                      Your plan
                    </p>
                    <p className="text-white text-[15px] font-bold tracking-[-0.01em] mt-0.5">
                      {currentPlanName}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-5 items-start">
              {/* ── Features ── */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] order-2 lg:order-1">
                <div className="flex items-baseline gap-x-2.5 mb-4">
                  <h2 className="font-bold text-[11px] text-slate-900 uppercase tracking-[0.13em]">
                    Included in every plan
                  </h2>
                  <span className="text-[12px] font-medium text-slate-400">
                    no add-ons, no tiers
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-2.5">
                  {lists.map((item, index) => (
                    <div key={index} className="flex items-start gap-x-2.5">
                      <span className="shrink-0 grid place-items-center w-4 h-4 rounded-full bg-blue-50 text-blue-600 mt-[2px]">
                        <MdCheck size={11} />
                      </span>
                      <span className="text-[13px] text-slate-700 font-medium leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-x-2">
                  <MdOutlineInfo size={15} className="text-slate-400 shrink-0 mt-[1px]" />
                  <p className="text-[12px] font-medium text-slate-500 leading-snug">
                    Your QR codes keep working while a plan is active. Cancel
                    anytime — you keep access until the period ends.
                  </p>
                </div>
              </div>

              {/* ── Plans ── */}
              <div className="flex flex-col gap-y-4 order-1 lg:order-2">
                <div className="flex items-baseline gap-x-2.5">
                  <h2 className="font-bold text-[11px] text-slate-900 uppercase tracking-[0.13em]">
                    Choose a billing period
                  </h2>
                  <span className="text-[12px] font-medium text-slate-400">
                    prices shown per month
                  </span>
                </div>

                {activePlans.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 px-6 text-center">
                    <p className="text-[14px] font-semibold text-slate-700">
                      No plans available right now
                    </p>
                    <p className="text-[13px] text-slate-500 mt-1">
                      Check back shortly, or contact support if this persists.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-4 mt-1">
                    {activePlans.map(({ plan, months, numericMonths, savings, total }) => (
                      <PlanCard
                        key={plan._id}
                        months={months}
                        type={months}
                        label={numericMonths === null ? plan.name : ""}
                        price={`₹${plan.price}`}
                        total={total}
                        savings={savings}
                        desc={plan.description}
                        active={isActive === months}
                        setActive={setIsActive}
                        isCurrentPlan={plan._id === currentPlanId}
                      />
                    ))}
                  </div>
                )}

                {/* ── Action bar ── */}
                <div className="sticky bottom-0 pt-3 pb-2">
                  <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-[0_-6px_28px_-18px_rgba(15,23,42,0.4)]">
                    <p className="text-[12.5px] font-medium text-slate-500">
                      Value Added Tax is not included in the amounts.
                    </p>

                    {paidPlan === true ? null : (
                      <button
                        type="button"
                        onClick={handleBuyPlan}
                        disabled={isCurrentPlanSelected}
                        className={`rounded-full text-[13.5px] font-semibold text-white py-2.5 px-6
                          transition-all duration-200 active:scale-[0.98]
                          ${isCurrentPlanSelected
                            ? "bg-slate-300 cursor-not-allowed"
                            : "shadow-[0_8px_20px_-10px_rgba(16,76,217,0.9)] hover:brightness-110"}`}
                        style={
                          isCurrentPlanSelected
                            ? undefined
                            : { background: BRAND_GRADIENT }
                        }
                      >
                        {isActive ? "Continue to checkout" : "Select a plan"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppViewer>

      <PaymentModal
        isOpen={paymentModal}
        setIsOpen={setPaymentModal}
        selectedPlan={isActive}
      />

      <TrialModal isOpen={trialModal} setIsOpen={setTrialModal} />
    </>
  );
};

export default Payments;