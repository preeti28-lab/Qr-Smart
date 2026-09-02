// PATH: src/pages/payments/PlansModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MdCheck, MdClose } from "react-icons/md";
import { getAllPlans } from "../../redux/features/blogs";

const BRAND_GRADIENT = "linear-gradient(131.35deg, #104cd9 0%, #002273 100%)";

/**
 * Lets the customer swap billing period without leaving checkout.
 *
 * The previous version rendered two hard-coded plans and its Continue button
 * only logged to the console, so the selection never reached the page. This one
 * loads the real plans and pushes the chosen period back into the /checkout
 * route state, which is where PurchasePlan reads `selectedMonth` from.
 *
 * Props (all optional — the modal works standalone):
 *   open, onClose, onSelect(months)
 */
const PlansModal = ({ open, onClose = () => {}, onSelect }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentMonth = location.state?.selectedMonth;

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(currentMonth || null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    dispatch(
      getAllPlans({}, (success, data) => {
        setPlans(success ? data || [] : []);
        setLoading(false);
      })
    );
  }, [open, dispatch]);

  useEffect(() => {
    if (open) setSelected(currentMonth || null);
  }, [open, currentMonth]);

  const getMonths = (name) => name?.split(" ")[0];

  /** Shortest -> longest, with savings measured against the priciest option. */
  const options = useMemo(() => {
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
        return {
          plan,
          months: getMonths(plan.name),
          numericMonths: m,
          savings:
            baseline > 0 && m !== null && price < baseline
              ? Math.round((1 - price / baseline) * 100)
              : 0,
        };
      });
  }, [plans]);

  const handleContinue = () => {
    if (!selected) return;

    if (typeof onSelect === "function") {
      onSelect(selected);
    } else {
      // PurchasePlan reads the plan from route state, so update it in place.
      navigate("/checkout", {
        state: { ...(location.state || {}), selectedMonth: selected },
        replace: true,
      });
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={520}
      styles={{ content: { padding: 0, borderRadius: 18, overflow: "hidden" } }}
    >
      <div className="h-1 w-full" style={{ background: BRAND_GRADIENT }} />

      <div className="px-6 pt-5 pb-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex flex-col gap-y-0.5">
            <h2 className="font-bold text-slate-900 text-[18px] tracking-[-0.025em] leading-tight">
              Change billing period
            </h2>
            <p className="text-[12.5px] font-medium text-slate-500">
              Same features on every plan — longer periods cost less.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 grid place-items-center w-8 h-8 rounded-full text-slate-400
              hover:bg-slate-100 hover:text-slate-700 transition-all duration-200"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </div>

        {/* Options */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-[74px] rounded-2xl border border-slate-200 bg-slate-50 animate-pulse"
              />
            ))}
          </div>
        ) : options.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-10 px-6 text-center">
            <p className="text-[14px] font-semibold text-slate-700">
              No plans available right now
            </p>
            <p className="text-[12.5px] text-slate-500 mt-1">
              Close this and try again in a moment.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {options.map(({ plan, months, numericMonths, savings }) => {
              const active = selected === months;
              const isCurrent = currentMonth === months;

              return (
                <button
                  type="button"
                  key={plan._id || months}
                  onClick={() => setSelected(months)}
                  className={`relative w-full text-left rounded-2xl border-2 px-4 py-3.5
                    flex items-center justify-between gap-3 transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                    ${active
                      ? "border-blue-600 bg-blue-50/60 shadow-[0_8px_22px_-16px_rgba(16,76,217,0.9)]"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}
                >
                  {savings > 0 && (
                    <span className="absolute -top-2.5 right-4 text-[10.5px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-[3px] rounded-full">
                      Save {savings}%
                    </span>
                  )}

                  <span className="flex items-center gap-x-3 min-w-0">
                    <span
                      className={`shrink-0 grid place-items-center w-5 h-5 rounded-full border-2 transition-all duration-200
                        ${active
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 bg-white text-transparent"}`}
                    >
                      <MdCheck size={12} />
                    </span>

                    <span className="flex flex-col gap-y-0.5 min-w-0">
                      <span className="flex items-center gap-x-2">
                        <span className="font-bold text-slate-900 text-[15px] tracking-[-0.01em]">
                          {numericMonths === null
                            ? plan.name
                            : `${months} months`}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-[2px] rounded-full">
                            Current
                          </span>
                        )}
                      </span>
                      {plan.description ? (
                        <span className="text-[12px] font-medium text-slate-500 truncate">
                          {plan.description}
                        </span>
                      ) : null}
                    </span>
                  </span>

                  <span className="font-bold text-slate-900 text-[19px] tracking-[-0.02em] shrink-0">
                    ₹{plan.price}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <button
          type="button"
          onClick={handleContinue}
          disabled={!selected}
          className={`mt-5 w-full py-3 rounded-full text-white font-semibold text-[14px]
            transition-all duration-200 active:scale-[0.99]
            ${!selected
              ? "bg-slate-300 cursor-not-allowed"
              : "shadow-[0_10px_24px_-12px_rgba(16,76,217,0.95)] hover:brightness-110"}`}
          style={!selected ? undefined : { background: BRAND_GRADIENT }}
        >
          {selected ? "Use this plan" : "Select a plan"}
        </button>
      </div>
    </Modal>
  );
};

export default PlansModal;