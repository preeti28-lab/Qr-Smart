// PATH: src/components/ui/StepRail.jsx
import React from "react";
import { MdCheck } from "react-icons/md";

/**
 * The single progress bar for every multi-step flow (new QR, bulk QR, and the
 * 22 builder pages). The connector is drawn as QR "modules" that fill in as you
 * move forward, so the chrome comes from the product's own visual language.
 *
 * @param {Array}  steps   [{ label, short?, icon }]  — short is the mobile label
 * @param {Number} current 0-indexed active step
 */
const Connector = ({ filled }) => (
  <div className="flex-1 flex items-center justify-center gap-[3px] px-2 min-w-[24px]">
    {Array.from({ length: 7 }).map((_, i) => (
      <span
        key={i}
        className={`h-[3px] w-[3px] rounded-[1px] transition-colors duration-300 ${
          filled ? "bg-blue-500" : "bg-slate-200"
        }`}
        style={{ transitionDelay: `${i * 25}ms` }}
      />
    ))}
  </div>
);

const StepRail = ({ steps = [], current = 0, className = "" }) => {
  if (!steps.length) return null;

  return (
    <div
      className={`w-full rounded-2xl border border-slate-200 bg-white px-4 sm:px-6 py-3
        flex items-center shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className}`}
    >
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;

        return (
          <React.Fragment key={step.label || index}>
            <div className="flex items-center gap-x-2.5 shrink-0">
              <span
                className={`grid place-items-center w-8 h-8 rounded-xl text-[15px] transition-all duration-300
                  ${done ? "bg-blue-600 text-white" : ""}
                  ${active ? "bg-blue-50 text-blue-600 ring-2 ring-blue-200" : ""}
                  ${!done && !active ? "bg-slate-100 text-slate-400" : ""}`}
              >
                {done ? <MdCheck size={16} /> : step.icon}
              </span>

              <span className="flex flex-col leading-none">
                <span className="text-[9.5px] font-bold uppercase tracking-[0.13em] text-slate-400 mb-[3px] hidden sm:block">
                  Step {index + 1}
                </span>
                <span
                  className={`text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap ${
                    active
                      ? "text-slate-900"
                      : done
                      ? "text-slate-600"
                      : "text-slate-400"
                  }`}
                >
                  <span className="hidden sm:inline">{step.label}</span>
                  <span className="sm:hidden">{step.short || step.label}</span>
                </span>
              </span>
            </div>

            {index < steps.length - 1 && <Connector filled={index < current} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepRail;