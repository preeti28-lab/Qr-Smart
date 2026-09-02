import React, { useEffect } from "react";
import ScreenView from "../../layouts/ScreenView";
import HeroWaves from "../../components/ui/HeroWaves";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { reportAbuse } from "../../redux/features/blogs";
import { toast } from "react-toastify";
import {
  FiShield,
  FiMail,
  FiLink2,
  FiEdit2,
  FiLock,
  FiCheckCircle,
  FiInfo,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";

import reportHeroImg from "../../assets/images/report-abuse-hero.png";

const REASON_LIMIT = 500;

const ASSURANCES = [
  {
    icon: FiLock,
    title: "Confidential",
    desc: "Your identity will be kept private.",
  },
  {
    icon: FiShield,
    title: "Secure",
    desc: "All reports are encrypted and handled securely.",
  },
  {
    icon: FiCheckCircle,
    title: "Actionable",
    desc: "We review each report and take appropriate action.",
  },
];

// ─── Field shell ──────────────────────────────────────────────────────────────
const FieldLabel = ({ label, hint }) => (
  <>
    <label className="block text-[15px] font-bold text-slate-900">
      {label} <span className="text-rose-500">*</span>
    </label>
    <p className="mt-1 text-[13px] text-slate-500">{hint}</p>
  </>
);

const ReportAbuse = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      qrUrl: "",
      reason: "",
    },
  });

  const reasonValue = watch("reason") || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = (data) => {
    const payload = {
      email: data.email,
      qrUrl: data.qrUrl,
      reason: data.reason,
    };

    dispatch(
      reportAbuse(payload, (success) => {
        if (success) {
          toast.success("Report submitted successfully!");
          reset();
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }),
    );
  };

  const inputShell = (hasError) =>
    `flex items-center gap-3 rounded-xl border bg-white px-4 py-3.5 transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 ${
      hasError ? "border-rose-300" : "border-slate-200"
    }`;

  return (
    <ScreenView>
      <div className="w-full bg-[#f7faff]">
        {/* ── Hero ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#e9f0ff] via-[#f1f6ff] to-[#eaf1ff]">
          <HeroWaves />

          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-12 md:flex-row md:justify-between md:gap-6 md:py-14">
            <div className="max-w-xl text-center md:text-left">
              <span className="inline-flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-white/80 shadow-sm">
                  <FiShield size={15} className="text-blue-600" />
                </span>
                <span className="text-[14px] font-semibold text-blue-600">
                  Help us keep QR Smart safe
                </span>
              </span>

              <h1 className="mt-4 text-[34px] font-bold leading-[1.1] tracking-tight text-slate-900 md:text-[52px]">
                Report <span className="text-blue-600">Abuse</span>
              </h1>

              <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-slate-500 md:mx-0 md:text-[15px]">
                Found something inappropriate or against our guidelines? Let us
                know so we can take action.
              </p>
            </div>

            <div className="relative shrink-0">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-100/80 to-violet-100/70 blur-2xl md:h-[340px] md:w-[340px]" />
              <img
                src={reportHeroImg}
                alt=""
                aria-hidden="true"
                className="relative w-[300px] select-none object-contain md:w-[400px] lg:w-[450px]"
                draggable="false"
              />
            </div>
          </div>
        </div>

        {/* ── Form card ── */}
        <div className="mx-auto -mt-6 max-w-6xl px-4 pb-16 md:px-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.45)] md:p-7">
            <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-9">
              {/* ── Assurance panel ── */}
              <aside className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 lg:self-start">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#3b82f6] text-white shadow-lg shadow-indigo-500/25">
                  <FiMessageSquare size={22} />
                </span>

                <h2 className="mt-5 text-[17px] font-bold text-slate-900">
                  Your Report Matters
                </h2>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-500">
                  We take all reports seriously and review them carefully to
                  keep QR Smart a safe place for everyone.
                </p>

                <div className="my-6 h-px bg-slate-200" />

                <div className="flex flex-col gap-5">
                  {ASSURANCES.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Icon size={17} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13.5px] font-bold text-slate-900">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </aside>

              {/* ── Form ── */}
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="flex min-w-0 flex-col gap-6"
              >
                {/* Email */}
                <div>
                  <FieldLabel
                    label="Email Address"
                    hint="Enter your email so we can contact you if needed."
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div className={`mt-3 ${inputShell(errors?.email)}`}>
                        <FiMail size={18} className="shrink-0 text-slate-400" />
                        <input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="w-full bg-transparent text-[14px] text-slate-800 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    )}
                  />
                  {errors?.email?.message && (
                    <p className="mt-1 text-[13px] text-rose-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* QR URL */}
                <div>
                  <FieldLabel
                    label="QR URL to report"
                    hint="Enter the QR code URL that you want to report."
                  />
                  <Controller
                    name="qrUrl"
                    control={control}
                    render={({ field }) => (
                      <div className={`mt-3 ${inputShell(errors?.qrUrl)}`}>
                        <FiLink2
                          size={18}
                          className="shrink-0 text-slate-400"
                        />
                        <input
                          {...field}
                          type="text"
                          placeholder="Ex. https://www.qrsmart.us/qr"
                          className="w-full bg-transparent text-[14px] text-slate-800 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    )}
                  />
                  {errors?.qrUrl?.message && (
                    <p className="mt-1 text-[13px] text-rose-600">
                      {errors.qrUrl.message}
                    </p>
                  )}
                </div>

                {/* Reason */}
                <div>
                  <FieldLabel
                    label="Why do you want to report this QR?"
                    hint="Please provide details about the issue you encountered."
                  />
                  <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                      <div
                        className={`relative mt-3 items-start rounded-xl border bg-white p-4 transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 ${
                          errors?.reason ? "border-rose-300" : "border-slate-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <FiEdit2
                            size={18}
                            className="mt-0.5 shrink-0 text-slate-400"
                          />
                          <textarea
                            {...field}
                            rows={4}
                            maxLength={REASON_LIMIT}
                            placeholder="Describe the issue..."
                            className="w-full resize-none bg-transparent pb-4 text-[14px] text-slate-800 outline-none placeholder:text-slate-400"
                          />
                        </div>
                        <span className="absolute bottom-3 right-4 text-[12px] text-slate-400">
                          {reasonValue.length}/{REASON_LIMIT}
                        </span>
                      </div>
                    )}
                  />
                  {errors?.reason?.message && (
                    <p className="mt-1 text-[13px] text-rose-600">
                      {errors.reason.message}
                    </p>
                  )}
                </div>

                {/* Notice */}
                <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3.5">
                  <FiInfo size={17} className="shrink-0 text-blue-600" />
                  <p className="text-[13px] text-slate-600">
                    <span className="font-semibold text-blue-700">
                      Please provide accurate information.
                    </span>{" "}
                    False reports may result in action.
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.7)] transition-colors hover:bg-blue-700"
                  >
                    <FiSend size={16} />
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ScreenView>
  );
};

export default ReportAbuse;
